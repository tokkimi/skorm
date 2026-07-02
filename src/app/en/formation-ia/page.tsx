import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { TrainingCheckoutButton } from "@/components/checkout-form";
import { aiTrainingPrices, commerce, sunoModules } from "@/lib/commerce";
import { expertTrainingLevels } from "@/lib/training-course";

export default function EnglishTrainingPage() {
  return (
    <main className="training-page">
      <Link href="/en" className="lumen-back"><ArrowLeft size={14} /> Back</Link>
      <section className="training-hero">
        <p className="eyebrow">AI artist training</p>
        <h1>Suno V5 / V5.5 — Essential & Expert</h1>
        <p>
          Two tracks: Essential to build clean foundations, Expert to master advanced
          prompting, Suno Studio, DAW workflow, vocal personas and final certification
          with a practical composition submission.
        </p>
      </section>

      <section className="training-offer-grid">
        <article className="training-offer-card active">
          <p className="eyebrow">Level 1</p>
          <h2>Suno Essential</h2>
          <strong>{commerce.sunoEssential.displayPrice}</strong>
          <p>Unlimited access, guided levels, 10-question quizzes and a 100-question final exam.</p>
          <TrainingCheckoutButton lang="en" product="suno-essential" />
        </article>
        <article className="training-offer-card expert">
          <p className="eyebrow">Expert level</p>
          <h2>Suno Expert</h2>
          <strong>{commerce.sunoExpert.displayPrice}</strong>
          <p>Professional track: advanced prompts, Extend, Studio, DAW, mastering EQ, voices/personas, final exam and composition.</p>
          <TrainingCheckoutButton lang="en" product="suno-expert" />
        </article>
      </section>

      <section className="training-price-grid">
        {aiTrainingPrices.map((item) => (
          <article className={item.active ? "active" : ""} key={item.titleEn}>
            <small>{item.active ? "Available now" : "Option"}</small>
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
