import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Logo } from '../components/Logo';
import { AudioPlayer } from '../components/AudioPlayer';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import {
  OFFICIAL_ASSETS,
  COMPANY_DETAILS,
  FOUNDER_INFO,
  SERVICE_CATEGORIES,
  CASE_STUDIES,
  PORTFOLIO_PROJECTS,
  ORIXNAL_METHOD,
  HERO_MANIFEST,
  PHILOSOPHY_MANIFEST,
  ABOUT_MANIFEST,
  FOUNDER_MANIFEST,
  SERVICES_MANIFEST,
  PROCESS_MANIFEST,
  WHY_ORIXNAL_MANIFEST,
  INDUSTRIES_MANIFEST,
  FEATURED_WORK_MANIFEST,
  TESTIMONIALS_MANIFEST,
  INSIGHTS_MANIFEST,
  CONTACT_MANIFEST
} from '../data/brandData';
import {
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  MapPin,
  Lightbulb,
  Target,
  Building2,
  Globe,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAudit }) => {
  const [founderImgError, setFounderImgError] = useState(false);

  return (
    <div className="space-y-20 lg:space-y-28 pt-8 pb-20">
      
      {/* 1. HERO SECTION - Editorial Magazine Layout with Official Founder Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm overflow-hidden relative">
          
          {/* Subtle Ambient Accent Mesh */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Copy & Hero Strategy Messaging */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Founder-Led Brand Development Company</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.08]">
                Most businesses don't fail from bad products. They fail from{' '}
                <span className="orixnal-gradient-text">positioning noise</span>.
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
                ORIXNAL exists to solve clarity problems. We partner with ambitious founders to engineer scalable brand ecosystems — integrating brand positioning, legal IP protection, visual identity systems, bespoke web engineering, and go-to-market strategy.
              </p>

              {/* Direct Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={COMPANY_DETAILS.phoneRaw}
                  className="orixnal-gradient-bg text-white font-bold py-4 px-7 rounded-2xl flex items-center justify-center gap-3 hover:opacity-95 transition-all shadow-md text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Founder: +91 8447561650</span>
                </a>

                <a
                  href={COMPANY_DETAILS.emailRaw}
                  className="bg-white text-neutral-900 border border-neutral-300 font-bold py-4 px-7 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors text-sm shadow-2xs"
                >
                  <Mail className="w-4 h-4 text-purple-700" />
                  <span>Email hello@orixnal.com</span>
                </a>
              </div>

              {/* Verified Enterprise Credentials */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-500 border-t border-neutral-100">
                <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ministry of MSME Registered: {COMPANY_DETAILS.udyamNumber}</span>
                </span>

                <span className="flex items-center gap-1.5 text-neutral-700">
                  <Building className="w-3.5 h-3.5 text-purple-700" />
                  <span>Headquarters: Noida / Ghaziabad, UP</span>
                </span>
              </div>

            </div>

            {/* Right Column: Founder Photograph Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md bg-[#FAF9F6] p-3 rounded-3xl border border-neutral-200 shadow-lg group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-100 flex items-center justify-center">
                  {!founderImgError ? (
                    <img
                      src={OFFICIAL_ASSETS.founderPhoto}
                      alt="Asim Khan — Founder & Chief Strategist of ORIXNAL"
                      className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                      onError={() => setFounderImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-rose-900 text-white flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3 text-2xl font-bold font-mono">
                        AK
                      </div>
                      <div className="font-extrabold text-xl">Asim Khan</div>
                      <div className="text-xs text-purple-200 font-medium mt-1">Founder & Chief Brand Strategist</div>
                    </div>
                  )}

                  {/* Overlaid Editorial Founder Card Badge */}
                  <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-neutral-200/80 shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-extrabold text-neutral-900">{FOUNDER_INFO.name}</h2>
                        <p className="text-[11px] text-purple-800 font-semibold">{FOUNDER_INFO.title}</p>
                      </div>
                      <button
                        onClick={() => onNavigate('founder')}
                        className="text-xs font-bold text-neutral-700 hover:text-purple-700 inline-flex items-center gap-1 bg-neutral-100 hover:bg-purple-50 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-3 px-2 flex items-center justify-between text-xs text-neutral-500">
                  <span>“Brand is how it is understood.”</span>
                  <span className="font-mono font-bold text-purple-900">ORIXNAL®</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FOUNDER PHILOSOPHY & AUDIO BRIEFING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
                Founder's Manifesto
              </span>
              <AudioPlayer
                textToRead={`Brand is not how it looks. Brand is how it is understood. Asim Khan, Founder of ORIXNAL, believes that most businesses fail from positioning noise rather than bad products.`}
                title="Listen to Founder Manifesto"
              />
            </div>

            <blockquote className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
              “When clarity precedes execution, every design choice becomes an unfair business advantage.”
            </blockquote>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              At ORIXNAL, we don't treat branding as a superficial painting job. We treat brand development as a core business architecture discipline that connects positioning, legal trademark registration, visual dialects, web engineering, and sales conversion.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onNavigate('founder')}
                className="text-xs font-bold text-neutral-900 hover:text-purple-700 inline-flex items-center gap-1.5 underline underline-offset-4"
              >
                <span>Read Founder Asim Khan's Full Bio & Strategy Philosophy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICE ARCHITECTURE (8 PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
              Integrated Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              The 8 Brand Development Pillars
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-bold text-neutral-900 hover:text-purple-700 inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-4 py-2.5 rounded-full hover:shadow-sm transition-all"
          >
            <span>Explore All Services & Sub-Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('services')}
              className="bg-white border border-neutral-200/80 hover:border-purple-300 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                    0{idx + 1}
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-lg font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                  {cat.purpose}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-500">
                <span>{cat.services.length} Specialized Sub-services</span>
                <span className="text-purple-700 group-hover:underline">View Details</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE ORIXNAL METHOD (5-STEP PROCESS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
              Working Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              The ORIXNAL Method
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              No random design exercises without strategy. Discovery before execution, always.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {ORIXNAL_METHOD.map((m) => (
              <div key={m.step} className="relative p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 space-y-2">
                <span className="text-2xl font-black font-mono orixnal-gradient-text block">
                  {m.step}
                </span>
                <h3 className="text-base font-extrabold text-neutral-900">{m.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOCIAL PROOF & CLIENT TESTIMONIAL CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialCarousel
          onNavigate={onNavigate}
          onOpenAudit={onOpenAudit}
        />
      </section>

      {/* 6. FEATURED CASE STUDIES & POTENTIAL OUTCOMES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
              Proven Thinking
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
              Featured Case Studies
            </h2>
          </div>
          <button
            onClick={() => onNavigate('case-studies')}
            className="text-xs font-bold text-neutral-900 hover:text-purple-700 inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-4 py-2.5 rounded-full hover:shadow-sm transition-all"
          >
            <span>Read All Detailed Deep-Dives</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-700" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.id}
              onClick={() => onNavigate('case-studies')}
              className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
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
                  <h3 className="text-lg font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors leading-snug">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {cs.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-purple-800">
                <span>View Full Case Breakdown</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONCEPT PORTFOLIO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
                Demonstration Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
                Concept Projects
              </h2>
              <p className="text-xs text-neutral-500 mt-1 font-mono">
                Note: All projects below are illustrative concept projects demonstrating strategic brand execution.
              </p>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-xs font-bold text-neutral-900 hover:text-purple-700 inline-flex items-center gap-1.5 bg-white border border-neutral-200 px-4 py-2.5 rounded-full hover:shadow-sm transition-all shrink-0"
            >
              <span>View Portfolio Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-700" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PORTFOLIO_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onNavigate('portfolio')}
                className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-purple-900 text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {proj.typeBadge}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="text-sm font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SUB-BRAND SPOTLIGHT: FOOOZ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-100/40 to-amber-50 border border-amber-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              ORIXNAL Ecosystem Venture
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Foooz® — Everyday Food Sub-Brand
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
              Foooz is an everyday quick meal brand built within the ORIXNAL Group ecosystem. Designed for accessibility, honest ingredients, and daily urban consumption.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('foooz')}
              className="bg-neutral-900 text-white font-bold py-3.5 px-6 rounded-2xl hover:bg-neutral-800 transition-colors text-sm shadow-md flex items-center gap-2"
            >
              <span>Explore Foooz Venture</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. BUSINESS CREDIBILITY & REGISTRATION SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 shadow-2xs">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800 mb-2">
            Institutional Trust & Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-6">
            Official Indian Enterprise Credentials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200/80 space-y-1">
              <span className="text-neutral-500 font-mono block">Trade Name</span>
              <strong className="text-sm font-extrabold text-neutral-900 block">{COMPANY_DETAILS.tradeName}</strong>
              <span className="text-neutral-500 text-[11px]">Legal: {COMPANY_DETAILS.legalName}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200/80 space-y-1">
              <span className="text-neutral-500 font-mono block">Ministry of MSME Registration</span>
              <strong className="text-sm font-extrabold text-emerald-800 block font-mono">{COMPANY_DETAILS.udyamNumber}</strong>
              <span className="text-emerald-700 text-[11px] font-semibold">Registered Micro Enterprise (Udyam)</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200/80 space-y-1">
              <span className="text-neutral-500 font-mono block">Date of Incorporation</span>
              <strong className="text-sm font-extrabold text-neutral-900 block">{COMPANY_DETAILS.incorporationDate}</strong>
              <span className="text-neutral-500 text-[11px]">Micro Enterprise (Services)</span>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200/80 space-y-1">
              <span className="text-neutral-500 font-mono block">Direct Dial & Email</span>
              <a href={COMPANY_DETAILS.phoneRaw} className="text-sm font-extrabold text-purple-900 hover:underline block">
                +91 8447561650
              </a>
              <span className="text-neutral-500 text-[11px]">hello@orixnal.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. IRRESISTIBLE CLOSING CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-14 shadow-md text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="orixnal-badge text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Start Your Brand Transformation
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Build a brand that commands market authority.
            </h2>

            <p className="text-sm sm:text-base text-neutral-600">
              Clicking the phone number opens your dialer directly. Clicking email launches your email app. No forms blocking your path.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={COMPANY_DETAILS.phoneRaw}
                className="w-full sm:w-auto orixnal-gradient-bg text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 shadow-md hover:opacity-95 transition-all text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Founder: +91 8447561650</span>
              </a>

              <a
                href={COMPANY_DETAILS.emailRaw}
                className="w-full sm:w-auto bg-neutral-900 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors text-sm shadow-sm"
              >
                <Mail className="w-4 h-4" />
                <span>Email hello@orixnal.com</span>
              </a>

              <button
                onClick={onOpenAudit}
                className="w-full sm:w-auto bg-purple-50 text-purple-900 border border-purple-200 font-bold py-4 px-6 rounded-2xl hover:bg-purple-100 transition-colors text-sm"
              >
                <span>Launch Audit Estimator</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
