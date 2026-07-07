import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { HorizontalRail } from "@/components/horizontal-rail";
import { MediaPlayButton } from "@/components/media-play-button";
import { artistMedia, artists, getUpcomingArtistDates } from "@/lib/content";

export function generateStaticParams() {
  return artists.map(({ slug }) => ({ slug }));
}

type MediaItem = {
  title: string;
  meta: string;
  cover?: string;
  href?: string;
  deezerId?: string;
  previewUrl?: string;
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="instagram-glyph">
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.05-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  );
}

function MediaRail({
  title,
  label,
  items,
  image,
  variant,
}: {
  title: string;
  label: string;
  image: string;
  variant: "sound" | "spotify" | "video";
  items: readonly MediaItem[];
}) {
  const publicItems = items.filter((item) => {
    const value = `${item.title} ${item.meta} ${item.href || ""}`.toLowerCase();
    return !value.includes("press kit") && !value.includes("presskit") && !value.includes("bannière officielle");
  });

  if (!publicItems.length) return null;

  return (
    <section className="paga-rail-section">
      <div className="artist-section-heading">
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      <HorizontalRail className="artist-mini-rail">
        {publicItems.map((item, index) => (
          <article className={`artist-mini-card ${variant}`} key={`${title}-${item.title}`}>
            <div className={`artist-mini-thumb thumb-${index % 3}`}>
              <Image src={item.cover || image} alt={`Miniature officielle ${item.title}`} fill sizes="260px" />
            </div>
            <small>{label} · {String(index + 1).padStart(2, "0")}</small>
            <strong>{item.title}</strong>
            <p>{item.meta}</p>

            {variant === "sound" && (
              <div className="artist-card-actions">
                <MediaPlayButton href={item.href} deezerId={item.deezerId} previewUrl={item.previewUrl} title={item.title} label="Écouter" />
                <a href={item.href || "#"} target="_blank" rel="noreferrer" aria-label="Ouvrir la source officielle">
                  <ExternalLink size={14} />
                </a>
              </div>
            )}

            {variant === "spotify" && (
              <div className="spotify-preview">
                <MediaPlayButton href={item.href} deezerId={item.deezerId} previewUrl={item.previewUrl} title={item.title} label="Lire" />
                <b>{item.title}</b>
                <small>{item.meta}</small>
              </div>
            )}

            {variant === "video" && (
              <div className="artist-card-actions">
                <MediaPlayButton href={item.href} title={item.title} label="Voir" />
                <a href={item.href || "#"} target="_blank" rel="noreferrer" aria-label="Ouvrir la source officielle">
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </article>
        ))}
      </HorizontalRail>
    </section>
  );
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = artists.find((item) => item.slug === slug);
  if (!artist) notFound();

  const artistDates = getUpcomingArtistDates(artist.name);
  const media = artistMedia[artist.slug as keyof typeof artistMedia];
  const heroImage = artist.heroImage || (artist.slug === "paga" ? "/artists/paga.png" : "/artists/cgl-banner.png");

  return (
    <main className="artist-page paga-like-page">
      <section className={`paga-like-hero artist-page-${artist.slug}`}>
        <Image src={heroImage} fill alt="" sizes="100vw" priority className="paga-like-hero-image" />
        <div className="paga-like-overlay" />

        <div className="paga-like-shell">
          <Link className="artist-back glass-panel" href="/artistes">
            <ArrowLeft size={14} /> Roster
          </Link>

          <div className="paga-like-copy">
            <p className="eyebrow">{artist.genre}</p>
            <h1>{artist.name}</h1>
            <p>{artist.bio}</p>
            <div className="artist-socials">
              {artist.socials.map((social) => (
                <Link href={social.href} key={social.label} target={social.href.startsWith("http") ? "_blank" : undefined}>
                  {social.label === "Instagram" && <InstagramIcon />}
                  <span>{social.label}</span>
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>

          <aside className="paga-hero-dates" aria-label="Prochaines dates">
            <p className="eyebrow">Next dates</p>
            <HorizontalRail className="hero-date-rail">
              {artistDates.length ? artistDates.slice(0, 5).map((date) => (
                <Link href="#dates" className="paga-date-card" key={`${date.iso}-${date.event}`}>
                  <time><span>{date.day}</span>{date.month}</time>
                  <strong>{date.event}</strong>
                  <small>{date.location}</small>
                </Link>
              )) : (
                <div className="paga-date-card"><strong>Dates en préparation</strong><small>À annoncer</small></div>
              )}
            </HorizontalRail>
          </aside>
        </div>
      </section>

      <section id="dates" className="artist-section-shell artist-date-section">
        <div className="artist-section-heading">
          <p className="eyebrow">Live</p>
          <h2>Prochaines dates</h2>
        </div>
        <div className="paga-date-list">
          {artistDates.length ? artistDates.map((date, index) => (
            <details className="paga-date-row" key={`${date.iso}-${date.event}`}>
              <summary>
                <time><span>{date.day}</span>{date.month} 2026</time>
                <div className="paga-date-main">
                  {index % 2 === 0 && <span>Featured</span>}
                  <strong>{date.event}</strong>
                  <small><MapPin size={11} /> {date.location} / {date.artist}</small>
                </div>
                <em>Détails</em>
              </summary>
              <div>
                <p><b>Artiste :</b> {date.artist}</p>
                <p><b>Statut :</b> {date.status}</p>
                <p><b>Lieu :</b> {date.location}</p>
              </div>
            </details>
          )) : <p className="empty-copy">Les prochaines dates seront annoncées ici.</p>}
        </div>
      </section>

      <section className="artist-section-shell artist-media-area">
        {media.sounds.length > 0 && (
          <MediaRail title="Derniers sons" label="Sounds" variant="sound" image={artist.slug === "paga" ? "/artists/paga-cover-night.png" : heroImage} items={media.sounds} />
        )}
        {media.releases.length > 0 && (
          <MediaRail title="Écoute directe" label="Streaming" variant="spotify" image={artist.slug === "paga" ? "/artists/paga-cover-blue.png" : heroImage} items={media.releases} />
        )}
        {media.videos.length > 0 && (
          <MediaRail title="Dernières vidéos" label="Videos" variant="video" image={heroImage} items={media.videos} />
        )}
      </section>
    </main>
  );
}
