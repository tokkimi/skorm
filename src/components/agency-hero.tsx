"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { HorizontalRail } from "@/components/horizontal-rail";
import { dates } from "@/lib/content";

type Lang = "fr" | "en";

export function AgencyHero({ lang = "fr" }: { lang?: Lang }) {
  const isEn = lang === "en";
  const base = isEn ? "/en" : "";

  return (
    <section className="agency-paga-hero agency-centered-hero">
      <Image src="/agency/agency-dj-hero.png" alt="" fill priority sizes="100vw" className="agency-paga-hero-image" />
      <div className="agency-paga-overlay" />

      <div className="agency-paga-shell">
        <div className="agency-paga-copy">
          <p className="eyebrow">{isEn ? "Management · Communication · Partnerships · AI · Training" : "Management · Communication · Partenariats · IA · Formation"}</p>
          <img className="agency-hero-logo" src="/skorm-logo.svg" alt="SKORM Agency" />
          <p>
            {isEn
              ? "A dark-tech agency shaping image, content, dates and opportunities around electronic artists, AI artists and ambitious creative projects."
              : "Une agence dark-tech qui structure l’image, les contenus, les dates et les opportunités autour d’artistes électroniques, d’artistes IA et de projets créatifs ambitieux."}
          </p>
          <div className="agency-hero-actions">
            <Link href="#roster">{isEn ? "Discover the roster" : "Découvrir le roster"}</Link>
            <Link href={`${base}/contact`}>Contact</Link>
          </div>
        </div>

        <div className="agency-hero-date-strip">
          <div className="agency-paga-date-head">
            <p className="eyebrow">{isEn ? "Upcoming dates" : "Prochaines dates"}</p>
            <span>{String(dates.length).padStart(2, "0")} events</span>
          </div>
          <HorizontalRail className="agency-date-rail">
            {dates.map((date) => (
              <Link href={`${base}/agenda`} className="agency-active-date" key={`${date.iso}-${date.event}`}>
                <div><time><b>{date.day}</b>{date.month}</time><span>{date.status}</span></div>
                <strong>{date.event}</strong>
                <small><MapPin size={12} /> {date.location} · {date.artist}</small>
              </Link>
            ))}
          </HorizontalRail>
        </div>
      </div>
    </section>
  );
}
