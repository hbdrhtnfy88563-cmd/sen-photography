import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types';

interface NavbarProps {
  settings: SiteSettings;
  onOpenBooking: () => void;
  onNavigateToAdmin: () => void;
  activeSection?: string;
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'STORIES', href: '#stories' },
    { label: 'WEDDINGS', href: '#weddings' },
    { label: 'PRE-WEDDINGS', href: '#pre-weddings' },
    { label: 'FILMS', href: '#films' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0c0c0d]/90 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="group flex flex-col items-start tracking-[0.28em] text-white transition-opacity hover:opacity-90"
        >
          <span className="font-serif text-2xl md:text-3xl font-light tracking-[0.3em] leading-none text-[#f4eee0]">
            SEN
          </span>
          <span className="text-[9px] md:text-[10px] tracking-[0.45em] text-[#d4af37] uppercase font-light mt-1 pl-0.5">
            PHOTOGRAPHY
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-[0.25em] font-medium text-[#c8c4bc]">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-white transition-colors uppercase tracking-[0.25em] relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center space-x-5">
          <button
            onClick={onNavigateToAdmin}
            title="Admin Portal"
            className="p-2 text-white/50 hover:text-[#d4af37] transition-colors rounded-full hover:bg-white/5"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBooking}
            className="px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase border border-[#d4af37]/60 text-[#f4eee0] hover:bg-[#d4af37] hover:text-[#0c0c0d] transition-all duration-300 font-medium tracking-widest rounded-none"
          >
            BOOK YOUR DATE
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border border-[#d4af37]/60 text-[#f4eee0] font-medium"
          >
            BOOK
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-[#0c0c0d]/98 backdrop-blur-xl z-40 px-8 py-10 flex flex-col justify-between border-t border-white/10 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold">
              Explore Portfolio
            </span>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left font-serif text-2xl text-[#f4eee0] hover:text-[#d4af37] transition-colors tracking-wide py-1"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-[#d4af37] text-[#0c0c0d] font-semibold text-xs tracking-[0.25em] uppercase text-center"
            >
              BOOK YOUR DATE
            </button>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToAdmin();
              }}
              className="w-full py-2.5 border border-white/20 text-white/70 text-xs tracking-[0.2em] uppercase flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>ADMIN DASHBOARD</span>
            </button>

            <div className="text-center text-[11px] text-white/40 pt-2 tracking-wider">
              {settings?.city || 'Delhi · Mumbai · Udaipur'} · {settings?.phoneNumber || '+91 98765 43210'}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
