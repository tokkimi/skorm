import { AdminPageHeading, Status } from "@/components/admin-ui";
import { getAdminData } from "@/lib/admin-data";

export default async function ContactsPage() {
  const { contacts: data } = await getAdminData();
  return (
    <main className="admin-main">
      <AdminPageHeading title="Contacts" description="Bookers, clubs, festivals, marques, presse et partenaires." action="+ Nouveau contact" />
      <div className="admin-filters"><button className="active">Tous</button><button>Bookers</button><button>Marques</button><button>Presse</button><button>Production</button></div>
      <section className="admin-panel full">
        <div className="admin-table contacts">
          <div className="admin-table-head"><span>Contact</span><span>Société</span><span>Catégorie</span><span>Pays</span><span>Relation</span></div>
          {data.length ? data.map((contact) => (
            <div className="admin-table-row" key={contact.id}><span><b>{contact.full_name}</b><small>{contact.email}</small></span><span>{contact.company}</span><span>{contact.category}</span><span>{contact.country}</span><span><Status tone={contact.relationship === "active" ? "good" : "neutral"}>{contact.relationship}</Status></span></div>
          )) : <p className="admin-empty">Votre carnet d’adresses professionnel apparaîtra ici.</p>}
        </div>
      </section>
    </main>
  );
}
