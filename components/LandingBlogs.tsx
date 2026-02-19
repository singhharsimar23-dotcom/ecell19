
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
          <div className="max-w-2xl w-full">
            <h2 className="text-fluid-3xl md:text-fluid-6xl font-black text-[#76ABB8] uppercase tracking-tighter mb-4 sm:mb-6">
              Latest Insights
            </h2>
            <p className="text-white/60 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
              Explore the latest trends, success stories, and entrepreneurial strategies curated by our team.
            </p>
          </div>
          <button 
            onClick={onMoreClick}
            className="flex-shrink-0 bg-white/5 hover:bg-[#76ABB8] active:bg-[#6a9ba8] text-white px-6 sm:px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest transition-all border border-white/10 min-h-[44px] touch-manipulation w-full md:w-auto"
          >
            Read All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayBlogs.map((blog) => (
            <div 
              key={blog.id}
              onClick={onMoreClick}
              className="group bg-[#0f172a] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#76ABB8]/40 active:border-[#76ABB8]/60 transition-all duration-300 cursor-pointer flex flex-col h-full touch-manipulation"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/60 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[9px] sm:text-[10px] font-black text-[#76ABB8] uppercase tracking-widest">
                    {blog.category}
                  </span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <img src={blog.author.avatar} alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest">{blog.author.name}</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-white/40 uppercase tracking-widest">{blog.readTime}</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#76ABB8] transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-white/40 text-xs sm:text-sm line-clamp-3 mb-4 sm:mb-6 flex-grow">
                  {blog.snippet}
                </p>
                
                <div className="flex items-center text-[#76ABB8] text-xs font-black uppercase tracking-widest mt-auto min-h-[44px]">
                  Read Article 
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
