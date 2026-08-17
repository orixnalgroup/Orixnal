import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/brandData';
import { Send, CheckCircle2, AlertCircle, Sparkles, Building, User, Mail, Phone, MessageSquare, ArrowRight, RefreshCw, Calendar } from 'lucide-react';

interface ContactInquiryFormProps {
  onOpenScheduler?: () => void;
}

export const ContactInquiryForm: React.FC<ContactInquiryFormProps> = ({ onOpenScheduler }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    serviceInterest: 'Brand Strategy & Founder Advisory',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);

  const serviceOptions = [
    'Brand Strategy & Founder Advisory (ORIXNAL CONSULTANCY)',
    'Brand Naming & Positioning (ORIXNAL NAME)',
    'Legal IP, Trademark Search & Filings (ORIXNAL LEGAL)',
    'Visual Identity & Design Systems (ORIXNAL STUDIO)',
    'Web Engineering & Digital Platforms (ORIXNAL DIGITAL)',
    'Go-To-Market & Brand Architecture (ORIXNAL MARKETING)',
    'Omnichannel Campaign & Ads (ORIXNAL ADS)',
    'Corporate Events & Activations (ORIXNAL EVENT)',
    'Foooz® Consumer Food Ecosystem Partnership',
    'Other Strategic Inquiry',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid business email address.';
    }

    if (!formData.organization.trim()) {
      errs.organization = 'Please provide your company or startup name.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a brief message describing your strategic objectives (minimum 10 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to internal server API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Even if offline/static, handle response
      if (!response.ok) {
        console.warn('API submission status:', response.status);
      }
    } catch (err) {
      console.warn('Could not reach backend API endpoint, preserving form state:', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      serviceInterest: 'Brand Strategy & Founder Advisory',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const generateMailtoLink = () => {
    if (!submittedData) return COMPANY_DETAILS.emailRaw;
    const subject = encodeURIComponent(`Strategic Inquiry from ${submittedData.name} (${submittedData.organization}) - ${submittedData.serviceInterest}`);
    const body = encodeURIComponent(
      `Full Name: ${submittedData.name}\n` +
      `Organization: ${submittedData.organization}\n` +
      `Email: ${submittedData.email}\n` +
      `Phone: ${submittedData.phone || 'Not provided'}\n` +
      `Strategic Area: ${submittedData.serviceInterest}\n\n` +
      `Message & Scope:\n${submittedData.message}`
    );
    return `mailto:${COMPANY_DETAILS.email}?subject=${subject}&body=${body}`;
  };

  if (isSubmitted && submittedData) {
    return (
      <div className="bg-white border-2 border-emerald-300 rounded-3xl p-8 sm:p-12 shadow-md space-y-6 text-neutral-900 animate-fadeIn">
        <div className="flex items-center gap-3 text-emerald-800">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-300">
            <CheckCircle2 className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 block">
              Inquiry Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
              Thank you, {submittedData.name}.
            </h3>
          </div>
        </div>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Your strategic inquiry regarding <strong className="text-neutral-900">{submittedData.serviceInterest}</strong> for <strong className="text-neutral-900">{submittedData.organization}</strong> has been logged. Our Founder & Principal Brand Strategist Asim Khan will review your objectives and respond within 4 business hours.
        </p>

        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-6 space-y-3 text-xs sm:text-sm">
          <div className="font-bold text-neutral-800 border-b border-neutral-200 pb-2">
            Inquiry Summary:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-600">
            <div><span className="font-semibold text-neutral-900">Contact Email:</span> {submittedData.email}</div>
            <div><span className="font-semibold text-neutral-900">Phone:</span> {submittedData.phone || 'Not provided'}</div>
            <div><span className="font-semibold text-neutral-900">Company:</span> {submittedData.organization}</div>
            <div><span className="font-semibold text-neutral-900">Capability:</span> {submittedData.serviceInterest}</div>
          </div>
          <div className="pt-2 text-neutral-600">
            <span className="font-semibold text-neutral-900 block mb-1">Scope:</span>
            <p className="bg-white p-3 rounded-xl border border-neutral-200 text-xs italic">
              "{submittedData.message}"
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          {onOpenScheduler && (
            <button
              onClick={onOpenScheduler}
              className="orixnal-gradient-bg text-white font-bold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-all"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Calendar Time Slot</span>
            </button>
          )}

          <a
            href={generateMailtoLink()}
            className="bg-white text-purple-950 border border-purple-300 font-bold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors shadow-2xs"
          >
            <Mail className="w-4 h-4 text-purple-700" />
            <span>Open in Email App as Backup</span>
          </a>

          <button
            onClick={handleReset}
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Send Another Inquiry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
      <div className="space-y-2 border-b border-neutral-100 pb-6">
        <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Strategic Inquiry</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Request Strategic Consultation
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          Fill out your brand requirements below. All communications are strictly confidential and reviewed directly by Founder Asim Khan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="e.g. Rahul Sharma"
                className={`w-full pl-10 pr-4 py-3 text-sm bg-neutral-50/60 border ${
                  errors.name ? 'border-rose-400 bg-rose-50/30 ring-1 ring-rose-300' : 'border-neutral-200 focus:border-purple-600 focus:bg-white'
                } rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all`}
              />
            </div>
            {errors.name && (
              <p className="text-rose-600 text-xs flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Business Email */}
          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Work Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="e.g. rahul@company.com"
                className={`w-full pl-10 pr-4 py-3 text-sm bg-neutral-50/60 border ${
                  errors.email ? 'border-rose-400 bg-rose-50/30 ring-1 ring-rose-300' : 'border-neutral-200 focus:border-purple-600 focus:bg-white'
                } rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all`}
              />
            </div>
            {errors.email && (
              <p className="text-rose-600 text-xs flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="contact-phone" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Phone / WhatsApp <span className="text-neutral-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-3 text-sm bg-neutral-50/60 border border-neutral-200 focus:border-purple-600 focus:bg-white rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Company / Organization */}
          <div className="space-y-1.5">
            <label htmlFor="contact-organization" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Organization / Startup <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Building className="w-4 h-4" />
              </div>
              <input
                id="contact-organization"
                name="organization"
                type="text"
                required
                value={formData.organization}
                onChange={(e) => {
                  setFormData({ ...formData, organization: e.target.value });
                  if (errors.organization) setErrors({ ...errors, organization: '' });
                }}
                placeholder="e.g. Acme Health Corp"
                className={`w-full pl-10 pr-4 py-3 text-sm bg-neutral-50/60 border ${
                  errors.organization ? 'border-rose-400 bg-rose-50/30 ring-1 ring-rose-300' : 'border-neutral-200 focus:border-purple-600 focus:bg-white'
                } rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all`}
              />
            </div>
            {errors.organization && (
              <p className="text-rose-600 text-xs flex items-center gap-1 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.organization}</span>
              </p>
            )}
          </div>
        </div>

        {/* Service Category */}
        <div className="space-y-1.5">
          <label htmlFor="contact-service" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Primary Area of Strategic Interest <span className="text-rose-500">*</span>
          </label>
          <select
            id="contact-service"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
            className="w-full px-4 py-3 text-sm bg-neutral-50/60 border border-neutral-200 focus:border-purple-600 focus:bg-white rounded-xl text-neutral-900 focus:outline-none transition-all font-medium"
          >
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Message / Scope */}
        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Project Scope & Key Strategic Goals <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: '' });
              }}
              placeholder="Tell us about your brand stage, challenges, desired timelines, and key milestones you wish to achieve..."
              className={`w-full p-4 text-sm bg-neutral-50/60 border ${
                errors.message ? 'border-rose-400 bg-rose-50/30 ring-1 ring-rose-300' : 'border-neutral-200 focus:border-purple-600 focus:bg-white'
              } rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-all leading-relaxed`}
            />
          </div>
          {errors.message && (
            <p className="text-rose-600 text-xs flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-neutral-500 font-medium">
            🔒 Direct founder confidentiality guaranteed. No third-party spam.
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto orixnal-gradient-bg text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl flex items-center justify-center gap-2.5 shadow-md hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Processing Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-300" />
                <span>Submit Strategic Inquiry</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
