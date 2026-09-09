import React from 'react';

interface SectionDividerBannerProps {
  id?: string;
  title: string;
  subtitle?: string;
  bgImage: string;
}

export const SectionDividerBanner: React.FC<SectionDividerBannerProps> = ({
  id,
  title,
  subtitle = 'THE MOMENTS THAT BECOME MEMORIES',
  bgImage,
}) => {
  return (
    <div
      id={id}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* Slow Zoom In / Zoom Out Background Image */}
      <img
        src={bgImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.42] contrast-[1.1] animate-ken-burns will-change-transform"
      />

      {/* Center Cinematic Typography */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.45em] uppercase text-white/80 font-light mb-4 sm:mb-6">
          {subtitle}
        </p>
        
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif text-white tracking-[0.25em] uppercase drop-shadow-2xl mb-6 sm:mb-8 font-normal">
          {title}
        </h2>
        
        <div className="w-16 sm:w-24 h-[1px] bg-[#d4af37] mb-6 sm:mb-8 opacity-75"></div>
        
        <p className="text-[9px] sm:text-[11px] tracking-[0.35em] uppercase text-gray-300/90 font-light flex items-center gap-2">
          <span>SCROLL TO EXPLORE</span>
        </p>

        <div className="w-[1px] h-8 bg-white/40 mt-4 animate-bounce"></div>
      </div>
    </div>
  );
};

export default App;
