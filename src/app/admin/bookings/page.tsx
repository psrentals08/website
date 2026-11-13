'use client';
import { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { Search, CheckCircle, XCircle, Clock, MessageSquare, Phone } from 'lucide-react';
import { toast } from 'sonner';

const initialBookings = [
  { id: 'PSR-10294', customer: 'Rahul Sharma', mobile: '+91 98765 43210', vehicle: 'Royal Enfield Hunter 350', pickup: '2024-11-15', return: '2024-11-17', totalDays: 2, amount: 1600, deposit: 5000, status: 'confirmed', notes: 'Needs 2 helmets' },
  { id: 'PSR-84920', customer: 'Priya Nair', mobile: '+91 87654 32109', vehicle: 'TVS Ntorq 125', pickup: '2024-11-16', return: '2024-11-18', totalDays: 2, amount: 800, deposit: 2500, status: 'pending', notes: 'Pickup at 10 AM' },
  { id: 'PSR-73921', customer: 'Arjun Mehta', mobile: '+91 76543 21098', vehicle: 'Honda SP125', pickup: '2024-11-14', return: '2024-11-16', totalDays: 2, amount: 900, deposit: 3000, status: 'active', notes: 'Luggage carrier requested' },
  { id: 'PSR-92813', customer: 'Sneha Reddy', mobile: '+91 65432 10987', vehicle: 'TVS Jupiter', pickup: '2024-11-12', return: '2024-11-13', totalDays: 1, amount: 300, deposit: 2000, status: 'completed', notes: 'Deposit refunded' },
  { id: 'PSR-61829', customer: 'Vikas Kumar', mobile: '+91 94821 73819', vehicle: 'TVS Radeon', pickup: '2024-11-10', return: '2024-11-11', totalDays: 1, amount: 400, deposit: 2500, status: 'completed', notes: '' },
];

const statusStyles: Record<string, { label: string; badge: string; icon: any }> = {
  pending: { label: 'Pending', badge: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', icon: Clock },
  confirmed: { label: 'Confirmed', badge: 'text-blue-400 bg-blue-400/10 border-blue-400/30', icon: CheckCircle },
  active: { label: 'Active', badge: 'text-green-400 bg-green-400/10 border-green-400/30', icon: CheckCircle },
  completed: { label: 'Completed', badge: 'text-white/40 bg-white/5 border-white/10', icon: CheckCircle },
  cancelled: { label: 'Cancelled', badge: 'text-red-400 bg-red-400/10 border-red-400/30', icon: XCircle },
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      !search ||
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.mobile.includes(search);
    const matchFilter = filter === 'all' || b.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );
    toast.success(`Booking ${id} marked as ${newStatus}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Rental Reservations</h1>
        <p className="text-white/50 text-sm mt-1">
          Review, approve, activate, and mark bookings as returned.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-charcoal border border-white/10 focus:border-brand-orange rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-white/30"
            placeholder="Search by Rider name, Phone or Ref ID..."
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['all', 'pending', 'confirmed', 'active', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === status
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'bg-white/5 text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-brand-charcoal rounded-2xl border border-white/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-brand-black/30">
                {['Reference', 'Customer & Contact', 'Vehicle', 'Rental Period', 'Tariff & Deposit', 'Status', 'Status Controls'].map(h => (
                  <th key={h} className="text-white/40 text-xs font-semibold px-6 py-4 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredBookings.map((b) => {
                const status = statusStyles[b.status];
                return (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-brand-orange text-sm font-semibold">{b.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm font-bold">{b.customer}</div>
                      <div className="text-white/50 text-xs font-mono mt-0.5">{b.mobile}</div>
                      {b.notes && <div className="text-brand-orange text-[11px] mt-0.5 italic">{b.notes}</div>}
                    </td>
                    <td className="px-6 py-4 text-white/80 text-sm font-medium">{b.vehicle}</td>
                    <td className="px-6 py-4">
                      <div className="text-white/80 text-xs font-mono">{b.pickup} → {b.return}</div>
                      <div className="text-white/40 text-[11px] mt-0.5">{b.totalDays} Day(s) duration</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white font-bold text-sm">{formatPrice(b.amount)}</div>
                      <div className="text-white/40 text-xs">Dep: {formatPrice(b.deposit)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${status.badge}`}>
                        <status.icon size={12} />
                        <span>{status.label}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {b.status === 'pending' && (
                          <button
                            onClick={() => updateStatus(b.id, 'confirmed')}
                            className="text-xs bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 px-2.5 py-1 rounded-full font-semibold"
                          >
                            Approve
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button
                            onClick={() => updateStatus(b.id, 'active')}
                            className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 px-2.5 py-1 rounded-full font-semibold"
                          >
                            Start Ride
                          </button>
                        )}
                        {b.status === 'active' && (
                          <button
                            onClick={() => updateStatus(b.id, 'completed')}
                            className="text-xs bg-white/10 text-white hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-full font-semibold"
                          >
                            Mark Returned
                          </button>
                        )}
                        {['pending', 'confirmed'].includes(b.status) && (
                          <button
                            onClick={() => updateStatus(b.id, 'cancelled')}
                            className="text-xs text-red-400 hover:text-red-300 px-2 py-1"
                          >
                            Cancel
                          </button>
                        )}
                        <a
                          href={`https://wa.me/${b.mobile.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(b.customer)}%2C%20regarding%20your%20PS%20Rentals%20booking%20${b.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-white/40 hover:text-green-400 rounded-md transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare size={15} />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredBookings.length === 0 && (
            <div className="text-center py-12 text-white/40 text-sm">No reservations match your criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}
