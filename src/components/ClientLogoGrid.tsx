import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLIENTS_PARTNERS_LIST, ClientPartner } from '../data/clientsData';
import { BrandLogoImage } from './BrandLogoImage';
import {
  Building2,
  Tv,
  PhoneCall,
  ShoppingBag,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface ClientLogoGridProps {
  onNavigate?: (route: any) => void;
  limit?: number;
}

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Partners' },
  { id: 'Media & Broadcast', label: 'Media & Broadcast' },
  { id: 'Telecom & Tech', label: 'Telecom & Tech' },
  { id: 'D2C & Retail', label: 'D2C & Retail' },
  { id: 'Real Estate & Infrastructure', label: 'Real Estate' },
  { id: 'Institutions & Public', label: 'Institutions' },
];

export const ClientLogoGrid: React.FC<ClientLogoGridProps> = ({ onNavigate, limit }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  const filteredClients = CLIENTS_PARTNERS_LIST.filter((client) => {
    if (activeCategory === 'all') return true;
    return client.category === activeCategory;
  });

  const displayedClients = limit ? filteredClients.slice(0, limit) : filteredClients;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-sm space-y-8 relative overflow-hidden">
      {/* Background Subtle Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-purple-50/70 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-100 pb-6 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200 px-3 py-1 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Trusted By Industry Leaders</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Client & Partner Logo Directory
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl font-normal leading-relaxed">
            From national satellite broadcast networks and global telecom giants to D2C consumer icons and infrastructure developers, ORIXNAL engineers sovereign brand equity.
          </p>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('portfolio')}
            className="text-xs font-bold text-neutral-900 hover:text-purple-700 inline-flex items-center gap-1.5 bg-neutral-50 hover:bg-purple-50 border border-neutral-200 px-4 py-2.5 rounded-full hover:border-purple-300 transition-all shrink-0"
          >
            <span>Explore Full Client Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-700" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 relative z-10">
        {CATEGORY_FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveCategory(filter.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === filter.id
                ? 'orixnal-gradient-bg text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid of Client Logos with Motion & Hover Highlight */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
        <AnimatePresence mode="popLayout">
          {displayedClients.map((client) => {
            const isHovered = hoveredClient === client.id;
            return (
              <motion.div
                key={client.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHoveredClient(client.id)}
                onMouseLeave={() => setHoveredClient(null)}
                className="group relative bg-[#FAF9F6] border border-neutral-200/80 hover:border-purple-400 hover:bg-white rounded-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer h-36"
              >
                {/* Badge Top Left */}
                <div className="w-full flex items-center justify-between gap-1 text-[9px] font-mono text-neutral-400 group-hover:text-purple-700 font-bold transition-colors">
                  <span className="truncate max-w-[80%]">{client.badge || 'Partner'}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 opacity-80 group-hover:opacity-100" />
                </div>

                {/* Logo Centered with Grayscale to Color Transition */}
                <div className="my-auto flex items-center justify-center h-16 w-full px-2">
                  <BrandLogoImage
                    logoUrl={client.logo}
                    name={client.name}
                    category={client.category}
                    className="w-full h-12 max-w-[130px] border-none shadow-none bg-transparent p-0"
                    imageClassName={`max-h-10 max-w-full object-contain transition-all duration-300 ${
                      isHovered ? 'filter-none scale-105' : 'grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100'
                    }`}
                  />
                </div>

                {/* Brand Title & Tagline preview */}
                <div className="w-full pt-1.5 border-t border-neutral-200/60 group-hover:border-purple-100 transition-colors">
                  <p className="text-xs font-black text-neutral-900 group-hover:text-purple-950 truncate">
                    {client.name}
                  </p>
                  <p className="text-[10px] text-neutral-500 truncate font-medium group-hover:text-neutral-700">
                    {client.tagline}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer info note */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-neutral-500 border-t border-neutral-100 relative z-10">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>All partner marks and logos are registered trademarks of their respective legal entities.</span>
        </span>
        <span className="font-bold text-neutral-700">
          Showing {displayedClients.length} of {CLIENTS_PARTNERS_LIST.length} Official Client Brands
        </span>
      </div>
    </div>
  );
};
