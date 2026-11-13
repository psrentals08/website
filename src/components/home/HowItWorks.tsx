'use client';
import { motion } from 'framer-motion';
import { Search, CalendarCheck, Key, Flag } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const steps = [
  { icon: Search, number: '01', title: 'Choose Your Machine', description: 'Browse our curated collection of scooters and performance motorcycles.' },
  { icon: CalendarCheck, number: '02', title: 'Pick Dates & Times', description: 'Select your preferred dates with transparent automated billing.' },
  { icon: Key, number: '03', title: 'Quick Verification', description: 'Submit your driving license and contact details in under two minutes.' },
  { icon: Flag, number: '04', title: 'Ignite & Ride', description: 'Collect your sanitized keys & helmet and take off towards your adventure.' },
];

export default function HowItWorks() {
  return (
    <section className="py-28 bg-brand-black section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Seamless Process"
          title="Rent Your Ride in "
          highlight="4 Simple Steps"
          subtitle="No lengthy paperwork. No complex security hold-ups. Quick, digital, and transparent."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-brand-orange/10 via-brand-orange/40 to-brand-orange/10 pointer-events-none" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center p-6 rounded-2xl bg-brand-charcoal/40 border border-white/5"
            >
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-charcoal border-2 border-brand-orange/40 mx-auto mb-6 shadow-lg shadow-brand-orange/10">
                <step.icon size={28} className="text-brand-orange" />
                <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold font-mono">
                  {step.number}
                </div>
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
