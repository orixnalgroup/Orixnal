import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Users, Sparkles, ExternalLink } from 'lucide-react';

export interface SocialPlatform {
  name: string;
  handle: string;
  url: string;
  description: string;
  badge?: string;
  colorClass: string;
  bgHover: string;
  icon: React.ReactNode;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    name: 'LinkedIn',
    handle: '@orixnalgroup',
    url: 'https://www.linkedin.com/company/orixnalgroup',
    description: 'Corporate announcements, thought leadership & executive insights',
    badge: 'Professional Network',
    colorClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40',
    bgHover: 'group-hover:bg-[#0A66C2]/10 text-[#0A66C2]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
      </svg>
    )
  },
  {
    name: 'Twitter / X',
    handle: '@orixnalgroup',
    url: 'https://x.com/orixnalgroup',
    description: 'Real-time brand strategy, news updates & industry commentary',
    badge: 'Real-time Pulse',
    colorClass: 'hover:text-neutral-900 hover:border-neutral-800',
    bgHover: 'group-hover:bg-neutral-900/10 text-neutral-900',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    handle: '@orixnalgroup',
    url: 'https://www.instagram.com/orixnalgroup',
    description: 'Visual brand design, agency culture & behind-the-scenes',
    badge: 'Visual Identity',
    colorClass: 'hover:text-[#E4405F] hover:border-[#E4405F]/40',
    bgHover: 'group-hover:bg-[#E4405F]/10 text-[#E4405F]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    handle: '@orixnalgroup',
    url: 'https://www.youtube.com/@orixnalgroup',
    description: 'Masterclasses, event keynotes & brand strategy breakdowns',
    badge: 'Video & Keynotes',
    colorClass: 'hover:text-[#FF0000] hover:border-[#FF0000]/40',
    bgHover: 'group-hover:bg-[#FF0000]/10 text-[#FF0000]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  },
  {
    name: 'Facebook',
    handle: '@orixnalgroup',
    url: 'https://www.facebook.com/orixnalgroup',
    description: 'Community events, campaigns & public outreach',
    badge: 'Community',
    colorClass: 'hover:text-[#1877F2] hover:border-[#1877F2]/40',
    bgHover: 'group-hover:bg-[#1877F2]/10 text-[#1877F2]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  },
  {
    name: 'Behance',
    handle: '@orixnalgroup',
    url: 'https://www.behance.net/orixnalgroup',
    description: 'In-depth design case studies & brand architecture portfolios',
    badge: 'Design Showcase',
    colorClass: 'hover:text-[#1769FF] hover:border-[#1769FF]/40',
    bgHover: 'group-hover:bg-[#1769FF]/10 text-[#1769FF]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M22 7h-7V5h7v2zm-1.7 5c-1.3 0-2.4 1-2.4 2.5s1 2.5 2.4 2.5c1.1 0 2.1-.6 2.4-1.7h2.2c-.4 2.3-2.3 3.7-4.6 3.7-2.9 0-5.1-2.2-5.1-5.1s2.2-5.1 5.1-5.1c2.4 0 4.3 1.6 4.6 3.8h-2.2c-.3-1-1.3-1.6-2.4-1.6zm-12.8 7H0V5h7.3c2.4 0 4.1 1.2 4.1 3.1 0 1.2-.6 2.1-1.7 2.6 1.4.5 2.1 1.6 2.1 3 0 2.3-1.8 3.3-4.3 3.3zm-4.3-8.8h4.1c1.1 0 1.9-.5 1.9-1.5s-.8-1.5-1.9-1.5H3.2v3zm0 6.6h4.3c1.3 0 2.1-.6 2.1-1.7s-.8-1.7-2.1-1.7H3.2v3.4z" />
      </svg>
    )
  },
  {
    name: 'Dribbble',
    handle: '@orixnalgroup',
    url: 'https://dribbble.com/orixnalgroup',
    description: 'Interactive UI shots, motion design & creative concepts',
    badge: 'UI / UX Shots',
    colorClass: 'hover:text-[#EA4C89] hover:border-[#EA4C89]/40',
    bgHover: 'group-hover:bg-[#EA4C89]/10 text-[#EA4C89]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.849 10.692c-1.288-.291-3.111-.383-5.228-.216a24.898 24.898 0 0 0-.825-1.737c3.151-1.42 5.097-3.197 5.792-3.953.189.378.358.767.502 1.164a9.92 9.92 0 0 1-.241 4.742zM12 2.052c2.197 0 4.227.712 5.875 1.913-.604.686-2.392 2.327-5.38 3.653A37.135 37.135 0 0 0 9.29 2.459c.866-.264 1.777-.407 2.71-.407zm-4.321.933c1.071 1.626 2.152 3.327 3.193 5.056-2.903.856-6.425 1.258-9.98 1.258a9.957 9.957 0 0 1 .803-3.666c1.551-1.218 3.535-1.996 5.984-2.648zm-5.62 4.957c3.342 0 6.639-.379 9.387-1.189.28.528.552 1.059.816 1.593-3.722 1.163-6.84 3.738-8.868 7.073A9.919 9.919 0 0 1 2.059 7.942zm2.84 9.141c1.884-3.048 4.761-5.419 8.214-6.527.604 1.644 1.118 3.332 1.533 5.039-3.71 1.096-7.143 3.238-9.497 6.136a9.95 9.95 0 0 1-.25-4.648zm8.995 4.86c2.253-2.735 5.534-4.757 9.102-5.789a10.02 10.02 0 0 1-1.144 4.093 9.932 9.932 0 0 1-7.958 1.696z" />
      </svg>
    )
  },
  {
    name: 'Crunchbase',
    handle: 'orixnal',
    url: 'https://www.crunchbase.com/organization/orixnal#predictions_and_insights',
    description: 'Verified organization profile, business insights & growth metrics',
    badge: 'Company Intelligence',
    colorClass: 'hover:text-[#0288D1] hover:border-[#0288D1]/40',
    bgHover: 'group-hover:bg-[#0288D1]/10 text-[#0288D1]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M21.6 0H2.4C1.08 0 0 1.08 0 2.4v19.2C0 22.92 1.08 24 2.4 24h19.2c1.32 0 2.4-1.08 2.4-2.4V2.4C24 1.08 22.92 0 21.6 0zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.67 4.22 1.76l-2.12 2.12C13.56 9.35 12.83 9 12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.83 0 1.56-.35 2.12-.88l2.12 2.12C15.14 17.33 13.66 18 12 18z" />
      </svg>
    )
  },
  {
    name: 'Clutch',
    handle: 'orixnal-group',
    url: 'https://clutch.co/profile/orixnal-group',
    description: 'Verified client reviews, agency ratings & B2B service evaluations',
    badge: 'Verified 5.0 ★ Rating',
    colorClass: 'hover:text-[#FF4A1C] hover:border-[#FF4A1C]/40',
    bgHover: 'group-hover:bg-[#FF4A1C]/10 text-[#FF4A1C]',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.8c4.529 0 8.2 3.671 8.2 8.2 0 4.529-3.671 8.2-8.2 8.2-4.529 0-8.2-3.671-8.2-8.2 0-4.529 3.671-8.2 8.2-8.2zm-2 3.8c-2.43 0-4.4 1.97-4.4 4.4s1.97 4.4 4.4 4.4c1.215 0 2.316-.493 3.112-1.288l-1.556-1.556c-.398.398-.948.644-1.556.644-1.215 0-2.2-.985-2.2-2.2s.985-2.2 2.2-2.2c.608 0 1.158.246 1.556.644l1.556-1.556C12.316 8.093 11.215 7.6 10 7.6zm6.6.2h-2.2v8.4h2.2V7.8z" />
      </svg>
    )
  }
];

