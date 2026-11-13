'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { VEHICLES } from '@/constants/vehicles';
import { getCategoryLabel } from '@/lib/utils';
import { Sparkles, X, ZoomIn } from 'lucide-react';

export default function GalleryClient() {
  const [selectedMedia, setSelectedMedia] = useState<{ src: string; alt: string; title: string } | null>(null);

  const galleryItems = [
    { src: '/images/bikes/bike-4.jpg', title: 'Royal Enfield Hunter 350', category: 'Premium Motorcycle' },
    { src: '/images/bikes/bike-2.jpg', title: 'TVS Ntorq 125', category: 'Sport Scooter' },
    { src: '/images/bikes/bike-1.jpg', title: 'TVS Jupiter', category: 'City Scooter' },
    { src: '/images/bikes/bike-5.jpg', title: 'Honda SP125', category: 'Commuter Bike' },
    { src: '/images/bikes/bike-3.jpg', title: 'TVS Radeon', category: 'Reliable Commuter' },
    { src: '/images/banner.jpg', title: 'PS Rentals Experience', category: 'Showcase' },
  ];

  return (
    <div className="section-padding max-w-7xl mx-auto pb-28">
      {/* Cinematic Video Showcase */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Cinematic Showcase</h2>
            <p className="text-white/50 text-sm">Official PS Rentals Brand Film</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-brand-orange text-xs font-mono">
            <Sparkles size={14} /> 4K Ultra HD
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-brand-charcoal border border-brand-orange/20 shadow-2xl aspect-video max-w-4xl mx-auto group">
          <video
            controls
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* High-Resolution Photo Gallery */}
      <div className="mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">Fleet Gallery</h2>
        <p className="text-white/50 text-sm mb-8">Click on any vehicle to view full high-definition photographs.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMedia({ src: item.src, alt: item.title, title: item.title })}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-charcoal border border-white/5 hover:border-brand-orange/40 cursor-pointer shadow-lg transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full border border-white/20 text-white">
                <ZoomIn size={16} />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-brand-orange text-xs font-mono uppercase tracking-wider block mb-0.5">
                  {item.category}
                </span>
                <h3 className="text-white font-display text-xl font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
            >
              <X size={24} />
            </button>
            <div
              className="relative max-w-5xl w-full max-h-[85vh] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedMedia.src}
                alt={selectedMedia.alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
                <h4 className="text-white font-display text-xl font-bold">{selectedMedia.title}</h4>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
