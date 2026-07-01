import Link from "next/link";
import { ArrowLeft, Plane, Trophy } from "lucide-react";
import { ContestCheckoutForm } from "@/components/checkout-form";
import { commerce, djContestPrizesEn, djContestTimelineEn } from "@/lib/commerce";

export default function EnglishDjContestPage() {
  return (
    <main className="contest-page">
      <Link href="/en" className="lumen-back"><ArrowLeft size={14} /> Back</Link>

      <section className="contest-hero contest-hero-visual">
        <img src="/dj-contest-skorm-2026.png" alt="SKORM DJ Contest — final in Seoul in October 2026" />
        <div className="contest-hero-copy">
          <p className="eyebrow">SKORM DJ Contest</p>
          <h1>An international selection to perform on stage in Seoul.</h1>
          <p>
            Online registrations are open until {commerce.djContest.deadlineEn}. Participation: {commerce.djContest.displayPrice}.
            The first 50 selected profiles will then submit a dedicated composition.
          </p>
          <div className="contest-hero-actions">
            <a href="#enter">Enter now</a>
            <span><Plane size={16} /> Final in Seoul in October 2026</span>
          </div>
        </div>
      </section>

      <section className="contest-grid">
        {djContestTimelineEn.map((step) => (
          <article className="glass-panel" key={step.date}>
            <small>{step.date}</small>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </section>

      <section className="contest-prizes glass-panel">
        <div>
          <p className="eyebrow">Prizes</p>
          <h2>Official rewards</h2>
        </div>
        <ul>{djContestPrizesEn.map((prize) => <li key={prize}><Trophy size={16} /> {prize}</li>)}</ul>
      </section>

      <section id="enter" className="contest-register">
        <div>
          <p className="eyebrow">Registration</p>
          <h2>Submit your profile, track and links.</h2>
          <p>After payment, your application is saved in the SKORM back office.</p>
        </div>
        <ContestCheckoutForm lang="en" />
      </section>
    </main>
  );
}
