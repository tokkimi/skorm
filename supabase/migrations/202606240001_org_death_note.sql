create table if not exists public.org_entries (
  id uuid primary key default gen_random_uuid(),
  task text not null default '',
  first_name text not null default '',
  mission text not null default '',
  status text not null default 'todo',
  commission_rate text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.death_note_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  entry_type text not null default 'person',
  reason text not null default '',
  status text not null default 'active',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.org_entries enable row level security;
alter table public.death_note_entries enable row level security;

drop policy if exists "agency team manages org entries" on public.org_entries;
create policy "agency team manages org entries"
on public.org_entries for all to authenticated
using (public.is_agency_team())
with check (public.is_agency_team());

drop policy if exists "agency team manages death note entries" on public.death_note_entries;
create policy "agency team manages death note entries"
on public.death_note_entries for all to authenticated
using (public.is_agency_team())
with check (public.is_agency_team());

create or replace function public.admin_get_private_lists(p_secret text)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if not private.valid_admin_secret(p_secret) then
    raise exception 'invalid admin secret';
  end if;

  return jsonb_build_object(
    'org_entries',
    coalesce((select jsonb_agg(to_jsonb(o) order by o.created_at desc) from public.org_entries o), '[]'::jsonb),
    'death_note_entries',
    coalesce((select jsonb_agg(to_jsonb(d) order by d.created_at desc) from public.death_note_entries d), '[]'::jsonb)
  );
end;
$$;

create or replace function public.admin_upsert_org_entry(
  p_secret text,
  p_id uuid default null,
  p_payload jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  v_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then
    raise exception 'invalid admin secret';
  end if;

  if p_id is null then
    insert into public.org_entries (task, first_name, mission, status, commission_rate, notes)
    values (
      coalesce(p_payload->>'task', ''),
      coalesce(p_payload->>'first_name', ''),
      coalesce(p_payload->>'mission', ''),
      coalesce(p_payload->>'status', 'todo'),
      coalesce(p_payload->>'commission_rate', ''),
      coalesce(p_payload->>'notes', '')
    )
    returning id into v_id;
    return v_id;
  end if;

  update public.org_entries
  set
    task = coalesce(p_payload->>'task', task),
    first_name = coalesce(p_payload->>'first_name', first_name),
    mission = coalesce(p_payload->>'mission', mission),
    status = coalesce(p_payload->>'status', status),
    commission_rate = coalesce(p_payload->>'commission_rate', commission_rate),
    notes = coalesce(p_payload->>'notes', notes),
    updated_at = now()
  where id = p_id
  returning id into v_id;

  if v_id is null then
    raise exception 'org entry not found';
  end if;

  return v_id;
end;
$$;

create or replace function public.admin_delete_org_entry(p_secret text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if not private.valid_admin_secret(p_secret) then
    raise exception 'invalid admin secret';
  end if;

  delete from public.org_entries where id = p_id;
  if not found then
    raise exception 'org entry not found';
  end if;
end;
$$;

create or replace function public.admin_upsert_death_note_entry(
  p_secret text,
  p_id uuid default null,
  p_payload jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  v_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then
    raise exception 'invalid admin secret';
  end if;

  if p_id is null then
    insert into public.death_note_entries (name, entry_type, reason, status, notes)
    values (
      coalesce(p_payload->>'name', ''),
      coalesce(p_payload->>'entry_type', 'person'),
      coalesce(p_payload->>'reason', ''),
      coalesce(p_payload->>'status', 'active'),
      coalesce(p_payload->>'notes', '')
    )
    returning id into v_id;
    return v_id;
  end if;

  update public.death_note_entries
  set
    name = coalesce(p_payload->>'name', name),
    entry_type = coalesce(p_payload->>'entry_type', entry_type),
    reason = coalesce(p_payload->>'reason', reason),
    status = coalesce(p_payload->>'status', status),
    notes = coalesce(p_payload->>'notes', notes),
    updated_at = now()
  where id = p_id
  returning id into v_id;

  if v_id is null then
    raise exception 'death note entry not found';
  end if;

  return v_id;
end;
$$;

create or replace function public.admin_delete_death_note_entry(p_secret text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if not private.valid_admin_secret(p_secret) then
    raise exception 'invalid admin secret';
  end if;

  delete from public.death_note_entries where id = p_id;
  if not found then
    raise exception 'death note entry not found';
  end if;
end;
$$;

grant execute on function public.admin_get_private_lists(text) to anon, authenticated;
grant execute on function public.admin_upsert_org_entry(text, uuid, jsonb) to anon, authenticated;
grant execute on function public.admin_delete_org_entry(text, uuid) to anon, authenticated;
grant execute on function public.admin_upsert_death_note_entry(text, uuid, jsonb) to anon, authenticated;
grant execute on function public.admin_delete_death_note_entry(text, uuid) to anon, authenticated;
