import React from "react";
import { User, Sparkles, CheckCircle2, Award, Zap, Shield, BookOpen, X } from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071322]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#cbdff5] shadow-2xl overflow-hidden my-auto animate-scale-in text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0ecfb] bg-[#f8fbff]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#0284c7]" />
            <h3 className="font-heading font-bold text-lg text-[#0b192c]">Instructor Profile</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md border border-[#38bdf8]/40">
              Dr
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-[#0b192c]">Dr. Aris Thorne</h4>
              <p className="text-xs text-[#64748b]">Senior Mathematics & Physics Faculty</p>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-[#0284c7] bg-[#e0f2fe] px-2.5 py-0.5 rounded font-semibold mt-1">
                <EduEvalLogo size={14} />
                <span>EduEval AI Pro Tier</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-2 text-center">
            <div className="bg-[#f0f7ff] p-3 rounded-xl border border-[#dce9f8]">
              <div className="text-[10px] text-[#64748b] font-medium">Exams Graded</div>
              <div className="font-heading font-extrabold text-lg text-[#0284c7] mt-0.5">342</div>
            </div>
            <div className="bg-[#f0f7ff] p-3 rounded-xl border border-[#dce9f8]">
              <div className="text-[10px] text-[#64748b] font-medium">Hours Saved</div>
              <div className="font-heading font-extrabold text-lg text-[#0284c7] mt-0.5">48 hrs</div>
            </div>
            <div className="bg-[#f0f7ff] p-3 rounded-xl border border-[#dce9f8]">
              <div className="text-[10px] text-[#64748b] font-medium">Accuracy</div>
              <div className="font-heading font-extrabold text-lg text-[#0284c7] mt-0.5">99.4%</div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 text-xs text-slate-700">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-medium">AI Analysis Engine</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active (Gemini 2.5 Flash)
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-medium">Institution</span>
              <span className="font-semibold text-slate-800">Advanced STEM Academy</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-medium">Active Rubrics</span>
              <span className="font-semibold text-[#0284c7]">14 Custom Rubrics</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#e0ecfb] bg-[#f8fbff] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold bg-[#0284c7] text-white hover:bg-[#0369a1] rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
