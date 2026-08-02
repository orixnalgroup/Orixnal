import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLIENTS_PARTNERS_LIST, SUCCESS_PROJECTS_LIST, ClientPartner, SuccessProject } from '../data/clientsData';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Building2,
  Tv,
  Radio,
  ShoppingBag,
  PhoneCall,
  Film,
  Trophy,
  Landmark,
  CheckCircle2,
  ChevronRight,
  Search,
  ExternalLink,
  Layers,
  Users,
  Megaphone,
  Briefcase,
  Filter,
  X,
  RotateCcw
} from 'lucide-react';

interface ClientTrustCarouselProps {
  onOpenAudit?: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Media & Broadcast': <Tv className="w-4 h-4 text-purple-600" />,
  'D2C & Retail': <ShoppingBag className="w-4 h-4 text-amber-600" />,
  'Real Estate & Infrastructure': <Building2 className="w-4 h-4 text-blue-600" />,
  'Telecom & Tech': <PhoneCall className="w-4 h-4 text-emerald-600" />,
  'Institutions & Public': <Landmark className="w-4 h-4 text-rose-600" />,
  'Healthcare & Health': <ShieldCheck className="w-4 h-4 text-teal-600" />,
  'Entertainment & Media': <Film className="w-4 h-4 text-indigo-600" />
};

const CATEGORY_FILTERS = [
  { id: 'All', label: 'All Categories', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'Marketing', label: 'Marketing', icon: <Megaphone className="w-3.5 h-3.5 text-amber-500" /> },
  { id: 'Film/Events', label: 'Film & Events', icon: <Film className="w-3.5 h-3.5 text-rose-500" /> },
  { id: 'Consulting', label: 'Consulting & Public', icon: <Landmark className="w-3.5 h-3.5 text-blue-500" /> },
  { id: 'Media & Broadcast', label: 'Media & Broadcast', icon: <Tv className="w-3.5 h-3.5 text-purple-500" /> },
  { id: 'Real Estate & Infra', label: 'Real Estate & Infra', icon: <Building2 className="w-3.5 h-3.5 text-cyan-500" /> },
  { id: 'Telecom & Tech', label: 'Telecom & Tech', icon: <PhoneCall className="w-3.5 h-3.5 text-emerald-500" /> },
  { id: 'D2C & Retail', label: 'D2C & Retail', icon: <ShoppingBag className="w-3.5 h-3.5 text-indigo-500" /> },
  { id: 'Healthcare', label: 'Healthcare', icon: <ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> },
];

