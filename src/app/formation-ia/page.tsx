import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { TrainingCheckoutButton } from "@/components/checkout-form";
import { aiTrainingPrices, commerce, sunoModules } from "@/lib/commerce";
import { expertTrainingLevels } from "@/lib/training-course";

export default function TrainingPage() {
  return (
    <main className="training-page">
      <Link href="/" className="lumen-back"><ArrowLeft size={14} /> Retour</Link>
      <section className="training-hero">
        <p className="eyebrow">Formation artiste IA</p>
        <h1>Suno V5 / V5.5 — Essentiel & Expert</h1>
        <p>
          Deux parcours : débutant pour construire les bases, expert pour maîtriser
          l’architecture avancée des prompts, Suno Studio, le workflow DAW, les personas
          vocales et la certification finale avec composition.
        </p>
      </section>

      <section className="training-offer-grid">
        <article className="training-offer-card active">
          <p className="eyebrow">Niveau 1</p>
          <h2>Suno Essentiel</h2>
          <strong>{commerce.sunoEssential.displayPrice}</strong>
          <p>Accès illimité, niveaux guidés, QCM sur 10 et examen final de 100 questions.</p>
          <TrainingCheckoutButton product="suno-essential" />
        </article>
        <article className="training-offer-card expert">
          <p className="eyebrow">Niveau Expert</p>
          <h2>Suno Expert</h2>
          <strong>{commerce.sunoExpert.displayPrice}</strong>
          <p>Parcours pro : prompt avancé, Extend, Studio, DAW, mastering EQ, voix/personas, examen et composition finale.</p>
          <TrainingCheckoutButton product="suno-expert" />
        </article>
      </section>

      <section className="training-price-grid">
        {aiTrainingPrices.map((item) => (
          <article className={item.active ? "active" : ""} key={item.title}>
            <small>{item.active ? "Disponible maintenant" : "Option"}</small>
            <h2>{item.title}</h2>
            <strong>{item.price}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="course-board preview">
        {sunoModules.map((module) => (
          <article className="course-module glass-panel" key={module.id}>
            <p className="eyebrow">{module.eyebrow}</p>
            <h2>{module.title}</h2>
            <ul>{module.lessons.map((lesson) => <li key={lesson}><CheckCircle2 size={15} /> {lesson}</li>)}</ul>
            <strong>{module.exercise}</strong>
          </article>
        ))}
      </section>

      <section className="course-board preview">
        {expertTrainingLevels.map((module) => (
          <article className="course-module glass-panel" key={module.id}>
            <p className="eyebrow">{module.eyebrow}</p>
            <h2>{module.title}</h2>
            <ul>{module.lessons.slice(0, 4).map((lesson) => <li key={lesson}><CheckCircle2 size={15} /> {lesson}</li>)}</ul>
            <strong>{module.exercise}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}
