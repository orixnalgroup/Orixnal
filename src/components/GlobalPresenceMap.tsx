import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import worldDataRaw from 'world-atlas/countries-110m.json';
import {
  Globe2,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Zap,
  Phone,
  Compass,
  Layers,
  Clock,
  Award
} from 'lucide-react';

export interface GlobalHub {
  id: string;
  country: string;
  countryCode: string;
  isoId: string; // ISO 3166-1 numeric id in world-atlas
  city: string;
  coordinates: [number, number]; // [longitude, latitude]
  role: string;
  badge: string;
  status: string;
  description: string;
  metrics: {
    activeProjects: string;
    primaryIndustries: string[];
    timeZone: string;
  };
  keyFocus: string[];
  isHQ?: boolean;
}

export const GLOBAL_HUBS: GlobalHub[] = [
  {
    id: 'india',
    country: 'India',
    countryCode: 'IN',
    isoId: '356',
    city: 'Noida & Ghaziabad (NCR)',
    coordinates: [77.3910, 28.5355],
    role: 'Global Headquarters & Core Execution Engineering Studio',
    badge: 'Global HQ & Legal Entity',
    status: 'Ministry of MSME Registered',
    isHQ: true,
    description: 'The nerve center of ORIXNAL. Direct founder leadership by Asim Khan overseeing masterbrand strategy, Class 35/42 legal IP armor, and custom sub-second React engineering.',
    metrics: {
      activeProjects: '35+ Active Retainers',
      primaryIndustries: ['Fintech', 'D2C Masterbrands', 'Supply Chain', 'Gaming/Esports'],
      timeZone: 'IST (UTC+5:30)'
    },
    keyFocus: [
      'Masterbrand Strategy & Corporate Positioning',
      'Ministry of MSME & International Trademark Armor',
      'High-Performance Web Engineering (React / Vite)',
      'FOOOZ™ Gaming & Esports Venture Incubation'
    ]
  },
  {
    id: 'uae',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    isoId: '784',
    city: 'Dubai (DIFC / Business Bay)',
    coordinates: [55.2708, 25.2048],
    role: 'MENA Enterprise & Sovereign Venture Advisory Hub',
    badge: 'MENA Expansion Hub',
    status: 'Active Advisory',
    description: 'Guiding luxury consumer brands, Web3 infrastructure, and fintech ventures scaling across Dubai, Abu Dhabi, and the broader GCC region.',
    metrics: {
      activeProjects: '8 Sovereign Projects',
      primaryIndustries: ['Luxury Real Estate', 'Cross-Border Fintech', 'Web3 & AI'],
      timeZone: 'GST (UTC+4)'
    },
    keyFocus: [
      'GCC Market Entry & Cultural Alignment',
      'International Holding Company Positioning',
      'Bilingual Arabic / English Brand Architecture',
      'Enterprise Investor Pitch Deck Engineering'
    ]
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    countryCode: 'GB',
    isoId: '826',
    city: 'London (Mayfair & Tech City)',
    coordinates: [-0.1276, 51.5074],
    role: 'European Corporate Advisory & Brand IP Studio',
    badge: 'European Hub',
    status: 'Active Advisory',
    description: 'Supporting UK and European B2B SaaS firms, private equity portfolios, and fintech startups expanding into Asian and Global markets.',
    metrics: {
      activeProjects: '6 Enterprise Accounts',
      primaryIndustries: ['B2B SaaS', 'Financial Services', 'Legal Tech'],
      timeZone: 'GMT / BST (UTC+0/+1)'
    },
    keyFocus: [
      'UK Intellectual Property Office (UKIPO) Alignment',
      'Enterprise B2B Positioning & SLA Packaging',
      'ESG & Corporate Governance Brand Design',
      'Cross-Border M&A Brand Re-Architecture'
    ]
  },
  {
    id: 'us',
    country: 'United States',
    countryCode: 'US',
    isoId: '840',
    city: 'New York & Silicon Valley',
    coordinates: [-74.0060, 40.7128],
    role: 'North America Enterprise Growth & VC Scaling Desk',
    badge: 'North America Hub',
    status: 'Active Advisory',
    description: 'Accelerating venture-backed US startups and enterprise SaaS platforms with distinct visual dialects, sub-second web platforms, and positioning clarity.',
    metrics: {
      activeProjects: '12 Venture Accounts',
      primaryIndustries: ['Deep Tech', 'AI & Data Infrastructure', 'D2C Consumer'],
      timeZone: 'EST / PST (UTC-5/-8)'
    },
    keyFocus: [
      'US Trademark Clearance & USPTO Strategy',
      'Series A – C Growth Brand Positioning',
      'High-Conversion Product Design Systems',
      'Developer Tool to Enterprise Pivot'
    ]
  },
  {
    id: 'ca',
    country: 'Canada',
    countryCode: 'CA',
    isoId: '124',
    city: 'Toronto & Vancouver',
    coordinates: [-79.3832, 43.6532],
    role: 'D2C E-Commerce & Cross-Border Logistics Hub',
    badge: 'North America Desk',
    status: 'Active Advisory',
    description: 'Partnering with Canadian e-commerce innovators, D2C multi-SKU brands, and supply chain logistics providers targeting international scale.',
    metrics: {
      activeProjects: '5 D2C Retainers',
      primaryIndustries: ['D2C Brands', 'Supply Chain Tech', 'Renewable Energy'],
      timeZone: 'EST (UTC-5)'
    },
    keyFocus: [
      'Shopify Plus & Custom React Storefronts',
      'Multi-SKU Sub-brand Packaging Architecture',
      'Omnichannel Brand Identity Guidelines',
      'Supply Chain Platform Re-branding'
    ]
  },
  {
    id: 'au',
    country: 'Australia',
    countryCode: 'AU',
    isoId: '036',
    city: 'Sydney & Melbourne',
    coordinates: [151.2093, -33.8688],
    role: 'APAC Expansion & Venture Incubation Hub',
    badge: 'APAC Growth Hub',
    status: 'Active Advisory',
    description: 'Connecting APAC innovators and Australian enterprise brands with global markets through sovereign brand development and custom digital engineering.',
    metrics: {
      activeProjects: '4 Growth Retainers',
      primaryIndustries: ['Fintech & Payments', 'Clean Energy', 'HealthTech'],
      timeZone: 'AEST (UTC+10)'
    },
    keyFocus: [
      'APAC Market Position Refinement',
      'Sub-second Mobile Web Performance',
      'International IP Defense Alignment',
      'Founder-Led Growth Workshops'
    ]
  }
];

