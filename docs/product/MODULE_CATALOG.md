# Catálogo de Módulos — SASE Zero

**Estado:** Propuesta de arquitectura funcional, pendiente de revisión del Product Owner.
**Fuente de precedencia:** [`docs/foundation/PRODUCT_FOUNDATION.md`](../foundation/PRODUCT_FOUNDATION.md).

Se relaciona con: [`docs/domains/DOMAIN_MAP.md`](../domains/DOMAIN_MAP.md) (cada módulo implementa uno o más dominios), [`docs/product/ROLE_MATRIX.md`](ROLE_MATRIX.md), [`docs/product/CORE_WORKFLOWS.md`](CORE_WORKFLOWS.md), [`docs/product/PRODUCT_MAP.md`](PRODUCT_MAP.md).

## Leyenda

Misma leyenda que `DOMAIN_MAP.md`: 🟢 hecho aprobado, 🔵 inferencia de diseño, 🟡 propuesta, ❓ pregunta abierta.

## Cómo leer este catálogo

Un **módulo** es una unidad funcional con la que un rol interactúa directamente: tiene pantallas, acciones y datos propios, pero se apoya en uno o más dominios para su significado institucional. Un módulo puede ser **núcleo** (parte del estándar de SASE, no desactivable sin razón mayor) u **opcional** (activable por institución según §9.1 de la fundación).

Por el principio de profundidad funcional (§10 de la fundación), cada módulo listado abajo debe considerar, cuando aplique: creación, edición, permisos, consulta, búsqueda, filtros, historial, evidencias, responsables, notificaciones, documentos, reportes, exportación, auditoría, cierre, casos excepcionales, experiencia móvil y accesibilidad. Este catálogo no repite esa lista en cada módulo; la referencia aquí basta como regla general — 🟢 hecho aprobado (§10).

## Vista general

| # | Módulo | Dominio(s) principal(es) | Tipo | Núcleo/Opcional |
|---|---|---|---|---|
| M1 | Gestión de Identidad y Permisos | D1 | Plataforma | Núcleo |
| M2 | Auditoría y Bitácora | D2 | Plataforma | Núcleo |
| M3 | Configuración del Plantel | D3 | Plataforma | Núcleo |
| M4 | Expediente del Alumno | D4 | Producto | Núcleo |
| M5 | Matrícula y Movimientos | D4 | Producto | Núcleo |
| M6 | Casos e Incidencias | D5 | Producto | Núcleo |
| M7 | Canalización entre Áreas | D5 | Producto | Núcleo |
| M8 | Citatorios y Acuerdos | D5, D6 | Producto | Núcleo |
| M9 | Generador de Documentos Institucionales | D6 | Producto | Núcleo |
| M10 | Reportes y Exportación | D6, D2 | Producto | Núcleo |
| M11 | Asistencia y Desempeño | D7 | Producto | Núcleo |
| M12 | Tutoría y Convivencia | D7, D5 | Producto | Núcleo |
| M13 | Salud Escolar | D8 | Producto | Opcional por rol/plantel |
| M14 | Trabajo Social | D9 | Producto | Opcional por rol/plantel |
| M15 | Orientación y UDEEI | D10 | Producto | Opcional por rol/plantel |
| M16 | Panel de Pendientes | D5, D7, D11 | Experiencia | Núcleo |
| M17 | Alertas Institucionales | D11 | Producto | Núcleo (alertas básicas) + ampliación IA opcional |
| M18 | Administración Multiescuela | D12 | Plataforma | Etapa futura |

---

## M1. Gestión de Identidad y Permisos
**Dominio:** D1. **Responsabilidad:** alta de usuarios institucionales, asignación de roles (incluyendo múltiples roles por usuario), permisos por rol, contexto de acción y control de sesión.
**Depende de:** ninguno. **Del que dependen:** todos los demás módulos.
**Estado:** 🟢 §6, §18.
**Nota de decisión:** por [`ADR-0002`](../decisions/ADR-0002-USUARIOS-CON-MULTIPLES-ROLES.md), este módulo modela multi-rol con contexto de acción (institución, rol activo, grupo, área, caso asignado, motivo de acceso cuando corresponda); los permisos no se suman de manera indiscriminada y los roles multiescuela son un conjunto distinto de los roles de plantel.

## M2. Auditoría y Bitácora
**Dominio:** D2. **Responsabilidad:** mostrar y conservar el historial de acciones sobre cualquier registro; no editable por la escuela.
**Depende de:** M1 (identidad del actor). **Del que dependen:** ninguno funcionalmente, pero valida a todos.
**Estado:** 🟢 §18, §9.2.

## M3. Configuración del Plantel
**Dominio:** D3. **Responsabilidad:** nombre, logotipo, áreas visibles, turnos, catálogos, plantillas, módulos activos por institución.
**Depende de:** M1. **Del que dependen:** M4–M17 (leen su configuración vigente).
**Estado:** 🟢 §9.1.
**Pregunta abierta:** ❓ quién puede modificar catálogos dentro del plantel.

