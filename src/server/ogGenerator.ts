import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import fs from "fs";
import path from "path";

function escapeXml(unsafe: string = ''): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Load and cache base64 encoded brand assets for embedded SVG rendering
let cachedFounderBase64 = '';
let cachedLogoBase64 = '';
let cachedIconBase64 = '';

function getAssetBase64(filename: string): string {
  try {
    const assetPath = path.join(process.cwd(), 'public', 'assets', filename);
    if (fs.existsSync(assetPath)) {
      return fs.readFileSync(assetPath).toString('base64');
    }
  } catch (e) {
    console.warn(`Could not load local asset ${filename}:`, e);
  }
  return '';
}

function getFounderBase64(): string {
  if (!cachedFounderBase64) {
    cachedFounderBase64 = getAssetBase64('founder-transparent.png');
  }
  return cachedFounderBase64;
}

function getLogoBase64(): string {
  if (!cachedLogoBase64) {
    cachedLogoBase64 = getAssetBase64('orixnal-official-logo.png');
  }
  return cachedLogoBase64;
}

function getIconBase64(): string {
  if (!cachedIconBase64) {
    cachedIconBase64 = getAssetBase64('orixnal-official-icon.png');
  }
  return cachedIconBase64;
}

function wrapSvgText(text: string, maxChars: number = 38): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + (currentLine ? ' ' : '') + word).length <= maxChars) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export interface OgImageParams {
  title?: string;
  subtitle?: string;
  badge?: string;
  page?: string;
}

