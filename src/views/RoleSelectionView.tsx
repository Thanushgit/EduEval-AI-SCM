import React from "react";
import { BookOpen, UserCircle2 } from "lucide-react";

interface RoleSelectionViewProps {
  onSelectRole: (role: "teacher" | "student") => void;
}

export const RoleSelectionView: React.FC<RoleSelectionViewProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 border border-[#cbdff5] shadow-2xl animate-scale-in">
        <div className="text-center mb-8">
          <h2 className="font-heading font-extrabold text-3xl text-[#0b192c]">Are you a Student or Teacher?</h2>
          <p className="text-sm text-[#64748b] mt-2">Select your role to view your personalized dashboard.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectRole("teacher")}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-[#dce9f8] hover:border-[#0284c7] hover:bg-[#f0f7ff] transition-all group"
          >
            <div className="w-20 h-20 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-10 h-10 text-[#0284c7]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#0b192c]">Teacher</h3>
            <p className="text-xs text-[#64748b] text-center mt-2">Create evaluations, manage rubrics, and view student analytics.</p>
          </button>

          <button
            onClick={() => onSelectRole("student")}
            className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-[#dce9f8] hover:border-[#0284c7] hover:bg-[#f0f7ff] transition-all group"
          >
            <div className="w-20 h-20 rounded-full bg-[#e0f2fe] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UserCircle2 className="w-10 h-10 text-[#0284c7]" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[#0b192c]">Student</h3>
            <p className="text-xs text-[#64748b] text-center mt-2">View your evaluations, track progress, and get targeted practice.</p>
          </button>
        </div>
      </div>
    </div>
  );
};
