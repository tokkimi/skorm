"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CircleDollarSign,
  ContactRound,
  ExternalLink,
  FileText,
  Handshake,
  Inbox,
  LayoutDashboard,
  ListChecks,
  Music2,
} from "lucide-react";

const items = [
  { href: "/admin", label: "Vue d’ensemble", icon: LayoutDashboard },
  { href: "/admin/demandes", label: "Demandes", icon: Inbox },
  { href: "/admin/artistes", label: "Artistes", icon: Music2 },
  { href: "/admin/calendriers", label: "Agendas privés", icon: CalendarDays },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/campagnes", label: "Campagnes", icon: Handshake },
  { href: "/admin/contenus", label: "Contenus", icon: FileText },
  { href: "/admin/contacts", label: "Contacts", icon: ContactRound },
  { href: "/admin/finances", label: "Finances", icon: CircleDollarSign },
  { href: "/admin/taches", label: "Tâches", icon: ListChecks },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-logo">ESTÉREL<span>BACK OFFICE</span></Link>
        <nav>
          {items.map(({ href, label, icon: Icon }) => (
            <Link className={pathname === href ? "active" : ""} href={href} key={href}>
              <Icon size={17} /><span>{label}</span>
            </Link>
          ))}
        </nav>
        <Link href="/" className="admin-site-link">Voir le site <ExternalLink size={14} /></Link>
      </aside>
      <div className="admin-content">
        <header className="admin-topbar">
          <div><span>Agence</span><strong>Estérel Communication</strong></div>
          <div className="admin-avatar">EC</div>
        </header>
        {children}
      </div>
    </div>
  );
}
