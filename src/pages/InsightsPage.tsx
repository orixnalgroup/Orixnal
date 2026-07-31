import React, { useState } from 'react';
import { PageRoute, InsightArticle } from '../types';
import { INSIGHTS_ARTICLES, COMPANY_DETAILS } from '../data/brandData';
import { AudioPlayer } from '../components/AudioPlayer';
import { BrandPulseDashboard } from '../components/BrandPulseDashboard';
import { Sparkles, Phone, Mail, Clock, Calendar, ArrowRight, User } from 'lucide-react';

interface InsightsPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const InsightsPage: React.FC<InsightsPageProps> = ({ onNavigate, onOpenAudit }) => {
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-2xs">
        <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Insights & Thought Leadership</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl">
          Essays on brand architecture, legal IP, and AI search optimization.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 mt-4 max-w-3xl leading-relaxed">
          Deep-dive analysis written by Founder Asim Khan. Designed to educate ambitious founders on positioning clarity and long-term brand equity.
        </p>
      </div>

      {/* Brand Pulse Interactive Recharts Dashboard */}
      <BrandPulseDashboard onOpenAudit={onOpenAudit} />

      {/* Selected Article View */}
      {selectedArticle ? (
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 space-y-8 animate-fadeIn">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-bold text-neutral-600 hover:text-neutral-900 bg-neutral-100 px-4 py-2 rounded-full inline-flex items-center gap-2"
          >
            <span>← Back to All Insights</span>
          </button>

          <div className="space-y-4 border-b border-neutral-100 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="orixnal-badge text-xs font-bold px-3 py-1 rounded-full">
                {selectedArticle.category}
              </span>

              <AudioPlayer
                textToRead={selectedArticle.content.join(' ')}
                title="Listen to Essay Briefing"
              />
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-purple-700" />
                <span>{selectedArticle.author}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedArticle.date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>
          </div>

          <div className="prose max-w-3xl text-neutral-800 text-sm sm:text-base leading-relaxed space-y-4">
            {selectedArticle.content.map((para, idx) => (
              <p key={idx} className="bg-[#FAF9F6] p-5 rounded-2xl border border-neutral-200/80">
                {para}
              </p>
            ))}
          </div>

          <div className="p-6 bg-purple-50/60 rounded-2xl border border-purple-200 text-purple-950 text-xs sm:text-sm space-y-2">
            <div className="font-bold">Enjoyed this essay?</div>
            <p>Schedule a 1-on-1 brand strategy advisory call with author Asim Khan.</p>
            <div className="pt-1 flex gap-3">
              <a href={COMPANY_DETAILS.phoneRaw} className="font-bold text-purple-900 underline">
                Call +91 8447561650
              </a>
              <a href={COMPANY_DETAILS.emailRaw} className="font-bold text-purple-900 underline">
                Email hello@orixnal.com
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Articles Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSIGHTS_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
                    {article.category}
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-400">{article.readTime}</span>
                </div>

                <h3 className="text-lg font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-purple-800">
                <span>Read Full Essay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Box */}
      <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-neutral-900">Want to discuss brand strategy for your company?</h3>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto">
          Reach out to Founder Asim Khan for a direct consultation.
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
