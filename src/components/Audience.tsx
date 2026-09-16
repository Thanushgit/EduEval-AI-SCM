import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Users, Building2 } from "lucide-react";

export const Audience: React.FC = () => {
  const audiences = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      tag: "STUDENTS",
      headline: "Know Why You Lost Marks.",
      desc: "Understand your mistakes, identify learning gaps, and receive personalized practice.",
      cta: "Evaluate My Answer"
    },
    {
      icon: <Users className="w-8 h-8" />,
      tag: "EDUCATORS",
      headline: "Spend Less Time Grading.",
      desc: "Get AI-assisted evaluation, custom marking schemes, and deeper insights into student understanding.",
      cta: "Explore Educator Tools"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      tag: "INSTITUTIONS",
      headline: "Scale Meaningful Assessment.",
      desc: "Enable centralized evaluation, standardized marking, and institution-wide learning outcome analytics.",
      cta: "Request a Demo"
    }
  ];

  return (
    <section id="audience-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {audiences.map((aud, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            className="bg-white rounded-[32px] p-10 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-[#087fbe]/10 transition-all duration-300 flex flex-col group relative overflow-hidden"
          >
            {/* Soft background hover effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7ff]/0 to-[#f0f7ff]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-[#f0f7ff] text-[#087fbe] flex items-center justify-center mb-8">
                {aud.icon}
              </div>
              <div className="text-xs font-bold text-[#087fbe] uppercase tracking-widest mb-3">
                {aud.tag}
              </div>
              <h3 className="text-2xl font-bold text-[#0b1b34] leading-tight mb-4">
                {aud.headline}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                {aud.desc}
              </p>
              <button className="inline-flex items-center gap-2 text-sm font-bold text-[#0b1b34] group-hover:text-[#087fbe] transition-colors">
                <span>{aud.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
