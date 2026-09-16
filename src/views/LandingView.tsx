import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, ArrowRight } from "lucide-react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ValueStrip } from "../components/ValueStrip";
import { HowItWorks } from "../components/HowItWorks";
import { ProductDemo } from "../components/ProductDemo";
import { WhyEduEval } from "../components/WhyEduEval";
import { Audience } from "../components/Audience";
import { Comparison } from "../components/Comparison";
import { FeatureGrid } from "../components/FeatureGrid";
import { TrustSection } from "../components/TrustSection";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";
import { EduEvalLogo } from "../components/EduEvalLogo";

interface LandingViewProps {
  onStartEvaluation: () => void;
  onViewDemo: () => void;
  onLogin: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartEvaluation,
  onViewDemo,
  onLogin
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleNavigate = (section: string) => {
    setIsDrawerOpen(false); // Close menu if open
    
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const mappedSection = section === "students" || section === "educators" 
        ? "audience" 
        : section === "about" 
          ? "trust" 
          : section;
      const el = document.getElementById(`${mappedSection}-section`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#f8f9ff] overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f8f9ff]">
        <motion.div
          animate={{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#087fbe]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -100, 100, 0], y: [0, 100, -50, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-[#11b5e4]/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Header
          onOpenMenu={() => setIsDrawerOpen(true)}
          onOpenProfile={onLogin}
          onStartEvaluation={onStartEvaluation}
          onOpenDemo={onViewDemo}
          onNavigateSection={handleNavigate}
        />

        <main className="flex-1">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            
            <Hero onStartEvaluation={onStartEvaluation} onViewDemo={onViewDemo} />
            
            <ValueStrip />
            
            <HowItWorks />
            
            <ProductDemo />
            
            <WhyEduEval />
            
            <Audience />
            
            <Comparison />
            
            <FeatureGrid />
            
            <TrustSection />
            
            <FAQ />
            
            <FinalCTA onStartEvaluation={onStartEvaluation} onViewDemo={onViewDemo} />

          </motion.div>
        </main>
        
        <Footer />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-[#0b1b34]/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <EduEvalLogo size={24} showGlow={false} variant="lockup" theme="light" />
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">
                {[
                  { id: "home", label: "Home" },
                  { id: "how-it-works", label: "How It Works" },
                  { id: "features", label: "Features" },
                  { id: "students", label: "For Students" },
                  { id: "educators", label: "For Educators" },
                  { id: "about", label: "About" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="w-full text-left px-4 py-3 rounded-xl font-bold text-slate-600 hover:text-[#087fbe] hover:bg-[#e0f2fe] transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="p-5 border-t border-slate-100 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-[#087fbe] bg-[#f0f7ff] hover:bg-[#e0f2fe] transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onStartEvaluation();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#087fbe] to-[#066192] shadow-md shadow-[#087fbe]/25 active:scale-95 transition-all"
                >
                  <span>Start Evaluating</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