export const SocialLinks: React.FC = () => {
  return (
    <div className="my-12 pt-10 border-t border-neutral-200/90 space-y-8">
      {/* Social CTA Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-purple-950 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-800/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-purple-500/10 to-transparent pointer-events-none" />

        <div className="space-y-2 max-w-xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/80 border border-purple-700/80 text-purple-200 text-xs font-mono font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Join Our Global Network</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Follow ORIXNAL Across All Platforms
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            Official Handle: <strong className="text-purple-300 font-mono text-sm">@orixnalgroup</strong> — Join our community of 10,000+ brand leaders, founders, and creators for daily insights and design breakdowns.
          </p>
        </div>

        {/* Master CTA Button */}
        <div className="flex items-center gap-3 w-full sm:w-auto relative z-10 shrink-0">
          <a
            href="https://www.linkedin.com/company/orixnalgroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto orixnal-gradient-bg text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md hover:opacity-95 transition-all inline-flex items-center justify-center gap-2 group-hover:scale-[1.02]"
          >
            <span>Join us on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Grid of Social Media Cards with Hyperlinks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Official Social Channels (@orixnalgroup)</span>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">
            9 Verified Platforms & Directories
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {SOCIAL_PLATFORMS.map((platform) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className={`bg-white border border-neutral-200/90 rounded-2xl p-4 transition-all duration-200 group flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md ${platform.colorClass}`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className={`p-2.5 rounded-xl bg-neutral-100 transition-colors ${platform.bgHover}`}>
                  {platform.icon}
                </div>

                <div className="flex items-center gap-1">
                  {platform.badge && (
                    <span className="text-[9px] font-mono font-bold uppercase bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md border border-neutral-200">
                      {platform.badge}
                    </span>
                  )}
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-purple-600 transition-colors shrink-0" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-neutral-900 group-hover:text-purple-900 transition-colors">
                    {platform.name}
                  </h4>
                  <span className="text-[10px] font-mono text-purple-700 font-bold">
                    {platform.handle}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 leading-snug mt-1 line-clamp-2">
                  {platform.description}
                </p>
              </div>

              {/* Individual Join Us CTA link inside each card */}
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-800 group-hover:text-purple-700 transition-colors">
                <span>Join us</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase font-black text-purple-800 group-hover:translate-x-0.5 transition-transform">
                  Follow <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
