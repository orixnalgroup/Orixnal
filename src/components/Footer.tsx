import React from 'react';
import { PageRoute } from '../types';
import { Logo } from './Logo';
import { NewsletterSignup } from './NewsletterSignup';
import { SocialLinks } from './SocialLinks';
import { COMPANY_DETAILS, FOUNDER_INFO } from '../data/brandData';
import { Phone, Mail, MapPin, Building, ShieldCheck, ArrowUpRight, Sparkles, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAudit }) => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-neutral-200 pt-16 pb-12 text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Banner */}
        <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 mb-16 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Direct Founder Access
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 mb-3">
              Ready to build a category-defining brand?
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base">
              Speak directly with Founder & Chief Strategist Asim Khan. No sales middleman, no generic pitch decks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={COMPANY_DETAILS.phoneRaw}
              className="orixnal-gradient-bg text-white font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2.5 shadow-md hover:opacity-95 transition-opacity text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>

            <a
              href={COMPANY_DETAILS.emailRaw}
              className="bg-white text-neutral-900 border border-neutral-300 font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-2.5 hover:bg-neutral-50 transition-colors text-sm shadow-2xs"
            >
              <Mail className="w-4 h-4 text-purple-700" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* Brand Intelligence Editorial Newsletter Signup */}
        <NewsletterSignup />

        {/* Main Footer Links & Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-200">
          
          {/* Brand & Credibility Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" size="lg" />
            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed mt-3">
              ORIXNAL is India's Brand Development Company helping ambitious businesses transform ideas into clear, meaningful, and scalable global brands.
            </p>

            {/* Official Udyam Registration Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold">Registered under Ministry of Micro, Small and Medium Enterprises (MSME)</div>
                  <div className="text-[11px] text-emerald-700 font-mono">
                    Udyam Reg: {COMPANY_DETAILS.udyamNumber}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-500 font-mono pt-1">
              Legal Name: <strong className="text-neutral-800">{COMPANY_DETAILS.legalName}</strong> | Inc: {COMPANY_DETAILS.incorporationDate}
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4 font-mono">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-medium">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-purple-700 transition-colors">
                  Brand Naming & Positioning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-purple-700 transition-colors">
                  Legal IP & Trademark Registration
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-purple-700 transition-colors">
                  Visual Identity & Design Systems
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-purple-700 transition-colors">
                  Custom Web & React Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-purple-700 transition-colors">
                  Go-To-Market & Growth Strategy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-purple-700 transition-colors">
                  Brand Campaign & Advertising
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-purple-700 transition-colors">
                  1-on-1 Founder Strategic Advisory
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Ecosystem */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4 font-mono">
              Ecosystem & Pages
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-600 font-medium">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-purple-700 transition-colors">
                  About ORIXNAL
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('founder')} className="hover:text-purple-700 transition-colors">
                  Meet Founder Asim Khan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('case-studies')} className="hover:text-purple-700 transition-colors">
                  Case Studies & Outcomes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('portfolio')} className="hover:text-purple-700 transition-colors">
                  Concept Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('insights')} className="hover:text-purple-700 transition-colors">
                  Insights & Essays
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-purple-700 transition-colors flex items-center gap-1.5 font-bold text-purple-900">
                  <span>Orixnal Event</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-purple-700 transition-colors flex items-center gap-1.5 font-bold text-purple-900">
                  <span>Blog & Editor</span>
                  <span className="bg-purple-100 text-purple-800 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase">New</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('foooz')} className="hover:text-purple-700 transition-colors flex items-center gap-1.5 font-bold text-amber-800">
                  <span>Foooz® Sub-Brand</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-purple-700 transition-colors">
                  Careers & Culture
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4 font-mono">
              Contact Us
            </h4>

            <div className="space-y-3.5 text-xs text-neutral-600">
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <span>{COMPANY_DETAILS.headquarters}</span>
                  
                  {/* Email & Website below office address and above prior appointment note */}
                  <div className="mt-2.5 pt-2 border-t border-neutral-200/60 space-y-1.5 font-medium text-neutral-800">
                    <a
                      href="mailto:contact@orixnal.com"
                      className="flex items-center gap-1.5 hover:text-purple-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>contact@orixnal.com</span>
                    </a>
                    <a
                      href="https://www.orixnal.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 hover:text-purple-700 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>www.orixnal.com</span>
                    </a>
                  </div>

                  <span className="block text-[11px] text-purple-800 font-medium italic mt-2 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                    {COMPANY_DETAILS.appointmentNote}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 space-y-1">
                <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                  Expanding Presence
                </span>
                <span className="text-xs text-neutral-700 font-semibold block">
                  Dubai • London • New York • Singapore
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-200/60 flex flex-col gap-2">
                <a
                  href={COMPANY_DETAILS.phoneRaw}
                  className="inline-flex items-center gap-2 font-bold text-xs text-white orixnal-gradient-bg px-3 py-2 rounded-xl shadow-2xs hover:opacity-95 transition-opacity"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>
                <a
                  href={COMPANY_DETAILS.emailRaw}
                  className="inline-flex items-center gap-2 font-bold text-xs text-neutral-900 bg-white border border-neutral-300 px-3 py-2 rounded-xl shadow-2xs hover:bg-neutral-50 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-purple-700" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Social Connectivity & Brand Links */}
        <SocialLinks />

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.legalName} (ORIXNAL®). All rights reserved. Registered under Ministry of Micro, Small and Medium Enterprises (Udyam: {COMPANY_DETAILS.udyamNumber}).
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-neutral-900 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms')} className="hover:text-neutral-900 transition-colors">
              Terms & Conditions
            </button>
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors flex items-center gap-1">
              <span>XML Sitemap</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors">
              Robots.txt
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
