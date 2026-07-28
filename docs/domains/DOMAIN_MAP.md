# Mapa de Dominios — SASE Zero

**Estado:** Propuesta de arquitectura funcional, pendiente de revisión del Product Owner.
**Fuente de precedencia:** [`docs/foundation/PRODUCT_FOUNDATION.md`](../foundation/PRODUCT_FOUNDATION.md). Este documento no repite la fundación; la traduce en dominios institucionales verificables.

Se relaciona con: [`docs/product/PRODUCT_MAP.md`](../product/PRODUCT_MAP.md), [`docs/product/MODULE_CATALOG.md`](../product/MODULE_CATALOG.md), [`docs/product/ROLE_MATRIX.md`](../product/ROLE_MATRIX.md), [`docs/product/CORE_WORKFLOWS.md`](../product/CORE_WORKFLOWS.md).

## Leyenda

| Marca | Significado |
|---|---|
| 🟢 Hecho aprobado | Declarado explícitamente en la fundación (se cita la sección). |
| 🔵 Inferencia de diseño | Se deriva razonablemente de la fundación, pero no está escrito de forma literal. |
| 🟡 Propuesta | Decisión de diseño sugerida por este análisis; requiere confirmación del Product Owner. |
| ❓ Pregunta abierta | Requiere decisión o aclaración del Product Owner antes de avanzar. |

## Cómo leer este mapa

Un **dominio** agrupa responsabilidad, datos y reglas institucionales relacionadas. No es una pantalla ni una tabla de base de datos. Los **módulos** (`MODULE_CATALOG.md`) implementan uno o varios dominios. Los **roles** (`ROLE_MATRIX.md`) acceden a dominios según permisos. Los **flujos** (`CORE_WORKFLOWS.md`) atraviesan varios dominios en secuencia.

Cada dominio se describe con: propósito, datos que posee, nivel de sensibilidad, roles principales que interactúan, dependencias con otros dominios y estado (hecho / inferencia / propuesta).

## Vista general

| # | Dominio | Sensibilidad | Tipo |
|---|---|---|---|
| D1 | Identidad, Acceso y Permisos | Alta | Núcleo transversal |
| D2 | Auditoría y Trazabilidad | Alta | Núcleo transversal |
| D3 | Configuración Institucional | Media | Núcleo |
| D4 | Alumnado y Expediente Institucional | Alta | Núcleo |
| D5 | Casos y Seguimiento Institucional | Alta | Núcleo |
| D6 | Documentos, Evidencia y Reportes | Alta | Núcleo |
| D7 | Seguimiento Académico y Convivencia | Media-Alta | Operativo |
| D8 | Salud Escolar | Muy alta | Operativo, protección especial |
| D9 | Trabajo Social y Contexto Familiar | Muy alta | Operativo, protección especial |
| D10 | Orientación y Apoyos Especializados (UDEEI/BAP) | Muy alta | Operativo, protección especial |
| D11 | Inteligencia y Alertas Institucionales | Alta (deriva de otros dominios) | Transversal, sin autoridad de decisión |
| D12 | Administración Multiescuela | Media | Preparación estructural, etapa futura |

---

## D1. Identidad, Acceso y Permisos

**Propósito:** Representar quién puede entrar a SASE, con qué rol, en qué institución, y qué puede ver o hacer.

**Datos que posee:** cuentas de usuario institucional, roles asignados, permisos por rol, pertenencia a institución(es), estado de sesión, historial de accesos.

**Sensibilidad:** Alta — controla el acceso a todos los demás dominios; una falla aquí compromete a todos.

**Roles principales:** todos los roles dependen de este dominio para poder operar; su administración recae en Dirección/Subdirección y personal administrativo autorizado.

**Dependencias:** es prerrequisito de todos los demás dominios (D2–D12). No depende de ninguno.

**Estado:** 🟢 Hecho aprobado — "Cada rol deberá tener permisos específicos... y límites claros de acceso" y "No todos los usuarios deben ver toda la información" (Fundación §6); "mínimo privilegio, separación por institución, separación por rol... controles de sesión" (§18).

