import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Star, Bike, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about PS Rentals — your trusted premium two-wheeler rental service.',
};

const stats = [
  { value: '5+', label: 'Premium Vehicles', icon: Bike },
  { value: '1,200+', label: 'Riders Served', icon: Users },
  { value: '4.9 / 5', label: 'Customer Rating', icon: Star },
  { value: '100%', label: 'Insured & Inspected', icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      {/* Hero Header */}
      <div className="section-padding max-w-7xl mx-auto py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-1.5 mb-5">
          <span className="text-brand-orange text-xs font-semibold tracking-widest uppercase">
            The PS Rentals Philosophy
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
          Riding Redefined with <span className="text-gradient-orange">Confidence</span>
        </h1>
        <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          PS Rentals was born with a single mission: to provide motorcycle and scooter enthusiasts with an uncompromising, luxury rental experience that values your time and safety.
        </p>
      </div>

      {/* Numerical Stats */}
      <div className="section-padding max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-brand-charcoal border border-white/5 rounded-2xl p-6 text-center hover:border-brand-orange/30 transition-all duration-300"
            >
              <stat.icon size={28} className="text-brand-orange mx-auto mb-3" />
              <div className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story & Visuals */}
      <div className="bg-brand-charcoal section-padding py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-brand-orange font-semibold text-xs tracking-widest uppercase mb-3 block">
              Who We Are
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              More than a Rental Service. <br />
              <span className="text-white/60">Your Two-Wheeled Freedom Partner.</span>
            </h2>
            <div className="space-y-4 text-white/70 text-base leading-relaxed">
              <p>
                We believe renting a bike shouldn't mean settling for beat-up scooters or confusing terms. Whether you're commuting across the bustling streets with our nimble TVS Jupiter and Ntorq 125, or chasing open horizons with the commanding Royal Enfield Hunter 350, every ride with PS Rentals is guaranteed to feel fresh, responsive, and exciting.
              </p>
              <p>
                Every vehicle in our fleet is company-owned, routinely serviced with factory parts, sanitized before delivery, and backed by instantaneous customer support.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/vehicles" className="btn-primary">
                <span>Explore Fleet</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-outline">
                Contact Our Team
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-brand-black/60 p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-6">Our Core Commitments</h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Impeccable Mechanical Standards',
                  desc: 'Brakes, tires, engine fluid, and electronics are inspected every single day before handover.',
                },
                {
                  title: 'Transparent Pricing & Instant Refund',
                  desc: 'Security deposits are clearly stated and refunded back directly to your UPI/account upon check-in.',
                },
                {
                  title: 'Complimentary Riding Gear',
                  desc: 'Clean, sanitized ISI-certified helmets provided with each rental for driver and pillion on request.',
                },
                {
                  title: '24/7 Rapid Response',
                  desc: 'Direct WhatsApp and hotline access so you are never left stranded anywhere in town.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base">{item.title}</h4>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
