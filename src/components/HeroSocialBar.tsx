import React from 'react';
import { Phone, MessageCircle, Instagram } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeroSocialBarProps {
  settings?: SiteSettings;
  phoneNumber?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
  instagramHandle?: string;
}

export const HeroSocialBar: React.FC<HeroSocialBarProps> = ({
  settings,
  phoneNumber,
  whatsappNumber,
  instagramUrl,
  instagramHandle
}) => {
  const phone = phoneNumber || settings?.phoneNumber || '+91 98765 43210';
  const whatsapp = whatsappNumber || settings?.whatsappNumber || '+91 98765 43210';
  const instaUrl = instagramUrl || settings?.instagramUrl || 'https://instagram.com/senphotography';
  const instaHandle = instagramHandle || settings?.instagramHandle || '@SENPHOTOGRAPHY';

  const cleanPhoneForDialer = `tel:${phone.replace(/\s+/g, '')}`;
  const cleanWhatsappDigits = whatsapp.replace(/[^0-9]/g, '') || '919876543210';
  const whatsappUrl = `https://wa.me/${cleanWhatsappDigits}?text=${encodeURIComponent('Hello SEN PHOTOGRAPHY, I would like to enquire about wedding photography and cinematography availability.')}`;

  return (
    <section className="relative z-20 w-full bg-[#0e0e10] border-y border-white/10 py-5 sm:py-6 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {/* CALL */}
          <a
            href={cleanPhoneForDialer}
            id="hero-social-call-btn"
            className="group flex flex-col sm:flex-row items-center justify-center py-3 px-3 sm:py-3.5 sm:px-6 bg-[#161619] hover:bg-[#1f1f24] border border-white/10 hover:border-[#d4af37]/60 transition-all duration-300 rounded-none text-center"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#d4af37]/15 flex items-center justify-center mb-1.5 sm:mb-0 sm:mr-3 transition-colors">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37]" />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#f5f0e6] group-hover:text-[#d4af37] transition-colors">
                CALL
              </span>
              <span className="hidden md:inline-block text-[10px] text-white/40 tracking-wider font-mono">
                {phone}
              </span>
            </div>
          </a>

          {/* WHATSAPP */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-social-whatsapp-btn"
            className="group flex flex-col sm:flex-row items-center justify-center py-3 px-3 sm:py-3.5 sm:px-6 bg-[#161619] hover:bg-[#1f1f24] border border-white/10 hover:border-[#25D366]/60 transition-all duration-300 rounded-none text-center"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#25D366]/15 flex items-center justify-center mb-1.5 sm:mb-0 sm:mr-3 transition-colors">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366]" />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#f5f0e6] group-hover:text-[#25D366] transition-colors">
                WHATSAPP
              </span>
              <span className="hidden md:inline-block text-[10px] text-white/40 tracking-wider">
                Instant Chat
              </span>
            </div>
          </a>

          {/* INSTAGRAM */}
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-social-instagram-btn"
            className="group flex flex-col sm:flex-row items-center justify-center py-3 px-3 sm:py-3.5 sm:px-6 bg-[#161619] hover:bg-[#1f1f24] border border-white/10 hover:border-[#E1306C]/60 transition-all duration-300 rounded-none text-center"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#E1306C]/15 flex items-center justify-center mb-1.5 sm:mb-0 sm:mr-3 transition-colors">
              <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E1306C]" />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-[#f5f0e6] group-hover:text-[#E1306C] transition-colors">
                INSTAGRAM
              </span>
              <span className="hidden md:inline-block text-[10px] text-white/40 tracking-wider">
                {instaHandle}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
