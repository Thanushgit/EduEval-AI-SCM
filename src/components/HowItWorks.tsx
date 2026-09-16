import React from "react";
import { motion } from "framer-motion";
import { Upload, BrainCircuit, CheckCircle, TrendingUp } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: <Upload className="w-6 h-6" />,
      title: "UPLOAD",
      desc: "Upload a handwritten answer or exam sheet."
    },
    {
      num: "02",
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "ANALYZE",
      desc: "AI understands the answer semantically and identifies the key concepts."
    },
    {
      num: "03",
      icon: <CheckCircle className="w-6 h-6" />,
      title: "EVALUATE",
      desc: "Receive marks, concept-level analysis, strengths, weaknesses, and feedback."
    },
    {
      num: "04",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "IMPROVE",
      desc: "Practice targeted questions based on your learning gaps."
    }
  ];

  return (
    <section id="how-it-works-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1b34] mb-4">
          From Answer to Learning Insight
        </h2>
        <p className="text-lg text-slate-500 font-medium">
          EduEval AI transforms every submitted answer into actionable feedback.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-[#087fbe]/30 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                <div className="absolute top-2 left-2 text-[10px] font-black text-slate-300">
                  {step.num}
                </div>
                <div className="text-[#087fbe] bg-[#f0f7ff] p-4 rounded-2xl">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-[#0b1b34] tracking-wide mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[250px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
