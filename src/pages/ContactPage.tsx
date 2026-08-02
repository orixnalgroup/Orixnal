import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS, FOUNDER_INFO } from '../data/brandData';
import { GlobalPresenceMap } from '../components/GlobalPresenceMap';
import { CalendlyScheduler, CALENDLY_URL } from '../components/CalendlyScheduler';
import { Sparkles, Phone, Mail, MapPin, Building, ShieldCheck, Globe, Clock, ArrowRight, Calendar, Video, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenAudit }) => {
  const scrollToScheduler = () => {
    const el = document.getElementById('calendly-booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Founder & Advisory Access</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Direct lines to Founder Asim Khan.
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              Schedule a 1-on-1 Brand Discovery Consultation via Calendly below, or connect directly via phone dialer and email.
            </p>
          </div>

          <button
            onClick={scrollToScheduler}
            className="orixnal-gradient-bg text-white font-black text-sm px-7 py-4 rounded-2xl shadow-lg hover:opacity-95 transition-all shrink-0 flex items-center justify-center gap-2.5 group"
          >
            <Calendar className="w-5 h-5 text-amber-300" />
            <span>Book Discovery Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Primary Action Grid (Call, Email, & Calendly Quick Card) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendly Booking Hero Card */}
        <div className="bg-neutral-950 text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between border border-neutral-800">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-purple-900/80 text-amber-300 border border-purple-700/60 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>Calendly Integration</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Book Discovery Session</h2>
            <p className="text-neutral-300 text-xs leading-relaxed">
              Select an available time slot directly with Founder Asim Khan for 1-on-1 strategic consultation.
            </p>

            <ul className="space-y-2 pt-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>30-minute confidential video session</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Google Meet & Calendar Invite</span>
              </li>
            </ul>
          </div>

          <button
            onClick={scrollToScheduler}
            className="w-full bg-amber-400 text-neutral-950 font-black text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 hover:bg-amber-300 transition-all shadow-md relative z-10"
          >
            <Calendar className="w-4 h-4" />
            <span>Pick Time Slot Below</span>
          </button>
        </div>

        {/* Click to Call Card */}
        <div className="bg-purple-50/70 border border-purple-200 text-neutral-900 rounded-3xl p-8 space-y-6 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
              Immediate Phone Connection
            </span>
            <h2 className="text-2xl font-extrabold text-neutral-900">Call Founder Directly</h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Clicking below opens your phone dialer instantly to speak directly with Asim Khan.
            </p>
          </div>

          <a
            href={COMPANY_DETAILS.phoneRaw}
            className="w-full orixnal-gradient-bg text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 hover:opacity-95 transition-all shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Call Us Now</span>
          </a>

          <div className="text-[11px] text-neutral-600 font-mono text-center pt-1">
            Mon – Sat, 10:00 AM – 7:00 PM IST
          </div>
        </div>

        {/* Click to Email Card */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 space-y-6 shadow-2xs flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
              Direct Written Inquiry
            </span>
            <h2 className="text-2xl font-extrabold text-neutral-900">Email ORIXNAL</h2>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Clicking below opens your default email client addressed directly to hello@orixnal.com.
            </p>
          </div>

          <a
            href={COMPANY_DETAILS.emailRaw}
            className="w-full bg-white text-purple-950 border border-purple-300 font-extrabold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2.5 hover:bg-purple-50 transition-colors shadow-2xs"
          >
            <Mail className="w-4 h-4 text-purple-700" />
            <span>Send Email Inquiry</span>
          </a>

          <div className="text-[11px] text-neutral-500 font-mono text-center pt-1">
            Response time: Under 4 business hours
          </div>
        </div>
      </div>

      {/* EMBEDDED CALENDLY SCHEDULER SECTION */}
      <div id="calendly-booking-section" className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-sm scroll-mt-24">
        <CalendlyScheduler
          title="Book a Brand Discovery Consultation"
          subtitle="Select your preferred date and time from our official Calendly calendar below. You will receive an automated Google Meet invitation upon confirmation."
        />
      </div>

      {/* Office Locations & Registration Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-purple-700" />
            <h3 className="text-xl font-extrabold text-neutral-900">Noida Headquarters</h3>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {COMPANY_DETAILS.headquarters}
          </p>
          <div className="pt-2 text-xs text-neutral-500 font-mono">
            Corporate Strategy & Design Studio
          </div>
        </div>

        <div className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-purple-700" />
            <h3 className="text-xl font-extrabold text-neutral-900">Ghaziabad Registered Office</h3>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {COMPANY_DETAILS.registeredAddress}
          </p>
          <div className="pt-2 text-xs text-neutral-500 font-mono">
            Legal Registered Entity: Orixnal Group
          </div>
        </div>
      </div>

      {/* D3.js Interactive Global Footprint Map */}
      <GlobalPresenceMap onOpenAudit={onOpenAudit} />

      {/* Interactive Map Embed Mockup */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-2xs overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-neutral-900">ORIXNAL Studio Location Map</h3>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Sector 96, Noida, UP
          </span>
        </div>

        <div className="w-full h-64 rounded-2xl bg-neutral-100 relative overflow-hidden border border-neutral-200 flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative text-center p-6 space-y-2 max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-neutral-200 shadow-lg">
            <MapPin className="w-8 h-8 text-purple-700 mx-auto animate-bounce" />
            <h4 className="font-extrabold text-neutral-900 text-sm">ESquare Building, Plot C-2, Sector 96</h4>
            <p className="text-xs text-neutral-500">Noida, Uttar Pradesh – 201301, India</p>
            <a
              href="https://maps.google.com/?q=Sector+96+Noida+Uttar+Pradesh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 hover:underline pt-1"
            >
              <span>Open in Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
