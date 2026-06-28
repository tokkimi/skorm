import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HomeArtistCard } from "@/components/home-artist-card";
import { artistMedia, artists } from "@/lib/content";

export default function ArtistsPage() {
  return (
    <main className="roster-page roster-page-unified">
      <Link href="/" className="roster-back"><ArrowLeft size={14} /> Retour</Link>

      <section className="roster-head">
        <p className="eyebrow">Roster</p>
        <h1>Les artistes suivis par SKORM</h1>
        <p>Deux univers, une m챗me exigence : image, dates, contenus et suivi professionnel.</p>
      </section>

      <section className="roster-gallery roster-gallery-unified">
        {artists.map((artist) => (
          <HomeArtistCard
            key={artist.slug}
            artist={artist}
            release={artistMedia[artist.slug as keyof typeof artistMedia].sounds[0]}
          />
        ))}
      </section>
    </main>
  );
}

