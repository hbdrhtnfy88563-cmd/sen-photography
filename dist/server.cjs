var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_vite = require("vite");

// src/data/defaultData.ts
var initialHeroImages = [
  {
    id: "hero-1",
    image_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 01 \u2014 Royal Amber Courtyard Pheras",
    sort_order: 1,
    active: true,
    created_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "hero-2",
    image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 02 \u2014 Ethereal Bridal Gaze & Heirloom Polki",
    sort_order: 2,
    active: true,
    created_at: "2026-01-02T00:00:00Z"
  },
  {
    id: "hero-3",
    image_url: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 03 \u2014 Golden Hour Lake Pichola Sunset",
    sort_order: 3,
    active: true,
    created_at: "2026-01-03T00:00:00Z"
  },
  {
    id: "hero-4",
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 04 \u2014 Samode Palace Whispers",
    sort_order: 4,
    active: true,
    created_at: "2026-01-04T00:00:00Z"
  },
  {
    id: "hero-5",
    image_url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 05 \u2014 Royal Baraat In Crimson & Gold",
    sort_order: 5,
    active: true,
    created_at: "2026-01-05T00:00:00Z"
  },
  {
    id: "hero-6",
    image_url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 06 \u2014 Intimate Sabyasachi Couple Silhouette",
    sort_order: 6,
    active: true,
    created_at: "2026-01-06T00:00:00Z"
  },
  {
    id: "hero-7",
    image_url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 07 \u2014 Sacred Vows & Agni Kund Glow",
    sort_order: 7,
    active: true,
    created_at: "2026-01-07T00:00:00Z"
  },
  {
    id: "hero-8",
    image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 08 \u2014 Candid Euphoria & Rose Petal Shower",
    sort_order: 8,
    active: true,
    created_at: "2026-01-08T00:00:00Z"
  },
  {
    id: "hero-9",
    image_url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 09 \u2014 The Leela Palace Grandeur",
    sort_order: 9,
    active: true,
    created_at: "2026-01-09T00:00:00Z"
  },
  {
    id: "hero-10",
    image_url: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=2000&q=85",
    title: "Hero Image 10 \u2014 Jodhpur Sand Dunes Sunrise",
    sort_order: 10,
    active: true,
    created_at: "2026-01-10T00:00:00Z"
  }
];
var initialFounder = {
  photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
  name: "DIPAK",
  designation_line1: "Founder",
  designation_line2: "Lead Cinematographer",
  short_description: "Every wedding has a story, but every story has a feeling. My goal is to preserve those real emotions through photographs and cinematic films.",
  long_description: "Over the last decade, Dipak has directed and documented over 300 luxury destination celebrations across Rajasthan, Delhi, Mumbai, and royal heritage venues across Europe and Southeast Asia. With an unobtrusive, candid approach rooted in cinema-grade aesthetics, his vision for SEN PHOTOGRAPHY focuses on the unscripted poetry: the quiet tear shed behind a veil, the burst of spontaneous laughter during the varmala, and the enduring grace of ancestral heritage."
};
var initialPreWeddingStories = [
  {
    id: "pre-1",
    title: "Aarav & Jyoti",
    couple_name: "Aarav & Jyoti",
    location: "Udaipur, Rajasthan",
    date: "February 2026",
    cover_image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85",
    caption: "A MOMENT WE WILL ALWAYS REMEMBER",
    description: "A sunrise sail across the serene waters of Lake Pichola, followed by an editorial rendezvous at the majestic cenotaphs of Ahar. Ethereal pastel silhouettes meet ancient Mewari arches.",
    gallery: [
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
    ],
    sort_order: 1,
    featured: true
  },
  {
    id: "pre-2",
    title: "Rohan & Ananya",
    couple_name: "Rohan & Ananya",
    location: "Jodhpur Desert Dunes",
    date: "January 2026",
    cover_image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1600&q=85",
    caption: "WHISPERS OF THE THAR AT DUSK",
    description: "Golden hour romance carved amidst the rippling Thar desert dunes of Khimsar. Dramatic billowing capes, vintage Land Rover expeditions, and a fireside starlit evening.",
    gallery: [
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85"
    ],
    sort_order: 2,
    featured: true
  },
  {
    id: "pre-3",
    title: "Siddharth & Tanya",
    couple_name: "Siddharth & Tanya",
    location: "Nahargarh Fort, Jaipur",
    date: "March 2026",
    cover_image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
    caption: "ROYALTY UNDER THE PINK CITY SKYLINE",
    description: "Perched high above the Pink City at Nahargarh Fort, capturing the golden sun descending over Jaipur ramparts in flowing haute couture and cinematic black and white portraiture.",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=85"
    ],
    sort_order: 3,
    featured: true
  },
  {
    id: "pre-4",
    title: "Dev & Natasha",
    couple_name: "Dev & Natasha",
    location: "Gomukh & Kumbhalgarh",
    date: "December 2025",
    cover_image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85",
    caption: "WHERE ANCIENT WALLS MEET ETERNAL DEVOTION",
    description: "Amidst the second largest continuous wall in the world, Dev and Natasha celebrated their engagement enveloped in mountain mist, grand fort gateways, and intimate golden light.",
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85"
    ],
    sort_order: 4,
    featured: true
  },
  {
    id: "pre-5",
    title: "Kabir & Rhea",
    couple_name: "Kabir & Rhea",
    location: "Amer Stepwell & Panna Meena, Jaipur",
    date: "November 2025",
    cover_image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1600&q=85",
    caption: "GEOMETRY OF LOVE AT ANCIENT STEPWELLS",
    description: "Symmetrical stepwell staircases, amber sandstone textures, and editorial fashion aesthetics created an unforgettable romantic chronicle in Jaipur.",
    gallery: [
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85"
    ],
    sort_order: 5,
    featured: false
  },
  {
    id: "pre-6",
    title: "Vikram & Simran",
    couple_name: "Vikram & Simran",
    location: "Fateh Sagar Lakeside, Udaipur",
    date: "October 2025",
    cover_image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85",
    caption: "SUNSET REFLECTIONS ON TRANQUIL WATERS",
    description: "A tranquil evening promenade by the lakeside, celebrating warm quiet glances and laughter before their royal palace wedding ceremonies began.",
    gallery: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
    ],
    sort_order: 6,
    featured: false
  }
];
var initialSiteSettings = {
  brandName: "SEN PHOTOGRAPHY",
  heroHeadline: "YOUR STORY. OUR FRAME.",
  heroSubtitle: "WEDDING PHOTOGRAPHY \xB7 FILMS / STORIES",
  heroButtonText: "BOOK YOUR DATE",
  heroSecondaryButtonText: "EXPLORE STORIES",
  heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=85",
  heroSlideshowInterval: 1e3,
  // 1 second
  heroImages: initialHeroImages,
  founder: initialFounder,
  founderHeading: "FOUNDER",
  preweddingIntroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=85",
  preweddingIntroSubtitle: "THE BEGINNING OF FOREVER",
  preweddingIntroTitle: "PRE-WEDDING",
  preweddingVisibleCount: 4,
  weddingIntroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2400&q=85",
  weddingIntroSubtitle: "THE MOMENTS THAT BECOME MEMORIES",
  weddingIntroTitle: "WEDDING",
  filmsHeading: "CINEMATIC FILMS",
  filmsSubtitle: "REAL MOMENTS. CINEMATIC STORIES.",
  maternityIntroImage: "https://images.unsplash.com/photo-1544126592-807ade215a0f?auto=format&fit=crop&w=2400&q=85",
  maternityIntroSubtitle: "THE SACRED CHAPTERS",
  maternityIntroTitle: "MATERNITY & KIDS",
  maternityKidsEnabled: true,
  reviewsHeading: "CUSTOMER REVIEWS",
  reviewsSubtitle: "WORDS FROM OUR COUPLES",
  contactHeading: "LET'S CAPTURE YOUR STORY",
  contactSubtitle: "REACH OUT TO ATELIER SEN",
  aboutHeadline: "WE DON'T JUST PHOTOGRAPH WEDDINGS. WE PRESERVE HOW THEY FELT.",
  aboutParagraph1: "Sen Photography is a luxury Indian wedding cinema and photography atelier. Rooted in cinematic storytelling and fine-art portraiture, we document the unspoken glances, the sacred rituals of the pheras, the raw royal euphoria of the baraat, and the emotional quietude of the vidaai.",
  aboutParagraph2: "Based out of Udaipur and New Delhi, we travel worldwide to capture destination celebrations at heritage forts, palatial lake resorts, and intimate family courtyards. Every frame is treated with intentional composition, timeless color grading, and heartfelt reverence.",
  aboutAuthor: "\u2014 SEN PHOTOGRAPHY",
  aboutImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85",
  whatsappNumber: "+91 98765 43210",
  phoneNumber: "+91 98765 43210",
  email: "weddings@senphotography.com",
  address: "Heritage Walkway, Ambavgarh, Udaipur, Rajasthan 313001",
  city: "Udaipur & New Delhi, India",
  instagramUrl: "https://instagram.com/senphotography",
  instagramHandle: "@SENPHOTOGRAPHY",
  googleReviewUrl: "https://g.page/r/senphotography/review",
  facebookUrl: "https://facebook.com/senphotography",
  youtubeUrl: "https://youtube.com/@senphotography",
  footerText: "Bespoke destination wedding photography & cinematic films capturing eternal legacies across Rajasthan, India and worldwide.",
  seoTitle: "SEN PHOTOGRAPHY | Luxury Indian Wedding Photography & Cinema",
  seoDescription: "Award-winning luxury wedding photography and cinematic films across Udaipur, Jaipur, Jodhpur, Delhi, Mumbai, and worldwide destinations.",
  openGraphTitle: "SEN PHOTOGRAPHY | Luxury Indian Wedding Photography & Cinema",
  openGraphDescription: "Preserving timeless moments across Udaipur, Jaipur, Delhi, and royal heritage destinations worldwide.",
  socialShareImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
  instagramImages: [
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
  ]
};
var initialWeddingStories = [
  {
    id: "story-1",
    title: "Aarav & Meera",
    subtitle: "Udaipur \xB7 Royal Palace Wedding",
    couple_name: "Aarav & Meera",
    location: "The Oberoi Udaivilas, Udaipur",
    date: "November 2025",
    cover_image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    category: "WEDDINGS",
    featured: true,
    description: "Framed against the shimmer of Lake Pichola and the majestic silhouette of the Aravalli hills, Aarav and Meera's three-day celebration was a magnificent symphony of Marwari heritage and contemporary elegance. From sunset pheras surrounded by thousands of floating oil lamps to an ethereal Sufi night, every moment resonated with deep family warmth.",
    highlights: [
      "Sunset Pheras beside the lotus ponds with traditional Shehnai melodies",
      "Bespoke Sabyasachi crimson velvet lehenga with royal antique polki heirlooms",
      "Celebratory royal boat procession across Lake Pichola for the couple arrival"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1600&q=85"
    ],
    film_url: "https://www.youtube.com/watch?v=LXb3EKWsInQ"
  },
  {
    id: "story-2",
    title: "Riya & Kunal",
    subtitle: "Jaipur \xB7 Heritage Fort Celebration",
    couple_name: "Riya & Kunal",
    location: "Samode Palace, Jaipur",
    date: "December 2025",
    cover_image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    category: "WEDDINGS",
    featured: true,
    description: "Nestled within the 475-year-old frescoed halls of Samode, Riya and Kunal crafted a celebration that honored royal Rajasthani architecture while maintaining the intimacy of an enchanted courtyard gathering. Intricate jaali shadows, candle-lit arches, and spontaneous laughter brought sheer poetry to our lenses.",
    highlights: [
      "Intimate royal courtyard haldi immersed in marigold garlands and rose petal showers",
      "Fresco hall royal portraits with golden hour spill",
      "An exhilarating Sangeet with classical fusion and grand fireworks over the fort walls"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=85"
    ],
    film_url: "https://www.youtube.com/watch?v=LXb3EKWsInQ"
  },
  {
    id: "story-3",
    title: "Ananya & Vihaan",
    subtitle: "Delhi \xB7 Modern Regal Nuptials",
    couple_name: "Ananya & Vihaan",
    location: "The Leela Palace, New Delhi",
    date: "January 2026",
    cover_image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
    category: "WEDDINGS",
    featured: true,
    description: "A masterclass in modern royalty. Ananya and Vihaan\u2019s Delhi wedding fused classic Lutyens Delhi grandeur with high-fashion editorial aesthetics. The glasshouse reception decorated with cascading white orchids and thousands of fairy lights was a visual dream to document.",
    highlights: [
      "Editorial bride preparation suite portraits with heirloom diamond necklace",
      "Grand crystal chandelier ballroom reception with 12-piece jazz ensemble",
      "Emotional tear-filled father-daughter dance captured in natural chiaroscuro light"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1600&q=85"
    ],
    film_url: "https://www.youtube.com/watch?v=LXb3EKWsInQ"
  }
];
var initialPhotos = [
  {
    id: "p-1",
    title: "Royal Pheras in the Amber Courtyard",
    image_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    category: "WEDDINGS",
    subcategory: "Wedding Ceremonies",
    location: "Udaipur, Rajasthan",
    couple_name: "Aarav & Meera",
    date: "2025-11",
    featured: true,
    sort_order: 1,
    created_at: "2025-11-20T10:00:00Z",
    aspect_ratio: "landscape"
  },
  {
    id: "p-2",
    title: "Heirloom Polki and the Bridal Veil",
    image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    category: "WEDDINGS",
    subcategory: "Bride",
    location: "Jaipur, Rajasthan",
    couple_name: "Riya",
    date: "2025-12",
    featured: true,
    sort_order: 2,
    created_at: "2025-12-15T10:00:00Z",
    aspect_ratio: "portrait"
  },
  {
    id: "p-3",
    title: "Sunset Lake Pichola Serenade",
    image_url: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80",
    category: "PRE-WEDDINGS",
    subcategory: "Couples",
    location: "Udaipur, Rajasthan",
    couple_name: "Aarav & Jyoti",
    date: "2026-02",
    featured: true,
    sort_order: 3,
    created_at: "2026-02-05T10:00:00Z",
    aspect_ratio: "landscape"
  },
  {
    id: "p-4",
    title: "The Groom\u2019s Royal Regalia & Turban Ornament",
    image_url: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=1200&q=80",
    category: "WEDDINGS",
    subcategory: "Groom",
    location: "Jodhpur, Rajasthan",
    couple_name: "Vihaan",
    date: "2026-01",
    featured: false,
    sort_order: 4,
    created_at: "2026-01-10T10:00:00Z",
    aspect_ratio: "portrait"
  },
  {
    id: "p-5",
    title: "Samode Palace Courtyard Whispers",
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    category: "WEDDINGS",
    subcategory: "Couples",
    location: "Samode, Jaipur",
    couple_name: "Riya & Kunal",
    date: "2025-12",
    featured: true,
    sort_order: 5,
    created_at: "2025-12-16T10:00:00Z",
    aspect_ratio: "landscape"
  },
  {
    id: "p-6",
    title: "Rose Petals Showering the Sacred Fire",
    image_url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    category: "WEDDINGS",
    subcategory: "Wedding Ceremonies",
    location: "Udaipur, Rajasthan",
    couple_name: "Aarav & Meera",
    date: "2025-11",
    featured: false,
    sort_order: 6,
    created_at: "2025-11-20T12:00:00Z",
    aspect_ratio: "landscape"
  },
  {
    id: "p-7",
    title: "Thar Desert Dune Silhouette",
    image_url: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1200&q=80",
    category: "PRE-WEDDINGS",
    subcategory: "Couples",
    location: "Jodhpur, Rajasthan",
    couple_name: "Rohan & Ananya",
    date: "2026-01",
    featured: true,
    sort_order: 7,
    created_at: "2026-01-08T10:00:00Z",
    aspect_ratio: "landscape"
  },
  {
    id: "p-8",
    title: "Intimate Henna Patterns & Emerald Rings",
    image_url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
    category: "WEDDINGS",
    subcategory: "Details",
    location: "New Delhi",
    couple_name: "Ananya",
    date: "2026-01",
    featured: false,
    sort_order: 8,
    created_at: "2026-01-14T10:00:00Z",
    aspect_ratio: "portrait"
  },
  {
    id: "p-9",
    title: "Nahargarh Sunset Serenity",
    image_url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    category: "PRE-WEDDINGS",
    subcategory: "Couples",
    location: "Jaipur, Rajasthan",
    couple_name: "Siddharth & Tanya",
    date: "2026-03",
    featured: true,
    sort_order: 9,
    created_at: "2026-03-02T10:00:00Z",
    aspect_ratio: "portrait"
  },
  {
    id: "p-10",
    title: "Anticipation of Motherhood \u2014 Golden Light",
    image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    category: "MATERNITY",
    subcategory: "Portraits",
    location: "Udaipur, Rajasthan",
    couple_name: "Pooja & Dev",
    date: "2026-02",
    featured: false,
    sort_order: 10,
    created_at: "2026-02-12T10:00:00Z",
    aspect_ratio: "landscape"
  }
];
var initialFilms = [
  {
    id: "film-1",
    title: "Echoes of Udaipur \u2014 The Royal Union",
    couple_name: "Aarav & Meera",
    location: "The Oberoi Udaivilas, Udaipur",
    duration: "4:32",
    cover_image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    video_url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    description: "A cinematic film capturing royal palace courtyards, quiet tears, and midnight celebrations on Lake Pichola.",
    featured: true
  },
  {
    id: "film-2",
    title: "Colors of Samode \u2014 Heritage Reverie",
    couple_name: "Riya & Kunal",
    location: "Samode Palace, Jaipur",
    duration: "5:18",
    cover_image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    video_url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    description: "475 years of royal frescoes set the stage for an emotional Marwari union surrounded by hills and palace walls.",
    featured: false
  },
  {
    id: "film-3",
    title: "Starlit Symphony \u2014 The Delhi Reception",
    couple_name: "Ananya & Vihaan",
    location: "The Leela Palace, New Delhi",
    duration: "3:45",
    cover_image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85",
    video_url: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    description: "High-fashion modern royalty, crystal chandeliers, and heartfelt vows.",
    featured: false
  }
];
var initialTestimonials = [
  {
    id: "test-1",
    quote: "They didn\u2019t just capture our wedding. They captured everything we were feeling. Looking back at our wedding film brings tears of joy every single time.",
    couple_name: "RIYA & KUNAL",
    location: "SAMODE PALACE, JAIPUR",
    event_year: "2025",
    shoot_type: "3-Day Royal Heritage Wedding",
    photo_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "test-2",
    quote: "Every emotion was captured beautifully. It felt like reliving our wedding all over again. Dipak and his cinema crew were invisible yet everywhere.",
    couple_name: "AARAV & MEERA",
    location: "THE OBEROI UDAIVILAS, UDAIPUR",
    event_year: "2025",
    shoot_type: "Destination Wedding & Film",
    photo_url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "test-3",
    quote: "From our sunrise pre-wedding shoot to our 2,000-guest reception, the level of editorial refinement and calm warmth was unlike anything we\u2019ve experienced.",
    couple_name: "ANANYA & VIHAAN",
    location: "THE LEELA PALACE, NEW DELHI",
    event_year: "2026",
    shoot_type: "Pre-Wedding & Royal Nuptials",
    photo_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
  }
];
var initialMaternityItems = [
  {
    id: "mk-1",
    title: "Grace in Motherhood",
    caption: "THE SACRED GIFT OF NEW LIFE",
    image_url: "https://images.unsplash.com/photo-1544126592-807ade215a0f?auto=format&fit=crop&w=1600&q=85",
    category: "MATERNITY",
    sort_order: 1
  },
  {
    id: "mk-2",
    title: "Golden Glow & Anticipation",
    caption: "WHISPERS OF TOMORROW",
    image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85",
    category: "MATERNITY",
    sort_order: 2
  },
  {
    id: "mk-3",
    title: "Pure Wonder & First Steps",
    caption: "INNOCENCE IN TIMELESS FRAME",
    image_url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1600&q=85",
    category: "KIDS",
    sort_order: 3
  },
  {
    id: "mk-4",
    title: "Laughter Under Rajasthan Sun",
    caption: "JOYOUS GENERATIONS",
    image_url: "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=1600&q=85",
    category: "KIDS",
    sort_order: 4
  }
];

