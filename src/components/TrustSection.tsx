import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Scale, Zap, ShieldCheck } from "lucide-react";

export const TrustSection: React.FC = () => {
  const items = [
    {
      icon: <BrainCircuit />,
      title: "SEMANTIC EVALUATION",
      desc: "Evaluate the meaning and concepts within an answer."
    },
    {
      icon: <Scale />,
      title: "TEACHER CONTROL",
      desc: "AI assists with evaluation, but educators always stay in control."
    },
    {
      icon: <Zap />,
      title: "LEARNING INSIGHTS",
      desc: "Turn marks into specific, actionable learning recommendations."
    },
    {
      icon: <ShieldCheck />,
      title: "SECURE DATA HANDLING",
      desc: "Privacy-first processing. Student answers are never used to train public models."
    }
  ];

  return (
    <section id="trust-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1b34] mb-4">
          Built for Meaningful Evaluation
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#087fbe] text-white flex items-center justify-center mb-6 [&>svg]:w-8 [&>svg]:h-8 shadow-lg shadow-[#087fbe]/20">
              {item.icon}
            </div>
            <h3 className="font-bold text-[#0b1b34] mb-3 tracking-wide">{item.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
