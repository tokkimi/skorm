import { AdminItemActions } from "@/components/admin-item-actions";
import { AdminPageHeading, MetricCard, Status } from "@/components/admin-ui";
import { getAdminData } from "@/lib/admin-data";

export default async function AdminArtistsPage() {
  const { artists: data } = await getAdminData();
  return (
    <main className="admin-main">
      <AdminPageHeading title="Artistes" description="Profils, informations professionnelles, m챕dias, tarifs et disponibilit챕s." action="+ Ajouter un artiste" />
      <section className="metrics-grid three">
        <MetricCard label="Artistes actifs" value={data.length} hint="Roster SKORM" />
        <MetricCard label="Profils complets" value={`${data.filter((a) => a.bio && a.image_url).length}/${data.length}`} hint="Bio, photos, liens et documents" />
        <MetricCard label="Disponibles" value={data.length} hint="Ouverts aux propositions" />
      </section>
      <section className="artist-admin-grid">
        {data.map((artist) => (
          <article className="artist-admin-card" key={artist.id}>
            <div className="artist-admin-cover"><span>{artist.name.slice(0, 2).toUpperCase()}</span><Status tone="good">Actif</Status></div>
            <div><small>{artist.tagline}</small><h2>{artist.name}</h2><p>{artist.bio || "Bio et positionnement 횪 compl챕ter."}</p></div>
            <footer><span>Instagram</span><b>{artist.instagram_url ? "Connect챕" : "? connecter"}</b><AdminItemActions kind="artist" item={artist} /></footer>
          </article>
        ))}
      </section>
    </main>
  );
}

