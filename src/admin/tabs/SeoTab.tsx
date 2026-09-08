import React, { useState } from 'react';
import { Globe, Search, CheckCircle, Save } from 'lucide-react';
import { SiteSettings } from '../../types';
import { api } from '../../services/api';

interface SeoTabProps {
  settings: SiteSettings;
  onRefreshData: () => void;
  showStatus: (type: 'success' | 'error', text: string) => void;
}

export const SeoTab: React.FC<SeoTabProps> = ({ settings, onRefreshData, showStatus }) => {
  const [formData, setFormData] = useState({
    seoTitle: settings.seoTitle || 'SEN PHOTOGRAPHY | Luxury Indian Wedding Photography & Cinema',
    seoDescription: settings.seoDescription || 'SEN Photography specializes in royal destination weddings, timeless portraiture, and cinematic storytelling across Udaipur, Jaipur, and worldwide.',
    brandName: settings.brandName || 'SEN PHOTOGRAPHY'
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateSettings(formData);
      showStatus('success', 'SEO meta tags updated successfully');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to update SEO settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#d4af37] text-xs tracking-widest uppercase mb-1 font-mono">
            <Globe className="w-4 h-4" />
            <span>SEARCH ENGINE OPTIMIZATION</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
            SEO & Search Discovery
          </h2>
          <p className="text-xs text-white/50 tracking-wider font-light mt-1">
            Optimize how SEN PHOTOGRAPHY appears on Google, WhatsApp previews, and social cards.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-lg self-start sm:self-auto disabled:opacity-50"
        >
          <CheckCircle className="w-4 h-4" />
          <span>{saving ? 'SAVING...' : 'SAVE SEO SETTINGS'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-[#0f0f12] border border-white/10 p-6 space-y-5">
          <h3 className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold border-b border-white/10 pb-3">
            01. META TAGS & SEARCH IDENTITY
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] tracking-wider uppercase text-white/70 font-mono">
                  SEO PAGE TITLE (&lt;TITLE&gt;)
                </label>
                <span className="text-[10px] text-white/40">{formData.seoTitle.length}/60 characters</span>
              </div>
              <input
                type="text"
                required
                value={formData.seoTitle}
                onChange={(e) => setFormData((p) => ({ ...p, seoTitle: e.target.value }))}
                className="w-full bg-black/60 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] tracking-wider uppercase text-white/70 font-mono">
                  META DESCRIPTION
                </label>
                <span className="text-[10px] text-white/40">{formData.seoDescription.length}/160 characters</span>
              </div>
              <textarea
                required
                rows={4}
                value={formData.seoDescription}
                onChange={(e) => setFormData((p) => ({ ...p, seoDescription: e.target.value }))}
                className="w-full bg-black/60 border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Live Search Engine Snippet Simulation */}
        <div className="bg-[#0f0f12] border border-white/10 p-6 space-y-4">
          <div className="flex items-center space-x-2 text-xs tracking-wider uppercase text-white/50 font-mono border-b border-white/10 pb-3">
            <Search className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>GOOGLE SEARCH PREVIEW (SIMULATION)</span>
          </div>

          <div className="p-4 bg-white text-left rounded-md shadow-inner space-y-1">
            <div className="flex items-center space-x-2 text-xs text-[#202124]">
              <span className="font-sans text-xs text-[#202124]">https://senphotography.com</span>
            </div>
            <h4 className="text-base sm:text-lg text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug">
              {formData.seoTitle}
            </h4>
            <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
              {formData.seoDescription}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[#d4af37] hover:bg-[#c49f2b] text-black font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-xl"
          >
            {saving ? 'SAVING...' : 'APPLY SEO CHANGES'}
          </button>
        </div>
      </form>
    </div>
  );
};
