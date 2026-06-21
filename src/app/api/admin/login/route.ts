import { NextResponse } from "next/server";
import { getAdminCookie, validAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !validAdminCredentials(String(body.email), String(body.password))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  const cookie = getAdminCookie();
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
