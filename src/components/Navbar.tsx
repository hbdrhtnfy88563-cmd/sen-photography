import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../types';

interface NavbarProps {
  settings?: SiteSettings;
  onOpenBooking: () => void;
  onNavigateToAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenBooking,
  onNavigateToAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0c0c0d]/90 backdrop-blur-md py-4 border-b border-[#222]'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group flex flex-col items-start"
        >
          <span className="font-serif tracking-[0.25em] text-lg sm:text-xl text-white uppercase group-hover:text-[#d4af37] transition-colors">
            {settings?.studioName || 'SEN PHOTOGRAPHY'}
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-[#d4af37] uppercase font-light">
            Luxury Visuals
          </span>
        </div>

        {/* Center Desktop Navigation Links (STORIES, WEDDINGS, PRE-WEDDINGS, FILMS) */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('stories')}
            className="text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-[#d4af37] transition-colors font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
          >
            Stories
          </button>
          <button
            onClick={() => scrollToSection('weddings')}
            className="text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-[#d4af37] transition-colors font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
          >
            Weddings
          </button>
          <button
            onClick={() => scrollToSection('preweddings')}
            className="text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-[#d4af37] transition-colors font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
          >
            Pre-Weddings
          </button>
          <button
            onClick={() => scrollToSection('films')}
            className="text-xs uppercase tracking-[0.25em] text-gray-300 hover:text-[#d4af37] transition-colors font-medium relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
          >
            Films
          </button>
        </div>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2 border border-[#d4af37]/60 hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-black text-white text-[11px] uppercase tracking-[0.2em] transition-all duration-300 rounded-full font-medium"
          >
            Book Now
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1 hover:text-[#d4af37] transition-colors"
            aria-label="Toggle Navigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c0d]/98 border-b border-[#222] px-6 py-8 flex flex-col space-y-6 text-center">
          <button
            onClick={() => scrollToSection('stories')}
            className="text-sm uppercase tracking-[0.25em] text-white hover:text-[#d4af37] transition-colors"
          >
            Stories
          </button>
          <button
            onClick={() => scrollToSection('weddings')}
            className="text-sm uppercase tracking-[0.25em] text-white hover:text-[#d4af37] transition-colors"
          >
            Weddings
          </button>
          <button
            onClick={() => scrollToSection('preweddings')}
            className="text-sm uppercase tracking-[0.25em] text-white hover:text-[#d4af37] transition-colors"
          >
            Pre-Weddings
          </button>
          <button
            onClick={() => scrollToSection('films')}
            className="text-sm uppercase tracking-[0.25em] text-white hover:text-[#d4af37] transition-colors"
          >
            Films
          </button>
          <div className="pt-4 border-t border-[#222]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-[#d4af37] text-black uppercase tracking-[0.2em] text-xs font-semibold rounded-full"
            >
              Reserve Dates
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
