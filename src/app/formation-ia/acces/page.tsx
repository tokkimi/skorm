import { TrainingAccess } from "@/components/training-access";

export default async function TrainingAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  return <TrainingAccess sessionId={params.session_id} />;
}
