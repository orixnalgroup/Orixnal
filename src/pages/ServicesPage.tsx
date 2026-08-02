import React, { useState, useMemo } from 'react';
import { PageRoute } from '../types';
import { SERVICE_CATEGORIES, COMPANY_DETAILS } from '../data/brandData';
import { SUB_SERVICE_MODULES, SubServiceModule } from '../data/subServiceModules';
import { ServiceIllustration } from '../components/ServiceIllustrations';
import { ServicesFAQ } from '../components/ServicesFAQ';
import { ServiceRoadmap } from '../components/ServiceRoadmap';
import {
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  HelpCircle,
  Clock,
  Quote,
  Zap,
  Award,
  Search,
  Building2,
  Smartphone,
  Store,
  Tv,
  MessageSquare,
  Calculator,
  FileText,
  Lock,
  Scale,
  Palette,
  File,
  Package,
  Layers,
  Layout,
  Code,
  ShoppingCart,
  Cpu,
  Server,
  Compass,
  Users,
  Tag,
  Share2,
  BarChart3,
  MapPin,
  Megaphone,
  Calendar,
  Sliders,
  Map,
  Maximize,
  Video,
  Briefcase,
  RotateCcw,
  X,
  Layers3,
  Filter,
  Crown,
  Layers2
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
  initialCatId?: string;
}

