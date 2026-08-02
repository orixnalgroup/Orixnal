import React from 'react';
import { motion } from 'motion/react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/brandData';
import { FAQAccordion } from '../components/FAQAccordion';
import { Sparkles, Phone, Mail, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenAudit }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
    >
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-2xs space-y-4">
        <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl">
          Everything you need to know about partnering with ORIXNAL.
        </h1>

        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Clear answers regarding brand development, Class 35/42 trademark filings, custom web engineering, timelines, and founder-led engagement models.
        </p>
      </div>

      {/* Accordion Component with Motion Animations */}
      <div className="max-w-4xl mx-auto">
        <FAQAccordion
          allowSearch={true}
          allowCategoryFilter={true}
          onOpenAudit={onOpenAudit}
        />
      </div>

      {/* CTA Box */}
      <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 text-center space-y-4 max-w-4xl mx-auto">
        <div className="w-10 h-10 rounded-2xl orixnal-gradient-bg flex items-center justify-center mx-auto text-white shadow-2xs">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-extrabold text-neutral-900">Have a specific question not listed here?</h3>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto">
          Contact Founder Asim Khan directly for a 1-on-1 strategic diagnostic session.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenAudit}
            className="orixnal-gradient-bg text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm hover:opacity-95 transition-opacity"
          >
            <span>Schedule 1-on-1 Advisory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={COMPANY_DETAILS.phoneRaw}
            className="bg-white text-neutral-800 font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm border border-neutral-200 hover:bg-neutral-50 transition-colors shadow-2xs"
          >
            <Phone className="w-4 h-4 text-purple-700" />
            <span>Call Us</span>
          </a>
          <a
            href={COMPANY_DETAILS.emailRaw}
            className="bg-white text-neutral-900 font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm border border-neutral-300 hover:bg-neutral-50 transition-colors shadow-2xs"
          >
            <Mail className="w-4 h-4 text-purple-700" />
            <span>Email Us</span>
          </a>
        </div>
      </div>

    </motion.div>
  );
};

