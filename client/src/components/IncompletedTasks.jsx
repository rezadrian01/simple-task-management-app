import { useSelector } from "react-redux";

export default function IncompletedTasks() {
  const tasksState = useSelector((state) => state.tasks);
  const inCompletedTasks = tasksState.tasks.filter(
    (task) => task.status === "incompleted"
  );
  return (
    <>
      <h1>Failed Tasks</h1>
    </>
  );
}
