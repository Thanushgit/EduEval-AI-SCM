const fs = require('fs');

const content = fs.readFileSync('src/views/LandingView.tsx', 'utf-8');

const replacement = `import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { EvaluationCarousel } from "../components/EvaluationCarousel";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";`;

const updatedContent = content.replace(/import React, \{ useState \} from "react";\nimport \{ motion \} from "framer-motion";\nimport \{ Header \} from "\.\.\/components\/Header";\nimport \{ Hero \} from "\.\.\/components\/Hero";\nimport \{ ArchitectureDiagram \} from "\.\.\/components\/ArchitectureDiagram";/, replacement);

const replacement2 = `            <Hero
              onStartEvaluation={onStartEvaluation}
              onViewDemo={onViewDemo}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            >
              <EvaluationCarousel />
            </motion.div>

            <motion.div`;

const updatedContent2 = updatedContent.replace(/            <Hero\n              onStartEvaluation=\{onStartEvaluation\}\n              onViewDemo=\{onViewDemo\}\n            \/>\n            <motion\.div/, replacement2);

fs.writeFileSync('src/views/LandingView.tsx', updatedContent2);
