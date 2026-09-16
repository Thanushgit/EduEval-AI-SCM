import React from "react";
import { motion } from "framer-motion";

export const WhyEduEval: React.FC = () => {
  const cards = [
    {
      num: "01",
      title: "SEMANTIC EVALUATION",
      desc: "Understand meaning, not just keywords."
    },
    {
      num: "02",
      title: "CONCEPT-BASED GRADING",
      desc: "Evaluate what students actually understand."
    },
    {
      num: "03",
      title: "PERSONALIZED FEEDBACK",
      desc: "Explain mistakes and show how to improve."
    },
    {
      num: "04",
      title: "TARGETED PRACTICE",
      desc: "Practice exactly what needs improvement."
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1b34] mb-4">
          More Than Marks. Better Learning.
        </h2>
        <p className="text-lg text-slate-500 font-medium">
          Every evaluation should help students understand what they know, what they missed, and what to learn next.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#087fbe]/30 transition-all duration-300 group flex flex-col"
          >
            <div className="text-4xl font-black text-[#f0f7ff] group-hover:text-[#e0f2fe] transition-colors mb-6">
              {card.num}
            </div>
            <h3 className="text-lg font-bold text-[#0b1b34] tracking-wide mb-3 uppercase">
              {card.title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
