
import React, { memo } from 'react';
import { EventItem } from '../constants';

const EventCard: React.FC<{ event: EventItem }> = memo(({ event }) => {
  const isImageFirst = event.layout === 'image-first';

  return (
    <div className="flex-shrink-0 w-[450px] h-[650px] mx-6 bg-[#1a1a1a] border border-white/5 rounded-[3rem] p-10 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/10 hover:bg-[#222]">
      {isImageFirst ? (
        <>
          {/* Image Section */}
          <div className="w-full h-56 rounded-[2.5rem] overflow-hidden mb-8 flex-shrink-0">
            <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500" />
          </div>
          {/* Content Section */}
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-4xl font-extrabold text-white tracking-tighter uppercase leading-none pr-4">{event.title}</h3>
              <button className="flex-shrink-0 w-12 h-12 rounded-full bg-[#347690] flex items-center justify-center text-white hover:bg-[#4a97b5] hover:scale-110 transition-all shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-[#a0a0a0] text-lg font-medium leading-relaxed overflow-y-auto pr-3 custom-scrollbar">
              {event.description}
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Content Section */}
          <div className="flex flex-col flex-grow mb-8 overflow-hidden">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-4xl font-extrabold text-white tracking-tighter uppercase leading-none pr-4">{event.title}</h3>
              <button className="flex-shrink-0 w-12 h-12 rounded-full bg-[#347690] flex items-center justify-center text-white hover:bg-[#4a97b5] hover:scale-110 transition-all shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-[#a0a0a0] text-lg font-medium leading-relaxed overflow-y-auto pr-3 custom-scrollbar">
              {event.description}
            </p>
          </div>
          {/* Image Section */}
          <div className="w-full h-56 rounded-[2.5rem] overflow-hidden mt-auto flex-shrink-0">
            <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500" />
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
  // Triple items for even smoother looping on large screens
  const loopEvents = [...events, ...events, ...events];

  return (
    <section id="gallery" className="py-32 bg-black overflow-hidden relative scroll-mt-32">
      {/* Decorative text watermark background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none uppercase">
        Events
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-10">
        <h2 className="text-center text-6xl md:text-8xl font-black text-[#76ABB8] uppercase tracking-[ -0.05em] leading-tight">
          OUR EVENTS
        </h2>
      </div>

      <div className="relative w-full z-10">
        {/* Infinite Scroll Container */}
        <div className="flex animate-infinite-scroll py-10">
          {loopEvents.map((event, index) => (
            <EventCard key={`${event.id}-${index}`} event={event} />
          ))}
        </div>
      </div>
      
      {/* Side Vignettes for professional look */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
    </section>
  );
});

export default OurEvents;