interface GlobalPresenceMapProps {
  className?: string;
  onOpenAudit?: () => void;
}

export const GlobalPresenceMap: React.FC<GlobalPresenceMapProps> = ({
  className = '',
  onOpenAudit
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [selectedHubId, setSelectedHubId] = useState<string>('india');
  const [showArcs, setShowArcs] = useState<boolean>(true);
  const [hoveredHub, setHoveredHub] = useState<GlobalHub | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const selectedHub = useMemo(
    () => GLOBAL_HUBS.find((h) => h.id === selectedHubId) || GLOBAL_HUBS[0],
    [selectedHubId]
  );

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 900;
    const height = Math.max(420, Math.min(520, width * 0.52));

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', height);

    // Natural Earth projection suited for global view
    const projection = d3
      .geoNaturalEarth1()
      .scale(width / 5.8)
      .translate([width / 2.05, height / 1.75]);

    const pathGenerator = d3.geoPath().projection(projection);

    // Convert TopoJSON to GeoJSON
    const worldGeoJson = topojson.feature(
      worldDataRaw as any,
      worldDataRaw.objects.countries as any
    ) as any;

    const hqHub = GLOBAL_HUBS.find((h) => h.isHQ)!;
    const hqCoords = projection(hqHub.coordinates)!;

    // Create defs for gradients and glow filters
    const defs = svg.append('defs');

    // Glow filter
    const filter = defs.append('filter').attr('id', 'orixnal-glow').attr('x', '-30%').attr('y', '-30%').attr('width', '160%').attr('height', '160%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'blur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Linear gradients for connection arcs
    GLOBAL_HUBS.filter((h) => !h.isHQ).forEach((hub) => {
      const grad = defs
        .append('linearGradient')
        .attr('id', `arcGrad-${hub.id}`)
        .attr('gradientUnits', 'userSpaceOnUse');

      const targetCoords = projection(hub.coordinates)!;
      grad
        .attr('x1', hqCoords[0])
        .attr('y1', hqCoords[1])
        .attr('x2', targetCoords[0])
        .attr('y2', targetCoords[1]);

      grad.append('stop').attr('offset', '0%').attr('stop-color', '#722693').attr('stop-opacity', '0.9');
      grad.append('stop').attr('offset', '50%').attr('stop-color', '#A21C78').attr('stop-opacity', '0.8');
      grad.append('stop').attr('offset', '100%').attr('stop-color', '#D31E59').attr('stop-opacity', '0.9');
    });

    // Map background group
    const gMap = svg.append('g').attr('class', 'countries-group');

    // Map iso numeric IDs to hubs
    const hubIsoSet = new Set(GLOBAL_HUBS.map((h) => h.isoId));

    // Render Country Shapes
    gMap
      .selectAll('path.country')
      .data(worldGeoJson.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', pathGenerator as any)
      .attr('fill', (d: any) => {
        const isPresence = hubIsoSet.has(String(d.id));
        if (isPresence) {
          return String(d.id) === selectedHub.isoId ? '#722693' : '#a21c78';
        }
        return '#f0eee9';
      })
      .attr('stroke', (d: any) => {
        const isPresence = hubIsoSet.has(String(d.id));
        return isPresence ? '#ffffff' : '#d8d5ce';
      })
      .attr('stroke-width', (d: any) => {
        const isPresence = hubIsoSet.has(String(d.id));
        return isPresence ? 1.2 : 0.6;
      })
      .attr('opacity', (d: any) => {
        const isPresence = hubIsoSet.has(String(d.id));
        return isPresence ? 0.95 : 0.85;
      })
      .style('cursor', (d: any) => (hubIsoSet.has(String(d.id)) ? 'pointer' : 'default'))
      .style('transition', 'all 0.3s ease')
      .on('mouseenter', function (event, d: any) {
        const matchHub = GLOBAL_HUBS.find((h) => h.isoId === String(d.id));
        if (matchHub) {
          d3.select(this).attr('fill', '#d31e59').attr('opacity', 1);
          setHoveredHub(matchHub);
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltipPos({ x: mx, y: my });
        }
      })
      .on('mousemove', (event) => {
        const [mx, my] = d3.pointer(event, svgRef.current);
        setTooltipPos({ x: mx, y: my });
      })
      .on('mouseleave', function (event, d: any) {
        const matchHub = GLOBAL_HUBS.find((h) => h.isoId === String(d.id));
        if (matchHub) {
          const isSelected = matchHub.id === selectedHubId;
          d3.select(this)
            .attr('fill', isSelected ? '#722693' : '#a21c78')
            .attr('opacity', 0.95);
        }
        setHoveredHub(null);
        setTooltipPos(null);
      })
      .on('click', (event, d: any) => {
        const matchHub = GLOBAL_HUBS.find((h) => h.isoId === String(d.id));
        if (matchHub) {
          setSelectedHubId(matchHub.id);
        }
      });

    // Render Connecting Arcs
    if (showArcs) {
      const gArcs = svg.append('g').attr('class', 'arcs-group');

      GLOBAL_HUBS.filter((h) => !h.isHQ).forEach((hub) => {
        const targetPos = projection(hub.coordinates);
        if (!targetPos) return;

        // D3 Great Circle Interpolator
        const interpolator = d3.geoInterpolate(hqHub.coordinates, hub.coordinates);

        const arcPointsCount = 50;
        const arcGeoPoints: [number, number][] = [];
        for (let i = 0; i <= arcPointsCount; i++) {
          arcGeoPoints.push(interpolator(i / arcPointsCount));
        }

        const geoLineString = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: arcGeoPoints
          }
        };

        const arcPath = pathGenerator(geoLineString as any);
        if (!arcPath) return;

        // Static dashed arc line
        gArcs
          .append('path')
          .attr('d', arcPath)
          .attr('fill', 'none')
          .attr('stroke', `url(#arcGrad-${hub.id})`)
          .attr('stroke-width', selectedHubId === hub.id ? 2.5 : 1.5)
          .attr('stroke-dasharray', selectedHubId === hub.id ? '6 3' : '4 4')
          .attr('opacity', selectedHubId === hub.id ? 0.95 : 0.6)
          .style('transition', 'all 0.3s ease');
      });
    }

    // Render Location Pin Nodes & Pulse Rings
    const gNodes = svg.append('g').attr('class', 'nodes-group');

    GLOBAL_HUBS.forEach((hub) => {
      const pos = projection(hub.coordinates);
      if (!pos) return;

      const [px, py] = pos;
      const isSelected = hub.id === selectedHubId;

      const nodeGroup = gNodes
        .append('g')
        .attr('class', `node-${hub.id}`)
        .style('cursor', 'pointer')
        .on('click', () => setSelectedHubId(hub.id))
        .on('mouseenter', (event) => {
          setHoveredHub(hub);
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltipPos({ x: mx, y: my });
        })
        .on('mousemove', (event) => {
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltipPos({ x: mx, y: my });
        })
        .on('mouseleave', () => {
          setHoveredHub(null);
          setTooltipPos(null);
        });

      // Outer animated pulse ring
      nodeGroup
        .append('circle')
        .attr('cx', px)
        .attr('cy', py)
        .attr('r', isSelected ? 14 : hub.isHQ ? 12 : 8)
        .attr('fill', hub.isHQ ? '#411466' : '#A21C78')
        .attr('opacity', 0.25)
        .append('animate')
        .attr('attributeName', 'r')
        .attr('values', `${isSelected ? 10 : 6};${isSelected ? 20 : 14};${isSelected ? 10 : 6}`)
        .attr('dur', hub.isHQ ? '2s' : '3s')
        .attr('repeatCount', 'indefinite');

      // Main Pin Circle
      nodeGroup
        .append('circle')
        .attr('cx', px)
        .attr('cy', py)
        .attr('r', isSelected ? 8 : hub.isHQ ? 7 : 5)
        .attr('fill', isSelected ? '#D31E59' : hub.isHQ ? '#411466' : '#722693')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', isSelected ? 2.5 : 1.5)
        .attr('filter', isSelected ? 'url(#orixnal-glow)' : null);

      // Label Text for Key Capitals
      nodeGroup
        .append('text')
        .attr('x', px + (px > width * 0.7 ? -10 : 10))
        .attr('y', py + 4)
        .attr('text-anchor', px > width * 0.7 ? 'end' : 'start')
        .attr('fill', isSelected ? '#411466' : '#333333')
        .attr('font-size', isSelected ? '11px' : '9.5px')
        .attr('font-weight', isSelected || hub.isHQ ? '800' : '600')
        .attr('font-family', 'sans-serif')
        .text(`${hub.countryCode} · ${hub.city.split(' ')[0]}`);
    });

  }, [selectedHubId, showArcs, selectedHub]);

  return (
    <div className={`bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xs ${className}`}>
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200/80 pb-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 orixnal-badge text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5 text-purple-700" />
            <span>D3.js Global Spatial Visualization</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            ORIXNAL Global Footprint & Sovereign Advisory Hubs
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Headquartered in India with active founder-led advisory desks across the UAE, UK, US, Canada, and Australia. Integrated legal IP defense and custom engineering for cross-border enterprise scale.
          </p>
        </div>

        {/* Arc Toggle & Map Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setShowArcs(!showArcs)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 border ${
              showArcs
                ? 'bg-purple-50 text-purple-900 border-purple-200 shadow-2xs'
                : 'bg-neutral-100 text-neutral-600 border-neutral-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-purple-700" />
            <span>{showArcs ? 'HQ Connections Active' : 'Show HQ Arcs'}</span>
          </button>

          <span className="text-xs font-mono font-bold bg-neutral-900 text-white px-3.5 py-2 rounded-xl">
            6 Global Hubs
          </span>
        </div>
      </div>

      {/* Country Hub Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {GLOBAL_HUBS.map((hub) => {
          const isSelected = hub.id === selectedHubId;

          return (
            <button
              key={hub.id}
              onClick={() => setSelectedHubId(hub.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 border ${
                isSelected
                  ? 'orixnal-gradient-bg text-white border-transparent shadow-sm scale-102'
                  : 'bg-[#FAF9F6] text-neutral-700 border-neutral-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${hub.isHQ ? 'bg-amber-400' : isSelected ? 'bg-white' : 'bg-purple-600'}`} />
              <span>{hub.country}</span>
              {hub.isHQ && <span className="text-[10px] font-mono opacity-90 uppercase">HQ</span>}
            </button>
          );
        })}
      </div>

      {/* Interactive D3 World Map Canvas */}
      <div
        ref={containerRef}
        className="w-full bg-[#FAF8F5] border border-neutral-200 rounded-3xl p-4 sm:p-6 relative overflow-hidden shadow-2xs min-h-[380px]"
      >
        <svg ref={svgRef} className="w-full h-auto drop-shadow-2xs select-none" />

        {/* Hover Floating Tooltip */}
        {hoveredHub && tooltipPos && (
          <div
            className="absolute z-30 pointer-events-none bg-neutral-950 text-white p-3 rounded-xl shadow-xl border border-purple-800/60 text-xs space-y-1 animate-in fade-in duration-150"
            style={{
              left: `${tooltipPos.x + 12}px`,
              top: `${tooltipPos.y - 45}px`
            }}
          >
            <div className="font-extrabold text-purple-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>{hoveredHub.country} ({hoveredHub.countryCode})</span>
            </div>
            <div className="text-[11px] text-neutral-300 font-mono">
              {hoveredHub.city}
            </div>
            <div className="text-[10px] text-amber-300 font-semibold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
              {hoveredHub.badge}
            </div>
          </div>
        )}

        {/* Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 sm:left-6 z-20 bg-white/90 backdrop-blur-md border border-neutral-200/90 rounded-2xl p-3 sm:p-4 text-xs font-mono space-y-1.5 shadow-md max-w-xs">
          <div className="flex items-center gap-2 font-bold text-neutral-900 text-[11px] uppercase tracking-wider pb-1 border-b border-neutral-200">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>Map Architecture Legend</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-700">
            <span className="w-2.5 h-2.5 rounded-full bg-[#411466]" />
            <span>India Global HQ (Noida/Delhi)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-700">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A21C78]" />
            <span>Active International Hubs</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5e5e5] border border-neutral-300" />
            <span>Global Market Coverage</span>
          </div>
        </div>
      </div>

      {/* Selected Country Hub Detail Card */}
      <div className="bg-[#FAF9F6] border border-neutral-200/90 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-800 bg-purple-100/80 border border-purple-200 px-3 py-0.5 rounded-full uppercase">
                {selectedHub.badge}
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {selectedHub.status}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 pt-1">
              {selectedHub.country} Hub · {selectedHub.city}
            </h3>
            <p className="text-xs font-mono text-purple-700 font-semibold">
              {selectedHub.role}
            </p>
          </div>

          {onOpenAudit && (
            <button
              onClick={onOpenAudit}
              className="orixnal-gradient-bg text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xs hover:opacity-95 transition-all inline-flex items-center justify-center gap-2 shrink-0"
            >
              <span>Initiate {selectedHub.countryCode} Advisory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
          {selectedHub.description}
        </p>

        {/* Hub Specs & Focus Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Key Strategic Deliverables */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-700" />
              <span>Core Strategic Focus Areas</span>
            </h4>
            <div className="space-y-2 text-xs text-neutral-800 font-medium">
              {selectedHub.keyFocus.map((focus, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{focus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Hub Specifications */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>Hub Operational Metrics</span>
            </h4>
            <div className="space-y-2 text-xs text-neutral-700">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="font-mono text-neutral-500">Active Accounts</span>
                <span className="font-bold text-neutral-900">{selectedHub.metrics.activeProjects}</span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <span className="font-mono text-neutral-500">Primary Time Zone</span>
                <span className="font-bold text-neutral-900 font-mono">{selectedHub.metrics.timeZone}</span>
              </div>
              <div>
                <span className="font-mono text-neutral-500 block mb-1">Key Industry Focus</span>
                <div className="flex flex-wrap gap-1">
                  {selectedHub.metrics.primaryIndustries.map((ind, iIdx) => (
                    <span
                      key={iIdx}
                      className="text-[10px] font-mono bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded border border-neutral-200"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Commitment Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-center space-y-1">
          <span className="text-xl font-extrabold text-neutral-900 font-mono">100%</span>
          <span className="text-xs font-bold text-purple-700 block">Founder Oversight</span>
          <span className="text-[10px] text-neutral-500 block">Asim Khan Direct</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-center space-y-1">
          <span className="text-xl font-extrabold text-neutral-900 font-mono">6 Countries</span>
          <span className="text-xs font-bold text-purple-700 block">International Footprint</span>
          <span className="text-[10px] text-neutral-500 block">IN, UAE, UK, US, CA, AU</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-center space-y-1">
          <span className="text-xl font-extrabold text-neutral-900 font-mono">24/7</span>
          <span className="text-xs font-bold text-purple-700 block">Time Zone Coverage</span>
          <span className="text-[10px] text-neutral-500 block">Cross-Border Service</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-neutral-200 text-center space-y-1">
          <span className="text-xl font-extrabold text-neutral-900 font-mono">Class 35/42</span>
          <span className="text-xs font-bold text-purple-700 block">Global IP Compliance</span>
          <span className="text-[10px] text-neutral-500 block">Ministry of MSME Accredited</span>
        </div>
      </div>
    </div>
  );
};
