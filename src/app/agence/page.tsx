import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { services } from "@/lib/content";

export default function AgencePage() {
  return (
    <PageShell
      label="L’agence"
      title="Dans l’ombre. Au centre du projet."
      intro="Estérel accompagne peu d’artistes, mais les accompagne entièrement."
    >
      <section className="agency-layout">
        <div className="agency-note glass-panel">
          <span>360°</span>
          <p>Une vision continue entre image, carrière et scène.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <article key={service.title}>
              <span>0{index + 1}</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>
      <Link className="page-cta" href="/contact">Parler d’un projet <ArrowUpRight /></Link>
    </PageShell>
  );
}
