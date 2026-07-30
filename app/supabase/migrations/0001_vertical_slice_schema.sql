-- supabase/migrations/0001_vertical_slice_schema.sql

create table instituciones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null
);

create table grupos (
  id uuid primary key default gen_random_uuid(),
  institucion_id uuid not null references instituciones(id) on delete cascade,
  nombre text not null
);

create table docentes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  institucion_id uuid not null references instituciones(id) on delete cascade,
  nombre text not null
);

create table docente_grupos (
  docente_id uuid not null references docentes(id) on delete cascade,
  grupo_id uuid not null references grupos(id) on delete cascade,
  primary key (docente_id, grupo_id)
);

create table alumnos (
  id uuid primary key default gen_random_uuid(),
  institucion_id uuid not null references instituciones(id) on delete cascade,
  grupo_id uuid not null references grupos(id) on delete cascade,
  nombre_completo text not null
);

-- Privilegio base de tabla: sin esto, RLS no llega a evaluarse (Postgres corta el acceso antes)
grant select on public.instituciones to authenticated;
grant select on public.grupos to authenticated;
grant select on public.docentes to authenticated;
grant select on public.docente_grupos to authenticated;
grant select on public.alumnos to authenticated;

-- RLS: instituciones
alter table instituciones enable row level security;

create policy docente_lee_su_institucion
on instituciones
for select
to authenticated
using (
  exists (
    select 1 from docentes d
    where d.institucion_id = instituciones.id
      and d.user_id = auth.uid()
  )
);

-- RLS: grupos
alter table grupos enable row level security;

create policy docente_lee_sus_grupos
on grupos
for select
to authenticated
using (
  exists (
    select 1
    from docente_grupos dg
    join docentes d on d.id = dg.docente_id
    where dg.grupo_id = grupos.id
      and d.user_id = auth.uid()
  )
);

-- RLS: docentes
alter table docentes enable row level security;

create policy docente_lee_su_propio_registro
on docentes
for select
to authenticated
using (
  user_id = auth.uid()
);

-- RLS: docente_grupos
alter table docente_grupos enable row level security;

create policy docente_lee_sus_propias_asignaciones
on docente_grupos
for select
to authenticated
using (
  exists (
    select 1 from docentes d
    where d.id = docente_grupos.docente_id
      and d.user_id = auth.uid()
  )
);

-- RLS: alumnos
alter table alumnos enable row level security;

create policy docente_lee_alumnos_de_sus_grupos
on alumnos
for select
to authenticated
using (
  exists (
    select 1
    from docente_grupos dg
    join docentes d on d.id = dg.docente_id
    where dg.grupo_id = alumnos.grupo_id
      and d.user_id = auth.uid()
  )
);

-- Cierre explícito: anon no debe tener ningún privilegio de tabla,
-- sin depender de que ninguna política futura lo deje descubierto.
revoke all on public.instituciones from anon;
revoke all on public.grupos from anon;
revoke all on public.docentes from anon;
revoke all on public.docente_grupos from anon;
revoke all on public.alumnos from anon;
