import { motion } from "motion/react";
import { useMousePosition } from "../../hooks/useMousePosition.ts";

export const Cursor = () => {
  const { x, y } = useMousePosition();

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-fuchsia-500 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: x - 16, y: y - 16 }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-fuchsia-500 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: x - 4, y: y - 4 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.2 }}
      />
    </>
  );
};
