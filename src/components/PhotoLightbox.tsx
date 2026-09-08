import React, { useEffect } from 'react';
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentPhoto) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPhoto]);

  if (!currentPhoto) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === currentPhoto.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(allPhotos[currentIndex - 1]);
    } else {
      onNavigate(allPhotos[allPhotos.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < allPhotos.length - 1) {
      onNavigate(allPhotos[currentIndex + 1]);
    } else {
      onNavigate(allPhotos[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 z-50 transition-colors"
        title="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev Button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-3 z-50 transition-colors"
        title="Previous"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-3 z-50 transition-colors"
        title="Next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image Only (No couple name, no location, no date) */}
      <div className="max-w-6xl max-h-[90vh] flex flex-col items-center justify-center">
        <img
          src={currentPhoto.image_url}
          alt={currentPhoto.title || 'Sen Photography'}
          className="max-h-[85vh] max-w-full object-contain rounded shadow-2xl select-none"
        />
        {currentPhoto.title && (
          <p className="text-gray-400 text-xs tracking-widest uppercase mt-4">
            {currentPhoto.title}
          </p>
        )}
      </div>
    </div>
  );
};
