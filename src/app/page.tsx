import {
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AgencyHero } from "@/components/agency-hero";
import { HomeArtistCard } from "@/components/home-artist-card";
import { HorizontalRail } from "@/components/horizontal-rail";
import { getPublicSiteData } from "@/lib/public-site-data";

export const dynamic = "force-dynamic";

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
  const { artists, dates } = await getPublicSiteData();

  return (
    <main className="home agency-home">
      <AgencyHero dates={dates} />

      <section className="home-profiles" id="roster">
        <div className="section-kicker">
          <p className="eyebrow">Roster</p>
          <h2>Les profils suivis par SKORM.</h2>
        </div>

        <HorizontalRail className="profile-rail-wrap" loop>
          {artists.map((artist) => (
            <HomeArtistCard
              key={artist.slug}
              artist={artist}
              release={artist.featuredSound || undefined}
            />
          ))}
        </HorizontalRail>
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
