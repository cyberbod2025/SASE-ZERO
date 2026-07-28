# Flujos Institucionales Centrales — SASE Zero

**Estado:** Línea base de arquitectura funcional cerrada y aprobada.
**Fuente de precedencia:** [`docs/foundation/PRODUCT_FOUNDATION.md`](../foundation/PRODUCT_FOUNDATION.md) §3, §8, §15.

Se relaciona con: [`docs/domains/DOMAIN_MAP.md`](../domains/DOMAIN_MAP.md), [`docs/product/MODULE_CATALOG.md`](MODULE_CATALOG.md), [`docs/product/ROLE_MATRIX.md`](ROLE_MATRIX.md), [`docs/product/PRODUCT_MAP.md`](PRODUCT_MAP.md).

## Leyenda

Misma leyenda que los documentos anteriores: 🟢 hecho aprobado, 🔵 inferencia de diseño, 🟡 propuesta, ❓ pregunta abierta.

## Cómo leer este documento

Cada flujo describe, para una situación institucional recurrente, su **inicio**, los **roles responsables**, los **estados** por los que pasa, la **evidencia** que debe acompañarlo, el **seguimiento** y el **cierre**. Ningún flujo aquí es una pantalla ni un algoritmo: es la secuencia institucional que los módulos de `MODULE_CATALOG.md` deben soportar.

Estos flujos son conceptuales y no representan una decisión de interfaz, base de datos ni orden de implementación. La relación con trabajo previo se rige por [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md): puede consultarse como referencia, pero no importarse ni asumirse como requisito.

---

## F1. Ciclo de vida de un Caso / Incidencia

**Propósito institucional:** que ninguna situación relevante se pierda entre su apertura y su cierre (§3).

**Inicio:** cualquier rol operativo (Docente, Docente tutor, Prefectura, Orientación, Trabajo Social, Salud, UDEEI) registra una situación que requiere seguimiento.

**Roles responsables:** el rol que abre el caso es responsable inicial; puede transferirse mediante F2 (Canalización).

**Estados propuestos:**
1. Abierto — con contexto, responsable y fecha de seguimiento definidos.
2. En seguimiento — con historial de acciones y evidencia acumulada.
3. Canalizado — transferido a otra área (ver F2), conservando el historial previo.
4. Pendiente de cierre — acción completada, en espera de confirmación o evidencia final.
5. Cerrado — con evidencia de cierre documentada.

**Evidencia requerida:** contexto inicial, responsable, historial de acciones, y evidencia de cierre — todo listado explícitamente en la fundación (§3).

**Seguimiento:** cada caso debe tener una fecha de seguimiento definida; un caso sin fecha de seguimiento o sin responsable es, por definición, una situación de riesgo detectable por M17 (§15, "casos sin responsable").

**Cierre:** no puede cerrarse sin evidencia documentada del desenlace (§3).

**Módulos involucrados:** M6 (Casos e Incidencias), M9 (Documentos), M2 (Auditoría).

**Estado del flujo:** 🟢 Hecho aprobado en su estructura general (§3: "contexto, responsable, estado, evidencia, historial, siguiente acción, fecha de seguimiento, áreas involucradas, trazabilidad y cierre documentado"). 🔵 Inferencia de diseño en los nombres específicos de los cinco estados propuestos.

**Resolución de cierre (2026-07-28):**
- Taxonomía de tipos de caso/incidencia: catálogo configurable por plantel (§9.1); SASE ofrecerá posteriormente un catálogo semilla cuyo contenido se define en prototipado/piloto, no ahora.
- Umbral de seguimiento vencido: configurable por tipo de caso dentro de límites seguros; valor semilla diferido a prototipado.

---

## F2. Canalización entre Áreas

**Propósito institucional:** evitar que un caso "cambie de área sin continuidad", identificado explícitamente como problema a resolver (§1).

**Inicio:** un rol responsable de un caso (F1) determina que otra área debe intervenir (p. ej. Prefectura canaliza a Orientación, o Docente tutor canaliza a Trabajo Social).

**Roles responsables:** el rol que canaliza permanece vinculado al caso como origen; el rol receptor se vuelve responsable del siguiente tramo.

**Estados propuestos:**
1. Canalización propuesta — con motivo y evidencia del área de origen.
2. Canalización aceptada — el área receptora confirma responsabilidad.
3. En atención por el área receptora — el caso vuelve a seguir el ciclo F1 bajo el nuevo responsable.
4. Canalización cerrada o devuelta — el área receptora documenta el resultado y decide si el caso regresa al área de origen o se cierra.

**Evidencia requerida:** motivo de la canalización, historial previo íntegro (no debe perderse), confirmación de recepción.

