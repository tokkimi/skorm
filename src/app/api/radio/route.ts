import { NextResponse } from "next/server";
import { getPublicSiteData } from "@/lib/public-site-data";
import { getRadioSchedule, radioTracksFromArtists } from "@/lib/radio";

export const dynamic = "force-dynamic";

export async function GET() {
  const { artists } = await getPublicSiteData();
  const schedule = getRadioSchedule(radioTracksFromArtists(artists));

  if (!schedule) {
    return NextResponse.json({ error: "Radio SKORM indisponible" }, { status: 404 });
  }

  return NextResponse.json(schedule, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
