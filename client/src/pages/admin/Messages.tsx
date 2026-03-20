import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, Mail, User, Calendar, ArrowLeft, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { apiGetContacts, apiDeleteContact } from "../../utils/api.ts";

const Messages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await apiGetContacts();
      setMessages(response.data);
    } catch (err) {
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await apiDeleteContact(id);
      setMessages(messages.filter((m) => m._id !== id));
    } catch (err) {
      alert("Failed to delete message");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard" className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Messages</h1>
              <p className="text-slate-400">View inquiries from your contact form</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full text-fuchsia-400 text-sm font-bold">
            {messages.length} Total
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare size={48} className="text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">No messages yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass p-8 rounded-2xl border border-white/10 group hover:border-fuchsia-500/30 transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-fuchsia-400 font-bold">
                          <User size={16} />
                          {msg.name}
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Mail size={16} />
                          {msg.email}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Calendar size={16} />
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-white leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