export const ClientTrustCarousel: React.FC<ClientTrustCarouselProps> = ({ onOpenAudit }) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Projects' | 'Clients'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<SuccessProject | null>(null);

  // Duplicated list for smooth infinite ticker
  const tickerClients = [...CLIENTS_PARTNERS_LIST, ...CLIENTS_PARTNERS_LIST, ...CLIENTS_PARTNERS_LIST];

  // Helper matching logic for categories
  const matchesCategory = (item: { category: string; filterGroups?: string[] }, cat: string) => {
    if (cat === 'All') return true;
    if (item.filterGroups && item.filterGroups.includes(cat)) return true;
    if (item.category === cat) return true;
    if (cat === 'Marketing' && (item.category.includes('Marketing') || item.category.includes('IPL') || item.category.includes('BTL') || item.category.includes('D2C'))) return true;
    if (cat === 'Film/Events' && (item.category.includes('Film') || item.category.includes('Events') || item.category.includes('Pageants') || item.category.includes('Entertainment') || item.category.includes('Culture'))) return true;
    if (cat === 'Consulting' && (item.category.includes('Institutions') || item.category.includes('Public') || item.category.includes('National'))) return true;
    if (cat === 'Real Estate & Infra' && (item.category.includes('Real Estate') || item.category.includes('Infrastructure'))) return true;
    if (cat === 'Telecom & Tech' && (item.category.includes('Telecom') || item.category.includes('Tech'))) return true;
    if (cat === 'D2C & Retail' && (item.category.includes('D2C') || item.category.includes('Retail'))) return true;
    if (cat === 'Healthcare' && (item.category.includes('Healthcare') || item.category.includes('Health'))) return true;
    return false;
  };

  // Helper to count total matching items for a category pill
  const getCategoryCount = (catId: string) => {
    const projCount = SUCCESS_PROJECTS_LIST.filter(p => matchesCategory(p, catId)).length;
    const clientCount = CLIENTS_PARTNERS_LIST.filter(c => matchesCategory(c, catId)).length;
    return projCount + clientCount;
  };

  // Filter clients
  const filteredClients = CLIENTS_PARTNERS_LIST.filter((client) => {
    const matchesCat = matchesCategory(client, selectedCategory);
    const matchesSearch =
      !searchQuery.trim() ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.tagline && client.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Filter projects
  const filteredProjects = SUCCESS_PROJECTS_LIST.filter((proj) => {
    const matchesCat = matchesCategory(proj, selectedCategory);
    const matchesSearch =
      !searchQuery.trim() ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proj.associatedWith && proj.associatedWith.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const isFilterActive = selectedCategory !== 'All' || searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-neutral-200/80 overflow-hidden relative">
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold tracking-tight">
            <Award className="w-3.5 h-3.5 text-purple-700" />
            <span>CLIENT TRUST & PROVEN IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
            Trusted by <span className="orixnal-gradient-text">Industry Leaders, Media Giants</span> & Public Enterprises
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            From official marketing agency for international film festivals and sports IPL activations to strategic brand engineering for national broadcasts and consumer retail leaders.
          </p>

          {/* Quick Stats Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-neutral-800">
            <div className="flex items-center gap-2 bg-[#FAF9F6] px-4 py-2 rounded-2xl border border-neutral-200">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>15+ Strategic Enterprise Clients</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF9F6] px-4 py-2 rounded-2xl border border-neutral-200">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>7 Flagship Public Campaigns</span>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF9F6] px-4 py-2 rounded-2xl border border-neutral-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Trademark Clearance</span>
            </div>
          </div>
        </div>

        {/* 1. INFINITE AUTO-SCROLLING CLIENT MARQUEE CAROUSEL */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-500 px-2">
            <span className="flex items-center gap-2 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Partner & Client Network (Auto-Scrolling)
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-purple-700">
              Hover to pause ticker
            </span>
          </div>

          {/* Marquee Wrapper */}
          <div className="relative w-full overflow-hidden rounded-3xl bg-neutral-950 p-6 sm:p-8 border border-neutral-800 shadow-xl group">
            {/* Gradient Fades on Left & Right */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <div className="flex gap-4 sm:gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
              {tickerClients.map((client, idx) => (
                <div
                  key={`${client.id}-${idx}`}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-purple-500/50 rounded-2xl p-4 sm:p-5 w-64 sm:w-72 shrink-0 transition-all hover:scale-[1.02] shadow-sm flex flex-col justify-between space-y-3 cursor-pointer"
                  onClick={() => setSearchQuery(client.name)}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-neutral-800 rounded-xl border border-neutral-700 shrink-0">
                        {CATEGORY_ICONS[client.category] || <Briefcase className="w-4 h-4 text-purple-400" />}
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold text-neutral-400 truncate max-w-[120px]">
                        {client.category}
                      </span>
                    </div>
                    {client.badge && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-purple-950 text-purple-300 border border-purple-800/80 px-2 py-0.5 rounded-full shrink-0">
                        {client.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
                      {client.name}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                      {client.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-bold text-purple-400">
                    <span>Verified Associate</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. SUCCESS STORIES & FULL CLIENT DIRECTORY CONTROLS */}
        <div className="pt-8 border-t border-neutral-200/80 space-y-6">
          {/* Top Control Bar: View Tabs + Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#FAF9F6] p-3 sm:p-4 rounded-3xl border border-neutral-200">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('All')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'All'
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                All Success Stories & Clients
              </button>
              <button
                onClick={() => setActiveTab('Projects')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'Projects'
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                Projects & Campaigns ({filteredProjects.length})
              </button>
              <button
                onClick={() => setActiveTab('Clients')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === 'Clients'
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                Clients & Associates ({filteredClients.length})
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 lg:max-w-xs">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brand, movie, event..."
                className="w-full bg-white border border-neutral-200 text-neutral-900 text-xs rounded-2xl pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-neutral-500 px-1">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px] text-purple-900 font-mono">
                <Filter className="w-3.5 h-3.5 text-purple-600" />
                <span>Filter By Sector / Category</span>
              </span>
              {isFilterActive && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[11px] text-rose-600 font-bold hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
              {CATEGORY_FILTERS.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = getCategoryCount(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-purple-950 text-white border-purple-800 shadow-md ring-2 ring-purple-500/30'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-purple-800 text-purple-100'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Summary Badge */}
          {isFilterActive && (
            <div className="flex flex-wrap items-center justify-between gap-3 bg-purple-50 border border-purple-200/80 px-4 py-2.5 rounded-2xl text-xs font-medium text-purple-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>
                  Showing <strong>{filteredProjects.length} Success Stories</strong> & <strong>{filteredClients.length} Clients</strong>
                  {selectedCategory !== 'All' && <> under <strong>"{selectedCategory}"</strong></>}
                  {searchQuery && <> matching <strong>"{searchQuery}"</strong></>}
                </span>
              </div>
              <button
                onClick={resetFilters}
                className="text-purple-700 hover:text-purple-900 font-bold underline text-[11px] shrink-0"
              >
                Clear
              </button>
            </div>
          )}

          {/* Empty Search / Category Results State */}
          {filteredProjects.length === 0 && filteredClients.length === 0 && (
            <div className="text-center py-12 px-4 bg-[#FAF9F6] rounded-3xl border border-dashed border-neutral-300 space-y-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-neutral-900">No matching projects or clients found</h4>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  Try selecting a different category or clearing your search term to view full portfolio entries.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-950 text-white font-bold text-xs hover:bg-neutral-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* PROJECTS & SUCCESS STORIES GRID */}
          {(activeTab === 'All' || activeTab === 'Projects') && filteredProjects.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-950 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Key Projects & Public Campaigns
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Notable brand activations, film festivals, sports marketing, and cultural projects.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                  {filteredProjects.length} Projects
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FAF9F6] border border-neutral-200 rounded-3xl p-6 hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full border border-purple-200">
                          {project.category}
                        </span>
                        {project.associatedWith && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                            w/ {project.associatedWith}
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg font-extrabold text-neutral-950 group-hover:text-purple-700 transition-colors leading-snug">
                        {project.title}
                      </h4>

                      <div className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{project.role}</span>
                      </div>

                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      <div className="pt-2 space-y-1.5">
                        <div className="text-[10px] uppercase font-mono font-bold text-neutral-400">
                          Key Impact Highlights
                        </div>
                        {project.highlights.map((item, i) => (
                          <div key={i} className="text-xs text-neutral-800 font-medium flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between text-xs font-bold text-purple-700">
                      <span>ORIXNAL Strategic Delivery</span>
                      <button
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-1 hover:underline text-purple-900"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* CLIENTS & ASSOCIATES DIRECTORY GRID */}
          {(activeTab === 'All' || activeTab === 'Clients') && filteredClients.length > 0 && (
            <div className="space-y-6 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-950 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    Clients, Associates & Brand Partners
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Complete listing of television networks, D2C brands, real estate groups, and public trusts.
                  </p>
                </div>

                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200 shrink-0">
                  {filteredClients.length} Clients
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filteredClients.map((client) => (
                  <motion.div
                    key={client.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs hover:border-purple-400 hover:shadow-sm transition-all flex flex-col justify-between space-y-2 group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="p-1.5 bg-neutral-100 rounded-lg">
                        {CATEGORY_ICONS[client.category] || <Briefcase className="w-3.5 h-3.5 text-neutral-600" />}
                      </div>
                      <span className="text-[9px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full uppercase">
                        {client.badge || 'Partner'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-neutral-950 group-hover:text-purple-700 transition-colors">
                        {client.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">
                        {client.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 text-[10px] font-mono font-bold text-purple-700 flex items-center justify-between">
                      <span>{client.category}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="bg-gradient-to-r from-neutral-950 via-purple-950 to-neutral-950 text-white p-8 rounded-3xl border border-purple-900/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>ELEVATE YOUR BRAND ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Ready to Join Our Success Roster?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl">
                Schedule a confidential 1-on-1 strategic brand audit directly with Founder Asim Khan.
              </p>
            </div>

            {onOpenAudit && (
              <button
                onClick={onOpenAudit}
                className="orixnal-gradient-bg text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg hover:opacity-95 transition-opacity shrink-0 flex items-center gap-2"
              >
                <span>Request Brand Audit</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white border border-neutral-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 p-1 rounded-lg"
              >
                ✕
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase bg-purple-100 text-purple-900 px-3 py-1 rounded-full">
                  {activeProject.category}
                </span>
                <h3 className="text-xl font-black text-neutral-950 mt-1">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-purple-800 font-bold">
                  {activeProject.role}
                </p>
              </div>

              <p className="text-xs text-neutral-700 leading-relaxed">
                {activeProject.description}
              </p>

              <div className="space-y-2 bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200">
                <div className="text-xs font-bold text-neutral-900">Key Execution Achievements:</div>
                <ul className="space-y-1.5">
                  {activeProject.highlights.map((h, idx) => (
                    <li key={idx} className="text-xs text-neutral-700 flex items-start gap-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="w-full bg-neutral-950 text-white font-bold py-3 rounded-xl text-xs hover:bg-neutral-800 transition-colors"
              >
                Close Project Summary
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Marquee Animation Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </section>
  );
};
