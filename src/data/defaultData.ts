import {
  PhotoItem,
  WeddingStory,
  WeddingFilm,
  Testimonial,
  SiteSettings,
  HeroImage,
  PreWeddingStory,
  FounderSettings,
  MaternityItem
} from '../types';

export const initialHeroImages: HeroImage[] = [
  {
    id: 'hero-1',
    image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 01 — Royal Amber Courtyard Pheras',
    sort_order: 1,
    active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'hero-2',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 02 — Ethereal Bridal Gaze & Heirloom Polki',
    sort_order: 2,
    active: true,
    created_at: '2026-01-02T00:00:00Z'
  },
  {
    id: 'hero-3',
    image_url: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 03 — Golden Hour Lake Pichola Sunset',
    sort_order: 3,
    active: true,
    created_at: '2026-01-03T00:00:00Z'
  },
  {
    id: 'hero-4',
    image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 04 — Samode Palace Whispers',
    sort_order: 4,
    active: true,
    created_at: '2026-01-04T00:00:00Z'
  },
  {
    id: 'hero-5',
    image_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 05 — Royal Baraat In Crimson & Gold',
    sort_order: 5,
    active: true,
    created_at: '2026-01-05T00:00:00Z'
  },
  {
    id: 'hero-6',
    image_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 06 — Intimate Sabyasachi Couple Silhouette',
    sort_order: 6,
    active: true,
    created_at: '2026-01-06T00:00:00Z'
  },
  {
    id: 'hero-7',
    image_url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 07 — Sacred Vows & Agni Kund Glow',
    sort_order: 7,
    active: true,
    created_at: '2026-01-07T00:00:00Z'
  },
  {
    id: 'hero-8',
    image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 08 — Candid Euphoria & Rose Petal Shower',
    sort_order: 8,
    active: true,
    created_at: '2026-01-08T00:00:00Z'
  },
  {
    id: 'hero-9',
    image_url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 09 — The Leela Palace Grandeur',
    sort_order: 9,
    active: true,
    created_at: '2026-01-09T00:00:00Z'
  },
  {
    id: 'hero-10',
    image_url: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=2000&q=85',
    title: 'Hero Image 10 — Jodhpur Sand Dunes Sunrise',
    sort_order: 10,
    active: true,
    created_at: '2026-01-10T00:00:00Z'
  }
];

export const initialFounder: FounderSettings = {
  photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
  name: 'DIPAK',
  designation_line1: 'Founder',
  designation_line2: 'Lead Cinematographer',
  short_description: 'Every wedding has a story, but every story has a feeling. My goal is to preserve those real emotions through photographs and cinematic films.',
  long_description: 'Over the last decade, Dipak has directed and documented over 300 luxury destination celebrations across Rajasthan, Delhi, Mumbai, and royal heritage venues across Europe and Southeast Asia. With an unobtrusive, candid approach rooted in cinema-grade aesthetics, his vision for SEN PHOTOGRAPHY focuses on the unscripted poetry: the quiet tear shed behind a veil, the burst of spontaneous laughter during the varmala, and the enduring grace of ancestral heritage.'
};

