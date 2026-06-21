import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artists, dates } from "@/lib/content";

export default function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <Image
          src="/artists/paga.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="home-hero-image"
        />
        <div className="home-shade" />
        <div className="home-copy">
          <p className="eyebrow">Artist development · Europe</p>
          <h1>Estérel<br />Communication</h1>
          <p className="home-intro">
            Communication, management et booking.<br />
            Une seule direction, autour de chaque artiste.
          </p>
        </div>

        <Link className="glass-orbit" href="/agence">
          <span>Découvrir</span>
          <ArrowUpRight size={17} />
        </Link>

        <div className="home-roster glass-panel">
          <p className="eyebrow">Roster</p>
          {artists.map((artist, index) => (
            <Link href={`/artistes/${artist.slug}`} key={artist.slug}>
              <span>0{index + 1}</span>
              <strong>{artist.name}</strong>
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>

        <Link className="home-date glass-panel" href="/agenda">
          <div>
            <p className="eyebrow">Next</p>
            <strong>{dates[0].event}</strong>
            <small>{dates[0].location}</small>
          </div>
          <time><b>{dates[0].day}</b>{dates[0].month}</time>
        </Link>
      </section>

      <section className="home-statement">
        <p>Estérel ne se place pas devant l’artiste.</p>
        <h2>Elle construit<br />ce qui l’entoure.</h2>
        <div className="statement-links">
          <Link href="/agence">L’agence <ArrowUpRight /></Link>
          <Link href="/contact">Un projet <ArrowUpRight /></Link>
        </div>
      </section>
    </main>
  );
}
