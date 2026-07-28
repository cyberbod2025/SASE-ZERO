# Comparación de Alternativas de Arquitectura Técnica — SASE Zero

**Estado:** Comparación redactada. Ningún stack aprobado.
**Fuente de precedencia:** [`TECHNICAL_ARCHITECTURE_CONTRACT.md`](TECHNICAL_ARCHITECTURE_CONTRACT.md) (§6 decisiones a comparar, §8 criterios). Este documento no repite el contrato ni la fundación; los enlaza y aplica.
**Se relaciona con:** [`ADR-0001`](../decisions/ADR-0001-RELACION-CON-TRABAJO-PREVIO.md), [`ADR-0002`](../decisions/ADR-0002-USUARIOS-CON-MULTIPLES-ROLES.md), [`ROLE_MATRIX.md`](../product/ROLE_MATRIX.md), [`PRODUCT_MAP.md`](../product/PRODUCT_MAP.md), [`DOMAIN_MAP.md`](../domains/DOMAIN_MAP.md).

---

## 1. Propósito y límites

Este documento:

- compara alternativas técnicas por patrón, no por proveedor ganador;
- identifica ventajas, riesgos y dependencias entre decisiones;
- propone listas cortas de alternativas que deben continuar en evaluación;
- **no** selecciona stack técnico definitivo;
- **no** diseña arquitectura física, esquema de datos ni endpoints;
- **no** autoriza implementación de producto.

Toda alternativa aquí discutida sigue sujeta a los principios técnicos obligatorios del contrato (§3) y a las restricciones irreversibles (§7), que requieren aprobación explícita del Product Owner antes de adoptarse.

## 2. Restricciones heredadas

Toda alternativa viable debe respetar, sin excepción (fuente: contrato §1, §3; `ADR-0002`; `ROLE_MATRIX.md`):

- separación por institución;
- mínimo privilegio;
- usuarios con múltiples roles y contexto de acción activo (institución, rol, grupo, área, caso, motivo — `ADR-0002`);
- acceso a datos sensibles limitado por caso, nunca por navegación general de expedientes (`ROLE_MATRIX.md`, D8/D9/D10);
- auditoría de acciones sensibles (lectura y escritura);
- aislamiento por defecto entre Salud, Trabajo Social y Orientación, con visibilidad cruzada solo por canalización explícita;
- prevención determinística independiente de IA;
- IA opcional, explicable y supervisada, sin acción irreversible autónoma;
- propiedad, exportación y portabilidad de los datos institucionales;
- operación mobile-first;
- conectividad escolar potencialmente irregular;
- crecimiento de una escuela a multiescuela sin rediseño disruptivo;
- mantenimiento viable para un equipo pequeño (y agentes de IA);
- decisiones reversibles primero; irreversibles solo con justificación explícita y aprobación del Product Owner.

## 3. Método de comparación

Se aplican los criterios cualitativos del contrato (§8) a cada alternativa: **seguridad, privacidad, aislamiento institucional, trazabilidad, costo total, facilidad de mantenimiento, reversibilidad, portabilidad, mobile-first, conectividad irregular, rendimiento, capacidad multiescuela, experiencia del equipo, facilidad de pruebas, operación/observabilidad, dependencia del proveedor.**

Escala de valoración utilizada (cualitativa, no numérica):

- **favorable** — la alternativa cumple bien el criterio sin condiciones relevantes;
- **aceptable** — cumple el criterio con algún costo o limitación menor;
- **condicionado** — cumple el criterio solo si se dan ciertas condiciones (equipo, escala, configuración);
- **desfavorable** — entra en conflicto relevante con el criterio;
- **requiere evidencia** — no puede valorarse sin datos o prototipo adicional.

No se usan puntuaciones numéricas ni promedios. Cada valoración incluye una explicación breve de por qué se asignó.

## 4. Comparaciones obligatorias

### A. Forma general de la aplicación

| Alternativa | Complejidad inicial | Mantenimiento (equipo pequeño) | Límites de módulos | Aislamiento institucional | Evolución futura | Costo operativo | Reversibilidad |
|---|---|---|---|---|---|---|---|
| Monolito modular | favorable — un solo despliegue, un solo repositorio | favorable — menos superficie operativa | condicionado — requiere disciplina de límites internos entre dominios (D1–D12) | aceptable — el aislamiento depende del diseño de datos, no de la separación de procesos | condicionado — permite extraer servicios más tarde si los límites internos ya son claros | favorable — un solo entorno que operar | favorable — más fácil de deshacer o reescribir por partes |
| Servicios separados | desfavorable — múltiples despliegues, contratos entre servicios desde el día uno | desfavorable — exige observabilidad y coordinación que un equipo pequeño no sostiene fácilmente | favorable — el límite de módulo es también límite de proceso | favorable — aislamiento reforzado por separación física | favorable — escala de forma natural si el producto ya lo requiere | desfavorable — más infraestructura desde el inicio | desfavorable — separar servicios prematuramente es costoso de revertir |
| Híbrido progresivo (monolito modular con límites internos explícitos, extracción selectiva diferida) | aceptable — exige diseñar límites de módulo desde el inicio aunque el despliegue sea único | favorable — mantiene la operación simple mientras el producto es pequeño | favorable — fuerza a declarar límites de dominio explícitos desde el principio, sin pagar el costo de servicios separados | aceptable — el aislamiento inicial sigue dependiendo del diseño de datos, con camino claro a reforzarlo | favorable — permite extraer un dominio a servicio propio cuando la evidencia lo justifique (p. ej. auditoría o notificaciones a escala) | favorable — costo de un monolito con la opcionalidad de dividir después | favorable — es la opción explícitamente diseñada para revertirse o evolucionar sin rediseño disruptivo |

**Dependencia:** esta decisión condiciona directamente C (persistencia), E (autorización) y L (aislamiento multitenant), porque el límite entre módulos define dónde vive cada regla de aislamiento.

### B. Superficie inicial

