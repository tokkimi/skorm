"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ImagePlus, MapPin, Pencil, Trash2, X } from "lucide-react";

type DiapoItem = {
  id: string;
  title: string;
  caption?: string | null;
  asset_url?: string | null;
  content_type: string;
  status: string;
  platform: string;
  artist_name?: string | null;
  publish_at?: string | null;
};

type DiapoDraft = {
  title: string;
  artist_name: string;
  location: string;
  publish_at: string;
  content_type: string;
  asset_url: string;
};

const emptyDraft: DiapoDraft = {
  title: "",
  artist_name: "",
  location: "",
  publish_at: "",
  content_type: "photo",
  asset_url: "",
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function toLocalDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function itemToDraft(item: DiapoItem): DiapoDraft {
  const captionParts = (item.caption || "").split("·").map((part) => part.trim()).filter(Boolean);
  return {
    title: item.title || "",
    artist_name: item.artist_name || captionParts[0] || "",
    location: captionParts.length > 1 ? captionParts.slice(1).join(" · ") : item.caption || "",
    publish_at: toLocalDate(item.publish_at),
    content_type: item.content_type || "photo",
    asset_url: item.asset_url || "",
  };
}

function AdminDiapoForm({
  mode,
  initial,
  onDone,
}: {
  mode: "create" | "edit";
  initial?: DiapoItem;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<DiapoDraft>(initial ? itemToDraft(initial) : emptyDraft);
  const [message, setMessage] = useState("");

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const assetUrl = await fileToDataUrl(file);
    setDraft((current) => ({ ...current, asset_url: assetUrl }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Enregistrement...");
    const payload = {
      title: draft.title.trim(),
      artist_name: draft.artist_name.trim() || null,
      caption: [draft.artist_name.trim(), draft.location.trim()].filter(Boolean).join(" · ") || null,
      publish_at: draft.publish_at ? new Date(`${draft.publish_at}T12:00:00`).toISOString() : null,
      asset_url: draft.asset_url.trim(),
      content_type: draft.content_type,
      platform: "diapo",
      status: "published",
    };
    const response = await fetch(mode === "create" ? "/api/admin/create" : "/api/admin/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        mode === "create"
          ? { kind: "content", payload }
          : { action: "update", kind: "content", id: initial?.id, payload },
      ),
    });
    if (!response.ok) {
      setMessage("Impossible d’enregistrer ce média.");
      return;
    }
    setMessage("Enregistré.");
    if (mode === "create") setDraft(emptyDraft);
    router.refresh();
    window.setTimeout(() => onDone?.(), 250);
  }

  return (
    <form className="admin-app-modal admin-diapo-form" onSubmit={submit}>
      <header>
        <div>
          <p>Diapo home</p>
          <h2>{mode === "create" ? "Ajouter un média" : "Modifier le média"}</h2>
        </div>
        {onDone && (
          <button type="button" onClick={onDone} aria-label="Fermer">
            <X size={18} />
          </button>
        )}
      </header>

      <div className="admin-diapo-editor-grid">
        <section className="admin-app-section">
          <h3>Informations visibles</h3>
          <label>
            Titre
            <input
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              required
              placeholder="Live Seoul, backstage CGL, studio Paga..."
            />
          </label>
          <label>
            Nom de l’artiste
            <input
              value={draft.artist_name}
              onChange={(event) => setDraft({ ...draft, artist_name: event.target.value })}
              placeholder="Paga, CGL, Nova..."
            />
          </label>
          <label>
            Lieu / contexte
            <input
              value={draft.location}
              onChange={(event) => setDraft({ ...draft, location: event.target.value })}
              placeholder="Paris, Séoul, backstage, shooting..."
            />
          </label>
          <label>
            Date
            <input
              type="date"
              value={draft.publish_at}
              onChange={(event) => setDraft({ ...draft, publish_at: event.target.value })}
            />
          </label>
        </section>

        <section className="admin-app-section">
          <h3>Média</h3>
          <label>
            Type
            <select
              value={draft.content_type}
              onChange={(event) => setDraft({ ...draft, content_type: event.target.value })}
            >
              <option value="photo">Photo</option>
              <option value="video">Vidéo</option>
            </select>
          </label>
          {draft.asset_url ? (
            draft.content_type === "photo" ? (
              <img className="admin-diapo-preview" src={draft.asset_url} alt="" />
            ) : (
              <div className="admin-image-empty">Vidéo prête</div>
            )
          ) : (
            <div className="admin-image-empty">
              <ImagePlus size={18} /> Aperçu
            </div>
          )}
          <label>
            URL image / vidéo
            <input
              value={draft.asset_url}
              onChange={(event) => setDraft({ ...draft, asset_url: event.target.value })}
              required
              placeholder="Image, MP4, Drive, YouTube..."
            />
          </label>
          <label className="admin-upload-pill">
            Télécharger une image
            <input type="file" accept="image/*" onChange={(event) => void upload(event)} />
          </label>
        </section>
      </div>

      <footer>
        <span>{message}</span>
        <button type="submit">{mode === "create" ? "Ajouter au diapo" : "Sauvegarder"}</button>
      </footer>
    </form>
  );
}

function DiapoActions({ item }: { item: DiapoItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  async function remove() {
    if (!window.confirm("Supprimer ce média du diapo ?")) return;
    const response = await fetch("/api/admin/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", kind: "content", id: item.id }),
    });
    if (!response.ok) {
      setMessage("Suppression impossible.");
      return;
    }
    router.refresh();
  }

  return (
    <>
      <div className="admin-row-actions">
        <button type="button" onClick={() => setOpen(true)}>
          <Pencil size={14} /> Modifier
        </button>
        <button type="button" onClick={remove}>
          <Trash2 size={14} /> Supprimer
        </button>
      </div>
      {message && <span className="admin-inline-message">{message}</span>}
      {open && (
        <div className="admin-modal-backdrop admin-app-backdrop">
          <AdminDiapoForm mode="edit" initial={item} onDone={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

export function AdminDiapoMediaClient({ items }: { items: DiapoItem[] }) {
  return (
    <div className="admin-diapo-layout">
      <AdminDiapoForm mode="create" />

      <section className="admin-diapo-list">
        {items.length === 0 && (
          <p className="admin-muted">Aucun média ajouté depuis l’admin pour l’instant.</p>
        )}
        {items.map((item) => (
          <article key={item.id} className="admin-diapo-card">
            {item.asset_url && item.content_type !== "video" ? (
              <img src={item.asset_url} alt="" />
            ) : (
              <div className="admin-image-empty">{item.content_type === "video" ? "Vidéo" : "Média"}</div>
            )}
            <div className="admin-diapo-card-body">
              <small>{item.content_type}</small>
              <h3>{item.title}</h3>
              <p>{item.artist_name || (item.caption || "").split("·")[0]?.trim() || "Artiste non renseigné"}</p>
              <p className="admin-diapo-meta">
                <MapPin size={14} /> {(item.caption || "").split("·").slice(1).join(" · ").trim() || item.caption || "Lieu / contexte non renseigné"}
              </p>
              <p className="admin-diapo-meta">
                <CalendarDays size={14} /> {item.publish_at ? new Date(item.publish_at).toLocaleDateString("fr-FR") : "Date non renseignée"}
              </p>
            </div>
            <DiapoActions item={item} />
          </article>
        ))}
      </section>
    </div>
  );
}
