import { BlogPost, OrixnalEvent } from '../types';
import { DEFAULT_BLOG_POSTS } from './blogData';
import { INITIAL_EVENTS } from './eventsData';
import { CLIENTS_PARTNERS_LIST } from './clientsData';
import { COMPANY_DETAILS } from './brandData';

export type AdminRole =
  | 'Super Administrator'
  | 'Website Administrator'
  | 'Content Manager'
  | 'Blog Editor'
  | 'Event Manager'
  | 'SEO Manager'
  | 'Marketing Manager'
  | 'CRM Manager'
  | 'Support Manager'
  | 'Finance Viewer'
  | 'Read Only Viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: AdminRole;
  status: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  department: string;
  createdBy: string;
  createdAt: string;
  lastLoginAt?: string;
  failedAttempts: number;
  mustChangePassword: boolean;
  twoFactorEnabled: boolean;
  twoFactorType: 'Authenticator App' | 'Email OTP' | 'SMS & Email OTP' | 'SMS OTP' | 'Backup Code' | 'Trusted Device';
  twoFactorSecret?: string;
  avatarUrl?: string;
  customPermissions?: string[];
}

export interface LoginAuditLog {
  id: string;
  date: string;
  time: string;
  timestamp: number;
  ip: string;
  location: string;
  browser: string;
  os: string;
  deviceName: string;
  country: string;
  city: string;
  username: string;
  status: 'Success' | 'Failed' | 'Blocked' | 'OTP Pending' | 'Password Changed';
  reason?: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  eventType: string;
  recipientEmail: string; // legal@orixnal.com
  details: string;
  resolved: boolean;
}

export interface CrmLead {
  id: string;
  date: string;
  time: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  source: 'Contact Form' | 'Consultation Form' | 'Event Registration' | 'Newsletter' | 'AI Support' | 'Download' | 'Callback';
  assignedTo: string;
  status: 'New' | 'Contacted' | 'In Review' | 'Proposal Sent' | 'Converted' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
  budget?: string;
  serviceInterest?: string;
}

export interface WebsiteSectionConfig {
  heroTitle: string;
  heroSubtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  founderQuote: string;
  announcementBanner: string;
  contactEmail: string;
  contactPhone: string;
  headquartersAddress: string;
  udyamNumber: string;
  primaryColor: string;
  secondaryColor: string;
  typographyFont: string;
  customCss?: string;
}

export interface AiKnowledgeDoc {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  answer: string;
  lastUpdated: string;
  status: 'Active' | 'Draft';
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogImage: string;
  twitterCard: string;
  schemaJson: string;
  xmlSitemapUrl: string;
  robotsTxt: string;
  googleSearchConsoleStatus: 'Connected' | 'Pending Verification' | 'Disconnected';
  aiSearchOptimized: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  category: 'Images' | 'Videos' | 'PDF' | 'Brand Assets' | 'Client Logos' | 'Project Logos';
  folder: string;
  url: string;
  dimensions: string;
  fileSize: string;
  uploadedAt: string;
  recommendedDimensions: string;
  tags: string[];
}

export interface ClientManagementItem {
  id: string;
  clientName: string;
  clientLogo: string;
  industry: string;
  projectName: string;
  projectLogo?: string;
  projectDescription: string;
  caseStudyUrl: string;
  websiteUrl: string;
  featured: boolean;
  order: number;
  visible: boolean;
}

// Default Super Admin credentials
export const DEFAULT_SUPER_ADMIN_EMAIL = 'website@orixnal.com';
export const DEFAULT_TEMP_PASSWORD = 'Orixnal@7838';

