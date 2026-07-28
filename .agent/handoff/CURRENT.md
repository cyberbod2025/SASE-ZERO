# CURRENT HANDOFF — SASE Zero

**Fecha:** 2026-07-28
**Fase:** Comparación de alternativas de arquitectura técnica (ajustada tras revisión del Product Owner; pendiente de segunda revisión)
**Estado:** PR #3 (`docs/technical-alternatives-comparison` → `main`) abierto en borrador en GitHub: https://github.com/cyberbod2025/SASE-ZERO/pull/3. El Product Owner revisó la comparación, aprobó la dirección general y solicitó ajustes puntuales; los ajustes ya se aplicaron en esta sesión. El documento aún no tiene aprobación final ni autorización de fusión.
**Arquitectura funcional:** Cerrada
**Implementación de producto:** No iniciada
**Stack técnico:** Ninguno aprobado

## 1. Objetivo de esta sesión

Aplicar sobre `docs/architecture/TECHNICAL_ALTERNATIVES_COMPARISON.md`, en la rama `docs/technical-alternatives-comparison`, los ajustes solicitados por el Product Owner tras revisar PR #3: superficie inicial, aislamiento multitenant, autorización en profundidad, offline y caché, auditoría append-only, claridad entre persistencia administrada y BaaS, y correcciones editoriales. Sin iniciar arquitectura lógica, selección de proveedores, ADR ni implementación.

## 2. Resultado

- **Superficie inicial (B):** corregido para no tratar web responsiva y PWA como alternativas separadas; ahora se expresa como web responsiva como superficie base, con capacidades PWA incorporadas progresivamente sobre la misma base de código cuando aporten instalación, caché controlada o notificaciones. Actualizado en la sección B, mapa de dependencias, lista corta y conclusión.
- **Aislamiento multitenant (L):** ya no se deja el modelo híbrido por sensibilidad/escala como preferencia inicial asumida. La dirección provisional ahora es: candidato inicial = filas compartidas con identificador institucional, reforzado por autorización funcional en la aplicación y políticas obligatorias cercanas al dato como segunda barrera, validado con pruebas negativas explícitas; esquemas separados y bases separadas quedan como rutas futuras de escalamiento sujetas a evidencia; el modelo híbrido continúa como opción evolutiva, no como complejidad inicial predeterminada. Se añadió una declaración explícita de dirección provisional en la sección L (antes solo vivía en la lista corta), y se actualizaron lista corta, riesgos, conclusión e incertidumbres.
- **Autorización en profundidad (E):** se añadió una distinción obligatoria que separa autenticación externa, membresía institucional y rol activo propios de la aplicación, reglas funcionales y acceso por caso evaluados en la aplicación, políticas cercanas al dato como refuerzo obligatorio (no opcional) sobre institución y datos sensibles, y auditoría con usuario, institución, rol activo, caso y motivo. Corrige cualquier lectura previa de "autorización solo en la aplicación".
- **Offline y caché (H):** acotado a caché únicamente de interfaz, catálogos y referencias no sensibles; se eliminó el ejemplo de consulta offline de un caso sensible previamente abierto; ningún dato equivalente a D8/D9/D10 se persiste offline; la cola local de escrituras queda diferida hasta que una misión posterior revise explícitamente `CORE_WORKFLOWS.md`; offline-first pleno sigue no recomendado para el inicio.
- **Auditoría append-only (J):** se mantuvo la preferencia por eventos append-only para acciones sensibles, y se reubicó (estaba mal colocada bajo la sección L) la aclaración de que append-only es un patrón lógico, que la inmutabilidad efectiva requiere controles técnicos que impidan modificación o eliminación por roles ordinarios, y que el diseño lógico posterior deberá definir actor, institución, rol activo, caso, motivo, acción y marca temporal.
- **Persistencia administrada vs. BaaS (C):** se añadió una distinción explícita de patrones para evitar categorías superpuestas entre "servicio relacional administrado con capacidades integradas opcionales" y "plataforma BaaS más opinada que absorbe lógica estructural", sin nombrar proveedores.
- **Correcciones editoriales:** corregido el paréntesis faltante en la fila A de la sección 6; verificado el uso consistente de `preferencia provisional`, `alternativa de respaldo`, `diferible` y `no recomendada para el inicio` en todo el documento. No se amplió el documento más allá de lo necesario para los ajustes solicitados.
- No se seleccionó ningún proveedor ganador ni stack técnico en esta sesión.
- No se creó ningún ADR nuevo.
- No se modificaron documentos funcionales, el contrato técnico, ni `sase-light`.

