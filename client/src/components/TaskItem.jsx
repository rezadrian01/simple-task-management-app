import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

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

  async function sendPutRequest(status) {
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

  async function sendDeleteRequest() {
    const response = await fetch(
      `${import.meta.env.VITE_DOMAIN_API}/task/task/${task._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    return resData;
  }

  async function handleIncompletedClick() {
    let tempTasks;
    try {
      tempTasks = [...tasksState.tasks];
      dispatch(tasksAction.incompletedTask(task._id));
      await sendPutRequest("incompleted");
    } catch (err) {
      dispatch(tasksAction.replaceTask({ tasks: [...tempTasks] }));
    }
  }
  async function handleCompletedClick() {
    let tempTasks;
    try {
      tempTasks = [...tasksState.tasks];
      dispatch(tasksAction.completedTask(task._id));
      await sendPutRequest("completed");
    } catch (err) {
      dispatch(tasksAction.replaceTask({ tasks: [...tempTasks] }));
    }
  }
  async function handleDeleteTask() {
    let tempTasks;
    try {
      tempTasks = [...tasksState.tasks];
      dispatch(tasksAction.removeTask(task._id));
      await sendDeleteRequest();
    } catch (err) {
      dispatch(tasksAction.replaceTask({ tasks: [...tempTasks] }));
    }
  }

  return (
    <motion.li
      variants={{
        initial: { y: 30, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
        exit: { y: -30, opacity: 0 },
      }}
      className="p-4 rounded-lg border-2 border-emerald-900 shadow-lg"
    >
      <div className="flex justify-between mb-2 items-center">
        <h3 className="font-semibold text-lg lg:text-2xl">{task.title}</h3>
        <p className="text-sm font-medium tracking-wider">{formattedDate}</p>
      </div>
      <p className="text-sm lg:text-[1rem] font-thin tracking-wider">
        {task.description}
      </p>
      <div className="flex justify-between items-center mt-8">
        <div className="flex text-[.75rem] md:text-base gap-4 lg:gap-8">
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
        <div>
          <button onClick={handleDeleteTask} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e8eaed"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.li>
  );
}
