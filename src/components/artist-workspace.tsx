"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, Plus, Save } from "lucide-react";

type Artist = { id: string; name: string; slug: string; tagline: string | null };
type PrivateEvent = { id: string; artist_id: string; title: string; starts_at: string; ends_at: string | null; location: string | null; category: string; notes: string | null };
type Note = { artist_id: string; content: string; updated_at: string };

export function ArtistWorkspace({ artists, events, notes }: { artists: Artist[]; events: PrivateEvent[]; notes: Note[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(artists[0]?.id ?? "");
  const [note, setNote] = useState(notes.find((item) => item.artist_id === selectedId)?.content ?? "");
  const [message, setMessage] = useState("");
  const selectedArtist = artists.find((artist) => artist.id === selectedId);
  const artistEvents = useMemo(() => events.filter((event) => event.artist_id === selectedId), [events, selectedId]);

  function selectArtist(id: string) {
    setSelectedId(id);
    setNote(notes.find((item) => item.artist_id === id)?.content ?? "");
    setMessage("");
  }

  async function submitAction(action: string, payload: Record<string, unknown>) {
    setMessage("Enregistrement…");
    const response = await fetch("/api/admin/workspace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
    setMessage(response.ok ? "Enregistré." : "Une erreur est survenue.");
    if (response.ok) router.refresh();
  }

  async function createArtist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    await submitAction("create_artist", Object.fromEntries(new FormData(form).entries()));
    form.reset();
  }

  async function createEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    await submitAction("create_event", { ...Object.fromEntries(new FormData(form).entries()), artist_id: selectedId });
    form.reset();
  }

  return (
    <div className="workspace-layout">
      <aside className="workspace-artists">
        <header><div><small>Portefeuille</small><h2>Artistes</h2></div><span>{artists.length}</span></header>
        <div className="workspace-artist-list">
          {artists.map((artist) => (
            <button className={artist.id === selectedId ? "active" : ""} onClick={() => selectArtist(artist.id)} key={artist.id}>
              <i>{artist.name.slice(0, 2).toUpperCase()}</i><span><b>{artist.name}</b><small>{artist.tagline || "Profil à compléter"}</small></span>
            </button>
          ))}
        </div>
        <details className="create-artist-box">
          <summary><Plus size={14} /> Créer un artiste</summary>
          <form onSubmit={createArtist}>
            <label>Nom<input name="name" required /></label>
            <label>Identifiant URL<input name="slug" placeholder="nom-artiste" required /></label>
            <label>Positionnement<input name="tagline" /></label>
            <label>Instagram<input name="instagram_url" /></label>
            <button>Ajouter au roster</button>
          </form>
        </details>
      </aside>

      <section className="workspace-center">
        <header className="workspace-title">
          <div><small>Agenda privé</small><h2>{selectedArtist?.name || "Sélectionner un artiste"}</h2></div>
          <span>{artistEvents.length} rendez-vous</span>
        </header>
        <form className="event-quick-form" onSubmit={createEvent}>
          <div className="event-form-title"><CalendarPlus size={17} /><b>Ajouter un rendez-vous</b></div>
          <div className="event-form-grid">
            <label>Objet<input name="title" required placeholder="Call, tournage, rendez-vous…" /></label>
            <label>Catégorie<select name="category"><option>rendez-vous</option><option>booking</option><option>contenu</option><option>presse</option><option>personnel</option><option>déplacement</option></select></label>
            <label>Début<input name="starts_at" type="datetime-local" required /></label>
            <label>Fin<input name="ends_at" type="datetime-local" /></label>
            <label>Lieu<input name="location" placeholder="Adresse ou visio" /></label>
            <label className="event-notes-field">Notes<input name="notes" placeholder="Informations utiles" /></label>
          </div>
          <button disabled={!selectedId}>Enregistrer</button>
        </form>

        <div className="private-event-list">
          <header><b>Prochains rendez-vous</b><span>Privé · jamais publié sur le site</span></header>
          {artistEvents.length ? artistEvents.map((item) => (
            <article key={item.id}>
              <time><b>{new Date(item.starts_at).toLocaleDateString("fr-FR", { day: "2-digit" })}</b><span>{new Date(item.starts_at).toLocaleDateString("fr-FR", { month: "short" })}</span></time>
              <div><small>{item.category}</small><h3>{item.title}</h3><p>{item.location || "Lieu à définir"} · {new Date(item.starts_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</p></div>
              <span className="event-private-pill">Privé</span>
            </article>
          )) : <p className="admin-empty">Aucun rendez-vous privé pour cet artiste.</p>}
        </div>
      </section>

      <aside className="workspace-notes">
        <header><div><small>Mémo permanent</small><h2>Bloc-notes</h2></div><Save size={16} /></header>
        <p>Idées, relances, informations sensibles ou détails à ne pas oublier pour {selectedArtist?.name}.</p>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Écrire une note…" />
        <button disabled={!selectedId} onClick={() => submitAction("save_note", { artist_id: selectedId, content: note })}><Save size={14} /> Sauvegarder la note</button>
        {message && <small className="workspace-message">{message}</small>}
      </aside>
    </div>
  );
}
