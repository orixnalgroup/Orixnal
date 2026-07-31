import React, { useState } from 'react';
import { PageRoute } from '../types';
import { OFFICIAL_ASSETS, FOOOZ_BRAND, COMPANY_DETAILS } from '../data/brandData';
import { Sparkles, Phone, Mail, Utensils, CheckCircle2, ShoppingBag, Clock } from 'lucide-react';

interface FooozPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const FooozPage: React.FC<FooozPageProps> = ({ onNavigate, onOpenAudit }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-100/40 to-amber-50 border border-amber-200/90 rounded-3xl p-8 sm:p-14 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-200/80 text-amber-900 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span>ORIXNAL Ecosystem Sub-Brand</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              Foooz® — Simple, Accessible, Everyday Food.
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-2xl">
              {FOOOZ_BRAND.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={COMPANY_DETAILS.phoneRaw}
                className="bg-amber-600 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center gap-2 text-sm shadow-md hover:bg-amber-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Partner or Enquire: +91 8447561650</span>
              </a>

              <a
                href={COMPANY_DETAILS.emailRaw}
                className="bg-white border border-amber-300 text-amber-950 font-bold py-3.5 px-6 rounded-2xl flex items-center gap-2 text-sm shadow-2xs hover:bg-amber-50 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-700" />
                <span>Email hello@orixnal.com</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="p-6 bg-white border border-amber-200 rounded-3xl shadow-lg flex items-center justify-center w-full max-w-xs">
              {!logoError ? (
                <img
                  src={OFFICIAL_ASSETS.fooozLogo}
                  alt="Foooz Sub-Brand Logo"
                  className="w-full h-auto max-h-24 object-contain"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xl mx-auto">
                    FZ
                  </div>
                  <div className="font-extrabold text-2xl text-neutral-900">FOOOZ®</div>
                  <div className="text-xs text-amber-800 font-semibold">Everyday Food</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Brand Offering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
            <Utensils className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-neutral-900">Quick Meals</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Prepared quickly for busy urban professionals, students, and active workers who desire quality without delay.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-neutral-900">Affordable Menu</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Transparent pricing models structured for daily consumption without financial strain or artificial markups.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-3 shadow-2xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-extrabold text-neutral-900">Daily Products</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Consistent culinary quality packaged for daily routine orders, Cloud kitchens, and quick retail pickup.
          </p>
        </div>
      </div>

      {/* Ecosystem Philosophy */}
      <div className="bg-white border border-neutral-200 p-8 sm:p-12 rounded-3xl space-y-4">
        <h3 className="text-2xl font-extrabold text-neutral-900">The ORIXNAL Ecosystem Integration</h3>
        <p className="text-sm text-neutral-600 leading-relaxed max-w-3xl">
          Foooz represents how ORIXNAL Incubates and builds internal consumer sub-brands from scratch — taking brand naming, packaging design, FSSAI compliance, and digital ordering platforms from concept to reality.
        </p>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-neutral-800">
          {FOOOZ_BRAND.offering.map((off, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 bg-[#FAF9F6] border rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{off}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