## 3. Archivos modificados en esta sesión

- `docs/architecture/TECHNICAL_ALTERNATIVES_COMPARISON.md`
- `.agent/state.json`
- `.agent/handoff/CURRENT.md`

Ningún otro archivo fue modificado. En particular, `docs/architecture/TECHNICAL_ARCHITECTURE_CONTRACT.md`, los ADR y los documentos de `docs/product/` y `docs/domains/` no fueron tocados.

## 4. Decisión del Product Owner registrada en esta sesión

- El Product Owner **aprobó la dirección general** de la comparación de PR #3.
- El Product Owner **solicitó ajustes** puntuales (los siete listados en la sección 2 de este handoff), ya aplicados.
- El Product Owner **todavía no aprobó el documento final** ni autorizó la fusión de PR #3. Queda pendiente una segunda revisión.
- Ninguna decisión de stack, proveedor, framework, base de datos, hosting ni mecanismo de autenticación fue seleccionada.

## 5. Decisiones vigentes (heredadas, no reabiertas)

- ADR-0001: SASE Zero es reconstrucción independiente; sase-light es referencia, no fuente.
- ADR-0002: usuarios multi-rol con contexto de acción; permisos no se suman.
- Arquitectura funcional cerrada y fusionada en `main` (PR #1).
- Contrato de arquitectura técnica cerrado y fusionado en `main` (PR #2, commit `6482dfdeb71bf21721ddfa430fe5aff03f716e13`).

## 6. Validaciones ejecutadas en esta sesión

- Revisado el contenido completo de `docs/architecture/TECHNICAL_ALTERNATIVES_COMPARISON.md` antes de editar, para detectar que la nota sobre append-only estaba mal ubicada bajo la sección L en vez de J, y corregirla.
- Revisado el diff completo antes del commit.
- Verificado que solo se modificaron los tres archivos autorizados: el documento de comparación, `.agent/state.json` y este handoff.
- Confirmado que no se seleccionó stack ni proveedor.
- Confirmado que no se introdujo código, esquema físico, migraciones ni endpoints.
- Confirmado que el contrato técnico, los documentos funcionales, los ADR y `sase-light` no fueron modificados.
- Confirmado que ningún worktree fue alterado.
- Validado que `.agent/state.json` es JSON bien formado tras la edición.
- Verificados los enlaces relativos del documento (sin cambios respecto a la versión anterior, ya validados).
- Verificada, tras el push, la coincidencia de SHA entre la rama local y `origin/docs/technical-alternatives-comparison`.

## 7. Siguiente microtarea segura

Segunda revisión del Product Owner sobre `docs/architecture/TECHNICAL_ALTERNATIVES_COMPARISON.md` ajustado (PR #3) para aprobar el documento final o solicitar nuevos ajustes. Esta revisión no aprueba stack; solo puede aprobar la comparación o acotar más su dirección.

## 8. Riesgos y advertencias

- No iniciar la selección de stack, arquitectura lógica ni implementación sin autorización explícita adicional.
- No convertir la dirección arquitectónica provisional en stack aprobado sin decisión registrada del Product Owner.
- No mezclar `sase-light` con SASE Zero.
- No usar datos reales de alumnos.
- No inventar requisitos legales o normativos.
- PR #3 permanece en modo borrador; no debe fusionarse ni marcarse listo hasta que el Product Owner dé la aprobación final.

## 9. Referencias

- Contrato técnico aprobado y fusionado: `docs/architecture/TECHNICAL_ARCHITECTURE_CONTRACT.md`.
- Comparación de alternativas (ajustada en esta sesión): `docs/architecture/TECHNICAL_ALTERNATIVES_COMPARISON.md`.
- PR #3 (borrador, pendiente de segunda revisión): https://github.com/cyberbod2025/SASE-ZERO/pull/3.
- Rama de esta misión: `docs/technical-alternatives-comparison`.

> Un agente informa; el siguiente verifica.
