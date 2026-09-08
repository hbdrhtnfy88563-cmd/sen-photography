import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Sparkles, Play, Maximize2 } from 'lucide-react';
import { WeddingStory } from '../types';

interface StoryModalProps {
  story: WeddingStory | null;
  onClose: () => void;
  onOpenPhotoFullscreen: (imageUrl: string, title: string) => void;
  onPlayFilm: (videoUrl: string, title: string) => void;
  onBookDate: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onOpenPhotoFullscreen,
  onPlayFilm,
  onBookDate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (story) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl animate-fadeIn">
      {/* Top Bar with Close */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-5 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center space-x-3 text-xs tracking-[0.25em] text-[#d4af37] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WEDDING STORY</span>
        </div>
        
        <button
          onClick={onClose}
          className="flex items-center space-x-2 px-4 py-2 text-xs tracking-[0.2em] text-white/70 hover:text-white border border-white/20 hover:border-[#d4af37] transition-colors uppercase"
          aria-label="Close Story"
        >
          <span>CLOSE</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Banner for Story */}
      <div className="relative h-[65vh] min-h-[420px] w-full overflow-hidden">
        <img
          src={story.cover_image}
          alt={story.title}
          className="w-full h-full object-cover brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        <div className="absolute bottom-10 left-0 right-0 max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.25em] text-[#d4af37] uppercase font-light mb-3">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {story.location}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {story.date}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-light tracking-tight mb-2">
            {story.title}
          </h1>

          <p className="text-sm md:text-base text-white/75 tracking-wider font-light">
            {story.subtitle}
          </p>
        </div>
      </div>

      {/* Story Content & Narrative */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif text-2xl md:text-3xl text-[#f4eee0] font-light">
              The Celebration & Narrative
            </h2>
            <p className="text-base text-white/70 leading-relaxed font-light">
              {story.description}
            </p>

            {story.film_url && (
              <div className="pt-4">
                <button
                  onClick={() => onPlayFilm(story.film_url!, `${story.title} · Wedding Film`)}
                  className="inline-flex items-center space-x-3 px-6 py-3 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-xs tracking-[0.2em] uppercase transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>WATCH CINEMATIC FILM</span>
                </button>
              </div>
            )}
          </div>

          {/* Highlights Sidebar */}
          <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 p-6 md:p-8 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-semibold block">
              STORY HIGHLIGHTS
            </span>
            <ul className="space-y-4 text-xs text-white/80 leading-relaxed font-light">
              {story.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="text-[#d4af37] text-base leading-none">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37]">
                PHOTOGRAPHY
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
                Curated Frames
              </h3>
            </div>
            <span className="text-xs text-white/40 tracking-widest">
              {story.gallery.length} PHOTOGRAPHS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {story.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => onOpenPhotoFullscreen(imgUrl, `${story.title} — Frame ${idx + 1}`)}
                className="group relative aspect-[4/5] bg-black/40 overflow-hidden cursor-pointer border border-white/5"
              >
                <img
                  src={imgUrl}
                  alt={`${story.title} photography ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Footer CTA */}
        <div className="mt-24 pt-12 border-t border-white/10 text-center flex flex-col items-center space-y-6">
          <h4 className="font-serif text-3xl sm:text-4xl text-white font-light">
            Plan your wedding with Sen Photography
          </h4>
          <p className="text-sm text-white/60 max-w-md font-light">
            Each celebration is documented with profound artistry and tailored cinema.
          </p>
          <button
            onClick={() => {
              onClose();
              onBookDate();
            }}
            className="px-8 py-3.5 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-xs tracking-[0.25em] uppercase transition-all"
          >
            INQUIRE FOR YOUR DATES
          </button>
        </div>
      </div>
    </div>
  );
};
