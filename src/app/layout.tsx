import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';

export const metadata: Metadata = {
  title: {
    default: 'PS Rentals | Bike & Scooter Rentals in Hyderabad',
    template: '%s | PS Rentals',
  },
  description:
    'Rent premium motorcycles and scooters with PS Rentals. TVS Jupiter, TVS Ntorq 125, TVS Radeon, Royal Enfield Hunter 350 available for daily rental.',
  keywords: [
    'bike rental',
    'scooter rental',
    'motorcycle rental',
    'Royal Enfield rental',
    'PS Rentals',
    'two wheeler rental',
  ],
  openGraph: {
    title: 'PS Rentals | Bike & Scooter Rentals in Hyderabad',
    description: 'Your ride. Your freedom. Rent premium motorcycles and scooters.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
