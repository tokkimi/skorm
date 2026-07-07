import { NextResponse } from "next/server";
import { z } from "zod";
import { getArtistSessionSlug } from "@/lib/artist-auth";
import { getAdminData } from "@/lib/admin-data";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const mediaSchema = z.object({
  title: z.string().optional(),
  meta: z.string().optional(),
  cover: z.string().optional(),
  href: z.string().optional(),
  previewUrl: z.string().optional(),
}).nullable().optional();

const schema = z.object({
  tagline: z.string().optional(),
  bio: z.string().optional(),
  instagram_url: z.string().optional(),
  image_url: z.string().optional(),
  home_image_url: z.string().optional(),
  featured_sound: mediaSchema,
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
    p_payload: parsed.data,
  });

  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json({ ok: true });
}
