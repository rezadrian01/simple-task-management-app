import { useSelector } from "react-redux";

import TaskItem from "./TaskItem";

export default function ProcessTasks() {
  const { tasks } = useSelector((state) => state.tasks);
  const processTasks = tasks.filter((task) => task.status === "process");
  return (
    <>
      <h1 className="text-4xl font-semibold mb-6">Your task</h1>
      {processTasks.length === 0 && (
        <p className="text-center">You dont have any tasks yet.</p>
      )}
      <ul className="flex flex-col gap-4 mb-4">
        {processTasks.map((task) => {
          return <TaskItem task={task} key={task._id} />;
        })}
      </ul>
      {processTasks.length > 0 && <p>Total tasks: {processTasks.length}</p>}
    </>
  );
}
