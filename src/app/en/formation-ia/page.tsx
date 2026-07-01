import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { TrainingCheckoutButton } from "@/components/checkout-form";
import { commerce, sunoModules } from "@/lib/commerce";

export default function EnglishTrainingPage() {
  return (
    <main className="training-page">
      <Link href="/en" className="lumen-back"><ArrowLeft size={14} /> Back</Link>
      <section className="training-hero">
        <p className="eyebrow">AI music training</p>
        <h1>Suno Essential V5 / V5.5</h1>
        <p>Understand Suno without jargon, write stronger prompts, structure lyrics and produce cleaner tracks.</p>
        <div className="training-price">
          <strong>{commerce.sunoEssential.displayPrice}</strong>
          <span>Online access after payment</span>
        </div>
        <TrainingCheckoutButton lang="en" />
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
