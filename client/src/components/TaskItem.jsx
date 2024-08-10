import { useDispatch, useSelector } from "react-redux";

import { tasksAction } from "../store";

export default function TaskItem({ task }) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasks);
  const formattedDate = new Date(task.deadline).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  async function sendRequest(status) {
    const response = await fetch(
      `${import.meta.env.VITE_DOMAIN_API}/task/task/${task._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          ...task,
          status: status,
        }),
      }
    );
    const resData = await response.json();
    if (!response.status) {
      throw new Error();
    }
    return resData;
  }

  async function handleIncompletedClick() {
    let tempTasks;
    try {
      tempTasks = [...tasksState.tasks];
      dispatch(tasksAction.incompletedTask(task._id));
      await sendRequest("incompleted");
    } catch (err) {
      dispatch(tasksAction.replaceTask({ tasks: [...tempTasks] }));
    }
  }
  async function handleCompletedClick() {
    let tempTasks;
    try {
      tempTasks = [...tasksState.tasks];
      dispatch(tasksAction.completedTask(task._id));
      await sendRequest("completed");
    } catch (err) {
      dispatch(tasksAction.replaceTask({ tasks: [...tempTasks] }));
    }
  }
  return (
    <li className="p-4 rounded-lg border-2 border-emerald-900 shadow-lg">
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
