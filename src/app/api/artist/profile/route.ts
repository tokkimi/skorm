import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getArtistSessionSlug } from "@/lib/artist-auth";
import { getAdminData } from "@/lib/admin-data";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const mediaSchema = z.object({
  title: z.string().optional(),
  meta: z.string().optional(),
  cover: z.string().optional(),
  href: z.string().optional(),
  audioUrl: z.string().optional(),
  fullAudioUrl: z.string().optional(),
  src: z.string().optional(),
  previewUrl: z.string().optional(),
  durationSec: z.number().optional(),
  mediaType: z.enum(["photo", "video"]).optional(),
  showOnHome: z.boolean().optional(),
  genres: z.array(z.string()).optional(),
  styles: z.array(z.string()).optional(),
  bpm: z.string().optional(),
  country: z.string().optional(),
  location: z.string().optional(),
}).nullable().optional();

const visualMediaSchema = z.object({
  title: z.string().optional(), meta: z.string().optional(), cover: z.string().optional(), href: z.string().optional(),
  mediaType: z.enum(["photo", "video"]).optional(), showOnHome: z.boolean().optional(),
});

const schema = z.object({
  tagline: z.string().optional(),
  bio: z.string().optional(),
  instagram_url: z.string().optional(),
  image_url: z.string().optional(),
  home_image_url: z.string().optional(),
  featured_sound: mediaSchema,
  media_sounds: z.array(mediaSchema).optional(),
  media_releases: z.array(mediaSchema).optional(),
  media_videos: z.array(visualMediaSchema).optional(),
});

export async function POST(request: Request) {
  const slug = await getArtistSessionSlug();
  if (!slug) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const { artists } = await getAdminData();
  const artist = artists.find((item) => item.slug === slug);
  if (!artist) return NextResponse.json({ error: "Artist not found" }, { status: 404 });

  const supabase = await getSupabaseServerClient();
  if (!supabase || !process.env.ADMIN_DB_SECRET) return NextResponse.json({ error: "Unavailable" }, { status: 503 });

  const { error } = await supabase.rpc("admin_update_backoffice_item", {
    p_secret: process.env.ADMIN_DB_SECRET,
    p_kind: "artist",
    p_id: artist.id,
    p_payload: {
      ...parsed.data,
      // Le son mis en avant doit aussi alimenter le rail public des sons.
      media_sounds: parsed.data.media_sounds !== undefined
        ? parsed.data.media_sounds
        : parsed.data.featured_sound?.title
          ? [parsed.data.featured_sound]
          : [],
    },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/artistes");
  revalidatePath(`/artistes/${artist.slug}`);
  revalidatePath("/en");
  revalidatePath("/en/artistes");
  revalidatePath(`/en/artistes/${artist.slug}`);
  return NextResponse.json({ ok: true });
}
