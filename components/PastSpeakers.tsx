
import React, { memo } from 'react';
import { SPEAKERS, SpeakerItem } from '../constants';

const SpeakerCard: React.FC<{ speaker: SpeakerItem }> = memo(({ speaker }) => {
  return (
    <div className="flex-shrink-0 w-[380px] h-[520px] mx-6 group relative">
      {/* Main Card Background */}
      <div className="w-full h-full bg-[#557A89] rounded-[2.5rem] p-10 flex flex-col items-center justify-between shadow-2xl transition-transform duration-500 hover:scale-105 border border-white/10">
        
        {/* Profile Image Container */}
        <div className="relative w-48 h-48 mt-4">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
            <img 
              src={speaker.image} 
              alt={speaker.name} 
              loading="lazy"
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          
          {/* LinkedIn Badge */}
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-2 right-2 w-10 h-10 bg-[#0077b5] rounded-full flex items-center justify-center border-2 border-[#557A89] hover:scale-110 transition-transform"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        {/* Text Details */}
        <div className="text-left w-full mt-8">
          <h3 className="text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {speaker.name}
          </h3>
          <p className="text-white/90 text-sm font-medium leading-relaxed">
            {speaker.title}
          </p>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-cyan-400 blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
});

const PastSpeakers: React.FC = memo(() => {
  // Triple the speakers for an infinite, smooth loop
  const loopSpeakers = [...SPEAKERS, ...SPEAKERS, ...SPEAKERS];

  return (
    <section id="past-speakers" className="py-32 bg-black overflow-hidden relative scroll-mt-32">
      {/* Subtle background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] pointer-events-none select-none uppercase">
        Speakers
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-10">
        <h2 className="text-center text-6xl md:text-8xl font-black text-[#76ABB8] uppercase tracking-[-0.05em] leading-tight">
          PAST SPEAKERS
        </h2>
      </div>

      <div className="relative w-full z-10">
        {/* Infinite Scroll Container (Reusing the animation class from Events) */}
        <div className="flex animate-infinite-scroll py-10" style={{ animationDuration: '50s' }}>
          {loopSpeakers.map((speaker, index) => (
            <SpeakerCard key={`${speaker.id}-${index}`} speaker={speaker} />
          ))}
        </div>
      </div>

      {/* Side Vignettes for depth */}
      <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
});

export default PastSpeakers;
