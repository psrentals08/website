'use client';
import { useState } from 'react';
import { Search, Phone, MessageSquare } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const mockCustomers = [
  { id: 'CUST-001', name: 'Rahul Sharma', mobile: '+91 98765 43210', totalBookings: 4, totalSpent: 4800, favorite: 'Royal Enfield Hunter 350', status: 'Regular' },
  { id: 'CUST-002', name: 'Priya Nair', mobile: '+91 87654 32109', totalBookings: 2, totalSpent: 1600, favorite: 'TVS Ntorq 125', status: 'Active' },
  { id: 'CUST-003', name: 'Arjun Mehta', mobile: '+91 76543 21098', totalBookings: 1, totalSpent: 900, favorite: 'Honda SP125', status: 'New' },
  { id: 'CUST-004', name: 'Sneha Reddy', mobile: '+91 65432 10987', totalBookings: 5, totalSpent: 3500, favorite: 'TVS Jupiter', status: 'VIP Rider' },
  { id: 'CUST-005', name: 'Vikas Kumar', mobile: '+91 94821 73819', totalBookings: 2, totalSpent: 1200, favorite: 'TVS Radeon', status: 'Active' },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');
  const filtered = mockCustomers.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.mobile.includes(search) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-white">Rider CRM & Directory</h1>
        <p className="text-white/50 text-sm mt-1">
          Registered customer profiles, rental frequency, lifetime value, and direct contact buttons.
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-brand-charcoal border border-white/10 focus:border-brand-orange rounded-xl pl-10 pr-4 py-2.5 text-white text-sm outline-none transition-colors placeholder:text-white/30"
          placeholder="Search by customer name or mobile..."
        />
      </div>

      <div className="bg-brand-charcoal rounded-2xl border border-white/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-brand-black/30">
                {['Rider Profile', 'Phone', 'Total Trips', 'Lifetime Value', 'Preferred Bike', 'Status', 'Contact'].map(h => (
                  <th key={h} className="text-white/40 text-xs font-semibold px-6 py-4 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center font-bold text-brand-orange text-sm">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{c.name}</div>
                        <div className="text-white/40 text-[11px] font-mono">{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/70 text-sm font-mono">{c.mobile}</td>
                  <td className="px-6 py-4 text-white text-sm font-medium">{c.totalBookings} rentals</td>
                  <td className="px-6 py-4 text-brand-orange font-bold text-sm">{formatPrice(c.totalSpent)}</td>
                  <td className="px-6 py-4 text-white/80 text-sm">{c.favorite}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-brand-orange/10 text-brand-orange border border-brand-orange/30 px-2.5 py-0.5 rounded-full font-semibold">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${c.mobile.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-full font-medium transition-colors"
                      >
                        <MessageSquare size={13} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
