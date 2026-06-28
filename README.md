# SKORM Agency

Site agence et back-office pour la communication, le management et le booking europ챕en de CGL Rave Unit et Paga.

## Fonctionnalit챕s

- Home 챕ditoriale noir/blanc, responsive
- Roster multi-artistes
- Agenda public administrable
- Formulaire qualifi챕 : booking, marques, presse, proposition d?셙rtiste
- Back-office `/admin`
- Sch챕ma Supabase avec RLS pour artistes, 챕v챕nements, 챕quipe et demandes
- D챕ploiement Next.js compatible Vercel

## Lancer le projet

```bash
npm install
copy .env.example .env.local
npm run dev
```

Pour activer le backend, cr챕er un projet Supabase, appliquer la migration dans `supabase/migrations`, puis renseigner les deux variables publiques.

