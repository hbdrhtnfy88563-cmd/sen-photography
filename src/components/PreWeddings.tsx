import React from 'react';
import { PreWeddingStory, PhotoItem } from '../types';

interface PreWeddingsProps {
  stories: PreWeddingStory[];
  photos: PhotoItem[];
  onOpenPhotoFullscreen: (photo: PhotoItem) => void;
  onBookDate: () => void;
}

export const PreWeddings: React.FC<PreWeddingsProps> = ({
  stories,
  photos,
  onOpenPhotoFullscreen,
  onBookDate,
}) => {
  const displayPhotos = photos.filter(
    (p) => (p.category || '').toUpperCase() === 'PRE-WEDDING'
  );

  return (
    <section id="preweddings" className="py-24 bg-[#0a0a0b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-2 font-light">
            The Beginning Of Forever
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-wider uppercase">
            Pre-Wedding Chronicles
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-4"></div>
        </div>

        {/* Clean Photos Grid (No couple name, location, or date) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPhotos.slice(0, 6).map((photo) => (
            <div
              key={photo.id}
              onClick={() => onOpenPhotoFullscreen(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#141416] aspect-[4/5]"
            >
              <img
                src={photo.image_url}
                alt={photo.title || 'Pre-Wedding'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                  View Frame
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onBookDate}
            className="px-8 py-3 bg-[#d4af37] hover:bg-[#c49f2e] text-black text-xs uppercase tracking-widest font-semibold rounded-full transition-colors"
          >
            Inquire For Dates
          </button>
        </div>
      </div>
    </section>
  );
};
