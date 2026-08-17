import { BlogPost } from '../types';

export const BLOG_CATEGORIES = [
  'All Categories',
  'Brand Strategy & Naming',
  'AI & Technology',
  'Intellectual Property & Legal',
  'Digital Experience & Web',
  'Startup Growth & Scale',
  'Marketing & Ads',
];

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'sovereign-brand-naming-in-ai-era',
    title: 'Sovereign Brand Naming & Phonetic Architecture in the AI Era',
    shortDescription: 'How modern tech startups construct trademarkable, global brand names with zero phonetic ambiguity across 180+ international jurisdictions.',
    category: 'Brand Strategy & Naming',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    publishedBy: {
      name: 'Asim Khan',
      role: 'Founder & Principal Brand Architect',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    publishedAt: '2026-07-28',
    readTime: '6 min read',
    tags: ['Naming', 'Trademarks', 'AI', 'Global Strategy'],
    status: 'Published',
    featured: true,
    viewsCount: 1420,
    likesCount: 184,
    contentStyle: {
      fontFamily: 'display',
      fontSize: 'lg',
      textColor: '#171717',
      accentColor: '#8B5CF6',
    },
    mainContent: `In an increasingly crowded digital landscape dominated by AI-generated search engines and international intellectual property clearinghouses, crafting a brand name is no longer a purely creative exercise. It is a high-stakes engineering endeavor combining linguistic phonetics, domain availability, and bulletproof legal registrability.

At ORIXNAL, we treat brand naming as a sovereign asset. A company's name is the foundational pillar upon which all future equity, consumer recall, and trademark protections are anchored. In this comprehensive guide, we dissect the framework behind constructing names that survive global trademark examination while establishing instant category dominance.`,
    sections: [
      {
        id: 'sec-1',
        type: 'heading',
        headingText: '1. The Death of Generic Descriptiveness',
        text: 'Traditional descriptive names like "Speedy Delivery" or "Cloud Storage Pro" are legally vulnerable and practically invisible in semantic search engines. Today, the world belongs to neologisms (invented words like Rolex or Xerox) and arbitrary suggestive marks that claim distinctiveness from Day 1.',
      },
      {
        id: 'sec-2',
        type: 'callout',
        headingText: 'Core Rule of Sovereign Naming',
        text: '"If a trademark search reveals 10 similar phonetics in Class 35 or 42, your name is a liability, not an asset. Uniqueness guarantees legal enforceability."',
      },
      {
        id: 'sec-3',
        type: 'bullets',
        headingText: 'Key Evaluation Metrics for Global Naming:',
        bulletItems: [
          'Phonetic clarity across 12 major world language families',
          'Search Engine Dominance (Zero competition for primary branded keywords)',
          'Class 35, 38, and 42 Trademark clearance readiness',
          'Domain & Social handle sovereign ownership without hyphenation or prefixes',
        ],
      },
      {
        id: 'sec-4',
        type: 'paragraph',
        text: 'Download our comprehensive whitepaper and trademark checklist attached below to audit your current brand name against national trademark standards.',
      }
    ],
    attachments: [
      {
        id: 'att-1',
        type: 'pdf',
        name: 'Sovereign_Brand_Naming_Framework_2026.pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileSize: '3.2 MB PDF',
        description: 'Complete 24-page framework detailing Class 35 & 42 IP clearance protocols and phonetic matrices.',
        caption: 'Official ORIXNAL IP Advisory PDF Document',
      },
      {
        id: 'att-2',
        type: 'image',
        name: 'Brand_Phonetic_Matrix_Chart.png',
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
        caption: 'Figure 1.1: ORIXNAL 4-Tier Phonetic Evaluation Spectrum',
      }
    ],
  },
  {
    id: 'blog-2',
    slug: 'trademark-registration-guide-india-us',
    title: 'Complete IP & Trademark Protection Roadmap for Startups & D2C Brands',
    shortDescription: 'Step-by-step guide to filing MSME trademark subsidies, Class registration strategies, and preventing cease-and-desist liabilities.',
    category: 'Intellectual Property & Legal',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop',
    publishedBy: {
      name: 'Advisory Team',
      role: 'Legal & IP Practice Group',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    },
    publishedAt: '2026-07-15',
    readTime: '8 min read',
    tags: ['Trademarks', 'MSME', 'Legal', 'IP Clearance'],
    status: 'Published',
    featured: false,
    viewsCount: 980,
    likesCount: 112,
    contentStyle: {
      fontFamily: 'sans',
      fontSize: 'base',
      textColor: '#171717',
      accentColor: '#10B981',
    },
    mainContent: `Intellectual property is the most under-protected asset in young companies. Over 60% of early-stage startups face trademark objections due to improper class classification or pre-existing prior use marks.

In this guide, we walk through the exact steps required to register wordmarks, logos, and taglines under Controller General of Patents, Designs and Trade Marks (CGPDTM) and international USPTO offices.`,
    sections: [
      {
        id: 'sec-21',
        type: 'heading',
        headingText: 'Understanding Trademark Classes for Tech & E-Commerce',
        text: 'Class 9 covers software & apps, Class 35 covers advertising & online retail platforms, and Class 42 covers SaaS & tech engineering. Filing across the wrong class exposes your core brand to copycats.',
      },
      {
        id: 'sec-22',
        type: 'bullets',
        headingText: 'Steps for Zero-Objection Filing:',
        bulletItems: [
          'Pre-filing public search on CGPDTM IP India database',
          'MSME registration certificate integration for 50% government fee subsidy',
          'Filing TM Application with User Affidavit for prior date usage',
          'Monitoring Examination Reports and filing timely responses',
        ],
      },
    ],
    attachments: [
      {
        id: 'att-21',
        type: 'pdf',
        name: 'Startup_Trademark_Class_Guide_2026.pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileSize: '1.8 MB PDF',
        description: 'Complete breakdown of all 45 Trademark Classes with specific emphasis on Classes 9, 35, 38, 41, and 42.',
        caption: 'Downloadable Class Mapping Reference',
      }
    ],
  },
  {
    id: 'blog-3',
    slug: 'high-conversion-design-engineering-framework',
    title: 'Architecting High-Conversion Web Applications for Enterprise Clients',
    shortDescription: 'How combining minimalist typography, fluid micro-interactions, and server-side performance achieves 3.4x higher lead conversions.',
    category: 'Digital Experience & Web',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    publishedBy: {
      name: 'Asim Khan',
      role: 'Founder & Principal Brand Architect',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    publishedAt: '2026-06-30',
    readTime: '5 min read',
    tags: ['Web Engineering', 'UX Design', 'Conversion Rate', 'Tailwind CSS'],
    status: 'Published',
    featured: false,
    viewsCount: 1150,
    likesCount: 145,
    contentStyle: {
      fontFamily: 'mono',
      fontSize: 'base',
      textColor: '#171717',
      accentColor: '#F59E0B',
    },
    mainContent: `Modern digital buyers make brand trust decisions in under 2.5 seconds. Cluttered templates, slow loading speeds, and generic SaaS hero sections instantly degrade brand credibility.

We build digital platforms using Vite, React 18, and custom CSS design systems that load in under 400 milliseconds globally while communicating undeniable authority.`,
    sections: [
      {
        id: 'sec-31',
        type: 'heading',
        headingText: 'The 3 Pillars of High-Trust Digital Interfaces',
        text: 'Typography hierarchy, visual contrast ratios, and deliberate interaction speed. When every click receives immediate feedback, user session length increases by up to 180%.',
      }
    ],
    attachments: [],
  }
];

