import React, { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { LayoutDashboard, FileText, Brain, Target, TrendingUp, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StudentDashboardProps {
  onLogout: () => void;
  userName?: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout, userName = "Student" }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "evaluations", label: "My Evaluations", icon: <FileText className="w-5 h-5" /> },
    { id: "weaknesses", label: "My Weak Areas", icon: <Brain className="w-5 h-5" /> },
    { id: "practice", label: "Practice", icon: <Target className="w-5 h-5" /> },
    { id: "progress", label: "Progress", icon: <TrendingUp className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  const progressData = [
    { name: "Test 1", score: 62 },
    { name: "Test 2", score: 68 },
    { name: "Test 3", score: 74 },
    { name: "Test 4", score: 81 },
  ];

  const [practiceAnswered, setPracticeAnswered] = useState(false);

  return (
    <DashboardLayout
      role="student"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      {activeTab === "dashboard" && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-heading font-extrabold text-3xl text-[#0b192c]">{getGreeting()}, {userName} 👋</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <div className="text-sm font-semibold text-[#64748b]">Average Score</div>
              <div className="text-3xl font-extrabold text-[#0284c7] mt-1">78%</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <div className="text-sm font-semibold text-[#64748b]">Tests Taken</div>
              <div className="text-3xl font-extrabold text-[#0b192c] mt-1">12</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <div className="text-sm font-semibold text-[#64748b]">Improvement</div>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1">+14%</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "weaknesses" && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">Your Learning Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <h3 className="font-bold text-lg text-emerald-800 mb-4">Your strongest areas</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Newton's Laws
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Work & Energy
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <h3 className="font-bold text-lg text-rose-800 mb-4">Areas to improve</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span> Sign Convention
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span> Ray Diagrams
                </li>
                <li className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span> Conceptual Explanations
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#f0f7ff] border border-[#bae6fd] p-6 rounded-2xl">
            <h4 className="text-xs font-bold text-[#0369a1] uppercase tracking-wider mb-2">AI Insight</h4>
            <p className="text-sm text-[#0b192c] font-medium leading-relaxed">
              You are performing well in numerical problems, but you are repeatedly losing marks in conceptual explanation questions. Focus on writing clear, step-by-step reasoning rather than just the final mathematical answer.
            </p>
          </div>
        </div>
      )}

      {activeTab === "practice" && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">Practice Based on Your Weak Areas</h2>
          
          <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
            <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded inline-block mb-4">
              Based on: Sign Convention
            </div>
            <h3 className="font-bold text-lg text-[#0b192c] mb-2">Question 1</h3>
            <p className="text-sm text-slate-700 mb-6">
              A convex lens has a focal length of 20 cm. An object is placed 30 cm in front of the lens. Calculate the image distance and state whether it is real or virtual. Ensure you use the correct sign convention.
            </p>

            {!practiceAnswered ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setPracticeAnswered(true)}
                  className="px-6 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Answer
                </button>
                <button
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Skip
                </button>
              </div>
            ) : (
              <div className="mt-4 border-t border-slate-100 pt-4 animate-fade-in">
                <div className="bg-[#f0f7ff] p-5 rounded-xl border border-[#bae6fd]">
                  <h4 className="text-sm font-bold text-[#0369a1] mb-2">AI Evaluation</h4>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">
                    The correct formula is 1/f = 1/v - 1/u. For a convex lens, f = +20 cm. Since the object is in front, u = -30 cm.
                    <br/><br/>
                    1/20 = 1/v - (1/-30)
                    <br/>1/20 = 1/v + 1/30
                    <br/>1/v = 1/20 - 1/30 = 1/60
                    <br/>v = +60 cm. 
                    <br/><br/>
                    Since v is positive, the image is real and formed on the other side of the lens.
                  </p>
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded inline-block">
                    Tip: Always draw a quick ray diagram sketch to verify your signs before calculating!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">Progress Over Time</h2>
          
          <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
            <div className="h-72 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0ecfb" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #dce9f8', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#0284c7" strokeWidth={3} dot={{ r: 6, fill: "#0284c7", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-center p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-lg font-extrabold text-emerald-700">You're improving! 🎯</span>
              <p className="text-sm text-emerald-800 mt-1">Your recent scores are trending upward consistently.</p>
            </div>
          </div>
        </div>
      )}

      {/* Placeholders for other tabs */}
      {["evaluations", "profile"].includes(activeTab) && (
        <div className="flex items-center justify-center h-64 text-slate-400 font-medium">
          {activeTab} view coming soon
        </div>
      )}
    </DashboardLayout>
  );
};
