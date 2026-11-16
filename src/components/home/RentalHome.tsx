'use client';
import { sitePath } from '@/lib/paths';

import { useState } from 'react';
import { ArrowUpRight, MessageCircle, MapPin, ShieldCheck, Check, ArrowRight, Phone } from 'lucide-react';
import { RENTAL_ADDRESS, DIRECTIONS_URL } from '@/constants/contact';
import { whatsappUrl, indiaToday } from '@/lib/booking';

const bikes = [
  { id: 'tvs-jupiter', name: 'TVS Jupiter', type: 'Scooters', image: 'bike-1.jpg', note: 'Easy days. Effortless rides.', tag: 'CITY FAVOURITE', spec: 'Automatic · City comfort', price: '₹500', detail: '/day' },
  { id: 'royal-enfield-hunter-350', name: 'Hunter 350', type: 'Motorcycles', image: 'bike-4.jpg', note: 'A little more adventure.', tag: 'ROYAL ENFIELD', spec: 'Manual · 350cc', price: '₹1,500', detail: '/day' },
  { id: 'tvs-ntorq-125', name: 'TVS Ntorq', type: 'Scooters', image: 'bike-2.jpg', note: 'Make the everyday exciting.', tag: 'SPORTY SCOOTER', spec: 'Automatic · 125cc', price: '₹500', detail: '/day' },
  { id: 'tvs-radeon', name: 'TVS Radeon', type: 'Motorcycles', image: 'bike-3.jpg', note: 'Your everyday companion.', tag: 'DAILY COMMUTER', spec: 'Manual · City rides', price: '₹500', detail: '/day' },
];
export function RideForm({ initialVehicle = '' }: { initialVehicle?: string }) {
  const [error, setError] = useState('');
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const pickup = String(data.get('pickup'));
    const drop = String(data.get('return'));
    const today = indiaToday();
    if (pickup < today || drop < pickup) { setError('Choose a pickup date from today and a return date on or after pickup.'); return; }
    setError('');
    const vehicle = bikes.find(b => b.id === data.get('vehicle'));
    const message = `Hi PS Rentals! I would like to enquire about a booking.\n\nName: ${String(data.get('name')).trim()}\nBike: ${vehicle?.name || 'Please help me choose'}\nPickup date: ${pickup}\nReturn date: ${drop}\nPickup location: ${RENTAL_ADDRESS}\n\nPlease confirm availability, rental price, deposit and pickup time.`;
    window.location.assign(whatsappUrl(message));
  }
  return <form className="ride-form" onSubmit={submit}>
    <div className="form-grid"><label>Your name<input name="name" placeholder="Enter your name" required minLength={2} maxLength={80} pattern=".*\S.*" autoComplete="name" /></label><label>Choose your ride<select name="vehicle" defaultValue={initialVehicle}><option value="">Help me choose</option>{bikes.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></label><label>Pickup date<input type="date" name="pickup" min={indiaToday()} required /></label><label>Return date<input type="date" name="return" min={indiaToday()} required /></label></div>
    {error && <p role="alert" className="form-error">{error}</p>}
    <button className="ps-button dark" type="submit"><MessageCircle size={18} /> Continue on WhatsApp <ArrowUpRight size={18}/></button><p className="form-help">Opens your WhatsApp with a ready-to-send message. Tap Send to enquire. Your ride is confirmed only after our team replies.</p>
  </form>;
}
export default function RentalHome() {
 const [filter, setFilter] = useState('All rides');
 return <div className="ps-home">
  <section className="ps-hero" id="home"><div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> YOUR CITY. YOUR PACE.</div><h1>Good rides.<br/>Great memories.<br/><em>Just rent & go.</em></h1><p>From everyday commutes to unplanned adventures.<br className="desktop-break"/> Find your kind of freedom with PS Rentals, Hyderabad.</p><div className="hero-actions"><a className="ps-button orange" href="#fleet">Find your ride <ArrowUpRight size={19}/></a><a className="text-link" href={whatsappUrl()}><MessageCircle size={19}/> Let’s chat</a></div><a className="hero-location" href={DIRECTIONS_URL} target="_blank" rel="noreferrer"><MapPin size={17}/><span>Yousufguda, Hyderabad <small>8-3-225/A/90, Yadagiri Nagar · Get directions ↗</small></span></a></div><div className="hero-art"><div className="hero-circle"/><span className="hero-word">RIDE.</span><div className="ride-stamp">A little freedom<br/><strong>on two wheels.</strong><ArrowUpRight size={28}/></div><img src={sitePath("/images/bikes/bike-4.jpg")} alt="Red Royal Enfield Hunter 350 available at PS Rentals" fetchPriority="high" width="925" height="844"/><div className="hero-caption"><span>THE ROYAL ENFIELD</span><strong>Hunter 350</strong><a href={sitePath("/booking/?vehicle=royal-enfield-hunter-350")} aria-label="Enquire about the Hunter 350"><ArrowUpRight/></a></div></div></section>
  <div className="trust-strip"><span><ShieldCheck/> Well-maintained rides</span><span><Check/> Helmet included</span><span><MessageCircle/> Easy WhatsApp booking</span><span><MapPin/> Metro-side pickup</span></div>
  <section className="ps-section fleet-section" id="fleet"><div className="section-top"><div><div className="eyebrow">MEET YOUR NEXT RIDE</div><h2>A ride for every kind of day.</h2></div><p>City errands or a change of scenery.<br/>Pick a ride. We’ll take care of the rest.</p></div><div className="filter-row" aria-label="Filter bikes">{['All rides', 'Scooters', 'Motorcycles'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)} className={filter===f?'selected':''}>{f}{f==='All rides' && <span>04</span>}</button>)}</div><div className="bike-grid">{bikes.filter(b=>filter==='All rides'||b.type===filter).map(b=><article className="bike-card" key={b.id}><div className="bike-picture"><span>{b.tag}</span><img src={sitePath('/images/bikes/'+b.image)} alt={b.name} loading="lazy" width="600" height="500"/></div><div className="bike-info"><div className="bike-title"><h3>{b.name}</h3><ArrowUpRight size={20}/></div><p>{b.note}</p><div className="bike-spec">{b.spec}</div><div className="bike-bottom"><div><strong>{b.price}</strong><small>{b.detail}</small></div><a href={sitePath('/booking/?vehicle='+b.id)} aria-label={'Book '+b.name}>Book ride <ArrowRight size={15}/></a></div></div></article>)}</div><p className="fleet-note">All scooters and commuter bikes: ₹500/day. Royal Enfield Hunter 350: ₹1,500/day. Fuel extra. Models and colours subject to availability.</p></section>
  <section className="story-section" id="how-it-works"><div className="story-video"><video controls playsInline preload="none" poster={sitePath("/images/banner.jpg")} aria-label="PS Rentals introduction video"><source src={sitePath("/videos/hero.mp4")} type="video/mp4"/></video><span>YOUR NEXT CHAPTER STARTS HERE.</span></div><div className="story-copy"><div className="eyebrow">LESS PLANNING. MORE RIDING.</div><h2>Three steps.<br/>One open road.</h2>{[['Choose your wheels','Find the scooter or motorcycle that fits your plans.'],['Drop us a WhatsApp','Share your dates. We’ll confirm the price and availability.'],['Pick up. Head out.','Bring your original ID and valid driving licence to our Yousufguda pickup point.']].map(([title,desc],i)=><div className="step" key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div></section>
  <section className="booking-section ps-section" id="book"><div><div className="eyebrow">LET’S GET YOU MOVING</div><h2>Your plans.<br/>Your perfect ride.</h2><p>A day, a week, or a little longer.<br/>Tell us what you have in mind.</p><a className="text-link" href="tel:+919985819038"><Phone size={18}/> Prefer a call? 99858 19038</a></div><RideForm/></section>
  <section className="faq-section ps-section" id="faq"><div><div className="eyebrow">BEFORE YOU HIT THE ROAD</div><h2>A few good answers.</h2><p>Still have a question? <a href={whatsappUrl('Hi PS Rentals! I have a question about renting a bike.')}>Ask us on WhatsApp ↗</a></p></div><div className="faq-list">{[['What do I need to rent a bike?','Bring your original government ID and a valid driving licence. Our team will explain the deposit and rental terms before confirming your booking.'],['Is a helmet included?','Yes, a helmet is included with your rental. Always wear it while riding.'],['Is fuel included in the price?','Fuel is not included in the rental price. Confirm the fuel and return requirements with our team at pickup.'],['Can I take a bike out of Hyderabad?','Outstation rides are available only on Royal Enfield bikes, with 20% extra charges. Please discuss your route with us before booking.'],['When can I pick up my ride?','We are open every day from 8:00 AM to 9:00 PM. Flexible timings may be available on request.'],['Is my booking confirmed after I send a message?','Your message is a booking enquiry. Our team will confirm availability, final price, deposit and pickup details on WhatsApp.']].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
  <section className="contact-banner" id="contact"><div><MapPin size={25}/><span>FIND US IN YOUsUFGUDA</span><h2>Next stop: your next ride.</h2><p>{RENTAL_ADDRESS}</p></div><div><a className="ps-button dark" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={18}/></a><p>Every day · 8:00 AM – 9:00 PM</p></div></section>
 </div>;
}
