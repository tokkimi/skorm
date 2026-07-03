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
    name = coalesce(nullif(public.artists.name, ''), excluded.name),
    tagline = coalesce(nullif(public.artists.tagline, ''), excluded.tagline),
    bio = coalesce(nullif(public.artists.bio, ''), excluded.bio),
    instagram_url = coalesce(nullif(public.artists.instagram_url, ''), excluded.instagram_url),
    image_url = coalesce(nullif(public.artists.image_url, ''), excluded.image_url),
    is_active = true,
    display_order = case when public.artists.display_order = 0 then excluded.display_order else public.artists.display_order end,
    updated_at = now()
  returning id into artist_id;

  return artist_id;
end;
$$;

revoke all on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer) from public;
grant execute on function public.admin_upsert_public_artist(text,text,text,text,text,text,text,integer) to anon, authenticated;
