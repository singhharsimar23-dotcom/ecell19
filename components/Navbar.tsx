
import React, { memo, useState } from 'react';
import { NAV_ITEMS, LOGO_URL } from '../constants';

interface NavbarProps {
  activeItem: string;
  onNavigate: (label: string, href: string) => void;
  onAuthClick: () => void;
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = memo(({ activeItem, onNavigate, onAuthClick, isLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (label: string, href: string) => {
    onNavigate(label, href);
    setIsMobileMenuOpen(false);
  };

  const handleMobileAuthClick = () => {
    onAuthClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 sm:top-8 left-0 right-0 z-[120] flex justify-center px-2 sm:px-4 transform-gpu">
        <div className="relative flex items-center max-w-7xl w-full">

          {/* Pill Container */}
          <div className="relative flex items-center justify-between w-full min-h-[50px] sm:h-16 pl-4 sm:pl-6 pr-2 sm:pr-4 rounded-full border border-white/20 bg-black/50 backdrop-blur-xl shadow-2xl">

            {/* Logo Section */}
            <div
              className="flex-shrink-0 mr-4 sm:mr-8 cursor-pointer group"
              onClick={() => onNavigate('HOME', '#home')}
            >
              <LOGO_URL className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-grow space-x-6 lg:space-x-10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.label, item.href);
                  }}
                  className={`text-[12px] lg:text-[14px] font-black tracking-widest transition-all duration-300 uppercase whitespace-nowrap ${activeItem === item.label ? 'text-[#76ABB8] scale-105' : 'text-white/60 hover:text-white hover:scale-105'
                    }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Auth Button */}
            <button
              onClick={onAuthClick}
              className={`hidden md:block px-6 lg:px-8 py-2.5 rounded-full text-[12px] font-black tracking-widest uppercase transition-all duration-300 border ${activeItem === 'AUTH' || activeItem === 'DASHBOARD'
                  ? 'bg-[#76ABB8] border-[#76ABB8] text-white'
                  : 'border-white/20 text-white hover:bg-white/10'
                }`}
            >
              {isLoggedIn ? 'DASHBOARD' : 'LOGIN'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className="mobile-menu-content"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-menu-close"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Navigation Items */}
          <div className="mt-16 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick(item.label, item.href);
                }}
                className={`mobile-menu-item ${activeItem === item.label ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Auth Button */}
            <button
              onClick={handleMobileAuthClick}
              className={`mobile-menu-item w-full text-left border-none ${activeItem === 'AUTH' || activeItem === 'DASHBOARD' ? 'active' : ''
                }`}
            >
              {isLoggedIn ? 'DASHBOARD' : 'LOGIN'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Navbar;
