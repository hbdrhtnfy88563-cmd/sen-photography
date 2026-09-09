import React from 'react';
import { WeddingStory } from '../types';

interface WeddingStoriesProps {
  stories: WeddingStory[];
  onSelectStory: (story: WeddingStory) => void;
  onBookDate: () => void;
}

export const WeddingStoriesSection: React.FC<WeddingStoriesProps> = ({
  stories,
  onSelectStory,
}) => {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto bg-[#0c0c0d]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="group cursor-pointer flex flex-col items-center select-none"
          >
            {/* क्लीन विजुअल फ्रेम */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/60 rounded-sm">
              <img
                src={story.cover_image}
                alt={story.title}
                className="w-full h-full object-cover brightness-[0.92] contrast-[1.05] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              />
            </div>

            {/* केवल बोल्ड लाइन और एक्सपैंडिंग गोल्ड एनिमेशन */}
            <div className="mt-5 text-center flex flex-col items-center">
              <h3 className="text-sm sm:text-base font-serif font-bold uppercase tracking-[0.25em] text-white group-hover:text-[#d4af37] transition-colors duration-300">
                {story.title || story.couple_name}
              </h3>
              <span className="h-[2px] w-0 bg-[#d4af37] mt-2 group-hover:w-16 transition-all duration-500 ease-in-out"></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
