
import React, { memo } from 'react';
import { STATS } from '../constants';

const About: React.FC = memo(() => {
  return (
    <section id="about" className="py-24 bg-white text-[#02142C] scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <h2 className="text-4xl md:text-6xl font-black text-[#26658C] tracking-tighter uppercase whitespace-nowrap">
            What is E-Cell?
          </h2>
          <div className="max-w-xl">
            <p className="text-lg md:text-xl text-gray-700 font-medium text-right leading-snug">
              Entrepreneurial Cell of VIT Bhopal, a dynamic hub dedicated to nurturing and empowering the next generation of entrepreneurs across India. The future of your idea begins here, at the Entrepreneurial Cell of VIT Bhopal - where we don't just promote entrepreneurs, we build success stories.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-[#02142C] rounded-[40px] p-12 md:p-20 relative overflow-hidden">
            {/* Background glowing blobs */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#54ACBF]/10 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#54ACBF]/10 rounded-full blur-[100px]"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {STATS.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center group">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-gradient-to-br from-[#26658C] to-[#02142C] border border-white/10 flex flex-col items-center justify-center transform transition-transform group-hover:scale-105 duration-500 shadow-2xl relative">
                            {/* Inner icon placeholder as per figma */}
                            <div className="mb-4">
                                {stat.icon}
                            </div>
                            <div className="absolute bottom-4 text-center">
                                <span className="text-3xl font-bold text-white block">{stat.count}</span>
                                <span className="text-xs uppercase tracking-widest text-[#A7EBF2] font-semibold">{stat.label}</span>
                            </div>
                        </div>
                        {/* Glow effect below card */}
                        <div className="w-32 h-1 bg-[#54ACBF] blur-lg mt-8 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
});

export default About;