| Alternativa | Mobile-first | Instalación | Actualización | Acceso desde equipos escolares | Conectividad irregular | Capacidades offline | Mantenimiento |
|---|---|---|---|---|---|---|---|
| Web responsiva | favorable — funciona en cualquier navegador móvil sin fricción | favorable — no requiere instalación | favorable — actualización inmediata para todos | favorable — funciona en las computadoras de la escuela sin requisitos adicionales | desfavorable — sin estrategia offline propia, cada interrupción bloquea el uso | desfavorable — ninguna por defecto | favorable — una sola base de código de interfaz |
| PWA (progresiva) | favorable — igual que web responsiva, con opción de instalación ligera | aceptable — instalación opcional, sin fricción de tienda de aplicaciones | favorable — actualización controlada por el propio despliegue | favorable — igual que web responsiva | aceptable — puede incorporar caché de lectura y cola de escritura limitada (ver sección H) | condicionado — depende de cuánto offline se decida construir, no es automático | aceptable — algo más de complejidad que web pura, misma base de código |
| Aplicación híbrida (empaquetado nativo de una base web) | condicionado — mobile-first solo si la base web ya lo es | desfavorable — requiere tienda de aplicaciones o distribución manual | condicionado — depende del mecanismo de actualización elegido (algunas partes sí se actualizan como web) | desfavorable — no aporta ventaja sobre PWA para acceso desde computadoras | aceptable — similar a PWA si comparte la misma capa | condicionado — mismas capacidades que PWA, con costo adicional de empaquetado | desfavorable — mantiene dos superficies (empaquetado + web) para un mismo producto |
| Aplicaciones nativas separadas (una app por plataforma) | favorable — mejor aprovechamiento de capacidades del dispositivo | desfavorable — requiere tiendas de aplicaciones, revisión y distribución | desfavorable — ciclos de actualización más lentos y fragmentados | desfavorable — no resuelve acceso desde computadoras escolares sin una superficie adicional | condicionado — requiere diseño offline propio por plataforma | favorable — mayor control técnico sobre almacenamiento local | desfavorable — duplica el trabajo de mantenimiento entre plataformas |

**Dependencia:** la superficie inicial condiciona directamente H (offline) e I (notificaciones): una PWA habilita caché y notificaciones push web; una web pura no.

### C. Persistencia relacional administrada (patrones, no proveedores)

| Patrón | Seguridad | Portabilidad | Aislamiento | Operación | Costo | Dependencia | Auditoría y datos sensibles |
|---|---|---|---|---|---|---|---|
| Servicio relacional administrado con capacidades integradas (auth, políticas a nivel de fila, almacenamiento de objetos en la misma plataforma) | favorable — controles de seguridad ya maduros y mantenidos por el proveedor | condicionado — el modelo de datos relacional es portable; las capacidades integradas específicas del proveedor lo son menos | favorable — políticas a nivel de fila permiten aislamiento por institución dentro de una sola base | favorable — operación reducida para un equipo pequeño | favorable — costo inicial bajo o nulo en escala pequeña | condicionado — atarse a las capacidades integradas (no solo a la base relacional) aumenta la dependencia | aceptable — soporta auditoría y reglas de acceso granular, pero requiere diseño explícito, no viene resuelto por defecto |
| Base relacional administrada independiente (solo motor de base de datos, sin capacidades integradas de plataforma) | favorable — el motor relacional maduro sostiene los controles necesarios | favorable — el estándar relacional es ampliamente portable | aceptable — el aislamiento se implementa a nivel de aplicación o de esquema, no viene incluido | aceptable — requiere que el equipo opere identidad, autorización y almacenamiento de evidencias por separado | aceptable — costo previsible, pero se suma al de los demás servicios que antes venían integrados | favorable — menor acoplamiento a un proveedor único | aceptable — igual que el anterior, con más trabajo propio de integración |
| Plataforma de backend administrada (backend-as-a-service más amplio, más allá de solo base de datos) | condicionado — depende de qué tan maduros sean sus controles de seguridad específicos | desfavorable — suele acoplar más lógica al proveedor que un motor relacional puro | condicionado — depende de las primitivas de aislamiento que ofrezca la plataforma | favorable — menor operación propia | aceptable — puede escalar en costo de forma menos predecible | desfavorable — mayor superficie de dependencia estructural | requiere evidencia — depende del proveedor concreto, no evaluable en patrón general |
| Infraestructura autogestionada (motor relacional operado por el propio equipo) | condicionado — la seguridad depende enteramente de la disciplina operativa propia | favorable — máximo control sobre portabilidad | favorable — control total sobre el mecanismo de aislamiento elegido | desfavorable — exige capacidad operativa (parches, respaldo, monitoreo) que un equipo pequeño normalmente no sostiene | desfavorable — costo operativo oculto en tiempo humano, no solo en facturación | favorable — dependencia mínima de terceros | condicionado — todo el diseño de auditoría y acceso sensible recae en el equipo, sin apoyo del proveedor |

**Nota:** ningún patrón aquí implica una tabla, migración o esquema físico; solo el modelo operativo de dónde y cómo vive el dato relacional.

### D. Identidad y autenticación

| Alternativa | Distinción autenticación / membresía / rol activo / autorización | Soporte a `ADR-0002` (multi-rol con contexto) | Riesgo de dependencia |
|---|---|---|---|
| Identidad administrada integrada (parte de la misma plataforma de datos) | condicionado — resuelve bien la autenticación; membresía institucional, rol activo y acceso por caso deben modelarse aparte, en datos de aplicación, no en el proveedor de identidad | aceptable — viable si el contexto de acción (institución, rol, caso, motivo) se modela explícitamente fuera del proveedor de identidad | condicionado — acopla la autenticación a la misma plataforma que otras capacidades |
| Proveedor externo especializado en identidad | favorable — la autenticación queda claramente separada de la aplicación | aceptable — igual que el anterior: el proveedor resuelve "quién es", no "con qué rol actúa ahora" | condicionado — introduce una dependencia externa adicional, aunque desacoplada de la base de datos |
| Autenticación propia (construida por el equipo) | favorable — separación conceptual total, pero todo el trabajo de seguridad recae en el equipo | favorable — control total del modelo, sin adaptarse a un proveedor | favorable — dependencia mínima de terceros, a cambio de mayor responsabilidad propia |
| Modelo híbrido (autenticación de un proveedor + membresía/rol/autorización propios en la aplicación) | favorable — separa explícitamente autenticación (quién es) de membresía, rol activo y autorización (qué puede hacer ahora), que es justo la distinción que exige `ADR-0002` | favorable — es el patrón más directamente alineado con el contexto de acción exigido | aceptable — dependencia acotada solo a la autenticación, no a la lógica de permisos |

