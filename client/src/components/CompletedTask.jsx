import { useSelector } from "react-redux";

import TaskItem from "./TaskItem";

export default function CompletedTasks() {
  const tasksState = useSelector((state) => state.tasks);
  const completedTasks = tasksState.tasks.filter(
    (task) => task.status === "completed"
  );
  return (
    <>
      <h1 className="text-4xl font-semibold mb-6">Completed tasks</h1>
      {completedTasks.length === 0 && (
        <p className="text-center">You dont have any tasks yet.</p>
      )}
      <ul className="flex flex-col gap-4 mb-4">
        {completedTasks.map((task) => {
          return <TaskItem task={task} key={task._id} />;
        })}
      </ul>
      {completedTasks.length > 0 && <p>Total tasks: {completedTasks.length}</p>}
    </>
  );
}
