import { HomeArtistCard } from "@/components/home-artist-card";
import { getPublicSiteData } from "@/lib/public-site-data";

export const dynamic = "force-dynamic";

export default async function ArtistsPage() {
  const { artists } = await getPublicSiteData();

  return (
    <main className="roster-page">
      <section className="roster-page-head">
        <p className="eyebrow">Roster</p>
        <h1>Les artistes suivis par SKORM</h1>
        <p>Des univers hard, club et performatifs, avec la même exigence : image, dates, contenus et suivi professionnel.</p>
      </section>
      <section className="roster-gallery">
        {artists.map((artist) => (
          <HomeArtistCard
            key={artist.slug}
            artist={artist}
            release={artist.featuredSound || undefined}
          />
        ))}
      </section>
    </main>
  );
}
