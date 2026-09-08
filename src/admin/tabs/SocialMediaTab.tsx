import React, { useState } from 'react';
import { Share2, Instagram, Youtube, Facebook, MessageSquare, Star, CheckCircle, Upload } from 'lucide-react';
import { SiteSettings } from '../../types';
import { api } from '../../services/api';

interface SocialMediaTabProps {
  settings: SiteSettings;
  onRefreshData: () => void;
  showStatus: (type: 'success' | 'error', text: string) => void;
  onFileUpload: (file: File) => Promise<string | null>;
}

export const SocialMediaTab: React.FC<SocialMediaTabProps> = ({
  settings,
  onRefreshData,
  showStatus,
  onFileUpload
}) => {
  const [formData, setFormData] = useState({
    instagramUrl: settings.instagramUrl || 'https://instagram.com/senphotography',
    instagramHandle: settings.instagramHandle || '@senphotography',
    youtubeUrl: settings.youtubeUrl || 'https://youtube.com/@senphotography',
    facebookUrl: settings.facebookUrl || 'https://facebook.com/senphotography',
    whatsappNumber: settings.whatsappNumber || '+91 98765 43210',
    googleReviewUrl: settings.googleReviewUrl || 'https://g.page/r/senphotography/review',
    instagramImages: settings.instagramImages || []
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateSettings(formData);
      showStatus('success', 'Social media links and showcase updated');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save social media settings');
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (index: number, val: string) => {
    const updated = [...formData.instagramImages];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, instagramImages: updated }));
  };

  const handleUploadShowcase = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const url = await onFileUpload(e.target.files[0]);
    if (url) {
      handleImageChange(index, url);
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#d4af37] text-xs tracking-widest uppercase mb-1 font-mono">
            <Share2 className="w-4 h-4" />
            <span>GLOBAL NETWORK</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
            Social Media & Instagram Showcase
          </h2>
          <p className="text-xs text-white/50 tracking-wider font-light mt-1">
            Configure circular brand social icons, direct messaging channels, and Instagram showcase grid.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-lg self-start sm:self-auto disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4" />
          <span>{saving ? 'SAVING...' : 'SAVE SOCIAL CHANNELS'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Social Links Form */}
        <div className="bg-[#0f0f12] border border-white/10 p-6 space-y-5">
          <h3 className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold border-b border-white/10 pb-3">
            01. CONNECTED SOCIAL CHANNELS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Instagram */}
            <div>
              <label className="flex items-center space-x-2 text-[10px] tracking-wider uppercase text-white/70 mb-1.5 font-mono">
                <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>INSTAGRAM PROFILE URL</span>
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => handleChange('instagramUrl', e.target.value)}
                className="w-full bg-black/60 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            {/* Instagram Handle */}
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-white/70 mb-1.5 font-mono">
                INSTAGRAM HANDLE / USERNAME
              </label>
              <input
                type="text"
                value={formData.instagramHandle}
                onChange={(e) => handleChange('instagramHandle', e.target.value)}
                placeholder="@senphotography"
                className="w-full bg-black/60 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            {/* YouTube */}
            <div>
              <label className="flex items-center space-x-2 text-[10px] tracking-wider uppercase text-white/70 mb-1.5 font-mono">
                <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>YOUTUBE CHANNEL URL</span>
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                className="w-full bg-black/60 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="flex items-center space-x-2 text-[10px] tracking-wider uppercase text-white/70 mb-1.5 font-mono">
                <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                <span>FACEBOOK PAGE URL</span>
              </label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => handleChange('facebookUrl', e.target.value)}
                className="w-full bg-black/60 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="flex items-center space-x-2 text-[10px] tracking-wider uppercase text-white/70 mb-1.5 font-mono">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WHATSAPP NUMBER (WITH COUNTRY CODE)</span>
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-black/60 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            {/* Google Reviews */}
            <div>
              <label className="flex items-center space-x-2 text-[10px] tracking-wider uppercase text-white/70 mb-1.5 font-mono">
                <Star className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>GOOGLE BUSINESS REVIEW LINK</span>
              </label>
              <input
                type="url"
                value={formData.googleReviewUrl}
                onChange={(e) => handleChange('googleReviewUrl', e.target.value)}
                className="w-full bg-black/60 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Instagram Showcase Images */}
        <div className="bg-[#0f0f12] border border-white/10 p-6 space-y-5">
          <h3 className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold border-b border-white/10 pb-3">
            02. INSTAGRAM SHOWCASE POSTS (GRID)
          </h3>
          <p className="text-[11px] text-white/40">
            Showcased images at the bottom of the homepage linking directly to your studio Instagram.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const currentImg = formData.instagramImages[idx] || '';
              return (
                <div key={idx} className="bg-black/60 border border-white/10 p-3 space-y-2">
                  <span className="block text-[10px] tracking-wider uppercase text-white/50 font-mono">
                    POST {idx + 1}
                  </span>
                  {currentImg && (
                    <div className="aspect-square w-full bg-black overflow-hidden border border-white/10 mb-2">
                      <img src={currentImg} alt={`Post ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="text"
                    value={currentImg}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="Image URL..."
                    className="w-full bg-black/80 border border-white/15 px-2.5 py-1.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                  <label className="block text-center py-1.5 border border-white/20 hover:border-[#d4af37] text-white/70 hover:text-white text-[10px] uppercase cursor-pointer transition-colors">
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUploadShowcase(idx, e)} className="hidden" />
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[#d4af37] hover:bg-[#c49f2b] text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-xl"
          >
            {saving ? 'SAVING...' : 'SAVE SOCIAL MEDIA SETTINGS'}
          </button>
        </div>
      </form>
    </div>
  );
};
