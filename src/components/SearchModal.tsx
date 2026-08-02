import React, { useState, useEffect, useRef } from 'react';
import { PageRoute, ServiceCategory, CaseStudy, PortfolioProject, InsightArticle, FAQItem } from '../types';
import {
  SERVICE_CATEGORIES,
  PORTFOLIO_PROJECTS,
  CASE_STUDIES,
  INSIGHTS_ARTICLES,
  FAQ_LIST
} from '../data/brandData';
import { getEvents } from '../data/eventsData';
import {
  Search,
  X,
  Sparkles,
  Briefcase,
  BookOpen,
  HelpCircle,
  ArrowRight,
  FileText,
  Layout,
  Calendar
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Page' | 'Service' | 'Portfolio' | 'Case Study' | 'Insight' | 'FAQ';
  route: PageRoute;
  badge?: string;
  icon: React.ReactNode;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

const PAGE_ITEMS: SearchResultItem[] = [
  { id: 'p-home', title: 'Home Masterbrand Portal', subtitle: 'ORIXNAL enterprise brand development overview', category: 'Page', route: 'home', badge: 'Main', icon: <Layout className="w-4 h-4 text-rose-600" /> },
  { id: 'p-about', title: 'About ORIXNAL Group', subtitle: 'Founder manifesto, corporate credentials & MSME Udyam details', category: 'Page', route: 'about', badge: 'Company', icon: <Layout className="w-4 h-4 text-rose-600" /> },
  { id: 'p-founder', title: 'Asim Khan (Founder)', subtitle: 'Founder & Chief Brand Strategist background & bio', category: 'Page', route: 'founder', badge: 'Leadership', icon: <Layout className="w-4 h-4 text-rose-600" /> },
  { id: 'p-services', title: 'Integrated Services', subtitle: '8 pillars of brand development & legal IP armor', category: 'Page', route: 'services', badge: 'Pillars', icon: <Sparkles className="w-4 h-4 text-purple-600" /> },
  { id: 'p-case-studies', title: 'Case Studies & ROI Metrics', subtitle: 'Enterprise brand outcome metrics & client audits', category: 'Page', route: 'case-studies', badge: 'Results', icon: <FileText className="w-4 h-4 text-emerald-600" /> },
  { id: 'p-portfolio', title: 'Portfolio Showcase', subtitle: 'Visual logotypes, web platforms, and brand design guidelines', category: 'Page', route: 'portfolio', badge: 'Design', icon: <Briefcase className="w-4 h-4 text-amber-600" /> },
  { id: 'p-insights', title: 'Insights & Publications', subtitle: 'Brand strategy essays, audio summaries & market trends', category: 'Page', route: 'insights', badge: 'Research', icon: <BookOpen className="w-4 h-4 text-rose-600" /> },
  { id: 'p-industries', title: 'Industry Solutions', subtitle: 'SaaS, D2C, Fintech, Healthcare & Gaming specialization', category: 'Page', route: 'industries', badge: 'Sectors', icon: <Layout className="w-4 h-4 text-rose-600" /> },
  { id: 'p-foooz', title: 'FOOOZ™ Ecosystem', subtitle: 'Sovereign esports, gaming & food lifestyle venture', category: 'Page', route: 'foooz', badge: 'Ecosystem', icon: <Sparkles className="w-4 h-4 text-amber-600" /> },
  { id: 'p-events', title: 'ORIXNAL EVENT™ Summits', subtitle: 'Global strategic summits, IP workshops & admin panel', category: 'Page', route: 'events', badge: 'Events', icon: <Calendar className="w-4 h-4 text-purple-600" /> },
  { id: 'p-faq', title: 'Frequently Asked Questions', subtitle: 'Pricing, deliverables, timelines & trademark process', category: 'Page', route: 'faq', badge: 'Support', icon: <HelpCircle className="w-4 h-4 text-neutral-600" /> },
  { id: 'p-contact', title: 'Contact & Advisory Booking', subtitle: 'Schedule direct strategy call with Founder Asim Khan', category: 'Page', route: 'contact', badge: 'Direct', icon: <Layout className="w-4 h-4 text-rose-600" /> },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allResults: SearchResultItem[] = [];

  // 1. Pages
  PAGE_ITEMS.forEach((p) => allResults.push(p));

  // 2. Services
  SERVICE_CATEGORIES.forEach((sc: ServiceCategory) => {
    allResults.push({
      id: `svc-${sc.id}`,
      title: sc.title,
      subtitle: sc.purpose,
      category: 'Service',
      route: 'services',
      badge: sc.shortTitle,
      icon: <Sparkles className="w-4 h-4 text-purple-600" />
    });

    sc.services.forEach((sName: string, idx: number) => {
      allResults.push({
        id: `subsvc-${sc.id}-${idx}`,
        title: `${sc.shortTitle}: ${sName}`,
        subtitle: sc.description,
        category: 'Service',
        route: 'services',
        badge: 'Capability',
        icon: <Sparkles className="w-4 h-4 text-purple-500" />
      });
    });
  });

  // 3. Portfolio
  PORTFOLIO_PROJECTS.forEach((item: PortfolioProject) => {
    allResults.push({
      id: `port-${item.id}`,
      title: item.title,
      subtitle: `${item.typeBadge} • ${item.description}`,
      category: 'Portfolio',
      route: 'portfolio',
      badge: item.category,
      icon: <Briefcase className="w-4 h-4 text-amber-600" />
    });
  });

  // 4. Case Studies
  CASE_STUDIES.forEach((cs: CaseStudy) => {
    allResults.push({
      id: `cs-${cs.id}`,
      title: cs.title,
      subtitle: `${cs.clientCategory} • ${cs.summary}`,
      category: 'Case Study',
      route: 'case-studies',
      badge: cs.clientCategory,
      icon: <FileText className="w-4 h-4 text-emerald-600" />
    });
  });

  // 5. Insights
  INSIGHTS_ARTICLES.forEach((art: InsightArticle) => {
    allResults.push({
      id: `ins-${art.id}`,
      title: art.title,
      subtitle: art.excerpt,
      category: 'Insight',
      route: 'insights',
      badge: art.readTime,
      icon: <BookOpen className="w-4 h-4 text-rose-600" />
    });
  });

  // 6. FAQs
  FAQ_LIST.forEach((faq: FAQItem) => {
    allResults.push({
      id: `faq-${faq.id}`,
      title: faq.question,
      subtitle: faq.answer,
      category: 'FAQ',
      route: 'faq',
      badge: faq.category,
      icon: <HelpCircle className="w-4 h-4 text-neutral-500" />
    });
  });

  const filtered = allResults.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category.toLowerCase().replace(' ', '') === selectedCategory.toLowerCase().replace(' ', '');

    if (!matchesCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q))
    );
  });

  const handleSelect = (item: SearchResultItem) => {
    onNavigate(item.route);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/60 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-10 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-neutral-200/90 rounded-3xl shadow-2xl overflow-hidden mt-12 sm:mt-20">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center gap-3 bg-[#FAF9F6]">
          <Search className="w-5 h-5 text-rose-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search services, portfolio, case studies, insights, or FAQs..."
            className="flex-1 bg-transparent border-none text-sm sm:text-base text-neutral-900 placeholder-neutral-400 font-medium focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono font-bold text-neutral-500 bg-neutral-200/70 hover:bg-neutral-300 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-4 py-2.5 border-b border-neutral-100 bg-white flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'page', label: 'Pages' },
            { id: 'service', label: 'Services' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'casestudy', label: 'Case Studies' },
            { id: 'insight', label: 'Insights' },
            { id: 'faq', label: 'FAQs' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-2 divide-y divide-neutral-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Search className="w-8 h-8 text-neutral-300 mx-auto" />
              <p className="text-sm font-bold text-neutral-800">No matching brand assets found</p>
              <p className="text-xs text-neutral-500">
                Try searching for "naming", "trademark", "react", "case studies", or "Asim Khan"
              </p>
            </div>
          ) : (
            filtered.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3.5 group ${
                  selectedIndex === index ? 'bg-[#FAF8F5] border border-neutral-200/80' : 'hover:bg-neutral-50'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs shrink-0 mt-0.5">
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-rose-600 transition-colors truncate">
                      {item.title}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600">
                          {item.badge}
                        </span>
                      )}
                      <span className="text-[10px] font-mono font-bold text-rose-600 uppercase px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200/60">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
              </button>
            ))
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-3 bg-[#FAF9F6] border-t border-neutral-200/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded shadow-2xs font-bold text-neutral-800">
                ⌘K
              </kbd>
              <span>Toggle Search</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded shadow-2xs font-bold text-neutral-800">
                ESC
              </kbd>
              <span>Close</span>
            </span>
          </div>

          <div className="text-rose-600 font-bold">
            {filtered.length} {filtered.length === 1 ? 'Asset' : 'Assets'} Found
          </div>
        </div>

      </div>
    </div>
  );
};
