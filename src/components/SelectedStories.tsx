import React from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { WeddingStory } from '../types';

interface SelectedStoriesProps {
  stories: WeddingStory[];
  onSelectStory: (story: WeddingStory) => void;
}

export const SelectedStories: React.FC<SelectedStoriesProps> = ({
  stories,
  onSelectStory,
}) => {
  const displayStories = stories.length > 0 ? stories : [];

  return (
    <section id="stories" className="py-24 md:py-36 bg-[#0a0a0b] text-[#e8e4dc]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#d4af37] font-medium block mb-3">
              PORTFOLIO HIGHLIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fbf8f2] font-light tracking-tight">
              SELECTED STORIES
            </h2>
          </div>

          <p className="text-xs md:text-sm text-white/50 tracking-wider max-w-sm mt-4 md:mt-0 font-light">
            Every couple is an original narrative of legacy, intimate romance, and royal celebration.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {displayStories.map((story, index) => {
            // Asymmetric layout logic for magazine cadence
            const isLarge = index % 3 === 0;
            const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4';
            const aspect = isLarge ? 'aspect-[16/11]' : 'aspect-[4/5]';

            return (
              <div
                key={story.id}
                onClick={() => onSelectStory(story)}
                className={`${colSpan} group cursor-pointer flex flex-col`}
              >
                {/* Image Frame */}
                <div className={`relative w-full ${aspect} overflow-hidden bg-black/50 border border-white/5`}>
                  <img
                    src={story.cover_image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.88] group-hover:brightness-100"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Corner Accent Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
                  </div>

                  {/* Mobile Tag */}
                  <div className="absolute bottom-4 left-4 md:hidden">
                    <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase bg-black/60 px-2 py-1 backdrop-blur-sm">
                      {story.location.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Editorial Caption */}
                <div className="pt-5 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-light">
                      <MapPin className="w-3 h-3" />
                      <span>{story.location}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-[#f4eee0] font-light group-hover:text-[#d4af37] transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-xs text-white/50 tracking-wider font-light">
                      {story.subtitle}
                    </p>
                  </div>

                  <span className="hidden md:inline-block text-[11px] text-white/40 tracking-widest font-serif italic pt-2">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
