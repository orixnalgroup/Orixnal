import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Clock,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  Video,
  ExternalLink,
  RefreshCw,
  Compass,
  CalendarPlus,
  HeartHandshake,
  Check,
} from 'lucide-react';
import { Logo } from './Logo';
import { GOOGLE_CALENDAR_URL } from './CalendlyScheduler';
import { COMPANY_DETAILS } from '../data/brandData';

const SESSION_STORAGE_KEY = 'orixnal_free_audit_popup_dismissed_v5';

interface FreeBrandAuditPopupProps {
  onOpenAuditEstimator?: () => void;
  onNavigateContact?: () => void;
}

export const FreeBrandAuditPopup: React.FC<FreeBrandAuditPopupProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [confirmationSource, setConfirmationSource] = useState<'automated' | 'manual'>('automated');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 1. Check if user already dismissed this popup in this browser session
    try {
      const alreadyDismissed = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (alreadyDismissed === 'true') {
        return;
      }
    } catch {
      // Ignore sessionStorage exceptions in private browsing mode
    }

    // 2. Display after a gentle delay on entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };

    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Automated Google Calendar sync via window postMessage listener
  useEffect(() => {
    const handleGoogleCalendarMessage = (event: MessageEvent) => {
      try {
        if (!event.data) return;

        // Check if message is from Google Calendar or contains scheduling data
        const isFromGoogle =
          (event.origin && event.origin.includes('calendar.google.com')) ||
          (event.origin && event.origin.includes('google.com'));

        let data = event.data;
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch {
            // Check string payload directly
            const lower = (event.data as string).toLowerCase();
            if (
              lower.includes('appointment_scheduled') ||
              lower.includes('appointmentscheduled') ||
              lower.includes('booking_confirmed') ||
              lower.includes('bookingconfirmed') ||
              (isFromGoogle && (lower.includes('confirmed') || lower.includes('scheduled') || lower.includes('complete')))
            ) {
              console.log('[Google Calendar Automated Sync Triggered]:', event.data);
              setConfirmationSource('automated');
              setIsBooked(true);
              return;
            }
          }
        }

        // Check structured object payloads
        if (data && typeof data === 'object') {
          const type = String(data.type || data.event || data.action || data.status || '').toLowerCase();
          const isAppointmentDone =
            type.includes('appointment') ||
            type.includes('scheduled') ||
            type.includes('confirmed') ||
            type.includes('booking') ||
            type.includes('success');

          if (isFromGoogle || isAppointmentDone) {
            console.log('[Google Calendar Appointment Confirmed via PostMessage]:', data);
            setConfirmationSource('automated');
            setIsBooked(true);
          }
        }
      } catch (err) {
        console.warn('Error processing postMessage event from calendar iframe:', err);
      }
    };

    window.addEventListener('message', handleGoogleCalendarMessage);
    return () => window.removeEventListener('message', handleGoogleCalendarMessage);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch {
      // Ignore
    }
  };

  const handleManualBookingConfirmed = () => {
    setConfirmationSource('manual');
    setIsBooked(true);
  };

  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`ORIXNAL Free Brand Audit — 1-on-1 with Asim Khan`);
    const details = encodeURIComponent(
      `Thank You for booking your 1-on-1 Complimentary Brand Strategy & Audit Session!\n\n` +
      `Host: Asim Khan (Founder & Chief Brand Strategist, ORIXNAL)\n` +
      `Platform: Google Meet Video Call\n` +
      `Meeting link and details are active on your Google Calendar.\n\n` +
      `Direct Contact: +91 8447561650 | ${COMPANY_DETAILS.email}`
    );
    const location = encodeURIComponent('Google Meet (Check your Google Calendar invite)');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Book Free 1-on-1 Brand Audit Session with Founder Asim Khan"
        >
          {/* Backdrop Blur & Dimming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${
              isBooked ? 'max-w-2xl' : 'max-w-4xl'
            } max-h-[94vh] bg-[#FAF9F6] border border-neutral-200/90 rounded-3xl shadow-2xl shadow-purple-950/30 overflow-y-auto text-neutral-900 z-10 my-auto flex flex-col transition-all`}
          >
            {/* Top Gradient Stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-purple-700 via-purple-500 to-amber-400 shrink-0" />

            {/* Header: Logo, Sync Tag & Cross Button */}
            <div className="flex items-center justify-between px-5 sm:px-8 pt-4 sm:pt-5 pb-3 border-b border-neutral-200/70 shrink-0 bg-white/80 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <Logo variant="full" size="sm" className="shrink-0" />
                <span className="hidden sm:inline-block h-4 w-px bg-neutral-300" />
                <span className="hidden sm:inline-flex items-center gap-1.5 bg-purple-50 text-purple-900 border border-purple-200/80 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-purple-700" />
                  <span>{isBooked ? 'Automated Booking Confirmation' : 'Complimentary Brand Audit'}</span>
                </span>
              </div>

              {/* Cross Close Button */}
              <button
                onClick={handleDismiss}
                className="p-2 rounded-full text-neutral-500 hover:text-neutral-950 bg-white hover:bg-neutral-100 border border-neutral-200 shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
                aria-label="Close brand audit popup"
                title="Close (Esc)"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 md:p-8 flex-1">
              {!isBooked ? (
                /* LIVE INTEGRATED GOOGLE CALENDAR APPOINTMENT SCHEDULER VIEW */
                <div className="space-y-4">
                  {/* Headline & Overview */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white border border-neutral-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs">
                    <div className="space-y-1">
                      <div className="inline-flex sm:hidden items-center gap-1.5 bg-purple-50 text-purple-900 border border-purple-200/80 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3 text-purple-700" />
                        <span>100% Free · 1-on-1 Session</span>
                      </div>
                      <h2 className="text-lg sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                        Schedule Your 1-on-1 Free Brand Audit
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        Select a date and time slot below on Google Calendar. Your appointment syncs automatically with Founder <strong className="text-neutral-900">Asim Khan</strong>.
                      </p>
                    </div>

                    {/* Value Metrics Pills */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="bg-purple-50 text-purple-950 border border-purple-200 rounded-xl px-3 py-1.5 text-center">
                        <div className="text-[10px] font-bold uppercase text-purple-700 flex items-center justify-center gap-1">
                          <Clock className="w-3 h-3" /> 30 Min
                        </div>
                        <div className="text-xs font-black">Google Meet</div>
                      </div>
                      <div className="bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-xl px-3 py-1.5 text-center">
                        <div className="text-[10px] font-bold uppercase text-emerald-700 flex items-center justify-center gap-1">
                          <UserCheck className="w-3 h-3" /> Direct
                        </div>
                        <div className="text-xs font-black">Founder-Led</div>
                      </div>
                    </div>
                  </div>

                  {/* Google Calendar Interactive Embed Container */}
                  <div className="relative w-full bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden min-h-[600px]">
                    {/* Loading State Spinner */}
                    {iframeLoading && (
                      <div className="absolute inset-0 bg-white/95 backdrop-blur-xs flex flex-col items-center justify-center gap-3 z-10 p-6 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 animate-spin">
                          <RefreshCw className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-neutral-900">
                            Connecting with Google Calendar...
                          </div>
                          <div className="text-xs text-neutral-500">
                            Loading live appointment schedule for Founder Asim Khan
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Integrated Google Calendar Iframe */}
                    <iframe
                      ref={iframeRef}
                      src={GOOGLE_CALENDAR_URL}
                      style={{ border: 0 }}
                      width="100%"
                      height="600"
                      frameBorder="0"
                      title="ORIXNAL Free Brand Audit Google Calendar Appointment Scheduler"
                      onLoad={() => setIframeLoading(false)}
                      className="w-full min-h-[580px] sm:min-h-[600px] rounded-2xl"
                    />
                  </div>

                  {/* Bottom Controls: Skip & Explore Link, Auto-Sync Status & Manual Confirm Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-200/70">
                    <button
                      onClick={handleDismiss}
                      className="text-xs sm:text-sm text-neutral-500 hover:text-neutral-900 font-semibold py-2 px-2 transition-colors flex items-center gap-1.5 group cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900" />
                      <span>Skip & explore website details first</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={GOOGLE_CALENDAR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-neutral-600 hover:text-neutral-950 font-bold bg-white border border-neutral-200 px-3 py-1.5 rounded-xl inline-flex items-center gap-1 shadow-2xs"
                      >
                        <span>Open in Google Calendar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={handleManualBookingConfirmed}
                        className="orixnal-gradient-bg text-white font-bold text-xs py-2 px-4 rounded-xl shadow-xs hover:opacity-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-amber-300" />
                        <span>I've Confirmed on Google Calendar</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* IN-POPUP AUTOMATED THANK YOU & BOOKING CONFIRMATION SCREEN */
                <div className="space-y-6 text-center sm:text-left py-2 animate-fadeIn">
                  {/* Thank You & Success Header */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-neutral-200/80 pb-5">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0 shadow-sm">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                        <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {confirmationSource === 'automated' ? 'Automated Google Calendar Sync' : 'Booking Confirmed'}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                        Thank You! Your Free Brand Audit is Confirmed.
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 font-medium">
                        Your private consultation has been successfully scheduled with Founder & Chief Brand Strategist <strong className="text-neutral-900">Asim Khan</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Summary Box with Active Calendar Invite Details */}
                  <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm text-left">
                    <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                        <span>Confirmed Session Overview</span>
                      </span>
                      <span className="text-emerald-700 font-mono text-[11px] font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ● Google Calendar Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/70">
                        <span className="text-neutral-500 block text-[10px] font-mono font-bold uppercase">Consulting Strategist</span>
                        <strong className="text-neutral-900 text-sm">Asim Khan</strong>
                        <div className="text-[11px] text-neutral-500">Founder & Chief Brand Strategist</div>
                      </div>

                      <div className="bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/70">
                        <span className="text-neutral-500 block text-[10px] font-mono font-bold uppercase">Session Duration</span>
                        <strong className="text-neutral-900 text-sm">30 Minutes Strategy Call</strong>
                        <div className="text-[11px] text-neutral-500">100% Free · Zero Obligation</div>
                      </div>

                      <div className="bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/70">
                        <span className="text-neutral-500 block text-[10px] font-mono font-bold uppercase">Video Platform</span>
                        <span className="inline-flex items-center gap-1.5 text-purple-900 font-bold text-sm">
                          <Video className="w-4 h-4 text-purple-700" /> Google Meet Video Call
                        </span>
                        <div className="text-[11px] text-neutral-500">Link in your Google Calendar invite</div>
                      </div>

                      <div className="bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/70">
                        <span className="text-neutral-500 block text-[10px] font-mono font-bold uppercase">Client Confidentiality</span>
                        <span className="inline-flex items-center gap-1.5 text-emerald-800 font-bold text-sm">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% NDA Protected
                        </span>
                        <div className="text-[11px] text-neutral-500">All brand data strictly confidential</div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-purple-50/70 border border-purple-200/80 rounded-xl text-xs text-purple-950 leading-relaxed space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-purple-900">
                        <Sparkles className="w-3.5 h-3.5 text-purple-700" /> Next Steps & Preparation:
                      </div>
                      <p className="text-[11px] sm:text-xs text-purple-900/90">
                        Founder Asim Khan will review your brand context before the call to prepare actionable positioning, naming, and architectural recommendations. A reminder notification has been linked with your Google Calendar.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                    <a
                      href={generateGoogleCalendarUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-white hover:bg-neutral-50 text-purple-950 border border-purple-300 font-bold text-xs sm:text-sm py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-2xs transition-colors"
                    >
                      <CalendarPlus className="w-4 h-4 text-purple-700" />
                      <span>View in Google Calendar</span>
                    </a>

                    <button
                      onClick={handleDismiss}
                      className="flex-1 orixnal-gradient-bg text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all cursor-pointer"
                    >
                      <span>Explore ORIXNAL Website</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
