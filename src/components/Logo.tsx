import React, { useState } from 'react';
import { OFFICIAL_ASSETS } from '../data/brandData';

interface LogoProps {
  variant?: 'full' | 'icon' | 'foooz';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', size = 'md' }) => {
  const [imgError, setImgError] = useState(false);
  const [useFallbackUrl, setUseFallbackUrl] = useState(false);

  const sizeClasses = {
    sm: 'h-6 min-h-[24px]',
    md: 'h-8 min-h-[32px]',
    lg: 'h-11 min-h-[44px]',
    xl: 'h-16 min-h-[64px]',
  };

  const iconSizes = {
    sm: 'w-6 h-6 shrink-0',
    md: 'w-8 h-8 shrink-0',
    lg: 'w-11 h-11 shrink-0',
    xl: 'w-16 h-16 shrink-0',
  };

  if (variant === 'foooz') {
    return (
      <div className={`inline-flex items-center gap-2.5 shrink-0 ${className}`}>
        {!imgError ? (
          <img
            src={useFallbackUrl ? OFFICIAL_ASSETS.logoFallback : OFFICIAL_ASSETS.fooozLogo}
            alt="Foooz Logo"
            className={`${sizeClasses[size]} w-auto object-contain shrink-0`}
            referrerPolicy="no-referrer"
            onError={() => {
              if (!useFallbackUrl) {
                setUseFallbackUrl(true);
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <div className="flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold text-sm tracking-wide border border-amber-300 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            FOOOZ®
          </div>
        )}
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        {!imgError ? (
          <img
            src={useFallbackUrl ? OFFICIAL_ASSETS.logoFallback : OFFICIAL_ASSETS.icon}
            alt="ORIXNAL Icon"
            className={`${iconSizes[size]} object-contain shrink-0`}
            referrerPolicy="no-referrer"
            onError={() => {
              if (!useFallbackUrl) {
                setUseFallbackUrl(true);
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <svg className={iconSizes[size]} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="orixnalIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#411466" />
                <stop offset="35%" stopColor="#722693" />
                <stop offset="70%" stopColor="#a21c78" />
                <stop offset="100%" stopColor="#d31e59" />
              </linearGradient>
            </defs>
            <path d="M 22,18 C 22,18 42,42 50,50 C 58,58 78,82 78,82 L 66,82 C 66,82 48,60 41,52 C 34,44 22,28 22,18 Z" fill="url(#orixnalIconGrad)" />
            <path d="M 78,18 C 78,18 58,42 50,50 C 42,58 22,82 22,82 L 34,82 C 34,82 52,60 59,52 C 66,44 78,28 78,18 Z" fill="url(#orixnalIconGrad)" />
            <path d="M 32,22 C 45,38 55,38 68,22 C 55,32 45,32 32,22 Z" fill="url(#orixnalIconGrad)" />
            <path d="M 32,78 C 45,62 55,62 68,78 C 55,68 45,68 32,78 Z" fill="url(#orixnalIconGrad)" />
          </svg>
        )}
      </div>
    );
  }

  // Full Logo
  return (
    <div className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      {!imgError ? (
        <img
          src={useFallbackUrl ? OFFICIAL_ASSETS.logoFallback : OFFICIAL_ASSETS.logo}
          alt="ORIXNAL Logo"
          className={`${sizeClasses[size]} w-auto object-contain shrink-0`}
          referrerPolicy="no-referrer"
          onError={() => {
            if (!useFallbackUrl) {
              setUseFallbackUrl(true);
            } else {
              setImgError(true);
            }
          }}
        />
      ) : (
        <div className="inline-flex items-center gap-2.5 shrink-0">
          {/* SVG Fallback matching official icon */}
          <svg className="w-8 h-8 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="orixnalFallbackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#411466" />
                <stop offset="35%" stopColor="#722693" />
                <stop offset="70%" stopColor="#a21c78" />
                <stop offset="100%" stopColor="#d31e59" />
              </linearGradient>
            </defs>
            <path d="M 22,18 C 22,18 42,42 50,50 C 58,58 78,82 78,82 L 66,82 C 66,82 48,60 41,52 C 34,44 22,28 22,18 Z" fill="url(#orixnalFallbackGrad)" />
            <path d="M 78,18 C 78,18 58,42 50,50 C 42,58 22,82 22,82 L 34,82 C 34,82 52,60 59,52 C 66,44 78,28 78,18 Z" fill="url(#orixnalFallbackGrad)" />
            <path d="M 32,22 C 45,38 55,38 68,22 C 55,32 45,32 32,22 Z" fill="url(#orixnalFallbackGrad)" />
            <path d="M 32,78 C 45,62 55,62 68,78 C 55,68 45,68 32,78 Z" fill="url(#orixnalFallbackGrad)" />
          </svg>
          <span className="font-extrabold tracking-tight text-xl text-neutral-900 font-sans shrink-0">
            ORIX<span className="orixnal-gradient-text">NAL</span>
          </span>
        </div>
      )}
    </div>
  );
};
