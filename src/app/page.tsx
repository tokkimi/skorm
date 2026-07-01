import Link from "next/link";
import { Bot, BriefcaseBusiness, CalendarDays, Mail, Plane, Sparkles, Trophy } from "lucide-react";
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

      <section className="home-contest-callout">
        <div>
          <p className="eyebrow">DJ Contest · inscriptions ouvertes</p>
          <h2>29 € pour tenter la sélection SKORM et viser la finale à Séoul.</h2>
          <p>
            Dépôt en ligne jusqu’au 1er septembre. Première sélection de 50 DJ,
            nouvelle composition à envoyer, puis annonce des 10 finalistes le 30 septembre.
          </p>
        </div>
        <div className="home-contest-metrics">
          <span><Trophy size={18} /> 50 sélectionnés</span>
          <span><Plane size={18} /> 10 finalistes à Séoul</span>
          <Link href="/concours-dj">Participer</Link>
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
