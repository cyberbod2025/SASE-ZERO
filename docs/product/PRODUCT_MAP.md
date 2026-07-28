# Mapa de Producto — SASE Zero

**Estado:** Línea base de arquitectura funcional cerrada y aprobada.
**Fuente de precedencia:** [`docs/foundation/PRODUCT_FOUNDATION.md`](../foundation/PRODUCT_FOUNDATION.md). Este documento es el punto de entrada a la arquitectura funcional; no repite la fundación, la organiza y la conecta con los demás documentos.

Se relaciona con: [`docs/domains/DOMAIN_MAP.md`](../domains/DOMAIN_MAP.md), [`docs/product/MODULE_CATALOG.md`](MODULE_CATALOG.md), [`docs/product/ROLE_MATRIX.md`](ROLE_MATRIX.md), [`docs/product/CORE_WORKFLOWS.md`](CORE_WORKFLOWS.md).

## Leyenda

Misma leyenda usada en todo el mapa funcional: 🟢 hecho aprobado, 🔵 inferencia de diseño, 🟡 propuesta, ❓ pregunta abierta.

---

## 1. Qué es SASE Zero

> **SASE es el Sistema Operativo de una Secundaria.** — Fundación §2.

No es únicamente un sistema de incidencias, un expediente digital, un generador de reportes, un sistema de control escolar, una herramienta para docentes o un asistente de inteligencia artificial: integra todo eso en una plataforma institucional coherente que coordina personas, áreas, procesos, documentos, evidencias, decisiones y seguimientos — 🟢 §2.

**Promesa central:** ningún alumno y ningún caso debe perderse entre áreas — 🟢 §3.

## 2. Mercado inicial y estrategia de crecimiento

SASE Zero se enfoca inicialmente en **escuelas secundarias**, bajo el principio "antes de ser universal, SASE debe ser excelente para secundarias" — 🟢 §4.

Crecimiento progresivo aprobado: primera escuela → validación institucional real → varias escuelas → administración multiescuela → supervisión regional → producto comercial escalable — 🟢 §5. Este mapa funcional ya reserva espacio estructural para las etapas 4–5 mediante `D12` en `DOMAIN_MAP.md` y `M18` en `MODULE_CATALOG.md`, sin implementarlas todavía.

## 3. Cómo se traduce la visión en este mapa funcional

| Documento | Responde a la pregunta |
|---|---|
| `DOMAIN_MAP.md` | ¿Qué información y responsabilidad institucional existen, y cómo se relacionan entre sí? |
| `MODULE_CATALOG.md` | ¿Con qué unidades funcionales concretas interactúa cada rol? |
| `ROLE_MATRIX.md` | ¿Quién puede ver y hacer qué, y con qué límites? |
| `CORE_WORKFLOWS.md` | ¿Cómo se mueve una situación real de inicio a cierre? |

Los cuatro documentos son coherentes entre sí: cada módulo del catálogo referencia un dominio existente, cada rol de la matriz proviene literalmente de la fundación, y cada flujo referencia dominios, módulos y roles ya definidos. Ningún documento introduce un dominio, módulo o rol que no aparezca también en los demás.

## 4. Estandarización y configuración

SASE mantiene un núcleo funcional estandarizado (auditoría, integridad del expediente, permisos críticos, trazabilidad, identidad de registros, controles de privacidad — §9.2, 🟢) y permite configuración segura por institución (nombre, logotipo, nombres de áreas, turnos, catálogos, plantillas, módulos activos — §9.1, 🟢). Este límite se refleja en `MODULE_CATALOG.md` distinguiendo módulos **núcleo** de módulos **opcionales**, y en `DOMAIN_MAP.md` mediante `D3 Configuración Institucional`.

## 5. Prevención básica e inteligencia artificial opcional

Son dos capacidades distintas, y la fundación las trata por separado:

- **Prevención básica y explicable — capacidad central de SASE.** "SASE no será solamente reactivo" (🟢 §15): alertas determinísticas basadas en evidencia observable (casos sin responsable, seguimientos vencidos, citatorios sin respuesta, acuerdos vencidos, acumulación observable de incidencias), siempre revisables y nunca con etiquetas permanentes. Es parte del núcleo; la institución puede configurar umbrales y destinatarios dentro de límites seguros, pero la capacidad no desaparece.
- **Inteligencia artificial — ampliación opcional.** "Opcional, discreta, explicable, supervisada" (🟢 §14): análisis avanzado, resúmenes generativos, detección probabilística de patrones, sugerencias asistidas y cruces avanzados entre dominios sensibles. Desactivar la IA no desactiva las alertas básicas.

Decisión del Product Owner registrada en la revisión del PR #1 (2026-07-27). Ambas capacidades se modelan en `D11 Inteligencia y Alertas Institucionales` (dominio de solo lectura sobre los demás), en `M17` de `MODULE_CATALOG.md` y en el flujo `F5` de `CORE_WORKFLOWS.md`.

## 6. Seguridad, privacidad y propiedad de los datos

Mínimo privilegio, separación por institución y por rol, y protección especial para salud, violencia, orientación y datos privados — 🟢 §18. La escuela es propietaria de sus datos y puede exportarlos y llevárselos — 🟢 §13. Estos principios se implementan mediante `D1 Identidad, Acceso y Permisos`, `D2 Auditoría y Trazabilidad`, y las restricciones explícitas por rol en `ROLE_MATRIX.md` sobre `D8`, `D9` y `D10`.

