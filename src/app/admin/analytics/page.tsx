import { Metadata } from 'next';
import { formatPrice } from '@/lib/utils';
import { TrendingUp, DollarSign, CalendarCheck, Bike, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Revenue & Operations Analytics | PS Rentals',
  description: 'Financial metrics and operational analytics for PS Rentals.',
};

export default function AdminAnalyticsPage() {
  const metrics = [
    { label: 'Gross Revenue (This Month)', value: formatPrice(48600), change: '+22.4%', up: true },
    { label: 'Security Deposits in Escrow', value: formatPrice(18500), change: '6 Active', up: true },
    { label: 'Fleet Utilization Rate', value: '82%', change: '+8% vs last month', up: true },
    { label: 'Average Booking Duration', value: '2.4 Days', change: 'Consistent', up: true },
  ];

  const breakdown = [
    { vehicle: 'Royal Enfield Hunter 350', share: '38%', revenue: 18480, bookings: 12 },
    { vehicle: 'TVS Ntorq 125', share: '24%', revenue: 11664, bookings: 14 },
    { vehicle: 'Honda SP125', share: '18%', revenue: 8748, bookings: 9 },
    { vehicle: 'TVS Jupiter', share: '12%', revenue: 5832, bookings: 11 },
    { vehicle: 'TVS Radeon', share: '8%', revenue: 3888, bookings: 6 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Revenue & Operations Analytics</h1>
        <p className="text-white/50 text-sm mt-1">
          Financial performance breakdown by vehicle model, utilization, and booking frequency.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m) => (
          <div key={m.label} className="bg-brand-charcoal rounded-2xl p-6 border border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/50 text-xs font-medium">{m.label}</span>
              <span className="text-green-400 text-xs font-semibold flex items-center">
                <ArrowUpRight size={14} /> {m.change}
              </span>
            </div>
            <div className="font-display text-3xl font-bold text-white mb-1">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Revenue breakdown by Vehicle */}
      <div className="bg-brand-charcoal rounded-2xl border border-white/5 p-6 shadow-xl">
        <h2 className="font-display text-xl font-bold text-white mb-6">Revenue Contribution by Model</h2>
        <div className="space-y-5">
          {breakdown.map((item) => (
            <div key={item.vehicle} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white font-semibold">{item.vehicle}</span>
                <span className="text-brand-orange font-bold font-mono">
                  {formatPrice(item.revenue)} ({item.share})
                </span>
              </div>
              <div className="w-full bg-brand-black rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-brand-orange h-full rounded-full transition-all duration-500"
                  style={{ width: item.share }}
                />
              </div>
              <div className="text-white/40 text-xs">{item.bookings} total rentals completed</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
