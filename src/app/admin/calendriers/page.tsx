import { AdminPageHeading } from "@/components/admin-ui";
import { ArtistWorkspace } from "@/components/artist-workspace";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function PrivateCalendarsPage() {
  const supabase = await getSupabaseServerClient();
  const { data } = supabase
    ? await supabase.rpc("admin_get_artist_workspace", { p_secret: process.env.ADMIN_DB_SECRET })
    : { data: null };
  const workspace = (data ?? { artists: [], events: [], notes: [] }) as {
    artists: { id: string; name: string; slug: string; tagline: string | null }[];
    events: { id: string; artist_id: string; title: string; starts_at: string; ends_at: string | null; location: string | null; category: string; notes: string | null }[];
    notes: { artist_id: string; content: string; updated_at: string }[];
  };
  return (
    <main className="admin-main workspace-page">
      <AdminPageHeading title="Agendas privés" description="Un espace personnel par artiste : rendez-vous, échéances et notes de la gérante." />
      <ArtistWorkspace {...workspace} />
    </main>
  );
}
