import { AdminPageHeading, Status } from "@/components/admin-ui";
import { getAdminData } from "@/lib/admin-data";

export default async function RequestsPage() {
  const { inquiries: data } = await getAdminData();
  return (
    <main className="admin-main">
      <AdminPageHeading title="Demandes" description="Centralisez les bookings, propositions de marques, presse et candidatures." action="+ Ajouter une demande" />
      <div className="admin-filters"><button className="active">Toutes</button><button>Nouvelles</button><button>En cours</button><button>Gagnées</button><button>Archivées</button></div>
      <section className="admin-panel full">
        <div className="admin-table requests">
          <div className="admin-table-head"><span>Contact</span><span>Demande</span><span>Artiste</span><span>Reçue le</span><span>Statut</span></div>
          {data.length ? data.map((item) => (
            <div className="admin-table-row" key={item.id}>
              <span><b>{item.contact_name}</b><small>{item.company || item.email}</small></span>
              <span><b>{item.inquiry_type}</b><small>{item.message.slice(0, 70)}</small></span>
              <span>{item.artist_slug || "Général"}</span>
              <span>{new Date(item.created_at).toLocaleDateString("fr-FR")}</span>
              <span><Status tone={item.status === "new" ? "warn" : "neutral"}>{item.status}</Status></span>
            </div>
          )) : <p className="admin-empty">Les prochaines demandes du site apparaîtront ici.</p>}
        </div>
      </section>
    </main>
  );
}
