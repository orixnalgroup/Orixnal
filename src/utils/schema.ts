import { PageRoute } from '../types';
import { COMPANY_DETAILS, FOUNDER_INFO, FAQ_LIST, OFFICIAL_ASSETS } from '../data/brandData';

/**
 * Generates JSON-LD structured data for WebSite
 */
export const generateWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.orixnal.com/#website',
    url: 'https://www.orixnal.com',
    name: 'ORIXNAL®',
    publisher: {
      '@id': 'https://www.orixnal.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.orixnal.com/services?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Generates JSON-LD structured data for LocalBusiness & Organization
 */
export const generateLocalBusinessSchema = (description?: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization', 'ProfessionalService'],
    '@id': 'https://www.orixnal.com/#organization',
    name: COMPANY_DETAILS.legalName,
    alternateName: 'ORIXNAL',
    url: 'https://www.orixnal.com',
    logo: OFFICIAL_ASSETS.icon,
    image: OFFICIAL_ASSETS.logo,
    telephone: COMPANY_DETAILS.phone,
    email: COMPANY_DETAILS.email,
    description: description || 'ORIXNAL helps ambitious startups and corporate enterprises transform ideas into scalable global brands through strategy, legal protection, visual identity, and web engineering.',
    sameAs: [
      'https://www.linkedin.com/company/orixnalgroup',
      'https://www.instagram.com/orixnalgroup',
      'https://www.youtube.com/@orixnalgroup',
      'https://x.com/orixnalgroup',
      'https://www.facebook.com/orixnalgroup',
      'https://clutch.co/profile/orixnal',
    ],
    founder: {
      '@type': 'Person',
      '@id': 'https://www.orixnal.com/#founder',
      name: FOUNDER_INFO.name,
      jobTitle: FOUNDER_INFO.title,
      email: COMPANY_DETAILS.email,
      sameAs: 'https://www.linkedin.com/in/asimkhanorixnal',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ESquare Building, Plot C-2, Sector 96',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.5355',
      longitude: '77.3910',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'Udyam Registration Number',
        value: COMPANY_DETAILS.udyamNumber,
      },
    ],
    priceRange: '$$$',
  };
};

/**
 * Generates JSON-LD structured data for BreadcrumbList
 */
export const generateBreadcrumbSchema = (currentRoute: PageRoute, currentUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.orixnal.com/',
      },
      ...(currentRoute !== 'home'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1).replace('-', ' '),
              item: currentUrl,
            },
          ]
        : []),
    ],
  };
};

/**
 * Generates JSON-LD structured data for Speakable WebPage (Voice Search AI)
 */
export const generateSpeakableSchema = (currentTitle: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: currentTitle,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.speakable-text'],
    },
  };
};

/**
 * Generates JSON-LD structured data for Services Offer Catalog
 */
export const generateServicesSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@id': 'https://www.orixnal.com/#organization',
    },
    serviceType: 'Brand Development & Legal IP Engineering',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ORIXNAL 8 Core Brand Capabilities',
      itemListElement: [
        { '@type': 'Offer', name: 'ORIXNAL Name — Strategic Brand Naming & Positioning' },
        { '@type': 'Offer', name: 'ORIXNAL Legal — Trademark Class Filings & Pvt Ltd Incorporation' },
        { '@type': 'Offer', name: 'ORIXNAL Studio — Visual Identity & Design Systems' },
        { '@type': 'Offer', name: 'ORIXNAL Digital — High-Performance React Web Engineering & Shopify' },
        { '@type': 'Offer', name: 'ORIXNAL Marketing — Go-To-Market & Retention Mechanics' },
        { '@type': 'Offer', name: 'ORIXNAL Ads — Omnichannel Brand Campaign Management' },
        { '@type': 'Offer', name: 'ORIXNAL Event — Corporate Expos, Stage Production & Launch Activations' },
        { '@type': 'Offer', name: 'ORIXNAL Consultancy — 1-on-1 Founder Strategic Advisory with Asim Khan' },
      ],
    },
  };
};

/**
 * Generates JSON-LD structured data for FAQPage
 */
export const generateFAQSchema = () => {
  return {
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
};
