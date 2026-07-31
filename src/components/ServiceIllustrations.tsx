import React from 'react';

interface IllustrationProps {
  className?: string;
  category: string;
}

export const ServiceIllustration: React.FC<IllustrationProps> = ({ category, className = "w-full h-48" }) => {
  switch (category) {
    case 'naming':
      return (
        <div className={`relative bg-neutral-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between border border-neutral-800 ${className}`}>
          {/* Subtle magenta background glow */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-rose-600/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              PHONETIC & LEGAL MATRIX
            </span>
            <span>CLASS 35 / 42 CLEAR</span>
          </div>

          <div className="my-4 grid grid-cols-3 gap-2">
            <div className="bg-neutral-800/80 p-2.5 rounded-xl border border-neutral-700/60 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block">Phonetics</span>
              <span className="text-sm font-bold text-white">Resonant</span>
            </div>
            <div className="bg-neutral-800/80 p-2.5 rounded-xl border border-rose-500/30 text-center">
              <span className="text-[10px] text-rose-400 uppercase font-mono block">Domain</span>
              <span className="text-sm font-bold text-rose-300">Viable</span>
            </div>
            <div className="bg-neutral-800/80 p-2.5 rounded-xl border border-neutral-700/60 text-center">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block">Trademark</span>
              <span className="text-sm font-bold text-emerald-400">Clear</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>ORIXNAL NAME™ ARCHITECTURE</span>
            <span className="text-rose-400 font-bold">100% IP Proprietary</span>
          </div>
        </div>
      );

    case 'legal':
      return (
        <div className={`relative bg-neutral-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between border border-neutral-800 ${className}`}>
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-400">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              LEGAL ARMOR & IP SHIELD
            </span>
            <span className="text-emerald-400">MINISTRY OF MSME REGISTERED</span>
          </div>

          <div className="my-3 space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-800/60 border border-neutral-700 text-xs">
              <span className="text-neutral-300">Company Incorporation (Pvt Ltd/LLP)</span>
              <span className="text-emerald-400 font-mono font-bold">✓ Executed</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-800/60 border border-purple-500/30 text-xs">
              <span className="text-purple-200">Global Trademark Filing</span>
              <span className="text-purple-400 font-mono font-bold">Class 35, 42 Protected</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>MINISTRY OF MSME (UDYAM)</span>
            <span className="text-purple-300">UDYAM-UP-29-0079322</span>
          </div>
        </div>
      );

    case 'design':
      return (
        <div className={`relative bg-neutral-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between border border-neutral-800 ${className}`}>
          <div className="absolute right-0 top-0 w-36 h-36 bg-rose-500/15 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              VISUAL DIALECT SYSTEM
            </span>
            <span>MULTI-SURFACE SCALE</span>
          </div>

          <div className="my-3 flex items-center justify-around">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center font-extrabold text-rose-300 text-lg">
                Ox
              </div>
              <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Symbol</span>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div className="text-center">
              <div className="text-xs font-serif italic text-amber-200">Aa Bb Cc</div>
              <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Editorial Type</span>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div className="flex gap-1">
              <div className="w-4 h-8 rounded-sm bg-[#FAF9F6]" />
              <div className="w-4 h-8 rounded-sm bg-[#E11D48]" />
              <div className="w-4 h-8 rounded-sm bg-[#171717]" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>SYSTEM GUIDELINES</span>
            <span className="text-rose-400">100+ Tokens Ready</span>
          </div>
        </div>
      );

    case 'digital':
      return (
        <div className={`relative bg-neutral-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between border border-neutral-800 ${className}`}>
          <div className="absolute left-0 bottom-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              REACT & CLOUD ENGINE
            </span>
            <span className="text-rose-400 font-bold">100 / 100 LIGHTHOUSE</span>
          </div>

          <div className="my-3 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-neutral-800/80 border border-neutral-700">
              <span className="text-[10px] text-neutral-400 font-mono block">LCP</span>
              <span className="text-xs font-bold text-emerald-400">0.4s</span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-800/80 border border-neutral-700">
              <span className="text-[10px] text-neutral-400 font-mono block">Security</span>
              <span className="text-xs font-bold text-emerald-400">SSL Hardened</span>
            </div>
            <div className="p-2 rounded-lg bg-neutral-800/80 border border-neutral-700">
              <span className="text-[10px] text-neutral-400 font-mono block">Stack</span>
              <span className="text-xs font-bold text-rose-300">Vite + React</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>BESPOKE ARCHITECTURE</span>
            <span className="text-emerald-400">Sub-Second Load</span>
          </div>
        </div>
      );

    case 'marketing':
      return (
        <div className={`relative bg-neutral-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between border border-neutral-800 ${className}`}>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              GTM & FUNNEL ARCHITECTURE
            </span>
            <span className="text-rose-400 font-bold">3.2x CAC EFFICIENCY</span>
          </div>

          <div className="my-3 space-y-1.5">
            <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden p-0.5 flex">
              <div className="bg-rose-500 h-full rounded-full text-[8px] text-white font-mono px-2 flex items-center" style={{ width: '100%' }}>
                Awareness & Positioning
              </div>
            </div>
            <div className="w-4/5 mx-auto bg-neutral-800 rounded-full h-3 overflow-hidden p-0.5 flex">
              <div className="bg-amber-500 h-full rounded-full text-[8px] text-neutral-950 font-mono px-2 flex items-center" style={{ width: '100%' }}>
                Consideration & Trust
              </div>
            </div>
            <div className="w-3/5 mx-auto bg-neutral-800 rounded-full h-3 overflow-hidden p-0.5 flex">
              <div className="bg-emerald-500 h-full rounded-full text-[8px] text-neutral-950 font-mono px-2 flex items-center" style={{ width: '100%' }}>
                Conversion & Retention
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>REVENUE ENGINE</span>
            <span className="text-amber-300">Compounded LTV</span>
          </div>
        </div>
      );

    case 'advertisement':
      return (
        <div className={`relative bg-neutral-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between border border-neutral-800 ${className}`}>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              MULTI-CHANNEL CAMPAIGN
            </span>
            <span>HIGH IMPACT NARRATIVE</span>
          </div>

          <div className="my-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-neutral-800/80 rounded-lg border border-neutral-700">
              <div className="text-[10px] text-neutral-400 font-mono">Digital & Performance</div>
              <div className="font-bold text-white">Search & Social Ads</div>
            </div>
            <div className="p-2 bg-neutral-800/80 rounded-lg border border-neutral-700">
              <div className="text-[10px] text-neutral-400 font-mono">Physical & Transit</div>
              <div className="font-bold text-white">Billboards & Editorial</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>CAMPAIGN ATTRIBUTION</span>
            <span className="text-rose-400">Zero Generic Noise</span>
          </div>
        </div>
      );

    case 'event':
      return (
        <div className={`relative bg-neutral-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between border border-neutral-800 ${className}`}>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-400">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              PHYSICAL BRAND EXPERIENCES
            </span>
            <span>SPATIAL CANVAS</span>
          </div>

          <div className="my-3 flex items-center justify-between gap-2 text-center text-xs">
            <div className="flex-1 p-2 bg-neutral-800/80 rounded-lg border border-neutral-700">
              <span className="text-[10px] text-neutral-400 font-mono block">Summit</span>
              <span className="font-bold text-purple-300">Stage Design</span>
            </div>
            <div className="flex-1 p-2 bg-neutral-800/80 rounded-lg border border-purple-500/30">
              <span className="text-[10px] text-purple-400 font-mono block">Exhibition</span>
              <span className="font-bold text-white">Custom Booths</span>
            </div>
            <div className="flex-1 p-2 bg-neutral-800/80 rounded-lg border border-neutral-700">
              <span className="text-[10px] text-neutral-400 font-mono block">VIP</span>
              <span className="font-bold text-purple-300">Activations</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>IMMERSIVE TOUCHPOINTS</span>
            <span className="text-purple-300">Unforgettable Memory</span>
          </div>
        </div>
      );

    case 'consultancy':
      return (
        <div className={`relative bg-neutral-900 rounded-2xl p-6 text-white overflow-hidden flex flex-col justify-between border border-neutral-800 ${className}`}>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              1-ON-1 FOUNDER ADVISORY
            </span>
            <span className="text-amber-300 font-bold">ASIM KHAN DIRECT</span>
          </div>

          <div className="my-3 space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[10px]">01</span>
              <span className="text-neutral-200">Brand Positioning & Audit</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[10px]">02</span>
              <span className="text-neutral-200">3-Year Strategic Roadmap</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-[10px]">03</span>
              <span className="text-neutral-200">Rebrand & Category Moat</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800">
            <span>EXECUTIVE ALIGNMENT</span>
            <span className="text-amber-300">Zero Junior Handoffs</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
