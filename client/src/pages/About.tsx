import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { User, Code, Palette, Terminal, Globe, Award, Briefcase } from "lucide-react";
import { apiGetPageContent } from "../utils/api.ts";

export const About = () => {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
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
        console.error("Error fetching about content:", error);
      }
    };
    fetchContent();
  }, []);

  const bio = {
    name: content.bio?.name || "Abdus Samie Tahir",
    role: content.bio?.role || "Full Stack Developer",
    paragraph1: content.bio?.paragraph1 || "With over 5 years of experience in the industry, I've worked with startups and established companies to create innovative solutions.",
    paragraph2: content.bio?.paragraph2 || "My expertise lies in React, Three.js, and full-stack development.",
    paragraph3: content.bio?.paragraph3 || "I believe that code is a creative tool, and I use it to build interfaces that are not only functional but also visually stunning.",
    avatar: content.bio?.avatar || "https://picsum.photos/seed/developer/800/800"
  };

  const timeline = {
    job1_year: content.timeline?.job1_year || "2023 - Present",
    job1_role: content.timeline?.job1_role || "Senior Developer",
    job1_place: content.timeline?.job1_place || "Tech Solutions",
    job1_desc: content.timeline?.job1_desc || "Leading frontend development for complex web applications.",
    job2_year: content.timeline?.job2_year || "2021 - 2023",
    job2_role: content.timeline?.job2_role || "Full Stack Developer",
    job2_place: content.timeline?.job2_place || "Creative Agency",
    job2_desc: content.timeline?.job2_desc || "Built interactive 3D experiences for global brands.",
    job3_year: content.timeline?.job3_year || "2019 - 2021",
    job3_role: content.timeline?.job3_role || "Junior Developer",
    job3_place: content.timeline?.job3_place || "Startup Hub",
    job3_desc: content.timeline?.job3_desc || "Developed responsive UI components and backend APIs."
  };

  const stats = [
    { label: "Years Experience", value: "5+", icon: <Award className="text-fuchsia-500" /> },
    { label: "Projects Completed", value: "50+", icon: <Code className="text-purple-500" /> },
    { label: "Happy Clients", value: "30+", icon: <User className="text-emerald-500" /> },
    { label: "Countries Served", value: "10+", icon: <Globe className="text-amber-500" /> },
  ];

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader 
            title="About Me" 
            subtitle={`I'm ${bio.name}, a ${bio.role} dedicated to building high-quality digital experiences.`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-fuchsia-600/20 rounded-3xl blur-2xl group-hover:bg-fuchsia-600/30 transition-all duration-500" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={bio.avatar}
                  alt={bio.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                I bridge the gap between <span className="text-gradient">design</span> and <span className="text-gradient">technology</span>.
              </h3>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                {bio.paragraph1}
              </p>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                {bio.paragraph2}
              </p>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                {bio.paragraph3}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/5 group hover:bg-fuchsia-600/10 transition-colors">
                  <Palette className="text-fuchsia-500 mb-4" size={32} />
                  <h4 className="text-white font-bold mb-2">Design Focused</h4>
                  <p className="text-slate-500 text-sm">Pixel-perfect implementation.</p>
                </div>
                <div className="p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/5 group hover:bg-purple-600/10 transition-colors">
                  <Terminal className="text-purple-500 mb-4" size={32} />
                  <h4 className="text-white font-bold mb-2">Code Quality</h4>
                  <p className="text-slate-500 text-sm">Clean, modular, and scalable.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline Section */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold text-white mb-16 text-center">My <span className="text-gradient">Journey</span></h3>
            <div className="space-y-12 relative before:absolute before:left-0 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
              {[1, 2, 3].map((num, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] top-0 w-[10px] h-[10px] bg-fuchsia-600 rounded-full shadow-[0_0_10px_#c026d3]" />
                  <div className="md:w-1/2 pl-8 md:pl-0">
                    <div className={`p-8 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 hover:border-fuchsia-500/30 transition-all ${i % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                      <span className="text-fuchsia-500 font-bold mb-2 block">{timeline[`job${num}_year`]}</span>
                      <h4 className="text-xl font-bold text-white mb-1">{timeline[`job${num}_role`]}</h4>
                      <p className="text-slate-400 font-medium mb-4 flex items-center gap-2">
                        <Briefcase size={16} /> {timeline[`job${num}_place`]}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed">{timeline[`job${num}_desc`]}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-slate-900/30 backdrop-blur-sm rounded-3xl border border-white/5 text-center group hover:bg-fuchsia-600/5 transition-all hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <h4 className="text-4xl font-bold text-white mb-2 tracking-tight">{stat.value}</h4>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
