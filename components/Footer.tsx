
import React, { memo } from 'react';

const Footer: React.FC = memo(() => {
  return (
    <footer className="bg-black py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-white font-bold text-lg tracking-tight">
          © 2026 E-Cell VIT Bhopal. All rights reserved.
        </p>
      </div>
    </footer>
  );
});

export default Footer;
