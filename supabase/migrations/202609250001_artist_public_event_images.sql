-- Additive: no existing dates or fields are removed.
alter table public.events add column if not exists image_url text;

create or replace function public.artist_manage_public_event(
  p_secret text, p_artist_id uuid, p_id uuid, p_action text, p_payload jsonb
) returns uuid language plpgsql security definer set search_path = '' as $$
declare result_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  if p_id is not null and not exists (
    select 1 from public.events where id = p_id and artist_id = p_artist_id and is_published
  ) then raise exception 'event not found'; end if;
  if p_action = 'delete' and p_id is not null then
    delete from public.events where id = p_id and artist_id = p_artist_id;
    return p_id;
  end if;
  if p_action <> 'event' then raise exception 'invalid action'; end if;
  if p_id is null then
    insert into public.events(artist_id,title,venue,city,country_code,starts_at,is_published,image_url)
    values(p_artist_id,p_payload->>'title',p_payload->>'venue',p_payload->>'city',coalesce(nullif(p_payload->>'country_code',''),'FR'),
      (p_payload->>'starts_at')::timestamptz,true,nullif(p_payload->>'image_url','')) returning id into result_id;
  else
    update public.events set title=p_payload->>'title',venue=p_payload->>'venue',city=p_payload->>'city',
      starts_at=(p_payload->>'starts_at')::timestamptz,image_url=nullif(p_payload->>'image_url','')
    where id=p_id and artist_id=p_artist_id returning id into result_id;
  end if;
  return result_id;
end;
$$;
revoke all on function public.artist_manage_public_event(text,uuid,uuid,text,jsonb) from public;
grant execute on function public.artist_manage_public_event(text,uuid,uuid,text,jsonb) to anon, authenticated;
