import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Portfolio from '../models/Portfolio.js';

dotenv.config();

const sampleImages = [
  {
    title: 'Ethereal Bridal Veil',
    description: 'Golden hour wedding portrait capturing natural light and elegance.',
    category: 'Wedding',
    location: 'Amalfi Coast, Italy',
    date: '2026-05-14',
    camera: 'Canon EOS R5 (85mm f/1.2)',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_wedding_01',
  },
  {
    title: 'Urban Shadows & Silhouette',
    description: 'High contrast monochrome fashion portrait in downtown Chicago.',
    category: 'Fashion',
    location: 'Chicago, IL',
    date: '2026-04-10',
    camera: 'Sony A7R V (50mm f/1.4)',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_fashion_01',
  },
  {
    title: 'Sovereign Eagle Flight',
    description: 'Majestic wildlife shot of a bald eagle soaring over mountain peaks.',
    category: 'Wildlife',
    location: 'Banff National Park, Canada',
    date: '2026-03-22',
    camera: 'Nikon Z9 (600mm f/4)',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_wildlife_01',
  },
  {
    title: 'Alpine Horizon at Dawn',
    description: 'Breathtaking landscape photo of misty peaks during sunrise.',
    category: 'Nature',
    location: 'Swiss Alps, Switzerland',
    date: '2026-06-01',
    camera: 'Canon EOS R5 (24-70mm f/2.8)',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_nature_01',
  },
  {
    title: 'Santorini Sunset Whispers',
    description: 'Architectural travel photography highlighting iconic white domes against ocean blues.',
    category: 'Travel',
    location: 'Santorini, Greece',
    date: '2026-02-18',
    camera: 'Fujifilm GFX 100 II (35mm f/2.8)',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_travel_01',
  },
  {
    title: 'Midnight Runway Haute Couture',
    description: 'Editorial high-fashion campaign shot for Paris Fashion Week.',
    category: 'Fashion',
    location: 'Paris, France',
    date: '2026-01-29',
    camera: 'Leica SL2 (75mm f/2)',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_fashion_02',
  },
  {
    title: 'Velvet Noir Perfume Bottle',
    description: 'Minimalist luxury product advertisement with moody reflections.',
    category: 'Product',
    location: 'AJ Studio Base',
    date: '2026-04-05',
    camera: 'Hasselblad X2D 100C (90mm f/2.5)',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_product_01',
  },
  {
    title: 'Symphony Under Neon Lights',
    description: 'Vibrant live concert event photography filled with stage energy.',
    category: 'Event',
    location: 'Madison Square Garden, NY',
    date: '2026-05-30',
    camera: 'Sony A1 (70-200mm f/2.8)',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_event_01',
  },
  {
    title: 'Tokyo Rain Reflections',
    description: 'Cinematic street portrait under glowing neon umbrella lights in Shinjuku.',
    category: 'Street',
    location: 'Tokyo, Japan',
    date: '2026-03-14',
    camera: 'Fujifilm X-T5 (35mm f/1.4)',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_street_01',
  },
  {
    title: 'The Modern Minimalist Portrait',
    description: 'Clean studio portrait focusing on emotion, lighting, and shadow details.',
    category: 'Portrait',
    location: 'AJ Studio Main Room',
    date: '2026-06-12',
    camera: 'Canon EOS R5 (100mm f/2.8 Macro)',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
    publicId: 'seed_portrait_01',
  },
];

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aj_studio_portfolio';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Seed Admin Account
    const adminUsername = 'admin@ajstudio.com';
    const adminPassword = 'admin123456';

    const existingAdmin = await Admin.findOne({ username: adminUsername });
    if (!existingAdmin) {
      await Admin.create({
        username: adminUsername,
        password: adminPassword,
      });
      console.log(`✅ Default Admin Created: Username: ${adminUsername} | Password: ${adminPassword}`);
    } else {
      console.log(`ℹ️  Admin account ${adminUsername} already exists.`);
    }

    // Seed Portfolio items if empty
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      await Portfolio.insertMany(sampleImages);
      console.log(`✅ Seeded ${sampleImages.length} initial portfolio items into database.`);
    } else {
      console.log(`ℹ️  Portfolio collection already contains ${portfolioCount} items.`);
    }

    console.log('Seeding procedure complete.');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
