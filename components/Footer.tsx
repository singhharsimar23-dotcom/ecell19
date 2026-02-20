
import React, { memo } from 'react';

const Footer: React.FC = memo(() => {
  return (
    <footer className="bg-black pt-24 pb-12 sm:pt-32 sm:pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Large Decorative Branding with High Brightness 'Water' effect */}
        <div className="mb-6 select-none pointer-events-none relative group">
          <h2 className="text-[12vw] font-black leading-none tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/30 via-white/20 to-transparent inline-block animate-[float_6s_ease-in-out_infinite]">
            E-Cell VIT Bhopal
          </h2>

          {/* Enhanced Water reflection / Glow */}
          <div className="absolute -bottom-4 left-0 w-full h-12 bg-gradient-to-t from-[#76ABB8]/10 to-transparent blur-2xl opacity-60"></div>
        </div>

      </div>

      {/* Internal CSS for the custom water float effect */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-5px) rotate(-0.5deg); }
          66% { transform: translateY(2px) rotate(0.5deg); }
        }
      `}</style>
    </footer>
  );
});

export default Footer;
