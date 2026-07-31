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
  Cell,
  Legend
} from 'recharts';
import { Activity, TrendingUp, ShieldAlert, Zap, Layers, Filter, Sparkles, ArrowUpRight } from 'lucide-react';

// Sector-specific simulated datasets
const SECTOR_DATA: Record<string, {
  equity: Array<{ year: string; sovereignBrand: number; genericAgency: number }>;
  cac: Array<{ pillar: string; reduction: number; benchmark: number }>;
  ipRisk: Array<{ name: string; value: number; color: string }>;
}> = {
  all: {
    equity: [
      { year: 'Year 1', sovereignBrand: 1.2, genericAgency: 1.0 },
      { year: 'Year 2', sovereignBrand: 2.8, genericAgency: 1.4 },
      { year: 'Year 3', sovereignBrand: 5.4, genericAgency: 1.9 },
      { year: 'Year 4', sovereignBrand: 9.1, genericAgency: 2.3 },
      { year: 'Year 5', sovereignBrand: 14.6, genericAgency: 2.8 },
    ],
    cac: [
      { pillar: 'Brand Naming', reduction: 28, benchmark: 10 },
      { pillar: 'Legal IP Armor', reduction: 35, benchmark: 12 },
      { pillar: 'Visual Dialect', reduction: 42, benchmark: 18 },
      { pillar: 'React Engine', reduction: 58, benchmark: 22 },
      { pillar: 'GTM Strategy', reduction: 64, benchmark: 28 },
    ],
    ipRisk: [
      { name: 'Class 35/42 Trademark Conflict', value: 42, color: '#E11D48' },
      { name: 'Domain / Handle Unavailability', value: 24, color: '#9333EA' },
      { name: 'Sub-3s Page Speed Penalty', value: 20, color: '#F59E0B' },
      { name: 'Zero Founder Equity Agreement', value: 14, color: '#64748B' },
    ]
  },
  saas: {
    equity: [
      { year: 'Year 1', sovereignBrand: 1.4, genericAgency: 1.1 },
      { year: 'Year 2', sovereignBrand: 3.5, genericAgency: 1.5 },
      { year: 'Year 3', sovereignBrand: 7.2, genericAgency: 2.1 },
      { year: 'Year 4', sovereignBrand: 12.8, genericAgency: 2.6 },
      { year: 'Year 5', sovereignBrand: 19.4, genericAgency: 3.1 },
    ],
    cac: [
      { pillar: 'Brand Naming', reduction: 32, benchmark: 12 },
      { pillar: 'Legal IP Armor', reduction: 40, benchmark: 15 },
      { pillar: 'Visual Dialect', reduction: 48, benchmark: 20 },
      { pillar: 'React Engine', reduction: 68, benchmark: 25 },
      { pillar: 'GTM Strategy', reduction: 72, benchmark: 30 },
    ],
    ipRisk: [
      { name: 'Class 35/42 Trademark Conflict', value: 50, color: '#E11D48' },
      { name: 'Domain / Handle Unavailability', value: 20, color: '#9333EA' },
      { name: 'Sub-3s Page Speed Penalty', value: 22, color: '#F59E0B' },
      { name: 'Zero Founder Equity Agreement', value: 8, color: '#64748B' },
    ]
  },
  d2c: {
    equity: [
      { year: 'Year 1', sovereignBrand: 1.1, genericAgency: 0.9 },
      { year: 'Year 2', sovereignBrand: 2.4, genericAgency: 1.2 },
      { year: 'Year 3', sovereignBrand: 4.8, genericAgency: 1.6 },
      { year: 'Year 4', sovereignBrand: 8.2, genericAgency: 2.0 },
      { year: 'Year 5', sovereignBrand: 12.5, genericAgency: 2.4 },
    ],
    cac: [
      { pillar: 'Brand Naming', reduction: 25, benchmark: 8 },
      { pillar: 'Legal IP Armor', reduction: 30, benchmark: 10 },
      { pillar: 'Visual Dialect', reduction: 55, benchmark: 22 },
      { pillar: 'React Engine', reduction: 52, benchmark: 18 },
      { pillar: 'GTM Strategy', reduction: 60, benchmark: 24 },
    ],
    ipRisk: [
      { name: 'Class 35/42 Trademark Conflict', value: 35, color: '#E11D48' },
      { name: 'Domain / Handle Unavailability', value: 30, color: '#9333EA' },
      { name: 'Sub-3s Page Speed Penalty', value: 25, color: '#F59E0B' },
      { name: 'Zero Founder Equity Agreement', value: 10, color: '#64748B' },
    ]
  },
  gaming: {
    equity: [
      { year: 'Year 1', sovereignBrand: 1.5, genericAgency: 1.0 },
      { year: 'Year 2', sovereignBrand: 3.8, genericAgency: 1.3 },
      { year: 'Year 3', sovereignBrand: 8.1, genericAgency: 1.8 },
      { year: 'Year 4', sovereignBrand: 14.5, genericAgency: 2.2 },
      { year: 'Year 5', sovereignBrand: 22.0, genericAgency: 2.7 },
    ],
    cac: [
      { pillar: 'Brand Naming', reduction: 38, benchmark: 14 },
      { pillar: 'Legal IP Armor', reduction: 45, benchmark: 16 },
      { pillar: 'Visual Dialect', reduction: 62, benchmark: 25 },
      { pillar: 'React Engine', reduction: 75, benchmark: 28 },
      { pillar: 'GTM Strategy', reduction: 80, benchmark: 35 },
    ],
    ipRisk: [
      { name: 'Class 35/42 Trademark Conflict', value: 45, color: '#E11D48' },
      { name: 'Domain / Handle Unavailability', value: 28, color: '#9333EA' },
      { name: 'Sub-3s Page Speed Penalty', value: 15, color: '#F59E0B' },
      { name: 'Zero Founder Equity Agreement', value: 12, color: '#64748B' },
    ]
  }
};

