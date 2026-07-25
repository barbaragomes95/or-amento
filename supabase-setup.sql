-- Cole isto no Supabase: SQL Editor (menu lateral) -> New query -> colar tudo -> Run

create table if not exists orcamento (
  id text primary key,
  dados jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now()
);

alter table orcamento enable row level security;

create policy "anon pode ler orcamento"
  on orcamento for select
  to anon
  using (true);

create policy "anon pode inserir orcamento"
  on orcamento for insert
  to anon
  with check (true);

create policy "anon pode atualizar orcamento"
  on orcamento for update
  to anon
  using (true)
  with check (true);

insert into orcamento (id, dados)
values ('principal', '{}'::jsonb)
on conflict (id) do nothing;

-- Realtime: no Supabase, vá em Database -> Replication (ou Table Editor -> orcamento -> ...)
-- e habilite Realtime para a tabela "orcamento".
