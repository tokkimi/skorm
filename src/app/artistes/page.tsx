import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { artists } from "@/lib/content";

export default function ArtistsPage() {
  return (
    <PageShell label="Roster" title="Deux artistes. Deux mondes." light>
      <section className="roster-grid">
        {artists.map((artist, index) => (
          <Link className={`roster-tile tile-${artist.slug}`} href={`/artistes/${artist.slug}`} key={artist.slug}>
            {artist.slug === "paga" ? (
              <Image src="/artists/paga.png" fill alt="" sizes="(max-width: 800px) 100vw, 50vw" priority />
            ) : (
              <div className="rave-visual"><span>CGL</span><span>RAVE UNIT</span></div>
            )}
            <div className="tile-overlay" />
            <div className="tile-copy">
              <small>0{index + 1} / {artist.genre}</small>
              <h2>{artist.name}</h2>
              <span className="tile-arrow"><ArrowUpRight /></span>
            </div>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
