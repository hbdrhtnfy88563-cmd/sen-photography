import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Upload, Star, MoveUp, MoveDown, CheckCircle, Quote } from 'lucide-react';
import { Testimonial, SiteSettings } from '../../types';
import { api } from '../../services/api';

interface ReviewsTabProps {
  testimonials: Testimonial[];
  settings: SiteSettings;
  onRefreshData: () => void;
  showStatus: (type: 'success' | 'error', text: string) => void;
  onFileUpload: (file: File) => Promise<string | null>;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  testimonials,
  settings,
  onRefreshData,
  showStatus,
  onFileUpload
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({
    couple_name: '',
    photo_url: '',
    quote: '',
    location: '',
    event_year: new Date().getFullYear().toString(),
    shoot_type: 'Royal Destination Wedding',
    rating: 5,
    sort_order: 1
  });

  const [headerSettings, setHeaderSettings] = useState({
    reviewsHeading: settings.reviewsHeading || 'CUSTOMER REVIEWS',
    reviewsSubtitle: settings.reviewsSubtitle || 'WORDS FROM OUR COUPLES'
  });
  const [savingHeader, setSavingHeader] = useState(false);

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHeader(true);
    try {
      await api.updateSettings(headerSettings);
      showStatus('success', 'Customer Reviews heading updated');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to update heading');
    } finally {
      setSavingHeader(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingReview(null);
    setForm({
      couple_name: '',
      photo_url: '',
      quote: '',
      location: 'Udaipur, Rajasthan',
      event_year: new Date().getFullYear().toString(),
      shoot_type: 'Royal Destination Wedding',
      rating: 5,
      sort_order: testimonials.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (rev: Testimonial) => {
    setEditingReview(rev);
    setForm({
      couple_name: rev.couple_name,
      photo_url: rev.photo_url || '',
      quote: rev.quote,
      location: rev.location || '',
      event_year: rev.event_year || new Date().getFullYear().toString(),
      shoot_type: rev.shoot_type || 'Royal Destination Wedding',
      rating: rev.rating || 5,
      sort_order: rev.sort_order || 1
    });
    setModalOpen(true);
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.couple_name || !form.quote) {
      showStatus('error', 'Please enter customer name and review text');
      return;
    }

    try {
      if (editingReview) {
        await api.updateTestimonial(editingReview.id, {
          ...editingReview,
          couple_name: form.couple_name,
          photo_url: form.photo_url,
          quote: form.quote,
          location: form.location,
          event_year: form.event_year,
          shoot_type: form.shoot_type,
          rating: Number(form.rating) || 5,
          sort_order: Number(form.sort_order) || 1
        });
        showStatus('success', 'Review updated');
      } else {
        await api.createTestimonial({
          couple_name: form.couple_name,
          photo_url: form.photo_url,
          quote: form.quote,
          location: form.location,
          event_year: form.event_year,
          shoot_type: form.shoot_type,
          rating: Number(form.rating) || 5,
          sort_order: Number(form.sort_order) || testimonials.length + 1
        });
        showStatus('success', 'New customer review added');
      }
      setModalOpen(false);
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save customer review');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await api.deleteTestimonial(id);
      showStatus('success', 'Review deleted');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to delete review');
    }
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const url = await onFileUpload(e.target.files[0]);
    if (url) {
      setForm((prev) => ({ ...prev, photo_url: url }));
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#ff4d4d] text-xs tracking-widest uppercase mb-1 font-mono">
            <Quote className="w-4 h-4 text-[#dc2626]" />
            <span>BLACK & RED SIGNATURE SECTION</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
            Customer Reviews & Words of Love
          </h2>
          <p className="text-xs text-white/50 tracking-wider font-light mt-1">
            Manage high-impact client testimonials featured in the bold Black & Red cinematic section.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW REVIEW</span>
        </button>
      </div>

      {/* Headings form */}
      <form onSubmit={handleSaveHeader} className="bg-[#0c0505] border border-[#331111] p-6 space-y-4">
        <h3 className="text-xs tracking-[0.25em] uppercase text-[#ff4d4d] font-semibold">
          SECTION HEADINGS (BLACK & RED THEME)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
              BADGE HEADING
            </label>
            <input
              type="text"
              value={headerSettings.reviewsHeading}
              onChange={(e) => setHeaderSettings((p) => ({ ...p, reviewsHeading: e.target.value }))}
              className="w-full bg-black/80 border border-[#441111] px-3 py-2 text-xs text-white focus:border-[#dc2626] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
              MAIN TITLE
            </label>
            <input
              type="text"
              value={headerSettings.reviewsSubtitle}
              onChange={(e) => setHeaderSettings((p) => ({ ...p, reviewsSubtitle: e.target.value }))}
              className="w-full bg-black/80 border border-[#441111] px-3 py-2 text-xs text-white focus:border-[#dc2626] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingHeader}
            className="px-5 py-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs tracking-wider uppercase font-semibold transition-colors flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{savingHeader ? 'SAVING...' : 'UPDATE HEADINGS'}</span>
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.25em] uppercase text-[#ff4d4d] font-semibold">
          REVIEWS LIST ({testimonials.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#0d0707] border border-[#2b0c0c] hover:border-[#dc2626]/50 p-6 flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Avatar with Red border */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#dc2626] bg-black">
                      {rev.photo_url ? (
                        <img src={rev.photo_url} alt={rev.couple_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#ff4d4d] font-bold">
                          {rev.couple_name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-white font-medium">{rev.couple_name}</h4>
                      <p className="text-[11px] text-[#ff8080] tracking-wider uppercase">
                        {rev.location} · {rev.event_year}
                      </p>
                    </div>
                  </div>

                  {/* Stars in Red */}
                  <div className="flex items-center space-x-1 text-[#dc2626]">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {rev.shoot_type && (
                  <div className="inline-block px-2.5 py-0.5 bg-[#220707] border border-[#dc2626]/30 text-[10px] tracking-widest text-[#ff8080] uppercase mb-3 font-mono">
                    {rev.shoot_type}
                  </div>
                )}

                <blockquote className="font-serif italic text-sm text-white/90 leading-relaxed">
                  "{rev.quote}"
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2b0c0c] flex items-center justify-between">
                <button
                  onClick={() => handleOpenEdit(rev)}
                  className="flex items-center space-x-1.5 text-xs text-[#ff6666] hover:underline"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>EDIT REVIEW</span>
                </button>
                <button
                  onClick={() => handleDelete(rev.id)}
                  className="flex items-center space-x-1.5 text-xs text-white/40 hover:text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>DELETE</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD / EDIT REVIEW */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140808] border border-[#441111] p-6 sm:p-8 max-w-lg w-full space-y-5 text-white shadow-2xl">
            <h3 className="font-serif text-xl sm:text-2xl text-white">
              {editingReview ? 'Edit Customer Review' : 'Add New Customer Review'}
            </h3>

            <form onSubmit={handleSaveReview} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                  CUSTOMER / COUPLE NAME
                </label>
                <input
                  type="text"
                  required
                  value={form.couple_name}
                  onChange={(e) => setForm((p) => ({ ...p, couple_name: e.target.value }))}
                  placeholder="e.g. Radhika & Siddharth"
                  className="w-full bg-black border border-[#441111] px-3 py-2 text-xs text-white focus:border-[#dc2626] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                    LOCATION
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. Udaipur, Rajasthan"
                    className="w-full bg-black border border-[#441111] px-3 py-2 text-xs text-white focus:border-[#dc2626] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                    EVENT YEAR
                  </label>
                  <input
                    type="text"
                    value={form.event_year}
                    onChange={(e) => setForm((p) => ({ ...p, event_year: e.target.value }))}
                    placeholder="2026"
                    className="w-full bg-black border border-[#441111] px-3 py-2 text-xs text-white focus:border-[#dc2626] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                  EVENT TYPE
                </label>
                <input
                  type="text"
                  value={form.shoot_type}
                  onChange={(e) => setForm((p) => ({ ...p, shoot_type: e.target.value }))}
                  placeholder="e.g. Royal Destination Wedding & Films"
                  className="w-full bg-black border border-[#441111] px-3 py-2 text-xs text-white focus:border-[#dc2626] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                  CUSTOMER PHOTO URL OR UPLOAD
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={form.photo_url}
                    onChange={(e) => setForm((p) => ({ ...p, photo_url: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-black border border-[#441111] px-3 py-2 text-xs text-white focus:border-[#dc2626] focus:outline-none"
                  />
                  <label className="px-3 py-2 border border-[#441111] hover:border-[#dc2626] text-white/80 hover:text-white text-xs cursor-pointer flex items-center space-x-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#dc2626]" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleUploadPhoto} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                  REVIEW TEXT / QUOTE
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.quote}
                  onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
                  placeholder="Share the couple's genuine feedback and heartfelt words..."
                  className="w-full bg-black border border-[#441111] px-3 py-2 text-xs text-white focus:border-[#dc2626] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-[#331111]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-xs tracking-wider uppercase"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
