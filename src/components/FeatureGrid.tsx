import React from "react";
import { motion } from "framer-motion";
import { PenTool, Brain, FileCheck, Sliders, MessageSquare, Target, BookOpen, BarChart3, TrendingUp, LayoutDashboard } from "lucide-react";

export const FeatureGrid: React.FC = () => {
  const features = [
    { icon: <PenTool />, title: "Handwritten Answer Evaluation", desc: "Process and transcribe handwritten student responses accurately." },
    { icon: <Brain />, title: "Semantic Answer Understanding", desc: "Analyze the true meaning of answers beyond simple keyword matching." },
    { icon: <FileCheck />, title: "Concept-Based Marking", desc: "Award marks based on the demonstration of specific core concepts." },
    { icon: <Sliders />, title: "Custom Marking Schemes", desc: "Easily configure expected answers, concepts, and weightage." },
    { icon: <MessageSquare />, title: "Personalized Feedback", desc: "Generate specific, constructive feedback for every student." },
    { icon: <Target />, title: "Learning Gap Detection", desc: "Automatically identify which concepts the student missed or misunderstood." },
    { icon: <BookOpen />, title: "Targeted Practice Questions", desc: "Recommend practice material tailored to individual weak points." },
    { icon: <BarChart3 />, title: "Evaluation Analytics", desc: "Gain deep insights into class-wide performance and concept mastery." },
    { icon: <TrendingUp />, title: "Student Performance Insights", desc: "Track individual student progress over time across various topics." },
    { icon: <LayoutDashboard />, title: "Teacher Dashboard", desc: "Manage submissions, review AI evaluations, and override grades if needed." }
  ];

  return (
    <section id="features-section" className="py-24 bg-[#f8f9ff] max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1b34] mb-4">
          Everything You Need for Better Evaluation
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 4) * 0.1, duration: 0.5 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] text-[#087fbe] flex items-center justify-center mb-4 [&>svg]:w-5 [&>svg]:h-5">
              {feature.icon}
            </div>
            <h3 className="font-bold text-[#0b1b34] mb-2">{feature.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
