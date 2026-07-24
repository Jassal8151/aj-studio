import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IoArrowForward,
  IoCameraOutline,
  IoStar,
  IoHeartOutline,
  IoFlashOutline,
  IoGlobeOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import PortfolioCard from '../components/portfolio/PortfolioCard';
import LightboxModal from '../components/common/LightboxModal';
import { usePortfolioList } from '../hooks/usePortfolio';
import { CardSkeleton } from '../components/common/LoadingSpinner';
import { STUDIO_INFO } from '../constants/categories';

const services = [
  {
    icon: IoHeartOutline,
    title: 'Wedding Photography',
    desc: 'Cinematic storytelling capturing raw emotions, heirloom moments, and timeless vows on your special day.',
  },
  {
    icon: IoCameraOutline,
    title: 'Fine Art Portraiture',
    desc: 'Custom studio and outdoor portraiture crafted with dramatic lighting, depth, and psychological resonance.',
  },
  {
    icon: IoFlashOutline,
    title: 'Fashion & High Editorial',
    desc: 'Commercial campaigns, lookbooks, and high-fashion editorial imagery designed for luxury publications.',
  },
  {
    icon: IoGlobeOutline,
    title: 'Destination & Travel',
    desc: 'Architectural and landscape photography documenting cultures, horizons, and exotic global journeys.',
  },
];

const testimonials = [
  {
    quote:
      'AJ Studio captured our wedding with such poetic grace. Looking through our gallery brings back every exact emotion.',
    author: 'Elena & Julian Vance',
    role: 'Amalfi Coast Wedding',
  },
  {
    quote:
      'The high-fashion campaign Arshdeep shot for our summer lookbook elevated our brand image to international standards.',
    author: 'Marcella Blanc',
    role: 'Creative Director, Maison Blanc',
  },
  {
    quote:
      'Incredible eye for detail, master of natural light, and an absolute pleasure to collaborate with.',
    author: 'David Sterling',
    role: 'Architectural Digest',
  },
];

const instagramImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
];

const HomePage = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { data, isLoading } = usePortfolioList({ limit: 6, sort: 'newest' });

  const portfolioItems = data?.data || [];

  return (
    <>
      <SEO title="AJ Studio | Fine Art Photography Portfolio" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80"
            alt="Hero Cinematic Background"
            className="w-full h-full object-cover object-center filter brightness-[0.35] scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/40" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.25em]">
              Fine Art & Commercial Photography
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white leading-none">
              Capturing Timeless <br />
              <span className="gold-gradient-text">Visual Stories</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              We transform unrepeatable moments into heirloom visual art. Specializing in luxury weddings, editorial portraits, high fashion, and global expeditions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link to="/portfolio">
              <Button variant="gold" size="lg" className="flex items-center gap-2">
                Explore Gallery
                <IoArrowForward className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact" >
              <Button variant="outline" size="lg" >
                Book A Session
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-24 bg-neutral-950 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-8">
            <div>
              <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
                Curated Collection
              </span>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight mt-1">
                Featured Portfolio
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              View Full Portfolio ({data?.totalDocuments || 0})
              <IoArrowForward className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <CardSkeleton key={n} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item, idx) => (
                <PortfolioCard
                  key={item._id}
                  item={item}
                  onClick={() => setLightboxIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-neutral-900/50 border-y border-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
                  alt="Arshdeep Singh Jassal Principal Photographer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-500/10 border border-amber-500/30 rounded-2xl -z-0 backdrop-blur-xl hidden sm:block" />
            </div>

            {/* Content Column */}
            <div className="space-y-6">
              <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
                Behind The Lens
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                {STUDIO_INFO.founder}
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                With over a decade of experience documenting stories across 15+ countries, my mission is to create authentic imagery that stands the test of time. Every frame is composed with meticulous attention to natural light, spatial geometry, and emotional intimacy.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Mastery of medium-format & 35mm cinematic lighting',
                  'Unobtrusive documentary style for weddings and events',
                  'International availability for destination commissions',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-neutral-300">
                    <IoCheckmarkCircleOutline className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link to="/about">
                  <Button variant="secondary" className="flex items-center gap-2">
                    Read Full Biography
                    <IoArrowForward className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
              Bespoke Photography
            </span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
              Our Services
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tailored visual solutions crafted for discerning clients, luxury brands, and memorable life events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 space-y-4 hover:border-amber-500/40 hover:bg-neutral-900 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-wide">{srv.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-neutral-900/80 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STUDIO_INFO.stats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold gold-gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
              Words of Appreciation
            </span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
              Client Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <IoStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 italic leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="pt-4 border-t border-neutral-800/80">
                  <h4 className="text-sm font-semibold text-white">{t.author}</h4>
                  <p className="text-[11px] text-amber-500 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Preview */}
      <section className="py-16 bg-neutral-900/30 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              @AJSTUDIO.PHOTOGRAPHY ON INSTAGRAM
            </span>
            <a
              href={STUDIO_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 uppercase tracking-wider"
            >
              Follow Us
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {instagramImages.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-xl overflow-hidden border border-neutral-800/60 group relative cursor-pointer"
              >
                <img
                  src={img}
                  alt="Instagram Preview"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-amber-400">
                  <IoCameraOutline className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-24 bg-gradient-to-b from-neutral-950 to-neutral-900 border-t border-neutral-900 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            Ready to Capture Your <br />
            <span className="gold-gradient-text">Next Chapter?</span>
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed max-w-xl mx-auto">
            Bookings are open for upcoming seasons and global destination travel. Contact us to check date availability or request a custom package.
          </p>
          <Link to="/contact">
            <Button variant="gold" size="lg">
              Book A Commission
            </Button>
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <LightboxModal
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={portfolioItems}
        index={lightboxIndex}
      />
    </>
  );
};

export default HomePage;
