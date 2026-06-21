create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete set null,
  event_name text not null,
  venue text,
  city text,
  country_code char(2),
  event_date date,
  contact_name text,
  contact_email text,
  fee numeric(12,2),
  currency char(3) not null default 'EUR',
  status text not null default 'lead' check (status in ('lead','negotiation','option','confirmed','completed','cancelled')),
  payment_status text not null default 'not_applicable' check (payment_status in ('not_applicable','pending','invoiced','partial','paid','late')),
  contract_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete set null,
  brand_name text not null,
  title text not null,
  brief text,
  deliverables text,
  budget numeric(12,2),
  status text not null default 'proposal' check (status in ('proposal','negotiation','active','review','completed','declined')),
  deadline date,
  contact_name text,
  contact_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete cascade,
  title text not null,
  content_type text not null default 'post',
  platform text not null default 'instagram',
  status text not null default 'idea' check (status in ('idea','production','review','scheduled','published','cancelled')),
  caption text,
  asset_url text,
  publish_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text,
  email text,
  phone text,
  category text not null default 'other',
  country text,
  relationship text not null default 'prospect',
  notes text,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete cascade,
  title text not null,
  category text not null default 'general',
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status text not null default 'todo' check (status in ('todo','doing','done','cancelled')),
  due_at timestamptz,
  assigned_to uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table public.financial_transactions (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references public.artists(id) on delete set null,
  booking_id uuid references public.bookings(id) on delete set null,
  campaign_id uuid references public.campaigns(id) on delete set null,
  label text not null,
  type text not null check (type in ('income','expense')),
  amount numeric(12,2) not null,
  currency char(3) not null default 'EUR',
  status text not null default 'pending' check (status in ('pending','invoiced','paid','late','cancelled')),
  transaction_date date not null default current_date,
  invoice_number text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;
alter table public.campaigns enable row level security;
alter table public.content_items enable row level security;
alter table public.contacts enable row level security;
alter table public.tasks enable row level security;
alter table public.financial_transactions enable row level security;

create policy "team manages bookings" on public.bookings for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());
create policy "team manages campaigns" on public.campaigns for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());
create policy "team manages content" on public.content_items for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());
create policy "team manages contacts" on public.contacts for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());
create policy "team manages tasks" on public.tasks for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());
create policy "team manages finances" on public.financial_transactions for all to authenticated using (public.is_agency_team()) with check (public.is_agency_team());

insert into public.events (artist_id, title, venue, city, country_code, starts_at, status)
select id, 'Delta Festival', 'Delta Festival', 'Marseille', 'FR', '2026-06-22 20:00:00+02', 'tba' from public.artists where slug = 'paga'
on conflict do nothing;
insert into public.events (artist_id, title, venue, city, country_code, starts_at, status)
select id, 'Fos en Pétanque', 'Fos en Pétanque', 'Fos-sur-Mer', 'FR', '2026-06-25 20:00:00+02', 'confirmed' from public.artists where slug = 'paga'
on conflict do nothing;
insert into public.events (artist_id, title, venue, city, country_code, starts_at, status)
select id, 'Holi Lakes Festival', 'Lacs de l''Eau d''Heure', 'Cerfontaine', 'BE', '2026-07-12 20:00:00+02', 'confirmed' from public.artists where slug = 'paga'
on conflict do nothing;
insert into public.events (artist_id, title, venue, city, country_code, starts_at, status)
select id, 'Scandals Pool Party', 'Scandals', 'Lyon', 'FR', '2026-07-14 18:00:00+02', 'confirmed' from public.artists where slug = 'paga'
on conflict do nothing;

create index bookings_event_date_idx on public.bookings(event_date);
create index campaigns_status_deadline_idx on public.campaigns(status, deadline);
create index content_publish_at_idx on public.content_items(publish_at);
create index tasks_status_due_at_idx on public.tasks(status, due_at);
create index financial_transactions_date_idx on public.financial_transactions(transaction_date desc);
