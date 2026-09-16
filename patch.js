const fs = require('fs');

const heroContent = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

const replacement = `import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, CheckCircle2, Search, BrainCircuit, FileSignature, Microscope, BookOpen } from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface HeroProps {
  onStartEvaluation: () => void;
  onViewDemo: () => void;
}

const slides = [
  {
    id: "physics",
    title: "Physics & Math OCR",
    icon: <FileSignature className="w-5 h-5" />,
    color: "#0284c7",
    lightBg: "bg-[#f8fbff]",
    border: "border-[#e0ecfb]",
    step1: "Force = Mass × Acceleration. F=ma.",
    step2Tags: [
      { text: "Formula Correct", type: "success" },
      { text: "Variables Defined", type: "success" },
      { text: "Missing Example", type: "warning" },
    ],
    score: "4/5 (80%)",
    feedback: "Great understanding of Newton's Second Law! Next time, include a real-world example (like pushing a car) to get full marks."
  },
  {
    id: "literature",
    title: "Essay Evaluation",
    icon: <BookOpen className="w-5 h-5" />,
    color: "#8b5cf6",
    lightBg: "bg-[#faf5ff]",
    border: "border-[#e9d5ff]",
    step1: "The protagonist's journey symbolizes the struggle against societal norms, as seen when he refuses the royal decree.",
    step2Tags: [
      { text: "Strong Thesis", type: "success" },
      { text: "Good Evidence", type: "success" },
      { text: "Tone: Analytical", type: "info" },
    ],
    score: "9/10 (90%)",
    feedback: "Excellent thematic analysis. To elevate this further, connect the royal decree to the historical context of the author's era."
  },
  {
    id: "chemistry",
    title: "Chemistry Equations",
    icon: <Microscope className="w-5 h-5" />,
    color: "#10b981",
    lightBg: "bg-[#ecfdf5]",
    border: "border-[#a7f3d0]",
    step1: "2H2 + O2 → 2H2O (Combustion)",
    step2Tags: [
      { text: "Balanced Correctly", type: "success" },
      { text: "States Missing", type: "warning" },
    ],
    score: "3/4 (75%)",
    feedback: "The stoichiometry is perfectly balanced. Remember to include state symbols like (g) for gases and (l) for liquids."
  }
];

export const Hero: React.FC<HeroProps> = ({ onStartEvaluation, onViewDemo }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Stagger container animation variants`;

const outputContent = heroContent.replace(/import React from "react";\nimport \{ motion \} from "framer-motion";\nimport \{ ArrowRight, Play, CheckCircle2 \} from "lucide-react";\nimport \{ EduEvalLogo \} from "\.\/EduEvalLogo";\n\ninterface HeroProps \{\n  onStartEvaluation: \(\) => void;\n  onViewDemo: \(\) => void;\n\}\n\nexport const Hero: React\.FC<HeroProps> = \(\{ onStartEvaluation, onViewDemo \}\) => \{\n  \/\/ Stagger container animation variants/g, replacement);

fs.writeFileSync('src/components/Hero.tsx', outputContent);
