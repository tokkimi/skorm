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
  { icon: Sparkles, title: "Image direction", text: "Positioning, identity, content and visual consistency.", href: "/en/contact" },
  { icon: CalendarDays, title: "European booking", text: "Dates, options, confirmations, follow-ups and field coordination.", href: "/en/agenda" },
  { icon: Mail, title: "Professional requests", text: "Bookers, media, brands and partners centralized in one place.", href: "/en/contact" },
  { icon: BriefcaseBusiness, title: "Career management", text: "Priorities, strategy, decisions and long-term development.", href: "/en/rejoindre-agence" },
];

const contestStats = [
  { icon: Euro, value: "€29", label: "Participation" },
  { icon: CalendarDays, value: "Sept. 1", label: "Deadline" },
  { icon: UsersRound, value: "50", label: "Selected" },
  { icon: Trophy, value: "10", label: "Finalists" },
];

export default function EnglishHome() {
  return (
    <main className="home agency-home">
      <AgencyHero lang="en" />

      <section className="home-contest-coded" aria-labelledby="dj-contest-home-title-en">
        <div className="contest-coded-bg" aria-hidden="true" />
        <div className="contest-coded-topline">
          <span>SKORM Agency</span>
          <span>DJ Contest</span>
          <span>Seoul · October 2026</span>
        </div>
        <div className="contest-coded-main">
          <div className="contest-coded-copy">
            <p className="eyebrow">DJ Contest · registrations open</p>
            <h2 id="dj-contest-home-title-en">An international selection to play the final in Seoul.</h2>
            <p>
              Online registration for €29. First selection of 50 DJs, a new composition to submit,
              then the 10 finalists are announced on September 30, 2026.
            </p>
            <div className="contest-coded-actions">
              <Link href="/en/concours-dj">Enter now</Link>
              <span><Plane size={16} /> Seoul trip offered to finalists</span>
            </div>
          </div>
          <div className="contest-coded-panel" aria-label="Contest information">
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
              <small>Final</small>
              <strong>Seoul</strong>
              <span>October 2026</span>
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
          <div className="ai-training-orb" aria-hidden="true">AI</div>
          <div>
            <p className="eyebrow">AI artist training</p>
            <h2>Create, launch and structure a credible AI artist.</h2>
            <p>
              An essential training program to use Suno V5/V5.5, write real music prompts,
              build an artistic direction and prepare cleaner tracks without sounding generic.
            </p>
          </div>
          <Link href="/en/formation-ia">Discover the training</Link>
        </div>
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
