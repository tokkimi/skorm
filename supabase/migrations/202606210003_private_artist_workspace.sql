create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.artist_private_events (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  category text not null default 'rendez-vous',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.artist_notes (
  artist_id uuid primary key references public.artists(id) on delete cascade,
  content text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.artist_private_events enable row level security;
alter table public.artist_notes enable row level security;

create policy "team manages private events" on public.artist_private_events for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());
create policy "team manages notes" on public.artist_notes for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());

create or replace function private.valid_admin_secret(p_secret text)
returns boolean language sql stable security definer set search_path = '' as $$
  select encode(extensions.digest(p_secret, 'sha256'), 'hex')
    = '875757525e4b70eb37645f842390cc7efc7bbd7ce5766ab04a1214086af9dc8c';
$$;

create or replace function public.admin_get_artist_workspace(p_secret text)
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  return jsonb_build_object(
    'artists', coalesce((select jsonb_agg(to_jsonb(a) order by a.display_order) from public.artists a), '[]'::jsonb),
    'events', coalesce((select jsonb_agg(to_jsonb(e) order by e.starts_at) from public.artist_private_events e), '[]'::jsonb),
    'notes', coalesce((select jsonb_agg(to_jsonb(n)) from public.artist_notes n), '[]'::jsonb)
  );
end;
$$;

create or replace function public.admin_create_artist(
  p_secret text, p_name text, p_slug text, p_tagline text default null, p_instagram_url text default null
) returns uuid language plpgsql security definer set search_path = '' as $$
declare new_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  insert into public.artists(name, slug, tagline, instagram_url, display_order)
  values (p_name, p_slug, p_tagline, p_instagram_url, coalesce((select max(display_order) + 1 from public.artists), 1))
  returning id into new_id;
  insert into public.artist_notes(artist_id) values (new_id);
  return new_id;
end;
$$;

create or replace function public.admin_create_private_event(
  p_secret text, p_artist_id uuid, p_title text, p_starts_at timestamptz,
  p_ends_at timestamptz default null, p_location text default null,
  p_category text default 'rendez-vous', p_notes text default null
) returns uuid language plpgsql security definer set search_path = '' as $$
declare new_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  insert into public.artist_private_events(artist_id, title, starts_at, ends_at, location, category, notes)
  values (p_artist_id, p_title, p_starts_at, p_ends_at, p_location, p_category, p_notes)
  returning id into new_id;
  return new_id;
end;
$$;

create or replace function public.admin_save_artist_note(p_secret text, p_artist_id uuid, p_content text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  insert into public.artist_notes(artist_id, content, updated_at)
  values (p_artist_id, p_content, now())
  on conflict (artist_id) do update set content = excluded.content, updated_at = now();
end;
$$;

revoke all on function public.admin_get_artist_workspace(text) from public;
revoke all on function public.admin_create_artist(text,text,text,text,text) from public;
revoke all on function public.admin_create_private_event(text,uuid,text,timestamptz,timestamptz,text,text,text) from public;
revoke all on function public.admin_save_artist_note(text,uuid,text) from public;
grant execute on function public.admin_get_artist_workspace(text) to anon, authenticated;
grant execute on function public.admin_create_artist(text,text,text,text,text) to anon, authenticated;
grant execute on function public.admin_create_private_event(text,uuid,text,timestamptz,timestamptz,text,text,text) to anon, authenticated;
grant execute on function public.admin_save_artist_note(text,uuid,text) to anon, authenticated;

create index artist_private_events_artist_starts_idx on public.artist_private_events(artist_id, starts_at);
