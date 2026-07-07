"use client";

import { useState } from "react";
import { ImageIcon, Play, X } from "lucide-react";

export type HomeDiapoItem = {
  id: string;
  title: string;
  meta: string;
  type: "Photo" | "Vidéo";
  src?: string;
  previewSrc?: string;
};

export const fallbackMediaItems: HomeDiapoItem[] = [
  { id: "1tKDCsoq3GAI6NrqecZ4RFXHPoiu6U5dQ", title: "CGL", meta: "Shooting District", type: "Photo" },
  { id: "1Yp58NRpkQC5-wfMYIrKpJID4zs6hK5Jd", title: "CGL", meta: "Portrait scène", type: "Photo" },
  { id: "1hjc15USH8ccmAO_UKazMDWpaJwsHdPgb", title: "CGL", meta: "Backstage", type: "Photo" },
  { id: "1n9dBNt9IEuCe3WGeiDeo-bm0jqHww_XI", title: "CGL", meta: "Vidéo shooting", type: "Vidéo" },
  { id: "1A3Wkjh0_8bVs8y4k3GgoyHxy3d5OVhnx", title: "Paga", meta: "Club photos", type: "Photo" },
  { id: "1SGHyuqdj-lJsZSO2iHyVzJptF8l4nkNZ", title: "Paga", meta: "Live club", type: "Photo" },
  { id: "1vUQ1K-7yvbfpIrNinOCWLjKXlAPEfvH5", title: "Paga", meta: "Crowd & booth", type: "Photo" },
  { id: "1VZvRdzMSTHa5SvxjedtWLlLTkSAKwLeA", title: "Paga", meta: "Timeline club", type: "Vidéo" },
];

function driveThumb(id: string) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1400`;
}

function drivePreview(id: string) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

function driveIdFromPreview(src?: string) {
  if (!src) return null;
  return src.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1] || src.match(/[?&]id=([^&]+)/)?.[1] || null;
}

function mediaPreview(item: HomeDiapoItem) {
  if (item.previewSrc) return item.previewSrc;
  if (item.src) return item.src;
  return item.type === "Vidéo" ? drivePreview(item.id) : driveThumb(item.id);
}

function mediaThumb(item: HomeDiapoItem) {
  if (item.src && item.type === "Photo") return item.src;
  if (item.src && item.type === "Vidéo") {
    const id = driveIdFromPreview(item.src);
    return id ? driveThumb(id) : item.src;
  }
  if (!item.src) return driveThumb(item.id);
  return item.src;
}

export function HomeMediaDiapo({ items = [] }: { items?: HomeDiapoItem[] }) {
  const [selected, setSelected] = useState<HomeDiapoItem | null>(null);
  const mediaItems = items.length ? items : fallbackMediaItems;

  return (
    <section className="home-media-diapo" aria-labelledby="home-media-title">
      <div className="home-media-head">
        <p className="eyebrow">Médias</p>
        <h2 id="home-media-title">Photos & vidéos des artistes suivis.</h2>
        <p>Une sélection légère depuis les dossiers média SKORM, entre live, shooting et backstage.</p>
      </div>

      <div className="home-media-rail" aria-label="Diaporama médias artistes">
        {mediaItems.map((item) => (
          <button
            className="home-media-card"
            type="button"
            onClick={() => setSelected(item)}
            key={`${item.id}-${item.title}`}
          >
            <img src={mediaThumb(item)} alt={`${item.title} · ${item.meta}`} loading="lazy" />
            <span className="home-media-badge">
              {item.type === "Vidéo" ? <Play size={13} fill="currentColor" /> : <ImageIcon size={13} />}
              {item.type}
            </span>
            <span className="home-media-caption">
              <strong>{item.title}</strong>
              <small>{item.meta}</small>
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="home-media-modal" role="dialog" aria-modal="true" aria-label={`${selected.title} ${selected.meta}`}>
          <button className="home-media-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Fermer">
            <X size={18} />
          </button>
          <div className="home-media-modal-frame">
            {selected.type === "Vidéo" ? (
              <iframe
                src={mediaPreview(selected)}
                title={`${selected.title} · ${selected.meta}`}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <img src={mediaPreview(selected)} alt={`${selected.title} · ${selected.meta}`} />
            )}
          </div>
          <div className="home-media-modal-caption">
            <strong>{selected.title}</strong>
            <span>{selected.meta}</span>
          </div>
        </div>
      )}
    </section>
  );
}
