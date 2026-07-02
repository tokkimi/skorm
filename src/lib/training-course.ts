export type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
};

export type TrainingLevel = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  lessons: string[];
  exercise: string;
  quiz: QuizQuestion[];
};

function q(prompt: string, options: string[], answer: number): QuizQuestion {
  return { prompt, options, answer };
}

export const trainingLevels: TrainingLevel[] = [
  {
    id: "level-1",
    eyebrow: "Niveau 01",
    title: "Comprendre Suno V5 / V5.5",
    intro: "Avant de produire, il faut comprendre comment Suno lit une intention musicale. Ce niveau pose les bases : interface, logique de génération, limites, crédits et méthode de travail.",
    lessons: [
      "Suno ne colle pas simplement des boucles : il interprète un cadre artistique et génère une proposition complète.",
      "Le mode simple sert à tester vite une idée. Le mode custom sert à contrôler la structure, les paroles et la direction musicale.",
      "Un bon résultat vient rarement du premier essai : il faut comparer, isoler ce qui fonctionne, puis itérer.",
      "Les crédits doivent être utilisés comme un budget créatif : peu d’essais, mais des essais mieux préparés.",
      "La version V5/V5.5 comprend mieux les intentions précises, mais elle peut devenir générique si le prompt est trop vague.",
    ],
    exercise: "Créer trois versions d’un même style prompt et noter ce qui change : énergie, voix, structure, instruments, rendu final.",
    quiz: [
      q("Quel est le rôle principal de Suno dans une création ?", ["Copier des boucles existantes", "Générer une proposition à partir d’une intention", "Masteriser un fichier WAV", "Publier automatiquement sur Spotify"], 1),
      q("Quand utiliser le mode custom ?", ["Quand on veut contrôler paroles et structure", "Uniquement pour exporter", "Pour supprimer les crédits", "Pour créer une playlist"], 0),
      q("Pourquoi comparer plusieurs générations ?", ["Pour choisir au hasard", "Pour repérer ce qui fonctionne et itérer", "Pour réduire la durée du morceau", "Pour éviter d’écrire un prompt"], 1),
      q("Un prompt trop vague donne souvent…", ["Un rendu très personnel", "Un résultat générique", "Un meilleur mixage", "Un fichier plus léger"], 1),
      q("Que faut-il noter après chaque génération ?", ["Le lien, le prompt, les forces et faiblesses", "Uniquement la durée", "Le nom du navigateur", "Le nombre de likes"], 0),
      q("Le mode simple est surtout utile pour…", ["Tester rapidement une idée", "Gérer un contrat", "Créer une pochette", "Envoyer un mail"], 0),
      q("Quelle attitude évite de gaspiller les crédits ?", ["Préparer l’intention avant de générer", "Générer 30 versions sans lire", "Changer tout à chaque essai", "Ne jamais écouter jusqu’au bout"], 0),
      q("Suno comprend mieux une demande si elle contient…", ["Genre, énergie, texture et intention", "Seulement un emoji", "Un texte sans ponctuation", "Un nom de marque"], 0),
      q("Une génération ratée doit toujours être…", ["Analysée avant d’être jetée", "Publiée immédiatement", "Gardée sans modification", "Transformée en logo"], 0),
      q("Le meilleur workflow est…", ["Idée, prompt, écoute, analyse, itération", "Hasard, export, publication", "Copie, collage, oubli", "Achat, silence, publication"], 0),
    ],
  },
  {
    id: "level-2",
    eyebrow: "Niveau 02",
    title: "Écrire un prompt musical fort",
    intro: "Un prompt musical n’est pas une phrase magique. C’est une direction artistique compacte : style, émotion, tempo, texture, voix, références d’ambiance et limites.",
    lessons: [
      "Commencer par l’émotion évite de faire un morceau techniquement correct mais vide.",
      "Le genre guide la famille musicale ; l’énergie guide l’usage : club, introspection, trailer, radio, performance.",
      "Les textures donnent une couleur : raw, glossy, distorted, metallic, warm, cinematic, underground.",
      "Le BPM doit aider la direction, pas devenir une contrainte absurde.",
      "Un bon prompt retire autant qu’il ajoute : trop d’informations diluent l’intention.",
    ],
    exercise: "Transformer une idée vague en trois prompts : version club, version émotionnelle, version plus expérimentale.",
    quiz: [
      q("Un prompt fort doit d’abord clarifier…", ["L’intention artistique", "La météo", "Le logo", "Le navigateur"], 0),
      q("Le BPM sert à…", ["Guider l’énergie et le rythme", "Garantir un tube", "Choisir une pochette", "Créer une facture"], 0),
      q("Un prompt surchargé risque de…", ["Diluer l’intention", "Améliorer chaque instrument", "Réduire le prix", "Créer un certificat"], 0),
      q("Le mot “metallic” décrit plutôt…", ["Une texture sonore", "Une date de concert", "Un moyen de paiement", "Un format de fichier"], 0),
      q("Pour une identité reproductible, il faut…", ["Conserver une palette de mots-clés cohérente", "Changer totalement de style à chaque essai", "Ne jamais noter ses prompts", "Écrire seulement le titre"], 0),
      q("Le genre musical indique…", ["La famille esthétique du morceau", "Le nombre de vues", "Le nom du manager", "La couleur du bouton"], 0),
      q("L’énergie d’un morceau peut être guidée par…", ["Club, raw, intense, hypnotic", "Adresse email", "CGV", "Numéro de téléphone"], 0),
      q("Une bonne variante change…", ["Quelques paramètres sans perdre l’identité", "Tout le concept", "Le nom de l’artiste uniquement", "La langue du site"], 0),
      q("Quelle formulation est la plus exploitable ?", ["Dark hypnotic techno, 132 BPM, metallic synths, no vocals", "Fais un truc cool", "Musique", "Très bien merci"], 0),
      q("Le prompt doit rester…", ["Lisible, précis et orienté résultat", "Flou, long et contradictoire", "Vide", "Uniquement composé d’emojis"], 0),
    ],
  },
  {
    id: "level-3",
    eyebrow: "Niveau 03",
    title: "Structurer paroles, sections et rendu",
    intro: "Même avec une bonne idée, un morceau peut échouer si la structure est floue. Ce niveau apprend à cadrer les sections, diagnostiquer les ratés et préparer un export propre.",
    lessons: [
      "Les balises [Verse], [Chorus], [Bridge], [Drop] et [Outro] aident l’IA à organiser le morceau.",
      "Les paroles doivent respecter le ton voulu : pas de clichés si l’univers est premium ou dark-tech.",
      "Une génération peut être sauvée si l’idée est bonne mais la structure faible.",
      "Une génération doit être jetée si la voix, le rythme ou l’intention sont incohérents.",
      "Un export propre doit être nommé, classé et accompagné du prompt utilisé.",
    ],
    exercise: "Réparer une génération faible en modifiant seulement quatre éléments : structure, énergie, voix, texture.",
    quiz: [
      q("À quoi sert [Chorus] ?", ["Identifier le refrain", "Changer le prix", "Ouvrir Stripe", "Supprimer une piste"], 0),
      q("Une structure claire aide Suno à…", ["Organiser le morceau", "Créer un logo", "Envoyer un email", "Signer un contrat"], 0),
      q("Une génération à jeter présente souvent…", ["Une incohérence forte entre intention, voix et rythme", "Un bon refrain", "Une identité claire", "Un export propre"], 0),
      q("Un bon export doit être…", ["Nommé, classé et relié au prompt", "Perdu dans les téléchargements", "Sans information", "Renommé au hasard"], 0),
      q("Les paroles doivent éviter…", ["Les clichés qui cassent l’univers", "La cohérence", "La structure", "La clarté"], 0),
      q("La balise [Drop] est utile surtout pour…", ["Marquer une montée ou rupture d’énergie", "Écrire une adresse", "Ajouter une photo", "Créer une facture"], 0),
      q("Avant de relancer une génération, il faut…", ["Identifier précisément ce qui ne va pas", "Tout effacer sans écouter", "Changer uniquement le titre", "Publier"], 0),
      q("Un morceau propre est un morceau…", ["Cohérent, exploitable et présentable", "Long sans raison", "Sans direction", "Impossible à retrouver"], 0),
      q("Le diagnostic d’un morceau analyse…", ["Voix, structure, énergie, texture, intention", "Uniquement le volume", "Uniquement la pochette", "Le nom du navigateur"], 0),
      q("Une modification efficace est…", ["Ciblée et mesurable", "Totale et confuse", "Invisible", "Sans écoute"], 0),
    ],
  },
  {
    id: "level-4",
    eyebrow: "Niveau 04",
    title: "Construire un mini-catalogue crédible",
    intro: "Le but n’est pas de produire beaucoup, mais de construire une direction identifiable. Ce niveau transforme les essais en catalogue cohérent et présentable.",
    lessons: [
      "Un artiste IA crédible a une direction sonore, visuelle et narrative cohérente.",
      "Un mini-catalogue doit montrer une identité : pas seulement une accumulation de tests.",
      "Chaque morceau doit avoir une intention : single, intro live, contenu social, démo, maquette, univers.",
      "Les meilleurs prompts deviennent une bibliothèque personnelle à améliorer.",
      "La présentation compte : titre, description, cover, liens, contexte et storytelling.",
    ],
    exercise: "Créer cinq prompts personnels cohérents et définir pour chaque morceau son rôle dans le projet.",
    quiz: [
      q("Un mini-catalogue crédible doit montrer…", ["Une identité cohérente", "Des tests sans lien", "Uniquement des titres", "Une liste de prix"], 0),
      q("Un artiste IA doit avoir…", ["Direction sonore, visuelle et narrative", "Seulement un logo", "Uniquement une adresse email", "Aucune histoire"], 0),
      q("Pourquoi garder une bibliothèque de prompts ?", ["Pour reproduire et améliorer une identité", "Pour oublier les meilleurs essais", "Pour vendre des billets", "Pour remplacer l’écoute"], 0),
      q("Un morceau dans le catalogue doit avoir…", ["Un rôle clair", "Un nom au hasard", "Aucune intention", "Un bouton bleu"], 0),
      q("La présentation d’un morceau inclut…", ["Titre, contexte, cover, lien, storytelling", "Seulement le fichier", "Un mot de passe", "Une facture"], 0),
      q("Le storytelling sert à…", ["Rendre le projet lisible et mémorable", "Remplacer la musique", "Créer un paiement", "Cacher le son"], 0),
      q("Une identité cohérente exige…", ["Des choix répétés et maîtrisés", "Un changement total à chaque morceau", "Aucun cadre", "Des prompts secrets non notés"], 0),
      q("Un contenu social peut servir à…", ["Présenter l’univers et tester l’intérêt", "Remplacer toutes les sorties", "Supprimer la stratégie", "Éviter la musique"], 0),
      q("Une démo doit être…", ["Claire, propre et compréhensible", "Inaudible", "Sans nom", "Sans lien"], 0),
      q("La bonne fin de parcours consiste à…", ["Valider un univers et préparer l’examen final", "Tout supprimer", "Changer de projet sans raison", "Ne pas écouter"], 0),
    ],
  },
];

