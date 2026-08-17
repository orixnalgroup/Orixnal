import React from 'react';
import { PageRoute } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { FounderPage } from '../pages/FounderPage';
import { ServicesPage } from '../pages/ServicesPage';
import { CaseStudiesPage } from '../pages/CaseStudiesPage';
import { PortfolioPage } from '../pages/PortfolioPage';
import { InsightsPage } from '../pages/InsightsPage';
import { BlogPage } from '../pages/BlogPage';
import { IndustriesPage } from '../pages/IndustriesPage';
import { FooozPage } from '../pages/FooozPage';
import { EventsPage } from '../pages/EventsPage';
import { CareersPage } from '../pages/CareersPage';
import { FaqPage } from '../pages/FaqPage';
import { ContactPage } from '../pages/ContactPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TermsPage } from '../pages/TermsPage';

interface StaticAppProps {
  route: PageRoute;
}

export const StaticApp: React.FC<StaticAppProps> = ({ route }) => {
  const dummyNavigate = () => {};
  const dummyAudit = () => {};
  const dummySearch = () => {};

  const renderPage = () => {
    switch (route) {
      case 'home':
        return <HomePage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'about':
        return <AboutPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'founder':
        return <FounderPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'services':
      case 'service-detail':
        return <ServicesPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'case-studies':
      case 'case-study-detail':
        return <CaseStudiesPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'portfolio':
        return <PortfolioPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'insights':
      case 'insight-detail':
        return <InsightsPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'blog':
      case 'blog-detail':
        return <BlogPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'industries':
        return <IndustriesPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'foooz':
        return <FooozPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'events':
        return <EventsPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'careers':
        return <CareersPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'faq':
        return <FaqPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
      case 'contact':
        return <ContactPage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
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
              <a
                href="/"
                className="orixnal-gradient-bg text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-md hover:opacity-95 transition-all inline-flex items-center gap-2"
              >
                <span>Return to Homepage</span>
              </a>
            </div>
          </div>
        );
      default:
        return <HomePage onNavigate={dummyNavigate} onOpenAudit={dummyAudit} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-neutral-950 font-sans selection:bg-purple-100 selection:text-purple-900">
      <Navbar
        currentRoute={route}
        onNavigate={dummyNavigate}
        onOpenAudit={dummyAudit}
        onOpenSearch={dummySearch}
      />

      <main className="flex-1 pt-28 sm:pt-32 overflow-x-hidden relative w-full">
        <div className="w-full min-h-[60vh]">
          {renderPage()}
        </div>
      </main>

      <Footer
        onNavigate={dummyNavigate}
        onOpenAudit={dummyAudit}
      />
    </div>
  );
};
