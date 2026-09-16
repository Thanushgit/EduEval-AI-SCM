import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const FAQ: React.FC = () => {
  const faqs = [
    { q: "How does EduEval AI evaluate handwritten answers?", a: "EduEval AI uses advanced OCR to transcribe handwriting, then applies semantic analysis to understand the meaning behind the text rather than just matching keywords." },
    { q: "How does semantic evaluation differ from keyword matching?", a: "Keyword matching looks for specific words, while semantic evaluation understands the context and concepts expressed, giving credit even if students use synonyms or different phrasing." },
    { q: "How does concept-based grading work?", a: "Educators define core concepts required for an answer. The AI evaluates if the student's answer demonstrates understanding of each specific concept, awarding marks accordingly." },
    { q: "Can teachers customize marking schemes?", a: "Yes, educators have full control over the marking rubrics, expected concepts, and weightage for each question." },
    { q: "Can students upload handwritten answer sheets?", a: "Yes, students can capture or upload images of their handwritten answers, which are then processed by the platform." },
    { q: "How does EduEval AI identify learning gaps?", a: "By breaking down answers into concepts, the AI can pinpoint exactly which concepts a student missed, misunderstood, or failed to apply correctly." },
    { q: "How are targeted practice questions generated?", a: "Based on the identified learning gaps, the AI recommends specific practice questions focusing on the concepts the student struggled with." },
    { q: "How accurate is AI evaluation?", a: "EduEval AI is designed for high accuracy in conceptual understanding, but we always keep educators in the loop. Teachers can review and override any AI-generated score or feedback." },
    { q: "What happens to uploaded exam answers and student data?", a: "We prioritize privacy. Uploaded data is securely processed solely for evaluation purposes and is not used to train public models without consent." },
    { q: "Can educators review or override AI evaluations?", a: "Absolutely. EduEval AI acts as an assistant. Educators can review all evaluations, modify scores, and edit feedback before it reaches the student." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1b34] mb-4">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
            >
              <span className="font-bold text-[#0b1b34] pr-8">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-4 bg-white"
                >
                  <p className="text-slate-500 font-medium leading-relaxed pt-2 border-t border-slate-100">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};
