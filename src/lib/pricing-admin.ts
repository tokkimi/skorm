import { getSupabaseServerClient } from "@/lib/supabase/server";

export type PricingEntry = {
  id: string;
  seed_key: string | null;
  category: string;
  prestation: string;
  detail: string;
  target: string;
  price: string;
  billing_type: string;
  notes: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export async function getPricingEntries(): Promise<PricingEntry[]> {
  const supabase = await getSupabaseServerClient();
  if (!supabase || !process.env.ADMIN_DB_SECRET) return [];

  const { data, error } = await supabase.rpc("admin_get_service_pricing_entries", {
    p_secret: process.env.ADMIN_DB_SECRET,
  });

  if (error || !Array.isArray(data)) return [];
  return data as PricingEntry[];
}
