import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Logo } from '../components/Logo';
import { AudioPlayer } from '../components/AudioPlayer';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { ClientTrustCarousel } from '../components/ClientTrustCarousel';
import { CalendlyScheduler } from '../components/CalendlyScheduler';
import { ContactButtonGroup } from '../components/ContactButtonGroup';
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
import { getEvents } from '../data/eventsData';
import { getStoredBlogs } from '../data/blogData';
import { ClutchHeroBadge, ClutchTrustPill, ClutchTrustBanner, ClutchFloatingBadge } from '../components/ClutchBadge';
import { ClientImpactMetrics } from '../components/ClientImpactMetrics';
import { ClientLogoGrid } from '../components/ClientLogoGrid';
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
  Calendar,
  Ticket,
  Clock,
  BookOpen,
  FileDown
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAudit }) => {
  const [founderImgError, setFounderImgError] = useState(false);

  const scrollToCalendly = () => {
    const el = document.getElementById('homepage-calendly-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                <span>Brand Development Company</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.08]">
                Most businesses don't fail from bad products. They fail from{' '}
                <span className="orixnal-gradient-text">positioning noise</span>.
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
                ORIXNAL exists to solve clarity problems. We partner with ambitious founders to engineer scalable brand ecosystems — integrating brand positioning, legal IP protection, visual identity systems, bespoke web engineering, and go-to-market strategy.
              </p>

              {/* Direct Action Buttons */}
              <ContactButtonGroup
                onOpenConsultation={scrollToCalendly}
                consultationText="Brand Discovery Consultation"
                size="md"
                align="left"
                className="pt-2"
              />

              {/* Verified Enterprise Credentials */}
              <div className="pt-4 flex flex-wrap items-center gap-3.5 text-xs font-semibold text-neutral-500 border-t border-neutral-100">
                <ClutchTrustPill />

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

            {/* Right Column: Founder Photograph Frame / Cover Image */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md bg-[#FAF9F6] p-3 rounded-3xl border border-neutral-200 shadow-lg group">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-100 flex items-center justify-center">
                  
                  {/* Overlaid Clutch Recognition Badge on Cover Image */}
                  <div className="absolute top-3 left-3 z-20">
                    <ClutchHeroBadge />
                  </div>

                  {!founderImgError ? (
                    <img
                      src={OFFICIAL_ASSETS.founderPhoto}
                      alt="Asim Khan — Founder & Chief Strategist of ORIXNAL"
                      className="w-full h-full object-cover object-top transition-all duration-700"
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

      {/* CLUTCH RECOGNITION & VERIFIED REVIEWS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClutchTrustBanner />
      </section>

      {/* DATA-DRIVEN CLIENT IMPACT & GROWTH METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientImpactMetrics onNavigate={onNavigate} />
      </section>

      {/* OFFICIAL CLIENT & PARTNER LOGO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClientLogoGrid onNavigate={onNavigate} />
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

      {/* 6.5 FEATURED ORIXNAL EVENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                <Calendar className="w-3.5 h-3.5 text-purple-700" />
                <span>Orixnal Event</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-2">
                Global Strategic Summits & IP Workshops
              </h2>
              <p className="text-xs text-neutral-600 mt-1 max-w-xl">
                Exclusive brand engineering conclaves, trademark law masterclasses, and founder advisory roundtables hosted by ORIXNAL.
              </p>
            </div>

            <button
              onClick={() => onNavigate('events')}
              className="orixnal-gradient-bg text-white text-xs font-bold px-5 py-3 rounded-full shadow-2xs hover:opacity-95 transition-all flex items-center gap-2 shrink-0"
            >
              <span>Explore All Events & Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* LATEST POSTED EVENT SPOTLIGHT BANNER */}
          {(() => {
            const allHomeEvents = getEvents();
            const latestEvent = allHomeEvents.length > 0 ? allHomeEvents[0] : null;
            const remainingEvents = allHomeEvents.slice(1, 4);

            return (
              <>
                {latestEvent && (
                  <div className="relative bg-white rounded-2xl overflow-hidden text-neutral-900 border border-neutral-200/90 shadow-md group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                      
                      {/* Left Column: Event Cover Banner */}
                      <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[260px] overflow-hidden bg-neutral-100">
                        <img
                          src={latestEvent.bannerImage}
                          alt={latestEvent.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent lg:hidden" />
                        
                        {/* Badges Overlay */}
                        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black orixnal-gradient-bg text-white shadow-md uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                            <span>LATEST POSTED EVENT</span>
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                            latestEvent.status === 'Current' ? 'bg-emerald-500 text-white border-emerald-400' :
                            latestEvent.status === 'Upcoming' ? 'bg-purple-600 text-white border-purple-400' : 'bg-neutral-100 text-neutral-700 border-neutral-300'
                          }`}>
                            {latestEvent.status}
                          </span>
                        </div>
                      </div>

                      {/* Right Column: Details & Call-to-action */}
                      <div className="lg:col-span-7 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-purple-900">
                            <span className="flex items-center gap-1.5 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                              <Calendar className="w-3.5 h-3.5 text-purple-700" />
                              <span>{latestEvent.startDate} {latestEvent.startTime && `• ${latestEvent.startTime}`}</span>
                            </span>
                            {latestEvent.location && (
                              <span className="flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-neutral-700">
                                <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span className="truncate max-w-[220px]">{latestEvent.location}</span>
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl sm:text-2xl font-black text-neutral-950 leading-snug group-hover:text-purple-700 transition-colors">
                            {latestEvent.name}
                          </h3>

                          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                            {latestEvent.description}
                          </p>

                          {/* Activity Pills */}
                          {latestEvent.activities && latestEvent.activities.length > 0 && (
                            <div className="pt-1 flex flex-wrap items-center gap-1.5">
                              {latestEvent.activities.slice(0, 3).map((act, idx) => (
                                <span key={idx} className="text-[10px] font-mono font-medium bg-purple-50 text-purple-900 border border-purple-200 px-2.5 py-0.5 rounded-md">
                                  ✓ {act}
                                </span>
                              ))}
                              {latestEvent.activities.length > 3 && (
                                <span className="text-[10px] font-mono text-neutral-500">
                                  +{latestEvent.activities.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Footer Bar */}
                        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-purple-700" />
                            <span className="text-xs font-bold text-purple-900">
                              {latestEvent.ticket?.price || 'Free RSVP'}
                            </span>
                            {latestEvent.ticket?.availability && (
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                                {latestEvent.ticket.availability}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => onNavigate('events')}
                            className="bg-white text-neutral-950 hover:bg-amber-300 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group/btn"
                          >
                            <span>RSVP & View Event Details</span>
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* SECONDARY GRID FOR OTHER UPCOMING / FEATURED EVENTS */}
                {remainingEvents.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                        More Upcoming & Past Strategic Events ({remainingEvents.length})
                      </h4>
                      <button
                        onClick={() => onNavigate('events')}
                        className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
                      >
                        <span>View All in Event Directory</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {remainingEvents.map((evt) => (
                        <div
                          key={evt.id}
                          onClick={() => onNavigate('events')}
                          className="bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative h-40 w-full bg-neutral-100 overflow-hidden">
                              <img
                                src={evt.bannerImage}
                                alt={evt.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                  evt.status === 'Current' ? 'bg-emerald-500 text-white' :
                                  evt.status === 'Upcoming' ? 'bg-purple-600 text-white' : 'bg-neutral-200 text-neutral-800'
                                }`}>
                                  {evt.status}
                                </span>
                              </div>
                            </div>

                            <div className="p-4 space-y-1.5">
                              <div className="flex items-center gap-2 text-[11px] font-bold text-purple-800">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{evt.startDate}</span>
                                <span>•</span>
                                <Clock className="w-3 h-3 text-amber-600" />
                                <span>{evt.startTime}</span>
                              </div>

                              <h5 className="text-sm font-extrabold text-neutral-950 group-hover:text-purple-700 transition-colors line-clamp-2">
                                {evt.name}
                              </h5>

                              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                                {evt.description}
                              </p>
                            </div>
                          </div>

                          <div className="px-4 pb-4 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs font-bold text-neutral-900">
                            <span className="flex items-center gap-1 text-purple-900 text-[11px]">
                              <Ticket className="w-3.5 h-3.5 text-purple-600" />
                              {evt.ticket?.price || 'Free RSVP'}
                            </span>
                            <span className="text-purple-700 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px]">
                              View Event <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>

      {/* LATEST BLOGS & PUBLICATIONS FEATURED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 border border-purple-200 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-purple-700" />
                <span>ORIXNAL Strategic Publications</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
                Latest Insights & Strategic Blog
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
                Explore our recent analysis on trademark engineering, web application architecture, sovereign brand naming, and industry whitepapers.
              </p>
            </div>

            <button
              onClick={() => onNavigate('blog')}
              className="orixnal-gradient-bg text-white font-black text-xs px-5 py-3 rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0 group"
            >
              <span>Explore All Articles & Editor</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* BLOG CARDS GRID */}
          {(() => {
            const latestBlogs = getStoredBlogs().slice(0, 3);
            if (latestBlogs.length === 0) return null;

            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => onNavigate('blog')}
                    className="bg-[#FAF9F6] border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      {/* Cover Banner */}
                      <div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full orixnal-gradient-bg text-white backdrop-blur-md shadow-2xs">
                            {blog.category}
                          </span>
                        </div>
                        {blog.attachments && blog.attachments.some((a) => a.type === 'pdf') && (
                          <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                            <FileDown className="w-3 h-3" />
                            <span>PDF Attached</span>
                          </div>
                        )}
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-purple-800">
                          <Calendar className="w-3.5 h-3.5 text-purple-600" />
                          <span>{blog.publishedAt}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>{blog.readTime}</span>
                        </div>

                        <h3 className="text-base font-extrabold text-neutral-950 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                          {blog.title}
                        </h3>

                        <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                          {blog.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Author & CTA Footer */}
                    <div className="px-5 pb-5 pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={blog.publishedBy.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                          alt={blog.publishedBy.name}
                          className="w-6 h-6 rounded-full object-cover border border-purple-200"
                        />
                        <span className="font-bold text-neutral-900 text-[11px] truncate max-w-[110px]">
                          {blog.publishedBy.name}
                        </span>
                      </div>

                      <span className="text-purple-800 font-black text-[11px] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Read <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

        </div>
      </section>

      {/* 7. CLIENT TRUST & CAROUSEL */}
      <ClientTrustCarousel onOpenAudit={onOpenAudit} />

      {/* 8. SUB-BRAND SPOTLIGHT: FOOOZ */}
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
              className="orixnal-gradient-bg text-white font-bold py-3.5 px-6 rounded-2xl hover:opacity-95 transition-all text-sm shadow-md flex items-center gap-2"
            >
              <span>Explore Foooz Venture</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
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

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200/80 space-y-2">
              <span className="text-neutral-500 font-mono block text-xs">Direct Dial & Email</span>
              <div className="flex flex-col gap-1.5 pt-0.5">
                <a href={COMPANY_DETAILS.phoneRaw} className="inline-flex items-center gap-1.5 text-xs font-bold text-white orixnal-gradient-bg px-3 py-1.5 rounded-lg hover:opacity-95 shadow-2xs">
                  <Phone className="w-3 h-3" />
                  <span>Call Us</span>
                </a>
                <a href={COMPANY_DETAILS.emailRaw} className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-900 bg-white border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-50 shadow-2xs">
                  <Mail className="w-3 h-3 text-purple-700" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.5 EMBEDDED CALENDLY APPOINTMENT SCHEDULER SECTION */}
      <section id="homepage-calendly-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-sm">
          <CalendlyScheduler
            title="Book a Brand Discovery Consultation"
            subtitle="Schedule a direct 1-on-1 strategy call with Founder Asim Khan to evaluate brand architecture, trademark clearance, visual identity systems, or web engineering."
          />
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
              Schedule a 1-on-1 Brand Discovery Consultation via Calendly above, or reach out directly to Founder Asim Khan.
            </p>

            <ContactButtonGroup
              onOpenConsultation={scrollToCalendly}
              consultationText="Brand Discovery Consultation"
              size="lg"
              align="center"
              className="pt-2"
            />
          </div>
        </div>
      </section>

      {/* Floating Clutch Recognition Badge */}
      <ClutchFloatingBadge />

    </div>
  );
};
