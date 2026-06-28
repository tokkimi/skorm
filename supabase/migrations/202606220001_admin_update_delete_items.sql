create or replace function public.admin_update_private_event(
  p_secret text,
  p_id uuid,
  p_title text,
  p_starts_at timestamptz,
  p_ends_at timestamptz default null,
  p_location text default null,
  p_category text default 'rendez-vous',
  p_notes text default null
) returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  update public.artist_private_events
  set
    title = p_title,
    starts_at = p_starts_at,
    ends_at = p_ends_at,
    location = p_location,
    category = p_category,
    notes = p_notes,
    updated_at = now()
  where id = p_id;

  if not found then raise exception 'private event not found'; end if;
end;
$$;

create or replace function public.admin_delete_private_event(p_secret text, p_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  delete from public.artist_private_events where id = p_id;
  if not found then raise exception 'private event not found'; end if;
end;
$$;

create or replace function public.admin_delete_backoffice_item(p_secret text, p_kind text, p_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  if p_kind = 'event' then
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
      updated_at = now()
    where id = p_id;

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

revoke all on function public.admin_update_private_event(text,uuid,text,timestamptz,timestamptz,text,text,text) from public;
revoke all on function public.admin_delete_private_event(text,uuid) from public;
revoke all on function public.admin_delete_backoffice_item(text,text,uuid) from public;
revoke all on function public.admin_update_backoffice_item(text,text,uuid,jsonb) from public;

grant execute on function public.admin_update_private_event(text,uuid,text,timestamptz,timestamptz,text,text,text) to anon, authenticated;
grant execute on function public.admin_delete_private_event(text,uuid) to anon, authenticated;
grant execute on function public.admin_delete_backoffice_item(text,text,uuid) to anon, authenticated;
grant execute on function public.admin_update_backoffice_item(text,text,uuid,jsonb) to anon, authenticated;
