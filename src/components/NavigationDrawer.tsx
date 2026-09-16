import React from "react";
import {
  X,
  FileEdit,
  Brain,
  Target,
  Play,
  User,
  GraduationCap
} from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: "home" | "evaluation" | "demo" | "insights" | "practice") => void;
  onOpenLegal: (type: "privacy" | "terms" | "support") => void;
  onOpenProfile: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenLegal,
  onOpenProfile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#071322]/60 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 animate-slide-right text-left">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0c2340] border border-[#38bdf8]/40 flex items-center justify-center p-1 shadow-xs">
                <EduEvalLogo size={24} />
              </div>
              <span className="font-heading font-extrabold text-xl text-[#0b192c] tracking-tight">
                <span>EduEval</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] to-[#00d2ff]"> AI</span>
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Drawer"
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-6 space-y-1.5">
            <button
              onClick={() => {
                onNavigate("home");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#0b192c] hover:bg-[#e0f2fe] hover:text-[#0284c7] transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#0284c7]" />
              <span>Home & Overview</span>
            </button>

            <button
              onClick={() => {
                onNavigate("evaluation");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#0b192c] hover:bg-[#e0f2fe] hover:text-[#0284c7] transition-all cursor-pointer"
            >
              <FileEdit className="w-4 h-4 text-[#0284c7]" />
              <span>Evaluation Studio</span>
            </button>

            <button
              onClick={() => {
                onNavigate("demo");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#0b192c] hover:bg-[#e0f2fe] hover:text-[#0284c7] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#0284c7]" />
              <span>Interactive Demo & Comparison</span>
            </button>

            <button
              onClick={() => {
                onNavigate("insights");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#0b192c] hover:bg-[#e0f2fe] hover:text-[#0284c7] transition-all cursor-pointer"
            >
              <Brain className="w-4 h-4 text-[#0284c7]" />
              <span>Class Insights & Misconceptions</span>
            </button>

            <button
              onClick={() => {
                onNavigate("practice");
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#0b192c] hover:bg-[#e0f2fe] hover:text-[#0284c7] transition-all cursor-pointer"
            >
              <Target className="w-4 h-4 text-[#0284c7]" />
              <span>Targeted Practice Generator</span>
            </button>
          </div>
        </div>

        {/* Bottom user & legal info */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <button
            onClick={() => {
              onOpenProfile();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#f0f7ff] transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 text-[#0284c7]" />
            <span>Instructor Account & Settings</span>
          </button>

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-3">
            <button
              onClick={() => {
                onOpenLegal("privacy");
                onClose();
              }}
              className="hover:text-[#0284c7] transition-colors"
            >
              Privacy
            </button>
            <span>•</span>
            <button
              onClick={() => {
                onOpenLegal("terms");
                onClose();
              }}
              className="hover:text-[#0284c7] transition-colors"
            >
              Terms
            </button>
            <span>•</span>
            <button
              onClick={() => {
                onOpenLegal("support");
                onClose();
              }}
              className="hover:text-[#0284c7] transition-colors"
            >
              Support
            </button>
          </div>
          <div className="text-[10px] text-slate-400 text-center">
            v2.5 Neural Evaluation Release
          </div>
        </div>
      </div>
    </div>
  );
};
