import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  Plane,
  Sparkles,
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

export default function Home() {
  return (
    <main className="home agency-home">
      <AgencyHero />

      <section className="home-contest-feature" aria-labelledby="dj-contest-home-title">
        <div className="contest-feature-card">
          <div className="contest-feature-visual">
            <Image
              src="/dj-contest-skorm-2026.png"
              alt="SKORM DJ Contest 2026"
              fill
              sizes="(max-width: 900px) 88vw, 520px"
              priority
            />
          </div>

          <div className="contest-feature-copy">
            <p className="eyebrow">SKORM DJ Contest</p>
            <h2 id="dj-contest-home-title">
              Une sélection internationale pour monter sur scène à Séoul.
            </h2>
            <p>
              Inscriptions en ligne ouvertes jusqu’au 1er septembre 2026.
              Participation : 29 €. Les 50 premiers profils retenus renverront
              ensuite une composition dédiée.
            </p>
            <div className="contest-feature-actions">
              <Link href="/concours-dj">Participer</Link>
              <span><Plane size={17} /> Finale à Séoul en octobre 2026</span>
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
              Une formation essentielle pour apprendre à utiliser Suno V5/V5.5,
              écrire de vrais prompts musicaux, construire une direction artistique
              et préparer des morceaux propres sans tomber dans le rendu générique.
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
              SKORM peut aussi accompagner des projets d’artistes IA : direction
              artistique, image, contenus, narration, lancement, calendrier de sorties
              et structuration d’un univers crédible avant exposition publique.
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
