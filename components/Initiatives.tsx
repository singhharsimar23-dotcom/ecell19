
import React, { memo } from 'react';
import { INITIATIVES } from '../constants';

const Initiatives: React.FC = memo(() => {
  return (
    <section id="initiatives" className="relative py-32 overflow-hidden scroll-mt-32">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" 
          alt="Community" 
          loading="lazy"
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-[#02142C]/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-[#54ACBF] mb-8 uppercase">Our Initiatives</h2>
          <p className="text-gray-300 font-light leading-relaxed">
            E-cell or Entrepreneurship cell of VIT Bhopal is a community of like minded people, fostering the spirit of entrepreneurship. Our mission is to cultivate and empower the emerging visionaries of tomorrow, providing comprehensive guidance and unwavering support to transform groundbreaking ideas into successful ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIATIVES.map((item, idx) => (
            <div 
              key={idx} 
              className={`p-10 rounded-[2.5rem] border transition-all duration-500 transform hover:-translate-y-2 ${
                item.highlighted 
                  ? 'bg-[#54ACBF]/20 border-[#54ACBF]/40' 
                  : 'bg-white/5 border-white/10 backdrop-blur-md'
              }`}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-black/20">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white uppercase tracking-wide">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
              
              <button className="mt-8 flex items-center text-[#A7EBF2] font-semibold text-xs tracking-widest uppercase hover:underline group">
                Learn More 
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Initiatives;
