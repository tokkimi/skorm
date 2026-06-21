drop table if exists private.admin_config;

create or replace function private.valid_admin_secret(p_secret text)
returns boolean language sql stable security definer set search_path = '' as $$
  select encode(extensions.digest(p_secret, 'sha256'), 'hex')
    = '875757525e4b70eb37645f842390cc7efc7bbd7ce5766ab04a1214086af9dc8c';
$$;
