import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import TaskItem from "./TaskItem";

export default function IncompletedTasks({ layoutId }) {
  const tasksState = useSelector((state) => state.tasks);
  const incompletedTasks = tasksState.tasks.filter(
    (task) => task.status === "incompleted"
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
      {incompletedTasks.length > 0 && (
        <p className="mb-4 text-[.8rem] lg:text-base text-slate-400">
          Total tasks: {incompletedTasks.length}
        </p>
      )}
      {incompletedTasks.length === 0 && (
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
          {incompletedTasks.map((task) => {
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
