import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { artists as publicArtists } from "@/lib/content";

export const ARTIST_DEFAULT_PASSWORD = "SKORM26!";
const COOKIE_NAME = "SKORM_artist";

export type ArtistLogin = {
  slug: string;
  name: string;
};

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/@skorm-agency\.com$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tokenFor(slug: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_DB_SECRET || "";
  if (!secret) return "";
  return `${slug}.${createHmac("sha256", secret).update(`artist:${slug}`).digest("hex")}`;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export async function findArtistLogin(identifier: string): Promise<ArtistLogin | null> {
  const normalized = normalize(identifier);
  if (!normalized) return null;

  const supabase = await getSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase
      .from("artists")
      .select("slug,name,is_active")
      .eq("is_active", true);
    const match = data?.find((artist) => {
      const slug = normalize(artist.slug);
      const name = normalize(artist.name);
      return normalized === slug || normalized === name;
    });
    if (match) return { slug: match.slug, name: match.name };
  }

  const fallback = publicArtists.find((artist) => {
    const slug = normalize(artist.slug);
    const name = normalize(artist.name);
    return normalized === slug || normalized === name;
  });
  return fallback ? { slug: fallback.slug, name: fallback.name } : null;
}

export async function validArtistCredentials(identifier: string, password: string) {
  if (password !== ARTIST_DEFAULT_PASSWORD) return null;
  return findArtistLogin(identifier);
}

export function getArtistCookie(slug: string) {
  return {
    name: COOKIE_NAME,
    value: tokenFor(slug),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    },
  };
}

export async function getArtistSessionSlug() {
  const value = (await cookies()).get(COOKIE_NAME)?.value || "";
  const [slug] = value.split(".");
  if (!slug || !value || !safeEqual(value, tokenFor(slug))) return null;
  return slug;
}

export async function hasArtistSession(slug: string) {
  const sessionSlug = await getArtistSessionSlug();
  return sessionSlug === slug;
}
