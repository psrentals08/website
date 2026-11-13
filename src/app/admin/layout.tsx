'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Bike, CalendarCheck, Users, 
  BarChart3, LogOut, Menu, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/vehicles', label: 'Vehicles', icon: Bike },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-brand-charcoal border-r border-white/5 z-50 transition-transform duration-300 flex flex-col justify-between',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-white/5">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-brand-orange" />
              <span className="font-display text-xl font-bold tracking-wider">
                <span className="text-brand-orange">PS</span>
                <span className="text-white"> ADMIN</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                    isActive
                      ? 'bg-brand-orange/15 text-brand-orange border border-brand-orange/30 shadow-lg shadow-brand-orange/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Link */}
        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-brand-orange hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} />
            <span>Return to Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-black flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-brand-black/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/80 hover:text-white p-1 rounded-lg"
          >
            <Menu size={22} />
          </button>

          <div className="text-white/60 text-xs font-mono tracking-widest uppercase">
            PS Rentals Management Console
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs text-white/60">Owner Account</span>
            <div className="w-9 h-9 rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center font-bold text-brand-orange text-sm shadow-md">
              PS
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