**Preguntas abiertas:**
- ❓ ¿Un usuario puede tener más de un rol simultáneo (p. ej. docente y tutor) o un rol combinado por institución?
- ❓ ¿Habrá roles a nivel de red multiescuela (D12) distintos de los roles de plantel?

---

## D2. Auditoría y Trazabilidad

**Propósito:** Registrar quién hizo qué, cuándo, sobre qué registro, y conservar el historial de cambios de forma inalterable.

**Datos que posee:** bitácora de acciones, historial de cambios por registro, registro de accesos, evidencia de decisiones.

**Sensibilidad:** Alta — es un dominio de control, no de operación directa; su integridad no debe ser configurable por la escuela.

**Roles principales:** consulta principalmente de Dirección; producido automáticamente por la acción de todos los roles sobre cualquier otro dominio.

**Dependencias:** observa a todos los demás dominios (D1, D3–D12) sin poseer sus datos operativos; no depende de ellos para existir, pero no tiene sentido sin ellos.

**Estado:** 🟢 Hecho aprobado — "registro de accesos, auditoría de acciones... trazabilidad de cambios" (§18); "auditoría; integridad del expediente... trazabilidad" listados como no alterables libremente por la escuela (§9.2).

---

## D3. Configuración Institucional

**Propósito:** Adaptar el núcleo estandarizado de SASE a cada plantel sin alterar su lógica interna: nombre, logotipo, nombres de áreas, turnos, catálogos, plantillas, módulos activos.

**Datos que posee:** datos del plantel, catálogos configurables (tipos de incidencia, nomenclaturas), turnos y horarios, módulos activos por institución, ciclo escolar vigente.

**Sensibilidad:** Media — no contiene datos personales de alumnos, pero define las reglas bajo las que operan los demás dominios.

**Roles principales:** Dirección/Subdirección y administración autorizada.

**Dependencias:** es leído por D3→D12 (todo dominio operativo consulta su configuración vigente); no depende de otros dominios operativos.

**Estado:** 🟢 Hecho aprobado — lista de "elementos configurables" y "elementos no alterables libremente" (§9.1, §9.2); "cada registro deberá pertenecer claramente a una institución y, cuando corresponda, a ciclo escolar, turno, grupo, área..." (§5).

**Preguntas abiertas:**
- ❓ ¿Quién dentro del plantel tiene permiso para modificar catálogos y plantillas: solo Dirección, o también Secretaría?

---

## D4. Alumnado y Expediente Institucional

**Propósito:** Ser el registro central del alumno como sujeto institucional: identidad, matrícula, grupo, historial de inscripción. Es la entidad a la que se conectan los demás dominios operativos.

**Datos que posee:** datos personales del alumno, historial de inscripciones y movimientos, grupo y turno asignados, estado de matrícula.

**Sensibilidad:** Alta — datos de identidad de menores de edad.

**Roles principales:** Secretaría (alta y mantenimiento del expediente), Dirección (consulta institucional), Docentes/tutores (consulta limitada a su grupo).

**Dependencias:** es referenciado por D5 (casos), D6 (documentos), D7 (seguimiento académico), D8 (salud), D9 (trabajo social), D10 (apoyos); no depende de ellos, pero sin este dominio los demás no tienen sujeto al cual asociarse.

**Estado:** 🟢 Hecho aprobado — "expediente digital" y "control escolar" como componentes integrados de SASE (§2); "cada registro deberá pertenecer claramente a... alumno, caso o expediente" (§5).

**Nota de decisión:** la relación de este dominio con expedientes construidos en proyectos previos del Product Owner quedó resuelta en [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md): SASE Zero es una reconstrucción independiente; el trabajo previo es consultable como referencia, no fuente canónica.

---

## D5. Casos y Seguimiento Institucional

**Propósito:** Sostener la promesa central de SASE: que ninguna situación relevante de un alumno se pierda entre áreas. Cubre incidencias, seguimientos, canalizaciones entre áreas y su cierre documentado.

**Datos que posee:** casos institucionales (contexto, responsable, estado, evidencia asociada, historial, siguiente acción, fecha de seguimiento, áreas involucradas), canalizaciones entre áreas, acuerdos derivados, cierre documentado.