## M4. Expediente del Alumno
**Dominio:** D4. **Responsabilidad:** vista única del alumno: datos personales, historial, grupo, y enlaces a los módulos que tienen información asociada a él (según permisos del rol que consulta).
**Depende de:** M1, M3. **Del que dependen:** M6, M8, M9, M11, M12, M13, M14, M15.
**Estado:** 🟢 §2, §5.
**Nota de decisión:** la relación con expedientes previos de otros proyectos del Product Owner quedó resuelta en [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md) — reconstrucción independiente; trabajo previo consultable como referencia, no fuente canónica.

## M5. Matrícula y Movimientos
**Dominio:** D4. **Responsabilidad:** alta oficial, inscripción, cambios de grupo, bajas y movimientos administrativos del alumno dentro del plantel.
**Depende de:** M1, M3, M4. **Del que dependen:** M9 (documentos derivados de movimientos), M10.
**Estado:** 🔵 Inferencia de diseño — la fundación menciona "control escolar" y "expediente digital" como componentes integrados (§2) pero no detalla el proceso de alta; se infiere como módulo necesario para que D4 tenga ciclo de vida completo.
**Nota de decisión:** por [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md), este módulo se diseña de forma independiente; los flujos de admisión de proyectos previos son consultables como referencia tras auditoría, sin importarse automáticamente. El detalle del flujo permanece conceptual en `F6` de `CORE_WORKFLOWS.md` hasta esa auditoría.

## M6. Casos e Incidencias
**Dominio:** D5. **Responsabilidad:** abrir, dar seguimiento y cerrar casos institucionales con contexto, responsable, estado, evidencia e historial.
**Depende de:** M1, M3, M4. **Del que dependen:** M7, M8, M9, M16, M17.
**Estado:** 🟢 §3.

## M7. Canalización entre Áreas
**Dominio:** D5 (y su relación con D8, D9, D10). **Responsabilidad:** transferir un caso de un área a otra sin perder contexto ni historial.
**Depende de:** M6. **Del que dependen:** M13, M14, M15 (reciben canalizaciones).
**Estado:** 🟢 §1 ("casos que cambian de área sin continuidad" como problema a resolver), §3.

## M8. Citatorios y Acuerdos
**Dominio:** D5, D6. **Responsabilidad:** generar citatorios a familias, registrar acuerdos y su cumplimiento o vencimiento.
**Depende de:** M6, M9. **Del que dependen:** M16, M17 (citatorios sin respuesta, acuerdos vencidos).
**Estado:** 🟢 "citatorios... acuerdos" listados como documentos que SASE debe generar (§8); "citatorios sin respuesta" y "acuerdos vencidos" como señales de prevención (§15).

## M9. Generador de Documentos Institucionales
**Dominio:** D6. **Responsabilidad:** producir actas, constancias, oficios, fichas de seguimiento, informes y formatos institucionales con folio, fecha, responsables y firmas, con versión imprimible/exportable.
**Depende de:** M1, M3, M4. **Del que dependen:** M6, M8, M10, M13, M14, M15.
**Estado:** 🟢 §8.

## M10. Reportes y Exportación
**Dominio:** D6, D2. **Responsabilidad:** reportes estadísticos y exportación administrativa de información institucional, incluyendo exportación completa a solicitud de la institución (portabilidad de datos).
**Depende de:** M9, M2. **Del que dependen:** ninguno.
**Estado:** 🟢 §8 (reportes estadísticos y exportaciones administrativas); §13 (portabilidad y exportación de datos de la institución).

## M11. Asistencia y Desempeño
**Dominio:** D7. **Responsabilidad:** registro de asistencia, retardos y desempeño observado por docentes.
**Depende de:** M1, M3, M4. **Del que dependen:** M12, M16, M17.
**Estado:** 🔵 Inferencia de diseño a partir de "asistencia... desempeño" citados en el contexto de seguimiento (§6 estructura de roles; §15 "aumento de inasistencias" como señal de prevención).
**Pregunta abierta:** ❓ si este módulo se divide por materia/periodo o se maneja a nivel de jornada.

## M12. Tutoría y Convivencia
**Dominio:** D7, D5. **Responsabilidad:** seguimiento de convivencia y evolución del alumno desde la función de tutoría; puede originar casos en M6.
**Depende de:** M4, M11. **Del que dependen:** M6 (origina casos), M17.
**Estado:** 🟢 "asistencia, desempeño, convivencia y evolución del alumno" en el ámbito de docentes/tutoría (§6, redacción de estructura de roles).

## M13. Salud Escolar
**Dominio:** D8. **Responsabilidad:** antecedentes médicos y alertas de salud, con acceso restringido y protección especial.
**Depende de:** M1, M4, M7 (recibe canalizaciones). **Del que dependen:** M9 (informes de salud), M17 (bajo restricción especial).
**Estado:** 🟢 rol "Servicios de salud o enfermería" (§6); protección especial explícita (§18).
**Regla explícita:** este módulo nunca debe alimentar vistas de credencial o información pública del alumno (principio general de separación de información sensible, §18).

