import { Metadata } from 'next';
import GalleryClient from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: 'Media Gallery',
  description: 'Explore the PS Rentals fleet in high-definition photographs and cinematic footage.',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="section-padding max-w-7xl mx-auto py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-1.5 mb-4">
          <span className="text-brand-orange text-xs font-semibold tracking-widest uppercase">
            Visual Showcase
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-4">
          Our Fleet in <span className="text-gradient-orange">Action</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto font-light">
          Experience the design, precision, and raw aesthetic of PS Rentals high-performance vehicles.
        </p>
      </div>
      <GalleryClient />
    </div>
  );
}
