import React from "react";
import { FileSignature, Search, BookOpen, TrendingUp, BarChart3, Lightbulb } from "lucide-react";

interface FeatureCardsProps {
  onSelectFeature?: (feature: string) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onSelectFeature }) => {
  const features = [
    {
      id: "ai-eval",
      icon: <FileSignature className="w-6 h-6" />,
      title: "AI Evaluation",
      description: "Evaluate academic submissions and generate meaningful performance insights."
    },
    {
      id: "weak-area",
      icon: <Search className="w-6 h-6" />,
      title: "Weak Area Detection",
      description: "Identify concepts and topics that need additional attention."
    },
    {
      id: "targeted-practice",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Targeted Practice",
      description: "Practise questions based specifically on areas where improvement is needed."
    },
    {
      id: "progress",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Monitor academic progress and see how performance changes over time."
    },
    {
      id: "teacher",
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Teacher Analytics",
      description: "Teachers can understand individual and class-level performance."
    },
    {
      id: "feedback",
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Personalized Feedback",
      description: "Turn evaluation results into actionable learning suggestions."
    }
  ];

  return (
    <section id="features-section" className="w-full py-20 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#0b192c] mb-4 tracking-tight">
            EduEval AI Features
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto font-medium">
            Everything designed around one goal: helping students learn better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => onSelectFeature?.(feature.id)}
              className="group bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-white transition-all cursor-pointer text-left overflow-hidden relative"
            >
              {/* Hover Accent Line */}
              <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[#0284c7] to-[#00d2ff] rounded-r opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-12 h-12 rounded-xl bg-white border border-[#bae6fd] flex items-center justify-center text-[#0284c7] shadow-sm mb-6 group-hover:scale-110 group-hover:bg-[#f0f9ff] transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl text-[#0b192c] mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

