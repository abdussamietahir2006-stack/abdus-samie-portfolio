import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { sendContact, apiGetPageContent } from "../utils/api.ts";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiGetPageContent("contact");
        const contentMap = response.data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setContent(contentMap);
      } catch (error) {
        console.error("Error fetching contact content:", error);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContact(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const contactInfo = [
    { icon: <Mail size={24} />, label: "Email", value: content.email || "hello@portfolio.com", color: "bg-blue-500/10 text-blue-400" },
    { icon: <Phone size={24} />, label: "Phone", value: content.phone || "+1 (555) 123-4567", color: "bg-emerald-500/10 text-emerald-400" },
    { icon: <MapPin size={24} />, label: "Location", value: content.location || "San Francisco, CA", color: "bg-amber-500/10 text-amber-400" },
  ];

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader 
            title={content.title || "Get In Touch"} 
            subtitle={content.subtitle || "Have a project in mind? Let's discuss how we can build something extraordinary together."}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 leading-tight">
                {content.heading || "Let's start a conversation."}
              </h3>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                {content.description || "I'm always open to new opportunities, collaborations, and interesting projects. Whether you have a specific project in mind or just want to say hello, feel free to reach out."}
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-6 p-6 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 group hover:bg-fuchsia-600/10 transition-all">
                    <div className={`p-4 rounded-2xl ${info.color} group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{info.label}</h4>
                      <p className="text-slate-400">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-12 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
            >
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-6 text-emerald-500">
                    <CheckCircle size={64} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-slate-400 mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/20"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2 ml-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2 ml-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 ml-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-800/50 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20">
                      <AlertCircle size={20} />
                      <p className="text-sm font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold rounded-2xl hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
