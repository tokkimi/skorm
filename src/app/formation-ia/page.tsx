import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { TrainingCheckoutButton } from "@/components/checkout-form";
import { commerce, sunoModules } from "@/lib/commerce";

export default function TrainingPage() {
  return (
    <main className="training-page">
      <Link href="/" className="lumen-back"><ArrowLeft size={14} /> Retour</Link>
      <section className="training-hero">
        <p className="eyebrow">Formation IA musicale</p>
        <h1>Suno Essentiel V5 / V5.5</h1>
        <p>Comprendre Suno sans jargon, écrire de meilleurs prompts, structurer ses paroles et sortir des morceaux propres.</p>
        <div className="training-price">
          <strong>{commerce.sunoEssential.displayPrice}</strong>
          <span>Accès en ligne après paiement</span>
        </div>
        <TrainingCheckoutButton />
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
    </main>
  );
}
