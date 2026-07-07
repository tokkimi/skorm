import { artistMedia } from "@/lib/content";

export type RadioTrack = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
};

const playableArtists: Record<string, string> = {
  paga: "Paga",
  "andrea-tutti": "Andrea Tutti",
};

type MaybePlayableTrack = {
  title: string;
  cover?: string;
  previewUrl?: string;
  deezerId?: string;
};

const hasPlayableSource = (track: MaybePlayableTrack): track is MaybePlayableTrack & ({ previewUrl: string } | { deezerId: string }) =>
  Boolean(track.previewUrl || track.deezerId);

export const radioTracks: RadioTrack[] = Object.entries(playableArtists).flatMap(([slug, artistName]) => {
  const media = artistMedia[slug as keyof typeof artistMedia];
  return (media.sounds as MaybePlayableTrack[])
    .filter(hasPlayableSource)
    .map((track, index) => ({
      id: `${slug}-${index}-${track.title}`,
      title: track.title,
      artist: artistName,
      cover: track.cover || "/skorm-logo.png",
      src: track.previewUrl || `/api/audio-preview/${track.deezerId}`,
    }));
});
