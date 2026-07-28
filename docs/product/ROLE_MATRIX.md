# Matriz de Roles y Permisos — SASE Zero

**Estado:** Línea base de arquitectura funcional cerrada y aprobada.
**Fuente de precedencia:** [`docs/foundation/PRODUCT_FOUNDATION.md`](../foundation/PRODUCT_FOUNDATION.md) §6, §17, §18.

Se relaciona con: [`docs/domains/DOMAIN_MAP.md`](../domains/DOMAIN_MAP.md), [`docs/product/MODULE_CATALOG.md`](MODULE_CATALOG.md), [`docs/product/CORE_WORKFLOWS.md`](CORE_WORKFLOWS.md).

## Leyenda

Misma leyenda que los documentos anteriores: 🟢 hecho aprobado, 🔵 inferencia de diseño, 🟡 propuesta, ❓ pregunta abierta.

Niveles de acceso usados en esta matriz:

| Nivel | Significado |
|---|---|
| **Total** | Crear, editar, consultar, cerrar. |
| **Operativo** | Crear y editar dentro de su ámbito; no administra configuración ni permisos ajenos. |
| **Consulta** | Solo lectura, dentro de su ámbito. |
| **Canalizado** | Solo lo que le fue canalizado o asignado explícitamente. |
| **Ninguno** | Sin acceso; el módulo no aparece para este rol. |

Los roles listados provienen literalmente de la fundación (§6): Dirección, Subdirección, Docentes, Docentes tutores, Prefectura, Orientación, Trabajo Social, Servicios de salud o enfermería, Secretaría, UDEEI o apoyo equivalente, y personal administrativo autorizado — 🟢 hecho aprobado.

## Principio rector heredado

> "No todos los usuarios deben ver toda la información." — Fundación §6.
> "Mínimo privilegio, separación por institución, separación por rol... protección especial para información de salud, violencia, orientación y datos privados." — Fundación §18.

**Multi-rol (decisión [`ADR-0002`](../decisions/ADR-0002-USUARIOS-CON-MULTIPLES-ROLES.md)):** un usuario puede tener varios de los roles de esta matriz dentro de una misma institución. Esta matriz se lee por **rol activo en contexto**, no como suma de los roles de la persona: cada acción registra institución, rol activo, grupo, área, caso asignado y motivo de acceso cuando corresponda, y la auditoría conserva con qué rol se consultó o modificó cada información. Una canalización concede acceso limitado al caso, no al expediente completo. Los roles multiescuela serán un conjunto distinto de los roles de plantel aquí listados.

---

## R1. Dirección

**Responsabilidad institucional:** indicadores, alertas, decisiones y seguimiento institucional de todo el plantel.
**Acceso por módulo:** M1 Consulta y administración de alta nivel, M2 Total (consulta), M3 Total, M4 Consulta institucional, M5 Consulta, M6 Consulta institucional + escalamiento, M7 Consulta, M8 Consulta, M9 Consulta, M10 Total, M11 Consulta, M12 Consulta, M13/M14/M15 indicadores agregados por defecto e individual solo por caso conforme a la regla siguiente, M16 Total (vista institucional), M17 Total.
**Datos sensibles que puede ver — decisión final del Product Owner (2026-07-28):** indicadores agregados de D8–D10 por defecto. El acceso a información individual de Salud, Trabajo Social u Orientación solo se permite sobre un caso concreto, por necesidad institucional justificada, con motivo registrado, alcance mínimo y auditoría. No existe navegación general por expedientes sensibles.
**Estado:** 🟢 §6 ("Dirección: indicadores, alertas, decisiones y seguimiento institucional"); decisión de privacidad aprobada en el cierre consolidado.

## R2. Subdirección

**Responsabilidad institucional:** apoyo a Dirección en la misma función de seguimiento institucional.
**Acceso por módulo:** equivalente a Dirección (R1) salvo administración de configuración crítica (M3), reservada a Dirección. Le aplica la misma decisión final de privacidad de R1 sobre datos sensibles.
**Estado:** 🔵 Inferencia de diseño — la fundación menciona "Subdirección" (§6) sin diferenciarla de Dirección.
**Resolución de cierre (2026-07-28):** este default queda adoptado; la diferenciación fina entre ambos roles se resuelve en prototipado.

## R3. Secretaría

