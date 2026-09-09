import React, { useState } from 'react';
import { WeddingFilm } from '../types';
import { Play } from 'lucide-react';

interface WeddingFilmsProps {
  films: WeddingFilm[];
}

export const WeddingFilms: React.FC<WeddingFilmsProps> = ({ films }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const id = match && match[2].length === 11 ? match[2] : null;
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
    }
    return url;
  };

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto bg-[#0c0c0d]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {films.map((film) => (
          <div
            key={film.id}
            onClick={() => setActiveVideo(film.video_url)}
            className="group cursor-pointer flex flex-col items-center select-none"
          >
            <div className="relative w-full aspect-video overflow-hidden bg-black/60 rounded-sm">
              <img
                src={film.cover_image}
                alt={film.title}
                className="w-full h-full object-cover brightness-[0.9] contrast-[1.05] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                <div className="w-14 h-14 rounded-full border border-white/60 bg-black/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-all duration-300">
                  <Play className="w-5 h-5 ml-1 fill-current" />
                </div>
              </div>
            </div>

            <div className="mt-5 text-center flex flex-col items-center">
              <h3 className="text-sm sm:text-base font-serif font-bold uppercase tracking-[0.25em] text-white group-hover:text-[#d4af37] transition-colors duration-300">
                {film.title || film.couple_name}
              </h3>
              <span className="h-[2px] w-0 bg-[#d4af37] mt-2 group-hover:w-16 transition-all duration-500 ease-in-out"></span>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black shadow-2xl">
            <iframe
              src={getEmbedUrl(activeVideo)}
              title="Cinematic Film"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};
