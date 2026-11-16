import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { RENTAL_ADDRESS, DIRECTIONS_URL } from '@/constants/contact';
import { whatsappUrl } from '@/lib/booking';
export default function ContactClient(){return <div className="standalone-booking ride-form"><h2>Let’s get you riding.</h2><p>{RENTAL_ADDRESS}</p><p>Open every day, 8:00 AM – 9:00 PM.</p><a className="ps-button dark" href={whatsappUrl()}><MessageCircle size={18}/> Enquire on WhatsApp</a><a className="ps-button" href="tel:+919985819038"><Phone size={18}/> +91 99858 19038</a><a className="ps-button" href="tel:+919652332081"><Phone size={18}/> +91 96523 32081</a><a className="ps-button" href={DIRECTIONS_URL}><MapPin size={18}/> Get directions</a></div>}
