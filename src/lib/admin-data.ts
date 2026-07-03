import { getSupabaseServerClient } from "@/lib/supabase/server";
import { artists as publicArtists } from "@/lib/content";

type ArtistRow = {
  id: string; name: string; slug: string; tagline: string | null; bio: string | null;
  image_url: string | null; instagram_url: string | null;
};
type EventRow = { id: string; starts_at: string; title: string; city: string; status: string; artist_name: string | null };
type InquiryRow = {
  id: string; contact_name: string; company: string | null; email: string; inquiry_type: string;
  artist_slug: string | null; message: string; status: string; created_at: string;
  phone?: string | null; event_date?: string | null; budget_range?: string | null;
  internal_notes?: string | null; source?: string | null; updated_at?: string | null;
};
type BookingRow = {
  id: string; status: string; payment_status: string; fee: number | null; event_name: string;
  city: string | null; event_date: string | null; artist_name: string | null;
};
type CampaignRow = {
  id: string; status: string; budget: number | null; brand_name: string; title: string;
  deadline: string | null; artist_name: string | null;
};
type ContentRow = {
  id: string; status: string; platform: string; title: string; publish_at: string | null;
  content_type: string; artist_name: string | null;
};
type ContactRow = {
  id: string; full_name: string; email: string | null; company: string | null;
  category: string; country: string | null; relationship: string;
};
type TaskRow = {
  id: string; priority: string; title: string; category: string; due_at: string | null;
  artist_name: string | null;
};
type FinanceRow = {
  id: string; type: string; amount: number; label: string; transaction_date: string;
  status: string; artist_name: string | null;
};

export type AdminData = {
  artists: ArtistRow[];
  events: EventRow[];
  inquiries: InquiryRow[];
  bookings: BookingRow[];
  campaigns: CampaignRow[];
  content_items: ContentRow[];
  contacts: ContactRow[];
  tasks: TaskRow[];
  financial_transactions: FinanceRow[];
};

const empty: AdminData = {
  artists: [], events: [], inquiries: [], bookings: [], campaigns: [],
  content_items: [], contacts: [], tasks: [], financial_transactions: [],
};

export async function syncPublicArtistsToAdmin() {
  const supabase = await getSupabaseServerClient();
  if (!supabase || !process.env.ADMIN_DB_SECRET) return;

  await Promise.all(publicArtists.map((artist, index) => supabase.rpc("admin_upsert_public_artist", {
    p_secret: process.env.ADMIN_DB_SECRET,
    p_slug: artist.slug,
    p_name: artist.name,
    p_tagline: artist.genre,
    p_bio: artist.bio,
    p_instagram_url: artist.instagram,
    p_image_url: artist.heroImage || artist.homeImage || null,
    p_display_order: index + 1,
  })));
}

export async function getAdminData(): Promise<AdminData> {
  const supabase = await getSupabaseServerClient();
  if (!supabase || !process.env.ADMIN_DB_SECRET) return empty;
  await syncPublicArtistsToAdmin();
  const { data, error } = await supabase.rpc("admin_get_backoffice", { p_secret: process.env.ADMIN_DB_SECRET });
  return error || !data ? empty : (data as AdminData);
}
