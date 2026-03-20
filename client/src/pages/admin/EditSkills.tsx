import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Edit2, X } from "lucide-react";
import { apiGetSkills, apiUpdateSkill, apiDeleteSkill, apiCreateSkill } from "../../utils/api.ts";
import { useAdminAuth } from "../../hooks/useAdminAuth.ts";

const EditSkills = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [skills, setSkills] = useState<any[]>([]);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const fetchSkills = async () => {
      try {
        const response = await apiGetSkills();
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [isAuthenticated, navigate]);

  const handleOpenModal = (skill: any = null) => {
    if (skill) {
      setEditingSkill({ ...skill });
    } else {
      setEditingSkill({
        name: "",
        level: 80,
        category: "Frontend",
        color: "#f472b6",
        order: skills.length,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleSaveSkill = async () => {
    setSaving(true);
    try {
      if (editingSkill._id) {
        await apiUpdateSkill(editingSkill._id, editingSkill);
        setSkills(prev => prev.map(s => s._id === editingSkill._id ? editingSkill : s));
      } else {
        const response = await apiCreateSkill(editingSkill);
        setSkills(prev => [...prev, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await apiDeleteSkill(id);
      setSkills(prev => prev.filter(s => s._id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="text-fuchsia-500 animate-spin" size={48} />
      </div>
    );
  }

  const categories = ["Frontend", "Backend", "Tools", "Other"];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-4xl font-bold text-white">Manage Skills</h1>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            Add New Skill
          </button>
        </div>

        <div className="space-y-12">
          {categories.map((category) => {
            const categorySkills = skills.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;

            return (
              <section key={category} className="glass p-8 rounded-2xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill._id}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl group hover:border-fuchsia-500/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-3 h-3 rounded-full shadow-lg"
                          style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}80` }}
                        />
                        <div>
                          <h3 className="text-white font-medium">{skill.name}</h3>
                          <span className="text-xs text-slate-500">{skill.level}% Proficiency</span>
                        </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleOpenModal(skill)}
                          className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-fuchsia-400 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill._id)}
                          className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Skill Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {editingSkill?._id ? "Edit Skill" : "Add New Skill"}
                </h2>
                <button onClick={handleCloseModal} className="p-2 text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Skill Name</label>
                  <input
                    type="text"
                    value={editingSkill?.name || ""}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                    placeholder="React, Node.js, etc."
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                    <select
                      value={editingSkill?.category || "Frontend"}
                      onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat} className="bg-slate-900">{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Proficiency (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingSkill?.level || 0}
                      onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Color Accent</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={editingSkill?.color || "#f472b6"}
                      onChange={(e) => setEditingSkill({ ...editingSkill, color: e.target.value })}
                      className="w-12 h-12 bg-transparent border-none cursor-pointer rounded-lg overflow-hidden"
                    />
                    <input
                      type="text"
                      value={editingSkill?.color || ""}
                      onChange={(e) => setEditingSkill({ ...editingSkill, color: e.target.value })}
                      className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                      placeholder="#hex-color"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/5 bg-slate-950/50 flex justify-end gap-4">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSkill}
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-2 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  Save Skill
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditSkills;
