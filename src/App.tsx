import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HeroSocialBar } from './components/HeroSocialBar';
import { FounderSection } from './components/FounderSection';
import { PreWeddings } from './components/PreWeddings';
import { WeddingStoriesSection } from './components/WeddingStoriesSection';
import { WeddingsGallery } from './components/WeddingsGallery';
import { WeddingFilms } from './components/WeddingFilms';
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

// =========================================================================
// Ramsnehi Style: Elegant Cursive Full-Screen Cinematic Banner
// =========================================================================
const SectionBanner: React.FC<{
  id: string;
  title: string;
  subtitle?: string;
  bgImage: string;
}> = ({ id, title, subtitle, bgImage }) => (
  <div
    id={id}
    className="relative w-full h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden bg-black select-none"
  >
    <img
      src={bgImage}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover brightness-[0.5] contrast-[1.08] scale-105 transition-transform duration-1000"
    />
    <div className="relative z-10 text-center px-4 flex flex-col items-center">
      {subtitle && (
        <span className="text-[10px] sm:text-xs tracking-[0.35em] text-[#d4af37] uppercase font-mono mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic text-white tracking-wide capitalize drop-shadow-2xl mb-4">
        {title.toLowerCase()}
      </h2>
      <p className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-white/80 font-light">
        SCROLL TO EXPLORE
      </p>
      <div className="w-[1px] h-8 bg-white/40 mt-6 animate-bounce"></div>
    </div>
  </div>
);

// =========================================================================
// इन-लाइन मैटरनिटी व किड्स सेक्शन (अलग फ़ाइल की कोई ज़रूरत नहीं)
// =========================================================================
const MaternityKidsSection: React.FC<{
  photos: PhotoItem[];
  onOpenPhotoFullscreen: (photo: PhotoItem) => void;
  onBookDate: () => void;
}> = ({ photos, onOpenPhotoFullscreen, onBookDate }) => {
  const maternityPhotos = photos.filter(
    (p) => p.category === 'MATERNITY' || p.category === 'KIDS' || p.category === 'MATERNITY & KIDS'
  );

  const displayList = maternityPhotos.length > 0 ? maternityPhotos : [
    { id: 'mk1', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80', title: 'PURE MOTHERHOOD' },
    { id: 'mk2', image_url: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80', title: 'LITTLE MIRACLES' },
    { id: 'mk3', image_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', title: 'INNOCENCE & JOY' },
    { id: 'mk4', image_url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80', title: 'ETERNAL BONDS' },
  ];

  return (
    <section className="bg-white text-black py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-10">
          <span className="w-8 h-[1px] bg-black/60"></span>
          <h3 className="text-xs sm:text-sm tracking-[0.25em] uppercase font-medium text-black/80">
            LATEST MATERNITY & KIDS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayList.slice(0, 8).map((photo: any) => (
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
              <div className="mt-4 text-center">
                <h4 className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-[0.2em] text-black/90 group-hover:text-[#b38a22] transition-colors">
                  {photo.title || 'SACRED MOMENTS'}
                </h4>
              </div>
            </div>
          ))}
        </div>

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
  );
};

function App() {
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [founder, setFounder] = useState<FounderSettings>(initialFounder);
  const [heroImages, setHeroImages] = useState<HeroImage[]>(initialHeroImages);
  const [preweddings, setPreweddings] = useState<PreWeddingStory[]>(initialPreWeddings);
  const [stories, setStories] = useState<WeddingStory[]>(initialWeddingStories);
  const [photos, setPhotos] = useState<PhotoItem[]>(initialPhotos);
  const [films, setFilms] = useState<WeddingFilm[]>(initialFilms);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState('');

  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash === '#admin' || window.location.pathname.startsWith('/admin');
  });

  const [selectedStory, setSelectedStory] = useState<WeddingStory | null>(null);
  const [activePhotoLightbox, setActivePhotoLightbox] = useState<PhotoItem | null>(null);

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
      console.error('API Error:', err);
    }
  };

  useEffect(() => {
    refreshData();
    const handleHashChange = () => {
      if (window.location.hash === '#admin') setIsAdminView(true);
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
      setLoginError('गलत ईमेल या पासवर्ड!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdminView(false);
    window.location.hash = '';
  };

  const handleOpenBooking = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreStories = () => {
    document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isAdminView) {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#0c0c0d] flex items-center justify-center p-4">
          <div className="bg-[#141416] border border-[#2a2a2e] rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-serif tracking-widest text-[#d4af37] uppercase">SEN PHOTOGRAPHY</h2>
              <p className="text-xs text-gray-400 mt-1">ADMIN PORTAL</p>
            </div>

            {loginError && (
              <div className="bg-red-500/10 border border-red-500/40 text-red-400 text-xs p-3 rounded-lg mb-4 text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-400 mb-1">Username / Email</label>
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="sen001@gmail.com"
                  required
                  className="w-full bg-[#1b1b1e] border border-[#2a2a2e] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-400 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Sen@2323"
                    required
                    className="w-full bg-[#1b1b1e] border border-[#2a2a2e] rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d4af37] text-black font-semibold uppercase tracking-wider py-3 rounded-lg text-xs hover:bg-[#c49f2e]"
              >
                Login
              </button>
            </form>

            <button
              onClick={() => {
                setIsAdminView(false);
                window.location.hash = '';
              }}
              className="mt-4 text-xs text-gray-400 hover:text-white block w-full text-center"
            >
              ← Back to Site
            </button>
          </div>
        </div>
      );
    }

    return <AdminDashboard onBackToSite={handleLogout} onRefreshData={refreshData} />;
  }

  return (
    <div className="min-h-screen bg-[#0c0c0d] text-[#e8e4dc]">
      <Navbar
        settings={settings}
        onOpenBooking={handleOpenBooking}
        onNavigateToAdmin={() => {
          setIsAdminView(true);
          window.location.hash = 'admin';
        }}
      />

      <main>
        <Hero
          settings={settings}
          heroImages={heroImages}
          onExploreStories={handleExploreStories}
          onBookDate={handleOpenBooking}
        />

        <HeroSocialBar
          settings={settings}
          phoneNumber={settings?.phoneNumber}
          whatsappNumber={settings?.whatsappNumber}
          instagramUrl={settings?.instagramUrl}
        />

        <FounderSection founder={founder} onBookDate={handleOpenBooking} />

        {/* 1. WEDDING STORIES */}
        <SectionBanner
          id="stories"
          title="Stories"
          subtitle="THE MOMENTS THAT BECOME MEMORIES"
          bgImage={stories[0]?.cover_image || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80'}
        />
        <WeddingStoriesSection
          stories={stories}
          onSelectStory={(s) => setSelectedStory(s)}
          onBookDate={handleOpenBooking}
        />

        {/* 2. WEDDING GALLERY */}
        <SectionBanner
          id="weddings"
          title="Wedding"
          subtitle="FOREVER CAPTURED IN ELEGANCE"
          bgImage={photos[0]?.image_url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=80'}
        />
        <WeddingsGallery
          photos={photos}
          onOpenPhotoFullscreen={(p) => setActivePhotoLightbox(p)}
        />

        {/* 3. PRE-WEDDINGS */}
        <SectionBanner
          id="preweddings"
          title="Pre-wedding"
          subtitle="WHERE EVERY LOVE STORY FINDS ITS RHYTHM"
          bgImage={preweddings[0]?.cover_image || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=80'}
        />
        <PreWeddings
          stories={preweddings}
          photos={photos}
          onOpenPhotoFullscreen={(p) => setActivePhotoLightbox(p)}
          onBookDate={handleOpenBooking}
        />

        {/* 4. CINEMATIC FILMS */}
        <SectionBanner
          id="films"
          title="Films"
          subtitle="REAL MOMENTS. CINEMATIC STORIES."
          bgImage={films[0]?.cover_image || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80'}
        />
        <WeddingFilms films={films} />

        {/* 5. MATERNITY & KIDS */}
        {settings?.maternityKidsEnabled !== false && (
          <>
            <SectionBanner
              id="maternity"
              title="Maternity & Kids"
              subtitle="THE SACRED CHAPTERS OF LIFE"
              bgImage="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=2000&q=85"
            />
            <MaternityKidsSection
              photos={photos}
              onOpenPhotoFullscreen={(p) => setActivePhotoLightbox(p)}
              onBookDate={handleOpenBooking}
            />
          </>
        )}

        <InstagramSection settings={settings} />
        <Testimonials testimonials={testimonials} />
        <ContactSection settings={settings} />
      </main>

      <Footer
        settings={settings}
        onNavigateToAdmin={() => {
          setIsAdminView(true);
          window.location.hash = 'admin';
        }}
      />

      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onOpenPhotoFullscreen={(url, title) => {
          setActivePhotoLightbox({
            id: `v-${Date.now()}`,
            image_url: url,
            title,
            category: 'WEDDINGS',
            location: '',
            couple_name: '',
            date: '',
            featured: false,
            sort_order: 0,
            created_at: new Date().toISOString()
          });
        }}
        onBookDate={handleOpenBooking}
      />

      <PhotoLightbox
        currentPhoto={activePhotoLightbox}
        allPhotos={photos}
        onClose={() => setActivePhotoLightbox(null)}
        onNavigate={(p) => setActivePhotoLightbox(p)}
      />
    </div>
  );
}

export default App;
