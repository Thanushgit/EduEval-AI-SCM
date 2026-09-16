import React from "react";
import { motion } from "framer-motion";
import { Menu, User, Sparkles, RotateCcw, LogIn, ArrowRight } from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenProfile: () => void;
  onStartEvaluation: () => void;
  onOpenDemo: () => void;
  onReplayIntro?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenProfile,
  onStartEvaluation,
  onOpenDemo,
  onReplayIntro,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#f8f9ff]/80 backdrop-blur-lg shadow-sm border-b border-[#e0ecfb]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Left Side: Mobile Menu Button & Shared Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            id="btn-nav-menu"
            onClick={onOpenMenu}
            aria-label="Open Navigation Menu"
            className="lg:hidden p-2 -ml-2 rounded-lg text-[#0284c7] hover:bg-[#e0f2fe] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Shared Motion Layout Brand Logo */}
          <motion.div
            layoutId="edueval-brand-logo"
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 19,
              mass: 1.1,
            }}
            className="flex items-center"
          >
            <a
              id="logo-brand-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <EduEvalLogo size={32} showGlow={false} variant="lockup" theme="light" animateTextOnly={true} />
            </a>
          </motion.div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              if (onNavigateSection) onNavigateSection("home");
              else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-3.5 py-1.5 rounded-lg text-[#0284c7] font-semibold bg-[#e0f2fe] hover:bg-[#bae6fd] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => {
              if (onNavigateSection) onNavigateSection("how-it-works");
              else {
                const el = document.getElementById("how-it-works-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-3.5 py-1.5 rounded-lg hover:text-[#0284c7] hover:bg-[#f0f7ff] transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => {
              if (onNavigateSection) onNavigateSection("features");
              else {
                const el = document.getElementById("features-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-3.5 py-1.5 rounded-lg hover:text-[#0284c7] hover:bg-[#f0f7ff] transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => {
              if (onNavigateSection) onNavigateSection("students");
              else {
                const el = document.getElementById("audience-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-3.5 py-1.5 rounded-lg hover:text-[#0284c7] hover:bg-[#f0f7ff] transition-colors cursor-pointer"
          >
            For Students
          </button>
          <button
            onClick={() => {
              if (onNavigateSection) onNavigateSection("educators");
              else {
                const el = document.getElementById("audience-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-3.5 py-1.5 rounded-lg hover:text-[#0284c7] hover:bg-[#f0f7ff] transition-colors cursor-pointer"
          >
            For Educators
          </button>
          <button
            onClick={() => {
              if (onNavigateSection) onNavigateSection("about");
              else {
                const el = document.getElementById("trust-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-3.5 py-1.5 rounded-lg hover:text-[#0284c7] hover:bg-[#f0f7ff] transition-colors cursor-pointer"
          >
            About
          </button>
        </div>

        {/* Right Side: Login Button, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Login Button */}
          <button
            id="btn-header-login"
            onClick={onOpenProfile}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#0b192c] hover:text-[#0284c7] bg-transparent hover:bg-[#f0f7ff] active:scale-95 transition-all cursor-pointer"
          >
            <span>Login</span>
          </button>

          {/* Start Evaluating Button */}
          <button
            id="btn-header-eval"
            onClick={onStartEvaluation}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#075985] active:scale-95 shadow-md shadow-[#0284c7]/25 transition-all cursor-pointer"
          >
            <span>Start Evaluating</span>
            <ArrowRight className="w-4 h-4 hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
};
