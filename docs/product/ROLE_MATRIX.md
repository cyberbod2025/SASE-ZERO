# Matriz de Roles y Permisos — SASE Zero

**Estado:** Propuesta de arquitectura funcional, pendiente de revisión del Product Owner.
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

---

## R1. Dirección

**Responsabilidad institucional:** indicadores, alertas, decisiones y seguimiento institucional de todo el plantel.
**Acceso por módulo:** M1 Consulta y administración de alta nivel, M2 Total (consulta), M3 Total, M4 Consulta institucional, M5 Consulta, M6 Consulta institucional + escalamiento, M7 Consulta, M8 Consulta, M9 Consulta, M10 Total, M11 Consulta, M12 Consulta, M13/M14/M15 Consulta restringida (según §18, solo si se justifica necesidad institucional), M16 Total (vista institucional), M17 Total.
**Datos sensibles que puede ver:** indicadores agregados de D8–D10; acceso a casos individuales de esos dominios solo cuando la situación lo amerite (❓ ver pregunta abierta).
**Estado:** 🟢 §6 ("Dirección: indicadores, alertas, decisiones y seguimiento institucional").
**Pregunta abierta:** ❓ ¿Dirección tiene acceso directo a expedientes de salud/trabajo social individuales, o solo a indicadores agregados y resúmenes explicables generados por M17?

## R2. Subdirección

**Responsabilidad institucional:** apoyo a Dirección en la misma función de seguimiento institucional.
**Acceso por módulo:** 🔵 equivalente a Dirección (R1) salvo administración de configuración crítica (M3), que se propone restringida a Dirección.
**Estado:** 🔵 Inferencia de diseño — la fundación menciona "Subdirección" en la lista de roles (§6) pero no describe su función de forma diferenciada de Dirección.
**Pregunta abierta:** ❓ ¿Qué distingue operativamente a Subdirección de Dirección en SASE Zero?

## R3. Secretaría

**Responsabilidad institucional:** inscripción, matrícula, documentos, expediente administrativo del alumno.
**Acceso por módulo:** M4 Total, M5 Total, M9 Operativo, M10 Operativo (reportes administrativos), M3 Consulta (catálogos), M6 Consulta (para verificar estado del alumno), M16 Operativo (su propio panel).
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
**Acceso por módulo:** M6 Operativo (crear y dar seguimiento a incidencias), M7 Operativo (canalizar), M8 Operativo (citatorios derivados de incidencias), M4 Consulta, M16 Operativo.
**Datos sensibles que puede ver:** ninguno de D8/D9/D10 salvo lo estrictamente necesario si un caso propio fue canalizado de vuelta con información explícitamente compartida.
**Estado:** 🔵 Inferencia de diseño — Prefectura aparece en la lista de roles (§6) sin descripción de función explícita; se infiere su rol tradicional de disciplina/convivencia en una secundaria mexicana.
**Pregunta abierta:** ❓ confirmar el alcance funcional de Prefectura frente a Docentes tutores en el flujo de incidencias (ver `CORE_WORKFLOWS.md`).

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

**Responsabilidad institucional:** BAP, apoyos, ajustes y seguimiento especializado.
**Acceso por módulo:** M15 Total, M6 Consulta + Canalizado, M7 Operativo, M12 Consulta (para coordinar ajustes académicos), M4 Consulta.
**Datos sensibles que puede ver:** D10 en su totalidad; D7 en lo relacionado a ajustes acordados; D8/D9 solo si fue compartido explícitamente.
**Estado:** 🟢 §6.

## R11. Personal administrativo autorizado

**Responsabilidad institucional:** funciones administrativas generales no cubiertas por Secretaría (p. ej. configuración operativa, soporte a Dirección).
**Acceso por módulo:** 🔵 depende de la función específica asignada; se propone que este rol no tenga un perfil de acceso único sino un conjunto de permisos configurables caso por caso, siempre dentro de M1/M3.
**Estado:** 🟢 rol citado literalmente (§6) sin función detallada. 🟡 Propuesta de tratamiento como rol configurable en vez de perfil fijo.
**Pregunta abierta:** ❓ ¿Qué funciones administrativas concretas cubre este rol que no cubran ya Secretaría o Dirección?

---

## Matriz resumida de acceso a dominios sensibles (D8, D9, D10)

| Rol | D8 Salud | D9 Trabajo Social | D10 Orientación/UDEEI |
|---|---|---|---|
| Dirección | Indicadores agregados ❓ | Indicadores agregados ❓ | Indicadores agregados ❓ |
| Subdirección | Igual que Dirección ❓ | Igual que Dirección ❓ | Igual que Dirección ❓ |
| Secretaría | Ninguno | Ninguno | Ninguno |
| Docentes | Alertas generales (opcional) | Ninguno | Alertas generales (opcional) |
| Docentes tutores | Alertas generales (opcional) | Alertas generales (opcional) | Alertas generales (opcional) |
| Prefectura | Ninguno salvo compartido | Ninguno salvo compartido | Ninguno salvo compartido |
| Orientación | Indicadores generales | Solo si compartido | Total |
| Trabajo Social | Solo si compartido | Total | Solo si compartido |
| Salud/enfermería | Total | Solo si compartido | Solo si compartido |
| UDEEI | Solo si compartido | Solo si compartido | Total |

Esta tabla operacionaliza el principio del §18 ("protección especial para información de salud, violencia, orientación y datos privados") como reglas de permisos verificables. 🟡 Propuesta — sujeta a validación del Product Owner, especialmente en las celdas marcadas ❓.

**Nota sobre "(opcional)" en esta tabla:** las alertas básicas determinísticas de M17 son capacidad núcleo de SASE (decisión del Product Owner, revisión del PR #1; ver `M17` en `MODULE_CATALOG.md`). Lo opcional en las celdas "Alertas generales (opcional)" es específicamente el cruce con dominios sensibles (D8/D9/D10), que pertenece a la capa de ampliación opcional de M17 y requiere activación explícita del plantel dentro de los límites de permisos.

## Preguntas abiertas consolidadas

1. ❓ Alcance de acceso de Dirección/Subdirección a expedientes individuales de D8/D9/D10 vs. solo indicadores agregados.
2. ❓ Diferenciación funcional real entre Dirección y Subdirección.
3. ❓ Alcance funcional de Prefectura frente a Docentes tutores.
4. ❓ Definición concreta de "personal administrativo autorizado".
5. ❓ ¿Puede un usuario tener más de un rol? (heredada de `DOMAIN_MAP.md`, con impacto directo en esta matriz).

## Validación de este documento

- Todos los roles corresponden literalmente a los citados en la fundación §6; no se inventaron roles nuevos.
- Toda restricción de datos sensibles cita el principio del §18.
- Las celdas sin fundamento textual directo están marcadas como inferencia o propuesta, nunca presentadas como decisión final.
