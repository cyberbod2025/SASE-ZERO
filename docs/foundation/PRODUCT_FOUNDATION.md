# DOCUMENTO FUNDACIONAL — SASE ZERO

**Versión:** 1.0  
**Estado:** Aprobado para inicio de diseño y construcción  
**Producto:** SASE Zero  
**Definición central:** Sistema Operativo de una Secundaria

---

# 1. Propósito

SASE Zero nace para resolver uno de los problemas más persistentes de la operación escolar:

> **La fragmentación de la información institucional.**

En una secundaria, la información suele quedar repartida entre libretas, hojas de cálculo, documentos de Word, grupos de WhatsApp, carpetas físicas, correos, archivos personales y la memoria de quienes participaron en cada situación.

Esta fragmentación provoca pérdida de información, duplicación de trabajo, falta de seguimiento, responsabilidades poco claras, decisiones sin contexto suficiente, documentos difíciles de localizar, casos que cambian de área sin continuidad y dependencia excesiva de personas específicas.

SASE Zero se concibe como la plataforma donde vive, se organiza y se conecta la operación institucional relevante de una secundaria.

# 2. Definición del producto

> **SASE es el Sistema Operativo de una Secundaria.**

No es únicamente un sistema de incidencias, un expediente digital, un generador de reportes, un sistema de control escolar, una herramienta para docentes o un asistente de inteligencia artificial.

SASE integra estos elementos en una plataforma institucional coherente, orientada a coordinar personas, áreas, procesos, documentos, evidencias, decisiones y seguimientos.

# 3. Promesa central

> **Ningún alumno y ningún caso debe perderse entre áreas.**

Para cumplir esta promesa, cada situación institucional relevante deberá contar con contexto, responsable, estado, evidencia, historial, siguiente acción, fecha de seguimiento, áreas involucradas, trazabilidad y cierre documentado.

La plataforma debe facilitar que cada persona sepa qué ocurrió, qué se ha hecho, qué falta, quién debe intervenir, cuándo debe actuar y qué evidencia respalda la decisión.

# 4. Mercado inicial

SASE Zero se enfocará inicialmente en:

> **Escuelas secundarias.**

No se intentará abarcar desde el inicio todos los niveles educativos ni cualquier tipo de institución.

Principio rector:

> **Antes de ser universal, SASE debe ser excelente para secundarias.**

La arquitectura podrá prepararse para una expansión posterior, pero las decisiones funcionales, los flujos y el lenguaje del producto se diseñarán primero para la realidad operativa de una secundaria.

# 5. Estrategia de crecimiento

El crecimiento será progresivo:

1. Primera escuela.
2. Validación institucional real.
3. Varias escuelas.
4. Administración multiescuela.
5. Supervisión o estructura regional.
6. Producto comercial escalable.

Desde su primera versión, la arquitectura deberá evitar dependencias que impidan crecer a múltiples escuelas.

Cada registro deberá pertenecer claramente a una institución y, cuando corresponda, a ciclo escolar, turno, grupo, área, usuario, alumno, caso o expediente.

# 6. Usuarios institucionales

SASE está diseñado para toda la estructura escolar autorizada.

Los roles iniciales podrán incluir Dirección, Subdirección, Docentes, Docentes tutores, Prefectura, Orientación, Trabajo Social, Servicios de salud o enfermería, Secretaría, UDEEI o apoyo equivalente y personal administrativo autorizado.

Cada rol deberá tener permisos específicos, información pertinente, responsabilidades visibles, panel de pendientes, herramientas adecuadas y límites claros de acceso.

> **No todos los usuarios deben ver toda la información.**

# 7. Fuente institucional de verdad

SASE acompañará una migración gradual.

Durante la adopción podrá convivir con papel, documentos existentes, hojas de cálculo, procesos manuales y sistemas previos. Sin embargo, el destino operativo debe ser claro:

> **SASE se convertirá progresivamente en la fuente institucional principal de verdad.**

La convivencia con herramientas anteriores no debe ser permanente si provoca duplicidad, contradicciones o pérdida de trazabilidad.

# 8. Documentación oficial

La operación digital no debe obligar a repetir el trabajo en Word, Excel u otros sistemas.

SASE deberá poder generar, según el módulo y las necesidades institucionales, citatorios, actas, reportes, constancias, oficios, fichas de seguimiento, acuerdos, canalizaciones, informes, expedientes, formatos institucionales, reportes estadísticos y exportaciones administrativas.

