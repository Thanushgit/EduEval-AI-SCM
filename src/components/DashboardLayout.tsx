import React, { ReactNode } from "react";
import { EduEvalLogo } from "../components/EduEvalLogo";
import { LogOut } from "lucide-react";

interface SidebarItem {
  icon: ReactNode;
  label: string;
  id: string;
}

interface DashboardLayoutProps {
  role: "teacher" | "student";
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout: () => void;
  sidebarItems: SidebarItem[];
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  role,
  activeTab,
  onTabChange,
  onLogout,
  sidebarItems,
  children,
}) => {
  return (
    <div className="min-h-screen flex bg-[#f8f9ff] text-[#0b1c30]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e0ecfb] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#e0ecfb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0c2340] border border-[#38bdf8]/40 flex items-center justify-center p-1.5 shadow-xs">
              <EduEvalLogo size={24} />
            </div>
            <span className="font-heading font-extrabold text-xl">EduEval AI</span>
          </div>
          <div className="mt-2 text-xs font-semibold text-[#0284c7] uppercase tracking-wider">
            {role === "teacher" ? "Instructor Portal" : "Student Portal"}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === item.id
                  ? "bg-[#0284c7] text-white shadow-sm"
                  : "text-slate-600 hover:bg-[#f0f7ff] hover:text-[#0b192c]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#e0ecfb]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-full overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
