import React, { useState } from 'react';
import { Building2, Tv, Radio, ShoppingBag, PhoneCall, Landmark, ShieldCheck, Film, Award } from 'lucide-react';

interface BrandLogoImageProps {
  logoUrl?: string;
  name: string;
  category?: string;
  className?: string;
  imageClassName?: string;
  showMotion?: boolean;
}

export const BrandLogoImage: React.FC<BrandLogoImageProps> = ({
  logoUrl,
  name,
  category,
  className = 'w-10 h-10',
  imageClassName = 'max-h-7 max-w-full object-contain',
  showMotion = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Generate initials (e.g. "Zee Salam" -> "ZS", "92.7 Big FM" -> "92")
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`relative rounded-xl border border-neutral-200/80 bg-white p-1.5 flex items-center justify-center overflow-hidden shadow-2xs shrink-0 transition-transform ${
        showMotion ? 'hover:scale-110 hover:shadow-md hover:border-purple-300' : ''
      } ${className}`}
    >
      {logoUrl && !imageError ? (
        <img
          src={logoUrl}
          alt={`${name} Official Logo`}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={`${imageClassName} transition-all duration-300 group-hover:scale-105`}
        />
      ) : (
        <div className="w-full h-full rounded-lg orixnal-gradient-bg flex items-center justify-center text-white font-black text-xs tracking-wider shadow-inner">
          <span>{initials || 'BX'}</span>
        </div>
      )}
    </div>
  );
};
