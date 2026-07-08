import { artistMedia, artists } from "@/lib/content";
import type { PublicArtist, PublicMediaItem } from "@/lib/public-site-data";

export type RadioTrack = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
  durationSec: number;
  isPreview: boolean;
};

export type RadioSchedule = {
  serverTime: number;
  epoch: number;
  totalDurationSec: number;
  index: number;
  offsetSec: number;
  nextInSec: number;
  track: RadioTrack;
  tracks: RadioTrack[];
};

type MaybePlayableTrack = {
  title: string;
  meta?: string;
  cover?: string;
  href?: string;
  audioUrl?: string;
  fullAudioUrl?: string;
  src?: string;
  previewUrl?: string;
  deezerId?: string;
  durationSec?: number;
  duration?: number;
};

const hasPlayableSource = (track: MaybePlayableTrack): track is MaybePlayableTrack & ({ previewUrl: string } | { deezerId: string }) =>
  Boolean(track.audioUrl || track.fullAudioUrl || track.src || track.previewUrl || track.deezerId);

const RADIO_EPOCH = Date.UTC(2026, 0, 1, 0, 0, 0);
const PREVIEW_DURATION_SEC = 30;
const FULL_FALLBACK_DURATION_SEC = 210;

function hashString(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function stableRadioSort(a: RadioTrack, b: RadioTrack) {
  return hashString(`skorm-radio-v1:${a.id}`) - hashString(`skorm-radio-v1:${b.id}`);
}

function cleanDuration(value: unknown, fallback: number) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 10) return fallback;
  return Math.round(number);
}

function playableSource(track: MaybePlayableTrack) {
  const fullSrc = track.audioUrl || track.fullAudioUrl || track.src;
  if (fullSrc) {
    return {
      src: fullSrc,
      durationSec: cleanDuration(track.durationSec ?? track.duration, FULL_FALLBACK_DURATION_SEC),
      isPreview: false,
    };
  }
  if (track.previewUrl) {
    return {
      src: track.previewUrl,
      durationSec: cleanDuration(track.durationSec ?? track.duration, PREVIEW_DURATION_SEC),
      isPreview: true,
    };
  }
  if (track.deezerId) {
    return {
      src: `/api/audio-preview/${track.deezerId}`,
      durationSec: cleanDuration(track.durationSec ?? track.duration, PREVIEW_DURATION_SEC),
      isPreview: true,
    };
  }
  return null;
}

function artistNameFromMeta(meta?: string) {
  if (!meta) return "";
  return meta.split("·")[0]?.trim() || "";
}

function uniqTracks(tracks: RadioTrack[]) {
  const seen = new Set<string>();
  return tracks.filter((track) => {
    const key = `${track.artist.toLowerCase()}-${track.title.toLowerCase()}-${track.src}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function radioTracksFromArtists(publicArtists: PublicArtist[]): RadioTrack[] {
  const tracks = publicArtists.flatMap((artist) => {
    const media = [...artist.media.sounds, ...artist.media.releases, artist.featuredSound].filter(Boolean) as PublicMediaItem[];
    return (media as MaybePlayableTrack[])
      .filter(hasPlayableSource)
      .map((track, index) => {
        const source = playableSource(track);
        if (!source) return null;
        return {
          id: `${artist.slug}-${index}-${track.title}`,
          title: track.title,
          artist: artist.name || artistNameFromMeta(track.meta) || "SKORM",
          cover: track.cover || "/skorm-logo.png",
          src: source.src,
          durationSec: source.durationSec,
          isPreview: source.isPreview,
        };
      })
      .filter(Boolean) as RadioTrack[];
  });

  return uniqTracks(tracks).sort(stableRadioSort);
}

export const radioTracks: RadioTrack[] = radioTracksFromArtists(
  artists.map((artist) => {
    const media = artistMedia[artist.slug as keyof typeof artistMedia];
    return {
      slug: artist.slug,
      name: artist.name,
      genre: artist.genre,
      bio: artist.bio,
      role: artist.role,
      instagram: artist.instagram,
      homeImage: artist.homeImage,
      heroImage: artist.heroImage,
      socials: [],
      featuredSound: "featuredSound" in artist ? (artist.featuredSound as PublicMediaItem) : null,
      media: {
        sounds: [...(media?.sounds || [])],
        releases: [...(media?.releases || [])],
        videos: [...(media?.videos || [])],
      },
    };
  }),
);

export function getRadioSchedule(tracks: RadioTrack[], now = Date.now()): RadioSchedule | null {
  const cleanTracks = uniqTracks(tracks.filter((track) => Boolean(track.src))).sort(stableRadioSort);
  if (!cleanTracks.length) return null;

  const totalDurationSec = cleanTracks.reduce((sum, track) => sum + track.durationSec, 0);
  const elapsedSec = Math.floor((now - RADIO_EPOCH) / 1000);
  let cursor = ((elapsedSec % totalDurationSec) + totalDurationSec) % totalDurationSec;
  let index = 0;

  for (let itemIndex = 0; itemIndex < cleanTracks.length; itemIndex += 1) {
    const duration = cleanTracks[itemIndex].durationSec;
    if (cursor < duration) {
      index = itemIndex;
      break;
    }
    cursor -= duration;
  }

  const track = cleanTracks[index];
  return {
    serverTime: now,
    epoch: RADIO_EPOCH,
    totalDurationSec,
    index,
    offsetSec: Math.max(0, Math.min(cursor, track.durationSec - 1)),
    nextInSec: Math.max(1, track.durationSec - cursor),
    track,
    tracks: cleanTracks,
  };
}
