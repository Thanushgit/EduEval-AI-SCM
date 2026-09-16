import React from "react";
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="w-full py-20 px-4 sm:px-6 relative z-10 bg-[#f8fbff]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-[#0284c7] font-bold text-sm tracking-[0.2em] uppercase mb-4">
            About EduEval AI
          </div>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-[#0b192c] mb-6 tracking-tight">
            Built For Better Learning
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto font-medium">
            EduEval AI connects intelligent evaluation with meaningful academic improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: For Students */}
          <div className="group relative bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-white transition-all text-left overflow-hidden">
            <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[#0284c7] to-[#00d2ff] rounded-r opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 rounded-xl bg-white border border-[#bae6fd] flex items-center justify-center text-[#0284c7] shadow-sm mb-6 group-hover:scale-110 group-hover:bg-[#f0f9ff] transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0b192c] mb-3 tracking-tight">
              For Students
            </h3>
            <p className="text-[#475569] text-sm leading-relaxed">
              Understand your performance, identify weak concepts, practise targeted questions and monitor your academic growth.
            </p>
          </div>

          {/* Card 2: For Teachers */}
          <div className="group relative bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-white transition-all text-left overflow-hidden">
            <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[#0284c7] to-[#00d2ff] rounded-r opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 rounded-xl bg-white border border-[#bae6fd] flex items-center justify-center text-[#0284c7] shadow-sm mb-6 group-hover:scale-110 group-hover:bg-[#f0f9ff] transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0b192c] mb-3 tracking-tight">
              For Teachers
            </h3>
            <p className="text-[#475569] text-sm leading-relaxed">
              Get useful insights into student performance, identify common problem areas and understand class-level learning patterns.
            </p>
          </div>

          {/* Card 3: AI Powered */}
          <div className="group relative bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-white transition-all text-left overflow-hidden">
            <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[#f472b6] to-[#ec4899] rounded-r opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 rounded-xl bg-white border border-[#fbcfe8] flex items-center justify-center text-[#ec4899] shadow-sm mb-6 group-hover:scale-110 group-hover:bg-[#fdf2f8] transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0b192c] mb-3 tracking-tight">
              AI Powered
            </h3>
            <p className="text-[#475569] text-sm leading-relaxed">
              Transform evaluation results into useful feedback instead of simply giving students a score.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
