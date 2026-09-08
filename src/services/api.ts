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
import {
  initialSiteSettings,
  initialWeddingStories,
  initialPhotos,
  initialFilms,
  initialTestimonials,
  initialHeroImages,
  initialPreWeddingStories,
  initialFounder
} from '../data/defaultData';

export const api = {
  // Settings
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return initialSiteSettings;
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    const data = await res.json();
    return data.settings;
  },

  // Hero Slideshow Images
  async getHeroImages(): Promise<HeroImage[]> {
    try {
      const res = await fetch('/api/hero-images');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return initialHeroImages;
  },

  async createHeroImage(image: Partial<HeroImage>): Promise<HeroImage> {
    const res = await fetch('/api/hero-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    });
    if (!res.ok) throw new Error('Failed to add hero image');
    const data = await res.json();
    return data.image;
  },

  async updateHeroImage(id: string, image: Partial<HeroImage>): Promise<HeroImage> {
    const res = await fetch(`/api/hero-images/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    });
    if (!res.ok) throw new Error('Failed to update hero image');
    const data = await res.json();
    return data.image;
  },

  async deleteHeroImage(id: string): Promise<boolean> {
    const res = await fetch(`/api/hero-images/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  async reorderHeroImages(images: HeroImage[], interval?: number): Promise<HeroImage[]> {
    const res = await fetch('/api/hero-images/reorder/all', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images, interval })
    });
    if (!res.ok) throw new Error('Failed to reorder hero images');
    const data = await res.json();
    return data.hero_images;
  },

  // Founder
  async getFounder(): Promise<FounderSettings> {
    try {
      const res = await fetch('/api/founder');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return initialFounder;
  },

  async updateFounder(founder: Partial<FounderSettings>): Promise<FounderSettings> {
    const res = await fetch('/api/founder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(founder)
    });
    if (!res.ok) throw new Error('Failed to update founder settings');
    const data = await res.json();
    return data.founder;
  },

  // Pre-Wedding Stories
  async getPreWeddings(): Promise<PreWeddingStory[]> {
    try {
      const res = await fetch('/api/preweddings');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return initialPreWeddingStories;
  },

  async createPreWedding(story: Partial<PreWeddingStory>): Promise<PreWeddingStory> {
    const res = await fetch('/api/preweddings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story)
    });
    if (!res.ok) throw new Error('Failed to create pre-wedding story');
    const data = await res.json();
    return data.story;
  },

  async updatePreWedding(id: string, story: Partial<PreWeddingStory>): Promise<PreWeddingStory> {
    const res = await fetch(`/api/preweddings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story)
    });
    if (!res.ok) throw new Error('Failed to update pre-wedding story');
    const data = await res.json();
    return data.story;
  },

  async deletePreWedding(id: string): Promise<boolean> {
    const res = await fetch(`/api/preweddings/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // Photos
  async getPhotos(category?: string, featured?: boolean): Promise<PhotoItem[]> {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'ALL') params.append('category', category);
      if (featured) params.append('featured', 'true');
      const res = await fetch(`/api/photos?${params.toString()}`);
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return initialPhotos;
  },

  async createPhoto(photo: Partial<PhotoItem>): Promise<PhotoItem> {
    const res = await fetch('/api/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo)
    });
    if (!res.ok) throw new Error('Failed to create photo');
    const data = await res.json();
    return data.photo;
  },

  async updatePhoto(id: string, photo: Partial<PhotoItem>): Promise<PhotoItem> {
    const res = await fetch(`/api/photos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo)
    });
    if (!res.ok) throw new Error('Failed to update photo');
    const data = await res.json();
    return data.photo;
  },

  async deletePhoto(id: string): Promise<boolean> {
    const res = await fetch(`/api/photos/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // Upload image file
  async uploadImage(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(err.error || 'Failed to upload photo');
    }
    return await res.json();
  },

  // Wedding Stories
  async getStories(): Promise<WeddingStory[]> {
    try {
      const res = await fetch('/api/stories');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return initialWeddingStories;
  },

  async createStory(story: Partial<WeddingStory>): Promise<WeddingStory> {
    const res = await fetch('/api/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story)
    });
    if (!res.ok) throw new Error('Failed to create story');
    const data = await res.json();
    return data.story;
  },

  async updateStory(id: string, story: Partial<WeddingStory>): Promise<WeddingStory> {
    const res = await fetch(`/api/stories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story)
    });
    if (!res.ok) throw new Error('Failed to update story');
    const data = await res.json();
    return data.story;
  },

  async deleteStory(id: string): Promise<boolean> {
    const res = await fetch(`/api/stories/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // Films
  async getFilms(): Promise<WeddingFilm[]> {
    try {
      const res = await fetch('/api/films');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return initialFilms;
  },

  async createFilm(film: Partial<WeddingFilm>): Promise<WeddingFilm> {
    const res = await fetch('/api/films', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(film)
    });
    if (!res.ok) throw new Error('Failed to create film');
    const data = await res.json();
    return data.film;
  },

  async updateFilm(id: string, film: Partial<WeddingFilm>): Promise<WeddingFilm> {
    const res = await fetch(`/api/films/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(film)
    });
    if (!res.ok) throw new Error('Failed to update film');
    const data = await res.json();
    return data.film;
  },

  async deleteFilm(id: string): Promise<boolean> {
    const res = await fetch(`/api/films/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const res = await fetch('/api/testimonials');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return initialTestimonials;
  },

  async createTestimonial(testimonial: Partial<Testimonial>): Promise<Testimonial> {
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial)
    });
    if (!res.ok) throw new Error('Failed to create testimonial');
    const data = await res.json();
    return data.testimonial;
  },

  async updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial)
    });
    if (!res.ok) throw new Error('Failed to update testimonial');
    const data = await res.json();
    return data.testimonial;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const res = await fetch(`/api/testimonials/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // Enquiries
  async getEnquiries(): Promise<BookingEnquiry[]> {
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return [];
  },

  async submitEnquiry(enquiry: Omit<BookingEnquiry, 'id' | 'status' | 'createdAt'>): Promise<BookingEnquiry> {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry)
    });
    if (!res.ok) throw new Error('Failed to submit enquiry');
    const data = await res.json();
    return data.enquiry;
  },

  async updateEnquiry(id: string, updates: Partial<BookingEnquiry>): Promise<BookingEnquiry> {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update enquiry');
    const data = await res.json();
    return data.enquiry;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  },

  // Maternity & Kids
  async getMaternityItems(): Promise<any[]> {
    try {
      const res = await fetch('/api/maternity');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return [];
  },

  async createMaternityItem(item: any): Promise<any> {
    const res = await fetch('/api/maternity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to create maternity item');
    const data = await res.json();
    return data.item;
  },

  async updateMaternityItem(id: string, item: any): Promise<any> {
    const res = await fetch(`/api/maternity/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to update maternity item');
    const data = await res.json();
    return data.item;
  },

  async deleteMaternityItem(id: string): Promise<boolean> {
    const res = await fetch(`/api/maternity/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  // Multiple File Upload
  async uploadMultiple(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach((f) => formData.append('images', f));
    const res = await fetch('/api/upload-multiple', {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload images');
    const data = await res.json();
    return data.urls;
  },

  // Auth & Admin Account Management
  async login(username: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      return await res.json();
    } catch {
      return { success: false, message: 'Server connection error' };
    }
  },

  async verifyAuth(token?: string): Promise<boolean> {
    try {
      const activeToken = token || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('sen_admin_auth_token') || '' : '');
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`
        },
        body: JSON.stringify({ token: activeToken })
      });
      if (res.ok) {
        const data = await res.json();
        return data.valid === true;
      }
    } catch {
      // fallback
    }
    return false;
  },

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
  },

  async getAdminAccount(): Promise<{ email: string }> {
    try {
      const res = await fetch('/api/admin/account');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return { email: 'admin@senphotography.com' };
  },

  async updateAdminEmail(email: string): Promise<boolean> {
    const res = await fetch('/api/admin/account', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.ok;
  },

  async changeAdminPassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to change password' };
      }
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || 'Server error' };
    }
  },

  // Reset database
  async resetDatabase(): Promise<boolean> {
    try {
      const res = await fetch('/api/reset', { method: 'POST' });
      return res.ok;
    } catch {
      return false;
    }
  }
};