**Seguimiento:** una canalización sin aceptación en un tiempo razonable es una señal para M17 (§15, "situaciones que involucran varias áreas").

**Cierre:** el área receptora documenta el resultado; el historial completo (origen + atención) queda visible para quien tenga permiso sobre el caso.

**Módulos involucrados:** M7 (Canalización entre Áreas), M6, M13/M14/M15 según el área receptora, M2 (Auditoría).

**Regla de datos sensibles:** al canalizar hacia D8/D9/D10, solo se comparte lo explícitamente autorizado por el flujo; no se otorga acceso general al expediente del alumno en esos dominios (heredado de §18 y de la matriz de `ROLE_MATRIX.md`). Por [`ADR-0002`](../decisions/ADR-0002-USUARIOS-CON-MULTIPLES-ROLES.md), una canalización concede acceso limitado al caso canalizado, nunca al expediente completo, y la auditoría registra con qué rol activo se accedió.

**Estado del flujo:** 🟢 Hecho aprobado en su necesidad (§1, §3). 🔵 Inferencia de diseño en los cuatro estados propuestos.

---

## F3. Citatorio y Acuerdo con Familia

**Propósito institucional:** formalizar la comunicación con la familia y dar seguimiento a los acuerdos derivados, evitando que se pierdan o queden solo en papel (§8).

**Inicio:** un caso (F1) o una necesidad institucional (p. ej. seguimiento académico) requiere convocar a la familia.

**Roles responsables:** el rol responsable del caso genera el citatorio; puede involucrar a más de un área en la reunión.

**Estados propuestos:**
1. Citatorio generado — documento oficial con folio, fecha y motivo (§8).
2. Citatorio enviado — pendiente de respuesta/asistencia.
3. Reunión realizada — con acuerdos registrados.
4. Acuerdo en seguimiento — con fecha de cumplimiento y responsable.
5. Acuerdo cumplido / Acuerdo vencido — cierre del ciclo.

**Evidencia requerida:** el citatorio como documento oficial (M9), los acuerdos firmados o registrados, y su estado de cumplimiento.

**Seguimiento:** "citatorios sin respuesta" y "acuerdos vencidos" están listados explícitamente como señales de prevención (§15).

**Cierre:** un acuerdo se cierra con evidencia de cumplimiento o se marca vencido, nunca se elimina silenciosamente.

**Módulos involucrados:** M8 (Citatorios y Acuerdos), M9 (Generador de Documentos), M6 (si deriva de un caso), M17 (alertas de vencimiento).

**Estado del flujo:** 🟢 Hecho aprobado (§8, §15).

---

## F4. Generación de Documento Institucional

**Propósito institucional:** que el personal no tenga que repetir en Word/Excel lo que ya existe en SASE (§8, §1).

**Inicio:** cualquier módulo que requiera producir un documento oficial (cierre de caso, constancia, informe, oficio) invoca este flujo.

**Roles responsables:** el rol dueño del registro de origen (caso, expediente, movimiento).

**Estados propuestos:**
1. Borrador generado a partir de una plantilla institucional (M3).
2. Documento emitido — con folio, fecha, responsables y firmas (§8).
3. Documento archivado — vinculado permanentemente a su registro de origen (caso, expediente, movimiento).

**Evidencia requerida:** el documento mismo, su folio y su vínculo con el registro de origen; historial de versiones si se corrige.

**Cierre:** un documento emitido no se edita libremente; una corrección genera una nueva versión trazable (principio general de integridad del expediente, §9.2).

**Módulos involucrados:** M9 (Generador de Documentos), M3 (plantillas), M2 (auditoría de emisión).

**Estado del flujo:** 🟢 Hecho aprobado (§8).

---

## F5. Detección y Revisión de Alertas Institucionales

**Propósito institucional:** anticipar situaciones sin etiquetar personas (§15).

