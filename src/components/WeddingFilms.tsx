import React, { useState } from 'react';
import { Play, X, Clock, MapPin } from 'lucide-react';
import { WeddingFilm } from '../types';

interface WeddingFilmsProps {
  films: WeddingFilm[];
}

export const WeddingFilms: React.FC<WeddingFilmsProps> = ({ films }) => {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const featuredFilm = films[0] || {
    id: 'default',
    title: 'Echoes of Udaipur — The Royal Union',
    couple_name: 'Aarav & Meera',
    location: 'The Oberoi Udaivilas, Udaipur',
    duration: '4:32',
    cover_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
    video_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    description: 'A cinematic film capturing royal palace courtyards, quiet tears, and midnight celebrations on Lake Pichola.'
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (url.includes('vimeo.com/')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <section id="films" className="relative py-28 md:py-40 bg-[#070708] text-[#e8e4dc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header: EXACT requested structure */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#d4af37] font-semibold block mb-2">
            CINEMATIC FILMS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#fbf8f2] font-light tracking-tight mb-2">
            REAL MOMENTS.
          </h2>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#d4af37] font-light tracking-tight mb-4">
            CINEMATIC STORIES.
          </h2>
          {/* Thin elegant line */}
          <div className="w-24 sm:w-32 h-[1px] bg-[#d4af37]/60 mx-auto" />
          <p className="text-xs md:text-sm text-white/50 tracking-wider font-light max-w-md mx-auto mt-4">
            Shot on cinema-grade cameras with bespoke analog color grading, immersive audio, and true emotion in every transition.
          </p>
        </div>

        {/* Featured Main Film Container */}
        <div className="relative aspect-[16/9] max-h-[700px] w-full overflow-hidden border border-white/10 group shadow-2xl bg-black">
          <img
            src={featuredFilm.cover_image}
            alt={featuredFilm.title}
            className="w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30" />

          {/* Central Circular Play Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button
              onClick={() => setActiveVideo({ url: featuredFilm.video_url, title: featuredFilm.title })}
              className="group/btn relative w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-white/40 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#d4af37] hover:bg-[#d4af37] cursor-pointer"
              aria-label="Play Featured Wedding Film"
            >
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/40 animate-ping pointer-events-none" />
              <Play className="w-7 h-7 sm:w-9 sm:h-9 text-white group-hover/btn:text-[#0c0c0d] fill-current ml-1 transition-colors" />
            </button>

            <span className="text-[11px] tracking-[0.3em] uppercase text-white/80 font-light mt-6 drop-shadow">
              PLAY FEATURED FILM
            </span>
          </div>

          {/* Bottom Film Details */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 flex flex-col sm:flex-row sm:items-end justify-between pointer-events-none">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.25em] text-[#d4af37] uppercase">
                <MapPin className="w-3 h-3" />
                <span>{featuredFilm.location}</span>
                {featuredFilm.couple_name && <span>· {featuredFilm.couple_name}</span>}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                {featuredFilm.title}
              </h3>
            </div>
            <div className="flex items-center space-x-2 text-xs text-white/60 tracking-wider mt-2 sm:mt-0 font-light">
              <Clock className="w-3.5 h-3.5" />
              <span>{featuredFilm.duration}</span>
            </div>
          </div>
        </div>

        {/* Additional Films Grid */}
        {films.length > 1 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {films.slice(1).map((film) => (
              <div
                key={film.id}
                onClick={() => setActiveVideo({ url: film.video_url, title: film.title })}
                className="group relative aspect-[16/9] overflow-hidden border border-white/10 bg-black/40 cursor-pointer"
              >
                <img
                  src={film.cover_image}
                  alt={film.title}
                  className="w-full h-full object-cover brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#d4af37] group-hover:text-[#0c0c0d] transition-all">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase">
                    {film.location} {film.couple_name && `· ${film.couple_name}`}
                  </span>
                  <h4 className="font-serif text-lg text-white font-light truncate">
                    {film.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
            aria-label="Close Video"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-5xl aspect-[16/9] bg-black shadow-2xl border border-white/10 overflow-hidden">
            <iframe
              src={getEmbedUrl(activeVideo.url)}
              title={activeVideo.title}
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
