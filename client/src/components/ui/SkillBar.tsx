import { motion } from "motion/react";

interface SkillBarProps {
  name: string;
  level: number;
}

export const SkillBar = ({ name, level }: SkillBarProps) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-fuchsia-400 font-mono text-sm">{level}%</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 rounded-full shadow-lg shadow-fuchsia-500/20"
        />
      </div>
    </div>
  );
};
