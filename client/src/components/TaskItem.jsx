export default function TaskItem({ task }) {
  const formattedDate = new Date(task.deadline).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <li className="p-4 rounded-lg border-2 border-emerald-900">
      <div className="flex justify-between mb-2 items-center">
        <h3 className="font-semibold text-2xl">{task.title}</h3>
        <p>{formattedDate}</p>
      </div>
      <p>{task.description}</p>
    </li>
  );
}
