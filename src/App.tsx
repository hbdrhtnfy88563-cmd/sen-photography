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

  // सुरक्षा स्टेट: पासवर्ड लॉक और व्यू टॉगल
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState('');

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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (loginEmail.trim() === 'sen001@gmail.com' || loginEmail.trim() === 'admin') &&
      loginPassword === 'Sen@2323'
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('गलत ईमेल या पासवर्ड! कृपया दोबारा जांचें।');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsAuthenticated(false);
    setIsAdminView(false);
    window.location.hash = '';
  };

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

  // एडमिन व्यू: पासवर्ड लॉक गार्ड स्क्रीन
  if (isAdminView) {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#0c0c0d] flex items-center justify-center p-4">
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-3 text-[#d4af37]">
                🔒
              </div>
              <h2 className="text-xl font-serif tracking-widest text-[#d4af37] uppercase">SEN PHOTOGRAPHY</h2>
              <p className="text-xs text-gray-400 mt-1">STUDIO ADMINISTRATIVE PORTAL</p>
            </div>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-lg mb-4 text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Admin Username</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="sen001@gmail.com"
                  required
                  className="w-full bg-[#1b1b1e] border border-[#2a2a2e] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#1b1b1e] border border-[#2a2a2e] rounded-lg pl-4 pr-11 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#d4af37] transition-colors"
                    title={showPassword ? 'पासवर्ड छिपाएं' : 'पासवर्ड देखें'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.772M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#c49f2e] text-black font-semibold uppercase tracking-wider py-3 rounded-lg transition-colors text-xs"
              >
                Unlock Admin Console
              </button>
            </form>

            <button
              onClick={() => {
                setIsAdminView(false);
                window.location.hash = '';
              }}
              className="mt-6 text-xs text-gray-400 hover:text-white block w-full text-center"
            >
              ← Back to live site
            </button>
          </div>
        </div>
      );
    }

    return (
      <AdminDashboard
        onBackToSite={handleLogout}
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
        {/* 1. Full-Screen Hero */}
        <Hero
          settings={settings}
          heroImages={heroImages}
          onExploreStories={handleExploreStories}
          onBookDate={handleOpenBooking}
        />

        {/* 2. Hero Social Bar */}
        <HeroSocialBar
          settings={settings}
          phoneNumber={settings?.phoneNumber}
          whatsappNumber={settings?.whatsappNumber}
          instagramUrl={settings?.instagramUrl}
        />

        {/* 3. Founder Section */}
        <FounderSection
          founder={founder}
          onBookDate={handleOpenBooking}
        />

        {/* 4. Pre-Wedding Stories */}
        <PreWeddings
          stories={preweddings}
          photos={photos}
          onOpenPhotoFullscreen={handleOpenPhotoFullscreen}
          onBookDate={handleOpenBooking}
        />

        {/* 5. Wedding Stories */}
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

        {/* 7. Cinematic Films */}
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

        {/* 10. Testimonials */}
        <Testimonials testimonials={testimonials} />

        {/* 11. Contact & Booking */}
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
