"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { MediaPlayButton } from "@/components/media-play-button";

export function HomeArtistCard({
  artist,
  release,
}: {
  artist: { slug: string; name: string; genre: string; instagram: string };
  release: { title: string; meta?: string; cover?: string; href?: string; deezerId?: string };
}) {
  const homeImage = artist.slug === "paga"
    ? "/artists/home-paga-real-blue.png"
    : "/artists/home-cgl-real-blue.png";

  return (
    <article className="profile-card">
      <div className="home-profile-photo">
        <Image src={homeImage} alt={`Visuel de ${artist.name}`} fill sizes="min(760px, 86vw)" priority />
      </div>

      <div className="home-profile-glass">
        <div className="profile-main-copy">
          <p className="eyebrow">{artist.genre}</p>
          <h3>{artist.name}</h3>
        </div>

        <div className="profile-bottom-strip">
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

          <div className="profile-socials">
            <a href={artist.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram ${artist.name}`}>
              <Camera size={15} />
              <span>Instagram</span>
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