**Distinción obligatoria (contrato §3, `ADR-0002`):** ninguna alternativa resuelve por sí sola membresía institucional, rol activo, autorización, acceso por caso o auditoría solo por elegir un proveedor de identidad. Estas capas se modelan en la aplicación independientemente del proveedor de autenticación elegido.

### E. Autorización

| Alternativa | Mínimo privilegio | Roles múltiples y contexto activo | Canalizaciones | Datos sensibles | Auditabilidad | Complejidad |
|---|---|---|---|---|---|---|
| Autorización centralizada en la aplicación (reglas evaluadas en el código de la aplicación) | favorable — control total y explícito del contexto de acción | favorable — el contexto (rol activo, caso, motivo) es un concepto de la aplicación, fácil de expresar aquí | favorable — una canalización es una regla de aplicación explícita | favorable — el acceso por caso a D8/D9/D10 se puede expresar con precisión | favorable — la aplicación ya sabe qué decisión tomó y por qué | aceptable — crece con el número de reglas, pero permanece legible para un equipo pequeño al inicio |
| Políticas cercanas a los datos (reglas a nivel de fila o de plataforma de datos) | aceptable — puede reforzar el aislamiento por institución, pero expresa peor el "contexto de acción" completo | condicionado — el contexto rico de `ADR-0002` (rol activo, caso, motivo) es más difícil de expresar solo como política de fila | condicionado — una canalización con alcance parcial es más natural como regla de aplicación que como política de datos | condicionado — refuerza el aislamiento por institución, pero no sustituye la regla de "acceso por caso" | aceptable — refuerza que ninguna consulta se salte la regla, aunque el motivo de acceso sigue viviendo en la aplicación | aceptable — añade una capa adicional de reglas que mantener sincronizada con la aplicación |
| Motor externo de políticas (servicio dedicado de autorización) | favorable — permite expresar reglas de mínimo privilegio de forma centralizada y auditable | aceptable — puede modelar contexto rico, a costa de una pieza más de infraestructura | favorable — apto para expresar reglas de alcance parcial de forma explícita | favorable — apto para reglas explícitas de acceso por caso | favorable — decisiones de autorización trazables en un solo lugar | desfavorable — añade una pieza de infraestructura y una curva de aprendizaje que no se justifica en la escala inicial |
| Combinación progresiva (autorización en la aplicación primero, reforzada con políticas cercanas a los datos donde el riesgo de fuga sea mayor) | favorable — combina expresividad de contexto con una capa de respaldo para el aislamiento institucional | favorable — el contexto de acción vive en la aplicación desde el inicio | favorable — igual que autorización centralizada | favorable — refuerza D8/D9/D10 con una segunda capa sin añadir un motor externo | favorable — mantiene la trazabilidad de la aplicación y suma una verificación adicional | aceptable — algo más de disciplina de diseño, sin la carga de un motor externo |

**Dependencia:** E depende de D (identidad debe resolver primero "quién es" antes de que la autorización decida "qué puede hacer con qué rol activo").

### F. Almacenamiento de documentos y evidencias

| Alternativa | Privacidad | Permisos | Enlaces temporales | Exportación | Respaldo | Eliminación | Costo | Portabilidad |
|---|---|---|---|---|---|---|---|---|
| Almacenamiento de objetos administrado (servicio dedicado, fuera del motor relacional) | favorable — controles de acceso maduros y separados del dato estructurado | favorable — permisos por objeto, alineables con acceso por caso | favorable — soporta enlaces de vigencia limitada de forma nativa | favorable — exportación masiva es una operación estándar de este patrón | favorable — respaldo gestionado por el proveedor | aceptable — requiere que el equipo defina la política de eliminación explícita, el mecanismo la soporta | favorable — costo previsible y bajo en escala inicial | aceptable — el contenido es portable; la integración específica del proveedor, menos |
| Almacenamiento integrado en la misma plataforma de datos | aceptable — hereda los controles de la plataforma, sujeto a cómo modele permisos por objeto | aceptable — depende de qué tan bien la plataforma separa permisos de evidencias de permisos de datos estructurados | condicionado — depende de si la plataforma ofrece enlaces temporales nativos | aceptable — exportar evidencias junto con datos puede simplificar el paquete de cierre institucional (sección K) | favorable — un solo mecanismo de respaldo para datos y evidencias | aceptable — igual consideración que el anterior | favorable — sin costo adicional de un servicio separado | condicionado — mayor acoplamiento a la plataforma elegida |
| Sistema de archivos autogestionado | desfavorable — exige que el equipo construya y mantenga control de acceso, cifrado y expiración de enlaces desde cero | desfavorable — ningún permiso llega resuelto por defecto | desfavorable — debe construirse a mano | condicionado — técnicamente posible, con más trabajo de empaquetado | desfavorable — respaldo es responsabilidad operativa completa del equipo | condicionado — control total, pero también responsabilidad total | desfavorable — costo operativo oculto en mantenimiento y seguridad propios | favorable — máximo control sobre el formato final |
| Estrategia híbrida (objetos administrados para evidencias, con metadatos de acceso gobernados por la aplicación) | favorable — separa el contenido sensible (evidencia) de la decisión de quién puede verlo, que queda en la aplicación | favorable — permite aplicar la misma regla de "acceso por caso" que gobierna D8/D9/D10 | favorable — combina enlaces temporales del proveedor con la decisión de acceso de la aplicación | favorable — igual ventaja que almacenamiento administrado, con metadatos ya alineados al modelo de casos | favorable — respaldo gestionado, metadatos bajo control propio | favorable — la aplicación decide cuándo un objeto debe eliminarse, apoyada en el mecanismo del proveedor | aceptable — mismo costo del almacenamiento administrado, sin costo adicional relevante | aceptable — el contenido es portable; la capa de metadatos es propia y por tanto también portable |

