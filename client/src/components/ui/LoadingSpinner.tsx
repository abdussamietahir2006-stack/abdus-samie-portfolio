import { motion } from "motion/react";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full shadow-lg shadow-fuchsia-500/10"
      />
    </div>
  );
};
