-- supabase/tests/0002_rls_attendance.sql
-- Ejecutar contra una base con las migraciones 0001-0003 ya aplicadas.
-- Caso positivo: docente asignado lee/crea/actualiza asistencia de su grupo.
-- Caso negativo: docente no asignado no ve, no crea, no actualiza; recibe resultado
-- controlado (0 filas / error de politica), nunca datos parciales.

begin;

insert into instituciones (id, nombre) values
  ('00000000-0000-0000-0000-000000000101', 'Instituto Ficticio Asistencia');

insert into grupos (id, institucion_id, nombre) values
  ('00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0000-000000000101', '2A');

insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-0000000000b1', 'docente.asignado@ficticio.test'),
  ('00000000-0000-0000-0000-0000000000b2', 'docente.no-asignado@ficticio.test');

insert into docentes (id, user_id, institucion_id, nombre) values
  ('00000000-0000-0000-0000-000000000121', '00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-000000000101', 'Docente Asignado'),
  ('00000000-0000-0000-0000-000000000122', '00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-000000000101', 'Docente No Asignado');

-- Solo el docente 121 esta asignado al grupo 2A.
insert into docente_grupos (docente_id, grupo_id) values
  ('00000000-0000-0000-0000-000000000121', '00000000-0000-0000-0000-000000000111');

insert into alumnos (id, institucion_id, grupo_id, nombre_completo) values
  ('00000000-0000-0000-0000-000000000131', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000111', 'Alumno Ficticio Uno (2A)');

-- ===================== CASO POSITIVO: docente asignado =====================
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b1"}', true);

do $$
declare
  v_grupo_visible boolean;
  v_alumno_visible boolean;
  v_sesion_id uuid;
begin
  select exists(select 1 from grupos where id = '00000000-0000-0000-0000-000000000111') into v_grupo_visible;
  assert v_grupo_visible = true, 'FALLO: docente asignado deberia leer su grupo';

  select exists(select 1 from alumnos where id = '00000000-0000-0000-0000-000000000131') into v_alumno_visible;
  assert v_alumno_visible = true, 'FALLO: docente asignado deberia leer alumnos de su grupo';

  insert into sesiones_clase (id, grupo_id, docente_id, fecha)
  values ('00000000-0000-0000-0000-000000000141', '00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0000-000000000121', '2026-08-03')
  returning id into v_sesion_id;

  insert into asistencias (sesion_id, alumno_id, estado, created_by, updated_by)
  values (v_sesion_id, '00000000-0000-0000-0000-000000000131', 'AUSENTE', '00000000-0000-0000-0000-0000000000b1', '00000000-0000-0000-0000-0000000000b1');

  update asistencias
  set estado = 'RETARDO', updated_by = '00000000-0000-0000-0000-0000000000b1'
  where sesion_id = v_sesion_id and alumno_id = '00000000-0000-0000-0000-000000000131';

  perform 1 from asistencias
  where sesion_id = v_sesion_id
    and alumno_id = '00000000-0000-0000-0000-000000000131'
    and estado = 'RETARDO';
  assert found, 'FALLO: docente asignado deberia poder recuperar y ver su propia actualizacion';

  raise notice 'OK: docente asignado puede leer grupo/alumnos, crear sesion, insertar y actualizar asistencia, y recuperarla';
end $$;

reset role;

-- ===================== CASO NEGATIVO: docente no asignado =====================
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000b2"}', true);

do $$
declare
  v_grupo_visible boolean;
  v_sesion_id uuid;
  v_error_capturado boolean := false;
begin
  select exists(select 1 from grupos where id = '00000000-0000-0000-0000-000000000111') into v_grupo_visible;
  assert v_grupo_visible = false, 'FALLO: docente NO asignado no deberia ver el grupo ajeno';

  select s.id into v_sesion_id
  from sesiones_clase s
  where s.id = '00000000-0000-0000-0000-000000000141';
  assert v_sesion_id is null, 'FALLO: docente NO asignado no deberia poder leer la sesion por identificador directo';

  -- Insert directo usando el id de sesion conocido por fuera de banda (no por lectura,
  -- que ya esta bloqueada arriba): la politica WITH CHECK de INSERT debe rechazarlo.
  begin
    insert into asistencias (sesion_id, alumno_id, estado, created_by, updated_by)
    values (
      '00000000-0000-0000-0000-000000000141', '00000000-0000-0000-0000-000000000131', 'PRESENTE',
      '00000000-0000-0000-0000-0000000000b2', '00000000-0000-0000-0000-0000000000b2'
    );
  exception when others then
    v_error_capturado := true;
  end;
  assert v_error_capturado = true, 'FALLO: docente NO asignado no deberia poder insertar asistencia (esperabamos error de politica WITH CHECK)';

  perform 1 from asistencias where alumno_id = '00000000-0000-0000-0000-000000000131' and created_by = '00000000-0000-0000-0000-0000000000b2';
  assert not found, 'FALLO: el intento de insercion del docente NO asignado no debio crear ninguna fila';

  update asistencias
  set estado = 'PRESENTE', updated_by = '00000000-0000-0000-0000-0000000000b2'
  where alumno_id = '00000000-0000-0000-0000-000000000131';

  perform 1 from asistencias
  where alumno_id = '00000000-0000-0000-0000-000000000131'
    and estado = 'PRESENTE';
  assert not found, 'FALLO: la actualizacion del docente NO asignado no debio afectar ninguna fila (RLS de UPDATE)';

  raise notice 'OK: docente no asignado no ve el grupo, no lee la sesion por id directo, no puede insertar y su update no afecta filas';
end $$;

-- TRUNCATE/DELETE no son operaciones filtradas por RLS por fila: si el privilegio de tabla
-- no fue revocado explicitamente, cualquier docente autenticado (asignado o no) podria
-- vaciar toda la tabla de todas las instituciones. Deben fallar por falta de privilegio.
do $$
declare
  v_error_capturado boolean := false;
begin
  begin
    truncate table asistencias;
  exception when insufficient_privilege then
    v_error_capturado := true;
  end;
  assert v_error_capturado = true, 'FALLO: TRUNCATE en asistencias deberia estar bloqueado por falta de privilegio para authenticated';

  v_error_capturado := false;
  begin
    delete from asistencias;
  exception when insufficient_privilege then
    v_error_capturado := true;
  end;
  assert v_error_capturado = true, 'FALLO: DELETE en asistencias deberia estar bloqueado por falta de privilegio para authenticated';

  v_error_capturado := false;
  begin
    truncate table sesiones_clase;
  exception when insufficient_privilege then
    v_error_capturado := true;
  end;
  assert v_error_capturado = true, 'FALLO: TRUNCATE en sesiones_clase deberia estar bloqueado por falta de privilegio para authenticated';

  raise notice 'OK: TRUNCATE/DELETE bloqueados por falta de privilegio de tabla para authenticated (no dependen de RLS por fila)';
end $$;

reset role;

rollback; -- nunca deja datos ficticios persistidos
