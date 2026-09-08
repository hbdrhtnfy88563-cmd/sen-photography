import React from 'react';
import { SiteSettings } from '../types';

interface EditorialIntroProps {
  settings: SiteSettings;
}

export const EditorialIntro: React.FC<EditorialIntroProps> = ({ settings }) => {
  return (
    <section id="about" className="relative py-28 md:py-40 bg-[#0c0c0d] text-[#e8e4dc] overflow-hidden">
      {/* Subtle Background Architectural Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-[#d4af37]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#d4af37] font-medium block mb-4">
            THE PHILOSOPHY
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#f5efe2] font-light leading-[1.2] tracking-tight uppercase mb-8">
            {settings.aboutHeadline}
          </h2>

          <div className="w-16 h-[1px] bg-[#d4af37]/60 mx-auto mb-10" />

          <p className="text-base sm:text-lg md:text-xl text-[#b8b3a7] font-light leading-relaxed max-w-3xl mx-auto mb-6">
            {settings.aboutParagraph1}
          </p>

          <p className="text-sm sm:text-base text-[#9a958b] font-light leading-relaxed max-w-2xl mx-auto mb-8">
            {settings.aboutParagraph2}
          </p>

          <div className="font-serif text-lg tracking-[0.25em] text-[#d4af37] italic">
            {settings.aboutAuthor}
          </div>
        </div>

        {/* Editorial Visual Diptych */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 border-t border-white/5">
          <div className="md:col-span-7 relative group overflow-hidden">
            <div className="aspect-[16/10] overflow-hidden bg-black/40">
              <img
                src={settings.aboutImage}
                alt="Sen Photography Artistry"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex justify-between items-center text-[10px] tracking-[0.25em] text-white/50 uppercase">
              <span>Rajasthan Heritage Weddings</span>
              <span>Documentary Cinema</span>
            </div>
          </div>

          <div className="md:col-span-5 md:pl-6 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#d4af37]">
                Uncompromising Artistry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug">
                Where royal legacy meets cinematic intimacy.
              </h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                We deliberately accept an exclusive number of weddings each year to ensure every couple receives bespoke narrative attention, meticulous color mastering, and artistic devotion.
              </p>
            </div>

            {/* Prestige Statistics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#d4af37] font-light">
                  250+
                </div>
                <div className="text-[9px] tracking-[0.18em] uppercase text-white/50 mt-1">
                  Royal Weddings
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#d4af37] font-light">
                  14
                </div>
                <div className="text-[9px] tracking-[0.18em] uppercase text-white/50 mt-1">
                  Countries
                </div>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#d4af37] font-light">
                  8+
                </div>
                <div className="text-[9px] tracking-[0.18em] uppercase text-white/50 mt-1">
                  Years Craft
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
