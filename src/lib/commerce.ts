export const commerce = {
  djContest: {
    key: "dj-contest",
    name: "SKORM DJ Contest - inscription",
    price: 2900,
    currency: "eur",
    displayPrice: "29 €",
    deadline: "1er septembre 2026",
    deadlineEn: "September 1, 2026",
  },
  sunoEssential: {
    key: "suno-essential",
    name: "Formation IA musicale - Fondations",
    price: Number(process.env.NEXT_PUBLIC_SUNO_ESSENTIAL_PRICE_CENTS || 25000),
    currency: "eur",
    displayPrice: process.env.NEXT_PUBLIC_SUNO_ESSENTIAL_PRICE_LABEL || "250 €",
  },
  sunoExpert: {
    key: "suno-expert",
    name: "Formation IA musicale - Production Expert",
    price: Number(process.env.NEXT_PUBLIC_SUNO_EXPERT_PRICE_CENTS || 59000),
    currency: "eur",
    displayPrice: process.env.NEXT_PUBLIC_SUNO_EXPERT_PRICE_LABEL || "590 €",
  },
} as const;

export const aiTrainingPrices = [
  {
    title: "Création musicale IA — Fondations",
    titleEn: "AI Music Creation — Foundations",
    price: "250 €",
    text: "Accès illimité au niveau 1 : méthode, prompts, structure, QCM par niveau et examen final.",
    textEn: "Unlimited access to level 1: method, prompts, structure, level quizzes and final exam.",
    active: true,
  },
  {
    title: "Production musicale IA — Expert",
    titleEn: "AI Music Production — Expert",
    price: "590 €",
    text: "Parcours expert complet : workflow studio, voix/personas, examen final et composition à valider. Paiement en 3 fois possible.",
    textEn: "Full expert track: studio workflow, voices/personas, final exam and composition submission. Payment in 3 installments available.",
    active: true,
  },
  {
    title: "Formation en groupe",
    titleEn: "Group training",
    price: "Sur devis",
    text: "Pour écoles, collectifs, labels ou structures qui veulent former plusieurs profils avec un programme adapté.",
    textEn: "For schools, collectives, labels or teams training several profiles.",
    active: false,
  },
];

export const djContestTimeline = [
  {
    date: "Jusqu'au 1er septembre 2026",
    title: "Inscriptions en ligne",
    text: "Chaque DJ dépose son profil, ses liens, un son ou une vidéo, puis valide sa participation à 29 €.",
  },
  {
    date: "Début septembre 2026",
    title: "50 premières sélections",
    text: "Les 50 profils retenus reçoivent un brief et doivent renvoyer une composition dédiée.",
  },
  {
    date: "30 septembre 2026",
    title: "Annonce des 10 finalistes",
    text: "Les 10 derniers profils sont annoncés officiellement et préparent la finale.",
  },
  {
    date: "Octobre 2026",
    title: "Finale à Séoul",
    text: "Voyage à Séoul offert pour les 10 finalistes, performance sur scène et finale festival.",
  },
];

export const djContestTimelineEn = [
  {
    date: "Until September 1, 2026",
    title: "Online registration",
    text: "Each DJ submits their profile, links, one track or video, then confirms the 29 € participation.",
  },
  {
    date: "Early September 2026",
    title: "First 50 selected",
    text: "The 50 selected profiles receive a brief and submit a dedicated composition.",
  },
  {
    date: "September 30, 2026",
    title: "10 finalists announced",
    text: "The final 10 profiles are officially announced and prepare for the final stage.",
  },
  {
    date: "October 2026",
    title: "Final in Seoul",
    text: "Trip to Seoul offered for the 10 finalists, stage performance and festival final.",
  },
];

export const djContestPrizes = [
  "10 finalistes : voyage à Séoul offert pour se produire sur scène et passer la finale.",
  "1er prix : 2 000 € + contrat SKORM + résidence Paris.",
  "2e prix : 1 000 € + date garantie dans un club à Séoul.",
  "3e prix : 500 € + dotation matériel DJ sponsorisée.",
];

export const djContestPrizesEn = [
  "10 finalists: trip to Seoul offered to perform on stage and compete in the final.",
  "1st prize: €2,000 + SKORM contract + Paris residency.",
  "2nd prize: €1,000 + guaranteed club date in Seoul.",
  "3rd prize: €500 + sponsored DJ gear package.",
];
