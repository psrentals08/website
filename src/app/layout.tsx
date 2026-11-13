import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';

export const metadata: Metadata = {
  title: {
    default: 'PS Rentals – Premium Bike & Scooter Rentals',
    template: '%s | PS Rentals',
  },
  description: 'Rent premium motorcycles and scooters with PS Rentals. TVS Jupiter, TVS Ntorq 125, TVS Radeon, Royal Enfield Hunter 350, Honda SP125 available for daily rental.',
  keywords: ['bike rental', 'scooter rental', 'motorcycle rental', 'Royal Enfield rental', 'PS Rentals', 'two wheeler rental'],
  openGraph: {
    title: 'PS Rentals – Premium Bike & Scooter Rentals',
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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-brand-black text-white antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              border: '1px solid rgba(244,119,25,0.3)',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