### G. Hosting y ejecución

| Alternativa | Costo inicial | Operación | Observabilidad | Escalamiento | Reversibilidad | Mantenimiento (equipo pequeño) |
|---|---|---|---|---|---|---|
| Plataforma de despliegue administrada (PaaS) | favorable — bajo costo inicial, a menudo con capa gratuita para escala pequeña | favorable — mínima operación propia | aceptable — observabilidad básica incluida, puede requerir complemento para necesidades de auditoría | favorable — escala de forma administrada según demanda | favorable — despliegues suelen ser fáciles de recrear en otro proveedor si la aplicación no está fuertemente acoplada | favorable — el patrón más alineado con un equipo pequeño |
| Funciones / serverless | aceptable — costo proporcional al uso, favorable en tráfico bajo | aceptable — reduce operación de servidores, añade complejidad de composición entre funciones | condicionado — requiere agregación de trazas entre funciones para observabilidad clara | favorable — escalamiento automático por diseño | condicionado — la reversibilidad depende de cuánto se use el patrón para dividir prematuramente el monolito (ver A) | condicionado — favorable para piezas puntuales, menos si se vuelve el patrón dominante de toda la aplicación |
| Contenedores administrados | aceptable — costo previsible, típicamente mayor que PaaS en escala pequeña | aceptable — requiere más configuración que PaaS, menos que autogestionado | favorable — buen punto de apoyo para observabilidad estándar | favorable — escalamiento controlado y portable entre proveedores | favorable — el empaquetado en contenedores es en sí mismo una forma de portabilidad | condicionado — viable para un equipo pequeño si se mantiene simple, exige más disciplina que PaaS |
| Servidores autogestionados | desfavorable — costo inicial y de mantenimiento humano alto | desfavorable — toda la operación (parches, seguridad, disponibilidad) es responsabilidad propia | desfavorable — observabilidad debe construirse desde cero | condicionado — escalamiento manual, requiere planeación anticipada | favorable — máximo control, sin atarse a un proveedor específico | desfavorable — no viable como punto de partida para un equipo pequeño |
| Combinación progresiva (PaaS o contenedores administrados al inicio, con puerta abierta a portar la misma imagen/aplicación a otro proveedor) | favorable — mantiene el costo inicial bajo | favorable — operación mínima al inicio | aceptable — observabilidad básica desde el día uno, ampliable | favorable — crece según demanda real, no anticipada | favorable — es el patrón explícitamente elegido para preservar reversibilidad | favorable — alineado con mantenimiento por equipo pequeño |

**Dependencia:** G condiciona directamente costo operativo y observabilidad transversal (contrato §4); no condiciona el modelo de datos ni de autorización.

### H. Conectividad intermitente y offline

| Alternativa | Qué operaciones tolerarían retraso | Qué necesita confirmación inmediata | Información sensible que no debería persistirse localmente | Riesgos de sincronización | Complejidad |
|---|---|---|---|---|---|
| Solo conexión (sin estrategia offline) | ninguna — toda operación requiere conexión activa | todas, por diseño | no aplica — no hay persistencia local | ninguno — no hay estado local que reconciliar | favorable — la más simple de mantener |
| Caché de lectura (datos ya vistos disponibles sin conexión, sin escritura offline) | consulta de información ya cargada (por ejemplo, revisar un caso ya abierto) | cualquier registro nuevo, cualquier alerta, cualquier acción sobre un caso | contenido clínico o social detallado de D8/D9/D10 no debería quedar cacheado en el dispositivo más allá de lo estrictamente necesario para el rol activo | bajo — no hay escritura que reconciliar, solo posible desactualización de lo mostrado | aceptable — requiere invalidar caché con cuidado, sin lógica de sincronización de escritura |
| Cola local de escrituras limitadas (un conjunto acotado de acciones se registra localmente y se sincroniza al recuperar conexión) | acciones administrativas de bajo riesgo definidas explícitamente (por ejemplo, marcar asistencia ya tomada en papel) | cualquier alerta determinística, cualquier acceso o registro sobre datos sensibles (D8/D9/D10), cualquier decisión de canalización | ningún dato de D8/D9/D10 debería entrar en la cola local; el alcance de "acciones limitadas" debe excluir explícitamente lo sensible | medio — requiere resolver conflictos de orden y duplicados al sincronizar, y decidir qué pasa si dos dispositivos registran la misma acción | condicionado — viable solo si el conjunto de acciones permitidas se define de forma explícita y acotada, no como capacidad general |
| Offline-first (la aplicación funciona primero contra estado local, sincroniza en segundo plano) | en teoría, cualquier operación | en la práctica, las mismas que en la cola limitada: alertas, datos sensibles y canalizaciones necesitan una regla explícita de exclusión | todo dato sensible que no tenga una regla explícita de exclusión queda expuesto al riesgo de persistir en el dispositivo | alto — conflictos de sincronización, versiones divergentes y necesidad de resolución determinística en todo el dominio, no solo en un subconjunto | desfavorable en esta etapa — la complejidad y el riesgo de exponer datos sensibles localmente superan el beneficio para el alcance actual |

**Conclusión de esta comparación (sin diseñar mecanismo):** caché de lectura es de bajo riesgo y bajo costo; cola local de escrituras limitadas es viable solo si se acota explícitamente a acciones no sensibles; offline-first pleno no se recomienda para el alcance inicial por el riesgo de persistencia local de datos sensibles y por la complejidad de sincronización sobre dominios con reglas de auditoría estrictas.

### I. Notificaciones

