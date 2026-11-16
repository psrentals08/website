import ContactClient from '@/components/contact/ContactClient';
export const metadata = { title: 'Contact Us', description: 'Contact PS Rentals in Yousufguda, Hyderabad.' };
export default function ContactPage() {
  return <section className="booking-page"><div className="booking-heading"><h1>Get in touch with PS Rentals</h1><p>Call or WhatsApp us for availability and pickup details.</p></div><ContactClient /></section>;
}
