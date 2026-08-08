import React, { useState, useEffect, useRef } from 'react';
import { PageRoute } from '../types';
import { Logo } from './Logo';
import { COMPANY_DETAILS } from '../data/brandData';
import {
  Menu,
  X,
  Phone,
  Mail,
  Sparkles,
  ArrowUpRight,
  Search,
  ShieldCheck,
  ChevronDown,
  Building2,
  Users,
  Layers,
  FileText,
  Briefcase,
  Compass,
  Palette,
  Code,
  TrendingUp,
  Award
} from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenAudit, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuKey: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mobile navigation links list
  const mobileNavLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About Orixnal', route: 'about' },
    { label: 'About the Founder', route: 'founder' },
    { label: 'Services', route: 'services' },
    { label: 'Events', route: 'events' },
    { label: 'Blog', route: 'blog' },
    { label: 'Case Studies', route: 'case-studies' },
    { label: 'Insights', route: 'insights' },
    { label: 'Industries', route: 'industries' },
    { label: 'Portfolio', route: 'portfolio' },
    { label: 'Foooz', route: 'foooz' },
    { label: 'FAQ', route: 'faq' },
    { label: 'Contact', route: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-neutral-200/80 shadow-sm'
          : 'bg-[#FAF9F6] border-b border-neutral-200/40'
      }`}
    >
      {/* Top Registration Bar */}
      <div className="bg-purple-50/90 text-purple-950 text-[11px] sm:text-xs py-1.5 px-4 border-b border-purple-200/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 bg-purple-200/80 text-purple-900 font-mono font-bold text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full border border-purple-300 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
              MINISTRY OF MSME
            </span>
            <span className="text-purple-900 font-medium truncate">
              Registered under <strong className="text-purple-950 font-bold">Ministry of Micro, Small and Medium Enterprises</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
            <span className="hidden sm:inline-block text-purple-800 font-semibold">Reg No:</span>
            <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-md border border-emerald-300 tracking-wider shadow-2xs">
              {COMPANY_DETAILS.udyamNumber}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Official Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="navbar-logo-container flex items-center gap-2 group text-left focus:outline-none shrink-0 min-w-fit"
            aria-label="ORIXNAL Home"
          >
            <Logo variant="full" size="md" className="shrink-0" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* HOME */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-tight transition-all shrink-0 ${
                currentRoute === 'home'
                  ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              Home
            </a>

            {/* ABOUT US ▾ */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('about')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-tight transition-all ${
                  currentRoute === 'about' || currentRoute === 'founder'
                    ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 mt-1.5 w-64 bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl p-2 shadow-xl shadow-purple-950/10 z-50 animate-fadeIn">
                  <a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('about');
                    }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                      currentRoute === 'about'
                        ? 'bg-purple-50 text-purple-950 font-bold border border-purple-200/60'
                        : 'hover:bg-neutral-100/90 text-neutral-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 mt-0.5 shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">About Orixnal</div>
                      <div className="text-[11px] text-neutral-500 font-normal leading-snug">
                        Company overview, philosophy & strategic clarity
                      </div>
                    </div>
                  </a>

                  <a
                    href="/founder"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('founder');
                    }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                      currentRoute === 'founder'
                        ? 'bg-purple-50 text-purple-950 font-bold border border-purple-200/60'
                        : 'hover:bg-neutral-100/90 text-neutral-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 mt-0.5 shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">About the Founder</div>
                      <div className="text-[11px] text-neutral-500 font-normal leading-snug">
                        Meet Asim Khan, Founder & Chief Brand Strategist
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* SERVICES ▾ */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('services');
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-tight transition-all ${
                  currentRoute === 'services'
                    ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'services' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-1.5 w-80 bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl p-2.5 shadow-xl shadow-purple-950/10 z-50 animate-fadeIn">
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('services');
                    }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all mb-1 ${
                      currentRoute === 'services'
                        ? 'bg-purple-100/80 text-purple-950 font-bold border border-purple-200'
                        : 'hover:bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    <div className="p-2 rounded-lg orixnal-gradient-bg text-white mt-0.5 shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold">All Services Overview</div>
                      <div className="text-[11px] text-neutral-600 font-medium leading-snug">
                        Explore complete suite of brand capabilities
                      </div>
                    </div>
                  </a>

                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-t border-neutral-200/60 mt-1 pt-2">
                    Service Pillars & Sub-Services
                  </div>

                  <div className="space-y-0.5">
                    <a
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('services');
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-neutral-100 text-neutral-800 transition-all text-xs font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>Brand Naming (ORIXNAL NAME)</span>
                    </a>

                    <a
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('services');
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-neutral-100 text-neutral-800 transition-all text-xs font-semibold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>Brand IP & Compliance (ORIXNAL LEGAL)</span>
                    </a>

                    <a
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('services');
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-neutral-100 text-neutral-800 transition-all text-xs font-semibold"
                    >
                      <Palette className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>Visual & Identity Systems</span>
                    </a>

                    <a
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('services');
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-neutral-100 text-neutral-800 transition-all text-xs font-semibold"
                    >
                      <Code className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>Web & App Development</span>
                    </a>

                    <a
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('services');
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-neutral-100 text-neutral-800 transition-all text-xs font-semibold"
                    >
                      <TrendingUp className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>Marketing & PR (ORIXNAL GROWTH)</span>
                    </a>

                    <a
                      href="/services"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('services');
                      }}
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-neutral-100 text-neutral-800 transition-all text-xs font-semibold"
                    >
                      <Compass className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span>Brand Strategy & Advisory</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* EVENTS */}
            <a
              href="/events"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('events');
              }}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-tight transition-all shrink-0 ${
                currentRoute === 'events'
                  ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              Events
            </a>

            {/* INSIGHTS ▾ */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('insights')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('insights');
                }}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-tight transition-all ${
                  currentRoute === 'blog' || currentRoute === 'case-studies' || currentRoute === 'insights'
                    ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                <span>Insights</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === 'insights' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'insights' && (
                <div className="absolute top-full left-0 mt-1.5 w-72 bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl p-2 shadow-xl shadow-purple-950/10 z-50 animate-fadeIn">
                  <a
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('blog');
                    }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                      currentRoute === 'blog'
                        ? 'bg-purple-50 text-purple-950 font-bold border border-purple-200/60'
                        : 'hover:bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 mt-0.5 shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Blog</div>
                      <div className="text-[11px] text-neutral-500 font-normal leading-snug">
                        Articles & thought leadership on brand building
                      </div>
                    </div>
                  </a>

                  <a
                    href="/case-studies"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('case-studies');
                    }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                      currentRoute === 'case-studies'
                        ? 'bg-purple-50 text-purple-950 font-bold border border-purple-200/60'
                        : 'hover:bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 mt-0.5 shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Case Studies</div>
                      <div className="text-[11px] text-neutral-500 font-normal leading-snug">
                        Analysis of real client transformations
                      </div>
                    </div>
                  </a>

                  <a
                    href="/insights"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('insights');
                    }}
                    className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                      currentRoute === 'insights'
                        ? 'bg-purple-50 text-purple-950 font-bold border border-purple-200/60'
                        : 'hover:bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800 mt-0.5 shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Insights</div>
                      <div className="text-[11px] text-neutral-500 font-normal leading-snug">
                        Strategic frameworks, research & tools
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* INDUSTRIES */}
            <a
              href="/industries"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('industries');
              }}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-tight transition-all shrink-0 ${
                currentRoute === 'industries'
                  ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              Industries
            </a>

            {/* PORTFOLIO */}
            <a
              href="/portfolio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('portfolio');
              }}
              className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-tight transition-all shrink-0 ${
                currentRoute === 'portfolio'
                  ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              Portfolio
            </a>

            {/* FOOOZ */}
            <a
              href="/foooz"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('foooz');
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-tight transition-all shrink-0 ${
                currentRoute === 'foooz'
                  ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                  : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              <span>Foooz</span>
              <span className="px-1.5 py-0.2 text-[9px] font-extrabold bg-amber-100 text-amber-900 rounded-full border border-amber-200">
                Food
              </span>
            </a>
          </nav>

          {/* Right Direct CTAs (Search, Contact / Call Us, Brand Audit) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-white hover:bg-neutral-100/90 px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-2xs transition-all"
              title="Quick Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden xl:inline">Search...</span>
              <kbd className="px-1.5 py-0.2 text-[10px] font-mono bg-neutral-100 border border-neutral-300 rounded text-neutral-500 font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Contact */}
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className={`text-xs font-bold transition-all px-3 py-1.5 rounded-lg border border-neutral-200/80 bg-white shadow-2xs ${
                currentRoute === 'contact'
                  ? 'text-purple-700 border-purple-300 font-extrabold bg-purple-50'
                  : 'text-neutral-800 hover:text-purple-700'
              }`}
            >
              Contact
            </a>

            {/* Call Us */}
            <a
              href={COMPANY_DETAILS.phoneRaw}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-purple-700 transition-colors px-3 py-1.5 rounded-lg border border-neutral-200/80 bg-white shadow-2xs"
              title="Click to call ORIXNAL directly (+91 8447561650)"
            >
              <Phone className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden xl:inline">Call Us</span>
            </a>

            {/* Brand Audit */}
            <button
              onClick={onOpenAudit}
              className="orixnal-gradient-bg text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:opacity-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Brand Audit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-rose-600 bg-rose-50 rounded-full border border-rose-200"
              title="Search Assets"
            >
              <Search className="w-4 h-4" />
            </button>

            <a
              href={COMPANY_DETAILS.phoneRaw}
              className="p-2 text-purple-700 bg-purple-50 rounded-full border border-purple-200"
              title="Call Founder"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 bg-white rounded-xl border border-neutral-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FAF9F6] border-b border-neutral-200 shadow-xl p-6 z-50 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Navigation Menu
            </div>
            {mobileNavLinks.map((link) => {
              const href = link.route === 'home' ? '/' : `/${link.route}`;
              return (
                <a
                  key={link.route}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.route);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all ${
                    currentRoute === link.route
                      ? 'orixnal-gradient-bg text-white shadow-sm'
                      : 'bg-white text-neutral-800 border border-neutral-200/60 hover:bg-neutral-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              );
            })}

            <div className="pt-4 border-t border-neutral-200 mt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAudit();
                }}
                className="w-full orixnal-gradient-bg text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Brand Audit Estimator</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={COMPANY_DETAILS.phoneRaw}
                  className="bg-white border border-neutral-200 text-neutral-900 text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-purple-700" />
                  <span>Call Us</span>
                </a>
                <a
                  href={COMPANY_DETAILS.emailRaw}
                  className="bg-white border border-neutral-200 text-neutral-900 text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-purple-700" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
