import { HomeArtistCard } from "@/components/home-artist-card";
import { artistMedia, artists } from "@/lib/content";

export default function ArtistsPage() {
  return (
    <main className="roster-page">
      <section className="roster-page-head">
        <p className="eyebrow">Roster</p>
        <h1>Les artistes suivis par SKORM</h1>
        <p>Deux univers, une m?me exigence : image, dates, contenus et suivi professionnel.</p>
      </section>
      <section className="roster-gallery">
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
