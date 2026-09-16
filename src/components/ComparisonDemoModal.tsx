import React, { useState } from "react";
import {
  Sparkles,
  X,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface ComparisonDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartLiveEvaluation: () => void;
}

export const ComparisonDemoModal: React.FC<ComparisonDemoModalProps> = ({
  isOpen,
  onClose,
  onStartLiveEvaluation,
}) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

  if (!isOpen) return null;

  const scenarios = [
    {
      title: "Alternative Proof in Algebra",
      question: "Solve for x: 2x² + 5x - 3 = 0.",
      studentWork: "Completing square instead of quadratic formula: x² + 2.5x = 1.5 => (x + 1.25)² = 1.5 + 1.5625 = 3.0625 => x + 1.25 = ±1.75 => x = 0.5 or x = -3.",
      traditionalOutcome: {
        score: "0 / 10 Pts",
        verdict: "Incorrect Method",
        reason: "Regex expected standard factoring tokens '(2x - 1)(x + 3)' or quadratic formula notation. Rejected valid decimal completion of the square.",
      },
      eduEvalOutcome: {
        score: "10 / 10 Pts",
        verdict: "Flawless Alternative Logic",
        reason: "EduEval semantic parser recognized full algebraic equivalence and valid completion of the square with zero arithmetic deviations.",
      },
    },
    {
      title: "Physics Reasoning with Non-Standard Units",
      question: "Calculate the acceleration of a 4 kg cart under a 12 N net force.",
      studentWork: "a = F / m = 12 kg·m/s² / 4 kg = 3 meters per second squared.",
      traditionalOutcome: {
        score: "4 / 10 Pts",
        verdict: "Partial / Syntax Flag",
        reason: "Failed keyword check for unit token 'm/s²' because student wrote full word 'meters per second squared' and expanded Newton to base SI units.",
      },
      eduEvalOutcome: {
        score: "10 / 10 Pts",
        verdict: "Conceptual & Dimensional Mastery",
        reason: "Understands dimensional analysis; recognizes that kg·m/s² is physically identical to Newtons, awarding full points.",
      },
    },
    {
      title: "Arithmetic Slip with Sound Conceptual Derivation",
      question: "Derive vertex of y = x² - 6x + 5 by completing the square.",
      studentWork: "y = (x - 3)² - 9 + 5 => y = (x - 3)² - 4. Vertex = (3, 4) [Sign error on y-coordinate].",
      traditionalOutcome: {
        score: "0 / 10 Pts",
        verdict: "Wrong Final Answer",
        reason: "Strict output check against key '(3, -4)' marked the entire question as zero with no diagnostic feedback.",
      },
      eduEvalOutcome: {
        score: "8 / 10 Pts",
        verdict: "High Concept Mastery (Partial Credit)",
        reason: "Full credit for flawless completion of the square step (x - 3)² - 4. Deducted 2 marks strictly for the final vertex sign inversion, and generated remedial advice.",
      },
    },
  ];

  const current = scenarios[selectedScenarioIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071322]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#cbdff5] shadow-2xl overflow-hidden my-auto animate-scale-in text-left">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0ecfb] bg-[#f8fbff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0c2340] border border-[#38bdf8]/40 flex items-center justify-center p-1 shadow-xs">
              <EduEvalLogo size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#0b192c]">
                Why Concept-Based AI Marking Matters
              </h3>
              <p className="text-xs text-[#64748b]">
                Compare rigid keyword/OCR grading vs EduEval AI semantic evaluation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Demo"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Scenario Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {scenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedScenarioIndex === idx
                    ? "bg-[#0284c7] text-white shadow-xs"
                    : "bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd]"
                }`}
              >
                Case {idx + 1}: {sc.title}
              </button>
            ))}
          </div>

          {/* Problem Statement Card */}
          <div className="bg-[#f8fbff] border border-[#dce9f8] p-4 sm:p-5 rounded-2xl space-y-3">
            <div>
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                Question Statement:
              </span>
              <p className="font-heading font-bold text-sm sm:text-base text-[#0b192c] mt-0.5">
                {current.question}
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
              <span className="text-[10px] font-sans font-bold text-slate-500 uppercase block mb-1">
                Student's Actual Handwritten Submission:
              </span>
              {current.studentWork}
            </div>
          </div>

          {/* Side by side comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Traditional Keyword Grading */}
            <div className="bg-rose-50/50 border border-rose-200/80 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                    Traditional Keyword / Regex
                  </span>
                  <XCircle className="w-5 h-5 text-rose-600" />
                </div>

                <div className="text-2xl font-extrabold text-rose-700 mb-1">
                  {current.traditionalOutcome.score}
                </div>
                <div className="text-xs font-bold text-rose-900 mb-2">
                  {current.traditionalOutcome.verdict}
                </div>

                <p className="text-xs text-rose-950 leading-relaxed">
                  {current.traditionalOutcome.reason}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-200/60 text-[11px] text-rose-800 font-medium">
                ❌ Penalizes students who solve problems via alternative valid pathways.
              </div>
            </div>

            {/* EduEval AI Semantic Grading */}
            <div className="bg-emerald-50/70 border-2 border-emerald-300 p-5 rounded-2xl flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>EduEval AI Concept Engine</span>
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>

                <div className="text-2xl font-extrabold text-emerald-700 mb-1">
                  {current.eduEvalOutcome.score}
                </div>
                <div className="text-xs font-bold text-emerald-900 mb-2">
                  {current.eduEvalOutcome.verdict}
                </div>

                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {current.eduEvalOutcome.reason}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-200 text-[11px] text-emerald-800 font-semibold">
                ✓ Comprehends underlying mathematical logic and rewards genuine mastery.
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom CTA */}
        <div className="px-6 py-4 border-t border-[#e0ecfb] bg-[#f8fbff] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Close Demo
          </button>

          <button
            id="btn-demo-try-live"
            onClick={() => {
              onClose();
              onStartLiveEvaluation();
            }}
            className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-heading font-bold text-sm py-2.5 px-5 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <span>Try Evaluation on Your Papers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
