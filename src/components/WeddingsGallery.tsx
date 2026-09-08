import React, { useState } from 'react';
import { PhotoItem } from '../types';

interface WeddingsGalleryProps {
  photos: PhotoItem[];
  onOpenPhotoFullscreen: (photo: PhotoItem) => void;
}

export const WeddingsGallery: React.FC<WeddingsGalleryProps> = ({
  photos,
  onOpenPhotoFullscreen,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'WEDDINGS', 'PRE-WEDDING', 'CANDID', 'PORTRAITS'];

  const filteredPhotos =
    activeCategory === 'ALL'
      ? photos
      : photos.filter((p) => (p.category || '').toUpperCase() === activeCategory);

  return (
    <section id="weddings" className="py-24 bg-[#0c0c0d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-2 font-light">
            Curated Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-wider uppercase">
            Visual Anthology
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37] mx-auto mt-4"></div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-300 rounded-full border ${
                activeCategory === cat
                  ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10'
                  : 'border-[#2a2a2e] text-gray-400 hover:border-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid without Couple Name, Location, or Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onOpenPhotoFullscreen(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#141416] aspect-[4/5]"
            >
              <img
                src={photo.image_url}
                alt={photo.title || 'Sen Photography'}
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
      </div>
    </section>
  );
};
