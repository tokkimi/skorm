create or replace function public.admin_create_backoffice_item(p_secret text, p_kind text, p_payload jsonb)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  new_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  if p_kind = 'event' then
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

revoke all on function public.admin_create_backoffice_item(text,text,jsonb) from public;
grant execute on function public.admin_create_backoffice_item(text,text,jsonb) to anon, authenticated;
