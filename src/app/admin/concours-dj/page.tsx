import { AdminDjContestClient } from "@/components/admin-dj-contest-client";
import { AdminPageHeading } from "@/components/admin-ui";
import { getAdminData } from "@/lib/admin-data";

export default async function AdminDjContestPage() {
  const { inquiries } = await getAdminData();
  const contestEntries = inquiries
    .filter((item) => item.source === "dj-contest")
    .filter((item) => item.email !== "test-checkout@skorm-agency.com")
    .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));

  return (
    <>
      <AdminPageHeading
        title="Concours DJ"
        description="Toutes les inscriptions au concours : coordonnées, projet, son soumis, liens vidéo, statut de sélection et accès complet au dossier."
      />
      <AdminDjContestClient inquiries={contestEntries} />
    </>
  );
}
