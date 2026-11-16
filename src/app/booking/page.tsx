import { Suspense } from 'react';
import BookingClient from '@/components/booking/BookingClient';
export const metadata = { title: 'Book Your Ride', description: 'Enquire about a bike rental in Hyderabad through your WhatsApp.' };
export default function BookingPage(){return <div className="booking-page"><div className="booking-heading"><h1>Let’s book your next ride.</h1><p>Choose your dates and continue on WhatsApp.<br/>Our team will confirm availability and your rental price.</p></div><Suspense fallback={<p>Loading booking form…</p>}><BookingClient/></Suspense></div>}
