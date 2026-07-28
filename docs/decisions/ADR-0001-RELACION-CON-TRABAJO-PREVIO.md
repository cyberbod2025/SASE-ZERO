# ADR-0001 — Relación de SASE Zero con trabajo previo del Product Owner

**Estado:** Aceptado
**Fecha:** 2026-07-27
**Responsable de la decisión:** Product Owner (Hugo Sánchez Reséndiz)
**Registrada durante:** revisión del PR #1 (`docs: define SASE Zero functional architecture v1`)

## Contexto

Durante la primera misión de arquitectura funcional se identificó como pregunta abierta de mayor impacto (`docs/product/PRODUCT_MAP.md`, versión inicial, §9) si SASE Zero debía diseñarse desde cero o considerar como entrada de diseño flujos ya trabajados por el mismo Product Owner en proyectos anteriores — en particular SASE Light, un prototipo previo con un flujo de admisión (portal familiar → secretaría → alta oficial → expediente → credencial).

La pregunta afectaba directamente al flujo `F6 Alta e Incorporación` (`docs/product/CORE_WORKFLOWS.md`) y al módulo `M5 Matrícula y Movimientos` (`docs/product/MODULE_CATALOG.md`), y de forma indirecta al dominio `D4 Alumnado y Expediente Institucional` (`docs/domains/DOMAIN_MAP.md`).

## Decisión

> **SASE Zero es una reconstrucción independiente y limpia. SASE Light y otros trabajos previos pueden consultarse como evidencia o referencia funcional, pero no son fuentes canónicas, no se importan automáticamente y no determinan la arquitectura de SASE Zero.**

## Alternativas consideradas

1. **Herencia directa:** adoptar los flujos de SASE Light como base de diseño de SASE Zero. Descartada: acoplaría SASE Zero a decisiones tomadas para un prototipo mock e in-memory, reproduciendo riesgos y acoplamientos que este proyecto busca evitar.
2. **Ignorancia total:** prohibir cualquier consulta a trabajo previo. Descartada: desperdiciaría aprendizajes validados en un contexto institucional real.
3. **Reconstrucción independiente con consulta controlada** *(elegida)*: SASE Zero se diseña desde sus propias fuentes canónicas; el trabajo previo puede consultarse como evidencia, y sus aprendizajes pueden proponerse mediante el proceso documentado abajo.

## Consecuencias

- La pregunta abierta n.º 1 del mapa funcional queda resuelta y se retira de la lista de preguntas abiertas.
- `F6 Alta e Incorporación` puede continuar en nivel conceptual hasta que se audite el trabajo previo de admisión.
- Ningún documento de este repositorio debe tratar flujos de SASE Light como requisito; solo como referencia consultable.
- Una futura auditoría del trabajo previo de admisión es una misión válida, pero sus conclusiones entran a SASE Zero como propuestas, no como hechos.

## Reglas derivadas

1. No copiar código o arquitectura automáticamente.
2. No importar flujos sin revisión.
3. Los aprendizajes validados sí pueden proponerse.
4. Toda incorporación relevante debe quedar documentada.
5. Cuando afecte arquitectura, debe aprobarse mediante ADR.
6. SASE Light permanece como proyecto separado.
7. `F6 Alta e Incorporación` puede continuar conceptual hasta que se audite el trabajo previo de admisión.

## Límites

- Esta decisión no autoriza modificar SASE Light ni ningún otro repositorio del Product Owner desde SASE Zero.
- Esta decisión no convierte el flujo previo de admisión en requisito de SASE Zero.
- Esta decisión no autoriza implementación de producto; la fase vigente sigue siendo arquitectura funcional.

## Criterio para incorporar una referencia anterior

Una idea, flujo o aprendizaje de un proyecto previo solo puede incorporarse a SASE Zero si:

1. Se documenta explícitamente su origen y el motivo de su incorporación.
2. Se evalúa contra `docs/foundation/PRODUCT_FOUNDATION.md`; en caso de conflicto, gana la fundación.
3. Se presenta como propuesta (🟡) o inferencia (🔵) en los documentos funcionales, nunca como hecho aprobado (🟢) sin respaldo de la fundación.
4. Si modifica dominios, módulos, roles o flujos ya aprobados, se registra mediante un nuevo ADR aceptado por el Product Owner.
5. Nunca implica copiar código, esquemas ni arquitectura técnica de forma automática.
