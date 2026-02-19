
import React, { memo } from 'react';

const ContactUs: React.FC = memo(() => {
  return (
    <section id="join" className="py-32 bg-black relative overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 className="text-fluid-4xl md:text-fluid-8xl font-black text-[#76ABB8] uppercase tracking-[-0.05em] leading-tight mb-8 sm:mb-12 md:mb-16">
          CONTACT US
        </h2>

        {/* Main Contact Container */}
        <div className="bg-[#262626] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 sm:gap-8 shadow-2xl border border-white/5">
          
          {/* Left Side: Form */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <input 
                type="text" 
                placeholder="Name *" 
                className="w-full bg-transparent border border-white/30 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-[#76ABB8] transition-colors text-base min-h-[48px]"
              />
              <input 
                type="email" 
                placeholder="Email *" 
                className="w-full bg-transparent border border-white/30 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-[#76ABB8] transition-colors text-base min-h-[48px]"
              />
              <input 
                type="tel" 
                placeholder="Phone number *" 
                className="w-full bg-transparent border border-white/30 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-[#76ABB8] transition-colors text-base min-h-[48px]"
              />
              <div className="relative">
                <select 
                  className="w-full bg-transparent border border-white/30 rounded-full px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-white/50 focus:outline-none focus:border-[#76ABB8] transition-colors appearance-none text-base min-h-[48px] pr-10"
                  defaultValue=""
                >
                  <option value="" disabled>Message *</option>
                  <option value="partnership">Partnership</option>
                  <option value="startup">Startup Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-[#76ABB8] hover:bg-[#8ec2cf] active:bg-[#6a9ba8] text-white py-3 sm:py-4 rounded-full font-black text-xs sm:text-sm tracking-[0.2em] uppercase shadow-lg transition-all transform active:scale-95 hover:scale-[1.02] min-h-[48px] touch-manipulation">
              SEND
            </button>
          </div>

          {/* Right Side: Links & Socials Panel */}
          <div className="flex-1 bg-[#1A1A1A] rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row justify-between gap-8 sm:gap-10 md:gap-12 border border-white/5">
            
            {/* Useful Links Column */}
            <div className="flex-1">
              <div className="bg-[#02142C] rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 md:mb-8 inline-block w-full text-center">
                <h4 className="text-white text-base sm:text-lg md:text-xl font-medium">Useful links</h4>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-white/80 text-sm sm:text-base font-medium">
                <li><a href="#home" className="hover:text-[#76ABB8] transition-colors block py-1 touch-manipulation">Home</a></li>
                <li><a href="#about" className="hover:text-[#76ABB8] transition-colors block py-1 touch-manipulation">About Us</a></li>
                <li><a href="#blogs" className="hover:text-[#76ABB8] transition-colors block py-1 touch-manipulation">E-Cell Blog</a></li>
                <li><a href="#gallery" className="hover:text-[#76ABB8] transition-colors block py-1 touch-manipulation">Gallery</a></li>
                <li><a href="#join" className="hover:text-[#76ABB8] transition-colors block py-1 touch-manipulation">Contact Us</a></li>
                <li><a href="#team" className="hover:text-[#76ABB8] transition-colors block py-1 touch-manipulation">Teams</a></li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="flex-1">
              <div className="bg-[#02142C] rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 md:mb-8 inline-block w-full text-center">
                <h4 className="text-white text-base sm:text-lg md:text-xl font-medium">Connect</h4>
              </div>
              <div className="flex gap-3 sm:gap-4 justify-center md:justify-start">
                {/* X / Twitter */}
                <a href="#" className="w-11 h-11 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95 hover:scale-110 transition-transform touch-manipulation min-w-[44px] min-h-[44px]">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full flex items-center justify-center text-white active:scale-95 hover:scale-110 transition-transform touch-manipulation min-w-[44px] min-h-[44px]">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441c.795 0 1.439-.645 1.439-1.441s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Get in touch Column */}
            <div className="flex-1 text-center md:text-left">
              <div className="bg-[#02142C] rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 md:mb-8 inline-block w-full text-center">
                <h4 className="text-white text-base sm:text-lg md:text-xl font-medium">Get in touch</h4>
              </div>
              <p className="text-white/80 text-sm sm:text-base font-medium break-words">Ecell@vitbhopal.ac.in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Watermark Section */}
      <div className="mt-12 sm:mt-16 md:mt-24 relative z-10 select-none pointer-events-none opacity-20">
        <h3 className="text-[10vw] sm:text-[12vw] font-black text-center leading-none tracking-tighter blur-[4px]">
          E-Cell VIT Bhopal
        </h3>
      </div>
      
      {/* Decorative radial gradient highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50%] bg-[#76ABB8]/5 rounded-full blur-[160px] pointer-events-none"></div>
    </section>
  );
});

export default ContactUs;
