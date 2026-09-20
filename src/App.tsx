import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "./components/SplashScreen";
import { LandingView } from "./views/LandingView";
import { LoginView } from "./views/LoginView";
import { TeacherDashboard } from "./views/TeacherDashboard";
import { StudentDashboard } from "./views/StudentDashboard";

type UserRole = "teacher" | "student";

export default function App() {
  const [appState, setAppState] = useState<
    "splash" | "landing" | "login" | "teacher" | "student"
  >("splash");

  const [userName, setUserName] = useState("Student");
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const handleSplashComplete = () => {
    setAppState("landing");
  };

  const handleLoginSuccess = (
    id: number,
    name: string,
    role: UserRole
  ) => {
    setUserId(id);
    setUserName(name);
    setUserRole(role);
    setAppState(role);
  };

  const handleLogout = () => {
    setUserId(null);
    setUserName("Student");
    setUserRole(null);
    setAppState("landing");
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] selection:bg-[#86f2e4] selection:text-[#005049] relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {appState === "splash" && (
          <SplashScreen
            key="splash-screen"
            onComplete={handleSplashComplete}
          />
        )}
      </AnimatePresence>

      {appState === "landing" && (
        <LandingView
          onStartEvaluation={() => setAppState("login")}
          onViewDemo={() => setAppState("login")}
          onLogin={() => setAppState("login")}
        />
      )}

      {appState === "login" && (
        <LoginView onLoginSuccess={handleLoginSuccess} />
      )}

      {appState === "teacher" && userRole === "teacher" && (
        <TeacherDashboard
          onLogout={handleLogout}
          userName={userName}
          userId={userId}
        />
      )}

      {appState === "student" && userRole === "student" && (
        <StudentDashboard
          onLogout={handleLogout}
          userName={userName}
        />
      )}
    </div>
  );
}
