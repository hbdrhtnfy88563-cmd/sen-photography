import React, { useState } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';
import { PhotoItem } from '../types';

interface WeddingsGalleryProps {
  photos: PhotoItem[];
  onOpenPhotoFullscreen: (photo: PhotoItem) => void;
}

export const WeddingsGallery: React.FC<WeddingsGalleryProps> = ({
  photos,
  onOpenPhotoFullscreen,
}) => {
  const [activeSubcategory, setActiveSubcategory] = useState<string>('ALL');

  const subcategories = [
    'ALL',
    'Wedding Ceremonies',
    'Bride',
    'Groom',
    'Couples',
    'Candid Moments',
    'Details',
    'Reception',
    'Dance'
  ];

  // Filter only wedding photos
  const weddingPhotos = photos.filter(p => p.category.toUpperCase() === 'WEDDINGS');

  const filteredPhotos = activeSubcategory === 'ALL'
    ? weddingPhotos
    : weddingPhotos.filter(p => (p.subcategory || '').toLowerCase() === activeSubcategory.toLowerCase());

  return (
    <section id="weddings" className="py-24 md:py-36 bg-[#0c0c0d] text-[#e8e4dc]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#d4af37] font-medium block mb-3">
            ROYAL CELEBRATIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fbf8f2] font-light tracking-tight mb-6">
            WEDDING GALLERY
          </h2>
          <p className="text-xs md:text-sm text-white/50 tracking-wider font-light max-w-xl mx-auto">
            A curated anthology of sacred rituals, regal bridal portraits, grand sangeet rhythms, and quiet candid glances.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-12 scrollbar-none space-x-2 md:space-x-3 text-xs">
          {subcategories.map((sub) => {
            const isActive = activeSubcategory.toLowerCase() === sub.toLowerCase();
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`whitespace-nowrap px-4 py-2 transition-all duration-300 uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-medium border ${
                  isActive
                    ? 'bg-[#d4af37] text-[#0c0c0d] border-[#d4af37]'
                    : 'bg-white/[0.02] text-white/60 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20 text-white/40 text-sm tracking-widest font-light">
            No photographs under this category currently.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onOpenPhotoFullscreen(photo)}
                className="group relative break-inside-avoid overflow-hidden bg-black/50 border border-white/5 cursor-pointer"
              >
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.9] group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center space-x-2 text-[9px] tracking-[0.25em] text-[#d4af37] uppercase">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{photo.subcategory || photo.category}</span>
                      {photo.location && <span>· {photo.location}</span>}
                    </div>
                    <h3 className="font-serif text-lg text-white font-light">
                      {photo.title}
                    </h3>
                    {photo.couple_name && (
                      <p className="text-[11px] text-white/60 font-light">
                        {photo.couple_name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
