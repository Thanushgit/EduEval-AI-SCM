import React, { useState } from "react";
import {
  Brain,
  X,
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle2,
  BarChart3,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface ClassInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent: (studentName: string) => void;
}

export const ClassInsightsModal: React.FC<ClassInsightsModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent,
}) => {
  const [selectedCohort, setSelectedCohort] = useState<string>("Grade 10 - Mathematics");

  if (!isOpen) return null;

  const recurringMisconceptions = [
    {
      concept: "Discriminant Parameter Signs",
      affectedCount: 9,
      totalStudents: 24,
      percentage: 38,
      severity: "High",
      sampleError: "Confusing (-k)² as -k² when expanding discriminant b² - 4ac",
      remedialAction: "Assign 3 practice problems on parenthesized algebraic powers",
    },
    {
      concept: "Completing Square Constant Offset",
      affectedCount: 6,
      totalStudents: 24,
      percentage: 25,
      severity: "Medium",
      sampleError: "Forgetting to subtract (b/2a)² outside the bracket before adding c",
      remedialAction: "Review Lesson 12 visual geometrical proof of square completion",
    },
    {
      concept: "Rational Domain Restrictions",
      affectedCount: 4,
      totalStudents: 24,
      percentage: 17,
      severity: "Low",
      sampleError: "Failing to exclude x = 0 or divisor root from final solution set",
      remedialAction: "Quick warm-up quiz on non-zero denominators",
    },
  ];

  const studentRoster = [
    { name: "A. Khan", score: 93, grade: "A", status: "Mastered", weakArea: "Discriminant bounds" },
    { name: "S. Patel", score: 87, grade: "B+", status: "Proficient", weakArea: "Friction vector resolution" },
    { name: "E. Rodriguez", score: 97, grade: "A+", status: "Mastered", weakArea: "Significant figures" },
    { name: "M. Chen", score: 79, grade: "C+", status: "Needs Review", weakArea: "Factoring negative coefficients" },
    { name: "J. Davies", score: 84, grade: "B", status: "Proficient", weakArea: "Vertex coordinates derivation" },
    { name: "L. Nguyen", score: 91, grade: "A", status: "Mastered", weakArea: "Graph domain boundary" },
  ];

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
                Personalised Class & Student Insights
              </h3>
              <p className="text-xs text-[#64748b]">
                Automated error clustering, recurring misconceptions, and learning gap radar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Insights"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Cohort Overview Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#f0f7ff] p-3.5 rounded-xl border border-[#dce9f8]">
              <div className="text-xs text-[#64748b] font-medium">Class Average</div>
              <div className="text-2xl font-extrabold text-[#0284c7] mt-0.5">88.5%</div>
              <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>+4.2% vs last exam</span>
              </div>
            </div>

            <div className="bg-[#f0f7ff] p-3.5 rounded-xl border border-[#dce9f8]">
              <div className="text-xs text-[#64748b] font-medium">Exams Graded</div>
              <div className="text-2xl font-extrabold text-[#0b192c] mt-0.5">24 / 24</div>
              <div className="text-[10px] text-[#64748b] mt-0.5">100% evaluated</div>
            </div>

            <div className="bg-[#f0f7ff] p-3.5 rounded-xl border border-[#dce9f8]">
              <div className="text-xs text-[#64748b] font-medium">Concept Retention</div>
              <div className="text-2xl font-extrabold text-[#0284c7] mt-0.5">91%</div>
              <div className="text-[10px] text-[#0284c7] font-semibold mt-0.5">High conceptual grasp</div>
            </div>

            <div className="bg-[#f0f7ff] p-3.5 rounded-xl border border-[#dce9f8]">
              <div className="text-xs text-[#64748b] font-medium">Flagged Gaps</div>
              <div className="text-2xl font-extrabold text-amber-700 mt-0.5">3 Areas</div>
              <div className="text-[10px] text-amber-800 font-semibold mt-0.5">Remediation ready</div>
            </div>
          </div>

          {/* Section 1: Recurring Misconceptions Across Class */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-bold text-base text-[#0b192c] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Recurring Student Weaknesses & Misconceptions</span>
              </h4>
              <span className="text-xs text-[#64748b]">AI Error Clustering</span>
            </div>

            <div className="space-y-3">
              {recurringMisconceptions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#dce9f8] p-4 shadow-xs hover:border-[#0284c7]/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className="font-heading font-bold text-sm text-[#0b192c]">
                        {item.concept}
                      </span>
                      <span className="ml-2 text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        {item.affectedCount} students ({item.percentage}%)
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.severity === "High"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.severity} Priority
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-mono bg-[#f8fbff] p-2 rounded-lg border border-slate-100 mb-2">
                    Common Misconception: {item.sampleError}
                  </p>

                  <div className="flex items-center justify-between text-xs text-[#0369a1] font-medium bg-[#f0f7ff] p-2 rounded-lg border border-[#bae6fd]">
                    <span>💡 Recommended Intervention: {item.remedialAction}</span>
                    <button
                      onClick={onClose}
                      className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-0.5 shrink-0 ml-2"
                    >
                      <span>Create Quiz</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Student Roster Gradebook */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-bold text-base text-[#0b192c] flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#0284c7]" />
                <span>Class Roster & Individual Profiles</span>
              </h4>
              <span className="text-xs text-[#64748b]">Click student to view evaluation</span>
            </div>

            <div className="bg-white rounded-xl border border-[#dce9f8] overflow-hidden">
              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                {studentRoster.map((st, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelectStudent(st.name);
                      onClose();
                    }}
                    className="p-3.5 flex items-center justify-between hover:bg-[#f0f7ff]/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#e0f2fe] border border-[#bae6fd] flex items-center justify-center font-bold text-xs text-[#0284c7]">
                        {st.name.split(" ")[0][0]}
                      </div>
                      <div>
                        <div className="font-semibold text-[#0b192c]">{st.name}</div>
                        <div className="text-xs text-[#64748b]">Weak spot: {st.weakArea}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-bold text-sm text-[#0284c7]">{st.score}%</span>
                        <span className="ml-1 text-xs text-slate-500">({st.grade})</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          st.status === "Mastered"
                            ? "bg-emerald-100 text-emerald-800"
                            : st.status === "Proficient"
                            ? "bg-sky-100 text-sky-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {st.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#e0ecfb] bg-[#f8fbff] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold bg-[#0284c7] text-white hover:bg-[#0369a1] rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
