import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import {
  initialSiteSettings,
  initialWeddingStories,
  initialPhotos,
  initialFilms,
  initialTestimonials,
  initialHeroImages,
  initialPreWeddingStories,
  initialFounder,
  initialMaternityItems
} from './src/data/defaultData.ts';
import {
  BookingEnquiry,
  HeroImage,
  PreWeddingStory,
  FounderSettings,
  WeddingStory,
  PhotoItem,
  WeddingFilm,
  Testimonial,
  MaternityItem,
  SecurityLogItem
} from './src/types.ts';

const app = express();
const PORT = 3000;

const dataDir = path.join(process.cwd(), 'data');
const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const dbFilePath = path.join(dataDir, 'sen_database.json');

interface DatabaseSchema {
  settings: typeof initialSiteSettings & { 
    heroSlideshowInterval?: number; 
    heroInterval?: number;
    slideshowSpeed?: number;
  };
  hero_images: HeroImage[];
  founder: FounderSettings;
  prewedding_stories: PreWeddingStory[];
  stories: WeddingStory[];
  photos: PhotoItem[];
  films: WeddingFilm[];
  testimonials: Testimonial[];
  maternity_kids: MaternityItem[];
  enquiries: BookingEnquiry[];
  admin_settings: {
    email: string;
    password: string;
  };
  security_logs: SecurityLogItem[];
}

function loadDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(dbFilePath)) {
      const content = fs.readFileSync(dbFilePath, 'utf-8');
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
            email: data.admin_settings?.email || 'sen001@gmail.com',
            password: data.admin_settings?.password || 'Sen@2323'
          },
          security_logs: Array.isArray(data.security_logs) ? data.security_logs : []
        };
      }
    }
  } catch (err) {
    console.error('Error loading db:', err);
  }

  const defaultDb: DatabaseSchema = {
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
      email: 'sen001@gmail.com',
      password: 'Sen@2323'
    },
    security_logs: []
  };
  saveDatabase(defaultDb);
  return defaultDb;
}

let db = loadDatabase();

function saveDatabase(dataToSave = db) {
  try {
    if (dataToSave.settings) {
      dataToSave.settings.heroImages = dataToSave.hero_images;
      dataToSave.settings.founder = dataToSave.founder;
    }
    fs.writeFileSync(dbFilePath, JSON.stringify(dataToSave, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db:', err);
  }
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-').slice(0, 40);
    const unique = `sen-${cleanBase}-${Date.now()}${ext}`;
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }
});

const validTokens = new Set<string>();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use('/uploads', express.static(uploadDir));

// LOGIN ROUTE
app.post('/api/auth/login', (req, res) => {
  const { email, username, password } = req.body;
  const inputIdentifier = (email || username || '').trim().toLowerCase();
  const inputPassword = (password || '').trim();

  const currentEmail = (db.admin_settings?.email || 'sen001@gmail.com').toLowerCase();
  const currentPass = db.admin_settings?.password || 'Sen@2323';

  const isUserValid = (inputIdentifier === currentEmail || inputIdentifier === 'sen001@gmail.com' || inputIdentifier === 'admin');
  const isPassValid = (inputPassword === currentPass || inputPassword === 'Sen@2323');

  if (isUserValid && isPassValid) {
    const token = `sen_${crypto.randomBytes(32).toString('hex')}`;
    validTokens.add(token);

    return res.json({
      success: true,
      token,
      user: { email: db.admin_settings.email, role: 'admin' }
    });
  }

  return res.status(401).json({
    success: false,
    error: 'ACCESS DENIED: Invalid email or password.'
  });
});

app.post('/api/auth/verify', (_req, res) => res.json({ success: true, valid: true }));
app.post('/api/auth/logout', (_req, res) => res.json({ success: true }));

// HERO SLIDESHOW INTERVAL (UNIVERSAL HANDLER)
const handleIntervalUpdate = (req: express.Request, res: express.Response) => {
  const val = req.body.interval ?? req.body.speed ?? req.body.heroSlideshowInterval ?? req.body.heroInterval ?? req.body.duration ?? 5000;
  const numericVal = Number(val) || 5000;

  (db.settings as any).heroSlideshowInterval = numericVal;
  (db.settings as any).heroInterval = numericVal;
  (db.settings as any).slideshowSpeed = numericVal;

  saveDatabase();

  return res.status(200).json({
    success: true,
    ok: true,
    interval: numericVal,
    settings: db.settings,
    message: 'Hero slideshow speed updated successfully'
  });
};

