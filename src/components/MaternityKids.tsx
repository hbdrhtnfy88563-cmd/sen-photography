import React from 'react';
import { PhotoItem } from '../types';

interface MaternitySectionProps {
  photos: PhotoItem[];
  onOpenPhotoFullscreen: (photo: PhotoItem) => void;
  onBookDate: () => void;
}

// अगर डेटाबेस में इमेज न हो तो यह हाई-रिज़ॉल्यूशन फ़ोटो खुद लोड होगी (ब्लैक स्क्रीन कभी नहीं आएगी)
const DEFAULT_BANNER_IMG = "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=2000&q=85";

export const MaternitySection: React.FC<MaternitySectionProps> = ({
  photos,
  onOpenPhotoFullscreen,
  onBookDate,
}) => {
  // मैटरनिटी फ़ोटोज़ फ़िल्टर
  const maternityPhotos = photos.filter(
    (p) => p.category === 'MATERNITY' || p.category === 'KIDS' || p.category === 'MATERNITY & KIDS'
  );

  // डिफ़ॉल्ट 4 फ़ोटो अगर एडमिन से अपलोड न हुई हों
  const displayPhotos = maternityPhotos.length > 0 ? maternityPhotos : [
    { id: 'm1', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'PURE MOTHERHOOD' },
    { id: 'm2', image_url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80', title: 'LITTLE MIRACLES' },
    { id: 'm3', image_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', title: 'INNOCENCE & JOY' },
    { id: 'm4', image_url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80', title: 'ETERNAL BONDS' },
  ];

  return (
    <div id="maternity" className="w-full">
      {/* 1. फुल-स्क्रीन सिनेमैटिक फ़ोटो बैनर (काली स्क्रीन कभी नहीं आएगी) */}
      <div className="relative w-full h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden bg-black select-none">
        <img
          src={DEFAULT_BANNER_IMG}
          alt="Maternity and Kids"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.55] contrast-[1.08] scale-105 transition-transform duration-1000"
        />
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <span className="text-[10px] sm:text-xs tracking-[0.35em] text-[#d4af37] uppercase font-mono mb-2">
            THE SACRED CHAPTERS
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif italic text-white tracking-wide capitalize drop-shadow-2xl mb-4">
            maternity & kids
          </h2>
          <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-white/80 font-light">
            SCROLL TO EXPLORE
          </p>
        </div>
      </div>

      {/* 2. व्हाइट बैकग्राउंड पर 4-कॉलम फ़ोटो ग्रिड (Pre-Wedding जैसा सेम लेआउट) */}
      <section className="bg-white text-black py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          {/* सब-हेडर */}
          <div className="flex items-center space-x-3 mb-10">
            <span className="w-8 h-[1px] bg-black/60"></span>
            <h3 className="text-xs sm:text-sm tracking-[0.25em] uppercase font-medium text-black/80">
              LATEST MATERNITY & KIDS
            </h3>
          </div>

          {/* 4-कॉलम ग्रिड */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPhotos.slice(0, 8).map((photo: any) => (
              <div
                key={photo.id}
                onClick={() => onOpenPhotoFullscreen(photo)}
                className="group cursor-pointer flex flex-col items-center select-none"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src={photo.image_url}
                    alt={photo.title || 'Maternity'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* सिर्फ 1 बोल्ड लाइन टाइटल */}
                <div className="mt-4 text-center">
                  <h4 className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.2em] text-black/90 group-hover:text-[#b38a22] transition-colors">
                    {photo.title || 'SACRED MOMENTS'}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* एक्सप्लोर मोर बटन */}
          <div className="mt-14 flex justify-center">
            <button
              onClick={onBookDate}
              className="px-8 py-3 border border-black/30 hover:border-black text-[10px] tracking-[0.25em] uppercase font-semibold text-black transition-all hover:bg-black hover:text-white"
            >
              EXPLORE MORE →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
