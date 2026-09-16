import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, AlertTriangle, XCircle, BrainCircuit, Lightbulb, BookOpen } from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface HeroProps {
  onStartEvaluation: () => void;
  onViewDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartEvaluation, onViewDemo }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-8 pb-12 sm:pt-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-col lg:flex-row items-center gap-12"
    >
      {/* Decorative ambient backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[650px] h-[320px] bg-gradient-to-r from-[#0284c7]/5 via-[#00d2ff]/10 to-[#0369a1]/5 blur-3xl -z-10 pointer-events-none" />
      
      {/* Left Column: Text & CTAs */}
      <div className="flex-1 text-left lg:pr-4">
        {/* Eyebrow */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] text-sm font-bold text-[#087fbe] mb-6 uppercase tracking-wider shadow-sm"
        >
          <BrainCircuit className="w-4 h-4" />
          <span>AI-Powered Semantic & Concept-Based Evaluation</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-heading font-extrabold text-[40px] sm:text-[48px] md:text-[56px] xl:text-[64px] leading-[1.1] text-[#0b1b34] tracking-tight mb-5"
        >
          Turn Every Answer Into a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#087fbe] via-[#11b5e4] to-[#087fbe]">
            Learning Opportunity.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-8 font-medium max-w-2xl"
        >
          AI-powered evaluation of handwritten exam answers with concept-based grading, personalized feedback, and targeted practice.
        </motion.p>

        {/* Action CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <button
            id="btn-hero-start-eval"
            onClick={onStartEvaluation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#087fbe] to-[#066192] hover:from-[#066192] hover:to-[#044a70] active:scale-[0.98] text-white font-bold text-base py-3.5 px-8 rounded-xl shadow-lg shadow-[#087fbe]/25 transition-all cursor-pointer"
          >
            <span>Start Evaluation</span>
            <ArrowRight className="w-4 h-4 text-[#11b5e4]" />
          </button>
          <button
            id="btn-hero-view-demo"
            onClick={onViewDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#f0f7ff] active:scale-[0.98] text-[#0b1b34] border border-[#cbdff5] hover:border-[#087fbe] font-bold text-base py-3.5 px-8 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <Play className="w-4 h-4 fill-current text-[#087fbe]" />
            <span>See How It Works</span>
          </button>
        </motion.div>

        {/* Trust Line */}
        <motion.div
          variants={itemVariants}
          className="text-sm font-medium text-slate-500 pt-6 border-t border-slate-200/80"
        >
          Upload an answer. Understand your performance. Know what to improve next.
        </motion.div>
      </div>

      {/* Right Column: Floating Product Dashboard */}
      <motion.div 
        variants={itemVariants} 
        className="flex-1 w-full relative max-w-lg lg:max-w-xl mx-auto"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative bg-white rounded-[24px] border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(8,127,190,0.15)] overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <EduEvalLogo size={20} showGlow={false} variant="icon" />
              <span className="text-sm font-bold text-[#0b1b34]">Evaluation Results</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            </div>
          </div>

          <div className="p-5 flex flex-col gap-4">
            {/* Top row: Answer & Score */}
            <div className="flex gap-4 items-start">
              {/* Handwritten Answer */}
              <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-xs font-bold text-slate-400 mb-2 tracking-wider uppercase">Student Answer</div>
                <div className="font-[Caveat,cursive] text-lg text-slate-700 leading-tight bg-white p-3 rounded-lg border border-slate-200 shadow-sm relative">
                  <span className="bg-[#11b5e4]/20 rounded px-1">Photosynthesis</span> is the process where plants use sunlight to make food.
                  It happens in the <span className="bg-[#11b5e4]/20 rounded px-1">chloroplasts</span>.
                </div>
              </div>

              {/* Score summary */}
              <div className="w-32 flex-shrink-0 bg-gradient-to-b from-white to-slate-50 rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                <div className="text-xs font-bold text-slate-400 mb-1 uppercase text-center">Score</div>
                <div className="text-3xl font-black text-[#0b1b34]">
                  7.5<span className="text-base text-slate-400 font-medium">/10</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-[#087fbe] h-full w-[75%]" />
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Concept", val: "82%" },
                { label: "Accuracy", val: "76%" },
                { label: "Completeness", val: "68%" }
              ].map((m, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-lg p-2 text-center shadow-sm">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{m.label}</div>
                  <div className="text-sm font-bold text-[#087fbe] mt-0.5">{m.val}</div>
                </div>
              ))}
            </div>

            {/* Concept Analysis */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Concept Analysis</div>
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Main concept understood
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Definition understood
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Application needs improvement
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <XCircle className="w-4 h-4 text-rose-500" /> Supporting example missing
                </li>
              </ul>
            </div>

            {/* AI Feedback */}
            <div className="bg-[#f0f7ff] border border-[#bae6fd] rounded-xl p-4 flex gap-3">
              <BrainCircuit className="w-5 h-5 text-[#087fbe] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-[#087fbe] mb-1 uppercase tracking-wider">AI Feedback</div>
                <p className="text-sm text-[#0b1b34] leading-relaxed">
                  "Your answer correctly explains the main concept, but the relationship between light energy and chemical energy needs further explanation."
                </p>
              </div>
            </div>

            {/* Practice */}
            <div className="flex items-center justify-between bg-white border border-slate-100 rounded-xl p-3 shadow-sm mt-1">
              <div className="flex items-center gap-2">
                <div className="bg-[#e0f2fe] p-1.5 rounded-lg text-[#087fbe]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase">Recommended Practice</div>
                  <div className="text-sm font-bold text-[#0b1b34]">3 targeted questions</div>
                </div>
              </div>
              <button className="text-xs font-bold text-white bg-[#087fbe] px-3 py-1.5 rounded-lg hover:bg-[#066192] transition-colors">
                Start
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
