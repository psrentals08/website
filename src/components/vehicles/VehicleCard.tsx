'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/types';
import { formatPrice, getCategoryLabel } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Fuel, Gauge, Zap, Settings } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const hasImage = vehicle.images && vehicle.images.length > 0;

  return (
    <div className="card-dark group h-full flex flex-col">
      {/* Image Area */}
      <div className="relative h-60 bg-gradient-to-br from-brand-charcoal-light to-brand-charcoal overflow-hidden">
        {hasImage ? (
          <Image
            src={vehicle.images[0]}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center opacity-30 group-hover:opacity-50 transition-opacity">
              <Zap size={64} className="text-brand-orange mx-auto mb-2" />
              <p className="text-white text-sm font-medium">{vehicle.name}</p>
            </div>
          </div>
        )}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-black/30 pointer-events-none" />

        {/* Hover shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />

        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <Badge variant={vehicle.category === 'premium' ? 'orange' : vehicle.category === 'scooter' ? 'blue' : 'green'}>
            {getCategoryLabel(vehicle.category)}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <Badge variant={vehicle.isAvailable ? 'green' : 'red'}>
            {vehicle.isAvailable ? '● Available' : '● Unavailable'}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-1">
          <span className="text-white/40 text-xs uppercase tracking-wider font-semibold">{vehicle.brand}</span>
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">
          {vehicle.name}
        </h3>
        <p className="text-white/50 text-sm mb-4 leading-relaxed line-clamp-2">{vehicle.description}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {[
            { icon: Fuel, label: 'Mileage', value: vehicle.specs.mileage },
            { icon: Gauge, label: 'Top Speed', value: vehicle.specs.topSpeed || 'N/A' },
            { icon: Settings, label: 'Engine', value: vehicle.specs.engine.split(' ')[0] },
            { icon: Zap, label: 'Power', value: vehicle.specs.power.split('@')[0].trim() },
          ].map((spec) => (
            <div key={spec.label} className="bg-white/5 rounded-lg p-2.5 flex items-center gap-2">
              <spec.icon size={14} className="text-brand-orange flex-shrink-0" />
              <div>
                <div className="text-white text-xs font-medium leading-tight">{spec.value}</div>
                <div className="text-white/40 text-[10px]">{spec.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Deposit info */}
        <div className="text-white/40 text-xs mb-4">
          Security Deposit: <span className="text-white/70 font-medium">{formatPrice(vehicle.securityDeposit)}</span> (Refundable)
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {vehicle.features.slice(0, 3).map((feature) => (
            <span key={feature} className="bg-white/5 border border-white/10 text-white/60 text-[11px] rounded-full px-2.5 py-1">
              {feature}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="text-white/40 text-[11px] py-1">+{vehicle.features.length - 3} more</span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div>
            <div className="text-brand-orange font-bold text-2xl font-display">{formatPrice(vehicle.pricePerDay)}</div>
            <div className="text-white/40 text-xs">per day</div>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/vehicles/${vehicle.id}`}
              className="border border-white/20 hover:border-brand-orange/50 text-white/70 hover:text-brand-orange text-sm px-3.5 py-2 rounded-full transition-all duration-200"
            >
              Details
            </Link>
            <Link
              href={vehicle.isAvailable ? `/booking?vehicle=${vehicle.id}` : '#'}
              className={`text-sm px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                vehicle.isAvailable
                  ? 'bg-brand-orange hover:bg-brand-orange-light text-white shadow-md hover:shadow-brand-orange/30'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {vehicle.isAvailable ? 'Book' : 'Unavailable'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
