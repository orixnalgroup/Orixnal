/* TEMPORARY ORIXNAL® INDEPENDENCE DAY 2026 POPUP — REMOVE AFTER 18 AUGUST 2026 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

// Automatic Expiration Timestamp: 18 August 2026 at 23:59:59 IST (UTC+5:30)
const EXPIRATION_DATE_IST_MS = new Date('2026-08-18T23:59:59+05:30').getTime();
const SESSION_STORAGE_KEY = 'orixnal_id2026_popup_dismissed';

export const IndependenceDayPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if the campaign has expired (past 18 August 2026 23:59:59 IST)
    const now = Date.now();
    if (now > EXPIRATION_DATE_IST_MS) {
      return;
    }

    // 2. Check if the user already dismissed the popup in the current browser session
    try {
      const alreadyDismissed = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (alreadyDismissed === 'true') {
        return;
      }
    } catch {
      // Ignore sessionStorage exceptions in private/restricted environments
    }

    // 3. Display after a short graceful delay on entry
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard accessibility: Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };

    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    } catch {
      // Ignore
    }
  };

  // If already expired, return null immediately
  if (Date.now() > EXPIRATION_DATE_IST_MS) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="ORIXNAL Independence Day 2026 Campaign"
        >
          {/* Subtle Dimming & Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#FAF9F6] border border-neutral-200/90 rounded-3xl shadow-2xl shadow-purple-950/20 overflow-hidden text-neutral-900 z-10 my-auto"
          >
            {/* Elegant Indian Tricolour Accent Line */}
            <div className="h-1.5 w-full flex">
              <div className="flex-1 bg-[#FF671F]" title="Saffron" />
              <div className="flex-1 bg-white border-y border-neutral-200/50" title="White" />
              <div className="flex-1 bg-[#046A38]" title="India Green" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-neutral-500 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-700 z-20"
              aria-label="Close Independence Day announcement"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner Content */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col items-center text-center">
              {/* Official ORIXNAL Logo (No tagline underneath) */}
              <div className="mb-6 sm:mb-8 pt-1">
                <Logo variant="full" size="md" className="shrink-0" />
              </div>

              {/* Tricolour Minimalist Accent Dot Trio */}
              <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-white border border-neutral-200/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#FF671F]" />
                <span className="w-2 h-2 rounded-full bg-neutral-300 border border-neutral-400" />
                <span className="w-2 h-2 rounded-full bg-[#046A38]" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-600 uppercase ml-1.5">
                  15 AUGUST 2026
                </span>
              </div>

              {/* Large Visual 80 Emphasis & Editorial Headline */}
              <div className="mb-5 sm:mb-6">
                <div className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-none text-neutral-950 font-sans select-none">
                  80
                </div>
                <div className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-[0.25em] text-neutral-800 mt-2">
                  YEARS OF INDEPENDENCE
                </div>
              </div>

              {/* Supporting Editorial Message */}
              <div className="max-w-md mx-auto space-y-1.5 text-neutral-600 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed mb-8">
                <p>Celebrating the freedom to imagine,</p>
                <p>the courage to create,</p>
                <p className="font-semibold text-neutral-800">
                  and the ambition to build what comes next.
                </p>
              </div>

              {/* Action Controls */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDismiss}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 orixnal-gradient-bg text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-md hover:opacity-95 transition-all focus:outline-none focus:ring-2 focus:ring-purple-700"
                >
                  <span>Explore ORIXNAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-xs text-neutral-500 hover:text-neutral-800 font-semibold py-2 px-3 transition-colors focus:outline-none"
                >
                  Continue to website
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