const finalBase: QuizQuestion[] = [
  q("Quel est l’objectif d’un prompt musical ?", ["Donner une direction exploitable", "Remplacer l’écoute", "Créer une facture", "Choisir un mot de passe"], 0),
  q("Une identité sonore cohérente vient de…", ["Choix répétés et maîtrisés", "Hasard permanent", "Prompts contradictoires", "Absence de notes"], 0),
  q("Le mode custom est utile pour…", ["Contrôler structure et paroles", "Changer la carte bancaire", "Publier sur Instagram", "Créer une newsletter"], 0),
  q("Un prompt trop vague donne souvent…", ["Un rendu générique", "Un rendu plus premium", "Une vidéo", "Un contrat"], 0),
  q("La texture sonore décrit…", ["La couleur du son", "Le prix de la formation", "Le nom du compte", "La ville de l’artiste"], 0),
  q("Le BPM permet de guider…", ["Le rythme et l’énergie", "Le logo", "La facture", "Le footer"], 0),
  q("Pourquoi utiliser des balises comme [Verse] ?", ["Structurer le morceau", "Payer Stripe", "Créer un visuel", "Supprimer un compte"], 0),
  q("Une génération exploitable doit être…", ["Cohérente avec l’intention", "Longue à tout prix", "Sans structure", "Impossible à classer"], 0),
  q("Le diagnostic d’un morceau regarde…", ["Voix, rythme, structure, texture, intention", "Seulement le volume", "Seulement le nom", "Seulement le navigateur"], 0),
  q("Un artiste IA crédible a besoin…", ["D’un univers clair", "D’un seul prompt vide", "D’aucune image", "D’aucun suivi"], 0),
  q("Le meilleur usage des crédits consiste à…", ["Préparer avant de générer", "Générer sans écouter", "Tout publier", "Ne rien comparer"], 0),
  q("Une variante doit changer…", ["Quelques paramètres ciblés", "Toute l’identité", "Uniquement la date", "Le nom du navigateur"], 0),
  q("Une bibliothèque de prompts sert à…", ["Capitaliser sur ce qui marche", "Perdre les idées", "Bloquer l’export", "Remplacer la musique"], 0),
  q("Le storytelling musical sert à…", ["Rendre le projet lisible", "Cacher une mauvaise intention", "Remplacer le son", "Éviter les titres"], 0),
  q("Un export propre doit contenir…", ["Fichier nommé et contexte", "Aucune information", "Un nom aléatoire", "Une capture floue"], 0),
  q("Pour éviter le rendu générique, il faut…", ["Préciser émotion, texture et direction", "Écrire “fais un hit”", "Ne rien écrire", "Changer seulement le titre"], 0),
  q("Le genre musical guide…", ["La famille esthétique", "Le statut admin", "Le paiement", "Le footer"], 0),
  q("Un morceau pour le club demande souvent…", ["Énergie, dynamique et intention live", "Uniquement des paroles longues", "Une bio", "Un devis"], 0),
  q("Quand une génération doit être jetée ?", ["Quand elle trahit l’intention globale", "Quand elle est bien nommée", "Quand elle est cohérente", "Quand elle a une bonne base"], 0),
  q("La fin d’un parcours de formation doit valider…", ["Compréhension, méthode et autonomie", "Uniquement le paiement", "La couleur du site", "Le logo"], 0),
];

