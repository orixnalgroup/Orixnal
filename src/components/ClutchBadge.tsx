import React, { useState } from 'react';
import { ExternalLink, Star, ShieldCheck, ArrowUpRight, X } from 'lucide-react';

export const CLUTCH_PROFILE_URL = 'https://clutch.co/profile/orixnal-group';

export const ClutchIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.8c4.529 0 8.2 3.671 8.2 8.2 0 4.529-3.671 8.2-8.2 8.2-4.529 0-8.2-3.671-8.2-8.2 0-4.529 3.671-8.2 8.2-8.2zm-2 3.8c-2.43 0-4.4 1.97-4.4 4.4s1.97 4.4 4.4 4.4c1.215 0 2.316-.493 3.112-1.288l-1.556-1.556c-.398.398-.948.644-1.556.644-1.215 0-2.2-.985-2.2-2.2s.985-2.2 2.2-2.2c.608 0 1.158.246 1.556.644l1.556-1.556C12.316 8.093 11.215 7.6 10 7.6zm6.6.2h-2.2v8.4h2.2V7.8z" />
  </svg>
);

/**
 * Overlay Badge on Cover Image / Hero Banner
 */
export const ClutchHeroBadge: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <a
      href={CLUTCH_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-neutral-200/90 shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group cursor-pointer hover:bg-neutral-900 hover:text-white ${className}`}
      title="View verified client reviews on Clutch"
    >
      <div className="w-7 h-7 rounded-xl bg-[#FF4A1C]/10 text-[#FF4A1C] flex items-center justify-center shrink-0 group-hover:bg-[#FF4A1C] group-hover:text-white transition-colors">
        <ClutchIcon className="w-4 h-4" />
      </div>

      <div className="text-left leading-tight">
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-black uppercase tracking-wider font-mono text-neutral-900 group-hover:text-white transition-colors">
            Clutch
          </span>
          <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-amber-500 bg-amber-50 group-hover:bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-200/80">
            5.0 <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
          </span>
        </div>
        <div className="text-[10px] font-medium text-neutral-500 group-hover:text-neutral-300 transition-colors">
          Verified Agency Rating
        </div>
      </div>

      <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors shrink-0 ml-0.5" />
    </a>
  );
};

/**
 * Trust Pill for Credentials Bar
 */
export const ClutchTrustPill: React.FC = () => {
  return (
    <a
      href={CLUTCH_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-orange-50/90 hover:bg-orange-100/90 border border-orange-200/90 px-3 py-1 rounded-full transition-all group"
      title="View ORIXNAL Group on Clutch"
    >
      <ClutchIcon className="w-3.5 h-3.5 text-[#FF4A1C]" />
      <span className="font-bold text-neutral-900">Recognized on Clutch</span>
      <span className="inline-flex items-center gap-0.5 text-[10px] bg-[#FF4A1C] text-white px-1.5 py-0.2 rounded font-mono font-bold">
        5.0 <Star className="w-2.5 h-2.5 fill-white text-white inline" />
      </span>
      <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
};

/**
 * Full-width Clutch Recognition Section Banner for HomePage
 */
export const ClutchTrustBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-neutral-900 via-[#1F1428] to-neutral-900 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-xl relative overflow-hidden my-10">
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-[#FF4A1C]/15 to-transparent pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        
        {/* Left info block */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4A1C]/20 border border-[#FF4A1C]/40 text-[#FF4A1C] text-xs font-mono font-bold uppercase tracking-wider">
              <ClutchIcon className="w-3.5 h-3.5" />
              <span>Official Recognition</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold font-mono">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span>5.0 / 5.0 Rating on Clutch</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            Recognized as a Top Brand Development Agency on Clutch
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            Clutch evaluates B2B leaders through direct client interviews, market presence, and verified project outcomes. ORIXNAL Group maintains an exceptional 5.0-star rating for strategic brand naming, legal IP protection, and web engineering.
          </p>
        </div>

        {/* Right CTA Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <a
            href={CLUTCH_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#FF4A1C] hover:bg-[#e03f15] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all inline-flex items-center justify-center gap-2 group"
          >
            <ClutchIcon className="w-4 h-4" />
            <span>View Verified Clutch Profile</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
};

/**
 * Fixed Floating Clutch Recognition Badge for Homepage / Hero / Global
 */
export const ClutchFloatingBadge: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-xs animate-fade-in transition-all">
      <div className="relative group bg-neutral-900/95 backdrop-blur-xl text-white p-3.5 rounded-2xl border border-neutral-700/80 shadow-2xl hover:border-[#FF4A1C]/60 transition-all">
        {/* Dismiss Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 p-1 rounded-full border border-neutral-600 shadow-sm transition-colors z-10"
          title="Dismiss Clutch badge"
        >
          <X className="w-3 h-3" />
        </button>

        <a
          href={CLUTCH_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* Clutch Brand Icon Badge */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#FF4A1C] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <ClutchIcon className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-neutral-900"></span>
            </span>
          </div>

          <div className="space-y-0.5 text-left flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider font-mono text-white">
                Clutch Recognition
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-amber-300 bg-amber-400/20 border border-amber-400/40 px-1.5 py-0.2 rounded font-mono">
                5.0 <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300 inline" />
              </span>
            </div>

            <p className="text-[11px] text-neutral-300 truncate font-medium">
              Top Brand Development Agency
            </p>

            <div className="text-[10px] font-bold text-[#FF4A1C] group-hover:underline flex items-center gap-1 pt-0.5">
              <span>View Verified Reviews</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

