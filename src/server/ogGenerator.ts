import { Resvg } from "@resvg/resvg-js";
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

function wrapSvgText(text: string, maxChars: number = 45): string[] {
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
  const pageDetails: Record<string, { title: string; subtitle: string; tag: string; personSubtitle?: string }> = {
    home: {
      title: "Originality Over Imitation.",
      subtitle: "ORIXNAL® is a creative and strategic brand consultancy built to help businesses think differently, communicate clearly and create meaningful brand experiences.",
      tag: "BRAND CONSULTANCY",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    about: {
      title: "About ORIXNAL Masterbrand",
      subtitle: "Uniting brand naming, legal trademark protection, visual design systems, and high-performance web engineering under one roof.",
      tag: "THE ORIXNAL METHOD",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    founder: {
      title: "Asim Khan — Founder & Strategist",
      subtitle: "High-conviction brand architecture, trademark legal defense, and digital transformation for ambitious founders and enterprises.",
      tag: "EXECUTIVE ADVISORY",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    services: {
      title: "8 Master Brand Capabilities",
      subtitle: "Brand Naming • Legal IP • Studio Design • Web Engineering • Marketing Strategy • Ads & Media • Event Activations • Founder Advisory",
      tag: "END-TO-END CAPABILITIES",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    'case-studies': {
      title: "Proven Brand Case Studies",
      subtitle: "Real-world brand repositioning outcomes, category-defining visual systems, and quantifiable commercial revenue growth.",
      tag: "CLIENT CASE STUDIES",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    portfolio: {
      title: "Studio Design Portfolio",
      subtitle: "Visual identities, luxury packaging systems, digital interfaces, and responsive design tokens engineered by ORIXNAL Studio.",
      tag: "STUDIO PORTFOLIO",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    insights: {
      title: "Strategic Brand Insights",
      subtitle: "Executive essays and strategic frameworks on brand positioning, trademark defense, and consumer prefrontal cortex psychology.",
      tag: "THOUGHT LEADERSHIP",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    blog: {
      title: "Official Blog & IP Guides",
      subtitle: "In-depth guides on trademark registration, brand architecture, Shopify e-commerce scaling, and MSME growth strategies.",
      tag: "STRATEGIC GUIDES",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    industries: {
      title: "Industry Brand Solutions",
      subtitle: "Specialized brand development for Tech Startups, D2C Consumer Goods, Food & Hospitality, Real Estate, Healthcare & B2B.",
      tag: "SECTOR EXPERTISE",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    foooz: {
      title: "Foooz® Food Ecosystem",
      subtitle: "Everyday consumer food brand ecosystem created by ORIXNAL, connecting agricultural sourcing with packaged consumer food products.",
      tag: "ORIXNAL SUB-BRAND",
      personSubtitle: "Created by ORIXNAL Group"
    },
    events: {
      title: "Orixnal Event & Expos",
      subtitle: "Corporate expos, brand launch experiences, VIP leadership summits, and IP workshops across global business hubs.",
      tag: "BRAND EXPERIENCES",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    careers: {
      title: "Careers at ORIXNAL Group",
      subtitle: "Join a high-conviction team of brand strategists, IP lawyers, UI/UX designers, and full-stack web engineers.",
      tag: "JOIN OUR TEAM",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Clear answers regarding ORIXNAL engagement models, pricing tiers, legal trademark search, and 1-on-1 Founder Audits.",
      tag: "CLIENT GUIDANCE",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    contact: {
      title: "Schedule a Brand Audit",
      subtitle: "Connect directly with Founder Asim Khan and our strategic team in Noida / Ghaziabad. Phone: +91 8447561650.",
      tag: "DIRECT CONSULTATION",
      personSubtitle: "Founder & Chief Brand Strategist"
    },
    privacy: {
      title: "Privacy Policy & Trust",
      subtitle: "Client confidentiality standards, data handling protocols, and institutional security practices at ORIXNAL Group.",
      tag: "LEGAL & COMPLIANCE",
      personSubtitle: "ORIXNAL Group Governance"
    },
    terms: {
      title: "Terms & Engagement",
      subtitle: "Commercial engagement guidelines, IP assignment terms, and operational standards for client partnerships.",
      tag: "LEGAL & COMPLIANCE",
      personSubtitle: "ORIXNAL Group Governance"
    }
  };

  const rawKey = (params.page || 'home').toLowerCase().replace(/^\/#\//, '').replace(/^\//, '');
  const key = pageDetails[rawKey] ? rawKey : 'home';
  const info = pageDetails[key];

  const titleText = params.title || info.title;
  const subtitleText = params.subtitle || info.subtitle;
  const tagText = params.badge || info.tag;
  const personSub = info.personSubtitle || "Founder & Chief Brand Strategist";

  const titleLines = wrapSvgText(titleText, 32);
  const subtitleLines = wrapSvgText(subtitleText, 52);

  const founderB64 = getFounderBase64();
  const iconB64 = getIconBase64();

  const titleYStart = 145;
  const titleHeight = titleLines.length * 44;
  const subtitleYStart = titleYStart + titleHeight + 10;

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Premium Warm Light Gradients -->
      <linearGradient id="canvasBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FAF9F6"/>
        <stop offset="60%" stop-color="#F7F5F0"/>
        <stop offset="100%" stop-color="#F3EFEB"/>
      </linearGradient>

      <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#FCFBF9"/>
      </linearGradient>

      <linearGradient id="brandBar" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#581C87"/>
        <stop offset="40%" stop-color="#7E22CE"/>
        <stop offset="80%" stop-color="#9333EA"/>
        <stop offset="100%" stop-color="#D97706"/>
      </linearGradient>

      <linearGradient id="portraitBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F5F3FF"/>
        <stop offset="60%" stop-color="#FAF5FF"/>
        <stop offset="100%" stop-color="#EDE9FE"/>
      </linearGradient>

      <radialGradient id="subtleGlow" cx="15%" cy="20%" r="60%">
        <stop offset="0%" stop-color="#E9D5FF" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#FAF9F6" stop-opacity="0"/>
      </radialGradient>

      <radialGradient id="amberGlow" cx="85%" cy="85%" r="50%">
        <stop offset="0%" stop-color="#FEF3C7" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#FAF9F6" stop-opacity="0"/>
      </radialGradient>

      <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="125%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#3B0764" flood-opacity="0.06"/>
      </filter>

      <filter id="portraitShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#4C1D95" flood-opacity="0.08"/>
      </filter>
    </defs>

    <!-- Base Canvas -->
    <rect width="1200" height="630" fill="url(#canvasBg)"/>
    <rect width="1200" height="630" fill="url(#subtleGlow)"/>
    <rect width="1200" height="630" fill="url(#amberGlow)"/>

    <!-- Subtle Architectural Background Grid -->
    <g opacity="0.35">
      <line x1="0" y1="90" x2="1200" y2="90" stroke="#E5E7EB" stroke-width="1"/>
      <line x1="0" y1="540" x2="1200" y2="540" stroke="#E5E7EB" stroke-width="1"/>
      <line x1="820" y1="0" x2="820" y2="630" stroke="#E5E7EB" stroke-width="1"/>
    </g>

    <!-- Main Outer Card Frame -->
    <rect x="40" y="35" width="1120" height="560" rx="24" fill="url(#cardBg)" stroke="#E5E0D8" stroke-width="1.5" filter="url(#cardShadow)"/>

    <!-- Top Accent Bar -->
    <path d="M40 59 Q40 35 64 35 L1136 35 Q1160 35 1160 59 L1160 41 L40 41 Z" fill="url(#brandBar)"/>

    <!-- ==================== LEFT COLUMN: CONTENT (Width: ~730px) ==================== -->
    <g transform="translate(80, 75)">
      
      <!-- Top Brand Header Row -->
      <g transform="translate(0, 0)">
        <!-- Brand Icon / Monogram -->
        ${iconB64 ? `
        <image href="data:image/png;base64,${iconB64}" x="0" y="0" width="46" height="46" preserveAspectRatio="xMidYMid meet"/>
        ` : `
        <rect x="0" y="0" width="46" height="46" rx="12" fill="#581C87"/>
        <text x="23" y="31" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF">O</text>
        `}

        <!-- Brand Wordmark & Tagline -->
        <text x="60" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="#18181B" letter-spacing="-0.5">
          ORIXNAL<tspan font-size="16" font-weight="700" fill="#7E22CE" dx="3" dy="-10">®</tspan>
        </text>
        <text x="60" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="10.5" font-weight="800" fill="#7E22CE" letter-spacing="2">
          GLOBAL BRAND DEVELOPMENT COMPANY
        </text>
      </g>

      <!-- Category Tag Pill -->
      <g transform="translate(0, 68)">
        <rect x="0" y="0" width="290" height="28" rx="14" fill="#F5F3FF" stroke="#DDD6FE" stroke-width="1"/>
        <circle cx="15" cy="14" r="4" fill="#7E22CE"/>
        <text x="28" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="10.5" font-weight="800" fill="#6B21A8" letter-spacing="1.2">
          ${escapeXml(tagText)}
        </text>
      </g>

      <!-- Main Heading (Clean, High Contrast, Bold) -->
      <g transform="translate(0, ${titleYStart})">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="38" font-weight="900" fill="#09090B" letter-spacing="-0.8">
          ${titleLines.map((line, i) => `<tspan x="0" ${i > 0 ? 'dy="46"' : ''}>${escapeXml(line)}</tspan>`).join('')}
        </text>
      </g>

      <!-- Description / Subtitle (2-3 Lines, High Readability) -->
      <g transform="translate(0, ${subtitleYStart})">
        <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="17" font-weight="500" fill="#4B5563">
          ${subtitleLines.map((line, i) => `<tspan x="0" ${i > 0 ? 'dy="26"' : ''}>${escapeXml(line)}</tspan>`).join('')}
        </text>
      </g>

      <!-- 8 Pillars Horizontal Strip -->
      <g transform="translate(0, 345)">
        <rect x="0" y="0" width="670" height="40" rx="12" fill="#F9FAFB" stroke="#E5E7EB" stroke-width="1"/>
        <text x="335" y="25" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Space Grotesk', 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#6B21A8" letter-spacing="1.2">
          NAMING  •  LEGAL IP  •  STUDIO  •  DIGITAL  •  MARKETING  •  ADS  •  EVENT  •  ADVISORY
        </text>
      </g>

      <!-- Bottom Metadata & Domain Footer -->
      <g transform="translate(0, 420)">
        <line x1="0" y1="0" x2="670" y2="0" stroke="#E5E7EB" stroke-width="1"/>

        <text x="0" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#6B7280">
          Founder: <tspan fill="#18181B" font-weight="800">Asim Khan</tspan>   |   Noida, India   |   <tspan fill="#7E22CE" font-weight="700">UDYAM-UP-29-0079322</tspan>
        </text>

        <text x="670" y="32" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="900" fill="#581C87" letter-spacing="0.5">
          www.orixnal.com
        </text>
      </g>
    </g>

    <!-- ==================== RIGHT COLUMN: FOUNDER PORTRAIT SPOTLIGHT (Width: ~340px) ==================== -->
    <g transform="translate(795, 75)">
      <!-- Portrait Card Container -->
      <rect x="0" y="0" width="325" height="480" rx="20" fill="url(#portraitBg)" stroke="#E9D5FF" stroke-width="1.5" filter="url(#portraitShadow)"/>

      <!-- Inner Subtle Arch Glow -->
      <path d="M15 465 L15 120 Q162.5 20 310 120 L310 465 Z" fill="#FAF5FF" opacity="0.8"/>

      <!-- Embedded Authentic Founder Photograph -->
      ${founderB64 ? `
      <image href="data:image/png;base64,${founderB64}" x="12" y="30" width="301" height="385" preserveAspectRatio="xMidYMid meet"/>
      ` : `
      <circle cx="162.5" cy="180" r="70" fill="#DDD6FE"/>
      <text x="162.5" y="195" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="bold" fill="#6B21A8">AK</text>
      `}

      <!-- Floating Bottom Caption Plaque -->
      <g transform="translate(18, 400)">
        <rect x="0" y="0" width="289" height="64" rx="14" fill="#FFFFFF" stroke="#DDD6FE" stroke-width="1.5" filter="url(#cardShadow)"/>
        
        <!-- Founder Name -->
        <text x="144.5" y="27" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" font-weight="900" fill="#18181B">
          Asim Khan
        </text>
        
        <!-- Founder Title -->
        <text x="144.5" y="47" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="700" fill="#7E22CE" letter-spacing="0.5">
          ${escapeXml(personSub)}
        </text>
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
