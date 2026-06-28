import { PageShell } from "@/components/page-shell";

export default function LegalPage() {
  return (
    <PageShell label="L?gal" title="Mentions l?gales" intro="Informations ? compl?ter avec les donn?es juridiques d?finitives." light>
      <section className="legal-copy glass-panel">
        <p>?diteur : SKORM Agency.</p>
        <p>Activit? : communication, management, booking et partenariats pour artistes.</p>
        <p>Contact : via le formulaire du site ou Instagram @skormagency.</p>
        <p>H?bergement : Vercel Inc.</p>
      </section>
    </PageShell>
  );
}


