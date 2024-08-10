import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function TabButton({ children, menu, ...props }) {
  const uiState = useSelector((state) => state.ui);
  return (
    <>
      <motion.button className="px-3 py-1 rounded relative" {...props}>
        {uiState === menu && (
          <motion.div
            layoutId="tabMenu"
            className="absolute bg-emerald-600 hover:bg-emerald-700 inset-0 rounded "
          />
        )}
        {children}
      </motion.button>
    </>
  );
}
