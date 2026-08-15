import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute } from './types';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { BrandAuditModal } from './components/BrandAuditModal';
import { SearchModal } from './components/SearchModal';
import { IndependenceDayPopup } from './components/IndependenceDayPopup';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FounderPage } from './pages/FounderPage';
import { ServicesPage } from './pages/ServicesPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { InsightsPage } from './pages/InsightsPage';
import { BlogPage } from './pages/BlogPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { FooozPage } from './pages/FooozPage';
import { EventsPage } from './pages/EventsPage';
import { CareersPage } from './pages/CareersPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

const ROUTE_ORDER: PageRoute[] = [
  'home',
  'about',
  'founder',
  'services',
  'events',
  'blog',
  'case-studies',
  'portfolio',
  'insights',
  'industries',
  'foooz',
  'careers',
  'faq',
  'contact',
  'privacy',
  'terms'
];

const pageVariants = {
  enter: {
    opacity: 0,
    y: 8,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [direction, setDirection] = useState<number>(1);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to extract valid route from URL path or hash
  const getRouteFromUrl = (): PageRoute => {
    // Check hash first for backward compatibility with old links like /#/about or /#about
    const hashRaw = window.location.hash.replace('#/', '').replace('#', '').trim();
    if (hashRaw && (ROUTE_ORDER as string[]).includes(hashRaw)) {
      // Migrate hash to clean path silently
      const cleanPath = hashRaw === 'home' ? '/' : `/${hashRaw}`;
      window.history.replaceState(null, '', cleanPath);
      return hashRaw as PageRoute;
    }

    // Check clean pathname
    const pathRaw = window.location.pathname.replace(/^\//, '').trim();
    if (!pathRaw || pathRaw === 'index.html') {
      return 'home';
    }

    if ((ROUTE_ORDER as string[]).includes(pathRaw)) {
      return pathRaw as PageRoute;
    }

    return 'not-found';
  };

  // Sync route with URL pathname or popstate
  useEffect(() => {
    const handleLocationSync = () => {
      const targetRoute = getRouteFromUrl();
      if (targetRoute !== currentRoute) {
        const prevIndex = ROUTE_ORDER.indexOf(currentRoute);
        const nextIndex = ROUTE_ORDER.indexOf(targetRoute);
        setDirection(nextIndex >= prevIndex ? 1 : -1);
        setCurrentRoute(targetRoute);
      }
    };

    handleLocationSync();
    window.addEventListener('popstate', handleLocationSync);
    window.addEventListener('hashchange', handleLocationSync);
    return () => {
      window.removeEventListener('popstate', handleLocationSync);
      window.removeEventListener('hashchange', handleLocationSync);
    };
  }, [currentRoute]);

  const navigateTo = (route: PageRoute) => {
    if (route === currentRoute) return;
    const prevIndex = ROUTE_ORDER.indexOf(currentRoute);
    const nextIndex = ROUTE_ORDER.indexOf(route);
    setDirection(nextIndex >= prevIndex ? 1 : -1);
    setCurrentRoute(route);

    const targetPath = route === 'home' ? '/' : `/${route}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'founder':
        return <FounderPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'services':
        return <ServicesPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'case-studies':
        return <CaseStudiesPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'insights':
        return <InsightsPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'industries':
        return <IndustriesPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'foooz':
        return <FooozPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'events':
        return <EventsPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'blog':
      case 'blog-detail':
        return <BlogPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'careers':
        return <CareersPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'faq':
        return <FaqPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'not-found':
        return (
          <div className="max-w-4xl mx-auto px-4 py-28 sm:py-36 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-900 font-mono text-2xl font-black border border-purple-200">
              404
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
              Page Not Found
            </h1>
            <p className="text-neutral-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              The page you are looking for does not exist or may have been moved. Return to our homepage to explore ORIXNAL brand capabilities, strategy, and insights.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('home')}
                className="orixnal-gradient-bg text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
              >
                <span>Return to Homepage</span>
              </button>
            </div>
          </div>
        );
      default:
        return <HomePage onNavigate={navigateTo} onOpenAudit={() => setAuditModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-950 font-sans selection:bg-purple-100 selection:text-purple-900">
      <ScrollProgressBar />
      <SEOHead currentRoute={currentRoute} />

      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenAudit={() => setAuditModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      <main className="flex-1 pt-28 sm:pt-32 overflow-x-hidden relative w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentRoute}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.22,
              ease: 'easeInOut'
            }}
            className="w-full min-h-[60vh]"
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer
        onNavigate={navigateTo}
        onOpenAudit={() => setAuditModalOpen(true)}
      />

      <BrandAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={navigateTo}
      />

      {/* TEMPORARY ORIXNAL® INDEPENDENCE DAY 2026 POPUP — REMOVE AFTER 18 AUGUST 2026 */}
      <IndependenceDayPopup />
    </div>
  );
}
