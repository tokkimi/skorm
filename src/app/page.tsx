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
import { HomeMediaDiapo } from "@/components/home-media-diapo";
import type { HomeDiapoItem } from "@/components/home-media-diapo";
import { getAdminData } from "@/lib/admin-data";
import { artists, getFeaturedAudioForArtist } from "@/lib/content";

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

export default async function Home() {
  const { content_items } = await getAdminData();
  const diapoItems: HomeDiapoItem[] = content_items
    .filter((item) => item.platform === "diapo" && item.status === "published" && item.asset_url)
    .map((item) => ({
      id: item.id,
      title: item.title,
      meta: [item.artist_name, item.caption, item.publish_at ? new Date(item.publish_at).toLocaleDateString("fr-FR") : ""]
        .filter(Boolean)
        .join(" · ") || "SKORM Agency",
      type: item.content_type === "video" ? "Vidéo" : "Photo",
      src: item.asset_url || undefined,
    }));

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
              sizes="(max-width: 900px) 96vw, 620px"
              priority
            />
          </div>

          <div className="contest-feature-copy">
            <p className="eyebrow">SKORM DJ Contest</p>
            <h2 id="dj-contest-home-title">Une sélection internationale pour monter sur scène à Séoul.</h2>
            <p>
              Inscriptions ouvertes jusqu’au 1er septembre 2026. Participation : 29 €.
              Les 50 premiers profils retenus renverront ensuite une composition dédiée.
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
          {artists.map((artist) => {
            const release = getFeaturedAudioForArtist(artist);
            return (
              <HomeArtistCard
                key={artist.slug}
                artist={artist}
                release={release}
              />
            );
          })}
        </HorizontalRail>
      </section>

      <section className="ai-training-home" id="formation-artiste-ia">
        <div className="ai-training-card">
          <div className="ai-training-orb" aria-hidden="true">SK</div>
          <div>
            <p className="eyebrow">Laboratoire IA musicale</p>
            <h2>Transformer une idée en identité sonore.</h2>
            <p>
              Deux parcours pour cadrer une direction, écrire des prompts utiles,
              produire proprement et construire un univers qui ne ressemble pas à
              un simple test génératif.
            </p>
          </div>
          <Link href="/formation-ia">Voir les formations</Link>
        </div>
      </section>

      <section className="ai-artist-block" id="artistes-ia">
        <div className="ai-artist-inner">
          <span><Bot size={18} /></span>
          <div>
            <p className="eyebrow">Projets hybrides</p>
            <h2>Direction, lancement et suivi d’univers IA.</h2>
            <p>
              SKORM accompagne les projets qui mêlent musique, image, narration
              et outils IA : identité, calendrier de sorties, contenus et stratégie
              de lancement avant exposition publique.
            </p>
          </div>
          <Link href="/rejoindre-agence">Présenter un projet</Link>
        </div>
      </section>

      <HomeMediaDiapo items={diapoItems} />

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
