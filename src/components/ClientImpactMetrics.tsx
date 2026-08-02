import React from 'react';
import { TrendingUp, Globe2, IndianRupee, DollarSign, Award, Target, Sparkles, ArrowUpRight } from 'lucide-react';

interface ClientImpactMetricsProps {
  onNavigate?: (route: any) => void;
}

export const ClientImpactMetrics: React.FC<ClientImpactMetricsProps> = ({ onNavigate }) => {
  const stats = [
    {
      id: 'stat-1',
      metric: '$25M+',
      label: 'Brand Equity Created',
      subtext: 'Cumulative valuation generated across client portfolio',
      icon: <DollarSign className="w-5 h-5 text-purple-700" />,
      tag: 'Dollar Impact',
      bgGradient: 'bg-purple-50/60 border-purple-200/80',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      id: 'stat-2',
      metric: '₹200Cr+',
      label: 'Client Revenue Scale',
      subtext: 'Turnover growth post ORIXNAL strategic rebrand',
      icon: <IndianRupee className="w-5 h-5 text-emerald-700" />,
      tag: 'Rupee Velocity',
      bgGradient: 'bg-emerald-50/60 border-emerald-200/80',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    {
      id: 'stat-3',
      metric: '50M+',
      label: 'Consumer Touchpoints',
      subtext: 'Annual global media, broadcast & digital impressions',
      icon: <Globe2 className="w-5 h-5 text-amber-700" />,
      tag: 'Touchpoints & Reach',
      bgGradient: 'bg-amber-50/60 border-amber-200/80',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    {
      id: 'stat-4',
      metric: '200%',
      label: 'Average Growth Impact',
      subtext: 'Sustained commercial growth across client campaigns',
      icon: <TrendingUp className="w-5 h-5 text-rose-700" />,
      tag: 'Direct Impact',
      bgGradient: 'bg-rose-50/60 border-rose-200/80',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-lg space-y-8 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6 relative z-10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full orixnal-gradient-bg text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Scale & Performance Metrics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            Commercial Impact & Scale
          </h2>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs font-mono font-bold text-purple-900 bg-purple-50 border border-purple-200/80 px-3 py-1.5 rounded-xl inline-flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-purple-700" />
            <span>500+ Sovereign Projects Executed</span>
          </span>
        </div>
      </div>

      {/* Minimal Numbers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {stats.map((item) => (
          <div
            key={item.id}
            className={`p-5 sm:p-6 rounded-2xl border ${item.bgGradient} transition-all duration-300 hover:scale-[1.02] hover:shadow-md flex flex-col justify-between space-y-4 group`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white p-2 shadow-2xs flex items-center justify-center border border-neutral-200/60">
                {item.icon}
              </div>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                {item.tag}
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight font-mono group-hover:text-purple-800 transition-colors">
                {item.metric}
              </div>
              <div className="text-xs font-extrabold text-neutral-800 uppercase tracking-wider mt-1">
                {item.label}
              </div>
              <p className="text-[11px] text-neutral-600 mt-1 leading-snug font-medium">
                {item.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Banner Bar */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-neutral-600 border-t border-neutral-100 relative z-10">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-700 shrink-0" />
          <span>Legally protected trademarks (Class 35 & 42) & MSME Udyam verified operations.</span>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('contact')}
            className="text-purple-800 font-extrabold hover:text-purple-950 inline-flex items-center gap-1 transition-colors text-xs whitespace-nowrap"
          >
            <span>Request Verified Audit Log</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
