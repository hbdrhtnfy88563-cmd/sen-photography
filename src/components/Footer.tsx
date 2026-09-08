import React from 'react';
import { Instagram, Youtube, Facebook, MessageSquare, ShieldCheck, ArrowUp } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings?: SiteSettings | null;
  onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigateToAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanWa = (settings?.whatsappNumber || '+91 98765 43210').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#080809] text-[#e8e4dc] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section with Brand & Scroll to Top */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-16 border-b border-white/10 gap-8">
          <div className="text-center md:text-left">
            <span className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-[#f4eee0] font-light block">
              SEN PHOTOGRAPHY
            </span>
            <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase font-light mt-1 block">
              LUXURY INDIAN WEDDING CINEMA & PORTRAITURE
            </span>
          </div>

          {/* Social Icons with smooth brand color hover transitions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href={settings?.instagramUrl || 'https://instagram.com/senphotography'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-transparent hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] transition-all duration-300 shadow-sm"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={settings?.youtubeUrl || 'https://youtube.com/@senphotography'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-transparent hover:bg-[#FF0000] transition-all duration-300 shadow-sm"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/${cleanWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-transparent hover:bg-[#25D366] transition-all duration-300 shadow-sm"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href={settings?.facebookUrl || 'https://facebook.com/senphotography'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-transparent hover:bg-[#1877F2] transition-all duration-300 shadow-sm"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-white/60 hover:text-[#d4af37] transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#d4af37]" />
          </button>
        </div>

        {/* Middle Navigation & Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs font-light">
          {/* Column 1 */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold block mb-4">
              PORTFOLIO
            </span>
            <ul className="space-y-2 text-white/60">
              <li><a href="#stories" className="hover:text-white transition-colors">Selected Stories</a></li>
              <li><a href="#weddings" className="hover:text-white transition-colors">Weddings Gallery</a></li>
              <li><a href="#pre-weddings" className="hover:text-white transition-colors">Pre-Wedding Cinema</a></li>
              <li><a href="#films" className="hover:text-white transition-colors">Wedding Films</a></li>
              {settings?.maternityKidsEnabled && (
                <li><a href="#maternity-kids" className="hover:text-white transition-colors">Maternity & Heirlooms</a></li>
              )}
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold block mb-4">
              ATELIER
            </span>
            <ul className="space-y-2 text-white/60">
              <li><a href="#about" className="hover:text-white transition-colors">Philosophy & Approach</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Editorial Standards</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Commission an Artwork</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Client FAQ</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold block mb-4">
              DESTINATIONS
            </span>
            <p className="text-white/60 leading-relaxed">
              Udaipur · Jaipur · Jodhpur · Jaisalmer · New Delhi · Mumbai · Goa · Lake Como · Worldwide.
            </p>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold block mb-4">
              STUDIO PORTAL
            </span>
            <p className="text-white/60 text-[11px] leading-relaxed mb-3">
              Protected administrative portal to upload photos, update stories, films, and manage client enquiries.
            </p>
            <button
              onClick={onNavigateToAdmin}
              className="inline-flex items-center space-x-2 px-3.5 py-2 border border-white/20 hover:border-[#d4af37] text-white/80 hover:text-[#d4af37] text-[10px] tracking-[0.2em] uppercase transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>ADMIN ACCESS</span>
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Permanently Fixed Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 tracking-wider gap-4">
          <div>
            <p>© {new Date().getFullYear()} SEN PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>
            <p className="mt-1 font-serif italic text-white/40">
              Crafted for timeless Indian wedding legacies.
            </p>
          </div>

          {/* PERMANENT FIXED CREDIT (NON-EDITABLE) */}
          <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
            <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-white/80">
              DESIGN BY @dipvibe.s
            </span>
            <span className="text-[11px] tracking-[0.25em] font-mono text-white/70 mt-0.5">
              7880236703
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