**Sensibilidad:** Alta — puede incluir información de convivencia, salud o contexto familiar por referencia a otros dominios; un caso concreto puede tocar información de D8, D9 o D10 sin duplicarla.

**Roles principales:** Prefectura, Orientación, Trabajo Social, Docentes tutores, Dirección (visibilidad institucional), UDEEI (según canalización).

**Dependencias:** referencia a D4 (alumno del caso), puede vincular evidencia de D6, puede originar tareas de seguimiento en D7, y puede canalizar hacia D8/D9/D10 según el tipo de situación.

**Estado:** 🟢 Hecho aprobado — "cada situación institucional relevante deberá contar con contexto, responsable, estado, evidencia, historial, siguiente acción, fecha de seguimiento, áreas involucradas, trazabilidad y cierre documentado" (§3); "casos que cambian de área sin continuidad" listado como problema a resolver (§1).

**Preguntas abiertas:**
- ❓ ¿Existe una taxonomía institucional ya definida de tipos de caso/incidencia, o debe proponerse como catálogo configurable inicial (§9.1)?

---

## D6. Documentos, Evidencia y Reportes Institucionales

**Propósito:** Generar, almacenar y versionar la documentación oficial que nace en SASE (citatorios, actas, constancias, oficios, informes) y la evidencia adjunta a casos y expedientes, evitando trabajo duplicado en Word/Excel.

**Datos que posee:** documentos generados y sus metadatos (folio, fecha, responsables, firmas, versión), archivos de evidencia adjuntos, plantillas institucionales, reportes estadísticos exportables.

**Sensibilidad:** Alta — puede contener el mismo nivel de sensibilidad que el dominio de origen del documento (p. ej. un informe de salud hereda la sensibilidad de D8).

**Roles principales:** todos los roles que generan documentación dentro de su ámbito; Secretaría como responsable de documentación administrativa.

**Dependencias:** se adjunta a D4 (expediente), D5 (casos), D7, D8, D9, D10 según el origen del documento; usa plantillas definidas en D3.

**Estado:** 🟢 Hecho aprobado — "el documento nace en SASE, queda registrado en SASE y puede imprimirse o exportarse cuando sea necesario" (§8).

---

## D7. Seguimiento Académico y Convivencia

**Propósito:** Registrar y dar seguimiento al desempeño, asistencia y evolución de convivencia del alumno a lo largo del ciclo escolar, principalmente desde la función docente y de tutoría.

**Datos que posee:** registros de asistencia, retardos, desempeño observado, evolución de convivencia, intervenciones de tutoría.

**Sensibilidad:** Media-alta — datos de comportamiento y desempeño de menores.

**Roles principales:** Docentes, Docentes tutores; consulta de Dirección y Orientación.

**Dependencias:** referencia a D4 (alumno); puede originar casos en D5; puede alimentar D11 (patrones observables para alertas).

**Estado:** 🟢 Hecho aprobado — "asistencia, desempeño, convivencia y evolución del alumno" listado explícitamente entre las funciones de docentes/tutoría (§6, redactado como parte de la estructura escolar); "ausencias frecuentes... cambios relevantes en patrones observables" como insumo de prevención (§15).

**Preguntas abiertas:**
- ❓ ¿La asistencia se maneja como parte de este dominio o como un dominio propio con reglas de captura distintas (pase de lista por periodo/materia)?

---

## D8. Salud Escolar

**Propósito:** Registrar antecedentes médicos relevantes y alertas de salud del alumno para apoyar decisiones institucionales, bajo protección especial.

**Datos que posee:** antecedentes médicos declarados, alertas de salud, seguimiento de servicios de enfermería/salud escolar.

**Sensibilidad:** Muy alta — la fundación exige "protección especial para información de salud" (§18) de forma explícita y separada de otros datos sensibles.

**Roles principales:** Servicios de salud/enfermería; visibilidad restringida para el resto de roles salvo necesidad justificada.

**Dependencias:** referencia a D4; puede originar o recibir canalizaciones de D5; nunca debe exponerse en credenciales o vistas públicas del alumno (regla heredada del principio general de separación de información sensible, §18).