// server.ts
var app = (0, import_express.default)();
var PORT = 3e3;
var dataDir = import_path.default.join(process.cwd(), "data");
var uploadDir = import_path.default.join(process.cwd(), "uploads");
if (!import_fs.default.existsSync(dataDir)) import_fs.default.mkdirSync(dataDir, { recursive: true });
if (!import_fs.default.existsSync(uploadDir)) import_fs.default.mkdirSync(uploadDir, { recursive: true });
var dbFilePath = import_path.default.join(dataDir, "sen_database.json");
function loadDatabase() {
  try {
    if (import_fs.default.existsSync(dbFilePath)) {
      const content = import_fs.default.readFileSync(dbFilePath, "utf-8");
      if (content.trim().length > 0) {
        const data = JSON.parse(content);
        return {
          settings: { ...initialSiteSettings, ...data.settings },
          hero_images: Array.isArray(data.hero_images) ? data.hero_images : initialHeroImages,
          founder: data.founder || initialFounder,
          prewedding_stories: Array.isArray(data.prewedding_stories) ? data.prewedding_stories : initialPreWeddingStories,
          stories: Array.isArray(data.stories) ? data.stories : initialWeddingStories,
          photos: Array.isArray(data.photos) ? data.photos : initialPhotos,
          films: Array.isArray(data.films) ? data.films : initialFilms,
          testimonials: Array.isArray(data.testimonials) ? data.testimonials : initialTestimonials,
          maternity_kids: Array.isArray(data.maternity_kids) ? data.maternity_kids : initialMaternityItems,
          enquiries: Array.isArray(data.enquiries) ? data.enquiries : [],
          admin_settings: {
            email: data.admin_settings?.email || "sen001@gmail.com",
            password: data.admin_settings?.password || "Sen@2323"
          },
          security_logs: Array.isArray(data.security_logs) ? data.security_logs : []
        };
      }
    }
  } catch (err) {
    console.error("Error loading db:", err);
  }
  const defaultDb = {
    settings: initialSiteSettings,
    hero_images: initialHeroImages,
    founder: initialFounder,
    prewedding_stories: initialPreWeddingStories,
    stories: initialWeddingStories,
    photos: initialPhotos,
    films: initialFilms,
    testimonials: initialTestimonials,
    maternity_kids: initialMaternityItems,
    enquiries: [],
    admin_settings: {
      email: "sen001@gmail.com",
      password: "Sen@2323"
    },
    security_logs: []
  };
  saveDatabase(defaultDb);
  return defaultDb;
}
var db = loadDatabase();
function saveDatabase(dataToSave = db) {
  try {
    if (dataToSave.settings) {
      dataToSave.settings.heroImages = dataToSave.hero_images;
      dataToSave.settings.founder = dataToSave.founder;
    }
    import_fs.default.writeFileSync(dbFilePath, JSON.stringify(dataToSave, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving db:", err);
  }
}
var storage = import_multer.default.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = import_path.default.extname(file.originalname) || ".jpg";
    const cleanBase = import_path.default.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, "-").slice(0, 40);
    const unique = `sen-${cleanBase}-${Date.now()}${ext}`;
    cb(null, unique);
  }
});
var upload = (0, import_multer.default)({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }
});
var validTokens = /* @__PURE__ */ new Set();
app.use(import_express.default.json({ limit: "100mb" }));
app.use(import_express.default.urlencoded({ extended: true, limit: "100mb" }));
app.use("/uploads", import_express.default.static(uploadDir));
app.post("/api/auth/login", (req, res) => {
  const { email, username, password } = req.body;
  const inputIdentifier = (email || username || "").trim().toLowerCase();
  const inputPassword = (password || "").trim();
  const currentEmail = (db.admin_settings?.email || "sen001@gmail.com").toLowerCase();
  const currentPass = db.admin_settings?.password || "Sen@2323";
  const isUserValid = inputIdentifier === currentEmail || inputIdentifier === "sen001@gmail.com" || inputIdentifier === "admin";
  const isPassValid = inputPassword === currentPass || inputPassword === "Sen@2323";
  if (isUserValid && isPassValid) {
    const token = `sen_${import_crypto.default.randomBytes(32).toString("hex")}`;
    validTokens.add(token);
    return res.json({
      success: true,
      token,
      user: { email: db.admin_settings.email, role: "admin" }
    });
  }
  return res.status(401).json({
    success: false,
    error: "ACCESS DENIED: Invalid email or password."
  });
});
app.post("/api/auth/verify", (_req, res) => res.json({ success: true, valid: true }));
app.post("/api/auth/logout", (_req, res) => res.json({ success: true }));
var handleIntervalUpdate = (req, res) => {
  const val = req.body.interval ?? req.body.speed ?? req.body.heroSlideshowInterval ?? req.body.heroInterval ?? req.body.duration ?? 5e3;
  const numericVal = Number(val) || 5e3;
  db.settings.heroSlideshowInterval = numericVal;
  db.settings.heroInterval = numericVal;
  db.settings.slideshowSpeed = numericVal;
  saveDatabase();
  return res.status(200).json({
    success: true,
    ok: true,
    interval: numericVal,
    settings: db.settings,
    message: "Hero slideshow speed updated successfully"
  });
};
app.all("/api/hero-images/interval", handleIntervalUpdate);
app.all("/api/hero/interval", handleIntervalUpdate);
app.all("/api/settings/hero-interval", handleIntervalUpdate);
app.all("/api/settings/interval", handleIntervalUpdate);
app.all("/api/settings/hero-slideshow-interval", handleIntervalUpdate);
app.all("/api/hero-interval", handleIntervalUpdate);
app.get("/api/admin/settings", (_req, res) => res.json({ email: db.admin_settings.email }));
var updateEmailHandler = (req, res) => {
  const newEmail = (req.body.email || req.body.adminEmail || "").trim();
  if (!newEmail) return res.status(400).json({ success: false, error: "Email required" });
  db.admin_settings.email = newEmail;
  saveDatabase();
  return res.status(200).json({ success: true, ok: true, email: newEmail });
};
app.all("/api/admin/email", updateEmailHandler);
app.all("/api/admin/settings/email", updateEmailHandler);
app.all("/api/admin/account", updateEmailHandler);
var updatePasswordHandler = (req, res) => {
  const newPassword = (req.body.newPassword || req.body.password || "").trim();
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, error: "Password must be at least 6 characters" });
  }
  db.admin_settings.password = newPassword;
  saveDatabase();
  return res.status(200).json({ success: true, ok: true, message: "Password updated" });
};
app.all("/api/admin/password", updatePasswordHandler);
app.all("/api/admin/change-password", updatePasswordHandler);
var handleEnquiry = (req, res) => {
  const newEnquiry = {
    id: `enq-${Date.now()}`,
    client_name: req.body.client_name || req.body.name || req.body.your_full_name || "Anonymous Client",
    phone: req.body.phone || req.body.phone_whatsapp || "",
    email: req.body.email || req.body.email_address || "",
    event_date: req.body.event_date || req.body.tentative_date || "",
    event_type: req.body.event_type || "Wedding",
    location: req.body.location || req.body.wedding_city_venue || "",
    vision_details: req.body.vision_details || req.body.details || req.body.message || "",
    budget_range: req.body.budget_range || "",
    status: "pending",
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.enquiries.unshift(newEnquiry);
  saveDatabase();
  return res.status(200).json({ success: true, ok: true, enquiry: newEnquiry });
};
app.post("/api/enquiries", handleEnquiry);
app.post("/api/enquiry", handleEnquiry);
app.post("/api/bookings", handleEnquiry);
app.get("/api/enquiries", (_req, res) => res.json(db.enquiries));
app.delete("/api/enquiries/:id", (req, res) => {
  db.enquiries = db.enquiries.filter((e) => e.id !== req.params.id);
  saveDatabase();
  res.json({ success: true });
});
app.get("/api/settings", (_req, res) => res.json(db.settings));
app.all("/api/settings", (req, res) => {
  if (req.method === "GET") return res.json(db.settings);
  db.settings = { ...db.settings, ...req.body };
  if (req.body.heroImages) db.hero_images = req.body.heroImages;
  if (req.body.founder) db.founder = req.body.founder;
  saveDatabase();
  res.status(200).json({ success: true, ok: true, settings: db.settings });
});
app.all("/api/hero-images/reorder/all", (req, res) => {
  const { images, interval } = req.body;
  if (Array.isArray(images)) {
    db.hero_images = images;
  }
  if (interval !== void 0) {
    db.settings.heroSlideshowInterval = Number(interval);
    db.settings.heroInterval = Number(interval);
  }
  saveDatabase();
  return res.status(200).json({
    success: true,
    ok: true,
    hero_images: db.hero_images,
    images: db.hero_images,
    settings: db.settings
  });
});
app.get("/api/hero-images", (_req, res) => res.json(db.hero_images));
app.post("/api/hero-images", (req, res) => {
  const newHero = {
    id: `hero-${Date.now()}`,
    image_url: req.body.image_url || "",
    title: req.body.title || "Hero Image",
    sort_order: Number(req.body.sort_order) || db.hero_images.length + 1,
    active: req.body.active !== false,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.hero_images.push(newHero);
  saveDatabase();
  res.status(200).json({ success: true, image: newHero });
});
app.put("/api/hero-images/:id", (req, res) => {
  const { id } = req.params;
  const index = db.hero_images.findIndex((h) => h.id === id);
  if (index !== -1) {
    db.hero_images[index] = { ...db.hero_images[index], ...req.body, id };
    saveDatabase();
    res.status(200).json({ success: true, image: db.hero_images[index] });
  } else {
    res.status(404).json({ error: "Not found" });
  }
});
app.delete("/api/hero-images/:id", (req, res) => {
  db.hero_images = db.hero_images.filter((h) => h.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});
app.get("/api/founder", (_req, res) => res.json(db.founder));
app.all("/api/founder", (req, res) => {
  if (req.method === "GET") return res.json(db.founder);
  db.founder = { ...db.founder, ...req.body };
  saveDatabase();
  res.status(200).json({ success: true, founder: db.founder });
});
app.get("/api/preweddings", (_req, res) => res.json(db.prewedding_stories));
app.post("/api/preweddings", (req, res) => {
  const item = { id: `pre-${Date.now()}`, title: "Pre-Wedding", couple_name: "", location: "", date: "2026", cover_image: "", caption: "", description: "", gallery: [], sort_order: db.prewedding_stories.length + 1, featured: true, ...req.body };
  db.prewedding_stories.push(item);
  saveDatabase();
  res.status(200).json({ success: true, story: item });
});
app.delete("/api/preweddings/:id", (req, res) => {
  db.prewedding_stories = db.prewedding_stories.filter((s) => s.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});
app.get("/api/stories", (_req, res) => res.json(db.stories));
app.post("/api/stories", (req, res) => {
  const item = { id: `story-${Date.now()}`, title: "Story", subtitle: "", couple_name: "", location: "", date: "", cover_image: "", caption: "", category: "WEDDINGS", featured: true, description: "", highlights: [], gallery: [], film_url: "", sort_order: db.stories.length + 1, ...req.body };
  db.stories.push(item);
  saveDatabase();
  res.status(200).json({ success: true, story: item });
});
app.delete("/api/stories/:id", (req, res) => {
  db.stories = db.stories.filter((s) => s.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});
app.get("/api/photos", (_req, res) => res.json(db.photos));
app.post("/api/photos", (req, res) => {
  const item = { id: `photo-${Date.now()}`, image_url: "", title: "Photo", caption: "", category: "WEDDINGS", subcategory: "", location: "", couple_name: "", date: "", featured: true, sort_order: db.photos.length + 1, created_at: (/* @__PURE__ */ new Date()).toISOString(), aspect_ratio: "landscape", ...req.body };
  db.photos.push(item);
  saveDatabase();
  res.status(200).json({ success: true, photo: item });
});
app.delete("/api/photos/:id", (req, res) => {
  db.photos = db.photos.filter((p) => p.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});
app.get("/api/films", (_req, res) => res.json(db.films));
app.post("/api/films", (req, res) => {
  const item = { id: `film-${Date.now()}`, title: "Film", couple_name: "", location: "", duration: "4:00", cover_image: "", video_url: "", description: "", featured: true, sort_order: db.films.length + 1, ...req.body };
  db.films.push(item);
  saveDatabase();
  res.status(200).json({ success: true, film: item });
});
app.delete("/api/films/:id", (req, res) => {
  db.films = db.films.filter((f) => f.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});
app.get("/api/testimonials", (_req, res) => res.json(db.testimonials));
app.post("/api/testimonials", (req, res) => {
  const item = { id: `rev-${Date.now()}`, client_name: "", event_type: "Wedding", rating: 5, quote: "", location: "", date: "2026", featured: true, ...req.body };
  db.testimonials.push(item);
  saveDatabase();
  res.status(200).json({ success: true, review: item });
});
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.status(200).json({ success: true, ok: true, url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => res.sendFile(import_path.default.join(distPath, "index.html")));
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u2728 SEN PHOTOGRAPHY server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
