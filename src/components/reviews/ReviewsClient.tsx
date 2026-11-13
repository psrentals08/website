'use client';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const reviews = [
  {
    name: 'Rahul Sharma',
    rating: 5,
    vehicle: 'Royal Enfield Hunter 350',
    date: 'Verified Rental • 2 days ago',
    comment:
      'The Hunter 350 was an absolute joy! The exhaust note, engine response, and brake bite were top notch. Handover took barely 3 minutes. PS Rentals is setting the bar high for two-wheeler rentals.',
  },
  {
    name: 'Priya Nair',
    rating: 5,
    vehicle: 'TVS Ntorq 125',
    date: 'Verified Rental • 1 week ago',
    comment:
      'I commute around town for meetings and the Ntorq was zippy, clean, and delivered great mileage. The phone mount was super convenient. Will definitely book again!',
  },
  {
    name: 'Arjun Mehta',
    rating: 5,
    vehicle: 'Honda SP125',
    date: 'Verified Rental • 2 weeks ago',
    comment:
      'Honest service with zero drama. Security deposit was returned straight back to my GPay right when I dropped off the keys. The bike was thoroughly serviced and washed.',
  },
  {
    name: 'Sneha Reddy',
    rating: 5,
    vehicle: 'TVS Jupiter',
    date: 'Verified Rental • 3 weeks ago',
    comment:
      'Extremely comfortable suspension and huge boot space. The team even provided a freshly sanitized helmet without any extra charge. Kudos to the PS Rentals team!',
  },
  {
    name: 'Karthik Rajan',
    rating: 5,
    vehicle: 'Royal Enfield Hunter 350',
    date: 'Verified Rental • 1 month ago',
    comment:
      'Rented for a weekend ride towards the hills. Smooth throttle, great cruising stability, and 24/7 WhatsApp support gave total peace of mind throughout the trip.',
  },
  {
    name: 'Anjali Verma',
    rating: 5,
    vehicle: 'TVS Radeon',
    date: 'Verified Rental • 1 month ago',
    comment:
      'Budget-friendly yet wonderfully maintained motorcycle. The mileage is phenomenal and the seating posture is very relaxed. Great job guys!',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'text-brand-orange fill-brand-orange' : 'text-white/20'}
        />
      ))}
    </div>
  );
}

export default function ReviewsClient() {
  const averageRating = 4.9;

  return (
    <div className="section-padding max-w-7xl mx-auto pb-28">
      {/* Rating Summary Box */}
      <div className="bg-brand-charcoal rounded-3xl p-8 border border-white/10 mb-16 text-center max-w-md mx-auto shadow-2xl">
        <div className="font-display text-6xl font-black text-brand-orange mb-2">
          {averageRating}
        </div>
        <div className="flex justify-center mb-2">
          <StarRating rating={5} />
        </div>
        <div className="text-white/80 font-semibold text-sm">Overall Rider Satisfaction</div>
        <div className="text-white/40 text-xs mt-1">Based on over 500+ verified rentals</div>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-brand-charcoal border border-white/5 hover:border-brand-orange/30 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={review.rating} />
                <Quote size={24} className="text-brand-orange/30" />
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                "{review.comment}"
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-base flex items-center gap-1.5">
                  <span>{review.name}</span>
                  <CheckCircle2 size={14} className="text-green-400" />
                </div>
                <div className="text-brand-orange text-xs font-medium mt-0.5">{review.vehicle}</div>
              </div>
              <div className="text-white/30 text-[11px] font-mono">{review.date}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Direct WhatsApp Review CTA */}
      <div className="text-center mt-16 bg-brand-charcoal/50 rounded-2xl p-8 border border-white/5 max-w-2xl mx-auto">
        <h3 className="font-display text-2xl font-bold text-white mb-2">Enjoyed Your PS Rentals Ride?</h3>
        <p className="text-white/60 text-sm mb-6">
          Share your review or photo with us and get an exclusive discount on your next booking!
        </p>
        <a
          href="https://wa.me/919999999999?text=Hi%20PS%20Rentals%2C%20I%20want%20to%20share%20my%20rental%20feedback!"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          <MessageCircle size={18} />
          <span>Submit Review via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
