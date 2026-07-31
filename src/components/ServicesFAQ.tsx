import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  Search,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Compass,
  Clock,
  Briefcase,
  CheckCircle2,
  Phone,
  Mail
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/brandData';

export interface FAQItem {
  id: string;
  category: 'methodology' | 'process' | 'legal' | 'engagement';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'methodology',
    categoryLabel: 'Branding Methodology',
    question: 'What makes ORIXNAL\'s branding methodology fundamentally different?',
    answer: 'Most traditional agencies focus purely on cosmetic visual polish — creating logos without understanding positioning or business mechanics. The ORIXNAL Method is built on five strict sequence steps: Clarity → Strategy → Creation → Execution → Growth. We diagnose positioning, customer psychology, and competitive white space before designing a single asset or writing a single line of code.',
    highlights: [
      'Clarity before creative execution',
      'Data-backed customer psychology drivers',
      'Zero generic templates or superficial design tweaks'
    ]
  },
  {
    id: 'faq-2',
    category: 'legal',
    categoryLabel: 'Legal & IP Security',
    question: 'How does ORIXNAL protect our brand name and visual identity legally?',
    answer: 'A stunning logo or brand name that cannot be trademarked is a future business liability. Through our integrated ORIXNAL LEGAL pillar, every brand name, logo symbol, and design system undergoes rigorous trademark search checks (Class 35, 42, etc.), domain availability verification, and IP conflict audits during the creation phase — long before final delivery.',
    highlights: [
      'Pre-cleared trademark availability checks',
      'Class 35 & 42 global IP class auditing',
      'Full legal compliance & ownership transfer'
    ]
  },
  {
    id: 'faq-3',
    category: 'process',
    categoryLabel: 'Process & Timelines',
    question: 'What is the typical project timeline and delivery framework?',
    answer: 'Engagement durations vary depending on scope, but follow a predictable timeline:',
    highlights: [
      'Brand Naming & Positioning Sprint: 2 – 3 Weeks',
      'Brand Identity & Design System: 3 – 4 Weeks',
      'Custom React Digital Platform Development: 4 – 6 Weeks',
      'Masterbrand Launch (Multi-Pillar Integration): 8 – 12 Weeks'
    ]
  },
  {
    id: 'faq-4',
    category: 'engagement',
    categoryLabel: 'Engagement & Oversight',
    question: 'Will I work directly with Founder Asim Khan or an account manager?',
    answer: 'You work directly with Founder & Principal Brand Strategist Asim Khan. At ORIXNAL, we strictly avoid the "agency bait-and-switch" where senior partners pitch and junior interns execute. We limit active client intake to guarantee direct founder oversight, strategic direction, and uncompromising quality on every deliverable.',
    highlights: [
      'Direct founder-led strategy & execution',
      'No junior account manager handoffs',
      'Strict client intake limit for deep focus'
    ]
  },
  {
    id: 'faq-5',
    category: 'engagement',
    categoryLabel: 'Scope & Architecture',
    question: 'How does ORIXNAL manage multi-pillar scopes like Naming, Legal, Web, and Marketing?',
    answer: 'All 8 core service pillars (Naming, Legal, Design, Digital, Marketing, Advertisement, Event, and Consultancy) are integrated in-house under ORIXNAL Group. Instead of coordinating 4 different siloed vendors with conflicting timelines, you partner with a single strategic team. This eliminates handoff friction, saves 30%+ in management overhead, and maintains absolute brand voice consistency.',
    highlights: [
      'Single strategic point of accountability',
      'Zero vendor handoff friction or misaligned assets',
      'Integrated legal, design, and code architecture'
    ]
  },
  {
    id: 'faq-6',
    category: 'methodology',
    categoryLabel: 'Client Fit',
    question: 'What types of companies and founders get the best results with ORIXNAL?',
    answer: 'We partner with ambitious early-stage startups, venture-backed founders, growing D2C brands, SME leaders, and corporate teams looking to launch or reposition brands globally. We are ideal for business decision-makers who value logic, strategic positioning, and long-term brand equity over superficial trends.',
    highlights: [
      'Tech startups & venture founders',
      'D2C, SME & corporate enterprises',
      'Global markets: India, UAE, US, UK, Canada & Australia'
    ]
  },
  {
    id: 'faq-7',
    category: 'process',
    categoryLabel: 'Process & Revisions',
    question: 'How do revision rounds and strategic feedback work during execution?',
    answer: 'Every project operates under our "Discovery Before Execution" policy with clearly defined milestones. Each delivery phase includes structured feedback sessions and 2 to 3 iterative refinement rounds. Because our initial discovery and positioning framework is so thorough, client revision cycles are focused and efficient.',
    highlights: [
      'Structured milestone sign-offs',
      '2–3 dedicated iterative refinement rounds',
      'Transparent project tracking without surprises'
    ]
  },
  {
    id: 'faq-8',
    category: 'process',
    categoryLabel: 'Deliverables & Ownership',
    question: 'What files, source code, and assets do we own upon project completion?',
    answer: 'Upon final settlement, you receive 100% full intellectual property ownership of all created assets. This includes vector logo master packages (SVG, EPS, AI, PNG, PDF), comprehensive digital brand guideline books, clean React/TypeScript web source code, font licensing documentation, and trademark submission packages.',
    highlights: [
      '100% IP & trademark ownership',
      'Production-ready vector & code packages',
      'Zero proprietary vendor lock-in'
    ]
  },
  {
    id: 'faq-9',
    category: 'engagement',
    categoryLabel: 'Investment & Pricing',
    question: 'How are project investments structured? Are prices transparent?',
    answer: 'Yes, complete transparency is a core ORIXNAL policy. We provide fixed-scope proposals based on explicit deliverables, milestones, and strategic objectives — never open-ended hourly billing. Following an initial brand audit, you receive a detailed written scope with fixed pricing and zero hidden add-ons.',
    highlights: [
      'Fixed-scope milestone pricing',
      'Zero hidden surprise fees',
      'Custom tailored to your growth objectives'
    ]
  },
  {
    id: 'faq-10',
    category: 'process',
    categoryLabel: 'Getting Started',
    question: 'How do we begin a project with ORIXNAL?',
    answer: 'The first step is a 20-minute Brand Discovery Consultation with Founder Asim Khan. We review your current business model, competitive landscape, and primary brand challenges. If there is strong strategic alignment, we provide a customized brand development proposal within 48 hours.',
    highlights: [
      'No-obligation 20-minute strategy call',
      'Diagnostic review of current brand positioning',
      'Custom proposal delivered within 48 hours'
    ]
  }
];

