
import React, { memo } from 'react';
import { BlogPost } from '../constants';

interface LandingBlogsProps {
  blogs: BlogPost[];
  onMoreClick: () => void;
}

const LandingBlogs: React.FC<LandingBlogsProps> = memo(({ blogs, onMoreClick }) => {
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section id="blogs" className="py-32 relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-[#76ABB8] uppercase tracking-tighter mb-6">
              Latest Insights
            </h2>
            <p className="text-white/60 text-lg font-medium leading-relaxed">
              Explore the latest trends, success stories, and entrepreneurial strategies curated by our team.
            </p>
          </div>
          <button 
            onClick={onMoreClick}
            className="flex-shrink-0 bg-white/5 hover:bg-[#76ABB8] text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest transition-all border border-white/10"
          >
            Read All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <div 
              key={blog.id}
              onClick={onMoreClick}
              className="group bg-[#0f172a] rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#76ABB8]/40 transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] font-black text-[#76ABB8] uppercase tracking-widest">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <img src={blog.author.avatar} alt="" className="w-6 h-6 rounded-full" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{blog.author.name}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{blog.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#76ABB8] transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-white/40 text-sm line-clamp-3 mb-6 flex-grow">
                  {blog.snippet}
                </p>
                
                <div className="flex items-center text-[#76ABB8] text-xs font-black uppercase tracking-widest mt-auto">
                  Read Article 
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default LandingBlogs;
