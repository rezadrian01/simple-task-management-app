import { useSelector } from "react-redux";

import TaskItem from "./TaskItem";

export default function IncompletedTasks() {
  const tasksState = useSelector((state) => state.tasks);
  const incompletedTasks = tasksState.tasks.filter(
    (task) => task.status === "incompleted"
  );
  return (
    <>
      <h1 className="text-4xl font-semibold mb-6">Incompleted tasks</h1>
      {incompletedTasks.length === 0 && (
        <p className="text-center">You dont have any tasks yet.</p>
      )}
      <ul className="flex flex-col gap-4 mb-4">
        {incompletedTasks.map((task) => {
          return <TaskItem task={task} key={task._id} />;
        })}
      </ul>
      {incompletedTasks.length > 0 && (
        <p>Total tasks: {incompletedTasks.length}</p>
      )}
    </>
  );
}
