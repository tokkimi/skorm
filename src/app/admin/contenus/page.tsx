import { AdminPageHeading, Status } from "@/components/admin-ui";
import { getAdminData } from "@/lib/admin-data";

export default async function ContentPage() {
  const { content_items: data } = await getAdminData();
  return (
    <main className="admin-main">
      <AdminPageHeading title="Planning contenus" description="Idées, production, validation et programmation sur tous les canaux." action="+ Nouveau contenu" />
      <div className="admin-filters"><button className="active">Calendrier</button><button>Liste</button><button>À valider</button><button>Publié</button></div>
      <section className="content-board">
        {["idea", "production", "review", "scheduled"].map((status) => (
          <div key={status}><header><b>{status}</b><span>{data.filter((c) => c.status === status).length}</span></header>
            {data.filter((c) => c.status === status).map((content) => (
              <article key={content.id}><small>{content.platform} · {content.artist_name}</small><h3>{content.title}</h3><p>{content.publish_at ? new Date(content.publish_at).toLocaleDateString("fr-FR") : "Date à définir"}</p><Status>{content.content_type}</Status></article>
            ))}
            {!data.some((c) => c.status === status) && <p className="kanban-empty">Vide</p>}
          </div>
        ))}
      </section>
    </main>
  );
}
