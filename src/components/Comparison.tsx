import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export const Comparison: React.FC = () => {
  const traditional = [
    "Manual checking",
    "Keyword-focused",
    "Marks-focused",
    "Limited feedback",
    "Same feedback for everyone",
    "Difficult to identify learning gaps",
    "No automatic targeted practice"
  ];

  const edueval = [
    "AI-assisted evaluation",
    "Semantic understanding",
    "Concept-based grading",
    "Personalized feedback",
    "Learning-gap detection",
    "Targeted practice recommendations",
    "Evaluation insights at scale"
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1b34] mb-4">
          Traditional Grading vs EduEval AI
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {/* Traditional */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
        >
          <div className="text-center mb-8 pb-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-500 uppercase tracking-widest">Traditional Grading</h3>
          </div>
          <ul className="space-y-4">
            {traditional.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <X className="w-3 h-3 text-slate-400" />
                </div>
                <span className="text-slate-600 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* EduEval AI */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-[#087fbe] to-[#054b73] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#11b5e4]/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 text-center mb-8 pb-6 border-b border-white/10">
            <h3 className="text-lg font-bold text-white uppercase tracking-widest flex items-center justify-center gap-2">
              EduEval AI
            </h3>
          </div>
          <ul className="relative z-10 space-y-4">
            {edueval.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-[#11b5e4]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#11b5e4]" />
                </div>
                <span className="text-white font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
