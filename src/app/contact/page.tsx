import { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with PS Rentals for instant bookings, fleet inquiries, and roadside support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-black pt-20">
      <div className="section-padding max-w-7xl mx-auto py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-1.5 mb-4">
          <span className="text-brand-orange text-xs font-semibold tracking-widest uppercase">
            Customer Support & Bookings
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-white mb-4">
          Get in Touch with <span className="text-gradient-orange">PS Rentals</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto font-light">
          Have questions about security deposits, long-term rentals, or need immediate assistance? We are here 24/7.
        </p>
      </div>
      <ContactClient />
    </div>
  );
}
