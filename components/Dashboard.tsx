
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      onImageChange(imageUrl);
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
};

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
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-white/5 bg-[#0f172a]">
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
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

// --- Main Component ---
const Dashboard: React.FC<DashboardProps> = memo(({ 
  members, setMembers, 
  events, setEvents, 
  blogs, setBlogs, 
  onLogout, onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'members' | 'events' | 'blogs'>('members');

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

  // Members
  const openAddMember = (category: string) => {
    setEditingMember(null);
    setMemberForm({ category, image: '', name: '', role: '', linkedin: '#' });
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
    if(confirm("Remove this member?")) setMembers(prev => prev.filter(m => m.id !== id));
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
    if(confirm("Delete this event?")) setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Blogs
  const openAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({ title: '', category: 'ALL', authorName: '', image: '', content: '' });
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
    if(!blogForm.title) return alert("Title required");

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
        date: new Date().toLocaleDateString('en-US', {month: 'long', day:'numeric', year:'numeric'}),
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
    if(confirm("Delete this blog post?")) setBlogs(prev => prev.filter(b => b.id !== id));
  };


  return (
    <div className="fixed inset-0 z-[110] bg-[#02142C] flex animate-fade-in overflow-hidden">
      
      {/* 
         GLOBAL EXIT BUTTON 
         Fixed position with higher Z-index to sit ABOVE the Navbar and provide a clear exit from the dashboard.
      */}
      <button 
        onClick={onClose} 
        className="fixed top-8 right-8 z-[130] w-14 h-14 bg-black/60 hover:bg-red-500/20 text-white/60 hover:text-white rounded-full flex items-center justify-center transition-all backdrop-blur-xl border border-white/10 shadow-2xl group"
        title="Exit Dashboard"
      >
         <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
         </svg>
      </button>

      {/* Sidebar - Padded top to account for floating navbar */}
      <div className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-2xl p-8 flex flex-col gap-10 z-20 pt-40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12">
            <LOGO_URL width="100%" height="100%" />
          </div>
          <span className="text-[#76ABB8] font-black uppercase text-xs tracking-tighter leading-tight">Admin<br/>Console</span>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { id: 'members', label: 'Members', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { id: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'blogs', label: 'Blogs', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold uppercase text-xs tracking-widest group ${
                activeTab === tab.id ? 'bg-[#76ABB8] text-white shadow-lg shadow-[#76ABB8]/20' : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-white/40 group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <button onClick={onClose} className="w-full py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all text-white/60 hover:text-white">Back to Site</button>
          <button onClick={onLogout} className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all">Log Out</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow relative overflow-hidden bg-[#02142C]">
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
           <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-[#76ABB8]/5 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-[#26658C]/5 rounded-full blur-[100px]"></div>
        </div>

        {/* Content Container - Padded top to account for floating navbar */}
        <div className="relative z-10 h-full overflow-y-auto custom-scrollbar p-12 pt-40">
          
          <header className="mb-12 flex justify-between items-end border-b border-white/5 pb-8">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter text-white mb-4">
                {activeTab === 'members' && 'Team Management'}
                {activeTab === 'events' && 'Events Curator'}
                {activeTab === 'blogs' && 'Editorial'}
              </h1>
              <p className="text-white/60 text-lg font-medium">Create, edit, and manage your content efficiently.</p>
            </div>
            {/* Contextual Global Action */}
            {activeTab === 'events' && (
              <button onClick={openAddEvent} className="bg-[#76ABB8] hover:bg-[#8ec2cf] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[#76ABB8]/40 transform hover:scale-105">
                + Add Event
              </button>
            )}
             {activeTab === 'blogs' && (
              <button onClick={openAddBlog} className="bg-[#76ABB8] hover:bg-[#8ec2cf] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-[#76ABB8]/40 transform hover:scale-105">
                + New Article
              </button>
            )}
          </header>

          <div className="animate-slide-up pb-20">
            
            {/* === MEMBERS TAB === */}
            {activeTab === 'members' && (
              <div className="space-y-16">
                {dashboardCategories.map(category => {
                  const teamMembers = members.filter(m => m.category === category);
                  const displayTitle = category === 'faculty' ? 'Faculty Coordinators' : category;

                  return (
                    <div key={category} className="space-y-6">
                      <div className="flex items-center justify-between sticky top-0 bg-[#02142C]/95 backdrop-blur-md z-10 py-4 border-b border-white/10">
                        <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                          {displayTitle} <span className="text-[#76ABB8] text-lg ml-2">{teamMembers.length}</span>
                        </h3>
                        <button 
                          onClick={() => openAddMember(category)}
                          className="bg-white/5 hover:bg-[#76ABB8] text-white px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all border border-white/10"
                        >
                          + Add Member
                        </button>
                      </div>

                      {teamMembers.length === 0 ? (
                        <div className="p-8 border-2 border-dashed border-white/10 rounded-2xl text-center text-white/20 font-bold uppercase tracking-widest text-xs">
                          No members in this team yet
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {teamMembers.map(member => (
                            <div key={member.id} className="bg-[#0f172a]/50 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:border-[#76ABB8]/30 transition-all">
                              <img src={member.image} className="w-16 h-16 rounded-xl object-cover border border-white/10" alt="" />
                              <div className="flex-grow min-w-0">
                                <h4 className="text-white font-bold truncate">{member.name}</h4>
                                <p className="text-[#76ABB8] text-[10px] font-black uppercase tracking-widest truncate">{member.role}</p>
                              </div>
                              <div className="flex flex-col gap-2 opacity-100 xl:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditMember(member)} className="text-white/40 hover:text-white transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                </button>
                                <button onClick={() => deleteMember(member.id)} className="text-red-500/40 hover:text-red-500 transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {events.map(event => (
                  <div key={event.id} className="bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 group hover:border-[#76ABB8]/40 transition-all flex flex-col">
                    <div className="relative h-48">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                        {event.layout}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{event.title}</h3>
                      <p className="text-white/40 text-sm font-medium line-clamp-3 mb-6 flex-grow">{event.description}</p>
                      <div className="flex gap-4 pt-6 border-t border-white/5">
                        <button onClick={() => openEditEvent(event)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Edit</button>
                        <button onClick={() => deleteEvent(event.id)} className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* === BLOGS TAB === */}
            {activeTab === 'blogs' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {blogs.map(blog => (
                  <div key={blog.id} className="bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 group hover:border-[#76ABB8]/40 transition-all flex flex-col">
                    <div className="relative h-48">
                       <img src={blog.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                       <div className="absolute top-4 left-4">
                         <span className="bg-[#76ABB8] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                           {blog.category}
                         </span>
                       </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                         <img src={blog.author.avatar} className="w-6 h-6 rounded-full" alt="" />
                         <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{blog.author.name}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 leading-tight">{blog.title}</h3>
                      <p className="text-white/40 text-sm font-medium line-clamp-2 mb-6 flex-grow">{blog.snippet}</p>
                      <div className="flex gap-4 pt-6 border-t border-white/5">
                        <button onClick={() => openEditBlog(blog)} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all">Edit</button>
                        <button onClick={() => deleteBlog(blog.id)} className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">Team Category</label>
                 <select 
                   className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
                   value={memberForm.category || ''}
                   onChange={e => setMemberForm(prev => ({ ...prev, category: e.target.value }))}
                 >
                   {dashboardCategories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-[#76ABB8] uppercase tracking-[0.2em] ml-1">LinkedIn URL</label>
                 <input 
                   className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#76ABB8]"
                   value={memberForm.linkedin || ''}
                   onChange={e => setMemberForm(prev => ({ ...prev, linkedin: e.target.value }))}
                 />
              </div>
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
