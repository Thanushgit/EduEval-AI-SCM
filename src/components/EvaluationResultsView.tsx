import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Printer,
  Download,
  Share2,
  Check,
  Target,
  Edit3,
  Save,
  Brain,
  Layers,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { EvaluationResult } from "../types";
import { EduEvalLogo } from "./EduEvalLogo";

interface EvaluationResultsViewProps {
  result: EvaluationResult;
  onBack: () => void;
  onOpenTargetedPractice: (weakConcepts: string[], topic: string) => void;
  onNewEvaluation: () => void;
}

export const EvaluationResultsView: React.FC<EvaluationResultsViewProps> = ({
  result: initialResult,
  onBack,
  onOpenTargetedPractice,
  onNewEvaluation,
}) => {
  const [result, setResult] = useState<EvaluationResult>(initialResult);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
  });

  const toggleQuestion = (qNum: number) => {
    setExpandedQuestions((prev) => ({ ...prev, [qNum]: !prev[qNum] }));
  };

  const handleCopyReport = () => {
    const text = `EduEval AI Grade Report\nStudent: ${result.studentName}\nSubject: ${result.subject} (${result.topic})\nScore: ${result.overallScore}/${result.maxScore} (${result.percentage}%) - Grade ${result.grade}\n\nSummary:\n${result.summaryFeedback}\n\nKey Strengths:\n- ${result.strengths.join("\n- ")}\n\nAreas for Review:\n- ${result.weaknesses.join("\n- ")}\n\nTeacher Notes:\n${result.teacherNotes}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleScoreChange = (qNum: number, newScore: number) => {
    const updatedQuestions = result.questions.map((q) =>
      q.questionNumber === qNum ? { ...q, awardedMarks: newScore } : q
    );
    const newTotal = updatedQuestions.reduce((acc, q) => acc + q.awardedMarks, 0);
    const maxTotal = updatedQuestions.reduce((acc, q) => acc + q.maxMarks, 0);
    const newPct = Math.round((newTotal / maxTotal) * 100);
    const newGrade = newPct >= 90 ? "A" : newPct >= 80 ? "B" : newPct >= 70 ? "C" : "D";

    setResult({
      ...result,
      questions: updatedQuestions,
      overallScore: newTotal,
      maxScore: maxTotal,
      percentage: newPct,
      grade: newGrade,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 text-left animate-fade-in">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#e0ecfb]">
        <button
          id="btn-eval-back"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0284c7] hover:text-[#0369a1] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-[#cbdff5] bg-white text-[#0b192c] hover:bg-[#f0f7ff] transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Report" : "Share Summary"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-[#cbdff5] bg-white text-[#0b192c] hover:bg-[#f0f7ff] transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              isEditing
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "border border-[#0284c7] text-[#0284c7] hover:bg-[#e0f2fe]"
            }`}
          >
            {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? "Save Adjustments" : "Teacher Override"}</span>
          </button>
        </div>
      </div>

      {/* Main Scorecard Header */}
      <div className="bg-white rounded-2xl border border-[#dce9f8] p-6 sm:p-8 shadow-xs mb-6 relative overflow-hidden">
        {/* Top sapphire highlight bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0284c7] via-[#00d2ff] to-[#0369a1]"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#e0f2fe] text-[#0284c7] text-xs font-semibold uppercase tracking-wider mb-2">
              <EduEvalLogo size={14} />
              <span>Concept-Based Evaluation</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0b192c] tracking-tight">
              {result.studentName} — {result.subject}
            </h1>
            <p className="text-sm sm:text-base text-[#475569] mt-1 font-medium">
              Topic: {result.topic}
            </p>
          </div>

          {/* Big Score Box */}
          <div className="flex items-center gap-4 bg-[#f8fbff] border border-[#dce9f8] p-4 rounded-xl shrink-0">
            <div className="text-right">
              <div className="text-xs text-[#64748b] font-medium">Total Score</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0284c7]">
                {result.overallScore} <span className="text-sm font-normal text-slate-400">/ {result.maxScore}</span>
              </div>
              <div className="text-xs text-slate-500">{result.percentage}% Marks</div>
            </div>

            <div className="w-px h-12 bg-slate-200"></div>

            <div className="text-center px-1">
              <div className="text-xs text-[#64748b] font-medium">Grade</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0b192c]">
                {result.grade}
              </div>
              <div className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                <Check className="w-2.5 h-2.5" />
                <span>{result.confidenceScore}% Conf.</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Summary Feedback */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h2 className="text-xs font-bold text-[#0b192c] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-[#0284c7]" />
            <span>AI Formative Summary</span>
          </h2>
          <p className="text-sm sm:text-base text-[#1e293b] leading-relaxed bg-[#f0f7ff] border border-[#bae6fd] p-4 rounded-xl">
            {result.summaryFeedback}
          </p>
        </div>

        {/* Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Key Strengths</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950">
              {result.strengths.map((st, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-xl">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Areas for Improvement</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950">
              {result.weaknesses.map((wk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{wk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Concept Mastery Radar / Bars */}
      <div className="bg-white rounded-2xl border border-[#dce9f8] p-6 sm:p-7 shadow-xs mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0284c7]" />
            <h3 className="font-heading font-bold text-lg text-[#0b192c]">
              Concept Mastery Breakdown
            </h3>
          </div>
          <span className="text-xs text-[#64748b]">Semantic competency score</span>
        </div>

        <div className="space-y-3.5">
          {result.conceptMastery.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-[#0b192c]">{item.concept}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.status === "Mastered"
                        ? "bg-emerald-100 text-emerald-800"
                        : item.status === "Proficient"
                        ? "bg-sky-100 text-sky-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="font-bold text-[#0284c7] w-9 text-right">{item.score}%</span>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full h-2.5 bg-[#f0f7ff] rounded-full overflow-hidden border border-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    item.score >= 90
                      ? "bg-[#0284c7]"
                      : item.score >= 80
                      ? "bg-[#0ea5e9]"
                      : "bg-amber-500"
                  }`}
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Question-by-Question Analysis */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-xl text-[#0b192c]">
            Step-by-Step Question Evaluations
          </h3>
          <span className="text-xs text-[#64748b]">{result.questions.length} Questions Graded</span>
        </div>

        {result.questions.map((q) => {
          const isExpanded = expandedQuestions[q.questionNumber] ?? true;

          return (
            <div
              key={q.questionNumber}
              className="bg-white rounded-2xl border border-[#dce9f8] shadow-xs overflow-hidden transition-all"
            >
              {/* Question Item Header */}
              <div
                onClick={() => toggleQuestion(q.questionNumber)}
                className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-[#f8fbff] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-heading font-bold text-xs ${
                      q.awardedMarks === q.maxMarks
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    Q{q.questionNumber}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-[#0b192c] line-clamp-1">
                      {q.questionText}
                    </h4>
                    <span className="text-xs text-[#64748b]">Concept: {q.conceptAssessed}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="number"
                        min="0"
                        max={q.maxMarks}
                        value={q.awardedMarks}
                        onChange={(e) => handleScoreChange(q.questionNumber, Number(e.target.value))}
                        className="w-14 px-2 py-1 border border-[#0284c7] rounded text-center font-bold text-[#0284c7] text-sm"
                      />
                      <span className="text-xs text-slate-500">/ {q.maxMarks}</span>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="font-extrabold text-base sm:text-lg text-[#0284c7]">
                        {q.awardedMarks}
                      </span>
                      <span className="text-xs text-slate-400">/{q.maxMarks}</span>
                    </div>
                  )}

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Question Detail Content */}
              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-slate-100 bg-[#fbfdff] space-y-4">
                  {/* Extracted Handwritten Answer */}
                  <div>
                    <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1.5">
                      Transcribed Handwritten Solution:
                    </div>
                    <div className="bg-[#ffffff] font-mono text-xs sm:text-sm text-slate-800 p-3.5 rounded-xl border border-slate-200 whitespace-pre-line leading-relaxed shadow-2xs">
                      {q.studentSolutionExtracted}
                    </div>
                  </div>

                  {/* Step Breakdown Table */}
                  <div>
                    <div className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-1.5">
                      Intermediate Proof & Step Analysis:
                    </div>
                    <div className="space-y-1.5">
                      {q.stepBreakdown.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className={`flex items-start justify-between p-2.5 rounded-lg text-xs sm:text-sm border ${
                            step.correct
                              ? "bg-emerald-50/50 border-emerald-200/60 text-emerald-950"
                              : "bg-amber-50/50 border-amber-200/60 text-amber-950"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {step.correct ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            )}
                            <span className="font-medium">{step.step}</span>
                          </div>
                          <span className="text-[11px] text-slate-600 italic shrink-0 ml-2">
                            {step.notes}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Feedback line */}
                  <div className="bg-[#f0f7ff] border border-[#bae6fd] p-3 rounded-lg text-xs sm:text-sm text-[#0369a1] font-medium">
                    <strong className="text-[#0284c7]">Pedagogical Feedback: </strong>
                    {q.feedback}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Teacher Notes Box */}
      <div className="bg-white rounded-2xl border border-[#dce9f8] p-6 shadow-xs mb-8">
        <h4 className="font-heading font-bold text-base text-[#0b192c] mb-2 flex items-center gap-1.5">
          <Edit3 className="w-4 h-4 text-[#0284c7]" />
          <span>Instructor Recommendation & Notes</span>
        </h4>
        <p className="text-sm sm:text-base text-slate-700 italic bg-[#f8fbff] p-4 rounded-xl border border-slate-200">
          "{result.teacherNotes}"
        </p>
      </div>

      {/* Targeted Practice Banner Callout */}
      <div className="bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#075985] rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00d2ff]/20 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Next Learning Action</span>
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
            Generate Targeted Remedial Practice
          </h3>
          <p className="text-sm text-slate-200 max-w-lg">
            Create AI-generated reinforcement questions specifically addressing the student's weak concepts ({result.weaknesses[0] || "Identified misconceptions"}).
          </p>
        </div>

        <button
          id="btn-eval-generate-practice"
          onClick={() => onOpenTargetedPractice(result.weaknesses, result.topic)}
          className="bg-white text-[#0284c7] hover:bg-[#e0f2fe] active:scale-95 font-heading font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
        >
          Start Targeted Practice
        </button>
      </div>

      {/* Bottom Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onNewEvaluation}
          className="text-sm font-semibold text-[#0284c7] hover:underline cursor-pointer"
        >
          ← Evaluate Another Student Exam Paper
        </button>
      </div>
    </div>
  );
};
