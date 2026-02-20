
import React, { memo } from 'react';
import { INITIATIVES } from '../constants';

const Initiatives: React.FC = memo(() => {
  return (
    <section id="initiatives" className="relative py-32 overflow-hidden scroll-mt-32">
      {/* Background Image with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://www.ecellvitbhopal.in/static/media/background.67ccdbf852e6e55b5d9c.jpg"
          alt="E-Cell Community"
          loading="lazy"
          className="w-full h-full object-cover opacity-60 brightness-110 contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-fluid-3xl md:text-fluid-6xl font-black text-[#54ACBF] mb-4 sm:mb-6 md:mb-8 uppercase">Our Initiatives</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed px-2">
            E-cell or Entrepreneurship cell of VIT Bhopal is a community of like minded people, fostering the spirit of entrepreneurship. Our mission is to cultivate and empower the emerging visionaries of tomorrow, providing comprehensive guidance and unwavering support to transform groundbreaking ideas into successful ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {INITIATIVES.map((item, idx) => (
            <div
              key={idx}
              className={`relative group p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-500 transform hover:-translate-y-2 ${item.highlighted
                ? 'bg-[#54ACBF]/20 border-[#54ACBF]/40'
                : 'bg-white/5 border-white/10 backdrop-blur-md'
                }`}
            >
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-[#54ACBF]/15 blur-2xl rounded-full pointer-events-none group-hover:bg-[#54ACBF]/30 transition-all duration-500"></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-xl shadow-black/20">
                <div className="scale-75 sm:scale-90 md:scale-100">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white uppercase tracking-wide">{item.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                {item.description}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Initiatives;
