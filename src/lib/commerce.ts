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
    name: "Formation IA musicale - Suno Essentiel",
    price: Number(process.env.NEXT_PUBLIC_SUNO_ESSENTIAL_PRICE_CENTS || 4900),
    currency: "eur",
    displayPrice: process.env.NEXT_PUBLIC_SUNO_ESSENTIAL_PRICE_LABEL || "49 €",
  },
} as const;

export const djContestTimeline = [
  {
    date: "Jusqu’au 1er septembre 2026",
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
    text: "Each DJ submits their profile, links, one track or video, then confirms the €29 participation.",
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
  "1er prix : 3 000 000 KRW + contrat Paga Production + résidence Paris.",
  "2e prix : 1 500 000 KRW + date garantie dans un club à Séoul.",
  "3e prix : 750 000 KRW + dotation matériel DJ sponsorisée.",
];

export const djContestPrizesEn = [
  "10 finalists: trip to Seoul offered to perform on stage and compete in the final.",
  "1st prize: 3,000,000 KRW + Paga Production contract + Paris residency.",
  "2nd prize: 1,500,000 KRW + guaranteed club date in Seoul.",
  "3rd prize: 750,000 KRW + sponsored DJ gear package.",
];

export const sunoModules = [
  {
    id: "module-1",
    eyebrow: "Module 01",
    title: "Comprendre Suno V5 / V5.5",
    titleEn: "Understand Suno V5 / V5.5",
    lessons: [
      "La philosophie de l’outil : Suno génère le son, il ne colle pas des boucles.",
      "Comment l’IA interprète un style, une émotion, un tempo et une intention.",
      "Tour de l’interface : mode simple, mode custom, bibliothèque et crédits.",
      "Le principe des blocs, de l’Extend et des limites de durée.",
    ],
    lessonsEn: [
      "The tool’s logic: Suno generates sound, it does not simply paste loops together.",
      "How AI interprets style, emotion, tempo and intention.",
      "Interface walkthrough: simple mode, custom mode, library and credits.",
      "Blocks, Extend and duration limits.",
    ],
    exercise: "Créer 3 versions d’un même style prompt et comparer ce que Suno change.",
    exerciseEn: "Create 3 versions of the same style prompt and compare what Suno changes.",
  },
  {
    id: "module-2",
    eyebrow: "Module 02",
    title: "L’art du prompting musical",
    titleEn: "The art of music prompting",
    lessons: [
      "Construire un style prompt lisible : genre, énergie, voix, instruments, texture.",
      "Traduire une idée en mots-clés musicaux : dark, uplifting, cinematic, raw, club.",
      "Utiliser BPM, tonalité et intensité sans surcharger le prompt.",
      "Créer une direction artistique reproductible.",
    ],
    lessonsEn: [
      "Build a readable style prompt: genre, energy, voice, instruments, texture.",
      "Turn an idea into musical keywords: dark, uplifting, cinematic, raw, club.",
      "Use BPM, key and intensity without overloading the prompt.",
      "Create a repeatable artistic direction.",
    ],
    exercise: "Transformer une intention vague en prompt complet, puis en 3 variantes.",
    exerciseEn: "Turn a vague intention into a complete prompt, then into 3 variants.",
  },
  {
    id: "module-3",
    eyebrow: "Module 03",
    title: "Créer un morceau propre",
    titleEn: "Create a clean track",
    lessons: [
      "Les erreurs qui ruinent une génération : prompt trop long, paroles floues, structure absente.",
      "Structurer les paroles avec [Verse], [Chorus], [Bridge], [Drop] et [Outro].",
      "Diagnostiquer une génération ratée : garder, corriger, relancer ou jeter.",
      "Exporter proprement et préparer son fichier pour partage ou sélection.",
    ],
    lessonsEn: [
      "Mistakes that ruin a generation: overloaded prompt, vague lyrics, missing structure.",
      "Structure lyrics with [Verse], [Chorus], [Bridge], [Drop] and [Outro].",
      "Diagnose a failed generation: keep, fix, reroll or discard.",
      "Export properly and prepare a file for sharing or selection.",
    ],
    exercise: "Réparer une génération faible en changeant seulement 4 éléments.",
    exerciseEn: "Fix a weak generation by changing only 4 elements.",
  },
  {
    id: "module-4",
    eyebrow: "Module 04",
    title: "Boîte à outils producteur débutant",
    titleEn: "Beginner producer toolkit",
    lessons: [
      "10 templates de chansons prêts à adapter : pop, rap, EDM, rock, métal, cinematic.",
      "50 prompts essentiels classés par ambiance et cas d’usage.",
      "Méthode d’itération : version A, version B, version finale.",
      "Construire son premier mini catalogue IA.",
    ],
    lessonsEn: [
      "10 song templates ready to adapt: pop, rap, EDM, rock, metal, cinematic.",
      "50 essential prompts sorted by mood and use case.",
      "Iteration method: version A, version B, final version.",
      "Build your first AI music mini-catalogue.",
    ],
    exercise: "Créer un pack de 5 prompts personnels cohérents avec une même identité.",
    exerciseEn: "Create a pack of 5 personal prompts with one consistent identity.",
  },
];

const quiz10 = [
  "Pourquoi Suno ne doit-il pas être considéré comme une simple banque de boucles ?",
  "Quelle différence fais-tu entre mode simple et mode custom ?",
  "Pourquoi faut-il éviter de générer 30 morceaux à l’aveugle dès le départ ?",
  "À quoi sert un style prompt bien structuré ?",
  "Quels éléments peut-on indiquer pour guider l’énergie d’un morceau ?",
  "Pourquoi le hasard fait-il partie du processus créatif avec Suno ?",
  "Que signifie itérer dans une création musicale IA ?",
  "Quand faut-il utiliser [Verse] et [Chorus] ?",
  "Comment reconnais-tu une génération à jeter plutôt qu’à sauver ?",
  "Quel est l’intérêt de créer plusieurs variantes d’un même prompt ?",
];

export const moduleQuizzes = sunoModules.map((module, index) => ({
  moduleId: module.id,
  title: `Questionnaire ${index + 1} - ${module.title}`,
  questions: quiz10.map((question, qIndex) => `${qIndex + 1}. ${question}`),
}));

export const finalQuiz = Array.from({ length: 50 }, (_, index) => {
  const questions = [
    "Explique la logique d’un prompt musical propre en 3 lignes.",
    "Donne 5 mots-clés utiles pour créer une ambiance dark-tech.",
    "Quelle information doit être prioritaire : le genre ou l’émotion ? Justifie.",
    "À quoi sert le BPM dans une demande à Suno ?",
    "Pourquoi la structure des paroles influence-t-elle le résultat vocal ?",
    "Écris un mini prompt pour un morceau club nocturne.",
    "Écris un mini prompt pour une ballade cinématique.",
    "Quand faut-il utiliser Extend ?",
    "Comment éviter une voix trop générique ?",
    "Qu’est-ce qu’une génération exploitable ?",
    "Quels signes indiquent qu’un prompt est trop chargé ?",
    "Comment préparer un export propre ?",
    "Pourquoi comparer plusieurs générations est important ?",
    "Comment garder une identité cohérente sur plusieurs morceaux ?",
    "Écris une structure simple couplet/refrain/drop.",
    "Que faire si Suno ignore un instrument demandé ?",
    "Comment guider l’intensité d’un drop ?",
    "Quelle différence entre intention artistique et description technique ?",
    "Pourquoi faut-il documenter ses prompts réussis ?",
    "Comment créer une variante sans perdre l’identité du morceau ?",
  ];
  return `${index + 1}. ${questions[index % questions.length]}`;
});
