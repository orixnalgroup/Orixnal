import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS, FOUNDER_INFO } from '../data/brandData';
import { GlobalPresenceMap } from '../components/GlobalPresenceMap';
import { Sparkles, Phone, Mail, MapPin, Building, ShieldCheck, Globe, Clock, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenAudit }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-2xs">
        <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Founder Access</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl">
          Direct lines to Founder Asim Khan.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 mt-4 max-w-3xl leading-relaxed">
          No contact forms blocking your path. Clicking the phone number launches your phone dialer. Clicking the email address launches your default email client.
        </p>
      </div>

      {/* Primary Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Click to Call Card */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-950 to-neutral-900 text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-300">
              Immediate Phone Connection
            </span>
            <h2 className="text-3xl font-extrabold">Call Founder Directly</h2>
            <p className="text-purple-200 text-sm">
              Clicking below opens your phone dialer instantly to speak with Asim Khan.
            </p>
          </div>

          <a
            href={COMPANY_DETAILS.phoneRaw}
            className="w-full bg-white text-neutral-900 font-extrabold text-lg py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-neutral-100 transition-colors shadow-lg"
          >
            <Phone className="w-5 h-5 text-purple-700 fill-current" />
            <span>+91 8447561650</span>
          </a>

          <div className="text-xs text-purple-300 font-mono text-center pt-2">
            Available Monday – Saturday, 10:00 AM – 7:00 PM IST
          </div>
        </div>

        {/* Click to Email Card */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xs">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
              Direct Written Inquiry
            </span>
            <h2 className="text-3xl font-extrabold text-neutral-900">Email ORIXNAL</h2>
            <p className="text-neutral-600 text-sm">
              Clicking below opens your email application with a direct link to hello@orixnal.com.
            </p>
          </div>

          <a
            href={COMPANY_DETAILS.emailRaw}
            className="w-full orixnal-gradient-bg text-white font-extrabold text-lg py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:opacity-95 transition-opacity shadow-md"
          >
            <Mail className="w-5 h-5" />
            <span>hello@orixnal.com</span>
          </a>

          <div className="text-xs text-neutral-500 font-mono text-center pt-2">
            Average email response time: Under 4 business hours
          </div>
        </div>
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