export function generateOgSvg(params: OgImageParams): string {
  const pageDetails: Record<string, {
    title: string;
    subtitle: string;
    tag: string;
    personSubtitle?: string;
    ctaText?: string;
    bullets?: string[];
  }> = {
    home: {
      title: "Originality Over Imitation.",
      subtitle: "A creative & strategic brand consultancy built to help businesses think differently, communicate clearly and create meaningful brand experiences.",
      tag: "STRATEGIC BRAND CONSULTANCY",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "TRANSFORM YOUR BRAND → SCHEDULE AUDIT",
      bullets: [
        "Founder-Led High-Conviction Strategy",
        "End-to-End Legal IP & Trademark Defense",
        "Distinctive Visual Identity & Web Systems"
      ]
    },
    about: {
      title: "About ORIXNAL®",
      subtitle: "Uniting brand naming, trademark defense, visual identity, and high-performance web engineering under one founder-led company.",
      tag: "THE ORIXNAL METHOD",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "EXPLORE BRAND PHILOSOPHY →",
      bullets: [
        "Founder-Led Strategy & Execution",
        "Full Legal IP Protection from Day 1",
        "Custom Studio Design & Web Engineering"
      ]
    },
    founder: {
      title: "Asim Khan — Founder & Strategist",
      subtitle: "High-conviction brand architecture, trademark legal defense, and digital transformation for ambitious founders and enterprises.",
      tag: "EXECUTIVE FOUNDER ADVISORY",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "BOOK 1-ON-1 FOUNDER AUDIT →",
      bullets: [
        "Direct Strategy with Asim Khan",
        "Trademark & Brand Architecture Defense",
        "Global Scalability & Enterprise Advisory"
      ]
    },
    services: {
      title: "8 Master Brand Capabilities",
      subtitle: "Brand Naming, Legal IP Protection, Studio Design Systems, Web Engineering, Marketing Strategy, Ads & Media, Events & Advisory.",
      tag: "END-TO-END CAPABILITIES",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "EXPLORE ALL 8 CAPABILITIES →",
      bullets: [
        "Trademark Search & Registration",
        "Bespoke Visual Identity & UI/UX Systems",
        "Full-Stack Web & Performance Architecture"
      ]
    },
    'case-studies': {
      title: "Proven Brand Case Studies",
      subtitle: "Real-world brand repositioning outcomes, category-defining visual systems, and quantifiable commercial revenue growth.",
      tag: "CLIENT CASE STUDIES",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "VIEW PROVEN OUTCOMES →",
      bullets: [
        "Multi-Industry Brand Repositioning",
        "Measurable Conversion & Authority Gains",
        "Global Trademark Registrations Secured"
      ]
    },
    portfolio: {
      title: "Studio Design Portfolio",
      subtitle: "Visual identities, luxury packaging systems, digital interfaces, and responsive design tokens engineered by ORIXNAL Studio.",
      tag: "STUDIO DESIGN PORTFOLIO",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "VIEW CONCEPT PORTFOLIO →",
      bullets: [
        "Bespoke Typography & Logo Systems",
        "Premium Packaging & Print Collateral",
        "Interactive Digital Experiences"
      ]
    },
    insights: {
      title: "Strategic Brand Insights",
      subtitle: "Executive essays and strategic frameworks on brand positioning, trademark defense, and consumer prefrontal cortex psychology.",
      tag: "STRATEGIC THOUGHT LEADERSHIP",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "READ EXECUTIVE ESSAYS →",
      bullets: [
        "Positioning & Category Creation",
        "Trademark Risk & IP Safeguards",
        "Consumer Psychology Frameworks"
      ]
    },
    blog: {
      title: "Official Blog & IP Guides",
      subtitle: "In-depth guides on trademark registration, brand architecture, Shopify e-commerce scaling, and MSME growth strategies.",
      tag: "EDITORIAL GUIDES & IP",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "READ LATEST GUIDES →",
      bullets: [
        "Trademark Classes & Registration Steps",
        "Shopify & E-Commerce Brand Growth",
        "Brand Identity Checklists & Toolkits"
      ]
    },
    industries: {
      title: "Industry Brand Solutions",
      subtitle: "Specialized brand development for Tech Startups, D2C Consumer Goods, Food & Hospitality, Real Estate, Healthcare & B2B.",
      tag: "SECTOR EXPERTISE",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "EXPLORE INDUSTRY SOLUTIONS →",
      bullets: [
        "Tech Startups & SaaS Platforms",
        "D2C Consumer Packaged Goods (CPG)",
        "Healthcare, Real Estate & Corporate"
      ]
    },
    foooz: {
      title: "Foooz® Food Ecosystem",
      subtitle: "Everyday consumer food brand ecosystem created by ORIXNAL, connecting agricultural sourcing with packaged consumer food products.",
      tag: "ORIXNAL FOOD ECOSYSTEM",
      personSubtitle: "Created by ORIXNAL Group",
      ctaText: "DISCOVER FOOOZ® ECOSYSTEM →",
      bullets: [
        "Farm-Fresh Agricultural Sourcing",
        "Packaged Food Innovation & Quality",
        "Everyday Consumer Food Products"
      ]
    },
    events: {
      title: "Orixnal Event & Expos",
      subtitle: "Corporate expos, brand launch experiences, VIP leadership summits, and IP workshops across global business hubs.",
      tag: "GLOBAL BRAND EXPERIENCES",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "EXPLORE ORIXNAL EVENTS →",
      bullets: [
        "Corporate Expos & Launch Experiences",
        "Executive VIP Leadership Summits",
        "Legal IP & Brand Growth Workshops"
      ]
    },
    careers: {
      title: "Careers at ORIXNAL Group",
      subtitle: "Join a high-conviction team of brand strategists, IP lawyers, UI/UX designers, and full-stack web engineers.",
      tag: "JOIN OUR TEAM",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "VIEW OPEN POSITIONS →",
      bullets: [
        "Brand Strategists & Copywriters",
        "Full-Stack Web & UI/UX Engineers",
        "Legal IP & Trademark Researchers"
      ]
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Clear answers regarding ORIXNAL engagement models, pricing tiers, legal trademark search, and 1-on-1 Founder Audits.",
      tag: "CLIENT GUIDANCE & FAQ",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "READ ALL FAQ ANSWERS →",
      bullets: [
        "Engagement Models & Project Timelines",
        "Trademark Search & Filing Process",
        "Direct 1-on-1 Founder Consultations"
      ]
    },
    contact: {
      title: "Schedule a Brand Audit",
      subtitle: "Connect directly with Founder Asim Khan and our strategic team in Noida / Ghaziabad. Phone: +91 8447561650.",
      tag: "DIRECT CONSULTATION",
      personSubtitle: "Founder & Chief Brand Strategist",
      ctaText: "SCHEDULE BRAND AUDIT NOW →",
      bullets: [
        "Direct Phone: +91 8447561650",
        "Office: Noida / Ghaziabad, UP, India",
        "Email: asimkhaninc@gmail.com"
      ]
    },
    privacy: {
      title: "Privacy Policy & Trust",
      subtitle: "Client confidentiality standards, data handling protocols, and institutional security practices at ORIXNAL Group.",
      tag: "LEGAL & COMPLIANCE",
      personSubtitle: "ORIXNAL Group Governance",
      ctaText: "READ PRIVACY POLICY →",
      bullets: [
        "Strict Non-Disclosure & Confidentiality",
        "Zero Third-Party Data Sharing",
        "Secure Enterprise Data Handling"
      ]
    },
    terms: {
      title: "Terms & Conditions",
      subtitle: "Commercial engagement guidelines, IP assignment terms, and operational standards for client partnerships.",
      tag: "LEGAL & COMPLIANCE",
      personSubtitle: "ORIXNAL Group Governance",
      ctaText: "READ TERMS & CONDITIONS →",
      bullets: [
        "100% Client IP Ownership on Completion",
        "Transparent Commercial Scopes",
        "Professional Governance Standards"
      ]
    }
  };

  const rawKey = (params.page || 'home').toLowerCase().replace(/^\/#\//, '').replace(/^\//, '');
  const key = pageDetails[rawKey] ? rawKey : 'home';
  const info = pageDetails[key];

  const titleText = params.title || info.title;
  const subtitleText = params.subtitle || info.subtitle;
  const tagText = params.badge || info.tag;
  const personSub = info.personSubtitle || "Founder & Chief Brand Strategist";
  const ctaText = info.ctaText || "TRANSFORM YOUR BRAND → SCHEDULE AUDIT";
  const bullets = info.bullets || [
    "Founder-Led High-Conviction Strategy",
    "End-to-End Legal IP & Trademark Defense",
    "Distinctive Visual Identity & Web Systems"
  ];

  const founderB64 = getFounderBase64();
  const iconB64 = getIconBase64();

  // Typography wrapping for maximum visual balance
  const titleLines = wrapSvgText(titleText, 26);
  const subtitleLines = wrapSvgText(subtitleText, 44);

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Luxury Gradients -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FAF9F6"/>
        <stop offset="50%" stop-color="#F6F4EF"/>
        <stop offset="100%" stop-color="#EFECE6"/>
      </linearGradient>

      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#FAF9F6"/>
      </linearGradient>

      <linearGradient id="brandBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4C1D95"/>
        <stop offset="45%" stop-color="#7E22CE"/>
        <stop offset="80%" stop-color="#9333EA"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>

      <linearGradient id="portraitArch" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F5F3FF"/>
        <stop offset="50%" stop-color="#FAF5FF"/>
        <stop offset="100%" stop-color="#EDE9FE"/>
      </linearGradient>

      <radialGradient id="glowViolet" cx="25%" cy="25%" r="50%">
        <stop offset="0%" stop-color="#E9D5FF" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#FAF9F6" stop-opacity="0"/>
      </radialGradient>

      <radialGradient id="glowAmber" cx="75%" cy="75%" r="50%">
        <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#FAF9F6" stop-opacity="0"/>
      </radialGradient>

      <filter id="shadowHeavy" x="-15%" y="-15%" width="130%" height="135%">
        <feDropShadow dx="0" dy="10" stdDeviation="20" flood-color="#2E1065" flood-opacity="0.08"/>
        <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#2E1065" flood-opacity="0.04"/>
      </filter>

      <filter id="shadowPill" x="-10%" y="-10%" width="120%" height="125%">
        <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#4C1D95" flood-opacity="0.07"/>
      </filter>
    </defs>

    <!-- Canvas Full-Bleed Background (1200 x 630) -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    <rect width="1200" height="630" fill="url(#glowViolet)"/>
    <rect width="1200" height="630" fill="url(#glowAmber)"/>

    <!-- Subtle Architectural Background Grid Lines -->
    <g opacity="0.35">
      <line x1="0" y1="65" x2="1200" y2="65" stroke="#E5E7EB" stroke-width="1"/>
      <line x1="0" y1="565" x2="1200" y2="565" stroke="#E5E7EB" stroke-width="1"/>
    </g>

    <!-- Left & Right Decorative Badges for 16:9 / 1.91:1 Landscape Viewports -->
    <g opacity="0.75">
      <!-- Left side badge -->
      <g transform="translate(65, 260)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="900" fill="#7E22CE" letter-spacing="3">ORIXNAL®</text>
        <text x="0" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#6B7280" letter-spacing="1.5">STRATEGIC BRAND CONSULTANCY</text>
        <line x1="0" y1="30" x2="160" y2="30" stroke="#DDD6FE" stroke-width="1.5"/>
      </g>

      <!-- Right side badge -->
      <g transform="translate(1005, 260)">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="900" fill="#7E22CE" letter-spacing="3">LEGAL IP &amp; DESIGN</text>
        <text x="0" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#6B7280" letter-spacing="1.5">WWW.ORIXNAL.COM</text>
        <line x1="0" y1="30" x2="135" y2="30" stroke="#DDD6FE" stroke-width="1.5"/>
      </g>
    </g>

    <!-- ========================================================================= -->
    <!-- CENTRAL MASTER ADVERTISEMENT CARD (Positioned strictly within Safe Zone)  -->
    <!-- Safe Area: Width = 616px (x: 292 to 908), Height = 534px (y: 48 to 582)    -->
    <!-- ========================================================================= -->
    <g id="master-ad-card" transform="translate(292, 48)">
      <!-- Main Card Container -->
      <rect x="0" y="0" width="616" height="534" rx="20" fill="url(#cardGrad)" stroke="#E5E0D8" stroke-width="1.5" filter="url(#shadowHeavy)"/>

      <!-- Top Rainbow Brand Bar -->
      <path d="M0 20 Q0 0 20 0 L596 0 Q616 0 616 20 L616 6 L0 6 Z" fill="url(#brandBar)"/>

      <!-- Inner Content Container -->
      <g transform="translate(20, 22)">

        <!-- Top Header: Logo + Sub-tagline + Category Pill -->
        <g transform="translate(0, 0)">
          <!-- Brand Logo Icon -->
          ${iconB64 ? `
          <image href="data:image/png;base64,${iconB64}" x="0" y="0" width="38" height="38" preserveAspectRatio="xMidYMid meet"/>
          ` : `
          <rect x="0" y="0" width="38" height="38" rx="10" fill="#581C87"/>
          <text x="19" y="26" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="900" fill="#FFFFFF">O</text>
          `}

          <!-- Wordmark & Tagline -->
          <text x="46" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="900" fill="#18181B" letter-spacing="-0.3">
            ORIXNAL<tspan font-size="12" font-weight="800" fill="#7E22CE" dx="2" dy="-8">®</tspan>
          </text>
          <text x="46" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="800" fill="#7E22CE" letter-spacing="1.2">
            GLOBAL BRAND DEVELOPMENT COMPANY
          </text>

          <!-- Category Pill (Aligned to Right of header) -->
          <g transform="translate(396, 2)">
            <rect x="0" y="0" width="180" height="26" rx="13" fill="#F5F3FF" stroke="#DDD6FE" stroke-width="1"/>
            <circle cx="12" cy="13" r="3.5" fill="#7E22CE"/>
            <text x="21" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="800" fill="#6B21A8" letter-spacing="0.8">
              ${escapeXml(tagText)}
            </text>
          </g>
        </g>

        <!-- Divider Line -->
        <line x1="0" y1="48" x2="576" y2="48" stroke="#F3F4F6" stroke-width="1.5"/>

        <!-- ==================== LEFT SUB-COLUMN: TEXT ADVERTISEMENT (Width: ~345px) ==================== -->
        <g transform="translate(0, 62)">
          <!-- Main Headline -->
          <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif" font-size="25" font-weight="900" fill="#09090B" letter-spacing="-0.6">
            ${titleLines.map((line, i) => `<tspan x="0" ${i > 0 ? 'dy="30"' : ''}>${escapeXml(line)}</tspan>`).join('')}
          </text>

          <!-- Brand Description -->
          <g transform="translate(0, ${titleLines.length > 1 ? 64 : 38})">
            <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="500" fill="#4B5563" line-height="1.45">
              ${subtitleLines.map((line, i) => `<tspan x="0" ${i > 0 ? 'dy="19"' : ''}>${escapeXml(line)}</tspan>`).join('')}
            </text>
          </g>

          <!-- 8 Capabilities Grid / Badge Strip -->
          <g transform="translate(0, 126)">
            <rect x="0" y="0" width="345" height="32" rx="8" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="1"/>
            <text x="172.5" y="20" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Space Grotesk', sans-serif" font-size="8.5" font-weight="800" fill="#6B21A8" letter-spacing="0.6">
              NAMING  •  LEGAL IP  •  STUDIO  •  DIGITAL  •  ADVISORY
            </text>
          </g>

          <!-- Key Highlights Checklist -->
          <g transform="translate(0, 174)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" fill="#374151">
            <!-- Bullet 1 -->
            <g transform="translate(0, 0)">
              <circle cx="6" cy="6" r="5" fill="#DCFCE7"/>
              <path d="M4 6 L5.5 7.5 L8.5 4.5" stroke="#16A34A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <text x="18" y="9.5">${escapeXml(bullets[0] || 'Founder-Led High-Conviction Strategy')}</text>
            </g>
            <!-- Bullet 2 -->
            <g transform="translate(0, 22)">
              <circle cx="6" cy="6" r="5" fill="#DCFCE7"/>
              <path d="M4 6 L5.5 7.5 L8.5 4.5" stroke="#16A34A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <text x="18" y="9.5">${escapeXml(bullets[1] || 'End-to-End Legal IP & Trademark Defense')}</text>
            </g>
            <!-- Bullet 3 -->
            <g transform="translate(0, 44)">
              <circle cx="6" cy="6" r="5" fill="#DCFCE7"/>
              <path d="M4 6 L5.5 7.5 L8.5 4.5" stroke="#16A34A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <text x="18" y="9.5">${escapeXml(bullets[2] || 'Distinctive Visual Identity & Web Systems')}</text>
            </g>
          </g>

          <!-- Call to Action Banner -->
          <g transform="translate(0, 252)">
            <rect x="0" y="0" width="345" height="34" rx="8" fill="#581C87" filter="url(#shadowPill)"/>
            <text x="172.5" y="21.5" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">
              ${escapeXml(ctaText)}
            </text>
          </g>
        </g>

        <!-- ==================== RIGHT SUB-COLUMN: FOUNDER SPOTLIGHT (Width: ~215px) ==================== -->
        <g transform="translate(361, 62)">
          <!-- Portrait Container -->
          <rect x="0" y="0" width="215" height="286" rx="14" fill="url(#portraitArch)" stroke="#DDD6FE" stroke-width="1.2"/>
          
          <!-- Inner Arch Glow -->
          <path d="M8 274 L8 60 Q107.5 0 207 60 L207 274 Z" fill="#FAF5FF" opacity="0.9"/>

          <!-- Founder Photograph -->
          ${founderB64 ? `
          <image href="data:image/png;base64,${founderB64}" x="8" y="10" width="199" height="225" preserveAspectRatio="xMidYMid meet"/>
          ` : `
          <circle cx="107.5" cy="120" r="45" fill="#DDD6FE"/>
          <text x="107.5" y="132" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="bold" fill="#6B21A8">AK</text>
          `}

          <!-- Floating Name / Title Plaque -->
          <g transform="translate(8, 226)">
            <rect x="0" y="0" width="199" height="50" rx="10" fill="#FFFFFF" stroke="#DDD6FE" stroke-width="1" filter="url(#shadowPill)"/>
            <text x="99.5" y="20" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="12.5" font-weight="900" fill="#18181B">
              Asim Khan
            </text>
            <text x="99.5" y="35" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="8.5" font-weight="700" fill="#7E22CE" letter-spacing="0.3">
              ${escapeXml(personSub)}
            </text>
          </g>
        </g>

        <!-- ==================== BOTTOM FOOTER STRIP (Spans Full Width of Card: 576px) ==================== -->
        <g transform="translate(0, 428)">
          <line x1="0" y1="0" x2="576" y2="0" stroke="#E5E7EB" stroke-width="1"/>

          <!-- Official Credentials -->
          <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" fill="#6B7280">
            Noida, NCR, India   |   <tspan fill="#7E22CE" font-weight="700">MSME: UDYAM-UP-29-0079322</tspan>
          </text>

          <!-- Website Domain -->
          <text x="576" y="24" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="12.5" font-weight="900" fill="#581C87" letter-spacing="0.5">
            www.orixnal.com
          </text>
        </g>

      </g>
    </g>
  </svg>`;
}

export function renderOgBuffer(params: OgImageParams): Buffer {
  const svgString = generateOgSvg(params);
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: 1200 },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'sans-serif',
    }
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function renderOgJpegBuffer(params: OgImageParams): Promise<Buffer> {
  const pngBuffer = renderOgBuffer(params);
  return sharp(pngBuffer)
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
}
