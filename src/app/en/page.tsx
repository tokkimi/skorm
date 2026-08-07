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
  { icon: Sparkles, title: "Image direction", text: "Positioning, identity, content and visual consistency.", href: "/en/contact" },
  { icon: CalendarDays, title: "European booking", text: "Dates, options, confirmations, follow-ups and field coordination.", href: "/en/agenda" },
  { icon: Mail, title: "Professional requests", text: "Bookers, media, brands and partners centralized in one place.", href: "/en/contact" },
  { icon: BriefcaseBusiness, title: "Career management", text: "Priorities, strategy, decisions and long-term development.", href: "/en/rejoindre-agence" },
];

export default async function EnglishHome() {
  const { artists, dates } = await getPublicSiteData();

  return (
    <main className="home agency-home">
      <AgencyHero lang="en" dates={dates} />

      <section className="home-profiles" id="roster">
        <div className="section-kicker">
          <p className="eyebrow">Roster</p>
          <h2>Artists represented by SKORM.</h2>
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
