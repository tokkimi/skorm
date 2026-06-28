import { NextResponse } from "next/server";
import { z } from "zod";
import { hasAdminSession } from "@/lib/admin-auth";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const upsertSchema = z.object({
  action: z.literal("upsert"),
  id: z.string().uuid().optional().nullable(),
  payload: z.record(z.string(), z.unknown()),
});

const deleteSchema = z.object({
  action: z.literal("delete"),
  id: z.string().uuid(),
});

const schema = z.discriminatedUnion("action", [upsertSchema, deleteSchema]);

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase || !process.env.ADMIN_DB_SECRET) {
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }

  const { data, error } =
    parsed.data.action === "delete"
      ? await supabase.rpc("admin_delete_service_pricing_entry", {
          p_secret: process.env.ADMIN_DB_SECRET,
          p_id: parsed.data.id,
        })
      : await supabase.rpc("admin_upsert_service_pricing_entry", {
          p_secret: process.env.ADMIN_DB_SECRET,
          p_id: parsed.data.id || null,
          p_payload: parsed.data.payload,
        });

  return error
    ? NextResponse.json({ error: error.message }, { status: 500 })
    : NextResponse.json({ ok: true, id: data ?? null });
}
