'use client';
import { motion } from 'framer-motion';
import { VEHICLES } from '@/constants/vehicles';
import { formatPrice } from '@/lib/utils';
import { Bike, CalendarCheck, Users, TrendingUp, AlertCircle, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const mockBookings = [
  { id: 'PSR-10294', customer: 'Rahul Sharma', vehicle: 'Royal Enfield Hunter 350', pickup: '15 Nov 2024', return: '17 Nov 2024', status: 'confirmed', amount: 1600 },
  { id: 'PSR-84920', customer: 'Priya Nair', vehicle: 'TVS Ntorq 125', pickup: '16 Nov 2024', return: '18 Nov 2024', status: 'pending', amount: 800 },
  { id: 'PSR-73921', customer: 'Arjun Mehta', vehicle: 'Honda SP125', pickup: '14 Nov 2024', return: '16 Nov 2024', status: 'active', amount: 900 },
  { id: 'PSR-92813', customer: 'Sneha Reddy', vehicle: 'TVS Jupiter', pickup: '12 Nov 2024', return: '13 Nov 2024', status: 'completed', amount: 300 },
];

const stats = [
  { label: 'Active Fleet Vehicles', value: VEHICLES.length, icon: Bike, sub: `${VEHICLES.filter(v => v.isAvailable).length} Available for booking` },
  { label: 'Total Reservations', value: 42, icon: CalendarCheck, sub: '6 active currently on road' },
  { label: 'Registered Riders', value: 38, icon: Users, sub: '12 repeat customers' },
  { label: 'Monthly Revenue', value: formatPrice(48600), icon: TrendingUp, sub: '+18% growth vs last month' },
];

const statusStyles: Record<string, { label: string; badge: string; icon: any }> = {
  pending: { label: 'Pending Approval', badge: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30', icon: Clock },
  confirmed: { label: 'Confirmed', badge: 'text-blue-400 bg-blue-400/10 border-blue-400/30', icon: CheckCircle2 },
  active: { label: 'On Road (Active)', badge: 'text-green-400 bg-green-400/10 border-green-400/30', icon: CheckCircle2 },
  completed: { label: 'Returned (Done)', badge: 'text-white/50 bg-white/5 border-white/10', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', badge: 'text-red-400 bg-red-400/10 border-red-400/30', icon: AlertCircle },
};

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Operations Overview</h1>
          <p className="text-white/50 text-sm mt-1">Live tracking of your fleet, revenue, and active bookings.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/vehicles" className="btn-primary text-sm py-2.5 px-5">
            + Manage Fleet
          </Link>
        </div>
      </div>

      {/* Numerical Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-charcoal rounded-2xl p-6 border border-white/5 hover:border-brand-orange/30 transition-all shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
                <stat.icon size={22} className="text-brand-orange" />
              </div>
              <span className="text-white/20 text-xs font-mono">LIVE</span>
            </div>
            <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/60 text-sm font-medium">{stat.label}</div>
            <div className="text-white/40 text-xs mt-2 border-t border-white/5 pt-2">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Bookings Section */}
      <div className="bg-brand-charcoal rounded-2xl border border-white/5 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-white">Recent Customer Bookings</h2>
            <p className="text-white/50 text-xs mt-0.5">Real-time requests coming from the booking portal</p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-brand-orange hover:text-brand-orange-light text-xs font-semibold flex items-center gap-1 hover:underline"
          >
            <span>View All Records</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-brand-black/30">
                {['Booking Ref', 'Rider Name', 'Reserved Vehicle', 'Schedule', 'Amount', 'Status', 'Quick Actions'].map(h => (
                  <th key={h} className="text-white/40 text-xs font-semibold px-6 py-3.5 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockBookings.map((b) => {
                const status = statusStyles[b.status];
                return (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-mono text-brand-orange text-sm font-semibold">{b.id}</td>
                    <td className="px-6 py-4 text-white font-medium text-sm">{b.customer}</td>
                    <td className="px-6 py-4 text-white/80 text-sm">{b.vehicle}</td>
                    <td className="px-6 py-4 text-white/60 text-xs font-mono">
                      {b.pickup} → {b.return}
                    </td>
                    <td className="px-6 py-4 text-white font-bold text-sm">{formatPrice(b.amount)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${status.badge}`}>
                        <status.icon size={12} />
                        <span>{status.label}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {b.status === 'pending' && (
                          <button className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 px-3 py-1 rounded-full transition-all">
                            Approve
                          </button>
                        )}
                        <Link
                          href="/admin/bookings"
                          className="text-xs text-white/50 hover:text-white px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fleet Status & Quick Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-brand-charcoal rounded-2xl border border-white/5 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-white">Fleet Availability Status</h2>
            <Link href="/admin/vehicles" className="text-brand-orange text-xs font-semibold hover:underline">
              Manage Pricing & Stock
            </Link>
          </div>
          <div className="space-y-3.5">
            {VEHICLES.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-brand-black/40 border border-white/5"
              >
                <div>
                  <div className="text-white text-sm font-semibold">{vehicle.name}</div>
                  <div className="text-brand-orange text-xs font-medium">{formatPrice(vehicle.pricePerDay)}/day</div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      vehicle.isAvailable
                        ? 'text-green-400 bg-green-500/10 border-green-500/30'
                        : 'text-red-400 bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    {vehicle.isAvailable ? 'Ready for Rent' : 'Booked Out'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-brand-charcoal rounded-2xl border border-white/5 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-2">Owner Quick Controls</h2>
            <p className="text-white/50 text-xs mb-6">Shortcuts to manage daily motorcycle rental operations.</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Update Vehicle Rates', href: '/admin/vehicles', desc: 'Modify per-day charges' },
                { label: 'Filter All Bookings', href: '/admin/bookings', desc: 'Check dates & deposits' },
                { label: 'Rider Directory', href: '/admin/customers', desc: 'Contact numbers & history' },
                { label: 'Revenue Analytics', href: '/admin/analytics', desc: 'Monthly profit graphs' },
              ].map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="p-4 rounded-xl bg-brand-black/50 border border-white/5 hover:border-brand-orange/40 hover:bg-brand-orange/5 transition-all group"
                >
                  <div className="text-white font-semibold text-sm group-hover:text-brand-orange transition-colors">
                    {c.label}
                  </div>
                  <div className="text-white/40 text-xs mt-1">{c.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-between">
            <div>
              <div className="text-white font-semibold text-xs">Customer WhatsApp Inquiries Active</div>
              <div className="text-brand-orange text-xs mt-0.5">Click to open business chat directly</div>
            </div>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-brand-orange text-white font-semibold px-3 py-1.5 rounded-full shadow"
            >
              Open WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
