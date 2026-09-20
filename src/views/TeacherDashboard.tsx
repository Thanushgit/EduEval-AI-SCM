import React, { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { LayoutDashboard, FilePlus2, FileText, Users, BarChart3, Settings, Network, Lightbulb, TrendingUp, Clock, FileCheck2 } from "lucide-react";
import { CreateEvaluationView } from "./CreateEvaluationView";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TeacherDashboardProps {
  onLogout: () => void;
  userName?: string;
  userId?: number | null;
}

// Mock Data for Charts
const performanceData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 68 },
  { name: 'Week 3', score: 74 },
  { name: 'Week 4', score: 72 },
  { name: 'Week 5', score: 79 },
  { name: 'Week 6', score: 82 },
];

const conceptMasteryData = [
  { concept: 'Newton Laws', mastery: 85 },
  { concept: 'Kinematics', mastery: 72 },
  { concept: 'Energy', mastery: 68 },
  { concept: 'Momentum', mastery: 88 },
  { concept: 'Waves', mastery: 54 },
];

const gradeDistribution = [
  { name: 'A (90-100)', value: 12 },
  { name: 'B (80-89)', value: 18 },
  { name: 'C (70-79)', value: 8 },
  { name: 'D (60-69)', value: 3 },
  { name: 'F (<60)', value: 1 },
];
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'];

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onLogout, userName = "Teacher", userId }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "create", label: "Create Evaluation", icon: <FilePlus2 className="w-5 h-5" /> },
    { id: "evaluations", label: "Evaluations", icon: <FileText className="w-5 h-5" /> },
    { id: "students", label: "Students", icon: <Users className="w-5 h-5" /> },
    { id: "architecture", label: "How AI Works", icon: <Network className="w-5 h-5" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <DashboardLayout
      role="teacher"
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        setSelectedStudent(null);
      }}
      onLogout={onLogout}
      sidebarItems={sidebarItems}
    >
      {activeTab === "dashboard" && !selectedStudent && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-heading font-extrabold text-3xl text-[#0b192c]">{getGreeting()}, {userName} 👋</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <div className="text-sm font-semibold text-[#64748b]">Total Evaluations</div>
              <div className="text-3xl font-extrabold text-[#0284c7] mt-1">128</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm cursor-pointer hover:border-[#0284c7] transition-colors" onClick={() => setActiveTab("students")}>
              <div className="text-sm font-semibold text-[#64748b]">Students</div>
              <div className="text-3xl font-extrabold text-[#0b192c] mt-1">42</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <div className="text-sm font-semibold text-[#64748b]">Avg. Score</div>
              <div className="text-3xl font-extrabold text-[#0b192c] mt-1">76%</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <div className="text-sm font-semibold text-[#64748b]">Pending Reviews</div>
              <div className="text-3xl font-extrabold text-amber-600 mt-1">8</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#dce9f8] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e0ecfb] bg-[#f8fbff]">
              <h3 className="font-bold text-lg text-[#0b192c]">Recent Evaluations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">Student</th>
                    <th className="px-6 py-3">Subject / Topic</th>
                    <th className="px-6 py-3">Score</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium text-slate-800">Rahul M.</td>
                    <td className="px-6 py-4">Physics - Newton's Laws</td>
                    <td className="px-6 py-4 font-bold text-[#0284c7]">4 / 5</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800">Reviewed</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 font-medium text-slate-800">Sarah J.</td>
                    <td className="px-6 py-4">Math - Quadratics</td>
                    <td className="px-6 py-4 font-bold text-[#0284c7]">8.5 / 10</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-amber-100 text-amber-800">Pending Review</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "create" && <CreateEvaluationView teacherId={userId} />}

      {activeTab === "analytics" && (
        <div className="space-y-6 animate-fade-in pb-10">
          <div>
            <h2 className="font-heading font-extrabold text-3xl text-[#0b192c]">Class Analytics & Insights</h2>
            <p className="text-slate-500 font-medium mt-1">Deep dive into student performance and AI evaluation metrics.</p>
          </div>
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#dce9f8] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-500">Overall Pass Rate</div>
                <div className="text-2xl font-bold text-[#0b192c]">92.8%</div>
                <div className="text-xs font-semibold text-emerald-600">+4.2% from last month</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#dce9f8] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-500">Grading Time Saved</div>
                <div className="text-2xl font-bold text-[#0b192c]">48 hrs</div>
                <div className="text-xs font-semibold text-slate-500">This semester</div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#dce9f8] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-500">AI Accuracy</div>
                <div className="text-2xl font-bold text-[#0b192c]">99.4%</div>
                <div className="text-xs font-semibold text-slate-500">Based on manual overrides</div>
              </div>
            </div>
          </div>

          {/* Actionable Insights AI Banner */}
          <div className="bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] border border-[#bae6fd] p-5 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center shrink-0 shadow-md">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#0369a1] mb-1">AI Actionable Insights</h4>
              <p className="text-sm text-[#075985] leading-relaxed mb-3 font-medium">
                The majority of your class is struggling with <strong className="font-bold">Wave Mechanics</strong> (54% mastery). Consider scheduling a revision session on this topic. Conversely, <strong className="font-bold">Newton's Laws</strong> show excellent retention (85% mastery).
              </p>
              <button className="text-sm font-bold bg-white text-[#0369a1] px-4 py-2 rounded-lg border border-[#bae6fd] shadow-sm hover:bg-[#f0f9ff] transition-colors">
                Generate Revision Quiz
              </button>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Chart */}
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <h3 className="font-bold text-lg text-[#0b192c] mb-6">Class Performance Trend</h3>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Concept Mastery Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <h3 className="font-bold text-lg text-[#0b192c] mb-6">Concept Mastery</h3>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={conceptMasteryData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis dataKey="concept" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                    <Tooltip 
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="mastery" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20}>
                      {
                        conceptMasteryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.mastery < 60 ? '#ef4444' : entry.mastery < 75 ? '#f59e0b' : '#10b981'} />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <h3 className="font-bold text-lg text-[#0b192c] mb-6">Grade Distribution</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 500, color: '#475569' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Need Attention List */}
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm flex flex-col">
              <h3 className="font-bold text-lg text-[#0b192c] mb-4">Students Needing Attention</h3>
              <div className="flex-1 overflow-y-auto pr-2">
                <ul className="divide-y divide-slate-100">
                  <li className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">AJ</div>
                      <div>
                        <div className="font-bold text-sm text-slate-800">Alex Johnson</div>
                        <div className="text-xs text-slate-500">Struggling with Waves</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">Avg: 54%</div>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">MK</div>
                      <div>
                        <div className="font-bold text-sm text-slate-800">Mia Khan</div>
                        <div className="text-xs text-slate-500">Missed last 2 assignments</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">Avg: 68%</div>
                  </li>
                  <li className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">PL</div>
                      <div>
                        <div className="font-bold text-sm text-slate-800">Priya Lal</div>
                        <div className="text-xs text-slate-500">Dropped 15% this week</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">Avg: 71%</div>
                  </li>
                </ul>
              </div>
              <button className="w-full mt-4 py-2 text-sm font-bold text-[#0284c7] hover:bg-[#f0f7ff] rounded-lg transition-colors border border-transparent hover:border-[#bae6fd]">
                Message Selected Students
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "students" && !selectedStudent && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">Student Directory</h2>
          <div className="bg-white rounded-2xl border border-[#dce9f8] shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-100">
              <li 
                onClick={() => setSelectedStudent("Rahul")}
                className="px-6 py-4 flex items-center justify-between hover:bg-[#f0f7ff] cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-bold text-slate-800">Rahul Sharma</div>
                  <div className="text-xs text-slate-500">Physics & Math</div>
                </div>
                <div className="text-sm font-bold text-[#0284c7]">View Profile →</div>
              </li>
              <li 
                onClick={() => setSelectedStudent("Sarah")}
                className="px-6 py-4 flex items-center justify-between hover:bg-[#f0f7ff] cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-bold text-slate-800">Sarah Jenkins</div>
                  <div className="text-xs text-slate-500">Physics & Math</div>
                </div>
                <div className="text-sm font-bold text-[#0284c7]">View Profile →</div>
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "students" && selectedStudent && (
        <div className="space-y-6 animate-fade-in">
          <button 
            onClick={() => setSelectedStudent(null)}
            className="text-sm font-bold text-[#0284c7] hover:underline"
          >
            ← Back to Students
          </button>
          
          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">{selectedStudent} — Learning Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm flex flex-col justify-center">
              <div className="text-sm font-semibold text-[#64748b]">Average Score</div>
              <div className="text-3xl font-extrabold text-[#0284c7] mt-1">78%</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm flex flex-col justify-center">
              <div className="text-sm font-semibold text-[#64748b]">Improvement</div>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1">+14%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <h3 className="font-bold text-lg text-emerald-800 mb-4">Strong Concepts</h3>
              <ul className="space-y-3 text-sm font-semibold text-slate-700">
                <li className="flex items-center gap-2">🟢 Newton's Laws</li>
                <li className="flex items-center gap-2">🟢 Work & Energy</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#dce9f8] shadow-sm">
              <h3 className="font-bold text-lg text-rose-800 mb-4">Weak Concepts</h3>
              <ul className="space-y-3 text-sm font-semibold text-slate-700">
                <li className="flex items-center gap-2">🟠 Sign Convention</li>
                <li className="flex items-center gap-2">🔴 Ray Diagrams</li>
                <li className="flex items-center gap-2">🟠 Conceptual Explanations</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#fff1f2] border border-[#fecdd3] p-6 rounded-2xl">
            <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2">Most Common Mistakes</h4>
            <p className="text-sm text-rose-950 font-medium">
              Repeatedly missing units in final answers, and struggling with theoretical explanations vs pure numerical calculation.
            </p>
          </div>
        </div>
      )}

      {activeTab === "architecture" && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-heading font-extrabold text-3xl text-[#0b192c]">How EduEval AI Works</h2>
          <p className="text-slate-600 font-medium mb-8">
            Our pipeline digitizes handwritten tests, extracts concepts via LLM, and maps them against your evaluation criteria.
          </p>
          <ArchitectureDiagram onOpenEvaluationStudio={() => setActiveTab("evaluations")} />
        </div>
      )}

      {/* Placeholders for other tabs */}
      {["evaluations", "settings"].includes(activeTab) && (
        <div className="flex items-center justify-center h-64 text-slate-400 font-medium">
          {activeTab} view coming soon
        </div>
      )}
    </DashboardLayout>
  );
};