interface ServicesFAQProps {
  onOpenAudit?: () => void;
  className?: string;
}

export const ServicesFAQ: React.FC<ServicesFAQProps> = ({ onOpenAudit, className = '' }) => {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(filteredFaqs.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={`bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs space-y-8 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200/80 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Clarity & Engagement FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Frequently Asked Questions About Our Methodology & Process
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Clear answers regarding how we work, how we protect your intellectual property, timelines, founder oversight, and engagement terms.
          </p>
        </div>

        {/* Global Expand / Collapse & Search Stats */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={expandAll}
            className="text-xs font-mono font-bold text-neutral-700 hover:text-rose-600 bg-neutral-100 hover:bg-neutral-200/80 px-3.5 py-2 rounded-xl transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs font-mono font-bold text-neutral-700 hover:text-rose-600 bg-neutral-100 hover:bg-neutral-200/80 px-3.5 py-2 rounded-xl transition-colors"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Search Bar & Category Filter Pills */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g., trademark, timeline, founder, pricing)..."
            className="w-full pl-11 pr-4 py-3 bg-[#FAF9F6] border border-neutral-200 rounded-2xl text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700 bg-neutral-200/80 rounded-full px-2 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'all'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
            }`}
          >
            All Questions ({FAQ_DATA.length})
          </button>
          <button
            onClick={() => setActiveCategory('methodology')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              activeCategory === 'methodology'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-rose-500" />
            <span>Methodology</span>
          </button>
          <button
            onClick={() => setActiveCategory('legal')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              activeCategory === 'legal'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
            <span>Legal & IP Security</span>
          </button>
          <button
            onClick={() => setActiveCategory('process')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              activeCategory === 'process'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Process & Timelines</span>
          </button>
          <button
            onClick={() => setActiveCategory('engagement')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              activeCategory === 'engagement'
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-500" />
            <span>Engagement & Investment</span>
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3 pt-2">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-[#FAF9F6] border border-neutral-200 rounded-2xl space-y-3">
            <HelpCircle className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-sm font-bold text-neutral-800">No matching questions found for "{searchQuery}"</p>
            <p className="text-xs text-neutral-500">
              Have a specific question not listed here? Speak directly with Founder Asim Khan.
            </p>
            <button
              onClick={onOpenAudit}
              className="orixnal-gradient-bg text-white text-xs font-bold px-4 py-2 rounded-xl mt-2 inline-flex items-center gap-1.5"
            >
              <span>Ask Founder Directly</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          filteredFaqs.map((item, index) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-neutral-300 bg-white shadow-2xs'
                    : 'border-neutral-200/80 bg-[#FAF9F6] hover:border-neutral-300 hover:bg-white'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full">
                        {item.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                        Q0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className={`p-2 rounded-full shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-rose-50 text-rose-600 rotate-180' : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-700 border-t border-neutral-100 pt-4 space-y-4 leading-relaxed">
                        <p className="text-neutral-700">{item.answer}</p>

                        {/* Highlights List */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-neutral-200/70 space-y-2">
                            <span className="text-[11px] font-mono font-bold uppercase text-neutral-500 tracking-wider block">
                              Key Takeaways:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {item.highlights.map((h, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span className="text-xs font-medium text-neutral-800">{h}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Unanswered Question Banner */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-neutral-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-rose-600" />
            <span>Have a specific question not covered here?</span>
          </h4>
          <p className="text-xs text-neutral-600">
            Send your inquiry directly to our strategic team or schedule a 1-on-1 discovery call with Founder Asim Khan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAudit}
            className="orixnal-gradient-bg text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs hover:opacity-95 transition-all inline-flex items-center gap-1.5"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={`mailto:${COMPANY_DETAILS.email}`}
            className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-rose-600" />
            <span>Email Us</span>
          </a>
        </div>
      </div>
    </section>
  );
};
