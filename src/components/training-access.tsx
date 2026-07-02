"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FINAL_PASS_SCORE,
  MODULE_PASS_SCORE,
  expertFinalExam,
  expertTrainingLevels,
  finalExam,
  trainingLevels,
  type QuizQuestion,
} from "@/lib/training-course";

type Course = "beginner" | "expert";
type Stage = "intro" | "lesson" | "quiz" | "final" | "practical" | "done";

function emptyAnswers(length: number) {
  return Array.from({ length }, () => -1);
}

function scoreQuiz(questions: QuizQuestion[], answers: number[]) {
  return questions.reduce((score, question, index) => score + (answers[index] === question.answer ? 1 : 0), 0);
}

export function TrainingAccess({
  sessionId,
  testAccess = false,
}: {
  sessionId?: string;
  testAccess?: boolean;
}) {
  const [paid, setPaid] = useState(testAccess);
  const [checking, setChecking] = useState(Boolean(sessionId) && !testAccess);
  const [email, setEmail] = useState(testAccess ? "test@skorm-agency.com" : "");
  const [course, setCourse] = useState<Course>("beginner");
  const [stage, setStage] = useState<Stage>("intro");
  const [levelIndex, setLevelIndex] = useState(0);
  const levels = course === "expert" ? expertTrainingLevels : trainingLevels;
  const exam = course === "expert" ? expertFinalExam : finalExam;
  const [quizAnswers, setQuizAnswers] = useState<number[]>(emptyAnswers(levels[0].quiz.length));
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [validatedLevels, setValidatedLevels] = useState<number[]>([]);
  const [finalAnswers, setFinalAnswers] = useState<number[]>(emptyAnswers(exam.length));
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [compositionSent, setCompositionSent] = useState(false);

  useEffect(() => {
    if (testAccess || !sessionId) return;
    fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((response) => response.json())
      .then((data) => {
        const product = String(data.product || "");
        setPaid(Boolean(data.paid && (product === "suno-essential" || product === "suno-expert")));
        setCourse(product === "suno-expert" ? "expert" : "beginner");
        setEmail(data.email || "");
      })
      .finally(() => setChecking(false));
  }, [sessionId, testAccess]);

  const currentLevel = levels[levelIndex];
  const progress = useMemo(() => {
    if (stage === "intro") return 0;
    if (stage === "final") return 92;
    if (stage === "practical") return 96;
    if (stage === "done") return 100;
    const base = (validatedLevels.length / levels.length) * 84;
    return Math.min(90, Math.round(base + (stage === "quiz" ? 10 : 4)));
  }, [stage, validatedLevels.length, levels.length]);

  function reportProgress(nextStage = stage, nextProgress = progress, extra: Record<string, string | number | boolean> = {}) {
    if (!email) return;
    fetch("/api/training-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        course,
        progress: nextProgress,
        stage: nextStage,
        status: nextProgress >= 100 ? "validated" : nextStage === "practical" ? "composition_pending" : "in_progress",
        ...extra,
      }),
    }).catch(() => {});
  }

  function startLevel(index = 0) {
    setLevelIndex(index);
    setQuizAnswers(emptyAnswers(levels[index].quiz.length));
    setQuizScore(null);
    setStage("lesson");
    reportProgress("lesson", Math.max(progress, Math.round((index / levels.length) * 84)));
  }

  function submitLevelQuiz() {
    const score = scoreQuiz(currentLevel.quiz, quizAnswers);
    setQuizScore(score);
    if (score >= MODULE_PASS_SCORE) {
      setValidatedLevels((current) => Array.from(new Set([...current, levelIndex])).sort((a, b) => a - b));
      reportProgress("quiz", Math.round(((levelIndex + 1) / levels.length) * 84), { level: levelIndex + 1, score });
    }
  }

  function nextLevel() {
    const next = levelIndex + 1;
    if (next >= levels.length) {
      setStage("final");
      setFinalScore(null);
      setFinalAnswers(emptyAnswers(exam.length));
      reportProgress("final", 92);
      return;
    }
    startLevel(next);
  }

  function submitFinal() {
    const score = scoreQuiz(exam, finalAnswers);
    setFinalScore(score);
    if (score >= FINAL_PASS_SCORE) reportProgress(course === "expert" ? "practical" : "done", course === "expert" ? 96 : 100, { finalScore: score });
  }

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
    <main className="training-page training-course-page">
      <section className="training-progress-shell">
        <div className="training-progress-head">
          <span>{testAccess ? "Accès test complet" : "Formation débloquée"}</span>
          <strong>{progress}%</strong>
        </div>
        <div className="training-progress-track"><span style={{ width: `${progress}%` }} /></div>
      </section>

      {stage === "intro" && (
        <section className="training-hero training-start">
          <p className="eyebrow">Suno Essentiel V5 / V5.5</p>
          <h1>{course === "expert" ? "Suno Expert V5 / V5.5" : "Un parcours guidé, niveau par niveau."}</h1>
          <p>
            La formation se débloque dans l’ordre : lecture du niveau, QCM sur 10,
            validation à 8/10 minimum, puis niveau suivant. Après tous les niveaux :
            examen final de 100 questions avec 76 bonnes réponses minimum.
            {course === "expert" ? " Le parcours expert se termine ensuite par une composition finale à soumettre." : ""}
          </p>
          {testAccess && (
            <div className="training-course-switch">
              <button type="button" className={course === "beginner" ? "active" : ""} onClick={() => { setCourse("beginner"); setValidatedLevels([]); setLevelIndex(0); }}>Débutant</button>
              <button type="button" className={course === "expert" ? "active" : ""} onClick={() => { setCourse("expert"); setValidatedLevels([]); setLevelIndex(0); }}>Expert</button>
            </div>
          )}
          <button className="training-primary-action" type="button" onClick={() => startLevel(0)}>
            Démarrer la formation
          </button>
        </section>
      )}

      {stage === "lesson" && (
        <section className="training-step-card">
          <p className="eyebrow">{currentLevel.eyebrow}</p>
          <h1>{currentLevel.title}</h1>
          <p className="training-step-intro">{currentLevel.intro}</p>
          <div className="training-lesson-list">
            {currentLevel.lessons.map((lesson, index) => (
              <article key={lesson}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{lesson}</p>
              </article>
            ))}
          </div>
          <div className="training-exercise">
            <span>Exercice</span>
            <p>{currentLevel.exercise}</p>
          </div>
          <button className="training-primary-action" type="button" onClick={() => setStage("quiz")}>
            Suivant : questionnaire du niveau
          </button>
        </section>
      )}

      {stage === "quiz" && (
        <section className="training-step-card">
          <p className="eyebrow">{currentLevel.eyebrow} · QCM</p>
          <h1>Questionnaire sur 10</h1>
          <p className="training-step-intro">Il faut obtenir au moins {MODULE_PASS_SCORE}/10 pour passer au niveau suivant.</p>
          <QuizForm questions={currentLevel.quiz} answers={quizAnswers} onChange={setQuizAnswers} />
          <div className="training-result-bar">
            <button className="training-primary-action" type="button" onClick={submitLevelQuiz}>
              Corriger le questionnaire
            </button>
            {quizScore !== null && (
              <strong className={quizScore >= MODULE_PASS_SCORE ? "passed" : "failed"}>
                Résultat : {quizScore}/10
              </strong>
            )}
          </div>
          {quizScore !== null && quizScore < MODULE_PASS_SCORE && (
            <p className="training-warning">Score insuffisant : relis le niveau puis retente le QCM.</p>
          )}
          {quizScore !== null && quizScore >= MODULE_PASS_SCORE && (
            <button className="training-secondary-action" type="button" onClick={nextLevel}>
              {levelIndex + 1 >= levels.length ? "Passer l’examen final" : "Niveau suivant"}
            </button>
          )}
        </section>
      )}

      {stage === "final" && (
        <section className="training-step-card final-exam">
          <p className="eyebrow">Examen final</p>
          <h1>Questionnaire final de 100 questions</h1>
          <p className="training-step-intro">
            Validation à partir de {FINAL_PASS_SCORE}/100.
            {course === "expert" ? " Ensuite, tu passes l’épreuve pratique : composition finale + explication complète de méthode." : " Une fois validé, l’option certificat + analyse d’un son peut être demandée."}
          </p>
          <QuizForm questions={exam} answers={finalAnswers} onChange={setFinalAnswers} compact />
          <div className="training-result-bar">
            <button className="training-primary-action" type="button" onClick={submitFinal}>
              Corriger l’examen final
            </button>
            {finalScore !== null && (
              <strong className={finalScore >= FINAL_PASS_SCORE ? "passed" : "failed"}>
                Résultat : {finalScore}/100
              </strong>
            )}
          </div>
          {finalScore !== null && finalScore < FINAL_PASS_SCORE && (
            <p className="training-warning">Tu es proche : reprends les niveaux faibles puis retente l’examen.</p>
          )}
          {finalScore !== null && finalScore >= FINAL_PASS_SCORE && (
            <button className="training-secondary-action" type="button" onClick={() => course === "expert" ? setStage("practical") : setStage("done")}>
              {course === "expert" ? "Passer l’épreuve pratique" : "Valider la formation"}
            </button>
          )}
        </section>
      )}

      {stage === "practical" && (
        <section className="training-step-card final-exam">
          <p className="eyebrow">Certification expert</p>
          <h1>Composition finale à soumettre</h1>
          <p className="training-step-intro">
            Compose un morceau complet avec Suno V5/V5.5, puis explique précisément ta méthode :
            prompt, outils, structure, Extend, corrections, export, intention artistique et choix de rendu.
          </p>
          <form
            className="training-practical-form"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              reportProgress("practical", 96, {
                status: "composition_pending",
                composition_link: String(data.get("composition_link") || ""),
                tools: String(data.get("tools") || ""),
                method: String(data.get("method") || ""),
                certificate: true,
              });
              setCompositionSent(true);
            }}
          >
            <label>Lien du morceau final<input name="composition_link" required placeholder="SoundCloud, Drive, Dropbox, WeTransfer..." /></label>
            <label>Outils utilisés<input name="tools" required placeholder="Suno V5.5, DAW, EQ, mastering, visuels..." /></label>
            <label>Explication complète<textarea name="method" required placeholder="Prompt de départ, versions testées, structure, choix Extend, corrections, export, intention artistique..." /></label>
            <button className="training-primary-action" type="submit">Envoyer la composition finale</button>
          </form>
          {compositionSent && (
            <div className="training-practical-sent">
              Composition finale envoyée. Statut admin : en attente de validation et d’envoi du certificat.
              <button type="button" onClick={() => { reportProgress("done", 100, { status: "validated" }); setStage("done"); }}>Marquer comme terminé</button>
            </div>
          )}
        </section>
      )}

      {stage === "done" && (
        <section className="training-hero training-complete">
          <p className="eyebrow">Formation validée</p>
          <h1>Parcours Suno Essentiel terminé.</h1>
          <p>
            Tu peux demander le certificat et l’analyse d’un son par un professionnel.
            Cette option ajoute un retour personnalisé sur ton univers, ton prompt et le rendu musical.
          </p>
          <a className="training-link" href="mailto:hello@skorm-agency.com?subject=Certificat%20%2B%20analyse%20Suno%20Essentiel">
            Demander certificat + analyse
          </a>
        </section>
      )}
    </main>
  );
}

function QuizForm({
  questions,
  answers,
  onChange,
  compact = false,
}: {
  questions: QuizQuestion[];
  answers: number[];
  onChange: (answers: number[]) => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "training-qcm compact" : "training-qcm"}>
      {questions.map((question, questionIndex) => (
        <article className="training-question" key={`${question.prompt}-${questionIndex}`}>
          <h2>{question.prompt.replace(/^\d+\. /, "")}</h2>
          <div>
            {question.options.map((option, optionIndex) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  checked={answers[questionIndex] === optionIndex}
                  onChange={() => {
                    const next = [...answers];
                    next[questionIndex] = optionIndex;
                    onChange(next);
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
