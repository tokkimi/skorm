"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Music2, Pencil, Plus, Trash2, Video, X } from "lucide-react";

type MediaItem = {
  title?: string;
  meta?: string;
  cover?: string;
  href?: string;
  previewUrl?: string;
  deezerId?: string;
};

type ArtistItem = {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  bio?: string | null;
  instagram_url?: string | null;
  image_url?: string | null;
  home_image_url?: string | null;
  display_order?: number | string | null;
  featured_sound?: unknown;
  media_sounds?: unknown;
  media_releases?: unknown;
  media_videos?: unknown;
};

const blankMedia: MediaItem = { title: "", meta: "", cover: "", href: "", previewUrl: "" };

function safeList(value: unknown): MediaItem[] {
  return Array.isArray(value) ? value.map((item) => ({ ...blankMedia, ...(item as MediaItem) })) : [];
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function readUpload(event: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) {
  const file = event.currentTarget.files?.[0];
  if (!file) return;
  setter(await fileToDataUrl(file));
}

function ImageField({
  label,
  value,
  onChange,
  hint = "URL ou image depuis le téléphone",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <div className="admin-app-field admin-image-field">
      <span>{label}</span>
      {value ? <img src={value} alt="" /> : <div className="admin-image-empty"><ImagePlus size={18} /> Image</div>}
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={hint} />
      <label className="admin-upload-pill">
        Télécharger une image
        <input type="file" accept="image/*" onChange={(event) => void readUpload(event, onChange)} />
      </label>
    </div>
  );
}

function MediaEditor({
  title,
  icon,
  items,
  onChange,
  allowPreview = true,
}: {
  title: string;
  icon: React.ReactNode;
  items: MediaItem[];
  onChange: (items: MediaItem[]) => void;
  allowPreview?: boolean;
}) {
  function update(index: number, patch: Partial<MediaItem>) {
    onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  }

  return (
    <section className="admin-app-section wide">
      <header>
        <h3>{icon}{title}</h3>
        <button type="button" onClick={() => onChange([...items, { ...blankMedia }])}>
          <Plus size={15} /> Ajouter
        </button>
      </header>
      <div className="admin-media-editor-list">
        {items.length === 0 && <p className="admin-muted">Aucun élément pour l’instant.</p>}
        {items.map((item, index) => (
          <article className="admin-media-editor-card" key={index}>
            <ImageField
              label="Miniature officielle"
              value={item.cover || ""}
              onChange={(value) => update(index, { cover: value })}
              hint="/artists/cover.jpg ou URL image"
            />
            <label>
              Titre
              <input value={item.title || ""} onChange={(event) => update(index, { title: event.target.value })} />
            </label>
            <label>
              Sous-titre
              <input value={item.meta || ""} onChange={(event) => update(index, { meta: event.target.value })} placeholder="Artiste · plateforme officielle" />
            </label>
            <label className="wide">
              Lien officiel
              <input value={item.href || ""} onChange={(event) => update(index, { href: event.target.value })} placeholder="Spotify, Deezer, SoundCloud, YouTube…" />
            </label>
            {allowPreview && (
              <label className="wide">
                Lien audio direct si disponible
                <input value={item.previewUrl || ""} onChange={(event) => update(index, { previewUrl: event.target.value })} placeholder="MP3 preview direct — optionnel" />
              </label>
            )}
            <button className="admin-small-danger" type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
              <Trash2 size={14} /> Retirer
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ArtistForm({
  mode,
  initial,
  onDone,
}: {
  mode: "create" | "edit";
  initial?: Partial<ArtistItem>;
  onDone: () => void;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [name, setName] = useState(initial?.name || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [tagline, setTagline] = useState(initial?.tagline || "");
  const [bio, setBio] = useState(initial?.bio || "");
  const [instagram, setInstagram] = useState(initial?.instagram_url || "");
  const [order, setOrder] = useState(String(initial?.display_order || ""));
  const [image, setImage] = useState(initial?.image_url || "");
  const [homeImage, setHomeImage] = useState(initial?.home_image_url || initial?.image_url || "");
  const [featured, setFeatured] = useState<MediaItem>({ ...blankMedia, ...((initial?.featured_sound as MediaItem | null) || {}) });
  const [sounds, setSounds] = useState<MediaItem[]>(safeList(initial?.media_sounds));
  const [releases, setReleases] = useState<MediaItem[]>(safeList(initial?.media_releases));
  const [videos, setVideos] = useState<MediaItem[]>(safeList(initial?.media_videos));

  const canSubmit = useMemo(() => name.trim() && slug.trim(), [name, slug]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setMessage("Enregistrement…");
    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      tagline,
      bio,
      instagram_url: instagram,
      image_url: image,
      home_image_url: homeImage,
      display_order: order,
      featured_sound: featured.title || featured.href || featured.cover ? featured : null,
      media_sounds: sounds.filter((item) => item.title || item.href || item.cover),
      media_releases: releases.filter((item) => item.title || item.href || item.cover),
      media_videos: videos.filter((item) => item.title || item.href || item.cover),
    };
    const body = mode === "create"
      ? { kind: "artist", payload }
      : { action: "update", kind: "artist", id: initial?.id, payload };
    const response = await fetch(mode === "create" ? "/api/admin/create" : "/api/admin/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setMessage(data?.error || "Enregistrement impossible.");
      return;
    }
    setMessage("Sauvegardé.");
    router.refresh();
    window.setTimeout(onDone, 350);
  }

  return (
    <form className="admin-app-modal" onSubmit={submit}>
      <header>
        <div>
          <p>{mode === "create" ? "Ajouter au roster" : "Fiche artiste"}</p>
          <h2>{mode === "create" ? "Nouvel artiste" : `Modifier ${initial?.name || ""}`}</h2>
        </div>
        <button type="button" onClick={onDone} aria-label="Fermer"><X size={18} /></button>
      </header>

      <div className="admin-app-grid">
        <section className="admin-app-section">
          <h3>Profil public</h3>
          <label>Nom affiché<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
          <label>Identifiant URL<input value={slug} onChange={(event) => setSlug(event.target.value)} required placeholder="nom-artiste" /></label>
          <label>Style / rôle<input value={tagline || ""} onChange={(event) => setTagline(event.target.value)} placeholder="DJ · Producer · Performer" /></label>
          <label>Instagram<input value={instagram || ""} onChange={(event) => setInstagram(event.target.value)} placeholder="https://instagram.com/..." /></label>
          <label>Ordre d’affichage<input value={order} onChange={(event) => setOrder(event.target.value)} type="number" /></label>
        </section>

        <section className="admin-app-section">
          <h3>Images</h3>
          <ImageField label="Bannière / profil" value={image || ""} onChange={setImage} />
          <ImageField label="Photo affichée sur la home" value={homeImage || ""} onChange={setHomeImage} />
        </section>

        <section className="admin-app-section wide">
          <h3>Bio</h3>
          <textarea value={bio || ""} onChange={(event) => setBio(event.target.value)} placeholder="Positionnement, univers, infos importantes…" />
        </section>

        <section className="admin-app-section wide">
          <h3><Music2 size={17} /> Son mis en avant sur la home</h3>
          <div className="admin-featured-sound-grid">
            <ImageField label="Miniature" value={featured.cover || ""} onChange={(value) => setFeatured({ ...featured, cover: value })} />
            <div className="admin-featured-fields">
              <label>Titre<input value={featured.title || ""} onChange={(event) => setFeatured({ ...featured, title: event.target.value })} /></label>
              <label>Artiste / plateforme<input value={featured.meta || ""} onChange={(event) => setFeatured({ ...featured, meta: event.target.value })} /></label>
              <label>Lien officiel<input value={featured.href || ""} onChange={(event) => setFeatured({ ...featured, href: event.target.value })} /></label>
              <label>Audio direct si disponible<input value={featured.previewUrl || ""} onChange={(event) => setFeatured({ ...featured, previewUrl: event.target.value })} /></label>
            </div>
          </div>
        </section>

        <MediaEditor title="Sons / tracks" icon={<Music2 size={17} />} items={sounds} onChange={setSounds} />
        <MediaEditor title="Sorties / plateformes" icon={<Music2 size={17} />} items={releases} onChange={setReleases} />
        <MediaEditor title="Vidéos" icon={<Video size={17} />} items={videos} onChange={setVideos} allowPreview={false} />
      </div>

      <footer>
        <span>{message}</span>
        <button type="submit" disabled={!canSubmit}>Sauvegarder</button>
      </footer>
    </form>
  );
}

export function AdminArtistCreateButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="admin-add-button" type="button" onClick={() => setOpen(true)}>+ Nouvel artiste</button>
      {open && <div className="admin-modal-backdrop admin-app-backdrop"><ArtistForm mode="create" onDone={() => setOpen(false)} /></div>}
    </>
  );
}

export function AdminArtistActions({ item }: { item: ArtistItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  async function remove() {
    if (!window.confirm("Supprimer cet artiste ?")) return;
    const response = await fetch("/api/admin/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", kind: "artist", id: item.id }),
    });
    if (response.ok) router.refresh();
    else setMessage("Suppression impossible.");
  }

  return (
    <>
      <div className="admin-row-actions">
        <button type="button" onClick={() => setOpen(true)}><Pencil size={14} /> Modifier</button>
        <button type="button" onClick={remove}><Trash2 size={14} /> Supprimer</button>
      </div>
      {message && <span className="admin-inline-message">{message}</span>}
      {open && <div className="admin-modal-backdrop admin-app-backdrop"><ArtistForm mode="edit" initial={item} onDone={() => setOpen(false)} /></div>}
    </>
  );
}
