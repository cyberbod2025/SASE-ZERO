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
