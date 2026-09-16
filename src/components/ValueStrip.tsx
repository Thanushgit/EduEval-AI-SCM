import React from "react";
import { motion } from "framer-motion";
import { Brain, FileCheck, MessageSquare, Target } from "lucide-react";

export const ValueStrip: React.FC = () => {
  const values = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Semantic Evaluation",
      desc: "Understand meaning, not just keywords."
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      title: "Concept-Based Grading",
      desc: "Evaluate what students actually understand."
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Personalized Feedback",
      desc: "Explain mistakes and how to improve."
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Targeted Practice",
      desc: "Practice exactly what needs improvement."
    }
  ];

  return (
    <section className="border-y border-slate-200/60 bg-white/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {values.map((val, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
              className={`flex flex-col gap-2 ${idx !== 0 ? 'sm:pl-6 lg:pl-8 pt-6 sm:pt-0' : ''}`}
            >
              <div className="text-[#087fbe] bg-[#e0f2fe] w-10 h-10 rounded-xl flex items-center justify-center mb-1">
                {val.icon}
              </div>
              <h3 className="font-bold text-[#0b1b34] text-sm uppercase tracking-wide">{val.title}</h3>
              <p className="text-slate-500 text-sm font-medium">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