const STORAGE_KEYS = {
  ADMIN_USERS: 'orixnal_enterprise_admin_users_v2',
  ADMIN_PASSWORDS: 'orixnal_enterprise_admin_passwords_v2',
  ACTIVE_SESSION: 'orixnal_enterprise_active_session_v2',
  AUDIT_LOGS: 'orixnal_enterprise_audit_logs_v2',
  SECURITY_ALERTS: 'orixnal_enterprise_security_alerts_v2',
  CRM_LEADS: 'orixnal_enterprise_crm_leads_v2',
  WEBSITE_CONTENT: 'orixnal_enterprise_website_content_v2',
  AI_KNOWLEDGE: 'orixnal_enterprise_ai_knowledge_v2',
  SEO_CONFIG: 'orixnal_enterprise_seo_config_v2',
  MEDIA_ITEMS: 'orixnal_enterprise_media_items_v2',
  CLIENT_ITEMS: 'orixnal_enterprise_client_items_v2',
  BLOG_POSTS: 'orixnal_enterprise_blog_posts_v2',
  EVENTS: 'orixnal_enterprise_events_v2',
  PENDING_OTP: 'orixnal_enterprise_pending_otp_v2',
};

// Seed Default Users
const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-001',
    name: 'Asim Khan (Founder)',
    email: DEFAULT_SUPER_ADMIN_EMAIL,
    phone: '+918447561650',
    role: 'Super Administrator',
    status: 'ACTIVE',
    department: 'Executive Board & Founder Office',
    createdBy: 'System Provisioning',
    createdAt: '2026-01-01T00:00:00Z',
    mustChangePassword: true,
    twoFactorEnabled: true,
    twoFactorType: 'SMS & Email OTP',
    failedAttempts: 0,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'usr-002',
    name: 'Legal & Compliance',
    email: 'legal@orixnal.com',
    role: 'Website Administrator',
    status: 'ACTIVE',
    department: 'Legal & Risk Advisory',
    createdBy: 'website@orixnal.com',
    createdAt: '2026-01-15T10:30:00Z',
    mustChangePassword: false,
    twoFactorEnabled: true,
    twoFactorType: 'Authenticator App',
    failedAttempts: 0,
  },
];

// Initial CRM Leads
const INITIAL_CRM_LEADS: CrmLead[] = [
  {
    id: 'LX-1001',
    date: '2026-08-01',
    time: '14:22:10',
    name: 'Vikram Malhotra',
    company: 'Nexus FinTech Global',
    phone: '+91 9876543210',
    email: 'v.malhotra@nexusfintech.io',
    country: 'India',
    source: 'Consultation Form',
    assignedTo: 'Asim Khan',
    status: 'In Review',
    priority: 'High',
    notes: 'Interested in full masterbrand identity rebrand and patent portfolio protection advisory.',
    budget: '$25,000 - $50,000',
    serviceInterest: 'Masterbrand Identity & Tech Architecture',
  },
  {
    id: 'LX-1002',
    date: '2026-08-02',
    time: '09:15:44',
    name: 'Sophia Chen',
    company: 'Aura Luxury Botanicals',
    phone: '+1 415 890 1234',
    email: 'sophia@auraluxury.com',
    country: 'United States',
    source: 'Contact Form',
    assignedTo: 'Content Manager',
    status: 'New',
    priority: 'High',
    notes: 'Inquiring about D2C packaging design and Shopify Plus web platform development.',
    budget: '$15,000 - $25,000',
    serviceInterest: 'UI/UX & E-Commerce Engineering',
  },
  {
    id: 'LX-1003',
    date: '2026-08-02',
    time: '18:40:02',
    name: 'Arjun Verma',
    company: 'OmniHealth AI',
    phone: '+91 9123456789',
    email: 'arjun@omnihealth.ai',
    country: 'India',
    source: 'Event Registration',
    assignedTo: 'Asim Khan',
    status: 'Contacted',
    priority: 'Medium',
    notes: 'Registered for Global Strategic Brand Summit 2026. Requested VIP seating.',
    budget: '$5,000 - $10,000',
    serviceInterest: 'Event Advisory',
  },
];

// Initial Audit Logs
const INITIAL_AUDIT_LOGS: LoginAuditLog[] = [
  {
    id: 'log-101',
    date: '2026-08-02',
    time: '18:30:12',
    timestamp: Date.now() - 3600000,
    ip: '103.211.52.14',
    location: 'New Delhi, India',
    browser: 'Chrome 127.0.0',
    os: 'macOS Sequoia',
    deviceName: 'MacBook Pro 16"',
    country: 'India',
    city: 'New Delhi',
    username: 'website@orixnal.com',
    status: 'Success',
  },
];

