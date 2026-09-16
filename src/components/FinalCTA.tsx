import React from "react";
import { ArrowRight, Play } from "lucide-react";

interface FinalCTAProps {
  onStartEvaluation: () => void;
  onViewDemo: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartEvaluation, onViewDemo }) => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd] rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#087fbe]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#11b5e4]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b1b34] mb-6 tracking-tight">
            Ready to Turn Your Answers Into Insights?
          </h2>
          <p className="text-lg text-[#0b1b34]/70 font-medium mb-10 max-w-2xl mx-auto">
            Upload your answer, understand your performance, and discover what to practice next.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onStartEvaluation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#087fbe] hover:bg-[#066192] text-white font-bold text-base py-4 px-8 rounded-xl shadow-lg shadow-[#087fbe]/25 transition-all"
            >
              <span>Start Evaluating</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onViewDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#0b1b34] font-bold text-base py-4 px-8 rounded-xl shadow-sm transition-all"
            >
              <Play className="w-4 h-4 text-[#087fbe]" fill="currentColor" />
              <span>See How It Works</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
