alter table public.artists
  add column if not exists media_sounds jsonb not null default '[]'::jsonb,
  add column if not exists media_releases jsonb not null default '[]'::jsonb,
  add column if not exists media_videos jsonb not null default '[]'::jsonb;

create or replace function public.admin_upsert_public_artist(
  p_secret text,
  p_slug text,
  p_name text,
  p_tagline text default null,
  p_bio text default null,
  p_instagram_url text default null,
  p_image_url text default null,
  p_display_order integer default 0,
  p_media_sounds jsonb default '[]'::jsonb,
  p_media_releases jsonb default '[]'::jsonb,
  p_media_videos jsonb default '[]'::jsonb
)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  artist_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  insert into public.artists(
    slug, name, tagline, bio, instagram_url, image_url, is_active, display_order,
    media_sounds, media_releases, media_videos, updated_at
  )
  values (
    p_slug, p_name, p_tagline, p_bio, p_instagram_url, p_image_url, true, p_display_order,
    coalesce(p_media_sounds, '[]'::jsonb),
    coalesce(p_media_releases, '[]'::jsonb),
    coalesce(p_media_videos, '[]'::jsonb),
    now()
  )
  on conflict (slug) do update set
    name = coalesce(nullif(public.artists.name, ''), excluded.name),
    tagline = coalesce(nullif(public.artists.tagline, ''), excluded.tagline),
    bio = coalesce(nullif(public.artists.bio, ''), excluded.bio),
    instagram_url = coalesce(nullif(public.artists.instagram_url, ''), excluded.instagram_url),
    image_url = coalesce(nullif(public.artists.image_url, ''), excluded.image_url),
    media_sounds = case when public.artists.media_sounds = '[]'::jsonb then excluded.media_sounds else public.artists.media_sounds end,
    media_releases = case when public.artists.media_releases = '[]'::jsonb then excluded.media_releases else public.artists.media_releases end,
    media_videos = case when public.artists.media_videos = '[]'::jsonb then excluded.media_videos else public.artists.media_videos end,
    is_active = true,
    display_order = case when public.artists.display_order = 0 then excluded.display_order else public.artists.display_order end,
    updated_at = now()
  returning id into artist_id;

  return artist_id;
end;
$$;

