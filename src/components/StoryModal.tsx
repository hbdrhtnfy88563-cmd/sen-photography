import React, { useEffect } from 'react';
import { WeddingStory } from '../types';

interface StoryModalProps {
  story: WeddingStory | null;
  onClose: () => void;
  onOpenPhotoFullscreen: (url: string, title: string) => void;
  onPlayFilm?: (videoUrl: string) => void;
  onBookDate: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onOpenPhotoFullscreen,
  onBookDate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-5xl bg-[#111113] border border-[#2a2a2e] rounded-xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white bg-black/50 rounded-full p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Banner (No Couple Name, No Location, No Date) */}
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={story.cover_image}
            alt={story.title || 'Wedding Story'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <h2 className="text-2xl sm:text-4xl font-serif text-white uppercase tracking-wider">
              {story.title || 'Wedding Chronicle'}
            </h2>
          </div>
        </div>

        {/* Story Description */}
        <div className="p-6 sm:p-10">
          <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-3xl">
            {story.description}
          </p>

          {/* Photo Gallery inside Story */}
          {story.gallery && story.gallery.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {story.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenPhotoFullscreen(imgUrl, story.title || 'Gallery Frame')}
                  className="aspect-[4/5] rounded-lg overflow-hidden cursor-pointer group bg-black/40"
                >
                  <img
                    src={imgUrl}
                    alt={`Frame ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center pt-6 border-t border-[#222]">
            <button
              onClick={() => {
                onClose();
                onBookDate();
              }}
              className="px-8 py-3 bg-[#d4af37] hover:bg-[#c49f2e] text-black text-xs uppercase tracking-widest font-semibold rounded-full transition-colors"
            >
              Inquire For Your Celebration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
