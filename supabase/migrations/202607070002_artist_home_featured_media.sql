alter table public.artists
  add column if not exists home_image_url text,
  add column if not exists featured_sound jsonb;

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
  p_media_videos jsonb default '[]'::jsonb,
  p_home_image_url text default null,
  p_featured_sound jsonb default null
)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  artist_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  insert into public.artists(
    slug, name, tagline, bio, instagram_url, image_url, home_image_url, featured_sound,
    is_active, display_order, media_sounds, media_releases, media_videos, updated_at
  )
  values (
    p_slug, p_name, p_tagline, p_bio, p_instagram_url, p_image_url, p_home_image_url, p_featured_sound,
    true, p_display_order,
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
    home_image_url = coalesce(nullif(public.artists.home_image_url, ''), excluded.home_image_url),
    featured_sound = coalesce(public.artists.featured_sound, excluded.featured_sound),
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

revoke all on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer,jsonb,jsonb,jsonb,text,jsonb) from public;
grant execute on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer,jsonb,jsonb,jsonb,text,jsonb) to anon, authenticated;