| Alternativa | Notificaciones informativas | Pendientes | Alertas determinísticas | Emergencias | Comunicaciones sensibles |
|---|---|---|---|---|---|
| Dentro de la aplicación (bandeja interna) | favorable — costo mínimo, sin dependencia externa | favorable — natural para listas de pendientes por rol | favorable — se integra directamente con el modelo de auditoría y contexto de acción | desfavorable — no llega a quien no está usando la aplicación en ese momento | favorable — el contenido nunca sale del sistema, más fácil de proteger |
| Correo electrónico | aceptable — llega fuera de la aplicación, pero con más fricción de formato | aceptable — útil como recordatorio, no como fuente única de verdad | condicionado — aceptable si el contenido enviado por correo es genérico, no el detalle sensible | condicionado — más lento que push o mensajería, no ideal como único canal de emergencia | desfavorable — el correo no es un canal apto para contenido clínico o social detallado |
| Push web | favorable — inmediato y de bajo costo si la superficie ya es PWA (ver B) | favorable — bueno para pendientes con vigencia corta | favorable — apto para alertas determinísticas sin contenido sensible | aceptable — más inmediato que correo, depende de que el dispositivo tenga la app abierta o el permiso concedido | desfavorable — igual que correo: no debe llevar contenido sensible en el cuerpo de la notificación |
| Mensajería externa institucional (canal ya usado por la escuela, p. ej. un canal de mensajería que la institución ya opera) | condicionado — depende de que la escuela ya use ese canal de forma consistente | condicionado — útil solo si el canal externo es confiable para ese plantel | desfavorable — depende de un tercero fuera del control del sistema para algo determinístico | favorable — puede ser el canal más rápido si la escuela ya lo usa activamente para emergencias | desfavorable — mismo riesgo que correo/push, agravado por depender de una plataforma externa |
| Estrategia escalonada (bandeja interna como fuente de verdad; correo o push como recordatorio no sensible; mensajería externa solo si la escuela la habilita explícitamente para emergencias) | favorable — cubre el caso general sin depender de un solo canal | favorable — el pendiente vive siempre en la aplicación, el recordatorio es solo un aviso | favorable — la alerta determinística nace y se audita dentro de la aplicación; el canal externo solo avisa que existe, sin contenido sensible | favorable — permite habilitar el canal más rápido disponible para emergencias sin comprometer el contenido sensible | favorable — ningún canal externo transporta contenido clínico o social; el detalle solo vive dentro de la aplicación |

### J. Auditoría

| Alternativa | Integridad | Trazabilidad | Rendimiento | Consultas | Exportación | Retención | Acceso del personal |
|---|---|---|---|---|---|---|---|
| Registro transaccional dentro de la misma base relacional | favorable — se beneficia de las mismas garantías transaccionales que el resto del dato | favorable — fácil de relacionar con el registro original en la misma transacción | condicionado — el volumen de auditoría puede competir con el rendimiento operativo si no se separa físicamente | favorable — se puede consultar con las mismas herramientas que el resto del dato | aceptable — exportable junto con el resto de los datos institucionales | aceptable — la política de retención se define igual que la del resto de la base | favorable — se puede restringir con las mismas reglas de autorización (sección E) |
| Servicio o almacén separado, dedicado a auditoría | favorable — un almacén append-only reduce el riesgo de alteración retroactiva | favorable — sigue siendo trazable si se referencia bien al registro origen | favorable — aísla la carga de auditoría de la carga operativa | condicionado — requiere una segunda vía de consulta, más trabajo de integración | condicionado — exportar auditoría por separado exige un paso adicional de ensamblado con el resto de los datos | favorable — permite políticas de retención propias, distintas del dato operativo | condicionado — requiere reglas de acceso propias, coherentes con las de autorización general |
| Eventos append-only (cada acción sensible se registra como evento inmutable, sea en la misma base o en un almacén dedicado) | favorable — el patrón mismo (inmutabilidad) es la propiedad que exige el contrato §3 ("auditoría de lecturas y escrituras sensibles") | favorable — cada evento lleva el contexto de acción completo (`ADR-0002`) | aceptable — el volumen de eventos crece de forma predecible y puede paginarse | favorable — un modelo de eventos es naturalmente consultable por caso, rol o institución | favorable — un registro append-only es directo de exportar como paquete de auditoría | favorable — la retención se decide sobre un flujo de eventos, no sobre filas mutables | favorable — el acceso a eventos de auditoría puede restringirse igual que cualquier dato sensible |
| Estrategia híbrida (eventos append-only para toda acción sensible sobre D8/D9/D10 y canalizaciones; registro transaccional simple para el resto) | favorable — concentra la garantía más fuerte (inmutabilidad) exactamente donde el contrato la exige más | favorable — mantiene trazabilidad completa donde importa, sin sobrecargar el resto del sistema | favorable — evita pagar el costo de un almacén separado para todo, solo donde el riesgo lo justifica | favorable — combina consulta simple para lo general y consulta especializada para lo sensible | favorable — igual ventaja que eventos append-only para lo sensible | favorable — permite políticas de retención diferenciadas por sensibilidad | favorable — refuerza exactamente el acceso restringido que exige D8/D9/D10 |

### K. Exportación, respaldo y portabilidad