**Estado:** 🟢 Hecho aprobado — rol "Servicios de salud o enfermería" (§6); "protección especial para información de... salud" (§18).

---

## D9. Trabajo Social y Contexto Familiar

**Propósito:** Registrar el contexto familiar y socioeconómico relevante, intervenciones de Trabajo Social y acuerdos familiares derivados.

**Datos que posee:** contexto familiar, intervenciones, acuerdos familiares, seguimiento de Trabajo Social.

**Sensibilidad:** Muy alta — información familiar y socioeconómica de menores, con protección especial equivalente a la de salud según el principio general del §18.

**Roles principales:** Trabajo Social; visibilidad restringida.

**Dependencias:** referencia a D4; se relaciona con D5 (casos que requieren intervención social) y D6 (acuerdos documentados).

**Estado:** 🟢 Hecho aprobado — rol "Trabajo Social" (§6); "contexto familiar, intervenciones y acuerdos" descrito para esta área en el ámbito de trabajo coordinado (implícito en §6, desarrollado en la visión de largo plazo referenciada por `README.md`).

**Preguntas abiertas:**
- ❓ ¿Qué tan separado debe estar este dominio de D8 (Salud) en términos de permisos — visibilidad cruzada nunca, parcial bajo justificación, o solo bajo autorización de Dirección?

---

## D10. Orientación y Apoyos Especializados (UDEEI/BAP)

**Propósito:** Registrar necesidades de apoyo especializado, ajustes razonables y seguimiento de Barreras para el Aprendizaje y la Participación (BAP) u equivalente.

**Datos que posee:** valoraciones de apoyo, ajustes acordados, seguimiento de UDEEI/Orientación.

**Sensibilidad:** Muy alta — datos de necesidades educativas especiales, protección especial equivalente a D8/D9.

**Roles principales:** UDEEI o apoyo equivalente, Orientación; visibilidad restringida.

**Dependencias:** referencia a D4; se relaciona con D5 y D7 (ajustes que impactan seguimiento académico).

**Estado:** 🟢 Hecho aprobado — rol "UDEEI o apoyo equivalente" y "Orientación" (§6). 🔵 Inferencia de diseño — el nombre "BAP" y su alcance específico no aparecen en la fundación; se usa como término de referencia habitual en apoyos especializados en secundarias, sujeto a confirmación.

**Preguntas abiertas:**
- ❓ ¿SASE Zero debe modelar BAP con la terminología oficial vigente en México, o dejar el catálogo abierto a configuración por institución (§9.1)?

---

## D11. Inteligencia y Alertas Institucionales

**Propósito:** Ayudar a detectar situaciones que requieren atención (seguimientos vencidos, incidencias recurrentes, ausencias frecuentes, casos sin responsable) a partir de evidencia observable en otros dominios, sin decidir ni etiquetar.

Este dominio tiene dos capas distintas, por decisión del Product Owner registrada en la revisión del PR #1:

- **Prevención básica (núcleo):** alertas determinísticas y explicables derivadas de reglas observables (casos sin responsable, seguimientos vencidos, citatorios sin respuesta, acuerdos vencidos, acumulación observable de incidencias). Es capacidad central de SASE (🟢 §15, "SASE no será solamente reactivo"); configurable en umbrales y destinatarios dentro de límites seguros, pero no desactivable como capacidad.
- **Ampliación por inteligencia artificial (opcional):** análisis avanzado, resúmenes generativos, detección probabilística de patrones, sugerencias asistidas y cruces avanzados entre dominios sensibles (🟢 §14, "opcional, discreta, explicable, supervisada"). Desactivar esta capa no desactiva la prevención básica.

**Datos que posee:** no es dueño de datos primarios; deriva señales y alertas a partir de D5, D6, D7, D8, D9, D10, siempre trazables a su origen.

**Sensibilidad:** Alta por herencia — una alerta puede exponer, por composición, información tan sensible como su dominio de origen.

**Roles principales:** genera alertas visibles según el rol y su alcance de permisos (D1); no tiene autoridad de decisión propia.

