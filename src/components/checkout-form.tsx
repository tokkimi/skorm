"use client";

import { FormEvent, useState } from "react";

type Product = "dj-contest" | "suno-essential";
type Lang = "fr" | "en";

export function ContestCheckoutForm({ lang = "fr" }: { lang?: Lang }) {
  const [status, setStatus] = useState("");
  const isEn = lang === "en";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(isEn ? "Preparing secure payment..." : "Préparation du paiement...");
    const form = event.currentTarget;
    const data = new FormData(form);
    const details = Object.fromEntries(Array.from(data.entries()).map(([key, value]) => [key, String(value)]));
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: "dj-contest" satisfies Product,
        email: details.email,
        name: details.name,
        details: { ...details, lang },
      }),
    });
    const result = await response.json();
    if (result.url) window.location.href = result.url;
    else setStatus(result.error || (isEn ? "Payment could not be opened." : "Impossible d’ouvrir le paiement."));
  }

  return (
    <form className="contest-form glass-panel" onSubmit={submit}>
      <div className="form-row">
        <label className="field"><span>{isEn ? "Full name" : "Nom / prénom"}</span><input name="name" required /></label>
        <label className="field"><span>E-mail</span><input name="email" type="email" required /></label>
      </div>
      <div className="form-row">
        <label className="field"><span>{isEn ? "Artist name" : "Nom d’artiste"}</span><input name="artist_name" required /></label>
        <label className="field"><span>{isEn ? "City / country" : "Ville / pays"}</span><input name="location" required /></label>
      </div>
      <div className="form-row">
        <label className="field"><span>{isEn ? "Music style" : "Style musical"}</span><input name="style" placeholder="Techno, hard techno, house..." required /></label>
        <label className="field"><span>Instagram / TikTok</span><input name="socials" placeholder="https://..." required /></label>
      </div>
      <label className="field field-wide">
        <span>{isEn ? "Track to submit" : "Son à présenter"}</span>
        <input name="track_link" placeholder="SoundCloud, Spotify, Drive, Dropbox, WeTransfer..." required />
      </label>
      <label className="field field-wide">
        <span>{isEn ? "Video / set / creation links" : "Liens vidéo / sets / créations"}</span>
        <textarea name="video_links" placeholder="YouTube, Instagram, TikTok, live set, presskit..." />
      </label>
      <label className="field field-wide">
        <span>{isEn ? "Why do you want to participate?" : "Pourquoi participer ?"}</span>
        <textarea
          name="message"
          placeholder={isEn ? "Universe, ambition, stage experience, project, availability for Seoul..." : "Univers, ambition, scène, projet, disponibilité pour Séoul..."}
          required
        />
      </label>
      <button className="submit-button" type="submit">{isEn ? "Pay €29 and enter" : "Payer 29 € et participer"}</button>
      {status && <p className="form-message">{status}</p>}
    </form>
  );
}

export function TrainingCheckoutButton({ lang = "fr" }: { lang?: Lang }) {
  const [status, setStatus] = useState("");
  const isEn = lang === "en";

  async function checkout() {
    setStatus(isEn ? "Opening secure payment..." : "Ouverture du paiement...");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: "suno-essential" satisfies Product, details: { source: "formation-page", lang } }),
    });
    const result = await response.json();
    if (result.url) window.location.href = result.url;
    else setStatus(result.error || (isEn ? "Payment unavailable." : "Paiement indisponible."));
  }

  return (
    <div className="training-buy">
      <button className="submit-button" type="button" onClick={checkout}>
        {isEn ? "Enroll and pay" : "S’inscrire et payer"}
      </button>
      {status && <p className="form-message">{status}</p>}
    </div>
  );
}
