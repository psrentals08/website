import { Metadata } from 'next';
import { Suspense } from 'react';
import BookingClient from '@/components/booking/BookingClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Book Your Ride',
  description: 'Book your preferred motorcycle or scooter with PS Rentals.',
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="section-padding max-w-7xl mx-auto py-16">
        <div className="text-center mb-12">
          <p className="text-brand-orange font-medium text-sm tracking-widest uppercase mb-3">Booking</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Book Your <span className="text-gradient-orange">Ride</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Fill in your details below. We'll confirm your booking within minutes.
          </p>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <BookingClient />
        </Suspense>
      </div>
    </div>
  );
}
