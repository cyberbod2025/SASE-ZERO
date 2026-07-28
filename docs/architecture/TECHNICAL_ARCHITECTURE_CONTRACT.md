# Contrato de Arquitectura Técnica — SASE Zero

**Estado:** Preparación de arquitectura técnica. Ningún stack aprobado.
**Fuente de precedencia:** [`docs/foundation/PRODUCT_FOUNDATION.md`](../foundation/PRODUCT_FOUNDATION.md). Este contrato no repite la fundación ni la arquitectura funcional; las enlaza y las traduce a límites técnicos.
**Se relaciona con:** [`docs/product/PRODUCT_MAP.md`](../product/PRODUCT_MAP.md), [`docs/domains/DOMAIN_MAP.md`](../domains/DOMAIN_MAP.md), [`docs/product/ROLE_MATRIX.md`](../product/ROLE_MATRIX.md), [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md), [`ADR-0002`](../decisions/ADR-0002-USUARIOS-CON-MULTIPLES-ROLES.md).

Este documento gobierna la siguiente misión (comparación de alternativas técnicas). No selecciona stack, no diseña esquema físico, no inicia implementación.

---

## 1. Propósito

La arquitectura técnica de SASE Zero debe:

- soportar el producto funcional ya aprobado (`PRODUCT_MAP.md` y documentos relacionados), sin reabrir sus decisiones;
- comenzar con una sola escuela sin bloquear el crecimiento a multiescuela (Fundación §5);
- preservar privacidad, trazabilidad y propiedad de los datos institucionales (Fundación §13, §18);
- permitir evolución modular sin romper escuelas existentes (Fundación §19);
- evitar dependencia innecesaria de un proveedor;
- mantener operación mobile-first (Fundación §24);
- favorecer mantenimiento por equipos pequeños y agentes de IA (`README.md`, trabajo multiagente).

## 2. Fuera de alcance

Esta misión **no decide ni implementa**:

- framework de interfaz;
- proveedor de base de datos;
- proveedor de autenticación;
- hosting;
- esquema físico, tablas o migraciones;
- APIs concretas;
- diseño visual;
- código;
- infraestructura de producción;
- importación de datos desde `sase-light`.

## 3. Principios técnicos obligatorios

Toda comparación o diseño posterior debe respetar, como mínimo:

- separación por institución;
- mínimo privilegio;
- roles múltiples con contexto de acción, conforme a `ADR-0002` (institución, rol activo, grupo, área, caso, motivo);
- acceso a datos sensibles limitado por caso, nunca por navegación general de expedientes (`ROLE_MATRIX.md`, matriz D8/D9/D10);
- auditoría de lecturas y escrituras sensibles;
- aislamiento por defecto entre Salud, Trabajo Social y Orientación, con visibilidad cruzada solo por canalización explícita;
- prevención determinística independiente de IA (Fundación §15; `PRODUCT_MAP.md` §5);
- IA opcional, explicable y supervisada, sin capacidad de actuar de forma irreversible por sí sola (Fundación §14);
- portabilidad y exportación de datos, sin retención como rehén (Fundación §13);
- configuración institucional separada del núcleo estándar (Fundación §9, §19);
- crecimiento progresivo de una escuela a multiescuela, sin rediseño disruptivo (Fundación §5, §19);
- decisiones reversibles primero; irreversibles solo con justificación explícita;
- ningún dato real de alumnos durante arquitectura o pruebas iniciales.

## 4. Capacidades transversales que la arquitectura deberá resolver

Sin diseñar todavía la solución, se identifican las siguientes capacidades como necesarias:

- identidad;
- membresía institucional;
- roles y contexto activo;
- autorización;
- auditoría;
- expedientes y casos;
- canalizaciones;
- documentos y evidencias;
- notificaciones;
- configuración institucional;
- asistencia de jornada y por clase;
- alertas determinísticas;
- datos sensibles;
- exportación;
- operación multiescuela futura;
- observabilidad;
- respaldo y recuperación.

No se crean tablas, endpoints ni componentes físicos para estas capacidades en esta misión.

## 5. Decisiones que podrán resolverse con defaults reversibles

Se clasifican como reversibles, salvo evidencia en contrario que surja durante la comparación:

