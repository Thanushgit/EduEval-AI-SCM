import React, { useState } from "react";
import { X, Shield, FileText, HelpCircle, Send, Check } from "lucide-react";
import { EduEvalLogo } from "./EduEvalLogo";

interface LegalAndSupportModalProps {
  isOpen: boolean;
  type: "privacy" | "terms" | "support" | null;
  onClose: () => void;
}

export const LegalAndSupportModal: React.FC<LegalAndSupportModalProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !type) return null;

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSupportMessage("");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071322]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#cbdff5] shadow-2xl overflow-hidden my-auto animate-scale-in text-left">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e0ecfb] bg-[#f8fbff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0c2340] border border-[#38bdf8]/40 flex items-center justify-center p-1 shadow-xs">
              <EduEvalLogo size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#0b192c]">
                {type === "privacy" && "Privacy Policy"}
                {type === "terms" && "Terms of Service"}
                {type === "support" && "Contact Academic Support"}
              </h3>
              <p className="text-xs text-[#64748b]">EduEval AI Institutional Compliance</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {type === "privacy" && (
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-base text-[#0b192c]">Student Data Privacy & FERPA Compliance</h4>
              <p>EduEval AI is built strictly according to FERPA, COPPA, and GDPR student data protection standards. All uploaded handwritten answer sheets and exam submissions are processed securely in memory and never used for non-consensual model training.</p>
              <h5 className="font-bold text-[#0b192c]">1. Data Minimization</h5>
              <p>Only text tokens and mathematical proof steps necessary for rubric scoring are parsed. Personally Identifiable Information (PII) is encrypted at rest and in transit.</p>
              <h5 className="font-bold text-[#0b192c]">2. Retention & Deletion</h5>
              <p>Institutions maintain complete data ownership. Instructors can permanently erase batch submissions, student roster transcripts, and feedback records at any time.</p>
            </div>
          )}

          {type === "terms" && (
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-base text-[#0b1c30]">Terms of Academic Service</h4>
              <p>By using the EduEval AI platform, educational institutions, teachers, and students agree to utilize AI-generated evaluations as pedagogical aids and formative recommendations.</p>
              <h5 className="font-bold text-[#0b192c]">1. Instructor Primacy & Verification</h5>
              <p>EduEval AI is designed to augment and empower human educators. Teachers retain the final authority and ability to override any AI-assigned marks or feedback.</p>
              <h5 className="font-bold text-[#0b192c]">2. Academic Integrity</h5>
              <p>Users agree not to utilize the platform for unauthorized test duplication or circumvention of institutional evaluation guidelines.</p>
            </div>
          )}

          {type === "support" && (
            <form onSubmit={handleSupportSubmit} className="space-y-4">
              {submitted ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-base text-emerald-950">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-800">Our pedagogical support team will respond to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <p className="text-xs text-slate-600">
                    Need help setting up custom rubrics, batch student ingestion, or LMS integrations (Canvas, Google Classroom, Moodle)? Send us a note!
                  </p>

                  <div>
                    <label className="block text-xs font-bold text-[#0b192c] uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={supportName}
                      onChange={(e) => setSupportName(e.target.value)}
                      placeholder="e.g. Prof. Eleanor Vance"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b192c] uppercase mb-1">Institutional Email</label>
                    <input
                      type="email"
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      placeholder="e.g. evance@university.edu"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0b192c] uppercase mb-1">Message / Question</label>
                    <textarea
                      rows={3}
                      required
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      placeholder="How can our support team assist with your evaluation workflows?"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0284c7]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support</span>
                  </button>
                </>
              )}
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#e0ecfb] bg-[#f8fbff] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#0284c7] hover:bg-[#e0f2fe] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
