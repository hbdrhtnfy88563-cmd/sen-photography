import React, { useState } from 'react';
import { ArrowRight, Eye, MapPin, X, ChevronDown, ChevronUp } from 'lucide-react';
import { PreWeddingStory, PhotoItem } from '../types';

interface PreWeddingsProps {
  stories: PreWeddingStory[];
  photos?: PhotoItem[];
  introImage?: string;
  introSubtitle?: string;
  introTitle?: string;
  initialVisibleCount?: number;
  onOpenPhotoFullscreen?: (photo: PhotoItem) => void;
  onBookDate: () => void;
}

export const PreWeddings: React.FC<PreWeddingsProps> = ({
  stories,
  introImage = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=85',
  introSubtitle = 'THE BEGINNING OF FOREVER',
  introTitle = 'PRE-WEDDING',
  initialVisibleCount = 4,
  onOpenPhotoFullscreen,
  onBookDate,
}) => {
  const [activeStory, setActiveStory] = useState<PreWeddingStory | null>(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleLimit = isExpanded ? stories.length : (initialVisibleCount || 4);
  const displayedStories = stories.slice(0, visibleLimit);
  const canToggle = stories.length > (initialVisibleCount || 4);

  return (
    <section id="pre-weddings" className="relative w-full">
      {/* ===================================================
          01. FULL-SCREEN INTRODUCTORY CINEMATIC IMAGE
          - 100% viewport width & 100% viewport height
          - NO border, no card frame, no rounded corners
          - Slow smooth zoom OUT
          - Dark overlay for readable white text
          =================================================== */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-black">
        {/* Slow Zoom-Out Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out will-change-transform animate-slow-zoom-out"
          style={{
            backgroundImage: `url(${introImage})`,
          }}
        />

        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Intro Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          {/* Small uppercase text above */}
          <span className="text-xs sm:text-sm tracking-[0.45em] uppercase text-[#f5f5f5] font-light mb-4 block drop-shadow-md">
            {introSubtitle}
          </span>

          {/* Larger text: PRE-WEDDING */}
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.15em] uppercase mb-5 drop-shadow-lg">
            {introTitle}
          </h2>

          {/* Thin elegant horizontal line */}
          <div className="w-24 sm:w-36 h-[1px] bg-white/70 mx-auto mb-6" />

          {/* SCROLL TO EXPLORE */}
          <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/80 font-medium mb-4">
            SCROLL TO EXPLORE
          </span>

          {/* Animated scroll indicator */}
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-10 sm:h-14 bg-gradient-to-b from-white to-transparent animate-pulse" />
            <span className="text-white/70 text-xs mt-1 animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* ===================================================
          02. PRE-WEDDING PHOTOS GALLERY
          - WHITE background with premium photo borders
          - Editorial wedding-photography layout
          - Underneath post caption line (e.g. A MOMENT WE WILL ALWAYS REMEMBER)
          - SHOW MORE / SHOW LESS toggle
          =================================================== */}
      <div className="bg-[#ffffff] text-[#111111] py-24 md:py-36 px-6 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Subhead */}
          <div className="text-center mb-16 md:mb-24">
            <span className="text-xs tracking-[0.35em] uppercase text-[#777777] font-semibold block mb-2">
              CURATED STORIES
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light tracking-tight">
              Before the Vows
            </h3>
            <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-4" />
          </div>

          {/* Editorial Photo Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {displayedStories.map((story, index) => {
              const captionLine = story.caption || 'A MOMENT WE WILL ALWAYS REMEMBER';
              return (
                <article
                  key={story.id}
                  className="group flex flex-col"
                >
                  {/* Premium Framed Photo Container */}
                  <div
                    onClick={() => setActiveStory(story)}
                    className="relative cursor-pointer p-3 sm:p-4 bg-[#ffffff] border border-[#e2e2e2] shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-[#c5a059]"
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#f3f3f3]">
                      <img
                        src={story.cover_image}
                        alt={`${story.couple_name} in ${story.location}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-5 py-2.5 bg-[#111111]/90 text-white text-xs tracking-[0.25em] uppercase font-medium flex items-center space-x-2 backdrop-blur-sm border border-white/20">
                          <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>VIEW GALLERY</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Elegant Details & Underneath Post Caption Line */}
                  <div className="mt-5 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs tracking-[0.25em] uppercase text-[#777777] mb-2 font-medium">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>{story.location}</span>
                      </span>
                      {story.date && (
                        <>
                          <span>·</span>
                          <span>{story.date}</span>
                        </>
                      )}
                    </div>

                    <h4 className="font-serif text-2xl sm:text-3xl text-[#111111] font-normal tracking-wide mb-2">
                      {story.couple_name}
                    </h4>

                    {/* PHOTO CAPTION / LINE UNDERNEATH EVERY POST */}
                    <div className="py-2 mb-3 border-y border-[#eeeeee]">
                      <p className="font-serif italic text-sm sm:text-base text-[#444444] tracking-wide">
                        "{captionLine}"
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed line-clamp-2 mb-4">
                      {story.description}
                    </p>

                    <button
                      onClick={() => setActiveStory(story)}
                      className="inline-flex items-center space-x-2 text-xs tracking-[0.25em] uppercase font-semibold text-[#111111] group-hover:text-[#c5a059] transition-colors"
                    >
                      <span>EXPLORE STORY</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ===================================================
              SHOW MORE / SHOW LESS TOGGLE BUTTON
              =================================================== */}
          {canToggle && (
            <div className="mt-16 md:mt-24 text-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                id="prewedding-toggle-btn"
                className="inline-flex items-center space-x-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#111111] hover:bg-[#c5a059] text-white hover:text-[#111111] text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold transition-all duration-300 shadow-md"
              >
                <span>{isExpanded ? 'SHOW LESS' : 'SHOW MORE'}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Story Modal Lightbox */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-[#111111] border border-white/10 p-6 sm:p-10 my-auto text-white">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <span className="text-xs tracking-[0.3em] uppercase text-[#c5a059] font-medium">
                {activeStory.location} · {activeStory.date}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
                {activeStory.couple_name}
              </h3>
              <p className="font-serif italic text-white/70 mt-2 text-sm sm:text-base">
                "{activeStory.caption || 'A MOMENT WE WILL ALWAYS REMEMBER'}"
              </p>
              <p className="text-xs sm:text-sm text-white/60 font-light max-w-2xl mx-auto mt-3">
                {activeStory.description}
              </p>
            </div>

            {/* Gallery Grid inside story */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[55vh] overflow-y-auto pr-2">
              {activeStory.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxImg(img)}
                  className="relative aspect-[3/2] overflow-hidden cursor-pointer bg-black/50 border border-white/10 group"
                >
                  <img
                    src={img}
                    alt={`${activeStory.couple_name} - ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  setActiveStory(null);
                  onBookDate();
                }}
                className="px-6 py-3 bg-[#c5a059] text-black text-xs tracking-[0.25em] uppercase font-semibold hover:bg-white transition-colors"
              >
                BOOK YOUR PRE-WEDDING
              </button>
              <button
                onClick={() => setActiveStory(null)}
                className="px-6 py-3 border border-white/20 text-white text-xs tracking-[0.25em] uppercase hover:bg-white/10 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Individual Photo Fullscreen Lightbox */}
      {activeLightboxImg && (
        <div
          onClick={() => setActiveLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={activeLightboxImg}
            alt="Enlarged view"
            className="max-h-[92vh] max-w-[95vw] object-contain shadow-2xl"
          />
          <button
            onClick={() => setActiveLightboxImg(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
};
