import Link from "next/link";

export default function ContestThanksPage() {
  return (
    <main className="training-page">
      <section className="training-hero">
        <p className="eyebrow">Participation confirmée</p>
        <h1>Ta candidature est bien enregistrée.</h1>
        <p>Merci. L’équipe SKORM examinera ton profil, ton son et tes liens pour la première sélection.</p>
        <Link className="training-link" href="/">Retour accueil</Link>
      </section>
    </main>
  );
}
