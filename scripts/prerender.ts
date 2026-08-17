import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { PageRoute } from '../src/types';
import { StaticApp } from '../src/server/StaticApp';
import { renderOgBuffer, renderOgJpegBuffer } from '../src/server/ogGenerator';
import sharp from 'sharp';
import {
  generateWebSiteSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateSpeakableSchema,
  generateServicesSchema,
  generateFAQSchema,
} from '../src/utils/schema';

const ROUTES: Array<{ route: PageRoute; path: string; title: string; description: string; ogType?: string }> = [
  {
    route: 'home',
    path: '',
    title: 'ORIXNAL® — Originality Over Imitation.',
    description: 'ORIXNAL® — Original Thinking. Human Impact.',
    ogType: 'website',
  },
  {
    route: 'about',
    path: 'about',
    title: 'About ORIXNAL — Brand DNA, Philosophy & The ORIXNAL Method',
    description: 'Discover ORIXNAL brand DNA, core values, and founder-led philosophy. We unite naming, legal IP, visual identity, and high-performance engineering under one high-conviction company.',
    ogType: 'website',
  },
  {
    route: 'founder',
    path: 'founder',
    title: 'Asim Khan — Founder & Chief Brand Strategist | ORIXNAL',
    description: 'Meet Asim Khan, Founder & Chief Brand Strategist at ORIXNAL. Learn about his high-conviction approach to brand architecture, legal trademark defense, and digital transformation.',
    ogType: 'profile',
  },
  {
    route: 'services',
    path: 'services',
    title: 'Brand Development Services — Naming, Legal IP, Design & Web | ORIXNAL',
    description: 'Explore ORIXNAL 8 master capabilities: Brand Naming, Legal IP & Incorporation, Studio Design Systems, Web Engineering, Marketing Strategy, Ads & Media, Event Activations, and Founder Advisory.',
    ogType: 'website',
  },
  {
    route: 'case-studies',
    path: 'case-studies',
    title: 'Case Studies & Brand Outcomes | ORIXNAL',
    description: 'Review real-world brand outcomes, repositioning case studies, and quantifiable growth achieved for global clients by ORIXNAL.',
    ogType: 'website',
  },
  {
    route: 'portfolio',
    path: 'portfolio',
    title: 'Concept Portfolio & Systems | ORIXNAL Studio',
    description: 'Examine concept visual identities, packaging systems, and digital product designs crafted by ORIXNAL Studio.',
    ogType: 'website',
  },
  {
    route: 'insights',
    path: 'insights',
    title: 'Brand Insights & Thought Leadership | ORIXNAL',
    description: 'Executive essays, thought leadership, and strategic frameworks on brand positioning, trademark defense, and consumer psychology.',
    ogType: 'article',
  },
  {
    route: 'blog',
    path: 'blog',
    title: 'Official Blog & Editorial Guides — Strategic Articles & IP | ORIXNAL',
    description: 'Official ORIXNAL blog covering trademark filing guides, brand architecture, Shopify e-commerce scaling, and MSME growth strategies.',
    ogType: 'article',
  },
  {
    route: 'industries',
    path: 'industries',
    title: 'Industries We Serve — Startups, D2C, Enterprise | ORIXNAL',
    description: 'Tailored brand development solutions across Tech Startups, D2C Consumer Goods, Food & Hospitality, Real Estate, Healthcare, and Professional Services.',
    ogType: 'website',
  },
  {
    route: 'foooz',
    path: 'foooz',
    title: 'Foooz® — Everyday Food Brand Ecosystem | ORIXNAL Sub-Brand',
    description: 'Foooz® is an everyday food brand ecosystem created by ORIXNAL, connecting farm-fresh agricultural sourcing with packaged consumer food products.',
    ogType: 'website',
  },
  {
    route: 'events',
    path: 'events',
    title: 'Orixnal Event — Global Strategic Gatherings & IP Workshops',
    description: 'Orixnal Event organizes corporate expos, brand launches, VIP leadership summits, and IP workshops across global business hubs.',
    ogType: 'website',
  },
  {
    route: 'careers',
    path: 'careers',
    title: 'Careers at ORIXNAL — Join Our Brand Development Team',
    description: 'Build your career at ORIXNAL. Join a high-conviction team of brand strategists, IP lawyers, UI/UX designers, and full-stack web engineers.',
    ogType: 'website',
  },
  {
    route: 'faq',
    path: 'faq',
    title: 'Frequently Asked Questions — Brand Advisory & IP | ORIXNAL',
    description: 'Get instant answers regarding ORIXNAL engagement models, pricing, legal IP search, trademark timeline, and 1-on-1 Founder Audits.',
    ogType: 'website',
  },
  {
    route: 'contact',
    path: 'contact',
    title: 'Contact ORIXNAL — Schedule Strategic Consultation | +91 8447561650',
    description: 'Connect directly with ORIXNAL Founder Asim Khan and our strategic team in Noida/Ghaziabad, UP. Call +91 8447561650 or schedule a Brand Audit.',
    ogType: 'website',
  },
  {
    route: 'privacy',
    path: 'privacy',
    title: 'Privacy Policy | ORIXNAL Group',
    description: 'ORIXNAL Group Privacy Policy explaining our data handling, security protocols, and client confidentiality standards.',
    ogType: 'website',
  },
  {
    route: 'terms',
    path: 'terms',
    title: 'Terms & Conditions | ORIXNAL Group',
    description: 'Terms & Conditions governing engagement with ORIXNAL Brand Development Company.',
    ogType: 'website',
  },
  {
    route: 'not-found',
    path: '404',
    title: 'Page Not Found — 404 | ORIXNAL®',
    description: 'The requested page could not be found. Return to the ORIXNAL homepage to explore our global brand development services, strategy, and insights.',
    ogType: 'website',
  },
];

