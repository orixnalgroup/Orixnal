import React from 'react';

interface IllustrationProps {
  className?: string;
  category: string;
}

export const ServiceIllustration: React.FC<IllustrationProps> = ({ category, className = "w-full h-48" }) => {
  switch (category) {
    case 'naming':
      return (
        <div className={`relative bg-purple-50/90 rounded-2xl p-6 text-neutral-900 overflow-hidden flex flex-col justify-between border border-purple-200/80 ${className}`}>
          {/* Subtle purple background glow */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-300/30 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between text-xs font-mono text-purple-900 border-b border-purple-200/80 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-800">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              PHONETIC & LEGAL MATRIX
            </span>
            <span className="text-purple-700 font-bold">CLASS 35 / 42 CLEAR</span>
          </div>

          <div className="my-4 grid grid-cols-3 gap-2">
            <div className="bg-white p-2.5 rounded-xl border border-purple-200 shadow-2xs text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">Phonetics</span>
              <span className="text-sm font-bold text-neutral-900">Resonant</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-300 shadow-2xs text-center">
              <span className="text-[10px] text-purple-800 uppercase font-mono block">Domain</span>
              <span className="text-sm font-bold text-purple-900">Viable</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-purple-200 shadow-2xs text-center">
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">Trademark</span>
              <span className="text-sm font-bold text-emerald-700">Clear</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-2 border-t border-purple-200/80">
            <span>ORIXNAL NAME™ ARCHITECTURE</span>
            <span className="text-purple-800 font-bold">100% IP Proprietary</span>
          </div>
        </div>
      );

    case 'legal':
      return (
        <div className={`relative bg-purple-50/90 rounded-2xl p-6 text-neutral-900 overflow-hidden flex flex-col justify-between border border-purple-200/80 ${className}`}>
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-300/30 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between text-xs font-mono text-neutral-800 border-b border-purple-200/80 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-800">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              LEGAL ARMOR & IP SHIELD
            </span>
            <span className="text-emerald-700 font-bold">MINISTRY OF MSME REGISTERED</span>
          </div>

          <div className="my-3 space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-purple-200 text-xs shadow-2xs">
              <span className="text-neutral-800 font-medium">Company Incorporation (Pvt Ltd/LLP)</span>
              <span className="text-emerald-700 font-mono font-bold">✓ Executed</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-purple-300 text-xs shadow-2xs">
              <span className="text-purple-950 font-medium">Global Trademark Filing</span>
              <span className="text-purple-800 font-mono font-bold">Class 35, 42 Protected</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-2 border-t border-purple-200/80">
            <span>MINISTRY OF MSME (UDYAM)</span>
            <span className="text-purple-800 font-bold">UDYAM-UP-29-0079322</span>
          </div>
        </div>
      );

    case 'design':
      return (
        <div className={`relative bg-purple-50/90 rounded-2xl p-6 text-neutral-900 overflow-hidden flex flex-col justify-between border border-purple-200/80 ${className}`}>
          <div className="absolute right-0 top-0 w-36 h-36 bg-purple-300/30 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between text-xs font-mono text-neutral-800 border-b border-purple-200/80 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-800">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              VISUAL DIALECT SYSTEM
            </span>
            <span className="text-purple-700 font-bold">MULTI-SURFACE SCALE</span>
          </div>

          <div className="my-3 flex items-center justify-around">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto rounded-xl orixnal-gradient-bg text-white flex items-center justify-center font-extrabold text-lg shadow-2xs">
                Ox
              </div>
              <span className="text-[10px] text-neutral-600 font-mono mt-1 block">Symbol</span>
            </div>
            <div className="h-8 w-px bg-purple-200" />
            <div className="text-center">
              <div className="text-xs font-serif italic text-purple-950 font-bold">Aa Bb Cc</div>
              <span className="text-[10px] text-neutral-600 font-mono mt-1 block">Editorial Type</span>
            </div>
            <div className="h-8 w-px bg-purple-200" />
            <div className="flex gap-1">
              <div className="w-4 h-8 rounded-sm bg-white border border-neutral-300 shadow-2xs" />
              <div className="w-4 h-8 rounded-sm bg-purple-700 shadow-2xs" />
              <div className="w-4 h-8 rounded-sm bg-neutral-900 shadow-2xs" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-2 border-t border-purple-200/80">
            <span>SYSTEM GUIDELINES</span>
            <span className="text-purple-800 font-bold">100+ Tokens Ready</span>
          </div>
        </div>
      );

    case 'digital':
      return (
        <div className={`relative bg-purple-50/90 rounded-2xl p-6 text-neutral-900 overflow-hidden flex flex-col justify-between border border-purple-200/80 ${className}`}>
          <div className="absolute left-0 bottom-0 w-40 h-40 bg-purple-300/30 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between text-xs font-mono text-neutral-800 border-b border-purple-200/80 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              REACT & CLOUD ENGINE
            </span>
            <span className="text-purple-800 font-bold">100 / 100 LIGHTHOUSE</span>
          </div>

          <div className="my-3 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-white border border-purple-200 shadow-2xs">
              <span className="text-[10px] text-neutral-500 font-mono block">LCP</span>
              <span className="text-xs font-bold text-emerald-700">0.4s</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-purple-200 shadow-2xs">
              <span className="text-[10px] text-neutral-500 font-mono block">Security</span>
              <span className="text-xs font-bold text-emerald-700">SSL Hardened</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-purple-200 shadow-2xs">
              <span className="text-[10px] text-neutral-500 font-mono block">Stack</span>
              <span className="text-xs font-bold text-purple-800">Vite + React</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-2 border-t border-purple-200/80">
            <span>BESPOKE ARCHITECTURE</span>
            <span className="text-emerald-800 font-bold">Sub-Second Load</span>
          </div>
        </div>
      );

    case 'marketing':
      return (
        <div className={`relative bg-purple-50/90 rounded-2xl p-6 text-neutral-900 overflow-hidden flex flex-col justify-between border border-purple-200/80 ${className}`}>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-800 border-b border-purple-200/80 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-900">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              GTM & FUNNEL ARCHITECTURE
            </span>
            <span className="text-purple-800 font-bold">3.2x CAC EFFICIENCY</span>
          </div>

          <div className="my-3 space-y-1.5">
            <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden p-0.5 flex border border-purple-200">
              <div className="orixnal-gradient-bg h-full rounded-full text-[8px] text-white font-mono px-2 flex items-center" style={{ width: '100%' }}>
                Awareness & Positioning
              </div>
            </div>
            <div className="w-4/5 mx-auto bg-purple-100 rounded-full h-3 overflow-hidden p-0.5 flex border border-purple-200">
              <div className="bg-purple-700 h-full rounded-full text-[8px] text-white font-mono px-2 flex items-center" style={{ width: '100%' }}>
                Consideration & Trust
              </div>
            </div>
            <div className="w-3/5 mx-auto bg-purple-100 rounded-full h-3 overflow-hidden p-0.5 flex border border-purple-200">
              <div className="bg-emerald-600 h-full rounded-full text-[8px] text-white font-mono px-2 flex items-center" style={{ width: '100%' }}>
                Conversion & Retention
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-2 border-t border-purple-200/80">
            <span>REVENUE ENGINE</span>
            <span className="text-purple-800 font-bold">Compounded LTV</span>
          </div>
        </div>
      );

    case 'advertisement':
      return (
        <div className={`relative bg-purple-50/90 rounded-2xl p-6 text-neutral-900 overflow-hidden flex flex-col justify-between border border-purple-200/80 ${className}`}>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-800 border-b border-purple-200/80 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-800">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              MULTI-CHANNEL CAMPAIGN
            </span>
            <span className="text-purple-700 font-bold">HIGH IMPACT NARRATIVE</span>
          </div>

          <div className="my-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-white rounded-lg border border-purple-200 shadow-2xs">
              <div className="text-[10px] text-neutral-500 font-mono">Digital & Performance</div>
              <div className="font-bold text-neutral-900">Search & Social Ads</div>
            </div>
            <div className="p-2 bg-white rounded-lg border border-purple-200 shadow-2xs">
              <div className="text-[10px] text-neutral-500 font-mono">Physical & Transit</div>
              <div className="font-bold text-neutral-900">Billboards & Editorial</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-2 border-t border-purple-200/80">
            <span>CAMPAIGN ATTRIBUTION</span>
            <span className="text-purple-800 font-bold">Zero Generic Noise</span>
          </div>
        </div>
      );

    case 'event':
      return (
        <div className={`relative bg-purple-50/90 rounded-2xl p-6 text-neutral-900 overflow-hidden flex flex-col justify-between border border-purple-200/80 ${className}`}>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-800 border-b border-purple-200/80 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-800">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              PHYSICAL BRAND EXPERIENCES
            </span>
            <span className="text-purple-700 font-bold">SPATIAL CANVAS</span>
          </div>

          <div className="my-3 flex items-center justify-between gap-2 text-center text-xs">
            <div className="flex-1 p-2 bg-white rounded-lg border border-purple-200 shadow-2xs">
              <span className="text-[10px] text-neutral-500 font-mono block">Summit</span>
              <span className="font-bold text-purple-900">Stage Design</span>
            </div>
            <div className="flex-1 p-2 bg-white rounded-lg border border-purple-300 shadow-2xs">
              <span className="text-[10px] text-purple-800 font-mono block">Exhibition</span>
              <span className="font-bold text-neutral-900">Custom Booths</span>
            </div>
            <div className="flex-1 p-2 bg-white rounded-lg border border-purple-200 shadow-2xs">
              <span className="text-[10px] text-neutral-500 font-mono block">VIP</span>
              <span className="font-bold text-purple-900">Activations</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-2 border-t border-purple-200/80">
            <span>IMMERSIVE TOUCHPOINTS</span>
            <span className="text-purple-800 font-bold">Unforgettable Memory</span>
          </div>
        </div>
      );

    case 'consultancy':
      return (
        <div className={`relative bg-purple-50/90 rounded-2xl p-6 text-neutral-900 overflow-hidden flex flex-col justify-between border border-purple-200/80 ${className}`}>
          <div className="flex items-center justify-between text-xs font-mono text-neutral-800 border-b border-purple-200/80 pb-3">
            <span className="flex items-center gap-1.5 font-bold text-purple-800">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              1-ON-1 FOUNDER ADVISORY
            </span>
            <span className="text-purple-900 font-bold">ASIM KHAN DIRECT</span>
          </div>

          <div className="my-3 space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 h-5 rounded-full orixnal-gradient-bg text-white flex items-center justify-center font-bold text-[10px]">01</span>
              <span className="text-neutral-900 font-medium">Brand Positioning & Audit</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 h-5 rounded-full orixnal-gradient-bg text-white flex items-center justify-center font-bold text-[10px]">02</span>
              <span className="text-neutral-900 font-medium">3-Year Strategic Roadmap</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-5 h-5 rounded-full orixnal-gradient-bg text-white flex items-center justify-center font-bold text-[10px]">03</span>
              <span className="text-neutral-900 font-medium">Rebrand & Category Moat</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 pt-2 border-t border-purple-200/80">
            <span>EXECUTIVE ALIGNMENT</span>
            <span className="text-purple-800 font-bold">Zero Junior Handoffs</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
