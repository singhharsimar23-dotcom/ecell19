
import React, { memo } from 'react';
import { EventItem } from '../constants';

const EventCard: React.FC<{ event: EventItem }> = memo(({ event }) => {
  const isImageFirst = event.layout === 'image-first';

  return (
    <div className="flex-shrink-0 w-[85vw] max-w-[450px] sm:w-[400px] md:w-[450px] min-h-[500px] sm:h-[600px] md:h-[650px] mx-3 sm:mx-4 md:mx-6 bg-[#1a1a1a] border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/10 hover:bg-[#222]">
      {isImageFirst ? (
        <>
          {/* Image Section */}
          <div className="w-full h-40 sm:h-48 md:h-56 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mb-4 sm:mb-6 md:mb-8 flex-shrink-0">
            <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-all duration-500" />
          </div>
          {/* Content Section */}
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tighter uppercase leading-tight flex-1">{event.title}</h3>
              <button className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#347690] flex items-center justify-center text-white hover:bg-[#4a97b5] active:scale-95 hover:scale-110 transition-all shadow-lg touch-manipulation min-w-[44px] min-h-[44px]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-[#a0a0a0] text-sm sm:text-base md:text-lg font-medium leading-relaxed overflow-y-auto pr-2 sm:pr-3 custom-scrollbar">
              {event.description}
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Content Section */}
          <div className="flex flex-col flex-grow mb-4 sm:mb-6 md:mb-8 overflow-hidden">
            <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tighter uppercase leading-tight flex-1">{event.title}</h3>
              <button className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#347690] flex items-center justify-center text-white hover:bg-[#4a97b5] active:scale-95 hover:scale-110 transition-all shadow-lg touch-manipulation min-w-[44px] min-h-[44px]">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-[#a0a0a0] text-sm sm:text-base md:text-lg font-medium leading-relaxed overflow-y-auto pr-2 sm:pr-3 custom-scrollbar">
              {event.description}
            </p>
          </div>
          {/* Image Section */}
          <div className="w-full h-40 sm:h-48 md:h-56 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden mt-auto flex-shrink-0">
            <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-all duration-500" />
          </div>
        </>
      )}
    </div>
  );
});

interface OurEventsProps {
  events: EventItem[];
}

const OurEvents: React.FC<OurEventsProps> = memo(({ events }) => {
  return (
    <section id="gallery" className="py-32 bg-black overflow-hidden relative scroll-mt-32">
      {/* Decorative text watermark background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none uppercase">
        Events
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20 relative z-10">
        <h2 className="text-center text-fluid-4xl md:text-fluid-8xl font-black text-[#76ABB8] uppercase tracking-[-0.05em] leading-tight">
          OUR EVENTS
        </h2>
      </div>

      <div className="relative w-full z-10 pause-on-hover">
        {/* Infinite Scroll Container - Standardized with -50% logic */}
        <div className="flex animate-marquee py-6 sm:py-8 md:py-10" style={{ '--duration': '60s' } as React.CSSProperties}>
          {events.map((event, index) => (
            <EventCard key={`a-${event.id}-${index}`} event={event} />
          ))}
          {events.map((event, index) => (
            <EventCard key={`b-${event.id}-${index}`} event={event} />
          ))}
        </div>
      </div>

      {/* Side Vignettes for professional look */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 md:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 md:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
});

export default OurEvents;
