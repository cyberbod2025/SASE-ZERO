# Definición de terminado — Vertical slice: asistencia por clase y grupo

**Rama:** `feat/attendance-class-slice` (base: `feat/vertical-slice`, `a60c003`)
**Fecha de cierre de esta iteración:** 2026-08-04
**Responsable de la construcción:** agente autónomo (Claude Code), bajo instrucción directa de Hugo Sánchez Reséndiz (Product Owner)
**Estado:** construido, verificado con evidencia ejecutada, PR abierto — **no fusionado** (el merge lo decide Hugo).

## 1. Alcance cubierto

Un docente autenticado con Supabase Auth real puede: iniciar sesión, tener un rol activo explícito de DOCENTE, ver solo los grupos que tiene asignados, abrir un grupo, iniciar o recuperar la sesión de clase del día, ver la lista completa de alumnos partiendo de "todos presentes", marcar excepciones (PRESENTE/AUSENTE/RETARDO), guardar en una sola operación lógica (upsert de todo el roster, no solo el diff), recargar y recuperar lo capturado, modificar sin duplicar, y cerrar/reabrir sesión conservando la misma información.

## 2. Modelo de datos (migración `0003_attendance_class_slice.sql`)

- `sesiones_clase(id, grupo_id, docente_id, fecha, created_at, updated_at)` — única por `(grupo_id, docente_id, fecha)`.
- `asistencias(id, sesion_id, alumno_id, estado, nota, created_by, updated_by, created_at, updated_at)` — única por `(sesion_id, alumno_id)`; `estado` restringido a `PRESENTE|AUSENTE|RETARDO`; `created_by` inmutable vía trigger.
- RLS: el docente solo lee/crea/actualiza filas de sesiones y asistencia asociadas a un grupo en el que está en `docente_grupos`. Grants de tabla explícitos con `revoke all` previo (incluye `TRUNCATE`/`REFERENCES`/`TRIGGER`, que RLS por fila no filtra) — corregido tras hallazgo P1 de la revisión de seguridad (ver §5).

## 3. Verificación ejecutada (no solo afirmada)

| Verificación | Resultado |
|---|---|
| `npx tsc -b` | Verde, sin errores |
| `npx oxlint` | Verde, sin hallazgos |
| `npx vitest run` | 12/12 pruebas verdes (4 archivos: `App`, `LoginForm`, `GroupsScreen`, `AttendanceScreen`) |
| `npm run build` | Build de producción exitoso |
| `supabase db reset` (migraciones 0001-0003 + seed) | Aplicado sin errores contra Postgres local (Docker) |
| `app/supabase/tests/0001_rls_alumnos.sql` (preexistente) | Pasa contra el esquema con las tablas nuevas |
| `app/supabase/tests/0002_rls_attendance.sql` (nuevo) | Pasa: caso positivo (docente asignado lee/crea/inserta/actualiza/recupera) y caso negativo (docente no asignado no ve grupo, no lee sesión por id directo, no inserta, su update no afecta filas, y **TRUNCATE/DELETE bloqueados por falta de privilegio de tabla**, no solo por RLS) |
| E2E vía PostgREST real (HTTP, dos identidades reales autenticadas) | 10 pasos verificados: login, grupos visibles/no visibles, crear sesión, insertar asistencia, recuperar, modificar sin duplicar (mismo `id` de fila), acceso negativo bloqueado en cada operación (403 en insert, 0 filas en update, sesión no listada) |
| E2E en navegador real (Chrome, viewport móvil 390×844) | Login → grupos → grupo → marcar excepción → indicador "cambios sin guardar" → guardar → confirmación → reload → estado recuperado → modificar sin duplicar (confirmado por SQL, 1 sola fila) → logout → login → estado recuperado igual |

## 4. Datos demo (ninguno real)

Seed en `app/supabase/seed.sql`: 2 docentes (`docente.asignado@demo.sase-zero.test`, `docente.no-asignado@demo.sase-zero.test`, contraseña local `demo1234`), 2 grupos, 4 alumnos ficticios. Solo el primer docente está asignado al grupo `1A Demo`.

## 5. Revisión paralela controlada (Fase E)

Dos subagentes de revisión, cada uno con el diff completo y el contexto del slice:

**SECURITY-RLS reviewer** — encontró **P1 real**: la migración original otorgaba privilegios sin `revoke all` previo en las tablas nuevas, dejando `TRUNCATE`/`REFERENCES`/`TRIGGER` heredados por defecto para `authenticated` — privilegios que RLS por fila **no filtra**, permitiendo a cualquier docente autenticado (asignado o no, de cualquier institución) vaciar `asistencias`/`sesiones_clase` completas con `TRUNCATE`. Verificado por explotación real contra la base local antes de reportarlo. **Corregido**: se agregó `revoke all` explícito antes de los `grant` en `0003_attendance_class_slice.sql`, y se añadió una prueba de regresión en `0002_rls_attendance.sql` que confirma `TRUNCATE`/`DELETE` bloqueados por falta de privilegio para `authenticated`. Re-verificado tras el fix: ambos archivos de prueba SQL pasan con exit 0 contra una base reseteada desde cero.

**PRODUCT-QA reviewer** — encontró **P1 real**: `AttendanceScreen.guardar()` solo enviaba al upsert los alumnos cuyo estado difería del último guardado; si el docente dejaba a todos en "Presente" sin tocar nada, la sesión de clase se creaba pero la tabla `asistencias` quedaba sin ninguna fila para ese día, generando una discrepancia silenciosa de datos (un reporte externo mostraría cero registros de asistencia aunque el docente "pasó lista"). **Corregido**: `guardar()` ahora envía siempre el roster completo en el upsert, no solo el diff. Prueba de componente actualizada y verde. El reviewer también confirmó por lectura de código que no hay pantallas muertas, el doble envío está bloqueado correctamente, y los errores de guardado no destruyen los cambios en pantalla.

Ambos hallazgos P1 fueron corregidos antes de abrir el PR. No hubo una segunda ronda de revisión (los fixes son acotados y ya re-verificados con la misma batería de pruebas).

## 6. Limitaciones conocidas / backlog no bloqueante

- No se implementó "asistencia de jornada" (nivel institucional, Prefectura/Secretaría) — fuera de alcance de este slice por instrucción explícita del Product Owner.
- El mensaje de éxito "Asistencia guardada." no muestra timestamp; desaparece en cuanto se vuelve a tocar un estado. No bloqueante.
- El seed usa credenciales de entorno local fijas (`demo1234`) — solo para Supabase local, nunca para un entorno remoto real.

## 7. Próxima acción concreta

Hugo revisa el PR de `feat/attendance-class-slice` (incluye este documento, la migración, el seed, las pruebas SQL/componente, y la UI) y decide si lo fusiona. No iniciar el siguiente módulo de asistencia (jornada institucional, M11 completo) hasta esa decisión.
