import { getAdminData, type AdminData } from "@/lib/admin-data";
import {
  artistMedia,
  artists as fallbackArtists,
  dates as fallbackDates,
  getFeaturedAudioForArtist,
  isPlayableAudioItem,
} from "@/lib/content";

export type PublicMediaItem = {
  title: string;
  meta?: string;
  cover?: string;
  href?: string;
  audioUrl?: string;
  fullAudioUrl?: string;
  src?: string;
  deezerId?: string;
  previewUrl?: string;
  durationSec?: number;
  duration?: number;
};

export type PublicArtist = {
  slug: string;
  name: string;
  genre: string;
  bio: string;
  role?: string;
  instagram: string;
  homeImage?: string;
  heroImage?: string;
  socials: { label: string; href: string }[];
  featuredSound?: PublicMediaItem | null;
  media: {
    sounds: PublicMediaItem[];
    releases: PublicMediaItem[];
    videos: PublicMediaItem[];
  };
};

export type PublicDate = {
  iso: string;
  day: string;
  month: string;
  artist: string;
  event: string;
  location: string;
  status: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function mediaItemFromUnknown(value: unknown): PublicMediaItem | null {
  if (!isRecord(value) || typeof value.title !== "string" || !value.title.trim()) return null;
  return {
    title: value.title,
    meta: typeof value.meta === "string" ? value.meta : undefined,
    cover: typeof value.cover === "string" ? value.cover : undefined,
    href: typeof value.href === "string" ? value.href : undefined,
    audioUrl: typeof value.audioUrl === "string" ? value.audioUrl : undefined,
    fullAudioUrl: typeof value.fullAudioUrl === "string" ? value.fullAudioUrl : undefined,
    src: typeof value.src === "string" ? value.src : undefined,
    deezerId: typeof value.deezerId === "string" ? value.deezerId : undefined,
    previewUrl: typeof value.previewUrl === "string" ? value.previewUrl : undefined,
    durationSec: typeof value.durationSec === "number" ? value.durationSec : undefined,
    duration: typeof value.duration === "number" ? value.duration : undefined,
  };
}

function mediaArrayFromUnknown(value: unknown): PublicMediaItem[] {
  if (!Array.isArray(value)) return [];
  return value.map(mediaItemFromUnknown).filter(Boolean) as PublicMediaItem[];
}

function featuredFromUnknown(value: unknown): PublicMediaItem | null {
  return mediaItemFromUnknown(value);
}

function dateParts(value: string) {
  const date = new Date(value);
  return {
    iso: Number.isNaN(date.getTime()) ? value.slice(0, 10) : date.toISOString().slice(0, 10),
    day: Number.isNaN(date.getTime())
      ? value.slice(8, 10)
      : new Intl.DateTimeFormat("fr-FR", { day: "2-digit" }).format(date),
    month: Number.isNaN(date.getTime())
      ? ""
      : new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(date).replace(".", "").toUpperCase(),
  };
}

function isUpcoming(value: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  return date >= today;
}

function readableStatus(value?: string | null) {
  const status = String(value || "").toLowerCase();
  if (status === "confirmed") return "Confirmé";
  if (status === "option") return "Option";
  if (status === "tba") return "TBA";
  return value || "Confirmé";
}

export function publicArtistsFromAdmin(data: AdminData): PublicArtist[] {
  if (!data.artists.length) {
    return fallbackArtists.map((artist) => {
      const media = artistMedia[artist.slug as keyof typeof artistMedia];
      return {
        ...artist,
        genre: artist.genre,
        instagram: artist.instagram,
        featuredSound: getFeaturedAudioForArtist(artist) || null,
        media: {
          sounds: [...(media?.sounds || [])],
          releases: [...(media?.releases || [])],
          videos: [...(media?.videos || [])],
        },
      };
    });
  }

  return data.artists.map((artist) => {
    const fallback = fallbackArtists.find((item) => item.slug === artist.slug);
    const staticMedia = artistMedia[artist.slug as keyof typeof artistMedia];
    const sounds = mediaArrayFromUnknown(artist.media_sounds).length
      ? mediaArrayFromUnknown(artist.media_sounds)
      : [...(staticMedia?.sounds || [])];
    const releases = mediaArrayFromUnknown(artist.media_releases).length
      ? mediaArrayFromUnknown(artist.media_releases)
      : [...(staticMedia?.releases || [])];
    const videos = mediaArrayFromUnknown(artist.media_videos).length
      ? mediaArrayFromUnknown(artist.media_videos)
      : [...(staticMedia?.videos || [])];
    const featured = featuredFromUnknown(artist.featured_sound)
      || [fallback && getFeaturedAudioForArtist(fallback), ...sounds, ...releases].find(isPlayableAudioItem)
      || null;
    const instagram = artist.instagram_url || fallback?.instagram || "#";

    return {
      slug: artist.slug,
      name: artist.name,
      genre: artist.tagline || fallback?.genre || "DJ · Performer",
      bio: artist.bio || fallback?.bio || "Profil artiste SKORM.",
      role: fallback?.role,
      instagram,
      homeImage: artist.home_image_url || artist.image_url || fallback?.homeImage || fallback?.heroImage,
      heroImage: artist.image_url || artist.home_image_url || fallback?.heroImage || fallback?.homeImage,
      socials: [
        { label: "Instagram", href: instagram },
        { label: "Booking", href: "/contact" },
      ],
      featuredSound: featured,
      media: { sounds, releases, videos },
    };
  });
}

export function publicDatesFromAdmin(data: AdminData): PublicDate[] {
  const adminDates = data.events
    .filter((event) => isUpcoming(event.starts_at))
    .map((event) => {
      const parts = dateParts(event.starts_at);
      return {
        ...parts,
        artist: event.artist_name || "SKORM",
        event: event.title,
        location: event.city || "Lieu à confirmer",
        status: readableStatus(event.status),
      };
    });

  if (adminDates.length) {
    return adminDates.sort((a, b) => a.iso.localeCompare(b.iso));
  }

  return fallbackDates
    .filter((date) => isUpcoming(`${date.iso}T00:00:00`))
    .map((date) => ({ ...date, status: readableStatus(date.status) }));
}

export async function getPublicSiteData() {
  const adminData = await getAdminData();
  return {
    adminData,
    artists: publicArtistsFromAdmin(adminData),
    dates: publicDatesFromAdmin(adminData),
  };
}