**Dependencias:** de lectura sobre D5–D10; no puede escribir en ellos de forma autónoma ni irreversible (§14).

**Estado:** 🟢 Hecho aprobado — prevención basada en evidencia observable (§15) e inteligencia artificial "opcional, discreta, explicable, supervisada, configurable por módulo, limitada por permisos y auditada" (§14); "no podrá actuar por sí sola para sancionar, diagnosticar, etiquetar alumnos, cerrar casos sensibles..." (§14); prohibición explícita de etiquetas como "alumno problemático" o "alumno de alto riesgo" (§15). La separación núcleo/opcional entre ambas capas es decisión del Product Owner registrada en la revisión del PR #1 (2026-07-27).

---

## D12. Administración Multiescuela

**Propósito:** Preparar estructuralmente la operación de varias instituciones, y eventualmente supervisión regional, sin que esto sea parte de la primera versión funcional.

**Datos que posee:** relación entre instituciones, agregación de indicadores entre planteles cuando exista una capa de supervisión.

**Sensibilidad:** Media — depende de qué tanto agregue datos sensibles de planteles individuales.

**Roles principales:** aún no definidos por la fundación; corresponde a una etapa posterior del crecimiento (§5, pasos 4–5).

**Dependencias:** se apoya en D1 (permisos multiescuela) y D3 (cada institución mantiene su propia configuración); no debe romper el aislamiento de datos entre escuelas (§5, §19).

**Estado:** 🟢 Hecho aprobado — "la arquitectura deberá evitar dependencias que impidan crecer a múltiples escuelas" y "cada registro deberá pertenecer claramente a una institución" (§5); "soportar múltiples escuelas; separar instituciones de forma segura" (§19). 🟡 Propuesta — este dominio se modela ahora únicamente para que D1/D3/D4 no requieran rediseño al crecer, sin implementar funcionalidad multiescuela en la primera versión.

---

## Matriz de dependencias (resumen)

| Dominio | Depende de | Es consultado por |
|---|---|---|
| D1 Identidad, Acceso y Permisos | — | Todos |
| D2 Auditoría y Trazabilidad | — (observa a todos) | Dirección, agentes de verificación |
| D3 Configuración Institucional | — | D4–D12 |
| D4 Alumnado y Expediente | D1, D3 | D5, D6, D7, D8, D9, D10 |
| D5 Casos y Seguimiento | D1, D3, D4 | D6, D7 (origen de tareas), D8/D9/D10 (canalización) |
| D6 Documentos, Evidencia y Reportes | D1, D3, D4 | D5, D7, D8, D9, D10 |
| D7 Seguimiento Académico y Convivencia | D1, D3, D4 | D5, D11 |
| D8 Salud Escolar | D1, D3, D4 | D5 (canalización), D11 |
| D9 Trabajo Social y Contexto Familiar | D1, D3, D4 | D5 (canalización), D11 |
| D10 Orientación y Apoyos (UDEEI/BAP) | D1, D3, D4 | D5 (canalización), D7, D11 |
| D11 Inteligencia y Alertas | D5–D10 (lectura) | Todos los roles autorizados |
| D12 Administración Multiescuela | D1, D3 | Etapa futura |

## Preguntas abiertas consolidadas

1. ❓ Convivencia entre múltiples roles simultáneos por usuario (D1).
2. ❓ Autoridad para modificar catálogos/plantillas dentro del plantel (D3).
3. ❓ Existencia previa de una taxonomía institucional de incidencias/casos (D5).
4. ❓ Modelo de asistencia como dominio propio o como parte de D7.
5. ❓ Nivel de aislamiento de permisos entre D8 (Salud) y D9 (Trabajo Social).
6. ❓ Terminología oficial vs. configurable para apoyos especializados (D10).

La antigua pregunta sobre la relación con expedientes previos del Product Owner (D4) fue resuelta mediante [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md).

## Validación de este documento

- Todas las afirmaciones marcadas 🟢 citan una sección concreta de `PRODUCT_FOUNDATION.md`.
- Ninguna sección inventa requisitos legales o escolares no presentes en la fundación.
- Las preguntas abiertas no se respondieron por inferencia.
