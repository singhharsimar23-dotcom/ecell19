
import React, { memo } from 'react';

const Hero: React.FC = memo(() => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex overflow-hidden bg-black scroll-mt-32">
      {/* Left Content Side */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-24 z-10">
        <h1 className="text-5xl md:text-7xl font-black text-[#76ABB8] mb-8 uppercase tracking-tighter leading-none">
          E-CELL VIT BHOPAL
        </h1>
        <p className="text-lg text-white font-medium max-w-lg mb-10 leading-relaxed">
          The Entrepreneurship Cell (E-Cell) of VIT Bhopal is a student-run, non-profit organization designed to foster an entrepreneurial mindset. 
          It acts as a hub for nurturing startups, organizing workshops, connecting students with mentors, and providing access to resources like funding and incubation.
        </p>
        <div>
          <button className="bg-[#76ABB8] hover:bg-[#8ec2cf] text-white px-12 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105">
            Know More
          </button>
        </div>
      </div>

      {/* Right Image Side */}
      <div className="hidden md:block w-1/2 h-full relative">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
          alt="E-Cell Team" 
          loading="lazy"
          className="w-full h-full object-cover grayscale-[20%] brightness-75 contrast-125"
        />
        {/* Blue tint overlay as seen in photo */}
        <div className="absolute inset-0 bg-[#76ABB8]/10 mix-blend-overlay"></div>
      </div>
      
      {/* Mobile background (if needed) */}
      <div className="md:hidden absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
          alt="Mobile Team Background"
        />
      </div>
    </section>
  );
});

export default Hero;
