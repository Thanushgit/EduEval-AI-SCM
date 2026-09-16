import React, { useState, useEffect } from "react";
import { CheckCircle2, Sparkles, FileText, ChevronRight, Zap, RefreshCw, Layers } from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface ArchitectureDiagramProps {
  onOpenEvaluationStudio: () => void;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  onOpenEvaluationStudio,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    // Auto-trigger simulation on mount
    const timer = setTimeout(() => {
      handleSimulateScan();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSimulateScan = () => {
    setIsProcessing(true);
    setActiveStep(1);
    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setTimeout(() => {
          setIsProcessing(false);
        }, 800);
      }, 1000);
    }, 1000);
  };

  return (
    <section id="architecture-section" className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 scroll-mt-20">
      <div className="relative bg-white rounded-2xl border border-[#dce9f8] shadow-sm hover:shadow-md transition-all overflow-hidden">
        {/* Card Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#e0f2fe] bg-[#f8fbff]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#0c2340] border border-[#38bdf8]/40 flex items-center justify-center p-0.5 shadow-xs">
              <EduEvalLogo size={18} />
            </div>
            <span className="font-heading font-bold text-xs sm:text-sm text-[#0284c7] tracking-tight">
              EduEval AI Engine Architecture
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEvaluationStudio}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-[#0284c7] text-white hover:bg-[#0369a1] transition-all cursor-pointer shadow-xs shadow-[#0284c7]/25"
            >
              <span>Explore Live</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card Body - 3 Column Pipeline Diagram */}
        <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-white to-[#f8fbff]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* 1. Student Answer Sheet Node */}
            <div className="md:col-span-4 flex flex-col items-center text-center group cursor-pointer" onClick={() => setActiveStep(1)}>
              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="w-5 h-5 rounded-full bg-[#bae6fd] flex items-center justify-center text-[#0284c7]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-[#0284c7] uppercase tracking-wider">Input</span>
              </div>

              {/* Handwritten Sheet Preview Card */}
              <div className={`relative w-full max-w-[210px] aspect-[4/5] bg-[#ffffff] rounded-xl border ${activeStep === 1 || isProcessing ? "border-[#0284c7] ring-2 ring-[#0284c7]/20" : "border-[#d8e2f0]"} p-3 shadow-xs transition-all`}>
                {/* Lined Notebook Simulation */}
                <div className="absolute inset-0 p-3 flex flex-col justify-between pointer-events-none opacity-40">
                  <div className="w-full border-b border-dashed border-[#cbdff5]"></div>
                  <div className="w-full border-b border-dashed border-[#cbdff5]"></div>
                  <div className="w-full border-b border-dashed border-[#cbdff5]"></div>
                  <div className="w-full border-b border-dashed border-[#cbdff5]"></div>
                  <div className="w-full border-b border-dashed border-[#cbdff5]"></div>
                  <div className="w-full border-b border-dashed border-[#cbdff5]"></div>
                </div>

                {/* Simulated Handwritten Math Content */}
                <div className="relative text-left font-mono text-[10px] sm:text-[11px] text-[#1e293b] leading-tight space-y-1.5">
                  <div className="text-[9px] text-[#64748b] border-b border-gray-200 pb-0.5 font-sans font-medium flex justify-between">
                    <span>Q1. Solve Equation</span>
                    <span className="text-[#0284c7] font-semibold">10 Pts</span>
                  </div>
                  <div className="italic text-[#0f172a] font-semibold">2x² + 5x - 3 = 0</div>
                  <div className="pl-1 text-slate-700">2x² + 6x - x - 3 = 0</div>
                  <div className="pl-1 text-slate-700">2x(x+3) - 1(x+3) = 0</div>
                  <div className="pl-1 text-[#0284c7] font-semibold">(2x - 1)(x + 3) = 0</div>
                  <div className="pl-2 bg-emerald-50 text-emerald-900 font-bold rounded px-1 py-0.5 inline-block text-[9.5px]">
                    x = 1/2 , x = -3 ✓
                  </div>
                  <div className="text-[9px] text-slate-400 pt-1">y = (x - 3)² - 4</div>
                </div>

                {/* Animated Scan Beam */}
                {(isProcessing && activeStep === 1) && (
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-[#00d2ff] shadow-[0_0_12px_#0284c7] animate-[scan_1.5s_ease-in-out_infinite]"></div>
                )}
              </div>

              <span className="mt-2.5 text-xs font-semibold text-[#0b192c]">
                Student Answer Sheet
              </span>
            </div>

            {/* Digitization Arrow -> 2. AI Processor Node */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center py-2 md:py-0">
              <div className="text-[11px] font-semibold text-[#0284c7] mb-1 flex items-center gap-1">
                <span>Digitization</span>
                <span className="text-xs">→</span>
              </div>

              {/* Central Glowing AI Neural Tree Chip */}
              <div className="relative group cursor-pointer" onClick={() => setActiveStep(2)}>
                {/* Glow ring */}
                <div className={`absolute -inset-2 bg-gradient-to-r from-[#00d2ff] via-[#0284c7] to-[#0369a1] rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition-all ${isProcessing ? "animate-pulse opacity-90" : ""}`}></div>
                
                <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-b from-[#0c2340] to-[#051329] border-2 border-[#38bdf8]/50 flex flex-col items-center justify-center text-white shadow-xl p-2">
                  <EduEvalLogo size={52} showGlow={true} />
                </div>
              </div>

              <span className="mt-2.5 font-heading font-bold text-xs sm:text-sm text-[#0b192c]">
                EduEval AI Processor
              </span>
              <span className="text-[11px] text-[#475569] font-medium">
                Analysis Engine
              </span>
            </div>

            {/* 3. Structured Grades & Feedback Node */}
            <div className="md:col-span-4 flex flex-col gap-2.5 group cursor-pointer" onClick={onOpenEvaluationStudio}>
              <div className="flex items-center gap-1.5 mb-1 justify-center md:justify-start">
                <div className="w-5 h-5 rounded-full bg-[#bae6fd] flex items-center justify-center text-[#0284c7]">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-[#0284c7] uppercase tracking-wider">
                  Structured Grades & Feedback
                </span>
              </div>

              {/* Mini Card 1: Graded Results */}
              <div className={`bg-white rounded-xl border ${activeStep === 3 ? "border-[#0284c7] ring-2 ring-[#0284c7]/20" : "border-[#d8e2f0]"} p-2.5 shadow-xs transition-all`}>
                <div className="text-[10px] font-bold text-[#0b192c] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Graded Results</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[9px] font-semibold">Verified</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-center bg-[#f0f7ff] border border-[#e0f2fe] rounded-lg p-1.5 text-[10px]">
                  <div>
                    <div className="text-[#64748b] text-[8px]">Student</div>
                    <div className="font-semibold text-[#0b192c] truncate">A. Khan</div>
                  </div>
                  <div>
                    <div className="text-[#64748b] text-[8px]">Subject</div>
                    <div className="font-semibold text-[#0b192c]">Math</div>
                  </div>
                  <div>
                    <div className="text-[#64748b] text-[8px]">Score</div>
                    <div className="font-bold text-[#0284c7]">92%</div>
                  </div>
                  <div>
                    <div className="text-[#64748b] text-[8px]">Grade</div>
                    <div className="font-bold text-[#0284c7]">A</div>
                  </div>
                </div>
              </div>

              {/* Mini Card 2: Personalized Feedback */}
              <div className="bg-white rounded-xl border border-[#d8e2f0] p-2.5 shadow-xs space-y-1.5 text-[10px]">
                <div className="text-[10px] font-bold text-[#0b192c] uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#0284c7]" />
                  <span>Personalized Feedback</span>
                </div>
                
                <div className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50/80 p-1.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">Q3: Excellent reasoning!</span>
                </div>

                <div className="flex items-start gap-1.5 text-amber-900 bg-amber-50/80 p-1.5 rounded-md text-[9.5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1"></span>
                  <div>
                    <span className="font-medium">Q5: Need to review quadratic equations.</span>
                    <span className="block text-[#64748b] text-[8.5px]">Suggested Concept: Lesson 12</span>
                  </div>
                </div>

                <div className="pt-0.5 flex items-center justify-between text-[9px] text-[#475569] border-t border-slate-100">
                  <span>Confidence: <strong className="text-[#0284c7]">High (98%)</strong></span>
                  <span className="text-[#64748b]">Notes: Strong performance</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Interactive Bottom Banner */}
        <div className="bg-[#f0f7ff] border-t border-[#e0f2fe] px-4 py-2 text-center text-xs text-[#0284c7] font-medium flex items-center justify-center gap-1.5">
          <span>Click to launch the Evaluation Studio with complete concept-based breakdowns</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
};
