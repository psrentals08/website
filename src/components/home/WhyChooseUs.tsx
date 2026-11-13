'use client';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Award, Headphones, CreditCard, MapPin } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const features = [
  {
    icon: ShieldCheck,
    title: 'Certified & Serviced Fleet',
    description: 'Every vehicle undergoes 24-point mechanical and safety inspections before every single handover.',
  },
  {
    icon: Clock,
    title: 'Flexible Rental Plans',
    description: 'Hourly, daily, weekly, or monthly rentals customized to your travel plans without rigid conditions.',
  },
  {
    icon: Award,
    title: 'Premium Automotive Standards',
    description: 'Original brand performance parts, smooth throttle response, and helmets included with every ride.',
  },
  {
    icon: Headphones,
    title: '24/7 Roadside Assistance',
    description: 'Our dedicated on-ground team is always on standby across the city for any immediate roadside needs.',
  },
  {
    icon: CreditCard,
    title: 'Zero Hidden Charges',
    description: 'Honest pricing with transparent refundable security deposits returned immediately upon safe handover.',
  },
  {
    icon: MapPin,
    title: 'Easy Pickup & Delivery',
    description: 'Pick up from our central hub or request doorstep vehicle drop-off right at your stay or hotel.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-28 bg-brand-charcoal section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="The PS Rentals Advantage"
          title="Engineered for "
          highlight="Pure Peace of Mind"
          subtitle="We combine automotive luxury with effortless rental flexibility so you can focus solely on your journey."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl border border-white/5 hover:border-brand-orange/30 bg-brand-black/60 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/5"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-6 group-hover:bg-brand-orange/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon size={26} className="text-brand-orange" />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-3">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
