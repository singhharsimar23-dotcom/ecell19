
import React, { memo } from 'react';

const ContactUs: React.FC = memo(() => {
  return (
    <section id="join" className="py-24 sm:py-32 bg-black relative overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Heading with Accent */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#76ABB8]"></div>
            <span className="text-[#76ABB8] text-xs font-black uppercase tracking-[0.4em]">Get in Touch</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            LET'S BUILD THE <br />
            <span className="text-[#76ABB8]">FUTURE TOGETHER</span>
          </h2>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Side: Modern Form */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4 group-focus-within:text-[#76ABB8] transition-colors">Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full bg-white/[0.03] backdrop-blur-md border border-white/40 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#76ABB8] transition-all text-base shadow-2xl"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4 group-focus-within:text-[#76ABB8] transition-colors">Email Address</label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full bg-white/[0.03] backdrop-blur-md border border-white/40 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#76ABB8] transition-all text-base shadow-2xl"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4 group-focus-within:text-[#76ABB8] transition-colors">Phone Number</label>
              <input
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full bg-white/[0.03] backdrop-blur-md border border-white/40 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#76ABB8] transition-all text-base shadow-2xl"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#76ABB8] ml-4 transition-colors">Message</label>
              <textarea
                placeholder="Tell us about your project or inquiry..."
                rows={5}
                className="w-full bg-white/[0.03] backdrop-blur-md border border-white/40 rounded-[2rem] px-6 py-5 text-white placeholder-white/30 focus:outline-none focus:border-[#76ABB8] transition-all text-base shadow-2xl resize-none min-h-[160px]"
              ></textarea>
            </div>

            <button className="relative group w-full sm:w-auto px-12 py-5 bg-[#76ABB8] hover:bg-[#8ec2cf] text-white rounded-2xl font-black text-xs tracking-[0.3em] uppercase transition-all overflow-hidden">
              <span className="relative z-10">Send Message</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Right Side: Information Deck */}
          <div className="lg:col-span-5">
            <div className="sticky top-40 space-y-16 lg:pl-12 lg:border-l border-white/5">

              {/* Useful Links Section */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#76ABB8]">Navigation</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    ['Home', '#home'],
                    ['About Us', '#about'],
                    ['E-Cell Blog', '#blogs'],
                    ['Gallery', '#gallery'],
                    ['Contact Us', '#join'],
                    ['Teams', '#team']
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider block"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info & Socials Section */}
              <div className="space-y-10">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#76ABB8]">Email Support</h4>
                  <a href="mailto:ecell@vitbhopal.ac.in" className="text-2xl font-black text-white hover:text-[#76ABB8] transition-colors break-all">
                    ecell@vitbhopal.ac.in
                  </a>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#76ABB8]">Follow Our Journey</h4>
                  <div className="flex gap-4">
                    {[
                      {
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        ),
                        href: "https://www.linkedin.com/company/e-cell-vit-bhopal/posts/?feedView=all",
                        color: "hover:bg-[#0077b5]",
                        label: "LinkedIn"
                      },
                      {
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441c.795 0 1.439-.645 1.439-1.441s-.644-1.44-1.439-1.44z" />
                          </svg>
                        ),
                        href: "https://www.instagram.com/ecell_vit.bhopal/?hl=en",
                        color: "hover:bg-[#ee2a7b]",
                        label: "Instagram"
                      },
                      {
                        icon: (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        ),
                        href: "https://www.facebook.com/ecellVITB/",
                        color: "hover:bg-[#1877F2]",
                        label: "Facebook"
                      }
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all ${social.color} hover:scale-110 hover:-translate-y-1 active:scale-95`}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modern Radial Accents */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#76ABB8]/10 rounded-full blur-[160px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#25668C]/5 rounded-full blur-[160px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
});

export default ContactUs;
