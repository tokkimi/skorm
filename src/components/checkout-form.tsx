"use client";

import { FormEvent, useState } from "react";

type Product = "dj-contest" | "suno-essential";

export function ContestCheckoutForm() {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Préparation du paiement...");
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
        details,
      }),
    });
    const result = await response.json();
    if (result.url) window.location.href = result.url;
    else setStatus(result.error || "Impossible d’ouvrir le paiement.");
  }

  return (
    <form className="contest-form glass-panel" onSubmit={submit}>
      <div className="form-row">
        <label className="field"><span>Nom / prénom</span><input name="name" required /></label>
        <label className="field"><span>E-mail</span><input name="email" type="email" required /></label>
      </div>
      <div className="form-row">
        <label className="field"><span>Nom d’artiste</span><input name="artist_name" required /></label>
        <label className="field"><span>Ville / pays</span><input name="location" required /></label>
      </div>
      <div className="form-row">
        <label className="field"><span>Style musical</span><input name="style" placeholder="Techno, hard techno, house..." required /></label>
        <label className="field"><span>Instagram / TikTok</span><input name="socials" placeholder="https://..." required /></label>
      </div>
      <label className="field field-wide">
        <span>Son à présenter</span>
        <input name="track_link" placeholder="SoundCloud, Spotify, Drive, Dropbox, WeTransfer..." required />
      </label>
      <label className="field field-wide">
        <span>Liens vidéo / sets / créations</span>
        <textarea name="video_links" placeholder="YouTube, Instagram, TikTok, live set, presskit..." />
      </label>
      <label className="field field-wide">
        <span>Pourquoi participer ?</span>
        <textarea name="message" placeholder="Univers, ambition, scène, projet, disponibilité pour Séoul..." required />
      </label>
      <button className="submit-button" type="submit">Payer 29 € et participer</button>
      {status && <p className="form-message">{status}</p>}
    </form>
  );
}

export function TrainingCheckoutButton() {
  const [status, setStatus] = useState("");

  async function checkout() {
    setStatus("Ouverture du paiement...");
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product: "suno-essential" satisfies Product, details: { source: "formation-page" } }),
    });
    const result = await response.json();
    if (result.url) window.location.href = result.url;
    else setStatus(result.error || "Paiement indisponible.");
  }

  return (
    <div className="training-buy">
      <button className="submit-button" type="button" onClick={checkout}>S’inscrire et payer</button>
      {status && <p className="form-message">{status}</p>}
    </div>
  );
}
