import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { TrainingCheckoutButton } from "@/components/checkout-form";
import { aiTrainingPrices, commerce, sunoModules } from "@/lib/commerce";

export default function EnglishTrainingPage() {
  return (
    <main className="training-page">
      <Link href="/en" className="lumen-back"><ArrowLeft size={14} /> Back</Link>
      <section className="training-hero">
        <p className="eyebrow">AI artist training</p>
        <h1>Suno Essential V5 / V5.5</h1>
        <p>
          Level 1 only. Understand Suno without jargon, write stronger prompts,
          structure lyrics and produce cleaner tracks.
        </p>
        <div className="training-price">
          <strong>{commerce.sunoEssential.displayPrice}</strong>
          <span>Launch price - then 89 EUR from September 2026</span>
        </div>
        <TrainingCheckoutButton lang="en" />
      </section>

      <section className="training-price-grid">
        {aiTrainingPrices.map((item) => (
          <article className={item.active ? "active" : ""} key={item.titleEn}>
            <small>{item.active ? "Available now" : "Coming later"}</small>
            <h2>{item.titleEn}</h2>
            <strong>{item.price}</strong>
            <p>{item.textEn}</p>
          </article>
        ))}
      </section>

      <section className="course-board preview">
        {sunoModules.map((module) => (
          <article className="course-module glass-panel" key={module.id}>
            <p className="eyebrow">{module.eyebrow}</p>
            <h2>{module.titleEn}</h2>
            <ul>{module.lessonsEn.map((lesson) => <li key={lesson}><CheckCircle2 size={15} /> {lesson}</li>)}</ul>
            <strong>{module.exerciseEn}</strong>
          </article>
        ))}
      </section>
    </main>
  );
}
