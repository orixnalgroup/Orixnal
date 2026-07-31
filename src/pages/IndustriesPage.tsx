import React from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS } from '../data/brandData';
import { Sparkles, Phone, Mail, Rocket, Store, Briefcase, Building2, Utensils, ArrowRight } from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate, onOpenAudit }) => {
  const sectors = [
    {
      title: 'Early-Stage & Seed Startups',
      icon: Rocket,
      desc: 'Formulating foundational positioning, trademark-cleared brand naming, and high-converting seed pitch identity.',
      services: ['Brand Naming', 'Logo & Identity System', 'Startup India / MSME Reg', 'Seed Web Platform'],
    },
    {
      title: 'D2C & Consumer Brands',
      icon: Store,
      desc: 'Creating distinct packaging systems, sub-brand architectures, and Shopify e-commerce platforms designed for retention.',
      services: ['Packaging Systems', 'Sub-Brand Architecture', 'Shopify Development', 'GTM Campaign Strategy'],
    },
    {
      title: 'B2B & Service Enterprises',
      icon: Briefcase,
      desc: 'Transforming technical commoditized services into high-margin, trust-radiating category leaders.',
      services: ['Value Proposition Design', 'Custom React Web App', 'B2B Contract Legal Drafting', 'Enterprise SLA Frameworks'],
    },
    {
      title: 'Established Corporate Teams',
      icon: Building2,
      desc: 'Comprehensive corporate rebranding, sub-brand ecosystem governance, and multi-country trademark management.',
      services: ['Rebranding Strategy', 'Design System Guidelines', 'Multi-Jurisdiction IP', 'Sub-brand Portfolio'],
    },
    {
      title: 'Food & Beverage Ventures',
      icon: Utensils,
      desc: 'Daily consumption food brand concepts, cloud kitchen identity, packaging design, and retail distribution alignment.',
      services: ['F&B Brand Naming', 'Menu & Packaging Design', 'FSSAI License Assistance', 'Retail Merchandise'],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 sm:p-12 shadow-2xs">
        <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Industry Specializations</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-3xl">
          Tailored brand strategy for high-growth sectors.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 mt-4 max-w-3xl leading-relaxed">
          Whether you are launching a Gen-Z consumer brand or expanding an established B2B logistics firm, ORIXNAL adapts its strategic framework to your industry dynamics.
        </p>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={idx} className="bg-white border border-neutral-200 rounded-3xl p-8 space-y-4 shadow-2xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-800">
                <Icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-extrabold text-neutral-900">{sec.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{sec.desc}</p>

              <div className="pt-2 border-t border-neutral-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2 font-mono">
                  Key Capabilities Delivered
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sec.services.map((s, sIdx) => (
                    <span key={sIdx} className="text-[11px] font-semibold bg-[#FAF9F6] border border-neutral-200 px-2 py-0.5 rounded-md text-neutral-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-neutral-900">Operating in another specialized industry?</h3>
        <p className="text-sm text-neutral-600 max-w-xl mx-auto">
          Contact Founder Asim Khan to evaluate your sector's positioning opportunities.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={COMPANY_DETAILS.phoneRaw}
            className="orixnal-gradient-bg text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 8447561650</span>
          </a>
          <a
            href={COMPANY_DETAILS.emailRaw}
            className="bg-neutral-900 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Email hello@orixnal.com</span>
          </a>
        </div>
      </div>

    </div>
  );
};
