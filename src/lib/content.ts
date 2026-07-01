export const services = [
  {
    title: "Communication 360°",
    description:
      "Positionnement, direction éditoriale, réseaux sociaux, presse, contenus, calendrier de sorties et cohérence de marque.",
  },
  {
    title: "Management",
    description:
      "Vision de carrière, coordination des partenaires, suivi quotidien, opportunités et arbitrages stratégiques.",
  },
  {
    title: "Booking Europe",
    description:
      "Prospection, négociation, contractualisation et coordination des dates en France, Belgique, Suisse et Europe.",
  },
  {
    title: "Brand partnerships",
    description:
      "Casting, stratégie d’influence, campagnes, activations événementielles, sponsors et ambassadeurs.",
  },
];

export const artists = [
  {
    slug: "cgl-rave-unit",
    name: "Cagoule Rave Unit",
    genre: "Dark indus · Dark raw",
    bio: "DJ / producer dark indus et dark raw, construit autour d’une identité cagoulée, dure, live et industrielle.",
    role: "Identité visuelle, contenus live, booking hard techno et développement scène.",
    instagram: "https://www.instagram.com/cgl.raveunit/",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/cgl.raveunit/" },
      { label: "Booking", href: "/contact" },
    ],
  },
  {
    slug: "paga",
    name: "Paga",
    genre: "DJ · Producer · Performer",
    bio: "Un univers solaire et nocturne porté par la scène. SKORM orchestre sa communication globale et le management de ses bookings européens.",
    role: "Communication intégrale, management booking Europe et partenariats.",
    instagram: "https://www.instagram.com/paga_lmsa/",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/paga_lmsa/" },
      { label: "Booking", href: "/contact" },
    ],
  },
];

export const dates = [
  { iso: "2026-06-22", day: "22", month: "JUN", artist: "Paga", event: "Delta Festival", location: "Marseille, FR", status: "TBA" },
  { iso: "2026-06-25", day: "25", month: "JUN", artist: "Paga", event: "Fos en Pétanque", location: "Fos-sur-Mer, FR", status: "Confirmé" },
  { iso: "2026-07-12", day: "12", month: "JUL", artist: "Paga", event: "Holi Lakes Festival", location: "Cerfontaine, BE", status: "Confirmé" },
  { iso: "2026-07-14", day: "14", month: "JUL", artist: "Paga", event: "Scandals Pool Party", location: "Lyon, FR", status: "Confirmé" },
  { iso: "2026-08-02", day: "02", month: "AOU", artist: "Cagoule Rave Unit", event: "Rave Unit Session", location: "Europe, TBA", status: "En discussion" },
];

export const artistMedia = {
  "cgl-rave-unit": {
    sounds: [
      { title: "DON'T DO IT", meta: "Cagoule Rave Unit", cover: "/artists/cgl-latest-dont-do-it.jpg", href: "https://www.instagram.com/p/DZNdz2-jZCR/" },
      { title: "Full set", meta: "Hard tekno · industrial · raw", cover: "/artists/video-cgl-fullset.jpg", href: "https://www.instagram.com/p/DYST6dmiKEB/" },
      { title: "Space 92 · Acid live", meta: "Cagoule Rave Unit", cover: "/artists/video-cgl-space.jpg", href: "https://www.instagram.com/p/DVvdxmgjLl2/" },
    ],
    releases: [
      { title: "DON'T DO IT", meta: "Publication officielle", cover: "/artists/cgl-latest-dont-do-it.jpg", href: "https://www.instagram.com/p/DZNdz2-jZCR/" },
      { title: "Dark RAW direction", meta: "Campagne artiste", cover: "/artists/video-cgl-hypnotic.jpg", href: "https://www.instagram.com/p/DUTUUuziIie/" },
      { title: "Hard indus tools", meta: "Contenus live", cover: "/artists/video-cgl-space.jpg", href: "https://www.instagram.com/p/DVvdxmgjLl2/" },
    ],
    videos: [
      { title: "Full set", meta: "Instagram · contenu officiel", cover: "/artists/video-cgl-fullset.jpg", href: "https://www.instagram.com/p/DYST6dmiKEB/" },
      { title: "Space 92 · Acid live", meta: "Instagram · contenu officiel", cover: "/artists/video-cgl-space.jpg", href: "https://www.instagram.com/p/DVvdxmgjLl2/" },
      { title: "Hypnotic rave", meta: "Instagram · contenu officiel", cover: "/artists/video-cgl-hypnotic.jpg", href: "https://www.instagram.com/p/DUTUUuziIie/" },
    ],
  },
  paga: {
    sounds: [
      { title: "Let's Go", meta: "Paga", cover: "/artists/paga-lets-go.jpg", href: "https://www.deezer.com/track/4040458501", deezerId: "4040458501" },
      { title: "Echoes - Extended Version", meta: "Paga", cover: "/artists/paga-echoes.jpg", href: "https://www.deezer.com/track/3970476111", deezerId: "3970476111" },
      { title: "Let U Go", meta: "Alexis Dante x Paga", cover: "/artists/paga-let-u-go.jpg", href: "https://www.deezer.com/track/3948425261", deezerId: "3948425261" },
      { title: "Main dans la main", meta: "Paga x Anton Wick", cover: "/artists/paga-superstition.jpg", href: "https://www.deezer.com/track/3786117532", deezerId: "3786117532" },
      { title: "Superstition", meta: "Paga x Anton Wick", cover: "/artists/paga-superstition.jpg", href: "https://www.deezer.com/track/3786117672", deezerId: "3786117672" },
    ],
    releases: [
      { title: "Let's Go", meta: "Paga", cover: "/artists/paga-lets-go.jpg", href: "https://www.deezer.com/track/4040458501", deezerId: "4040458501" },
      { title: "Echoes", meta: "Paga", cover: "/artists/paga-echoes.jpg", href: "https://www.deezer.com/track/3970476101", deezerId: "3970476101" },
      { title: "Better Days", meta: "Jimmy Sax x Paga", cover: "/artists/paga-better-days.jpg", href: "https://www.deezer.com/track/2308585725", deezerId: "2308585725" },
      { title: "Cochabamba", meta: "Paga", cover: "/artists/paga-cochabamba.jpg", href: "https://www.deezer.com/track/3293951151", deezerId: "3293951151" },
    ],
    videos: [
      { title: "C’est la night", meta: "Clip officiel · Bengous, Paga", cover: "/artists/video-paga-night.jpg", href: "https://www.youtube.com/watch?v=_3-LrpbWuwU" },
      { title: "Té Le Twerk", meta: "Official audio", cover: "/artists/video-paga-twerk.jpg", href: "https://www.youtube.com/watch?v=_BUd3Xgszoc" },
      { title: "C’est la night · audio", meta: "YouTube · miniature officielle", cover: "/artists/video-paga-night-audio.jpg", href: "https://www.youtube.com/watch?v=BC67MCgN__g" },
    ],
  },
} as const;

export function getArtistDates(artistName: string) {
  return dates.filter((date) => date.artist === artistName);
}
