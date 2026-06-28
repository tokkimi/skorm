create table if not exists public.service_pricing_entries (
  id uuid primary key default gen_random_uuid(),
  seed_key text unique,
  category text not null default '',
  prestation text not null default '',
  detail text not null default '',
  target text not null default '',
  price text not null default '',
  billing_type text not null default '',
  notes text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.service_pricing_entries enable row level security;

drop policy if exists "agency team manages service pricing" on public.service_pricing_entries;
create policy "agency team manages service pricing"
on public.service_pricing_entries for all to authenticated
using (public.is_agency_team())
with check (public.is_agency_team());

insert into public.service_pricing_entries
  (seed_key, category, prestation, detail, target, price, billing_type, notes, sort_order)
values
  ('a1-audit-positionnement', 'Direction artistique', 'Audit de positionnement', 'Rapport complet avec recommandations', '', '150 €', 'one_shot', '', 10),
  ('a2-identite-artistique-complete', 'Direction artistique', 'Identité artistique complète', 'Workshop + moodboard + biographie + pitch', '', '400 – 600 €', 'one_shot', '', 20),
  ('a3-epk-presskit-complet', 'Direction artistique', 'EPK / Presskit complet', 'PDF structuré FR/EN', '', '200 – 350 €', 'one_shot', '', 30),
  ('a4-biographie-seule', 'Direction artistique', 'Biographie seule', 'Version courte + longue, FR/EN', '', '80 – 120 €', 'one_shot', '', 40),
  ('a5-suivi-coherence-image', 'Direction artistique', 'Suivi cohérence image', 'Validation visuels, recommandations contenus, rapport mensuel', '', '100 – 150 €/mois', 'monthly', '', 50),

  ('b1-strategie-editoriale', 'Communication 360°', 'Stratégie éditoriale', 'Calendrier 1 mois + briefs contenus', '', '150 €', 'one_shot', '', 110),
  ('b2-gestion-sortie-musicale', 'Communication 360°', 'Gestion d’une sortie musicale', 'Calendrier + assets + pitch + presse', '', '300 – 500 €', 'one_shot', '', 120),
  ('b3-communique-presse-envoi', 'Communication 360°', 'Communiqué de presse + envoi', 'Rédaction + fichier presse ciblé', '', '80 – 150 €', 'one_shot', '', 130),
  ('b4-community-management', 'Communication 360°', 'Community management', 'Modération, interactions, rapport stats, adaptation contenus', '', '200 – 400 €/mois', 'monthly', '', 140),
  ('b5-caption-textes-reseaux', 'Communication 360°', 'Caption / textes réseaux', 'Pack 10 publications', '', '80 – 120 €', 'pack', '', 150),

  ('c1-campagne-booking', 'Booking Europe', 'Campagne booking', 'Prospection + relances + rapport', '1 mois actif', '350 €', 'monthly', '', 210),
  ('c2-commission-booking-forfait', 'Booking Europe', 'Commission booking — forfait actif', 'Par date confirmée', 'Artiste en forfait actif', '10% du cachet', 'commission', '', 220),
  ('c3-commission-booking-ponctuel', 'Booking Europe', 'Commission booking — ponctuel', 'Sans abonnement mensuel', 'Mission ponctuelle', '15% du cachet', 'commission', '', 230),
  ('c4-gestion-logistique-date', 'Booking Europe', 'Gestion logistique d’une date', 'Coordination complète terrain', '', '80 – 150 €', 'one_shot', '', 240),
  ('c5-agenda-mensuel-artiste', 'Booking Europe', 'Agenda mensuel artiste', 'Suivi options + pipeline + relances', '', '100 €/mois', 'monthly', '', 250),

  ('d1-consulting-carriere', 'Gestion de carrière', 'Session consulting carrière', 'Ponctuel, en visio', '1h', '80 €', 'one_shot', '', 310),
  ('d2-management-strategique', 'Gestion de carrière', 'Management stratégique mensuel', 'Bilan + planification + arbitrages', '', '200 – 350 €/mois', 'monthly', '', 320),
  ('d3-partenariat-marque', 'Gestion de carrière', 'Développement partenariat marque', 'Prospection + négociation + suivi', '', '250 € + 15% du deal', 'hybrid', '', 330),
  ('d4-dossier-partenaire-marque', 'Gestion de carrière', 'Dossier partenaire marque', 'Rédaction du dossier seul', '', '150 – 200 €', 'one_shot', '', 340),
  ('d5-developpement-international', 'Gestion de carrière', 'Développement international', 'Marchés ciblés, agents locaux, programmateurs européens', 'Sur 3 mois', '500 – 800 €', 'project', '', 350),

  ('e1-creation-identite-ia', 'Management d’artistes IA', 'Création identité IA', 'Direction artistique + lore + moodboard + bio', '', '500 – 800 €', 'project', '', 410),
  ('e2-lancement-complet-ia', 'Management d’artistes IA', 'Lancement complet IA', 'Création + profils + 1er mois de contenus + teasing', '', '1 000 – 1 500 €', 'project', '', 420),
  ('e3-suivi-mensuel-artiste-ia', 'Management d’artistes IA', 'Suivi mensuel artiste IA', 'Contenus + cohérence narrative + calendrier releases', '', '300 – 500 €/mois', 'monthly', '', 430),

  ('f1-presence-date', 'Partenariats marque & sponsoring', 'Présence date', 'Mention réseaux avant/après une date, logo story, tag caption', 'Marques', '150 – 500 € / date', 'one_shot', '', 510),
  ('f2-soutien-tournee', 'Partenariats marque & sponsoring', 'Soutien tournée', 'Visibilité sur l’ensemble des dates, kit contenu complet', 'Marques', '1 000 – 3 000 €', 'project', '', 520),
  ('f3-ambassadeur-artiste', 'Partenariats marque & sponsoring', 'Ambassadeur artiste', 'Association long terme, contenus dédiés, co-branding', 'Marques', 'À partir de 5 000 €', 'project', '', 530),
  ('f4-activation-evenement', 'Partenariats marque & sponsoring', 'Activation événement', 'Stand, sampling, UGC, co-communication sur un événement', 'Marques', 'Sur devis', 'quote', '', 540),
  ('f5-campagne-digital', 'Partenariats marque & sponsoring', 'Campagne digital', 'Posts, stories, reels, mentions sponsorisées', 'Marques', '300 – 1 500 €', 'project', '', 550),

  ('g1-starter', 'Forfaits mensuels artiste', 'STARTER', 'Audit initial + EPK + stratégie éditoriale + agenda mensuel', 'Artiste débutant, premières dates', '250 – 350 €/mois', 'monthly', '', 610),
  ('g2-developpement', 'Forfaits mensuels artiste', 'DÉVELOPPEMENT', 'Starter + booking actif + community management + presse', 'Quelques dates, 1k–5k followers', '500 – 750 €/mois', 'monthly', '', 620),
  ('g3-pro', 'Forfaits mensuels artiste', 'PRO', 'Développement + management stratégique + partenariats + international', 'Dates régulières, 5k+ followers', '1 000 – 1 500 €/mois', 'monthly', '', 630),
  ('g4-label-collectif', 'Forfaits mensuels artiste', 'LABEL / COLLECTIF', 'Gestion multi-artistes, tarif dégressif par artiste', 'Label, collectif, 3+ artistes', 'Sur devis', 'quote', '', 640),

  ('h1-initiation-ia-solo', 'Formation artiste IA', 'Initiation IA — solo', '4 sessions de 2h en visio, support PDF fourni, accès groupe de suivi', 'Sans certificat', '250 €', 'training', '', 710),
  ('h2-initiation-ia-groupe', 'Formation artiste IA', 'Initiation IA — groupe', 'Groupe de 4 à 8 personnes', 'Sans certificat', '150 € / personne', 'training', '', 720),
  ('h3-initiation-ia-jeune', 'Formation artiste IA', 'Initiation IA — jeune artiste -25 ans', 'Groupe uniquement', 'Sans certificat', '120 € / personne', 'training', '', 730),
  ('h4-option-accompagnement-ia', 'Formation artiste IA', 'Option accompagnement individuel', '30 min post-formation', '', '+40 €', 'option', '', 740),
  ('h5-expert-ia-solo', 'Formation artiste IA', 'Expert IA — solo', '10 sessions de 2h sur 5 semaines + projet final + certificat', 'Avec certificat', '900 €', 'training', '', 750),
  ('h6-expert-ia-groupe', 'Formation artiste IA', 'Expert IA — groupe', 'Groupe de 4 à 6 personnes + projet final + certificat', 'Avec certificat', '600 € / personne', 'training', '', 760),
  ('h7-expert-ia-jeune', 'Formation artiste IA', 'Expert IA — jeune artiste -25 ans', 'Groupe uniquement', 'Avec certificat', '450 € / personne', 'training', '', 770),
  ('h8-mentoring-post-formation', 'Formation artiste IA', 'Option mentoring post-formation', '3 mois, 1 session/mois', '', '+200 €', 'option', '', 780),
  ('h9-expert-ia-structure', 'Formation artiste IA', 'Structure / entreprise', 'Formation Expert IA en groupe entreprise', 'Entreprise', 'À partir de 1 800 € / groupe', 'quote', '', 790)
on conflict (seed_key) do nothing;

create or replace function public.admin_get_service_pricing_entries(p_secret text)
returns jsonb
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if not private.valid_admin_secret(p_secret) then
    raise exception 'invalid admin secret';
  end if;

  return coalesce((
    select jsonb_agg(to_jsonb(p) order by p.sort_order asc, p.created_at asc)
    from public.service_pricing_entries p
  ), '[]'::jsonb);
end;
$$;

create or replace function public.admin_upsert_service_pricing_entry(
  p_secret text,
  p_id uuid default null,
  p_payload jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public, private
as $$
declare
  v_id uuid;
begin
  if not private.valid_admin_secret(p_secret) then
    raise exception 'invalid admin secret';
  end if;

  if p_id is null then
    insert into public.service_pricing_entries (
      category, prestation, detail, target, price, billing_type, notes, sort_order, is_active
    )
    values (
      coalesce(p_payload->>'category', ''),
      coalesce(p_payload->>'prestation', ''),
      coalesce(p_payload->>'detail', ''),
      coalesce(p_payload->>'target', ''),
      coalesce(p_payload->>'price', ''),
      coalesce(p_payload->>'billing_type', ''),
      coalesce(p_payload->>'notes', ''),
      coalesce(nullif(p_payload->>'sort_order', '')::integer, 9999),
      coalesce((p_payload->>'is_active')::boolean, true)
    )
    returning id into v_id;
    return v_id;
  end if;

  update public.service_pricing_entries
  set
    category = coalesce(p_payload->>'category', category),
    prestation = coalesce(p_payload->>'prestation', prestation),
    detail = coalesce(p_payload->>'detail', detail),
    target = coalesce(p_payload->>'target', target),
    price = coalesce(p_payload->>'price', price),
    billing_type = coalesce(p_payload->>'billing_type', billing_type),
    notes = coalesce(p_payload->>'notes', notes),
    sort_order = coalesce(nullif(p_payload->>'sort_order', '')::integer, sort_order),
    is_active = coalesce((p_payload->>'is_active')::boolean, is_active),
    updated_at = now()
  where id = p_id
  returning id into v_id;

  if v_id is null then
    raise exception 'pricing entry not found';
  end if;

  return v_id;
end;
$$;

create or replace function public.admin_delete_service_pricing_entry(p_secret text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public, private
as $$
begin
  if not private.valid_admin_secret(p_secret) then
    raise exception 'invalid admin secret';
  end if;

  delete from public.service_pricing_entries where id = p_id;
  if not found then
    raise exception 'pricing entry not found';
  end if;
end;
$$;

grant execute on function public.admin_get_service_pricing_entries(text) to anon, authenticated;
grant execute on function public.admin_upsert_service_pricing_entry(text, uuid, jsonb) to anon, authenticated;
grant execute on function public.admin_delete_service_pricing_entry(text, uuid) to anon, authenticated;