| Alternativa | Propiedad del dato | Recuperación | Portabilidad | Costos | Cierre de una escuela | Eliminación posterior |
|---|---|---|---|---|---|---|
| Exportaciones bajo demanda (la institución solicita un export cuando lo necesita) | favorable — refuerza que el dato pertenece a la escuela en todo momento | desfavorable — no es un mecanismo de recuperación ante fallas, solo de portabilidad | favorable — formato exportable definido explícitamente, no atado al proveedor | favorable — sin costo recurrente adicional | condicionado — útil solo si se complementa con un paquete de cierre institucional definido (ver abajo) | condicionado — la exportación no resuelve por sí sola la eliminación posterior de lo que quedó en el sistema |
| Exportaciones programadas (periódicas, automáticas) | favorable — refuerza propiedad de forma continua, no solo bajo solicitud | aceptable — sirve como respaldo adicional, no sustituye un respaldo técnico propiamente dicho | favorable — igual ventaja que bajo demanda, con la garantía de que siempre existe una copia reciente | aceptable — algo de costo de almacenamiento recurrente | favorable — una exportación reciente siempre disponible facilita el cierre institucional | condicionado — mismo matiz que el anterior |
| Respaldo administrado (por el proveedor de la plataforma) | condicionado — el respaldo protege contra pérdida, pero no sustituye la exportación como garantía de propiedad portable | favorable — es exactamente el mecanismo pensado para recuperación ante fallas | desfavorable — un respaldo del proveedor no suele ser portable a otro proveedor sin transformación | favorable — normalmente incluido o de bajo costo adicional en plataformas administradas | desfavorable — un respaldo no es, por sí mismo, un paquete de cierre institucional entregable a la escuela | desfavorable — un respaldo administrado no resuelve la eliminación selectiva y verificable de datos de una institución |
| Respaldo independiente (gestionado por el propio equipo, fuera del proveedor principal) | favorable — refuerza la independencia del proveedor | aceptable — recuperación viable, con más responsabilidad operativa propia | favorable — mayor control sobre el formato de recuperación | desfavorable — costo operativo adicional de mantener un segundo mecanismo | condicionado — requiere disciplina para que también sirva como base de un paquete de cierre | condicionado — igual responsabilidad operativa que el resto del respaldo independiente |
| Paquetes de cierre institucional (export estructurado y documentado, pensado explícitamente para que una escuela se retire con sus datos) | favorable — es la expresión más directa del principio de propiedad del dato (Fundación §13) | no aplica — no es un mecanismo de recuperación, es un mecanismo de salida | favorable — diseñado desde el inicio para portabilidad, no como subproducto de un respaldo | aceptable — costo de diseño único, bajo costo recurrente | favorable — resuelve directamente el escenario que motiva este criterio | condicionado — debe definirse junto con la política de eliminación, que sigue reservada al Product Owner (contrato §7) |

**Dirección provisional de esta comparación:** exportaciones programadas más respaldo administrado cubren recuperación y continuidad; un paquete de cierre institucional bien definido es el mecanismo que responde directamente a portabilidad y cierre de escuela, y no debe confundirse con el respaldo técnico.

### L. Aislamiento multitenant (conceptual)

| Alternativa | Seguridad | Complejidad | Costo | Operación | Exportación | Crecimiento multiescuela | Riesgo de filtración entre instituciones |
|---|---|---|---|---|---|---|---|
| Filas compartidas con identificador institucional (todas las instituciones en las mismas tablas, cada fila marcada con su institución) | condicionado — segura solo si toda consulta aplica el filtro institucional sin excepción, reforzada por políticas a nivel de fila (sección C/E) | favorable — el patrón más simple de implementar y razonar al inicio | favorable — sin costo adicional de infraestructura por institución | favorable — una sola base que operar y observar | condicionado — exportar los datos de una sola institución exige un filtro cuidadoso, no una copia trivial | favorable — escala de forma natural a muchas instituciones pequeñas sin multiplicar infraestructura | desfavorable — el riesgo más alto de los cuatro si una consulta olvida el filtro institucional |
| Esquemas separados (una institución, un esquema, misma base física) | favorable — el límite de esquema es una segunda barrera además del filtro de aplicación | aceptable — más disciplina de migración por esquema, aunque el motor sigue siendo uno solo | aceptable — costo similar al anterior, algo más de gestión por esquema | aceptable — sigue siendo una sola base física que operar | favorable — exportar un esquema completo es más directo que filtrar filas | condicionado — crece razonablemente hasta que el número de esquemas vuelva pesada la administración de migraciones | aceptable — el límite de esquema reduce, sin eliminar, el riesgo de fuga por error de aplicación |
| Bases separadas (una institución, una base física independiente) | favorable — el aislamiento más fuerte de los cuatro | desfavorable — cada institución nueva es una base física que crear, migrar y mantener | desfavorable — el costo crece con cada institución, no de forma compartida | desfavorable — la carga operativa crece linealmente con el número de escuelas | favorable — exportar o cerrar una institución es tan simple como aislar su propia base | desfavorable — el patrón menos escalable para "muchas escuelas pequeñas", el escenario central de crecimiento (§5, §19) | favorable — filtración entre instituciones estructuralmente casi imposible |
| Modelo híbrido por nivel de sensibilidad o escala (filas compartidas con identificador institucional para el grueso del dato; aislamiento más fuerte —esquema o base propia— reservado para instituciones que lo requieran por escala o por acuerdo explícito) | favorable — concentra el aislamiento más fuerte donde el riesgo o la escala lo justifican, sin pagar ese costo en todos los casos | condicionado — exige mantener dos patrones a la vez, viable solo con límites de módulo claros (ver A) | favorable — costo proporcional al riesgo o escala real, no uniforme | aceptable — la mayoría de las instituciones se opera de forma simple; solo las que requieren aislamiento reforzado añaden carga | favorable — hereda la ventaja de exportación de cada patrón según a cuál pertenezca la institución | favorable — es el patrón pensado explícitamente para "una escuela → validación → varias escuelas → multiescuela" sin rediseño disruptivo | aceptable — el riesgo se concentra donde ya se decidió invertir en aislamiento reforzado |

**Dependencia central:** L condiciona directamente C (patrón de persistencia) y E (autorización), porque el mecanismo de aislamiento elegido determina si el filtro institucional vive en políticas de datos, en la aplicación, o en ambos.

## 5. Mapa de dependencias

Relaciones identificadas entre las decisiones de la sección 4:

- **L (aislamiento multitenant) → C (persistencia) y E (autorización):** el patrón de aislamiento elegido determina si el filtro institucional se expresa como política de datos, como regla de aplicación, o como combinación de ambas. No puede evaluarse C ni E en detalle sin haber acotado L primero.
- **D (identidad) → membresía, rol activo y auditoría (J):** la autenticación resuelve solo "quién es"; membresía institucional, rol activo y motivo de acceso (`ADR-0002`) se modelan en la aplicación y en el registro de auditoría, no en el proveedor de identidad. D debe decidirse antes de detallar E y J, pero no determina su diseño interno.
- **B (superficie inicial) → H (offline) e I (notificaciones):** la superficie elegida (web, PWA, híbrida, nativa) habilita o limita directamente qué estrategias offline y de notificación son viables. H e I no pueden evaluarse en detalle sin que B esté al menos acotada.
- **F (almacenamiento de evidencias) → privacidad y exportación (K):** el patrón de almacenamiento de evidencias condiciona qué tan simple es construir un paquete de cierre institucional completo (evidencias + datos estructurados).
- **G (hosting) → observabilidad y costo operativo (J, K):** el modelo de hosting no determina el modelo de datos ni de autorización, pero sí qué tan fácil es observar y costear la auditoría y el respaldo en operación real.
- **A (forma general de la aplicación) → todas las demás:** el límite entre monolito modular, servicios separados o híbrido progresivo es el marco dentro del cual se ubican los límites de módulo de C, E, F, J y L.

