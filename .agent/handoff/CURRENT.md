# CURRENT HANDOFF — SASE Zero

**Fecha:** 2026-07-27  
**Fase:** Arquitectura funcional  
**Estado:** Primera misión funcional commiteada y en revisión (PR #1, borrador)  
**Implementación de producto:** No iniciada

## 1. Objetivo vigente

Traducir el Documento Fundacional de SASE Zero en un mapa funcional verificable antes de tomar decisiones técnicas irreversibles o programar el producto.

## 2. Trabajo completado

- Repositorio `cyberbod2025/SASE-ZERO` creado con rama principal `main`.
- Documento fundacional incorporado como fuente canónica.
- `README.md` creado como entrada y mapa de precedencia.
- `AGENTS.md` creado como gobierno compartido para Claude Code, Codex, OpenCode y otros agentes.
- `CLAUDE.md` creado con instrucciones específicas y no duplicadas para Claude Code.
- `.agent/state.json` inicializado con fase, permisos, prohibiciones y siguiente microtarea.
- Este handoff fue creado para establecer continuidad verificable.
- **Nuevo en este checkpoint:** se redactaron los cinco documentos de la primera misión funcional:
  - `docs/product/PRODUCT_MAP.md`
  - `docs/domains/DOMAIN_MAP.md` (12 dominios, D1–D12)
  - `docs/product/MODULE_CATALOG.md` (18 módulos, M1–M18)
  - `docs/product/ROLE_MATRIX.md` (11 roles, R1–R11, tomados literalmente de la fundación §6)
  - `docs/product/CORE_WORKFLOWS.md` (6 flujos, F1–F6)
- Los cinco documentos distinguen explícitamente hechos aprobados (🟢, citando sección de la fundación), inferencias de diseño (🔵), propuestas (🟡) y preguntas abiertas (❓).
- El Product Owner aprobó el contenido como línea base documental. Los archivos fueron commiteados en la rama `docs/functional-architecture-v1`:
  - `94ab9ef` — `docs: define SASE Zero functional architecture` (los cinco documentos).
  - `6e5c8e1` — `chore(agent): record functional architecture handoff` (estado y handoff).
- La rama fue publicada en `origin` y existe el PR borrador [#1 — docs: define SASE Zero functional architecture v1](https://github.com/cyberbod2025/SASE-ZERO/pull/1) hacia `main`. La primera revisión fue favorable; la fusión aún no está autorizada.
- Durante la revisión del PR #1, el Product Owner registró dos decisiones:
  1. **ADR-0001** (`docs/decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md`): SASE Zero es una reconstrucción independiente y limpia; SASE Light y otros trabajos previos son consultables como referencia, no fuentes canónicas. La antigua pregunta abierta n.º 1 queda resuelta.
  2. **Prevención vs. IA:** la prevención básica determinística de M17 es capacidad núcleo configurable; solo su ampliación por IA es opcional, y desactivar la IA no desactiva las alertas básicas.

## 3. Fuentes canónicas actuales

1. `README.md`
2. `docs/foundation/PRODUCT_FOUNDATION.md`
3. `AGENTS.md`
4. `CLAUDE.md`, únicamente para Claude Code
5. `.agent/state.json`
6. `.agent/handoff/CURRENT.md`
7. `docs/product/PRODUCT_MAP.md`, `docs/domains/DOMAIN_MAP.md`, `docs/product/MODULE_CATALOG.md`, `docs/product/ROLE_MATRIX.md`, `docs/product/CORE_WORKFLOWS.md` — aprobados por el Product Owner como línea base documental (commit `94ab9ef`, en revisión final en el PR #1).
8. `docs/decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md` — decisión aceptada del Product Owner sobre la relación con trabajo previo.

## 4. Decisiones vigentes

- SASE Zero es el Sistema Operativo de una Secundaria.
- El repositorio es la memoria del proyecto.
- El producto inicia enfocado en escuelas secundarias.
- La fase vigente es documentación y arquitectura funcional.
- Todavía no se autoriza código de producto, interfaz, base de datos, Supabase, autenticación ni infraestructura.
- La inteligencia artificial será opcional, explicable y supervisada.
- La prevención describirá situaciones observables sin etiquetar alumnos.
- La escuela conservará la propiedad y portabilidad de sus datos.
- El Product Owner humano conserva las decisiones irreversibles y de aceptación final.
- **ADR-0001:** SASE Zero es una reconstrucción independiente y limpia; SASE Light y otros trabajos previos son referencia consultable, no fuentes canónicas (`docs/decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md`).
- **Prevención vs. IA (revisión del PR #1):** la prevención básica determinística es capacidad núcleo configurable de SASE; la ampliación por IA es opcional y su desactivación no desactiva las alertas básicas.
- **ADR-0002:** un usuario puede tener varios roles en una misma institución, con contexto de acción registrado (institución, rol activo, grupo, área, caso, motivo); los permisos no se suman indiscriminadamente, la canalización concede acceso limitado al caso, los roles multiescuela son distintos de los de plantel y la auditoría registra el rol activo (`docs/decisions/ADR-0002-USUARIOS-CON-MULTIPLES-ROLES.md`).

## 5. Próximos entregables

Los cinco documentos y el ADR-0001 ya están commiteados en la rama del PR #1. Pendiente:

- Registro de ADR-0003 (modelo de asistencia) cuando el Product Owner confirme el modelo propuesto.
- Revisión y decisión del Product Owner sobre las 10 preguntas abiertas restantes consolidadas en `docs/product/PRODUCT_MAP.md` §10.
- Autorización del Product Owner para fusionar el PR #1 (permanece como borrador hasta entonces).

## 6. Criterios de aceptación de la primera misión

- [x] Los cinco archivos existen (verificado con `find docs -type f`).
- [x] Los dominios y módulos no se contradicen (verificado: todo módulo referencia un dominio existente en D1–D12; ningún ID fuera de rango D1–D12/M1–M18/R1–R11/F1–F6).
- [x] Cada rol tiene responsabilidades y límites claros, incluyendo una matriz explícita de acceso a dominios sensibles (D8/D9/D10) en `ROLE_MATRIX.md`.
- [x] Los flujos (F1–F6) identifican inicio, responsables, estados, evidencias, seguimiento y cierre.
- [x] La información sensible y sus límites quedan identificados (§18 de la fundación propagado a D8/D9/D10, M13/M14/M15, y a la matriz de roles).
- [x] No se introduce código ni una decisión irreversible de stack.
- [x] Las preguntas no resueltas quedan visibles (10 preguntas consolidadas en `PRODUCT_MAP.md` §10, tras resolver dos mediante ADR-0001 y ADR-0002) y no se contestaron mediante invención.
- [x] `.agent/state.json` y este handoff quedan actualizados.
- [x] Aprobación del Product Owner como línea base documental, commits `94ab9ef` y `6e5c8e1`, rama publicada y PR #1 en borrador.
- [ ] **Pendiente:** autorización del Product Owner para fusionar el PR #1.

## 7. Validación realizada en este checkpoint

- Se leyeron, en orden, `README.md`, `docs/foundation/PRODUCT_FOUNDATION.md`, `AGENTS.md`, `CLAUDE.md`, `.agent/state.json`, `.agent/handoff/CURRENT.md` y el árbol real del repositorio (`find . -type f`) antes de escribir cualquier documento.
- Se verificó con `grep` que todos los enlaces relativos entre los cinco documentos apuntan a archivos que existen en las rutas indicadas.
- Se verificó con `grep` que ningún identificador de dominio (D), módulo (M), rol (R) o flujo (F) referenciado en un documento cae fuera del rango definido en su documento de origen (sin D13+, M19+, R12+, F7+).
- No se ejecutaron pruebas de software porque no existe código ni implementación en esta fase.
- Antes de commitear se ejecutó una verificación final: repositorio activo confirmado (`cyberbod2025/SASE-ZERO`), `sase-light` sin modificar, diff completo revisado, escaneo negativo de rutas de Windows, secretos y datos personales reales, y confirmación de que toda afirmación 🟢 cita una sección de la fundación.
- Los commits se hicieron por separado (documentos primero, estado/handoff después) con rutas de archivo explícitas, sin `git add .`.

## 8. Riesgos y advertencias

- Programar antes de cerrar el mapa funcional puede reproducir los problemas y acoplamientos del sistema anterior.
- Duplicar reglas entre `AGENTS.md`, `CLAUDE.md` y futuros documentos puede generar contradicciones.
- Los agentes deben evitar convertir supuestos sobre escuelas mexicanas en requisitos oficiales sin fuente o aprobación.
- No deben utilizarse datos reales de estudiantes en esta etapa.
- La antigua pregunta de alto impacto sobre trabajo previo de admisión fue **resuelta** mediante `docs/decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md`: reconstrucción independiente; el trabajo previo es referencia consultable, no fuente canónica. Riesgo residual: los agentes deben respetar el criterio de incorporación del ADR y no importar flujos previos sin revisión documentada.

## 9. Bloqueos

Ninguno técnico. Bloqueo de proceso: el PR #1 permanece como borrador; la fusión requiere autorización explícita del Product Owner.

## 10. Siguiente microtarea segura

El Product Owner confirma o ajusta el modelo de asistencia propuesto (dominio propio con dos niveles conectados: asistencia de jornada y asistencia por clase) para registrarlo como ADR-0003, y después revisa las 10 preguntas abiertas restantes consolidadas en `docs/product/PRODUCT_MAP.md` §10 antes de autorizar la fusión del PR #1. El siguiente agente debe verificar el estado real de la rama y el PR (no solo este handoff) antes de continuar.

## 11. Referencias de commits

- Fundación: `b7252a07bfa639d17886339bebd523854e2fcb56`
- Entrada del repositorio: `4f20ed960033f3cc720c2b765a0acac91b6846bd`
- Gobierno multiagente: `4ed6ab4d081a293aa86015c432482f736d36ce12`
- Guía de Claude Code: `4754acd6dedc74bf9563f8784399a3648bb670ae`
- Estado del proyecto: `f7ceb01320595381ee9896ffee93b2ca589b5d27`
- Primera misión funcional (PRODUCT_MAP, DOMAIN_MAP, MODULE_CATALOG, ROLE_MATRIX, CORE_WORKFLOWS): `94ab9ef`, en rama `docs/functional-architecture-v1`.
- Handoff de la primera misión: `6e5c8e1`.
- PR: [#1 — docs: define SASE Zero functional architecture v1](https://github.com/cyberbod2025/SASE-ZERO/pull/1) (borrador, hacia `main`).

> Un agente informa; el siguiente verifica.
