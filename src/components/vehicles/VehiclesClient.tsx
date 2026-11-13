'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VEHICLES, VEHICLE_CATEGORIES } from '@/constants/vehicles';
import { VehicleCard } from './VehicleCard';
import { Vehicle, VehicleCategory } from '@/types';

export default function VehiclesClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredVehicles = activeCategory === 'all'
    ? VEHICLES
    : VEHICLES.filter(v => v.category === activeCategory);

  return (
    <div className="section-padding max-w-7xl mx-auto pb-24">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {VEHICLE_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat.value
                ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30'
                : 'bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Vehicle Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-24 text-white/40">
          No vehicles found in this category.
        </div>
      )}
    </div>
  );
}
