import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute, PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS, COMPANY_DETAILS } from '../data/brandData';
import { CaseStudyOutcomes } from '../components/CaseStudyOutcomes';
import { ContactButtonGroup } from '../components/ContactButtonGroup';
import { Sparkles, Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' as const },
  },
};

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, onOpenAudit }) => {
  const [selectedProj, setSelectedProj] = useState<PortfolioProject | null>(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
    >
      
      {/* Header Banner */}
      <motion.div variants={itemVariants} className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-2xs">
        <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demonstration Works</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl">
          Concept & Demonstration Projects
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 mt-4 max-w-3xl leading-relaxed">
          Until live client case studies release, we present conceptual demonstrations illustrating our design craft, brand architecture, and web engineering capabilities.
        </p>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
          Note: Every project on this page is clearly labeled as a <strong>Concept Project</strong> or <strong>Illustrative Work</strong> to demonstrate strategic thinking.
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PORTFOLIO_PROJECTS.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSelectedProj(proj)}
            className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-purple-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  {proj.typeBadge}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-3">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
                  {proj.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {proj.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {proj.deliverables.map((del, dIdx) => (
                    <span key={dIdx} className="text-[11px] font-semibold bg-[#FAF9F6] border border-neutral-200 px-2.5 py-1 rounded-lg text-neutral-700">
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-purple-800">
              <span>Explore Concept Overview</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProj && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-[#FAF9F6] border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProj(null)}
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-900 bg-white rounded-full border"
              >
                ✕
              </button>

              <span className="bg-purple-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                {selectedProj.typeBadge}
              </span>

              <h3 className="text-2xl font-extrabold text-neutral-900">{selectedProj.title}</h3>
              <p className="text-sm text-neutral-600">{selectedProj.description}</p>

              <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-100">
                <img src={selectedProj.image} alt={selectedProj.title} className="w-full h-full object-cover" />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Deliverables & System Capabilities</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-neutral-800">
                  {selectedProj.deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-neutral-200">
                      <CheckCircle2 className="w-4 h-4 text-purple-700" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProj(null);
                  onOpenAudit();
                }}
                className="w-full orixnal-gradient-bg text-white font-bold py-3 rounded-2xl text-sm hover:opacity-95 transition-opacity"
              >
                Commission a Project Like This
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Outcomes Visualization Section */}
      <motion.div variants={itemVariants}>
        <CaseStudyOutcomes onOpenAudit={onOpenAudit} />
      </motion.div>

      {/* CTA Box */}
      <motion.div variants={itemVariants} className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-neutral-900">Have a brand project in mind?</h3>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto">
          Reach out to Founder Asim Khan for a strategic discussion.
        </p>
        <ContactButtonGroup
          onOpenConsultation={onOpenAudit}
          consultationText="Brand Discovery Consultation"
          size="md"
          align="center"
          className="pt-2"
        />
      </motion.div>

    </motion.div>
  );
};
