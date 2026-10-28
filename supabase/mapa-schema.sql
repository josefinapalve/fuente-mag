-- FUENTE · El mapa — tabla de respuestas comunitarias.
-- Pegar y ejecutar en Supabase: SQL Editor -> New query -> Run.

create extension if not exists "pgcrypto";

create table if not exists respuestas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  pregunta_semana text not null default '¿Qué libro te ha marcado?',
  nombre text not null,
  respuesta text not null,
  aprobado boolean not null default false
);

alter table respuestas enable row level security;

create policy "cualquiera puede enviar una respuesta"
  on respuestas for insert
  to anon
  with check (true);

create policy "solo se ven las respuestas aprobadas"
  on respuestas for select
  to anon
  using (aprobado = true);

grant select, insert on public.respuestas to anon;
