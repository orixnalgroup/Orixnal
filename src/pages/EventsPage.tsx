import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OrixnalEvent, EventStatus, PageRoute } from '../types';
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  verifyAdminLogin,
  isAdminSessionActive,
  setAdminSession,
  getAdminPassword,
  setAdminPassword,
  isUsingTempPassword,
  ADMIN_EMAIL,
  DEFAULT_TEMP_PASSWORD
} from '../data/eventsData';
import { COMPANY_DETAILS } from '../data/brandData';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Ticket,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  Key,
  X,
  Check,
  Search,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle2,
  Info,
  SlidersHorizontal,
  UserCheck,
  Upload,
  ImagePlus
} from 'lucide-react';

interface EventsPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit: () => void;
}

const PRESET_BANNERS = [
  { name: 'Executive Summit', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Tech Conclave', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Esports Festival', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Roundtable', url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Design Workshop', url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80' }
];

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate, onOpenAudit }) => {
  const [events, setEvents] = useState<OrixnalEvent[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | EventStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Admin & Auth states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Password change states
  const [currPassInput, setCurrPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Event Detail Modal State
  const [selectedEvent, setSelectedEvent] = useState<OrixnalEvent | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  // Create / Edit Event Form State
  const [showEventFormModal, setShowEventFormModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    bannerImage: PRESET_BANNERS[0].url,
    startDate: '',
    endDate: '',
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    location: 'E-Square Building, Sector 96, Noida',
    description: '',
    status: 'Upcoming' as EventStatus,
    ticketPrice: 'Free (RSVP Required)',
    ticketAvailability: 'Available' as 'Available' | 'Selling Fast' | 'Sold Out' | 'Invite Only',
    ticketUrl: 'mailto:hello@orixnal.com',
    ticketNotes: '',
    featuredOnHome: true,
    activities: ['Keynote Presentation', 'Q&A Session', 'Networking Lounge'],
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
    ]
  });

  const [newActivityText, setNewActivityText] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Load events & check session on mount
  useEffect(() => {
    refreshEvents();
    setIsAdminLoggedIn(isAdminSessionActive());
  }, []);

  const refreshEvents = () => {
    setEvents(getEvents());
  };

  // Direct File Upload Handlers for Cover Image & Gallery Photos
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('Cover image size must be under 10MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData((prev) => ({ ...prev, bannerImage: event.target!.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, event.target!.result as string]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = verifyAdminLogin(loginEmail, loginPassword);
    if (res.success) {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
      setLoginPassword('');
      if (res.isTemp) {
        setShowChangePasswordModal(true);
      }
    } else {
      setLoginError(res.message);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setAdminSession(false);
    setIsAdminLoggedIn(false);
  };

  // Password change handler
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    const currentActual = getAdminPassword();
    if (currPassInput !== currentActual) {
      setPassError('Current password does not match.');
      return;
    }
    if (newPassInput.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassInput === DEFAULT_TEMP_PASSWORD) {
      setPassError('Please choose a new password different from the temporary one.');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPassError('New password and confirmation do not match.');
      return;
    }

    setAdminPassword(newPassInput);
    setPassSuccess('Password updated successfully! Your new password is saved.');
    setTimeout(() => {
      setShowChangePasswordModal(false);
      setCurrPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      setPassSuccess('');
    }, 1500);
  };

  // Delete event handler
  const handleDeleteEvent = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      deleteEvent(id);
      refreshEvents();
      if (selectedEvent?.id === id) {
        setSelectedEvent(null);
      }
    }
  };

  // Open form for NEW event
  const handleOpenCreateModal = () => {
    setEditingEventId(null);
    setFormData({
      name: '',
      bannerImage: PRESET_BANNERS[0].url,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      startTime: '10:00 AM',
      endTime: '05:00 PM',
      location: 'E-Square Building, Sector 96, Noida',
      description: '',
      status: 'Upcoming',
      ticketPrice: 'Free (RSVP Required)',
      ticketAvailability: 'Available',
      ticketUrl: 'mailto:hello@orixnal.com',
      ticketNotes: '',
      featuredOnHome: true,
      activities: ['Keynote Session', 'Interactive Audit', 'Networking'],
      gallery: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
      ]
    });
    setShowEventFormModal(true);
  };

  // Open form for EDIT event
  const handleOpenEditModal = (evt: OrixnalEvent) => {
    setEditingEventId(evt.id);
    setFormData({
      name: evt.name,
      bannerImage: evt.bannerImage,
      startDate: evt.startDate,
      endDate: evt.endDate,
      startTime: evt.startTime,
      endTime: evt.endTime,
      location: evt.location,
      description: evt.description,
      status: evt.status,
      ticketPrice: evt.ticket.price,
      ticketAvailability: evt.ticket.availability,
      ticketUrl: evt.ticket.bookingUrl || '',
      ticketNotes: evt.ticket.notes || '',
      featuredOnHome: evt.featuredOnHome ?? true,
      activities: evt.activities || [],
      gallery: evt.gallery || []
    });
    setShowEventFormModal(true);
  };

  // Save Event handler (Create or Update)
  const handleSaveEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter an event name.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      bannerImage: formData.bannerImage || PRESET_BANNERS[0].url,
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || formData.startDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      description: formData.description,
      activities: formData.activities,
      status: formData.status,
      ticket: {
        price: formData.ticketPrice,
        availability: formData.ticketAvailability,
        bookingUrl: formData.ticketUrl,
        notes: formData.ticketNotes
      },
      gallery: formData.gallery.length > 0 ? formData.gallery : [formData.bannerImage],
      featuredOnHome: formData.featuredOnHome
    };

    if (editingEventId) {
      updateEvent(editingEventId, payload);
    } else {
      addEvent(payload);
    }

    refreshEvents();
    setShowEventFormModal(false);
  };

  // Filter logic
  const filteredEvents = events.filter((evt) => {
    const matchesTab = activeTab === 'All' || evt.status === activeTab;
    if (!matchesTab) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      evt.name.toLowerCase().includes(q) ||
      evt.location.toLowerCase().includes(q) ||
      evt.description.toLowerCase().includes(q) ||
      evt.activities.some((a) => a.toLowerCase().includes(q))
    );
  });

  const currentCount = events.filter((e) => e.status === 'Current').length;
  const upcomingCount = events.filter((e) => e.status === 'Upcoming').length;
  const pastCount = events.filter((e) => e.status === 'Past').length;

  return (
    <div className="pb-24">
      {/* Top Banner Notice for Admin if using Temp Password */}
      {isAdminLoggedIn && isUsingTempPassword() && (
        <div className="bg-amber-500 text-neutral-950 px-4 py-2 text-xs font-bold flex items-center justify-between gap-3 shadow-sm border-b border-amber-600">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <AlertTriangle className="w-4 h-4 shrink-0 text-neutral-950" />
            <span>
              <strong>Security Alert:</strong> You are currently logged in with the default temporary password. Please update it to secure your account.
            </span>
            <button
              onClick={() => setShowChangePasswordModal(true)}
              className="ml-auto orixnal-gradient-bg text-white hover:opacity-95 px-3 py-1 rounded-lg text-xs font-bold transition-all shrink-0"
            >
              Update Password Now
            </button>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section className="bg-[#FAF9F6] border-b border-neutral-200/80 pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold tracking-tight mb-3">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                <span>Orixnal Event</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
                Global Strategic Gatherings, <br />
                <span className="orixnal-gradient-text">Summits & IP Workshops</span>
              </h1>
            </div>

            {/* Admin Control Bar */}
            <div className="flex flex-wrap items-center gap-2.5 sm:self-start bg-white p-2.5 rounded-2xl border border-neutral-200 shadow-2xs">
              {isAdminLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="hidden md:inline">Admin:</span>
                    <span className="font-mono text-[11px] text-emerald-950">{ADMIN_EMAIL}</span>
                  </div>

                  <button
                    onClick={() => setShowChangePasswordModal(true)}
                    className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border border-neutral-200"
                    title="Change Admin Password"
                  >
                    <Key className="w-3.5 h-3.5 text-purple-700" />
                    <span className="hidden sm:inline">Change Pass</span>
                  </button>

                  <button
                    onClick={handleOpenCreateModal}
                    className="inline-flex items-center gap-1.5 orixnal-gradient-bg text-white hover:opacity-95 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Event</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                    title="Logout Admin"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="inline-flex items-center gap-2 orixnal-gradient-bg text-white hover:opacity-95 px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Event Manager Login</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-neutral-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            Experience high-intensity brand engineering, trademark law audits, visual identity strategy, and CXO roundtables. Access upcoming global events or explore past summit archives below.
          </p>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Total Events</div>
              <div className="text-xl sm:text-2xl font-black text-neutral-950 mt-1">{events.length}</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-emerald-200/80 shadow-2xs">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Current Events
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-950 mt-1">{currentCount}</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-purple-200/80 shadow-2xs">
              <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Upcoming</div>
              <div className="text-xl sm:text-2xl font-black text-purple-950 mt-1">{upcomingCount}</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-2xs">
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Past Summits</div>
              <div className="text-xl sm:text-2xl font-black text-neutral-800 mt-1">{pastCount}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Events Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Search & Status Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-neutral-200 shadow-2xs">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {[
              { label: 'All Events', value: 'All', count: events.length },
              { label: 'Current', value: 'Current', count: currentCount },
              { label: 'Upcoming', value: 'Upcoming', count: upcomingCount },
              { label: 'Past', value: 'Past', count: pastCount },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.value
                    ? 'orixnal-gradient-bg text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    activeTab === tab.value
                      ? 'bg-white/20 text-white'
                      : 'bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event name, location, or activity..."
              className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-2xl pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium placeholder-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center space-y-3">
            <Calendar className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-900">No events match your search criteria</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Try adjusting your filter status or search term. As an admin, you can create a new event anytime using the button above.
            </p>
            {isAdminLoggedIn && (
              <button
                onClick={handleOpenCreateModal}
                className="orixnal-gradient-bg text-white text-xs font-bold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-2xs mt-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Event</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredEvents.map((evt) => (
              <motion.div
                key={evt.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
              >
                {/* Banner & Status Badge */}
                <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-purple-50">
                  <img
                    src={evt.bannerImage}
                    alt={evt.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PRESET_BANNERS[0].url;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-purple-950/10 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {evt.status === 'Current' && (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        Current Event
                      </span>
                    )}
                    {evt.status === 'Upcoming' && (
                      <span className="inline-flex items-center gap-1.5 orixnal-gradient-bg text-white font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        <Calendar className="w-3 h-3 text-amber-300" />
                        Upcoming
                      </span>
                    )}
                    {evt.status === 'Past' && (
                      <span className="inline-flex items-center gap-1.5 bg-neutral-200 text-neutral-800 font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                        Past Event
                      </span>
                    )}

                    {evt.featuredOnHome && (
                      <span className="bg-amber-400 text-amber-950 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-amber-300">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Admin Direct Actions on Card */}
                  {isAdminLoggedIn && (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-neutral-200 shadow-sm">
                      <button
                        onClick={() => handleOpenEditModal(evt)}
                        className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-xl transition-all"
                        title="Edit Event"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-purple-700" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(evt.id, evt.name)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Date & Location overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-white">
                      <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20">
                        <Calendar className="w-3.5 h-3.5 text-amber-300" />
                        {evt.startDate} {evt.endDate !== evt.startDate ? `to ${evt.endDate}` : ''}
                      </span>
                      <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/20">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        {evt.startTime} - {evt.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-neutral-950 group-hover:text-purple-700 transition-colors leading-snug">
                      {evt.name}
                    </h2>

                    <div className="flex items-start gap-1.5 text-xs text-neutral-600 font-medium">
                      <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{evt.location}</span>
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Activities List Preview */}
                    {evt.activities && evt.activities.length > 0 && (
                      <div className="pt-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                          Activities Included ({evt.activities.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {evt.activities.slice(0, 3).map((act, i) => (
                            <span
                              key={i}
                              className="text-[11px] font-medium bg-neutral-100 border border-neutral-200/80 text-neutral-700 px-2.5 py-0.5 rounded-full"
                            >
                              ✓ {act}
                            </span>
                          ))}
                          {evt.activities.length > 3 && (
                            <span className="text-[11px] font-bold text-purple-700 px-2 py-0.5 bg-purple-50 rounded-full">
                              +{evt.activities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Ticket Pricing & Details Footer */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="text-[10px] uppercase font-mono font-bold text-neutral-400">
                        Ticket / Access
                      </div>
                      <div className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-purple-600" />
                        <span>{evt.ticket?.price || 'Free'}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="orixnal-gradient-bg text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-2xs hover:opacity-95 transition-opacity"
                    >
                      <span>Event Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* EVENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white border border-neutral-200/90 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header Banner */}
              <div className="relative h-64 sm:h-72 w-full bg-purple-50 shrink-0">
                <img
                  src={selectedEvent.bannerImage}
                  alt={selectedEvent.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-purple-950/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      selectedEvent.status === 'Current' ? 'bg-emerald-500 text-neutral-950' :
                      selectedEvent.status === 'Upcoming' ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}>
                      {selectedEvent.status} Event
                    </span>
                    <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded-full text-white backdrop-blur-sm">
                      {selectedEvent.ticket.availability}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                    {selectedEvent.name}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-800 flex-1">
                {/* Date, Time & Location Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase font-bold text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-700" />
                      Date & Schedule
                    </div>
                    <div className="text-xs font-bold text-neutral-900">
                      {selectedEvent.startDate} {selectedEvent.endDate !== selectedEvent.startDate ? `to ${selectedEvent.endDate}` : ''}
                    </div>
                    <div className="text-xs text-neutral-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase font-bold text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-600" />
                      Venue / Stream
                    </div>
                    <div className="text-xs font-bold text-neutral-900">
                      {selectedEvent.location}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      On-site registration & virtual access link provided upon RSVP
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                    Event Overview & Strategy
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Activities */}
                {selectedEvent.activities && selectedEvent.activities.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
                      Activities & Sessions Included
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedEvent.activities.map((act, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 bg-white p-3 rounded-xl border border-neutral-200 text-xs text-neutral-800 font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ticket & Booking CTA */}
                <div className="orixnal-gradient-bg text-white p-6 rounded-2xl space-y-3 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-purple-200 font-mono font-bold uppercase">
                        Ticket Pricing
                      </div>
                      <div className="text-xl font-black text-white mt-0.5">
                        {selectedEvent.ticket.price}
                      </div>
                      {selectedEvent.ticket.notes && (
                        <div className="text-xs text-purple-200/80 mt-1">
                          {selectedEvent.ticket.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={selectedEvent.ticket.bookingUrl || COMPANY_DETAILS.phoneRaw}
                        className="bg-white text-purple-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 hover:bg-purple-100 transition-colors shadow-md"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>RSVP / Get Ticket</span>
                      </a>
                      <a
                        href={COMPANY_DETAILS.phoneRaw}
                        className="bg-purple-900/80 border border-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 hover:bg-purple-900 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Support</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Event Gallery */}
                {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                      <ImageIcon className="w-4 h-4 text-purple-700" />
                      Event Photo Gallery
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {selectedEvent.gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveGalleryImage(img)}
                          className="h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 group relative focus:outline-none"
                        >
                          <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = PRESET_BANNERS[0].url;
                            }}
                          />
                          <div className="absolute inset-0 bg-neutral-900/10 group-hover:bg-transparent transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GALLERY LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeGalleryImage && (
          <div
            className="fixed inset-0 z-50 bg-neutral-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setActiveGalleryImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
              <img
                src={activeGalleryImage}
                alt="Enlarged Event Photo"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/20 shadow-2xl"
              />
              <button
                onClick={() => setActiveGalleryImage(null)}
                className="absolute top-4 right-4 bg-purple-950/80 text-white p-2 rounded-full border border-purple-700/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ADMIN LOGIN MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-950">ORIXNAL Event Admin Portal</h3>
                <p className="text-xs text-neutral-500">
                  Authenticate with authorized event manager credentials to create or modify events.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="Enter admin email address..."
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    Password
                  </label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="Enter password..."
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full orixnal-gradient-bg text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md hover:opacity-95 transition-opacity"
                >
                  Log In to Admin Panel
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHANGE PASSWORD MODAL */}
      <AnimatePresence>
        {showChangePasswordModal && (
          <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-950">Update Admin Password</h3>
                <p className="text-xs text-neutral-500">
                  Update your event manager admin password.
                </p>
              </div>

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                {passError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{passError}</span>
                  </div>
                )}

                {passSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{passSuccess}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currPassInput}
                    onChange={(e) => setCurrPassInput(e.target.value)}
                    required
                    placeholder="Enter current password..."
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    required
                    placeholder="Minimum 6 characters..."
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                    required
                    placeholder="Re-enter new password..."
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full orixnal-gradient-bg text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md hover:opacity-95 transition-all"
                >
                  Save New Password
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CREATE / EDIT EVENT FORM MODAL */}
      <AnimatePresence>
        {showEventFormModal && (
          <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-neutral-200 bg-[#FAF9F6] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-950">
                      {editingEventId ? 'Edit Event Details' : 'Create New Event'}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Fill in banner, dates, timings, activities, tickets & photo gallery.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowEventFormModal(false)}
                  className="text-neutral-400 hover:text-neutral-600 p-1.5 rounded-xl hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSaveEventSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                {/* Event Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. ORIXNAL® Brand & IP Summit 2026"
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 font-bold"
                  />
                </div>

                {/* Banner Image File Upload + URL + Preset picker */}
                <div className="space-y-2.5 bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-neutral-800 uppercase flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-purple-700" />
                      <span>Event Cover / Banner Image *</span>
                    </label>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-purple-200 transition-colors self-start sm:self-auto">
                      <Upload className="w-3.5 h-3.5 text-purple-700" />
                      <span>Upload Cover Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverFileUpload}
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    required
                    value={formData.bannerImage}
                    onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                    placeholder="Paste image URL (https://...) or upload cover image file above"
                    className="w-full bg-white border border-neutral-300 text-neutral-900 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 font-mono"
                  />

                  {/* Preset Banner Selector */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase shrink-0">Presets:</span>
                    {PRESET_BANNERS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setFormData({ ...formData, bannerImage: preset.url })}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border whitespace-nowrap transition-all ${
                          formData.bannerImage === preset.url
                            ? 'bg-purple-900 text-white border-purple-900 font-bold'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>

                  {formData.bannerImage && (
                    <div className="relative h-36 rounded-xl overflow-hidden bg-purple-50 border border-neutral-200 mt-2">
                      <img
                        src={formData.bannerImage}
                        alt="Banner Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                        Active Cover Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Dates & Timings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      End Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      Start Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      placeholder="10:00 AM"
                      className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      End Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      placeholder="06:00 PM"
                      className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-medium"
                    />
                  </div>
                </div>

                {/* Event Status & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      Event Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                      className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-bold"
                    >
                      <option value="Current">Current Event</option>
                      <option value="Upcoming">Upcoming Event</option>
                      <option value="Past">Past Event</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-neutral-700 uppercase">
                      Location / Venue *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. E-Square Building, Sector 96, Noida & Virtual Stream"
                      className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-medium"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    Event Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Detailed explanation of what attendees will learn or experience..."
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-medium leading-relaxed"
                  />
                </div>

                {/* Event Activities Editor */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-700 uppercase">
                    Event Activities / Highlights
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newActivityText}
                      onChange={(e) => setNewActivityText(e.target.value)}
                      placeholder="Add an activity (e.g. Keynote Speech, Legal Audit)..."
                      className="flex-1 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-xl px-3 py-2 focus:outline-none font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newActivityText.trim()) {
                          setFormData({
                            ...formData,
                            activities: [...formData.activities, newActivityText.trim()]
                          });
                          setNewActivityText('');
                        }
                      }}
                      className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-3 py-2 rounded-xl"
                    >
                      Add Activity
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {formData.activities.map((act, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-50 text-purple-900 border border-purple-200 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5"
                      >
                        <span>✓ {act}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              activities: formData.activities.filter((_, i) => i !== idx)
                            });
                          }}
                          className="hover:text-rose-600 font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-purple-900">
                    Ticket & RSVP Configuration
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-600 uppercase">
                        Ticket Price / Title
                      </label>
                      <input
                        type="text"
                        value={formData.ticketPrice}
                        onChange={(e) => setFormData({ ...formData, ticketPrice: e.target.value })}
                        placeholder="Free / ₹4,999 VIP Pass"
                        className="w-full bg-white border border-neutral-300 text-xs rounded-xl px-3 py-2 font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-600 uppercase">
                        Availability Status
                      </label>
                      <select
                        value={formData.ticketAvailability}
                        onChange={(e) => setFormData({ ...formData, ticketAvailability: e.target.value as any })}
                        className="w-full bg-white border border-neutral-300 text-xs rounded-xl px-3 py-2 font-bold"
                      >
                        <option value="Available">Available</option>
                        <option value="Selling Fast">Selling Fast</option>
                        <option value="Sold Out">Sold Out</option>
                        <option value="Invite Only">Invite Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-neutral-600 uppercase">
                      Booking / Inquiry URL or Action
                    </label>
                    <input
                      type="text"
                      value={formData.ticketUrl}
                      onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })}
                      placeholder="mailto:hello@orixnal.com or tel:+918447561650"
                      className="w-full bg-white border border-neutral-300 text-xs rounded-xl px-3 py-2 font-mono"
                    />
                  </div>
                </div>

                {/* Photo Gallery Editor */}
                <div className="space-y-2.5 bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-neutral-800 uppercase flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-purple-700" />
                      <span>Event Photo Gallery</span>
                    </label>

                    <label className="cursor-pointer inline-flex items-center gap-1.5 orixnal-gradient-bg text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-2xs hover:opacity-95 transition-opacity self-start sm:self-auto">
                      <ImagePlus className="w-3.5 h-3.5" />
                      <span>Upload Photos from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleGalleryFileUpload}
                      />
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      placeholder="Or paste image URL for gallery..."
                      className="flex-1 bg-white border border-neutral-300 text-xs rounded-xl px-3 py-2 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newGalleryUrl.trim()) {
                          setFormData({
                            ...formData,
                            gallery: [...formData.gallery, newGalleryUrl.trim()]
                          });
                          setNewGalleryUrl('');
                        }
                      }}
                      className="bg-purple-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-purple-950 transition-colors"
                    >
                      Add URL Photo
                    </button>
                  </div>

                  {formData.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {formData.gallery.map((url, idx) => (
                        <div key={idx} className="relative h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 group">
                          <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                gallery: formData.gallery.filter((_, i) => i !== idx)
                              });
                            }}
                            className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-full text-[10px] shadow-sm hover:bg-rose-700 transition-colors"
                            title="Remove Photo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-neutral-400 italic">No gallery photos added yet. Upload files above or paste URLs.</p>
                  )}
                </div>

                {/* Homepage Visibility */}
                <div className="flex items-center gap-3 p-3 bg-neutral-100 rounded-xl border border-neutral-200">
                  <input
                    type="checkbox"
                    id="featuredOnHome"
                    checked={formData.featuredOnHome}
                    onChange={(e) => setFormData({ ...formData, featuredOnHome: e.target.checked })}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="featuredOnHome" className="text-xs font-bold text-neutral-800 cursor-pointer">
                    Showcase this event on the ORIXNAL Home Page
                  </label>
                </div>

                {/* Form Buttons */}
                <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEventFormModal(false)}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="orixnal-gradient-bg text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md hover:opacity-95 transition-opacity"
                  >
                    {editingEventId ? 'Save Event Changes' : 'Publish New Event'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
