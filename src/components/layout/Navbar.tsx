'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Shield, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/booking', label: 'Book Now' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-brand-black/95 backdrop-blur-md border-b border-white/10 shadow-xl'
          : 'bg-brand-black/70 backdrop-blur-sm border-b border-white/5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md shadow-brand-orange/20">
              <span className="font-display font-black text-xl text-brand-orange">PS</span>
            </div>
            <div>
              <div className="font-display font-bold text-xl tracking-wider text-white leading-none">
                PS <span className="text-brand-orange">RENTALS</span>
              </div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-0.5">
                Two-Wheeler Mobility
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors relative py-1',
                    isActive
                      ? 'text-brand-orange font-semibold'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919999999999?text=Hi%20PS%20Rentals%2C%20I%20want%20to%20rent%20a%20bike!"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all"
              title="Chat on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
            <Link href="/booking" className="btn-primary text-sm py-2.5 px-6 font-semibold">
              Book a Ride
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 space-y-2 bg-brand-charcoal/95 backdrop-blur-xl px-4 rounded-b-2xl shadow-2xl">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block py-2.5 px-3 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-orange/15 text-brand-orange font-bold'
                      : 'text-white/80 hover:bg-white/5'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/booking"
                className="btn-primary w-full text-center py-3"
                onClick={() => setIsOpen(false)}
              >
                Book a Ride Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
