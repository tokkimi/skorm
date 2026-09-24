begin;
-- Nullable columns preserve the existing curated catalog until an artist explicitly edits it.
alter table public.artists
  add column if not exists home_image_url text,
  add column if not exists featured_sound jsonb,
  add column if not exists media_sounds jsonb,
  add column if not exists media_releases jsonb,
  add column if not exists media_videos jsonb;

create or replace function public.artist_save_profile(p_secret text,p_id uuid,p_payload jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  update public.artists set
    tagline=case when p_payload ? 'tagline' then p_payload->>'tagline' else tagline end,
    bio=case when p_payload ? 'bio' then p_payload->>'bio' else bio end,
    instagram_url=case when p_payload ? 'instagram_url' then p_payload->>'instagram_url' else instagram_url end,
    image_url=case when p_payload ? 'image_url' then p_payload->>'image_url' else image_url end,
    home_image_url=case when p_payload ? 'home_image_url' then p_payload->>'home_image_url' else home_image_url end,
    featured_sound=case when p_payload ? 'featured_sound' then p_payload->'featured_sound' else featured_sound end,
    media_sounds=case when p_payload ? 'media_sounds' then p_payload->'media_sounds' else media_sounds end,
    media_releases=case when p_payload ? 'media_releases' then p_payload->'media_releases' else media_releases end,
    media_videos=case when p_payload ? 'media_videos' then p_payload->'media_videos' else media_videos end,
    updated_at=now()
  where id=p_id;
  if not found then raise exception 'artist not found'; end if;
end;
$$;
revoke all on function public.artist_save_profile(text,uuid,jsonb) from public;
grant execute on function public.artist_save_profile(text,uuid,jsonb) to anon, authenticated;
commit;
