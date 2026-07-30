-- supabase/tests/0001_rls_alumnos.sql
-- Ejecutar contra una base con la migracion 0001 ya aplicada.

begin;

-- Datos ficticios
insert into instituciones (id, nombre) values
  ('00000000-0000-0000-0000-000000000001', 'Instituto Ficticio Uno');

insert into grupos (id, institucion_id, nombre) values
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000001', '1A'),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000001', '1B');

-- Usuarios ficticios en auth.users (simulados; en Supabase real ya existen por signup)
insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-0000000000a1', 'docente.a@ficticio.test'),
  ('00000000-0000-0000-0000-0000000000a2', 'docente.b@ficticio.test');

insert into docentes (id, user_id, institucion_id, nombre) values
  ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-0000000000a1', '00000000-0000-0000-0000-000000000001', 'Docente A'),
  ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-0000000000a2', '00000000-0000-0000-0000-000000000001', 'Docente B');

-- Docente A asignado solo a 1A; Docente B asignado solo a 1B
insert into docente_grupos (docente_id, grupo_id) values
  ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000011'),
  ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000012');

insert into alumnos (id, institucion_id, grupo_id, nombre_completo) values
  ('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000011', 'Alumno Ficticio Uno (1A)'),
  ('00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000012', 'Alumno Ficticio Dos (1B)');

-- Simula la sesion del Docente A
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000a1"}', true);

do $$
declare
  vistos int;
  visto_1a boolean;
  visto_1b boolean;
begin
  select count(*) into vistos from alumnos;
  select exists(select 1 from alumnos where id = '00000000-0000-0000-0000-000000000031') into visto_1a;
  select exists(select 1 from alumnos where id = '00000000-0000-0000-0000-000000000032') into visto_1b;

  assert vistos = 1, 'FALLO: Docente A deberia ver exactamente 1 alumno (el de su grupo 1A), vio ' || vistos;
  assert visto_1a = true, 'FALLO: Docente A deberia ver al alumno de 1A y no lo ve';
  assert visto_1b = false, 'FALLO: Docente A NO deberia ver al alumno de 1B (grupo ajeno) y lo vio';

  raise notice 'OK: Docente A ve solo su grupo (1A), bloqueado en grupo ajeno (1B)';
end $$;

reset role;

rollback; -- nunca deja datos ficticios persistidos
