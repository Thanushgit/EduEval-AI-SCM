import React from "react";
import { motion, type Variants } from "framer-motion";

interface EduEvalLogoProps {
  size?: number | string;
  className?: string;
  showGlow?: boolean;
  animated?: boolean;
  animateTextOnly?: boolean;
  variant?: "icon" | "lockup";
  theme?: "light" | "dark";
}

export const EduEvalLogo: React.FC<EduEvalLogoProps> = ({
  size = 40,
  className = "",
  showGlow = false,
  animated = false,
  animateTextOnly = false,
  variant = "icon",
  theme = "light",
}) => {
  const pixelSize = typeof size === "number" ? `${size}px` : size;
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-[#0b192c]";

  // Animation Variants
  const drawVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 2, ease: "easeInOut" } 
    }
  };

  const fillVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (customOpacity: number) => ({
      opacity: customOpacity,
      transition: { delay: 2, duration: 1.5, ease: "easeOut" }
    })
  };

  const nodeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 2.2, duration: 0.8, type: "spring" }
    }
  };
  
  const treeVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (customOpacity: number) => ({ 
      pathLength: 1, 
      opacity: customOpacity, 
      transition: { delay: 1.2, duration: 2, ease: "easeInOut" } 
    })
  };

  // Determine animation states based on `animated` prop
  const initialDraw = animated ? "hidden" : "visible";
  const animateDraw = "visible";

  // The core Icon SVG (Book + Glowing Tree)
  const Icon = (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        variant === "icon" ? className : ""
      }`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {showGlow && (
        <motion.div
          initial={animated ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0284c7]/40 via-[#00d2ff]/30 to-[#38bdf8]/30 blur-md pointer-events-none scale-125" 
        />
      )}

      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 overflow-visible"
      >
        <defs>
          {/* Luminous tree glow gradient */}
          <linearGradient id="neuralCyanGlow" x1="100" y1="20" x2="100" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#00d2ff" stopOpacity="1" />
            <stop offset="70%" stopColor="#0284c7" stopOpacity="1" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="1" />
          </linearGradient>

          {/* Radial light burst at tree root */}
          <radialGradient id="centerBurst" cx="100" cy="130" r="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="20%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0284c7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </radialGradient>

          <filter id="electricGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central Luminescence Burst */}
        <motion.circle 
          cx="100" cy="130" r="38" fill="url(#centerBurst)"
          variants={fillVariants}
          custom={1}
          initial={initialDraw}
          animate={animateDraw}
        />

        {/* Neural Tree Emerging */}
        <g id="neural-tree" filter="url(#electricGlow)">
          {/* Main Trunk */}
          <motion.path
            d="M97 142 C 96 125, 88 110, 78 95 M100 142 L100 85 M103 142 C 104 125, 112 110, 122 95"
            stroke="url(#neuralCyanGlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
            variants={treeVariants}
            custom={1}
            initial={initialDraw}
            animate={animateDraw}
          />
          <motion.path
            d="M99 135 C 93 118, 70 102, 54 88 M101 135 C 107 118, 130 102, 146 88"
            stroke="#00d2ff"
            strokeWidth="2"
            strokeLinecap="round"
            variants={treeVariants}
            custom={1}
            initial={initialDraw}
            animate={animateDraw}
          />
          {/* Branches */}
          <motion.path
            d="M78 95 C 68 85, 52 78, 40 68 M78 95 C 75 80, 70 65, 62 52 M100 85 C 94 70, 85 55, 80 40 M100 85 C 106 70, 115 55, 120 40 M122 95 C 125 80, 130 65, 138 52 M122 95 C 132 85, 148 78, 160 68"
            stroke="#38bdf8"
            strokeWidth="1.6"
            strokeLinecap="round"
            variants={treeVariants}
            custom={0.9}
            initial={initialDraw}
            animate={animateDraw}
          />
          {/* Interconnections */}
          <motion.path
            d="M 40 68 L 52 56 L 62 52 L 80 40 L 100 32 L 120 40 L 138 52 L 148 56 L 160 68 M 54 88 L 40 68 M 62 52 L 72 44 L 80 40 M 100 32 L 100 22 L 112 28 L 120 40 M 138 52 L 128 44 M 146 88 L 160 68"
            stroke="#7dd3fc"
            strokeWidth="1"
            strokeLinecap="round"
            variants={treeVariants}
            custom={0.75}
            initial={initialDraw}
            animate={animateDraw}
          />
        </g>

        {/* Synaptic Nodes */}
        <g id="synaptic-nodes">
          <motion.circle cx="100" cy="22" r="3.5" fill="#ffffff" filter="url(#electricGlow)" variants={nodeVariants} initial={initialDraw} animate={animateDraw} />
          <motion.circle cx="80" cy="40" r="3" fill="#ffffff" filter="url(#electricGlow)" variants={nodeVariants} initial={initialDraw} animate={animateDraw} />
          <motion.circle cx="120" cy="40" r="3" fill="#ffffff" filter="url(#electricGlow)" variants={nodeVariants} initial={initialDraw} animate={animateDraw} />
          <motion.circle cx="62" cy="52" r="2.8" fill="#e0f2fe" variants={nodeVariants} initial={initialDraw} animate={animateDraw} />
          <motion.circle cx="138" cy="52" r="2.8" fill="#e0f2fe" variants={nodeVariants} initial={initialDraw} animate={animateDraw} />
          <motion.circle cx="40" cy="68" r="2.5" fill="#e0f2fe" variants={nodeVariants} initial={initialDraw} animate={animateDraw} />
          <motion.circle cx="160" cy="68" r="2.5" fill="#e0f2fe" variants={nodeVariants} initial={initialDraw} animate={animateDraw} />
          <motion.circle cx="100" cy="85" r="3.2" fill="#ffffff" filter="url(#electricGlow)" variants={nodeVariants} initial={initialDraw} animate={animateDraw} />
        </g>

        {/* Clean Outlined Book Shape (Image 1 Style) */}
        <g id="open-book">
          {/* Back/Outer Cover Line */}
          <motion.path
            d="M15 145 C 55 135, 90 142, 100 156 C 110 142, 145 135, 185 145 C 185 145, 185 160, 185 160 C 145 150, 110 157, 100 171 C 90 157, 55 150, 15 160 Z"
            fill={isDark ? "#ffffff" : "#0f172a"}
            variants={fillVariants}
            custom={isDark ? 0.08 : 0.05}
            initial={initialDraw}
            animate={animateDraw}
          />
          
          {/* Top Page Edges */}
          <motion.path
            d="M15 145 C 55 135, 90 142, 100 156"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={drawVariants}
            initial={initialDraw}
            animate={animateDraw}
          />
          <motion.path
            d="M100 156 C 110 142, 145 135, 185 145"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={drawVariants}
            initial={initialDraw}
            animate={animateDraw}
          />
          
          {/* Bottom Page Edges */}
          <motion.path
            d="M15 160 C 55 150, 90 157, 100 171"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={drawVariants}
            initial={initialDraw}
            animate={animateDraw}
          />
          <motion.path
            d="M100 171 C 110 157, 145 150, 185 160"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={drawVariants}
            initial={initialDraw}
            animate={animateDraw}
          />
          
          {/* Spine / Side connectors */}
          <motion.path
            d="M15 145 L15 160 M100 156 L100 171 M185 145 L185 160"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={drawVariants}
            initial={initialDraw}
            animate={animateDraw}
          />

          {/* Inner Page Line (Detail) */}
          <motion.path
            d="M22 149 C 58 140, 90 146, 100 159"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={drawVariants}
            initial={initialDraw}
            animate={animateDraw}
            style={{ opacity: 0.6 }} // Fixed opacity for stroke here, but handled by drawVariants opacity:1. Let's merge it: drawVariants animates to opacity 1, we can add a style or just let it be 1. It's a detail line so maybe 0.6 is fine. Let's use `opacity: 0.6` in visible.
          />
          <motion.path
            d="M100 159 C 110 146, 142 140, 178 149"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={drawVariants}
            initial={initialDraw}
            animate={animateDraw}
            style={{ opacity: 0.6 }}
          />
        </g>
      </svg>
    </div>
  );

  if (variant === "icon") {
    return Icon;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Icon}
      <motion.div 
        className={`font-heading font-extrabold tracking-tight flex items-center gap-1 ${textColor}`} 
        style={{ fontSize: typeof size === 'number' ? size * 0.7 : '1.5rem', whiteSpace: 'nowrap', overflow: 'hidden' }}
        initial={animated || animateTextOnly ? "hidden" : "visible"}
        animate="visible"
        variants={{
          hidden: { opacity: 0, width: 0 },
          visible: { 
            opacity: 1, 
            width: "auto",
            transition: { 
              width: { delay: animated ? 2.3 : 0, duration: 0.8, type: "spring", bounce: 0 },
              opacity: { delay: animated ? 2.3 : 0, duration: 0.4 },
              staggerChildren: 0.08, 
              delayChildren: animated ? 2.5 : 0.2
            } 
          }
        }}
      >
        <span className="flex">
          {"EduEval AI".split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, y: 15, rotateX: -90, filter: "blur(4px)" },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  filter: "blur(0px)",
                  transition: { type: "spring", damping: 12, stiffness: 200 }
                }
              }}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </span>

        {/* Light Blue 4-pointed Spark */}
        <motion.svg
          variants={{
            hidden: { opacity: 0, scale: 0, rotate: -45 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              transition: { type: "spring", damping: 10, stiffness: 150 }
            }
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 animate-pulse ml-1"
          style={{ width: typeof size === 'number' ? size * 0.4 : '1rem', height: typeof size === 'number' ? size * 0.4 : '1rem' }}
        >
          <path
            d="M12 0C12 0 12 9.5 24 12C24 12 12.5 14.5 12 24C12 24 11.5 14.5 0 12C0 12 11.5 9.5 12 0Z"
            fill="#38bdf8"
            filter="drop-shadow(0px 0px 4px rgba(56, 189, 248, 0.6))"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

