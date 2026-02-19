
import React, { memo } from 'react';

const Footer: React.FC = memo(() => {
  return (
    <footer className="bg-black py-6 sm:py-8 md:py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white font-bold text-sm sm:text-base md:text-lg tracking-tight">
          © 2026 E-Cell VIT Bhopal. All rights reserved.
        </p>
      </div>
    </footer>
  );
});

export default Footer;
