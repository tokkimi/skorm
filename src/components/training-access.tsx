"use client";

import { useEffect, useState } from "react";
import { finalQuiz, moduleQuizzes, sunoModules } from "@/lib/commerce";

export function TrainingAccess({
  sessionId,
  testAccess = false,
}: {
  sessionId?: string;
  testAccess?: boolean;
}) {
  const [paid, setPaid] = useState(testAccess);
  const [checking, setChecking] = useState(Boolean(sessionId) && !testAccess);

  useEffect(() => {
    if (testAccess || !sessionId) return;
    fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((response) => response.json())
      .then((data) => setPaid(Boolean(data.paid && data.product === "suno-essential")))
      .finally(() => setChecking(false));
  }, [sessionId, testAccess]);

  if (checking) {
    return (
      <main className="training-page">
        <section className="training-hero">
          <p>Vérification du paiement...</p>
        </section>
      </main>
    );
  }

  if (!paid) {
    return (
      <main className="training-page">
        <section className="training-hero">
          <p className="eyebrow">Accès formation</p>
          <h1>Accès réservé après paiement.</h1>
          <p>Si tu viens de payer, rouvre le lien de confirmation Stripe. Sinon, retourne à la page formation.</p>
          <a className="training-link" href="/formation-ia">Retour formation</a>
        </section>
      </main>
    );
  }

  return (
    <main className="training-page">
      <section className="training-hero">
        <p className="eyebrow">{testAccess ? "Accès test complet" : "Formation débloquée"}</p>
        <h1>Suno Essentiel - parcours complet</h1>
        <p>Lis chaque module, réalise l’exercice, puis réponds au questionnaire associé.</p>
      </section>

      <section className="course-board">
        {sunoModules.map((module) => (
          <article className="course-module glass-panel" key={module.id}>
            <p className="eyebrow">{module.eyebrow}</p>
            <h2>{module.title}</h2>
            <ul>
              {module.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
            <strong>Exercice : {module.exercise}</strong>
          </article>
        ))}
      </section>

      <section className="quiz-board">
        {moduleQuizzes.map((quiz) => (
          <article className="quiz-card glass-panel" key={quiz.moduleId}>
            <h2>{quiz.title}</h2>
            <ol>
              {quiz.questions.map((question) => (
                <li key={question}>{question.replace(/^\d+\. /, "")}</li>
              ))}
            </ol>
          </article>
        ))}

        <article className="quiz-card final glass-panel">
          <p className="eyebrow">Certification finale</p>
          <h2>Questionnaire final - 50 questions</h2>
          <ol>
            {finalQuiz.map((question) => (
              <li key={question}>{question.replace(/^\d+\. /, "")}</li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  );
}
