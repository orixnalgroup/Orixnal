export interface SubServiceModule {
  id: string;
  title: string;
  description: string;
  iconName: string;
  items: string[];
}

export const SUB_SERVICE_MODULES: Record<string, SubServiceModule[]> = {
  naming: [
    {
      id: 'naming-corporate',
      title: 'Corporate & Business Naming',
      description: 'Sovereign masterbrand, startup, company & entity names engineered for legal clearance and market authority.',
      iconName: 'Building2',
      items: [
        'Brand Name',
        'Business Name',
        'Company Name',
        'Startup Name',
        'Department Name',
        'Team Name',
        'Initiative Name',
        'Project Name'
      ]
    },
    {
      id: 'naming-product',
      title: 'Product & Platform Naming',
      description: 'Product, app, feature, package & digital platform names with available handles & clear category positioning.',
      iconName: 'Smartphone',
      items: [
        'Product Name',
        'Service Name',
        'Feature Name',
        'Package Name',
        'Plan Name',
        'Website Name',
        'App Name',
        'Platform Name'
      ]
    },
    {
      id: 'naming-retail',
      title: 'Retail & Hospitality Naming',
      description: 'Physical store, outlet, café, restaurant & boutique brand names built for consumer recall and local search.',
      iconName: 'Store',
      items: [
        'Store Name',
        'Shop Name',
        'Outlet Name',
        'Restaurant Name',
        'Café Name'
      ]
    },
    {
      id: 'naming-media',
      title: 'Media, Show & Event Naming',
      description: 'High-impact show, podcast, channel, series & event names that command audience attention and organic search.',
      iconName: 'Tv',
      items: [
        'Podcast Name',
        'Channel Name',
        'Series Name',
        'Show Name',
        'Event Name',
        'Program Name',
        'Campaign Name'
      ]
    },
    {
      id: 'naming-taglines',
      title: 'Taglines, Slogans & Verbal Identity',
      description: 'Memorability anchors, strategic taglines, brand mottos & verbal positioning statements.',
      iconName: 'MessageSquare',
      items: [
        'Tagline Development',
        'Slogan Creation',
        'Brand Motto Architecture',
        'Verbal Positioning Statements'
      ]
    }
  ],

  legal: [
    {
      id: 'legal-incorporation',
      title: 'Incorporation & Business Setup',
      description: 'Corporate entity registration, Ministry of MSME accreditation, and government filings.',
      iconName: 'ShieldCheck',
      items: [
        'Company Incorporation (Private Limited, LLP, OPC)',
        'Startup India Registration',
        'MSME / Udyam Registration',
        'Partnership Firm Registration',
        'Sole Proprietorship Registration',
        'Company Closure / Strike Off',
        'Name Change Process',
        'Director Change',
        'Registered Office Change'
      ]
    },
    {
      id: 'legal-tax',
      title: 'Taxation, Accounting & Statutory Compliance',
      description: 'GST registrations, returns, income tax planning, ROC filings, and board resolutions.',
      iconName: 'Calculator',
      items: [
        'GST Registration',
        'GST Return Filing',
        'Income Tax Filing',
        'TDS Filing & Compliance',
        'Professional Tax Registration',
        'Tax Planning & Advisory',
        'ROC Compliance',
        'Annual Filings',
        'Board Resolution Documentation',
        'Statutory Register Maintenance',
        'Director KYC Compliance'
      ]
    },
    {
      id: 'legal-ip',
      title: 'Intellectual Property & Trademark Defense',
      description: 'Class 35 & 42 trademark filings, copyright registration, patent support, and design protection.',
      iconName: 'Award',
      items: [
        'Trademark Search & Registration',
        'Trademark Objection & Opposition Handling',
        'Trademark Renewal',
        'Copyright Registration',
        'Patent Filing Assistance',
        'Design Registration'
      ]
    },
    {
      id: 'legal-contracts',
      title: 'Contracts, Agreements & Founder Equity',
      description: 'Bulletproof legal contracts, founder equity agreements, NDAs, SLAs, and shareholder terms.',
      iconName: 'FileText',
      items: [
        'Non-Disclosure Agreement (NDA)',
        'Service Level Agreement (SLA)',
        'Memorandum of Understanding (MoU)',
        'Employment Contracts',
        'Vendor Agreements',
        'Partnership Agreements',
        'Contract Drafting',
        'Contract Review',
        'Contract Negotiation Support',
        'Founder Agreements',
        'Equity Structuring',
        'Shareholder Agreements',
        'ESOP Documentation',
        'Fundraising Legal Support'
      ]
    },
    {
      id: 'legal-digital',
      title: 'Digital, App & Website Legal Governance',
      description: 'Privacy policies, terms & conditions, IT law compliance, cookie policies, and online business setup.',
      iconName: 'Lock',
      items: [
        'Terms & Conditions Drafting',
        'Privacy Policy Drafting',
        'Website & App Legal Compliance',
        'Website Compliance (GDPR Basics, IT Laws)',
        'Cookie Policy Drafting',
        'Online Business Legal Setup',
        'Platform Terms Compliance'
      ]
    },
    {
      id: 'legal-advisory',
      title: 'Regulatory Licenses, Audits & Dispute Advisory',
      description: 'Trade licenses, FSSAI, IEC, legal notice drafting, arbitration support, and compliance audits.',
      iconName: 'Scale',
      items: [
        'Trade License Registration',
        'Shop & Establishment License',
        'FSSAI License',
        'Import Export Code (IEC)',
        'ISO Certification Assistance',
        'Legal Risk Assessment',
        'Legal Notice Drafting',
        'Reply to Legal Notices',
        'Pre-litigation Advisory',
        'Arbitration Support',
        'Business Law Consultation',
        'Compliance Risk Advisory',
        'Industry-Specific Regulations',
        'Legal Due Diligence',
        'Compliance Audit',
        'Contract Audit'
      ]
    }
  ],

  design: [
    {
      id: 'design-identity',
      title: 'Brand Identity & Design Systems',
      description: 'Core logotypes, design tokens, icon sets, mascots, and comprehensive brand identity guidelines.',
      iconName: 'Palette',
      items: [
        'Logo Design',
        'Icon Design',
        'Illustration Design',
        'Infographic Design',
        'Mascot Design',
        'Character Design',
        'Graphic Design',
        'Art Design'
      ]
    },
    {
      id: 'design-collateral',
      title: 'Print & Corporate Collateral',
      description: 'Business cards, brochures, catalogues, stationery, letterheads, and presentation decks.',
      iconName: 'File',
      items: [
        'Business Card Design',
        'Letterhead Design',
        'Envelope Design',
        'Stationery Design',
        'Brochure Design',
        'Catalogue Design',
        'Flyer Design',
        'PowerPoint Design',
        'Word Template Design',
        'Magazine Design'
      ]
    },
    {
      id: 'design-packaging',
      title: 'Packaging & Merchandise Systems',
      description: 'Tactile packaging, product labels, tote bags, apparel, and custom branded merchandise.',
      iconName: 'Package',
      items: [
        'Packaging Design',
        'Label Design',
        'Apparel Design',
        'T-shirt Design',
        'Bag and Tote Design',
        'Cup and Mug Design',
        'Merchandize Design',
        'Sticker Design'
      ]
    },
    {
      id: 'design-advertising',
      title: 'Advertising, Spatial & Outdoor Design',
      description: 'Billboards, banner ads, signage, vehicle wraps, and trade show booth environmental graphics.',
      iconName: 'Layers',
      items: [
        'Billboard Design',
        'Banner Ad Design',
        'Advertisement Design',
        'Signage Design',
        'Car Wrap Design',
        'Trade Show Booth Design',
        'Postcard Design',
        'Poster Design'
      ]
    },
    {
      id: 'design-digital',
      title: 'Digital & Publishing Visuals',
      description: 'Website creative design, social media templates, email marketing graphics, and book covers.',
      iconName: 'Layout',
      items: [
        'Website Creative Design',
        'Social Media Design',
        'Email Marketing Design',
        'Newsletter Design',
        'Newspaper Ad Design',
        'Book Cover Design',
        'eBook Cover Design',
        'CD Cover Design',
        'Greeting Card Design',
        'Card Design',
        'Invitation Design',
        'Menu Design'
      ]
    }
  ],

  digital: [
    {
      id: 'digital-web',
      title: 'Custom Web Platforms & CMS Engineering',
      description: 'Bespoke React/Next.js websites, CMS platforms, maintenance, and high-performance frontends.',
      iconName: 'Code',
      items: [
        'Static Website Development',
        'Dynamic Website Development',
        'Custom Website Development',
        'CMS Development (WordPress, Webflow, etc.)',
        'Website Maintenance & Support',
        'HTML/CSS Development',
        'JavaScript Development',
        'React / Vue / Angular Development',
        'Responsive Design Implementation'
      ]
    },
    {
      id: 'digital-ecommerce',
      title: 'E-Commerce & Digital Marketplaces',
      description: 'Custom Shopify stores, WooCommerce platforms, payment gateways, and marketplace integrations.',
      iconName: 'ShoppingCart',
      items: [
        'Shopify Development',
        'WooCommerce Development',
        'Magento Development',
        'Custom E-commerce Development',
        'Marketplace Integration (Amazon, Flipkart, etc.)',
        'Payment Gateway Integration'
      ]
    },
    {
      id: 'digital-apps',
      title: 'Web Apps, SaaS & Mobile Platforms',
      description: 'Full-stack web applications, admin dashboards, PWAs, iOS, Android, and Flutter apps.',
      iconName: 'Cpu',
      items: [
        'Custom Web App Development',
        'SaaS Platform Development',
        'Dashboard & Admin Panel Development',
        'Progressive Web Apps (PWA)',
        'Android App Development',
        'iOS App Development',
        'Cross-Platform App Development (Flutter, React Native)',
        'App Maintenance & Support'
      ]
    },
    {
      id: 'digital-backend',
      title: 'Backend Engineering, APIs & Cloud Architecture',
      description: 'Server-side architecture, custom REST/GraphQL APIs, database management, and cloud deployment.',
      iconName: 'Server',
      items: [
        'Server-side Development',
        'API Development & Integration',
        'Database Design & Management',
        'Cloud Backend Services',
        'Domain Setup & Management',
        'Web Hosting Setup',
        'Cloud Deployment (AWS, GCP, Azure)',
        'Server Management',
        'Webhook Setup'
      ]
    },
    {
      id: 'digital-conversion',
      title: 'Conversion Optimization & High-Growth Funnels',
      description: 'High-converting landing pages, sales funnels, wireframing, A/B testing, and UX optimization.',
      iconName: 'Zap',
      items: [
        'Wireframing & Prototyping',
        'User Experience Optimization',
        'Interface Development',
        'Design-to-Code Implementation',
        'High-Converting Landing Pages',
        'Sales Funnel Pages',
        'Lead Capture Pages',
        'A/B Testing Implementation',
        'User Behavior Analysis',
        'Funnel Optimization'
      ]
    },
    {
      id: 'digital-seo-automation',
      title: 'Technical SEO, Speed, Security & AI Automation',
      description: 'Technical SEO, Core Web Vitals 100/100, SSL hardening, analytics, and AI workflow automation.',
      iconName: 'Sparkles',
      items: [
        'On-Page SEO',
        'Technical SEO',
        'Off-Page SEO',
        'Local SEO',
        'SEO Audits',
        'Page Speed Optimization',
        'Core Web Vitals Optimization',
        'Mobile Optimization',
        'SSL Implementation',
        'Website Security Hardening',
        'Data Protection Compliance',
        'Backup & Recovery Systems',
        'CRM Integration',
        'Marketing Automation Tools Setup',
        'Email Marketing Tools Integration',
        'Google Analytics Setup',
        'Google Tag Manager Setup',
        'Conversion Tracking',
        'Event Tracking',
        'Custom Dashboard Reporting',
        'Social Media Integration',
        'Third-party Tool Integration',
        'AI Automation',
        'Business Process Automation',
        'Zapier / Make (Integromat) Automation',
        'Workflow Optimization',
        'Bug Fixing',
        'Technical Troubleshooting',
        'Ongoing Maintenance Contracts'
      ]
    }
  ],

  marketing: [
    {
      id: 'marketing-gtm',
      title: 'Go-To-Market & Market Expansion Strategy',
      description: 'Comprehensive GTM frameworks, market entry, expansion, opportunity analysis, and growth roadmaps.',
      iconName: 'TrendingUp',
      items: [
        'Integrated Marketing Strategy',
        'Go-To-Market Strategy (GTM)',
        'Market Entry Strategy',
        'Market Expansion Strategy',
        'Market Opportunity Analysis',
        'Competitive Analysis',
        'Business Growth Planning',
        'Revenue Growth Strategy',
        'Market Scaling Strategy',
        'New Market Development',
        'Diversification Strategy'
      ]
    },
    {
      id: 'marketing-positioning',
      title: 'Brand Positioning, Architecture & Messaging',
      description: 'Positioning strategy, brand architecture, value proposition, voice & tone, and narrative decks.',
      iconName: 'Compass',
      items: [
        'Brand Positioning Strategy',
        'Brand Architecture Strategy',
        'Brand Messaging Framework',
        'Brand Voice & Tone Development',
        'Brand Story Development',
        'Product Positioning',
        'Product Messaging',
        'Co-branding Strategy'
      ]
    },
    {
      id: 'marketing-consumer',
      title: 'Consumer Research, Segmentation & CX',
      description: 'Buyer persona architecture, consumer psychology, journey mapping, and lifecycle retention.',
      iconName: 'Users',
      items: [
        'Consumer Behavior Analysis',
        'Customer Segmentation',
        'Target Audience Definition',
        'Customer Journey Mapping',
        'Customer Experience (CX) Strategy',
        'Customer Lifecycle Planning',
        'Retention Strategy Development',
        'Loyalty Program Design',
        'Customer Engagement Planning',
        'Repeat Purchase Strategy'
      ]
    },
    {
      id: 'marketing-pricing',
      title: 'Product Launch & Pricing Architecture',
      description: 'Product-market fit analysis, pricing tier design, value pricing models, and launch campaigns.',
      iconName: 'Tag',
      items: [
        'Product Launch Strategy',
        'Product-Market Fit Analysis',
        'Pricing Model Design',
        'Value-Based Pricing Strategy',
        'Competitive Pricing Analysis',
        'New Product Launch Planning'
      ]
    },
    {
      id: 'marketing-channel',
      title: 'Channel, Retail & Distributor Strategy',
      description: 'Multi-channel distribution, retail marketing, dealer incentive models, and strategic partnerships.',
      iconName: 'Share2',
      items: [
        'Channel Strategy Development',
        'Retail & Distribution Planning',
        'Market Penetration Strategy',
        'Dealer & Distributor Strategy',
        'Retail Marketing Planning',
        'Channel Incentive Planning',
        'Strategic Partnerships Planning',
        'Channel Partnerships Development'
      ]
    },
    {
      id: 'marketing-performance',
      title: 'Funnels, Performance & ROI Optimization',
      description: 'Lead generation funnels, integrated campaign frameworks, KPI frameworks, and ROI attribution models.',
      iconName: 'BarChart3',
      items: [
        'Lead Generation Strategy (Offline/Integrated)',
        'Demand Creation Planning',
        'Awareness to Conversion Funnel Design',
        'Integrated Campaign Planning',
        'Seasonal Campaign Strategy',
        'Promotional Campaign Strategy',
        'Multi-channel Campaign Framework',
        'Sales Funnel Design',
        'Lead Qualification Framework',
        'Sales Process Alignment',
        'Marketing Process Design',
        'Workflow Planning',
        'Resource Allocation Strategy',
        'KPI Definition & Planning',
        'Marketing Performance Framework',
        'ROI Planning Models',
        'Attribution Planning (Non-digital & hybrid)'
      ]
    }
  ],

  advertisement: [
    {
      id: 'ad-broadcast',
      title: 'Broadcast, Audio & Print Advertising',
      description: 'Television, OTT, FM radio, podcast sponsors, newspapers, magazines, and print inserts.',
      iconName: 'Tv',
      items: [
        'Cable TV Advertising',
        'OTT / Connected TV Advertising',
        'FM Radio Ads',
        'Podcast Advertising',
        'Audio Streaming Ads',
        'Newspaper Ads',
        'Magazine Ads',
        'Brochure Advertising',
        'Flyer Inserts'
      ]
    },
    {
      id: 'ad-outdoor',
      title: 'Outdoor, Transit & Ambient Advertising',
      description: 'Billboards, hoardings, bus/metro transit media, pole kiosks, wall graphics, and theater cinema ads.',
      iconName: 'MapPin',
      items: [
        'Billboard Advertising',
        'Hoarding Ads',
        'Transit Advertising (Bus/Metro Ads)',
        'Pole Kiosk Ads',
        'Wall Painting Ads',
        'Theatre Screen Ads',
        'On-Screen Video Ads',
        'Slide Ads'
      ]
    },
    {
      id: 'ad-digital',
      title: 'Digital Search, Social & Performance Media',
      description: 'Google Search Ads, Meta performance ads, YouTube video campaigns, native ads, and SMS/Push media.',
      iconName: 'Megaphone',
      items: [
        'Search Engine Ads (Google Ads)',
        'Display Ads',
        'Social Media Ads',
        'Video Ads (YouTube/OTT)',
        'Native Ads',
        'In-App Ads',
        'SMS Marketing',
        'Push Notification Ads',
        'Email Marketing',
        'WhatsApp Marketing',
        'Telemarketing Campaigns'
      ]
    },
    {
      id: 'ad-activations',
      title: 'Activations, Influencers & In-Store Media',
      description: 'Creator partnerships, roadshows, mall pop-ups, launch activations, point-of-sale displays, and advertorials.',
      iconName: 'Sparkles',
      items: [
        'Social Media Influencer Promotions',
        'Celebrity Endorsements',
        'Brand Activations',
        'Roadshows',
        'Mall Promotions',
        'Product Launch Events',
        'In-store Branding',
        'Point of Sale Displays',
        'Standee Advertising',
        'Sponsored Articles',
        'Advertorials',
        'Branded Content',
        'Partner Promotions',
        'Commission-based Campaigns'
      ]
    }
  ],

  event: [
    {
      id: 'event-planning',
      title: 'Event Ideation, Strategy & Management',
      description: 'Concept design, run-of-show blueprints, full-scale event coordination, and timeline execution.',
      iconName: 'Calendar',
      items: [
        'Event Ideation & Theme Development',
        'Event Concept Design',
        'Event Blueprint & Planning',
        'End-to-End Event Management',
        'Event Coordination',
        'Event Timeline & Run-of-Show Planning'
      ]
    },
    {
      id: 'event-stage',
      title: 'Stage, Audio-Visual & Technical Production',
      description: 'Custom stage fabrication, lighting engineering, spatial AV setups, and special effects.',
      iconName: 'Sliders',
      items: [
        'Stage Design & Setup',
        'Set Design & Fabrication',
        'Audio-Visual Production',
        'Lighting Design & Execution',
        'Special Effects & Technical Setup',
        'Technical Crew Management'
      ]
    },
    {
      id: 'event-operations',
      title: 'Venue, Sourcing & On-Ground Operations',
      description: 'Venue sourcing, material procurement, vendor management, setup, and on-site logistics.',
      iconName: 'Map',
      items: [
        'Venue Sourcing & Selection',
        'Venue Booking & Coordination',
        'Venue Layout Planning',
        'Vendor Management',
        'Material Procurement',
        'On-ground Operations Management',
        'Event Setup & Dismantling'
      ]
    },
    {
      id: 'event-booth',
      title: 'Exhibitions, Trade Shows & Activation Booths',
      description: 'Custom exhibition booth design, trade show management, experience zones, and product demos.',
      iconName: 'Maximize',
      items: [
        'Exhibition Planning',
        'Booth Design & Fabrication',
        'Trade Show Management',
        'Exhibitor Coordination',
        'On-ground Activation Setup',
        'Experience Zone Setup',
        'Product Display & Demo Setup',
        'Hostesses & Promoters',
        'Event Coordinators'
      ]
    },
    {
      id: 'event-conferences',
      title: 'Corporate Conferences, Galas & Private Events',
      description: 'Enterprise summits, AGMs, award ceremonies, launch galas, and private executive gatherings.',
      iconName: 'Award',
      items: [
        'Corporate Conferences',
        'Seminars & Workshops',
        'Annual General Meetings (AGM)',
        'Award Ceremonies',
        'Weddings & Receptions',
        'Private Parties',
        'Celebrations & Functions'
      ]
    },
    {
      id: 'event-guest-media',
      title: 'Guest Management, Ticketing & Post-Event Media',
      description: 'VIP hospitality, QR badge access systems, celebrity coordination, videography, and aftermovies.',
      iconName: 'Video',
      items: [
        'Invitation Management',
        'RSVP Handling',
        'Guest List Coordination',
        'VIP Management',
        'Artist Booking',
        'Celebrity Coordination',
        'Speaker & Performer Management',
        'Theme-based Decor',
        'Floral Design',
        'Stage & Venue Decoration',
        'Event Registration Systems',
        'Ticketing Systems',
        'Access Control Systems (QR/Badge)',
        'Event Permissions & Licensing',
        'Crowd Management Planning',
        'Security & Safety Arrangements',
        'Photography Services',
        'Videography Services',
        'Aftermovie Production',
        'Post-event Reporting',
        'Feedback Collection',
        'Event Performance Summary'
      ]
    }
  ],

  consultancy: [
    {
      id: 'consultancy-advisory',
      title: 'Founder & Executive Strategic Advisory',
      description: 'Direct 1-on-1 strategic mentorship, business brand consulting, and leadership alignment with Founder Asim Khan.',
      iconName: 'Briefcase',
      items: [
        'Business Brand Consulting',
        'Founder Advisory',
        'Executive Mentorship & Alignment',
        'Strategic Leadership Alignment'
      ]
    },
    {
      id: 'consultancy-audit',
      title: 'Strategic Brand Audits & Category Positioning',
      description: 'Diagnostic brand audits, category positioning evaluations, and competitor moat benchmarking.',
      iconName: 'Search',
      items: [
        'Brand Audit',
        'Category Positioning Audit',
        'Market Perception Diagnostic',
        'Competitor Moat Benchmarking'
      ]
    },
    {
      id: 'consultancy-rebrand',
      title: 'Corporate Rebranding & Portfolio Architecture',
      description: 'Rebrand master plans, brand repositioning, M&A integration, and multi-brand governance.',
      iconName: 'RotateCcw',
      items: [
        'Rebranding Strategy',
        'Brand Repositioning Framework',
        'M&A Brand Integration Strategy',
        'Brand Governance Framework',
        'Sub-brand Portfolio Structuring'
      ]
    },
    {
      id: 'consultancy-growth',
      title: 'Growth, Unit Economics & Capital Readiness',
      description: 'Growth strategy, unit economics alignment, investor pitch narratives, and 3-year brand architecture roadmaps.',
      iconName: 'TrendingUp',
      items: [
        'Growth Strategy',
        'Unit Economics Alignment',
        'Investor Pitch Narrative',
        '3-Year Brand Architecture Roadmap'
      ]
    }
  ]
};
