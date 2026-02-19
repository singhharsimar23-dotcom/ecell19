
import React, { memo } from 'react';
import { NAV_ITEMS, LOGO_URL } from '../constants';

interface NavbarProps {
  activeItem: string;
  onNavigate: (label: string, href: string) => void;
  onAuthClick: () => void;
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = memo(({ activeItem, onNavigate, onAuthClick, isLoggedIn }) => {
  return (
    <nav className="fixed top-8 left-0 right-0 z-[120] flex justify-center px-4 transform-gpu">
      <div className="relative flex items-center max-w-7xl w-full">
        
        {/* Pill Container */}
        <div className="relative flex items-center justify-between w-full h-16 pl-6 pr-4 rounded-full border border-white/20 bg-black/50 backdrop-blur-xl shadow-2xl">
          
          {/* Logo Section */}
          <div 
            className="flex-shrink-0 mr-8 cursor-pointer group" 
            onClick={() => onNavigate('HOME', '#home')}
          >
             <LOGO_URL className="w-10 h-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-300" />
          </div>

          <div className="hidden md:flex items-center justify-center flex-grow space-x-6 lg:space-x-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.label, item.href);
                }}
                className={`text-[12px] lg:text-[14px] font-black tracking-widest transition-all duration-300 uppercase whitespace-nowrap ${
                  activeItem === item.label ? 'text-[#76ABB8] scale-105' : 'text-white/60 hover:text-white hover:scale-105'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Auth Button */}
          <button 
            onClick={onAuthClick}
            className={`px-8 py-2.5 rounded-full text-[12px] font-black tracking-widest uppercase transition-all duration-300 border ${
              activeItem === 'AUTH' || activeItem === 'DASHBOARD'
              ? 'bg-[#76ABB8] border-[#76ABB8] text-white' 
              : 'border-white/20 text-white hover:bg-white/10'
            }`}
          >
            {isLoggedIn ? 'DASHBOARD' : 'LOGIN'}
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
