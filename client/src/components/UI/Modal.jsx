import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ children, onClose, ...props }) {
  return createPortal(
    <>
      <motion.div
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0.35 } },
          exit: { opacity: 0 },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-black/50 fixed inset-0 z-10"
        onClick={onClose}
      />
      <motion.dialog
        variants={{
          initial: { y: 100, opacity: 0 },
          animate: { y: 0, opacity: 1, transition: { duration: 0.35 } },
          exit: { y: -100, opacity: 0, transition: { duration: 0.2 } },
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        className="z-20 mt-32 p-4 bg-emerald-800 rounded text-slate-100 w-11/12 md:w-1/2 lg:w-1/3"
        open
        onClose={onClose}
        {...props}
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal-root")
  );
}
