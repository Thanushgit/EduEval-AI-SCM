import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, BrainCircuit, FileSignature, Microscope, BookOpen } from "lucide-react";

const slides = [
  {
    id: "physics",
    title: "Physics & Math OCR",
    icon: <FileSignature className="w-5 h-5" />,
    color: "#0284c7",
    lightBg: "bg-[#f8fbff]",
    border: "border-[#e0ecfb]",
    step1: "Force = Mass × Acceleration. F=ma.",
    step2Tags: [
      { text: "Formula Correct", type: "success" },
      { text: "Variables Defined", type: "success" },
      { text: "Missing Example", type: "warning" },
    ],
    score: "4/5 (80%)",
    feedback: "Great understanding of Newton's Second Law! Next time, include a real-world example (like pushing a car) to get full marks."
  },
  {
    id: "literature",
    title: "Essay Evaluation",
    icon: <BookOpen className="w-5 h-5" />,
    color: "#8b5cf6",
    lightBg: "bg-[#faf5ff]",
    border: "border-[#e9d5ff]",
    step1: "The protagonist's journey symbolizes the struggle against societal norms, as seen when he refuses the royal decree.",
    step2Tags: [
      { text: "Strong Thesis", type: "success" },
      { text: "Good Evidence", type: "success" },
      { text: "Tone: Analytical", type: "info" },
    ],
    score: "9/10 (90%)",
    feedback: "Excellent thematic analysis. To elevate this further, connect the royal decree to the historical context of the author's era."
  },
  {
    id: "chemistry",
    title: "Chemistry Equations",
    icon: <Microscope className="w-5 h-5" />,
    color: "#10b981",
    lightBg: "bg-[#ecfdf5]",
    border: "border-[#a7f3d0]",
    step1: "2H2 + O2 → 2H2O (Combustion)",
    step2Tags: [
      { text: "Balanced Correctly", type: "success" },
      { text: "States Missing", type: "warning" },
    ],
    score: "3/4 (75%)",
    feedback: "The stoichiometry is perfectly balanced. Remember to include state symbols like (g) for gases and (l) for liquids."
  }
];

export const EvaluationCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 relative flex flex-col items-center">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#0b192c] mb-4">How the Evaluation Works</h2>
        <p className="text-slate-500">Watch the AI instantly evaluate answers across different subjects.</p>
      </div>
      
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-3xl border border-[#dce9f8] shadow-2xl overflow-hidden p-6 z-20">
        <div className="absolute top-4 right-6 flex gap-1.5 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${currentSlide === idx ? "w-6 bg-[#0284c7]" : "w-1.5 bg-slate-200 hover:bg-slate-300"}`}
            />
          ))}
        </div>

        <div className="relative z-10 w-full h-full pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Step 1: Handwritten Answer */}
              <div className={`${slides[currentSlide].lightBg} rounded-2xl border ${slides[currentSlide].border} p-4 flex items-start gap-4`}>
                <div className={`w-10 h-10 rounded-xl bg-white border ${slides[currentSlide].border} flex shrink-0 items-center justify-center text-[${slides[currentSlide].color}] shadow-sm`} style={{ color: slides[currentSlide].color }}>
                  {slides[currentSlide].icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0b192c] mb-2 flex items-center gap-2">
                    1. {slides[currentSlide].title}
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </h4>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs font-[Caveat,cursive] text-slate-700 text-lg leading-tight opacity-90" style={{ backgroundImage: 'linear-gradient(transparent 95%, #cbd5e1 95%)', backgroundSize: '100% 1.25rem' }}>
                    {slides[currentSlide].step1}
                  </div>
                </div>
              </div>

              {/* Down Arrow */}
              <div className="flex justify-center -my-3 relative z-20">
                <div className="bg-white border border-[#dce9f8] rounded-full p-1.5 shadow-sm text-[#0284c7]">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              {/* Step 2: AI Analysis */}
              <div className="bg-[#f0f7ff] rounded-2xl border border-[#bae6fd] p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c2340] to-[#051329] border border-[#38bdf8]/40 flex shrink-0 items-center justify-center text-[#00d2ff] shadow-sm">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[#0369a1] mb-2 flex items-center justify-between">
                    2. AI Concept Analysis
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {slides[currentSlide].step2Tags.map((tag, i) => (
                      <span 
                        key={i}
                        className={`px-2.5 py-1 border rounded-lg text-xs font-bold flex items-center gap-1 ${
                          tag.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                          tag.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {tag.type === 'success' && <CheckCircle2 className="w-3 h-3" />}
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Down Arrow */}
              <div className="flex justify-center -my-3 relative z-20">
                <div className="bg-white border border-[#dce9f8] rounded-full p-1.5 shadow-sm text-[#0284c7]">
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </div>
              </div>

              {/* Step 3: Marks & Feedback */}
              <div className="bg-gradient-to-br from-[#0c2340] to-[#051329] rounded-2xl border border-[#0284c7]/30 p-4 flex items-start gap-4 shadow-lg text-white">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex shrink-0 items-center justify-center shadow-sm">
                  <span className="font-heading font-black text-[#38bdf8]">
                    {slides[currentSlide].score.split('/')[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    3. Marks + Feedback
                  </h4>
                  <div className="text-xs text-slate-300 mb-2 font-medium">Score: <strong className="text-[#38bdf8]">{slides[currentSlide].score}</strong></div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-white/5 border border-white/10 p-2.5 rounded-lg">
                    {slides[currentSlide].feedback}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
