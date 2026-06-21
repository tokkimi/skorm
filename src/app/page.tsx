import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Camera } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { artists, dates, services } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link className="wordmark" href="#top" aria-label="Estérel Communication">
          ESTÉREL<span>COMMUNICATION</span>
        </Link>
        <nav aria-label="Navigation principale">
          <Link href="#expertise">Expertise</Link>
          <Link href="#artistes">Artistes</Link>
          <Link href="#dates">Dates</Link>
          <Link className="nav-cta" href="#contact">Parler d’un projet</Link>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-noise" />
        <p className="kicker">Communication · Management · Booking Europe</p>
        <h1>
          La stratégie
          <br />
          derrière <em>l’artiste.</em>
        </h1>
        <div className="hero-bottom">
          <p>
            Estérel pilote l’image, les prises de parole et le développement
            d’artistes de la scène électronique — de la vision à la scène.
          </p>
          <Link href="#expertise" className="round-link" aria-label="Découvrir l’agence">
            <ArrowDownRight />
          </Link>
        </div>
        <div className="hero-stamp">EST. / FRANCE / EUROPE</div>
      </section>

      <section id="expertise" className="section">
        <div className="section-intro">
          <p className="section-index">01 — L’agence</p>
          <h2>Une direction unique.<br />Tous les leviers.</h2>
          <p className="lead">
            Une gestion à 360° pensée pour laisser l’artiste créer, performer
            et grandir avec une image cohérente à chaque point de contact.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span>0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="artistes" className="artists-section">
        <div className="artists-heading">
          <p className="section-index">02 — Roster</p>
          <h2>Artistes<br />accompagnés</h2>
        </div>
        <div className="artist-list">
          {artists.map((artist, index) => (
            <article className={`artist-card artist-${artist.slug}`} key={artist.slug}>
              <div className="artist-number">0{index + 1}</div>
              <div className="artist-visual" aria-hidden="true">
                {artist.slug === "cgl-rave-unit" ? (
                  <div className="cgl-mark">CGL<br />RAVE<br />UNIT</div>
                ) : (
                  <div className="paga-image" />
                )}
              </div>
              <div className="artist-copy">
                <p>{artist.genre}</p>
                <h3>{artist.name}</h3>
                <p className="artist-bio">{artist.bio}</p>
                <a href={artist.instagram} target="_blank" rel="noreferrer">
                  Instagram <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="dates" className="section dates-section">
        <div className="section-intro dates-intro">
          <p className="section-index">03 — Agenda</p>
          <h2>En tournée</h2>
          <p className="lead">Les prochaines dates confirmées du roster.</p>
        </div>
        <div className="dates-list">
          {dates.map((date) => (
            <article className="date-row" key={`${date.iso}-${date.event}`}>
              <time dateTime={date.iso}>
                <strong>{date.day}</strong>
                <span>{date.month}</span>
              </time>
              <div>
                <p>{date.artist}</p>
                <h3>{date.event}</h3>
              </div>
              <p className="date-location">{date.location}</p>
              <span className="date-status">{date.status}</span>
            </article>
          ))}
        </div>
        <p className="data-note">Agenda administrable — les dates peuvent être ajoutées, modifiées ou masquées depuis le back-office.</p>
      </section>

      <section className="brand-callout">
        <p className="section-index">04 — Collaborations</p>
        <h2>Une marque.<br />Un artiste.<br /><em>La bonne histoire.</em></h2>
        <p>
          Casting, campagne, événement, contenu ou ambassade : Estérel imagine
          des collaborations crédibles entre les marques et son roster.
        </p>
        <Link href="#contact">Proposer une collaboration <ArrowUpRight /></Link>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-copy">
          <p className="section-index">05 — Contact</p>
          <h2>On construit<br />la suite ?</h2>
          <p>
            Booking, demande presse, proposition de marque ou candidature
            artistique : choisissez le bon sujet, Estérel revient vers vous.
          </p>
          <a href="https://www.instagram.com/esterelcommunication/" target="_blank" rel="noreferrer">
            <Camera size={18} /> @esterelcommunication
          </a>
        </div>
        <ContactForm />
      </section>

      <footer>
        <div className="wordmark">ESTÉREL<span>COMMUNICATION</span></div>
        <p>Communication · Management · Booking</p>
        <p>France / Europe — © 2026</p>
      </footer>
    </main>
  );
}
