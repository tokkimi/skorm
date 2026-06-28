# SKORM Agency

Site agence et back-office pour la communication, le management et le booking europ?en de CGL Rave Unit et Paga.

## Fonctionnalit?s

- Home ?ditoriale noir/blanc, responsive
- Roster artistes avec dates, sons et vid?os
- Back-office : artistes, ?v?nements, campagnes, demandes, organigramme, prestations, Death Note
- Formulaire qualifi? : booking, marques, presse, proposition d?artiste
- Sch?ma Supabase avec RLS pour artistes, ?v?nements, ?quipe et demandes
- D?ploiement Next.js compatible Vercel

## D?veloppement

```bash
npm install
npm run dev
```

## Supabase

Pour activer le backend, cr?er un projet Supabase, appliquer la migration dans `supabase/migrations`, puis renseigner les deux variables publiques.
