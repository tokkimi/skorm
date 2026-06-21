# Estérel Communication

Site agence et back-office pour la communication, le management et le booking européen de CGL Rave Unit et Paga.

## Fonctionnalités

- Home éditoriale noir/blanc, responsive
- Roster multi-artistes
- Agenda public administrable
- Formulaire qualifié : booking, marques, presse, proposition d’artiste
- Back-office `/admin`
- Schéma Supabase avec RLS pour artistes, événements, équipe et demandes
- Déploiement Next.js compatible Vercel

## Lancer le projet

```bash
npm install
copy .env.example .env.local
npm run dev
```

Pour activer le backend, créer un projet Supabase, appliquer la migration dans `supabase/migrations`, puis renseigner les deux variables publiques.
