import { PageShell } from "@/components/page-shell";
import { getUpcomingDates } from "@/lib/content";

export default function AgendaPage() {
  const dates = getUpcomingDates();

  return (
    <PageShell label="Live" title="Agenda" intro="France, Europe et ailleurs.">
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
    </PageShell>
  );
}
