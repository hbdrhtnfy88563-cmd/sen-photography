import React from 'react';
import { Instagram } from 'lucide-react';
import { SiteSettings } from '../types';

interface InstagramSectionProps {
  settings: SiteSettings;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ settings }) => {
  const images = settings.instagramImages || [];

  return (
    <section className="py-20 bg-[#09090a] text-[#e8e4dc] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#d4af37] font-medium block mb-2">
            FOLLOW THE STORIES
          </span>
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 font-serif text-2xl sm:text-3xl text-white hover:text-[#d4af37] transition-colors"
          >
            <Instagram className="w-5 h-5 text-[#d4af37]" />
            <span>{settings.instagramHandle || '@SENPHOTOGRAPHY'}</span>
          </a>
        </div>

        {/* 6 to 8 Image Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {images.slice(0, 8).map((imgUrl, idx) => (
            <a
              key={idx}
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-black/50 border border-white/5 block"
            >
              <img
                src={imgUrl}
                alt={`Instagram Post ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="w-6 h-6 text-[#d4af37]" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
