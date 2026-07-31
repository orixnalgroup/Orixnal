import React from 'react';
import { COMPANY_DETAILS } from '../data/brandData';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-neutral-800">
      <h1 className="text-3xl font-extrabold text-neutral-900">Privacy Policy</h1>
      <p className="text-xs text-neutral-500 font-mono">Last Updated: July 2026 | Entity: {COMPANY_DETAILS.legalName}</p>

      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          At ORIXNAL Group (“ORIXNAL”, “we”, “us”), accessible from www.orixnal.com, the privacy of our visitors and clients is of paramount importance. This Privacy Policy document outlines the types of information collected and how it is used.
        </p>

        <h2 className="text-lg font-bold text-neutral-900 pt-2">1. Information Collection & Direct Communication</h2>
        <p>
          ORIXNAL does not mandate user account creation or third-party tracking forms. When you contact us via telephone (+91 8447561650) or email (hello@orixnal.com), we collect only the business communication details provided voluntarily by you.
        </p>

        <h2 className="text-lg font-bold text-neutral-900 pt-2">2. Use of Information</h2>
        <p>
          Information collected during client discovery or consultation is used exclusively to evaluate brand scope, perform trademark/naming viability checks, draft legal agreements, and deliver project milestones.
        </p>

        <h2 className="text-lg font-bold text-neutral-900 pt-2">3. Intellectual Property & Confidentiality</h2>
        <p>
          All proprietary client briefs, strategic discovery documents, and trademark search data are kept strictly confidential under non-disclosure standards.
        </p>

        <h2 className="text-lg font-bold text-neutral-900 pt-2">4. Contact Information</h2>
        <p>
          For privacy or legal inquiries: Orixnal Group, Headquarters: {COMPANY_DETAILS.headquarters}. Registered: {COMPANY_DETAILS.registeredAddress}. Email: hello@orixnal.com.
        </p>
      </div>
    </div>
  );
};
