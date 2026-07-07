"use client";

import { Pause, Play, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
    if (url.hostname.includes("soundcloud.com")) {
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(href)}&auto_play=true&visual=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
    }
    if (url.hostname.includes("drive.google.com")) {
      const directId = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] || url.searchParams.get("id");
      return directId ? `https://drive.google.com/file/d/${directId}/preview` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function MediaPlayButton({
  href,
  deezerId,
  previewUrl,
  label = "Lire",
  title,
}: {
  href?: string;
  deezerId?: string;
  previewUrl?: string;
  label?: string;
  title: string;
}) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const embedUrl = useMemo(() => getEmbedUrl(href), [href]);
  const compactEmbed = embedUrl?.includes("w.soundcloud.com") || embedUrl?.includes("open.spotify.com/embed/");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || compactEmbed) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, compactEmbed]);

  async function play() {
    if (deezerId || previewUrl) {
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
      {(deezerId || previewUrl) && (
        <audio ref={audio} src={previewUrl || `/api/audio-preview/${deezerId}`} onEnded={() => setPlaying(false)} />
      )}
      <button type="button" className="media-play-button" onClick={play} aria-label={`${label} ${title}`}>
        {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
        <span>{playing ? "Pause" : label}</span>
      </button>
      {open && embedUrl && compactEmbed && (
        <div className="media-inline-player" role="dialog" aria-label={title}>
          <button type="button" className="media-inline-close" onClick={() => setOpen(false)} aria-label="Fermer">
            <X size={13} />
          </button>
          <iframe
            src={embedUrl}
            title={title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      )}
      {mounted && open && embedUrl && !compactEmbed && createPortal(
        <div className="media-modal" role="dialog" aria-modal="true" aria-label={title}>
          <button type="button" className="media-modal-close" onClick={() => setOpen(false)} aria-label="Fermer">
            <X size={18} />
          </button>
          <div className="media-modal-frame">
            <iframe
              src={embedUrl}
              title={title}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
