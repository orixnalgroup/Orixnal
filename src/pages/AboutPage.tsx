import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS, FOUNDER_INFO, ORIXNAL_METHOD, OFFICIAL_ASSETS } from '../data/brandData';
import { GlobalPresenceMap } from '../components/GlobalPresenceMap';
import { ContactButtonGroup } from '../components/ContactButtonGroup';
import {
  Sparkles,
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Building2,
  MapPin,
  FileText,
  Award,
  Zap,
  Quote,
  Check,
  Clock,
  Compass,
  Milestone,
  Flag,
  TrendingUp
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenAudit }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Editorial Luxury Hero Header */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-14 shadow-2xs space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Founder-Led Global Brand Development</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span>UDYAM: UDYAM-UP-29-0079322</span>
            <span>•</span>
            <span className="text-rose-600 font-bold">EST. 2023</span>
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.1]">
            We don’t sell hourly pixel tweaks or generic pitch decks. We architect <span className="orixnal-gradient-text">enterprise brand equity</span>.
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 leading-relaxed font-normal pt-2">
            ORIXNAL is India’s premier Brand Development Company. We bridge the critical gap between executive business strategy, legal IP defense, visual design dialects, and custom web engineering under one roof.
          </p>
        </div>

        {/* Credentials Grid Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Leadership</span>
            <span className="text-sm font-bold text-neutral-900">100% Founder-Led</span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">Asim Khan Direct</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Structure</span>
            <span className="text-sm font-bold text-rose-600">8 Integrated Pillars</span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">Zero Vendor Fragmentation</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Compliance</span>
            <span className="text-sm font-bold text-purple-700">Ministry of MSME</span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">Class 35/42 Trademark</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">Global Reach</span>
            <span className="text-sm font-bold text-neutral-900">India & International</span>
            <span className="text-[11px] text-neutral-500 block mt-0.5">Dubai, London, US, SG</span>
          </div>
        </div>
      </div>

      {/* Founder's Manifesto: Why ORIXNAL Exists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 orixnal-gradient-bg text-white p-8 sm:p-10 rounded-3xl flex flex-col justify-between space-y-8 relative overflow-hidden shadow-lg border border-transparent">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/40 shadow-md bg-[#FAF9F6] flex items-center justify-center">
              <img
                src={OFFICIAL_ASSETS.founderPhoto}
                alt="Asim Khan - Founder & Chief Strategist"
                className="w-full h-full object-contain object-bottom pt-1"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== OFFICIAL_ASSETS.founderPhotoFallback) {
                    target.src = OFFICIAL_ASSETS.founderPhotoFallback;
                  } else {
                    target.style.display = 'none';
                  }
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">{FOUNDER_INFO.name}</h3>
              <p className="text-xs font-mono text-amber-300 mt-0.5 font-bold">{FOUNDER_INFO.title}</p>
            </div>

            <div className="pt-2 text-xs text-purple-100 leading-relaxed italic border-t border-white/20 font-medium">
              "{FOUNDER_INFO.quote}"
            </div>
          </div>

          <div className="space-y-2 relative z-10 pt-4 border-t border-white/20 text-xs text-purple-100 font-mono">
            <div>• Background: Inside Sales & Business Strategy</div>
            <div>• Specialized in Legal IP & Masterbrand Architecture</div>
            <div>• Headquarters in Noida & Ghaziabad, UP, India</div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-2xs">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
              The Founder's Manifesto
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug">
              "Most companies do not fail from bad products. They fail from positioning noise and fragmented strategy."
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              When I founded ORIXNAL, I noticed a frustrating pattern across the industry. Design studios were obsessed with drawing pretty logos that had zero legal trademark protection. Digital agencies were burning ad budgets on products with confusing positioning. And management consultancies were writing 200-page PDF decks that sat in Google Drive gathering dust.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              We built ORIXNAL to eliminate this fragmentation. We believe that <strong className="text-neutral-900">brand is not how it looks — brand is how it is understood</strong>. When clarity precedes execution, every design choice becomes an unfair commercial advantage.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => onNavigate('founder')}
              className="text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-5 py-3 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <span>Read Asim Khan's Full Story</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-600" />
            </button>

            <button
              onClick={onOpenAudit}
              className="orixnal-gradient-bg text-white text-xs font-bold px-5 py-3 rounded-xl shadow-2xs hover:opacity-95 transition-all"
            >
              Schedule Strategy Discovery Call
            </button>
          </div>
        </div>
      </div>

      {/* Brand Philosophy & Core Ethos (Magazine Style Editorial) */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-2xs space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Brand Philosophy & Ethos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Five Uncompromising Directives That Govern How We Build Sovereign Brands
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-neutral-500 max-w-sm leading-relaxed border-l-2 border-rose-500/60 pl-4 py-1">
            "A philosophy is not what you print in an employee handbook; it is the set of trade-offs you are willing to make when nobody is watching."
          </p>
        </div>

        {/* Feature Editorial Pull-Quote Card */}
        <div className="bg-[#FAF8F5] border border-neutral-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-rose-600">
              EDITORIAL ESSAY / BY ASIM KHAN
            </span>
            <p className="text-lg sm:text-2xl font-serif italic text-neutral-900 leading-snug">
              "We built ORIXNAL on the conviction that a brand should be as legally unassailable as a fortress and as emotionally magnetic as a masterpiece."
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
              In a marketplace flooded with automated templates and synthetic agency noise, true brand equity comes from restraint, precision, and founder-level accountability. We don't take on 100 client retainers a year — we partner deeply with founders who demand sovereign category leadership.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-neutral-200/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-600 uppercase">
              <Target className="w-4 h-4" />
              <span>The ORIXNAL Standard</span>
            </div>
            <div className="space-y-2 text-xs text-neutral-700 font-medium">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5">
                <span>Client Cap per Quarter</span>
                <span className="font-bold text-neutral-900 font-mono">Max 6 Founders</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5">
                <span>Trademark Guarantee</span>
                <span className="font-bold text-emerald-700 font-mono">Class 35/42 Vetted</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-1.5">
                <span>Code Architecture</span>
                <span className="font-bold text-rose-600 font-mono">Sub-Second React</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Strategic Leadership</span>
                <span className="font-bold text-neutral-900 font-mono">100% Founder Direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Strategic Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Principle 01 */}
          <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-rose-300 transition-colors space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/60">
                  PILLAR 01
                </span>
                <Eye className="w-4 h-4 text-neutral-400" />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">
                Radical Candor Over Comforting Flattery
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We tell founders what their brand actually needs, not what flatters their ego. If a name sounds derivative or a landing page is bloated, we speak directly. Truth builds sovereign market authority.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-rose-700 font-semibold">
              Outcome: Zero wasted capital on derivative concepts.
            </div>
          </div>

          {/* Principle 02 */}
          <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-purple-300 transition-colors space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
                  PILLAR 02
                </span>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">
                Legal IP Armor as Creative Foundation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A brand is an asset on your balance sheet. We never separate visual mark design from trademark clearance (Class 35 & 42), MSME Udyam registration, and legal entity compliance.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-purple-700 font-semibold">
              Outcome: Defensible IP that increases enterprise valuation.
            </div>
          </div>

          {/* Principle 03 */}
          <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-emerald-300 transition-colors space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  PILLAR 03
                </span>
                <Zap className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">
                Human Craft Over Automated AI Slop
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                AI is a fast pencil, not a brand strategist. Every positioning document, phonetic naming matrix, and line of React code at ORIXNAL is hand-crafted with human nuance and commercial depth.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-emerald-700 font-semibold">
              Outcome: Distinct, unforgettable voice that cuts through noise.
            </div>
          </div>

          {/* Principle 04 */}
          <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-rose-300 transition-colors space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/60">
                  PILLAR 04
                </span>
                <Award className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">
                Zero Junior Handoffs or Intern Delegation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                You hire ORIXNAL for founder-level sharpness. Your account is personally governed and executed by Founder Asim Khan — never passed down to rotating junior account managers or offshore contractors.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-rose-700 font-semibold">
              Outcome: Direct executive alignment from day 1 to launch.
            </div>
          </div>

          {/* Principle 05 */}
          <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-neutral-200/90 hover:border-amber-300 transition-colors md:col-span-2 lg:col-span-2 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                  PILLAR 05
                </span>
                <Heart className="w-4 h-4 text-amber-600" />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">
                Design as a Non-Verbal Commercial Dialect
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Design is not decorative wrapping paper added at the end; it is a non-verbal signal of standard and trustworthiness. Premium visual dialects increase buyer confidence, allow companies to command 20%+ pricing power, and eliminate sales friction across every digital and physical touchpoint.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-200/60 text-[11px] font-mono text-amber-800 font-semibold">
              Outcome: Higher conversion rates and pricing power across all sales channels.
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix: Why We Refuse To Call Ourselves An "Agency" */}
      <div className="bg-[#FAF8F5] border border-neutral-200/90 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
            Differentiating Factor
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            Why We Refuse To Call Ourselves A "Digital Agency"
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Agencies sell hourly billable timers and template designs. ORIXNAL builds legally protected, revenue-engineered brand assets under direct founder oversight.
          </p>
        </div>

        {/* Editorial Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-neutral-300 text-xs font-mono uppercase text-neutral-500">
                <th className="py-3 px-4 w-1/4">Evaluation Metric</th>
                <th className="py-3 px-4 w-3/8 text-neutral-500">Typical Agency / Studio</th>
                <th className="py-3 px-4 w-3/8 text-rose-700 bg-white/80 rounded-t-xl font-bold">ORIXNAL Group</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/80 text-xs sm:text-sm">
              <tr>
                <td className="py-4 px-4 font-bold text-neutral-900">Approach to Naming</td>
                <td className="py-4 px-4 text-neutral-600">Generates random dictionary words in 24h with taken domains.</td>
                <td className="py-4 px-4 font-semibold text-neutral-900 bg-white/80">
                  Phonetic resonance, Class 35/42 trademark clearance, and domain viability.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-neutral-900">Legal IP Armor</td>
                <td className="py-4 px-4 text-neutral-600">Delivers unvetted PNGs; leaves you exposed to C&D lawsuits.</td>
                <td className="py-4 px-4 font-semibold text-neutral-900 bg-white/80">
                  Incorporation, MSME Udyam registration, and global trademark filing in-house.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-neutral-900">Execution Team</td>
                <td className="py-4 px-4 text-neutral-600">Delegated to junior interns and rotating project managers.</td>
                <td className="py-4 px-4 font-semibold text-neutral-900 bg-white/80">
                  Direct 1-on-1 strategic leadership with Founder Asim Khan.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-neutral-900">Web Engineering</td>
                <td className="py-4 px-4 text-neutral-600">Bloated 6-second page-builders that crash on mobile devices.</td>
                <td className="py-4 px-4 font-semibold text-neutral-900 bg-white/80">
                  Custom React apps, sub-second Core Web Vitals, and hardened cloud security.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 font-bold text-neutral-900">Accountability</td>
                <td className="py-4 px-4 text-neutral-600">Focuses on billable hour timers and scope inflation fees.</td>
                <td className="py-4 px-4 font-semibold text-neutral-900 bg-white/80">
                  Focuses on masterbrand equity, category authority, and revenue growth.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The ORIXNAL Strategic Equation */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xs">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
            Formula for Scale
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            The ORIXNAL Strategic Equation
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
            We structure brand development as a mathematical sequence where each layer compounds the value of the next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-600 block">VAR 01</span>
            <h4 className="text-base font-extrabold text-neutral-900">Clarity</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Stripping away messaging clutter until only the undeniable core value proposition remains.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-600 block">VAR 02</span>
            <h4 className="text-base font-extrabold text-neutral-900">Positioning</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Architecting market whitespace, target buyer personas, and premium pricing logic.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
            <span className="text-xs font-mono font-bold text-purple-700 block">VAR 03</span>
            <h4 className="text-base font-extrabold text-neutral-900">IP Armor</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Securing MSME Udyam registration, Class 35/42 trademark protection, and legal contracts.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
            <span className="text-xs font-mono font-bold text-rose-600 block">VAR 04</span>
            <h4 className="text-base font-extrabold text-neutral-900">Visual Dialect</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Crafting distinct logotypes, design token systems, and multi-surface brand guidelines.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-700 block">VAR 05</span>
            <h4 className="text-base font-extrabold text-neutral-900">Web Platform</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Engineering sub-second React frontends optimized for conversions and search authority.
            </p>
          </div>
        </div>
      </div>

      {/* The 5-Step Methodology */}
      <div className="bg-[#FAF8F5] border border-neutral-200/90 rounded-3xl p-8 sm:p-12 space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
            Systematic Process
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            The 5-Step ORIXNAL Framework
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ORIXNAL_METHOD.map((step) => (
            <div key={step.step} className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2">
              <span className="text-xl font-black font-mono text-rose-600 block">{step.step}</span>
              <h4 className="text-base font-extrabold text-neutral-900">{step.title}</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Growth Journey & Strategic Milestone Timeline */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-2xs space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Milestone className="w-3.5 h-3.5 text-rose-600" />
              <span>ORIXNAL Evolution Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Our Growth Journey & Strategic Horizons
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed pt-1">
              From a single founder’s thesis in Uttar Pradesh to a multi-pillar global brand development group. A timeline driven by legal precision, human craft, and balance-sheet results.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#FAF9F6] border border-neutral-200/80 px-4 py-2 rounded-2xl text-xs font-mono font-bold text-neutral-700">
            <Clock className="w-4 h-4 text-rose-600 animate-pulse" />
            <span>EST. 2023 → HORIZON 2027+</span>
          </div>
        </div>

        {/* Timeline Desktop & Mobile Layout */}
        <div className="relative pt-4">
          {/* Vertical Editorial Guideline in subtle magenta */}
          <div className="absolute left-4 sm:left-1/2 top-6 bottom-6 w-0.5 bg-neutral-200 -translate-x-1/2 hidden sm:block" />
          <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-neutral-200 sm:hidden" />

          <div className="space-y-12">
            {[
              {
                year: '2023',
                phase: 'PHASE 01: GENESIS & CORE THESIS',
                status: 'FOUNDATIONAL MILESTONE',
                statusBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                title: 'Unifying Legal Strategy & Brand Design',
                description: 'Founder Asim Khan launches ORIXNAL in Uttar Pradesh, establishing the core thesis: brand design without legal IP protection and high-performance engineering is an incomplete commercial asset.',
                achievements: [
                  'Architected original 8-pillar brand service blueprint',
                  'Established founder-led 1-on-1 executive advisory model',
                  'Secured initial roster of tech & enterprise brand clients'
                ]
              },
              {
                year: '2024',
                phase: 'PHASE 02: MINISTRY OF MSME ACCREDITATION & IP SHIELD',
                status: 'MINISTRY OF MSME REGISTERED',
                statusBg: 'bg-purple-50 text-purple-700 border-purple-200',
                title: 'Ministry of MSME Registration & Class 35/42 IP Armor',
                description: 'ORIXNAL is registered under the Ministry of Micro, Small and Medium Enterprises (UDYAM-UP-29-0079322), integrating formal corporate incorporation, trademark filing, and legal compliance directly into the brand development lifecycle.',
                achievements: [
                  'Registered under Ministry of Micro, Small and Medium Enterprises',
                  'Launched Class 35 & 42 Trademark auditing matrix',
                  'Expanded custom React & Vite web engineering practice'
                ]
              },
              {
                year: '2025',
                phase: 'PHASE 03: GLOBAL SCALING & FOOOZ INCUBATION',
                status: 'CROSS-BORDER REACH',
                statusBg: 'bg-rose-50 text-rose-700 border-rose-200',
                title: 'International Advisory & Sovereign Gaming Launch',
                description: 'Expanded client advisory footprint across Dubai, London, Singapore, and North America. Incubated FOOOZ™—ORIXNAL’s sovereign gaming, esports, and lifestyle brand ecosystem.',
                achievements: [
                  'Advised cross-border ventures in MENA & European markets',
                  'Unveiled FOOOZ™ esports & gaming platform branding',
                  'Achieved 100/100 Core Web Vitals benchmark across client web deployments'
                ]
              },
              {
                year: '2026',
                phase: 'PHASE 04: MASTERBRAND EQUITY ERA',
                status: 'ACTIVE ERA',
                statusBg: 'bg-rose-600 text-white border-rose-600 font-bold',
                title: 'Full-Spectrum Brand Group',
                description: 'Consolidated position as India’s premier Brand Development Company, managing end-to-end masterbrand launches, legal IP armor, and digital platforms under direct founder leadership.',
                achievements: [
                  'Standardized 5-step ORIXNAL Brand Equation framework',
                  'Expanded direct founder strategy call booking platform',
                  'Zero junior handoffs policy enforced across all active retainers'
                ]
              },
              {
                year: '2027+',
                phase: 'PHASE 05: STRATEGIC HORIZON & AI IP VAULT',
                status: 'FUTURE HORIZON',
                statusBg: 'bg-amber-50 text-amber-800 border-amber-200',
                title: 'Global Advisory Hubs & AI Trademark Intelligence',
                description: 'Pioneering AI-assisted trademark risk auditing tools and establishing dedicated physical founder advisory hubs in key global financial capitals.',
                achievements: [
                  'Proprietary AI Trademark & Phonetic Risk Audit tool',
                  'Dedicated founder strategy lounges in Dubai & Singapore',
                  'Expanding equity-partner brand incubation model'
                ]
              }
            ].map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={milestone.year} className="relative flex flex-col sm:flex-row items-start gap-6 group">
                  
                  {/* Timeline Center Node Pin */}
                  <div className="absolute left-4 sm:left-1/2 top-0 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-white border-2 border-rose-600 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  </div>

                  {/* Left Column (Desktop) */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-12 sm:text-right' : 'sm:order-2 sm:pl-12'}`}>
                    <div className="bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl p-6 space-y-3 group-hover:border-rose-300 transition-all shadow-2xs">
                      
                      <div className={`flex flex-wrap items-center gap-2 ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                        <span className="font-mono text-sm font-extrabold text-neutral-900 bg-white px-3 py-1 rounded-full border border-neutral-200">
                          {milestone.year}
                        </span>
                        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${milestone.statusBg}`}>
                          {milestone.status}
                        </span>
                      </div>

                      <div className="text-[10px] font-mono font-bold text-rose-600 tracking-wider">
                        {milestone.phase}
                      </div>

                      <h3 className="text-lg font-extrabold text-neutral-900 leading-snug">
                        {milestone.title}
                      </h3>

                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {milestone.description}
                      </p>

                      <div className="pt-2 border-t border-neutral-200/60 space-y-1">
                        {milestone.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className={`flex items-center gap-1.5 text-[11px] text-neutral-700 font-medium ${isEven ? 'sm:justify-end' : 'justify-start'}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop alternating layout */}
                  <div className={`hidden sm:block w-1/2 ${isEven ? 'order-2' : 'order-1'}`} />

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* D3.js Global Spatial Footprint Map */}
      <GlobalPresenceMap onOpenAudit={onOpenAudit} />

      {/* Corporate Governance & Legal Credentials */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xs">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
              Corporate Governance
            </span>
            <h3 className="text-xl font-extrabold text-neutral-900 mt-0.5">
              Ministry of MSME Disclosures & Official Details
            </h3>
          </div>
          <Building2 className="w-6 h-6 text-neutral-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-700">
          <div className="space-y-3 bg-[#FAF9F6] p-5 rounded-2xl border border-neutral-200/80">
            <div className="flex justify-between border-b border-neutral-200 pb-2">
              <span className="font-mono text-neutral-500">Legal Entity Name</span>
              <span className="font-bold text-neutral-900">{COMPANY_DETAILS.legalName}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-2">
              <span className="font-mono text-neutral-500">Trade Name</span>
              <span className="font-bold text-neutral-900">{COMPANY_DETAILS.tradeName}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-2">
              <span className="font-mono text-neutral-500">UDYAM Number</span>
              <span className="font-bold text-purple-700 font-mono">{COMPANY_DETAILS.udyamNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-neutral-500">Enterprise Type</span>
              <span className="font-bold text-neutral-900">{COMPANY_DETAILS.udyamType}</span>
            </div>
          </div>

          <div className="space-y-3 bg-[#FAF9F6] p-5 rounded-2xl border border-neutral-200/80">
            <div>
              <span className="font-mono text-neutral-500 block mb-1">Corporate Headquarters</span>
              <span className="font-medium text-neutral-800 leading-snug block">{COMPANY_DETAILS.headquarters}</span>
            </div>
            <div className="pt-2 border-t border-neutral-200">
              <span className="font-mono text-neutral-500 block mb-1">Registered Address</span>
              <span className="font-medium text-neutral-800 leading-snug block">{COMPANY_DETAILS.registeredAddress}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <span className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider block mb-2">
            Registered National Industry Classification (NIC) Codes
          </span>
          <div className="flex flex-wrap gap-2">
            {COMPANY_DETAILS.nicCodes.map((nic) => (
              <div key={nic.code} className="px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800">
                <strong className="text-rose-600 mr-1.5">{nic.code}</strong>
                <span>{nic.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="orixnal-gradient-bg text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight text-white">
          Stop settling for fragmented agency retainers. Architect your masterbrand today.
        </h3>

        <p className="text-sm sm:text-base text-purple-100 max-w-xl mx-auto leading-relaxed font-medium">
          Connect directly with Founder Asim Khan for a confidential Brand Strategy Discovery Session.
        </p>

        <ContactButtonGroup
          onOpenConsultation={onOpenAudit}
          consultationText="Brand Discovery Consultation"
          size="lg"
          align="center"
          className="pt-2"
        />
      </div>

    </div>
  );
};