export const finalExam: QuizQuestion[] = Array.from({ length: 100 }, (_, index) => {
  const base = finalBase[index % finalBase.length];
  return {
    ...base,
    prompt: `${index + 1}. ${base.prompt}`,
  };
});

export const MODULE_PASS_SCORE = 8;
export const FINAL_PASS_SCORE = 76;

export const expertTrainingLevels: TrainingLevel[] = [
  {
    id: "expert-1",
    eyebrow: "Expert 01",
    title: "Architecture avancée du prompt",
    intro: "Le niveau expert commence par le signal layered : intention, énergie, texture, rôle de chaque instrument, contraintes et comportement attendu. L’objectif est de piloter Suno comme une direction artistique, pas comme une boîte noire.",
    lessons: [
      "Construire un prompt en couches : identité, genre, émotion, texture, dynamique, voix et exclusions.",
      "Utiliser des mots-clés courts plutôt que de longues phrases qui diluent le signal.",
      "Calibrer l’énergie avec des tags de dynamique : restrained, explosive, hypnotic, aggressive, spacious.",
      "Éviter le conflit entre genres incompatibles et prioriser un axe dominant.",
      "Documenter chaque version pour comprendre quel signal a réellement influencé le résultat.",
    ],
    exercise: "Créer trois prompts experts pour une même intention : version club, version cinematic, version dark-tech minimale.",
    quiz: [
      q("Le signal layered sert à…", ["Organiser plusieurs couches d’intention", "Ajouter des mots au hasard", "Remplacer l’écoute", "Créer une facture"], 0),
      q("Un prompt expert doit prioriser…", ["Un axe dominant clair", "Tous les genres possibles", "Un nom d’artiste connu", "Un texte compact"], 0),
      q("Les tags de dynamique contrôlent…", ["L’énergie et le comportement du morceau", "Le prix", "Le compte admin", "Le format de l’image"], 0),
      q("Pourquoi documenter les versions ?", ["Pour identifier ce qui influence le rendu", "Pour perdre du temps", "Pour cacher les prompts", "Pour remplacer le mix"], 0),
      q("Un conflit de genres provoque souvent…", ["Un résultat instable ou générique", "Une meilleure cohérence", "Un certificat", "Un export plus rapide"], 0),
      q("Le prompt expert doit rester…", ["Précis, hiérarchisé et lisible", "Long et contradictoire", "Vide", "Uniquement composé de références"], 0),
      q("Une exclusion utile peut être…", ["no vocals, no cheesy lead", "plus fort", "merci", "logo noir"], 0),
      q("Un signal faible est…", ["Une demande vague sans priorité", "Un cadre clair", "Une structure nette", "Une intention précise"], 0),
      q("La texture sonore décrit…", ["Le grain et la matière du son", "Le mail du client", "Le prix Stripe", "La langue du site"], 0),
      q("Le meilleur test expert consiste à…", ["Changer une variable à la fois", "Tout changer simultanément", "Ne rien noter", "Publier sans comparer"], 0),
    ],
  },
  {
    id: "expert-2",
    eyebrow: "Expert 02",
    title: "Structure, blocs, Extend et whole song",
    intro: "Ce niveau approfondit la création par blocs : où couper, quand étendre, comment préserver l’énergie, comment reconstruire un morceau final propre et cohérent.",
    lessons: [
      "Identifier le meilleur point de coupe avant d’utiliser Extend.",
      "Garder une logique d’arrangement : intro, montée, drop, respiration, reprise, outro.",
      "Éviter d’étendre une mauvaise base : Extend amplifie souvent les défauts.",
      "Comparer les versions extended avant de générer le whole song.",
      "Préparer une version finale stable avec nommage, notes et export propres.",
    ],
    exercise: "Choisir une génération courte, définir deux points de coupe, produire deux Extend et expliquer lequel est conservé.",
    quiz: [
      q("Extend doit être utilisé…", ["Au bon point de coupe", "Sans écouter", "Après chaque seconde", "Uniquement pour payer"], 0),
      q("Étendre une mauvaise base risque de…", ["Renforcer ses défauts", "La rendre parfaite", "Créer un certificat", "Changer le prix"], 0),
      q("Un arrangement cohérent contient…", ["Progression et respiration", "Uniquement un drop", "Aucune intro", "Des sections au hasard"], 0),
      q("Get whole song sert à…", ["Assembler une version finale", "Créer un compte", "Ouvrir l’admin", "Supprimer un prompt"], 0),
      q("Avant Extend, il faut analyser…", ["Énergie, voix, structure, potentiel", "Seulement le titre", "Le logo", "Le navigateur"], 0),
      q("Le point de coupe idéal est souvent…", ["Un moment musicalement stable", "Au milieu d’une phrase cassée", "Au hasard", "Avant d’écouter"], 0),
      q("Comparer deux Extend permet de…", ["Choisir la meilleure continuité", "Gagner automatiquement", "Créer un mail", "Modifier le footer"], 0),
      q("Une outro propre doit…", ["Terminer sans casser l’énergie", "Couper brutalement", "Relancer un couplet sans raison", "Supprimer la structure"], 0),
      q("Une version finale doit être…", ["Nommée et documentée", "Introuvable", "Sans prompt", "Sans date"], 0),
      q("Le piège de l’export partiel est…", ["Partager un fichier incomplet", "Créer un bon master", "Valider un examen", "Ajouter un QCM"], 0),
    ],
  },
  {
    id: "expert-3",
    eyebrow: "Expert 03",
    title: "Suno Studio, DAW et mastering EQ",
    intro: "Le niveau expert ne s’arrête pas à la génération. Il faut savoir nettoyer, organiser, exporter vers une DAW et préparer un rendu présentable.",
    lessons: [
      "Utiliser Suno Studio pour écouter, nettoyer et comparer les pistes.",
      "Comprendre le rôle du Track EQ : enlever les fréquences qui gênent, pas sur-traiter.",
      "Exporter proprement pour une DAW : nommage, versions, stems si disponibles, notes de prompt.",
      "Repérer les défauts : basses floues, voix noyée, agressivité dans les aigus, mix trop compressé.",
      "Préparer un fichier de présentation avec contexte, intention et version retenue.",
    ],
    exercise: "Analyser un morceau généré : lister trois défauts de mix et proposer trois corrections simples.",
    quiz: [
      q("Le Track EQ sert d’abord à…", ["Nettoyer et équilibrer", "Rendre tout plus fort", "Changer le prix", "Créer un logo"], 0),
      q("Exporter vers une DAW demande…", ["Organisation et nommage clair", "Aucun nom", "Un seul fichier perdu", "Un mot de passe"], 0),
      q("Une basse floue indique souvent…", ["Un problème de bas du spectre", "Un bon mix", "Une bonne voix", "Un export parfait"], 0),
      q("Le mastering ne doit pas…", ["Cacher une mauvaise direction", "Finaliser un rendu", "Améliorer la cohérence", "Contrôler le niveau"], 0),
      q("Un fichier de présentation doit contenir…", ["Contexte, intention et version", "Seulement un lien", "Rien", "Une capture floue"], 0),
      q("Une voix noyée se remarque quand…", ["Elle disparaît dans l’instrumental", "Elle est claire", "Elle est trop bien placée", "Elle structure le morceau"], 0),
      q("Une correction simple est meilleure si elle est…", ["Ciblée", "Aléatoire", "Extrême", "Non écoutée"], 0),
      q("La DAW sert à…", ["Affiner, arranger et préparer", "Remplacer toute intention", "Créer un paiement", "Écrire les CGV"], 0),
      q("Le piège du sur-traitement est…", ["Détruire la dynamique", "Améliorer la nuance", "Clarifier la voix", "Ranger les fichiers"], 0),
      q("Une version pro doit être…", ["Présentable et documentée", "Sans contexte", "Impossible à relire", "Non exportée"], 0),
    ],
  },
  {
    id: "expert-4",
    eyebrow: "Expert 04",
    title: "Clonage, personas et modèles de voix",
    intro: "Ce niveau encadre les voix et personas : cohérence artistique, prudence juridique, modèle vocal, identité et limites. Le but est de créer une voix crédible sans copier une personne identifiable.",
    lessons: [
      "Créer une persona vocale : intention, âge perçu, grain, énergie, langue, posture émotionnelle.",
      "Éviter les imitations d’artistes connus et les voix reconnaissables sans autorisation.",
      "Construire une cohérence entre voix, lyrics, image et univers.",
      "Tester plusieurs modèles sans perdre l’identité principale.",
      "Documenter la méthode pour justifier le processus créatif et les choix.",
    ],
    exercise: "Définir une persona vocale complète et générer deux essais comparés avec critères précis.",
    quiz: [
      q("Une persona vocale décrit…", ["Une identité vocale et émotionnelle", "Un mot de passe", "Une facture", "Un lien Drive"], 0),
      q("Il faut éviter…", ["D’imiter une voix connue sans autorisation", "De documenter", "De choisir une émotion", "De comparer"], 0),
      q("La cohérence voix-image sert à…", ["Rendre l’artiste crédible", "Changer le prix", "Supprimer le prompt", "Créer un menu"], 0),
      q("Tester plusieurs voix permet…", ["De choisir celle qui sert l’univers", "De perdre l’identité", "De publier plus vite sans écouter", "De remplacer les paroles"], 0),
      q("La méthode doit être documentée pour…", ["Expliquer et défendre le processus", "Cacher les choix", "Ignorer les droits", "Effacer les fichiers"], 0),
      q("Une voix trop générique peut être améliorée par…", ["Des critères de grain et d’intention", "Un titre plus long", "Une couleur de bouton", "Un prix plus haut"], 0),
      q("Le clonage vocal exige…", ["Prudence, autorisation et cadre clair", "Aucun consentement", "Un simple hasard", "Un oubli total"], 0),
      q("La langue influence…", ["La diction et le rendu vocal", "Le footer", "Le paiement", "La taille du logo"], 0),
      q("Une persona crédible doit rester…", ["Stable d’un morceau à l’autre", "Totalement aléatoire", "Sans émotion", "Sans description"], 0),
      q("Un modèle vocal doit être évalué sur…", ["Grain, justesse, émotion, cohérence", "Le nom du fichier seulement", "Le nombre de pixels", "La couleur du fond"], 0),
    ],
  },
];

