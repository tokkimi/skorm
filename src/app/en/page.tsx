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
  { icon: Sparkles, title: "Image direction", text: "Positioning, identity, content and visual consistency.", href: "/en/contact" },
  { icon: CalendarDays, title: "European booking", text: "Dates, options, confirmations, follow-ups and field coordination.", href: "/en/agenda" },
  { icon: Mail, title: "Professional requests", text: "Bookers, media, brands and partners centralized in one place.", href: "/en/contact" },
  { icon: BriefcaseBusiness, title: "Career management", text: "Priorities, strategy, decisions and long-term development.", href: "/en/rejoindre-agence" },
];

export default function EnglishHome() {
  return (
    <main className="home agency-home">
      <AgencyHero lang="en" />

      <section className="home-contest-feature" aria-labelledby="dj-contest-home-title-en">
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
            <h2 id="dj-contest-home-title-en">An international selection to perform on stage in Seoul.</h2>
            <p>
              Online registrations are open until September 1, 2026. Entry fee: €29.
              The first 50 selected profiles will then submit a dedicated composition.
            </p>
            <div className="contest-feature-actions">
              <Link href="/en/concours-dj">Enter now</Link>
              <span><Plane size={17} /> Seoul final in October 2026</span>
            </div>
          </div>
        </div>
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

      <section className="ai-training-home" id="ai-artist-training">
        <div className="ai-training-card">
          <div className="ai-training-orb" aria-hidden="true">SK</div>
          <div>
            <p className="eyebrow">AI music lab</p>
            <h2>Turn an idea into a real sonic identity.</h2>
            <p>
              Two tracks to frame a direction, write useful prompts, produce cleaner
              music and build a universe that does not feel like a generic AI test.
            </p>
          </div>
          <Link href="/en/formation-ia">View training</Link>
        </div>
      </section>

      <section className="ai-artist-block" id="ai-artists">
        <div className="ai-artist-inner">
          <span><Bot size={18} /></span>
          <div>
            <p className="eyebrow">Hybrid projects</p>
            <h2>Direction, launch and follow-up for AI universes.</h2>
            <p>
              SKORM supports projects combining music, image, storytelling and AI tools:
              identity, release planning, content and launch strategy before public exposure.
            </p>
          </div>
          <Link href="/en/rejoindre-agence">Submit a project</Link>
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
