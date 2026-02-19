
import React, { memo } from 'react';

const Hero: React.FC = memo(() => {
  return (
    <section id="home" className="relative min-h-screen min-h-[100dvh] flex items-end overflow-hidden bg-black scroll-mt-20 sm:scroll-mt-32 pt-48 md:pt-64">

      {/* High-Clarity Team Asset - Integrated Background with Top Clearance */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.ecellvitbhopal.in/static/media/background.67ccdbf852e6e55b5d9c.jpg"
          alt="E-Cell Team"
          loading="lazy"
          className="w-full h-full object-cover object-[center_10%] lg:object-top contrast-[1.05] brightness-[1.1]"
        />
        {/* Subtle Bottom-Weighted Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
      </div>

      {/* Hero Content Area - Billboard Layout */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 z-20 pb-12 md:pb-24">
        <div className="max-w-4xl">
          <h1 className="text-fluid-5xl md:text-fluid-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            E-CELL <span className="text-[#76ABB8]">VIT BHOPAL</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white font-medium max-w-2xl mb-10 leading-relaxed drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            The Entrepreneurship Cell (E-Cell) of VIT Bhopal is a student-run, non-profit organization designed to foster an entrepreneurial mindset.
            It acts as a hub for nurturing startups, organizing workshops, connecting students with mentors, and providing access to resources like funding and incubation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-[#76ABB8] hover:bg-[#8ec2cf] text-[#02142C] px-12 py-5 rounded-full text-base sm:text-lg font-black uppercase tracking-widest transition-all shadow-2xl hover:scale-105 active:scale-95 touch-manipulation">
              Know More
            </button>
          </div>
        </div>
      </div>

      {/* Modern Interaction Mark */}
      <div className="absolute bottom-16 right-16 z-20 hidden lg:flex items-center gap-6 text-white/40 uppercase text-[10px] font-black tracking-[0.4em] rotate-90 origin-right translate-y-20 select-none">
        <div className="w-24 h-px bg-white/20"></div>
        <span>The Future belongs to the founders</span>
      </div>
    </section>
  );
});

export default Hero;