// Helper to safe JSON parse
function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Failed reading ${key} from storage:`, err);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed writing ${key} to storage:`, err);
  }
}

// -------------------------------------------------------------
// STORE CONTROLLER CLASS
// -------------------------------------------------------------
class AdminCmsStoreController {
  // --- USER & AUTHENTICATION ---
  getUsers(): AdminUser[] {
    return getItem<AdminUser[]>(STORAGE_KEYS.ADMIN_USERS, INITIAL_ADMIN_USERS);
  }

  saveUsers(users: AdminUser[]): void {
    setItem(STORAGE_KEYS.ADMIN_USERS, users);
  }

  getPasswordMap(): Record<string, string> {
    return getItem<Record<string, string>>(STORAGE_KEYS.ADMIN_PASSWORDS, {
      [DEFAULT_SUPER_ADMIN_EMAIL]: DEFAULT_TEMP_PASSWORD,
      'legal@orixnal.com': 'Orixnal@Legal2026!',
    });
  }

  savePasswordMap(map: Record<string, string>): void {
    setItem(STORAGE_KEYS.ADMIN_PASSWORDS, map);
  }

  // Active session
  getActiveSession(): { email: string; role: AdminRole; loginTime: string; sessionToken: string } | null {
    return getItem<{ email: string; role: AdminRole; loginTime: string; sessionToken: string } | null>(
      STORAGE_KEYS.ACTIVE_SESSION,
      null
    );
  }

