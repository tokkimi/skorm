import Stripe from "stripe";
import { NextResponse } from "next/server";
import { z } from "zod";
import { commerce } from "@/lib/commerce";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const schema = z.object({
  product: z.enum(["dj-contest", "suno-essential"]),
  email: z.string().email().optional().or(z.literal("")),
  name: z.string().max(120).optional().or(z.literal("")),
  details: z.record(z.string(), z.string()).optional(),
});

function siteUrl(request: Request) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Données invalides." }, { status: 400 });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Paiement Stripe non configuré." }, { status: 503 });
  }

  const product = parsed.data.product === "dj-contest" ? commerce.djContest : commerce.sunoEssential;
  const origin = siteUrl(request);
  const successPath = parsed.data.product === "dj-contest" ? "/concours-dj/merci" : "/formation-ia/acces";
  const cancelPath = parsed.data.product === "dj-contest" ? "/concours-dj" : "/formation-ia";

  const supabase = await getSupabaseServerClient();
  if (supabase && parsed.data.email) {
    await supabase.from("inquiries").insert({
      inquiry_type: parsed.data.product === "dj-contest" ? "artist" : "other",
      contact_name: parsed.data.name || parsed.data.email,
      company: parsed.data.details?.artist_name || product.name,
      email: parsed.data.email,
      artist_slug: null,
      message: Object.entries(parsed.data.details || {})
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n"),
      source: parsed.data.product,
    });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2026-06-24.dahlia" });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: parsed.data.email || undefined,
    line_items: [
      {
        price_data: {
          currency: product.currency,
          unit_amount: product.price,
          product_data: {
            name: product.name,
            description:
              parsed.data.product === "dj-contest"
                ? "Participation officielle au SKORM DJ Contest."
                : "Accès à la formation Suno Essentiel.",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      product: parsed.data.product,
      name: parsed.data.name || "",
      email: parsed.data.email || "",
    },
    success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${cancelPath}?payment=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
