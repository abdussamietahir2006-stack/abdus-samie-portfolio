import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { SkillsOrb } from "../components/3d/SkillsOrb.tsx";
import { SkillBar } from "../components/ui/SkillBar.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { apiGetSkills } from "../utils/api.ts";

export const Skills = () => {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await apiGetSkills();
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const categories = ["Frontend", "Backend", "Tools", "Other"];

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SectionHeader 
            title="My Skills" 
            subtitle="I've mastered a diverse set of technologies to build modern, high-performance web applications."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 leading-tight">
                Technical <span className="text-gradient">Expertise</span> & <br />
                Creative Problem Solving.
              </h3>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                I specialize in building interactive 3D experiences and scalable full-stack applications. 
                My workflow is focused on clean code, performance optimization, and user-centric design.
              </p>

              <div className="space-y-12">
                {categories.map((category, index) => {
                  const categorySkills = skills.filter(s => s.category === category);
                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category}>
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center text-xs font-mono">0{index + 1}</span>
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                        {categorySkills.map((skill) => (
                          <SkillBar key={skill._id} name={skill.name} level={skill.level} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-fuchsia-600/10 rounded-full blur-3xl" />
              <SkillsOrb />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 text-center group hover:bg-fuchsia-600/10 transition-all hover:-translate-y-2">
              <h4 className="text-2xl font-bold text-white mb-4">Architecture</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Designing scalable and maintainable system architectures using modern patterns and best practices.
              </p>
            </div>
            <div className="p-8 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 text-center group hover:bg-purple-600/10 transition-all hover:-translate-y-2">
              <h4 className="text-2xl font-bold text-white mb-4">3D Interaction</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Creating immersive 3D environments and interactive elements using Three.js and React Three Fiber.
              </p>
            </div>
            <div className="p-8 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 text-center group hover:bg-emerald-600/10 transition-all hover:-translate-y-2">
              <h4 className="text-2xl font-bold text-white mb-4">Full-Stack</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Building robust backends and seamless frontends that work together to deliver high-quality user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
