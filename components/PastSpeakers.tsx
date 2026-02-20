
import React, { memo } from 'react';
import { SPEAKERS, SpeakerItem } from '../constants';

const SpeakerCard: React.FC<{ speaker: SpeakerItem }> = memo(({ speaker }) => {
  return (
    <div className="flex-shrink-0 w-[80vw] max-w-[280px] sm:w-[320px] md:w-[340px] min-h-[400px] sm:h-[430px] md:h-[460px] mx-3 sm:mx-4 md:mx-6 group relative">
      {/* Main Card Background */}
      <div className="w-full h-full bg-[#557A89] rounded-[1.2rem] sm:rounded-[1.6rem] md:rounded-[2rem] p-5 sm:p-7 md:p-8 flex flex-col items-center justify-start shadow-2xl border border-white/10 touch-manipulation relative">

        {/* Permanent LinkedIn Widget - Top Right */}
        <a
          href={speaker.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300 shadow-lg z-20"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>

        {/* Profile Image Container - No Hovers */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 mt-2 sm:mt-4">
          <div className="w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-white/20 shadow-lg">
            <img
              src={speaker.image}
              alt={speaker.name}
              loading="lazy"
              className="w-full h-full object-cover"
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
  const [isPaused, setIsPaused] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsPaused(true);
    }, 2000); // 2 second delay
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsPaused(false);
  };

  return (
    <section id="past-speakers" className="py-24 bg-black overflow-hidden relative scroll-mt-32">
      {/* Subtle background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.01] pointer-events-none select-none uppercase">
        Speakers
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 md:mb-20 relative z-10">
        <h2 className="text-center text-fluid-4xl md:text-fluid-8xl font-black text-[#76ABB8] uppercase tracking-[-0.05em] leading-tight">
          PAST SPEAKERS
        </h2>
      </div>

      <div
        className="relative w-full z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Infinite Scroll Container (Standardized with -50% logic) */}
        <div
          className="flex animate-marquee py-5 sm:py-6 md:py-8"
          style={{
            '--duration': '50s',
            animationPlayState: isPaused ? 'paused' : 'running'
          } as React.CSSProperties}
        >
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
