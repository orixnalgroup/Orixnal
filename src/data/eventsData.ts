import { OrixnalEvent } from '../types';

export const ADMIN_EMAIL = 'event@orixnal.com';
export const DEFAULT_TEMP_PASSWORD = 'Orixnal7838';

export const INITIAL_EVENTS: OrixnalEvent[] = [
  {
    id: 'evt-001',
    name: 'ORIXNAL® Global Brand & IP Strategy Summit 2026',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-08-10',
    endDate: '2026-08-12',
    startTime: '10:00 AM',
    endTime: '06:00 PM',
    location: 'E-Square Building, Sector 96, Noida & Global Virtual Stream',
    description: 'An intensive 3-day flagship summit hosted by Founder Asim Khan. Designed for CXOs, startup founders, and brand custodians to master trademark class defense, market positioning math, and conversion-engineered visual systems.',
    activities: [
      '360° Strategic Brand Audit & Live Teardowns',
      'Class 35 & 42 Legal Trademark Defense Masterclass',
      'AI & Web Engineering Architecture Showcase',
      'Founder 1-on-1 Strategic Advisory Circles',
      'VIP Founders Gala & Networking Dinner'
    ],
    status: 'Current',
    ticket: {
      price: '₹4,999 (Delegate) / Free for Invited CXOs',
      availability: 'Selling Fast',
      bookingUrl: 'mailto:hello@orixnal.com?subject=RSVP%20for%20ORIXNAL%20Brand%20Summit%202026',
      notes: 'Includes access to all keynote stages, IP audit toolkit, and networking lounge.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80'
    ],
    featuredOnHome: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-002',
    name: 'D2C & Tech Growth Conclave 2026',
    bannerImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-09-25',
    endDate: '2026-09-26',
    startTime: '09:30 AM',
    endTime: '05:30 PM',
    location: 'DLF CyberCity, Gurugram & Hybrid Broadcast',
    description: 'An invitation-only gathering focusing on scaling consumer brands and SaaS platforms. Unlocking actionable frameworks for zero-to-one brand creation and global trademark filing.',
    activities: [
      'D2C Unit Economics & Brand Equity Keynotes',
      'Global Patent & Trademark Protection Panel',
      'Conversion UI/UX Live Code Reviews',
      'Venture Capital & Investor Pitchbook Sessions'
    ],
    status: 'Upcoming',
    ticket: {
      price: '₹9,999 VIP Pass / Invite Only',
      availability: 'Available',
      bookingUrl: 'tel:+918447561650',
      notes: 'Priority seating and exclusive dinner with Founder Asim Khan.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531058240690-006c446962d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
    ],
    featuredOnHome: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-003',
    name: 'FOOOZ™ Esports & Culinary Festival 2026',
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-10-18',
    endDate: '2026-10-20',
    startTime: '11:00 AM',
    endTime: '09:00 PM',
    location: 'Jawaharlal Nehru Stadium Arena, New Delhi',
    description: 'ORIXNAL sub-brand FOOOZ™ brings together top gaming creators, esports champions, food innovators, and digital lifestyle icons for a 3-day immersive festival.',
    activities: [
      'Sovereign Esports Invitational Finals',
      'FOOOZ™ Gourmet Food & Beverage Street',
      'Digital Creator Brand Identity Clinics',
      'Live DJ Sets & Holographic Art Installations'
    ],
    status: 'Upcoming',
    ticket: {
      price: '₹999 General Festival Pass',
      availability: 'Available',
      bookingUrl: 'mailto:hello@orixnal.com?subject=FOOOZ%20Festival%20Passes',
      notes: 'Includes access to gaming arena, food stalls, and music stages.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80'
    ],
    featuredOnHome: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'evt-004',
    name: 'ORIXNAL Spring Strategic Roundtable 2026',
    bannerImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-05-14',
    endDate: '2026-05-14',
    startTime: '02:00 PM',
    endTime: '07:00 PM',
    location: 'The Leela Palace, Diplomatic Enclave, New Delhi',
    description: 'A closed-door strategic session featuring 25 selected CXOs analyzing the shift toward AI-native brand architecture and legal IP protection.',
    activities: [
      'Closed-Door CXO Keynote & Market Audit',
      'Unveiling of ORIXNAL Brand Benchmark Index',
      'Private Executive Dinner'
    ],
    status: 'Past',
    ticket: {
      price: 'Executive Pass (Closed Event)',
      availability: 'Sold Out',
      notes: 'Event successfully concluded. Summary reports distributed to attendees.'
    },
    gallery: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
    ],
    featuredOnHome: false,
    createdAt: new Date().toISOString()
  }
];

const EVENTS_STORAGE_KEY = 'orixnal_events_v1';
const ADMIN_PASSWORD_KEY = 'orixnal_admin_password_v1';
const ADMIN_SESSION_KEY = 'orixnal_admin_session_v1';

export function getEvents(): OrixnalEvent[] {
  if (typeof window === 'undefined') {
    return INITIAL_EVENTS;
  }
  try {
    const data = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load events from localStorage:', err);
    return INITIAL_EVENTS;
  }
}

export function saveEvents(events: OrixnalEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch (err) {
    console.error('Failed to save events to localStorage:', err);
  }
}

export function addEvent(newEvent: Omit<OrixnalEvent, 'id' | 'createdAt'>): OrixnalEvent {
  const events = getEvents();
  const created: OrixnalEvent = {
    ...newEvent,
    id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString()
  };
  events.unshift(created);
  saveEvents(events);
  return created;
}

export function updateEvent(id: string, updated: Partial<OrixnalEvent>): OrixnalEvent | null {
  const events = getEvents();
  const index = events.findIndex((e) => e.id === id);
  if (index === -1) return null;

  events[index] = {
    ...events[index],
    ...updated
  };
  saveEvents(events);
  return events[index];
}

export function deleteEvent(id: string): boolean {
  const events = getEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length === events.length) return false;
  saveEvents(filtered);
  return true;
}

// Admin Password & Session Handlers
export function getAdminPassword(): string {
  try {
    return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_TEMP_PASSWORD;
  } catch {
    return DEFAULT_TEMP_PASSWORD;
  }
}

export function setAdminPassword(newPass: string): void {
  try {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
  } catch (err) {
    console.error('Failed to update admin password:', err);
  }
}

export function isUsingTempPassword(): boolean {
  return getAdminPassword() === DEFAULT_TEMP_PASSWORD;
}

export function verifyAdminLogin(email: string, pass: string): { success: boolean; isTemp: boolean; message: string } {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return { success: false, isTemp: false, message: 'Invalid admin email address.' };
  }

  const currentPass = getAdminPassword();
  if (pass !== currentPass) {
    return { success: false, isTemp: false, message: 'Incorrect password entered.' };
  }

  const isTemp = currentPass === DEFAULT_TEMP_PASSWORD;
  setAdminSession(true);
  return {
    success: true,
    isTemp,
    message: isTemp
      ? 'Logged in with temporary password. Please update your password now.'
      : 'Admin authentication successful!'
  };
}

export function isAdminSessionActive(): boolean {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminSession(active: boolean): void {
  try {
    if (active) {
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (err) {
    console.error('Failed to set admin session:', err);
  }
}
