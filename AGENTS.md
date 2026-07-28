# AGENTS.md — Gobierno multiagente de SASE Zero

Este archivo aplica a todos los agentes que trabajen en el repositorio.

## 1. Principio central

> El repositorio es la memoria del proyecto. Ningún agente debe depender de su memoria conversacional para conocer el estado de SASE Zero.

Antes de modificar algo, verifica el estado real del repositorio.

## 2. Lectura obligatoria

Lee en este orden y detente cuando tengas contexto suficiente para la tarea:

1. `README.md`
2. `docs/foundation/PRODUCT_FOUNDATION.md`
3. `AGENTS.md`
4. Archivo específico del agente, si existe
5. `.agent/state.json`
6. `.agent/handoff/CURRENT.md`
7. Solo los documentos y archivos relacionados con la tarea activa

No cargues todo el repositorio sin necesidad. Prefiere índices, búsquedas dirigidas y lecturas parciales.

## 3. Estado actual autorizado

La fase vigente es **arquitectura funcional previa a implementación**.

Está permitido:

- analizar la fundación;
- definir dominios, módulos, roles y flujos;
- detectar contradicciones y vacíos;
- redactar documentación canónica;
- proponer ADR;
- actualizar estado y handoff.

No está permitido todavía:

- crear interfaces de producto;
- elegir o instalar un stack irreversible;
- diseñar tablas físicas o migraciones;
- configurar Supabase, hosting o producción;
- implementar autenticación;
- programar módulos;
- usar datos reales de alumnos;
- inventar requisitos legales o escolares.

## 4. Precedencia

Ante contradicciones, respeta el orden definido en `README.md`.

Nunca cambies la fundación para acomodar una implementación. Si hay conflicto:

1. detén la parte afectada;
2. describe el conflicto;
3. presenta alternativas y consecuencias;
4. registra la pregunta abierta;
5. espera decisión del Product Owner;
6. registra la decisión mediante ADR cuando corresponda.

## 5. Contrato de tarea

Antes de trabajar, identifica:

- objetivo;
- alcance;
- archivos permitidos;
- fuentes canónicas;
- criterios de aceptación;
- validaciones necesarias;
- acciones prohibidas.

Si el contrato no está escrito, constrúyelo a partir del handoff y la documentación. No amplíes el alcance silenciosamente.

## 6. Reglas de ejecución

- Trabaja en incrementos pequeños y verificables.
- Distingue hechos aprobados, inferencias y propuestas.
- No presentes una hipótesis como decisión.
- Reutiliza conceptos canónicos; evita sinónimos que creen dominios duplicados.
- Conserva trazabilidad entre requisitos, módulos, flujos y decisiones.
- No dupliques contenido canónico en varios archivos; enlázalo.
- No elimines documentación ni historial sin autorización explícita.
- No uses datos personales reales durante diseño, desarrollo o pruebas.
- No ejecutes cambios destructivos ni irreversibles sin autorización.

## 7. Uso eficiente del contexto

Orden recomendado:

1. índices y tablas de contenido;
2. búsqueda textual;
3. búsqueda semántica local;
4. lectura de secciones concretas;
5. MCP solo cuando aporte una fuente necesaria;
6. lectura completa únicamente cuando sea indispensable.

Los MCP son herramientas de acceso, no fuentes de verdad ni sustitutos de la documentación canónica.

## 8. Validación

Antes de declarar una tarea terminada:

- comprueba que los archivos existen;
- revisa enlaces y referencias;
- busca contradicciones internas;
- verifica consistencia terminológica;
- confirma que no se excedió el alcance;
- registra preguntas abiertas;
- actualiza `.agent/handoff/CURRENT.md`;
- actualiza `.agent/state.json` si cambió la fase, el objetivo o el estado.

Cuando exista código, también deberán ejecutarse las pruebas y verificaciones pertinentes. No declares una validación que no ejecutaste.

## 9. Git y cambios

- Inspecciona el estado antes de modificar.
- No mezcles trabajo no relacionado.
- Usa mensajes de commit claros y acotados.
- No reescribas historia compartida.
- No fuerces push.
- No elimines ramas, etiquetas o archivos sin autorización.
- Si encuentras cambios ajenos, consérvalos y reporta el riesgo.

## 10. Handoff obligatorio

Cada entrega debe registrar como mínimo:

- objetivo trabajado;
- resultado;
- archivos creados o modificados;
- decisiones tomadas;
- validaciones ejecutadas;
- riesgos y bloqueos;
- preguntas abiertas;
- siguiente microtarea segura;
- estado del repositorio o referencia de commit.

Principio:

> Un agente informa; el siguiente verifica.

El agente entrante no debe confiar ciegamente en el handoff. Debe comprobar los archivos, el estado y las validaciones relevantes.

## 11. Responsabilidades humanas

Solo el Product Owner puede aprobar de forma definitiva:

- visión y alcance;
- prioridades y roadmap;
- modelo comercial;
- uso y conservación de datos;
- privacidad y decisiones sensibles;
- proveedores, credenciales y pagos;
- producción y despliegues;
- aceptación final del producto.

Los agentes pueden proponer, comparar y advertir, pero no sustituir estas decisiones.
