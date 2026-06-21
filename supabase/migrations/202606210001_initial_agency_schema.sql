create extension if not exists pgcrypto;

create type public.inquiry_status as enum ('new', 'qualified', 'in_progress', 'won', 'declined', 'archived');
create type public.inquiry_type as enum ('booking', 'brand', 'press', 'artist', 'other');

create table public.artists (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  bio text,
  instagram_url text,
  image_url text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid not null references public.artists(id) on delete cascade,
  title text not null,
  venue text,
  city text not null,
  country_code char(2) not null,
  starts_at timestamptz not null,
  ticket_url text,
  status text not null default 'confirmed',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type public.inquiry_type not null,
  contact_name text not null,
  company text,
  email text not null,
  phone text,
  artist_slug text,
  event_date date,
  budget_range text,
  message text not null,
  source text not null default 'website',
  status public.inquiry_status not null default 'new',
  internal_notes text,
  assigned_to uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.team_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null check (role in ('owner', 'manager', 'editor')),
  created_at timestamptz not null default now()
);

alter table public.artists enable row level security;
alter table public.events enable row level security;
alter table public.inquiries enable row level security;
alter table public.team_members enable row level security;

create policy "public reads active artists" on public.artists for select to anon, authenticated using (is_active);
create policy "public reads published events" on public.events for select to anon, authenticated using (is_published);
create policy "public creates inquiries" on public.inquiries for insert to anon, authenticated with check (status = 'new' and source = 'website');
create policy "team reads members" on public.team_members for select to authenticated using (user_id = auth.uid());

create or replace function public.is_agency_team()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.team_members where user_id = auth.uid());
$$;

create policy "team manages artists" on public.artists for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());
create policy "team manages events" on public.events for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());
create policy "team manages inquiries" on public.inquiries for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());

insert into public.artists (slug, name, tagline, instagram_url, display_order) values
('cgl-rave-unit', 'CGL Rave Unit', 'Electronic · Rave culture', 'https://www.instagram.com/cgl.raveunit/', 1),
('paga', 'Paga', 'DJ · Producer · Performer', 'https://www.instagram.com/paga_lmsa/', 2);

create index events_starts_at_idx on public.events(starts_at);
create index inquiries_status_created_at_idx on public.inquiries(status, created_at desc);
