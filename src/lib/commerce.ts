export const commerce = {
  djContest: {
    key: "dj-contest",
    name: "SKORM DJ Contest - inscription",
    price: 2900,
    currency: "eur",
    displayPrice: "29 \u20ac",
    deadline: "1er septembre 2026",
    deadlineEn: "September 1, 2026",
  },
  sunoEssential: {
    key: "suno-essential",
    name: "Formation IA musicale - Suno Essentiel",
    price: Number(process.env.NEXT_PUBLIC_SUNO_ESSENTIAL_PRICE_CENTS || 4900),
    currency: "eur",
    displayPrice: process.env.NEXT_PUBLIC_SUNO_ESSENTIAL_PRICE_LABEL || "49 \u20ac",
  },
} as const;

export const aiTrainingPrices = [
  {
    title: "Prix lancement",
    titleEn: "Launch price",
    price: "49 \u20ac",
    text: "Niveau 1 disponible maintenant : Suno Essentiel, modules, exercices et questionnaires.",
    textEn: "Level 1 available now: Suno Essential, modules, exercises and quizzes.",
    active: true,
  },
  {
    title: "Prix normal",
    titleEn: "Regular price",
    price: "89 \u20ac",
    text: "Tarif public a partir de septembre 2026.",
    textEn: "Public price from September 2026.",
    active: false,
  },
  {
    title: "Pack premium",
    titleEn: "Premium pack",
    price: "129 \u20ac",
    text: "Option a venir : correction, feedback personnalise et certificat.",
    textEn: "Coming option: review, personalised feedback and certificate.",
    active: false,
  },
  {
    title: "Niveau Expert",
    titleEn: "Expert level",
    price: "249-390 \u20ac",
    text: "Parcours avance prevu plus tard. Il n'est pas encore ouvert.",
    textEn: "Advanced program planned later. Not open yet.",
    active: false,
  },
];

export const djContestTimeline = [
  {
    date: "Jusqu'au 1er septembre 2026",
    title: "Inscriptions en ligne",
    text: "Chaque DJ depose son profil, ses liens, un son ou une video, puis valide sa participation a 29 \u20ac.",
  },
  {
    date: "Debut septembre 2026",
    title: "50 premieres selections",
    text: "Les 50 profils retenus recoivent un brief et doivent renvoyer une composition dediee.",
  },
  {
    date: "30 septembre 2026",
    title: "Annonce des 10 finalistes",
    text: "Les 10 derniers profils sont annonces officiellement et preparent la finale.",
  },
  {
    date: "Octobre 2026",
    title: "Finale a Seoul",
    text: "Voyage a Seoul offert pour les 10 finalistes, performance sur scene et finale festival.",
  },
];

