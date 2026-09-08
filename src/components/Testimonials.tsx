import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
  heading?: string;
  subtitle?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  heading = 'CUSTOMER REVIEWS',
  subtitle = 'WORDS FROM OUR COUPLES',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="reviews"
      className="py-24 md:py-36 bg-[#000000] text-white relative overflow-hidden border-y border-[#220505]"
    >
      {/* Bold Red Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#dc2626]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#dc2626]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Bold Red Background Watermark Quote */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#dc2626]/[0.05] pointer-events-none select-none">
        <Quote className="w-[500px] h-[500px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Section Header: BLACK + RED THEME */}
        <div className="mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#dc2626]/15 border border-[#dc2626]/40 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
            <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#ff4d4d] font-bold">
              {heading}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight mb-3">
            {subtitle}
          </h2>
          <div className="w-20 sm:w-28 h-[2px] bg-[#dc2626] mx-auto" />
        </div>

        {/* 5-star rating in RED */}
        <div className="flex items-center justify-center space-x-1.5 mb-8 text-[#dc2626]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current text-[#dc2626]" />
          ))}
        </div>

        {/* Big Bold Review Quotation */}
        <div className="min-h-[220px] sm:min-h-[180px] flex items-center justify-center px-4">
          <blockquote className="font-serif text-xl sm:text-3xl md:text-4xl text-[#ffffff] font-light leading-[1.4] italic max-w-4xl transition-all duration-500">
            "{current.quote}"
          </blockquote>
        </div>

        {/* Reviewer Details */}
        <div className="mt-10 flex flex-col items-center">
          {/* Customer Photo with Red border accent */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#dc2626] mb-4 bg-[#111111] shadow-[0_0_25px_rgba(220,38,38,0.3)]">
            {current.photo_url ? (
              <img
                src={current.photo_url}
                alt={current.couple_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs tracking-widest text-[#ff4d4d] font-bold">
                {current.couple_name?.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div className="text-base sm:text-lg tracking-[0.25em] uppercase text-white font-semibold">
            {current.couple_name}
          </div>

          <div className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#ff6b6b] mt-1 font-medium">
            {current.location} {current.event_year && `· ${current.event_year}`}
          </div>

          {current.shoot_type && (
            <div className="mt-3 inline-block px-3.5 py-1 bg-[#1a0505] border border-[#dc2626]/30 text-[10px] tracking-[0.25em] uppercase text-[#ff8080] font-medium">
              {current.shoot_type}
            </div>
          )}
        </div>

        {/* Carousel Controls in Black/Red */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center space-x-6 mt-12">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="p-3 bg-[#111111] hover:bg-[#dc2626] text-white border border-[#333333] hover:border-[#dc2626] transition-colors rounded-full shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-[#dc2626]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next review"
              className="p-3 bg-[#111111] hover:bg-[#dc2626] text-white border border-[#333333] hover:border-[#dc2626] transition-colors rounded-full shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
