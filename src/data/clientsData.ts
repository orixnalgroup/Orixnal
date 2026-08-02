export interface ClientPartner {
  id: string;
  name: string;
  category: 'Media & Broadcast' | 'D2C & Retail' | 'Real Estate & Infrastructure' | 'Telecom & Tech' | 'Institutions & Public' | 'Healthcare & Health' | 'Entertainment & Media';
  tagline?: string;
  description?: string;
  badge?: string;
  filterGroups?: string[];
}

export interface SuccessProject {
  id: string;
  title: string;
  role: string;
  category: 'Live Events & Culture' | 'Sports Marketing & IPL' | 'Film Festivals' | 'National Initiatives' | 'Pageants & Media' | 'Movie Marketing' | 'RWA & BTL Marketing';
  associatedWith?: string;
  description: string;
  highlights: string[];
  filterGroups?: string[];
}

export const CLIENTS_PARTNERS_LIST: ClientPartner[] = [
  { id: 'cp-1', name: 'Zee Salam', category: 'Media & Broadcast', tagline: 'National Television & Satellite Broadcasting Network', badge: 'Broadcast Partner', filterGroups: ['Media & Broadcast', 'Film/Events'] },
  { id: 'cp-2', name: '92.7 Big FM', category: 'Media & Broadcast', tagline: 'Leading Radio Network & Audio Entertainment', badge: 'Radio Partner', filterGroups: ['Media & Broadcast', 'Marketing'] },
  { id: 'cp-3', name: 'Capital Athena', category: 'Real Estate & Infrastructure', tagline: 'Luxury Residential Township & Architecture', badge: 'Real Estate', filterGroups: ['Real Estate & Infra'] },
  { id: 'cp-4', name: 'Sheron Buildcon', category: 'Real Estate & Infrastructure', tagline: 'Commercial & Residential Infrastructure Developers', badge: 'Infrastructure', filterGroups: ['Real Estate & Infra'] },
  { id: 'cp-5', name: 'Happily Unmarried', category: 'D2C & Retail', tagline: 'Iconic Youth Lifestyle & D2C Consumer Brand', badge: 'D2C Consumer', filterGroups: ['D2C & Retail', 'Marketing'] },
  { id: 'cp-6', name: 'Vodafone (UP West)', category: 'Telecom & Tech', tagline: 'Global Telecom Network Regional Strategy', badge: 'Telecom Giant', filterGroups: ['Telecom & Tech', 'Marketing'] },
  { id: 'cp-7', name: 'ABB Infotech', category: 'Telecom & Tech', tagline: 'IT Services & Software Solutions', badge: 'IT Services', filterGroups: ['Telecom & Tech', 'Consulting'] },
  { id: 'cp-8', name: 'CBS Park', category: 'Real Estate & Infrastructure', tagline: 'Commercial Hubs & Real Estate Complexes', badge: 'Commercial', filterGroups: ['Real Estate & Infra'] },
  { id: 'cp-9', name: 'VSG India', category: 'Institutions & Public', tagline: 'Corporate Services & Security Management', badge: 'Enterprise', filterGroups: ['Consulting'] },
  { id: 'cp-10', name: 'Jain TV', category: 'Media & Broadcast', tagline: 'Satellite News & Broadcast Network', badge: 'Television', filterGroups: ['Media & Broadcast'] },
  { id: 'cp-11', name: 'Mancare Health', category: 'Healthcare & Health', tagline: 'Wellness, Healthcare & Diagnostic Brand', badge: 'Healthcare', filterGroups: ['Healthcare'] },
  { id: 'cp-12', name: 'NBA Institute', category: 'Institutions & Public', tagline: 'National Media Academy & Higher Education', badge: 'Education', filterGroups: ['Consulting', 'Media & Broadcast'] },
  { id: 'cp-13', name: 'Indian National Congress (UP)', category: 'Institutions & Public', tagline: 'State Outreach & Public Communication Strategy', badge: 'Public Outreach', filterGroups: ['Consulting', 'Marketing'] },
  { id: 'cp-14', name: 'Rashtra Sewak Trust', category: 'Institutions & Public', tagline: 'National Heritage & Cultural Welfare Trust', badge: 'Project Associate', filterGroups: ['Consulting', 'Film/Events'] },
  { id: 'cp-15', name: 'Eixil Group', category: 'Entertainment & Media', tagline: 'Media Production & Film Alliances', badge: 'Project Associate', filterGroups: ['Film/Events', 'Media & Broadcast', 'Marketing'] },
];

