import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Save, ArrowLeft, Globe, Layout, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { apiGetPageContent, apiUpdateContent } from "../../utils/api.ts";
import ImageUpload from "../../components/admin/ImageUpload.tsx";

const EditGlobal = () => {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await apiGetPageContent("global");
      setContent(response.data);
    } catch (err) {
      console.error("Error fetching global content:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section: string, key: string, value: string) => {
    setContent((prev) =>
      prev.map((item) =>
        item.section === section && item.key === key ? { ...item, value } : item
      )
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      for (const item of content) {
        await apiUpdateContent(item);
      }
      setMessage("Global content updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to update content.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
      </div>
    );
  }

  const sections = ["navbar", "footer"];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Global Content</h1>
              <p className="text-slate-400">Update Navbar and Footer information</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-fuchsia-500/20"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-8 text-center font-bold ${
              message.includes("success") ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
            }`}
          >
            {message}
          </motion.div>
        )}

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section} className="glass p-8 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-fuchsia-500/10 rounded-lg text-fuchsia-500">
                  {section === "navbar" ? <Globe size={24} /> : <Layout size={24} />}
                </div>
                <h2 className="text-2xl font-bold text-white capitalize">{section} Settings</h2>
              </div>

              <div className="grid gap-8">
                {content
                  .filter((item) => item.section === section)
                  .map((item) => (
                    <div key={item.key}>
                      <label className="block text-sm font-medium text-slate-400 mb-3 capitalize">
                        {item.key.replace(/_/g, " ")}
                      </label>
                      {item.type === "image" ? (
                        <div className="space-y-4">
                          <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                            <img src={item.value} alt={item.key} className="w-full h-full object-cover" />
                          </div>
                          <ImageUpload
                            onUploadSuccess={(url) => handleChange(item.section, item.key, url)}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => handleChange(item.section, item.key, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditGlobal;
