import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';
import { PhotoItem } from '../types';

interface MaternityKidsProps {
  photos: PhotoItem[];
  introImage?: string;
  introSubtitle?: string;
  introTitle?: string;
  onOpenPhotoFullscreen?: (photo: PhotoItem) => void;
  onBookDate: () => void;
}

export const MaternityKids: React.FC<MaternityKidsProps> = ({
  photos,
  introImage = 'https://images.unsplash.com/photo-1544126592-807ade215a0f?auto=format&fit=crop&w=2400&q=85',
  introSubtitle = 'THE SACRED CHAPTERS',
  introTitle = 'MATERNITY & KIDS',
  onBookDate,
}) => {
  const [activeLightboxImg, setActiveLightboxImg] = useState<PhotoItem | null>(null);

  const familyPhotos = photos.filter(
    (p) => p.category.toUpperCase() === 'MATERNITY' || p.category.toUpperCase() === 'KIDS'
  );

  return (
    <section id="maternity-kids" className="relative w-full">
      {/* ===================================================
          01. FULL-SCREEN CINEMATIC INTRODUCTORY IMAGE
          - 100% viewport width & height
          - NO border, no card frame, no rounded corners
          - Slow smooth zoom OUT
          - Dark cinematic overlay
          =================================================== */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-black">
        {/* Slow Zoom-Out Background */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 ease-out will-change-transform animate-slow-zoom-out"
          style={{
            backgroundImage: `url(${introImage})`,
          }}
        />

        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Intro Text */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs sm:text-sm tracking-[0.45em] uppercase text-[#f5f5f5] font-light mb-4 block drop-shadow-md">
            {introSubtitle}
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light tracking-[0.15em] uppercase mb-5 drop-shadow-lg">
            {introTitle}
          </h2>

          <div className="w-24 sm:w-36 h-[1px] bg-white/70 mx-auto mb-6" />

          <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/80 font-medium mb-4">
            SCROLL TO EXPLORE
          </span>

          <div className="flex flex-col items-center">
            <div className="w-[1px] h-10 sm:h-14 bg-gradient-to-b from-white to-transparent animate-pulse" />
            <span className="text-white/70 text-xs mt-1 animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* ===================================================
          02. MATERNITY & KIDS GALLERY
          - WHITE background with premium photo borders
          - Caption/text underneath every photo
          =================================================== */}
      <div className="bg-[#ffffff] text-[#111111] py-24 md:py-36 px-6 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-xs tracking-[0.35em] uppercase text-[#777777] font-semibold block mb-2">
              PRECIOUS HEIRLOOMS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-light tracking-tight">
              A New Beginning
            </h3>
            <div className="w-16 h-[1.5px] bg-[#c5a059] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {familyPhotos.map((photo) => {
              const captionText = photo.caption || photo.title || 'THE SACRED GIFT OF LIFE';
              return (
                <div
                  key={photo.id}
                  className="group flex flex-col"
                >
                  {/* Framed Photo */}
                  <div
                    onClick={() => setActiveLightboxImg(photo)}
                    className="relative cursor-pointer p-3 sm:p-4 bg-[#ffffff] border border-[#e2e2e2] shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-[#c5a059]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f3f3]">
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-4 py-2 bg-[#111111]/90 text-white text-xs tracking-[0.2em] uppercase font-medium flex items-center space-x-2 backdrop-blur-sm">
                          <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>ENLARGE</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Caption/Title Underneath Photo */}
                  <div className="mt-4 text-center sm:text-left">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#777777] font-medium block mb-1">
                      {photo.category}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal tracking-wide">
                      {photo.title}
                    </h4>
                    <div className="py-2 my-2 border-y border-[#eeeeee]">
                      <p className="font-serif italic text-sm text-[#444444] tracking-wide">
                        "{captionText}"
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={onBookDate}
              id="maternity-inquire-btn"
              className="inline-flex items-center space-x-3 px-8 sm:px-10 py-3.5 bg-[#111111] hover:bg-[#c5a059] text-white hover:text-[#111111] text-xs tracking-[0.3em] uppercase font-medium transition-all duration-300 shadow-sm"
            >
              <span>INQUIRE FOR MATERNITY & KIDS PORTRAITS</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeLightboxImg && (
        <div
          onClick={() => setActiveLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-h-[92vh] max-w-[95vw] flex flex-col items-center">
            <img
              src={activeLightboxImg.image_url}
              alt={activeLightboxImg.title}
              className="max-h-[82vh] max-w-[95vw] object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-serif text-xl">{activeLightboxImg.title}</h3>
              <p className="font-serif italic text-white/70 text-sm mt-1">
                "{activeLightboxImg.caption || activeLightboxImg.title}"
              </p>
            </div>
          </div>
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
