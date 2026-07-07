import { HomeArtistCard } from "@/components/home-artist-card";
import { artists, getFeaturedAudioForArtist } from "@/lib/content";

export default function EnglishArtistsPage() {
  return (
    <main className="roster-page">
      <section className="roster-page-head">
        <p className="eyebrow">Roster</p>
        <h1>Artists represented by SKORM</h1>
        <p>Two universes, one standard: image, dates, content and professional follow-up.</p>
      </section>
      <section className="roster-gallery">
        {artists.map((artist) => (
          <HomeArtistCard
            key={artist.slug}
            artist={artist}
            release={getFeaturedAudioForArtist(artist)}
          />
        ))}
      </section>
    </main>
  );
}