export const SUCCESS_PROJECTS_LIST: SuccessProject[] = [
  {
    id: 'proj-1',
    title: 'Live Huvce Muqabla-E-Qawwali',
    role: 'Event Architecture, Branding & Live Operations',
    category: 'Live Events & Culture',
    description: 'A televised live Sufi and Qawwali cultural spectacle featuring renowned maestro vocalists. Executed end-to-end stage design, media promotions, and VIP guest management.',
    highlights: ['Multi-city televised broadcast coverage', 'Over 10,000+ live audience turnout', 'Comprehensive media sponsorship activation'],
    filterGroups: ['Film/Events', 'Media & Broadcast']
  },
  {
    id: 'proj-2',
    title: 'Happily Unmarried x Delhi Daredevils Pepsi IPL Campaign',
    role: 'Official Experiential Marketing & Stadium Activation Agency',
    category: 'Sports Marketing & IPL',
    description: 'High-energy, ground-level activation of Happily Unmarried products in collaboration with Delhi Daredevils players during the Pepsi IPL season.',
    highlights: ['Stadiwm fan zones & dugout brand placement', 'Direct engagement with 50,000+ cricket fans per match', 'High conversion youth merch sampling'],
    filterGroups: ['Marketing', 'D2C & Retail']
  },
  {
    id: 'proj-3',
    title: '5th Delhi International Film Festival',
    role: 'Official Marketing & PR Agency',
    category: 'Film Festivals',
    description: 'Appointed as the official marketing agency for the 5th edition of DIFF. Managed global delegate outreach, celebrity red carpet branding, and press communications.',
    highlights: ['200+ International films from 45 countries', 'Global film industry delegate onboarding', 'National print and TV press coverage'],
    filterGroups: ['Film/Events', 'Marketing']
  },
  {
    id: 'proj-4',
    title: 'Ek Shaam Shahidon Ke Naam',
    role: 'Strategic Event Partner & Creative Agency',
    category: 'National Initiatives',
    associatedWith: 'Rashtra Sewak Trust',
    description: 'A grand national tribute gala commemorating martyrs and freedom fighters, organized in partnership with Rashtra Sewak Trust.',
    highlights: ['Patriotic musical performances by national icons', 'Honoring families of war veterans', 'Widespread social and news coverage'],
    filterGroups: ['Consulting', 'Film/Events']
  },
  {
    id: 'proj-5',
    title: 'Mister India International',
    role: 'Official Marketing & Brand Strategy Agency',
    category: 'Pageants & Media',
    description: 'Engineered brand identity, sponsorship decks, media partnerships, and finale production for Mister India International pageant.',
    highlights: ['Pan-India auditions and contestant branding', 'National TV broadcast and digital stream', 'Sponsorship integration for premier fashion brands'],
    filterGroups: ['Film/Events', 'Marketing']
  },
  {
    id: 'proj-6',
    title: 'Sahib Biwi Aur Gangster Movie Promotion',
    role: 'Co-Marketing & Publicity Partner',
    category: 'Movie Marketing',
    associatedWith: 'Eixil Group',
    description: 'Executed high-impact multi-city promotional tours, press meets, and theater activations for the hit Bollywood feature film.',
    highlights: ['Star-cast press conferences & mall activations', 'High-impact outdoor billboard blitz', 'Box office buzz amplification'],
    filterGroups: ['Marketing', 'Film/Events']
  },
  {
    id: 'proj-7',
    title: 'R.R. Spices BTL & Retail Growth Campaign',
    role: 'Ground Marketing & RWA Activation Strategy',
    category: 'RWA & BTL Marketing',
    description: 'Hyper-local brand awareness drive for R.R. Spices across Resident Welfare Associations (RWAs), shopping malls, and local weekly markets.',
    highlights: ['100+ RWA housing society sampling booths', 'Live cooking demo stalls in premier malls', '300% increase in local retail channel velocity'],
    filterGroups: ['Marketing', 'D2C & Retail']
  }
];
