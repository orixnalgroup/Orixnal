import React, { useState, useEffect, useRef } from 'react';
import { Testimonial, PageRoute } from '../types';
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Building,
  TrendingUp,
  Star,
  Pause,
  Play,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    authorName: 'Vikramaditya Sharma',
    authorRole: 'Founder & CEO',
    companyName: 'Aetheris Dynamics',
    industry: 'Enterprise B2B SaaS',
    location: 'Bengaluru / San Francisco',
    quote: 'ORIXNAL didn’t just design a logo — they restructured our entire value proposition. Within 90 days of launch, our inbound enterprise contract value tripled.',
    fullReview: 'Before engaging Founder Asim Khan, we were running under a confusing placeholder name with zero trademark defense in Class 42. ORIXNAL executed a masterbrand naming protocol, secured Class 35 & 42 trademark clearance in under 3 weeks, and engineered a custom React portal with sub-500ms load speeds. The level of founder-led accountability and strategic rigor is unmatched.',
    metricValue: '+310%',
    metricLabel: 'Inbound Pipeline Value',
    servicesProvided: ['Brand Naming', 'Class 42 IP Armor', 'React Web Platform'],
    avatarInitial: 'VS',
    category: 'SaaS & B2B'
  },
  {
    id: 't-2',
    authorName: 'Dr. Ananya Roy',
    authorRole: 'Co-Founder & Chief Product Officer',
    companyName: 'NeuroPulse Health',
    industry: 'HealthTech & MedTech',
    location: 'Noida / London',
    quote: 'Asim Khan’s refusal to accept vague positioning saved us from a costly $2M pivot. ORIXNAL’s legal IP shield gave our investors absolute conviction.',
    fullReview: 'When pitching European healthcare funds, our IP documentation was scrutinized endlessly. ORIXNAL bridged creative visual design with formal MSME Udyam compliance and Class 35 trademark registration. Working directly with Asim meant zero loss of nuance — every single board slide and web interaction felt authoritative.',
    metricValue: '$4.5M',
    metricLabel: 'Series A Funding Secured',
    servicesProvided: ['Masterbrand Positioning', 'Legal IP Defense', 'Investor Pitch Deck'],
    avatarInitial: 'AR',
    category: 'Legal & IP'
  },
  {
    id: 't-3',
    authorName: 'Rohan Deshmukh',
    authorRole: 'Managing Director',
    companyName: 'Veloce Retail Group',
    industry: 'D2C Consumer Goods',
    location: 'Mumbai / Dubai',
    quote: 'The visual dialect ORIXNAL created commanded an immediate 25% price premium in retail stores. Customers instantly treat us as an established global brand.',
    fullReview: 'We had an existing product line that looked like every other generic Amazon brand. ORIXNAL stepped in and crafted an editorial, luxury visual identity system accompanied by bespoke packaging guidelines. Their strategic advice on non-verbal brand signals completely transformed our profit margins.',
    metricValue: '25%',
    metricLabel: 'Gross Margin Expansion',
    servicesProvided: ['Visual Identity System', 'Packaging Guidelines', 'GTM Strategy'],
    avatarInitial: 'RD',
    category: 'D2C & Retail'
  },
  {
    id: 't-4',
    authorName: 'Siddharth Mehta',
    authorRole: 'CTO & Technical Co-Founder',
    companyName: 'FinMatrix Sovereign',
    industry: 'Fintech & Algorithmic Trading',
    location: 'Gurugram / Singapore',
    quote: 'Most agencies deliver bloated WordPress themes that take 6 seconds to load. ORIXNAL built a sub-second React engine that converts high-intent traffic instantly.',
    fullReview: 'Our developers were blown away by the clean architecture of ORIXNAL’s digital platform. Page speed score hit 100/100 on Google Core Web Vitals instantly. Combined with Asim’s crisp, jargon-free copy strategy, our sign-up conversion rate jumped from 1.8% to 5.4%.',
    metricValue: '100/100',
    metricLabel: 'Core Web Vitals Score',
    servicesProvided: ['React Web Engineering', 'Conversion UX Design', 'Brand Copywriting'],
    avatarInitial: 'SM',
    category: 'Web Engineering'
  },
  {
    id: 't-5',
    authorName: 'Kavya Pillai',
    authorRole: 'Head of Brand Strategy',
    companyName: 'OmniVanguard Media',
    industry: 'Media & Digital Ecosystems',
    location: 'Delhi NCR / New York',
    quote: 'ORIXNAL’s 5-step method brings mathematical clarity to an industry usually dominated by vague creative opinions. They deliver balance-sheet results.',
    fullReview: 'Working with traditional agencies was always frustrating because junior account managers did the actual work. At ORIXNAL, Founder Asim Khan personally governs every single strategy meeting. That direct executive access makes a massive difference in speed and decision quality.',
    metricValue: 'Zero',
    metricLabel: 'Junior Handoffs Guaranteed',
    servicesProvided: ['Brand Architecture', 'Sub-Brand Strategy', 'Corporate Governance'],
    avatarInitial: 'KP',
    category: 'SaaS & B2B'
  }
];

interface TestimonialCarouselProps {
  onNavigate?: (route: PageRoute) => void;
  onOpenAudit?: () => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ onNavigate, onOpenAudit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [expandedTestimonial, setExpandedTestimonial] = useState<Testimonial | null>(null);