Los documentos podrán incluir datos institucionales, logotipo, folio, fecha, responsables, firmas, historial, mecanismos de verificación, versión imprimible y exportación a formatos adecuados.

Principio rector:

> **El documento nace en SASE, queda registrado en SASE y puede imprimirse o exportarse cuando sea necesario.**

# 9. Estandarización y configuración

SASE tendrá un núcleo funcional estandarizado que no cambiará arbitrariamente entre escuelas.

## 9.1 Elementos configurables

Cada institución podrá ajustar, dentro de límites seguros:

- nombre del plantel;
- logotipo;
- nombres visibles de áreas;
- responsables;
- turnos y horarios;
- catálogos;
- tipos de incidencias;
- plantillas;
- campos opcionales;
- nomenclaturas;
- reglas simples;
- módulos activos;
- parámetros operativos autorizados.

Una escuela podrá llamar al área “Orientación” y otra “Servicios Educativos” sin alterar el modelo interno que permite interoperabilidad y soporte.

## 9.2 Elementos no alterables libremente

No deberán quedar expuestos a personalización arbitraria:

- auditoría;
- integridad del expediente;
- permisos críticos;
- separación de información sensible;
- trazabilidad;
- identidad de registros;
- reglas de seguridad;
- estados canónicos esenciales;
- propiedad institucional de los datos;
- controles de privacidad;
- evidencia histórica.

# 10. Cobertura funcional

SASE debe construirse con suficiente profundidad para reducir al mínimo la brecha entre lo que una escuela necesita y lo que el producto ya puede resolver.

Principio rector:

> **SASE no debe obligar a la escuela a pedir que termine de construirse después de comprarlo.**

Una función no estará terminada solo porque exista una pantalla. Cada capacidad deberá considerar, cuando corresponda, creación, edición, permisos, consulta, búsqueda, filtros, historial, evidencias, responsables, notificaciones, documentos, reportes, exportación, auditoría, cierre, casos excepcionales, experiencia móvil y accesibilidad.

# 11. Solicitudes de nuevas funciones

Las solicitudes futuras deberán usarse para evolucionar SASE y no para corregir ausencias funcionales básicas.

Antes de aceptar una solicitud deberá verificarse:

1. ¿La función realmente falta?
2. ¿La necesidad ya puede resolverse mediante configuración?
3. ¿Existe una función equivalente en otro módulo?
4. ¿El problema es de descubrimiento, capacitación o experiencia de usuario?
5. ¿La función beneficiaría a otras secundarias?
6. ¿Afecta seguridad, privacidad o coherencia institucional?
7. ¿Debe incorporarse al núcleo, a un módulo opcional o rechazarse?

Las solicitudes podrán clasificarse como función ya existente, necesidad de capacitación, ajuste de configuración, mejora general, módulo opcional, integración, desarrollo especializado o solicitud incompatible con los principios de SASE.

# 12. Modelo comercial

El modelo comercial será híbrido.

No se cobrará únicamente “por escuela”, porque las instituciones pueden tener tamaños y necesidades muy diferentes.

El precio podrá considerar capacidad de alumnos, módulos contratados, número o tipo de instituciones, nivel de soporte, servicios de implementación, almacenamiento, integraciones, capacidades de inteligencia artificial y administración multiescuela.

La estructura deberá ser comprensible y evitar penalizar el uso legítimo del personal escolar.

# 13. Propiedad y portabilidad de los datos

> **La escuela es propietaria de sus datos.**

SASE presta el servicio de almacenamiento, organización, operación y procesamiento autorizado, pero no convierte los datos institucionales en propiedad del proveedor.

Cuando una institución deje de pagar o decida salir:

1. Recibirá un periodo de gracia.
2. Posteriormente podrá pasar a modo de solo lectura.
3. Podrá consultar y exportar su información.
4. Se ofrecerá un proceso de cierre asistido.
5. La eliminación de datos será programada, notificada y sujeta a políticas claras.
6. Se conservará únicamente lo exigido por obligaciones legales o contractuales aplicables.

Principio rector:

> **SASE nunca utilizará los datos como rehén.**

# 14. Inteligencia artificial

La inteligencia artificial será opcional, discreta, explicable, supervisada, configurable por módulo, limitada por permisos y auditada cuando actúe sobre información institucional.

Podrá ayudar a resumir expedientes, detectar pendientes, organizar información, redactar borradores, localizar patrones, preparar reportes, sugerir rutas de atención, mejorar búsquedas, convertir información dispersa en tareas y explicar el origen de una alerta.

