"use client";

import Image from "next/image";
import Link from "next/link";
import { MediaPlayButton } from "@/components/media-play-button";

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="instagram-glyph">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" />
    </svg>
  );
}

function cleanDisplayText(value: string) {
  return value
    .replace(/쨌|夷/g, "·")
    .replace(/횪/g, "à")
    .replace(/챕|챗|챔/g, "é")
    .replace(/�/g, "")
    .replace(/\s*[?]\s*/g, " · ")
    .replace(/\s*·\s*/g, " · ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function displayArtistName(artist: { slug: string; name: string }) {
  const key = `${artist.slug} ${artist.name}`.toLowerCase();
  const compactKey = key.replace(/[^a-z0-9]/g, "");
  if (compactKey.includes("cgl") || compactKey.includes("cagoule")) return "CGL";
  if (compactKey.includes("paga")) return "PAGA";
  if (compactKey.includes("nova")) return "N.O.V.A.";
  if (compactKey.includes("vstechno") || compactKey === "vs") return "VS TECHNO";
  return cleanDisplayText(artist.name);
}

function FillVisualImage({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  if (src.startsWith("data:")) {
    return <img src={src} alt={alt} className="fill-native-image" />;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />;
}

export function HomeArtistCard({
  artist,
  release,
}: {
  artist: { slug: string; name: string; genre: string; instagram: string; homeImage?: string };
  release?: { title: string; meta?: string; cover?: string; href?: string; audioUrl?: string; fullAudioUrl?: string; src?: string; deezerId?: string; previewUrl?: string };
}) {
  const homeImage = artist.homeImage?.trim();
  const displayName = displayArtistName(artist);
  const displayGenre = cleanDisplayText(artist.genre || "DJ · Performer");

  return (
    <article className={`profile-card skorm-artist-card profile-card-${artist.slug}`}>
      <Link className="home-profile-photo home-profile-photo-link" href={`/artistes/${artist.slug}`} aria-label={`Voir le profil de ${artist.name}`}>
        {homeImage ? (
          <FillVisualImage src={homeImage} alt={`Visuel de ${artist.name}`} sizes="min(760px, 86vw)" priority />
        ) : (
          <div className="home-profile-photo-fallback" aria-label={`Visuel SKORM pour ${artist.name}`}>
            <span>SKORM</span>
          </div>
        )}
        <div className="skorm-artist-centername" aria-hidden="true">
          <span className="skorm-centername-name">{displayName}</span>
        </div>
      </Link>

      <div className="home-profile-glass skorm-artist-overlay">
        <div className="profile-main-copy skorm-artist-copy">
          <p className="eyebrow">{displayGenre}</p>
          <h3>{displayName}</h3>
        </div>

        <div className="profile-bottom-strip skorm-artist-controls">
          {release ? (
            <div className="profile-latest-release skorm-artist-audio">
              {release.cover && (
                <span className="profile-release-cover skorm-release-cover">
                  <FillVisualImage src={release.cover} alt={`Miniature officielle ${release.title}`} sizes="64px" />
                </span>
              )}
              <div>
                <span>Dernière sortie</span>
                <strong>{release.title}</strong>
                {release.meta && <em>{release.meta}</em>}
              </div>
              <MediaPlayButton href={release.href} audioUrl={release.audioUrl} fullAudioUrl={release.fullAudioUrl} src={release.src} deezerId={release.deezerId} previewUrl={release.previewUrl} title={release.title} label="Lire" />
            </div>
          ) : (
            <div className="profile-latest-release profile-latest-release-empty skorm-artist-audio">
              <div>
                <span>Médias</span>
                <strong>À venir</strong>
                <em>Liens officiels en préparation</em>
              </div>
            </div>
          )}

          <div className="profile-socials skorm-artist-socials">
            <a href={artist.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram ${artist.name}`}>
              <InstagramGlyph />
            </a>
          </div>

          <Link className="profile-card-button skorm-artist-more" href={`/artistes/${artist.slug}`} aria-label={`Voir le profil de ${artist.name}`}>
            +
          </Link>
        </div>
      </div>

      <div className="skorm-mobile-tools" aria-label={`Accès rapides pour ${artist.name}`}>
        <div className="skorm-mobile-sound">
          {release ? (
            <>
              {release.cover && (
                <span className="skorm-mobile-sound-cover">
                  <FillVisualImage src={release.cover} alt={`Miniature officielle ${release.title}`} sizes="64px" />
                </span>
              )}
              <MediaPlayButton href={release.href} audioUrl={release.audioUrl} fullAudioUrl={release.fullAudioUrl} src={release.src} deezerId={release.deezerId} previewUrl={release.previewUrl} title={release.title} label="Son" />
            </>
          ) : (
            <span aria-label="Son à venir">♪</span>
          )}
        </div>
        <a className="skorm-mobile-instagram" href={artist.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram ${artist.name}`}>
          <InstagramGlyph />
        </a>
        <Link className="skorm-mobile-more" href={`/artistes/${artist.slug}`} aria-label={`Voir le profil de ${artist.name}`}>
          +
        </Link>
      </div>
    </article>
  );
}
