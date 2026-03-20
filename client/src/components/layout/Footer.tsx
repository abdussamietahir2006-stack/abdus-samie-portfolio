import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Code2, Heart } from "lucide-react";
import { SOCIALS, NAV_LINKS } from "../../utils/constants.ts";
import { apiGetPageContent } from "../../utils/api.ts";

export const Footer = () => {
  const [content, setContent] = useState<any>({});

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
        console.error("Error fetching footer content:", error);
      }
    };
    fetchContent();
  }, []);

  const navbar = content.navbar || {
    name: "Abdus Samie Tahir",
    subheading: "(RMAST)",
    logo: "https://picsum.photos/seed/abdul/100/100"
  };

  const footer = content.footer || {
    bio: "Building digital experiences that combine technical precision with creative design. Let's build something extraordinary together.",
    email: "hello@portfolio.com",
    location: "San Francisco, CA",
    availability: "Open for new projects"
  };

  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-6 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-fuchsia-500/50 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-fuchsia-500/20">
              <img 
                src={navbar.logo} 
                alt={navbar.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight leading-none">{navbar.name}</span>
              <span className="text-[10px] font-bold text-fuchsia-500 tracking-[0.2em] mt-1">{navbar.subheading}</span>
            </div>
          </Link>
          <p className="text-slate-400 max-w-md text-lg leading-relaxed mb-8">
            {footer.bio}
          </p>
          <div className="flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-fuchsia-600 transition-all hover:-translate-y-1 border border-white/5"
              >
                {social.name === "GitHub" && <Github size={20} />}
                {social.name === "LinkedIn" && <Linkedin size={20} />}
                {social.name === "Twitter" && <Twitter size={20} />}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-slate-400 hover:text-fuchsia-400 transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Contact Info</h4>
          <ul className="flex flex-col gap-4">
            <li className="text-slate-400 text-sm">
              <span className="block text-white font-medium mb-1">Email</span>
              {footer.email}
            </li>
            <li className="text-slate-400 text-sm">
              <span className="block text-white font-medium mb-1">Location</span>
              {footer.location}
            </li>
            <li className="text-slate-400 text-sm">
              <span className="block text-white font-medium mb-1">Availability</span>
              {footer.availability}
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} {navbar.name}. ALL RIGHTS RESERVED.
        </p>
        <p className="text-slate-500 text-sm flex items-center gap-1 font-mono">
          MADE WITH <Heart size={14} className="text-red-500 fill-red-500" /> BY CREATIVE DEV
        </p>
      </div>
    </footer>
  );
};