No podrá actuar por sí sola para sancionar, diagnosticar, etiquetar alumnos, cerrar casos sensibles, modificar permisos críticos, emitir decisiones institucionales, enviar comunicaciones delicadas, eliminar evidencias o generar consecuencias irreversibles.

Principio rector:

> **La inteligencia artificial acompaña el criterio institucional; no lo sustituye.**

# 15. Prevención sin etiquetado

SASE no será solamente reactivo.

Deberá ayudar a identificar seguimientos vencidos, incidencias recurrentes, ausencias frecuentes, citatorios sin respuesta, situaciones que involucran varias áreas, cambios relevantes en patrones observables, acumulación de pendientes, casos sin responsable y riesgos operativos o institucionales.

Las alertas deberán basarse en evidencia, indicar por qué fueron generadas, ser revisables, permitir corrección, evolucionar cuando cambie la situación y evitar conclusiones automáticas.

SASE no deberá mostrar expresiones como “alumno problemático”, “alumno peligroso”, “alumno de alto riesgo” ni diagnósticos no emitidos por profesionales autorizados.

En su lugar deberá describir situaciones observables.

Ejemplo:

> Se detectan tres indicadores que ameritan revisión: aumento de inasistencias, dos seguimientos vencidos y tres incidencias recientes. Se recomienda revisión humana por Tutoría u Orientación.

Principio rector:

> **SASE debe anticipar situaciones, no condenar personas.**

# 16. Competencia real

El principal competidor de SASE no es una aplicación específica.

Es la dependencia institucional de datos fragmentados, registros aislados, comunicación informal, memoria individual, documentos sin conexión, procesos sin trazabilidad e información duplicada o contradictoria.

SASE deberá destacar por continuidad, conexión entre áreas, visibilidad de responsabilidades, recuperación rápida de información, historial confiable, experiencia coherente, reducción de duplicidad y claridad operativa.

# 17. Experiencia de usuario

SASE deberá ser:

- mobile-first;
- usable en computadora;
- claro para personal no técnico;
- rápido para registrar;
- fácil de consultar;
- accesible;
- consistente;
- tolerante a errores;
- explicable;
- orientado a tareas reales.

La interfaz deberá priorizar preguntas operativas:

- ¿Qué tengo pendiente?
- ¿Qué requiere atención hoy?
- ¿Qué cambió?
- ¿Quién es responsable?
- ¿Qué necesita seguimiento?
- ¿Dónde está la evidencia?
- ¿Qué puede hacer mi rol?
- ¿Cuál es el siguiente paso seguro?

# 18. Seguridad y privacidad

SASE deberá aplicar desde el diseño mínimo privilegio, separación por institución, separación por rol, protección de datos sensibles, registro de accesos, auditoría de acciones, cifrado cuando corresponda, controles de sesión, trazabilidad de cambios, respaldos, recuperación, políticas de conservación, eliminación segura y protección especial para información de salud, violencia, orientación y datos privados.

Ninguna función comercial o de inteligencia artificial podrá debilitar estos principios.

# 19. Principios de arquitectura

La arquitectura deberá:

- soportar múltiples escuelas;
- separar instituciones de forma segura;
- permitir módulos;
- mantener un núcleo estable;
- facilitar integraciones;
- evitar duplicidad lógica;
- permitir auditoría;
- soportar crecimiento gradual;
- funcionar con permisos por rol;
- conservar historial;
- permitir exportación;
- admitir evolución sin romper escuelas existentes.

La configuración visible para cada escuela no deberá alterar directamente estructuras internas críticas.

# 20. Memoria del proyecto

Para la construcción de SASE Zero:

> **El repositorio será la memoria del proyecto.**

Las decisiones no deberán depender de la memoria de Claude Code, Codex, OpenCode ni de un chat específico.

El repositorio deberá contener visión, alcance, arquitectura, dominios, decisiones, estado actual, tareas, pruebas, riesgos, instrucciones para agentes y reportes de continuidad.

# 21. Desarrollo multiagente

## Claude Code

Preferentemente para arquitectura, planeación, documentación, análisis amplio, descomposición de sistemas y revisión de coherencia.

## Codex

Preferentemente para implementación, pruebas, correcciones, tareas de código enfocadas y verificación técnica.

## OpenCode

Preferentemente para continuidad, mantenimiento, tareas alternativas y trabajo cuando otros agentes no estén disponibles.