## 7. Límites de esta fase

No se autoriza en esta fase (🟢 §25, `.agent/state.json`):

- interfaces de producto;
- base de datos física o migraciones;
- Supabase, hosting o infraestructura de producción;
- autenticación implementada;
- decisiones irreversibles de stack tecnológico;
- uso de datos reales de alumnos;
- requisitos legales o escolares inventados.

Este mapa funcional se detiene deliberadamente antes de esa línea.

## 8. Criterios de éxito heredados

Este mapa funcional debe permitir, en una fase posterior, que una secundaria pueda afirmar lo listado en la fundación §24: que sabe qué casos están abiertos, quién es responsable, dónde está la evidencia, que no repite registros, que genera sus documentos desde el sistema, que conserva continuidad entre áreas, que identifica pendientes a tiempo, que protege información sensible, que puede exportar sus datos, que puede operar desde dispositivos móviles, que entiende por qué se genera cada alerta, y que no depende de una sola persona para saber qué ocurrió — 🟢 §24. Cada uno de estos criterios tiene un dominio, módulo o flujo correspondiente en este mapa (trazabilidad detallada en `CORE_WORKFLOWS.md`, sección de matriz).

## 9. Relación con trabajo previo del Product Owner — decidido

Este mapa funcional se construyó exclusivamente a partir de las fuentes canónicas de este repositorio, sin asumir ni importar decisiones de ningún otro proyecto del Product Owner.

La antigua pregunta abierta n.º 1 fue resuelta por decisión del Product Owner, registrada en [`docs/decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md): **SASE Zero es una reconstrucción independiente y limpia**; SASE Light y otros trabajos previos pueden consultarse como evidencia o referencia funcional, pero no son fuentes canónicas, no se importan automáticamente y no determinan la arquitectura de SASE Zero. `F6` en `CORE_WORKFLOWS.md` continúa en nivel conceptual hasta que se audite el trabajo previo de admisión; el flujo previo de admisión no es un requisito de SASE Zero.

## 10. Cierre de la fase funcional — resolución de las preguntas

Las preguntas abiertas de esta fase quedaron resueltas en el cierre consolidado aprobado por el Product Owner (2026-07-28), aplicando la regla operativa permanente: las decisiones reversibles adoptan defaults explícitos; las variaciones entre escuelas se modelan como configuración; los detalles no necesarios se difieren a su fase; lo normativo sin fuente queda `En preparación`; solo se escala al Product Owner una decisión irreversible, transversal y realmente bloqueante.

| Tema | Resolución | Detalle pendiente y su fase |
|---|---|---|
| Catálogos y plantillas | Configuración institucional: Dirección administra por defecto y puede delegar permisos específicos mediante M1 | Configuración del MVP |
| Taxonomía de casos/incidencias | Catálogo configurable por plantel; SASE ofrecerá posteriormente un catálogo semilla (contenido no definido ahora) | Prototipado / piloto |
| Modelo de asistencia | Default reversible: jornada + clase. La jornada no prueba cada clase; las clases no reconstruyen la jornada; captura no realizada no equivale a ausencia; discrepancias observables pueden alimentar M17. El seguimiento académico y de convivencia permanece en D7 | Arquitectura técnica (modelo de datos conceptual) |
| Salud ↔ Trabajo Social | Aislamiento por defecto; visibilidad cruzada solo mediante canalización explícita y limitada al caso, conforme a `ADR-0002` | Política de privacidad detallada, antes del piloto |
| Apoyos especializados | Nombre visible configurable; por ahora "apoyos especializados". Correspondencia con terminología oficial vigente: `En preparación` | Validación institucional |
| Dirección/Subdirección y datos sensibles | **Decisión final del Product Owner:** indicadores agregados por defecto; el acceso a información individual de Salud, Trabajo Social u Orientación solo se permite sobre un caso concreto, por necesidad institucional justificada, con motivo registrado, alcance mínimo y auditoría. No existe navegación general por expedientes sensibles | — (decidido) |
| Subdirección | Default: funciones operativas de Dirección sin administración de configuración crítica | Diferenciación fina en prototipado |
| Prefectura vs. Docentes tutores | Ambos pueden originar casos; la responsabilidad depende de la asignación del caso, no de quién lo abrió; distribución configurable por plantel | Piloto con la primera escuela |
| Personal administrativo autorizado | Conjunto configurable de permisos, no perfil rígido | Configuración del MVP |
| Seguimiento vencido | Umbral configurable por tipo de caso, dentro de límites seguros | Valor semilla en prototipado |

**Estado de la fase:** la arquitectura funcional se declara suficiente para iniciar la siguiente fase. No queda ninguna pregunta bloqueante para el Product Owner. La implementación de producto continúa **no iniciada**.

Decisiones estructurales de la fase: [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md) (relación con trabajo previo) y [`ADR-0002`](../decisions/ADR-0002-USUARIOS-CON-MULTIPLES-ROLES.md) (multi-rol con contexto de acción).

## Validación de este documento

- Enlaza, en vez de duplicar, el contenido de `DOMAIN_MAP.md`, `MODULE_CATALOG.md`, `ROLE_MATRIX.md` y `CORE_WORKFLOWS.md`.
- Toda cita a la fundación referencia una sección concreta.
- Registra la resolución de cierre de todas las preguntas de la fase, con su default, configuración o fase de diferimiento.
