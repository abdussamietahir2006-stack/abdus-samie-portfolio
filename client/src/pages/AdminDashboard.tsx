import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { LogOut, Home, User, Briefcase, Cpu, Mail, Globe, MessageSquare } from "lucide-react";
import { useAdminAuth } from "../hooks/useAdminAuth.ts";

const AdminDashboard = () => {
  const { logout } = useAdminAuth();

  const pages = [
    {
      name: "Home",
      path: "/admin/edit/home",
      icon: <Home className="text-fuchsia-500" />,
      description: "Edit hero section, headings, and stats.",
    },
    {
      name: "About",
      path: "/admin/edit/about",
      icon: <User className="text-purple-500" />,
      description: "Update bio, role, and professional timeline.",
    },
    {
      name: "Projects",
      path: "/admin/edit/projects",
      icon: <Briefcase className="text-emerald-500" />,
      description: "Manage your portfolio projects and case studies.",
    },
    {
      name: "Skills",
      path: "/admin/edit/skills",
      icon: <Cpu className="text-amber-500" />,
      description: "Update your technical skills and expertise levels.",
    },
    {
      name: "Contact",
      path: "/admin/edit/contact",
      icon: <Mail className="text-indigo-500" />,
      description: "Manage contact information and availability status.",
    },
    {
      name: "Global",
      path: "/admin/edit/global",
      icon: <Globe className="text-pink-500" />,
      description: "Edit Navbar logo, name, and Footer information.",
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <MessageSquare className="text-cyan-500" />,
      description: "View and manage messages sent from the contact form.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your website content and projects</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pages.map((page, index) => (
            <motion.div
              key={page.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="glass p-8 rounded-2xl border border-white/10 h-full flex flex-col hover:border-fuchsia-500/30 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {page.icon}
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{page.name}</h2>
                <p className="text-slate-400 mb-8 flex-grow">{page.description}</p>
                <Link
                  to={page.path}
                  className="inline-flex items-center text-fuchsia-400 font-bold hover:text-fuchsia-300 transition-colors"
                >
                  Edit Page →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
