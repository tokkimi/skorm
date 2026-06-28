import { AdminPricingClient } from "@/components/admin-pricing-client";
import { AdminPageHeading } from "@/components/admin-ui";
import { getPricingEntries } from "@/lib/pricing-admin";

export default async function AdminPricingPage() {
  const entries = await getPricingEntries();
  return (
    <main className="admin-main">
      <AdminPageHeading
        title="Prestations & tarifs"
        description="Grille compl챔te issue du catalogue SKORM : prestations, d챕tails, cibles, types de facturation et tarifs. Tout est modifiable."
      />
      <AdminPricingClient entries={entries} />
    </main>
  );
}

