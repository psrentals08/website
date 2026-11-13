import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center">
                <span className="font-display font-black text-xl text-brand-orange">PS</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-wider text-white">
                  PS <span className="text-brand-orange">RENTALS</span>
                </span>
                <span className="block text-[10px] text-white/40 uppercase tracking-widest font-mono">
                  Premium Mobility
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Your ride. Your freedom. Discover the open road with top-tier, thoroughly serviced motorcycles and scooters.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/50 bg-white/5 p-2.5 rounded-xl border border-white/5 w-fit">
              <ShieldCheck size={16} className="text-brand-orange" />
              <span>100% Insured Fleet & Sanitized Helmets</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-base tracking-wider uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/vehicles', label: 'All Rental Vehicles' },
                { href: '/booking', label: 'Online Booking System' },
                { href: '/gallery', label: 'Media & Bike Gallery' },
                { href: '/reviews', label: 'Verified Customer Reviews' },
                { href: '/about', label: 'About PS Rentals' },
                { href: '/admin', label: 'Owner Admin Dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-orange transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brand-orange text-xs">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fleet Models */}
          <div>
            <h4 className="font-display font-bold text-white text-base tracking-wider uppercase mb-4">
              Featured Fleet
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/vehicles/royal-enfield-hunter-350', label: 'Royal Enfield Hunter 350' },
                { href: '/vehicles/tvs-ntorq-125', label: 'TVS Ntorq 125' },
                { href: '/vehicles/tvs-jupiter', label: 'TVS Jupiter 110' },
                { href: '/vehicles/honda-sp125', label: 'Honda SP125' },
                { href: '/vehicles/tvs-radeon', label: 'TVS Radeon' },
              ].map((v) => (
                <li key={v.href}>
                  <Link
                    href={v.href}
                    className="text-white/60 hover:text-brand-orange transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brand-orange text-xs">›</span>
                    <span>{v.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display font-bold text-white text-base tracking-wider uppercase mb-4">
              Contact & Hub
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href="tel:+919999999999"
                  className="flex items-center gap-2.5 text-white/70 hover:text-brand-orange transition-colors"
                >
                  <Phone size={16} className="text-brand-orange flex-shrink-0" />
                  <span>+91 99999 99999</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919999999999?text=Hi%20PS%20Rentals%2C%20I%20have%20an%20inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/70 hover:text-green-400 transition-colors"
                >
                  <MessageCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span>WhatsApp 24/7 Hotline</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/60">
                <MapPin size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                <span>PS Rentals Hub, Central Main Road, City Metro Hub</span>
              </li>
              <li>
                <a
                  href="mailto:contact@psrentals.in"
                  className="flex items-center gap-2.5 text-white/70 hover:text-brand-orange transition-colors"
                >
                  <Mail size={16} className="text-brand-orange flex-shrink-0" />
                  <span>contact@psrentals.in</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            &copy; {new Date().getFullYear()} PS Rentals. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/vehicles" className="hover:text-brand-orange transition-colors">
              Fleet Rates
            </Link>
            <span>•</span>
            <Link href="/booking" className="hover:text-brand-orange transition-colors">
              Online Booking
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-brand-orange transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