## M14. Trabajo Social
**Dominio:** D9. **Responsabilidad:** contexto familiar, intervenciones y acuerdos derivados, con acceso restringido.
**Depende de:** M1, M4, M7. **Del que dependen:** M9, M17 (bajo restricción especial).
**Estado:** 🟢 rol "Trabajo Social" (§6); protección especial de información privada/familiar (§18).

## M15. Orientación y UDEEI
**Dominio:** D10. **Responsabilidad:** valoraciones de apoyo especializado, ajustes acordados y seguimiento BAP o equivalente.
**Depende de:** M1, M4, M7. **Del que dependen:** M9, M12 (ajustes que impactan seguimiento académico), M17.
**Estado:** 🟢 roles "Orientación" y "UDEEI o apoyo equivalente" (§6). 🔵 terminología BAP es inferencia, no está en la fundación.

## M16. Panel de Pendientes
**Dominio:** transversal sobre D5, D7, D11. **Responsabilidad:** responder, para cada rol, "qué tengo pendiente" y "qué requiere atención hoy" con la información que su rol puede ver.
**Depende de:** M1, M6, M11, M17. **Del que dependen:** ninguno; es la puerta de entrada operativa diaria.
**Estado:** 🟢 preguntas operativas de la experiencia de usuario listadas explícitamente (§17).

## M17. Alertas Institucionales
**Dominio:** D11. **Responsabilidad:** generar señales explicables a partir de evidencia en otros módulos; nunca etiqueta al alumno. Tiene dos capas, por decisión del Product Owner registrada en la revisión del PR #1 (2026-07-27):

- **Capa básica (núcleo, configurable y supervisada):** alertas determinísticas basadas en reglas observables — casos sin responsable, seguimientos vencidos, citatorios sin respuesta, acuerdos vencidos, acumulación observable de incidencias. La institución puede configurar umbrales y destinatarios dentro de límites seguros, pero la capacidad básica de seguimiento preventivo no puede desaparecer.
- **Capa de ampliación por IA (opcional):** análisis avanzado mediante IA, resúmenes generativos, detección probabilística de patrones, sugerencias asistidas y cruces avanzados entre dominios sensibles. Desactivar esta capa no desactiva la capa básica.

**Depende de:** M6, M8, M11, M12 (capa básica); M13\*, M14\*, M15\* (\*solo la capa de ampliación, si el plantel activa cruce con dominios sensibles, sujeto a permisos). **Del que dependen:** M16.
**Estado:** 🟢 §15 (prevención basada en evidencia, capacidad central) y §14 (IA opcional y supervisada) — incluye la prohibición explícita de "alumno problemático", "alumno peligroso", "alumno de alto riesgo" o diagnósticos no autorizados.
**Regla explícita:** ambas capas son de solo lectura; no pueden cerrar casos, sancionar, ni modificar registros de forma autónoma (§14).

## M18. Administración Multiescuela
**Dominio:** D12. **Responsabilidad:** gestión de más de una institución bajo una misma cuenta y, eventualmente, supervisión regional.
**Depende de:** M1, M3. **Del que dependen:** ninguno en la primera versión.
**Estado:** 🟡 Propuesta, etapa futura — no debe implementarse en el MVP pero M1 y M3 deben diseñarse para no bloquearlo (§5, §19).

---

## Reglas transversales del catálogo

- 🟢 Todo módulo que toque D8, D9 o D10 hereda la restricción de protección especial del §18 y debe excluirse explícitamente de vistas de credencial o consulta pública del alumno.
- 🟢 Ningún módulo puede activar automatización irreversible sin confirmación humana (§25, límites iniciales).
- Decisión del Product Owner (revisión del PR #1): la capa básica de M17 es núcleo y no puede desactivarse; solo su ampliación por IA es opcional por institución. La desactivación de la IA no afecta el funcionamiento de M6–M16 ni de las alertas básicas.

## Preguntas abiertas consolidadas

1. ❓ Granularidad de M11 (Asistencia): por materia/periodo o por jornada.
2. ❓ Terminología oficial vs. configurable de M15 (UDEEI/BAP).
3. ❓ Quién administra catálogos/plantillas de M3 dentro del plantel (heredada de `DOMAIN_MAP.md`).

La antigua pregunta sobre el origen del flujo de M5 frente a trabajo previo del Product Owner fue resuelta mediante [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md).

## Validación de este documento

- Cada módulo referencia un dominio existente en `DOMAIN_MAP.md`; no se introducen dominios nuevos.
- Ningún módulo requiere una decisión de stack técnico para quedar definido.
- Las restricciones explícitas de la fundación (§14, §15, §18) se propagan a los módulos que tocan datos sensibles.
