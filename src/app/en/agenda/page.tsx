import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { dates } from "@/lib/content";

export default function EnglishAgendaPage() {
  return (
    <main className="inner-page">
      <section className="page-heading">
        <Link href="/en" className="back-link"><ArrowLeft size={14} /> Back</Link>
        <p className="eyebrow">Live</p>
        <h1>Agenda</h1>
        <p className="page-intro">France, Europe and beyond.</p>
      </section>
      <section className="agenda-list">
        {dates.map((date) => (
          <article key={`${date.iso}-${date.event}`}>
            <time><b>{date.day}</b><span>{date.month}</span></time>
            <div><small>{date.artist}</small><h2>{date.event}</h2></div>
            <p>{date.location}</p>
            <span className="status-pill">{date.status}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
