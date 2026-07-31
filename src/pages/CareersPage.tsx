import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/brandData';
import { Sparkles, Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface CareersPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, onOpenAudit }) => {
  const principles = [
    'No Random Design Without Strategy',
    'Clear, Honest Communication',
    'Structured Delivery Milestones',
    'Deep Intellectual Curiosity',
    'Obsession with Precision & Typography',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-2xs">
        <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Careers & Culture</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl">
          Build brands that matter. Join ORIXNAL.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 mt-4 max-w-3xl leading-relaxed">
          We are always looking for exceptional brand strategists, front-end engineers, legal IP consultants, and visual designers who value clarity over hype.
        </p>
      </div>

      {/* Work Ethics */}
      <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl font-extrabold text-neutral-900">Our Working Standards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((p, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-2xl text-xs sm:text-sm font-bold text-neutral-800">
              <CheckCircle2 className="w-5 h-5 text-purple-700 shrink-0" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Open Application Box */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 space-y-4 text-center">
        <h3 className="text-2xl font-extrabold text-neutral-900">Spontaneous Application</h3>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto">
          Send your portfolio, strategy essays, or GitHub profile directly to Founder Asim Khan via email at hello@orixnal.com.
        </p>
        <div className="pt-2">
          <a
            href={`mailto:${COMPANY_DETAILS.email}?subject=Career Application - ORIXNAL`}
            className="orixnal-gradient-bg text-white font-bold py-3.5 px-8 rounded-2xl inline-flex items-center gap-2 text-sm shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Apply via Email: hello@orixnal.com</span>
          </a>
        </div>
      </div>

    </div>
  );
};
