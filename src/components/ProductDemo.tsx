import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, BrainCircuit, ArrowRight } from "lucide-react";

export const ProductDemo: React.FC = () => {
  return (
    <section className="py-24 bg-[#0b1b34] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#087fbe]/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#11b5e4]/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            See What Your Score Really Means
          </h2>
          <p className="text-lg text-slate-300 font-medium">
            Go beyond marks with concept-level insights.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-200"
        >
          {/* Left Column: Handwritten Answer */}
          <div className="lg:w-1/2 p-6 md:p-10 bg-slate-50 border-r border-slate-200 flex flex-col">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Submitted Answer</h3>
            
            <div className="flex-1 bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative font-[Caveat,cursive] text-2xl text-slate-700 leading-[1.8]"
                 style={{ backgroundImage: 'linear-gradient(transparent 95%, #e2e8f0 95%)', backgroundSize: '100% 2rem' }}>
              The process of <span className="bg-emerald-100/80 border-b-2 border-emerald-400 rounded px-1">photosynthesis</span> converts light energy into 
              chemical energy. It takes place in the <span className="bg-emerald-100/80 border-b-2 border-emerald-400 rounded px-1">chloroplasts</span> of 
              plant cells. <br/><br/>
              During this process, plants take in <span className="bg-amber-100/80 border-b-2 border-amber-400 rounded px-1">water and carbon dioxide</span> 
              to produce <span className="bg-rose-100/80 border-b-2 border-rose-400 rounded px-1" title="Missing specific sugar output">food</span>.
              <br/><br/>
              Oxygen is released as a byproduct.
              
              {/* Floating Tooltips for demo effect */}
              <div className="absolute top-1/4 right-2 bg-emerald-50 text-emerald-700 text-xs font-sans font-bold px-2 py-1 rounded shadow-sm border border-emerald-200 flex items-center gap-1 -translate-y-4 translate-x-4 opacity-80 hidden sm:flex">
                <CheckCircle2 className="w-3 h-3" /> Core Concept
              </div>
              <div className="absolute top-1/2 right-6 bg-amber-50 text-amber-700 text-xs font-sans font-bold px-2 py-1 rounded shadow-sm border border-amber-200 flex items-center gap-1 opacity-80 hidden sm:flex">
                <AlertTriangle className="w-3 h-3" /> Incomplete
              </div>
            </div>
          </div>

          {/* Right Column: Evaluation Summary */}
          <div className="lg:w-1/2 p-6 md:p-10 bg-white flex flex-col gap-8">
            {/* Score & Metrics */}
            <div>
              <div className="flex items-end justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Evaluation Summary</h3>
                <div className="text-right">
                  <div className="text-3xl font-black text-[#0b1b34]">7.5<span className="text-lg text-slate-400 font-medium">/10</span></div>
                  <div className="text-xs font-bold text-[#087fbe] uppercase">Score</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Concept Understanding", val: "82%", fill: "82%" },
                  { label: "Accuracy", val: "76%", fill: "76%" },
                  { label: "Completeness", val: "68%", fill: "68%" }
                ].map((m, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <div className="text-lg font-bold text-[#0b1b34]">{m.val}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase leading-tight mt-1 h-6">{m.label}</div>
                    <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
                      <div className="bg-[#11b5e4] h-full rounded-full" style={{ width: m.fill }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Concepts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Concepts Understood</h4>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Main definition
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Core process
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Key components
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Concepts To Improve</h4>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-start gap-2 text-slate-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> Application
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> Relationship between concepts
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" /> Supporting example
                  </li>
                </ul>
              </div>
            </div>

            {/* AI Feedback */}
            <div className="bg-[#f0f7ff] border border-[#bae6fd] rounded-xl p-5 flex gap-4">
              <BrainCircuit className="w-6 h-6 text-[#087fbe] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-[#087fbe] uppercase tracking-wider mb-2">AI Feedback</h4>
                <p className="text-sm text-[#0b1b34] leading-relaxed font-medium">
                  "Your answer demonstrates a strong understanding of the main concept. However, the explanation of how the two concepts interact is incomplete, and specifying 'glucose' instead of 'food' is required for full accuracy."
                </p>
              </div>
            </div>

            {/* Practice & Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recommended Practice</h4>
                <div className="flex gap-2">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">Question 1</span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">Question 2</span>
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">Question 3</span>
                </div>
              </div>
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0b1b34] text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#1a2c4c] transition-colors">
                <span>View Full Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
