"use client";

import { Pause, Play, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";

function getEmbedUrl(href?: string) {
  if (!href) return null;
  try {
    const url = new URL(href);
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
    }
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
    }
    if (url.hostname.includes("instagram.com")) {
      const parts = url.pathname.split("/").filter(Boolean);
      const kind = parts[0];
      const code = parts[1];
      return kind && code ? `https://www.instagram.com/${kind}/${code}/embed` : null;
    }
    if (url.hostname.includes("open.spotify.com")) {
      return href.replace("open.spotify.com/", "open.spotify.com/embed/");
    }
  } catch {
    return null;
  }
  return null;
}

export function MediaPlayButton({
  href,
  deezerId,
  label = "Lire",
  title,
}: {
  href?: string;
  deezerId?: string;
  label?: string;
  title: string;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const embedUrl = useMemo(() => getEmbedUrl(href), [href]);

  async function play() {
    if (deezerId) {
      if (!audio.current) return;
      if (playing) {
        audio.current.pause();
        setPlaying(false);
      } else {
        await audio.current.play();
        setPlaying(true);
      }
      return;
    }
    if (embedUrl) setOpen(true);
    else if (href) window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {deezerId && <audio ref={audio} src={`/api/audio-preview/${deezerId}`} onEnded={() => setPlaying(false)} />}
      <button type="button" className="media-play-button" onClick={play} aria-label={`${label} ${title}`}>
        {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        <span>{playing ? "Pause" : label}</span>
      </button>
      {open && embedUrl && (
        <div className="media-modal" role="dialog" aria-modal="true" aria-label={title}>
          <button type="button" className="media-modal-close" onClick={() => setOpen(false)} aria-label="Fermer">
            <X size={18} />
          </button>
          <iframe
            src={embedUrl}
            title={title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
}
