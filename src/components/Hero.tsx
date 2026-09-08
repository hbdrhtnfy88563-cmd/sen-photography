import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SiteSettings, HeroImage } from '../types';

interface HeroProps {
  settings: SiteSettings;
  heroImages?: HeroImage[];
  onExploreStories: () => void;
  onBookDate: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  heroImages,
  onExploreStories,
  onBookDate,
}) => {
  // Use active hero images list, fallback to settings.heroImages or single heroImage
  const imagesList: string[] = React.useMemo(() => {
    const fallbackImage = settings?.heroImage || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1920&auto=format&fit=crop';
    const list = (heroImages && heroImages.length > 0)
      ? heroImages.filter(img => img.active !== false).map(img => img.image_url)
      : (settings?.heroImages && settings.heroImages.length > 0)
        ? settings.heroImages.filter(img => img.active !== false).map(img => img.image_url)
        : [fallbackImage];
    return list.length > 0 ? list : [fallbackImage];
  }, [heroImages, settings?.heroImages, settings?.heroImage]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Slideshow interval (default 1000ms = 1 second)
  const intervalMs = Math.max(500, settings?.heroSlideshowInterval || 1000);

  useEffect(() => {
    if (imagesList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesList.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [imagesList.length, intervalMs]);

  // Preload images into browser memory to eliminate flash on 1s transitions
  useEffect(() => {
    imagesList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imagesList]);

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-[#0c0c0d]"
    >
      {/* Cinematic Multi-Image Slideshow Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {imagesList.map((imgSrc, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={`${imgSrc}-${idx}`}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            >
              <img
                src={imgSrc}
                alt={`SEN Photography Luxury Indian Wedding ${idx + 1}`}
                className="w-full h-full object-cover object-center scale-105 animate-slow-zoom brightness-[0.78]"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Multi-layered Cinematic Luxury Overlays (Constant & Fixed) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0d] via-black/45 to-black/65 z-1" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/80 z-1" />
      </div>

      {/* Hero Content (Completely Fixed & Centered) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center mt-12 md:mt-16">
        {/* Small Tagline */}
        <div className="inline-flex items-center space-x-3 mb-5 md:mb-6">
          <span className="w-6 md:w-8 h-[1px] bg-[#d4af37]/80" />
          <span className="text-[10px] md:text-xs tracking-[0.38em] uppercase text-[#e4decb] font-medium">
            SEN PHOTOGRAPHY
          </span>
          <span className="w-6 md:w-8 h-[1px] bg-[#d4af37]/80" />
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#fbf8f2] font-light leading-[1.08] tracking-tight mb-5 md:mb-6 max-w-4xl drop-shadow-2xl">
          {(settings?.heroHeadline || 'YOUR STORY.\nOUR FRAME.').split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br className="hidden sm:inline" />
            </React.Fragment>
          ))}
        </h1>

        {/* Subtitle */}
        <div className="text-xs sm:text-sm md:text-base text-[#d8d3c7] font-light tracking-[0.25em] uppercase mb-9 md:mb-10 max-w-xl leading-relaxed whitespace-pre-line">
          {settings?.heroSubtitle || 'WEDDING PHOTOGRAPHY · FILMS / STORIES'}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={onExploreStories}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-[#fbf8f2] border border-white/30 backdrop-blur-md text-[11px] md:text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg"
          >
            EXPLORE STORIES
          </button>

          <button
            onClick={onBookDate}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-[11px] md:text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-[#d4af37]/25"
          >
            BOOK YOUR DATE
          </button>
        </div>

        {/* Slideshow Progress Counter (Minimalist & Editorial) */}
        {imagesList.length > 1 && (
          <div className="mt-8 flex items-center space-x-2 text-[10px] tracking-[0.3em] text-[#d4af37]/75 font-mono">
            <span>{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="w-6 h-[1px] bg-white/20" />
            <span className="text-white/40">{String(imagesList.length).padStart(2, '0')}</span>
          </div>
        )}
      </div>

      {/* Ambient Bottom Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center opacity-75 hover:opacity-100 transition-opacity cursor-pointer">
        <button
          onClick={onExploreStories}
          className="flex flex-col items-center space-y-1.5 text-white/70 hover:text-[#d4af37] transition-colors group"
          aria-label="Scroll to portfolio stories"
        >
          <span className="text-[9px] tracking-[0.35em] uppercase font-medium">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#d4af37]" />
        </button>
      </div>
    </section>
  );
};
