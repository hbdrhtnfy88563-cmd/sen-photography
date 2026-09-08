import React, { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0c0d]/90 backdrop-blur-md border-b border-[#222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer"
        >
          <span className="text-xl font-serif tracking-[0.25em] text-[#d4af37] uppercase">
            {settings?.studioName || 'SEN PHOTOGRAPHY'}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest text-gray-300">
          <button
            onClick={() => scrollToSection('stories')}
            className="hover:text-[#d4af37] transition-colors py-2"
          >
            STORIES
          </button>
          <button
            onClick={() => scrollToSection('weddings')}
            className="hover:text-[#d4af37] transition-colors py-2"
          >
            WEDDINGS
          </button>
          <button
            onClick={() => scrollToSection('preweddings')}
            className="hover:text-[#d4af37] transition-colors py-2"
          >
            PRE-WEDDINGS
          </button>
          <button
            onClick={() => scrollToSection('films')}
            className="hover:text-[#d4af37] transition-colors py-2"
          >
            FILMS
          </button>
        </nav>

        {/* Action Button & Admin */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenBooking}
            className="px-5 py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all text-xs uppercase tracking-wider rounded-full"
          >
            Book Date
          </button>
          <button
            onClick={onNavigateToAdmin}
            className="text-gray-500 hover:text-[#d4af37] p-2 transition-colors text-xs"
            title="Admin Console"
          >
            ⚙️
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111113] border-b border-[#222] px-6 py-4 flex flex-col space-y-4 text-xs uppercase tracking-widest text-gray-300">
          <button onClick={() => scrollToSection('stories')} className="text-left py-1 hover:text-[#d4af37]">STORIES</button>
          <button onClick={() => scrollToSection('weddings')} className="text-left py-1 hover:text-[#d4af37]">WEDDINGS</button>
          <button onClick={() => scrollToSection('preweddings')} className="text-left py-1 hover:text-[#d4af37]">PRE-WEDDINGS</button>
          <button onClick={() => scrollToSection('films')} className="text-left py-1 hover:text-[#d4af37]">FILMS</button>
          <button onClick={onOpenBooking} className="text-left py-1 text-[#d4af37]">Book Date</button>
        </div>
      )}
    </header>
  );
};
