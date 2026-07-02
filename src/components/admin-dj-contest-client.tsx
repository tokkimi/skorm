"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Eye, Mail, Music2, Trash2, X } from "lucide-react";
import { Status } from "@/components/admin-ui";

type Inquiry = {
  id: string;
  contact_name: string;
  company: string | null;
  email: string;
  inquiry_type: string;
  artist_slug: string | null;
  message: string;
  status: string;
  created_at: string;
  source?: string | null;
};

type Detail = {
  key: string;
  label: string;
  value: string;
};

const statuses = ["new", "qualified", "in_progress", "won", "declined", "archived"];

const statusLabels: Record<string, string> = {
  new: "Nouvelle",
  qualified: "Sélectionné 50",
  in_progress: "Compo demandée",
  won: "Finaliste",
  declined: "Non retenu",
  archived: "Archivé",
};

const fieldLabels: Record<string, string> = {
  name: "Nom / prénom",
  email: "E-mail",
  artist_name: "Nom d’artiste",
  location: "Ville / pays",
  style: "Style musical",
  socials: "Instagram / TikTok",
  track_link: "Son à présenter",
  video_links: "Vidéos / sets / créations",
  message: "Pourquoi participer ?",
  lang: "Langue",
};

function statusTone(status: string) {
  if (status === "new") return "warn";
  if (status === "qualified" || status === "won") return "good";
  return "neutral";
}

function parseDetails(message: string): Detail[] {
  return message
    .split("\n")
    .map((line) => {
      const separator = line.indexOf(":");
      if (separator < 0) return { key: "message", label: "Message", value: line.trim() };
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim();
      return { key, label: fieldLabels[key] || key.replaceAll("_", " "), value };
    })
    .filter((item) => item.value && item.key !== "source");
}

function detailValue(details: Detail[], key: string, fallback = "—") {
  return details.find((detail) => detail.key === key)?.value || fallback;
}

function isLink(value: string) {
  return /^https?:\/\//i.test(value);
}

export function AdminDjContestClient({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState("all");
  const [feedback, setFeedback] = useState("");

  const enriched = useMemo(() => inquiries.map((item) => ({ item, details: parseDetails(item.message) })), [inquiries]);
  const visible = useMemo(
    () => enriched.filter(({ item }) => filter === "all" || item.status === filter),
    [enriched, filter],
  );
  const selectedDetails = useMemo(() => selected ? parseDetails(selected.message) : [], [selected]);

  async function updateStatus(item: Inquiry, status: string) {
    setFeedback("Mise à jour...");
    const response = await fetch("/api/admin/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", kind: "inquiry", id: item.id, payload: { status } }),
    });

    setFeedback(response.ok ? "Statut mis à jour." : "Erreur pendant la mise à jour.");
    if (response.ok) {
      setSelected((current) => current && current.id === item.id ? { ...current, status } : current);
      router.refresh();
    }
  }

  async function remove(item: Inquiry) {
    if (!window.confirm("Supprimer définitivement cette inscription au concours ?")) return;
    const response = await fetch("/api/admin/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", kind: "inquiry", id: item.id }),
    });

    if (response.ok) {
      setSelected(null);
      router.refresh();
    } else {
      setFeedback("Suppression impossible.");
    }
  }

  return (
    <>
      <div className="metrics-grid three contest-admin-metrics">
        <div><span>Inscriptions</span><strong>{inquiries.length}</strong><small>Total concours DJ</small></div>
        <div><span>Pré-sélection</span><strong>{inquiries.filter((item) => item.status === "qualified").length}</strong><small>50 premiers profils</small></div>
        <div><span>Finalistes</span><strong>{inquiries.filter((item) => item.status === "won").length}</strong><small>Objectif : 10 pour Séoul</small></div>
      </div>

      <div className="admin-filters">
        <button type="button" className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Tous</button>
        {statuses.map((status) => (
          <button type="button" className={filter === status ? "active" : ""} onClick={() => setFilter(status)} key={status}>
            {statusLabels[status]}
          </button>
        ))}
      </div>

      <section className="admin-panel full">
        <div className="admin-table dj-contest-table">
          <div className="admin-table-head">
            <span>Artiste</span><span>Contact</span><span>Style</span><span>Son</span><span>Reçu le</span><span>Statut</span><span>Actions</span>
          </div>
          {visible.length ? visible.map(({ item, details }) => (
            <div className="admin-table-row" key={item.id}>
              <span><b>{detailValue(details, "artist_name", item.company || item.contact_name)}</b><small>{detailValue(details, "location")}</small></span>
              <span><b>{item.contact_name}</b><small>{item.email}</small></span>
              <span>{detailValue(details, "style")}</span>
              <span>
                {isLink(detailValue(details, "track_link", "")) ? (
                  <a className="admin-inline-link" href={detailValue(details, "track_link")} target="_blank" rel="noreferrer">Ouvrir <ExternalLink size={12} /></a>
                ) : detailValue(details, "track_link")}
              </span>
              <span>{new Date(item.created_at).toLocaleDateString("fr-FR")}</span>
              <span><Status tone={statusTone(item.status)}>{statusLabels[item.status] || item.status}</Status></span>
              <span className="admin-row-actions">
                <button type="button" onClick={() => { setSelected(item); setFeedback(""); }}><Eye size={14} /> Voir</button>
                <button type="button" onClick={() => remove(item)}><Trash2 size={14} /> Supprimer</button>
              </span>
            </div>
          )) : <p className="admin-empty">Aucune inscription dans ce filtre.</p>}
        </div>
      </section>

      {selected && (
        <div className="admin-modal-backdrop">
          <section className="admin-create-modal inquiry-detail-modal contest-entry-modal">
            <header>
              <div>
                <small>Inscription concours DJ · {new Date(selected.created_at).toLocaleString("fr-FR")}</small>
                <h2>{detailValue(selectedDetails, "artist_name", selected.contact_name)}</h2>
                <p>{detailValue(selectedDetails, "style")} · {detailValue(selectedDetails, "location")}</p>
              </div>
              <button type="button" aria-label="Fermer" onClick={() => setSelected(null)}><X size={16} /></button>
            </header>

            <div className="contest-entry-actions">
              <a href={`mailto:${selected.email}`}><Mail size={14} /> Écrire</a>
              {isLink(detailValue(selectedDetails, "track_link", "")) && (
                <a href={detailValue(selectedDetails, "track_link")} target="_blank" rel="noreferrer"><Music2 size={14} /> Écouter le son</a>
              )}
              {isLink(detailValue(selectedDetails, "socials", "")) && (
                <a href={detailValue(selectedDetails, "socials")} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Réseau social</a>
              )}
            </div>

            <div className="inquiry-readable-details contest-entry-grid">
              {selectedDetails.map((detail) => (
                <article className={["message", "video_links"].includes(detail.key) ? "wide" : ""} key={detail.key}>
                  <span>{detail.label}</span>
                  {isLink(detail.value)
                    ? <a href={detail.value} target="_blank" rel="noreferrer">{detail.value}</a>
                    : <p>{detail.value}</p>}
                </article>
              ))}
            </div>

            <footer>
              <label>
                Statut concours
                <select value={selected.status} onChange={(event) => updateStatus(selected, event.target.value)}>
                  {statuses.map((status) => <option value={status} key={status}>{statusLabels[status]}</option>)}
                </select>
              </label>
              <span>{feedback}</span>
              <button type="button" onClick={() => remove(selected)}><Trash2 size={14} /> Supprimer</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