**Responsabilidad institucional:** inscripción, matrícula, documentos, expediente administrativo del alumno.
**Acceso por módulo:** M4 Total, M5 Total, M9 Operativo, M10 Operativo (reportes administrativos), M3 Consulta (catálogos), M6 Consulta (para verificar estado del alumno), M11 Operativo para asistencia institucional de jornada según permisos, M16 Operativo (su propio panel).
**Datos sensibles que puede ver:** ninguno de D8/D9/D10 salvo que un dato de contacto o administrativo básico sea explícitamente parte del expediente (D4), no del contenido clínico o social.
**Estado:** 🟢 §6 ("Secretaría: inscripción, matrícula, documentos, expediente").

## R4. Docentes

**Responsabilidad institucional:** asistencia, desempeño y convivencia del alumno en su ámbito de clase.
**Acceso por módulo:** M11 Operativo (su grupo/materia), M12 Consulta, M4 Consulta (solo alumnos de sus grupos), M6 Canalizado (puede reportar/originar, no administrar casos ajenos), M16 Operativo (su propio panel).
**Datos sensibles que puede ver:** ninguno de D8/D9/D10 salvo alertas generales explicables sin contenido clínico (a través de M17, si el plantel lo habilita).
**Estado:** 🟢 §6 ("docentes y tutoría: asistencia, desempeño, convivencia y evolución del alumno").

## R5. Docentes tutores

**Responsabilidad institucional:** igual que Docentes, con responsabilidad adicional de seguimiento longitudinal del grupo tutorado y primer punto de contacto para convivencia.
**Acceso por módulo:** M11 Operativo, M12 Operativo (su grupo tutorado), M4 Consulta (su grupo), M6 Operativo dentro de su grupo (puede abrir y dar seguimiento a casos), M7 Operativo (puede iniciar canalización), M8 Operativo, M16 Operativo.
**Datos sensibles que puede ver:** igual que Docentes; puede recibir resúmenes explicables de M17 relacionados con su grupo.
**Estado:** 🟢 §6.

## R6. Prefectura

**Responsabilidad institucional:** disciplina y convivencia cotidiana; suele ser el primer registro de una incidencia.
**Acceso por módulo:** M6 Operativo (crear y dar seguimiento a incidencias), M7 Operativo (canalizar), M8 Operativo (citatorios derivados de incidencias), M4 Consulta, M11 Operativo para asistencia institucional de jornada según permisos, M16 Operativo.
**Datos sensibles que puede ver:** ninguno de D8/D9/D10 salvo lo estrictamente necesario si un caso propio fue canalizado de vuelta con información explícitamente compartida.
**Estado:** 🔵 Inferencia de diseño — Prefectura aparece en la lista de roles (§6) sin descripción de función explícita; se infiere su rol tradicional de disciplina/convivencia en una secundaria mexicana.
**Resolución de cierre (2026-07-28):** tanto Prefectura como Docentes tutores pueden originar casos; la responsabilidad depende de la asignación del caso, no de quién lo abrió. La distribución específica entre ambos roles es configurable por plantel y se afina en el piloto.

## R7. Orientación

**Responsabilidad institucional:** contexto y apoyo psicopedagógico; interviene en casos canalizados por convivencia o académicos.
**Acceso por módulo:** M15 Total (dentro de Orientación/UDEEI), M6 Consulta + Canalizado, M7 Operativo, M12 Consulta, M4 Consulta.
**Datos sensibles que puede ver:** D10 en su totalidad; D9 solo si fue compartido explícitamente en una canalización; D8 solo indicadores generales, no historial clínico completo.
**Estado:** 🟢 §6.

## R8. Trabajo Social

**Responsabilidad institucional:** contexto familiar, intervenciones y acuerdos con familias.
**Acceso por módulo:** M14 Total, M6 Consulta + Canalizado, M7 Operativo, M8 Operativo, M4 Consulta.
**Datos sensibles que puede ver:** D9 en su totalidad; D8 solo si fue compartido explícitamente; D10 solo si fue compartido explícitamente.
**Estado:** 🟢 §6.

## R9. Servicios de salud o enfermería

