import { HomeArtistCard } from "@/components/home-artist-card";
import { artistMedia, artists } from "@/lib/content";

export default function EnglishArtistsPage() {
  return (
    <main className="roster-page">
      <section className="roster-page-head">
        <p className="eyebrow">Roster</p>
        <h1>Artists represented by SKORM</h1>
        <p>Two universes, one standard: image, dates, content and professional follow-up.</p>
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
