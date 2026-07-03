create or replace function public.admin_upsert_public_artist(
  p_secret text,
  p_slug text,
  p_name text,
  p_tagline text default null,
  p_bio text default null,
  p_instagram_url text default null,
  p_image_url text default null,
  p_display_order integer default 0
)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  artist_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  insert into public.artists(slug, name, tagline, bio, instagram_url, image_url, is_active, display_order, updated_at)
  values (p_slug, p_name, p_tagline, p_bio, p_instagram_url, p_image_url, true, p_display_order, now())
  on conflict (slug) do update set
    name = excluded.name,
    tagline = excluded.tagline,
    bio = excluded.bio,
    instagram_url = excluded.instagram_url,
    image_url = excluded.image_url,
    is_active = true,
    display_order = excluded.display_order,
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
    insert into public.artists(slug, name, tagline, bio, instagram_url, image_url, is_active, display_order)
    values (
      p_payload->>'slug',
      p_payload->>'name',
      nullif(p_payload->>'tagline', ''),
      nullif(p_payload->>'bio', ''),
      nullif(p_payload->>'instagram_url', ''),
      nullif(p_payload->>'image_url', ''),
      true,
      coalesce(nullif(p_payload->>'display_order', '')::integer, 0)
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

create or replace function public.admin_delete_backoffice_item(p_secret text, p_kind text, p_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  if p_kind = 'artist' then
    delete from public.artists where id = p_id;
  elsif p_kind = 'event' then
    delete from public.events where id = p_id;
  elsif p_kind = 'booking' then
    delete from public.bookings where id = p_id;
  elsif p_kind = 'campaign' then
    delete from public.campaigns where id = p_id;
  elsif p_kind = 'content' then
    delete from public.content_items where id = p_id;
  elsif p_kind = 'contact' then
    delete from public.contacts where id = p_id;
  elsif p_kind = 'task' then
    delete from public.tasks where id = p_id;
  elsif p_kind = 'finance' then
    delete from public.financial_transactions where id = p_id;
  else
    raise exception 'unknown kind';
  end if;

  if not found then raise exception 'item not found'; end if;
end;
$$;

revoke all on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer) from public;
revoke all on function public.admin_create_backoffice_item(text,text,jsonb) from public;
revoke all on function public.admin_delete_backoffice_item(text,text,uuid) from public;

grant execute on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer) to anon, authenticated;
grant execute on function public.admin_create_backoffice_item(text,text,jsonb) to anon, authenticated;
grant execute on function public.admin_delete_backoffice_item(text,text,uuid) to anon, authenticated;
