import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroSocialBar } from './components/HeroSocialBar';
import { FounderSection } from './components/FounderSection';
import { PreWeddings } from './components/PreWeddings';
import { WeddingStoriesSection } from './components/WeddingStoriesSection';
import { WeddingsGallery } from './components/WeddingsGallery';
import { WeddingFilms } from './components/WeddingFilms';
import { MaternityKids } from './components/MaternityKids';
import { InstagramSection } from './components/InstagramSection';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StoryModal } from './components/StoryModal';
import { PhotoLightbox } from './components/PhotoLightbox';
import { AdminDashboard } from './admin/AdminDashboard';
import {
  PhotoItem,
  WeddingStory,
  WeddingFilm,
  Testimonial,
  SiteSettings,
  FounderSettings,
  PreWeddingStory,
  HeroImage
} from './types';
import { api } from './services/api';
import {
  initialSiteSettings,
  initialWeddingStories,
  initialPhotos,
  initialFilms,
  initialTestimonials,
  initialFounder,
  initialPreWeddings,
  initialHeroImages
} from './data/defaultData';

export default function App() {
  // Global Data State
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [founder, setFounder] = useState<FounderSettings>(initialFounder);
  const [heroImages, setHeroImages] = useState<HeroImage[]>(initialHeroImages);
  const [preweddings, setPreweddings] = useState<PreWeddingStory[]>(initialPreWeddings);
  const [stories, setStories] = useState<WeddingStory[]>(initialWeddingStories);
  const [photos, setPhotos] = useState<PhotoItem[]>(initialPhotos);
  const [films, setFilms] = useState<WeddingFilm[]>(initialFilms);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  // View States
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash === '#admin' || window.location.pathname.startsWith('/admin');
  });

  const [selectedStory, setSelectedStory] = useState<WeddingStory | null>(null);
  const [activePhotoLightbox, setActivePhotoLightbox] = useState<PhotoItem | null>(null);

  // Load latest data from backend API
  const refreshData = async () => {
    try {
      const [s, f, h, pw, st, ph, fl, t] = await Promise.all([
        api.getSettings(),
        api.getFounder(),
        api.getHeroImages(),
        api.getPreWeddings(),
        api.getStories(),
        api.getPhotos(),
        api.getFilms(),
        api.getTestimonials()
      ]);

      if (s) setSettings(s);
      if (f) setFounder(f);
      if (Array.isArray(h)) setHeroImages(h);
      if (Array.isArray(pw)) setPreweddings(pw);
      if (Array.isArray(st)) setStories(st);
      if (Array.isArray(ph)) setPhotos(ph);
      if (Array.isArray(fl)) setFilms(fl);
      if (Array.isArray(t)) setTestimonials(t);
    } catch (err) {
      console.error('Failed to fetch latest website data from API:', err);
    }
  };

  useEffect(() => {
    refreshData();

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminView(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenBooking = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreStories = () => {
    const el = document.getElementById('weddings');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPhotoFullscreen = (photo: PhotoItem) => {
    setActivePhotoLightbox(photo);
  };

  const handleOpenPhotoByUrl = (url: string, title: string) => {
    const existing = photos.find((p) => p.image_url === url);
    if (existing) {
      setActivePhotoLightbox(existing);
    } else {
      setActivePhotoLightbox({
        id: `virtual-${Date.now()}`,
        image_url: url,
        title: title || 'Curated Frame',
        category: 'WEDDINGS',
        location: 'Royal Destination',
        couple_name: '',
        date: '',
        featured: false,
        sort_order: 0,
        created_at: new Date().toISOString()
      });
    }
  };

  // If Admin View is active, render dashboard
  if (isAdminView) {
    return (
      <AdminDashboard
        onBackToSite={() => {
          setIsAdminView(false);
          window.location.hash = '';
        }}
        onRefreshData={refreshData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0d] text-[#e8e4dc] font-sans relative selection:bg-[#d4af37]/30 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        settings={settings}
        onOpenBooking={handleOpenBooking}
        onNavigateToAdmin={() => {
          setIsAdminView(true);
          window.location.hash = 'admin';
        }}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Full-Screen Hero (1s Multi-Image Slideshow) */}
        <Hero
          settings={settings}
          heroImages={heroImages}
          onExploreStories={handleExploreStories}
          onBookDate={handleOpenBooking}
        />

        {/* 2. Hero Social Bar (CALL, WHATSAPP, INSTAGRAM directly below Hero) */}
        <HeroSocialBar
          settings={settings}
          phoneNumber={settings?.phoneNumber}
          whatsappNumber={settings?.whatsappNumber}
          instagramUrl={settings?.instagramUrl}
        />

        {/* 3. Founder Section (BEHIND THE LENS, DIPAK Founder & Lead Cinematographer) */}
        <FounderSection
          founder={founder}
          onBookDate={handleOpenBooking}
        />

        {/* 4. Pre-Wedding Stories (PRE-WEDDING / THE BEGINNING OF FOREVER) */}
        <PreWeddings
          stories={preweddings}
          photos={photos}
          onOpenPhotoFullscreen={handleOpenPhotoFullscreen}
          onBookDate={handleOpenBooking}
        />

        {/* 5. Wedding Stories (WEDDING / FOREVER BEGINS HERE) */}
        <WeddingStoriesSection
          stories={stories}
          onSelectStory={(story) => setSelectedStory(story)}
          onBookDate={handleOpenBooking}
        />

        {/* 6. Curated Category Portfolio */}
        <WeddingsGallery
          photos={photos}
          onOpenPhotoFullscreen={handleOpenPhotoFullscreen}
        />

        {/* 7. Cinematic Films (CINEMATIC FILMS / REAL MOMENTS. CINEMATIC STORIES.) */}
        <WeddingFilms films={films} />

        {/* 8. Optional Maternity & Heirlooms Section */}
        {settings?.maternityKidsEnabled && (
          <MaternityKids
            photos={photos}
            onOpenPhotoFullscreen={handleOpenPhotoFullscreen}
            onBookDate={handleOpenBooking}
          />
        )}

        {/* 9. Instagram Showcase */}
        <InstagramSection settings={settings} />

        {/* 10. Testimonials (WORDS FROM OUR COUPLES) */}
        <Testimonials testimonials={testimonials} />

        {/* 11. Contact & Booking (LET'S CAPTURE YOUR STORY) */}
        <ContactSection settings={settings} />
      </main>

      {/* 12. Footer */}
      <Footer
        settings={settings}
        onNavigateToAdmin={() => {
          setIsAdminView(true);
          window.location.hash = 'admin';
        }}
      />

      {/* Dedicated Wedding Story Lightbox Modal */}
      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onOpenPhotoFullscreen={handleOpenPhotoByUrl}
        onPlayFilm={(_videoUrl) => {
          const filmsSec = document.getElementById('films');
          if (filmsSec) {
            setSelectedStory(null);
            filmsSec.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onBookDate={handleOpenBooking}
      />

      {/* Fullscreen Photo Lightbox */}
      <PhotoLightbox
        currentPhoto={activePhotoLightbox}
        allPhotos={photos}
        onClose={() => setActivePhotoLightbox(null)}
        onNavigate={(p) => setActivePhotoLightbox(p)}
      />
    </div>
  );
}
