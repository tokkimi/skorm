import { AdminCreateButton } from "@/components/admin-create-button";
import { AdminItemActions } from "@/components/admin-item-actions";
import { AdminPageHeading, Status } from "@/components/admin-ui";
import { getAdminData } from "@/lib/admin-data";

export default async function TasksPage() {
  const { tasks: data, artists } = await getAdminData();
  return (
    <main className="admin-main">
      <AdminPageHeading title="Tâches" description="Le quotidien de l’agence, classé par artiste, priorité et échéance." action={<AdminCreateButton kind="task" artists={artists} />} />
      <section className="task-page-list">
        {data.length ? data.map((task) => (
          <article key={task.id}>
            <input type="checkbox" aria-label={`Terminer ${task.title}`} />
            <span><b>{task.title}</b><small>{task.artist_name || "Agence"} · {task.category}</small></span>
            <time>{task.due_at ? new Date(task.due_at).toLocaleDateString("fr-FR") : "Sans date"}</time>
            <Status tone={task.priority === "urgent" ? "warn" : "neutral"}>{task.priority}</Status>
            <AdminItemActions kind="task" item={task} />
          </article>
        )) : <p className="admin-empty">Aucune tâche. Le calme avant la prochaine date.</p>}
      </section>
    </main>
  );
}
