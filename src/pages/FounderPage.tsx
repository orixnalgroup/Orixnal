import React, { useState } from 'react';
import { PageRoute } from '../types';
import { OFFICIAL_ASSETS, COMPANY_DETAILS, FOUNDER_INFO } from '../data/brandData';
import { AudioPlayer } from '../components/AudioPlayer';
import { ContactButtonGroup } from '../components/ContactButtonGroup';
import { Sparkles, Phone, Mail, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface FounderPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const FounderPage: React.FC<FounderPageProps> = ({ onNavigate, onOpenAudit }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Editorial Founder Hero Grid */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-12 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Photograph Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-[#FAF9F6] p-3 rounded-3xl border border-neutral-200 shadow-lg">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-b from-purple-50 via-neutral-100 to-purple-100/70 flex items-center justify-center">
                {!imgError ? (
                  <img
                    src={OFFICIAL_ASSETS.founderPhoto}
                    alt="Asim Khan — Founder & Chief Brand Strategist of ORIXNAL"
                    className="w-full h-full object-contain object-bottom pt-2"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== OFFICIAL_ASSETS.founderPhotoFallback) {
                        target.src = OFFICIAL_ASSETS.founderPhotoFallback;
                      } else {
                        setImgError(true);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 to-rose-900 text-white flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-3 text-3xl font-bold font-mono">
                      AK
                    </div>
                    <div className="font-extrabold text-2xl">{FOUNDER_INFO.name}</div>
                    <div className="text-xs text-purple-200 font-medium mt-1">{FOUNDER_INFO.title}</div>
                  </div>
                )}
              </div>
              <div className="mt-3 px-2 text-center text-xs text-neutral-500 font-medium">
                ORIXNAL Talks
              </div>
            </div>
          </div>

          {/* Copy Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founder & Chief Brand Strategist</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
              {FOUNDER_INFO.name}
            </h1>

            <p className="text-base sm:text-lg text-purple-900 font-semibold">
              {FOUNDER_INFO.background}
            </p>

            <blockquote className="p-5 bg-purple-50/70 border-l-4 border-purple-700 rounded-r-2xl text-neutral-900 font-extrabold text-base sm:text-lg leading-snug">
              “{FOUNDER_INFO.philosophy}”
            </blockquote>

            <div className="space-y-3 text-sm text-neutral-600 leading-relaxed">
              <p>
                {FOUNDER_INFO.bio}
              </p>
              <p>
                Asim approaches brand creation with the analytical rigor of an inside sales leader combined with the refined aesthetic sensibilities of a world-class creative director.
              </p>
            </div>

            {/* Audio Reader */}
            <div className="pt-2">
              <AudioPlayer
                textToRead={`Asim Khan is the Founder and Chief Strategist of ORIXNAL. He believes that brand is not how it looks, but how it is understood. With experience across inside sales and branding, Asim focuses on building structured, scalable brand ecosystems.`}
                title="Listen to Asim Khan's Audio Profile"
              />
            </div>

            {/* Direct Contact & Consultation Buttons */}
            <ContactButtonGroup
              onOpenConsultation={onOpenAudit}
              consultationText="Brand Discovery Consultation"
              size="md"
              align="left"
              className="pt-2"
            />

          </div>

        </div>
      </div>

      {/* Founder Philosophy Breakdown */}
      <div className="bg-[#FAF8F5] border border-neutral-200 p-8 sm:p-12 rounded-3xl space-y-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-800">
            Brand Philosophy
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Core Principles of Asim Khan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-purple-700" />
            <h3 className="text-lg font-extrabold text-neutral-900">Positioning First</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Design without positioning is expensive art. Before drawing symbols or choosing palettes, we define the singular market gap you own.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-purple-700" />
            <h3 className="text-lg font-extrabold text-neutral-900">Legal Armor Included</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Brand equity is worthless if you don't own the trademark. We conduct legal checks and file Indian MSME/Udyam registrations upfront.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-purple-700" />
            <h3 className="text-lg font-extrabold text-neutral-900">Conversational Elegance</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              We write brand messaging in a human voice reflecting confidence, warmth, wit, and memorable clarity — stripping away corporate jargon.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