async function prerender() {
  const distDir = path.join(process.cwd(), 'dist');
  const templatePath = path.join(distDir, 'index.html');
  const publicAssetsDir = path.join(process.cwd(), 'public', 'assets');
  const distAssetsDir = path.join(distDir, 'assets');

  if (!fs.existsSync(templatePath)) {
    console.error('Template dist/index.html not found! Make sure to run vite build first.');
    process.exit(1);
  }

  if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
  }
  if (!fs.existsSync(distAssetsDir)) {
    fs.mkdirSync(distAssetsDir, { recursive: true });
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf8');

  console.log('🚀 Starting ORIXNAL SSG Prerendering & Open Graph Image Generation for all routes...');

  // 1. Preserve official flagship Master OG artwork (exact official asset from Google Drive)
  try {
    const officialPngPath = path.join(publicAssetsDir, 'official-og-artwork.png');
    const sourcePng = fs.existsSync(officialPngPath) 
      ? fs.readFileSync(officialPngPath) 
      : (fs.existsSync(path.join(publicAssetsDir, 'orixnal-og.png')) ? fs.readFileSync(path.join(publicAssetsDir, 'orixnal-og.png')) : null);

    if (sourcePng) {
      const flagshipFiles = [
        { name: 'orixnal-og.png', buf: sourcePng },
        { name: 'og-image.png', buf: sourcePng },
        { name: 'og-home.png', buf: sourcePng },
      ];

      for (const f of flagshipFiles) {
        fs.writeFileSync(path.join(publicAssetsDir, f.name), f.buf);
        fs.writeFileSync(path.join(distAssetsDir, f.name), f.buf);
      }

      // Generate lossless high-quality JPEG counterpart
      const jpgBuf = await sharp(sourcePng).jpeg({ quality: 95, mozjpeg: true }).toBuffer();
      fs.writeFileSync(path.join(publicAssetsDir, 'orixnal-og.jpg'), jpgBuf);
      fs.writeFileSync(path.join(distAssetsDir, 'orixnal-og.jpg'), jpgBuf);
      fs.writeFileSync(path.join(publicAssetsDir, 'og-image.jpg'), jpgBuf);
      fs.writeFileSync(path.join(distAssetsDir, 'og-image.jpg'), jpgBuf);
      
      console.log('  🖼️  Preserved official flagship OG images: orixnal-og.png, og-image.png, orixnal-og.jpg');
    }
  } catch (flagshipErr) {
    console.warn('  ⚠️ Could not pre-render flagship OG images:', flagshipErr);
  }

  for (const item of ROUTES) {
    const { route, path: routePath, title, description, ogType = 'website' } = item;
    const currentUrl = route === 'home' ? 'https://www.orixnal.com/' : `https://www.orixnal.com/${routePath}`;
    const ogFilename = route === 'home' ? 'orixnal-og.png' : `og-${route}.png`;
    const ogImageUrl = `https://www.orixnal.com/assets/${ogFilename}`;
    const ogMime = 'image/png';
    const ogAlt = route === 'home' ? 'ORIXNAL® — Original Thinking | Human Impact' : `${title} — ORIXNAL®`;

    // Pre-generate static OG image file for sub-routes
    if (route !== 'home') {
      try {
        const ogPngBuffer = renderOgBuffer({ page: route });
        fs.writeFileSync(path.join(publicAssetsDir, `og-${route}.png`), ogPngBuffer);
        fs.writeFileSync(path.join(distAssetsDir, `og-${route}.png`), ogPngBuffer);
      } catch (imgErr) {
        console.warn(`  ⚠️ Could not pre-render OG image for ${route}:`, imgErr);
      }
    }

    // 1. Render static body HTML
    let bodyHtml = '';
    try {
      bodyHtml = renderToString(React.createElement(StaticApp, { route }));
    } catch (err) {
      console.error(`Error rendering route ${route}:`, err);
    }

    // 2. Build JSON-LD schemas
    const schemas: object[] = [
      generateWebSiteSchema(),
      generateLocalBusinessSchema(description),
      generateBreadcrumbSchema(route, currentUrl),
      generateSpeakableSchema(title),
    ];

    if (route === 'services' || route === 'home') {
      schemas.push(generateServicesSchema());
    }

    if (route === 'faq' || route === 'home') {
      schemas.push(generateFAQSchema());
    }

    const schemaTags = schemas
      .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
      .join('\n    ');

    // 3. Customize HTML template
    let html = baseTemplate;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);

    // Replace Description
    html = html.replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${description}" />`
    );

    // Replace Canonical
    html = html.replace(
      /<link rel="canonical" href=".*?" \/>/,
      `<link rel="canonical" href="${currentUrl}" />`
    );

    // Replace OG Tags
    html = html.replace(
      /<meta property="og:title" content=".*?" \/>/,
      `<meta property="og:title" content="${title}" />`
    );
    html = html.replace(
      /<meta property="og:description" content=".*?" \/>/,
      `<meta property="og:description" content="${description}" />`
    );
    html = html.replace(
      /<meta property="og:url" content=".*?" \/>/,
      `<meta property="og:url" content="${currentUrl}" />`
    );
    html = html.replace(
      /<meta property="og:type" content=".*?" \/>/,
      `<meta property="og:type" content="${ogType}" />`
    );
    html = html.replace(
      /<meta property="og:image" content=".*?" \/>/,
      `<meta property="og:image" content="${ogImageUrl}" />`
    );
    html = html.replace(
      /<meta property="og:image:secure_url" content=".*?" \/>/,
      `<meta property="og:image:secure_url" content="${ogImageUrl}" />`
    );
    html = html.replace(
      /<meta property="og:image:type" content=".*?" \/>/,
      `<meta property="og:image:type" content="${ogMime}" />`
    );
    html = html.replace(
      /<meta property="og:image:alt" content=".*?" \/>/,
      `<meta property="og:image:alt" content="${ogAlt}" />`
    );

    // Replace Twitter tags
    html = html.replace(
      /<meta name="twitter:title" content=".*?" \/>/,
      `<meta name="twitter:title" content="${title}" />`
    );
    html = html.replace(
      /<meta name="twitter:description" content=".*?" \/>/,
      `<meta name="twitter:description" content="${description}" />`
    );
    html = html.replace(
      /<meta name="twitter:image" content=".*?" \/>/,
      `<meta name="twitter:image" content="${ogImageUrl}" />`
    );
    html = html.replace(
      /<meta name="twitter:image:alt" content=".*?" \/>/,
      `<meta name="twitter:image:alt" content="${ogAlt}" />`
    );

    // If 404 page, ensure noindex
    if (route === 'not-found') {
      html = html.replace(
        /<meta name="robots" content=".*?" \/>/,
        '<meta name="robots" content="noindex, follow" />'
      );
    }

    // Inject Schemas before </head>
    html = html.replace('</head>', `  ${schemaTags}\n  </head>`);

    // Inject Body HTML into #root
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

    // 4. Output files
    if (route === 'home') {
      fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
      console.log('  ✓ dist/index.html (Home prerendered)');
    } else if (route === 'not-found') {
      fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf8');
      console.log('  ✓ dist/404.html (404 Page prerendered)');
    } else {
      const routeDir = path.join(distDir, routePath);
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
      fs.writeFileSync(path.join(distDir, `${routePath}.html`), html, 'utf8');
      console.log(`  ✓ dist/${routePath}/index.html & dist/${routePath}.html`);
    }
  }

  console.log('✨ All 16 routes successfully prerendered with full crawlable semantic HTML, static OG assets & JSON-LD!');
}

prerender();
