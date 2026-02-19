
import React, { memo } from 'react';
import { SPEAKERS, SpeakerItem } from '../constants';

const SpeakerCard: React.FC<{ speaker: SpeakerItem }> = memo(({ speaker }) => {
  return (
    <div className="flex-shrink-0 w-[85vw] max-w-[320px] sm:w-[360px] md:w-[380px] min-h-[450px] sm:h-[480px] md:h-[520px] mx-3 sm:mx-4 md:mx-6 group relative">
      {/* Main Card Background */}
      <div className="w-full h-full bg-[#557A89] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col items-center justify-between shadow-2xl transition-transform duration-500 hover:scale-105 active:scale-95 border border-white/10 touch-manipulation">

        {/* Profile Image Container */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 mt-2 sm:mt-4">
          <div className="w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-white/20 shadow-lg">
            <img
              src={speaker.image}
              alt={speaker.name}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>

        {/* Text Details */}
        <div className="text-left w-full mt-4 sm:mt-6 md:mt-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-3 md:mb-4">
            {speaker.name}
          </h3>
          <p className="text-white/90 text-xs sm:text-sm font-medium leading-relaxed">
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
  return (
    <section id="past-speakers" className="py-32 bg-black overflow-hidden relative scroll-mt-32">
      {/* Subtle background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] pointer-events-none select-none uppercase">
        Speakers
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-24 relative z-10">
        <h2 className="text-center text-fluid-4xl md:text-fluid-8xl font-black text-[#76ABB8] uppercase tracking-[-0.05em] leading-tight">
          PAST SPEAKERS
        </h2>
      </div>

      <div className="relative w-full z-10 pause-on-hover">
        {/* Infinite Scroll Container (Standardized with -50% logic) */}
        <div className="flex animate-marquee py-6 sm:py-8 md:py-10" style={{ '--duration': '50s' } as React.CSSProperties}>
          {SPEAKERS.map((speaker, index) => (
            <SpeakerCard key={`a-${speaker.id}-${index}`} speaker={speaker} />
          ))}
          {SPEAKERS.map((speaker, index) => (
            <SpeakerCard key={`b-${speaker.id}-${index}`} speaker={speaker} />
          ))}
        </div>
      </div>

      {/* Side Vignettes for depth */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 md:w-64 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 md:w-64 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
});

export default PastSpeakers;
