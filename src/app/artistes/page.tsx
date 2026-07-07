import { HomeArtistCard } from "@/components/home-artist-card";
import { artistMedia, artists } from "@/lib/content";

export default function ArtistsPage() {
  return (
    <main className="roster-page">
      <section className="roster-page-head">
        <p className="eyebrow">Roster</p>
        <h1>Les artistes suivis par SKORM</h1>
        <p>Des univers hard, club et performatifs, avec la même exigence : image, dates, contenus et suivi professionnel.</p>
      </section>
      <section className="roster-gallery">
        {artists.map((artist) => {
          const media = artistMedia[artist.slug as keyof typeof artistMedia];
          const release = "featuredSound" in artist ? artist.featuredSound : media.sounds[0];
          return (
            <HomeArtistCard
              key={artist.slug}
              artist={artist}
              release={release}
            />
          );
        })}
      </section>
    </main>
  );
}
