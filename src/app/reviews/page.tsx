import { Metadata } from 'next';
import ReviewsClient from '@/components/reviews/ReviewsClient';

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials',
  description: 'Read verified rider reviews and ratings for PS Rentals two-wheeler rental service.',
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="section-padding max-w-7xl mx-auto py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-1.5 mb-4">
          <span className="text-brand-orange text-xs font-semibold tracking-widest uppercase">
            Verified Experiences
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-4">
          What Our <span className="text-gradient-orange">Riders Say</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto font-light">
          100% genuine feedback from commuters, tourists, and motorcycle enthusiasts.
        </p>
      </div>
      <ReviewsClient />
    </div>
  );
}
