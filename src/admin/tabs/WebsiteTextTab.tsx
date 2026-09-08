import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../../types';

interface WebsiteTextTabProps {
  settings?: SiteSettings;
  onRefresh?: () => void;
}

export const WebsiteTextTab: React.FC<WebsiteTextTabProps> = ({ settings, onRefresh }) => {
  const [formData, setFormData] = useState<Partial<SiteSettings>>({
    brandName: '',
    heroHeadline: '',
    heroSubtitle: '',
    heroButtonText: '',
    heroSecondaryButtonText: '',
    founderHeading: '',
    preweddingIntroSubtitle: '',
    preweddingIntroTitle: '',
    weddingIntroSubtitle: '',
    weddingIntroTitle: '',
    filmsHeading: '',
    filmsSubtitle: '',
    maternityIntroSubtitle: '',
    maternityIntroTitle: '',
    reviewsHeading: '',
    reviewsSubtitle: '',
    contactHeading: '',
    contactSubtitle: '',
    footerText: '',
    aboutHeadline: '',
    aboutParagraph1: '',
    aboutParagraph2: '',
    aboutAuthor: '',
    whatsappNumber: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    instagramUrl: '',
    instagramHandle: '',
    ...settings
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (settings) {
      setFormData(prev => ({ ...prev, ...settings }));
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('sen_admin_token') || localStorage.getItem('token') || '';
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error('Failed to save website text');
      }

      setMessage({ text: 'All changes saved successfully!', type: 'success' });
      if (onRefresh) onRefresh();
    } catch (err: any) {
      setMessage({ text: err.message || 'Error saving changes', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 text-stone-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h2 className="text-2xl font-serif text-amber-500">Website Text Editor</h2>
            <p className="text-xs text-stone-400">Edit headlines, titles, and company details.</p>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-2.5 rounded shadow disabled:opacity-50 uppercase tracking-wider text-xs"
          >
            {saving ? 'Saving...' : '💾 Save All Changes'}
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded text-sm ${message.type === 'success' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}`}>
            {message.text}
          </div>
        )}

        {/* Brand & Hero Section */}
        <div className="space-y-4 bg-stone-900/60 p-5 rounded-lg border border-stone-800">
          <h3 className="text-sm font-bold tracking-wider text-stone-400 uppercase">01. Hero & Branding</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm focus:border-amber-500 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Hero Main Headline</label>
              <input
                type="text"
                name="heroHeadline"
                value={formData.heroHeadline || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm focus:border-amber-500 outline-none text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs uppercase text-stone-400 mb-1">Hero Subtitle</label>
              <input
                type="text"
                name="heroSubtitle"
                value={formData.heroSubtitle || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm focus:border-amber-500 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Primary Button Text</label>
              <input
                type="text"
                name="heroButtonText"
                value={formData.heroButtonText || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm focus:border-amber-500 outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Secondary Button Text</label>
              <input
                type="text"
                name="heroSecondaryButtonText"
                value={formData.heroSecondaryButtonText || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm focus:border-amber-500 outline-none text-white"
              />
            </div>
          </div>
        </div>

        {/* Section Titles */}
        <div className="space-y-4 bg-stone-900/60 p-5 rounded-lg border border-stone-800">
          <h3 className="text-sm font-bold tracking-wider text-stone-400 uppercase">02. Section Headings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Pre-Wedding Title</label>
              <input
                type="text"
                name="preweddingIntroTitle"
                value={formData.preweddingIntroTitle || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Wedding Title</label>
              <input
                type="text"
                name="weddingIntroTitle"
                value={formData.weddingIntroTitle || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Cinematic Films Heading</label>
              <input
                type="text"
                name="filmsHeading"
                value={formData.filmsHeading || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Contact Heading</label>
              <input
                type="text"
                name="contactHeading"
                value={formData.contactHeading || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm text-white"
              />
            </div>
          </div>
        </div>

        {/* Contact & Social Info */}
        <div className="space-y-4 bg-stone-900/60 p-5 rounded-lg border border-stone-800">
          <h3 className="text-sm font-bold tracking-wider text-stone-400 uppercase">03. Contact Details & Social</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">WhatsApp / Phone Number</label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Instagram URL</label>
              <input
                type="text"
                name="instagramUrl"
                value={formData.instagramUrl || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-stone-400 mb-1">Instagram Handle</label>
              <input
                type="text"
                name="instagramHandle"
                value={formData.instagramHandle || ''}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded p-2.5 text-sm text-white"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};