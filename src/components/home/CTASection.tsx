'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, PhoneCall } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-28 bg-brand-black section-padding relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-orange/15 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="text-brand-orange text-xs font-semibold tracking-widest uppercase">
            Start Your Journey Now
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]"
        >
          Ready to Hit the Road with <span className="text-gradient-orange">PS RENTALS</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Book your scooter or motorcycle in seconds. Uncompromising safety, pristine condition, and full 24/7 roadside assistance on every rental.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <Link
            href="/booking"
            className="btn-primary text-base px-9 py-4 inline-flex items-center gap-2 group shadow-xl shadow-brand-orange/30"
          >
            <span>Book Your Ride</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://wa.me/919999999999?text=Hi%20PS%20Rentals%2C%20I%20want%20to%20rent%20a%20bike!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-green-500/10 border-2 border-green-500/40 hover:bg-green-500/20 text-green-400 font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-green-500/10"
          >
            <MessageCircle size={19} />
            <span>Chat on WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
