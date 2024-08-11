import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import TaskItem from "./TaskItem";

export default function CompletedTasks({ layoutId }) {
  const tasksState = useSelector((state) => state.tasks);
  const completedTasks = tasksState.tasks.filter(
    (task) => task.status === "completed"
  );
  return (
    <motion.div
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
        },
        exit: { opacity: 0 },
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      layoutId={layoutId}
    >
      {completedTasks.length > 0 && (
        <p className="mb-4 text-[.8rem] lg:text-base text-slate-400">
          Total tasks: {completedTasks.length}
        </p>
      )}
      {completedTasks.length === 0 && (
        <p className="text-center mt-10 text-sm">
          You dont have any tasks yet.
        </p>
      )}
      <AnimatePresence>
        <motion.ul
          variants={{
            animate: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="flex flex-col gap-4 mb-10"
        >
          {completedTasks.length > 0 &&
            completedTasks.map((task) => {
              return (
                <AnimatePresence key={task._id}>
                  <TaskItem task={task} />;
                </AnimatePresence>
              );
            })}
        </motion.ul>
      </AnimatePresence>
    </motion.div>
  );
}
