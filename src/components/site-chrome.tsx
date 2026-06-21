"use client";

import Link from "next/link";
import { CalendarDays, CircleUserRound, Menu, Send } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/connexion") return null;

  return (
    <>
      <header className="floating-header">
        <Link className="brand" href="/">
          ESTÉREL <span>COMMUNICATION</span>
        </Link>
        <nav>
          <Link href="/agence">Agence</Link>
          <Link href="/artistes">Artistes</Link>
          <Link href="/agenda">Agenda</Link>
          <Link className="header-contact" href="/contact">Contact</Link>
        </nav>
        <Link className="mobile-menu" href="/artistes" aria-label="Voir le menu">
          <Menu size={18} />
        </Link>
      </header>

      <nav className="floating-dock" aria-label="Navigation rapide">
        <Link href="/artistes"><CircleUserRound size={17} /><span>Artistes</span></Link>
        <Link className="dock-center" href="/agenda"><CalendarDays size={17} /><span>Dates</span></Link>
        <Link href="/contact"><Send size={17} /><span>Contact</span></Link>
      </nav>
    </>
  );
}
