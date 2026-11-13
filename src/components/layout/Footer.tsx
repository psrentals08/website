import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold font-display text-gradient-orange">PS</span>
              <span className="text-xl font-semibold text-white">Rentals</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your ride. Your freedom. Premium bike and scooter rentals for every journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/vehicles', label: 'Our Vehicles' },
                { href: '/booking', label: 'Book Now' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-orange text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 +91 XXXXXXXXXX</li>
              <li>📧 info@psrentals.in</li>
              <li>📍 Your Location Here</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PS Rentals. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