const LOCAL_STORAGE_KEY = 'orixnal_blogs_v1';

export const BLOG_ADMIN_EMAIL = 'blog@orixnal.com';
export const DEFAULT_BLOG_TEMP_PASSWORD = 'Orixnal7838';

export const BLOG_ADMIN_PASSWORD_KEY = 'orixnal_blog_admin_password_v1';
export const BLOG_ADMIN_LOGGED_IN_KEY = 'orixnal_blog_admin_logged_in_v1';

export function getBlogAdminPassword(): string {
  try {
    return localStorage.getItem(BLOG_ADMIN_PASSWORD_KEY) || DEFAULT_BLOG_TEMP_PASSWORD;
  } catch {
    return DEFAULT_BLOG_TEMP_PASSWORD;
  }
}

export function isBlogAdminLoggedIn(): boolean {
  try {
    return localStorage.getItem(BLOG_ADMIN_LOGGED_IN_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setBlogAdminLoggedIn(loggedIn: boolean): void {
  try {
    if (loggedIn) {
      localStorage.setItem(BLOG_ADMIN_LOGGED_IN_KEY, 'true');
    } else {
      localStorage.removeItem(BLOG_ADMIN_LOGGED_IN_KEY);
    }
  } catch (err) {
    console.error('Failed to update blog login state', err);
  }
}

export function changeBlogAdminPassword(newPassword: string): void {
  try {
    localStorage.setItem(BLOG_ADMIN_PASSWORD_KEY, newPassword);
  } catch (err) {
    console.error('Failed to change blog admin password', err);
  }
}

export function isUsingBlogTempPassword(): boolean {
  return getBlogAdminPassword() === DEFAULT_BLOG_TEMP_PASSWORD;
}

export function getStoredBlogs(): BlogPost[] {
  if (typeof window === 'undefined') {
    return DEFAULT_BLOG_POSTS;
  }
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_BLOG_POSTS));
      return DEFAULT_BLOG_POSTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse blogs from localStorage', err);
    return DEFAULT_BLOG_POSTS;
  }
}

