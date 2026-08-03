import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute } from './types';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';
import { BrandAuditModal } from './components/BrandAuditModal';
import { SearchModal } from './components/SearchModal';
import { AIChatbot } from './components/AIChatbot';
import { AIChatLauncher } from './components/AIChatLauncher';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { adminCmsStore, AdminUser } from './data/adminCmsStore';

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
  const [chatOpen, setChatOpen] = useState(false);

  // Admin CMS States
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const [activeAdminUser, setActiveAdminUser] = useState<AdminUser | null>(() => adminCmsStore.getActiveUser());

  const handleOpenAdminPortal = () => {
    const active = adminCmsStore.getActiveUser();
    if (active) {
      setActiveAdminUser(active);
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginModalOpen(true);
    }
  };

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

  // Sync route with URL hash or state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '') as PageRoute;
      if (hash && ROUTE_ORDER.includes(hash)) {
        if (hash !== currentRoute) {
          const prevIndex = ROUTE_ORDER.indexOf(currentRoute);
          const nextIndex = ROUTE_ORDER.indexOf(hash);
          setDirection(nextIndex >= prevIndex ? 1 : -1);
          setCurrentRoute(hash);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  const navigateTo = (route: PageRoute) => {
    if (route === currentRoute) return;
    const prevIndex = ROUTE_ORDER.indexOf(currentRoute);
    const nextIndex = ROUTE_ORDER.indexOf(route);
    setDirection(nextIndex >= prevIndex ? 1 : -1);
    setCurrentRoute(route);
    window.location.hash = `#/${route === 'home' ? '' : route}`;
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
        onOpenChat={() => setChatOpen(true)}
        onOpenAdminLogin={handleOpenAdminPortal}
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

      <AIChatLauncher
        isOpen={chatOpen}
        onToggle={() => setChatOpen(true)}
      />

      <AIChatbot
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpenAudit={() => setAuditModalOpen(true)}
        onNavigate={navigateTo}
      />

      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccessLogin={(user) => {
          setActiveAdminUser(user);
          setAdminDashboardOpen(true);
        }}
      />

      {adminDashboardOpen && activeAdminUser && (
        <AdminDashboard
          currentUser={activeAdminUser}
          onLogout={() => {
            adminCmsStore.logout();
            setActiveAdminUser(null);
            setAdminDashboardOpen(false);
          }}
          onClose={() => setAdminDashboardOpen(false)}
          onNavigateSite={(route) => navigateTo(route)}
        />
      )}
    </div>
  );
}
