"use client";

import Image from "next/image";
import { Pause, Play, Radio } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { RadioTrack } from "@/lib/radio";

function shuffleTracks(tracks: RadioTrack[]) {
  const copy = [...tracks];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[random]] = [copy[random], copy[index]];
  }
  return copy;
}

export function SkormRadio({ tracks }: { tracks: RadioTrack[] }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [queue, setQueue] = useState<RadioTrack[]>(() => shuffleTracks(tracks));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const current = queue[index] || tracks[0];

  const artwork = useMemo(() => {
    if (!current?.cover) return [{ src: "/skorm-logo.png", sizes: "512x512", type: "image/png" }];
    return [
      { src: current.cover, sizes: "512x512", type: current.cover.endsWith(".jpg") ? "image/jpeg" : "image/png" },
      { src: "/skorm-logo.png", sizes: "512x512", type: "image/png" },
    ];
  }, [current?.cover]);

  useEffect(() => {
    setQueue(shuffleTracks(tracks));
    setIndex(0);
  }, [tracks]);

  useEffect(() => {
    if (!current || typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: current.title,
      artist: `Radio SKORM · ${current.artist}`,
      album: "Radio SKORM",
      artwork,
    });
    navigator.mediaSession.setActionHandler("play", () => {
      audioRef.current?.play();
      setPlaying(true);
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      audioRef.current?.pause();
      setPlaying(false);
    });
    navigator.mediaSession.setActionHandler("nexttrack", nextTrack);
    navigator.mediaSession.setActionHandler("previoustrack", nextTrack);
  }, [current, artwork]);

  async function toggle() {
    if (!audioRef.current || !current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    await audioRef.current.play();
    setPlaying(true);
  }

  function nextTrack() {
    setIndex((value) => {
      if (value + 1 < queue.length) return value + 1;
      setQueue(shuffleTracks(tracks));
      return 0;
    });
  }

  useEffect(() => {
    if (!playing || !audioRef.current) return;
    audioRef.current.play().catch(() => setPlaying(false));
  }, [index, queue, playing]);

  if (!current) return null;

  return (
    <aside className={`skorm-radio ${playing ? "is-playing" : ""}`} aria-label="Radio SKORM">
      <audio ref={audioRef} src={current.src} preload="none" onEnded={nextTrack} onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
      <button type="button" className="skorm-radio-play" onClick={toggle} aria-label={playing ? "Mettre Radio SKORM en pause" : "Lancer Radio SKORM"}>
        {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
      <div className="skorm-radio-cover">
        <Image src={current.cover || "/skorm-logo.png"} alt={`Miniature ${current.title}`} fill sizes="44px" />
      </div>
      <div className="skorm-radio-copy">
        <span><Radio size={12} /> Radio SKORM</span>
        <strong>{current.title}</strong>
        <small>{current.artist}</small>
      </div>
    </aside>
  );
}
