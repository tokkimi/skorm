"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, FileText, Mail, MessageCircle, ShieldCheck, Sparkles, UsersRound } from "lucide-react";

const guideLinks = [
  { icon: UsersRound, title: "Artiste", text: "Dossier, sons, réseaux, dates", href: "/guide-artistes" },
  { icon: MessageCircle, title: "FAQ", text: "Demandes, booking, suivi", href: "/faq" },
  { icon: FileText, title: "Presse & marques", text: "Sponsors, médias, campagnes", href: "/presse-marques" },
];

const trustItems = [
  { icon: Sparkles, title: "Direction artistique", text: "Univers, image, cohérence visuelle" },
  { icon: ShieldCheck, title: "Communication 360°", text: "Réseaux, contenus, sorties" },
  { icon: Mail, title: "Demandes pros", text: "Booking, médias, marques" },
  { icon: CalendarCheck, title: "Gestion de carrière", text: "Dates, priorités, développement" },
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/connexion") return null;
  const isHome = pathname === "/";

  return (
    <footer className={`site-footer ${isHome ? "footer-home" : "footer-inner"}`}>
      {isHome && (
        <section className="footer-guide" aria-label="Accès utiles">
          <h2>Comment avancer ?</h2>
          <div>
            {guideLinks.map(({ icon: Icon, title, text, href }) => (
              <Link href={href} key={title}>
                <span><Icon size={18} /></span>
                <strong>{title}</strong>
                <small>{text}</small>
                <em>→</em>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="footer-dark">
        <div className="footer-trust">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={18} />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="footer-newsletter">
          <p className="eyebrow">Contact</p>
          <h2>Rester dans la boucle</h2>
          <p>Dates, disponibilités, projets artistes et propositions partenaires.</p>
          <form>
            <input type="email" placeholder="Votre email" aria-label="Votre email" />
            <button type="submit">Envoyer</button>
          </form>
        </div>

        <div className="footer-bottom">
          <div className="footer-intro">
            <Link className="footer-brand footer-logo" href="/" aria-label="SKORM Agency">
              <img src="/skorm-logo.png" alt="SKORM Agency" />
            </Link>
            <p>Management, communication, partnerships, AI & training pour artistes électroniques.</p>
            <a href="https://www.instagram.com/skormagency/" target="_blank" rel="noreferrer">Instagram</a>
          </div>

          <div className="footer-columns">
            <nav>
              <span>Agence</span>
              <Link href="/comment-ca-marche">Comment ça marche</Link>
              <Link href="/artistes">Artistes</Link>
              <Link href="/agenda">Agenda</Link>
              <Link href="/concours-dj">DJ Contest</Link>
              <Link href="/formation-ia">Formation IA</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <nav>
              <span>Entrées</span>
              <Link href="/guide-artistes">Guide artistes</Link>
              <Link href="/rejoindre-agence">Déposer un profil</Link>
              <Link href="/devenir-sponsor">Sponsor</Link>
              <Link href="/contact">Booking</Link>
            </nav>
            <nav>
              <span>Informations</span>
              <Link href="/faq">FAQ</Link>
              <Link href="/presse-marques">Presse & marques</Link>
              <Link href="/mentions-legales">Mentions légales</Link>
              <Link href="/cgv">CGV</Link>
              <Link href="/cookies">Cookies</Link>
            </nav>
          </div>
        </div>
      </section>
    </footer>
  );
}
