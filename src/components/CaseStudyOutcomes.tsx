import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Line
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  PieChart as PieIcon,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Globe2,
  Award,
  Filter
} from 'lucide-react';

export interface OutcomeMetric {
  label: string;
  value: string;
  change: string;
  subtext: string;
}

export interface TimeSeriesPoint {
  period: string;
  beforeOrixnal: number;
  afterOrixnal: number;
  marketShare: number;
  benchmark: number;
  label?: string;
}

export interface CaseStudyData {
  id: string;
  title: string;
  category: string;
  badge: string;
  period: string;
  summary: string;
  keyMetrics: OutcomeMetric[];
  chartTitle: string;
  chartSubtitle: string;
  timeData: TimeSeriesPoint[];
  breakdown: Array<{
    phase: string;
    action: string;
    impact: string;
  }>;
}

const OUTCOMES_DATA: CaseStudyData[] = [
  {
    id: 'fintech',
    title: 'Fintech Payment Infrastructure',
    category: 'Fintech & B2B SaaS',
    badge: 'Fintech Case Study',
    period: '4 Quarters Scale Evaluation',
    summary: 'Shifting positioning from a generic dev tool to an institutional enterprise financial platform unlocked $100k+ contracts, expanded market share from 4.2% to 18.6%, and accelerated annual ARR growth by 300%.',
    keyMetrics: [
      { label: 'ARR Scale', value: '$4.8M', change: '+300%', subtext: 'Up from $1.2M before rebranding' },
      { label: 'Market Share', value: '18.6%', change: '+14.4%', subtext: 'Sector market share expansion' },
      { label: 'Sales Velocity', value: '45 Days', change: '-62%', subtext: 'Reduced from 120-day enterprise cycle' },
      { label: 'Avg Contract Value', value: '$115K', change: '+85%', subtext: 'From $62K initial deal size' }
    ],
    chartTitle: 'Quarterly Revenue & Sector Market Share Trajectory',
    chartSubtitle: 'Comparative analysis of ARR ($M) and Market Share (%) before vs. after ORIXNAL positioning & platform build',
    timeData: [
      { period: 'Q1 (Pre-ORIXNAL)', beforeOrixnal: 1.2, afterOrixnal: 1.2, marketShare: 4.2, benchmark: 4.0, label: 'Dev-tool positioning' },
      { period: 'Q2 (Deployment)', beforeOrixnal: 1.3, afterOrixnal: 2.1, marketShare: 8.5, benchmark: 4.5, label: 'Brand & Legal deployment' },
      { period: 'Q3 (GTM Scale)', beforeOrixnal: 1.5, afterOrixnal: 3.4, marketShare: 13.8, benchmark: 5.1, label: 'Enterprise inbound surge' },
      { period: 'Q4 (Global)', beforeOrixnal: 1.6, afterOrixnal: 4.8, marketShare: 18.6, benchmark: 5.8, label: 'UAE & SG Expansion' }
    ],
    breakdown: [
      { phase: '01. Legal & Positioning', action: 'Drafted institutional SLAs and secured international Class 36/42 trademarks.', impact: 'Eliminated enterprise procurement trust barriers.' },
      { phase: '02. React Engineering', action: 'Built precision React platform with uptime dashboards and API documentation.', impact: 'Reduced dev-to-sales handoff friction by 50%.' },
      { phase: '03. GTM Acceleration', action: 'Engineered targeted CFO buyer personas and value-based pricing tiers.', impact: 'Increased average deal size from $62K to $115K.' }
    ]
  },
  {
    id: 'd2c',
    title: 'Botanical Wellness Ecosystem',
    category: 'D2C & Consumer Goods',
    badge: 'D2C Case Study',
    period: '6 Months Post-Launch',
    summary: 'Constructed an ORIXNAL Masterbrand system allowing expansion into 22 SKUs across 3 sub-brands, capturing 12.4% category market share while slashing blended CAC by 58%.',
    keyMetrics: [
      { label: 'Category Share', value: '12.4%', change: '+9.2%', subtext: 'Niche market share gain' },
      { label: 'Repeat Customer Rate', value: '42%', change: '+200%', subtext: 'Industry benchmark is 14%' },
      { label: 'Blended CAC', value: '$18.40', change: '-58%', subtext: 'Reduced customer acquisition cost' },
      { label: 'SKU Portfolio', value: '22 SKUs', change: '5.5x', subtext: 'Expanded under sub-brand architecture' }
    ],
    chartTitle: 'Market Share Capture & Retention Trajectory (%)',
    chartSubtitle: 'Repeat order rate (%) and niche market share (%) over 6-month post-rebrand period',
    timeData: [
      { period: 'Month 1', beforeOrixnal: 12, afterOrixnal: 18, marketShare: 3.2, benchmark: 3.0, label: 'Package redesign' },
      { period: 'Month 2', beforeOrixnal: 13, afterOrixnal: 26, marketShare: 5.8, benchmark: 3.2, label: 'Sub-brand 1 release' },
      { period: 'Month 3', beforeOrixnal: 14, afterOrixnal: 34, marketShare: 8.9, benchmark: 3.5, label: 'Custom Shopify launch' },
      { period: 'Month 6', beforeOrixnal: 14, afterOrixnal: 42, marketShare: 12.4, benchmark: 3.8, label: '22 SKUs active' }
    ],
    breakdown: [
      { phase: '01. Sub-brand Architecture', action: 'Structured parent entity with 3 sub-brand tiers for beauty, beverage & supplements.', impact: 'Prevented brand dilution during catalog scale.' },
      { phase: '02. Tactile Packaging', action: 'Designed glass jars with botanical embossings and sustainable unboxing touchpoints.', impact: 'Generated 400+ organic customer social unboxings.' },
      { phase: '03. E-commerce UX', action: 'Custom Shopify storefront with high-converting quiz funnels and subscriptions.', impact: 'Boosted conversion rate by 3.8%.' }
    ]
  },
  {
    id: 'logistics',
    title: 'Intelligent Freight Platform',
    category: 'Supply Chain & B2B Logistics',
    badge: 'Logistics Case Study',
    period: '2 Quarters Execution',
    summary: 'Repositioned a legacy 15-year truck fleet operator into an intelligent freight orchestration platform, securing 14 national accounts and increasing margin premiums by 18%.',
    keyMetrics: [
      { label: 'Margin Premium', value: '+18%', change: '+1800 bps', subtext: 'Above unorganized market rates' },
      { label: 'Regional Share', value: '21.5%', change: '+13.1%', subtext: 'Regional freight corridor share' },
      { label: 'Fleet Utilization', value: '94%', change: '+28%', subtext: 'Optimized freight routing capacity' },
      { label: 'National Accounts', value: '14 B2B', change: '+360%', subtext: 'Enterprise retail distribution contracts' }
    ],
    chartTitle: 'Contract Margin Premium & Regional Market Share (%)',
    chartSubtitle: 'Gross margin percentage (%) and regional market share (%) over competitor baseline',
    timeData: [
      { period: 'Baseline', beforeOrixnal: 8, afterOrixnal: 8, marketShare: 8.4, benchmark: 7.0, label: 'Price-war bidding' },
      { period: 'Q1 Post-Rebrand', beforeOrixnal: 8, afterOrixnal: 14, marketShare: 12.2, benchmark: 7.5, label: 'Platform positioning' },
      { period: 'Q2 Scaling', beforeOrixnal: 9, afterOrixnal: 21, marketShare: 16.8, benchmark: 8.0, label: '14 National accounts' },
      { period: 'Q3 Enterprise', beforeOrixnal: 9, afterOrixnal: 26, marketShare: 21.5, benchmark: 8.5, label: 'Full fleet utilization' }
    ],
    breakdown: [
      { phase: '01. Category Reframe', action: 'Rebranded from "Fleet Operator" to "Intelligent Freight Orchestration Network".', impact: 'Allowed bidding on high-margin enterprise RFPs.' },
      { phase: '02. Physical & Web Presence', action: 'Redesigned fleet vehicle wraps, driver collateral, and real-time tracking portal.', impact: 'Transformed fleet into mobile high-visibility billboards.' },
      { phase: '03. SLA Legal Contracts', action: 'Drafted institutional B2B vendor contracts with transparent SLA penalties.', impact: 'Increased enterprise client confidence and retention.' }
    ]
  }
];

