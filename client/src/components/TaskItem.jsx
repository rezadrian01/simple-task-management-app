import { useDispatch } from "react-redux";

import { tasksAction } from "../store";

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const formattedDate = new Date(task.deadline).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  function handleIncompletedClick() {
    dispatch(tasksAction.incompletedTask(task._id));
  }
  function handleCompletedClick() {
    dispatch(tasksAction.completedTask(task._id));
  }
  return (
    <li className="p-4 rounded-lg border-2 border-emerald-900">
      <div className="flex justify-between mb-2 items-center">
        <h3 className="font-semibold text-2xl">{task.title}</h3>
        <p>{formattedDate}</p>
      </div>
      <p>{task.description}</p>
      <div className="mt-8 flex gap-8">
        <button
          onClick={handleIncompletedClick}
          className="text-red-500 hover:underline underline-offset-4"
        >
          Mark as incompleted
        </button>
        <button
          onClick={handleCompletedClick}
          className="hover:underline underline-offset-4"
        >
          Mark as completed
        </button>
      </div>
    </li>
  );
}