export const initialPreWeddingStories: PreWeddingStory[] = [
  {
    id: 'pre-1',
    title: 'Aarav & Jyoti',
    couple_name: 'Aarav & Jyoti',
    location: 'Udaipur, Rajasthan',
    date: 'February 2026',
    cover_image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85',
    caption: 'A MOMENT WE WILL ALWAYS REMEMBER',
    description: 'A sunrise sail across the serene waters of Lake Pichola, followed by an editorial rendezvous at the majestic cenotaphs of Ahar. Ethereal pastel silhouettes meet ancient Mewari arches.',
    gallery: [
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85'
    ],
    sort_order: 1,
    featured: true
  },
  {
    id: 'pre-2',
    title: 'Rohan & Ananya',
    couple_name: 'Rohan & Ananya',
    location: 'Jodhpur Desert Dunes',
    date: 'January 2026',
    cover_image: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1600&q=85',
    caption: 'WHISPERS OF THE THAR AT DUSK',
    description: 'Golden hour romance carved amidst the rippling Thar desert dunes of Khimsar. Dramatic billowing capes, vintage Land Rover expeditions, and a fireside starlit evening.',
    gallery: [
      'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85'
    ],
    sort_order: 2,
    featured: true
  },
  {
    id: 'pre-3',
    title: 'Siddharth & Tanya',
    couple_name: 'Siddharth & Tanya',
    location: 'Nahargarh Fort, Jaipur',
    date: 'March 2026',
    cover_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85',
    caption: 'ROYALTY UNDER THE PINK CITY SKYLINE',
    description: 'Perched high above the Pink City at Nahargarh Fort, capturing the golden sun descending over Jaipur ramparts in flowing haute couture and cinematic black and white portraiture.',
    gallery: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=85'
    ],
    sort_order: 3,
    featured: true
  },
  {
    id: 'pre-4',
    title: 'Dev & Natasha',
    couple_name: 'Dev & Natasha',
    location: 'Gomukh & Kumbhalgarh',
    date: 'December 2025',
    cover_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
    caption: 'WHERE ANCIENT WALLS MEET ETERNAL DEVOTION',
    description: 'Amidst the second largest continuous wall in the world, Dev and Natasha celebrated their engagement enveloped in mountain mist, grand fort gateways, and intimate golden light.',
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85'
    ],
    sort_order: 4,
    featured: true
  },
  {
    id: 'pre-5',
    title: 'Kabir & Rhea',
    couple_name: 'Kabir & Rhea',
    location: 'Amer Stepwell & Panna Meena, Jaipur',
    date: 'November 2025',
    cover_image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1600&q=85',
    caption: 'GEOMETRY OF LOVE AT ANCIENT STEPWELLS',
    description: 'Symmetrical stepwell staircases, amber sandstone textures, and editorial fashion aesthetics created an unforgettable romantic chronicle in Jaipur.',
    gallery: [
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85'
    ],
    sort_order: 5,
    featured: false
  },
  {
    id: 'pre-6',
    title: 'Vikram & Simran',
    couple_name: 'Vikram & Simran',
    location: 'Fateh Sagar Lakeside, Udaipur',
    date: 'October 2025',
    cover_image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85',
    caption: 'SUNSET REFLECTIONS ON TRANQUIL WATERS',
    description: 'A tranquil evening promenade by the lakeside, celebrating warm quiet glances and laughter before their royal palace wedding ceremonies began.',
    gallery: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85'
    ],
    sort_order: 6,
    featured: false
  }
];

export const initialPreWeddings = initialPreWeddingStories;

