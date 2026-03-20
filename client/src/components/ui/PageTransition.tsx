import { motion } from "motion/react";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="w-full relative">
      {/* Transition Curtain (Loading Effect) */}
      <motion.div
        className="fixed inset-0 bg-slate-950 z-[9999] origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      
      {/* Secondary Accent Curtain */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-t from-fuchsia-600 via-purple-600 to-indigo-600 z-[9998] origin-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      />

      {/* Page Content - Opens from the top */}
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
