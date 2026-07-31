import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Search,
  ShieldCheck,
  Palette,
  Code,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Zap,
  Award,
  Layers,
  Building2
} from 'lucide-react';

export interface RoadmapStage {
  step: string;
  number: string;
  title: string;
  duration: string;
  focusPillars: string[];
  description: string;
  icon: React.ElementType;
  deliverables: string[];
  outcomes: string;
  color: string;
}

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    step: 'Phase 01',
    number: '01',
    title: 'Strategic Discovery & Rebranding Diagnostic',
    duration: 'Week 1 – 2',
    focusPillars: ['ORIXNAL Consultancy', 'ORIXNAL Name'],
    description:
      'Direct founder alignment session with Asim Khan. Deep dive into unit economics, competitor messaging gaps, target audience positioning, and initial trademark viability.',
    icon: Search,
    color: 'from-purple-600 to-indigo-600',
    deliverables: [
      'Comprehensive Brand Audit Blueprint',
      'Competitor Positioning Matrix',
      'Name Clearance & Linguistic Evaluation',
      '1-on-1 Founder Strategic Roadmap'
    ],
    outcomes: 'Total clarity on brand archetype, value proposition, and market white space.'
  },
  {
    step: 'Phase 02',
    number: '02',
    title: 'Legal IP Defense & Corporate Incorporation',
    duration: 'Week 2 – 4',
    focusPillars: ['ORIXNAL Legal', 'ORIXNAL Name'],
    description:
      'Fortifying your brand IP before public disclosure. Full Class 35 & Class 42 trademark searches, corporate structure alignment, and domain/handle acquisition.',
    icon: ShieldCheck,
    color: 'from-purple-700 to-pink-600',
    deliverables: [
      'Class 35 & 42 Trademark Filing Documentation',
      'Ministry of MSME / Corporate Compliance Alignment',
      'IP Assignment & Vendor Contract Templates',
      'Domain & Social Handle Defense Shield'
    ],
    outcomes: 'Legally protected brand asset ready for scale without infringement risk.'
  },
  {
    step: 'Phase 03',
    number: '03',
    title: 'Visual Identity Systems & Luxury Studio Design',
    duration: 'Week 4 – 7',
    focusPillars: ['ORIXNAL Studio', 'ORIXNAL Marketing'],
    description:
      'Architecting a distinct design dialect. From iconic logomark design and design tokens to luxury print collateral, packaging, and brand guidelines.',
    icon: Palette,
    color: 'from-pink-600 to-rose-600',
    deliverables: [
      'Masterbrand Logomark & Vector System',
      'Color Palette & Typography Tokens',
      'Design Guidelines Book (PDF & Figma)',
      'Packaging & Luxury Collateral Mockups'
    ],
    outcomes: 'Unmistakable visual presence that commands premium market pricing.'
  },
  {
    step: 'Phase 04',
    number: '04',
    title: 'Sub-Second React & Digital Platform Engineering',
    duration: 'Week 7 – 10',
    focusPillars: ['ORIXNAL Digital'],
    description:
      'Building custom, sub-second web platforms with zero bloated templates. Engineered on React / Next.js with sub-second page loads and technical SEO mastery.',
    icon: Code,
    color: 'from-purple-800 to-purple-600',
    deliverables: [
      'Bespoke React/Next.js Web Application',
      'Custom Shopify Storefront or API Backend',
      'Web Vitals 95+ Performance Score',
      'Technical SEO & Analytics Integration'
    ],
    outcomes: 'High-converting digital flagship operating at sub-second speed.'
  },
  {
    step: 'Phase 05',
    number: '05',
    title: 'Go-to-Market Execution, Ads & Sovereign Scale',
    duration: 'Week 10 – 12+',
    focusPillars: ['ORIXNAL Marketing', 'ORIXNAL Ads', 'ORIXNAL Event'],
    description:
      'Launching multi-channel acquisition campaigns, high-impact corporate activations, and ongoing founder-led retainer advisory for market dominance.',
    icon: Rocket,
    color: 'from-rose-600 to-purple-800',
    deliverables: [
      'Multi-Channel Ad Campaign Suite (Meta/Google/LinkedIn)',
      'Launch Event & PR Activation Blueprint',
      'Conversion Funnel & Retainers Mechanics',
      'Ongoing Quarterly Advisory with Asim Khan'
    ],
    outcomes: 'Sustainable market leadership, high customer LTV, and scalable revenue.'
  }
];

interface ServiceRoadmapProps {
  className?: string;
  onOpenAudit?: () => void;
}

