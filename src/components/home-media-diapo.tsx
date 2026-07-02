import { ExternalLink, Play } from "lucide-react";

const mediaItems = [
  {
    id: "1tKDCsoq3GAI6NrqecZ4RFXHPoiu6U5dQ",
    title: "Cagoule Rave Unit",
    meta: "Shooting District",
    type: "Photo",
  },
  {
    id: "1Yp58NRpkQC5-wfMYIrKpJID4zs6hK5Jd",
    title: "Cagoule Rave Unit",
    meta: "Portrait scène",
    type: "Photo",
  },
  {
    id: "1hjc15USH8ccmAO_UKazMDWpaJwsHdPgb",
    title: "Cagoule Rave Unit",
    meta: "Backstage",
    type: "Photo",
  },
  {
    id: "1n9dBNt9IEuCe3WGeiDeo-bm0jqHww_XI",
    title: "Cagoule Rave Unit",
    meta: "Vidéo shooting",
    type: "Vidéo",
  },
  {
    id: "1A3Wkjh0_8bVs8y4k3GgoyHxy3d5OVhnx",
    title: "Paga",
    meta: "Club photos",
    type: "Photo",
  },
  {
    id: "1SGHyuqdj-lJsZSO2iHyVzJptF8l4nkNZ",
    title: "Paga",
    meta: "Live club",
    type: "Photo",
  },
  {
    id: "1vUQ1K-7yvbfpIrNinOCWLjKXlAPEfvH5",
    title: "Paga",
    meta: "Crowd & booth",
    type: "Photo",
  },
  {
    id: "1VZvRdzMSTHa5SvxjedtWLlLTkSAKwLeA",
    title: "Paga",
    meta: "Timeline club",
    type: "Vidéo",
  },
];

function driveThumb(id: string) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1400`;
}

function driveView(id: string) {
  return `https://drive.google.com/file/d/${id}/view`;
}

export function HomeMediaDiapo() {
  return (
    <section className="home-media-diapo" aria-labelledby="home-media-title">
      <div className="home-media-head">
        <p className="eyebrow">Médias</p>
        <h2 id="home-media-title">Photos & vidéos des artistes suivis.</h2>
        <p>Une sélection légère depuis les dossiers média SKORM, entre live, shooting et backstage.</p>
      </div>

      <div className="home-media-rail" aria-label="Diaporama médias artistes">
        {mediaItems.map((item) => (
          <a
            className="home-media-card"
            href={driveView(item.id)}
            target="_blank"
            rel="noreferrer"
            key={`${item.id}-${item.title}`}
          >
            <img src={driveThumb(item.id)} alt={`${item.title} — ${item.meta}`} loading="lazy" />
            <span className="home-media-badge">
              {item.type === "Vidéo" ? <Play size={13} fill="currentColor" /> : <ExternalLink size={13} />}
              {item.type}
            </span>
            <span className="home-media-caption">
              <strong>{item.title}</strong>
              <small>{item.meta}</small>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
