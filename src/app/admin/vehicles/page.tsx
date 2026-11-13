'use client';
import { useState } from 'react';
import Image from 'next/image';
import { VEHICLES } from '@/constants/vehicles';
import { formatPrice, getCategoryLabel } from '@/lib/utils';
import { Plus, Edit, Eye, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState(VEHICLES);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  const toggleAvailability = (id: string) => {
    setVehicles(prev =>
      prev.map(v => (v.id === id ? { ...v, isAvailable: !v.isAvailable } : v))
    );
    toast.success('Vehicle availability status updated!');
  };

  const handlePriceUpdate = (id: string) => {
    if (newPrice <= 0) {
      toast.error('Price must be greater than zero');
      return;
    }
    setVehicles(prev =>
      prev.map(v => (v.id === id ? { ...v, pricePerDay: newPrice } : v))
    );
    setEditingPriceId(null);
    toast.success('Rental tariff updated successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Fleet & Pricing Management</h1>
          <p className="text-white/50 text-sm mt-1">
            Toggle vehicle rental status, adjust daily tariffs, and inspect specifications.
          </p>
        </div>
        <Button
          onClick={() => toast.info('Vehicle creation modal will connect directly to Supabase storage.')}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          <span>Add New Vehicle</span>
        </Button>
      </div>

      <div className="bg-brand-charcoal rounded-2xl border border-white/5 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-brand-black/30">
                {['Vehicle', 'Category', 'Rental Tariff / Day', 'Security Deposit', 'Availability', 'Actions'].map(h => (
                  <th key={h} className="text-white/40 text-xs font-semibold px-6 py-4 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-brand-black flex-shrink-0 border border-white/10">
                        {v.images?.[0] ? (
                          <Image src={v.images[0]} alt={v.name} fill className="object-cover" />
                        ) : null}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{v.name}</div>
                        <div className="text-white/50 text-xs">{v.specs.engine} • {v.specs.mileage}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white/70 text-sm font-medium">{getCategoryLabel(v.category)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {editingPriceId === v.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          defaultValue={v.pricePerDay}
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                          className="w-24 bg-brand-black border border-brand-orange rounded-lg px-2 py-1 text-white text-sm outline-none"
                        />
                        <button
                          onClick={() => handlePriceUpdate(v.id)}
                          className="text-xs bg-brand-orange text-white px-2.5 py-1 rounded-md font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="text-xs text-white/50 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-brand-orange font-bold text-base font-display">
                          {formatPrice(v.pricePerDay)}
                        </span>
                        <button
                          onClick={() => {
                            setEditingPriceId(v.id);
                            setNewPrice(v.pricePerDay);
                          }}
                          className="text-white/30 hover:text-white p-1"
                          title="Edit price"
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white/70 text-sm font-mono">
                    {formatPrice(v.securityDeposit)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleAvailability(v.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                        v.isAvailable
                          ? 'text-green-400 bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                          : 'text-red-400 bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                      }`}
                    >
                      {v.isAvailable ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                      <span>{v.isAvailable ? 'Available' : 'Unavailable'}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/vehicles/${v.id}`}
                        target="_blank"
                        className="p-2 text-white/40 hover:text-brand-orange rounded-lg hover:bg-white/5 transition-colors"
                        title="View Public Page"
                      >
                        <Eye size={16} />
                      </Link>
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
