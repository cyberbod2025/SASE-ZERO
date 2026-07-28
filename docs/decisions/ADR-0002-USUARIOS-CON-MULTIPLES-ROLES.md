# ADR-0002 — Usuarios con múltiples roles y contexto de acción

**Estado:** Aceptado
**Fecha:** 2026-07-27
**Responsable de la decisión:** Product Owner (Hugo Sánchez Reséndiz)
**Registrada durante:** revisión del PR #1 (`docs: define SASE Zero functional architecture v1`)

## Contexto

La matriz de roles (`docs/product/ROLE_MATRIX.md`) y el dominio `D1 Identidad, Acceso y Permisos` (`docs/domains/DOMAIN_MAP.md`) dejaron como pregunta abierta si un usuario puede tener más de un rol simultáneo (p. ej. docente y tutor) y si existirán roles a nivel de red multiescuela distintos de los roles de plantel. En una secundaria real es común que una misma persona cumpla varias funciones, por lo que un modelo de rol único por usuario no representa la operación real; pero una suma indiscriminada de permisos rompería el principio de mínimo privilegio de la fundación (§18).

## Decisión

> **Un usuario puede tener varios roles dentro de una misma institución, pero cada acción debe registrar el contexto desde el que se realizó: institución, rol activo, grupo, área, caso asignado y motivo de acceso cuando corresponda.**

Reglas complementarias aprobadas:

1. Los permisos no se suman de manera indiscriminada.
2. El acceso sensible depende también del ámbito y de la necesidad institucional.
3. Una canalización puede conceder acceso limitado a un caso, no al expediente completo.
4. Los roles multiescuela serán distintos de los roles internos del plantel.
5. Auditoría registrará con qué rol se consultó o modificó cada información.

## Alternativas consideradas

1. **Rol único por usuario:** simple de modelar, pero no representa la operación real de una secundaria, donde una persona puede ser docente, tutora y responsable de área a la vez. Descartada.
2. **Multi-rol con unión de permisos:** el usuario acumula todos los permisos de todos sus roles en todo momento. Descartada: viola mínimo privilegio (§18) y hace imposible auditar desde qué función se realizó cada acción.
3. **Multi-rol con contexto de acción explícito** *(elegida)*: el usuario puede tener varios roles, pero opera desde un contexto identificable, y la auditoría registra ese contexto en cada consulta o modificación.

## Consecuencias

- `D1 Identidad, Acceso y Permisos` debe modelar la asignación de múltiples roles por usuario y el concepto de contexto de acción (institución, rol activo, grupo, área, caso asignado, motivo de acceso cuando corresponda).
- `D2 Auditoría y Trazabilidad` registra el rol activo con el que se realizó cada consulta o modificación, no solo la identidad del usuario.
- La matriz de `ROLE_MATRIX.md` se lee por rol activo en contexto, no como suma de todos los roles de la persona.
- La canalización (`F2` en `CORE_WORKFLOWS.md`) concede acceso limitado al caso canalizado, nunca al expediente completo del alumno en los dominios sensibles.
- Los roles multiescuela (`D12`, `M18`) se diseñarán como un conjunto separado de los roles internos del plantel; ningún rol de plantel implica permisos de red.
- Las preguntas abiertas sobre multi-rol y roles multiescuela quedan resueltas y se retiran de las listas.

## Límites

- Esta decisión no define todavía la mecánica concreta de cambio de contexto (selección explícita, inferencia por pantalla, etc.); eso corresponde al diseño funcional detallado y no debe resolverse por inferencia.
- No autoriza implementación de autenticación ni de un modelo físico de permisos; la fase vigente sigue siendo arquitectura funcional.
- No modifica el acceso a dominios sensibles definido en `ROLE_MATRIX.md`; la pregunta sobre el alcance de Dirección/Subdirección a expedientes sensibles individuales sigue abierta.

## Criterio de aplicación

Cualquier documento o diseño posterior que involucre permisos debe expresarse en términos de **rol activo en contexto** y no de usuario plano. Si un diseño futuro requiere sumar permisos de varios roles en una misma acción, debe detenerse y escalarse al Product Owner mediante un nuevo ADR.
