-- supabase/seed.sql
-- Datos demo/ficticios para desarrollo local. Nada de alumnos reales.
-- Contraseña de los dos docentes demo: "demo1234" (solo entorno local).

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, recovery_sent_at, last_sign_in_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
) values
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-1111-1111-111111111111',
    'authenticated', 'authenticated',
    'docente.asignado@demo.sase-zero.test',
    crypt('demo1234', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(),
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    'authenticated', 'authenticated',
    'docente.no-asignado@demo.sase-zero.test',
    crypt('demo1234', gen_salt('bf')),
    now(), now(), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(),
    '', '', '', ''
  );

insert into auth.identities (
  id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
) values
  (
    gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111',
    '{"sub":"11111111-1111-1111-1111-111111111111","email":"docente.asignado@demo.sase-zero.test"}',
    'email', now(), now(), now()
  ),
  (
    gen_random_uuid(), '22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222',
    '{"sub":"22222222-2222-2222-2222-222222222222","email":"docente.no-asignado@demo.sase-zero.test"}',
    'email', now(), now(), now()
  );

insert into instituciones (id, nombre) values
  ('a0000000-0000-0000-0000-000000000001', 'Instituto Demo SASE Zero');

insert into grupos (id, institucion_id, nombre) values
  ('a0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', '1A Demo'),
  ('a0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', '1B Demo');

insert into docentes (id, user_id, institucion_id, nombre) values
  ('a0000000-0000-0000-0000-000000000021', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001', 'Docente Asignado (Demo)'),
  ('a0000000-0000-0000-0000-000000000022', '22222222-2222-2222-2222-222222222222', 'a0000000-0000-0000-0000-000000000001', 'Docente No Asignado (Demo)');

-- Solo el docente asignado tiene el grupo 1A Demo; el otro docente no tiene ninguna asignacion sobre ese grupo.
insert into docente_grupos (docente_id, grupo_id) values
  ('a0000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000011');

insert into alumnos (id, institucion_id, grupo_id, nombre_completo) values
  ('a0000000-0000-0000-0000-000000000031', 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 'Alumno Demo Uno'),
  ('a0000000-0000-0000-0000-000000000032', 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 'Alumno Demo Dos'),
  ('a0000000-0000-0000-0000-000000000033', 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000011', 'Alumno Demo Tres'),
  ('a0000000-0000-0000-0000-000000000034', 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000012', 'Alumno Demo Cuatro (1B)');
