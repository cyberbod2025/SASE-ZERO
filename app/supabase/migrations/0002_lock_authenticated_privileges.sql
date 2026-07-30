-- supabase/migrations/0002_lock_authenticated_privileges.sql
-- Cierra explícitamente el privilegio de tabla para authenticated,
-- igual que 0001 lo cerró para anon. No depender de "todavía no hay
-- política" como único límite: revocar ALL heredado y dejar solo
-- el SELECT que el diseño realmente necesita.

revoke all on public.instituciones from authenticated;
revoke all on public.grupos from authenticated;
revoke all on public.docentes from authenticated;
revoke all on public.docente_grupos from authenticated;
revoke all on public.alumnos from authenticated;

grant select on public.instituciones to authenticated;
grant select on public.grupos to authenticated;
grant select on public.docentes to authenticated;
grant select on public.docente_grupos to authenticated;
grant select on public.alumnos to authenticated;