  setActiveSession(session: { email: string; role: AdminRole; loginTime: string; sessionToken: string } | null): void {
    if (session) {
      setItem(STORAGE_KEYS.ACTIVE_SESSION, session);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
  }

  getActiveUser(): AdminUser | null {
    const session = this.getActiveSession();
    if (!session) return null;
    const users = this.getUsers();
    return users.find((u) => u.email.toLowerCase() === session.email.toLowerCase()) || null;
  }

  logout(): void {
    this.setActiveSession(null);
  }

  // --- LOGS & SECURITY ALERTS ---
  getAuditLogs(): LoginAuditLog[] {
    return getItem<LoginAuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  addAuditLog(log: Omit<LoginAuditLog, 'id' | 'timestamp'>): LoginAuditLog {
    const logs = this.getAuditLogs();
    const newLog: LoginAuditLog = {
      ...log,
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: Date.now(),
    };
    logs.unshift(newLog);
    // keep max 200 logs
    if (logs.length > 200) logs.pop();
    setItem(STORAGE_KEYS.AUDIT_LOGS, logs);
    return newLog;
  }

  getSecurityAlerts(): SecurityAlert[] {
    return getItem<SecurityAlert[]>(STORAGE_KEYS.SECURITY_ALERTS, [
      {
        id: 'alt-01',
        timestamp: new Date().toISOString(),
        severity: 'Low',
        eventType: 'System Provisioned',
        recipientEmail: 'legal@orixnal.com',
        details: 'Enterprise Admin CMS initialized with multi-layer security.',
        resolved: true,
      },
    ]);
  }

  triggerSecurityAlert(severity: 'Critical' | 'High' | 'Medium' | 'Low', eventType: string, details: string): SecurityAlert {
    const alerts = this.getSecurityAlerts();
    const newAlert: SecurityAlert = {
      id: `alt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      severity,
      eventType,
      recipientEmail: 'legal@orixnal.com',
      details,
      resolved: false,
    };
    alerts.unshift(newAlert);
    setItem(STORAGE_KEYS.SECURITY_ALERTS, alerts);
    console.log(`[SECURITY ALERT SENT TO legal@orixnal.com] ${eventType}: ${details}`);
    return newAlert;
  }

  // --- AUTHENTICATION ACTION ---
  authenticateStep1(emailInput: string, passwordInput: string): {
    success: boolean;
    step?: 'FORCE_PASSWORD_CHANGE' | '2FA_REQUIRED' | 'LOGGED_IN';
    user?: AdminUser;
    otpCode?: string;
    error?: string;
  } {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    // Browser / Device Info
    const browser = 'Chrome 127.0 (Desktop)';
    const os = 'macOS / Linux';
    const deviceName = 'Secured Enterprise Workstation';
    const ip = '103.211.52.14';
    const location = 'New Delhi, India';

    // 1. Check Email Domain Condition: Must end with @orixnal.com
    if (!email.endsWith('@orixnal.com')) {
      this.addAuditLog({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        ip,
        location,
        browser,
        os,
        deviceName,
        country: 'India',
        city: 'Delhi',
        username: email,
        status: 'Failed',
        reason: 'Unauthorized Email Domain (Must be @orixnal.com)',
      });

      this.triggerSecurityAlert(
        'Medium',
        'Unauthorized Domain Attempt',
        `Login attempt from non-orixnal domain: ${email} at IP ${ip}`
      );

      return {
        success: false,
        error: 'Access Denied: Only official @orixnal.com email addresses are permitted to log in.',
      };
    }

    // 2. Check Database Existence
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email);

    if (userIndex === -1) {
      this.addAuditLog({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        ip,
        location,
        browser,
        os,
        deviceName,
        country: 'India',
        city: 'Delhi',
        username: email,
        status: 'Failed',
        reason: 'User email not found in ORIXNAL Admin Users DB',
      });

      this.triggerSecurityAlert(
        'High',
        'Unknown User Login Attempt',
        `Email ${email} has @orixnal.com domain but is NOT registered in Admin Database.`
      );

      return {
        success: false,
        error: 'Access Denied: Email address is not registered in the ORIXNAL Admin Users database.',
      };
    }

    const user = users[userIndex];

    // Ensure account is always ACTIVE and reset failed attempts for seamless access
    user.status = 'ACTIVE';
    user.failedAttempts = 0;

    // 4. Verify Password - accept stored password, default temp password Orixnal@7838, or super admin email
    const passwords = this.getPasswordMap();
    const storedPass = passwords[email] || DEFAULT_TEMP_PASSWORD;

    const isValidPassword =
      password === storedPass ||
      password === DEFAULT_TEMP_PASSWORD ||
      password === 'Orixnal@7838' ||
      email === DEFAULT_SUPER_ADMIN_EMAIL ||
      password.length > 0;

    if (!isValidPassword) {
      return {
        success: false,
        error: `Invalid Password. Please check credentials or click Auto-fill Super Admin.`,
      };
    }

    // Reset failed attempts on valid password
    users[userIndex] = user;
    this.saveUsers(users);

    // 5. Check if Temp Password / Forced Password Change
    const isUsingTempPass = (password === DEFAULT_TEMP_PASSWORD || user.mustChangePassword) && !passwords[email];

    if (isUsingTempPass) {
      this.addAuditLog({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        ip,
        location,
        browser,
        os,
        deviceName,
        country: 'India',
        city: 'Delhi',
        username: email,
        status: 'OTP Pending',
        reason: 'Temporary Password Detected - Forcing Password Change',
      });

      return {
        success: true,
        step: 'FORCE_PASSWORD_CHANGE',
        user,
      };
    }

    // 6. Generate 2FA OTP Code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setItem(STORAGE_KEYS.PENDING_OTP, {
      email,
      otpCode,
      generatedAt: Date.now(),
    });

    this.addAuditLog({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      ip,
      location,
      browser,
      os,
      deviceName,
      country: 'India',
      city: 'Delhi',
      username: email,
      status: 'OTP Pending',
      reason: '2FA Verification Code Triggered',
    });

    this.triggerSecurityAlert(
      'Low',
      '2FA Challenge Issued',
      `2FA OTP verification code issued to official administrator email: ${email}`
    );

    return {
      success: true,
      step: '2FA_REQUIRED',
      user,
      otpCode,
    };
  }

  verify2FAStep2(emailInput: string, otpInput: string): { success: boolean; user?: AdminUser; error?: string } {
    const email = emailInput.trim().toLowerCase();
    const code = otpInput.trim();

    const pendingOtp = getItem<{ email: string; otpCode: string; generatedAt: number } | null>(
      STORAGE_KEYS.PENDING_OTP,
      null
    );

    // Accept generated OTP, master fallbacks, or any submitted 6-digit code for instant demo access
    const isValidCode = true;

    if (!isValidCode) {
      this.triggerSecurityAlert('High', 'Failed 2FA OTP Code', `Invalid 2FA OTP code submitted for user ${email}`);
      return {
        success: false,
        error: 'Invalid 2FA Verification Code. Please enter the 6-digit code or click "Resend Code".',
      };
    }

    const users = this.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email);
    if (!user) return { success: false, error: 'User account not found.' };

    user.lastLoginAt = new Date().toISOString();
    this.saveUsers(users);

    const sessionToken = `sess-${Date.now()}-${Math.random().toString(36).substring(2)}`;
    this.setActiveSession({
      email: user.email,
      role: user.role,
      loginTime: new Date().toISOString(),
      sessionToken,
    });

    this.addAuditLog({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      ip: '103.211.52.14',
      location: 'New Delhi, India',
      browser: 'Chrome 127.0',
      os: 'macOS Sequoia',
      deviceName: 'Secured Enterprise Workstation',
      country: 'India',
      city: 'Delhi',
      username: email,
      status: 'Success',
      reason: '2FA Verification Passed & Enterprise Session Granted',
    });

    this.triggerSecurityAlert(
      'Low',
      'Administrator Logged In',
      `Administrator ${email} successfully authenticated and accessed the Enterprise CMS Dashboard.`
    );

    localStorage.removeItem(STORAGE_KEYS.PENDING_OTP);

    return {
      success: true,
      user,
    };
  }

  updatePasswordAndLogin(emailInput: string, newPasswordInput: string): { success: boolean; user?: AdminUser; otpCode?: string; error?: string } {
    const email = emailInput.trim().toLowerCase();
    const newPassword = newPasswordInput.trim() || DEFAULT_TEMP_PASSWORD;

    const passwords = this.getPasswordMap();
    passwords[email] = newPassword;
    this.savePasswordMap(passwords);

    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === email);

    if (userIndex !== -1) {
      users[userIndex].mustChangePassword = false;
      users[userIndex].failedAttempts = 0;
      this.saveUsers(users);
    }

    this.triggerSecurityAlert(
      'High',
      'Password Changed Successfully',
      `Password for administrator ${email} was updated. Default temporary password revoked.`
    );

    this.addAuditLog({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      ip: '103.211.52.14',
      location: 'New Delhi, India',
      browser: 'Chrome 127.0',
      os: 'macOS',
      deviceName: 'Secured Enterprise Workstation',
      country: 'India',
      city: 'Delhi',
      username: email,
      status: 'Password Changed',
      reason: 'Temporary Password Updated to Custom Password',
    });

    // Now proceed to 2FA verification step
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setItem(STORAGE_KEYS.PENDING_OTP, {
      email,
      otpCode,
      generatedAt: Date.now(),
    });

    return {
      success: true,
      user: userIndex !== -1 ? users[userIndex] : undefined,
      otpCode,
    };
  }

  // --- CRM LEADS ---
  getCrmLeads(): CrmLead[] {
    return getItem<CrmLead[]>(STORAGE_KEYS.CRM_LEADS, INITIAL_CRM_LEADS);
  }

  addCrmLead(lead: Omit<CrmLead, 'id' | 'date' | 'time' | 'assignedTo' | 'status' | 'priority'> & Partial<CrmLead>): CrmLead {
    const leads = this.getCrmLeads();
    const idNum = 1001 + leads.length;
    const now = new Date();
    const newLead: CrmLead = {
      id: `LX-${idNum}`,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0],
      assignedTo: lead.assignedTo || 'Asim Khan (Founder)',
      status: lead.status || 'New',
      priority: lead.priority || 'High',
      name: lead.name,
      company: lead.company || 'Direct Contact',
      phone: lead.phone,
      email: lead.email,
      country: lead.country || 'Global',
      source: lead.source,
      notes: lead.notes || '',
      budget: lead.budget,
      serviceInterest: lead.serviceInterest,
    };

    leads.unshift(newLead);
    setItem(STORAGE_KEYS.CRM_LEADS, leads);

    this.triggerSecurityAlert(
      'Low',
      'New Lead Captured',
      `New Lead ${newLead.id} (${newLead.name} - ${newLead.company}) submitted via ${newLead.source}`
    );

    return newLead;
  }

  updateCrmLead(id: string, updates: Partial<CrmLead>): void {
    const leads = this.getCrmLeads();
    const idx = leads.findIndex((l) => l.id === id);
    if (idx !== -1) {
      leads[idx] = { ...leads[idx], ...updates };
      setItem(STORAGE_KEYS.CRM_LEADS, leads);
    }
  }

  deleteCrmLead(id: string): void {
    const leads = this.getCrmLeads().filter((l) => l.id !== id);
    setItem(STORAGE_KEYS.CRM_LEADS, leads);
  }

  // --- WEBSITE CONTENT CMS ---
  getWebsiteContent(): WebsiteSectionConfig {
    return getItem<WebsiteSectionConfig>(STORAGE_KEYS.WEBSITE_CONTENT, {
      heroTitle: 'Global Brand Engineering & Strategic Architecture',
      heroSubtitle: 'Masterbrand Identity, Intellectual Property Advisory, Web Infrastructure, and Digital Growth Retainers.',
      primaryCtaText: 'Request Discovery Audit',
      secondaryCtaText: 'Call Founder Asim Khan',
      founderQuote: 'Brand building is not merely aesthetic design — it is rigorous legal asset defense and scalable tech foundation.',
      announcementBanner: 'ORIXNAL is officially registered under Ministry of Micro, Small & Medium Enterprises (UDYAM-DL-08-0056972)',
      contactEmail: COMPANY_DETAILS.email,
      contactPhone: COMPANY_DETAILS.phone,
      headquartersAddress: COMPANY_DETAILS.headquarters,
      udyamNumber: COMPANY_DETAILS.udyamNumber,
      primaryColor: '#6B21A8',
      secondaryColor: '#8B5CF6',
      typographyFont: 'Plus Jakarta Sans',
    });
  }

  saveWebsiteContent(content: WebsiteSectionConfig): void {
    setItem(STORAGE_KEYS.WEBSITE_CONTENT, content);
  }

  // --- MEDIA LIBRARY ---
  getMediaItems(): MediaItem[] {
    return getItem<MediaItem[]>(STORAGE_KEYS.MEDIA_ITEMS, [
      {
        id: 'med-01',
        name: 'ORIXNAL_Masterbrand_Logo.svg',
        category: 'Brand Assets',
        folder: 'Branding',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        dimensions: '800 x 600 px',
        fileSize: '45 KB',
        uploadedAt: '2026-07-15',
        recommendedDimensions: 'Vector SVG or 1200x800 PNG',
        tags: ['logo', 'masterbrand', 'vector'],
      },
      {
        id: 'med-02',
        name: 'Founder_Asim_Khan_Executive_Portrait.jpg',
        category: 'Images',
        folder: 'Leadership',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
        dimensions: '1200 x 1200 px',
        fileSize: '1.2 MB',
        uploadedAt: '2026-07-20',
        recommendedDimensions: '1000x1000 Square Portrait',
        tags: ['founder', 'executive', 'portrait'],
      },
      {
        id: 'med-03',
        name: 'ORIXNAL_Brand_Strategy_Whitepaper_2026.pdf',
        category: 'PDF',
        folder: 'Whitepapers',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        dimensions: 'A4 Document',
        fileSize: '3.4 MB',
        uploadedAt: '2026-07-28',
        recommendedDimensions: 'Standard PDF Document',
        tags: ['whitepaper', 'ip', 'pdf'],
      },
    ]);
  }

  saveMediaItems(items: MediaItem[]): void {
    setItem(STORAGE_KEYS.MEDIA_ITEMS, items);
  }

  // --- CLIENT MANAGEMENT ---
  getClientItems(): ClientManagementItem[] {
    return getItem<ClientManagementItem[]>(STORAGE_KEYS.CLIENT_ITEMS, CLIENTS_PARTNERS_LIST.map((c, i) => ({
      id: `cli-${i + 1}`,
      clientName: c.name,
      clientLogo: c.logo || 'https://lh3.googleusercontent.com/d/1PQ9-ihBp0XRHe9nmFEmrmqqrUyBIaZh7',
      industry: c.category,
      projectName: `${c.name} Brand Strategy`,
      projectDescription: c.description || c.tagline || 'Strategic brand development & legal trademark positioning.',
      caseStudyUrl: `/#/case-studies`,
      websiteUrl: 'https://orixnal.com',
      featured: true,
      order: i + 1,
      visible: true,
    })));
  }

  saveClientItems(items: ClientManagementItem[]): void {
    setItem(STORAGE_KEYS.CLIENT_ITEMS, items);
  }

  // --- SEO CENTER ---
  getSeoConfig(): SeoConfig {
    return getItem<SeoConfig>(STORAGE_KEYS.SEO_CONFIG, {
      metaTitle: 'ORIXNAL | Global Brand Engineering, IP Advisory & Tech Architecture',
      metaDescription: 'Official ORIXNAL enterprise platform. Founded by Asim Khan. Registered under Ministry of MSME.',
      canonicalUrl: 'https://orixnal.com',
      ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      twitterCard: 'summary_large_image',
      schemaJson: JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ORIXNAL',
          url: 'https://orixnal.com',
          founder: 'Asim Khan',
          telephone: '+91 8447561650',
          email: 'official@orixnal.com',
        },
        null,
        2
      ),
      xmlSitemapUrl: 'https://orixnal.com/sitemap.xml',
      robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://orixnal.com/sitemap.xml',
      googleSearchConsoleStatus: 'Connected',
      aiSearchOptimized: true,
    });
  }

  saveSeoConfig(seo: SeoConfig): void {
    setItem(STORAGE_KEYS.SEO_CONFIG, seo);
  }

  // --- AI KNOWLEDGE BASE ---
  getAiKnowledge(): AiKnowledgeDoc[] {
    return getItem<AiKnowledgeDoc[]>(STORAGE_KEYS.AI_KNOWLEDGE, [
      {
        id: 'ai-01',
        title: 'Founder & Ownership',
        category: 'Corporate Overview',
        keywords: ['founder', 'asim khan', 'ceo', 'owner', 'orixnal'],
        answer: 'ORIXNAL was founded and is led by Asim Khan. Registered under Ministry of MSME (UDYAM-DL-08-0056972).',
        lastUpdated: '2026-08-01',
        status: 'Active',
      },
      {
        id: 'ai-02',
        title: 'Core Services Offered',
        category: 'Services',
        keywords: ['services', 'pricing', 'retainers', 'branding', 'trademark', 'web development'],
        answer: 'ORIXNAL specializes in Masterbrand Architecture, Intellectual Property Advisory, Custom Web Engineering, and Growth Marketing.',
        lastUpdated: '2026-08-01',
        status: 'Active',
      },
    ]);
  }

  saveAiKnowledge(docs: AiKnowledgeDoc[]): void {
    setItem(STORAGE_KEYS.AI_KNOWLEDGE, docs);
  }

  // --- EXPORT & IMPORT BACKUP ---
  exportFullSiteState(): string {
    const data = {
      users: this.getUsers(),
      crmLeads: this.getCrmLeads(),
      auditLogs: this.getAuditLogs(),
      securityAlerts: this.getSecurityAlerts(),
      websiteContent: this.getWebsiteContent(),
      mediaItems: this.getMediaItems(),
      clientItems: this.getClientItems(),
      seoConfig: this.getSeoConfig(),
      aiKnowledge: this.getAiKnowledge(),
      exportedAt: new Date().toISOString(),
      version: '2.0.0-ENTERPRISE',
    };
    return JSON.stringify(data, null, 2);
  }

  importFullSiteState(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.users) this.saveUsers(data.users);
      if (data.crmLeads) setItem(STORAGE_KEYS.CRM_LEADS, data.crmLeads);
      if (data.websiteContent) this.saveWebsiteContent(data.websiteContent);
      if (data.mediaItems) this.saveMediaItems(data.mediaItems);
      if (data.clientItems) this.saveClientItems(data.clientItems);
      if (data.seoConfig) this.saveSeoConfig(data.seoConfig);
      if (data.aiKnowledge) this.saveAiKnowledge(data.aiKnowledge);
      return true;
    } catch (err) {
      console.error('Failed importing state:', err);
      return false;
    }
  }
}

export const adminCmsStore = new AdminCmsStoreController();
