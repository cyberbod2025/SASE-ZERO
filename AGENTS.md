# AGENTS.md — SASE Zero

Gobierno multiagente. Aplica a Claude Code, OpenCode, Codex u otros.

## Lectura obligatoria (orden)

1. `README.md`
2. `docs/foundation/PRODUCT_FOUNDATION.md`
3. `AGENTS.md`
4. Instrucciones específicas del agente (ej. `CLAUDE.md`)
5. `.agent/state.json`
6. `.agent/handoff/CURRENT.md`
7. Documentos relacionados con la tarea activa

Verifica el estado real (`git status`, `git log`, rama, remoto) antes de editar. Un agente informa; el siguiente verifica.

## Fase actual

**Arquitectura funcional cerrada.** Siguiente fase: arquitectura técnica, pero aún no iniciada.

**Prohibido permanentemente hasta nueva orden:**
- interfaces de producto, código de módulos, tablas físicas, migraciones
- Supabase, hosting, producción, autenticación
- datos reales de alumnos
- inventar requisitos legales o escolares sin fuente

## sase-light

Repositorio separado (`cyberbod2025/sase-light`). No modificarlo, no mezclarlo, no tomarlo como fuente canónica. SASE Zero es reconstrucción independiente (ADR-0001).

## ADR clave

- **ADR-0001:** SASE Zero es reconstrucción independiente; trabajo previo es referencia, no fuente.
- **ADR-0002:** Usuarios con múltiples roles; cada acción registra contexto (institución, rol, grupo, área, caso, motivo). Permisos no se suman indiscriminadamente.

## Decisiones aprobadas (no requieren nuevo ADR)

- **Prevención vs. IA:** Prevención básica determinística es núcleo configurable; IA es ampliación opcional.
- **Información sensible:** Dirección/Subdirección consultan solo indicadores agregados por defecto. Acceso individual a Salud/Trabajo Social/Orientación solo por caso con necesidad justificada, con motivo registrado, alcance mínimo y auditoría. No existe navegación general por expedientes sensibles.

## Criterio de decisión

Decisión reversible: default explícito. Variación entre escuelas: configuración. Tema normativo sin fuente: `En preparación`. Solo una decisión irreversible, transversal y bloqueante se escala o justifica un ADR; no reabras preguntas una por una.

## GitHub

El remoto `origin` debe apuntar a `github.com/cyberbod2025/SASE-ZERO`. Consulta rama y PR vigentes en GitHub y en `.agent/state.json`; no confíes en un handoff sin verificarlos.

## Handoff obligatorio

Antes de terminar, actualizar:
- `.agent/handoff/CURRENT.md` (objetivo, resultado, archivos tocados, decisiones, validaciones, riesgos, siguiente microtarea)
- `.agent/state.json` si cambió fase, objetivo o estado

Registra solo validaciones realmente ejecutadas.

## Precedencia

1. Decisiones del Product Owner registradas en el repo
2. `PRODUCT_FOUNDATION.md`
3. ADR en `docs/decisions/`
4. Documentación canónica vigente
5. Estado y handoff
6. Código y pruebas
7. Suposiciones del agente

Nunca cambiar la fundación para acomodar implementación.

## Contrato de tarea

Antes de trabajar, identifica: objetivo, alcance, archivos permitidos, criterios de aceptación, validaciones y acciones prohibidas. No amplíes el alcance silenciosamente.

## Git

Inspecciona estado antes de modificar. No descartes cambios ajenos, reescribas historia, fuerces push, elimines ramas sin autorización, ni mezcles trabajo no relacionado.

## Product Owner

Humano: Hugo Sánchez Reséndiz. Solo él aprueba: visión, alcance, prioridades, privacidad, modelo comercial, producción, aceptación final.

Los agentes proponen, comparan y advierten; no sustituyen estas decisiones.

## Recordatorios

- El repositorio, no el agente, es la memoria del proyecto.
- No duplicar contenido canónico entre archivos; enlazar.
- No usar datos personales reales.
- No ejecutar cambios destructivos sin autorización.
- Distinguir hechos aprobados, inferencias, propuestas y preguntas abiertas.
- Si hay conflicto entre fundación e implementación: detener, describir, escalar.
