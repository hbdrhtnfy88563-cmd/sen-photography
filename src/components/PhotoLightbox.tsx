import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Sparkles, Calendar } from 'lucide-react';
import { PhotoItem } from '../types';

interface PhotoLightboxProps {
  currentPhoto: PhotoItem | null;
  allPhotos: PhotoItem[];
  onClose: () => void;
  onNavigate: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  currentPhoto,
  allPhotos,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (!currentPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPhoto]);

  if (!currentPhoto) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === currentPhoto.id);

  const handleNext = () => {
    if (allPhotos.length === 0) return;
    const nextIdx = (currentIndex + 1) % allPhotos.length;
    onNavigate(allPhotos[nextIdx]);
  };

  const handlePrev = () => {
    if (allPhotos.length === 0) return;
    const prevIdx = (currentIndex - 1 + allPhotos.length) % allPhotos.length;
    onNavigate(allPhotos[prevIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-2xl flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10 z-10">
        <div className="flex items-center space-x-3 text-xs tracking-[0.25em] text-[#d4af37] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SEN PHOTOGRAPHY ARCHIVE</span>
        </div>

        <div className="flex items-center space-x-6">
          <span className="text-xs text-white/50 tracking-widest font-mono">
            {currentIndex + 1} / {allPhotos.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close Fullscreen View"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* Previous Button */}
        {allPhotos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 z-10 p-3 bg-black/40 hover:bg-[#d4af37] text-white hover:text-[#0c0c0d] border border-white/20 hover:border-[#d4af37] rounded-full transition-all duration-300"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* The Image */}
        <div className="max-w-6xl max-h-[75vh] flex items-center justify-center">
          <img
            src={currentPhoto.image_url}
            alt={currentPhoto.title}
            className="max-h-[75vh] max-w-full object-contain select-none shadow-2xl transition-opacity duration-300"
          />
        </div>

        {/* Next Button */}
        {allPhotos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 z-10 p-3 bg-black/40 hover:bg-[#d4af37] text-white hover:text-[#0c0c0d] border border-white/20 hover:border-[#d4af37] rounded-full transition-all duration-300"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Metadata Bar */}
      <div className="px-6 md:px-12 py-4 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <div>
          <h3 className="font-serif text-lg text-white font-light text-center sm:text-left">
            {currentPhoto.title}
          </h3>
          {currentPhoto.couple_name && (
            <p className="text-xs text-white/50 tracking-wider">
              {currentPhoto.couple_name}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-4 text-[11px] tracking-[0.2em] uppercase text-white/60">
          {currentPhoto.location && (
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-[#d4af37]" />
              <span>{currentPhoto.location}</span>
            </span>
          )}
          {currentPhoto.date && (
            <span className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-[#d4af37]" />
              <span>{currentPhoto.date}</span>
            </span>
          )}
          <span className="text-[#d4af37] font-medium">
            {currentPhoto.subcategory || currentPhoto.category}
          </span>
        </div>
      </div>
    </div>
  );
};
