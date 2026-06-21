create or replace function public.admin_get_backoffice(p_secret text)
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  return jsonb_build_object(
    'artists', coalesce((select jsonb_agg(to_jsonb(x)) from (select * from public.artists order by display_order) x), '[]'::jsonb),
    'events', coalesce((select jsonb_agg(to_jsonb(x)) from (select e.*, a.name as artist_name from public.events e left join public.artists a on a.id=e.artist_id order by e.starts_at) x), '[]'::jsonb),
    'inquiries', coalesce((select jsonb_agg(to_jsonb(x)) from (select * from public.inquiries order by created_at desc) x), '[]'::jsonb),
    'bookings', coalesce((select jsonb_agg(to_jsonb(x)) from (select b.*, a.name as artist_name from public.bookings b left join public.artists a on a.id=b.artist_id order by b.event_date) x), '[]'::jsonb),
    'campaigns', coalesce((select jsonb_agg(to_jsonb(x)) from (select c.*, a.name as artist_name from public.campaigns c left join public.artists a on a.id=c.artist_id order by c.created_at desc) x), '[]'::jsonb),
    'content_items', coalesce((select jsonb_agg(to_jsonb(x)) from (select c.*, a.name as artist_name from public.content_items c left join public.artists a on a.id=c.artist_id order by c.publish_at) x), '[]'::jsonb),
    'contacts', coalesce((select jsonb_agg(to_jsonb(x)) from (select * from public.contacts order by company) x), '[]'::jsonb),
    'tasks', coalesce((select jsonb_agg(to_jsonb(x)) from (select t.*, a.name as artist_name from public.tasks t left join public.artists a on a.id=t.artist_id order by t.due_at) x), '[]'::jsonb),
    'financial_transactions', coalesce((select jsonb_agg(to_jsonb(x)) from (select f.*, a.name as artist_name from public.financial_transactions f left join public.artists a on a.id=f.artist_id order by f.transaction_date desc) x), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.admin_get_backoffice(text) from public;
grant execute on function public.admin_get_backoffice(text) to anon, authenticated;
