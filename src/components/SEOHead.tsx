import React, { useEffect } from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS, FOUNDER_INFO, FAQ_LIST } from '../data/brandData';

interface SEOHeadProps {
  currentRoute: PageRoute;
  titleSuffix?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentRoute, titleSuffix }) => {
  useEffect(() => {
    // Dynamic page title
    const baseTitle = 'ORIXNAL® — Global Brand Development Company';
    const titles: Record<PageRoute, string> = {
      home: 'ORIXNAL® — Global Brand Development Company',
      about: 'About ORIXNAL — Brand DNA, Philosophy & The ORIXNAL Method',
      founder: 'Asim Khan — Founder & Chief Brand Strategist | ORIXNAL',
      services: 'Brand Development Services — Naming, Legal IP, Design & Web | ORIXNAL',
      'service-detail': 'Strategic Brand Capability | ORIXNAL',
      'case-studies': 'Case Studies & Brand Outcomes | ORIXNAL',
      'case-study-detail': 'In-Depth Case Study | ORIXNAL',
      portfolio: 'Concept & Demonstration Projects | ORIXNAL Portfolio',
      insights: 'Insights & Thought Leadership on Brand Building | ORIXNAL',
      'insight-detail': 'Strategic Brand Essay | ORIXNAL Insights',
      blog: 'Blog & Editorial Dashboard — Strategic Articles & IP Guides | ORIXNAL',
      'blog-detail': 'Strategic Blog Publication | ORIXNAL',
      industries: 'Industries We Serve — Startups, D2C, Enterprise | ORIXNAL',
      foooz: 'Foooz® — Everyday Food Brand Ecosystem | ORIXNAL Sub-Brand',
      events: 'Orixnal Event — Global Strategic Gatherings & IP Workshops',
      careers: 'Careers at ORIXNAL — Join Our Brand Development Team',
      faq: 'Frequently Asked Questions — Brand Building & Advisory | ORIXNAL',
      contact: 'Contact ORIXNAL — Schedule Strategic Consultation | +91 8447561650',
      privacy: 'Privacy Policy | ORIXNAL Group',
      terms: 'Terms & Conditions | ORIXNAL Group',
    };

    document.title = titleSuffix ? `${titleSuffix} | ORIXNAL` : titles[currentRoute] || baseTitle;

    // Inject Organization & LocalBusiness JSON-LD Schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'ProfessionalService'],
      '@id': 'https://www.orixnal.com/#organization',
      name: COMPANY_DETAILS.legalName,
      alternateName: 'ORIXNAL',
      url: 'https://www.orixnal.com',
      logo: COMPANY_DETAILS.website + '/favicon.svg',
      image: 'https://lh3.googleusercontent.com/d/1PQ9-ihBp0XRHe9nmFEmrmqqrUyBIaZh7',
      telephone: COMPANY_DETAILS.phone,
      email: COMPANY_DETAILS.email,
      description: 'Brand development company helping businesses build clear, meaningful, and scalable brands through strategy, legal protection, visual identity, web engineering, and marketing.',
      founder: {
        '@type': 'Person',
        name: FOUNDER_INFO.name,
        jobTitle: FOUNDER_INFO.title,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ESquare Building, Plot C-2, Sector 96',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201301',
        addressCountry: 'IN',
      },
      identifier: [
        {
          '@type': 'PropertyValue',
          name: 'Udyam Registration Number',
          value: COMPANY_DETAILS.udyamNumber,
        },
      ],
      priceRange: '$$$',
    };

    // FAQ Schema
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_LIST.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    // Remove old schema tags
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach((s) => s.remove());

    // Inject fresh schemas
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(orgSchema);
    document.head.appendChild(script1);

    if (currentRoute === 'faq' || currentRoute === 'home') {
      const script2 = document.createElement('script');
      script2.type = 'application/ld+json';
      script2.text = JSON.stringify(faqSchema);
      document.head.appendChild(script2);
    }
  }, [currentRoute, titleSuffix]);

  return null;
};
