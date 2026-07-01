import Link from "next/link";
import { ArrowLeft, Plane, Trophy } from "lucide-react";
import { ContestCheckoutForm } from "@/components/checkout-form";
import { commerce, djContestPrizes, djContestTimeline } from "@/lib/commerce";

export default function DjContestPage() {
  return (
    <main className="contest-page">
      <Link href="/" className="lumen-back"><ArrowLeft size={14} /> Retour</Link>

      <section className="contest-hero contest-hero-visual">
        <img src="/dj-contest-skorm-2026.png" alt="SKORM DJ Contest — finale à Séoul en octobre 2026" />
        <div className="contest-hero-copy">
          <p className="eyebrow">SKORM DJ Contest</p>
          <h1>Une sélection internationale pour monter sur scène à Séoul.</h1>
          <p>
            Inscriptions en ligne ouvertes jusqu’au {commerce.djContest.deadline}. Participation : {commerce.djContest.displayPrice}.
            Les 50 premiers profils retenus renverront ensuite une composition dédiée.
          </p>
          <div className="contest-hero-actions">
            <a href="#participer">Participer</a>
            <span><Plane size={16} /> Finale à Séoul en octobre 2026</span>
          </div>
        </div>
      </section>

      <section className="contest-grid">
        {djContestTimeline.map((step) => (
          <article className="glass-panel" key={step.date}>
            <small>{step.date}</small>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </section>

      <section className="contest-prizes glass-panel">
        <div>
          <p className="eyebrow">Dotations</p>
          <h2>Les prix annoncés</h2>
        </div>
        <ul>{djContestPrizes.map((prize) => <li key={prize}><Trophy size={16} /> {prize}</li>)}</ul>
      </section>

      <section id="participer" className="contest-register">
        <div>
          <p className="eyebrow">Inscription</p>
          <h2>Dépose ton profil, ton son et tes liens.</h2>
          <p>Après paiement, la candidature est enregistrée dans le back-office SKORM.</p>
        </div>
        <ContestCheckoutForm />
      </section>
    </main>
  );
}
