'use client';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Rahul Sharma',
    rating: 5,
    comment: 'Rented the Royal Enfield Hunter 350 for a 3-day highway trip. The bike felt straight out of the showroom, throttle response was crisp, and the booking was lightning fast.',
    vehicle: 'Royal Enfield Hunter 350',
    date: 'Verified Rider',
  },
  {
    name: 'Priya Nair',
    rating: 5,
    comment: 'The TVS Ntorq 125 was a breeze in city traffic. Smooth handling, Bluetooth navigation support, and zero hassle during pickup and drop. PS Rentals is my go-to service now!',
    vehicle: 'TVS Ntorq 125',
    date: 'Verified Rider',
  },
  {
    name: 'Arjun Mehta',
    rating: 5,
    comment: 'Very professional outfit. Completely upfront with deposit terms, returned within 30 minutes of vehicle handover. Clean bikes, friendly team. 10/10.',
    vehicle: 'Honda SP125',
    date: 'Verified Rider',
  },
];

export default function TestimonialsPreview() {
  return (
    <section className="py-28 bg-brand-charcoal section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Rider Testimonials"
          title="What Our Riders "
          highlight="Say About Us"
          subtitle="Real reviews from commuters, weekend riders, and travelers who trusted PS Rentals."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-brand-black/70 border border-white/5 hover:border-brand-orange/30 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <Quote size={32} className="text-brand-orange/30 mb-5" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-brand-orange fill-brand-orange" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-white text-base">{t.name}</div>
                  <div className="text-brand-orange text-xs mt-0.5">{t.vehicle}</div>
                </div>
                <div className="text-white/40 text-xs font-mono">{t.date}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/reviews"
            className="btn-ghost text-brand-orange inline-flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            <span>Read all customer ratings and reviews</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
