'use client';
import { useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/75 to-brand-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/40" />

        {/* Ambient Orange Glows */}
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-orange/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 section-padding max-w-7xl mx-auto w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 max-w-3xl"
          >
            {/* Brand Pill */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-brand-charcoal/80 border border-brand-orange/40 backdrop-blur-md rounded-full px-4 py-1.5 shadow-lg shadow-brand-orange/10">
                <Sparkles size={14} className="text-brand-orange" />
                <span className="text-white text-xs font-semibold tracking-widest uppercase">
                  Premium Two-Wheeler Rentals
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6"
            >
              <span className="text-white">YOUR RIDE.</span>
              <br />
              <span className="text-gradient-orange drop-shadow-lg">YOUR FREEDOM.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-white/80 text-lg sm:text-xl lg:text-2xl mb-10 max-w-xl font-light leading-relaxed"
            >
              Find your perfect ride with <span className="text-white font-bold tracking-wide">PS RENTALS</span>.
              Explore the city or hit the open highway with meticulously maintained motorcycles and scooters.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <Link
                href="/vehicles"
                className="btn-primary text-base px-8 py-4 flex items-center gap-2 group shadow-xl shadow-brand-orange/25"
              >
                <span>Explore Bikes</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/booking"
                className="btn-outline text-base px-8 py-4 backdrop-blur-sm"
              >
                Book Your Ride
              </Link>
            </motion.div>

            {/* Live Trust Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-white/10 max-w-lg"
            >
              <div>
                <div className="text-brand-orange font-display text-3xl sm:text-4xl font-bold">5+</div>
                <div className="text-white/60 text-xs sm:text-sm mt-1">Premium Models</div>
              </div>
              <div>
                <div className="text-white font-display text-3xl sm:text-4xl font-bold">100%</div>
                <div className="text-white/60 text-xs sm:text-sm mt-1">Sanitized Fleet</div>
              </div>
              <div>
                <div className="text-brand-orange font-display text-3xl sm:text-4xl font-bold">24/7</div>
                <div className="text-white/60 text-xs sm:text-sm mt-1">Road Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Logo Reveal Preview (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:flex lg:col-span-4 flex-col items-center justify-center"
          >
            <div className="relative w-72 h-72 rounded-3xl overflow-hidden border border-brand-orange/30 bg-brand-charcoal/40 backdrop-blur-xl p-4 shadow-2xl shadow-brand-orange/10 group">
              <Image
                src="/images/logo-reveal.gif"
                alt="PS Rentals Logo Reveal"
                fill
                unoptimized
                className="object-contain p-2 rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-xs uppercase font-mono tracking-widest text-brand-orange font-semibold">
                  Official PS Rentals Fleet
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-white/40 text-[11px] font-mono tracking-widest uppercase">Explore</span>
        <ChevronDown size={18} className="text-brand-orange" />
      </motion.div>
    </section>
  );
}
