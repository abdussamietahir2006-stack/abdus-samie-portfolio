import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../../types.ts";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
      className="group bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
      onClick={onClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
        
        <div className="absolute top-4 right-4 flex gap-2">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-fuchsia-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={18} />
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-fuchsia-500 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-fuchsia-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-mono rounded-full border border-fuchsia-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