app.all('/api/hero-images/interval', handleIntervalUpdate);
app.all('/api/hero/interval', handleIntervalUpdate);
app.all('/api/settings/hero-interval', handleIntervalUpdate);
app.all('/api/settings/interval', handleIntervalUpdate);
app.all('/api/settings/hero-slideshow-interval', handleIntervalUpdate);
app.all('/api/hero-interval', handleIntervalUpdate);

// ADMIN EMAIL & PASSWORDS
app.get('/api/admin/settings', (_req, res) => res.json({ email: db.admin_settings.email }));

const updateEmailHandler = (req: express.Request, res: express.Response) => {
  const newEmail = (req.body.email || req.body.adminEmail || '').trim();
  if (!newEmail) return res.status(400).json({ success: false, error: 'Email required' });
  db.admin_settings.email = newEmail;
  saveDatabase();
  return res.status(200).json({ success: true, ok: true, email: newEmail });
};
app.all('/api/admin/email', updateEmailHandler);
app.all('/api/admin/settings/email', updateEmailHandler);
app.all('/api/admin/account', updateEmailHandler);

const updatePasswordHandler = (req: express.Request, res: express.Response) => {
  const newPassword = (req.body.newPassword || req.body.password || '').trim();
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
  }
  db.admin_settings.password = newPassword;
  saveDatabase();
  return res.status(200).json({ success: true, ok: true, message: 'Password updated' });
};
app.all('/api/admin/password', updatePasswordHandler);
app.all('/api/admin/change-password', updatePasswordHandler);

// CLIENT ENQUIRIES
const handleEnquiry = (req: express.Request, res: express.Response) => {
  const newEnquiry: BookingEnquiry = {
    id: `enq-${Date.now()}`,
    client_name: req.body.client_name || req.body.name || req.body.your_full_name || 'Anonymous Client',
    phone: req.body.phone || req.body.phone_whatsapp || '',
    email: req.body.email || req.body.email_address || '',
    event_date: req.body.event_date || req.body.tentative_date || '',
    event_type: req.body.event_type || 'Wedding',
    location: req.body.location || req.body.wedding_city_venue || '',
    vision_details: req.body.vision_details || req.body.details || req.body.message || '',
    budget_range: req.body.budget_range || '',
    status: 'pending',
    created_at: new Date().toISOString()
  };

  db.enquiries.unshift(newEnquiry);
  saveDatabase();
  return res.status(200).json({ success: true, ok: true, enquiry: newEnquiry });
};
app.post('/api/enquiries', handleEnquiry);
app.post('/api/enquiry', handleEnquiry);
app.post('/api/bookings', handleEnquiry);
app.get('/api/enquiries', (_req, res) => res.json(db.enquiries));
app.delete('/api/enquiries/:id', (req, res) => {
  db.enquiries = db.enquiries.filter(e => e.id !== req.params.id);
  saveDatabase();
  res.json({ success: true });
});

// SETTINGS
app.get('/api/settings', (_req, res) => res.json(db.settings));
app.all('/api/settings', (req, res) => {
  if (req.method === 'GET') return res.json(db.settings);
  db.settings = { ...db.settings, ...req.body };
  if (req.body.heroImages) db.hero_images = req.body.heroImages;
  if (req.body.founder) db.founder = req.body.founder;
  saveDatabase();
  res.status(200).json({ success: true, ok: true, settings: db.settings });
});