const expertFinalBase: QuizQuestion[] = [
  ...finalExam.slice(0, 30).map((question) => ({ ...question, prompt: question.prompt.replace(/^\d+\. /, "") })),
  q("À quoi sert le signal layered dans un prompt expert ?", ["Hiérarchiser les couches d’intention", "Ajouter du texte inutile", "Remplacer le mixage", "Créer un logo"], 0),
  q("Pourquoi ne faut-il pas mélanger trop de genres ?", ["Cela brouille le signal artistique", "Cela réduit le prix", "Cela valide le certificat", "Cela améliore toujours le rendu"], 0),
  q("Quel est le rôle d’Extend ?", ["Développer une bonne base au bon moment", "Sauver automatiquement tout morceau", "Exporter une facture", "Créer une persona"], 0),
  q("Quand faut-il jeter une génération ?", ["Quand elle trahit l’intention et ne se répare pas", "Quand elle est cohérente", "Quand l’arrangement fonctionne", "Quand le prompt est clair"], 0),
  q("Le Track EQ sert à…", ["Corriger l’équilibre fréquentiel", "Créer des paroles", "Choisir le prix", "Écrire une bio"], 0),
  q("Une persona vocale doit être…", ["Définie, cohérente et autorisée", "Copiée sur une star", "Floue", "Sans cadre"], 0),
  q("Un rendu pro exige…", ["Création, analyse, correction et documentation", "Un seul clic", "Aucune écoute", "Un prompt caché"], 0),
  q("L’exercice final doit prouver…", ["La méthode de composition et les choix d’outils", "Uniquement le paiement", "La couleur du site", "Le nom du fichier"], 0),
  q("Un export DAW propre comprend…", ["Nommage, versions, notes et fichiers rangés", "Un fichier aléatoire", "Aucune note", "Un lien mort"], 0),
  q("Un certificat expert doit valider…", ["Autonomie, qualité, méthode et rendu final", "La chance", "Le nombre de clics", "La vitesse"], 0),
];

export const expertFinalExam: QuizQuestion[] = Array.from({ length: 100 }, (_, index) => {
  const base = expertFinalBase[index % expertFinalBase.length];
  return { ...base, prompt: `${index + 1}. ${base.prompt}` };
});