- organización inicial del código;
- formato interno de identificadores;
- estrategia inicial de módulos;
- proveedor de entorno de desarrollo local;
- herramientas de pruebas;
- estructura inicial de API;
- mecanismo inicial de notificaciones no críticas;
- librerías auxiliares.

## 6. Decisiones que requieren comparación antes de elegir

La próxima misión deberá comparar, sin decidir todavía, cada una de las siguientes, con criterios de evaluación explícitos (no proveedores ganadores):

| Decisión | Criterios de evaluación a aplicar |
|---|---|
| Arquitectura monolítica modular frente a servicios separados | mantenimiento por equipo pequeño, reversibilidad, aislamiento institucional, costo operativo |
| Aplicación web responsiva/PWA frente a otras superficies iniciales | mobile-first, conectividad escolar irregular, costo de mantenimiento |
| Base de datos relacional administrada | seguridad, aislamiento institucional, portabilidad, costo total |
| Autenticación y autorización | mínimo privilegio, soporte de multi-rol con contexto (`ADR-0002`), riesgo de dependencia |
| Almacenamiento de evidencias | privacidad, protección de datos sensibles, portabilidad |
| Hosting | costo total, reversibilidad, riesgo de dependencia del proveedor |
| Estrategia offline o conectividad intermitente | conectividad escolar irregular, experiencia mobile-first |
| Notificaciones | costo, facilidad de mantenimiento, capacidad multiescuela |
| Auditoría | trazabilidad, rendimiento, cumplimiento de §18 |
| Exportación y portabilidad | propiedad del dato (Fundación §13), facilidad de pruebas |
| Aislamiento multitenant | separación por institución, capacidad multiescuela, seguridad |

## 7. Restricciones irreversibles o sensibles

Requieren aprobación explícita del Product Owner antes de adoptarse:

- proveedor que genere dependencia estructural difícil de revertir;
- tratamiento, conservación o eliminación de datos;
- acceso a producción;
- credenciales;
- pagos;
- modelo comercial;
- cambios en privacidad;
- importación de datos reales;
- despliegue institucional;
- automatizaciones capaces de afectar casos sensibles.

## 8. Criterios de evaluación de alternativas

Matriz conceptual de criterios (sin puntuaciones inventadas) que la siguiente misión debe aplicar a cada alternativa comparada en la sección 6:

- seguridad;
- privacidad;
- aislamiento institucional;
- trazabilidad;
- costo total;
- facilidad de mantenimiento;
- reversibilidad;
- portabilidad;
- soporte mobile-first;
- conectividad escolar irregular;
- rendimiento;
- capacidad multiescuela;
- experiencia del equipo;
- facilidad de pruebas;
- operación y observabilidad;
- riesgo de dependencia del proveedor.

## 9. Artefactos previstos para la siguiente misión

La siguiente misión podrá producir, como máximo:

- comparación de alternativas (sección 6 de este contrato);
- arquitectura lógica;
- límites de módulos;
- diagramas conceptuales;
- modelo conceptual de datos;
- flujo de identidad y autorización;
- recomendación técnica razonada;
- ADR únicamente para decisiones estructurales realmente aprobadas por el Product Owner.

No implementa código, esquema físico ni infraestructura.

## 10. Criterios de cierre de arquitectura técnica

Antes de permitir implementación de producto, deberá existir:

- opción técnica recomendada y justificada;
- límites de módulos;
- modelo conceptual de datos;
- estrategia de identidad y autorización;
- estrategia multitenant;
- tratamiento de información sensible;
- estrategia de auditoría;
- estrategia de exportación y respaldo;
- pruebas previstas;
- riesgos documentados;
- decisiones del Product Owner registradas (ADR donde aplique);
- misión inicial de implementación acotada.

## Requisitos normativos sin fuente

Ningún requisito legal o normativo se introduce en este contrato sin fuente verificada. Donde una futura comparación requiera evaluar cumplimiento legal específico (por ejemplo, protección de datos de menores), el estado correspondiente será `En preparación` hasta contar con fuente normativa confirmada por el Product Owner.

## Validación de este documento

- Enlaza, en vez de duplicar, la fundación y la arquitectura funcional cerrada.
- No selecciona stack, proveedor ni tecnología.
- No introduce tablas, esquemas, endpoints ni código.
- Distingue requisito aprobado (secciones 1, 3), restricción (secciones 2, 7), criterio de evaluación (sección 8) y decisión diferida (secciones 5, 6, 9).
