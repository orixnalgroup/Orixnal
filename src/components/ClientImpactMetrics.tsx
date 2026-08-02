import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Award,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowUpRight
} from 'lucide-react';

// Data 1: Cumulative Projects Completed Growth (Reaching 500+)
const COMPLETED_PROJECTS_DATA = [
  { year: '2020', projects: 45, cumulative: 45, enterpriseClients: 12 },
  { year: '2021', projects: 75, cumulative: 120, enterpriseClients: 28 },
  { year: '2022', projects: 95, cumulative: 215, enterpriseClients: 52 },
  { year: '2023', projects: 110, cumulative: 325, enterpriseClients: 85 },
  { year: '2024', projects: 125, cumulative: 450, enterpriseClients: 120 },
  { year: '2025', projects: 65, cumulative: 515, enterpriseClients: 150 },
];

// Data 2: Client Performance Growth Trajectory (Pre vs. Post ORIXNAL - 200% Avg Growth)
const GROWTH_IMPACT_DATA = [
  { sector: 'Fintech & SaaS', baseline: 100, postOrixnal: 310, growthPct: 210 },
  { sector: 'D2C & Retail', baseline: 100, postOrixnal: 285, growthPct: 185 },
  { sector: 'Real Estate & Infra', baseline: 100, postOrixnal: 290, growthPct: 190 },
  { sector: 'Media & Events', baseline: 100, postOrixnal: 320, growthPct: 220 },
  { sector: 'Telecom & Tech', baseline: 100, postOrixnal: 295, growthPct: 195 },
];

// Data 3: Project Distribution by Sector
const SECTOR_DISTRIBUTION = [
  { name: 'Media & Entertainment', value: 135, color: '#8B5CF6' },
  { name: 'D2C & Consumer Goods', value: 110, color: '#EC4899' },
  { name: 'Real Estate & Infra', value: 95, color: '#06B6D4' },
  { name: 'Telecom & Enterprise Tech', value: 105, color: '#10B981' },
  { name: 'Public & Cultural Institutions', value: 70, color: '#F59E0B' },
];

export const ClientImpactMetrics: React.FC<{ onNavigate?: (route: any) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'growth' | 'projects' | 'sectors'>('growth');

  return (
    <div className="bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-800 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span>Measurable Brand Performance</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Data-Driven Client Success & Scale
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
              Quantifiable brand development outcomes recorded across 500+ executed client campaigns, IP launches, and corporate restructurings.
            </p>
          </div>

          {/* Key Metric Highlight Cards */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-neutral-900/90 border border-purple-800/50 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
                500+
              </div>
              <div>
                <div className="text-xs font-black text-white uppercase tracking-wider">Projects Completed</div>
                <div className="text-[11px] text-purple-300 font-mono">100% On-Time Delivery</div>
              </div>
            </div>

            <div className="bg-neutral-900/90 border border-amber-500/40 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                200%
              </div>
              <div>
                <div className="text-xs font-black text-white uppercase tracking-wider">Average Client Growth</div>
                <div className="text-[11px] text-amber-300 font-mono">Post-Rebrand Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart View Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800">
            <button
              onClick={() => setActiveTab('growth')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'growth'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>200% Growth Impact</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'projects'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              <span>500+ Projects Delivered</span>
            </button>

            <button
              onClick={() => setActiveTab('sectors')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'sectors'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span>Sector Breakdown</span>
            </button>
          </div>

          <div className="text-right text-[11px] font-mono text-neutral-400">
            Source: ORIXNAL Internal Delivery Audit & Client Financial Benchmarks
          </div>
        </div>

        {/* CHART DISPLAY AREA */}
        <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4 sm:p-6 min-h-[340px] flex flex-col justify-center">
          
          {/* TAB 1: 200% AVERAGE GROWTH IMPACT */}
          {activeTab === 'growth' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span>Average Brand Valuation & Revenue Multiple Index</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                      +200% Avg Lift
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Comparing pre-branding index baseline (100) vs. post-ORIXNAL positioning & digital deployment.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-neutral-700" />
                    <span className="text-neutral-400">Baseline (100)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-amber-500" />
                    <span className="text-amber-300 font-bold">Post-ORIXNAL</span>
                  </div>
                </div>
              </div>

              <div className="h-[280px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GROWTH_IMPACT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis
                      dataKey="sector"
                      stroke="#A3A3A3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#404040' }}
                    />
                    <YAxis
                      stroke="#A3A3A3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#404040' }}
                      unit="%"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#171717',
                        borderColor: '#404040',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
                      }}
                      formatter={(val: any, name: any) => [
                        `${val}% Index`,
                        name === 'postOrixnal' ? 'Post-ORIXNAL Strategy' : 'Pre-ORIXNAL Baseline'
                      ]}
                    />
                    <Bar dataKey="baseline" fill="#404040" radius={[6, 6, 0, 0]} name="baseline" />
                    <Bar dataKey="postOrixnal" fill="#F59E0B" radius={[6, 6, 0, 0]} name="postOrixnal" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 2: CUMULATIVE 500+ PROJECTS DELIVERED */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span>Cumulative Delivery Velocity (2020 – Present)</span>
                    <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full font-bold">
                      515+ Milestone Surpassed
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Total count of brand identities, campaigns, software builds, and legal registrations deployed.
                  </p>
                </div>
              </div>

              <div className="h-[280px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={COMPLETED_PROJECTS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis
                      dataKey="year"
                      stroke="#A3A3A3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#404040' }}
                    />
                    <YAxis
                      stroke="#A3A3A3"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#404040' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#171717',
                        borderColor: '#404040',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px'
                      }}
                      formatter={(val: any, name: any) => [
                        `${val} Projects`,
                        name === 'cumulative' ? 'Cumulative Completed' : 'Annual Volume'
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="cumulative"
                      stroke="#A855F7"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#purpleGrad)"
                      name="cumulative"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TAB 3: SECTOR BREAKDOWN PIE */}
          {activeTab === 'sectors' && (
            <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
              <div className="md:col-span-6 h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SECTOR_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {SECTOR_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#171717" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#171717',
                        borderColor: '#404040',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px'
                      }}
                      formatter={(val: any) => [`${val} Projects`, 'Delivered']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-6 space-y-3">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono">
                  Industry Portfolio Distribution
                </h3>
                <div className="space-y-2">
                  {SECTOR_DISTRIBUTION.map((sector) => (
                    <div
                      key={sector.name}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: sector.color }} />
                        <span className="font-semibold text-neutral-200">{sector.name}</span>
                      </div>
                      <span className="font-mono font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">
                        {sector.value} Projects
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Banner Callout */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All project metrics backed by MSME registration credentials and verified Clutch ratings.</span>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 hover:underline shrink-0"
            >
              <span>Schedule Audit for Your Brand</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
