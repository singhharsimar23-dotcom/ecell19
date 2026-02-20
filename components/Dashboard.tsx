
import React, { useState, useRef, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { TeamMember, EventItem, BlogPost, BLOG_CATEGORIES, LOGO_URL, SUB_TEAMS } from '../constants';

// --- Types & Interfaces ---
interface DashboardProps {
  members: TeamMember[];
  setMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  onLogout: () => void;
  onClose: () => void;
}

// --- Helper Components ---

// 1. Image Upload Component
const ImageUpload: React.FC<{
  currentImage: string;
  onImageChange: (url: string) => void;
  label: string
}> = memo(({ currentImage, onImageChange, label }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 1. Show local preview immediatey for UX
      const localUrl = URL.createObjectURL(file);
      onImageChange(localUrl);

      // 2. Trigger background upload to server
      try {
        const { uploadImage } = await import('../api/useApi');
        const remoteUrl = await uploadImage(file);
        onImageChange(remoteUrl);
      } catch (error) {
        console.error("Upload failed, keeping local preview:", error);
        // Note: In production, you might want to show a toast/alert here
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">{label}</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative w-full h-48 rounded-2xl border-2 border-dashed border-white/10 hover:border-[#76ABB8] hover:bg-white/5 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center group"
      >
        {currentImage ? (
          <>
            <img src={currentImage} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-black/80 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">Change Image</span>
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <svg className="w-8 h-8 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Click to Upload</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
});

// 2. Generic Modal (Portaled)
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode
}> = memo(({ isOpen, onClose, title, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl flex flex-col max-h-[85vh] animate-scale-in overflow-hidden z-10">
        {/* Sticky Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-[#0f172a]">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
});

// --- Main Component ---
const Dashboard: React.FC<DashboardProps> = memo(({
  members, setMembers,
  events, setEvents,
  blogs, setBlogs,
  onLogout, onClose
}) => {
  const [activeTab, setActiveTab] = useState<'members' | 'events' | 'blogs' | 'moderation'>('members');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingBlogs, setPendingBlogs] = useState<BlogPost[]>([]);

  // --- Member State ---
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberForm, setMemberForm] = useState<Partial<TeamMember>>({});
  const dashboardCategories = ['faculty', 'Board Members', ...SUB_TEAMS.filter(t => t !== 'Board Members')];

  // --- Event State ---
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [eventForm, setEventForm] = useState<Partial<EventItem>>({});

  // --- Blog State ---
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost> & { authorName?: string }>({});

  // === HANDLERS ===

  // Moderation
  useEffect(() => {
    const loadPending = async () => {
      try {
        const { fetchPendingBlogs } = await import('../api/useApi');
        const data = await fetchPendingBlogs();
        setPendingBlogs(data);
      } catch (err) {
        console.error("Failed to load pending blogs:", err);
      }
    };
    if (activeTab === 'moderation') loadPending();
  }, [activeTab]);

  const handleApproveBlog = async (id: string) => {
    try {
      const { approveBlog } = await import('../api/useApi');
      await approveBlog(id);
      const approvedBlog = pendingBlogs.find(b => b.id === id);
      if (approvedBlog) {
        setBlogs(prev => [...prev, { ...approvedBlog, status: 'approved' }]);
        setPendingBlogs(prev => prev.filter(b => b.id !== id));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Approval failed');
    }
  };

  const handleRejectBlog = async (id: string) => {
    try {
      const { rejectBlog } = await import('../api/useApi');
      await rejectBlog(id);
      setPendingBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Rejection failed');
    }
  };

  // Members
  const openAddMember = (category: string) => {
    setEditingMember(null);
    setMemberForm({ category, image: '', name: '', role: '' });
    setIsMemberModalOpen(true);
  };

  const openEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setMemberForm({ ...member });
    setIsMemberModalOpen(true);
  };

  const saveMember = () => {
    if (!memberForm.name || !memberForm.role) return alert("Name and Role are required");

    if (editingMember) {
      setMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...memberForm } as TeamMember : m));
    } else {
      const newMember: TeamMember = {
        id: `m-${Date.now()}`,
        name: memberForm.name!,
        role: memberForm.role!,
        category: memberForm.category!,
        image: memberForm.image || 'https://ui-avatars.com/api/?background=random',
        linkedin: memberForm.linkedin || '#'
      };
      setMembers(prev => [...prev, newMember]);
    }
    setIsMemberModalOpen(false);
  };

  const deleteMember = (id: string) => {
    if (confirm("Remove this member?")) setMembers(prev => prev.filter(m => m.id !== id));
  };

  // Events
  const openAddEvent = () => {
    setEditingEvent(null);
    setEventForm({ title: '', description: '', layout: 'image-first', image: '' });
    setIsEventModalOpen(true);
  };

  const openEditEvent = (event: EventItem) => {
    setEditingEvent(event);
    setEventForm({ ...event });
    setIsEventModalOpen(true);
  };

  const saveEvent = () => {
    if (!eventForm.title || !eventForm.description) return alert("Title and Description required");

    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? { ...e, ...eventForm } as EventItem : e));
    } else {
      const newEvent: EventItem = {
        id: `e-${Date.now()}`,
        title: eventForm.title!,
        description: eventForm.description!,
        image: eventForm.image || 'https://ui-avatars.com/api/?background=random',
        layout: eventForm.layout || 'image-first'
      };
      setEvents(prev => [newEvent, ...prev]);
    }
    setIsEventModalOpen(false);
  };

  const deleteEvent = (id: string) => {
    if (confirm("Delete this event?")) setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Blogs
  const openAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({ title: '', category: 'ALL', authorName: '', image: '', content: '', layout: 'image-first' });
    setIsBlogModalOpen(true);
  };

  const openEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm({
      ...blog,
      authorName: blog.author.name,
      content: typeof blog.content === 'string' ? blog.content : "Complex React Node content cannot be fully edited here."
    });
    setIsBlogModalOpen(true);
  };

  const saveBlog = () => {
    if (!blogForm.title) return alert("Title required");

    // Helper to convert string content to React Node if needed, mostly for new blogs
    const contentNode = typeof blogForm.content === 'string' ? (
      <div className="space-y-4"><p className="text-xl leading-relaxed text-white/90">{blogForm.content}</p></div>
    ) : blogForm.content;

    // Helper for snippet
    const snippetText = typeof blogForm.content === 'string'
      ? blogForm.content.substring(0, 100) + '...'
      : (blogForm.snippet || "Click to read more...");

    if (editingBlog) {
      setBlogs(prev => prev.map(b => b.id === editingBlog.id ? {
        ...b,
        ...blogForm,
        content: contentNode, // If they didn't edit content, we need to handle that, but for simplicity we assume string edit or preserve
        snippet: snippetText,
        author: { ...b.author, name: blogForm.authorName || b.author.name }
      } as BlogPost : b));
    } else {
      const newBlog: BlogPost = {
        id: `b-${Date.now()}`,
        title: blogForm.title!,
        category: blogForm.category || 'ALL',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readTime: '5 Min Read',
        image: blogForm.image || 'https://ui-avatars.com/api/?background=random',
        snippet: snippetText,
        author: {
          name: blogForm.authorName || 'Admin',
          role: 'Contributor',
          avatar: 'https://ui-avatars.com/api/?name=Admin'
        },
        content: contentNode
      };
      setBlogs(prev => [newBlog, ...prev]);
    }
    setIsBlogModalOpen(false);
  };

  const deleteBlog = (id: string) => {
    if (confirm("Delete this blog post?")) setBlogs(prev => prev.filter(b => b.id !== id));
  };


  return (
    <div className="fixed inset-0 z-[110] bg-[#02142C] flex animate-fade-in overflow-hidden">

      {/* Mobile: Two-Tiered Premium Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[135] flex flex-col bg-[#02142C]/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl">
        {/* Tier 1: Branding & System Controls */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              aria-label="Open sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <LOGO_URL className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="text-white font-black uppercase text-[10px] tracking-tight leading-none">Admin</span>
                <span className="text-[#76ABB8] font-black uppercase text-[8px] tracking-[0.2em] leading-none">Console</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-red-500 transition-colors"
            title="Exit Dashboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tier 2: Dynamic Navigation & Contextual Actions */}
        <div className="h-12 flex items-center justify-between px-4 gap-2">
          <div className="flex-1 flex items-center overflow-x-auto no-scrollbar gap-1">
            {[
              { id: 'members', label: 'Team' },
              { id: 'events', label: 'Events' },
              { id: 'blogs', label: 'Blogs' },
              { id: 'moderation', label: 'Moderation' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-[#76ABB8]/20 text-[#76ABB8] border border-[#76ABB8]/30'
                  : 'text-white/30 border border-transparent'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-shrink-0">
            {activeTab === 'members' && (
              <button
                onClick={() => openAddMember(dashboardCategories[0])}
                className="h-8 px-4 flex items-center gap-2 bg-[#76ABB8] text-white rounded-full text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-[#76ABB8]/20"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </button>
            )}
            {activeTab === 'events' && (
              <button
                onClick={openAddEvent}
                className="h-8 px-4 flex items-center gap-2 bg-[#76ABB8] text-white rounded-full text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-[#76ABB8]/20"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New
              </button>
            )}
            {activeTab === 'blogs' && (
              <button
                onClick={openAddBlog}
                className="h-8 px-4 flex items-center gap-2 bg-[#76ABB8] text-white rounded-full text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-[#76ABB8]/20"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Post
              </button>
            )}
          </div>
        </div>
      </div>


      {/* Sidebar Backdrop - Mobile only */}
      <div
        className={`md:hidden fixed inset-0 z-[125] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar - Hidden off-screen on mobile, slides in when open */}
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-[min(85vw,20rem)] md:w-72 border-r border-white/5 bg-black/40 md:bg-transparent backdrop-blur-2xl p-6 md:p-8 flex flex-col gap-8 md:gap-10 z-[130] pt-16 md:pt-40 transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12">
            <LOGO_URL width="100%" height="100%" />
          </div>
          <span className="text-[#76ABB8] font-black uppercase text-xs tracking-tighter leading-tight">Admin<br />Console</span>
        </div>

        {/* Mobile: Close sidebar button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col gap-2">
          {[
            { id: 'members', label: 'Members', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { id: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'blogs', label: 'Blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' },
            { id: 'moderation', label: 'Moderation', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-4 px-6 py-4 min-h-[44px] rounded-2xl transition-all duration-500 font-bold uppercase text-xs tracking-widest group touch-manipulation active:scale-95 will-change-transform ${activeTab === tab.id ? 'bg-[#76ABB8] text-white shadow-[0_10px_30px_rgba(118,171,184,0.3)] scale-[1.02]' : 'text-white/40 hover:bg-white/5 hover:text-white'
                }`}
            >
              <svg className={`w-5 h-5 flex-shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-white/40 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <button onClick={() => { onClose(); setIsSidebarOpen(false); }} className="w-full py-4 min-h-[44px] border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-white/60 hover:text-white touch-manipulation">Back to Site</button>
          <button onClick={() => { onLogout(); setIsSidebarOpen(false); }} className="w-full py-4 min-h-[44px] bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all touch-manipulation">Log Out</button>
        </div>
      </aside>

      {/* Main Content Area - Full width on mobile */}
      <div className="flex-1 min-w-0 relative overflow-hidden bg-[#02142C] flex flex-col">
        {/* Ambient Background - Enhanced Vibrancy */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#76ABB8]/10 rounded-full blur-[120px] animate-pulse-slow will-change-[transform,opacity]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#26658C]/10 rounded-full blur-[140px] animate-pulse-slow delay-500 will-change-[transform,opacity]"></div>
          <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[160px] will-change-[transform,opacity]"></div>
        </div>

        {/* Content Container - Mobile: full width, proper padding */}
        <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 md:px-12 pt-32 md:pt-40 pb-8 md:pb-20">

          <header className="mb-6 md:mb-12 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-white/5 pb-6 md:pb-8">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2 md:mb-4 truncate">
                {activeTab === 'members' && 'Team Management'}
                {activeTab === 'events' && 'Events Curator'}
                {activeTab === 'blogs' && 'Editorial'}
                {activeTab === 'moderation' && 'Submission Review'}
              </h1>
              <p className="text-white/60 text-sm sm:text-base md:text-lg font-medium">Create, edit, and manage your content efficiently.</p>
            </div>
            {/* Contextual Global Action */}
            {activeTab === 'events' && (
              <button onClick={openAddEvent} className="flex-shrink-0 w-full sm:w-auto min-h-[44px] bg-[#76ABB8] hover:bg-[#8ec2cf] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[#76ABB8]/40 active:scale-95 touch-manipulation">
                + Add Event
              </button>
            )}
            {activeTab === 'blogs' && (
              <button onClick={openAddBlog} className="flex-shrink-0 w-full sm:w-auto min-h-[44px] bg-[#76ABB8] hover:bg-[#8ec2cf] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[#76ABB8]/40 active:scale-95 touch-manipulation">
                + New Article
              </button>
            )}
          </header>

          <div className="animate-slide-up">

            {/* === MEMBERS TAB === */}
            {activeTab === 'members' && (
              <div className="space-y-8 md:space-y-16">
                {dashboardCategories.map(category => {
                  const teamMembers = members.filter(m => m.category === category);
                  const displayTitle = category === 'faculty' ? 'Faculty Coordinators' : category;

                  return (
                    <div key={category} className="space-y-4 md:space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sticky top-[104px] md:top-0 bg-[#02142C]/95 backdrop-blur-md z-10 py-4 border-b border-white/10">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white uppercase tracking-wider truncate">
                          {displayTitle} <span className="text-[#76ABB8] text-base sm:text-lg ml-2">{teamMembers.length}</span>
                        </h3>
                        <button
                          onClick={() => openAddMember(category)}
                          className="w-full sm:w-auto min-h-[44px] bg-white/5 hover:bg-[#76ABB8] text-white px-6 py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all border border-white/10 touch-manipulation"
                        >
                          + Add Member
                        </button>
                      </div>

                      {teamMembers.length === 0 ? (
                        <div className="p-6 md:p-8 border-2 border-dashed border-white/10 rounded-2xl text-center text-white/20 font-bold uppercase tracking-widest text-xs">
                          No members in this team yet
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                          {teamMembers.map((member, idx) => (
                            <div
                              key={member.id}
                              style={{ animationDelay: `${idx * 0.05}s` }}
                              className="group relative bg-[#0f172a]/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex items-center gap-4 transition-all duration-500 hover:border-[#76ABB8]/40 hover:bg-[#0f172a]/60 hover:translate-y-[-4px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-slide-up-premium opacity-0 will-change-transform"
                            >
                              {/* Inner Glow/Highlight */}
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>

                              <div className="relative">
                                <img src={member.image} className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform duration-500" alt="" />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#02142C] rounded-full flex items-center justify-center border border-white/10">
                                  <div className="w-2 h-2 bg-[#76ABB8] rounded-full shadow-[0_0_8px_#76ABB8]"></div>
                                </div>
                              </div>

                              <div className="flex-grow min-w-0 z-10">
                                <h4 className="text-white font-bold truncate group-hover:text-[#76ABB8] transition-colors">{member.name}</h4>
                                <div className="flex items-center gap-2">
                                  <p className="text-[#76ABB8]/70 text-[9px] font-black uppercase tracking-[0.15em] truncate">{member.role}</p>
                                </div>
                              </div>

                              <div className="flex flex-row sm:flex-col gap-1 opacity-100 xl:opacity-40 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 z-20">
                                <button onClick={() => openEditMember(member)} className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white transition-all rounded-lg hover:bg-white/10 active:scale-90">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </button>
                                <button onClick={() => deleteMember(member.id)} className="w-9 h-9 flex items-center justify-center text-red-500/30 hover:text-red-500 transition-all rounded-lg hover:bg-red-500/10 active:scale-90">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* === EVENTS TAB === */}
            {activeTab === 'events' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
                {events.map((event, idx) => (
                  <div
                    key={event.id}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    className="group bg-[#0f172a]/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#76ABB8]/40 hover:bg-[#0f172a]/60 hover:translate-y-[-8px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col relative animate-slide-up-premium opacity-0 will-change-transform"
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-[#76ABB8]">
                        {event.layout}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#76ABB8] transition-colors">{event.title}</h3>
                      <p className="text-white/40 text-sm font-medium line-clamp-3 mb-6 flex-grow">{event.description}</p>
                      <div className="flex gap-4 pt-6 border-t border-white/5">
                        <button onClick={() => openEditEvent(event)} className="flex-1 h-11 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all">Edit Details</button>
                        <button onClick={() => deleteEvent(event.id)} className="w-11 h-11 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* === BLOGS TAB === */}
            {activeTab === 'blogs' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
                {blogs.map((blog, idx) => (
                  <div
                    key={blog.id}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    className="group bg-[#0f172a]/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#76ABB8]/40 hover:bg-[#0f172a]/60 hover:translate-y-[-8px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col relative animate-slide-up-premium opacity-0 will-change-transform"
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={blog.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#76ABB8]/20 text-[#76ABB8] text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#76ABB8]/30 backdrop-blur-md">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <img src={blog.author.avatar} className="w-6 h-6 rounded-full border border-white/10" alt="" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.1em]">{blog.author.name}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#76ABB8] transition-colors">{blog.title}</h3>
                      <p className="text-white/40 text-sm font-medium line-clamp-2 mb-6 flex-grow">{blog.snippet}</p>
                      <div className="flex gap-4 pt-6 border-t border-white/5">
                        <button onClick={() => openEditBlog(blog)} className="flex-1 h-11 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all">Edit Article</button>
                        <button onClick={() => deleteBlog(blog.id)} className="w-11 h-11 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* === MODERATION TAB === */}
            {activeTab === 'moderation' && (
              <div className="space-y-6">
                {pendingBlogs.length === 0 ? (
                  <div className="p-12 md:p-20 border-2 border-dashed border-white/10 rounded-[2rem] md:rounded-[3rem] text-center bg-white/5">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 md:w-10 md:text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-white/40 text-lg md:text-xl font-black uppercase tracking-widest">Inbox Zero</p>
                    <p className="text-white/20 text-sm font-medium mt-2">No pending blogs to review at the moment.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {pendingBlogs.map((post) => (
                      <div key={post.id} className="bg-[#0f172a]/40 backdrop-blur-md border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 animate-slide-up">
                        <div className="w-full md:w-64 h-44 overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl">
                          <img src={post.image} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-grow flex flex-col">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-[#76ABB8] text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-[#76ABB8]/10 rounded-full border border-[#76ABB8]/20">{post.category}</span>
                            <span className="text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{post.submittedAt || 'Recent Submission'}</span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight">{post.title}</h3>
                          <div className="flex items-center gap-3 mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <img src={post.author.avatar || 'https://via.placeholder.com/150'} className="w-10 h-10 rounded-full border border-white/10" alt="" />
                            <div>
                              <p className="text-white text-xs font-black uppercase tracking-wider">{post.author.name}</p>
                              <p className="text-[#76ABB8] text-[10px] font-bold">{post.author.email || 'Email not provided'}</p>
                            </div>
                          </div>
                          <div className="mt-auto flex flex-col sm:flex-row gap-4">
                            <button
                              onClick={() => handleApproveBlog(post.id)}
                              className="w-full sm:w-auto bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-[#22c55e]/20 active:scale-95"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectBlog(post.id)}
                              className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-red-500/20 active:scale-95"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* === MODALS (Rendered via Portal) === */}

      <Modal isOpen={isMemberModalOpen} onClose={() => setIsMemberModalOpen(false)} title={editingMember ? "Edit Member" : "Add New Member"}>
        <div className="space-y-6">
          <ImageUpload
            label="Profile Photo"
            currentImage={memberForm.image || ''}
            onImageChange={(url) => setMemberForm(prev => ({ ...prev, image: url }))}
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Full Name</label>
              <input
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
                value={memberForm.name || ''}
                onChange={e => setMemberForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Role / Position</label>
              <input
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
                value={memberForm.role || ''}
                onChange={e => setMemberForm(prev => ({ ...prev, role: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">LinkedIn Profile URL</label>
            <input
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
              placeholder="https://linkedin.com/in/username"
              value={memberForm.linkedin || ''}
              onChange={e => setMemberForm(prev => ({ ...prev, linkedin: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Team Category</label>
            <select
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8] min-h-[44px]"
              value={memberForm.category || ''}
              onChange={e => setMemberForm(prev => ({ ...prev, category: e.target.value }))}
            >
              {dashboardCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={saveMember} className="w-full bg-[#76ABB8] hover:bg-[#8ec2cf] text-white py-4 rounded-xl font-black uppercase tracking-widest mt-4 transition-all">
            {editingMember ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title={editingEvent ? "Edit Event" : "Create Event"}>
        <div className="space-y-6">
          <ImageUpload
            label="Event Banner"
            currentImage={eventForm.image || ''}
            onImageChange={(url) => setEventForm(prev => ({ ...prev, image: url }))}
          />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Event Title</label>
            <input
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
              value={eventForm.title || ''}
              onChange={e => setEventForm(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Description</label>
            <textarea
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
              rows={5}
              value={eventForm.description || ''}
              onChange={e => setEventForm(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Card Layout</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setEventForm(prev => ({ ...prev, layout: 'image-first' }))}
                className={`p-4 rounded-xl border ${eventForm.layout === 'image-first' ? 'border-[#76ABB8] bg-[#76ABB8]/10' : 'border-white/10 bg-[#1A1A1A]'} transition-all`}
              >
                <div className="h-8 bg-white/20 mb-2 rounded"></div>
                <div className="h-2 w-2/3 bg-white/10 rounded"></div>
                <span className="text-[10px] uppercase font-bold text-white mt-2 block">Image Top</span>
              </button>
              <button
                onClick={() => setEventForm(prev => ({ ...prev, layout: 'text-first' }))}
                className={`p-4 rounded-xl border ${eventForm.layout === 'text-first' ? 'border-[#76ABB8] bg-[#76ABB8]/10' : 'border-white/10 bg-[#1A1A1A]'} transition-all`}
              >
                <div className="h-2 w-2/3 bg-white/10 rounded mb-2"></div>
                <div className="h-8 bg-white/20 rounded"></div>
                <span className="text-[10px] uppercase font-bold text-white mt-2 block">Text Top</span>
              </button>
            </div>
          </div>
          <button onClick={saveEvent} className="w-full bg-[#76ABB8] hover:bg-[#8ec2cf] text-white py-4 rounded-xl font-black uppercase tracking-widest mt-4 transition-all">
            {editingEvent ? 'Update Event' : 'Publish Event'}
          </button>
        </div>
      </Modal>

      <Modal isOpen={isBlogModalOpen} onClose={() => setIsBlogModalOpen(false)} title={editingBlog ? "Edit Article" : "Write Article"}>
        <div className="space-y-6">
          <ImageUpload
            label="Feature Image"
            currentImage={blogForm.image || ''}
            onImageChange={(url) => setBlogForm(prev => ({ ...prev, image: url }))}
          />
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Title</label>
              <input
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
                value={blogForm.title || ''}
                onChange={e => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Category</label>
              <select
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
                value={blogForm.category || ''}
                onChange={e => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
              >
                {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Author Name</label>
            <input
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
              value={blogForm.authorName || ''}
              onChange={e => setBlogForm(prev => ({ ...prev, authorName: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Content (Text)</label>
            <textarea
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
              rows={10}
              value={typeof blogForm.content === 'string' ? blogForm.content : ''}
              placeholder="Write your story..."
              onChange={e => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
            />
            <p className="text-xs text-white/20 italic">* Rich text editing is simplified for this admin panel demo.</p>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Card Layout</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setBlogForm(prev => ({ ...prev, layout: 'image-first' }))}
                className={`p-4 rounded-xl border ${blogForm.layout === 'image-first' ? 'border-[#76ABB8] bg-[#76ABB8]/10' : 'border-white/10 bg-[#1A1A1A]'} transition-all`}
              >
                <div className="h-8 bg-white/20 mb-2 rounded"></div>
                <div className="h-2 w-2/3 bg-white/10 rounded"></div>
                <span className="text-[10px] uppercase font-bold text-white mt-2 block">Image Top</span>
              </button>
              <button
                onClick={() => setBlogForm(prev => ({ ...prev, layout: 'text-first' }))}
                className={`p-4 rounded-xl border ${blogForm.layout === 'text-first' ? 'border-[#76ABB8] bg-[#76ABB8]/10' : 'border-white/10 bg-[#1A1A1A]'} transition-all`}
              >
                <div className="h-2 w-2/3 bg-white/10 rounded mb-2"></div>
                <div className="h-8 bg-white/20 rounded"></div>
                <span className="text-[10px] uppercase font-bold text-white mt-2 block">Text Top</span>
              </button>
            </div>
          </div>
          <button onClick={saveBlog} className="w-full bg-[#76ABB8] hover:bg-[#8ec2cf] text-white py-4 rounded-xl font-black uppercase tracking-widest mt-4 transition-all">
            {editingBlog ? 'Update Article' : 'Publish Article'}
          </button>
        </div>
      </Modal>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        select option { background: #1A1A1A; }
      `}</style>
    </div>
  );
});

export default Dashboard;
