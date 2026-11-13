'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { VEHICLES } from '@/constants/vehicles';
import { formatPrice, getCategoryLabel } from '@/lib/utils';
import { ArrowRight, Fuel, Gauge, Zap } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/Badge';

export default function VehicleShowcase() {
  const featuredVehicles = VEHICLES.slice(0, 3);

  return (
    <section className="py-28 bg-brand-black section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Signature Fleet"
          title="Choose Your "
          highlight="Perfect Ride"
          subtitle="From nimble city scooters to the iconic Royal Enfield — engineered for performance, comfort, and absolute freedom."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="card-dark group flex flex-col h-full hover:border-brand-orange/40 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-brand-charcoal overflow-hidden">
                {vehicle.images?.[0] ? (
                  <Image
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={48} className="text-brand-orange/30" />
                  </div>
                )}

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-4 left-4 z-10">
                  <Badge variant={vehicle.category === 'premium' ? 'orange' : vehicle.category === 'scooter' ? 'blue' : 'green'}>
                    {getCategoryLabel(vehicle.category)}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant={vehicle.isAvailable ? 'green' : 'red'}>
                    {vehicle.isAvailable ? '● Available' : '● Booked'}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs uppercase font-semibold text-white/40 tracking-wider mb-1">
                  {vehicle.brand}
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">
                  {vehicle.name}
                </h3>
                <p className="text-white/60 text-sm mb-5 line-clamp-2 leading-relaxed">
                  {vehicle.description}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-3 gap-2.5 mb-6">
                  <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
                    <Fuel size={14} className="text-brand-orange mx-auto mb-1" />
                    <div className="text-white text-xs font-semibold">{vehicle.specs.mileage}</div>
                    <div className="text-white/40 text-[10px]">Mileage</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
                    <Gauge size={14} className="text-brand-orange mx-auto mb-1" />
                    <div className="text-white text-xs font-semibold">{vehicle.specs.topSpeed || 'N/A'}</div>
                    <div className="text-white/40 text-[10px]">Top Speed</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
                    <Zap size={14} className="text-brand-orange mx-auto mb-1" />
                    <div className="text-white text-xs font-semibold">{vehicle.specs.power.split('@')[0].trim()}</div>
                    <div className="text-white/40 text-[10px]">Power</div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div>
                    <div className="text-brand-orange font-bold text-2xl font-display">{formatPrice(vehicle.pricePerDay)}</div>
                    <div className="text-white/40 text-xs">per day</div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/vehicles/${vehicle.id}`}
                      className="border border-white/20 hover:border-brand-orange/50 text-white/70 hover:text-brand-orange text-sm px-3.5 py-2 rounded-full transition-all"
                    >
                      Details
                    </Link>
                    <Link
                      href={`/booking?vehicle=${vehicle.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/vehicles"
            className="btn-outline inline-flex items-center gap-2 group text-base px-8 py-3.5"
          >
            <span>View All 5 Rental Vehicles</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
