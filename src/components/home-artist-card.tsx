"use client";

import Image from "next/image";
import Link from "next/link";
import { MediaPlayButton } from "@/components/media-play-button";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="instagram-glyph">
      <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.05-2.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  );
}

export function HomeArtistCard({
  artist,
  release,
}: {
  artist: { slug: string; name: string; genre: string; instagram: string; homeImage?: string };
  release?: { title: string; meta?: string; cover?: string; href?: string; deezerId?: string; previewUrl?: string };
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
              <MediaPlayButton href={release.href} deezerId={release.deezerId} previewUrl={release.previewUrl} title={release.title} label="Lire" />
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