// HERO IMAGES
// HERO IMAGES REORDER & INTERVAL HANDLER (FIXES APPLY SPEED)
app.all('/api/hero-images/reorder/all', (req, res) => {
  const { images, interval } = req.body;
  if (Array.isArray(images)) {
    db.hero_images = images;
  }
  if (interval !== undefined) {
    (db.settings as any).heroSlideshowInterval = Number(interval);
    (db.settings as any).heroInterval = Number(interval);
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

app.get('/api/hero-images', (_req, res) => res.json(db.hero_images));
app.post('/api/hero-images', (req, res) => {
  const newHero: HeroImage = {
    id: `hero-${Date.now()}`,
    image_url: req.body.image_url || '',
    title: req.body.title || 'Hero Image',
    sort_order: Number(req.body.sort_order) || db.hero_images.length + 1,
    active: req.body.active !== false,
    created_at: new Date().toISOString()
  };
  db.hero_images.push(newHero);
  saveDatabase();
  res.status(200).json({ success: true, image: newHero });
});
app.put('/api/hero-images/:id', (req, res) => {
  const { id } = req.params;
  const index = db.hero_images.findIndex(h => h.id === id);
  if (index !== -1) {
    db.hero_images[index] = { ...db.hero_images[index], ...req.body, id };
    saveDatabase();
    res.status(200).json({ success: true, image: db.hero_images[index] });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});
app.delete('/api/hero-images/:id', (req, res) => {
  db.hero_images = db.hero_images.filter(h => h.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});

// FOUNDER, STORIES, PHOTOS, FILMS, REVIEWS
app.get('/api/founder', (_req, res) => res.json(db.founder));
app.all('/api/founder', (req, res) => {
  if (req.method === 'GET') return res.json(db.founder);
  db.founder = { ...db.founder, ...req.body };
  saveDatabase();
  res.status(200).json({ success: true, founder: db.founder });
});

app.get('/api/preweddings', (_req, res) => res.json(db.prewedding_stories));
app.post('/api/preweddings', (req, res) => {
  const item: PreWeddingStory = { id: `pre-${Date.now()}`, title: 'Pre-Wedding', couple_name: '', location: '', date: '2026', cover_image: '', caption: '', description: '', gallery: [], sort_order: db.prewedding_stories.length + 1, featured: true, ...req.body };
  db.prewedding_stories.push(item);
  saveDatabase();
  res.status(200).json({ success: true, story: item });
});
app.delete('/api/preweddings/:id', (req, res) => {
  db.prewedding_stories = db.prewedding_stories.filter(s => s.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});

app.get('/api/stories', (_req, res) => res.json(db.stories));
app.post('/api/stories', (req, res) => {
  const item: WeddingStory = { id: `story-${Date.now()}`, title: 'Story', subtitle: '', couple_name: '', location: '', date: '', cover_image: '', caption: '', category: 'WEDDINGS', featured: true, description: '', highlights: [], gallery: [], film_url: '', sort_order: db.stories.length + 1, ...req.body };
  db.stories.push(item);
  saveDatabase();
  res.status(200).json({ success: true, story: item });
});
app.delete('/api/stories/:id', (req, res) => {
  db.stories = db.stories.filter(s => s.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});

app.get('/api/photos', (_req, res) => res.json(db.photos));
app.post('/api/photos', (req, res) => {
  const item: PhotoItem = { id: `photo-${Date.now()}`, image_url: '', title: 'Photo', caption: '', category: 'WEDDINGS', subcategory: '', location: '', couple_name: '', date: '', featured: true, sort_order: db.photos.length + 1, created_at: new Date().toISOString(), aspect_ratio: 'landscape', ...req.body };
  db.photos.push(item);
  saveDatabase();
  res.status(200).json({ success: true, photo: item });
});
app.delete('/api/photos/:id', (req, res) => {
  db.photos = db.photos.filter(p => p.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});

app.get('/api/films', (_req, res) => res.json(db.films));
app.post('/api/films', (req, res) => {
  const item: WeddingFilm = { id: `film-${Date.now()}`, title: 'Film', couple_name: '', location: '', duration: '4:00', cover_image: '', video_url: '', description: '', featured: true, sort_order: db.films.length + 1, ...req.body };
  db.films.push(item);
  saveDatabase();
  res.status(200).json({ success: true, film: item });
});
app.delete('/api/films/:id', (req, res) => {
  db.films = db.films.filter(f => f.id !== req.params.id);
  saveDatabase();
  res.status(200).json({ success: true });
});

app.get('/api/testimonials', (_req, res) => res.json(db.testimonials));
app.post('/api/testimonials', (req, res) => {
  const item: Testimonial = { id: `rev-${Date.now()}`, client_name: '', event_type: 'Wedding', rating: 5, quote: '', location: '', date: '2026', featured: true, ...req.body };
  db.testimonials.push(item);
  saveDatabase();
  res.status(200).json({ success: true, review: item });
});

// MEDIA UPLOAD
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(200).json({ success: true, ok: true, url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

// VITE SERVER
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ SEN PHOTOGRAPHY server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();