Los agentes no tendrán propiedad exclusiva de áreas del producto. Todos deberán trabajar con las mismas fuentes canónicas, tareas claramente delimitadas, criterios de terminado, pruebas, reportes de entrega y verificación del trabajo anterior.

# 22. Protocolo de continuidad

Cada sesión de trabajo deberá dejar como mínimo:

- objetivo realizado;
- archivos modificados;
- pruebas ejecutadas;
- decisiones tomadas;
- riesgos;
- bloqueos;
- siguiente microtarea;
- estado del repositorio;
- referencias a commits o ramas cuando existan.

El siguiente agente deberá verificar el estado real antes de continuar.

Principio rector:

> **Un agente informa; el siguiente verifica.**

# 23. Decisiones reservadas al Product Owner

Corresponden al Product Owner humano la visión, el alcance, las prioridades, el modelo comercial, los precios, las licencias, los compromisos con clientes, el uso de datos, la privacidad, la contratación de proveedores, la producción, los despliegues, las credenciales, los pagos, la aceptación final y las decisiones sensibles sobre alumnos o instituciones.

Los agentes pueden analizar, proponer y advertir, pero no sustituir estas decisiones.

# 24. Criterios de éxito

SASE Zero será exitoso cuando una secundaria pueda afirmar que:

- sabe qué casos están abiertos;
- sabe quién es responsable;
- puede encontrar la evidencia;
- no repite registros innecesariamente;
- genera sus documentos desde el sistema;
- conserva continuidad entre áreas;
- identifica pendientes a tiempo;
- protege información sensible;
- puede exportar sus datos;
- puede operar desde dispositivos móviles;
- entiende por qué se genera cada alerta;
- no depende de una sola persona para saber qué ocurrió.

# 25. Límites iniciales

SASE Zero no deberá intentar resolver desde la primera etapa todos los niveles educativos, nómina, contabilidad completa, control gubernamental central, diagnóstico clínico, decisiones disciplinarias automáticas, vigilancia invasiva, sustitución del criterio profesional, personalización ilimitada ni automatizaciones irreversibles sin confirmación humana.

# 26. Declaración de identidad

> **SASE Zero es el Sistema Operativo de una Secundaria: una plataforma institucional que conecta personas, áreas, casos, evidencias, documentos y decisiones para que ningún alumno ni situación se pierda entre procesos fragmentados.**

> **Su inteligencia artificial acompaña, explica y organiza, pero nunca sustituye el criterio humano.**

> **Su prevención se basa en evidencia y situaciones observables, nunca en etiquetas permanentes.**

> **La escuela conserva siempre la propiedad y portabilidad de sus datos.**

# 27. Estado de aprobación

| Componente | Estado |
|---|---|
| ADN estratégico | 🟢 Aprobado |
| Propósito del producto | 🟢 Aprobado |
| Mercado inicial | 🟢 Aprobado |
| Modelo de adopción | 🟢 Aprobado |
| Modelo de configuración | 🟢 Aprobado |
| Política de datos | 🟢 Aprobado |
| Principios de inteligencia artificial | 🟢 Aprobado |
| Enfoque preventivo | 🟢 Aprobado |
| Arquitectura detallada | 🟡 Pendiente de diseño |
| Roadmap técnico | 🟡 Pendiente de elaboración |
| Bootstrap Prompt multiagente | 🟡 Pendiente de elaboración |

# 28. Siguiente etapa autorizada

La siguiente etapa de SASE Zero será traducir este documento en:

1. Mapa de dominios.
2. Arquitectura funcional.
3. Arquitectura técnica.
4. Modelo multiescuela.
5. Matriz de roles y permisos.
6. Catálogo inicial de módulos.
7. Modelo de datos conceptual.
8. Roadmap por fases.
9. Criterios de MVP.
10. Bootstrap Prompt para Claude Code.
11. Estructura documental del repositorio.
12. Protocolo de handoff entre agentes.

La arquitectura y el roadmap deberán respetar este documento como fuente de precedencia.

# 29. Regla de precedencia

Cuando exista conflicto entre una implementación propuesta y este documento:

1. Se detiene la implementación.
2. Se identifica el conflicto.
3. Se documentan alternativas.
4. El Product Owner decide.
5. La decisión se registra mediante un ADR.
6. Solo entonces se modifica la arquitectura o este documento.

# 30. Cierre

Con la aprobación de este documento, SASE Zero queda autorizado para pasar de la definición estratégica al diseño funcional y técnico.

**Estado general: 🟢 LISTO PARA ARQUITECTURA**
