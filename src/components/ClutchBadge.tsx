import React, { useState } from 'react';
import { ExternalLink, Star, ShieldCheck, ArrowUpRight, X, Award, CheckCircle2 } from 'lucide-react';

export const CLUTCH_PROFILE_URL = 'https://clutch.co/profile/orixnal-group';
export const MANIFEST_PROFILE_URL = 'https://themanifest.com/company/orixnal-group';

export const ClutchIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.8c4.529 0 8.2 3.671 8.2 8.2 0 4.529-3.671 8.2-8.2 8.2-4.529 0-8.2-3.671-8.2-8.2 0-4.529 3.671-8.2 8.2-8.2zm-2 3.8c-2.43 0-4.4 1.97-4.4 4.4s1.97 4.4 4.4 4.4c1.215 0 2.316-.493 3.112-1.288l-1.556-1.556c-.398.398-.948.644-1.556.644-1.215 0-2.2-.985-2.2-2.2s.985-2.2 2.2-2.2c.608 0 1.158.246 1.556.644l1.556-1.556C12.316 8.093 11.215 7.6 10 7.6zm6.6.2h-2.2v8.4h2.2V7.8z" />
  </svg>
);

export const ManifestIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
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
      className={`bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-neutral-200/90 shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 group cursor-pointer hover:bg-purple-50 hover:border-purple-200 ${className}`}
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
 * Trust Pills for Credentials Bar
 */
export const ClutchTrustPill: React.FC = () => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <a
        href={CLUTCH_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-orange-50/90 hover:bg-orange-100/90 border border-orange-200/90 px-3 py-1 rounded-full transition-all group"
        title="View ORIXNAL Group on Clutch"
      >
        <ClutchIcon className="w-3.5 h-3.5 text-[#FF4A1C]" />
        <span className="font-bold text-neutral-900">Clutch Top Rated</span>
        <span className="inline-flex items-center gap-0.5 text-[10px] bg-[#FF4A1C] text-white px-1.5 py-0.2 rounded font-mono font-bold">
          5.0 <Star className="w-2.5 h-2.5 fill-white text-white inline" />
        </span>
        <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-transform" />
      </a>

      <a
        href={MANIFEST_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200/90 px-3 py-1 rounded-full transition-all group"
        title="View ORIXNAL Group on The Manifest"
      >
        <ManifestIcon className="w-3.5 h-3.5 text-blue-600" />
        <span className="font-bold text-neutral-900">Featured on The Manifest</span>
        <span className="inline-flex items-center gap-0.5 text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-mono font-bold">
          Top B2B
        </span>
        <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
};

/**
 * Full-width Clutch & The Manifest Recognition Section Banner for HomePage
 */
export const ClutchTrustBanner: React.FC = () => {
  return (
    <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden my-8 space-y-8">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-100 pb-6 relative z-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-[11px] font-mono font-bold uppercase tracking-wider border border-purple-200">
            <Award className="w-3.5 h-3.5 text-purple-700" />
            <span>Global B2B Industry Recognition & Awards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            Verified Clutch & The Manifest Achievements
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Verified B2B Client Reviews</span>
          </span>
        </div>
      </div>

      {/* Grid of Two Flagship Achievement Cards: Clutch + The Manifest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        
        {/* Card 1: Clutch Achievement */}
        <div className="bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40 border border-orange-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 bg-[#FF4A1C] text-white px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-xs">
                <ClutchIcon className="w-4 h-4" />
                <span>Clutch.co Verified Leader</span>
              </div>

              <div className="flex items-center gap-1 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full text-xs font-mono font-black text-amber-900">
                <span>5.0</span>
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-neutral-900 group-hover:text-[#FF4A1C] transition-colors">
              Top Rated Brand Development & Web Engineering Firm
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              Evaluated by Clutch through direct client interviews, market strategy execution, and verified project outcomes. ORIXNAL Group maintains a perfect 5.0-star rating across brand positioning, legal IP advisory, and web technology deployments.
            </p>
          </div>

          <div className="pt-3 border-t border-orange-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Verified Client Feedback</span>
            <a
              href={CLUTCH_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF4A1C] hover:bg-orange-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>View Clutch Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card 2: The Manifest Achievement */}
        <div className="bg-gradient-to-br from-blue-50/70 via-white to-sky-50/40 border border-blue-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-xl text-xs font-mono font-bold shadow-xs">
                <ManifestIcon className="w-4 h-4" />
                <span>The Manifest B2B Award</span>
              </div>

              <div className="bg-blue-100 border border-blue-300 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-blue-900">
                Top Design & Brand Partner
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-neutral-900 group-hover:text-blue-700 transition-colors">
              Recognized Company Achievement on The Manifest
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              The Manifest spotlights top-performing design, brand strategy, and tech consultancy firms globally. ORIXNAL Group is officially featured on The Manifest for delivering end-to-end brand transformation and corporate identity architecture.
            </p>
          </div>

          <div className="pt-3 border-t border-blue-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500">Official Company Listing</span>
            <a
              href={MANIFEST_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <span>View Manifest Listing</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
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
      <div className="relative group bg-white/95 backdrop-blur-xl text-neutral-900 p-3.5 rounded-2xl border border-neutral-200/90 shadow-2xl hover:border-purple-300 transition-all">
        {/* Dismiss Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-neutral-100 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 p-1 rounded-full border border-neutral-200 shadow-xs transition-colors z-10"
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
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
            </span>
          </div>

          <div className="space-y-0.5 text-left flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider font-mono text-neutral-950">
                Clutch Recognition
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.2 rounded font-mono">
                5.0 <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 inline" />
              </span>
            </div>

            <p className="text-[11px] text-neutral-600 truncate font-medium">
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

