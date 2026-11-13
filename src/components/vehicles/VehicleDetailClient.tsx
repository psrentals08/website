'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/types';
import { formatPrice, getCategoryLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Fuel, Gauge, Settings, Zap, ArrowLeft, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface Props {
  vehicle: Vehicle;
}

export default function VehicleDetailClient({ vehicle }: Props) {
  const hasImage = vehicle.images && vehicle.images.length > 0;

  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="section-padding max-w-7xl mx-auto py-12">
        {/* Back button */}
        <Link
          href="/vehicles"
          className="inline-flex items-center gap-2 text-white/60 hover:text-brand-orange mb-8 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Vehicles
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vehicle Image Presentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="relative h-80 sm:h-96 lg:h-[480px] rounded-3xl bg-gradient-to-br from-brand-charcoal to-brand-charcoal-light overflow-hidden border border-white/10 shadow-2xl">
              {hasImage ? (
                <Image
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  fill
                  priority
                  className="object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center opacity-40">
                    <Zap size={80} className="text-brand-orange mx-auto mb-3" />
                    <p className="text-white text-lg font-medium">{vehicle.name}</p>
                  </div>
                </div>
              )}

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <Badge variant={vehicle.category === 'premium' ? 'orange' : vehicle.category === 'scooter' ? 'blue' : 'green'}>
                  {getCategoryLabel(vehicle.category)}
                </Badge>
                <Badge variant={vehicle.isAvailable ? 'green' : 'red'}>
                  {vehicle.isAvailable ? '● Available for Rent' : '● Currently Booked'}
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-white font-display text-xl font-bold tracking-wide drop-shadow-md">
                  {vehicle.name}
                </span>
                <span className="text-brand-orange font-display text-2xl font-bold drop-shadow-md">
                  {formatPrice(vehicle.pricePerDay)}/day
                </span>
              </div>
            </div>

            {/* Quick trust badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-brand-charcoal border border-white/5 rounded-xl p-3 text-center">
                <ShieldCheck size={18} className="text-brand-orange mx-auto mb-1" />
                <span className="text-white/70 text-xs font-medium">Fully Insured</span>
              </div>
              <div className="bg-brand-charcoal border border-white/5 rounded-xl p-3 text-center">
                <Settings size={18} className="text-brand-orange mx-auto mb-1" />
                <span className="text-white/70 text-xs font-medium">Sanitized & Serviced</span>
              </div>
              <div className="bg-brand-charcoal border border-white/5 rounded-xl p-3 text-center">
                <HelpCircle size={18} className="text-brand-orange mx-auto mb-1" />
                <span className="text-white/70 text-xs font-medium">24/7 Road Support</span>
              </div>
            </div>
          </motion.div>

          {/* Details & Booking Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-brand-orange text-xs uppercase font-semibold tracking-widest mb-1">{vehicle.brand}</div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">{vehicle.name}</h1>
            <p className="text-white/70 leading-relaxed mb-6 text-base">{vehicle.description}</p>

            {/* Price Box */}
            <div className="bg-brand-charcoal rounded-2xl p-6 border border-white/10 mb-6">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Rental Tariff</div>
                  <div className="text-brand-orange font-display text-4xl font-bold">{formatPrice(vehicle.pricePerDay)}</div>
                  <div className="text-white/50 text-xs">per 24-hour cycle</div>
                </div>
                <div className="text-right">
                  <div className="text-white/50 text-xs uppercase tracking-wider mb-1">Security Deposit</div>
                  <div className="text-white font-semibold text-2xl">{formatPrice(vehicle.securityDeposit)}</div>
                  <div className="text-green-400 text-xs font-medium">100% Refundable on return</div>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mb-6">
              <h3 className="font-display text-lg font-bold text-white mb-3">Vehicle Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Settings, label: 'Engine', value: vehicle.specs.engine },
                  { icon: Zap, label: 'Power', value: vehicle.specs.power },
                  { icon: Fuel, label: 'Mileage', value: vehicle.specs.mileage },
                  { icon: Gauge, label: 'Top Speed', value: vehicle.specs.topSpeed || 'N/A' },
                  { icon: Settings, label: 'Transmission', value: vehicle.specs.transmission },
                  { icon: Fuel, label: 'Fuel Type', value: vehicle.specs.fuelType },
                ].map((spec) => (
                  <div key={spec.label} className="bg-brand-charcoal/80 rounded-xl p-3 border border-white/5 flex items-start gap-3">
                    <spec.icon size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white/40 text-[11px] uppercase tracking-wider">{spec.label}</div>
                      <div className="text-white text-sm font-medium">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-6">
              <h3 className="font-display text-lg font-bold text-white mb-3">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-white/80 text-sm bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                    <CheckCircle2 size={15} className="text-brand-orange flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rental Requirements */}
            <div className="mb-8">
              <h3 className="font-display text-lg font-bold text-white mb-3">Rental Terms & Conditions</h3>
              <ul className="space-y-2 bg-brand-charcoal/50 rounded-xl p-4 border border-white/5">
                {vehicle.rentalConditions.map((cond) => (
                  <li key={cond} className="flex items-start gap-2.5 text-white/60 text-xs sm:text-sm">
                    <span className="text-brand-orange font-bold mt-0.5">•</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            {vehicle.isAvailable ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/booking?vehicle=${vehicle.id}`}
                  className="btn-primary flex-1 text-center text-base py-4"
                >
                  Book This Vehicle Now
                </Link>
                <a
                  href={`https://wa.me/919999999999?text=Hi%20PS%20Rentals%2C%20I%20want%20to%20rent%20the%20${encodeURIComponent(vehicle.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-center text-base py-4 px-6"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            ) : (
              <div className="text-center py-4 bg-white/5 rounded-2xl text-white/50 border border-white/10">
                This vehicle is currently rented out. Check other vehicles or contact us for upcoming availability.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
