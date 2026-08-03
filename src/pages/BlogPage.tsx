import React, { useState, useEffect } from 'react';
import { PageRoute, BlogPost, BlogAttachment, BlogContentSection } from '../types';
import {
  getStoredBlogs,
  saveStoredBlogs,
  createNewBlogPost,
  updateBlogPost,
  deleteBlogPost,
  BLOG_CATEGORIES,
  DEFAULT_BLOG_POSTS,
  BLOG_ADMIN_EMAIL,
  getBlogAdminPassword,
  isBlogAdminLoggedIn,
  setBlogAdminLoggedIn,
  changeBlogAdminPassword,
  isUsingBlogTempPassword
} from '../data/blogData';
import {
  BookOpen,
  Search,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  User,
  Tag,
  FileText,
  Paperclip,
  Download,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Share2,
  Heart,
  Eye,
  Check,
  Type,
  Palette,
  Image as ImageIcon,
  FileDown,
  Layers,
  X,
  Lock,
  Unlock,
  AlertCircle,
  KeyRound,
  LogOut,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenAudit?: () => void;
}

const STOCK_BANNER_PRESETS = [
  { label: 'Strategy & AI', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Legal & IP', url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Web Engineering', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Modern Office', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Creative Design', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop' },
];

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenAudit }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => isBlogAdminLoggedIn());
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Password Change Modal State
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);
  const [newPassInput, setNewPassInput] = useState<string>('');
  const [confirmPassInput, setConfirmPassInput] = useState<string>('');
  const [passChangeError, setPassChangeError] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [targetPostForAction, setTargetPostForAction] = useState<BlogPost | null>(null);

  // Editor Modal State
  const [showEditorModal, setShowEditorModal] = useState<boolean>(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'content' | 'sections' | 'attachments' | 'preview'>('content');

  // Editor Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formCategory, setFormCategory] = useState('Brand Strategy & Naming');
  const [formCoverImage, setFormCoverImage] = useState(STOCK_BANNER_PRESETS[0].url);
  const [formAuthorName, setFormAuthorName] = useState('Asim Khan');
  const [formAuthorRole, setFormAuthorRole] = useState('Founder & Principal Brand Architect');
  const [formAuthorAvatar, setFormAuthorAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formTags, setFormTags] = useState('Strategy, Naming, Growth');
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft'>('Published');
  const [formFontFamily, setFormFontFamily] = useState<'sans' | 'serif' | 'mono' | 'display'>('sans');
  const [formFontSize, setFormFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [formAccentColor, setFormAccentColor] = useState('#8B5CF6');
  const [formMainContent, setFormMainContent] = useState('');
  const [formSections, setFormSections] = useState<BlogContentSection[]>([]);
  const [formAttachments, setFormAttachments] = useState<BlogAttachment[]>([]);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const loaded = getStoredBlogs();
    setBlogs(loaded);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const reloadBlogs = () => {
    const updated = getStoredBlogs();
    setBlogs(updated);
  };

  // Auth Guarded Action Interceptors
  const handleWriteBlogClick = () => {
    if (!isAdminLoggedIn) {
      setPendingAction('create');
      setLoginError(null);
      setLoginPassword('');
      setShowLoginModal(true);
    } else {
      handleOpenNewBlogEditor();
    }
  };

  const handleEditBlogClick = (post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isAdminLoggedIn) {
      setPendingAction('edit');
      setTargetPostForAction(post);
      setLoginError(null);
      setLoginPassword('');
      setShowLoginModal(true);
    } else {
      handleEditBlog(post);
    }
  };

  const handleDeleteBlogClick = (id: string, post: BlogPost, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isAdminLoggedIn) {
      setPendingAction('delete');
      setTargetPostForAction(post);
      setLoginError(null);
      setLoginPassword('');
      setShowLoginModal(true);
    } else {
      handleDeleteBlog(id);
    }
  };

  // Admin Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validPassword = getBlogAdminPassword();

    if (loginEmail.trim().toLowerCase() !== BLOG_ADMIN_EMAIL.toLowerCase()) {
      setLoginError(`Invalid email address. Admin dashboard requires registered email: ${BLOG_ADMIN_EMAIL}`);
      return;
    }

    if (loginPassword !== validPassword) {
      setLoginError('Incorrect password. Please verify and try again.');
      return;
    }

    // Success login!
    setBlogAdminLoggedIn(true);
    setIsAdminLoggedIn(true);
    setShowLoginModal(false);
    setLoginError(null);
    setLoginPassword('');
    triggerToast('Blog Admin authenticated successfully!');

    // Check if using temporary password, suggest/require password change
    if (isUsingBlogTempPassword()) {
      setShowChangePasswordModal(true);
    }

    // Perform pending action if any
    if (pendingAction === 'create') {
      handleOpenNewBlogEditor();
    } else if (pendingAction === 'edit' && targetPostForAction) {
      handleEditBlog(targetPostForAction);
    } else if (pendingAction === 'delete' && targetPostForAction) {
      handleDeleteBlog(targetPostForAction.id);
    }

    setPendingAction(null);
    setTargetPostForAction(null);
  };

  // Password Change Handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassInput || newPassInput.length < 6) {
      setPassChangeError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassInput !== confirmPassInput) {
      setPassChangeError('Passwords do not match. Please re-enter.');
      return;
    }

    changeBlogAdminPassword(newPassInput);
    setShowChangePasswordModal(false);
    setNewPassInput('');
    setConfirmPassInput('');
    setPassChangeError(null);
    triggerToast('Admin password updated! Please use your new password for future logins.');
  };

  // Admin Logout Handler
  const handleAdminLogout = () => {
    setBlogAdminLoggedIn(false);
    setIsAdminLoggedIn(false);
    setShowEditorModal(false);
    triggerToast('Logged out of Blog Admin Dashboard.');
  };

  // Open Editor for Creating New Blog
  const handleOpenNewBlogEditor = () => {
    setEditingBlogId(null);
    setFormTitle('');
    setFormShortDesc('');
    setFormCategory('Brand Strategy & Naming');
    setFormCoverImage(STOCK_BANNER_PRESETS[0].url);
    setFormAuthorName('Asim Khan');
    setFormAuthorRole('Founder & Principal Brand Architect');
    setFormAuthorAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop');
    setFormReadTime('5 min read');
    setFormTags('Strategy, Naming, Growth');
    setFormStatus('Published');
    setFormFontFamily('sans');
    setFormFontSize('base');
    setFormAccentColor('#8B5CF6');
    setFormMainContent('');
    setFormSections([
      { id: 'sec-1', type: 'paragraph', text: 'Write your introductory thoughts here...' }
    ]);
    setFormAttachments([]);
    setEditorTab('content');
    setShowEditorModal(true);
  };

  // Open Editor for Existing Blog
  const handleEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setFormTitle(post.title);
    setFormShortDesc(post.shortDescription);
    setFormCategory(post.category);
    setFormCoverImage(post.coverImage);
    setFormAuthorName(post.publishedBy.name);
    setFormAuthorRole(post.publishedBy.role);
    setFormAuthorAvatar(post.publishedBy.avatarUrl || '');
    setFormReadTime(post.readTime);
    setFormTags(post.tags.join(', '));
    setFormStatus(post.status);
    setFormFontFamily(post.contentStyle?.fontFamily || 'sans');
    setFormFontSize(post.contentStyle?.fontSize || 'base');
    setFormAccentColor(post.contentStyle?.accentColor || '#8B5CF6');
    setFormMainContent(post.mainContent);
    setFormSections(post.sections || []);
    setFormAttachments(post.attachments || []);
    setEditorTab('content');
    setShowEditorModal(true);
  };

  // Save Blog Post
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter a Blog Title');
      return;
    }

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const blogData: Partial<BlogPost> = {
      title: formTitle,
      shortDescription: formShortDesc,
      category: formCategory,
      coverImage: formCoverImage,
      publishedBy: {
        name: formAuthorName || 'Asim Khan',
        role: formAuthorRole || 'Founder & Brand Strategist',
        avatarUrl: formAuthorAvatar,
      },
      readTime: formReadTime || '4 min read',
      tags: tagsArray.length > 0 ? tagsArray : ['Strategy'],
      status: formStatus,
      contentStyle: {
        fontFamily: formFontFamily,
        fontSize: formFontSize,
        textColor: '#171717',
        accentColor: formAccentColor,
      },
      mainContent: formMainContent,
      sections: formSections,
      attachments: formAttachments,
    };

    if (editingBlogId) {
      updateBlogPost(editingBlogId, blogData);
      triggerToast('Blog post updated successfully!');
    } else {
      const created = createNewBlogPost(blogData);
      triggerToast('New blog post published successfully!');
      setActiveBlog(created);
    }

    reloadBlogs();
    setShowEditorModal(false);
  };

  // Delete Blog
  const handleDeleteBlog = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
      reloadBlogs();
      if (activeBlog?.id === id) {
        setActiveBlog(null);
      }
      triggerToast('Blog post deleted.');
    }
  };

  // Add Section to Editor
  const handleAddSection = (type: 'heading' | 'paragraph' | 'callout' | 'bullets') => {
    const newSec: BlogContentSection = {
      id: `sec-${Date.now()}`,
      type,
      headingText: type === 'heading' ? 'New Section Heading' : type === 'callout' ? 'Key Takeaway' : '',
      text: type === 'paragraph' ? 'Write detailed analysis...' : type === 'callout' ? 'Important insight or quote...' : '',
      bulletItems: type === 'bullets' ? ['Bullet point 1', 'Bullet point 2'] : [],
    };
    setFormSections([...formSections, newSec]);
  };

  // Add Attachment to Editor
  const handleAddAttachment = (type: 'image' | 'pdf') => {
    const newAtt: BlogAttachment = {
      id: `att-${Date.now()}`,
      type,
      name: type === 'pdf' ? 'Downloadable_Resource_Guide.pdf' : 'Infographic_Chart.png',
      url: type === 'pdf'
        ? 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        : 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000&auto=format&fit=crop',
      fileSize: type === 'pdf' ? '2.4 MB PDF' : undefined,
      description: type === 'pdf' ? 'Official downloadable document resource' : undefined,
      caption: type === 'image' ? 'Chart caption & source reference' : undefined,
    };
    setFormAttachments([...formAttachments, newAtt]);
  };

  // Filter Blogs
  const filteredBlogs = blogs.filter((post) => {
    const matchesCat = selectedCategory === 'All Categories' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.publishedBy.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredBlog = blogs.find((b) => b.featured) || blogs[0];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 orixnal-gradient-bg text-white px-5 py-3 rounded-2xl shadow-2xl border border-purple-300 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="text-xs font-extrabold">{toastMessage}</span>
        </div>
      )}

      {/* ADMIN TOP STATUS TOOLBAR */}
      {isAdminLoggedIn && (
        <div className="bg-purple-900 text-white px-4 sm:px-8 py-2.5 border-b border-purple-800 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-purple-300" />
            <span className="font-bold text-purple-100">Blog Admin Dashboard Active:</span>
            <span className="font-mono font-extrabold text-amber-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">{BLOG_ADMIN_EMAIL}</span>
            {isUsingBlogTempPassword() && (
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-amber-300" />
                Default Temp Password
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPassChangeError(null);
                setNewPassInput('');
                setConfirmPassInput('');
                setShowChangePasswordModal(true);
              }}
              className="bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700/60 px-3 py-1 rounded-lg font-bold transition-colors flex items-center gap-1.5 text-[11px]"
            >
              <KeyRound className="w-3.5 h-3.5 text-purple-300" />
              <span>Change Password</span>
            </button>

            <button
              onClick={handleAdminLogout}
              className="bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/60 px-3 py-1 rounded-lg font-bold transition-colors flex items-center gap-1.5 text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-300" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. SINGLE BLOG ARTICLE READER VIEW */}
      {activeBlog ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-8 animate-fade-in">
          
          {/* Back Navigation & Editor Action */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setActiveBlog(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-purple-800 hover:text-purple-950 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl border border-purple-200 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Blogs</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => handleEditBlogClick(activeBlog, e)}
                className="inline-flex items-center gap-1.5 text-xs font-bold orixnal-gradient-bg text-white hover:opacity-95 px-3.5 py-2 rounded-xl shadow-xs transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Post</span>
              </button>
              <button
                onClick={(e) => handleDeleteBlogClick(activeBlog.id, activeBlog, e)}
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 px-3 py-2 rounded-xl border border-rose-200 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Article Header Card */}
          <div className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-xs">
            {/* Cover Banner Image */}
            <div className="relative h-72 sm:h-96 w-full bg-purple-50 overflow-hidden">
              <img
                src={activeBlog.coverImage}
                alt={activeBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-purple-950/10 to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="orixnal-gradient-bg text-white text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full shadow-sm">
                  {activeBlog.category}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-purple-900 border border-neutral-200 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {activeBlog.readTime}
                </span>
              </div>
            </div>

            {/* Title & Metadata Padding */}
            <div className="p-6 sm:p-10 space-y-6">
              <h1 className="text-2xl sm:text-4xl font-black text-neutral-950 leading-tight">
                {activeBlog.title}
              </h1>

              <p className="text-base sm:text-lg font-medium text-neutral-600 leading-relaxed border-l-4 border-purple-600 pl-4 bg-purple-50/50 py-2 rounded-r-xl">
                {activeBlog.shortDescription}
              </p>

              {/* "Published By" Author Card */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-neutral-100 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeBlog.publishedBy.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                    alt={activeBlog.publishedBy.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 shadow-sm"
                  />
                  <div>
                    <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Published By</div>
                    <div className="text-sm font-extrabold text-neutral-950">{activeBlog.publishedBy.name}</div>
                    <div className="text-xs text-purple-700 font-medium">{activeBlog.publishedBy.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    {activeBlog.publishedAt}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-neutral-400" />
                    {activeBlog.viewsCount || 102} views
                  </span>
                </div>
              </div>

              {/* Tags List */}
              {activeBlog.tags && activeBlog.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 mr-1" />
                  {activeBlog.tags.map((t, idx) => (
                    <span key={idx} className="text-[11px] font-mono bg-neutral-100 text-neutral-700 px-2.5 py-0.5 rounded-md border border-neutral-200">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MAIN BODY CONTENT AREA (CUSTOM TYPOGRAPHY & SECTIONS) */}
          <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-8">
            
            {/* Formatted Main Text */}
            <div
              className={`prose max-w-none space-y-4 ${
                activeBlog.contentStyle?.fontFamily === 'serif' ? 'font-serif' :
                activeBlog.contentStyle?.fontFamily === 'mono' ? 'font-mono' :
                activeBlog.contentStyle?.fontFamily === 'display' ? 'font-display' : 'font-sans'
              } ${
                activeBlog.contentStyle?.fontSize === 'sm' ? 'text-xs' :
                activeBlog.contentStyle?.fontSize === 'lg' ? 'text-lg' :
                activeBlog.contentStyle?.fontSize === 'xl' ? 'text-xl' : 'text-base'
              }`}
              style={{ color: activeBlog.contentStyle?.textColor || '#171717' }}
            >
              {activeBlog.mainContent.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="leading-relaxed whitespace-pre-line text-neutral-800 font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Dynamic Custom Content Sections */}
            {activeBlog.sections && activeBlog.sections.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-neutral-100">
                {activeBlog.sections.map((sec) => (
                  <div key={sec.id} className="space-y-2">
                    {sec.type === 'heading' && (
                      <h2
                        className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 pt-3"
                        style={{ color: activeBlog.contentStyle?.accentColor || '#171717' }}
                      >
                        {sec.headingText}
                      </h2>
                    )}

                    {sec.text && (
                      <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                        {sec.text}
                      </p>
                    )}

                    {sec.type === 'callout' && (
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-neutral-50 border-l-4 border-purple-600 shadow-2xs space-y-1">
                        {sec.headingText && <h4 className="text-xs font-mono font-bold uppercase text-purple-900">{sec.headingText}</h4>}
                        <p className="text-sm font-semibold italic text-neutral-900">{sec.text}</p>
                      </div>
                    )}

                    {sec.type === 'bullets' && sec.bulletItems && (
                      <ul className="space-y-2 pl-2">
                        {sec.bulletItems.map((bItem, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-800">
                            <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 mt-1.5" />
                            <span>{bItem}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ATTACHMENTS & DOWNLOADABLE PDFs / INLINE IMAGES SECTION */}
            {activeBlog.attachments && activeBlog.attachments.length > 0 && (
              <div className="pt-8 border-t border-neutral-200/80 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-3 py-1 rounded-md w-fit">
                  <Paperclip className="w-3.5 h-3.5 text-purple-700" />
                  <span>Article Attachments & Downloadable Resources ({activeBlog.attachments.length})</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeBlog.attachments.map((att) => (
                    <div key={att.id} className="bg-[#FAF9F6] border border-neutral-200 rounded-2xl p-4 space-y-3 shadow-2xs">
                      {att.type === 'pdf' ? (
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                            <FileDown className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="text-xs font-extrabold text-neutral-900 truncate">{att.name}</h4>
                            {att.description && <p className="text-[11px] text-neutral-600 line-clamp-2">{att.description}</p>}
                            {att.fileSize && <span className="inline-block text-[10px] font-mono text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">{att.fileSize}</span>}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <img
                            src={att.url}
                            alt={att.name}
                            className="w-full h-44 object-cover rounded-xl border border-neutral-200"
                            referrerPolicy="no-referrer"
                          />
                          {att.caption && <p className="text-[11px] text-neutral-500 italic text-center">{att.caption}</p>}
                        </div>
                      )}

                      {/* Download / Open Action */}
                      <a
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white hover:bg-purple-600 hover:text-white border border-neutral-300 text-neutral-900 font-extrabold text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs group"
                      >
                        <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                        <span>{att.type === 'pdf' ? 'Download PDF Document' : 'View Full Image'}</span>
                        <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-white" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Footer Card */}
            <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-purple-50/40 p-6 rounded-2xl">
              <div className="flex items-center gap-3">
                <img
                  src={activeBlog.publishedBy.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                  alt={activeBlog.publishedBy.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-300"
                />
                <div>
                  <div className="text-xs font-bold text-neutral-500 uppercase">Written & Published By</div>
                  <div className="text-base font-extrabold text-neutral-950">{activeBlog.publishedBy.name}</div>
                  <div className="text-xs text-purple-800 font-semibold">{activeBlog.publishedBy.role}</div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="orixnal-gradient-bg text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md hover:opacity-95 transition-opacity flex items-center gap-2"
              >
                <span>Consult with Author</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* 2. PUBLIC BLOG LISTING & EDITOR DASHBOARD CONTROLS */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-neutral-950 via-purple-950 to-neutral-900 rounded-3xl p-6 sm:p-10 text-white border border-purple-800/40 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-200 text-xs font-mono font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>ORIXNAL Strategic Blog & Publications</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Insights, IP Analysis & Brand Engineering
              </h1>

              <p className="text-xs sm:text-base text-neutral-300 leading-relaxed font-normal">
                Explore research essays, trademark advisories, web architecture guides, and downloadable whitepapers curated by founder Asim Khan and the advisory team.
              </p>

              {/* Action Buttons: Write Blog */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleWriteBlogClick}
                  className="bg-amber-400 text-neutral-950 hover:bg-amber-300 font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 group"
                >
                  <Plus className="w-4 h-4 group-hover:scale-125 transition-transform" />
                  <span>Write New Blog Post (Dashboard)</span>
                </button>

                <div className="text-xs text-purple-900 font-mono flex items-center gap-1.5 bg-purple-100 px-3.5 py-2 rounded-xl border border-purple-200">
                  <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                  <span>{blogs.length} Total Posts Stored</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search blogs by title, category, author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-neutral-200 rounded-xl focus:outline-none focus:border-purple-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Dropdown / Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'orixnal-gradient-bg text-white shadow-xs'
                      : 'bg-[#FAF9F6] text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FEATURED SPOTLIGHT BLOG CARD (IF ANY) */}
          {featuredBlog && selectedCategory === 'All Categories' && !searchQuery && (
            <div
              onClick={() => setActiveBlog(featuredBlog)}
              className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-6 relative h-64 lg:h-auto overflow-hidden bg-purple-50">
                <img
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full shadow-md">
                  Featured Publication
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-800">
                    <span className="bg-purple-100 px-2.5 py-0.5 rounded-full font-bold">{featuredBlog.category}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{featuredBlog.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-neutral-950 group-hover:text-purple-700 transition-colors leading-snug">
                    {featuredBlog.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                    {featuredBlog.shortDescription}
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredBlog.publishedBy.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                      alt={featuredBlog.publishedBy.name}
                      className="w-8 h-8 rounded-full object-cover border border-purple-200"
                    />
                    <div>
                      <div className="text-xs font-extrabold text-neutral-950">{featuredBlog.publishedBy.name}</div>
                      <div className="text-[10px] text-neutral-500">{featuredBlog.publishedAt}</div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-purple-800 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MAIN BLOG GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3">
              <h2 className="text-sm font-mono font-bold uppercase text-neutral-500 tracking-wider">
                All Published Blog Articles ({filteredBlogs.length})
              </h2>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="bg-white border border-neutral-200 rounded-3xl p-12 text-center space-y-3">
                <BookOpen className="w-10 h-10 text-neutral-300 mx-auto" />
                <h3 className="text-base font-bold text-neutral-900">No blogs match your search or filter</h3>
                <p className="text-xs text-neutral-500">Try selecting 'All Categories' or write a new blog post using the dashboard.</p>
                <button
                  onClick={handleWriteBlogClick}
                  className="bg-purple-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Create New Blog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setActiveBlog(post)}
                    className="bg-white border border-neutral-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      {/* Cover Banner */}
                      <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full orixnal-gradient-bg text-white shadow-2xs">
                            {post.category}
                          </span>
                        </div>
                        {post.attachments && post.attachments.some(a => a.type === 'pdf') && (
                          <div className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                            <FileDown className="w-3 h-3" />
                            <span>PDF Attached</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-purple-800">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{post.publishedAt}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-base font-extrabold text-neutral-950 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>

                        <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                          {post.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Author Footer */}
                    <div className="px-5 pb-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.publishedBy.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                          alt={post.publishedBy.name}
                          className="w-6 h-6 rounded-full object-cover border border-purple-200"
                        />
                        <span className="font-bold text-neutral-900 text-[11px] truncate max-w-[120px]">
                          {post.publishedBy.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleEditBlogClick(post, e)}
                          className="text-neutral-400 hover:text-purple-700 p-1"
                          title="Edit Blog"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-purple-700 font-extrabold text-[11px] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                          Read <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* 3. EDITOR DASHBOARD MODAL */}
      {showEditorModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 orixnal-gradient-bg text-white flex items-center justify-between border-b border-purple-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    {editingBlogId ? 'Edit Blog Publication' : 'Create New Blog Article'}
                  </h2>
                  <p className="text-xs text-purple-100">Configure cover image, main article text, styling, author profile, and attachments.</p>
                </div>
              </div>

              <button
                onClick={() => setShowEditorModal(false)}
                className="text-purple-200 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Editor Sub-Tabs Navigation */}
            <div className="flex items-center gap-2 border-b border-neutral-200 px-6 pt-3 bg-[#FAF9F6] overflow-x-auto no-scrollbar">
              <button
                onClick={() => setEditorTab('content')}
                className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  editorTab === 'content'
                    ? 'border-purple-600 text-purple-900 font-extrabold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>1. Core Details & Cover</span>
              </button>

              <button
                onClick={() => setEditorTab('sections')}
                className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  editorTab === 'sections'
                    ? 'border-purple-600 text-purple-900 font-extrabold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>2. Content & Formatting ({formSections.length} Sections)</span>
              </button>

              <button
                onClick={() => setEditorTab('attachments')}
                className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  editorTab === 'attachments'
                    ? 'border-purple-600 text-purple-900 font-extrabold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Paperclip className="w-4 h-4" />
                <span>3. PDF & Image Attachments ({formAttachments.length})</span>
              </button>

              <button
                onClick={() => setEditorTab('preview')}
                className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  editorTab === 'preview'
                    ? 'border-purple-600 text-purple-900 font-extrabold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Eye className="w-4 h-4 text-emerald-600" />
                <span>4. Live Preview</span>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* TAB 1: CORE DETAILS & COVER BANNER */}
              {editorTab === 'content' && (
                <div className="space-y-5">
                  
                  {/* Title & Category */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-1">
                      <label className="text-xs font-bold uppercase text-neutral-700">Blog Title *</label>
                      <input
                        type="text"
                        required
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Sovereign Brand Naming Framework in AI Era"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-4 space-y-1">
                      <label className="text-xs font-bold uppercase text-neutral-700">Category *</label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-xl bg-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
                      >
                        {BLOG_CATEGORIES.filter(c => c !== 'All Categories').map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-neutral-700">Short Description / Excerpt *</label>
                    <textarea
                      rows={2}
                      required
                      value={formShortDesc}
                      onChange={(e) => setFormShortDesc(e.target.value)}
                      placeholder="Summary of the article that appears on blog cards and search engines..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>

                  {/* Cover Banner Image URL & Presets */}
                  <div className="space-y-2 bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200">
                    <label className="text-xs font-bold uppercase text-neutral-800 flex items-center justify-between">
                      <span>Cover Banner Image URL *</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Or pick a preset image below</span>
                    </label>

                    <input
                      type="url"
                      required
                      value={formCoverImage}
                      onChange={(e) => setFormCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-xl bg-white focus:outline-none"
                    />

                    {/* Stock Presets */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] font-bold text-neutral-500">Quick Presets:</span>
                      {STOCK_BANNER_PRESETS.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => setFormCoverImage(p.url)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                            formCoverImage === p.url
                              ? 'bg-purple-800 text-white border-purple-800'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>

                    {/* Banner Image Preview */}
                    {formCoverImage && (
                      <div className="mt-2 h-36 w-full rounded-xl overflow-hidden border border-neutral-300 bg-neutral-100 relative">
                        <img
                          src={formCoverImage}
                          alt="Cover Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-2 left-2 bg-purple-950/90 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                          Banner Preview
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Published By (Author Details) */}
                  <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-200/80 space-y-3">
                    <h3 className="text-xs font-mono font-bold uppercase text-purple-900 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-purple-700" />
                      <span>Published By (Author Profile)</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-700">Author Name</label>
                        <input
                          type="text"
                          value={formAuthorName}
                          onChange={(e) => setFormAuthorName(e.target.value)}
                          placeholder="e.g. Asim Khan"
                          className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-700">Author Role / Designation</label>
                        <input
                          type="text"
                          value={formAuthorRole}
                          onChange={(e) => setFormAuthorRole(e.target.value)}
                          placeholder="e.g. Founder & Brand Strategist"
                          className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-700">Read Time & Status</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={formReadTime}
                            onChange={(e) => setFormReadTime(e.target.value)}
                            placeholder="5 min read"
                            className="w-1/2 px-2.5 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                          />
                          <select
                            value={formStatus}
                            onChange={(e) => setFormStatus(e.target.value as any)}
                            className="w-1/2 px-2 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white font-bold"
                          >
                            <option value="Published">Published</option>
                            <option value="Draft">Draft</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-neutral-700">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="Naming, Trademarks, AI, Global Strategy"
                      className="w-full px-3.5 py-2 text-xs border border-neutral-300 rounded-xl"
                    />
                  </div>

                </div>
              )}

              {/* TAB 2: CONTENT & FORMATTING SECTIONS */}
              {editorTab === 'sections' && (
                <div className="space-y-6">
                  
                  {/* Style Toolbar */}
                  <div className="bg-purple-50/80 text-neutral-900 p-4 rounded-2xl border border-purple-200/80 space-y-3 shadow-2xs">
                    <div className="text-xs font-mono font-bold uppercase text-purple-900 flex items-center gap-2">
                      <Palette className="w-3.5 h-3.5 text-purple-700" />
                      <span>Typography & Formatting Style Toolbar</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-neutral-600 uppercase">Font Family</label>
                        <select
                          value={formFontFamily}
                          onChange={(e) => setFormFontFamily(e.target.value as any)}
                          className="w-full mt-1 px-3 py-1.5 text-xs bg-white text-neutral-900 border border-neutral-300 rounded-lg shadow-2xs"
                        >
                          <option value="sans">Sans-Serif (Modern)</option>
                          <option value="serif">Serif (Editorial / Classic)</option>
                          <option value="mono">Monospace (Technical)</option>
                          <option value="display">Display (Bold Heading)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-neutral-600 uppercase">Font Size</label>
                        <select
                          value={formFontSize}
                          onChange={(e) => setFormFontSize(e.target.value as any)}
                          className="w-full mt-1 px-3 py-1.5 text-xs bg-white text-neutral-900 border border-neutral-300 rounded-lg shadow-2xs"
                        >
                          <option value="sm">Small (Compact)</option>
                          <option value="base">Base Standard</option>
                          <option value="lg">Large (Spacious)</option>
                          <option value="xl">Extra Large</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-neutral-400 uppercase">Accent Theme Color</label>
                        <div className="flex items-center gap-2 mt-1">
                          {['#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#171717'].map((col) => (
                            <button
                              key={col}
                              type="button"
                              onClick={() => setFormAccentColor(col)}
                              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                                formAccentColor === col ? 'scale-12 border-white' : 'border-transparent'
                              }`}
                              style={{ backgroundColor: col }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Introduction Paragraphs */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-neutral-700">Main Introduction Content *</label>
                    <textarea
                      rows={4}
                      value={formMainContent}
                      onChange={(e) => setFormMainContent(e.target.value)}
                      placeholder="Write your main article introduction text here..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-neutral-300 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                  </div>

                  {/* Custom Structured Sections Builder */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase text-neutral-800">
                        Structured Content Sections ({formSections.length})
                      </label>

                      {/* Add Section Buttons */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleAddSection('heading')}
                          className="text-[11px] font-bold bg-purple-100 text-purple-900 hover:bg-purple-200 px-2.5 py-1 rounded-lg flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> + Heading
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSection('paragraph')}
                          className="text-[11px] font-bold bg-neutral-100 text-neutral-900 hover:bg-neutral-200 px-2.5 py-1 rounded-lg flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> + Paragraph
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSection('callout')}
                          className="text-[11px] font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> + Callout Quote
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddSection('bullets')}
                          className="text-[11px] font-bold bg-emerald-100 text-emerald-900 hover:bg-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> + Bullet List
                        </button>
                      </div>
                    </div>

                    {/* Render Form Sections */}
                    <div className="space-y-3">
                      {formSections.map((sec, index) => (
                        <div key={sec.id} className="bg-[#FAF9F6] border border-neutral-200 p-4 rounded-2xl relative space-y-2">
                          <button
                            type="button"
                            onClick={() => setFormSections(formSections.filter(s => s.id !== sec.id))}
                            className="absolute top-3 right-3 text-neutral-400 hover:text-rose-600 p-1"
                            title="Remove Section"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="text-[10px] font-mono font-bold uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded w-fit">
                            Section #{index + 1} — {sec.type}
                          </div>

                          {sec.type === 'heading' && (
                            <input
                              type="text"
                              value={sec.headingText || ''}
                              onChange={(e) => {
                                const copy = [...formSections];
                                copy[index].headingText = e.target.value;
                                setFormSections(copy);
                              }}
                              placeholder="Section Heading Title..."
                              className="w-full px-3 py-1.5 text-xs font-bold border border-neutral-300 rounded-lg bg-white"
                            />
                          )}

                          {(sec.type === 'paragraph' || sec.type === 'callout') && (
                            <textarea
                              rows={2}
                              value={sec.text || ''}
                              onChange={(e) => {
                                const copy = [...formSections];
                                copy[index].text = e.target.value;
                                setFormSections(copy);
                              }}
                              placeholder={sec.type === 'callout' ? 'Key takeaway quote text...' : 'Paragraph detail text...'}
                              className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                            />
                          )}

                          {sec.type === 'bullets' && (
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-neutral-500">Bullet Items (one per line)</label>
                              <textarea
                                rows={3}
                                value={sec.bulletItems?.join('\n') || ''}
                                onChange={(e) => {
                                  const copy = [...formSections];
                                  copy[index].bulletItems = e.target.value.split('\n');
                                  setFormSections(copy);
                                }}
                                placeholder="Bullet point 1&#10;Bullet point 2"
                                className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white font-mono"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: ATTACHMENTS (PDF & IMAGES) */}
              {editorTab === 'attachments' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase text-neutral-800">
                        Article Attachments & Downloadables ({formAttachments.length})
                      </h3>
                      <p className="text-[11px] text-neutral-500">Attach PDF whitepapers, presentation decks, or inline diagrams to your post.</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddAttachment('pdf')}
                        className="bg-rose-100 text-rose-900 hover:bg-rose-200 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                      >
                        <FileDown className="w-3.5 h-3.5 text-rose-700" />
                        <span>+ Attach PDF Document</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddAttachment('image')}
                        className="bg-purple-100 text-purple-900 hover:bg-purple-200 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                      >
                        <ImageIcon className="w-3.5 h-3.5 text-purple-700" />
                        <span>+ Attach Image</span>
                      </button>
                    </div>
                  </div>

                  {formAttachments.length === 0 ? (
                    <div className="p-8 border-2 border-dashed border-neutral-300 rounded-2xl text-center space-y-2">
                      <Paperclip className="w-8 h-8 text-neutral-300 mx-auto" />
                      <p className="text-xs font-bold text-neutral-600">No attachments added to this blog yet.</p>
                      <p className="text-[11px] text-neutral-400">Click the buttons above to attach downloadable PDF reports or charts.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formAttachments.map((att, index) => (
                        <div key={att.id} className="bg-[#FAF9F6] border border-neutral-200 p-4 rounded-2xl space-y-3 relative">
                          <button
                            type="button"
                            onClick={() => setFormAttachments(formAttachments.filter(a => a.id !== att.id))}
                            className="absolute top-3 right-3 text-neutral-400 hover:text-rose-600 p-1"
                            title="Remove Attachment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded w-fit">
                            {att.type === 'pdf' ? <FileDown className="w-3 h-3 text-rose-600" /> : <ImageIcon className="w-3 h-3 text-purple-600" />}
                            <span>{att.type.toUpperCase()} Attachment #{index + 1}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-neutral-600">File Name / Label *</label>
                              <input
                                type="text"
                                value={att.name}
                                onChange={(e) => {
                                  const copy = [...formAttachments];
                                  copy[index].name = e.target.value;
                                  setFormAttachments(copy);
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-neutral-600">Download URL / File Link *</label>
                              <input
                                type="text"
                                value={att.url}
                                onChange={(e) => {
                                  const copy = [...formAttachments];
                                  copy[index].url = e.target.value;
                                  setFormAttachments(copy);
                                }}
                                className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                              />
                            </div>

                            {att.type === 'pdf' ? (
                              <>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-neutral-600">File Size (e.g. 2.4 MB PDF)</label>
                                  <input
                                    type="text"
                                    value={att.fileSize || ''}
                                    onChange={(e) => {
                                      const copy = [...formAttachments];
                                      copy[index].fileSize = e.target.value;
                                      setFormAttachments(copy);
                                    }}
                                    className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-neutral-600">PDF Description</label>
                                  <input
                                    type="text"
                                    value={att.description || ''}
                                    onChange={(e) => {
                                      const copy = [...formAttachments];
                                      copy[index].description = e.target.value;
                                      setFormAttachments(copy);
                                    }}
                                    className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                                  />
                                </div>
                              </>
                            ) : (
                              <div className="md:col-span-2 space-y-1">
                                <label className="text-[10px] font-bold text-neutral-600">Image Caption</label>
                                <input
                                  type="text"
                                  value={att.caption || ''}
                                  onChange={(e) => {
                                    const copy = [...formAttachments];
                                    copy[index].caption = e.target.value;
                                    setFormAttachments(copy);
                                  }}
                                  className="w-full px-3 py-1.5 text-xs border border-neutral-300 rounded-lg bg-white"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: LIVE PREVIEW */}
              {editorTab === 'preview' && (
                <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-6">
                  <div className="border-b pb-3">
                    <span className="text-[10px] font-mono font-bold uppercase bg-purple-100 text-purple-900 px-2.5 py-1 rounded-full">
                      {formCategory}
                    </span>
                    <h1 className="text-2xl font-black text-neutral-950 mt-2">{formTitle || 'Untitled Blog Post'}</h1>
                    <p className="text-sm text-neutral-600 italic mt-1">{formShortDesc || 'No description provided yet.'}</p>
                  </div>

                  <div className="relative h-48 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img src={formCoverImage} alt="Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-xl">
                    <img src={formAuthorAvatar} alt={formAuthorName} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{formAuthorName}</div>
                      <div className="text-[10px] text-purple-800">{formAuthorRole} • {formReadTime}</div>
                    </div>
                  </div>

                  <div
                    className={`prose max-w-none text-xs sm:text-sm leading-relaxed ${
                      formFontFamily === 'serif' ? 'font-serif' : formFontFamily === 'mono' ? 'font-mono' : 'font-sans'
                    }`}
                    style={{ color: '#171717' }}
                  >
                    {formMainContent || 'Your main blog content preview will appear here.'}
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setShowEditorModal(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="orixnal-gradient-bg text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{editingBlogId ? 'Update & Save Changes' : 'Publish Blog Post Now'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ADMIN LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden my-auto animate-scale-up">
            <div className="p-6 orixnal-gradient-bg text-white flex items-center justify-between border-b border-purple-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white">Blog Admin Authentication</h2>
                  <p className="text-xs text-purple-100">Login to access Blog Dashboard & Editor</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError(null);
                }}
                className="text-purple-200 hover:text-white p-2 rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Admin Email</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter admin email address..."
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-neutral-300 rounded-xl bg-neutral-50 focus:bg-white focus:outline-none focus:border-purple-600 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    className="w-full pl-9 pr-3 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600 font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="orixnal-gradient-bg text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md hover:opacity-95 flex items-center gap-2"
                >
                  <Unlock className="w-4 h-4 text-amber-300" />
                  <span>Login to Dashboard</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden my-auto animate-scale-up">
            <div className="p-6 orixnal-gradient-bg text-white flex items-center justify-between border-b border-purple-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-bold">
                  <KeyRound className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white">Change Admin Password</h2>
                  <p className="text-xs text-purple-100">Update blog admin password</p>
                </div>
              </div>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="text-purple-200 hover:text-white p-2 rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="p-6 space-y-4">
              {isUsingBlogTempPassword() && (
                <div className="p-3 bg-purple-50 border border-purple-200 text-purple-900 text-xs font-medium rounded-xl flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                  <span>First Login Notice: You are currently using the default temporary password. We recommend updating to a unique custom password below.</span>
                </div>
              )}

              {passChangeError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{passChangeError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">New Password</label>
                <input
                  type="password"
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassInput}
                  onChange={(e) => setConfirmPassInput(e.target.value)}
                  placeholder="Re-enter new password"
                  required
                  className="w-full px-3 py-2.5 text-xs border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel / Keep Current
                </button>
                <button
                  type="submit"
                  className="orixnal-gradient-bg text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-md hover:opacity-95 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Save New Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
