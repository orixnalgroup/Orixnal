import React, { useState } from 'react';
import { PageRoute, CaseStudy } from '../types';
import { CASE_STUDIES, COMPANY_DETAILS } from '../data/brandData';
import { Sparkles, ArrowRight, CheckCircle2, Phone, Mail, ChevronRight } from 'lucide-react';

interface CaseStudiesPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate, onOpenAudit }) => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-2xs">
        <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Strategic Case Studies</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl">
          Detailed breakdowns of brand thinking & business outcomes.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 mt-4 max-w-3xl leading-relaxed">
          Explore how clarity-driven positioning, legal protection, visual dialects, and web engineering turn market noise into enterprise brand equity.
        </p>
      </div>

      {/* Case Study Detail Modal or View */}
      {selectedCase ? (
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 space-y-8 animate-fadeIn">
          <button
            onClick={() => setSelectedCase(null)}
            className="text-xs font-bold text-neutral-600 hover:text-neutral-900 bg-neutral-100 px-4 py-2 rounded-full inline-flex items-center gap-2"
          >
            <span>← Back to All Case Studies</span>
          </button>

          <div className="space-y-3 border-b border-neutral-100 pb-6">
            <span className="orixnal-badge text-xs font-bold px-3 py-1 rounded-full">
              {selectedCase.clientCategory}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900">
              {selectedCase.title}
            </h2>
            <p className="text-base text-purple-900 font-semibold">{selectedCase.tagline}</p>
          </div>

          <div className="aspect-[21/9] rounded-2xl overflow-hidden bg-neutral-100">
            <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3 p-6 bg-[#FAF9F6] rounded-2xl border border-neutral-200">
              <h3 className="text-base font-extrabold text-neutral-900">1. The Challenge</h3>
              <p className="text-neutral-600 leading-relaxed">{selectedCase.challenge}</p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF9F6] rounded-2xl border border-neutral-200">
              <h3 className="text-base font-extrabold text-neutral-900">2. Market Research & Audit</h3>
              <p className="text-neutral-600 leading-relaxed">{selectedCase.research}</p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF9F6] rounded-2xl border border-neutral-200">
              <h3 className="text-base font-extrabold text-neutral-900">3. Brand Strategy & Thinking</h3>
              <p className="text-neutral-600 leading-relaxed">{selectedCase.strategy}</p>
              <p className="text-xs text-purple-900 font-medium pt-1">{selectedCase.brandThinking}</p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF9F6] rounded-2xl border border-neutral-200">
              <h3 className="text-base font-extrabold text-neutral-900">4. Creative Direction & Execution</h3>
              <p className="text-neutral-600 leading-relaxed">{selectedCase.creativeDirection}</p>
              <p className="text-xs text-neutral-700 font-medium pt-1">{selectedCase.execution}</p>
            </div>
          </div>

          {/* Potential Outcomes */}
          <div className="p-8 bg-purple-50/70 border border-purple-200 rounded-3xl space-y-4">
            <h3 className="text-xl font-extrabold text-purple-950">Potential Business Outcomes & Metrics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedCase.potentialOutcomes.map((out, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-purple-950">
                  <CheckCircle2 className="w-5 h-5 text-purple-700 shrink-0" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Learnings */}
          <div className="p-8 bg-white border border-neutral-200 rounded-3xl space-y-3">
            <h3 className="text-lg font-extrabold text-neutral-900">Key Strategic Learnings</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
              {selectedCase.keyLearnings.map((l, idx) => (
                <li key={idx}>• {l}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* Case Studies Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              onClick={() => setSelectedCase(cs)}
              className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                  <img
                    src={cs.image}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-neutral-900 shadow-sm">
                    {cs.clientCategory}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors leading-snug">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {cs.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-purple-800">
                <span>Read Deep-Dive Breakdown</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Box */}
      <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-neutral-900">Ready to write your brand's growth case study?</h3>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto">
          Contact Founder Asim Khan to initiate your brand audit and strategic roadmap.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={COMPANY_DETAILS.phoneRaw}
            className="orixnal-gradient-bg text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 8447561650</span>
          </a>
          <a
            href={COMPANY_DETAILS.emailRaw}
            className="bg-neutral-900 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Email hello@orixnal.com</span>
          </a>
        </div>
      </div>

    </div>
  );
};
