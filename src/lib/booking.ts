export const PHONE = '919985819038';
export function whatsappUrl(message = 'Hi PS Rentals! I would like to book a bike. Please share availability and rental rates.') {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
export function indiaToday() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
