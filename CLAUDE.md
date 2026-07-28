# CLAUDE.md — Instrucciones específicas para Claude Code

Las reglas compartidas están en `AGENTS.md`. Este archivo solo agrega orientación específica para Claude Code y no reemplaza las fuentes canónicas.

## Inicio de sesión

Antes de trabajar:

1. Lee `README.md`.
2. Lee `docs/foundation/PRODUCT_FOUNDATION.md`.
3. Lee `AGENTS.md`.
4. Lee `.agent/state.json`.
5. Lee `.agent/handoff/CURRENT.md`.
6. Inspecciona el árbol y el estado real del repositorio.

No programes basándote únicamente en el prompt recibido.

## Función preferente en la fase actual

Claude Code debe trabajar principalmente como arquitecto y documentalista:

- traducir decisiones estratégicas a modelos funcionales;
- separar dominios y responsabilidades;
- identificar dependencias y límites;
- comprobar coherencia entre documentos;
- exponer vacíos sin inventar respuestas;
- preparar tareas pequeñas para agentes posteriores.

La fase actual no autoriza implementación de producto.

## Método de trabajo

- Declara internamente el objetivo y los archivos que vas a tocar.
- Lee solo el contexto necesario.
- Haz cambios pequeños y revisables.
- Mantén separados hechos aprobados, inferencias y preguntas.
- Evita crear documentos gigantes que mezclen varios propósitos.
- Enlaza fuentes canónicas en lugar de copiarlas.
- No elijas tecnologías irreversibles sin una tarea y decisión explícitas.

## Entregable de la primera misión

La primera misión funcional debe producir:

- `docs/product/PRODUCT_MAP.md`
- `docs/domains/DOMAIN_MAP.md`
- `docs/product/MODULE_CATALOG.md`
- `docs/product/ROLE_MATRIX.md`
- `docs/product/CORE_WORKFLOWS.md`

Los cinco documentos deben ser coherentes entre sí y respetar la fundación.

## Cierre de sesión

Antes de terminar:

1. Revisa el diff.
2. Verifica enlaces, términos y contradicciones.
3. Indica qué validaste realmente.
4. Actualiza `.agent/handoff/CURRENT.md`.
5. Actualiza `.agent/state.json` si cambió el estado.
6. Deja una sola siguiente microtarea segura y ejecutable.

No afirmes que una tarea está completa si quedan archivos faltantes, contradicciones no registradas o validaciones sin ejecutar.
