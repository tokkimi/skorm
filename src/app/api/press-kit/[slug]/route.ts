import { NextRequest } from "next/server";
import { artistMedia, artists } from "@/lib/content";

function pdfEscape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function textLine(text: string, x: number, y: number, size = 12) {
  return `BT /F1 ${size} Tf ${x} ${y} Td (${pdfEscape(text)}) Tj ET\n`;
}

function buildPdf(lines: string[]) {
  const objects: string[] = [];
  const content = [
    "0.08 0.09 0.11 rg 0 0 595 842 re f\n",
    "0.70 0.88 1 rg\n",
    textLine("SKORM AGENCY", 54, 780, 24),
    "0.95 0.97 1 rg\n",
    ...lines,
    "0.45 0.65 0.78 rg\n",
    textLine("SKORM AGENCY · MANAGEMENT · COMMUNICATION · PARTNERSHIPS · AI · TRAINING", 54, 42, 8),
  ].join("");

  objects.push("<< /Type /Catalog /Pages 2 0 R >>");
  objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  objects.push("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  objects.push(`<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}endstream`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf, "utf8");
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = artists.find((item) => item.slug === slug);
  if (!artist) return new Response("Artist not found", { status: 404 });

  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "fr";
  const media = artistMedia[artist.slug as keyof typeof artistMedia];
  const sounds = media.sounds.slice(0, 8).map((item) => `- ${item.title} · ${item.meta}`);
  const videos = media.videos.slice(0, 5).map((item) => `- ${item.title} · ${item.meta}`);
  const baseY = 720;
  const lines = [
    textLine(artist.name, 54, baseY, 34),
    textLine(artist.genre, 54, baseY - 34, 12),
    textLine(lang === "en" ? "Artist profile" : "Profil artiste", 54, baseY - 78, 16),
    ...artist.bio.match(/.{1,78}(\s|$)/g)!.slice(0, 4).map((line, index) => textLine(line.trim(), 54, baseY - 106 - index * 18, 10)),
    textLine(lang === "en" ? "Official links" : "Liens officiels", 54, baseY - 202, 16),
    ...artist.socials.slice(0, 4).map((social, index) => textLine(`- ${social.label}: ${social.href}`, 54, baseY - 230 - index * 18, 9)),
    textLine(lang === "en" ? "Selected sounds" : "Sons sélectionnés", 54, baseY - 330, 16),
    ...sounds.map((line, index) => textLine(line, 54, baseY - 358 - index * 18, 9)),
    textLine(lang === "en" ? "Selected videos" : "Vidéos sélectionnées", 54, baseY - 530, 16),
    ...(videos.length ? videos : ["- " + (lang === "en" ? "Videos to be added by SKORM." : "Vidéos à compléter par SKORM.")]).map((line, index) => textLine(line, 54, baseY - 558 - index * 18, 9)),
  ].join("");

  const pdf = buildPdf(lines.split("\n").filter(Boolean));
  const filename = `${artist.slug}-skorm-press-kit-${lang}.pdf`;
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
