import React from 'react';
import { COMPANY_DETAILS } from '../data/brandData';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-neutral-800">
      <h1 className="text-3xl font-extrabold text-neutral-900">Terms & Conditions</h1>
      <p className="text-xs text-neutral-500 font-mono">Last Updated: July 2026 | Legal Entity: {COMPANY_DETAILS.legalName}</p>

      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          Welcome to ORIXNAL. These Terms and Conditions govern your use of the website at www.orixnal.com and all brand development services provided by Orixnal Group.
        </p>

        <h2 className="text-lg font-bold text-neutral-900 pt-2">1. Engagement & Service Agreements</h2>
        <p>
          All commercial engagements, brand development retainers, legal IP filings, and design deliverables are governed by formal Statement of Work (SOW) documents executed between Orixnal Group and the client.
        </p>

        <h2 className="text-lg font-bold text-neutral-900 pt-2">2. Concept Projects & Intellectual Property</h2>
        <p>
          Demonstration and concept projects displayed on www.orixnal.com are created as illustrative demonstrations of strategic design capabilities.
        </p>

        <h2 className="text-lg font-bold text-neutral-900 pt-2">3. Ministry of Micro, Small and Medium Enterprises Registration</h2>
        <p>
          Orixnal Group is registered under the Ministry of Micro, Small and Medium Enterprises (MSME / Udyam) in India under Udyam Registration Number {COMPANY_DETAILS.udyamNumber}.
        </p>

        <h2 className="text-lg font-bold text-neutral-900 pt-2">4. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of India, with jurisdiction in Gautam Buddha Nagar / Ghaziabad, Uttar Pradesh.
        </p>
      </div>
    </div>
  );
};
