import Link from "next/link";
import { Bot, BriefcaseBusiness, CalendarDays, Mail, Sparkles } from "lucide-react";
import { HorizontalRail } from "@/components/horizontal-rail";
import { AgencyHero } from "@/components/agency-hero";
import { HomeArtistCard } from "@/components/home-artist-card";
import { artistMedia, artists } from "@/lib/content";

const features = [
  { icon: Sparkles, title: "Image direction", text: "Positioning, identity, content and visual consistency.", href: "/en/contact" },
  { icon: CalendarDays, title: "European booking", text: "Dates, options, confirmations, follow-ups and field coordination.", href: "/en/agenda" },
  { icon: Mail, title: "Professional requests", text: "Bookers, media, brands and partners centralized in one place.", href: "/en/contact" },
  { icon: BriefcaseBusiness, title: "Career management", text: "Priorities, strategy, decisions and long-term development.", href: "/en/rejoindre-agence" },
];

export default function EnglishHome() {
  return (
    <main className="home agency-home">
      <AgencyHero lang="en" />

      <section className="home-contest-visual" aria-labelledby="dj-contest-home-title-en">
        <img src="/dj-contest-skorm-2026.png" alt="SKORM DJ Contest — €29, registrations until September 1, 2026, 10 finalists in Seoul in October 2026" />
        <div className="home-contest-overlay">
          <p className="eyebrow">DJ Contest · registrations open</p>
          <h2 id="dj-contest-home-title-en">International selection, final in Seoul in October 2026.</h2>
        </div>
        <Link className="home-contest-register" href="/en/concours-dj">Enter now</Link>
      </section>

      <section className="home-profiles" id="roster">
        <div className="section-kicker">
          <p className="eyebrow">Roster</p>
          <h2>Artists represented by SKORM.</h2>
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

      <section className="ai-artist-block" id="ai-artists">
        <div className="ai-artist-inner">
          <span><Bot size={18} /></span>
          <div>
            <p className="eyebrow">AI artists</p>
            <h2>Management, creation and training for AI artists.</h2>
            <p>
              SKORM also supports AI artist projects: art direction, image, content,
              storytelling, launch strategy, release planning and a credible creative universe.
            </p>
          </div>
          <Link href="/en/rejoindre-agence">Submit an AI project</Link>
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