export const ServiceRoadmap: React.FC<ServiceRoadmapProps> = ({
  className = '',
  onOpenAudit
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  return (
    <div className={`bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-12 space-y-10 shadow-2xs ${className}`}>
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200/80 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>5-Phase Brand Development Lifecycle</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            From Initial Discovery to Sovereign Market Dominance
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Every ORIXNAL engagement follows a structured 5-stage roadmap, eliminating friction between naming, legal IP protection, design dialects, and custom React engineering.
          </p>
        </div>

        {onOpenAudit && (
          <button
            onClick={onOpenAudit}
            className="orixnal-gradient-bg text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-2xs hover:opacity-95 transition-all inline-flex items-center justify-center gap-2 shrink-0"
          >
            <span>Commission Roadmap Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Horizontal Phase Step Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-[#FAF9F6] p-2 rounded-2xl border border-neutral-200/80">
        {ROADMAP_STAGES.map((stage, idx) => {
          const isActive = activeStageIndex === idx;
          const StageIcon = stage.icon;

          return (
            <button
              key={stage.number}
              onClick={() => setActiveStageIndex(idx)}
              className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between space-y-2 border ${
                isActive
                  ? 'bg-white border-purple-300 shadow-xs ring-1 ring-purple-100'
                  : 'bg-transparent border-transparent hover:bg-white/60 hover:border-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-purple-900 text-white' : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {stage.number}
                </span>
                <StageIcon
                  className={`w-3.5 h-3.5 ${isActive ? 'text-purple-700' : 'text-neutral-400'}`}
                />
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-neutral-900 line-clamp-1 block">
                  {stage.title.split('&')[0]}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono block">
                  {stage.duration}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Detailed Spotlight */}
      {ROADMAP_STAGES[activeStageIndex] && (
        <motion.div
          key={activeStageIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FAF9F6] border border-neutral-200/90 rounded-3xl p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl orixnal-gradient-bg text-white flex items-center justify-center shrink-0 shadow-2xs">
                {React.createElement(ROADMAP_STAGES[activeStageIndex].icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
                    {ROADMAP_STAGES[activeStageIndex].step}
                  </span>
                  <span className="text-xs font-mono text-neutral-600 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    <span>{ROADMAP_STAGES[activeStageIndex].duration}</span>
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-900 mt-1">
                  {ROADMAP_STAGES[activeStageIndex].title}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 shrink-0">
              {ROADMAP_STAGES[activeStageIndex].focusPillars.map((p, pIdx) => (
                <span
                  key={pIdx}
                  className="text-[10px] font-mono font-bold text-neutral-800 bg-white border border-neutral-200/80 px-2.5 py-1 rounded-lg"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-neutral-700 leading-relaxed font-normal">
            {ROADMAP_STAGES[activeStageIndex].description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Stage Deliverables */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-700" />
                <span>Stage Key Deliverables</span>
              </h4>
              <div className="space-y-2 text-xs text-neutral-800 font-medium">
                {ROADMAP_STAGES[activeStageIndex].deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Outcomes */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Measurable Outcome</span>
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-neutral-800 leading-relaxed bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200/60">
                  "{ROADMAP_STAGES[activeStageIndex].outcomes}"
                </p>
              </div>

              {onOpenAudit && (
                <button
                  onClick={onOpenAudit}
                  className="text-xs font-bold text-purple-800 hover:text-purple-950 inline-flex items-center gap-1 mt-2"
                >
                  <span>Inquire about this phase</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Vertical Scroll-Driven Visual Roadmap (Scroll-Revealed Cards) */}
      <div className="space-y-6 pt-4 border-t border-neutral-200/80">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
              Interactive Vertical Timeline
            </span>
            <h3 className="text-xl font-extrabold text-neutral-900">
              Complete End-to-End Execution Sequence
            </h3>
          </div>

          <span className="text-xs font-mono text-neutral-500 font-semibold bg-neutral-100 px-3 py-1 rounded-full hidden sm:inline-block">
            Direct Founder Lead: Asim Khan
          </span>
        </div>

        <div className="relative border-l-2 border-purple-200/80 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {ROADMAP_STAGES.map((stage, idx) => {
            const StageIcon = stage.icon;

            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 hover:border-purple-300 transition-colors"
              >
                {/* Timeline Connector Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-5 h-5 rounded-full orixnal-gradient-bg border-2 border-white shadow-xs flex items-center justify-center text-white text-[9px] font-mono font-bold">
                  {stage.number}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-2">
                    <StageIcon className="w-4 h-4 text-purple-700 shrink-0" />
                    <h4 className="text-base font-extrabold text-neutral-900">
                      {stage.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 font-semibold bg-neutral-100 px-2.5 py-0.5 rounded-md w-fit">
                    {stage.duration}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {stage.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {stage.deliverables.map((del, dIdx) => (
                    <span
                      key={dIdx}
                      className="text-[11px] font-medium bg-[#FAF9F6] text-neutral-700 border border-neutral-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-purple-600 shrink-0" />
                      <span>{del}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
