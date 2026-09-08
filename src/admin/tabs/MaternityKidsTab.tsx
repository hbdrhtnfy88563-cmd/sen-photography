import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Upload, MoveUp, MoveDown, Image as ImageIcon, Save, CheckCircle } from 'lucide-react';
import { SiteSettings, PhotoItem } from '../../types';
import { api } from '../../services/api';

interface MaternityKidsTabProps {
  settings: SiteSettings;
  photos: PhotoItem[];
  onRefreshData: () => void;
  showStatus: (type: 'success' | 'error', text: string) => void;
  onFileUpload: (file: File) => Promise<string | null>;
}

export const MaternityKidsTab: React.FC<MaternityKidsTabProps> = ({
  settings,
  photos,
  onRefreshData,
  showStatus,
  onFileUpload
}) => {
  const familyPhotos = photos.filter(
    (p) => p.category.toUpperCase() === 'MATERNITY' || p.category.toUpperCase() === 'KIDS'
  );

  // Intro settings form
  const [introSettings, setIntroSettings] = useState({
    maternityIntroImage: settings.maternityIntroImage || 'https://images.unsplash.com/photo-1544126592-807ade215a0f?auto=format&fit=crop&w=2400&q=85',
    maternityIntroSubtitle: settings.maternityIntroSubtitle || 'THE SACRED CHAPTERS',
    maternityIntroTitle: settings.maternityIntroTitle || 'MATERNITY & KIDS',
    maternityKidsEnabled: settings.maternityKidsEnabled !== false
  });
  const [savingIntro, setSavingIntro] = useState(false);

  // Photo modal form
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null);
  const [photoForm, setPhotoForm] = useState({
    title: '',
    caption: '',
    image_url: '',
    category: 'MATERNITY' as 'MATERNITY' | 'KIDS',
    sort_order: 1
  });

  const handleSaveIntro = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingIntro(true);
    try {
      await api.updateSettings(introSettings);
      showStatus('success', 'Maternity & Kids intro settings updated');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to update intro settings');
    } finally {
      setSavingIntro(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingPhoto(null);
    setPhotoForm({
      title: '',
      caption: '',
      image_url: '',
      category: 'MATERNITY',
      sort_order: familyPhotos.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (photo: PhotoItem) => {
    setEditingPhoto(photo);
    setPhotoForm({
      title: photo.title,
      caption: photo.caption || '',
      image_url: photo.image_url,
      category: (photo.category.toUpperCase() === 'KIDS' ? 'KIDS' : 'MATERNITY') as 'MATERNITY' | 'KIDS',
      sort_order: photo.sort_order || 1
    });
    setModalOpen(true);
  };

  const handleSavePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.image_url) {
      showStatus('error', 'Please provide or upload an image');
      return;
    }

    try {
      if (editingPhoto) {
        await api.updatePhoto(editingPhoto.id, {
          ...editingPhoto,
          title: photoForm.title,
          caption: photoForm.caption,
          image_url: photoForm.image_url,
          category: photoForm.category,
          sort_order: photoForm.sort_order
        });
        showStatus('success', 'Photo updated');
      } else {
        await api.createPhoto({
          title: photoForm.title || 'Maternity Portrait',
          caption: photoForm.caption || 'A TIMELESS MOMENT',
          image_url: photoForm.image_url,
          category: photoForm.category,
          location: 'Studio & Natural',
          couple_name: '',
          date: '2026',
          featured: true,
          sort_order: photoForm.sort_order
        });
        showStatus('success', 'New photo added to Maternity & Kids gallery');
      }
      setModalOpen(false);
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to save photo');
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Remove this photo from Maternity & Kids?')) return;
    try {
      await api.deletePhoto(id);
      showStatus('success', 'Photo removed');
      onRefreshData();
    } catch {
      showStatus('error', 'Failed to delete photo');
    }
  };

  const handleUploadDirect = async (e: React.ChangeEvent<HTMLInputElement>, isIntro = false) => {
    if (!e.target.files?.[0]) return;
    const url = await onFileUpload(e.target.files[0]);
    if (url) {
      if (isIntro) {
        setIntroSettings((prev) => ({ ...prev, maternityIntroImage: url }));
      } else {
        setPhotoForm((prev) => ({ ...prev, image_url: url }));
      }
    }
    e.target.value = '';
  };

  return (
    <div className="space-y-10 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#d4af37] text-xs tracking-widest uppercase mb-1 font-mono">
            <ImageIcon className="w-4 h-4" />
            <span>PORTRAIT ATELIER</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
            Maternity & Kids Gallery
          </h2>
          <p className="text-xs text-white/50 tracking-wider font-light mt-1">
            Manage full-screen cinematic intro, editorial framed portraits, and individual captions.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#d4af37] hover:bg-[#c49f2b] text-[#0c0c0d] font-semibold text-xs tracking-[0.2em] uppercase transition-all shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PHOTO</span>
        </button>
      </div>

      {/* 01. FULL-SCREEN INTRO SETTINGS */}
      <form onSubmit={handleSaveIntro} className="bg-[#0f0f12] border border-white/10 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold">
              01. FULL-SCREEN INTRO IMAGE & HEADINGS
            </h3>
            <p className="text-[11px] text-white/40 mt-0.5">
              100% viewport width & height, no border, slow smooth zoom OUT
            </p>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={introSettings.maternityKidsEnabled}
              onChange={(e) => setIntroSettings((p) => ({ ...p, maternityKidsEnabled: e.target.checked }))}
              className="accent-[#d4af37]"
            />
            <span className="text-white/80">Section Enabled on Website</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                INTRO SUBTITLE
              </label>
              <input
                type="text"
                value={introSettings.maternityIntroSubtitle}
                onChange={(e) => setIntroSettings((p) => ({ ...p, maternityIntroSubtitle: e.target.value }))}
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                INTRO TITLE
              </label>
              <input
                type="text"
                value={introSettings.maternityIntroTitle}
                onChange={(e) => setIntroSettings((p) => ({ ...p, maternityIntroTitle: e.target.value }))}
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                FULLSCREEN INTRO IMAGE URL
              </label>
              <input
                type="text"
                value={introSettings.maternityIntroImage}
                onChange={(e) => setIntroSettings((p) => ({ ...p, maternityIntroImage: e.target.value }))}
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <label className="inline-flex items-center space-x-2 px-4 py-2 border border-white/20 hover:border-[#d4af37] text-white/80 hover:text-white text-xs cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>UPLOAD NEW INTRO IMAGE</span>
              <input type="file" accept="image/*" onChange={(e) => handleUploadDirect(e, true)} className="hidden" />
            </label>
          </div>

          <div>
            <span className="block text-[10px] tracking-wider uppercase text-white/40 mb-2 font-mono">
              PREVIEW (NO BORDER INTRO)
            </span>
            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden border border-white/10">
              <img
                src={introSettings.maternityIntroImage}
                alt="Maternity Intro Preview"
                className="w-full h-full object-cover brightness-[0.75]"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/90">
                  {introSettings.maternityIntroSubtitle}
                </span>
                <h4 className="font-serif text-2xl text-white mt-1">
                  {introSettings.maternityIntroTitle}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={savingIntro}
            className="px-5 py-2.5 bg-white text-black hover:bg-[#d4af37] text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{savingIntro ? 'SAVING...' : 'SAVE INTRO SETTINGS'}</span>
          </button>
        </div>
      </form>

      {/* 02. GALLERY LIST */}
      <div className="space-y-4">
        <h3 className="text-xs tracking-[0.25em] uppercase text-[#d4af37] font-semibold">
          02. GALLERY PHOTOS ({familyPhotos.length})
        </h3>
        <p className="text-[11px] text-white/40">
          White background gallery. Every photo has a premium border and an editable caption underneath.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-[#0f0f12] border border-white/10 overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/5] bg-black/50 overflow-hidden">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-white/15 text-[9px] tracking-widest uppercase text-[#d4af37]">
                  {photo.category}
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="font-serif text-lg text-white font-normal">{photo.title}</h4>
                  <p className="font-serif italic text-xs text-white/60 mt-1">
                    "{photo.caption || 'A SACRED GIFT OF NEW LIFE'}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenEdit(photo)}
                    className="flex items-center space-x-1.5 text-xs text-[#d4af37] hover:underline"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>EDIT</span>
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="flex items-center space-x-1.5 text-xs text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>DELETE</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: ADD / EDIT PHOTO */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111114] border border-white/15 p-6 sm:p-8 max-w-lg w-full space-y-5 text-white">
            <h3 className="font-serif text-xl sm:text-2xl text-white">
              {editingPhoto ? 'Edit Maternity & Kids Photo' : 'Add New Photo'}
            </h3>

            <form onSubmit={handleSavePhoto} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                  TITLE
                </label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="e.g. The Golden Hour of Motherhood"
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                  CAPTION (UNDERNEATH PHOTO)
                </label>
                <input
                  type="text"
                  value={photoForm.caption}
                  onChange={(e) => setPhotoForm((p) => ({ ...p, caption: e.target.value }))}
                  placeholder="e.g. A MOMENT WE WILL ALWAYS REMEMBER"
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                  CATEGORY
                </label>
                <select
                  value={photoForm.category}
                  onChange={(e) => setPhotoForm((p) => ({ ...p, category: e.target.value as any }))}
                  className="w-full bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                >
                  <option value="MATERNITY">MATERNITY</option>
                  <option value="KIDS">KIDS & HEIRLOOMS</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] tracking-wider uppercase text-white/60 mb-1 font-mono">
                  IMAGE URL OR UPLOAD
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    required
                    value={photoForm.image_url}
                    onChange={(e) => setPhotoForm((p) => ({ ...p, image_url: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-black/60 border border-white/15 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                  />
                  <label className="px-3 py-2 border border-white/20 hover:border-[#d4af37] text-white/80 hover:text-white text-xs cursor-pointer flex items-center space-x-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUploadDirect(e, false)} className="hidden" />
                  </label>
                </div>
              </div>

              {photoForm.image_url && (
                <div className="aspect-[4/3] w-36 bg-black overflow-hidden border border-white/15 mt-2">
                  <img src={photoForm.image_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-xs text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#d4af37] hover:bg-[#c49f2b] text-black font-semibold text-xs tracking-wider uppercase"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
