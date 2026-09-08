import React from 'react';
import { FounderSettings } from '../types';

interface FounderSectionProps {
  founder: FounderSettings;
  heading?: string;
  onBookDate?: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ founder, heading = 'FOUNDER', onBookDate }) => {
  const photoUrl = founder?.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85';
  const name = founder?.name || 'DIPAK';
  const line1 = founder?.designation_line1 || 'FOUNDER';
  const line2 = founder?.designation_line2 || 'LEAD CINEMATOGRAPHER';
  const shortDesc = founder?.short_description || 'Every wedding has a story, but every story has a feeling. My goal is to preserve those real emotions through photographs and cinematic films.';
  const longDesc = founder?.long_description || 'Over the last decade, Dipak has directed and documented over 300 luxury destination celebrations across Rajasthan, Delhi, Mumbai, and royal heritage venues worldwide. Rooted in cinematic sensibility and fine-art portraiture, our approach is quiet and unobtrusive—allowing raw family emotions, ancestral rituals, and spontaneous laughter to unfold naturally in front of our lenses.';

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-36 bg-[#ffffff] text-[#111111] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 text-center">
        {/* Section Heading: EXACT requested layout */}
        <div className="mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm tracking-[0.45em] uppercase text-[#777777] font-medium block">
            {heading}
          </span>
          <div className="w-12 h-[1px] bg-[#111111]/20 mx-auto mt-4" />
        </div>

        {/* FOUNDER PHOTO: Editorial Framing, No Dark Overlay */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="relative group max-w-sm sm:max-w-md w-full">
            {/* Editorial subtle double border */}
            <div className="p-3 bg-[#ffffff] border border-[#e5e5e5] shadow-lg">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f7f7f7]">
                <img
                  src={photoUrl}
                  alt={`${name} — ${line1} & ${line2}`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOUNDER NAME */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light tracking-[0.15em] uppercase mb-4">
          {name}
        </h2>

        {/* EXACT DESIGNATION STRUCTURE */}
        <div className="mb-8 flex flex-col items-center justify-center space-y-1">
          <span className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#111111] font-semibold">
            {line1}
          </span>
          {line2 && (
            <span className="text-xs sm:text-sm tracking-[0.35em] uppercase text-[#888888] font-medium">
              {line2}
            </span>
          )}
          <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-3" />
        </div>

        {/* FOUNDER DESCRIPTION */}
        <div className="max-w-2xl mx-auto space-y-5 text-left sm:text-center">
          {shortDesc && (
            <p className="font-serif italic text-lg sm:text-xl text-[#333333] leading-relaxed font-normal">
              "{shortDesc}"
            </p>
          )}

          {longDesc && (
            <p className="text-sm sm:text-base text-[#555555] font-light leading-relaxed">
              {longDesc}
            </p>
          )}
        </div>

        {/* Optional Action */}
        {onBookDate && (
          <div className="mt-10 sm:mt-12">
            <button
              onClick={onBookDate}
              id="founder-connect-btn"
              className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#111111] hover:bg-[#c5a059] text-[#ffffff] hover:text-[#111111] text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-sm"
            >
              <span>CONNECT WITH {name}</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
