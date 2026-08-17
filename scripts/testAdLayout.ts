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

const founderB64 = fs.readFileSync("public/assets/founder-transparent.png").toString("base64");
const logoB64 = fs.readFileSync("public/assets/orixnal-official-logo.png").toString("base64");
const iconB64 = fs.readFileSync("public/assets/orixnal-official-icon.png").toString("base64");

export function generateAdSvg(variant: number = 1): string {
  // Canvas: 1200 x 630
  // Safe zone for 1:1 square crop: x from 285 to 915 (width 630).
  // Master Ad Card: Width = 616px, centered from x = 292 to 908.
  
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

    <!-- Canvas Full-Bleed Background -->
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
          <image href="data:image/png;base64,${iconB64}" x="0" y="0" width="38" height="38" preserveAspectRatio="xMidYMid meet"/>

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
              STRATEGIC BRAND CONSULTANCY
            </text>
          </g>
        </g>

        <!-- Divider Line -->
        <line x1="0" y1="48" x2="576" y2="48" stroke="#F3F4F6" stroke-width="1.5"/>

        <!-- ==================== LEFT SUB-COLUMN: TEXT ADVERTISEMENT (Width: ~345px) ==================== -->
        <g transform="translate(0, 62)">
          <!-- Main Headline -->
          <text x="0" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif" font-size="25" font-weight="900" fill="#09090B" letter-spacing="-0.6">
            Originality Over Imitation.
          </text>

          <!-- Brand Description -->
          <g transform="translate(0, 38)">
            <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="500" fill="#4B5563" line-height="1.45">
              <tspan x="0" dy="0">A creative &amp; strategic brand consultancy built to</tspan>
              <tspan x="0" dy="19">help businesses think differently, communicate</tspan>
              <tspan x="0" dy="19">clearly and create meaningful brand experiences.</tspan>
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
              <text x="18" y="9.5">Founder-Led High-Conviction Strategy</text>
            </g>
            <!-- Bullet 2 -->
            <g transform="translate(0, 22)">
              <circle cx="6" cy="6" r="5" fill="#DCFCE7"/>
              <path d="M4 6 L5.5 7.5 L8.5 4.5" stroke="#16A34A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <text x="18" y="9.5">End-to-End Legal IP &amp; Trademark Defense</text>
            </g>
            <!-- Bullet 3 -->
            <g transform="translate(0, 44)">
              <circle cx="6" cy="6" r="5" fill="#DCFCE7"/>
              <path d="M4 6 L5.5 7.5 L8.5 4.5" stroke="#16A34A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
              <text x="18" y="9.5">Distinctive Visual Identity &amp; Web Systems</text>
            </g>
          </g>

          <!-- Call to Action Banner -->
          <g transform="translate(0, 252)">
            <rect x="0" y="0" width="345" height="34" rx="8" fill="#581C87" filter="url(#shadowPill)"/>
            <text x="172.5" y="21.5" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">
              TRANSFORM YOUR BRAND → SCHEDULE AUDIT
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
          <image href="data:image/png;base64,${founderB64}" x="8" y="10" width="199" height="225" preserveAspectRatio="xMidYMid meet"/>

          <!-- Floating Name / Title Plaque -->
          <g transform="translate(8, 226)">
            <rect x="0" y="0" width="199" height="50" rx="10" fill="#FFFFFF" stroke="#DDD6FE" stroke-width="1" filter="url(#shadowPill)"/>
            <text x="99.5" y="20" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif" font-size="12.5" font-weight="900" fill="#18181B">
              Asim Khan
            </text>
            <text x="99.5" y="35" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="8.5" font-weight="700" fill="#7E22CE" letter-spacing="0.3">
              Founder &amp; Chief Brand Strategist
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

async function run() {
  const svg = generateAdSvg(1);
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const fullPng = resvg.render().asPng();

  fs.writeFileSync("public/assets/test-full-1200x630.png", fullPng);
  console.log("Saved full test image: public/assets/test-full-1200x630.png");

  // Generate 1:1 center crop (630x630) to simulate square mobile feed preview!
  const squareCrop = await sharp(fullPng)
    .extract({ left: (1200 - 630) / 2, top: 0, width: 630, height: 630 })
    .toBuffer();
  fs.writeFileSync("public/assets/test-square-crop-630x630.png", squareCrop);
  console.log("Saved simulated square crop: public/assets/test-square-crop-630x630.png");

  // Generate 4:3 center crop (840x630)
  const crop43 = await sharp(fullPng)
    .extract({ left: (1200 - 840) / 2, top: 0, width: 840, height: 630 })
    .toBuffer();
  fs.writeFileSync("public/assets/test-4-3-crop-840x630.png", crop43);
  console.log("Saved simulated 4:3 crop: public/assets/test-4-3-crop-840x630.png");
}

run();
