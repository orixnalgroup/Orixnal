import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS, FOUNDER_INFO } from '../data/brandData';
import { GlobalPresenceMap } from '../components/GlobalPresenceMap';
import { CalendlyScheduler, CALENDLY_URL } from '../components/CalendlyScheduler';
import { ContactButtonGroup } from '../components/ContactButtonGroup';
import { ContactInquiryForm } from '../components/ContactInquiryForm';
import { Sparkles, Phone, Mail, MapPin, Building, ShieldCheck, Globe, Clock, ArrowRight, Calendar, Video, CheckCircle2, ExternalLink, MessageSquare } from 'lucide-react';

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

  const scrollToForm = () => {
    const el = document.getElementById('inquiry-form-section');
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
              Schedule a 1-on-1 Brand Discovery Consultation via Google Calendar below, or connect directly via phone dialer and email.
            </p>
          </div>

          <ContactButtonGroup
            onOpenConsultation={scrollToScheduler}
            consultationText="Brand Discovery Consultation"
            size="md"
            align="right"
            className="shrink-0"
          />
        </div>
      </div>

      {/* Primary Action Grid (Call, Email, & Google Calendar Quick Card) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Google Calendar Booking Hero Card */}
        <div className="orixnal-gradient-bg text-white rounded-3xl p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between border border-transparent">
          <div className="space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white border border-white/30 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase backdrop-blur-sm">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Google Calendar Integration</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">Book Discovery Session</h2>
            <p className="text-purple-100 text-xs leading-relaxed font-medium">
              Select an available time slot directly with Founder Asim Khan for 1-on-1 strategic consultation.
            </p>

            <ul className="space-y-2 pt-2 text-xs text-purple-100 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
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

      {/* STRATEGIC CONSULTATION & INQUIRY FORM */}
      <div id="inquiry-form-section" className="scroll-mt-24">
        <ContactInquiryForm onOpenScheduler={scrollToScheduler} />
      </div>

      {/* EMBEDDED GOOGLE CALENDAR SCHEDULER SECTION */}
      <div id="calendly-booking-section" className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 shadow-sm scroll-mt-24">
        <CalendlyScheduler
          title="Book a Brand Discovery Consultation"
          subtitle="Select your preferred date and time from our official Google Calendar appointment schedule below. You will receive an automated Google Meet invitation upon confirmation."
        />
      </div>

      {/* Office Locations & Registration Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-purple-700" />
                <h3 className="text-xl font-extrabold text-neutral-900">Headquarters</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-full uppercase">
                Corporate HQ
              </span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {COMPANY_DETAILS.headquarters}
            </p>
            <div className="text-xs text-neutral-500 font-mono">
              Corporate Strategy & Design Studio
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <a
              href={COMPANY_DETAILS.headquartersMapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 px-4 py-2.5 rounded-xl transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-purple-700" />
              <span>Noida Location on Google Maps</span>
              <ExternalLink className="w-3 h-3 text-purple-600" />
            </a>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-purple-700" />
                <h3 className="text-xl font-extrabold text-neutral-900">Registered Address</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full uppercase">
                Legal Entity
              </span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {COMPANY_DETAILS.registeredAddress}
            </p>
            <div className="text-xs text-neutral-500 font-mono">
              Legal Registered Entity: Orixnal Group (MSME Udyam)
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100">
            <a
              href={COMPANY_DETAILS.ghaziabadMapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-4 py-2.5 rounded-xl transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ghaziabad Location on Google Maps</span>
              <ExternalLink className="w-3 h-3 text-emerald-600" />
            </a>
          </div>
        </div>
      </div>

      {/* D3.js Interactive Global Footprint Map */}
      <GlobalPresenceMap onOpenAudit={onOpenAudit} />

      {/* Interactive Location Maps Grid with Live Google Map Frames */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-xl font-extrabold text-neutral-900">Official Google Maps Locations</h3>
            <p className="text-xs text-neutral-500 font-medium pt-0.5">
              Live Google Map embeds for ORIXNAL Registered Address and Corporate Headquarters.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shrink-0">
            Google Maps Verified
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Map Card with Live iFrame */}
          <div className="w-full rounded-2xl bg-white border border-emerald-200 p-5 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-200">
                  Registered Address
                </span>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Sadullabad, Ghaziabad
                </span>
              </div>
              <h4 className="font-extrabold text-neutral-900 text-base">ORIXNAL® Registered Address Location</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">{COMPANY_DETAILS.registeredAddress}</p>
            </div>

            {/* Live Embedded Google Map Frame */}
            <div className="w-full h-72 rounded-xl border border-neutral-200 overflow-hidden relative shadow-inner bg-neutral-100">
              <iframe
                title="ORIXNAL Ghaziabad Location Google Map"
                src={COMPANY_DETAILS.ghaziabadEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={COMPANY_DETAILS.ghaziabadMapUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>Open Ghaziabad Google Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-neutral-500 font-mono">MSME Registered Office</span>
            </div>
          </div>

          {/* Headquarters Location Map Card with Live iFrame */}
          <div className="w-full rounded-2xl bg-white border border-purple-200 p-5 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-900 bg-purple-100/80 px-2.5 py-1 rounded-full border border-purple-200">
                  Corporate Headquarters
                </span>
                <span className="text-xs text-purple-700 font-semibold flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> Sector 96, Noida
                </span>
              </div>
              <h4 className="font-extrabold text-neutral-900 text-base">ORIXNAL® Studio Headquarters</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">{COMPANY_DETAILS.headquarters}</p>
            </div>

            {/* Live Embedded Google Map Frame */}
            <div className="w-full h-72 rounded-xl border border-neutral-200 overflow-hidden relative shadow-inner bg-neutral-100">
              <iframe
                title="ORIXNAL Headquarters Google Map"
                src={COMPANY_DETAILS.headquartersEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href={COMPANY_DETAILS.headquartersMapUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto orixnal-gradient-bg text-white font-bold text-xs py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-2xs"
              >
                <span>Open Noida Google Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-neutral-500 font-mono">Design Studio & HQ</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
