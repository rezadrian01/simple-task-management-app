import { useSelector } from "react-redux";

export default function CompletedTasks() {
  const tasksState = useSelector((state) => state.tasks);
  const completedTasks = tasksState.tasks.filter(
    (task) => task.status === "completed"
  );
  return (
    <>
      <h1>Completed Tasks</h1>
    </>
  );
}
