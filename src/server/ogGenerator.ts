import { Resvg } from "@resvg/resvg-js";

function escapeXml(unsafe: string = ''): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateOgSvg(params: { title?: string; subtitle?: string; badge?: string; page?: string }): string {
  const pageDetails: Record<string, { title: string; subtitle: string; tag: string }> = {
    events: {
      title: "Orixnal Events & Corporate Expos",
      subtitle: "Corporate expos, trade shows, stage AV production & VIP executive summits",
      tag: "ORIXNAL EVENT PILLAR"
    },
    about: {
      title: "About ORIXNAL Masterbrand",
      subtitle: "India's founder-led brand development company uniting Strategy, Legal IP & Design",
      tag: "BRAND DNA & PHILOSOPHY"
    },
    founder: {
      title: "Asim Khan — Founder & Chief Strategist",
      subtitle: "High-conviction brand architecture, positioning, legal IP defense & digital growth",
      tag: "FOUNDER ADVISORY"
    },
    services: {
      title: "8 Master Brand Capabilities",
      subtitle: "Naming • Legal IP • Studio Identity • Web Engineering • Marketing • Ads • Events • Advisory",
      tag: "FULL-STACK BRAND ARCHITECTURE"
    },
    foooz: {
      title: "Foooz® Food Ecosystem",
      subtitle: "Everyday consumer food brand ecosystem connecting farm-fresh sourcing with packaged FMCG",
      tag: "ORIXNAL SUB-BRAND"
    },
    contact: {
      title: "Schedule Brand Audit with Asim Khan",
      subtitle: "Direct 1-on-1 brand diagnostic session, legal trademark review & positioning advisory",
      tag: "GET IN TOUCH"
    },
    'case-studies': {
      title: "Client Impact & Case Studies",
      subtitle: "Real-world brand transformations, quantifiable revenue growth & repositioning outcomes",
      tag: "PROVEN OUTCOMES"
    },
    portfolio: {
      title: "Studio Identity & Design Portfolio",
      subtitle: "Visual identities, luxury packaging, design systems & digital products crafted by ORIXNAL",
      tag: "DESIGN PORTFOLIO"
    },
    insights: {
      title: "Strategic Brand Insights & Essays",
      subtitle: "Executive frameworks on positioning, trademark legal defense & consumer psychology",
      tag: "THOUGHT LEADERSHIP"
    },
    blog: {
      title: "ORIXNAL Official Blog & Guides",
      subtitle: "Trademark filing guides, brand architecture, Shopify scaling & MSME growth strategies",
      tag: "STRATEGIC GUIDES"
    },
    industries: {
      title: "Brand Solutions Across Industries",
      subtitle: "Tech Startups, D2C Consumer Goods, Food & Hospitality, Real Estate, Healthcare & B2B Services",
      tag: "SECTOR SOLUTIONS"
    },
    careers: {
      title: "Careers at ORIXNAL Group",
      subtitle: "Join a high-conviction team of brand strategists, IP lawyers & full-stack engineers",
      tag: "JOIN OUR TEAM"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Answers regarding ORIXNAL engagement models, pricing, legal IP & 1-on-1 Founder Audits",
      tag: "CLIENT GUIDANCE"
    },
    home: {
      title: "Original Thinking. Human Impact.",
      subtitle: "Transforming startups & corporate leaders into clear, protected, and scalable global brands",
      tag: "FOUNDER-LED BRAND DEVELOPMENT"
    }
  };

  const rawKey = (params.page || 'home').toLowerCase().replace(/^\/#\//, '').replace(/^\//, '');
  const key = pageDetails[rawKey] ? rawKey : 'home';
  const info = pageDetails[key] || {
    title: params.title || "Original Thinking. Human Impact.",
    subtitle: params.subtitle || "Strategy • Legal IP • Visual Identity • Web Engineering • Marketing",
    tag: params.badge || "FOUNDER-LED BRAND DEVELOPMENT"
  };

  const titleText = params.title ? params.title : info.title;
  const subtitleText = params.subtitle ? params.subtitle : info.subtitle;
  const tagText = params.badge ? params.badge : info.tag;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0E041A"/>
        <stop offset="50%" stop-color="#1A072E"/>
        <stop offset="100%" stop-color="#090212"/>
      </linearGradient>

      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE047"/>
        <stop offset="50%" stop-color="#F59E0B"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>

      <radialGradient id="glow" cx="85%" cy="15%" r="65%">
        <stop offset="0%" stop-color="#A855F7" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="#A855F7" stop-opacity="0"/>
      </radialGradient>

      <radialGradient id="gold-glow" cx="15%" cy="85%" r="55%">
        <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
      </radialGradient>

      <linearGradient id="card-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#260C40" stop-opacity="0.75"/>
        <stop offset="100%" stop-color="#130524" stop-opacity="0.92"/>
      </linearGradient>
    </defs>

    <!-- Canvas Background -->
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect width="1200" height="630" fill="url(#gold-glow)"/>

    <!-- Decorative Grid Overlay -->
    <path d="M0 100 L1200 100 M0 200 L1200 200 M0 300 L1200 300 M0 400 L1200 400 M0 500 L1200 500" stroke="#8B5CF6" stroke-opacity="0.08" stroke-width="1"/>
    <path d="M200 0 L200 630 M400 0 L400 630 M600 0 L600 630 M800 0 L800 630 M1000 0 L1000 630" stroke="#8B5CF6" stroke-opacity="0.08" stroke-width="1"/>

    <!-- Gold Diagonal Ray -->
    <line x1="0" y1="0" x2="1200" y2="630" stroke="url(#gold)" stroke-opacity="0.14" stroke-width="2"/>

    <!-- Main Container Card Frame -->
    <rect x="50" y="45" width="1100" height="540" rx="32" fill="url(#card-bg)" stroke="#A855F7" stroke-opacity="0.35" stroke-width="2"/>

    <!-- Inner Card Gold Top Border Highlight -->
    <path d="M90 45 L1110 45" stroke="url(#gold)" stroke-width="3" stroke-linecap="round"/>

    <!-- Top Header Bar: Logo & Brand Name -->
    <g transform="translate(90, 85)">
      <!-- ORIXNAL Emblem Graphic (Custom Stylized Monogram) -->
      <g transform="translate(0, 0)">
        <rect width="64" height="64" rx="18" fill="#1E0A33" stroke="url(#gold)" stroke-width="2"/>
        <path d="M18 18 L46 46 M46 18 L18 46" stroke="url(#gold)" stroke-width="6" stroke-linecap="round"/>
        <circle cx="32" cy="32" r="5" fill="#FFFFFF"/>
      </g>

      <!-- Brand Wordmark & Sub-Category -->
      <text x="84" y="32" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="34" font-weight="900" fill="#FFFFFF" letter-spacing="1">
        ORIXNAL<tspan font-size="20" font-weight="700" fill="#FDE047" dx="3" dy="-10">®</tspan>
      </text>
      <text x="84" y="55" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="800" fill="#F59E0B" letter-spacing="3">
        GLOBAL BRAND DEVELOPMENT COMPANY
      </text>
    </g>

    <!-- Top Right Tag Pill -->
    <g transform="translate(710, 95)">
      <rect width="400" height="44" rx="22" fill="#3B0764" stroke="#C084FC" stroke-opacity="0.5" stroke-width="1.5"/>
      <text x="200" y="27" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="800" fill="#FDE047" letter-spacing="2">
        ${escapeXml(tagText)}
      </text>
    </g>

    <!-- Center Content Block -->
    <g transform="translate(90, 220)">
      <!-- Main Page Title -->
      <text x="0" y="45" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="42" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">
        ${escapeXml(titleText)}
      </text>

      <!-- Subtitle & Value Proposition -->
      <text x="0" y="105" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="500" fill="#E9D5FF">
        ${escapeXml(subtitleText)}
      </text>
    </g>

    <!-- 8 Pillars Horizontal Bar -->
    <g transform="translate(90, 395)">
      <rect width="1020" height="52" rx="16" fill="#19062B" stroke="#6B21A8" stroke-opacity="0.6" stroke-width="1"/>
      <text x="510" y="32" text-anchor="middle" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#D8B4FE" letter-spacing="2">
        NAME  •  LEGAL IP  •  STUDIO  •  DIGITAL  •  MARKETING  •  ADS  •  EVENT  •  CONSULTANCY
      </text>
    </g>

    <!-- Bottom Footer Bar -->
    <g transform="translate(90, 485)">
      <line x1="0" y1="0" x2="1020" y2="0" stroke="#4C1D95" stroke-opacity="0.5" stroke-width="1"/>

      <!-- Founder & Registration Info -->
      <text x="0" y="38" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#9CA3AF">
        Founder: <tspan fill="#FFFFFF" font-weight="800">Asim Khan</tspan>  |  MSME Registered: <tspan fill="#FDE047" font-weight="700">UDYAM-UP-28-0112879</tspan>  |  Handle: <tspan fill="#FFFFFF" font-weight="800">@orixnalgroup</tspan>
      </text>

      <!-- Domain Link -->
      <text x="1020" y="38" text-anchor="end" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="900" fill="#F59E0B" letter-spacing="1">
        www.orixnal.com
      </text>
    </g>
  </svg>`;
}

export function renderOgBuffer(params: { title?: string; subtitle?: string; badge?: string; page?: string }): Buffer {
  const svgString = generateOgSvg(params);
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}
