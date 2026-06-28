create or replace function public.admin_update_inquiry(
  p_secret text,
  p_id uuid,
  p_status public.inquiry_status default null,
  p_internal_notes text default null
) returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;

  update public.inquiries
  set
    status = coalesce(p_status, status),
    internal_notes = coalesce(p_internal_notes, internal_notes),
    updated_at = now()
  where id = p_id;

  if not found then raise exception 'inquiry not found'; end if;
end;
$$;

create or replace function public.admin_delete_inquiry(p_secret text, p_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not private.valid_admin_secret(p_secret) then raise exception 'unauthorized'; end if;
  delete from public.inquiries where id = p_id;
  if not found then raise exception 'inquiry not found'; end if;
end;
$$;

revoke all on function public.admin_update_inquiry(text,uuid,public.inquiry_status,text) from public;
revoke all on function public.admin_delete_inquiry(text,uuid) from public;

grant execute on function public.admin_update_inquiry(text,uuid,public.inquiry_status,text) to anon, authenticated;
grant execute on function public.admin_delete_inquiry(text,uuid) to anon, authenticated;
