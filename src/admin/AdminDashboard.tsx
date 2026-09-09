import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Trash2,
  Edit2,
  Plus,
  Save,
  Star,
  Film,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Database,
  Lock,
  LogOut,
  RefreshCw,
  Inbox,
  User,
  Sliders,
  MoveUp,
  MoveDown,
  Sparkles,
  Phone,
  Clock,
  Type,
  Globe,
  ShieldCheck,
  Share2,
  Heart
} from 'lucide-react';
import {
  PhotoItem,
  WeddingStory,
  WeddingFilm,
  Testimonial,
  SiteSettings,
  BookingEnquiry,
  HeroImage,
  PreWeddingStory,
  FounderSettings
} from '../types';
import { api } from '../services/api';
import { WebsiteTextTab } from './tabs/WebsiteTextTab';
import { AdminAccountTab } from './tabs/AdminAccountTab';
import { MaternityKidsTab } from './tabs/MaternityKidsTab';
import { ReviewsTab } from './tabs/ReviewsTab';
import { SocialMediaTab } from './tabs/SocialMediaTab';
import { SeoTab } from './tabs/SeoTab';

// =========================================================================
// इन-लाइन यूनिवर्सल इमेज अपलोडर
// =========================================================================
const InlineImageUploader: React.FC<{
  label: string;
  value: string;
  onChange: (base64Url: string) => void;
}> = ({ label, value, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1920;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.82);
        onChange(optimizedBase64);
        setLoading(false);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2 mb-4">
      <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 font-medium">
        {label}
      </label>

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="px-4 py-2 bg-[#222] hover:bg-[#d4af37] text-white hover:text-black border border-white/20 hover:border-[#d4af37] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          📁 {loading ? 'Processing...' : 'Upload Photo From PC / Mobile'}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs text-red-400 hover:text-red-300 underline"
          >
            Remove
          </button>
        )}
      </div>

      {value && (
        <div className="relative w-32 h-24 rounded border border-[#d4af37]/50 mt-2 bg-black/60 overflow-hidden">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

interface AdminDashboardProps {
  onBackToSite: () => void;
  onRefreshData: () => void;
}

type AdminTab =
  | 'hero_slideshow'
  | 'founder'
  | 'preweddings'
  | 'stories'
  | 'films'
  | 'maternity'
  | 'reviews'
  | 'contact'
  | 'social_media'
  | 'website_text'
  | 'seo'
  | 'admin_account'
  | 'enquiries'
  | 'database';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  onRefreshData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('sen_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('senphotography2026');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<AdminTab>('hero_slideshow');

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [heroInterval, setHeroInterval] = useState<number>(1000);
  const [founder, setFounder] = useState<FounderSettings | null>(null);
  const [preweddings, setPreweddings] = useState<PreWeddingStory[]>([]);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [stories, setStories] = useState<WeddingStory[]>([]);
  const [films, setFilms] = useState<WeddingFilm[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>([]);

  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  // Modals
  const [heroModalOpen, setHeroModalOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<HeroImage | null>(null);
  const [heroForm, setHeroForm] = useState({ image_url: '', title: '', sort_order: 1, active: true });

  const [preweddingModalOpen, setPreweddingModalOpen] = useState(false);
  const [editingPrewedding, setEditingPrewedding] = useState<PreWeddingStory | null>(null);
  const [preweddingForm, setPreweddingForm] = useState({
    title: '',
    cover_image: ''
  });

  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<WeddingStory | null>(null);
  const [storyForm, setStoryForm] = useState({
    title: '',
    cover_image: ''
  });

  const [filmModalOpen, setFilmModalOpen] = useState(false);
  const [editingFilm, setEditingFilm] = useState<WeddingFilm | null>(null);
  const [filmForm, setFilmForm] = useState({
    title: '',
    cover_image: '',
    video_url: ''
  });

  const [testModalOpen, setTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Testimonial | null>(null);
  const [testForm, setTestForm] = useState({
    quote: '',
    couple_name: '',
    location: '',
    event_year: new Date().getFullYear().toString(),
    shoot_type: 'Royal Destination Wedding',
    photo_url: ''
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, h, f, pw, ph, st, flm, tst, enq] = await Promise.all([
        api.getSettings(),
        api.getHeroImages(),
        api.getFounder(),
        api.getPreWeddings(),
        api.getPhotos(),
        api.getStories(),
        api.getFilms(),
        api.getTestimonials(),
        api.getEnquiries()
      ]);

      setSettings(s);
      setHeroImages(h);
      setHeroInterval(s.heroSlideshowInterval || 1000);
      setFounder(f);
      setPreweddings(pw);
      setPhotos(ph);
      setStories(st);
      setFilms(flm);
      setTestimonials(tst);
      setEnquiries(enq);
    } catch {
      setStatusMessage({ type: 'error', text: 'Error connecting to database.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    api.verifyAuth().then((isValid) => {
      if (isValid) {
        setIsAuthenticated(true);
        sessionStorage.setItem('sen_admin_auth', 'true');
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = await api.login(username, password);
    if (res.success) {
      setIsAuthenticated(true);
      sessionStorage.setItem('sen_admin_auth', 'true');
    } else {
      setAuthError(res.message || 'Invalid username or password');
    }
  };

  const handleLogout = async () => {
    await api.logout().catch(() => {});
    setIsAuthenticated(false);
    sessionStorage.removeItem('sen_admin_auth');
  };

  const handleFileUpload = async (file: File): Promise<string | null> => {
    try {
      const res = await api.uploadImage(file);
      showStatus('success', 'Image uploaded successfully');
      return res.url;
    } catch {
      showStatus('error', 'Upload failed');
      return null;
    }
  };

  // ------------------------------------------
  // HERO SLIDESHOW HANDLERS
  // ------------------------------------------
  const handleSaveHeroImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHero) {
        await api.updateHeroImage(editingHero.id, heroForm);
        showStatus('success', 'Hero image updated');
      } else {
        await api.createHeroImage(heroForm);
        showStatus('success', 'Hero image added to slideshow');
      }
      setHeroModalOpen(false);
      setEditingHero(null);
      const updated = await api.getHeroImages();
      setHeroImages(updated);
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save hero image');
    }
  };

  const handleDeleteHero = async (id: string) => {
    if (!confirm('Remove this image from hero slideshow?')) return;
    try {
      await api.deleteHeroImage(id);
      setHeroImages(prev => prev.filter(h => h.id !== id));
      showStatus('success', 'Image removed from hero slideshow');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to delete hero image');
    }
  };

  const handleMoveHero = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= heroImages.length) return;

    const newList = [...heroImages];
    const [moved] = newList.splice(index, 1);
    newList.splice(targetIdx, 0, moved);

    const reordered = newList.map((img, idx) => ({ ...img, sort_order: idx + 1 }));
    setHeroImages(reordered);

    try {
      await api.reorderHeroImages(reordered, heroInterval);
      showStatus('success', 'Slideshow sequence updated');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save new order');
    }
  };

  const handleSaveHeroInterval = async () => {
    try {
      await api.reorderHeroImages(heroImages, Number(heroInterval));
      if (settings) {
        await api.updateSettings({ ...settings, heroSlideshowInterval: Number(heroInterval) });
      }
      showStatus('success', `Slideshow interval set to ${heroInterval}ms (${(heroInterval / 1000).toFixed(1)}s)`);
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to update interval');
    }
  };

  // ------------------------------------------
  // FOUNDER HANDLERS
  // ------------------------------------------
  const handleSaveFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!founder) return;
    try {
      const res = await api.updateFounder(founder);
      setFounder(res);
      showStatus('success', 'Founder profile saved');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to update founder details');
    }
  };

  // ------------------------------------------
  // PRE-WEDDING HANDLERS
  // ------------------------------------------
  const handleSavePrewedding = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: preweddingForm.title,
        couple_name: preweddingForm.title,
        location: '',
        date: '',
        cover_image: preweddingForm.cover_image,
        description: '',
        gallery: [preweddingForm.cover_image]
      };

      if (editingPrewedding) {
        await api.updatePreWedding(editingPrewedding.id, payload);
        showStatus('success', 'Pre-wedding updated');
      } else {
        await api.createPreWedding(payload);
        showStatus('success', 'New Pre-wedding created');
      }

      setPreweddingModalOpen(false);
      setEditingPrewedding(null);
      const updated = await api.getPreWeddings();
      setPreweddings(updated);
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save pre-wedding');
    }
  };

  const handleDeletePrewedding = async (id: string) => {
    if (!confirm('Are you sure you want to delete this Pre-Wedding?')) return;
    try {
      await api.deletePreWedding(id);
      setPreweddings(prev => prev.filter(p => p.id !== id));
      showStatus('success', 'Pre-wedding deleted');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to delete pre-wedding');
    }
  };

  // ------------------------------------------
  // WEDDING STORIES HANDLERS
  // ------------------------------------------
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: storyForm.title,
        subtitle: '',
        couple_name: storyForm.title,
        location: '',
        date: '',
        cover_image: storyForm.cover_image,
        category: 'WEDDINGS',
        featured: true,
        description: '',
        highlights: [],
        gallery: [storyForm.cover_image],
        film_url: ''
      };

      if (editingStory) {
        await api.updateStory(editingStory.id, payload);
        showStatus('success', 'Wedding story updated');
      } else {
        await api.createStory(payload);
        showStatus('success', 'Wedding story created');
      }

      setStoryModalOpen(false);
      setEditingStory(null);
      const updated = await api.getStories();
      setStories(updated);
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save story');
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm('Delete this wedding story?')) return;
    try {
      await api.deleteStory(id);
      setStories(prev => prev.filter(s => s.id !== id));
      showStatus('success', 'Story deleted');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to delete story');
    }
  };

  // ------------------------------------------
  // FILMS HANDLERS
  // ------------------------------------------
  const handleSaveFilm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: filmForm.title,
        couple_name: filmForm.title,
        location: '',
        duration: '',
        cover_image: filmForm.cover_image,
        video_url: filmForm.video_url,
        description: '',
        featured: false
      };

      if (editingFilm) {
        await api.updateFilm(editingFilm.id, payload);
        showStatus('success', 'Film updated');
      } else {
        await api.createFilm(payload);
        showStatus('success', 'New film added');
      }
      setFilmModalOpen(false);
      setEditingFilm(null);
      const updated = await api.getFilms();
      setFilms(updated);
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save film');
    }
  };

  const handleDeleteFilm = async (id: string) => {
    if (!confirm('Delete this film?')) return;
    try {
      await api.deleteFilm(id);
      setFilms(prev => prev.filter(f => f.id !== id));
      showStatus('success', 'Film deleted');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to delete film');
    }
  };

  // ------------------------------------------
  // TESTIMONIAL HANDLERS
  // ------------------------------------------
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTest) {
        await api.updateTestimonial(editingTest.id, testForm);
        showStatus('success', 'Testimonial updated');
      } else {
        await api.createTestimonial(testForm);
        showStatus('success', 'Testimonial added');
      }
      setTestModalOpen(false);
      setEditingTest(null);
      const updated = await api.getTestimonials();
      setTestimonials(updated);
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save testimonial');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
      showStatus('success', 'Testimonial deleted');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to delete testimonial');
    }
  };

  // ------------------------------------------
  // SETTINGS HANDLER
  // ------------------------------------------
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await api.updateSettings(settings);
      setSettings(res);
      showStatus('success', 'Settings saved');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to update settings');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#111114] border border-white/10 p-8 sm:p-10 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
              <Lock className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl text-white font-light block">SEN PHOTOGRAPHY</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-medium block mt-1">
              Studio Administrative Portal
            </span>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5 font-medium">
                ADMIN USERNAME
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5 font-medium">
                PASSWORD
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-300 mt-2"
            >
              UNLOCK ADMIN CONSOLE
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <button
              onClick={onBackToSite}
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to live site</span>
            </button>
            <span>v2.4 Production</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070708] text-[#e8e4dc] flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-[#0e0e11] border-b border-white/10 px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToSite}
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-xs tracking-wider uppercase text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            <span className="hidden sm:inline">VIEW LIVE ATELIER</span>
          </button>
          <div>
            <span className="font-serif text-lg tracking-wider text-white font-light">
              SEN PHOTOGRAPHY
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#d4af37] uppercase block font-mono">
              CONTENT MANAGEMENT SYSTEM
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            title="Refresh All Records"
            className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-xs text-red-200 tracking-wider uppercase transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SIGN OUT</span>
          </button>
        </div>
      </header>

      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 border flex items-center space-x-3 shadow-2xl transition-all ${
            statusMessage.type === 'success'
              ? 'bg-[#102416] border-emerald-500 text-emerald-200'
              : 'bg-red-950 border-red-600 text-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span className="text-xs font-medium">{statusMessage.text}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-64 bg-[#0a0a0d] border-b md:border-b-0 md:border-r border-white/10 flex-shrink-0 flex md:flex-col justify-between overflow-x-auto md:overflow-y-auto">
          <div className="p-3 md:p-4 space-y-1 flex md:flex-col overflow-x-auto">
            <span className="hidden md:block text-[9px] tracking-[0.3em] uppercase text-white/40 px-3 py-2 font-mono">
              SECTIONS & STORYTELLING
            </span>

            <button
              onClick={() => setActiveTab('hero_slideshow')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'hero_slideshow'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4 text-[#d4af37]" />
              <span>01. HERO SLIDESHOW ({heroImages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('founder')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'founder'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-[#d4af37]" />
              <span>02. FOUNDER PROFILE</span>
            </button>

            <button
              onClick={() => setActiveTab('preweddings')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'preweddings'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>03. PRE-WEDDING ({preweddings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('stories')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'stories'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#d4af37]" />
              <span>04. WEDDING STORIES ({stories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('films')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'films'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Film className="w-4 h-4 text-[#d4af37]" />
              <span>05. CINEMATIC FILMS ({films.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('maternity')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'maternity'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4 text-[#d4af37]" />
              <span>06. MATERNITY & KIDS</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-[#dc2626] text-white font-semibold shadow-lg'
                  : 'text-red-400 hover:bg-red-950/30 hover:text-red-300'
              }`}
            >
              <Star className="w-4 h-4 text-[#ff4d4d]" />
              <span>07. CUSTOMER REVIEWS ({testimonials.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'contact'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span>08. STUDIO CONTACT</span>
            </button>

            <button
              onClick={() => setActiveTab('social_media')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'social_media'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Share2 className="w-4 h-4 text-[#d4af37]" />
              <span>09. SOCIAL MEDIA</span>
            </button>

            <button
              onClick={() => setActiveTab('website_text')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'website_text'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4 text-[#d4af37]" />
              <span>10. WEBSITE TEXT EDITOR</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'seo'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4 text-[#d4af37]" />
              <span>11. SEO SETTINGS</span>
            </button>

            <button
              onClick={() => setActiveTab('admin_account')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'admin_account'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>12. ADMIN ACCOUNT</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'enquiries'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Inbox className="w-4 h-4 text-[#d4af37]" />
              <span>CLIENT ENQUIRIES ({enquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap ${
                activeTab === 'database'
                  ? 'bg-[#d4af37] text-[#0c0c0d] font-semibold'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4 text-[#d4af37]" />
              <span>DATABASE / SUPABASE</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#070708]">
          {/* TAB 1: HERO SLIDESHOW */}
          {activeTab === 'hero_slideshow' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                    1-SECOND AUTOMATED SLIDESHOW
                  </span>
                  <h2 className="font-serif text-3xl text-white font-light mt-1">
                    Hero Slideshow Images
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setEditingHero(null);
                    setHeroForm({
                      image_url: '',
                      title: `Hero Slide ${String(heroImages.length + 1).padStart(2, '0')}`,
                      sort_order: heroImages.length + 1,
                      active: true
                    });
                    setHeroModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] text-xs font-semibold tracking-wider uppercase flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD HERO IMAGE</span>
                </button>
              </div>

              <div className="p-5 bg-[#111114] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#d4af37]" />
                  <div>
                    <h4 className="text-xs tracking-wider uppercase text-white font-semibold">
                      Hero Slideshow Speed Interval
                    </h4>
                    <p className="text-[11px] text-white/50">
                      Default: 1000ms (1 second).
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <select
                    value={heroInterval}
                    onChange={(e) => setHeroInterval(Number(e.target.value))}
                    className="bg-black/60 border border-white/20 text-xs text-white px-3 py-2 focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value={1000}>1.0 Second (1000 ms) — Recommended</option>
                    <option value={1500}>1.5 Seconds (1500 ms)</option>
                    <option value={2000}>2.0 Seconds (2000 ms)</option>
                    <option value={3000}>3.0 Seconds (3000 ms)</option>
                    <option value={5000}>5.0 Seconds (5000 ms)</option>
                  </select>

                  <button
                    onClick={handleSaveHeroInterval}
                    className="px-4 py-2 bg-[#d4af37] text-[#0c0c0d] font-semibold text-xs tracking-wider uppercase whitespace-nowrap"
                  >
                    APPLY SPEED
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {heroImages.map((img, index) => (
                  <div
                    key={img.id}
                    className="bg-[#111114] border border-white/10 p-4 flex items-center space-x-4 group hover:border-[#d4af37]/40 transition-colors"
                  >
                    <div className="relative w-24 h-20 bg-black/60 shrink-0 overflow-hidden border border-white/10">
                      <img
                        src={img.image_url}
                        alt={img.title || `Hero Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-[#d4af37]">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs text-white font-medium truncate">
                        {img.title || `Hero Image ${String(index + 1).padStart(2, '0')}`}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => handleMoveHero(index, 'up')}
                        disabled={index === 0}
                        title="Move Up"
                        className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 hover:bg-white/5 transition-colors"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleMoveHero(index, 'down')}
                        disabled={index === heroImages.length - 1}
                        title="Move Down"
                        className="p-1.5 text-white/50 hover:text-white disabled:opacity-20 hover:bg-white/5 transition-colors"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setEditingHero(img);
                          setHeroForm({
                            image_url: img.image_url,
                            title: img.title || '',
                            sort_order: img.sort_order || index + 1,
                            active: img.active !== false
                          });
                          setHeroModalOpen(true);
                        }}
                        title="Edit / Replace Image"
                        className="p-1.5 text-white/50 hover:text-[#d4af37] hover:bg-white/5 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteHero(img.id)}
                        title="Delete Image"
                        className="p-1.5 text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: FOUNDER */}
          {activeTab === 'founder' && founder && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="pb-6 border-b border-white/10">
                <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                  EDITORIAL FOUNDER STORY
                </span>
                <h2 className="font-serif text-3xl text-white font-light mt-1">
                  Founder Profile & Storytelling
                </h2>
              </div>

              <form onSubmit={handleSaveFounder} className="space-y-6">
                <div className="p-6 bg-[#111114] border border-white/10">
                  <InlineImageUploader
                    label="Founder Photograph *"
                    value={founder.photo_url}
                    onChange={(newPhoto) => setFounder({ ...founder, photo_url: newPhoto })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      FOUNDER NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={founder.name}
                      onChange={(e) => setFounder({ ...founder, name: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      DESIGNATION LINE 1 *
                    </label>
                    <input
                      type="text"
                      required
                      value={founder.designation_line1}
                      onChange={(e) => setFounder({ ...founder, designation_line1: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                      DESIGNATION LINE 2
                    </label>
                    <input
                      type="text"
                      value={founder.designation_line2}
                      onChange={(e) => setFounder({ ...founder, designation_line2: e.target.value })}
                      className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                    FOUNDER QUOTE *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={founder.short_description}
                    onChange={(e) => setFounder({ ...founder, short_description: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium">
                    FULL ARTISTIC NARRATIVE *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={founder.long_description}
                    onChange={(e) => setFounder({ ...founder, long_description: e.target.value })}
                    className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-xs tracking-[0.25em] uppercase flex items-center space-x-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE FOUNDER SETTINGS</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: PRE-WEDDINGS */}
          {activeTab === 'preweddings' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                    PRE-WEDDING PORTFOLIO
                  </span>
                  <h2 className="font-serif text-3xl text-white font-light mt-1">
                    Pre-Wedding Stories
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setEditingPrewedding(null);
                    setPreweddingForm({
                      title: '',
                      cover_image: ''
                    });
                    setPreweddingModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] text-xs font-semibold tracking-wider uppercase flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD PRE-WEDDING STORY</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {preweddings.map((story) => (
                  <div key={story.id} className="bg-[#111114] border border-white/10 overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[4/5] bg-black/60 overflow-hidden">
                        <img
                          src={story.cover_image}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-4 text-center">
                        <h4 className="font-serif text-base text-white font-bold uppercase tracking-widest">{story.title}</h4>
                      </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingPrewedding(story);
                          setPreweddingForm({
                            title: story.title,
                            cover_image: story.cover_image
                          });
                          setPreweddingModalOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs text-[#d4af37] hover:text-white flex items-center space-x-1.5 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>EDIT</span>
                      </button>

                      <button
                        onClick={() => handleDeletePrewedding(story.id)}
                        className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 flex items-center space-x-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STORIES */}
          {activeTab === 'stories' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                    ROYAL WEDDING PORTFOLIO
                  </span>
                  <h2 className="font-serif text-3xl text-white font-light mt-1">
                    Wedding Stories
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setEditingStory(null);
                    setStoryForm({
                      title: '',
                      cover_image: ''
                    });
                    setStoryModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] text-xs font-semibold tracking-wider uppercase flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD WEDDING STORY</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stories.map((story) => (
                  <div key={story.id} className="bg-[#111114] border border-white/10 overflow-hidden flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[4/5] bg-black/60 overflow-hidden">
                        <img
                          src={story.cover_image}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-4 text-center">
                        <h4 className="font-serif text-base text-white font-bold uppercase tracking-widest">{story.title}</h4>
                      </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingStory(story);
                          setStoryForm({
                            title: story.title,
                            cover_image: story.cover_image
                          });
                          setStoryModalOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs text-[#d4af37] hover:text-white flex items-center space-x-1.5 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>EDIT</span>
                      </button>

                      <button
                        onClick={() => handleDeleteStory(story.id)}
                        className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 flex items-center space-x-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FILMS */}
          {activeTab === 'films' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                    CINEMA PORTFOLIO
                  </span>
                  <h2 className="font-serif text-3xl text-white font-light mt-1">
                    Cinematic Films
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setEditingFilm(null);
                    setFilmForm({
                      title: '',
                      cover_image: '',
                      video_url: ''
                    });
                    setFilmModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] text-xs font-semibold tracking-wider uppercase flex items-center space-x-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW FILM</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {films.map((film) => (
                  <div key={film.id} className="bg-[#111114] border border-white/10 overflow-hidden group flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-video bg-black/60 overflow-hidden">
                        <img
                          src={film.cover_image}
                          alt={film.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-4 text-center">
                        <h4 className="font-serif text-base text-white font-bold uppercase tracking-widest">{film.title}</h4>
                      </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingFilm(film);
                          setFilmForm({
                            title: film.title,
                            cover_image: film.cover_image,
                            video_url: film.video_url
                          });
                          setFilmModalOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs text-[#d4af37] hover:text-white flex items-center space-x-1.5 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>EDIT</span>
                      </button>

                      <button
                        onClick={() => handleDeleteFilm(film.id)}
                        className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 flex items-center space-x-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>DELETE</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MATERNITY */}
          {activeTab === 'maternity' && settings && (
            <MaternityKidsTab
              settings={settings}
              photos={photos}
              onRefreshData={onRefreshData}
              showStatus={showStatus}
              onFileUpload={handleFileUpload}
            />
          )}

          {/* TAB 7: REVIEWS */}
          {activeTab === 'reviews' && settings && (
            <ReviewsTab
              testimonials={testimonials}
              settings={settings}
              onRefreshData={onRefreshData}
              showStatus={showStatus}
              onFileUpload={handleFileUpload}
            />
          )}

          {/* TAB 8: CONTACT */}
          {activeTab === 'contact' && settings && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="pb-6 border-b border-white/10">
                <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold font-mono">
                  STUDIO CONTACT DETAILS
                </span>
                <h2 className="font-serif text-3xl text-white font-light mt-1">
                  Contact & Location
                </h2>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium font-mono">
                      PHONE NUMBER *
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.phoneNumber}
                      onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium font-mono">
                      WHATSAPP NUMBER *
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium font-mono">
                      OFFICIAL EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      placeholder="weddings@senphotography.com"
                      className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium font-mono">
                      PRIMARY STUDIO CITIES
                    </label>
                    <input
                      type="text"
                      value={settings.city}
                      onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                      placeholder="Udaipur & New Delhi, India"
                      className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2 font-medium font-mono">
                    STUDIO PHYSICAL ADDRESS
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    placeholder="Heritage Walkway, Ambavgarh, Udaipur"
                    className="w-full bg-black/50 border border-white/15 px-4 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-xs tracking-[0.25em] uppercase flex items-center space-x-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>SAVE CONTACT DETAILS</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 9: SOCIAL MEDIA */}
          {activeTab === 'social_media' && settings && (
            <SocialMediaTab
              settings={settings}
              onRefreshData={onRefreshData}
              showStatus={showStatus}
              onFileUpload={handleFileUpload}
            />
          )}

          {/* TAB 10: TEXT EDITOR */}
          {activeTab === 'website_text' && settings && (
            <WebsiteTextTab
              settings={settings}
              founder={founder}
              onRefreshData={onRefreshData}
              showStatus={showStatus}
            />
          )}

          {/* TAB 11: SEO */}
          {activeTab === 'seo' && settings && (
            <SeoTab
              settings={settings}
              onRefreshData={onRefreshData}
              showStatus={showStatus}
            />
          )}

          {/* TAB 12: ADMIN ACCOUNT */}
          {activeTab === 'admin_account' && (
            <AdminAccountTab showStatus={showStatus} />
          )}

          {/* TAB 13: ENQUIRIES (विस्तृत लीड्स कार्ड: नाम, मोबाइल, ईमेल, डेट, वेन्यू और डिस्क्रिप्शन) */}
          {activeTab === 'enquiries' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="pb-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                    BOOKING PIPELINE
                  </span>
                  <h2 className="font-serif text-3xl text-white font-light mt-1">
                    Incoming Client Inquiries ({enquiries.length})
                  </h2>
                </div>
              </div>

              {enquiries.length === 0 ? (
                <div className="p-12 text-center text-white/40 border border-dashed border-white/15">
                  No client enquiries received yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq: any) => {
                    const clientName = enq.name || enq.client_name || enq.fullName || 'Client';
                    const clientPhone = enq.phone || enq.mobile || enq.phoneNumber || '';
                    const clientEmail = enq.email || enq.emailAddress || '';
                    const clientVenue = enq.location || enq.venue || enq.city || 'Not Specified';
                    const clientDate = enq.weddingDate || enq.date || enq.event_date || 'Date Not Provided';
                    const clientType = enq.eventType || enq.event_type || enq.shoot_type || 'Wedding Shoot';
                    const clientMessage = enq.message || enq.description || enq.notes || '';

                    return (
                      <div
                        key={enq.id}
                        className="p-6 bg-[#111114] border border-white/10 flex flex-col md:flex-row items-start justify-between gap-6 hover:border-[#d4af37]/40 transition-colors"
                      >
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="font-serif text-2xl text-white font-medium tracking-wide">
                              {clientName}
                            </h4>
                            <span className="px-3 py-0.5 bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] text-[10px] uppercase tracking-wider font-semibold">
                              {clientType}
                            </span>
                            <span className="text-xs text-white/70 font-mono bg-white/5 px-2.5 py-1 border border-white/10">
                              📅 Date: <strong className="text-white">{clientDate}</strong>
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-6 text-xs text-white/70 pt-1">
                            <span>📞 Mobile: <strong className="text-white font-mono text-sm">{clientPhone}</strong></span>
                            <span>✉️ Email: <strong className="text-white">{clientEmail}</strong></span>
                            <span>📍 Location / Venue: <strong className="text-[#d4af37]">{clientVenue}</strong></span>
                          </div>

                          {clientMessage && (
                            <div className="mt-3 bg-black/60 p-4 border border-white/10 rounded-sm">
                              <span className="text-[10px] tracking-wider uppercase text-[#d4af37] block font-semibold mb-1">
                                Client Message / Description:
                              </span>
                              <p className="text-xs text-white/90 leading-relaxed font-light whitespace-pre-line">
                                {clientMessage}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          {clientPhone && (
                            <a
                              href={`https://wa.me/${clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hello ${clientName}, thank you for contacting SEN PHOTOGRAPHY regarding your ${clientType} celebration on ${clientDate}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/50 text-xs tracking-wider uppercase font-semibold transition-all"
                            >
                              WhatsApp Client
                            </a>
                          )}

                          <button
                            onClick={async () => {
                              if (!confirm('Are you sure you want to delete this enquiry?')) return;
                              await api.deleteEnquiry(enq.id);
                              setEnquiries((prev) => prev.filter((e) => e.id !== enq.id));
                              showStatus('success', 'Enquiry deleted');
                            }}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-transparent hover:border-red-900 transition-colors"
                            title="Delete enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 14: DATABASE */}
          {activeTab === 'database' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="pb-6 border-b border-white/10">
                <span className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
                  PRODUCTION PERSISTENCE
                </span>
                <h2 className="font-serif text-3xl text-white font-light mt-1">
                  Database & Storage Architecture
                </h2>
              </div>

              <div className="p-6 bg-red-950/20 border border-red-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs uppercase text-red-200 font-semibold tracking-wider">
                    Reset Database to Factory Defaults
                  </h4>
                  <p className="text-xs text-white/50 mt-0.5">
                    Restores curated demonstration records.
                  </p>
                </div>

                <button
                  onClick={async () => {
                    if (!confirm('Warning: This will reload default records. Proceed?')) return;
                    await api.resetDatabase();
                    await loadData();
                    onRefreshData();
                    showStatus('success', 'Database reset to demo state');
                  }}
                  className="px-4 py-2.5 bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
                >
                  RESET DEMO DATA
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: HERO IMAGE */}
      {heroModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111114] border border-white/15 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-light">
              {editingHero ? 'Edit Hero Image' : 'Add Hero Slideshow Image'}
            </h3>

            <form onSubmit={handleSaveHeroImage} className="space-y-4">
              <InlineImageUploader
                label="Hero Image Upload *"
                value={heroForm.image_url}
                onChange={(photo) => setHeroForm({ ...heroForm, image_url: photo })}
              />

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5">
                  SLIDE TITLE / DESCRIPTION
                </label>
                <input
                  type="text"
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  placeholder="e.g. Amber Fort Sunset Vows"
                  className="w-full bg-black/50 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="hero-active-checkbox"
                  checked={heroForm.active}
                  onChange={(e) => setHeroForm({ ...heroForm, active: e.target.checked })}
                  className="rounded border-white/20 text-[#d4af37]"
                />
                <label htmlFor="hero-active-checkbox" className="text-xs text-white/80 cursor-pointer">
                  Include this image in active 1-second slideshow rotation
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setHeroModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d4af37] text-[#0c0c0d] font-semibold text-xs tracking-wider uppercase"
                >
                  SAVE SLIDE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRE-WEDDING */}
      {preweddingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111114] border border-white/15 max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-light">
              {editingPrewedding ? 'Edit Pre-Wedding Story' : 'New Pre-Wedding Story'}
            </h3>

            <form onSubmit={handleSavePrewedding} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5">
                  STORY TITLE / ONE LINE TEXT *
                </label>
                <input
                  type="text"
                  required
                  value={preweddingForm.title}
                  onChange={(e) => setPreweddingForm({ ...preweddingForm, title: e.target.value })}
                  placeholder="e.g. THE ROYAL CHAPTER"
                  className="w-full bg-black/50 border border-white/15 px-3 py-2 text-xs text-white uppercase tracking-wider focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <InlineImageUploader
                label="Cover Image Upload *"
                value={preweddingForm.cover_image}
                onChange={(photo) => setPreweddingForm({ ...preweddingForm, cover_image: photo })}
              />

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setPreweddingModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d4af37] text-[#0c0c0d] font-semibold text-xs tracking-wider uppercase"
                >
                  SAVE PRE-WEDDING STORY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: WEDDING STORY */}
      {storyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111114] border border-white/15 max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-light">
              {editingStory ? 'Edit Wedding Story' : 'New Wedding Story'}
            </h3>

            <form onSubmit={handleSaveStory} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5">
                  STORY TITLE / ONE LINE TEXT *
                </label>
                <input
                  type="text"
                  required
                  value={storyForm.title}
                  onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                  placeholder="e.g. HERITAGE PALACE VOWS"
                  className="w-full bg-black/50 border border-white/15 px-3 py-2 text-xs text-white uppercase tracking-wider focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <InlineImageUploader
                label="Story Cover Image Upload *"
                value={storyForm.cover_image}
                onChange={(photo) => setStoryForm({ ...storyForm, cover_image: photo })}
              />

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStoryModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d4af37] text-[#0c0c0d] font-semibold text-xs tracking-wider uppercase"
                >
                  SAVE WEDDING STORY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: CINEMATIC FILM */}
      {filmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111114] border border-white/15 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-light">
              {editingFilm ? 'Edit Cinematic Film' : 'Add New Cinematic Film'}
            </h3>

            <form onSubmit={handleSaveFilm} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5">
                  FILM TITLE / ONE LINE TEXT *
                </label>
                <input
                  type="text"
                  required
                  value={filmForm.title}
                  onChange={(e) => setFilmForm({ ...filmForm, title: e.target.value })}
                  placeholder="e.g. ECHOES OF UDAIPUR"
                  className="w-full bg-black/50 border border-white/15 px-3 py-2 text-xs text-white uppercase tracking-wider focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5">
                  YOUTUBE / VIMEO VIDEO URL *
                </label>
                <input
                  type="url"
                  required
                  value={filmForm.video_url}
                  onChange={(e) => setFilmForm({ ...filmForm, video_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-black/50 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <InlineImageUploader
                label="Poster / Thumbnail Image Upload *"
                value={filmForm.cover_image}
                onChange={(photo) => setFilmForm({ ...filmForm, cover_image: photo })}
              />

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setFilmModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d4af37] text-[#0c0c0d] font-semibold text-xs tracking-wider uppercase"
                >
                  SAVE FILM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: TESTIMONIAL */}
      {testModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111114] border border-white/15 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl text-white font-light">
              {editingTest ? 'Edit Testimonial' : 'Add Testimonial'}
            </h3>

            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-white/60 mb-1.5">
                  CLIENT REVIEW QUOTE *
                </label>
                <textarea
                  rows={3}
                  required
                  value={testForm.quote}
                  onChange={(e) => setTestForm({ ...testForm, quote: e.target.value })}
                  className="w-full bg-black/50 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <InlineImageUploader
                label="Client Photo Upload (Optional)"
                value={testForm.photo_url}
                onChange={(photo) => setTestForm({ ...testForm, photo_url: photo })}
              />

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setTestModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#d4af37] text-[#0c0c0d] font-semibold text-xs tracking-wider uppercase"
                >
                  SAVE REVIEW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
