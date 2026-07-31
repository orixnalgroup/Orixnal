import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/brandData';

interface BrandAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAuditModal: React.FC<BrandAuditModalProps> = ({ isOpen, onClose }) => {
  const [stage, setStage] = useState<'early' | 'growth' | 'enterprise'>('early');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(['Brand Positioning', 'Visual Identity']);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const availableNeeds = [
    'Brand Naming & Trademark Search',
    'Brand Positioning & Messaging',
    'Visual Identity & Design System',
    'Custom React / Web Application',
    'Legal Incorporation & Compliance',
    'Go-To-Market (GTM) Strategy',
    '1-on-1 Founder Strategic Advisory',
    'Rebranding & Portfolio Architecture',
  ];

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const constructEmailBody = () => {
    const body = `Hi Asim & ORIXNAL Team,%0D%0A%0D%0AI would like to request a Brand Strategy Consultation for our business.%0D%0A%0D%0A- Company Name: ${encodeURIComponent(companyName || 'Not specified')}%0D%0A- Contact Person: ${encodeURIComponent(contactPerson || 'Not specified')}%0D%0A- Business Stage: ${stage.toUpperCase()}%0D%0A- Key Strategic Requirements: ${encodeURIComponent(selectedNeeds.join(', '))}%0D%0A- Additional Context: ${encodeURIComponent(notes || 'None')}%0D%0A%0D%0APlease let me know your availability for a strategy discovery call.%0D%0A%0D%0ARegards.`;
    return `mailto:${COMPANY_DETAILS.email}?subject=Brand Strategy Enquiry - ${encodeURIComponent(companyName || 'New Client')}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-neutral-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-800 bg-white rounded-full border border-neutral-200 hover:scale-105 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="orixnal-badge text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Instant Brand Audit Estimator
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mb-2">
          Architect Your Brand Roadmap
        </h3>
        <p className="text-sm sm:text-base text-neutral-600 mb-6">
          Define your business stage and requirements to generate a structured consultation brief for Founder Asim Khan.
        </p>

        {/* Step 1: Stage Selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            1. Select Your Business Stage
          </label>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'early', label: 'Early Stage Startup', sub: '0-2 Years' },
              { id: 'growth', label: 'Scaling Brand', sub: 'Growing Portfolio' },
              { id: 'enterprise', label: 'Established Enterprise', sub: 'Rebranding / Sub-brands' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStage(st.id as any)}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  stage === st.id
                    ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20 text-purple-950 font-bold'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                }`}
              >
                <div className="text-xs sm:text-sm font-bold">{st.label}</div>
                <div className="text-[11px] text-neutral-500">{st.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Need Selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            2. Select Your Core Capabilities Needed
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableNeeds.map((need) => {
              const selected = selectedNeeds.includes(need);
              return (
                <button
                  key={need}
                  type="button"
                  onClick={() => toggleNeed(need)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm text-left transition-all ${
                    selected
                      ? 'border-purple-600 bg-purple-50/80 font-bold text-purple-950 shadow-sm'
                      : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      selected ? 'text-purple-700 fill-purple-100' : 'text-neutral-300'
                    }`}
                  />
                  <span>{need}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Brief Details */}
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Company / Project Name</label>
              <input
                type="text"
                placeholder="e.g. Acme Health"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">Your Name & Role</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma, Founder"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">Brief Project Objectives (Optional)</label>
            <textarea
              rows={2}
              placeholder="Tell us about your brand vision, targets, or timelines..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-neutral-200">
          <a
            href={constructEmailBody()}
            className="w-full sm:w-1/2 orixnal-gradient-bg text-white font-bold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-md text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Launch Email Brief</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={COMPANY_DETAILS.phoneRaw}
            className="w-full sm:w-1/2 bg-white text-neutral-900 border border-neutral-300 font-bold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors shadow-sm text-sm"
          >
            <Phone className="w-4 h-4 text-purple-700" />
            <span>Call Founder Directly</span>
          </a>
        </div>
        <p className="text-[11px] text-center text-neutral-500 mt-3">
          Direct dial opens your phone dialer (+91 8447561650). Email opens your default mail app.
        </p>
      </div>
    </div>
  );
};
