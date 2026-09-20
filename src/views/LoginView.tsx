import React, { useState } from "react";
import { EduEvalLogo } from "../components/EduEvalLogo";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface LoginViewProps {
  onLoginSuccess: (
    id: number,
    name: string,
    role: "teacher" | "student"
  ) => void;
}


export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      if (mode === "signup") {
        const cleanName =
          name.trim() ||
          cleanEmail.split("@")[0] ||
          "Student";

        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            password,
            role,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          showToast(
            data.message || "Unable to create account.",
            "error"
          );
          return;
        }

        showToast("Account created successfully!", "success");

        setTimeout(() => {
          onLoginSuccess(
            data.user.id,
            data.user.name,
            data.user.role
          );
        }, 500);

        return;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        showToast(
          data.message || "Invalid email or password.",
          "error"
        );
        return;
      }

      showToast("Welcome back!", "success");

      setTimeout(() => {
        onLoginSuccess(
          data.user.id,
          data.user.name,
          data.user.role
        );
      }, 500);

    } catch (error) {
      console.error("Authentication error:", error);

      showToast(
        "Unable to connect to the server. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] flex flex-col items-center justify-center p-4 relative overflow-hidden">

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-xl backdrop-blur-xl border z-50 flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-green-50/90 border-green-200 text-green-800"
                : "bg-red-50/90 border-red-200 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}

            <span className="font-bold text-sm">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#e0f2fe] to-transparent -z-10" />

      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38bdf8]/10 rounded-full blur-[80px] -z-10" />

      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-[#818cf8]/10 rounded-full blur-[80px] -z-10" />

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-scale-in">

        <div className="flex flex-col items-center mb-6">

          <EduEvalLogo
            size={48}
            showGlow={false}
            variant="lockup"
            theme="light"
            className="mb-6"
            animateTextOnly={true}
          />

          <div className="flex p-1 bg-slate-100 rounded-xl w-full max-w-[240px] relative">

            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
                mode === "signin"
                  ? "left-1"
                  : "left-[calc(50%+2px)]"
              }`}
            />

            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${
                mode === "signin"
                  ? "text-[#0284c7]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 text-sm font-bold relative z-10 transition-colors ${
                mode === "signup"
                  ? "text-[#0284c7]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign Up
            </button>

          </div>
        </div>

        <div className="text-center mb-6">

          <h2 className="font-heading font-extrabold text-2xl text-[#0b192c]">
            {mode === "signin"
              ? "Welcome Back"
              : "Create an Account"}
          </h2>

          <p className="text-sm text-[#64748b] mt-1">
            {mode === "signin"
              ? "Enter your details to access your account"
              : "Join us to transform education with AI"}
          </p>

        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <AnimatePresence mode="popLayout">

            {mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >

                <label className="block text-xs font-bold text-[#0b192c] uppercase mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 bg-white/50"
                />

              </motion.div>
            )}

          </AnimatePresence>

          {mode === "signup" && (
            <div>

              <label className="block text-xs font-bold text-[#0b192c] uppercase mb-2">
                Account Type
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                    role === "student"
                      ? "border-[#0284c7] bg-[#e0f2fe] text-[#0284c7]"
                      : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  Student
                </button>

                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                    role === "teacher"
                      ? "border-[#0284c7] bg-[#e0f2fe] text-[#0284c7]"
                      : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  Teacher
                </button>

              </div>

            </div>
          )}

          <div>

            <label className="block text-xs font-bold text-[#0b192c] uppercase mb-1">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 bg-white/50"
            />

          </div>

          <div>

            <label className="block text-xs font-bold text-[#0b192c] uppercase mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 bg-white/50"
            />

          </div>

          {mode === "signin" && (
            <div className="flex justify-end">

              <button
                type="button"
                onClick={() =>
                  showToast(
                    "Password reset will be connected next.",
                    "success"
                  )
                }
                className="text-xs font-semibold text-[#0284c7] hover:text-[#0369a1]"
              >
     t password?
              </button>

            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#075985] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] mt-2"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>

        </form>

        <div className="mt-6 flex items-center justify-center gap-3">

          <div className="h-px bg-slate-200 flex-1" />

          <span className="text-xs font-semibold text-slate-400 uppercase">
            or continue with
          </span>

          <div className="h-px bg-slate-200 flex-1" />

        </div>

        <button
          type="button"
          disabled
          className="mt-6 w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-[#0b192c] font-bold py-3.5 rounded-xl transition-all shadow-sm opacity-60 cursor-not-allowed"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />

          Google

          <span className="text-xs text-slate-400">
            (Coming soon)
          </span>
        </button>

      </div>
    </div>
  );
};
