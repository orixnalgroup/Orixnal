import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { Logo } from './Logo';
import { COMPANY_DETAILS } from '../data/brandData';
import { Menu, X, Phone, Mail, Sparkles, ArrowUpRight, Search, ShieldCheck, Lock } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
  onOpenSearch: () => void;
  onOpenChat?: () => void;
  onOpenAdminLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenAudit, onOpenSearch, onOpenChat, onOpenAdminLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Founder', route: 'founder' },
    { label: 'Services', route: 'services' },
    { label: 'Events', route: 'events' },
    { label: 'Blog', route: 'blog' },
    { label: 'Case Studies', route: 'case-studies' },
    { label: 'Portfolio', route: 'portfolio' },
    { label: 'Insights', route: 'insights' },
    { label: 'Industries', route: 'industries' },
    { label: 'Foooz', route: 'foooz' },
    { label: 'FAQ', route: 'faq' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="ORIXNAL Home"
          >
            <Logo variant="full" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all ${
                    active
                      ? 'orixnal-gradient-bg text-white shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {link.label}
                  {link.route === 'foooz' && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold bg-amber-100 text-amber-800 rounded-full">
                      Food
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Direct CTAs (Search, Call & Email) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-100/80 px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-2xs transition-all"
              title="Quick Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden xl:inline">Search...</span>
              <kbd className="px-1.5 py-0.2 text-[10px] font-mono bg-neutral-100 border border-neutral-300 rounded text-neutral-500 font-bold">
                ⌘K
              </kbd>
            </button>

            <a
              href={COMPANY_DETAILS.phoneRaw}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-purple-700 transition-colors px-3 py-1.5 rounded-lg border border-neutral-200/80 bg-white shadow-2xs"
              title="Click to call ORIXNAL directly (+91 8447561650)"
            >
              <Phone className="w-3.5 h-3.5 text-purple-700" />
              <span>Call Us</span>
            </a>

            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full border border-purple-200 shadow-2xs transition-all"
                title="Ask ORIXNAL AI Strategic Advisor"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                <span>AI Advisor</span>
              </button>
            )}

            {onOpenAdminLogin && (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 hover:text-purple-900 bg-white hover:bg-neutral-100/90 px-3 py-1.5 rounded-full border border-neutral-300 shadow-2xs transition-all"
                title="Official ORIXNAL Enterprise Admin Portal"
              >
                <Lock className="w-3.5 h-3.5 text-purple-700" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              onClick={onOpenAudit}
              className="orixnal-gradient-bg text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:opacity-95 transition-all flex items-center gap-1.5"
            >
              <span>Brand Audit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="p-2 text-purple-700 bg-purple-50 rounded-full border border-purple-200"
                title="Ask AI Advisor"
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
              </button>
            )}
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
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all ${
                  currentRoute === link.route
                    ? 'orixnal-gradient-bg text-white shadow-sm'
                    : 'bg-white text-neutral-800 border border-neutral-200/60 hover:bg-neutral-100'
                }`}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </button>
            ))}

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

              {onOpenAdminLogin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full bg-white border border-neutral-300 text-neutral-900 font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs shadow-2xs hover:bg-neutral-50"
                >
                  <Lock className="w-4 h-4 text-purple-700" />
                  <span>Admin Portal Login</span>
                </button>
              )}

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
