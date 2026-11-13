import { Metadata } from 'next';
import VehiclesClient from '@/components/vehicles/VehiclesClient';

export const metadata: Metadata = {
  title: 'Our Vehicles',
  description: 'Browse our premium fleet of motorcycles and scooters available for rent.',
};

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      {/* Page Header */}
      <div className="section-padding max-w-7xl mx-auto py-16 text-center">
        <p className="text-brand-orange font-medium text-sm tracking-widest uppercase mb-3">Our Fleet</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Choose Your <span className="text-gradient-orange">Ride</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          From nimble city scooters to premium Royal Enfield motorcycles — every ride in our fleet is carefully maintained for your safety and enjoyment.
        </p>
      </div>
      <VehiclesClient />
    </div>
  );
}
