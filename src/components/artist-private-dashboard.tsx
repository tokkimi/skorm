"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, FileText, ImagePlus, WandSparkles, Music2, ReceiptText } from "lucide-react";

type MediaItem = {
  title?: string;
  meta?: string;
  cover?: string;
  href?: string;
  previewUrl?: string;
};

type ArtistPrivateItem = {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  bio?: string | null;
  instagram_url?: string | null;
  image_url?: string | null;
  home_image_url?: string | null;
  featured_sound?: MediaItem | null;
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImageInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="artist-private-image-field">
      <span>{label}</span>
      <div>{value ? <img src={value} alt="" /> : <><ImagePlus size={18} /> Ajouter une image</>}</div>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="URL image ou fichier ci-dessous" />
      <input
        type="file"
        accept="image/*"
        onChange={async (event) => {
          const file = event.currentTarget.files?.[0];
          if (file) onChange(await fileToDataUrl(file));
        }}
      />
    </label>
  );
}

export function ArtistPrivateDashboard({ artist }: { artist: ArtistPrivateItem }) {
  const router = useRouter();
  const featured = artist.featured_sound || {};
  const [message, setMessage] = useState("");
  const [tagline, setTagline] = useState(artist.tagline || "");
  const [bio, setBio] = useState(artist.bio || "");
  const [instagram, setInstagram] = useState(artist.instagram_url || "");
  const [image, setImage] = useState(artist.image_url || "");
  const [homeImage, setHomeImage] = useState(artist.home_image_url || artist.image_url || "");
  const [featuredTitle, setFeaturedTitle] = useState(featured.title || "");
  const [featuredMeta, setFeaturedMeta] = useState(featured.meta || "");
  const [featuredCover, setFeaturedCover] = useState(featured.cover || "");
  const [featuredHref, setFeaturedHref] = useState(featured.href || "");
  const [featuredPreview, setFeaturedPreview] = useState(featured.previewUrl || "");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Enregistrement...");
    const response = await fetch("/api/artist/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tagline,
        bio,
        instagram_url: instagram,
        image_url: image,
        home_image_url: homeImage,
        featured_sound: {
          title: featuredTitle,
          meta: featuredMeta,
          cover: featuredCover,
          href: featuredHref,
          previewUrl: featuredPreview,
        },
      }),
    });
    if (!response.ok) {
      setMessage("Impossible d’enregistrer pour le moment.");
      return;
    }
    setMessage("Sauvegardé.");
    router.refresh();
  }

  return (
    <main className="artist-private-shell">
      <section className="artist-private-hero">
        <small>ESPACE ARTISTE SKORM</small>
        <h1>{artist.name}</h1>
        <p>Gère ton profil, tes visuels, ton son mis en avant et les documents privés liés à SKORM.</p>
        <div>
          <a href={`/artistes/${artist.slug}`} target="_blank">Voir ma page publique</a>
          <a href={`/api/press-kit/${artist.slug}?lang=fr`}><WandSparkles size={16} /> Press kit FR</a>
          <a href={`/api/press-kit/${artist.slug}?lang=en`}><WandSparkles size={16} /> Press kit EN</a>
        </div>
      </section>

      <section className="artist-private-grid">
        <form className="artist-private-card artist-private-form" onSubmit={save}>
          <header>
            <span><ImagePlus size={17} /> Profil public</span>
            <button type="submit">Sauvegarder</button>
          </header>

          <div className="artist-private-fields">
            <label>Style / rôle<input value={tagline} onChange={(event) => setTagline(event.target.value)} /></label>
            <label>Instagram<input value={instagram} onChange={(event) => setInstagram(event.target.value)} placeholder="https://instagram.com/..." /></label>
            <label className="wide">Bio<textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={5} /></label>
            <ImageInput label="Bannière / page artiste" value={image} onChange={setImage} />
            <ImageInput label="Photo affichée sur la home" value={homeImage} onChange={setHomeImage} />
          </div>

          <section className="artist-private-featured">
            <h2><Music2 size={17} /> Son mis en avant</h2>
            <div className="artist-private-fields">
              <ImageInput label="Miniature officielle" value={featuredCover} onChange={setFeaturedCover} />
              <label>Titre<input value={featuredTitle} onChange={(event) => setFeaturedTitle(event.target.value)} /></label>
              <label>Artiste / plateforme<input value={featuredMeta} onChange={(event) => setFeaturedMeta(event.target.value)} /></label>
              <label className="wide">Lien officiel<input value={featuredHref} onChange={(event) => setFeaturedHref(event.target.value)} /></label>
              <label className="wide">Audio direct si disponible<input value={featuredPreview} onChange={(event) => setFeaturedPreview(event.target.value)} /></label>
            </div>
          </section>
          {message && <p className="artist-private-message">{message}</p>}
        </form>

        <aside className="artist-private-side">
          <article className="artist-private-card">
            <span><CalendarDays size={17} /> Agenda & collabs</span>
            <p>Module privé relié à l’agenda SKORM : dates, collabs, moodboards et documents liés à venir ici.</p>
          </article>
          <article className="artist-private-card">
            <span><ReceiptText size={17} /> Facturation</span>
            <p>Espace factures SKORM ↔ artiste : émission, téléchargement PDF et suivi des paiements.</p>
          </article>
          <article className="artist-private-card">
            <span><FileText size={17} /> Contrats</span>
            <p>Contrats, documents privés et press kits générés restent dans cet espace, jamais sur la page publique.</p>
          </article>
        </aside>
      </section>
    </main>
  );
}
