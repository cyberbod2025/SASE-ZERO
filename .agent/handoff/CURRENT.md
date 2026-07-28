# CURRENT HANDOFF — SASE Zero

**Fecha:** 2026-07-27  
**Fase:** Arquitectura funcional  
**Estado:** Listo para iniciar  
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

## 3. Fuentes canónicas actuales

1. `README.md`
2. `docs/foundation/PRODUCT_FOUNDATION.md`
3. `AGENTS.md`
4. `CLAUDE.md`, únicamente para Claude Code
5. `.agent/state.json`
6. `.agent/handoff/CURRENT.md`

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

## 5. Próximos entregables

Crear:

- `docs/product/PRODUCT_MAP.md`
- `docs/domains/DOMAIN_MAP.md`
- `docs/product/MODULE_CATALOG.md`
- `docs/product/ROLE_MATRIX.md`
- `docs/product/CORE_WORKFLOWS.md`

Cada documento deberá distinguir:

- hechos aprobados;
- inferencias de diseño;
- propuestas;
- preguntas abiertas para el Product Owner.

## 6. Criterios de aceptación de la siguiente misión

- Los cinco archivos existen.
- Los dominios y módulos no se contradicen.
- Cada rol tiene responsabilidades y límites claros.
- Los flujos identifican inicio, responsables, estados, evidencias, seguimiento y cierre.
- La información sensible y sus límites quedan identificados.
- No se introduce código ni una decisión irreversible de stack.
- Las preguntas no resueltas quedan visibles y no se contestan mediante invención.
- `.agent/state.json` y este handoff quedan actualizados al finalizar.

## 7. Validación realizada en este checkpoint

- Se verificó que `docs/foundation/PRODUCT_FOUNDATION.md` existe en `main`.
- Se confirmó que el repositorio permite escritura y que `main` es la rama predeterminada.
- Se crearon los archivos de gobierno iniciales mediante commits separados.
- No se ejecutaron pruebas de software porque aún no existe implementación.

## 8. Riesgos y advertencias

- Programar antes de cerrar el mapa funcional puede reproducir los problemas y acoplamientos del sistema anterior.
- Duplicar reglas entre `AGENTS.md`, `CLAUDE.md` y futuros documentos puede generar contradicciones.
- Los agentes deben evitar convertir supuestos sobre escuelas mexicanas en requisitos oficiales sin fuente o aprobación.
- No deben utilizarse datos reales de estudiantes en esta etapa.

## 9. Bloqueos

Ninguno.

## 10. Siguiente microtarea segura

Leer las fuentes canónicas y crear los cinco documentos de arquitectura funcional, sin implementar código de producto.

## 11. Referencias de commits

- Fundación: `b7252a07bfa639d17886339bebd523854e2fcb56`
- Entrada del repositorio: `4f20ed960033f3cc720c2b765a0acac91b6846bd`
- Gobierno multiagente: `4ed6ab4d081a293aa86015c432482f736d36ce12`
- Guía de Claude Code: `4754acd6dedc74bf9563f8784399a3648bb670ae`
- Estado del proyecto: `f7ceb01320595381ee9896ffee93b2ca589b5d27`

> Un agente informa; el siguiente verifica.