export const djContestTimelineEn = [
  {
    date: "Until September 1, 2026",
    title: "Online registration",
    text: "Each DJ submits their profile, links, one track or video, then confirms the 29 \u20ac participation.",
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
  "10 finalistes : voyage a Seoul offert pour se produire sur scene et passer la finale.",
  "1er prix : 2 000 € + contrat SKORM + residence Paris.",
  "2e prix : 1 000 € + date garantie dans un club a Seoul.",
  "3e prix : 500 € + dotation materiel DJ sponsorisee.",
];

export const djContestPrizesEn = [
  "10 finalists: trip to Seoul offered to perform on stage and compete in the final.",
  "1st prize: €2,000 + SKORM contract + Paris residency.",
  "2nd prize: €1,000 + guaranteed club date in Seoul.",
  "3rd prize: €500 + sponsored DJ gear package.",
];

export const sunoModules = [
  {
    id: "module-1",
    eyebrow: "Module 01",
    title: "Comprendre Suno V5 / V5.5",
    titleEn: "Understand Suno V5 / V5.5",
    lessons: [
      "La logique de l'outil : Suno genere le son, il ne colle pas simplement des boucles.",
      "Comment l'IA interprete un style, une emotion, un tempo et une intention.",
      "Tour de l'interface : mode simple, mode custom, bibliotheque et credits.",
      "Le principe des blocs, de l'Extend et des limites de duree.",
    ],
    lessonsEn: [
      "The tool's logic: Suno generates sound, it does not simply paste loops together.",
      "How AI interprets style, emotion, tempo and intention.",
      "Interface walkthrough: simple mode, custom mode, library and credits.",
      "Blocks, Extend and duration limits.",
    ],
    exercise: "Creer 3 versions d'un meme style prompt et comparer ce que Suno change.",
    exerciseEn: "Create 3 versions of the same style prompt and compare what Suno changes.",
  },
  {
    id: "module-2",
    eyebrow: "Module 02",
    title: "L'art du prompting musical",
    titleEn: "The art of music prompting",
    lessons: [
      "Construire un style prompt lisible : genre, energie, voix, instruments, texture.",
      "Traduire une idee en mots-cles musicaux : dark, uplifting, cinematic, raw, club.",
      "Utiliser BPM, tonalite et intensite sans surcharger le prompt.",
      "Creer une direction artistique reproductible.",
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
    title: "Creer un morceau propre",
    titleEn: "Create a clean track",
    lessons: [
      "Les erreurs qui ruinent une generation : prompt trop long, paroles floues, structure absente.",
      "Structurer les paroles avec [Verse], [Chorus], [Bridge], [Drop] et [Outro].",
      "Diagnostiquer une generation ratee : garder, corriger, relancer ou jeter.",
      "Exporter proprement et preparer son fichier pour partage ou selection.",
    ],
    lessonsEn: [
      "Mistakes that ruin a generation: overloaded prompt, vague lyrics, missing structure.",
      "Structure lyrics with [Verse], [Chorus], [Bridge], [Drop] and [Outro].",
      "Diagnose a failed generation: keep, fix, reroll or discard.",
      "Export properly and prepare a file for sharing or selection.",
    ],
    exercise: "Reparer une generation faible en changeant seulement 4 elements.",
    exerciseEn: "Fix a weak generation by changing only 4 elements.",
  },
  {
    id: "module-4",
    eyebrow: "Module 04",
    title: "Boite a outils producteur debutant",
    titleEn: "Beginner producer toolkit",
    lessons: [
      "10 templates de chansons prets a adapter : pop, rap, EDM, rock, metal, cinematic.",
      "50 prompts essentiels classes par ambiance et cas d'usage.",
      "Methode d'iteration : version A, version B, version finale.",
      "Construire son premier mini catalogue IA.",
    ],
    lessonsEn: [
      "10 song templates ready to adapt: pop, rap, EDM, rock, metal, cinematic.",
      "50 essential prompts sorted by mood and use case.",
      "Iteration method: version A, version B, final version.",
      "Build your first AI music mini-catalogue.",
    ],
    exercise: "Creer un pack de 5 prompts personnels coherents avec une meme identite.",
    exerciseEn: "Create a pack of 5 personal prompts with one consistent identity.",
  },
];

const quiz10 = [
  "Pourquoi Suno ne doit-il pas etre considere comme une simple banque de boucles ?",
  "Quelle difference fais-tu entre mode simple et mode custom ?",
  "Pourquoi faut-il eviter de generer 30 morceaux a l'aveugle des le depart ?",
  "A quoi sert un style prompt bien structure ?",
  "Quels elements peut-on indiquer pour guider l'energie d'un morceau ?",
  "Pourquoi le hasard fait-il partie du processus creatif avec Suno ?",
  "Que signifie iterer dans une creation musicale IA ?",
  "Quand faut-il utiliser [Verse] et [Chorus] ?",
  "Comment reconnais-tu une generation a jeter plutot qu'a sauver ?",
  "Quel est l'interet de creer plusieurs variantes d'un meme prompt ?",
];

export const moduleQuizzes = sunoModules.map((module, index) => ({
  moduleId: module.id,
  title: `Questionnaire ${index + 1} - ${module.title}`,
  questions: quiz10.map((question, qIndex) => `${qIndex + 1}. ${question}`),
}));

export const finalQuiz = Array.from({ length: 50 }, (_, index) => {
  const questions = [
    "Explique la logique d'un prompt musical propre en 3 lignes.",
    "Donne 5 mots-cles utiles pour creer une ambiance dark-tech.",
    "Quelle information doit etre prioritaire : le genre ou l'emotion ? Justifie.",
    "A quoi sert le BPM dans une demande a Suno ?",
    "Pourquoi la structure des paroles influence-t-elle le resultat vocal ?",
    "Ecris un mini prompt pour un morceau club nocturne.",
    "Ecris un mini prompt pour une ballade cinematique.",
    "Quand faut-il utiliser Extend ?",
    "Comment eviter une voix trop generique ?",
    "Qu'est-ce qu'une generation exploitable ?",
    "Quels signes indiquent qu'un prompt est trop charge ?",
    "Comment preparer un export propre ?",
    "Pourquoi comparer plusieurs generations est important ?",
    "Comment garder une identite coherente sur plusieurs morceaux ?",
    "Ecris une structure simple couplet/refrain/drop.",
    "Que faire si Suno ignore un instrument demande ?",
    "Comment guider l'intensite d'un drop ?",
    "Quelle difference entre intention artistique et description technique ?",
    "Pourquoi faut-il documenter ses prompts reussis ?",
    "Comment creer une variante sans perdre l'identite du morceau ?",
  ];
  return `${index + 1}. ${questions[index % questions.length]}`;
});
