
import React, { memo } from 'react';
import { SPONSORS } from '../constants';

const SponsorCard: React.FC<{ name: string; logo: string }> = memo(({ name, logo }) => (
  <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-3 sm:mx-4 md:mx-6 bg-white rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center p-4 sm:p-6 md:p-8 shadow-[0_10px_40px_rgba(255,255,255,0.03)] border border-white/5 transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-2xl hover:z-20 group touch-manipulation">
    <img
      src={logo}
      alt={name}
      loading="lazy"
      className="max-w-full max-h-full object-contain transition-all duration-500 opacity-100"
      onError={(e) => {
        // Fallback for missing logos in case of link breakage
        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f3f4f6&color=111827&size=200&bold=true`;
      }}
    />
  </div>
));

const Sponsors: React.FC = memo(() => {
  // Use multiple sets of sponsors for a seamless loop on any screen width
  const marqueeSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <section id="sponsors" className="py-32 bg-black overflow-hidden relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-24 relative z-10">
        <h2 className="text-center text-fluid-4xl md:text-fluid-8xl font-black text-[#76ABB8] uppercase tracking-[-0.05em] leading-tight">
          OUR SPONSORS
        </h2>
      </div>

      <div className="relative w-full z-10 space-y-12 pause-on-hover">
        {/* Row 1: Leftward Infinite Marquee */}
        <div className="flex animate-marquee py-8 whitespace-nowrap" style={{ '--duration': '60s' } as React.CSSProperties}>
          {SPONSORS.map((sponsor, index) => (
            <SponsorCard key={`r1-a-${sponsor.id}-${index}`} name={sponsor.name} logo={sponsor.logo} />
          ))}
          {SPONSORS.map((sponsor, index) => (
            <SponsorCard key={`r1-b-${sponsor.id}-${index}`} name={sponsor.name} logo={sponsor.logo} />
          ))}
        </div>

        {/* Row 2: Rightward Infinite Marquee */}
        <div className="flex animate-marquee-reverse py-8 whitespace-nowrap" style={{ '--duration': '80s' } as React.CSSProperties}>
          {SPONSORS.map((sponsor, index) => (
            <SponsorCard key={`r2-a-${sponsor.id}-${index}`} name={sponsor.name} logo={sponsor.logo} />
          ))}
          {SPONSORS.map((sponsor, index) => (
            <SponsorCard key={`r2-b-${sponsor.id}-${index}`} name={sponsor.name} logo={sponsor.logo} />
          ))}
        </div>
      </div>

      {/* Side Vignettes for professional focus depth */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[60%] bg-[#76ABB8]/5 rounded-full blur-[200px] pointer-events-none"></div>
    </section>
  );
});

export default Sponsors;
