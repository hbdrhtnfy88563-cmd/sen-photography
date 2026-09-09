import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Phone } from 'lucide-react';
import { SiteSettings } from '../types';

interface NavbarProps {
  settings: SiteSettings;
  onOpenBooking: () => void;
  onNavigateToAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenBooking,
  onNavigateToAdmin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // मेनू खोलने पर बैकग्राउंड स्क्रॉल लॉक करना
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#founder' },
    { label: 'Pre-Wedding', href: '#preweddings' },
    { label: 'Wedding', href: '#weddings' },
    { label: 'Films', href: '#films' },
    { label: 'Maternity & Kids', href: '#maternity' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* टॉप बार */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 sm:px-12 py-5 flex items-center justify-between ${
          scrolled ? 'bg-black/85 backdrop-blur-md py-4' : 'bg-transparent'
        }`}
      >
        {/* बाएँ: मेनू बटन & एन्क्वायर */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2 text-white/90 hover:text-white uppercase tracking-[0.25em] text-[10px] sm:text-xs font-semibold group"
          >
            <Menu className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>MENU</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-block px-4 py-1.5 border border-white/30 hover:border-white text-[9px] tracking-[0.25em] uppercase text-white/90 hover:text-white transition-all rounded-full hover:bg-white hover:text-black"
          >
            ENQUIRE NOW
          </button>
        </div>

        {/* सेंटर: ब्रांड नाम */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer text-center"
        >
          <span className="font-serif text-lg sm:text-2xl tracking-[0.25em] text-white font-light uppercase">
            {settings?.brandName || 'SEN PHOTOGRAPHY'}
          </span>
        </div>

        {/* दाएँ: सोशल आइकॉन्स & एडमिन */}
        <div className="flex items-center space-x-4 text-white/80">
          {settings?.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {settings?.phoneNumber && (
            <a href={`tel:${settings.phoneNumber}`} className="hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={onNavigateToAdmin}
            className="text-[9px] tracking-widest text-white/40 hover:text-white transition-colors uppercase font-mono ml-2"
          >
            PORTAL
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* स्क्रीनशॉट जैसा फुल-स्क्रीन एनिमेटेड मेनू ओवरले */}
      {/* ========================================================================= */}
      <div
        className={`fixed inset-0 z-50 bg-[#070708] flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto visible scale-100'
            : 'opacity-0 pointer-events-none invisible scale-95'
        }`}
      >
        {/* क्लोज़ बटन */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 sm:top-12 sm:right-12 text-white/60 hover:text-white p-2 transition-colors flex items-center space-x-2 text-xs tracking-[0.2em] uppercase"
        >
          <span>CLOSE</span>
          <X className="w-6 h-6" />
        </button>

        {/* सेंटर मेनू लिंक्स (स्क्रीनशॉट का फ़ॉन्ट और लेआउट) */}
        <nav className="flex flex-col items-center space-y-4 sm:space-y-6 select-none">
          {navLinks.map((item, index) => (
            <a
              key={item.label}
              onClick={() => handleLinkClick(item.href)}
              style={{
                transitionDelay: `${isOpen ? index * 45 : 0}ms`,
              }}
              className={`font-serif text-2xl sm:text-4xl md:text-5xl text-[#999999] hover:text-white cursor-pointer tracking-wide transition-all duration-400 ease-out transform hover:scale-105 hover:tracking-wider ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* बॉटम ब्रांड सब-टेक्स्ट */}
        <div className="absolute bottom-8 sm:bottom-12 text-center">
          <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-white/30 font-mono">
            FINE ART CINEMA & DESTINATION WEDDINGS
          </p>
        </div>
      </div>
    </>
  );
};