export function saveStoredBlogs(blogs: BlogPost[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
  } catch (err) {
    console.error('Failed to save blogs to localStorage', err);
  }
}

export function createNewBlogPost(blog: Partial<BlogPost>): BlogPost {
  const blogs = getStoredBlogs();
  const id = `blog-${Date.now()}`;
  const slug = (blog.title || 'untitled-blog')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const newPost: BlogPost = {
    id,
    slug: slug || `post-${id}`,
    title: blog.title || 'Untitled Strategic Post',
    shortDescription: blog.shortDescription || 'Short summary of the article...',
    category: blog.category || 'Brand Strategy & Naming',
    coverImage: blog.coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    publishedBy: {
      name: blog.publishedBy?.name || 'Asim Khan',
      role: blog.publishedBy?.role || 'Founder & Brand Strategist',
      avatarUrl: blog.publishedBy?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    publishedAt: blog.publishedAt || new Date().toISOString().split('T')[0],
    readTime: blog.readTime || '4 min read',
    tags: blog.tags || ['Strategy', 'Brand'],
    status: blog.status || 'Published',
    featured: blog.featured || false,
    viewsCount: 1,
    likesCount: 0,
    contentStyle: blog.contentStyle || {
      fontFamily: 'sans',
      fontSize: 'base',
      textColor: '#171717',
      accentColor: '#8B5CF6',
    },
    mainContent: blog.mainContent || '',
    sections: blog.sections || [],
    attachments: blog.attachments || [],
  };

  const updated = [newPost, ...blogs];
  saveStoredBlogs(updated);
  return newPost;
}

export function updateBlogPost(id: string, updatedFields: Partial<BlogPost>): BlogPost | null {
  const blogs = getStoredBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) return null;

  const existing = blogs[index];
  const updated: BlogPost = {
    ...existing,
    ...updatedFields,
    publishedBy: {
      ...existing.publishedBy,
      ...updatedFields.publishedBy,
    },
    contentStyle: {
      ...existing.contentStyle,
      ...updatedFields.contentStyle,
    },
  };

  blogs[index] = updated;
  saveStoredBlogs(blogs);
  return updated;
}

export function deleteBlogPost(id: string): boolean {
  const blogs = getStoredBlogs();
  const filtered = blogs.filter((b) => b.id !== id);
  if (filtered.length === blogs.length) return false;
  saveStoredBlogs(filtered);
  return true;
}
