import React, { useState, useEffect } from "react";
import {
  Target,
  Sparkles,
  X,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import { PracticeProblem } from "../types";
import { EduEvalLogo } from "./EduEvalLogo";

interface TargetedPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialWeakConcepts?: string[];
}

export const TargetedPracticeModal: React.FC<TargetedPracticeModalProps> = ({
  isOpen,
  onClose,
  initialTopic = "Quadratic Equations & Parabolas",
  initialWeakConcepts = ["Discriminant bounds & parameter signs", "Vertex form transformations"],
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [weakConcepts, setWeakConcepts] = useState<string[]>(initialWeakConcepts);
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [isLoading, setIsLoading] = useState(false);
  const [problems, setProblems] = useState<PracticeProblem[]>([]);
  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [showSolution, setShowSolution] = useState<Record<number, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (initialTopic) setTopic(initialTopic);
    if (initialWeakConcepts && initialWeakConcepts.length > 0) {
      setWeakConcepts(initialWeakConcepts);
    }
    if (isOpen && problems.length === 0) {
      generatePracticeProblems(initialTopic, initialWeakConcepts);
    }
  }, [isOpen, initialTopic, initialWeakConcepts]);

  const generatePracticeProblems = async (t = topic, concepts = weakConcepts) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: t,
          weakConcepts: concepts,
          difficulty,
          count: 3,
        }),
      });
      const data = await response.json();
      if (data.success && data.problems) {
        setProblems(data.problems);
      } else {
        // Fallback default practice problems
        setProblems([
          {
            id: "p1",
            conceptFocus: "Discriminant sign & root nature",
            question: "For what values of k does the equation 2x² - kx + 8 = 0 have exactly one real repeated root?",
            difficulty: "Medium",
            hint: "Recall that a quadratic ax² + bx + c = 0 has repeated real roots if and only if the discriminant Δ = b² - 4ac = 0.",
            correctAnswer: "k = 8 or k = -8",
            stepByStepSolution: [
              "1. Identify coefficients: a = 2, b = -k, c = 8.",
              "2. Write discriminant formula: Δ = (-k)² - 4(2)(8) = k² - 64.",
              "3. Set Δ = 0 for one repeated root: k² - 64 = 0.",
              "4. Solve: k² = 64 => k = ±8."
            ]
          },
          {
            id: "p2",
            conceptFocus: "Completing the square & vertex coordinates",
            question: "Convert the parabola y = 3x² - 12x + 7 into vertex form y = a(x - h)² + k and state the coordinates of the turning point.",
            difficulty: "Medium",
            hint: "Factor out the coefficient 3 from the first two terms before completing the square inside parentheses.",
            correctAnswer: "y = 3(x - 2)² - 5 with vertex (2, -5)",
            stepByStepSolution: [
              "1. Factor leading coefficient: y = 3(x² - 4x) + 7.",
              "2. Complete square inside brackets: (x - 2)² - 4.",
              "3. Distribute: y = 3[(x - 2)² - 4] + 7 = 3(x - 2)² - 12 + 7.",
              "4. Simplify: y = 3(x - 2)² - 5. The vertex is (2, -5)."
            ]
          },
          {
            id: "p3",
            conceptFocus: "Factoring quadratic polynomials with negative coefficients",
            question: "Factor completely: 6x² - 7x - 5 = 0 and solve for x.",
            difficulty: "Medium",
            hint: "Look for two numbers that multiply to a*c = 6 * (-5) = -30 and add to b = -7.",
            correctAnswer: "x = 5/3, x = -1/2",
            stepByStepSolution: [
              "1. Find pair multiplying to -30 and adding to -7: -10 and +3.",
              "2. Split middle term: 6x² - 10x + 3x - 5 = 0.",
              "3. Factor by grouping: 2x(3x - 5) + 1(3x - 5) = 0 => (2x + 1)(3x - 5) = 0.",
              "4. Solve each factor: 2x + 1 = 0 => x = -1/2; 3x - 5 = 0 => x = 5/3."
            ]
          }
        ]);
      }
    } catch (err) {
      console.warn("Targeted practice generation fallback:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleHint = (idx: number) => {
    setShowHint((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleToggleSolution = (idx: number) => {
    setShowSolution((prev) => {
      const next = !prev[idx];
      if (next) {
        setCompletedCount((c) => Math.min(problems.length, c + 1));
      }
      return { ...prev, [idx]: next };
    });
  };

  if (!isOpen) return null;

  const currentProblem = problems[activeProblemIndex];

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
                Targeted Practice Generator
              </h3>
              <p className="text-xs text-[#64748b]">
                Personalized remedial problem sets tailored to identified weaknesses
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Targeted Practice"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Target Focus Configuration */}
          <div className="bg-[#f0f7ff] border border-[#dce9f8] p-4 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">
                  Targeted Weak Concepts:
                </span>
                <div className="text-sm font-bold text-[#0b192c] mt-0.5">
                  {topic}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {weakConcepts.map((wc, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-white text-[#0369a1] border border-[#bae6fd] px-2.5 py-0.5 rounded-md font-medium"
                    >
                      {wc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none"
                >
                  <option value="Easy">Easy Level</option>
                  <option value="Medium">Medium Level</option>
                  <option value="Hard">Hard Level</option>
                </select>

                <button
                  onClick={() => generatePracticeProblems()}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#0284c7] text-white hover:bg-[#0369a1] rounded-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#0284c7] animate-spin mx-auto" />
              <p className="text-sm font-semibold text-[#0b192c]">
                Generating targeted practice set with pedagogical hints...
              </p>
            </div>
          ) : problems.length > 0 && currentProblem ? (
            <div className="space-y-5">
              {/* Question Pagination Tabs */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  {problems.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveProblemIndex(idx)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        activeProblemIndex === idx
                          ? "bg-[#0284c7] text-white shadow-xs"
                          : showSolution[idx]
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Question {idx + 1}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-[#64748b] font-medium">
                  {completedCount} of {problems.length} Reviewed
                </div>
              </div>

              {/* Active Problem Card */}
              <div className="bg-white rounded-2xl border border-[#dce9f8] p-6 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-wider bg-[#e0f2fe] px-2 py-0.5 rounded">
                      Concept Focus: {currentProblem.conceptFocus}
                    </span>
                    <h4 className="font-heading font-bold text-base sm:text-lg text-[#0b192c] mt-2">
                      {currentProblem.question}
                    </h4>
                  </div>
                </div>

                {/* Student Workspace / Scratchpad */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Your Solution Working / Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={userAnswers[activeProblemIndex] || ""}
                    onChange={(e) =>
                      setUserAnswers({ ...userAnswers, [activeProblemIndex]: e.target.value })
                    }
                    placeholder="Type your algebraic steps or key roots here to verify..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 bg-[#fbfdff]"
                  />
                </div>

                {/* Pedagogical Hint Toggle */}
                <div>
                  <button
                    onClick={() => handleToggleHint(activeProblemIndex)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint[activeProblemIndex] ? "Hide Hint" : "Need a Hint?"}</span>
                  </button>

                  {showHint[activeProblemIndex] && (
                    <div className="mt-2 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs sm:text-sm text-amber-950 font-medium animate-fade-in">
                      💡 <strong>Hint: </strong> {currentProblem.hint}
                    </div>
                  )}
                </div>

                {/* Solution Reveal & Verification */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleToggleSolution(activeProblemIndex)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd] transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0284c7]" />
                      <span>
                        {showSolution[activeProblemIndex] ? "Hide Verified Solution" : "Verify My Working & Show Solution"}
                      </span>
                    </button>

                    {showSolution[activeProblemIndex] && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Key Answer: {currentProblem.correctAnswer}
                      </span>
                    )}
                  </div>

                  {showSolution[activeProblemIndex] && (
                    <div className="mt-4 bg-[#f0f7ff] border border-[#bae6fd] p-4 rounded-xl space-y-2 animate-fade-in">
                      <div className="text-xs font-bold text-[#0369a1] uppercase tracking-wider">
                        Step-by-Step Concept Derivation:
                      </div>
                      <div className="space-y-1.5 font-mono text-xs sm:text-sm text-slate-800">
                        {currentProblem.stepByStepSolution.map((s, sIdx) => (
                          <div key={sIdx} className="bg-white/80 p-2 rounded-lg border border-slate-200/60">
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#e0ecfb] bg-[#f8fbff] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Close Practice
          </button>

          {problems.length > 0 && (
            <button
              onClick={() => {
                if (activeProblemIndex < problems.length - 1) {
                  setActiveProblemIndex((i) => i + 1);
                } else {
                  onClose();
                }
              }}
              className="inline-flex items-center gap-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold text-sm py-2.5 px-5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>{activeProblemIndex < problems.length - 1 ? "Next Problem" : "Finish Practice"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
