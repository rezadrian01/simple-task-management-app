import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import TaskItem from "./TaskItem";

export default function ProcessTasks({ layoutId }) {
  const { tasks } = useSelector((state) => state.tasks);
  const processTasks = tasks.filter((task) => task.status === "process");
  return (
    <motion.div layoutId={layoutId}>
      {processTasks.length > 0 && (
        <p className="mb-4 text-slate-400">
          Total tasks: {processTasks.length}
        </p>
      )}
      {processTasks.length === 0 && (
        <p className="text-center">You dont have any tasks yet.</p>
      )}
      <ul className="flex flex-col gap-4 mb-4">
        {processTasks.map((task) => {
          return <TaskItem task={task} key={task._id} />;
        })}
      </ul>
    </motion.div>
  );
}