export const initialSiteSettings: SiteSettings = {
  brandName: 'SEN PHOTOGRAPHY',
  heroHeadline: 'YOUR STORY. OUR FRAME.',
  heroSubtitle: 'WEDDING PHOTOGRAPHY · FILMS / STORIES',
  heroButtonText: 'BOOK YOUR DATE',
  heroSecondaryButtonText: 'EXPLORE STORIES',
  heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85',
  heroSlideshowInterval: 1000, // 1 second
  heroImages: initialHeroImages,
  founder: initialFounder,
  
  founderHeading: 'FOUNDER',
  
  preweddingIntroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=85',
  preweddingIntroSubtitle: 'THE BEGINNING OF FOREVER',
  preweddingIntroTitle: 'PRE-WEDDING',
  preweddingVisibleCount: 4,

  weddingIntroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2400&q=85',
  weddingIntroSubtitle: 'THE MOMENTS THAT BECOME MEMORIES',
  weddingIntroTitle: 'WEDDING',

  filmsHeading: 'CINEMATIC FILMS',
  filmsSubtitle: 'REAL MOMENTS. CINEMATIC STORIES.',

  maternityIntroImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0f?auto=format&fit=crop&w=2400&q=85',
  maternityIntroSubtitle: 'THE SACRED CHAPTERS',
  maternityIntroTitle: 'MATERNITY & KIDS',
  maternityKidsEnabled: true,

  reviewsHeading: 'CUSTOMER REVIEWS',
  reviewsSubtitle: 'WORDS FROM OUR COUPLES',

  contactHeading: "LET'S CAPTURE YOUR STORY",
  contactSubtitle: 'REACH OUT TO ATELIER SEN',

  aboutHeadline: "WE DON'T JUST PHOTOGRAPH WEDDINGS. WE PRESERVE HOW THEY FELT.",
  aboutParagraph1: 'Sen Photography is a luxury Indian wedding cinema and photography atelier. Rooted in cinematic storytelling and fine-art portraiture, we document the unspoken glances, the sacred rituals of the pheras, the raw royal euphoria of the baraat, and the emotional quietude of the vidaai.',
  aboutParagraph2: 'Based out of Udaipur and New Delhi, we travel worldwide to capture destination celebrations at heritage forts, palatial lake resorts, and intimate family courtyards. Every frame is treated with intentional composition, timeless color grading, and heartfelt reverence.',
  aboutAuthor: '— SEN PHOTOGRAPHY',
  aboutImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85',
  whatsappNumber: '+91 98765 43210',
  phoneNumber: '+91 98765 43210',
  email: 'weddings@senphotography.com',
  address: 'Heritage Walkway, Ambavgarh, Udaipur, Rajasthan 313001',
  city: 'Udaipur & New Delhi, India',
  instagramUrl: 'https://instagram.com/senphotography',
  instagramHandle: '@SENPHOTOGRAPHY',
  googleReviewUrl: 'https://g.page/r/senphotography/review',
  facebookUrl: 'https://facebook.com/senphotography',
  youtubeUrl: 'https://youtube.com/@senphotography',
  footerText: 'Bespoke destination wedding photography & cinematic films capturing eternal legacies across Rajasthan, India and worldwide.',
  seoTitle: 'SEN PHOTOGRAPHY | Luxury Indian Wedding Photography & Cinema',
  seoDescription: 'Award-winning luxury wedding photography and cinematic films across Udaipur, Jaipur, Jodhpur, Delhi, Mumbai, and worldwide destinations.',
  openGraphTitle: 'SEN PHOTOGRAPHY | Luxury Indian Wedding Photography & Cinema',
  openGraphDescription: 'Preserving timeless moments across Udaipur, Jaipur, Delhi, and royal heritage destinations worldwide.',
  socialShareImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
  instagramImages: [
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  ]
};

export const initialWeddingStories: WeddingStory[] = [
  {
    id: 'story-1',
    title: 'Aarav & Meera',
    subtitle: 'Udaipur · Royal Palace Wedding',
    couple_name: 'Aarav & Meera',
    location: 'The Oberoi Udaivilas, Udaipur',
    date: 'November 2025',
    cover_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
    category: 'WEDDINGS',
    featured: true,
    description: "Framed against the shimmer of Lake Pichola and the majestic silhouette of the Aravalli hills, Aarav and Meera's three-day celebration was a magnificent symphony of Marwari heritage and contemporary elegance. From sunset pheras surrounded by thousands of floating oil lamps to an ethereal Sufi night, every moment resonated with deep family warmth.",
    highlights: [
      'Sunset Pheras beside the lotus ponds with traditional Shehnai melodies',
      'Bespoke Sabyasachi crimson velvet lehenga with royal antique polki heirlooms',
      'Celebratory royal boat procession across Lake Pichola for the couple arrival'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1600&q=85'
    ],
    film_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ'
  },
  {
    id: 'story-2',
    title: 'Riya & Kunal',
    subtitle: 'Jaipur · Heritage Fort Celebration',
    couple_name: 'Riya & Kunal',
    location: 'Samode Palace, Jaipur',
    date: 'December 2025',
    cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    category: 'WEDDINGS',
    featured: true,
    description: 'Nestled within the 475-year-old frescoed halls of Samode, Riya and Kunal crafted a celebration that honored royal Rajasthani architecture while maintaining the intimacy of an enchanted courtyard gathering. Intricate jaali shadows, candle-lit arches, and spontaneous laughter brought sheer poetry to our lenses.',
    highlights: [
      'Intimate royal courtyard haldi immersed in marigold garlands and rose petal showers',
      'Fresco hall royal portraits with golden hour spill',
      'An exhilarating Sangeet with classical fusion and grand fireworks over the fort walls'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=85'
    ],
    film_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ'
  },
  {
    id: 'story-3',
    title: 'Ananya & Vihaan',
    subtitle: 'Delhi · Modern Regal Nuptials',
    couple_name: 'Ananya & Vihaan',
    location: 'The Leela Palace, New Delhi',
    date: 'January 2026',
    cover_image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    category: 'WEDDINGS',
    featured: true,
    description: 'A masterclass in modern royalty. Ananya and Vihaan’s Delhi wedding fused classic Lutyens Delhi grandeur with high-fashion editorial aesthetics. The glasshouse reception decorated with cascading white orchids and thousands of fairy lights was a visual dream to document.',
    highlights: [
      'Editorial bride preparation suite portraits with heirloom diamond necklace',
      'Grand crystal chandelier ballroom reception with 12-piece jazz ensemble',
      'Emotional tear-filled father-daughter dance captured in natural chiaroscuro light'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85'
    ],
    film_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ'
  }
];