**Decisiones evaluables de forma independiente entre sí (bajo riesgo de retrabajo):** B (superficie inicial), G (hosting), I (notificaciones no sensibles). Pueden acotarse sin esperar resolución de las demás.

**Decisiones que dependen de otra antes de poder cerrarse:** C y E dependen de L; J (en su forma detallada) depende de D; H depende de B; K depende de F.

**Decisiones que pueden diferirse sin bloquear la arquitectura lógica siguiente:** el mecanismo concreto de offline (H, más allá de la dirección de "caché de lectura + cola limitada acotada"), el proveedor específico de notificaciones externas (I), y el detalle operativo de observabilidad (G) pueden posponerse a una misión de diseño lógico posterior sin impedir avanzar en A, D y L.

## 6. Lista corta provisional

Para cada comparación: alternativas descartables tempranamente, alternativas que continúan, condiciones de continuidad, evidencia faltante. Ninguna preferencia aquí equivale a stack aprobado.

| Comparación | Descartable tempranamente | Continúa | Condición para continuar | Evidencia que falta |
|---|---|---|---|---|
| A. Forma general | servicios separados desde el inicio (`no recomendada para el inicio`) | monolito modular (`preferencia provisional`); híbrido progresivo (`preferencia provisional`, mismo patrón matizado | límites de módulo internos deben quedar explícitos antes de escribir código | ninguna adicional para continuar comparación; sí se requerirá para diseño lógico |
| B. Superficie inicial | aplicaciones nativas separadas (`no recomendada para el inicio`); aplicación híbrida empaquetada (`no recomendada para el inicio`) | PWA (`preferencia provisional`); web responsiva (`alternativa de respaldo` si PWA resulta inviable) | debe confirmarse que el equipo puede mantener una sola base de código con capacidades PWA | ninguna crítica; validar en prototipado si el caso de uso realmente requiere instalación |
| C. Persistencia relacional | infraestructura autogestionada (`no recomendada para el inicio`) | servicio relacional administrado con capacidades integradas (`preferencia provisional`); base relacional administrada independiente (`alternativa de respaldo`) | debe resolverse primero L (patrón de aislamiento) para saber qué capacidades de política de datos se necesitan | `requiere evidencia` sobre qué tan bien el proveedor concreto soporta auditoría append-only (sección J) — no se evalúa proveedor en esta misión |
| D. Identidad y autenticación | autenticación propia construida desde cero (`no recomendada para el inicio`, dado el equipo pequeño) | modelo híbrido (proveedor de autenticación + membresía/rol/autorización propios) (`preferencia provisional`) | debe documentarse explícitamente que membresía, rol activo y motivo de acceso viven en la aplicación, no en el proveedor | ninguna crítica para continuar comparación |
| E. Autorización | motor externo de políticas (`diferible`, no descartado, pero no se justifica en la escala inicial) | autorización centralizada en la aplicación (`preferencia provisional`); combinación progresiva con políticas cercanas a los datos (`alternativa de respaldo`, más relevante si L resulta en filas compartidas) | depende de L | ninguna crítica |
| F. Almacenamiento de evidencias | sistema de archivos autogestionado (`no recomendada para el inicio`) | estrategia híbrida: objetos administrados + metadatos de acceso propios (`preferencia provisional`) | debe definirse la regla de acceso por caso sobre evidencias en paralelo con D8/D9/D10 | ninguna crítica |
| G. Hosting | servidores autogestionados (`no recomendada para el inicio`) | combinación progresiva (PaaS o contenedores administrados con posibilidad de portar) (`preferencia provisional`) | ninguna condición bloqueante | `requiere evidencia` sobre el costo real a la escala de la primera escuela, evaluable solo con datos de uso |
| H. Offline | offline-first pleno (`no recomendada para el inicio`) | caché de lectura (`preferencia provisional`); cola local de escrituras limitadas y explícitamente acotada (`alternativa de respaldo`, condicionada) | la cola de escrituras solo continúa si se excluye explícitamente todo dato de D8/D9/D10 y toda alerta determinística | `requiere evidencia` sobre qué operaciones concretas del flujo diario toleran retraso — depende de `CORE_WORKFLOWS.md`, evaluación diferida |
| I. Notificaciones | ninguna descartada tempranamente — todas son válidas como parte de una estrategia escalonada | estrategia escalonada (bandeja interna + recordatorio no sensible + canal externo opcional) (`preferencia provisional`) | el canal externo institucional requiere que la escuela ya lo use de forma confiable; si no, se difiere | ninguna crítica |
| J. Auditoría | registro transaccional simple como única estrategia para todo (`no recomendada para el inicio` en su forma exclusiva) | estrategia híbrida (eventos append-only para lo sensible, registro simple para el resto) (`preferencia provisional`) | depende de D (contexto de identidad completo) para registrar rol activo y motivo | ninguna crítica |
| K. Exportación y respaldo | respaldo administrado como único mecanismo de portabilidad (`no recomendada` en solitario, aunque sí válida como respaldo técnico) | exportaciones programadas + paquete de cierre institucional (`preferencia provisional`) | la política de eliminación posterior sigue reservada al Product Owner | ninguna crítica para continuar comparación; sí requiere decisión del Product Owner antes de implementar (sección 8) |
| L. Aislamiento multitenant | bases separadas por institución desde el inicio (`no recomendada para el inicio`, dado el volumen esperado de escuelas pequeñas) | modelo híbrido por nivel de sensibilidad o escala (`preferencia provisional`); filas compartidas con identificador institucional reforzado por políticas (`alternativa de respaldo` si el híbrido resulta prematuro) | requiere que la regla de filtrado institucional se pruebe explícitamente antes de considerarse segura | `requiere evidencia`: prueba explícita de que ninguna consulta puede omitir el filtro institucional (verificable en diseño lógico, no aquí) |

## 7. Riesgos principales

| Riesgo | Mitigación conceptual |
|---|---|
| Sobrearquitectura (introducir servicios separados, motores de políticas o infraestructura autogestionada antes de necesitarlos) | preferir monolito modular e híbrido progresivo (A); diferir motor externo de autorización (E) y servicios separados hasta evidencia real de necesidad |
| Dependencia del proveedor | favorecer patrones (C, G) sobre proveedores concretos; mantener el modelo de datos y evidencias exportable independientemente de la plataforma elegida |
| Filtración multitenant (una consulta olvida el filtro institucional) | preferir un modelo híbrido por sensibilidad/escala (L) reforzado con políticas cercanas a los datos como segunda barrera, no solo autorización de aplicación |
| Autorización inconsistente entre módulos | mantener autorización centralizada en la aplicación (E) con reglas explícitas de contexto de acción (`ADR-0002`), evitando que cada módulo implemente su propia lógica de permisos |
| Offline excesivamente complejo | limitar la estrategia inicial a caché de lectura, y solo ampliar a cola de escrituras si se acota explícitamente a acciones no sensibles (H) |
| Crecimiento prematuro a microservicios | mantener la forma general como monolito modular con límites internos claros (A), y extraer servicios solo cuando la evidencia operativa lo justifique |
| Costos operativos ocultos | preferir plataformas administradas (C, G) en la etapa inicial; tratar cualquier estimación de costo como `requiere evidencia`, no como supuesto |
| Bloqueo de exportación (datos o evidencias atrapados en un formato propietario) | exigir que todo patrón elegido en C y F soporte exportación estructurada, y diseñar el paquete de cierre institucional (K) desde el inicio, no como ocurrencia tardía |
| Auditoría incompleta (acciones sensibles sin registro de contexto) | usar la estrategia híbrida de auditoría (J), reservando eventos append-only exactamente para D8/D9/D10 y canalizaciones |
| Persistencia local de datos sensibles (offline exponiendo D8/D9/D10 en el dispositivo) | excluir explícitamente todo dato de D8/D9/D10 de cualquier caché o cola local (H), sin excepción |

## 8. Decisiones reservadas al Product Owner

Ninguna se escala en esta misión. Se listan para que, si una alternativa aquí discutida se convierte en recomendación concreta, requiera aprobación explícita antes de adoptarse (contrato §7):

- proveedor estructural definitivo (base de datos, identidad, hosting, almacenamiento de evidencias);
- estrategia de conservación y eliminación de datos, incluida la política de cierre institucional;
- costos y modelo de pagos asociado a cualquier proveedor;
- acceso a producción;
- credenciales de cualquier sistema;
- importación de datos reales de alumnos;
- cambios en privacidad más allá de lo ya decidido en `ROLE_MATRIX.md` y `ADR-0002`;
- despliegue institucional real;
- cualquier automatización capaz de afectar casos sensibles de forma autónoma.

Estas decisiones deberán escalarse cuando exista una recomendación técnica concreta que las involucre, no en esta comparación.

## 9. Conclusión de la comparación

**Dirección arquitectónica provisional:** la evidencia favorece comenzar con un monolito modular con límites internos explícitos, superficie inicial PWA, persistencia relacional administrada con capacidades integradas evaluada junto con un patrón de aislamiento multitenant híbrido por sensibilidad o escala, identidad mediante un modelo híbrido (autenticación externa + membresía/rol/autorización propios), y hosting sobre una plataforma administrada con posibilidad explícita de portar. Ninguno de estos patrones implica todavía un proveedor concreto.

**Decisiones que ya pueden acotarse (patrón, no proveedor):** A (monolito modular/híbrido progresivo), D (modelo híbrido de identidad), G (plataforma administrada portable), I (estrategia escalonada de notificaciones).

**Decisiones que requieren una misión posterior de diseño lógico:** L (validar en diseño lógico que el aislamiento multitenant híbrido resiste el riesgo de filtración antes de comprometerse), C y E (detallar una vez que L esté acotado), J (diseñar el modelo de eventos append-only sobre D8/D9/D10 concretamente), F y K (diseñar el paquete de cierre institucional junto con el modelo de evidencias).

**Decisiones que deben mantenerse abiertas:** H (el mecanismo concreto de cola de escrituras limitadas, más allá de la dirección general de "caché de lectura primero"); todo proveedor estructural concreto (sección 8); cualquier decisión de conservación o eliminación de datos.

**Incertidumbres relevantes (máximo tres):**

1. Si el patrón de aislamiento multitenant híbrido (L) realmente sostiene el crecimiento de una escuela a multiescuela sin retrabajo, o si conviene comenzar directamente con esquemas separados — solo evaluable con diseño lógico más detallado.
2. Qué operaciones concretas del flujo diario (`CORE_WORKFLOWS.md`) toleran retraso offline sin comprometer una alerta determinística o un caso sensible — requiere revisión explícita de flujos, no solo del patrón general.
3. Qué tan bien un proveedor relacional administrado concreto soporta un modelo de auditoría append-only sin construir un almacén separado — solo evaluable cuando se compare evidencia real de proveedores, fuera del alcance de esta misión.

## Validación de este documento

- No selecciona proveedores ganadores ni stack técnico.
- No crea ADR ni modifica los ADR existentes.
- No diseña esquema físico, tablas, migraciones ni endpoints.
- Enlaza, en vez de duplicar, el contrato de arquitectura técnica y la arquitectura funcional cerrada.
- Toda valoración es cualitativa, con explicación breve; ninguna puntuación numérica inventada.
- Distingue preferencia provisional, alternativa de respaldo, no recomendada para el inicio y diferible en cada lista corta.
