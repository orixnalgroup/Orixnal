import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ShieldCheck, Sparkles, ExternalLink, CheckCircle2, UserCheck, Video, RefreshCw } from 'lucide-react';

interface CalendlySchedulerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  mode?: 'inline' | 'modal' | 'card';
  onCloseModal?: () => void;
}

export const CALENDLY_URL = 'https://calendly.com/orixnalgroup/brand-discovery-consultation';

export const CalendlyScheduler: React.FC<CalendlySchedulerProps> = ({
  title = "Book a Brand Discovery Consultation",
  subtitle = "Schedule a direct, confidential 1-on-1 strategy call with Founder Asim Khan to discuss your brand architecture, trademark engineering, or custom digital platform.",
  className = "",
  mode = "inline",
  onCloseModal
}) => {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  // Embed parameters to style Calendly cleanly
  const embedUrl = `${CALENDLY_URL}?embed_type=Inline&hide_gdpr_banner=1&background_color=ffffff&text_color=0a0a0a&primary_color=7e22ce`;

  useEffect(() => {
    // Reset state if URL or mode changes
    setIframeLoading(true);
    setIframeError(false);
  }, [mode]);

  const content = (
    <div className={`space-y-6 ${className}`}>
      {/* Header section with brand typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-900 border border-purple-200/90 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Official Appointment Scheduler</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Action button to open externally if needed */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-2.5 rounded-xl border border-neutral-300 transition-all shrink-0 self-start md:self-auto"
        >
          <span>Open in Calendly</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
        </a>
      </div>

      {/* Feature Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Duration</div>
            <div className="text-xs font-extrabold text-neutral-900">30 Min Strategy</div>
          </div>
        </div>

        <div className="bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Host</div>
            <div className="text-xs font-extrabold text-neutral-900">Asim Khan (Founder)</div>
          </div>
        </div>

        <div className="bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Privacy</div>
            <div className="text-xs font-extrabold text-neutral-900">100% NDA Protected</div>
          </div>
        </div>

        <div className="bg-[#FAF9F6] border border-neutral-200/80 rounded-2xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Format</div>
            <div className="text-xs font-extrabold text-neutral-900">Google Meet / Video</div>
          </div>
        </div>
      </div>

      {/* Embedded Calendly Frame Container */}
      <div className="relative w-full rounded-3xl border border-neutral-200 overflow-hidden bg-white shadow-inner min-h-[680px]">
        
        {/* Loading Spinner State */}
        {iframeLoading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 space-y-3 z-10">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-700 rounded-full animate-spin" />
            <div className="text-xs font-bold text-neutral-800">Loading ORIXNAL Brand Discovery Scheduler...</div>
            <div className="text-[11px] text-neutral-500 font-mono">Connecting with Calendly appointment service</div>
          </div>
        )}

        {/* Fallback option if iframe encounters issue */}
        {iframeError && (
          <div className="p-8 text-center space-y-4 max-w-md mx-auto my-12">
            <Calendar className="w-12 h-12 text-purple-700 mx-auto animate-bounce" />
            <h3 className="text-lg font-extrabold text-neutral-900">Open Discovery Scheduler Directly</h3>
            <p className="text-xs text-neutral-600">
              Your browser preview security rules may restrict embedded scheduling. You can open the official Calendly booking page directly below:
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="orixnal-gradient-bg text-white font-extrabold text-sm px-6 py-3 rounded-xl inline-flex items-center gap-2 shadow-md hover:opacity-95"
            >
              <span>Launch Calendly Booking</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Native Calendly iFrame Embed */}
        <iframe
          src={embedUrl}
          title="ORIXNAL Brand Discovery Consultation Scheduler"
          className="w-full h-[680px] border-0"
          onLoad={() => setIframeLoading(false)}
          onError={() => {
            setIframeLoading(false);
            setIframeError(true);
          }}
        />
      </div>

      {/* Footer Assurance */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-500 font-medium px-2">
        <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instant calendar confirmation & Google Meet invite automatically dispatched upon booking</span>
        </div>
        <div className="text-[11px] font-mono text-neutral-500">
          Official link: <span className="font-bold text-neutral-700">{CALENDLY_URL}</span>
        </div>
      </div>
    </div>
  );

  if (mode === 'modal') {
    return (
      <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative animate-scale-up my-auto">
          <button
            onClick={onCloseModal}
            className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors z-20"
            title="Close Consultation Modal"
          >
            ✕
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
};
