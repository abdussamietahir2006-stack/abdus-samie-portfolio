import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, Box, Search, Filter } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { ProjectCard } from "../components/ui/ProjectCard.tsx";
import { ProjectModal } from "../components/ui/ProjectModal.tsx";
import { ProjectsScene } from "../components/3d/ProjectsScene.tsx";
import { LoadingSpinner } from "../components/ui/LoadingSpinner.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { useProjects } from "../hooks/useProjects.ts";
import { Project } from "../types.ts";

export const Projects = () => {
  const { projects, loading } = useProjects();
  const [viewMode, setViewMode] = useState<"grid" | "3d">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const allTags = ["All", ...Array.from(new Set((Array.isArray(projects) ? projects : []).flatMap((p) => p.tags || [])))];

  const filteredProjects = (Array.isArray(projects) ? projects : []).filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag === "All" || project.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <SectionHeader 
              title="My Projects" 
              subtitle="A collection of my recent work, ranging from web apps to 3D experiences."
            />
            
            <div className="flex bg-slate-900/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 shadow-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm ${
                  viewMode === "grid" ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/20" : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutGrid size={18} />
                Grid View
              </button>
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm ${
                  viewMode === "3d" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20" : "text-slate-400 hover:text-white"
                }`}
              >
                <Box size={18} />
                3D View
              </button>
            </div>
          </div>

          {viewMode === "grid" && (
            <div className="mb-12 flex flex-col md:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all shadow-xl"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-6 py-4 rounded-2xl border transition-all font-bold text-sm ${
                      activeTag === tag 
                      ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 border-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20" 
                      : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : viewMode === "grid" ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project._id} 
                    project={project} 
                    onClick={() => setSelectedProject(project)} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <ProjectsScene 
              projects={projects} 
              onProjectClick={(p) => setSelectedProject(p)} 
            />
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-xl">No projects found matching your criteria.</p>
            </div>
          )}
        </div>

        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </section>
    </PageTransition>
  );
};
