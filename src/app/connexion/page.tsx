"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      setError("Identifiants incorrects.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="admin-login">
      <form onSubmit={login}>
        <div className="admin-login-logo">ESTÉREL<span>ESPACE PRIVÉ</span></div>
        <h1>Connexion</h1>
        <p>Calendriers, artistes, bookings et notes de l’agence.</p>
        <label>E-mail<input name="email" type="email" autoComplete="username" required /></label>
        <label>Mot de passe<input name="password" type="password" autoComplete="current-password" required /></label>
        <button disabled={loading}>{loading ? "Connexion…" : "Accéder au back-office"}</button>
        {error && <small>{error}</small>}
      </form>
    </main>
  );
}
