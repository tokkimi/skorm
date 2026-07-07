"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { AdminItemActions } from "@/components/admin-item-actions";

type DiapoItem = {
  id: string;
  title: string;
  caption?: string | null;
  asset_url?: string | null;
  content_type: string;
  status: string;
  platform: string;
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function AdminDiapoMediaClient({ items }: { items: DiapoItem[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [type, setType] = useState("photo");
  const [asset, setAsset] = useState("");
  const [message, setMessage] = useState("");

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    setAsset(await fileToDataUrl(file));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Ajout…");
    const response = await fetch("/api/admin/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "content",
        payload: {
          title,
          caption,
          asset_url: asset,
          content_type: type,
          platform: "diapo",
          status: "published",
        },
      }),
    });
    if (!response.ok) {
      setMessage("Impossible d’ajouter ce média.");
      return;
    }
    setTitle("");
    setCaption("");
    setAsset("");
    setMessage("Ajouté.");
    router.refresh();
  }

  return (
    <div className="admin-diapo-layout">
      <form className="admin-app-modal admin-diapo-form" onSubmit={submit}>
        <header>
          <div>
            <p>Diapo home</p>
            <h2>Ajouter un média</h2>
          </div>
        </header>
        <div className="admin-app-grid">
          <section className="admin-app-section">
            <h3>Informations</h3>
            <label>Titre<input value={title} onChange={(event) => setTitle(event.target.value)} required placeholder="Paga live, CGL backstage…" /></label>
            <label>Artiste / contexte<input value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Live, shooting, backstage…" /></label>
            <label>Type
              <select value={type} onChange={(event) => setType(event.target.value)}>
                <option value="photo">Photo</option>
                <option value="video">Vidéo</option>
              </select>
            </label>
          </section>
          <section className="admin-app-section">
            <h3>Média</h3>
            {asset ? (
              type === "video" && !asset.startsWith("data:image") ? <div className="admin-image-empty">Vidéo prête</div> : <img className="admin-diapo-preview" src={asset} alt="" />
            ) : (
              <div className="admin-image-empty"><ImagePlus size={18} /> Aperçu</div>
            )}
            <label>URL vidéo ou image<input value={asset} onChange={(event) => setAsset(event.target.value)} placeholder="Lien Drive, YouTube, MP4, image…" /></label>
            <label className="admin-upload-pill">
              Télécharger une image
              <input type="file" accept="image/*" onChange={(event) => void upload(event)} />
            </label>
          </section>
        </div>
        <footer>
          <span>{message}</span>
          <button type="submit">Ajouter au diapo</button>
        </footer>
      </form>

      <section className="admin-diapo-list">
        {items.length === 0 && <p>Aucun média ajouté depuis l’admin pour l’instant.</p>}
        {items.map((item) => (
          <article key={item.id} className="admin-diapo-card">
            {item.asset_url ? <img src={item.asset_url} alt="" /> : <div className="admin-image-empty">Média</div>}
            <div>
              <small>{item.content_type}</small>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
            <AdminItemActions kind="content" item={item} />
          </article>
        ))}
      </section>
    </div>
  );
}