  // Filter list by category
  const filteredTestimonials = TESTIMONIALS_DATA.filter(
    (t) => selectedCategory === 'All' || t.category === selectedCategory
  );

  // Keep index within bounds on category filter change
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Autoplay interval
  useEffect(() => {
    if (!isAutoplay || filteredTestimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoplay, filteredTestimonials.length]);

  const current = filteredTestimonials[currentIndex] || TESTIMONIALS_DATA[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  return (
    <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs space-y-8 relative overflow-hidden">
      
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-50/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-100 pb-6 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Client Proof & Founder Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Verified Outcomes from Sovereign Founders
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Real feedback from tech leaders, D2C pioneers, and enterprise founders who chose founder-led strategy over traditional agency bloat.
          </p>
        </div>

        {/* Category Pill Filters & Autoplay Switch */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {['All', 'SaaS & B2B', 'D2C & Retail', 'Legal & IP', 'Web Engineering'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-[#FAF9F6] border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className="p-1.5 rounded-full bg-[#FAF9F6] border border-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors ml-1"
            title={isAutoplay ? 'Pause Carousel' : 'Play Carousel'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-rose-600" />}
          </button>
        </div>
      </div>

      {/* Main Magazine Testimonial Card Display */}
      {current && (
        <div className="relative z-10 bg-[#FAF8F5] border border-neutral-200/90 rounded-2xl p-6 sm:p-10 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Main Editorial Quote */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 border border-rose-200/80 px-3 py-1 rounded-full text-xs font-mono font-bold">
                  <Star className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                  <span>5.0 VERIFIED CLIENT OUTCOME</span>
                </div>

                <span className="text-xs font-mono text-neutral-400 font-semibold">
                  0{currentIndex + 1} / 0{filteredTestimonials.length}
                </span>
              </div>

              {/* Quote text */}
              <div className="relative">
                <Quote className="w-10 h-10 text-rose-200/80 absolute -top-4 -left-2 pointer-events-none" />
                <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-neutral-900 leading-snug pl-6">
                  “{current.quote}”
                </p>
              </div>

              {/* Author Badge & Services Tags */}
              <div className="pt-4 border-t border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full orixnal-gradient-bg text-white font-bold font-mono text-sm flex items-center justify-center shadow-2xs shrink-0">
                    {current.avatarInitial}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-neutral-900 leading-tight">
                      {current.authorName}
                    </h3>
                    <p className="text-xs text-neutral-600 font-medium">
                      {current.authorRole} • <strong className="text-neutral-900">{current.companyName}</strong>
                    </p>
                    <p className="text-[11px] font-mono text-neutral-400">
                      {current.industry} | {current.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {current.servicesProvided.map((svc, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 font-semibold"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Highlight Metric & Full Story CTA */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-5 flex flex-col justify-between">
              
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase font-bold text-rose-600 tracking-wider flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Key Business Metric
                </span>
                <div className="text-4xl sm:text-5xl font-black text-neutral-900 font-mono tracking-tight">
                  {current.metricValue}
                </div>
                <div className="text-xs font-bold text-neutral-600">
                  {current.metricLabel}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 space-y-3">
                <button
                  onClick={() => setExpandedTestimonial(current)}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Read Full Client Review</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                </button>

                {onOpenAudit && (
                  <button
                    onClick={onOpenAudit}
                    className="w-full py-2 px-3 rounded-xl bg-rose-50 text-rose-900 border border-rose-200 font-semibold text-[11px] hover:bg-rose-100 transition-colors text-center block"
                  >
                    Request Similar Brand Audit
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Footer Controls & Carousel Dots */}
      <div className="flex items-center justify-between pt-2 relative z-10">
        
        {/* Step Indicator Dots */}
        <div className="flex items-center gap-2">
          {filteredTestimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx ? 'w-8 bg-rose-600' : 'w-2 bg-neutral-200 hover:bg-neutral-300'
              }`}
              title={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>

        {/* Previous / Next Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 transition-all shadow-2xs"
            title="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="p-3 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 transition-all shadow-2xs"
            title="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Modal View for Full Review */}
      {expandedTestimonial && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full orixnal-gradient-bg text-white font-bold font-mono text-xs flex items-center justify-center">
                  {expandedTestimonial.avatarInitial}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-neutral-900">
                    {expandedTestimonial.authorName}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">
                    {expandedTestimonial.authorRole} • {expandedTestimonial.companyName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setExpandedTestimonial(null)}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-rose-700">Verified Impact</span>
                <div className="text-xl font-bold font-mono text-neutral-900">
                  {expandedTestimonial.metricValue} {expandedTestimonial.metricLabel}
                </div>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed font-normal italic border-l-2 border-rose-500 pl-4 py-1">
                “{expandedTestimonial.quote}”
              </p>

              <div className="text-xs text-neutral-600 leading-relaxed space-y-2 pt-2">
                <h4 className="font-extrabold text-neutral-900 text-xs">Full Engagement Summary:</h4>
                <p>{expandedTestimonial.fullReview}</p>
              </div>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {expandedTestimonial.servicesProvided.map((s, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">
                ORIXNAL® Executive Client Advisory
              </span>
              <button
                onClick={() => setExpandedTestimonial(null)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs"
              >
                Close Review
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
