"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

function withBase(base: string, href: string) {
  if (href === "/") return base || "/";
  return `${base}${href}`;
}

export function SiteChrome() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isEn = pathname.startsWith("/en");
  const base = isEn ? "/en" : "";

  if (pathname.startsWith("/admin") || pathname === "/connexion") return null;

  const mobileLinks = [
    { href: withBase(base, "/"), label: isEn ? "Home" : "Accueil" },
    { href: withBase(base, "/artistes"), label: isEn ? "Artists" : "Artistes" },
    { href: withBase(base, "/agenda"), label: "Agenda" },
    { href: withBase(base, "/rejoindre-agence"), label: isEn ? "Join the agency" : "Rejoindre l’agence" },
    { href: withBase(base, "/devenir-sponsor"), label: isEn ? "Become a sponsor" : "Devenir sponsor" },
    { href: withBase(base, "/contact"), label: "Contact" },
  ];

  return (
    <>
      <header className="floating-header">
        <Link className="brand brand-logo" href={base || "/"} aria-label="SKORM Agency">
          <img src="/skorm-logo.png" alt="SKORM Agency" />
        </Link>
        <nav>
          <Link href={withBase(base, "/artistes")}>{isEn ? "Artists" : "Artistes"}</Link>
          <Link href={withBase(base, "/agenda")}>Agenda</Link>
          <Link className="header-contact" href={withBase(base, "/contact")}>Contact</Link>
          <Link href={isEn ? "/" : "/en"}>{isEn ? "FR" : "EN"}</Link>
        </nav>
        <button
          className="mobile-menu"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-navigation ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Menu mobile">
          {mobileLinks.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className={pathname === item.href ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
              <small>→</small>
            </Link>
          ))}
          <Link href={isEn ? "/" : "/en"} onClick={() => setMenuOpen(false)}>
            <span>{isEn ? "Version française" : "English version"}</span>
            <small>→</small>
          </Link>
        </nav>
      </div>

      {menuOpen && (
        <button
          className="mobile-menu-backdrop"
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav className="floating-dock" aria-label="Navigation rapide">
        <Link href={withBase(base, "/rejoindre-agence")} aria-label={isEn ? "Artist, join the agency" : "Artiste, rejoindre l’agence"}><span>{isEn ? "ARTIST" : "ARTISTE"}</span></Link>
        <Link className="dock-center" href={withBase(base, "/contact")} aria-label="Contact"><span>CONTACT</span></Link>
        <Link href={withBase(base, "/devenir-sponsor")} aria-label={isEn ? "Become a sponsor" : "Devenir sponsor"}><span>SPONSOR</span></Link>
      </nav>
    </>
  );
}
