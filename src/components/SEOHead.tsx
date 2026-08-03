import React, { useEffect } from 'react';
import { PageRoute } from '../types';
import { COMPANY_DETAILS, FOUNDER_INFO, FAQ_LIST, OFFICIAL_ASSETS } from '../data/brandData';

interface SEOHeadProps {
  currentRoute: PageRoute;
  titleSuffix?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentRoute, titleSuffix }) => {
  useEffect(() => {
    // Dynamic page titles and descriptions
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

    const descriptions: Record<PageRoute, string> = {
      home: 'ORIXNAL helps ambitious startups and corporate enterprises transform ideas into clear, meaningful, and scalable global brands through strategy, legal protection, identity design, web engineering, and GTM execution.',
      about: 'Discover ORIXNAL brand DNA, core values, and founder-led philosophy. We unite naming, legal IP, visual identity, and high-performance engineering under one high-conviction company.',
      founder: 'Meet Asim Khan, Founder & Chief Brand Strategist at ORIXNAL. Learn about his high-conviction approach to brand architecture, legal trademark defense, and digital transformation.',
      services: 'Explore ORIXNAL 8 master capabilities: Brand Naming, Legal IP & Incorporation, Studio Design Systems, Web Engineering, Marketing Strategy, Ads & Media, Event Activations, and Founder Advisory.',
      'service-detail': 'Deep dive into ORIXNAL strategic brand development capability.',
      'case-studies': 'Review real-world brand outcomes, repositioning case studies, and quantifiable growth achieved for global clients by ORIXNAL.',
      'case-study-detail': 'Detailed brand engineering case study by ORIXNAL.',
      portfolio: 'Examine concept visual identities, packaging systems, and digital product designs crafted by ORIXNAL Studio.',
      insights: 'Executive essays, thought leadership, and strategic frameworks on brand positioning, trademark defense, and consumer psychology.',
      'insight-detail': 'Strategic brand insight essay by ORIXNAL leadership.',
      blog: 'Official ORIXNAL blog covering trademark filing guides, brand architecture, Shopify e-commerce scaling, and MSME growth strategies.',
      'blog-detail': 'Strategic blog guide by ORIXNAL experts.',
      industries: 'Tailored brand development solutions across Tech Startups, D2C Consumer Goods, Food & Hospitality, Real Estate, Healthcare, and Professional Services.',
      foooz: 'Foooz® is an everyday food brand ecosystem created by ORIXNAL, connecting farm-fresh agricultural sourcing with packaged consumer food products.',
      events: 'Orixnal Event organizes corporate expos, brand launches, VIP leadership summits, and IP workshops across global business hubs.',
      careers: 'Build your career at ORIXNAL. Join a high-conviction team of brand strategists, IP lawyers, UI/UX designers, and full-stack web engineers.',
      faq: 'Get instant answers regarding ORIXNAL engagement models, pricing, legal IP search, trademark timeline, and 1-on-1 Founder Audits.',
      contact: 'Connect directly with ORIXNAL Founder Asim Khan and our strategic team in Noida/Ghaziabad, UP. Call +91 8447561650 or schedule a Brand Audit.',
      privacy: 'ORIXNAL Group Privacy Policy explaining our data handling, security protocols, and client confidentiality standards.',
      terms: 'Terms & Conditions governing engagement with ORIXNAL Brand Development Company.',
    };

    const ogImages: Partial<Record<PageRoute, string>> = {
      founder: OFFICIAL_ASSETS.founderPhoto,
      foooz: OFFICIAL_ASSETS.fooozLogo,
    };

    const currentTitle = titleSuffix ? `${titleSuffix} | ORIXNAL` : titles[currentRoute] || titles.home;
    const currentDesc = descriptions[currentRoute] || descriptions.home;
    const currentUrl = currentRoute === 'home' ? 'https://www.orixnal.com/' : `https://www.orixnal.com/#/${currentRoute}`;
    const currentOgImage = ogImages[currentRoute] || `https://www.orixnal.com/api/og-image?page=${currentRoute}`;
    const currentOgType = currentRoute === 'founder' ? 'profile' : currentRoute.includes('detail') || currentRoute === 'blog' || currentRoute === 'insights' ? 'article' : 'website';

    // Set Document Title
    document.title = currentTitle;

    // Helper to safely set or update meta tag
    const updateMetaTag = (attrName: 'name' | 'property', attrValue: string, contentValue: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', contentValue);
    };

    // Standard Meta Tags
    updateMetaTag('name', 'description', currentDesc);

    // Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentUrl);

    // Open Graph Tags
    updateMetaTag('property', 'og:site_name', 'ORIXNAL®');
    updateMetaTag('property', 'og:locale', 'en_US');
    updateMetaTag('property', 'og:type', currentOgType);
    updateMetaTag('property', 'og:title', currentTitle);
    updateMetaTag('property', 'og:description', currentDesc);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:image', currentOgImage);
    updateMetaTag('property', 'og:image:width', '1200');
    updateMetaTag('property', 'og:image:height', '630');
    updateMetaTag('property', 'og:image:type', 'image/png');

    // Twitter Card Meta Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:site', '@orixnalgroup');
    updateMetaTag('name', 'twitter:creator', '@orixnalgroup');
    updateMetaTag('name', 'twitter:title', currentTitle);
    updateMetaTag('name', 'twitter:description', currentDesc);
    updateMetaTag('name', 'twitter:image', currentOgImage);

    // Dynamic Favicon Update
    let iconTag = document.querySelector('link[rel="icon"]');
    if (iconTag) {
      iconTag.setAttribute('href', OFFICIAL_ASSETS.icon);
      iconTag.setAttribute('type', 'image/png');
    }

    // Inject WebSite & SearchAction Schema
    const websiteSchema = {
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
        target: 'https://www.orixnal.com/#/services?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };

    // Inject Organization & LocalBusiness JSON-LD Schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': ['Organization', 'ProfessionalService'],
      '@id': 'https://www.orixnal.com/#organization',
      name: COMPANY_DETAILS.legalName,
      alternateName: 'ORIXNAL',
      url: 'https://www.orixnal.com',
      logo: OFFICIAL_ASSETS.icon,
      image: OFFICIAL_ASSETS.logo,
      telephone: COMPANY_DETAILS.phone,
      email: COMPANY_DETAILS.email,
      description: currentDesc,
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
      identifier: [
        {
          '@type': 'PropertyValue',
          name: 'Udyam Registration Number',
          value: COMPANY_DETAILS.udyamNumber,
        },
      ],
      priceRange: '$$$',
    };

    // Inject BreadcrumbList Schema
    const breadcrumbSchema = {
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

    // Inject Speakable Schema for AI Voice Search
    const speakableSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: currentTitle,
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.speakable-text'],
      },
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

    // Clean up existing schema script tags
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach((s) => s.remove());

    // Inject fresh schemas
    const injectJsonLd = (data: object) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    };

    injectJsonLd(websiteSchema);
    injectJsonLd(orgSchema);
    injectJsonLd(breadcrumbSchema);
    injectJsonLd(speakableSchema);

    if (currentRoute === 'faq' || currentRoute === 'home') {
      injectJsonLd(faqSchema);
    }
  }, [currentRoute, titleSuffix]);

  return null;
};
