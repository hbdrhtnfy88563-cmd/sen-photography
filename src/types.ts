export interface HeroImage {
  id: string;
  image_url: string;
  title?: string;
  sort_order: number;
  active: boolean;
  created_at: string;
}

export interface FounderSettings {
  photo_url: string;
  name: string;
  designation_line1: string;
  designation_line2: string;
  short_description: string;
  long_description: string;
}

export interface PreWeddingStory {
  id: string;
  title: string;
  couple_name: string;
  location: string;
  date: string;
  cover_image: string;
  description: string;
  caption: string; // Underneath photo caption line (e.g. A MOMENT WE WILL ALWAYS REMEMBER)
  gallery: string[];
  sort_order?: number;
  featured?: boolean;
}

export interface PhotoItem {
  id: string;
  image_url: string;
  title: string;
  caption?: string; // photo caption
  category: 'WEDDINGS' | 'PRE-WEDDINGS' | 'FILMS' | 'MATERNITY' | 'KIDS' | 'FEATURED' | string;
  subcategory?: string;
  location: string;
  couple_name: string;
  date: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  story_id?: string;
  aspect_ratio?: 'portrait' | 'landscape' | 'square';
}

export interface WeddingStory {
  id: string;
  title: string;
  subtitle: string;
  couple_name: string;
  location: string;
  date: string;
  cover_image: string;
  caption?: string; // Underneath photo caption line
  category: string;
  featured: boolean;
  description: string;
  highlights: string[];
  gallery: string[];
  film_url?: string;
  sort_order?: number;
}

export interface WeddingFilm {
  id: string;
  title: string;
  couple_name: string;
  location: string;
  duration: string;
  cover_image: string;
  video_url: string;
  description?: string;
  featured: boolean;
  sort_order?: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  couple_name: string;
  location: string;
  event_year: string;
  shoot_type?: string;
  photo_url?: string;
  rating?: number;
  sort_order?: number;
}

export interface MaternityItem {
  id: string;
  title: string;
  caption: string;
  image_url: string;
  category: 'MATERNITY' | 'KIDS';
  sort_order: number;
}

export interface SiteSettings {
  brandName: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroSecondaryButtonText: string;
  heroImage: string; // fallback single
  heroSlideshowInterval: number; // in milliseconds (default 1000)
  heroImages: HeroImage[];
  founder: FounderSettings;
  
  // Section Headings & Subheadings
  founderHeading: string;
  
  preweddingIntroImage: string;
  preweddingIntroSubtitle: string;
  preweddingIntroTitle: string;
  preweddingVisibleCount: number; // default 4
  
  weddingIntroImage: string;
  weddingIntroSubtitle: string;
  weddingIntroTitle: string;
  
  filmsHeading: string;
  filmsSubtitle: string;
  
  maternityIntroImage: string;
  maternityIntroSubtitle: string;
  maternityIntroTitle: string;
  maternityKidsEnabled: boolean;
  
  reviewsHeading: string;
  reviewsSubtitle: string;
  
  contactHeading: string;
  contactSubtitle: string;

  aboutHeadline: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutAuthor: string;
  aboutImage: string;

  // Contact info
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;

  // Socials
  instagramUrl: string;
  instagramHandle: string;
  googleReviewUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramImages: string[];

  // SEO & OpenGraph
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  socialShareImage?: string;
}

export interface AdminAccount {
  email: string;
  recoveryQuestion?: string;
  hasRecoveryAnswer?: boolean;
  lastLoginAt?: string;
  updatedAt?: string;
}

export interface SecurityLogItem {
  id: string;
  type: 'LOGIN_SUCCESS' | 'LOGOUT' | 'LOGIN_FAILED' | 'PASSWORD_CHANGED' | 'EMAIL_CHANGED' | 'RECOVERY_ATTEMPT' | 'RECOVERY_SUCCESS';
  timestamp: string;
  ip: string;
  userAgent?: string;
  details?: string;
}

export interface BookingEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  weddingDate: string;
  location: string;
  eventType: string;
  message: string;
  status: 'New' | 'Contacted' | 'Booked';
  createdAt: string;
}
