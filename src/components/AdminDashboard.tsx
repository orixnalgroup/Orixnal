import React, { useState, useEffect } from 'react';
import { adminCmsStore, AdminUser, AdminRole, LoginAuditLog, SecurityAlert, CrmLead, WebsiteSectionConfig, MediaItem, ClientManagementItem, SeoConfig, AiKnowledgeDoc } from '../data/adminCmsStore';
import { DEFAULT_BLOG_POSTS } from '../data/blogData';
import { INITIAL_EVENTS } from '../data/eventsData';
import { BlogPost, OrixnalEvent } from '../types';
import {
  LayoutDashboard,
  Globe,
  FileText,
  Calendar,
  Image as ImageIcon,
  Users,
  Inbox,
  Bot,
  Search,
  ShieldCheck,
  Database,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Lock,
  ChevronRight,
  Filter,
  Sliders,
  ExternalLink,
  ShieldAlert,
  Save,
  KeyRound,
  FileSpreadsheet,
  FolderPlus,
  Layers,
  MapPin,
  Clock,
  Phone,
  Mail,
  UserCheck,
  Building,
  Tag,
  Share2
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: AdminUser;
  onLogout: () => void;
  onClose: () => void;
  onNavigateSite?: (route: any) => void;
}

type TabType =
  | 'overview'
  | 'website_cms'
  | 'blog_cms'
  | 'event_cms'
  | 'media_library'
  | 'client_management'
  | 'crm_leads'
  | 'ai_support'
  | 'seo_center'
  | 'users_security'
  | 'backup_restore';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onLogout, onClose, onNavigateSite }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Loaded Data States
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<LoginAuditLog[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [crmLeads, setCrmLeads] = useState<CrmLead[]>([]);
  const [websiteContent, setWebsiteContent] = useState<WebsiteSectionConfig>(adminCmsStore.getWebsiteContent());
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [clientItems, setClientItems] = useState<ClientManagementItem[]>([]);
  const [seoConfig, setSeoConfig] = useState<SeoConfig>(adminCmsStore.getSeoConfig());
  const [aiKnowledge, setAiKnowledge] = useState<AiKnowledgeDoc[]>([]);

  // Blog & Event Data
  const [blogs, setBlogs] = useState<BlogPost[]>(DEFAULT_BLOG_POSTS);
  const [events, setEvents] = useState<OrixnalEvent[]>(INITIAL_EVENTS);

  // Search & Filter States
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');

  // Modals inside CMS
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [showNewBlogModal, setShowNewBlogModal] = useState(false);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showMediaUploadModal, setShowMediaUploadModal] = useState(false);

  // Selected for Edit
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Form input states
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<AdminRole>('Website Administrator');

  // Load Data on Mount & Tab change
  const reloadData = () => {
    setUsers(adminCmsStore.getUsers());
    setAuditLogs(adminCmsStore.getAuditLogs());
    setSecurityAlerts(adminCmsStore.getSecurityAlerts());
    setCrmLeads(adminCmsStore.getCrmLeads());
    setWebsiteContent(adminCmsStore.getWebsiteContent());
    setMediaItems(adminCmsStore.getMediaItems());
    setClientItems(adminCmsStore.getClientItems());
    setSeoConfig(adminCmsStore.getSeoConfig());
    setAiKnowledge(adminCmsStore.getAiKnowledge());
    setBlogs([...DEFAULT_BLOG_POSTS]);
    setEvents([...INITIAL_EVENTS]);
  };

  useEffect(() => {
    reloadData();
  }, [activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // User Actions (Super Admin only)
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail.toLowerCase().endsWith('@orixnal.com')) {
      alert('Error: Administrator email domain must be @orixnal.com');
      return;
    }

    const currentUsers = adminCmsStore.getUsers();
    if (currentUsers.some((u) => u.email.toLowerCase() === newUserEmail.toLowerCase())) {
      alert('Error: Administrator email already exists in database.');
      return;
    }

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail.toLowerCase(),
      role: newUserRole,
      status: 'ACTIVE',
      department: 'Corporate Operations',
      createdBy: currentUser.email,
      createdAt: new Date().toISOString(),
      mustChangePassword: true,
      twoFactorEnabled: true,
      twoFactorType: 'Email OTP',
      failedAttempts: 0,
    };

    adminCmsStore.saveUsers([...currentUsers, newUser]);
    adminCmsStore.triggerSecurityAlert(
      'High',
      'Administrator Account Created',
      `Super Administrator ${currentUser.email} created new account for ${newUserEmail} with role ${newUserRole}`
    );

    setShowNewUserModal(false);
    setNewUserEmail('');
    setNewUserName('');
    reloadData();
    showToast(`New Administrator ${newUserEmail} created!`);
  };

  const toggleUserStatus = (userId: string) => {
    const currentUsers = adminCmsStore.getUsers();
    const updated = currentUsers.map((u) => {
      if (u.id === userId) {
        const nextStatus = u.status === 'ACTIVE' ? ('SUSPENDED' as const) : ('ACTIVE' as const);
        adminCmsStore.triggerSecurityAlert(
          'High',
          'Account Status Toggled',
          `Account ${u.email} status changed from ${u.status} to ${nextStatus} by ${currentUser.email}`
        );
        return { ...u, status: nextStatus, failedAttempts: 0 };
      }
      return u;
    });
    adminCmsStore.saveUsers(updated);
    reloadData();
    showToast('Administrator account status updated.');
  };

  // Export CSV for CRM Leads
  const handleExportLeadsCsv = () => {
    const leads = adminCmsStore.getCrmLeads();
    const headers = ['Lead ID', 'Date', 'Time', 'Name', 'Company', 'Phone', 'Email', 'Country', 'Source', 'Assigned To', 'Status', 'Priority', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      l.date,
      l.time,
      `"${l.name}"`,
      `"${l.company}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.country}"`,
      `"${l.source}"`,
      `"${l.assignedTo}"`,
      l.status,
      l.priority,
      `"${l.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ORIXNAL_CRM_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CRM Leads exported to CSV successfully!');
  };

  // Save Website Content
  const handleSaveWebsiteContent = (e: React.FormEvent) => {
    e.preventDefault();
    adminCmsStore.saveWebsiteContent(websiteContent);
    showToast('Website content changes saved live across platform!');
  };

  // Save SEO Settings
  const handleSaveSeoConfig = (e: React.FormEvent) => {
    e.preventDefault();
    adminCmsStore.saveSeoConfig(seoConfig);
    showToast('SEO Settings and Schema Markup updated!');
  };

  // Export Backup
  const handleExportBackup = () => {
    const jsonStr = adminCmsStore.exportFullSiteState();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ORIXNAL_Full_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Full Website Enterprise Backup exported!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF9F6] text-neutral-900 flex flex-col font-sans overflow-hidden animate-fadeIn">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-purple-900 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-2xl border border-purple-700 flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP CMS BAR */}
      <header className="bg-white border-b border-neutral-200/80 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl orixnal-gradient-bg text-white flex items-center justify-center font-black text-sm shadow-sm">
            OX
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-neutral-950 tracking-tight">ORIXNAL Enterprise CMS</span>
              <span className="bg-purple-100 text-purple-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                v2.0 Live
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">
              Administrator: <strong className="text-neutral-900 font-bold">{currentUser.email}</strong> ({currentUser.role})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateSite && (
            <button
              onClick={() => {
                onClose();
                onNavigateSite('home');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-800 hover:text-purple-950 bg-purple-50 hover:bg-purple-100 px-3.5 py-2 rounded-xl border border-purple-200 transition-colors"
              title="Preview Website"
            >
              <Globe className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden sm:inline">Preview Live Website</span>
            </button>
          )}

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl border border-rose-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT: SIDEBAR + DASHBOARD CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT NAVIGATION SIDEBAR */}
        <aside className="w-64 bg-white border-r border-neutral-200/80 p-3 space-y-1 overflow-y-auto shrink-0 hidden md:block">
          <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
            Enterprise Command
          </div>

          {[
            { id: 'overview', label: 'Command Overview', icon: LayoutDashboard },
            { id: 'website_cms', label: 'Website Pages CMS', icon: Globe },
            { id: 'blog_cms', label: 'Blog & Articles CMS', icon: FileText, badge: blogs.length },
            { id: 'event_cms', label: 'Events Manager', icon: Calendar, badge: events.length },
            { id: 'media_library', label: 'Media Library', icon: ImageIcon },
            { id: 'client_management', label: 'Client Logos & Portfolio', icon: Building },
            { id: 'crm_leads', label: 'CRM Leads & Enquiries', icon: Inbox, badge: crmLeads.length },
            { id: 'ai_support', label: 'AI Support Knowledge', icon: Bot },
            { id: 'seo_center', label: 'SEO & Schema Center', icon: Search },
            { id: 'users_security', label: 'Admin Users & Security', icon: ShieldCheck, alertCount: securityAlerts.filter((a) => !a.resolved).length },
            { id: 'backup_restore', label: 'Backup & Restore', icon: Database },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'orixnal-gradient-bg text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-neutral-100/80 hover:text-neutral-950'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-purple-700'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      active ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.alertCount ? (
                  <span className="bg-rose-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                    {item.alertCount}
                  </span>
                ) : null}
              </button>
            );
          })}
        </aside>

        {/* MOBILE NAVIGATION BAR */}
        <div className="md:hidden bg-white border-b border-neutral-200 px-3 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'website_cms', label: 'Website' },
            { id: 'blog_cms', label: 'Blog' },
            { id: 'event_cms', label: 'Events' },
            { id: 'crm_leads', label: 'CRM Leads' },
            { id: 'users_security', label: 'Security' },
            { id: 'backup_restore', label: 'Backup' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === item.id
                  ? 'orixnal-gradient-bg text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 bg-[#FAF9F6] p-4 sm:p-8 overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW COMMAND CENTER */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-neutral-950">Executive Command Center</h1>
                  <p className="text-xs text-neutral-600">Platform status, leads, security audits, and quick website updates.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('crm_leads')}
                    className="orixnal-gradient-bg text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs flex items-center gap-2"
                  >
                    <Inbox className="w-4 h-4" />
                    <span>View CRM Leads ({crmLeads.length})</span>
                  </button>
                </div>
              </div>

              {/* STATS METRICS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-500">
                    <span>Captured CRM Leads</span>
                    <Inbox className="w-4 h-4 text-purple-700" />
                  </div>
                  <div className="text-3xl font-black text-neutral-950">{crmLeads.length}</div>
                  <div className="text-[11px] text-emerald-700 font-medium">100% Automatic Capture Active</div>
                </div>

                <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-500">
                    <span>Published Blog Posts</span>
                    <FileText className="w-4 h-4 text-purple-700" />
                  </div>
                  <div className="text-3xl font-black text-neutral-950">{blogs.length}</div>
                  <div className="text-[11px] text-purple-700 font-medium">Rich Text & Schema Active</div>
                </div>

                <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-500">
                    <span>Events Scheduled</span>
                    <Calendar className="w-4 h-4 text-purple-700" />
                  </div>
                  <div className="text-3xl font-black text-neutral-950">{events.length}</div>
                  <div className="text-[11px] text-amber-700 font-medium">Tickets & Maps Integrated</div>
                </div>

                <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-500">
                    <span>Active Administrators</span>
                    <Users className="w-4 h-4 text-purple-700" />
                  </div>
                  <div className="text-3xl font-black text-neutral-950">{users.filter((u) => u.status === 'ACTIVE').length}</div>
                  <div className="text-[11px] text-neutral-500 font-medium">Verified @orixnal.com Users</div>
                </div>
              </div>

              {/* RECENT AUDIT LOGS & SECURITY STATUS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Login Audit Logs */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <h3 className="text-sm font-extrabold text-neutral-950 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-700" />
                      <span>Recent Security & Login Audit History</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('users_security')}
                      className="text-xs font-bold text-purple-700 hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto">
                    {auditLogs.slice(0, 6).map((log) => (
                      <div
                        key={log.id}
                        className="p-3 bg-neutral-50 border border-neutral-200/60 rounded-xl text-xs flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-neutral-900">{log.username}</div>
                          <div className="text-[10px] text-neutral-500 font-mono">
                            {log.date} {log.time} • IP: {log.ip} ({log.location})
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                            log.status === 'Success'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : log.status === 'Failed'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Alerts Sent to legal@orixnal.com */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <h3 className="text-sm font-extrabold text-neutral-950 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-purple-700" />
                      <span>Security Dispatch Log (legal@orixnal.com)</span>
                    </h3>
                  </div>

                  <div className="space-y-2.5 max-h-72 overflow-y-auto">
                    {securityAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="p-3 bg-purple-50/50 border border-purple-200/80 rounded-xl text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-purple-950">{alert.eventType}</span>
                          <span className="text-[10px] font-mono text-purple-800">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-neutral-700 leading-relaxed text-[11px]">{alert.details}</p>
                        <div className="text-[10px] font-mono text-purple-700">Recipient: {alert.recipientEmail}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: WEBSITE PAGES CMS */}
          {activeTab === 'website_cms' && (
            <form onSubmit={handleSaveWebsiteContent} className="space-y-6 animate-fadeIn max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-neutral-950">Visual Website Content CMS</h1>
                  <p className="text-xs text-neutral-600">Edit hero titles, contact information, founder quotes, and global settings without coding.</p>
                </div>
                <button
                  type="submit"
                  className="orixnal-gradient-bg text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Publish Content Changes</span>
                </button>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                <h3 className="text-sm font-extrabold text-neutral-950 border-b border-neutral-100 pb-2">Homepage Hero Controls</h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-800">Hero Main Title</label>
                  <input
                    type="text"
                    value={websiteContent.heroTitle}
                    onChange={(e) => setWebsiteContent({ ...websiteContent, heroTitle: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600 font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-800">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={websiteContent.heroSubtitle}
                    onChange={(e) => setWebsiteContent({ ...websiteContent, heroSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-800">Primary CTA Button Label</label>
                    <input
                      type="text"
                      value={websiteContent.primaryCtaText}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, primaryCtaText: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-800">Secondary CTA Button Label</label>
                    <input
                      type="text"
                      value={websiteContent.secondaryCtaText}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, secondaryCtaText: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                <h3 className="text-sm font-extrabold text-neutral-950 border-b border-neutral-100 pb-2">Company & Founder Information</h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-800">Founder Asim Khan Quote</label>
                  <textarea
                    rows={2}
                    value={websiteContent.founderQuote}
                    onChange={(e) => setWebsiteContent({ ...websiteContent, founderQuote: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-[#FAF9F6] border border-neutral-300 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-800">Official Contact Email</label>
                    <input
                      type="email"
                      value={websiteContent.contactEmail}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, contactEmail: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-800">Official Contact Phone</label>
                    <input
                      type="text"
                      value={websiteContent.contactPhone}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, contactPhone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* TAB 3: BLOG CMS */}
          {activeTab === 'blog_cms' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-neutral-950">Professional Blog & Publications CMS</h1>
                  <p className="text-xs text-neutral-600">Create, edit, draft, schedule, and delete articles with rich editor formatting.</p>
                </div>
                <button
                  onClick={() => alert('New Blog Post Editor launched! Use the blog page editor or save directly.')}
                  className="orixnal-gradient-bg text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Write New Blog Post</span>
                </button>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-500 uppercase font-mono text-[10px] border-b border-neutral-200">
                    <tr>
                      <th className="p-3.5">Title & Category</th>
                      <th className="p-3.5">Author</th>
                      <th className="p-3.5">Published Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-medium">
                    {blogs.map((post) => (
                      <tr key={post.id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-neutral-900">{post.title}</div>
                          <div className="text-[10px] text-purple-700 font-mono">{post.category}</div>
                        </td>
                        <td className="p-3.5 text-neutral-700">{post.publishedBy.name}</td>
                        <td className="p-3.5 text-neutral-500 font-mono text-[11px]">{post.publishedAt}</td>
                        <td className="p-3.5">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">
                            {post.status || 'Published'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => alert(`Editing blog: ${post.title}`)}
                            className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg border border-purple-200"
                            title="Edit Post"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: EVENT CMS */}
          {activeTab === 'event_cms' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-neutral-950">Global Events & Summits CMS</h1>
                  <p className="text-xs text-neutral-600">Manage summits, IP workshops, ticket availability, and venues.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev) => (
                  <div key={ev.id} className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-100 text-purple-900 font-mono font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                        {ev.status}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">{ev.startDate}</span>
                    </div>

                    <h3 className="font-extrabold text-sm text-neutral-950">{ev.name}</h3>
                    <p className="text-xs text-neutral-600 line-clamp-2">{ev.description}</p>

                    <div className="pt-2 border-t border-neutral-100 text-xs font-mono text-neutral-500 flex items-center justify-between">
                      <span>Location: {ev.location}</span>
                      <span className="text-purple-800 font-bold">{ev.ticket.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MEDIA LIBRARY */}
          {activeTab === 'media_library' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-neutral-950">Enterprise Media Library</h1>
                  <p className="text-xs text-neutral-600">Drag & drop upload simulator with recommended image dimension guides.</p>
                </div>
                <button
                  onClick={() => alert('Media drag & drop upload ready!')}
                  className="orixnal-gradient-bg text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Asset</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mediaItems.map((item) => (
                  <div key={item.id} className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-3 shadow-2xs">
                    <div className="h-32 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-neutral-900 truncate">{item.name}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">{item.dimensions} • {item.fileSize}</div>
                      <div className="text-[10px] text-purple-700 font-mono mt-1">Recommended: {item.recommendedDimensions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CRM LEADS & ENQUIRIES */}
          {activeTab === 'crm_leads' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-neutral-950">CRM Lead & Enquiry Hub</h1>
                  <p className="text-xs text-neutral-600">
                    All website submissions automatically sync here in real time.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportLeadsCsv}
                    className="bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 hover:bg-emerald-800"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* CRM Leads Table */}
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-500 uppercase font-mono text-[10px] border-b border-neutral-200">
                    <tr>
                      <th className="p-3.5">Lead ID</th>
                      <th className="p-3.5">Client & Company</th>
                      <th className="p-3.5">Contact Details</th>
                      <th className="p-3.5">Source</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-medium">
                    {crmLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-purple-800">{lead.id}</td>
                        <td className="p-3.5">
                          <div className="font-extrabold text-neutral-950">{lead.name}</div>
                          <div className="text-[11px] text-neutral-500">{lead.company} ({lead.country})</div>
                        </td>
                        <td className="p-3.5 space-y-0.5">
                          <div>{lead.email}</div>
                          <div className="text-[11px] text-neutral-500 font-mono">{lead.phone}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="bg-purple-100 text-purple-900 font-mono font-bold px-2 py-0.5 rounded-md text-[10px]">
                            {lead.source}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-amber-700">{lead.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: ADMIN USERS & SECURITY POLICY */}
          {activeTab === 'users_security' && (
            <div className="space-y-6 animate-fadeIn max-w-5xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-neutral-950">Official Admin Users & Security Policy</h1>
                  <p className="text-xs text-neutral-600">
                    Strict Policy: Every administrator must have an official @orixnal.com domain and exist inside this database.
                  </p>
                </div>

                {currentUser.role === 'Super Administrator' && (
                  <button
                    onClick={() => setShowNewUserModal(true)}
                    className="orixnal-gradient-bg text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Administrator</span>
                  </button>
                )}
              </div>

              {/* Users Table */}
              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 text-neutral-500 uppercase font-mono text-[10px] border-b border-neutral-200">
                    <tr>
                      <th className="p-3.5">Administrator</th>
                      <th className="p-3.5">Official Email</th>
                      <th className="p-3.5">Assigned Role</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-medium">
                    {users.map((usr) => (
                      <tr key={usr.id} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="p-3.5 font-extrabold text-neutral-950">{usr.name}</td>
                        <td className="p-3.5 font-mono text-purple-900">{usr.email}</td>
                        <td className="p-3.5">{usr.role}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              usr.status === 'ACTIVE'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}
                          >
                            {usr.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          {currentUser.role === 'Super Administrator' && usr.email !== currentUser.email && (
                            <button
                              onClick={() => toggleUserStatus(usr.id)}
                              className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-neutral-300 hover:bg-neutral-100"
                            >
                              {usr.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: SEO & BACKUP CENTER */}
          {activeTab === 'seo_center' && (
            <form onSubmit={handleSaveSeoConfig} className="space-y-6 animate-fadeIn max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-neutral-950">SEO & Schema Center</h1>
                  <p className="text-xs text-neutral-600">Manage Meta Titles, Descriptions, Canonical URLs, and JSON-LD Schema.</p>
                </div>
                <button
                  type="submit"
                  className="orixnal-gradient-bg text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
                >
                  Save SEO Settings
                </button>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-800">Global Meta Title</label>
                  <input
                    type="text"
                    value={seoConfig.metaTitle}
                    onChange={(e) => setSeoConfig({ ...seoConfig, metaTitle: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-800">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoConfig.metaDescription}
                    onChange={(e) => setSeoConfig({ ...seoConfig, metaDescription: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs border border-neutral-300 rounded-xl"
                  />
                </div>
              </div>
            </form>
          )}

          {/* TAB 9: BACKUP & RESTORE */}
          {activeTab === 'backup_restore' && (
            <div className="space-y-6 animate-fadeIn max-w-3xl">
              <div>
                <h1 className="text-xl font-black text-neutral-950">System Backup & Snapshot Engine</h1>
                <p className="text-xs text-neutral-600">Export or restore full platform state instantly in encrypted JSON.</p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                <h3 className="text-sm font-extrabold text-neutral-950">Export Platform State</h3>
                <p className="text-xs text-neutral-600">
                  Generates a full JSON snapshot including website content, CRM leads, blog articles, events, and audit history.
                </p>

                <button
                  onClick={handleExportBackup}
                  className="orixnal-gradient-bg text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full JSON Backup</span>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CREATE NEW ADMIN MODAL */}
      {showNewUserModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateUser} className="bg-white border border-neutral-200 rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-neutral-950">Create Official Administrator Account</h3>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Administrator Full Name</label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="e.g., Sarah Jenkins"
                required
                className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Official Email (Must end with @orixnal.com)</label>
              <input
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="s.jenkins@orixnal.com"
                required
                className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Assigned Admin Role</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as AdminRole)}
                className="w-full px-3.5 py-2.5 text-xs border border-neutral-300 rounded-xl bg-white"
              >
                <option value="Website Administrator">Website Administrator</option>
                <option value="Content Manager">Content Manager</option>
                <option value="Blog Editor">Blog Editor</option>
                <option value="Event Manager">Event Manager</option>
                <option value="SEO Manager">SEO Manager</option>
                <option value="Marketing Manager">Marketing Manager</option>
                <option value="CRM Manager">CRM Manager</option>
                <option value="Finance Viewer">Finance Viewer</option>
                <option value="Read Only Viewer">Read Only Viewer</option>
              </select>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewUserModal(false)}
                className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="orixnal-gradient-bg text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
