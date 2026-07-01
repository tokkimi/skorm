import Link from "next/link";
import {
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Euro,
  Mail,
  Plane,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";
import { HorizontalRail } from "@/components/horizontal-rail";
import { AgencyHero } from "@/components/agency-hero";
import { HomeArtistCard } from "@/components/home-artist-card";
import { artistMedia, artists } from "@/lib/content";

const features = [
  {
    icon: Sparkles,
    title: "Direction d’image",
    text: "Positionnement, identité, contenus et cohérence visuelle.",
    href: "/contact",
  },
  {
    icon: CalendarDays,
    title: "Booking Europe",
    text: "Dates, options, confirmations, relances et suivi terrain.",
    href: "/agenda",
  },
  {
    icon: Mail,
    title: "Demandes pros",
    text: "Bookers, médias, marques et partenaires au même endroit.",
    href: "/contact",
  },
  {
    icon: BriefcaseBusiness,
    title: "Gestion de carrière",
    text: "Priorités, stratégie, arbitrages et développement long terme.",
    href: "/rejoindre-agence",
  },
];

const contestStats = [
  { icon: Euro, value: "29€", label: "Participation" },
  { icon: CalendarDays, value: "1 sept.", label: "Fin inscriptions" },
  { icon: UsersRound, value: "50", label: "Sélectionnés" },
  { icon: Trophy, value: "10", label: "Finalistes" },
];

export default function Home() {
  return (
    <main className="home agency-home">
      <AgencyHero />

      <section className="home-contest-coded" aria-labelledby="dj-contest-home-title">
        <div className="contest-coded-bg" aria-hidden="true" />
        <div className="contest-coded-topline">
          <span>SKORM Agency</span>
          <span>DJ Contest</span>
          <span>Séoul · Octobre 2026</span>
        </div>
        <div className="contest-coded-main">
          <div className="contest-coded-copy">
            <p className="eyebrow">DJ Contest · inscriptions ouvertes</p>
            <h2 id="dj-contest-home-title">Une sélection internationale pour jouer la finale à Séoul.</h2>
            <p>
              Inscription en ligne à 29 €. Première sélection de 50 DJ, nouvelle composition à envoyer,
              puis annonce des 10 finalistes le 30 septembre 2026.
            </p>
            <div className="contest-coded-actions">
              <Link href="/concours-dj">S’inscrire</Link>
              <span><Plane size={16} /> Voyage à Séoul offert aux finalistes</span>
            </div>
          </div>
          <div className="contest-coded-panel" aria-label="Informations concours">
            <div className="contest-metal-title">
              <span>DJ</span>
              <strong>CONTEST</strong>
            </div>
            <div className="contest-stat-grid">
              {contestStats.map(({ icon: Icon, value, label }) => (
                <article key={label}>
                  <Icon size={18} />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <div className="contest-seoul-card">
              <small>Finale</small>
              <strong>Séoul</strong>
              <span>Octobre 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-profiles" id="roster">
        <div className="section-kicker">
          <p className="eyebrow">Roster</p>
          <h2>Les profils suivis par SKORM.</h2>
        </div>

        <HorizontalRail className="profile-rail-wrap">
          {artists.map((artist) => (
            <HomeArtistCard
              key={artist.slug}
              artist={artist}
              release={artistMedia[artist.slug as keyof typeof artistMedia].sounds[0]}
            />
          ))}
        </HorizontalRail>
      </section>

      <section className="ai-training-home" id="formation-artiste-ia">
        <div className="ai-training-card">
          <div className="ai-training-orb" aria-hidden="true">AI</div>
          <div>
            <p className="eyebrow">Formation artiste IA</p>
            <h2>Créer, lancer et structurer un artiste IA crédible.</h2>
            <p>
              Une formation essentielle pour apprendre à utiliser Suno V5/V5.5, écrire de vrais prompts musicaux,
              construire une direction artistique et préparer des morceaux propres sans tomber dans le rendu générique.
            </p>
          </div>
          <Link href="/formation-ia">Découvrir la formation</Link>
        </div>
      </section>

      <section className="ai-artist-block" id="artistes-ia">
        <div className="ai-artist-inner">
          <span><Bot size={18} /></span>
          <div>
            <p className="eyebrow">Artistes IA</p>
            <h2>Management, création et formation d’artistes IA.</h2>
            <p>
              SKORM peut aussi accompagner des projets d’artistes IA : direction artistique,
              image, contenus, narration, lancement, calendrier de sorties et structuration
              d’un univers crédible avant exposition publique.
            </p>
          </div>
          <Link href="/rejoindre-agence">Présenter un projet IA</Link>
        </div>
      </section>

      <section className="home-services dot-section" id="services">
        <div className="dot-feature-panel">
          {features.map(({ icon: Icon, title, text, href }) => (
            <Link href={href} key={title} className="dot-feature-card">
              <span><Icon size={21} /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
