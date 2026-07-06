"use client";

import Image from "next/image";
import Link from "next/link";
import { MediaPlayButton } from "@/components/media-play-button";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="instagram-glyph">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="1.15" />
    </svg>
  );
}

export function HomeArtistCard({
  artist,
  release,
}: {
  artist: { slug: string; name: string; genre: string; instagram: string; homeImage?: string };
  release?: { title: string; meta?: string; cover?: string; href?: string; deezerId?: string };
}) {
  const homeImage = artist.homeImage || "/artists/home-cgl-real-blue.png";

  return (
    <article className={`profile-card profile-card-${artist.slug}`}>
      <div className="home-profile-photo">
        <Image src={homeImage} alt={`Visuel de ${artist.name}`} fill sizes="min(760px, 86vw)" priority />
      </div>

      <div className="home-profile-glass">
        <div className="profile-main-copy">
          <p className="eyebrow">{artist.genre}</p>
          <h3>{artist.name}</h3>
        </div>

        <div className="profile-bottom-strip">
          {release ? (
            <div className="profile-latest-release">
              {release.cover && (
                <span className="profile-release-cover">
                  <Image src={release.cover} alt={`Miniature officielle ${release.title}`} fill sizes="64px" />
                </span>
              )}
              <div>
                <span>Dernière sortie</span>
                <strong>{release.title}</strong>
                {release.meta && <em>{release.meta}</em>}
              </div>
              <MediaPlayButton href={release.href} deezerId={release.deezerId} title={release.title} label="Lire" />
            </div>
          ) : (
            <div className="profile-latest-release profile-latest-release-empty">
              <div>
                <span>Médias</span>
                <strong>À venir</strong>
                <em>Liens officiels en préparation</em>
              </div>
            </div>
          )}

          <div className="profile-socials">
            <a href={artist.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram ${artist.name}`}>
              <InstagramIcon />
            </a>
          </div>

          <Link className="profile-card-button" href={`/artistes/${artist.slug}`} aria-label={`Voir le profil de ${artist.name}`}>
            +
          </Link>
        </div>
      </div>
    </article>
  );
}
