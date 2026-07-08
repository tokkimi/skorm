"use client";

import { Pause, Play, Radio } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { RadioSchedule, RadioTrack } from "@/lib/radio";

function absoluteAssetUrl(src: string) {
  if (!src) return "/skorm-logo.png";
  if (src.startsWith("http")) return src;
  if (typeof window === "undefined") return src;
  return new URL(src, window.location.origin).toString();
}

function artworkType(src: string) {
  const clean = src.split("?")[0]?.toLowerCase() || "";
  if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return "image/jpeg";
  if (clean.endsWith(".webp")) return "image/webp";
  return "image/png";
}

function fallbackSchedule(tracks: RadioTrack[]): RadioSchedule | null {
  const track = tracks[0];
  if (!track) return null;
  return {
    serverTime: Date.now(),
    epoch: Date.now(),
    totalDurationSec: tracks.reduce((sum, item) => sum + item.durationSec, 0) || track.durationSec,
    index: 0,
    offsetSec: 0,
    nextInSec: track.durationSec,
    track,
    tracks,
  };
}

export function SkormRadio({ tracks }: { tracks: RadioTrack[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingOffsetRef = useRef(0);
  const [schedule, setSchedule] = useState<RadioSchedule | null>(() => fallbackSchedule(tracks));
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const current = schedule?.track || tracks[0];

  const artwork = useMemo(() => {
    if (!current?.cover) return [{ src: absoluteAssetUrl("/skorm-logo.png"), sizes: "512x512", type: "image/png" }];
    const cover = absoluteAssetUrl(current.cover);
    return [
      { src: cover, sizes: "512x512", type: artworkType(cover) },
      { src: absoluteAssetUrl("/skorm-logo.png"), sizes: "512x512", type: "image/png" },
    ];
  }, [current?.cover]);

  const loadLiveSchedule = useCallback(async () => {
    const response = await fetch("/api/radio", { cache: "no-store" });
    if (!response.ok) throw new Error("Radio unavailable");
    const nextSchedule = (await response.json()) as RadioSchedule;
    pendingOffsetRef.current = nextSchedule.offsetSec || 0;
    setSchedule(nextSchedule);
    return nextSchedule;
  }, []);

  const syncAudioToSchedule = useCallback((nextSchedule: RadioSchedule) => {
    const audio = audioRef.current;
    if (!audio) return;

    pendingOffsetRef.current = nextSchedule.offsetSec || 0;
    const liveSrc = absoluteAssetUrl(nextSchedule.track.src);
    if (audio.src !== liveSrc) {
      audio.src = nextSchedule.track.src;
      audio.load();
      return;
    }

    const offset = pendingOffsetRef.current;
    const canSeek = Number.isFinite(audio.duration) && audio.duration > offset + 1;
    if (canSeek && Math.abs(audio.currentTime - offset) > 2) {
      audio.currentTime = offset;
    }
  }, []);

  const startLiveRadio = useCallback(async () => {
    if (!audioRef.current || loading) return;
    setLoading(true);
    try {
      const nextSchedule = await loadLiveSchedule();
      syncAudioToSchedule(nextSchedule);
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      const fallback = fallbackSchedule(tracks);
      if (fallback) {
        setSchedule(fallback);
        await audioRef.current.play();
        setPlaying(true);
      }
    } finally {
      setLoading(false);
    }
  }, [loadLiveSchedule, loading, syncAudioToSchedule, tracks]);

  const jumpToLiveTrack = useCallback(async () => {
    try {
      const nextSchedule = await loadLiveSchedule();
      syncAudioToSchedule(nextSchedule);
      if (playing) await audioRef.current?.play();
    } catch {
      // Keep the current sound alive if the live endpoint is briefly unavailable.
    }
  }, [loadLiveSchedule, playing, syncAudioToSchedule]);

  useEffect(() => {
    if (!current || typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.title,
      artist: `Radio SKORM · ${current.artist}`,
      album: "Radio SKORM",
      artwork,
    });
    navigator.mediaSession.setActionHandler("play", () => {
      void startLiveRadio();
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      audioRef.current?.pause();
      setPlaying(false);
    });
    navigator.mediaSession.setActionHandler("nexttrack", jumpToLiveTrack);
    navigator.mediaSession.setActionHandler("previoustrack", jumpToLiveTrack);
  }, [artwork, current, jumpToLiveTrack, startLiveRadio]);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      void jumpToLiveTrack();
    }, 60_000);
    return () => window.clearInterval(interval);
  }, [jumpToLiveTrack, playing]);

  async function toggle() {
    if (!audioRef.current || !current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    await startLiveRadio();
  }

  if (!current) return null;

  return (
    <aside className={`skorm-radio ${playing ? "is-playing" : ""}`} aria-label="Radio SKORM">
      <audio
        ref={audioRef}
        src={current.src}
        preload="none"
        onEnded={jumpToLiveTrack}
        onError={jumpToLiveTrack}
        onLoadedMetadata={() => {
          const audio = audioRef.current;
          const offset = pendingOffsetRef.current;
          if (!audio || !Number.isFinite(audio.duration) || audio.duration <= offset + 1) return;
          if (Math.abs(audio.currentTime - offset) > 2) audio.currentTime = offset;
          if (playing) audio.play().catch(() => setPlaying(false));
        }}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <button type="button" className="skorm-radio-play" onClick={toggle} aria-label={playing ? "Mettre Radio SKORM en pause" : "Lancer Radio SKORM"}>
        {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
      <div className="skorm-radio-cover">
        <img src={current.cover || "/skorm-logo.png"} alt={`Miniature officielle ${current.title}`} onError={(event) => { event.currentTarget.src = "/skorm-logo.png"; }} />
      </div>
      <div className="skorm-radio-copy">
        <span><Radio size={12} /> Radio SKORM</span>
        <strong>{current.title}</strong>
        <small>{current.artist}</small>
      </div>
    </aside>
  );
}