// Icon mapper for sub-service modules
const ModuleIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-5 h-5 text-purple-700' }) => {
  const icons: Record<string, React.ElementType> = {
    Building2,
    Smartphone,
    Store,
    Tv,
    MessageSquare,
    ShieldCheck,
    Calculator,
    Award,
    FileText,
    Lock,
    Scale,
    Palette,
    File,
    Package,
    Layers,
    Layout,
    Code,
    ShoppingCart,
    Cpu,
    Server,
    Zap,
    Sparkles,
    TrendingUp,
    Compass,
    Users,
    Tag,
    Share2,
    BarChart3,
    MapPin,
    Megaphone,
    Calendar,
    Sliders,
    Map,
    Maximize,
    Video,
    Briefcase,
    Search,
    RotateCcw
  };

  const Component = icons[name] || Sparkles;
  return <Component className={className} />;
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onOpenAudit, initialCatId }) => {
  const [selectedCatId, setSelectedCatId] = useState<string | null>(initialCatId || null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubServiceModal, setActiveSubServiceModal] = useState<{
    subService: string;
    categoryTitle: string;
    moduleTitle: string;
  } | null>(null);

  const selectedCategory = SERVICE_CATEGORIES.find((c) => c.id === selectedCatId);

  // Flagship services IDs as per PRD
  const flagshipIds = ['naming', 'design', 'event'];

  // Categories for Flagship level
  const flagshipCategories = useMemo(() => {
    return SERVICE_CATEGORIES.filter((c) => flagshipIds.includes(c.id));
  }, []);

  // Categories for Ecosystem level
  const ecosystemCategories = useMemo(() => {
    return SERVICE_CATEGORIES.filter((c) => !flagshipIds.includes(c.id));
  }, []);

  // Filter ecosystem categories by filter buttons
  const filteredEcosystemCategories = useMemo(() => {
    if (activeFilter === 'all') return ecosystemCategories;
    return ecosystemCategories.filter((c) => c.id === activeFilter);
  }, [activeFilter, ecosystemCategories]);

  // Global search matching across all categories, modules, and sub-services
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase().trim();
    const results: Array<{
      category: typeof SERVICE_CATEGORIES[0];
      modules: Array<{ module: SubServiceModule; matchingItems: string[] }>;
    }> = [];

    SERVICE_CATEGORIES.forEach((cat) => {
      const modules = SUB_SERVICE_MODULES[cat.id] || [];
      const matchingModules: Array<{ module: SubServiceModule; matchingItems: string[] }> = [];

      modules.forEach((mod) => {
        const matchingItems = mod.items.filter(
          (item) =>
            item.toLowerCase().includes(query) ||
            mod.title.toLowerCase().includes(query) ||
            mod.description.toLowerCase().includes(query)
        );

        if (matchingItems.length > 0) {
          matchingModules.push({ module: mod, matchingItems });
        }
      });

      if (
        matchingModules.length > 0 ||
        cat.title.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query)
      ) {
        results.push({
          category: cat,
          modules: matchingModules.length > 0 ? matchingModules : modules.map((m) => ({ module: m, matchingItems: m.items }))
        });
      }
    });

    return results;
  }, [searchQuery]);

  // Total count of sub-services across all categories
  const totalSubServicesCount = useMemo(() => {
    return Object.values(SUB_SERVICE_MODULES).reduce((acc, modules) => {
      return acc + modules.reduce((mAcc, m) => mAcc + m.items.length, 0);
    }, 0);
  }, []);

  // Handler for clicking a sub-service item
  const handleSubServiceClick = (subService: string, categoryTitle: string, moduleTitle: string) => {
    setActiveSubServiceModal({ subService, categoryTitle, moduleTitle });
  };

  // If a specific category detail view is selected
  if (selectedCategory) {
    const modules = SUB_SERVICE_MODULES[selectedCategory.id] || [];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
          <button
            onClick={() => setSelectedCatId(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 hover:text-purple-700 transition-colors bg-white px-4 py-2 rounded-full border border-neutral-200/80 shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
            <span>ORIXNAL SERVICES</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-purple-800 font-bold uppercase">{selectedCategory.shortTitle}</span>
          </div>
        </div>

        {/* Pillar Header Banner */}
        <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-2xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                <span>{flagshipIds.includes(selectedCategory.id) ? 'Flagship Product Section' : 'Integrated Service Pillar'}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                {selectedCategory.title}
              </h1>
              <p className="text-lg font-semibold text-purple-800 italic">
                "{selectedCategory.tagline}"
              </p>
              <p className="text-base text-neutral-600 leading-relaxed pt-1">
                {selectedCategory.description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <button
                onClick={onOpenAudit}
                className="orixnal-gradient-bg text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-2xs hover:opacity-95 transition-all inline-flex items-center justify-center gap-2"
              >
                <span>Initiate {selectedCategory.shortTitle} Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={COMPANY_DETAILS.phoneRaw}
                  className="bg-white text-neutral-900 border border-neutral-300 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-700" />
                  <span>Call Us</span>
                </a>
                <a
                  href={COMPANY_DETAILS.emailRaw}
                  className="bg-white text-neutral-900 border border-neutral-300 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Mail className="w-3.5 h-3.5 text-purple-700" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Strategic Value Paragraph */}
          {selectedCategory.strategicValue && (
            <div className="pt-6 border-t border-neutral-100">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 mb-2">
                Strategic Partnership Advantage
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed bg-[#FAF9F6] p-5 rounded-2xl border border-neutral-200/80">
                {selectedCategory.strategicValue}
              </p>
            </div>
          )}
        </div>

        {/* Vector Illustration & Business Outcomes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Custom Illustration Component */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
              Interactive Architecture Representation
            </h3>
            <ServiceIllustration category={selectedCategory.id} className="w-full h-72" />

            {/* Witty Quote */}
            {selectedCategory.wittyQuote && (
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-purple-950 text-xs leading-relaxed flex items-start gap-3">
                <Quote className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-purple-900 mb-1">Founder's Note:</strong>
                  <span>"{selectedCategory.wittyQuote}"</span>
                </div>
              </div>
            )}
          </div>

          {/* Business Outcomes */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-neutral-200 p-8 rounded-3xl space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full w-fit border border-emerald-200/60">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quantifiable Business Outcomes</span>
              </div>

              <h2 className="text-2xl font-extrabold text-neutral-900">
                Why This Pillar Drives Balance Sheet Equity
              </h2>

              <div className="space-y-3 pt-2">
                {selectedCategory.businessOutcomes?.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-neutral-800 leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED SUB-SERVICE MODULES SECTION */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60 mb-2">
                <Layers3 className="w-3.5 h-3.5 text-purple-700" />
                <span>Modular Deliverable Architecture</span>
              </div>
              <h2 className="text-3xl font-extrabold text-neutral-900">
                Sub-Service Modules under {selectedCategory.title}
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Explore every specialized sub-service module included in this core pillar. Click any deliverable to initiate a targeted inquiry.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono bg-neutral-900 text-white px-4 py-2 rounded-xl font-bold">
                {modules.length} Specialized Modules
              </span>
              <span className="text-xs font-mono bg-purple-100 text-purple-900 px-4 py-2 rounded-xl font-bold">
                {selectedCategory.services.length} Total Deliverables
              </span>
            </div>
          </div>

          {/* Render Each Sub-Service Module Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod, mIdx) => (
              <div
                key={mod.id}
                className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs hover:border-purple-300 transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Module Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center justify-center shrink-0">
                        <ModuleIcon name={mod.iconName} className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/60">
                          Module 0{mIdx + 1}
                        </span>
                        <h3 className="text-lg font-extrabold text-neutral-900 mt-1">
                          {mod.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-neutral-500 font-semibold bg-neutral-100 px-2.5 py-1 rounded-lg shrink-0">
                      {mod.items.length} Items
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed border-b border-neutral-100 pb-3">
                    {mod.description}
                  </p>

                  {/* Sub-Service Items Grid */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                      Included Sub-Services
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {mod.items.map((item, iIdx) => (
                        <button
                          key={iIdx}
                          onClick={() => handleSubServiceClick(item, selectedCategory.title, mod.title)}
                          className="group/item flex items-center justify-between p-2.5 rounded-xl bg-[#FAF9F6] border border-neutral-200/70 hover:border-purple-300 hover:bg-purple-50/50 text-left transition-all text-xs font-medium text-neutral-800"
                        >
                          <div className="flex items-center gap-2 truncate pr-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 group-hover/item:text-purple-700 transition-colors" />
                            <span className="truncate group-hover/item:text-purple-900">{item}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-neutral-300 group-hover/item:text-purple-600 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Module Footer CTA */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-500">
                    Direct Founder Lead: Asim Khan
                  </span>
                  <button
                    onClick={onOpenAudit}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-3.5 py-1.5 rounded-xl transition-colors inline-flex items-center gap-1"
                  >
                    <span>Request Module Scope</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who Needs This - Self Diagnostic */}
        {selectedCategory.whoNeedsThis && (
          <div className="bg-[#FAF8F5] border border-neutral-200/90 rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-purple-800 bg-purple-100/80 px-3 py-1 rounded-full w-fit">
              <HelpCircle className="w-3.5 h-3.5 text-purple-700" />
              <span>Self-Diagnostic Assessment</span>
            </div>

            <h2 className="text-2xl font-extrabold text-neutral-900">
              When Should You Engage ORIXNAL for {selectedCategory.shortTitle}?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedCategory.whoNeedsThis.map((scenario, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-neutral-200/90 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                    S0{idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                    {scenario}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delivery Timeline / 4-Phase Process */}
        {selectedCategory.deliveryPhases && (
          <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-neutral-500 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-purple-700" />
              <span>4-Phase Delivery Framework</span>
            </div>

            <h2 className="text-2xl font-extrabold text-neutral-900">
              How ORIXNAL Delivers {selectedCategory.shortTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedCategory.deliveryPhases.map((phase) => (
                <div key={phase.phase} className="p-5 rounded-2xl bg-[#FAF9F6] border border-neutral-200 space-y-2">
                  <span className="text-xs font-mono font-bold text-purple-700 block">
                    PHASE {phase.phase}
                  </span>
                  <h4 className="text-sm font-extrabold text-neutral-900">{phase.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion Section */}
        <ServicesFAQ onOpenAudit={onOpenAudit} />

        {/* CTA Banner */}
        <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xs relative overflow-hidden">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-purple-700" />
            <span>Direct Founder-Led Execution</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to build {selectedCategory.shortTitle} with complete strategic clarity?
          </h3>

          <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Schedule a 1-on-1 discovery call directly with Founder Asim Khan. Zero sales pressure, purely strategic insight.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAudit}
              className="orixnal-gradient-bg text-white font-bold py-3.5 px-8 rounded-2xl text-sm shadow-2xs hover:opacity-95 transition-all inline-flex items-center gap-2"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={COMPANY_DETAILS.phoneRaw}
              className="bg-white text-neutral-900 border border-neutral-300 font-bold py-3.5 px-6 rounded-2xl text-sm hover:bg-neutral-50 transition-colors inline-flex items-center gap-2 shadow-2xs"
            >
              <Phone className="w-4 h-4 text-purple-700" />
              <span>Call Us</span>
            </a>

            <a
              href={COMPANY_DETAILS.emailRaw}
              className="bg-white text-neutral-900 border border-neutral-300 font-bold py-3.5 px-6 rounded-2xl text-sm hover:bg-neutral-50 transition-colors inline-flex items-center gap-2 shadow-2xs"
            >
              <Mail className="w-4 h-4 text-purple-700" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

        {/* SUB-SERVICE INQUIRY MODAL */}
        {activeSubServiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                    {activeSubServiceModal.categoryTitle}
                  </span>
                  <h3 className="text-xl font-extrabold text-neutral-900 mt-2">
                    {activeSubServiceModal.subService}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Module: {activeSubServiceModal.moduleTitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveSubServiceModal(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200/80 text-xs text-neutral-700 leading-relaxed">
                <p>
                  <strong>{activeSubServiceModal.subService}</strong> is executed directly under direct founder oversight. We combine Class 35/42 legal compliance, strategic brand positioning, and custom React engineering.
                </p>
                <div className="flex items-center gap-2 text-emerald-700 font-medium pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Available for individual engagement or full masterbrand retainer.</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveSubServiceModal(null);
                    onOpenAudit();
                  }}
                  className="orixnal-gradient-bg text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-2xs hover:opacity-95 transition-all flex-1 text-center inline-flex items-center justify-center gap-2"
                >
                  <span>Request Scope for {activeSubServiceModal.subService}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveSubServiceModal(null)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs py-3 px-5 rounded-2xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // MAIN SERVICES OVERVIEW PAGE (Two-Level Architecture)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 shadow-2xs space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" />
              <span>Two-Level Architecture</span>
            </div>
            <span className="text-xs font-mono font-bold bg-neutral-900 text-white px-3 py-1 rounded-full">
              3 Flagships • 5 Ecosystem Pillars
            </span>
            <span className="text-xs font-mono text-purple-700 font-bold bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
              {totalSubServicesCount}+ Sub-Services Cataloged
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight max-w-4xl">
            The ORIXNAL Brand Engineering System
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
            We architect sovereign, legally armored, and revenue-scaled masterbrands. Our services operate on a two-level architecture: standalone immersive <strong>Flagship Products</strong> paired with an <strong>Integrated Service Ecosystem</strong>.
          </p>
        </div>

        {/* Header Action Buttons & Search */}
        <div className="pt-2 border-t border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Global Live Search Bar */}
          <div className="relative max-w-xl w-full">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 500+ sub-services (e.g., 'Trademark', 'Shopify', 'Billboard', 'Stage')..."
              className="w-full bg-[#FAF9F6] border border-neutral-200 rounded-2xl pl-12 pr-10 py-3 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Direct Contact Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={COMPANY_DETAILS.phoneRaw}
              className="orixnal-gradient-bg text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs hover:opacity-95 transition-opacity"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Us</span>
            </a>
            <a
              href={COMPANY_DETAILS.emailRaw}
              className="bg-white text-neutral-900 border border-neutral-300 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs hover:bg-neutral-50 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-purple-700" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* SEARCH RESULTS VIEW (If user entered a query) */}
      {searchResults ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-700" />
              <h2 className="text-lg font-bold text-neutral-900">
                Search Results for "{searchQuery}"
              </h2>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-purple-700 hover:underline"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center space-y-3">
              <p className="text-base font-bold text-neutral-800">
                No exact sub-service found matching "{searchQuery}"
              </p>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                We handle custom brand development engagements across all categories. Contact Founder Asim Khan directly to inquire about custom scope.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={onOpenAudit}
                  className="orixnal-gradient-bg text-white font-bold text-xs px-6 py-3 rounded-2xl shadow-2xs"
                >
                  Request Custom Scope
                </button>
                <a
                  href={COMPANY_DETAILS.phoneRaw}
                  className="bg-white text-neutral-900 border border-neutral-300 font-bold text-xs px-5 py-3 rounded-2xl shadow-2xs hover:bg-neutral-50 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-700" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {searchResults.map(({ category, modules }) => (
                <div key={category.id} className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                        Category Match
                      </span>
                      <h3 className="text-2xl font-extrabold text-neutral-900 mt-1">
                        {category.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedCatId(category.id)}
                      className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-colors inline-flex items-center gap-1"
                    >
                      <span>Explore Pillar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {modules.map(({ module, matchingItems }) => (
                      <div key={module.id} className="bg-[#FAF9F6] p-5 rounded-2xl border border-neutral-200 space-y-3">
                        <div className="flex items-center gap-2">
                          <ModuleIcon name={module.iconName} className="w-4 h-4 text-purple-700" />
                          <h4 className="text-sm font-extrabold text-neutral-900">{module.title}</h4>
                        </div>
                        <p className="text-xs text-neutral-600">{module.description}</p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {matchingItems.map((item, iIdx) => (
                            <button
                              key={iIdx}
                              onClick={() => handleSubServiceClick(item, category.title, module.title)}
                              className="text-xs bg-white hover:bg-purple-50 text-neutral-800 hover:text-purple-900 border border-neutral-200 px-2.5 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-purple-600" />
                              <span>{item}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* LEVEL 1: FLAGSHIP SERVICES (Immersive, Independent Product Sections) */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-800 bg-purple-100/80 px-3 py-1 rounded-full w-fit">
                  <Crown className="w-3.5 h-3.5 text-purple-700" />
                  <span>Level 1: Flagship Services</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                  Immersive Product Sections
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Sovereign brand assets engineered as distinct, high-impact product experiences.
                </p>
              </div>

              <span className="text-xs font-mono text-purple-900 bg-purple-50 border border-purple-200 px-3.5 py-1.5 rounded-xl font-bold shrink-0">
                3 Independent Products
              </span>
            </div>

            {/* Render Each Flagship Section with Editorial Layout */}
            <div className="space-y-10">
              {flagshipCategories.map((category, idx) => {
                const modules = SUB_SERVICE_MODULES[category.id] || [];

                return (
                  <div
                    key={category.id}
                    className="bg-white border border-purple-200/90 rounded-3xl p-8 sm:p-12 shadow-2xs space-y-8 relative overflow-hidden group hover:border-purple-400 transition-all"
                  >
                    {/* Corner Accent Badge */}
                    <div className="absolute top-0 right-0 bg-purple-900 text-white font-mono text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                      Flagship Product 0{idx + 1}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Editorial Info */}
                      <div className="lg:col-span-7 space-y-6">
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
                            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                            <span>{category.shortTitle} Architecture</span>
                          </div>

                          <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                            {category.title}
                          </h3>

                          <p className="text-sm sm:text-base font-semibold text-purple-800 italic">
                            "{category.tagline}"
                          </p>
                        </div>

                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {category.description}
                        </p>

                        {/* Deliverables Highlights Pill Grid */}
                        <div className="space-y-2 pt-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                            Core Deliverables & Capabilities
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {category.services.slice(0, 6).map((service, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-xs font-medium bg-[#FAF9F6] border border-neutral-200 px-3 py-1.5 rounded-xl text-neutral-800 inline-flex items-center gap-1.5 shadow-2xs"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                                <span>{service}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Witty Quote */}
                        {category.wittyQuote && (
                          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-purple-950 text-xs leading-relaxed flex items-start gap-2.5">
                            <Quote className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold text-purple-900">Founder's Axiom: </strong>
                              <span>"{category.wittyQuote}"</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => setSelectedCatId(category.id)}
                            className="orixnal-gradient-bg text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-2xs hover:opacity-95 transition-all inline-flex items-center gap-2"
                          >
                            <span>Explore {category.title} Section</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <a
                            href={COMPANY_DETAILS.phoneRaw}
                            className="bg-white text-neutral-900 border border-neutral-300 font-bold text-xs px-4 py-3.5 rounded-2xl hover:bg-neutral-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                          >
                            <Phone className="w-3.5 h-3.5 text-purple-700" />
                            <span>Call Us</span>
                          </a>

                          <a
                            href={COMPANY_DETAILS.emailRaw}
                            className="bg-white text-neutral-900 border border-neutral-300 font-bold text-xs px-4 py-3.5 rounded-2xl hover:bg-neutral-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                          >
                            <Mail className="w-3.5 h-3.5 text-purple-700" />
                            <span>Email Us</span>
                          </a>
                        </div>
                      </div>

                      {/* Right Custom Vector Feature Showcase */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="bg-[#FAF8F5] p-2 rounded-3xl border border-neutral-200 shadow-2xs">
                          <ServiceIllustration category={category.id} className="w-full h-64 sm:h-72" />
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs text-neutral-600 font-mono">
                          <span>{modules.length} Specialized Sub-Modules</span>
                          <span className="text-purple-800 font-bold">100% Direct Founder Led</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* LEVEL 2: INTEGRATED SERVICE ECOSYSTEM */}
          <section className="space-y-8 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-800 bg-purple-100/80 px-3 py-1 rounded-full w-fit">
                  <Layers2 className="w-3.5 h-3.5 text-purple-700" />
                  <span>Level 2: Integrated Service Ecosystem</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                  Ecosystem Pillars & Specialized Modules
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600">
                  Secondary integrated capabilities powering legal defense, custom web engineering, growth engines, and campaigns.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeFilter === 'all'
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  All Ecosystem Pillars
                </button>
                {ecosystemCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeFilter === cat.id
                        ? 'bg-neutral-900 text-white shadow-2xs'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {cat.shortTitle}
                  </button>
                ))}
              </div>
            </div>

            {/* Ecosystem Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEcosystemCategories.map((category, idx) => {
                const modules = SUB_SERVICE_MODULES[category.id] || [];

                return (
                  <div
                    key={category.id}
                    className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-2xs hover:border-purple-300 transition-all flex flex-col justify-between space-y-6 group orixnal-card-hover"
                  >
                    <div className="space-y-5">
                      {/* Header Badges */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/60">
                          Ecosystem Pillar 0{idx + 1}
                        </span>
                        <span className="text-xs font-mono text-neutral-500 font-semibold bg-neutral-100 px-2.5 py-1 rounded-lg">
                          {modules.length} Modules ({category.services.length} Items)
                        </span>
                      </div>

                      {/* Title & Purpose */}
                      <div>
                        <h3 className="text-2xl font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-xs font-semibold text-purple-800 mt-1">
                          {category.purpose}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {category.description}
                      </p>

                      {/* Vector Graphic Thumbnail */}
                      <div className="pt-1">
                        <ServiceIllustration category={category.id} className="w-full h-40" />
                      </div>

                      {/* SUB-SERVICE MODULES PREVIEW */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
                            Sub-Service Modules Breakdown
                          </h4>
                          <span className="text-[10px] text-purple-700 font-mono font-bold">
                            {modules.length} Modules
                          </span>
                        </div>

                        <div className="space-y-2">
                          {modules.map((mod) => (
                            <div
                              key={mod.id}
                              className="p-3 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 hover:border-purple-200 transition-colors space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <ModuleIcon name={mod.iconName} className="w-3.5 h-3.5 text-purple-700" />
                                  <h5 className="text-xs font-bold text-neutral-900">{mod.title}</h5>
                                </div>
                                <span className="text-[10px] font-mono font-semibold text-neutral-400">
                                  {mod.items.length} items
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-500 line-clamp-1">
                                {mod.items.slice(0, 4).join(', ')}...
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedCatId(category.id)}
                        className="text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Explore Pillar</span>
                        <ChevronRight className="w-3.5 h-3.5 text-purple-700" />
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={onOpenAudit}
                          className="orixnal-gradient-bg text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xs hover:opacity-95 transition-all"
                        >
                          Enquire Scope
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Visual Brand Development Roadmap Component */}
      <ServiceRoadmap onOpenAudit={onOpenAudit} />

      {/* Strategic Comparison Box */}
      <div className="bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
            The ORIXNAL Distinction
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Why Our Two-Level System Lives Under One Roof
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Hiring separate vendors for naming, legal trademarking, web coding, and ad management creates fragmented messaging and costly handoff friction. ORIXNAL unifies strategy, legal defense, design dialects, and custom code under direct founder leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-purple-700" />
            <h4 className="text-sm font-bold text-neutral-900">Integrated Legal Defense</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every name, logotype, and design token is checked for trademark clearance and Class 35/42 availability under our Ministry of MSME registration.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2 shadow-2xs">
            <Zap className="w-5 h-5 text-purple-700" />
            <h4 className="text-sm font-bold text-neutral-900">Bespoke React Code</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Zero bloated page-builders or slow templates. High-performance, sub-second web platforms built for SEO and conversion.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 space-y-2 shadow-2xs">
            <Award className="w-5 h-5 text-amber-600" />
            <h4 className="text-sm font-bold text-neutral-900">Direct Founder Oversight</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              No junior account manager handoffs. You work directly with Founder & Chief Strategist Asim Khan from start to launch.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <ServicesFAQ onOpenAudit={onOpenAudit} />

      {/* CTA Box */}
      <div className="bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xs">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
          Need a Custom Multi-Pillar Engagement?
        </h3>
        <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Speak with Founder Asim Khan directly to architect a bespoke brand development retainer or masterbrand launch scope.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenAudit}
            className="orixnal-gradient-bg text-white font-bold py-3.5 px-8 rounded-2xl text-sm shadow-2xs hover:opacity-95 transition-all inline-flex items-center gap-2"
          >
            <span>Request Brand Discovery Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={COMPANY_DETAILS.phoneRaw}
            className="bg-white text-neutral-900 border border-neutral-300 font-bold py-3.5 px-6 rounded-2xl text-sm hover:bg-neutral-50 transition-colors inline-flex items-center gap-2 shadow-2xs"
          >
            <Phone className="w-4 h-4 text-purple-700" />
            <span>Call Us</span>
          </a>
          <a
            href={COMPANY_DETAILS.emailRaw}
            className="bg-white text-neutral-900 border border-neutral-300 font-bold py-3.5 px-6 rounded-2xl text-sm hover:bg-neutral-50 transition-colors inline-flex items-center gap-2 shadow-2xs"
          >
            <Mail className="w-4 h-4 text-purple-700" />
            <span>Email Us</span>
          </a>
        </div>
      </div>

      {/* SUB-SERVICE INQUIRY MODAL */}
      {activeSubServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs">
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                  {activeSubServiceModal.categoryTitle}
                </span>
                <h3 className="text-xl font-extrabold text-neutral-900 mt-2">
                  {activeSubServiceModal.subService}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Module: {activeSubServiceModal.moduleTitle}
                </p>
              </div>
              <button
                onClick={() => setActiveSubServiceModal(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200/80 text-xs text-neutral-700 leading-relaxed">
              <p>
                <strong>{activeSubServiceModal.subService}</strong> is executed under direct founder leadership. We combine legal compliance, strategic brand positioning, and custom engineering.
              </p>
              <div className="flex items-center gap-2 text-emerald-700 font-medium pt-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Available for standalone projects or integrated masterbrand retainers.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveSubServiceModal(null);
                  onOpenAudit();
                }}
                className="orixnal-gradient-bg text-white font-bold text-xs py-3 px-6 rounded-2xl shadow-2xs hover:opacity-95 transition-all flex-1 text-center inline-flex items-center justify-center gap-2"
              >
                <span>Request Scope for {activeSubServiceModal.subService}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveSubServiceModal(null)}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs py-3 px-5 rounded-2xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
