import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { apiGetPageContent, apiUpdateContent } from "../../utils/api.ts";
import { useAdminAuth } from "../../hooks/useAdminAuth.ts";
import ImageUpload from "../../components/admin/ImageUpload.tsx";

const EditAbout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const fetchContent = async () => {
      try {
        const response = await apiGetPageContent("about");
        const transformed = response.data.reduce((acc: any, item: any) => {
          if (!acc[item.section]) acc[item.section] = {};
          acc[item.section][item.key] = item.value;
          return acc;
        }, {});
        setContent(transformed);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [isAuthenticated, navigate]);

  const handleChange = (section: string, key: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const promises = [];
      for (const section in content) {
        for (const key in content[section]) {
          promises.push(
            apiUpdateContent({
              page: "about",
              section,
              key,
              value: content[section][key],
              type: key === "avatar" ? "image" : "text",
            })
          );
        }
      }
      await Promise.all(promises);
      alert("All changes saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="text-fuchsia-500 animate-spin" size={48} />
      </div>
    );
  }

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
            <h1 className="text-4xl font-bold text-white">Edit About Page</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save All Changes
          </button>
        </div>

        <div className="space-y-12">
          {/* Bio Section */}
          <section className="glass p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">Bio Section</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
                  <input
                    type="text"
                    value={content.bio?.name || ""}
                    onChange={(e) => handleChange("bio", "name", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Role / Title</label>
                  <input
                    type="text"
                    value={content.bio?.role || ""}
                    onChange={(e) => handleChange("bio", "role", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Bio Paragraph 1</label>
                <textarea
                  rows={3}
                  value={content.bio?.paragraph1 || ""}
                  onChange={(e) => handleChange("bio", "paragraph1", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Bio Paragraph 2</label>
                <textarea
                  rows={3}
                  value={content.bio?.paragraph2 || ""}
                  onChange={(e) => handleChange("bio", "paragraph2", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Bio Paragraph 3</label>
                <textarea
                  rows={3}
                  value={content.bio?.paragraph3 || ""}
                  onChange={(e) => handleChange("bio", "paragraph3", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
                />
              </div>
              <ImageUpload
                label="Avatar Image"
                currentImage={content.bio?.avatar}
                onUploadSuccess={(url) => handleChange("bio", "avatar", url)}
              />
            </div>
          </section>

          {/* Timeline Section */}
          <section className="glass p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">Timeline Section</h2>
            <div className="space-y-12">
              {[1, 2, 3].map((num) => (
                <div key={num} className="space-y-6 p-6 bg-white/5 rounded-xl border border-white/5">
                  <h3 className="text-lg font-bold text-slate-300">Job {num}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Year</label>
                      <input
                        type="text"
                        value={content.timeline?.[`job${num}_year`] || ""}
                        onChange={(e) => handleChange("timeline", `job${num}_year`, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Role</label>
                      <input
                        type="text"
                        value={content.timeline?.[`job${num}_role`] || ""}
                        onChange={(e) => handleChange("timeline", `job${num}_role`, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Place</label>
                      <input
                        type="text"
                        value={content.timeline?.[`job${num}_place`] || ""}
                        onChange={(e) => handleChange("timeline", `job${num}_place`, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={content.timeline?.[`job${num}_desc`] || ""}
                      onChange={(e) => handleChange("timeline", `job${num}_desc`, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditAbout;
