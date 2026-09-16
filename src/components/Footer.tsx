import React from "react";
import { EduEvalLogo } from "./EduEvalLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b1b34] text-slate-300 py-16 border-t border-[#1a2c4c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <EduEvalLogo size={24} showGlow={false} variant="icon" theme="dark" />
              <span className="font-heading font-black text-xl text-white tracking-tight">EduEval AI</span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
              AI-powered semantic evaluation for better learning.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Product</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Evaluation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Practice</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">For</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">Students</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Educators</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Institutions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-[#1a2c4c] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} EduEval AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">LinkedIn</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
