import {
  BriefcaseBusiness,
  CalendarDays,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AgencyHero } from "@/components/agency-hero";
import { HomeArtistCard } from "@/components/home-artist-card";
import { HomeMediaDiapo, type HomeDiapoItem } from "@/components/home-media-diapo";
import { HorizontalRail } from "@/components/horizontal-rail";
import { getPublicSiteData } from "@/lib/public-site-data";

export const dynamic = "force-dynamic";

const features = [
  {
    icon: Sparkles,
    title: "Direction d’image",
    text: "Positionnement, identité, contenus et cohérence visuelle.",
    href: "/contact",
  },
  {
    icon: CalendarDays,
    title: "Booking Europe",
    text: "Dates, options, confirmations, relances et suivi terrain.",
    href: "/agenda",
  },
  {
    icon: Mail,
    title: "Demandes pros",
    text: "Bookers, médias, marques et partenaires au même endroit.",
    href: "/contact",
  },
  {
    icon: BriefcaseBusiness,
    title: "Gestion de carrière",
    text: "Priorités, stratégie, arbitrages et développement long terme.",
    href: "/rejoindre-agence",
  },
];

export default async function Home() {
  const { adminData, artists, dates } = await getPublicSiteData();
  const diapoItems: HomeDiapoItem[] = adminData.content_items
    .filter((item) => item.platform === "diapo" && item.status === "published" && item.asset_url)
    .map((item) => {
      let details: Record<string, string> = {};
      try { details = JSON.parse(item.caption || "{}"); } catch { details = {}; }
      return ({
      id: item.id,
      title: item.title,
      meta:
        [item.artist_name, item.caption, item.publish_at ? new Date(item.publish_at).toLocaleDateString("fr-FR") : ""]
          .filter(Boolean)
          .join(" · ") || "SKORM Agency",
      type: item.content_type === "story" ? "Story" : item.content_type === "video" ? "Vidéo" : "Photo",
      src: item.asset_url || undefined,
      instagram: item.content_type === "story" ? item.asset_url || undefined : undefined,
      artist: item.artist_name || undefined,
      location: details.location,
      description: details.description,
      duration: details.duration,
      date: item.publish_at ? new Date(item.publish_at).toLocaleDateString("fr-FR") : undefined,
      thumbSrc: details.thumbnail,
    }); });

  const artistDiapoItems: HomeDiapoItem[] = artists.flatMap((artist) =>
    artist.media.videos
      .filter((item) => item.showOnHome !== false && (item.cover || item.href))
      .map((item, index) => ({
        id: `artist-${artist.slug}-${index}`,
        title: item.title || artist.name,
        meta: item.meta || artist.name,
        type: item.mediaType === "photo" ? "Photo" as const : "Vidéo" as const,
        src: item.mediaType === "photo" ? (item.cover || item.href) : item.href,
        thumbSrc: item.cover,
        artist: artist.name,
      })),
  );

  const musicItems: HomeDiapoItem[] = artists.flatMap((artist) =>
    [artist.featuredSound, ...artist.media.sounds, ...artist.media.releases]
      .filter((item): item is NonNullable<typeof item> => Boolean(item && (item.audioUrl || item.fullAudioUrl || item.src || item.previewUrl || item.deezerId)))
      .map((item, index) => ({ id: `music-${artist.slug}-${index}`, title: item.title, meta: item.meta || artist.name, type: "Music", src: item.cover || artist.homeImage || artist.heroImage, thumbSrc: item.cover || artist.homeImage || artist.heroImage, previewSrc: artist.homeImage || artist.heroImage, artist: artist.name, audioSrc: item.audioUrl || item.fullAudioUrl || item.src || item.previewUrl || (item.deezerId ? `/api/audio-preview/${item.deezerId}` : undefined) })),
  );

  return (
    <main className="home agency-home">
      <AgencyHero dates={dates} />

      <section className="home-profiles" id="roster">
        <div className="section-kicker">
          <p className="eyebrow">Roster</p>
          <h2>Les profils suivis par SKORM.</h2>
        </div>

        <HorizontalRail className="profile-rail-wrap" loop>
          {artists.map((artist) => (
            <HomeArtistCard
              key={artist.slug}
              artist={artist}
              release={artist.featuredSound || undefined}
            />
          ))}
        </HorizontalRail>
      </section>

      <HomeMediaDiapo items={[...diapoItems, ...artistDiapoItems, ...musicItems]} />

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