create or replace function public.admin_create_backoffice_item(p_secret text, p_kind text, p_payload jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  new_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  if p_kind = 'artist' then
    insert into public.artists(
      slug, name, tagline, bio, instagram_url, image_url, is_active, display_order,
      media_sounds, media_releases, media_videos
    )
    values (
      p_payload->>'slug',
      p_payload->>'name',
      nullif(p_payload->>'tagline', ''),
      nullif(p_payload->>'bio', ''),
      nullif(p_payload->>'instagram_url', ''),
      nullif(p_payload->>'image_url', ''),
      true,
      coalesce(nullif(p_payload->>'display_order', '')::integer, 0),
      coalesce(p_payload->'media_sounds', '[]'::jsonb),
      coalesce(p_payload->'media_releases', '[]'::jsonb),
      coalesce(p_payload->'media_videos', '[]'::jsonb)
    ) returning id into new_id;

  elsif p_kind = 'event' then
    insert into public.events(artist_id, title, venue, city, country_code, starts_at, ticket_url, status, is_published)
    values (
      nullif(p_payload->>'artist_id', '')::uuid,
      p_payload->>'title',
      nullif(p_payload->>'venue', ''),
      coalesce(nullif(p_payload->>'city', ''), 'À définir'),
      coalesce(nullif(p_payload->>'country_code', ''), 'FR'),
      (p_payload->>'starts_at')::timestamptz,
      nullif(p_payload->>'ticket_url', ''),
      coalesce(nullif(p_payload->>'status', ''), 'confirmed'),
      coalesce((p_payload->>'is_published')::boolean, true)
    ) returning id into new_id;

  elsif p_kind = 'booking' then
    insert into public.bookings(artist_id, event_name, venue, city, country_code, event_date, contact_name, contact_email, fee, status, payment_status, notes)
    values (
      nullif(p_payload->>'artist_id', '')::uuid,
      p_payload->>'event_name',
      nullif(p_payload->>'venue', ''),
      nullif(p_payload->>'city', ''),
      coalesce(nullif(p_payload->>'country_code', ''), 'FR'),
      nullif(p_payload->>'event_date', '')::date,
      nullif(p_payload->>'contact_name', ''),
      nullif(p_payload->>'contact_email', ''),
      nullif(p_payload->>'fee', '')::numeric,
      coalesce(nullif(p_payload->>'status', ''), 'lead'),
      coalesce(nullif(p_payload->>'payment_status', ''), 'not_applicable'),
      nullif(p_payload->>'notes', '')
    ) returning id into new_id;

  elsif p_kind = 'campaign' then
    insert into public.campaigns(artist_id, brand_name, title, brief, deliverables, budget, status, deadline, contact_name, contact_email)
    values (
      nullif(p_payload->>'artist_id', '')::uuid,
      p_payload->>'brand_name',
      p_payload->>'title',
      nullif(p_payload->>'brief', ''),
      nullif(p_payload->>'deliverables', ''),
      nullif(p_payload->>'budget', '')::numeric,
      coalesce(nullif(p_payload->>'status', ''), 'proposal'),
      nullif(p_payload->>'deadline', '')::date,
      nullif(p_payload->>'contact_name', ''),
      nullif(p_payload->>'contact_email', '')
    ) returning id into new_id;

  elsif p_kind = 'content' then
    insert into public.content_items(artist_id, title, content_type, platform, status, caption, asset_url, publish_at)
    values (
      nullif(p_payload->>'artist_id', '')::uuid,
      p_payload->>'title',
      coalesce(nullif(p_payload->>'content_type', ''), 'post'),
      coalesce(nullif(p_payload->>'platform', ''), 'instagram'),
      coalesce(nullif(p_payload->>'status', ''), 'idea'),
      nullif(p_payload->>'caption', ''),
      nullif(p_payload->>'asset_url', ''),
      nullif(p_payload->>'publish_at', '')::timestamptz
    ) returning id into new_id;

  elsif p_kind = 'contact' then
    insert into public.contacts(full_name, company, email, phone, category, country, relationship, notes)
    values (
      p_payload->>'full_name',
      nullif(p_payload->>'company', ''),
      nullif(p_payload->>'email', ''),
      nullif(p_payload->>'phone', ''),
      coalesce(nullif(p_payload->>'category', ''), 'other'),
      nullif(p_payload->>'country', ''),
      coalesce(nullif(p_payload->>'relationship', ''), 'prospect'),
      nullif(p_payload->>'notes', '')
    ) returning id into new_id;

  elsif p_kind = 'event' then
    update public.events set
      title = coalesce(nullif(p_payload->>'title', ''), title),
      venue = nullif(p_payload->>'venue', ''),
      city = coalesce(nullif(p_payload->>'city', ''), city),
      country_code = coalesce(nullif(p_payload->>'country_code', ''), country_code),
      starts_at = coalesce(nullif(p_payload->>'starts_at', '')::timestamptz, starts_at),
      ticket_url = nullif(p_payload->>'ticket_url', ''),
      status = coalesce(nullif(p_payload->>'status', ''), status)
    where id = p_id;

  elsif p_kind = 'booking' then
    update public.bookings set
      event_name = coalesce(nullif(p_payload->>'event_name', ''), event_name),
      venue = nullif(p_payload->>'venue', ''),
      city = nullif(p_payload->>'city', ''),
      event_date = nullif(p_payload->>'event_date', '')::date,
      contact_name = nullif(p_payload->>'contact_name', ''),
      contact_email = nullif(p_payload->>'contact_email', ''),
      fee = nullif(p_payload->>'fee', '')::numeric,
      status = coalesce(nullif(p_payload->>'status', ''), status),
      payment_status = coalesce(nullif(p_payload->>'payment_status', ''), payment_status),
      notes = nullif(p_payload->>'notes', ''),
      updated_at = now()
    where id = p_id;

  elsif p_kind = 'campaign' then
    update public.campaigns set
      brand_name = coalesce(nullif(p_payload->>'brand_name', ''), brand_name),
      title = coalesce(nullif(p_payload->>'title', ''), title),
      brief = nullif(p_payload->>'brief', ''),
      deliverables = nullif(p_payload->>'deliverables', ''),
      budget = nullif(p_payload->>'budget', '')::numeric,
      status = coalesce(nullif(p_payload->>'status', ''), status),
      deadline = nullif(p_payload->>'deadline', '')::date,
      contact_name = nullif(p_payload->>'contact_name', ''),
      contact_email = nullif(p_payload->>'contact_email', ''),
      updated_at = now()
    where id = p_id;

  elsif p_kind = 'content' then
    update public.content_items set
      title = coalesce(nullif(p_payload->>'title', ''), title),
      content_type = coalesce(nullif(p_payload->>'content_type', ''), content_type),
      platform = coalesce(nullif(p_payload->>'platform', ''), platform),
      status = coalesce(nullif(p_payload->>'status', ''), status),
      caption = nullif(p_payload->>'caption', ''),
      asset_url = nullif(p_payload->>'asset_url', ''),
      publish_at = nullif(p_payload->>'publish_at', '')::timestamptz
    where id = p_id;

  elsif p_kind = 'contact' then
    update public.contacts set
      full_name = coalesce(nullif(p_payload->>'full_name', ''), full_name),
      company = nullif(p_payload->>'company', ''),
      email = nullif(p_payload->>'email', ''),
      phone = nullif(p_payload->>'phone', ''),
      category = coalesce(nullif(p_payload->>'category', ''), category),
      country = nullif(p_payload->>'country', ''),
      relationship = coalesce(nullif(p_payload->>'relationship', ''), relationship),
      notes = nullif(p_payload->>'notes', '')
    where id = p_id;

  elsif p_kind = 'task' then
    insert into public.tasks(artist_id, title, category, priority, status, due_at)
    values (
      nullif(p_payload->>'artist_id', '')::uuid,
      p_payload->>'title',
      coalesce(nullif(p_payload->>'category', ''), 'general'),
      coalesce(nullif(p_payload->>'priority', ''), 'normal'),
      coalesce(nullif(p_payload->>'status', ''), 'todo'),
      nullif(p_payload->>'due_at', '')::timestamptz
    ) returning id into new_id;

  elsif p_kind = 'finance' then
    insert into public.financial_transactions(artist_id, label, type, amount, status, transaction_date, invoice_number, notes)
    values (
      nullif(p_payload->>'artist_id', '')::uuid,
      p_payload->>'label',
      coalesce(nullif(p_payload->>'type', ''), 'income'),
      (p_payload->>'amount')::numeric,
      coalesce(nullif(p_payload->>'status', ''), 'pending'),
      coalesce(nullif(p_payload->>'transaction_date', '')::date, current_date),
      nullif(p_payload->>'invoice_number', ''),
      nullif(p_payload->>'notes', '')
    ) returning id into new_id;

  else
    raise exception 'unknown kind';
  end if;

  return new_id;
end;
$$;

create or replace function public.admin_update_backoffice_item(p_secret text, p_kind text, p_id uuid, p_payload jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  if p_kind = 'artist' then
    update public.artists set
      name = coalesce(nullif(p_payload->>'name', ''), name),
      slug = coalesce(nullif(p_payload->>'slug', ''), slug),
      tagline = nullif(p_payload->>'tagline', ''),
      bio = nullif(p_payload->>'bio', ''),
      instagram_url = nullif(p_payload->>'instagram_url', ''),
      image_url = nullif(p_payload->>'image_url', ''),
      display_order = coalesce(nullif(p_payload->>'display_order', '')::integer, display_order),
      media_sounds = coalesce(p_payload->'media_sounds', media_sounds),
      media_releases = coalesce(p_payload->'media_releases', media_releases),
      media_videos = coalesce(p_payload->'media_videos', media_videos),
      updated_at = now()
    where id = p_id;

  elsif p_kind = 'task' then
    update public.tasks set
      title = coalesce(nullif(p_payload->>'title', ''), title),
      category = coalesce(nullif(p_payload->>'category', ''), category),
      priority = coalesce(nullif(p_payload->>'priority', ''), priority),
      status = coalesce(nullif(p_payload->>'status', ''), status),
      due_at = nullif(p_payload->>'due_at', '')::timestamptz
    where id = p_id;

  elsif p_kind = 'finance' then
    update public.financial_transactions set
      label = coalesce(nullif(p_payload->>'label', ''), label),
      type = coalesce(nullif(p_payload->>'type', ''), type),
      amount = coalesce(nullif(p_payload->>'amount', '')::numeric, amount),
      status = coalesce(nullif(p_payload->>'status', ''), status),
      transaction_date = coalesce(nullif(p_payload->>'transaction_date', '')::date, transaction_date),
      invoice_number = nullif(p_payload->>'invoice_number', ''),
      notes = nullif(p_payload->>'notes', '')
    where id = p_id;

  else
    raise exception 'unknown kind';
  end if;

  if not found then raise exception 'item not found'; end if;
end;
$$;

revoke all on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer) from public;
revoke all on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer,jsonb,jsonb,jsonb) from public;
revoke all on function public.admin_create_backoffice_item(text,text,jsonb) from public;
revoke all on function public.admin_update_backoffice_item(text,text,uuid,jsonb) from public;
grant execute on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer,jsonb,jsonb,jsonb) to anon, authenticated;
grant execute on function public.admin_create_backoffice_item(text,text,jsonb) to anon, authenticated;
grant execute on function public.admin_update_backoffice_item(text,text,uuid,jsonb) to anon, authenticated;
