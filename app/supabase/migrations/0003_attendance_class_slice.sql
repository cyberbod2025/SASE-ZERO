-- supabase/migrations/0003_attendance_class_slice.sql
-- Rebanada vertical: asistencia por clase y grupo.
-- Modelo funcional: CLASS_SESSION -> sesiones_clase, ATTENDANCE_RECORD -> asistencias.
-- Una sesion por (grupo, docente, fecha); un registro de asistencia por (sesion, alumno).

create table sesiones_clase (
  id uuid primary key default gen_random_uuid(),
  grupo_id uuid not null references grupos(id) on delete cascade,
  docente_id uuid not null references docentes(id) on delete cascade,
  fecha date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (grupo_id, docente_id, fecha)
);

create table asistencias (
  id uuid primary key default gen_random_uuid(),
  sesion_id uuid not null references sesiones_clase(id) on delete cascade,
  alumno_id uuid not null references alumnos(id) on delete cascade,
  estado text not null check (estado in ('PRESENTE', 'AUSENTE', 'RETARDO')),
  nota text,
  created_by uuid not null references auth.users(id),
  updated_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (sesion_id, alumno_id)
);

create index idx_asistencias_sesion_id on asistencias(sesion_id);
create index idx_sesiones_clase_grupo_fecha on sesiones_clase(grupo_id, fecha);

-- updated_at automatico en ambas tablas
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_sesiones_clase_updated_at
before update on sesiones_clase
for each row
execute function set_updated_at();

create trigger trg_asistencias_updated_at
before update on asistencias
for each row
execute function set_updated_at();

-- created_by es inmutable una vez creado el registro (el upsert de la app siempre
-- envia created_by = usuario actual; esto evita que una actualizacion reescriba el autor original).
create or replace function keep_created_by()
returns trigger
language plpgsql
as $$
begin
  new.created_by = old.created_by;
  return new;
end;
$$;

create trigger trg_asistencias_keep_created_by
before update on asistencias
for each row
execute function keep_created_by();

-- Privilegios base de tabla (sin esto, RLS no llega a evaluarse).
-- Se revoca todo primero (incluye TRUNCATE/REFERENCES/TRIGGER, que Postgres otorga por
-- defecto al dueno/rol y que RLS NO filtra por fila) y se reotorga solo lo necesario.
revoke all on public.sesiones_clase from authenticated;
revoke all on public.asistencias from authenticated;
grant select, insert, update on public.sesiones_clase to authenticated;
grant select, insert, update on public.asistencias to authenticated;

-- RLS: sesiones_clase
alter table sesiones_clase enable row level security;

-- El docente solo ve/crea sesiones propias, de un grupo al que esta asignado.
create policy docente_lee_sus_sesiones
on sesiones_clase
for select
to authenticated
using (
  exists (
    select 1 from docentes d
    where d.id = sesiones_clase.docente_id
      and d.user_id = auth.uid()
  )
  and exists (
    select 1 from docente_grupos dg
    join docentes d on d.id = dg.docente_id
    where dg.grupo_id = sesiones_clase.grupo_id
      and d.user_id = auth.uid()
  )
);

create policy docente_crea_sus_sesiones
on sesiones_clase
for insert
to authenticated
with check (
  exists (
    select 1 from docentes d
    where d.id = sesiones_clase.docente_id
      and d.user_id = auth.uid()
  )
  and exists (
    select 1 from docente_grupos dg
    join docentes d on d.id = dg.docente_id
    where dg.grupo_id = sesiones_clase.grupo_id
      and d.user_id = auth.uid()
  )
);

-- RLS: asistencias
alter table asistencias enable row level security;

create policy docente_lee_asistencia_de_sus_sesiones
on asistencias
for select
to authenticated
using (
  exists (
    select 1
    from sesiones_clase s
    join docentes d on d.id = s.docente_id
    where s.id = asistencias.sesion_id
      and d.user_id = auth.uid()
  )
);

create policy docente_inserta_asistencia_de_sus_sesiones
on asistencias
for insert
to authenticated
with check (
  created_by = auth.uid()
  and updated_by = auth.uid()
  and exists (
    select 1
    from sesiones_clase s
    join docentes d on d.id = s.docente_id
    where s.id = asistencias.sesion_id
      and d.user_id = auth.uid()
  )
);

create policy docente_actualiza_asistencia_de_sus_sesiones
on asistencias
for update
to authenticated
using (
  exists (
    select 1
    from sesiones_clase s
    join docentes d on d.id = s.docente_id
    where s.id = asistencias.sesion_id
      and d.user_id = auth.uid()
  )
)
with check (
  updated_by = auth.uid()
  and exists (
    select 1
    from sesiones_clase s
    join docentes d on d.id = s.docente_id
    where s.id = asistencias.sesion_id
      and d.user_id = auth.uid()
  )
);

-- Cierre explicito: anon sin ningun privilegio de tabla.
revoke all on public.sesiones_clase from anon;
revoke all on public.asistencias from anon;
