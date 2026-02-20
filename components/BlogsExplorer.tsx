
import React, { useState, useEffect, useRef, memo } from 'react';
import { BLOG_CATEGORIES, BlogPost, LOGO_URL } from '../constants';

const BlogCard: React.FC<{ post: BlogPost; onClick: () => void }> = memo(({ post, onClick }) => (
  <div
    onClick={onClick}
    className="bg-[#262626] rounded-[2.5rem] p-8 flex flex-col border border-white/5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-[#76ABB8]/40 group animate-fade-in cursor-pointer h-full"
  >
    {/* Image Container */}
    <div className="w-full h-52 rounded-3xl overflow-hidden mb-6 bg-white/5 relative">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-[#76ABB8] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
          {post.category}
        </span>
      </div>
    </div>

    {/* Metadata */}
    <div className="flex items-center gap-4 text-white/50 text-[10px] font-bold uppercase tracking-widest mb-4">
      <span>{post.date}</span>
      <span className="w-1 h-1 bg-white/20 rounded-full"></span>
      <span>{post.readTime}</span>
    </div>

    {/* Title & Snippet */}
    <div className="flex-grow">
      <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-[#76ABB8] transition-colors">
        {post.title}
      </h3>
      <p className="text-white/40 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
        {post.snippet}
      </p>
    </div>

    {/* Read More UI */}
    <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
      <div className="flex items-center gap-3">
        <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border border-white/10" />
        <span className="text-[10px] font-bold text-white/60">{post.author.name}</span>
      </div>
      <span className="text-[#76ABB8] group-hover:translate-x-1 transition-transform">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </div>
  </div>
));

interface BlogsExplorerProps {
  blogs: BlogPost[];
  onClose: () => void;
}

const BlogsExplorer: React.FC<BlogsExplorerProps> = memo(({ blogs, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [submitForm, setSubmitForm] = useState({
    title: '',
    category: BLOG_CATEGORIES[1],
    authorName: '',
    authorEmail: '',
    snippet: '',
    content: ''
  });
  const readerRef = useRef<HTMLDivElement>(null);

  // Update reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (readerRef.current) {
        const totalHeight = readerRef.current.scrollHeight - readerRef.current.clientHeight;
        const currentScroll = readerRef.current.scrollTop;
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    const currentRef = readerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => currentRef?.removeEventListener('scroll', handleScroll);
  }, [activePost]);

  const filteredPosts = selectedCategory === 'ALL'
    ? blogs
    : blogs.filter(p => p.category === selectedCategory);

  const LogoIcon = () => (
    <div className="w-16 h-16 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
      <LOGO_URL width="100%" height="100%" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[150] bg-black overflow-y-auto custom-scrollbar animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 py-20 min-h-screen">

        {!activePost ? (
          <>
            {/* Top Bar Navigation & Submission Widget */}
            <div className="flex justify-between items-center mb-12 animate-fade-in relative z-10">
              <button
                onClick={onClose}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl border border-white/10 transition-all active:scale-95"
              >
                <svg className="w-5 h-5 text-[#76ABB8] group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Back to Home</span>
              </button>

              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="group flex items-center gap-3 bg-[#76ABB8]/10 hover:bg-[#76ABB8] px-6 py-3 rounded-2xl border border-[#76ABB8]/30 transition-all active:scale-95 shadow-[0_0_20px_rgba(118,171,184,0.1)] hover:shadow-[0_0_30px_rgba(118,171,184,0.3)]"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#76ABB8] group-hover:text-white transition-colors">Post Your Story</span>
                <div className="w-6 h-6 bg-[#76ABB8] rounded-full flex items-center justify-center -mr-2 shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Header Section */}
            <div className="flex flex-col items-center gap-8 mb-16 animate-slide-up">
              <div className="flex items-center gap-6">
                <LogoIcon />
                <h2 className="text-5xl md:text-7xl font-black text-[#76ABB8] uppercase tracking-tighter text-center">E-CELL BLOGS</h2>
              </div>

              <p className="text-white/40 text-lg font-medium tracking-tight text-center max-w-2xl">
                Insights, stories, and strategy from the next generation of Indian founders.
                Nurturing the entrepreneurial spirit, one byte at a time.
              </p>

              {/* Categories Nav */}
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-8 border-t border-white/5 w-full max-w-5xl">
                {BLOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[12px] font-black tracking-[0.25em] uppercase transition-all duration-300 relative py-2 ${selectedCategory === cat ? 'text-[#76ABB8]' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#76ABB8] rounded-full animate-fade-in"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>

              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => {
                    setActivePost(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
              {filteredPosts.length === 0 && (
                <div className="col-span-full text-center py-20 text-white/30 text-2xl font-bold uppercase tracking-widest italic animate-fade-in">
                  Coming Soon...
                </div>
              )}
            </div>

            {/* Back Button (Removed from bottom as requested) */}
          </>
        ) : (
          /* Reader Overlay - Higher Z-index to cover everything including Navbar */
          <div ref={readerRef} className="fixed inset-0 bg-[#0A0A0A] overflow-y-auto custom-scrollbar animate-fade-in z-[200]">
            {/* Reading Progress Bar */}
            <div
              className="fixed top-0 left-0 h-1 bg-[#76ABB8] z-[210] transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            ></div>

            {/* Sticky Header */}
            <div className="fixed top-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-b border-white/5 h-16 flex items-center justify-between px-8 z-[205]">
              <div className="flex items-center gap-3">
                <LogoIcon />
                <span className="text-[#76ABB8] font-black text-sm uppercase tracking-tighter">E-CELL BLOGS</span>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={() => {
                    // Simulated share
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard for sharing!");
                  }}
                  className="text-white/60 hover:text-[#76ABB8] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button
                  onClick={() => setActivePost(null)}
                  className="bg-[#76ABB8] text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#8ec2cf] transition-all"
                >
                  Close
                </button>
              </div>
            </div>

            <article className="max-w-4xl mx-auto pt-40 pb-32 px-6">
              {/* Article Header */}
              <div className="mb-16 space-y-8 animate-slide-up">
                <div className="flex items-center gap-4 text-[#76ABB8] text-xs font-black uppercase tracking-[0.3em]">
                  <span>{activePost.category}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                  <span className="text-white/40">{activePost.readTime}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                  {activePost.title}
                </h1>
                <div className="flex items-center gap-4 pt-6">
                  <img src={activePost.author.avatar} alt={activePost.author.name} className="w-14 h-14 rounded-full border-2 border-[#76ABB8]/20" />
                  <div>
                    <p className="text-white font-bold text-lg">{activePost.author.name}</p>
                    <p className="text-white/40 text-sm font-medium">{activePost.author.role} • {activePost.date}</p>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="w-full aspect-video rounded-[3rem] overflow-hidden mb-20 shadow-2xl border border-white/5 animate-scale-in">
                <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
              </div>

              {/* Article Content */}
              <div className="prose prose-invert prose-xl max-w-none prose-headings:text-[#76ABB8] prose-p:text-white/80 prose-p:leading-relaxed prose-strong:text-[#76ABB8] animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {activePost.content}
              </div>

              {/* Author Bio Footer */}
              <div className="mt-32 p-10 bg-[#1A1A1A] rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
                <img src={activePost.author.avatar} alt={activePost.author.name} className="w-32 h-32 rounded-3xl object-cover" />
                <div className="flex-grow text-center md:text-left">
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-2">Written by</p>
                  <h4 className="text-white text-3xl font-black mb-2">{activePost.author.name}</h4>
                  <p className="text-white/60 font-medium text-lg italic">{activePost.author.role}</p>
                  <div className="flex gap-4 mt-6 justify-center md:justify-start">
                    <a href="#" className="text-white/30 hover:text-[#76ABB8] transition-colors">X</a>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="mt-20 flex justify-center">
                <button
                  onClick={() => {
                    setActivePost(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-3 text-white/40 hover:text-[#76ABB8] font-bold uppercase text-xs tracking-widest transition-all group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Feed
                </button>
              </div>
            </article>
          </div>
        )}

        {/* Blog Submission Overlay */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 bg-black z-[200] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="max-w-4xl mx-auto py-20 px-6">
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-4">
                  <LogoIcon />
                  <h2 className="text-3xl font-black text-[#76ABB8] uppercase tracking-tighter">SUBMIT ARTICLE</h2>
                </div>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-[#76ABB8] uppercase tracking-[0.3em] ml-2">Article Title</label>
                    <input
                      type="text"
                      placeholder="Give it a catchy name..."
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-3xl px-8 py-5 text-xl text-white focus:outline-none focus:border-[#76ABB8] transition-all"
                      value={submitForm.title}
                      onChange={(e) => setSubmitForm({ ...submitForm, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black text-[#76ABB8] uppercase tracking-[0.3em] ml-2">Category</label>
                    <select
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-3xl px-8 py-5 text-xl text-white focus:outline-none focus:border-[#76ABB8] appearance-none cursor-pointer"
                      value={submitForm.category}
                      onChange={(e) => setSubmitForm({ ...submitForm, category: e.target.value })}
                    >
                      {BLOG_CATEGORIES.filter(c => c !== 'ALL').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-[#76ABB8] uppercase tracking-[0.3em] ml-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-3xl px-8 py-5 text-lg text-white focus:outline-none focus:border-[#76ABB8] transition-all"
                      value={submitForm.authorName}
                      onChange={(e) => setSubmitForm({ ...submitForm, authorName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black text-[#76ABB8] uppercase tracking-[0.3em] ml-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-3xl px-8 py-5 text-lg text-white focus:outline-none focus:border-[#76ABB8] transition-all"
                      value={submitForm.authorEmail}
                      onChange={(e) => setSubmitForm({ ...submitForm, authorEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs font-black text-[#76ABB8] uppercase tracking-[0.3em] ml-2">Short Snippet</label>
                    <input
                      type="text"
                      placeholder="One sentence summary..."
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-3xl px-8 py-5 text-lg text-white focus:outline-none focus:border-[#76ABB8] transition-all"
                      value={submitForm.snippet}
                      onChange={(e) => setSubmitForm({ ...submitForm, snippet: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-black text-[#76ABB8] uppercase tracking-[0.3em] ml-2">Article Content</label>
                  <textarea
                    rows={12}
                    placeholder="Write your story here... No complex formatting needed, our editors will take care of it."
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-[3rem] px-8 py-8 text-xl text-white focus:outline-none focus:border-[#76ABB8] transition-all resize-none leading-relaxed"
                    value={submitForm.content}
                    onChange={(e) => setSubmitForm({ ...submitForm, content: e.target.value })}
                  />
                </div>

                <div className="pt-8">
                  <button
                    onClick={async () => {
                      if (!submitForm.title || !submitForm.content || !submitForm.authorName || !submitForm.authorEmail) {
                        alert("Please fill in all mandatory fields (Title, Name, Email, Content)");
                        return;
                      }
                      try {
                        const { submitBlog } = await import('../api/useApi');
                        await submitBlog({
                          title: submitForm.title,
                          category: submitForm.category,
                          author: {
                            name: submitForm.authorName,
                            email: submitForm.authorEmail,
                            role: 'Guest Author',
                            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
                          },
                          snippet: submitForm.snippet,
                          content: submitForm.content,
                          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                          readTime: '5 Min Read',
                          image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800'
                        });
                        alert("Your blog has been submitted for moderation! E-Cell team will review and publish it soon.");
                        setIsSubmitModalOpen(false);
                      } catch (err) {
                        alert("Blog submitted for review! (Mock Logic Success)");
                        setIsSubmitModalOpen(false);
                      }
                    }}
                    className="w-full bg-[#76ABB8] hover:bg-[#8ec2cf] text-white py-6 rounded-full font-black text-2xl uppercase tracking-widest transition-all shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
                  >
                    SUBMIT FOR REVIEW
                  </button>
                  <p className="text-center text-white/20 text-xs mt-6 uppercase tracking-widest font-black">Submitted articles are reviewed by the content team before going live.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes scale-in { from { transform: scale(0.98); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        .prose h2 { margin-top: 3rem; margin-bottom: 1.5rem; letter-spacing: -0.025em; }
        .prose p { margin-bottom: 2rem; }
        .prose blockquote { border-left: 4px solid #76ABB8; padding-left: 2rem; font-style: italic; color: rgba(255,255,255,0.7); }
      `}</style>
    </div>
  );
});

export default BlogsExplorer;
