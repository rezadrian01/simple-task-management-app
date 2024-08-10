import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import TaskItem from "./TaskItem";

export default function CompletedTasks({ layoutId }) {
  const tasksState = useSelector((state) => state.tasks);
  const completedTasks = tasksState.tasks.filter(
    (task) => task.status === "completed"
  );
  return (
    <motion.div layoutId={layoutId}>
      {completedTasks.length > 0 && (
        <p className="mb-4 text-slate-400">
          Total tasks: {completedTasks.length}
        </p>
      )}
      {completedTasks.length === 0 && (
        <p className="text-center">You dont have any tasks yet.</p>
      )}
      <ul className="flex flex-col gap-4 mb-10">
        <AnimatePresence>
          {completedTasks.length > 0 &&
            completedTasks.map((task) => {
              return <TaskItem task={task} key={task._id} />;
            })}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}
