import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      if (documentHeight > 0) {
        const currentProgress = (window.scrollY / documentHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
      } else {
        setScrollPercentage(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent pointer-events-none">
      <div
        className="h-full orixnal-gradient-bg transition-all duration-150 ease-out shadow-[0_0_8px_rgba(211,30,89,0.6)]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};