export const initialPhotos: PhotoItem[] = [
  {
    id: 'p-1',
    title: 'Royal Pheras in the Amber Courtyard',
    image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    category: 'WEDDINGS',
    subcategory: 'Wedding Ceremonies',
    location: 'Udaipur, Rajasthan',
    couple_name: 'Aarav & Meera',
    date: '2025-11',
    featured: true,
    sort_order: 1,
    created_at: '2025-11-20T10:00:00Z',
    aspect_ratio: 'landscape'
  },
  {
    id: 'p-2',
    title: 'Heirloom Polki and the Bridal Veil',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    category: 'WEDDINGS',
    subcategory: 'Bride',
    location: 'Jaipur, Rajasthan',
    couple_name: 'Riya',
    date: '2025-12',
    featured: true,
    sort_order: 2,
    created_at: '2025-12-15T10:00:00Z',
    aspect_ratio: 'portrait'
  },
  {
    id: 'p-3',
    title: 'Sunset Lake Pichola Serenade',
    image_url: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
    category: 'PRE-WEDDINGS',
    subcategory: 'Couples',
    location: 'Udaipur, Rajasthan',
    couple_name: 'Aarav & Jyoti',
    date: '2026-02',
    featured: true,
    sort_order: 3,
    created_at: '2026-02-05T10:00:00Z',
    aspect_ratio: 'landscape'
  },
  {
    id: 'p-4',
    title: 'The Groom’s Royal Regalia & Turban Ornament',
    image_url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=80',
    category: 'WEDDINGS',
    subcategory: 'Groom',
    location: 'Jodhpur, Rajasthan',
    couple_name: 'Vihaan',
    date: '2026-01',
    featured: false,
    sort_order: 4,
    created_at: '2026-01-10T10:00:00Z',
    aspect_ratio: 'portrait'
  },
  {
    id: 'p-5',
    title: 'Samode Palace Courtyard Whispers',
    image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    category: 'WEDDINGS',
    subcategory: 'Couples',
    location: 'Samode, Jaipur',
    couple_name: 'Riya & Kunal',
    date: '2025-12',
    featured: true,
    sort_order: 5,
    created_at: '2025-12-16T10:00:00Z',
    aspect_ratio: 'landscape'
  },
  {
    id: 'p-6',
    title: 'Rose Petals Showering the Sacred Fire',
    image_url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    category: 'WEDDINGS',
    subcategory: 'Wedding Ceremonies',
    location: 'Udaipur, Rajasthan',
    couple_name: 'Aarav & Meera',
    date: '2025-11',
    featured: false,
    sort_order: 6,
    created_at: '2025-11-20T12:00:00Z',
    aspect_ratio: 'landscape'
  },
  {
    id: 'p-7',
    title: 'Thar Desert Dune Silhouette',
    image_url: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1200&q=80',
    category: 'PRE-WEDDINGS',
    subcategory: 'Couples',
    location: 'Jodhpur, Rajasthan',
    couple_name: 'Rohan & Ananya',
    date: '2026-01',
    featured: true,
    sort_order: 7,
    created_at: '2026-01-08T10:00:00Z',
    aspect_ratio: 'landscape'
  },
  {
    id: 'p-8',
    title: 'Intimate Henna Patterns & Emerald Rings',
    image_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    category: 'WEDDINGS',
    subcategory: 'Details',
    location: 'New Delhi',
    couple_name: 'Ananya',
    date: '2026-01',
    featured: false,
    sort_order: 8,
    created_at: '2026-01-14T10:00:00Z',
    aspect_ratio: 'portrait'
  },
  {
    id: 'p-9',
    title: 'Nahargarh Sunset Serenity',
    image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    category: 'PRE-WEDDINGS',
    subcategory: 'Couples',
    location: 'Jaipur, Rajasthan',
    couple_name: 'Siddharth & Tanya',
    date: '2026-03',
    featured: true,
    sort_order: 9,
    created_at: '2026-03-02T10:00:00Z',
    aspect_ratio: 'portrait'
  },
  {
    id: 'p-10',
    title: 'Anticipation of Motherhood — Golden Light',
    image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    category: 'MATERNITY',
    subcategory: 'Portraits',
    location: 'Udaipur, Rajasthan',
    couple_name: 'Pooja & Dev',
    date: '2026-02',
    featured: false,
    sort_order: 10,
    created_at: '2026-02-12T10:00:00Z',
    aspect_ratio: 'landscape'
  }
];

