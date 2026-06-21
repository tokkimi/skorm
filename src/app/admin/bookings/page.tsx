import { AdminPageHeading, MetricCard, Status } from "@/components/admin-ui";
import { getAdminData } from "@/lib/admin-data";

export default async function BookingsPage() {
  const { bookings: data } = await getAdminData();
  const fee = data.reduce((sum, item) => sum + Number(item.fee || 0), 0);
  return (
    <main className="admin-main">
      <AdminPageHeading title="Bookings" description="Du premier contact au règlement final de la date." action="+ Nouveau booking" />
      <section className="metrics-grid three">
        <MetricCard label="Pipeline" value={data.length} hint="Toutes étapes confondues" />
        <MetricCard label="Valeur totale" value={`${fee.toLocaleString("fr-FR")} €`} hint="Cachets renseignés" />
        <MetricCard label="À encaisser" value={data.filter((b) => b.payment_status === "pending").length} hint="Factures en attente" />
      </section>
      <section className="kanban">
        {["lead", "negotiation", "confirmed", "completed"].map((status) => (
          <div className="kanban-column" key={status}><header><b>{status}</b><span>{data.filter((b) => b.status === status).length}</span></header>
            {data.filter((b) => b.status === status).map((booking) => (
              <article key={booking.id}><small>{booking.artist_name}</small><h3>{booking.event_name}</h3><p>{booking.city} · {booking.event_date}</p><footer><b>{Number(booking.fee || 0).toLocaleString("fr-FR")} €</b><Status>{booking.payment_status}</Status></footer></article>
            ))}
            {!data.some((b) => b.status === status) && <p className="kanban-empty">Aucun dossier</p>}
          </div>
        ))}
      </section>
    </main>
  );
}
