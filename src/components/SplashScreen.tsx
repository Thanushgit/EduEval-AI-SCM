import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EduEvalLogo } from "./EduEvalLogo";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [pulsePhase, setPulsePhase] = useState(false);

  useEffect(() => {
    // Pulse trigger
    const pulseTimer = setTimeout(() => {
      setPulsePhase(true);
    }, 500);

    // Transition trigger at 5 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="splash-overlay"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050e1d] text-white overflow-hidden select-none"
    >
      {/* Background ambient electric sapphire & cyan lighting effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1.15],
            opacity: [0.2, 0.45, 0.3],
          }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0369a1] via-[#0284c7] to-[#00d2ff] blur-[140px] opacity-35"
        />

        {/* Subtle cyan node grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Center Shared Brand Logo (layoutId: "edueval-brand-logo") */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glowing pulse aura ring */}
        <motion.div
          animate={{
            scale: [1, 1.6, 2.0],
            opacity: [0.7, 0.25, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            repeat: Infinity,
          }}
          className="absolute w-40 h-40 rounded-full bg-[#00d2ff] blur-2xl pointer-events-none -top-4"
        />

        <motion.div
          layoutId="edueval-brand-logo"
          transition={{
            type: "spring",
            stiffness: 110,
            damping: 19,
            mass: 1.1,
          }}
          className="flex items-center justify-center cursor-pointer mb-6"
        >
          <EduEvalLogo size={96} showGlow={true} variant="lockup" theme="dark" animated={true} />
        </motion.div>

        {/* Phase 1 Subtitle & Cognitive Shimmer Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, delay: 3.5 }}
          className="mt-6 flex flex-col items-center text-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm font-medium text-slate-300 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#f472b6] animate-ping" />
            <span>Decoding Handwritten Logic with Neural Precision.</span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.2, delay: 3.8, ease: "easeInOut" }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent mt-4 shadow-[0_0_8px_#00d2ff]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