// Custom Minimal Recharts Tooltip matching ORIXNAL Brand Aesthetics
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-950 border border-purple-900/60 text-white rounded-2xl p-4 shadow-2xl text-xs space-y-2 min-w-[220px]">
        <p className="font-mono font-bold text-purple-300 border-b border-neutral-800 pb-1.5 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] uppercase text-neutral-400">ORIXNAL Metric</span>
        </p>
        {payload.map((entry: any, index: number) => {
          const isDollar = typeof entry.value === 'number' && entry.value < 10 && entry.name.includes('ARR');
          const formattedVal = isDollar ? `$${entry.value}M` : `${entry.value}%`;

          return (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 font-semibold">
              <span className="flex items-center gap-2 text-neutral-300">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                {formattedVal}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

interface CaseStudyOutcomesProps {
  className?: string;
  onOpenAudit?: () => void;
}

export const CaseStudyOutcomes: React.FC<CaseStudyOutcomesProps> = ({
  className = '',
  onOpenAudit
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('fintech');
  const [chartMetric, setChartMetric] = useState<'revenue' | 'marketShare' | 'comparison'>('revenue');
  const [viewMetricType, setViewMetricType] = useState<'chart' | 'growth' | 'phases'>('chart');

  const currentCase = OUTCOMES_DATA.find((item) => item.id === selectedCaseId) || OUTCOMES_DATA[0];

  return (
    <section className={`bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs space-y-10 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200/80 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-purple-700" />
            <span>Case Study Growth Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Quantifiable Impact Measured in Business Scale & Market Share
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Real strategic brand architecture moves bottom-line metrics: exponential revenue growth, rapid sector market share capture, margin expansion, and customer retention.
          </p>
        </div>

        {/* Case Study Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {OUTCOMES_DATA.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedCaseId === item.id
                  ? 'orixnal-gradient-bg text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Case Study Banner & Metrics Overview */}
      <div className="bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/70 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200/80 px-2.5 py-0.5 rounded-full">
                {currentCase.badge}
              </span>
              <span className="text-[10px] font-mono text-neutral-400 font-semibold">
                Evaluation Window: {currentCase.period}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
              {currentCase.title}
            </h3>
          </div>

          {/* View Toggle Buttons */}
          <div className="flex items-center bg-white border border-neutral-200 rounded-xl p-1 shrink-0 text-xs font-bold shadow-2xs">
            <button
              onClick={() => setViewMetricType('chart')}
              className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 ${
                viewMetricType === 'chart'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
              <span>Interactive Recharts</span>
            </button>
            <button
              onClick={() => setViewMetricType('growth')}
              className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 ${
                viewMetricType === 'growth'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Growth Metrics</span>
            </button>
            <button
              onClick={() => setViewMetricType('phases')}
              className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 ${
                viewMetricType === 'phases'
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>Strategic Drivers</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-4xl">
          {currentCase.summary}
        </p>

        {/* 4 Key Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {currentCase.keyMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 space-y-1.5 shadow-2xs hover:border-purple-300 transition-all group"
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-neutral-500">
                <span>{metric.label}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5 border border-emerald-200/60 font-mono">
                  <ArrowUpRight className="w-3 h-3" />
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 group-hover:text-purple-900 transition-colors tracking-tight">
                {metric.value}
              </div>
              <p className="text-[11px] text-neutral-500 line-clamp-1">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dynamic Interactive View */}
      <AnimatePresence mode="wait">
        {viewMetricType === 'chart' && (
          <motion.div
            key="chart-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Chart Control Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 text-white p-5 rounded-2xl border border-neutral-800">
              <div className="space-y-1">
                <h4 className="text-sm font-bold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-400" />
                  <span>{currentCase.chartTitle}</span>
                </h4>
                <p className="text-xs text-neutral-400">
                  {currentCase.chartSubtitle}
                </p>
              </div>

              {/* Sub-Metric Toggle */}
              <div className="flex items-center gap-2 bg-neutral-800 p-1 rounded-xl text-xs font-bold shrink-0 border border-neutral-700">
                <button
                  onClick={() => setChartMetric('revenue')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    chartMetric === 'revenue'
                      ? 'bg-purple-700 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Revenue / Scale
                </button>
                <button
                  onClick={() => setChartMetric('marketShare')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    chartMetric === 'marketShare'
                      ? 'bg-purple-700 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Market Share %
                </button>
                <button
                  onClick={() => setChartMetric('comparison')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    chartMetric === 'comparison'
                      ? 'bg-purple-700 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Combined
                </button>
              </div>
            </div>

            {/* Recharts Visualizer Canvas */}
            <div className="h-80 sm:h-96 w-full bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl p-4 sm:p-6 relative">
              <ResponsiveContainer width="100%" height="100%">
                {chartMetric === 'revenue' ? (
                  <AreaChart
                    data={currentCase.timeData}
                    margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="orixnalBrandGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#722693" stopOpacity={0.65} />
                        <stop offset="50%" stopColor="#A21C78" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#D31E59" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#737373" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#737373" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                    <XAxis
                      dataKey="period"
                      stroke="#525252"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#d4d4d4' }}
                    />
                    <YAxis
                      stroke="#525252"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => (val < 10 ? `$${val}M` : `${val}%`)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="afterOrixnal"
                      name="With ORIXNAL"
                      stroke="#722693"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#orixnalBrandGradient)"
                    />
                    <Area
                      type="monotone"
                      dataKey="beforeOrixnal"
                      name="Pre-ORIXNAL Baseline"
                      stroke="#737373"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#baselineGradient)"
                    />
                  </AreaChart>
                ) : chartMetric === 'marketShare' ? (
                  <BarChart
                    data={currentCase.timeData}
                    margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="barBrandGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#722693" />
                        <stop offset="100%" stopColor="#A21C78" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                    <XAxis
                      dataKey="period"
                      stroke="#525252"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#d4d4d4' }}
                    />
                    <YAxis
                      stroke="#525252"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => `${val}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="marketShare"
                      name="Market Share %"
                      fill="url(#barBrandGradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="benchmark"
                      name="Industry Benchmark"
                      fill="#d4d4d4"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <ComposedChart
                    data={currentCase.timeData}
                    margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="composedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A21C78" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#D31E59" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                    <XAxis
                      dataKey="period"
                      stroke="#525252"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#d4d4d4' }}
                    />
                    <YAxis
                      stroke="#525252"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="afterOrixnal"
                      name="Scale Trajectory"
                      fill="url(#composedGradient)"
                      stroke="#722693"
                      strokeWidth={2.5}
                    />
                    <Line
                      type="monotone"
                      dataKey="marketShare"
                      name="Market Share %"
                      stroke="#D31E59"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#D31E59', strokeWidth: 2, stroke: '#ffffff' }}
                    />
                  </ComposedChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Chart Legend Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF9F6] border border-neutral-200 text-xs font-mono">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#722693] inline-block" />
                  <span className="text-neutral-800 font-bold">ORIXNAL Engagement Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#D31E59] inline-block" />
                  <span className="text-neutral-800 font-bold">Market Share Capture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-neutral-400 inline-block" />
                  <span className="text-neutral-500">Unoptimized Baseline</span>
                </div>
              </div>

              <span className="text-neutral-400 text-[11px]">
                Data verified by audit methodology
              </span>
            </div>
          </motion.div>
        )}

        {viewMetricType === 'growth' && (
          <motion.div
            key="growth-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {currentCase.keyMetrics.map((item, i) => (
              <div
                key={i}
                className="bg-[#FAF9F6] border border-neutral-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-purple-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/60">
                      Metric 0{i + 1}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {item.change}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-neutral-900">{item.label}</h4>
                </div>

                <div className="py-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight">
                    {item.value}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 border-t border-neutral-200/80 pt-3">
                  {item.subtext}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {viewMetricType === 'phases' && (
          <motion.div
            key="phases-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2">
              3 Strategic Execution Pillars Driving This Growth
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCase.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF9F6] border border-neutral-200/90 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-purple-300 transition-all"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-extrabold text-purple-700 bg-purple-50 border border-purple-200/80 px-3 py-1 rounded-full inline-block">
                      {item.phase}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug">
                      {item.action}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200/80 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">
                      Measurable Business Outcome
                    </span>
                    <p className="text-xs text-neutral-700 font-semibold flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.impact}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 max-w-xl z-10">
          <h4 className="text-base font-extrabold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Ready to achieve measurable growth & market share for your brand?</span>
          </h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Schedule a 1-on-1 brand discovery audit directly with Founder Asim Khan to architect your growth roadmap.
          </p>
        </div>

        <button
          onClick={onOpenAudit}
          className="orixnal-gradient-bg text-white font-bold text-xs px-6 py-3 rounded-xl shadow-2xs hover:opacity-95 transition-all inline-flex items-center gap-2 shrink-0 z-10"
        >
          <span>Request Brand Diagnostic Audit</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

