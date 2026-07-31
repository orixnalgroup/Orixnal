export type PageRoute =
  | 'home'
  | 'about'
  | 'founder'
  | 'services'
  | 'service-detail'
  | 'case-studies'
  | 'case-study-detail'
  | 'portfolio'
  | 'insights'
  | 'insight-detail'
  | 'industries'
  | 'foooz'
  | 'careers'
  | 'faq'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface ServiceCategory {
  id: string;
  title: string;
  shortTitle: string;
  purpose: string;
  iconName: string;
  description: string;
  tagline?: string;
  services: string[];
  businessOutcomes?: string[];
  strategicValue?: string;
  whoNeedsThis?: string[];
  deliveryPhases?: { phase: string; title: string; desc: string }[];
  wittyQuote?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientCategory: string;
  tagline: string;
  summary: string;
  challenge: string;
  research: string;
  strategy: string;
  brandThinking: string;
  creativeDirection: string;
  execution: string;
  potentialOutcomes: string[];
  keyLearnings: string[];
  image: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  typeBadge: 'Concept Project' | 'Illustrative Work' | 'Demonstration Project';
  description: string;
  deliverables: string[];
  image: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  companyName: string;
  industry: string;
  location: string;
  quote: string;
  fullReview?: string;
  metricLabel: string;
  metricValue: string;
  servicesProvided: string[];
  avatarInitial: string;
  category: 'SaaS & B2B' | 'D2C & Retail' | 'Legal & IP' | 'Web Engineering';
}

