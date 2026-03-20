import { useState } from "react";
import { motion } from "motion/react";
import { Plus, Trash2, LogOut, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { useProjects } from "../hooks/useProjects.ts";
import { apiGetProjects, apiCreateProject, apiDeleteProject } from "../utils/api.ts";

export const Admin = () => {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const { projects, setProjects, loading } = useProjects();
  
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    liveLink: "",
    githubLink: "",
    tags: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === (process.env.ADMIN_PIN || "1234")) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tagsArray = newProject.tags.split(",").map((tag) => tag.trim());
      const { data } = await apiCreateProject({ ...newProject, tags: tagsArray });
      setProjects([data, ...projects]);
      setNewProject({ title: "", description: "", image: "", liveLink: "", githubLink: "", tags: "" });
    } catch (err) {
      setError("Failed to add project.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await apiDeleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete project.");
    }
  };

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <section className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-12 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-fuchsia-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 text-fuchsia-500">
              <Lock size={40} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Admin Access</h2>
            <p className="text-slate-400 mb-8 font-medium">Please enter your secret PIN to continue.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-6 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white text-center text-2xl tracking-[1em] focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                placeholder="••••"
                maxLength={4}
              />
              {error && (
                <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-bold">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold rounded-2xl hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/20"
              >
                Unlock Dashboard
              </button>
            </form>
          </motion.div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <SectionHeader title="Admin Dashboard" subtitle="Manage your projects and view messages." />
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Add Project Form */}
            <div className="lg:col-span-1">
              <div className="p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl sticky top-32">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Plus className="text-fuchsia-500" />
                  Add Project
                </h3>
                <form onSubmit={handleAddProject} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2 ml-2">Title</label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-6 py-3 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 ml-2">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-6 py-3 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 ml-2">Image URL</label>
                    <input
                      type="text"
                      required
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      className="w-full px-6 py-3 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2 ml-2">Live Link</label>
                      <input
                        type="text"
                        required
                        value={newProject.liveLink}
                        onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
                        className="w-full px-6 py-3 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2 ml-2">GitHub Link</label>
                      <input
                        type="text"
                        required
                        value={newProject.githubLink}
                        onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                        className="w-full px-6 py-3 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 ml-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      required
                      value={newProject.tags}
                      onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                      className="w-full px-6 py-3 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                      placeholder="React, Three.js, Node.js"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold rounded-2xl hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/20"
                  >
                    Create Project
                  </button>
                </form>
              </div>
            </div>

            {/* Project List */}
            <div className="lg:col-span-2">
              <div className="p-8 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-8">Existing Projects</h3>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className="flex items-center gap-6 p-6 bg-slate-800/30 rounded-2xl border border-white/5 group hover:bg-slate-800/50 transition-all"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-24 h-24 rounded-xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-1">{project.title}</h4>
                        <p className="text-slate-500 text-sm line-clamp-1">{project.description}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="p-4 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="text-center py-12 text-slate-500 font-medium">
                      No projects found. Add your first project!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
