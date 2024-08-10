import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import TaskItem from "./TaskItem";

export default function IncompletedTasks({ layoutId }) {
  const tasksState = useSelector((state) => state.tasks);
  const incompletedTasks = tasksState.tasks.filter(
    (task) => task.status === "incompleted"
  );
  return (
    <motion.div layoutId={layoutId}>
      {incompletedTasks.length > 0 && (
        <p className="mb-4 text-slate-400">
          Total tasks: {incompletedTasks.length}
        </p>
      )}
      {incompletedTasks.length === 0 && (
        <p className="text-center">You dont have any tasks yet.</p>
      )}
      <ul className="flex flex-col gap-4 mb-10">
        {incompletedTasks.map((task) => {
          return <TaskItem task={task} key={task._id} />;
        })}
      </ul>
    </motion.div>
  );
}
