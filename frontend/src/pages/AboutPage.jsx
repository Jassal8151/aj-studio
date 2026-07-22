import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoAddOutline,
  IoRemoveOutline,
  IoTrophyOutline,
  IoHardwareChipOutline,
  IoCameraOutline,
  IoBriefcaseOutline,
} from 'react-icons/io5';
import SEO from '../components/common/SEO';
import { STUDIO_INFO } from '../constants/categories';

const equipment = [
  { category: 'Camera Bodies', items: ['Canon EOS R5 (45MP Dual Pixel)', 'Sony A7R V (61MP Full Frame)', 'Fujifilm GFX 100 II (Medium Format)'] },
  { category: 'Prime & Zoom Lenses', items: ['Canon RF 85mm f/1.2L USM DS', 'Sony FE 50mm f/1.2 GM', 'Canon RF 24-70mm f/2.8L IS', 'Sony FE 70-200mm f/2.8 GM II'] },
  { category: 'Lighting & Modifiers', items: ['Profoto A10 On-Camera Flash', 'Profoto B10X Plus Location Kit', 'Elinchrom 125cm Deep Umbrella', 'Nanlite Pavotube II 30X'] },
];

const timeline = [
  { year: '2016', title: 'Studio Founded', desc: 'Established AJ Studio in New York, focusing on editorial fashion and high-end portraiture.' },
  { year: '2019', title: 'Global Destination Expansion', desc: 'Expanded services across Europe and Asia, capturing luxury weddings in Italy, France, and Japan.' },
  { year: '2022', title: 'International Photography Award', desc: 'Received International Wedding Photographer of the Year First Honor for Amalfi Coast series.' },
  { year: '2025', title: 'Medium Format Fine Art Exhibition', desc: 'Solo exhibition hosted in Soho, NY featuring medium-format black-and-white portraits.' },
];

const faqs = [
  {
    q: 'What is your turnaround time for final gallery delivery?',
    a: 'For wedding galleries, full high-resolution edited files are delivered within 4 to 6 weeks. For portrait sessions and editorial campaigns, delivery takes 7 to 10 business days.',
  },
  {
    q: 'Do you travel internationally for shoots?',
    a: 'Yes, absolutely. Over 60% of our annual commissions involve destination travel. Custom travel packages and logistics are arranged upon booking.',
  },
  {
    q: 'How do we secure our date?',
    a: 'Dates are reserved upon signature of our digital agreement and receipt of a 30% retainer deposit. Since we limit annual bookings to maintain quality, early inquiry is advised.',
  },
  {
    q: 'Do you provide raw unedited image files?',
    a: 'We deliver fully finished, color-graded high-resolution JPEG files. Raw files remain part of our artistic process and intellectual IP.',
  },
];

const AboutPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      <SEO
        title="About Arshdeep Singh Jassal | AJ Studio Photography"
        description="Learn about Arshdeep Singh Jassal, principal photographer at AJ Studio, our photography philosophy, awards, and professional camera equipment."
      />

      {/* Header Banner */}
      <div className="bg-neutral-900/60 border-b border-neutral-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-[0.2em]">
            Biography & Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
            About <span className="gold-gradient-text">AJ Studio</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Crafting timeless, emotive visual art through a blend of documentary realism and cinematic fine art techniques.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Arshdeep Singh Jassal portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Narrative */}
            <div className="space-y-6">
              <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
                Principal Photographer
              </span>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
                {STUDIO_INFO.founder}
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed">
                I believe photography is more than recording light; it is an act of preservation. A great photograph captures not only how a moment looked, but precisely how it felt.
              </p>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Formally trained in fine art and visual design, my work balances spontaneous emotion with precise geometrical composition. Whether photographing an intimate vow exchange on the cliffs of Ravello or directing an editorial campaign for luxury brands, my focus remains constant: truth, beauty, and permanence.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-amber-400">10+ Years</div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Professional Experience</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-amber-400">15+ Countries</div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">Destination Travel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-20 bg-neutral-900/40 border-y border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <IoCameraOutline className="w-10 h-10 mx-auto text-amber-400" />
          <blockquote className="text-xl sm:text-2xl font-serif italic text-neutral-200 leading-relaxed">
            "To photograph is to hold one's breath, when all faculties converge to capture fleeting reality. It is at that very moment that mastering an image becomes a great physical and intellectual joy."
          </blockquote>
          <span className="block text-xs uppercase tracking-widest text-amber-500 font-semibold">
            — Photography Philosophy
          </span>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
              State-of-the-Art Gear
            </span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
              Our Equipment
            </h2>
            <p className="text-xs text-neutral-400 max-w-xl mx-auto">
              We utilize flagship full-frame and medium-format cameras paired with prime lenses to deliver extreme sharpness and dynamic range.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipment.map((eq, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3 text-amber-400 border-b border-neutral-800 pb-3">
                  <IoHardwareChipOutline className="w-5 h-5" />
                  <h3 className="text-base font-semibold uppercase tracking-wider text-white">
                    {eq.category}
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {eq.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-neutral-900/30 border-y border-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
              Milestones
            </span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
              Journey & Recognition
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-neutral-800">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col sm:flex-row items-start ${
                  idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                } gap-8`}
              >
                <div className="w-full sm:w-1/2 pl-10 sm:pl-0 sm:pr-8 space-y-2">
                  <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-neutral-950" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-amber-500 text-xs uppercase tracking-widest font-semibold">
              Information
            </span>
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <IoRemoveOutline className="w-5 h-5 text-amber-500 shrink-0" />
                    ) : (
                      <IoAddOutline className="w-5 h-5 text-neutral-400 shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-4 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
