'use client';
import { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in your name, phone number, and message.');
      return;
    }
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setSubmitted(true);
      toast.success('Your message has been sent. We will contact you shortly!');
    } catch {
      toast.error('Could not send message. Please WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Direct Helpline',
      value: '+91 99999 99999',
      sub: 'Call anytime between 7 AM to 11 PM',
      href: 'tel:+919999999999',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp Support',
      value: '+91 99999 99999',
      sub: 'Instant answers & booking confirmations',
      href: 'https://wa.me/919999999999?text=Hi%20PS%20Rentals%2C%20I%20have%20an%20inquiry',
    },
    {
      icon: MapPin,
      label: 'Main Hub Location',
      value: 'PS Rentals Hub, Central Main Road',
      sub: 'Opposite Metro Station / City Center',
      href: '#map',
    },
    {
      icon: Clock,
      label: 'Operating Hours',
      value: 'Everyday: 7:00 AM – 10:30 PM',
      sub: '365 Days a Year (Pickup & Drop)',
      href: null,
    },
  ];

  return (
    <div className="section-padding max-w-7xl mx-auto pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info & Details */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="bg-brand-charcoal rounded-2xl p-6 border border-white/5 hover:border-brand-orange/30 transition-all flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mb-4">
                  <info.icon size={22} className="text-brand-orange" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wider font-semibold mb-1">
                    {info.label}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-white hover:text-brand-orange transition-colors font-semibold text-base block"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <div className="text-white font-semibold text-base">{info.value}</div>
                  )}
                  <div className="text-white/50 text-xs mt-1.5">{info.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map Card */}
          <div id="map" className="rounded-3xl overflow-hidden border border-white/10 bg-brand-charcoal p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} className="text-brand-orange" />
              <h3 className="font-display text-xl font-bold text-white">Find Us On Google Maps</h3>
            </div>
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-brand-black flex items-center justify-center border border-white/5 relative">
              <iframe
                title="PS Rentals Hub Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562095908259!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzUwLjAiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter invert contrast-125 opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-brand-charcoal rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={36} className="text-green-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">Message Delivered!</h3>
              <p className="text-white/60 text-sm max-w-sm mx-auto mb-6">
                Thank you for contacting PS Rentals. Our duty manager will call or message you back within 15 minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline text-sm py-2 px-6"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-1">Direct Inquiry</h3>
                <p className="text-white/50 text-sm">Fill in your requirements and we'll reply right away.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Your Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                    placeholder="10-digit number"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                    placeholder="name@email.com"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 block">
                    Vehicle Interested In
                  </label>
                  <input
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                    placeholder="e.g. Hunter 350, Ntorq"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2 block">
                  Your Message or Rental Dates *
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20 resize-none"
                  placeholder="Tell us what dates you need the bike or any special request..."
                  required
                />
              </div>

              <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full py-4 text-base font-semibold">
                <Send size={16} />
                <span>Submit Inquiry</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