**Capas del flujo (decisión del Product Owner, revisión del PR #1):** la detección básica es determinística y explicable — reglas observables como casos sin responsable, seguimientos vencidos, citatorios sin respuesta, acuerdos vencidos y acumulación observable de incidencias — y es capacidad núcleo de SASE, con umbrales y destinatarios configurables dentro de límites seguros. La ampliación mediante IA (análisis avanzado, resúmenes generativos, detección probabilística de patrones, sugerencias asistidas, cruces avanzados entre dominios sensibles) es opcional, y su desactivación no desactiva la detección básica. Ver `M17` en `MODULE_CATALOG.md` y `D11` en `DOMAIN_MAP.md`.

**Inicio:** automático, a partir de evidencia observable en F1–F4 (seguimientos vencidos, incidencias recurrentes, ausencias frecuentes, discrepancias observables entre asistencia de jornada y por clase, citatorios sin respuesta, casos sin responsable, acumulación de pendientes). Una captura de asistencia no realizada no equivale a ausencia ni genera por sí sola esa señal.

**Roles responsables:** el rol con permiso sobre el dominio de origen de la alerta revisa y decide; la alerta nunca actúa por sí sola (§14).

**Estados propuestos:**
1. Alerta generada — con la evidencia que la origina, explicada (§15).
2. Alerta revisada — un humano la evaluó.
3. Alerta descartada (con motivo) o Alerta convertida en caso (F1) o acción de seguimiento.

**Evidencia requerida:** la alerta debe indicar por qué fue generada y ser revisable; debe evolucionar si cambia la situación (§15).

**Cierre:** toda alerta se resuelve por decisión humana explícita, nunca por vencimiento silencioso.

**Módulos involucrados:** M17 (Alertas Institucionales), M16 (Panel de Pendientes), y de lectura sobre M6, M8, M11, M12.

**Regla explícita:** prohibido mostrar "alumno problemático", "alumno peligroso", "alumno de alto riesgo" o diagnósticos no autorizados; la alerta describe situaciones observables (§15, con el ejemplo textual de la fundación).

**Estado del flujo:** 🟢 Hecho aprobado (§14, §15).

---

## F6. Alta e Incorporación del Alumno (nivel conceptual)

**Propósito institucional:** que el alumno quede correctamente identificado en el expediente institucional único antes de que cualquier otro flujo (F1–F5) pueda operar sobre él.

**Inicio:** una decisión administrativa de incorporar a un alumno al plantel (nuevo ingreso o movimiento entre grupos/ciclos).

**Roles responsables:** Secretaría, con confirmación de Dirección cuando corresponda.

**Estados propuestos (nivel conceptual, sin detalle de proceso):**
1. Datos capturados.
2. Datos validados administrativamente.
3. Alta confirmada — el expediente (M4) queda activo y disponible para los demás módulos.
4. Matriculado en grupo y turno (M5).

**Evidencia requerida:** la que la institución determine como parte de su proceso de admisión — no se detalla aquí para no inventar un proceso no aprobado.

**Módulos involucrados:** M4 (Expediente), M5 (Matrícula y Movimientos), M9 (documentos derivados, p. ej. credencial).

**Estado del flujo:** 🔵 Inferencia de diseño — la fundación confirma que "control escolar" y "expediente digital" son parte de SASE (§2) y que "cada registro deberá pertenecer claramente a una institución... ciclo escolar, turno, grupo" (§5), pero no describe el proceso de admisión paso a paso. Este flujo se deja deliberadamente conceptual.

**Nota de decisión:** la relación de este flujo con trabajo previo de admisión del Product Owner quedó resuelta en [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md): SASE Zero es una reconstrucción independiente; el flujo previo de admisión no es un requisito y F6 puede continuar conceptual hasta que se audite ese trabajo previo. Cualquier aprendizaje incorporado seguirá el criterio del ADR (documentado, evaluado contra la fundación, aprobado por ADR si afecta arquitectura).

---

## Matriz de trazabilidad flujo → dominios → módulos → roles

| Flujo | Dominios | Módulos | Roles principales |
|---|---|---|---|
| F1 Caso/Incidencia | D5, D4 | M6, M9, M2 | Todos los roles operativos |
| F2 Canalización | D5, D8/D9/D10 | M7, M6, M13/M14/M15 | Origen + área receptora |
| F3 Citatorio/Acuerdo | D5, D6 | M8, M9, M17 | Rol responsable del caso |
| F4 Documento Institucional | D6 | M9, M3, M2 | Rol dueño del registro origen |
| F5 Alertas | D11 | M17, M16 | Rol con permiso sobre el dominio de origen |
| F6 Alta e Incorporación | D4 | M4, M5, M9 | Secretaría, Dirección |

## Cierre de la fase

Todas las preguntas abiertas de este documento quedaron resueltas: la relación de F6 con trabajo previo mediante [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md); la taxonomía de casos/incidencias y el umbral de seguimiento vencido mediante las resoluciones de cierre registradas en F1 y consolidadas en `PRODUCT_MAP.md` §10.

## Validación de este documento

- Cada flujo identifica inicio, responsables, estados, evidencia, seguimiento y cierre, según lo exigido por el criterio de aceptación de la misión.
- F6 se mantiene deliberadamente conceptual conforme a `ADR-0001`, hasta que se audite el trabajo previo de admisión.
- Ninguna automatización descrita actúa sin confirmación humana (F5); la detección básica de F5 es núcleo y la ampliación por IA es opcional.
- Las preguntas de la fase se resolvieron mediante ADR aprobados o resoluciones de cierre del Product Owner, nunca por inferencia silenciosa.
