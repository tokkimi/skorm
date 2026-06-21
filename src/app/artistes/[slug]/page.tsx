import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { artists, dates } from "@/lib/content";

export function generateStaticParams() {
  return artists.map(({ slug }) => ({ slug }));
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = artists.find((item) => item.slug === slug);
  if (!artist) notFound();
  const artistDates = dates.filter((date) => date.artist === artist.name);

  return (
    <PageShell label={artist.genre} title={artist.name}>
      <section className={`artist-detail detail-${artist.slug}`}>
        <div className="artist-detail-visual">
          {artist.slug === "paga" ? (
            <Image src="/artists/paga.png" fill alt={`Portrait de ${artist.name}`} sizes="(max-width: 800px) 100vw, 55vw" priority />
          ) : (
            <div className="rave-visual large"><span>CGL</span><span>RAVE UNIT</span></div>
          )}
          <div className="floating-caption glass-panel">Management · Communication · Europe</div>
        </div>
        <div className="artist-detail-copy">
          <p>{artist.bio}</p>
          <a href={artist.instagram} target="_blank" rel="noreferrer"><Camera size={16} /> Instagram</a>
          <Link href="/contact">Booking / collaboration <ArrowUpRight size={17} /></Link>
        </div>
      </section>
      <section className="artist-dates">
        <p className="eyebrow">Prochaines dates</p>
        {artistDates.length ? artistDates.slice(0, 3).map((date) => (
          <div key={`${date.iso}-${date.event}`}>
            <time>{date.day} {date.month}</time>
            <strong>{date.event}</strong>
            <span>{date.location}</span>
          </div>
        )) : <p className="empty-copy">Les prochaines dates seront annoncées ici.</p>}
      </section>
    </PageShell>
  );
}