export const initialFilms: WeddingFilm[] = [
  {
    id: 'film-1',
    title: 'Echoes of Udaipur — The Royal Union',
    couple_name: 'Aarav & Meera',
    location: 'The Oberoi Udaivilas, Udaipur',
    duration: '4:32',
    cover_image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
    video_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    description: 'A cinematic film capturing royal palace courtyards, quiet tears, and midnight celebrations on Lake Pichola.',
    featured: true
  },
  {
    id: 'film-2',
    title: 'Colors of Samode — Heritage Reverie',
    couple_name: 'Riya & Kunal',
    location: 'Samode Palace, Jaipur',
    duration: '5:18',
    cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    video_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    description: '475 years of royal frescoes set the stage for an emotional Marwari union surrounded by hills and palace walls.',
    featured: false
  },
  {
    id: 'film-3',
    title: 'Starlit Symphony — The Delhi Reception',
    couple_name: 'Ananya & Vihaan',
    location: 'The Leela Palace, New Delhi',
    duration: '3:45',
    cover_image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    video_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    description: 'High-fashion modern royalty, crystal chandeliers, and heartfelt vows.',
    featured: false
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'They didn’t just capture our wedding. They captured everything we were feeling. Looking back at our wedding film brings tears of joy every single time.',
    couple_name: 'RIYA & KUNAL',
    location: 'SAMODE PALACE, JAIPUR',
    event_year: '2025',
    shoot_type: '3-Day Royal Heritage Wedding',
    photo_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'test-2',
    quote: 'Every emotion was captured beautifully. It felt like reliving our wedding all over again. Dipak and his cinema crew were invisible yet everywhere.',
    couple_name: 'AARAV & MEERA',
    location: 'THE OBEROI UDAIVILAS, UDAIPUR',
    event_year: '2025',
    shoot_type: 'Destination Wedding & Film',
    photo_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'test-3',
    quote: 'From our sunrise pre-wedding shoot to our 2,000-guest reception, the level of editorial refinement and calm warmth was unlike anything we’ve experienced.',
    couple_name: 'ANANYA & VIHAAN',
    location: 'THE LEELA PALACE, NEW DELHI',
    event_year: '2026',
    shoot_type: 'Pre-Wedding & Royal Nuptials',
    photo_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
  }
];

export const initialMaternityItems: MaternityItem[] = [
  {
    id: 'mk-1',
    title: 'Grace in Motherhood',
    caption: 'THE SACRED GIFT OF NEW LIFE',
    image_url: 'https://images.unsplash.com/photo-1544126592-807ade215a0f?auto=format&fit=crop&w=1600&q=85',
    category: 'MATERNITY',
    sort_order: 1
  },
  {
    id: 'mk-2',
    title: 'Golden Glow & Anticipation',
    caption: 'WHISPERS OF TOMORROW',
    image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
    category: 'MATERNITY',
    sort_order: 2
  },
  {
    id: 'mk-3',
    title: 'Pure Wonder & First Steps',
    caption: 'INNOCENCE IN TIMELESS FRAME',
    image_url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1600&q=85',
    category: 'KIDS',
    sort_order: 3
  },
  {
    id: 'mk-4',
    title: 'Laughter Under Rajasthan Sun',
    caption: 'JOYOUS GENERATIONS',
    image_url: 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=1600&q=85',
    category: 'KIDS',
    sort_order: 4
  }
];
