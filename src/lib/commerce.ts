export const commerce = {
  djContest: {
    key: "dj-contest",
    name: "SKORM DJ Contest - inscription",
    price: 2900,
    currency: "eur",
    displayPrice: "29 €",
    deadline: "1er septembre 2026",
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
    date: "Jusqu’au 1er septembre",
    title: "Inscriptions en ligne",
    text: "Chaque DJ dépose son profil, ses liens, un son ou une vidéo, puis valide sa participation à 29 €.",
  },
  {
    date: "Début septembre",
    title: "50 premières sélections",
    text: "Les 50 profils retenus reçoivent un brief et doivent renvoyer une composition dédiée.",
  },
  {
    date: "30 septembre",
    title: "Annonce des 10 finalistes",
    text: "Les 10 derniers profils sont annoncés officiellement et préparent la finale.",
  },
  {
    date: "Octobre",
    title: "Finale à Séoul",
    text: "Voyage à Séoul offert pour les 10 finalistes, performance sur scène et finale festival.",
  },
];

export const djContestPrizes = [
  "10 finalistes : voyage à Séoul offert pour se produire sur scène et passer la finale.",
  "1er prix : 3 000 000 KRW + contrat Paga Production + résidence Paris.",
  "2e prix : 1 500 000 KRW + date garantie dans un club à Séoul.",
  "3e prix : 750 000 KRW + dotation matériel DJ sponsorisée.",
];

export const sunoModules = [
  {
    id: "module-1",
    eyebrow: "Module 01",
    title: "Comprendre Suno V5 / V5.5",
    lessons: [
      "La philosophie de l’outil : Suno génère le son, il ne colle pas des boucles.",
      "Comment l’IA interprète un style, une émotion, un tempo et une intention.",
      "Tour de l’interface : mode simple, mode custom, bibliothèque et crédits.",
      "Le principe des blocs, de l’Extend et des limites de durée.",
    ],
    exercise: "Créer 3 versions d’un même style prompt et comparer ce que Suno change.",
  },
  {
    id: "module-2",
    eyebrow: "Module 02",
    title: "L’art du prompting musical",
    lessons: [
      "Construire un style prompt lisible : genre, énergie, voix, instruments, texture.",
      "Traduire une idée en mots-clés musicaux : dark, uplifting, cinematic, raw, club.",
      "Utiliser BPM, tonalité et intensité sans surcharger le prompt.",
      "Créer une direction artistique reproductible.",
    ],
    exercise: "Transformer une intention vague en prompt complet, puis en 3 variantes.",
  },
  {
    id: "module-3",
    eyebrow: "Module 03",
    title: "Créer un morceau propre",
    lessons: [
      "Les erreurs qui ruinent une génération : prompt trop long, paroles floues, structure absente.",
      "Structurer les paroles avec [Verse], [Chorus], [Bridge], [Drop] et [Outro].",
      "Diagnostiquer une génération ratée : garder, corriger, relancer ou jeter.",
      "Exporter proprement et préparer son fichier pour partage ou sélection.",
    ],
    exercise: "Réparer une génération faible en changeant seulement 4 éléments.",
  },
  {
    id: "module-4",
    eyebrow: "Module 04",
    title: "Boîte à outils producteur débutant",
    lessons: [
      "10 templates de chansons prêts à adapter : pop, rap, EDM, rock, métal, cinematic.",
      "50 prompts essentiels classés par ambiance et cas d’usage.",
      "Méthode d’itération : version A, version B, version finale.",
      "Construire son premier mini catalogue IA.",
    ],
    exercise: "Créer un pack de 5 prompts personnels cohérents avec une même identité.",
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
