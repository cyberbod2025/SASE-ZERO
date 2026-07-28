# SASE Zero

> **El Sistema Operativo de una Secundaria.**

SASE Zero conecta personas, áreas, alumnos, casos, evidencias, documentos y decisiones para que ningún alumno ni situación se pierda entre procesos fragmentados.

## Estado actual

**Fase:** Fundación aprobada  
**Estado:** Listo para arquitectura funcional  
**Implementación de producto:** No iniciada

En esta fase no deben crearse interfaces, esquemas de base de datos, infraestructura ni módulos funcionales. Primero se debe traducir la fundación del producto a dominios, módulos, roles, flujos y límites verificables.

## Fuente fundacional

La visión, los principios, límites y decisiones estratégicas aprobadas están en:

- [`docs/foundation/PRODUCT_FOUNDATION.md`](docs/foundation/PRODUCT_FOUNDATION.md)

Toda propuesta de producto, arquitectura o implementación debe respetar ese documento.

## Orden de lectura para agentes

1. `README.md`
2. `docs/foundation/PRODUCT_FOUNDATION.md`
3. `AGENTS.md`
4. Instrucciones específicas del agente, por ejemplo `CLAUDE.md`
5. `.agent/state.json`
6. `.agent/handoff/CURRENT.md`
7. Documentos directamente relacionados con la tarea activa

## Precedencia de fuentes

Cuando exista una contradicción, se aplicará este orden:

1. Decisiones explícitas y recientes del Product Owner registradas en el repositorio.
2. `docs/foundation/PRODUCT_FOUNDATION.md`.
3. ADR aprobados en `docs/decisions/`.
4. Arquitectura y documentación canónica vigente.
5. Estado y handoff actuales.
6. Código y pruebas.
7. Suposiciones del agente.

Si una implementación entra en conflicto con una fuente superior, el trabajo debe detenerse, documentar el conflicto y escalarlo al Product Owner.

## Memoria del proyecto

> **El repositorio, no el agente, es la memoria de SASE Zero.**

Las decisiones, avances, riesgos y siguientes pasos deben quedar registrados en archivos versionados. Ningún chat, modelo o sesión individual constituye una fuente canónica.

## Trabajo multiagente

SASE Zero puede ser desarrollado con Claude Code, Codex, OpenCode u otros agentes. Todos deben:

- leer las fuentes canónicas antes de actuar;
- trabajar sobre una tarea delimitada;
- verificar el estado real del repositorio;
- ejecutar validaciones pertinentes;
- actualizar el handoff;
- separar hechos, inferencias y preguntas abiertas.

Las especializaciones sugeridas no son propiedad exclusiva:

- **Claude Code:** arquitectura, planeación, documentación y análisis amplio.
- **Codex:** implementación, pruebas, correcciones y tareas enfocadas.
- **OpenCode:** continuidad, mantenimiento y ejecución alternativa.

## Próximo objetivo autorizado

Crear, sin programar todavía:

- `docs/product/PRODUCT_MAP.md`
- `docs/domains/DOMAIN_MAP.md`
- `docs/product/MODULE_CATALOG.md`
- `docs/product/ROLE_MATRIX.md`
- `docs/product/CORE_WORKFLOWS.md`

## Product Owner

Las decisiones de visión, alcance, prioridades, privacidad, modelo comercial, producción y aceptación final corresponden al Product Owner humano.