**Responsabilidad institucional:** antecedentes y alertas de salud.
**Acceso por módulo:** M13 Total, M6 Consulta + Canalizado, M7 Operativo, M4 Consulta (solo datos generales, no académicos/disciplinarios detallados).
**Datos sensibles que puede ver:** D8 en su totalidad; D9/D10 solo si fue compartido explícitamente.
**Estado:** 🟢 §6, §18 (protección especial explícita para información de salud).

## R10. UDEEI o apoyo equivalente

**Responsabilidad institucional:** apoyos, ajustes acordados y seguimiento especializado.
**Acceso por módulo:** M15 Total, M6 Consulta + Canalizado, M7 Operativo, M12 Consulta (para coordinar ajustes académicos), M4 Consulta.
**Datos sensibles que puede ver:** D10 en su totalidad; D7 en lo relacionado a ajustes acordados; D8/D9 solo si fue compartido explícitamente.
**Estado:** 🟢 §6.

## R11. Personal administrativo autorizado

**Responsabilidad institucional:** funciones administrativas generales no cubiertas por Secretaría (p. ej. configuración operativa, soporte a Dirección).
**Acceso por módulo:** conjunto de permisos configurables caso por caso, siempre dentro de M1/M3; no es un perfil rígido.
**Estado:** 🟢 rol citado literalmente (§6) sin función detallada.
**Resolución de cierre (2026-07-28):** el tratamiento como conjunto configurable de permisos queda adoptado; las funciones concretas se asignan mediante configuración institucional del MVP.

---

## Matriz resumida de acceso a dominios sensibles (D8, D9, D10)

| Rol | D8 Salud | D9 Trabajo Social | D10 Apoyos Especializados |
|---|---|---|---|
| Dirección | Agregados; individual solo por caso justificado, con motivo, alcance mínimo y auditoría | Agregados; individual solo por caso justificado, con motivo, alcance mínimo y auditoría | Agregados; individual solo por caso justificado, con motivo, alcance mínimo y auditoría |
| Subdirección | Igual que Dirección | Igual que Dirección | Igual que Dirección |
| Secretaría | Ninguno | Ninguno | Ninguno |
| Docentes | Alertas generales (opcional) | Ninguno | Alertas generales (opcional) |
| Docentes tutores | Alertas generales (opcional) | Alertas generales (opcional) | Alertas generales (opcional) |
| Prefectura | Ninguno salvo compartido | Ninguno salvo compartido | Ninguno salvo compartido |
| Orientación | Indicadores generales | Solo si compartido | Total |
| Trabajo Social | Solo si compartido | Total | Solo si compartido |
| Salud/enfermería | Total | Solo si compartido | Solo si compartido |
| UDEEI | Solo si compartido | Solo si compartido | Total |

Esta tabla operacionaliza el principio del §18 ("protección especial para información de salud, violencia, orientación y datos privados") como reglas de permisos verificables. Las filas de Dirección/Subdirección reflejan la decisión final de privacidad del Product Owner (cierre consolidado, 2026-07-28): no existe navegación general por expedientes sensibles.

**Nota sobre "(opcional)" en esta tabla:** las alertas básicas determinísticas de M17 son capacidad núcleo de SASE (decisión del Product Owner, revisión del PR #1; ver `M17` en `MODULE_CATALOG.md`). Lo opcional en las celdas "Alertas generales (opcional)" es específicamente el cruce con dominios sensibles (D8/D9/D10), que pertenece a la capa de ampliación opcional de M17 y requiere activación explícita del plantel dentro de los límites de permisos.

## Cierre de la fase

Todas las preguntas abiertas de esta matriz quedaron resueltas: multi-rol mediante [`ADR-0002`](../decisions/ADR-0002-USUARIOS-CON-MULTIPLES-ROLES.md); el acceso de Dirección/Subdirección a datos sensibles por decisión final del Product Owner (cierre consolidado, 2026-07-28); y la diferenciación Dirección/Subdirección, el reparto Prefectura/tutores y el personal administrativo mediante defaults reversibles o configuración con su fase futura indicada (prototipado, piloto, configuración del MVP). Consolidado en `PRODUCT_MAP.md` §10.

## Validación de este documento

- Todos los roles corresponden literalmente a los citados en la fundación §6; no se inventaron roles nuevos.
- Toda restricción de datos sensibles cita el principio del §18 o la decisión final de privacidad del Product Owner.
- Los defaults adoptados en el cierre están marcados como resoluciones de cierre, no como hechos de la fundación.
