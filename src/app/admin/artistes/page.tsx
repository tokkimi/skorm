import { AdminPageHeading, MetricCard, Status } from "@/components/admin-ui";
import { getAdminData } from "@/lib/admin-data";

export default async function AdminArtistsPage() {
  const { artists: data } = await getAdminData();
  return (
    <main className="admin-main">
      <AdminPageHeading title="Artistes" description="Profils, informations professionnelles, médias, tarifs et disponibilité." action="+ Ajouter un artiste" />
      <section className="metrics-grid three">
        <MetricCard label="Artistes actifs" value={data.length} hint="Roster Estérel" />
        <MetricCard label="Profils complets" value={`${data.filter((a) => a.bio && a.image_url).length}/${data.length}`} hint="Bio, photos, liens et documents" />
        <MetricCard label="Disponibles" value={data.length} hint="Ouverts aux propositions" />
      </section>
      <section className="artist-admin-grid">
        {data.map((artist) => (
          <article className="artist-admin-card" key={artist.id}>
            <div className="artist-admin-cover"><span>{artist.name.slice(0, 2).toUpperCase()}</span><Status tone="good">Actif</Status></div>
            <div><small>{artist.tagline}</small><h2>{artist.name}</h2><p>{artist.bio || "Bio et positionnement à compléter."}</p></div>
            <footer><span>Instagram</span><b>{artist.instagram_url ? "Connecté" : "À connecter"}</b><button>Ouvrir le profil</button></footer>
          </article>
        ))}
      </section>
    </main>
  );
}
