"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? "success" : "error");
    if (response.ok) form.reset();
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field">
        <label htmlFor="type">Votre demande</label>
        <select id="type" name="type" required defaultValue="">
          <option value="" disabled>Sélectionner un sujet</option>
          <option value="booking">Booking / programmation</option>
          <option value="brand">Collaboration de marque</option>
          <option value="press">Presse / média</option>
          <option value="artist">Proposition d’artiste</option>
          <option value="other">Autre projet</option>
        </select>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="company">Société / organisation</label>
          <input id="company" name="company" autoComplete="organization" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">E-mail professionnel</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="artist">Artiste concerné</label>
        <select id="artist" name="artist" defaultValue="general">
          <option value="general">Estérel / demande générale</option>
          <option value="cgl-rave-unit">CGL Rave Unit</option>
          <option value="paga">Paga</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Votre projet</label>
        <textarea id="message" name="message" required />
      </div>
      <button className="submit-button" disabled={status === "sending"}>
        {status === "sending" ? "Envoi…" : "Envoyer la demande"}
      </button>
      {status === "success" && <p className="form-message">Merci. Votre demande a bien été transmise.</p>}
      {status === "error" && <p className="form-message">Le formulaire sera actif dès la connexion du back-office. Vous pouvez aussi écrire via Instagram.</p>}
    </form>
  );
}
