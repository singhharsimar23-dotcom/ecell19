
import React, { memo, useState, useEffect, useRef } from 'react';
import { STATS } from '../constants';

const StatCard: React.FC<{ stat: typeof STATS[0]; index: number }> = memo(({ stat, index }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Extract numeric value from string (e.g., "4000+" -> 4000)
  const targetValue = parseInt(stat.count.replace(/\D/g, '')) || 0;
  const suffix = stat.count.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = targetValue;
    const duration = 3500; // Slowed down for premium feel
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const currentCount = Math.floor(easeProgress * end);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, targetValue]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center group"
    >
      <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-[2rem] bg-[#25668C] border border-white/10 flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-2xl relative">
        <div className="mb-6 scale-125 text-white flex items-center justify-center h-16">
          {stat.icon}
        </div>

        <div className="text-center z-10 w-full px-4">
          <div className="text-5xl sm:text-6xl font-black text-white mb-2 tracking-tight tabular-nums h-[1.2em] flex items-center justify-center">
            {count}{suffix}
          </div>
          <div className="text-lg sm:text-xl uppercase tracking-widest text-white font-black whitespace-nowrap">
            {stat.label}
          </div>
        </div>
      </div>

      <div className="w-48 h-6 bg-[#25668C]/40 blur-[30px] rounded-full mt-4 group-hover:bg-[#25668C]/60 group-hover:scale-125 transition-all duration-500"></div>
    </div>
  );
});

const About: React.FC = memo(() => {
  return (
    <section id="about" className="scroll-mt-20 overflow-hidden">
      {/* Upper Strip - Pure White Layout */}
      <div className="bg-[#f2f2f2] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <h2 className="text-fluid-5xl md:text-fluid-6xl font-black text-[#26658C] tracking-tighter uppercase leading-[0.9]">
              WHAT IS <br />ECELL?
            </h2>
            <div className="max-w-2xl md:text-right">
              <p className="text-lg sm:text-xl md:text-2xl text-[#02142C]/90 font-bold leading-relaxed">
                Entrepreneurial Cell of VIT Bhopal, a dynamic hub dedicated to nurturing and empowering the next generation of entrepreneurs across India. The future of your idea begins here, at the Entrepreneurial Cell of VIT Bhopal - where we don't just promote entrepreneurs, we build success stories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section - Matrix Black Layout */}
      <div className="bg-black py-16 md:py-20 relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#26658C]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#54ACBF]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 lg:gap-24 justify-items-center">
            {STATS.map((stat, idx) => (
              <StatCard key={idx} stat={stat} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
