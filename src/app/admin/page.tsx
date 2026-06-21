import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await getSupabaseServerClient();
  const [{ data: inquiries }, { data: events }] = supabase
    ? await Promise.all([
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(20),
        supabase.from("events").select("*, artists(name)").order("starts_at").limit(20),
      ])
    : [{ data: [] }, { data: [] }];

  return (
    <main className="min-h-screen bg-neutral-950 p-5 text-neutral-50 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-end justify-between border-b border-white/15 pb-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.2em] text-neutral-500">Estérel / Back-office</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-[-.06em]">Pilotage agence</h1>
          </div>
          <Link href="/" className="text-sm text-neutral-400">Voir le site ↗</Link>
        </div>
        {!supabase && (
          <Card className="border-amber-500/30 bg-amber-500/5 text-neutral-50">
            <CardHeader><CardTitle>Connexion Supabase en attente</CardTitle></CardHeader>
            <CardContent className="text-neutral-400">Le tableau de bord est prêt. Ajoutez les variables d’environnement pour activer les données, l’authentification et les formulaires.</CardContent>
          </Card>
        )}
        <div className="grid gap-4 md:grid-cols-3">
          <Metric label="Demandes reçues" value={inquiries?.length ?? 0} />
          <Metric label="Dates à venir" value={events?.length ?? 0} />
          <Metric label="Artistes actifs" value={2} />
        </div>
        <Card className="border-white/10 bg-neutral-900 text-neutral-50">
          <CardHeader><CardTitle>Dernières demandes</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow className="border-white/10"><TableHead>Contact</TableHead><TableHead>Type</TableHead><TableHead>Artiste</TableHead><TableHead>Statut</TableHead></TableRow></TableHeader>
              <TableBody>
                {inquiries?.length ? inquiries.map((item) => (
                  <TableRow key={item.id} className="border-white/10">
                    <TableCell><strong>{item.contact_name}</strong><br/><span className="text-neutral-500">{item.email}</span></TableCell>
                    <TableCell>{item.inquiry_type}</TableCell>
                    <TableCell>{item.artist_slug ?? "Général"}</TableCell>
                    <TableCell><Badge variant="outline">{item.status}</Badge></TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={4} className="py-12 text-center text-neutral-500">Aucune donnée pour le moment.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <Card className="border-white/10 bg-neutral-900 text-neutral-50"><CardHeader><p className="font-mono text-xs uppercase tracking-widest text-neutral-500">{label}</p><CardTitle className="text-5xl tracking-[-.08em]">{value}</CardTitle></CardHeader></Card>;
}
