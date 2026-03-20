import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Code2 } from "lucide-react";
import { NAV_LINKS } from "../../utils/constants.ts";
import { apiGetPageContent } from "../../utils/api.ts";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [content, setContent] = useState<any>({});
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiGetPageContent("global");
        const transformed = response.data.reduce((acc: any, item: any) => {
          if (!acc[item.section]) acc[item.section] = {};
          acc[item.section][item.key] = item.value;
          return acc;
        }, {});
        setContent(transformed);
      } catch (error) {
        console.error("Error fetching navbar content:", error);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navbar = content.navbar || {
    name: "Abdus Samie Tahir",
    subheading: "(RMAST)",
    logo: "https://picsum.photos/seed/abdul/100/100"
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[5000] transition-all duration-500 ${
        scrolled ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 group">
          <Link to="/" className="w-10 h-10 rounded-xl overflow-hidden border-2 border-fuchsia-500/50 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-fuchsia-500/20">
            <img 
              src={navbar.logo} 
              alt={navbar.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </Link>
          <Link to="/admin/login" className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight leading-none">{navbar.name}</span>
            <span className="text-[10px] font-bold text-fuchsia-500 tracking-[0.2em] mt-1">{navbar.subheading}</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-fuchsia-400 ${
                location.pathname === link.path ? "text-fuchsia-500" : "text-slate-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-6 py-2.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-sm font-bold rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-lg shadow-fuchsia-500/20 hover:scale-105 active:scale-95"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/5 rounded-xl transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-2xl font-bold transition-colors ${
                    location.pathname === link.path ? "text-fuchsia-500" : "text-slate-400"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-center font-bold rounded-2xl shadow-lg shadow-fuchsia-500/20"
              >
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