interface BrandPulseDashboardProps {
  onOpenAudit?: () => void;
}

export const BrandPulseDashboard: React.FC<BrandPulseDashboardProps> = ({ onOpenAudit }) => {
  const [activeTab, setActiveTab] = useState<'equity' | 'cac' | 'ip'>('equity');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const currentDataset = SECTOR_DATA[selectedSector] || SECTOR_DATA.all;

  return (
    <div className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xs">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-100 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>ORIXNAL Intelligence Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Brand Pulse Index: Market Growth & Equity Trends
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Real-time simulated market intelligence comparing sovereign masterbrands against generic agency-built ventures across valuation growth, CAC efficiency, and IP vulnerability.
          </p>
        </div>

        {/* Sector Selector */}
        <div className="flex items-center gap-2 bg-[#FAF9F6] border border-neutral-200 p-1.5 rounded-2xl shrink-0 self-start lg:self-center">
          <span className="text-[11px] font-mono font-bold text-neutral-400 pl-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-rose-600" />
            SECTOR:
          </span>
          {[
            { id: 'all', label: 'Cross-Industry' },
            { id: 'saas', label: 'B2B & SaaS' },
            { id: 'd2c', label: 'D2C Retail' },
            { id: 'gaming', label: 'Esports & Gaming' },
          ].map((sector) => (
            <button
              key={sector.id}
              onClick={() => setSelectedSector(sector.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSector === sector.id
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
            >
              {sector.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono uppercase font-bold">Valuation Multiplier</span>
            <TrendingUp className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
            5.2x
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            +320% vs Generic Agency
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono uppercase font-bold">CAC Reduction</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
            -42.8%
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            Lower Ad Burn Rate
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono uppercase font-bold">IP Risk Exposure</span>
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 font-mono">
            66%
          </div>
          <span className="text-[11px] text-rose-700 font-semibold block">
            Vulnerable Without Audit
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200/80 space-y-1">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[10px] font-mono uppercase font-bold">Core Web Vitals</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
            100/100
          </div>
          <span className="text-[11px] text-purple-700 font-semibold block">
            Sub-Second React Speed
          </span>
        </div>
      </div>

      {/* Main Chart Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('equity')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              activeTab === 'equity'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>01. 5-Year Equity Trajectory</span>
          </button>

          <button
            onClick={() => setActiveTab('cac')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              activeTab === 'cac'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>02. CAC Reduction by Pillar</span>
          </button>

          <button
            onClick={() => setActiveTab('ip')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
              activeTab === 'ip'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>03. Industry Legal IP Risk Audit</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-neutral-400">
          Source: ORIXNAL Strategy Research & Market Benchmarks
        </span>
      </div>

      {/* Chart Display Area */}
      <div className="bg-[#FAF9F6] border border-neutral-200 rounded-2xl p-6 min-h-[360px] flex flex-col justify-center">
        
        {/* Tab 1: Equity Growth Area Chart */}
        {activeTab === 'equity' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-neutral-900">
                  Valuation Compound Curve: Sovereign Brand vs Generic Agency Template
                </h4>
                <p className="text-xs text-neutral-500">
                  Measuring enterprise multiplier growth over a 5-year operating window.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-bold">
                <span className="flex items-center gap-1.5 text-rose-600">
                  <span className="w-3 h-3 rounded-full bg-rose-600" />
                  Sovereign ORIXNAL Brand
                </span>
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <span className="w-3 h-3 rounded-full bg-neutral-400" />
                  Generic Agency Template
                </span>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentDataset.equity} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sovereignGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E11D48" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#E11D48" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="genericGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="year" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="x" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171717', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(value: any) => [`${value}x Valuation Multiplier`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="sovereignBrand"
                    name="Sovereign ORIXNAL Brand"
                    stroke="#E11D48"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#sovereignGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="genericAgency"
                    name="Generic Agency Template"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#genericGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 2: CAC Reduction Bar Chart */}
        {activeTab === 'cac' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-neutral-900">
                  Customer Acquisition Cost (CAC) Efficiency Gain by ORIXNAL Pillar (%)
                </h4>
                <p className="text-xs text-neutral-500">
                  How strategic positioning and sub-second React engineering lower customer acquisition costs.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono font-bold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-3 rounded-md bg-emerald-600" />
                  ORIXNAL Pillar Efficiency (%)
                </span>
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <span className="w-3 h-3 rounded-md bg-neutral-300" />
                  Industry Standard (%)
                </span>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentDataset.cac} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="pillar" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#171717', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    formatter={(value: any) => [`${value}% CAC Reduction`, '']}
                  />
                  <Bar dataKey="reduction" name="ORIXNAL Efficiency" fill="#059669" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="benchmark" name="Industry Benchmark" fill="#CBD5E1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 3: Industry IP Risk Pie Chart */}
        {activeTab === 'ip' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-extrabold text-neutral-900">
                  Distribution of Trademark & Brand Liabilities in Early-Stage Companies
                </h4>
                <p className="text-xs text-neutral-500">
                  Based on auditing 200+ startup brand assets prior to ORIXNAL engagement.
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full w-fit">
                88% Found Exposed to Trademark Conflict
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
              <div className="md:col-span-7 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentDataset.ipRisk}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {currentDataset.ipRisk.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#171717', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                      formatter={(value: any) => [`${value}% of Audited Companies`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-5 space-y-2.5 text-xs">
                {currentDataset.ipRisk.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-neutral-800">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-neutral-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Insight Context Footer */}
      <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-rose-950">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>
            <strong>Strategic Insight:</strong> Every ORIXNAL brand development engagement is structured to eliminate Class 35/42 IP risk and maximize 5-year valuation equity.
          </span>
        </div>
        <button
          onClick={() => {
            if (onOpenAudit) {
              onOpenAudit();
            } else {
              const evt = new CustomEvent('openAuditModal');
              window.dispatchEvent(evt);
            }
          }}
          className="orixnal-gradient-bg text-white font-bold px-4 py-2 rounded-xl hover:opacity-95 transition-all text-center shrink-0 inline-flex items-center gap-1.5"
        >
          <span>Run Free IP Risk Audit</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
