# SKORM Agency

Site agence et back-office pour la communication, le management et le booking européen de CGL Rave Unit et Paga.

## Fonctionnalités

- Home éditoriale noir/blanc, responsive
- Roster artistes avec dates, sons et vidéos
- Back-office : artistes, événements, campagnes, demandes, organigramme, prestations, Death Note
- Formulaires qualifiés : booking, marques, presse, proposition d’artiste, DJ Contest
- Formation IA musicale avec accès après paiement Stripe
- Schéma Supabase avec RLS pour artistes, événements, équipe et demandes
- Déploiement Next.js compatible Vercel

## Développement

```bash
npm install
npm run dev
```

## Supabase

Pour activer le backend, créer un projet Supabase, appliquer la migration dans `supabase/migrations`, puis renseigner les variables publiques.
