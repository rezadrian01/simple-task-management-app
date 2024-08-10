import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function TabButton({ children, menu, ...props }) {
  const uiState = useSelector((state) => state.ui);
  let btnClass = `${
    uiState === menu ? "bg-emerald-600" : null
  } px-3 py-1 rounded`;
  return (
    <>
      <motion.button className={btnClass} {...props}>
        {children}
      </motion.button>
    </>
  );
}
