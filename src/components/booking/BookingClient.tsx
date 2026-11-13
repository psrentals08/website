'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { VEHICLES } from '@/constants/vehicles';
import { formatPrice, calculateRentalDays, calculateTotalAmount } from '@/lib/utils';
import { toast } from 'sonner';
import {
  CalendarDays,
  User,
  Phone,
  Car,
  Clock,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

interface ExistingReservation {
  id: string;
  vehicleId: string;
  customerName: string;
  pickupDate: string;
  returnDate: string;
}

// Seed initial active bookings to demonstrate double booking prevention
const SEED_RESERVATIONS: ExistingReservation[] = [
  {
    id: 'PSR-10294',
    vehicleId: 'royal-enfield-hunter-350',
    customerName: 'Rahul Sharma',
    pickupDate: '2026-11-15',
    returnDate: '2026-11-17',
  },
  {
    id: 'PSR-84920',
    vehicleId: 'tvs-ntorq-125',
    customerName: 'Priya Nair',
    pickupDate: '2026-11-16',
    returnDate: '2026-11-18',
  },
  {
    id: 'PSR-73921',
    vehicleId: 'honda-sp125',
    customerName: 'Arjun Mehta',
    pickupDate: '2026-11-14',
    returnDate: '2026-11-16',
  },
];

const bookingSchema = z
  .object({
    customerName: z.string().min(2, 'Name must be at least 2 characters'),
    customerMobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
    vehicleId: z.string().min(1, 'Please select a vehicle'),
    pickupDate: z.string().min(1, 'Pickup date is required'),
    returnDate: z.string().min(1, 'Return date is required'),
    pickupTime: z.string().min(1, 'Pickup time is required'),
    returnTime: z.string().min(1, 'Return time is required'),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.pickupDate && data.returnDate) {
        return new Date(data.returnDate) >= new Date(data.pickupDate);
      }
      return true;
    },
    { message: 'Return date must be equal or after pickup date', path: ['returnDate'] }
  );

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingClient() {
  const searchParams = useSearchParams();
  const preselectedVehicle = searchParams.get('vehicle') || (VEHICLES[0]?.id ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [confirmedData, setConfirmedData] = useState<BookingFormValues | null>(null);
  const [allReservations, setAllReservations] = useState<ExistingReservation[]>(SEED_RESERVATIONS);

  // Load persisted reservations from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ps_rentals_reservations');
      if (stored) {
        setAllReservations(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      vehicleId: preselectedVehicle,
      pickupDate: today,
      pickupTime: '10:00',
      returnTime: '10:00',
    },
  });

  const watchedVehicleId = watch('vehicleId');
  const watchedPickupDate = watch('pickupDate');
  const watchedReturnDate = watch('returnDate');

  const selectedVehicle = VEHICLES.find((v) => v.id === watchedVehicleId);
  const rentalDays =
    watchedPickupDate && watchedReturnDate
      ? calculateRentalDays(new Date(watchedPickupDate), new Date(watchedReturnDate))
      : 1;
  const totalAmount =
    selectedVehicle && rentalDays > 0
      ? calculateTotalAmount(selectedVehicle.pricePerDay, rentalDays)
      : 0;

  // Collision Detection for Double-Booking Prevention
  const overlappingBooking = allReservations.find((res) => {
    if (res.vehicleId !== watchedVehicleId) return false;
    if (!watchedPickupDate || !watchedReturnDate) return false;

    const newStart = new Date(watchedPickupDate).getTime();
    const newEnd = new Date(watchedReturnDate).getTime();
    const existingStart = new Date(res.pickupDate).getTime();
    const existingEnd = new Date(res.returnDate).getTime();

    // Overlapping condition: newStart <= existingEnd && newEnd >= existingStart
    return newStart <= existingEnd && newEnd >= existingStart;
  });

  const onSubmit = async (data: BookingFormValues) => {
    if (overlappingBooking) {
      toast.error('This vehicle is already reserved for these dates. Please choose another slot.');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const ref = `PSR-${Math.floor(100000 + Math.random() * 900000)}`;

      const newReservation: ExistingReservation = {
        id: ref,
        vehicleId: data.vehicleId,
        customerName: data.customerName,
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
      };

      const updated = [...allReservations, newReservation];
      setAllReservations(updated);
      try {
        localStorage.setItem('ps_rentals_reservations', JSON.stringify(updated));
      } catch {}

      setBookingRef(ref);
      setConfirmedData(data);
      setIsConfirmed(true);
      toast.success('Rental booking request submitted successfully!');
    } catch {
      toast.error('Failed to submit booking. Please reach us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed && confirmedData && selectedVehicle) {
    const waText = encodeURIComponent(
      `Hi PS Rentals, I have reserved a vehicle!\n*Booking Ref:* ${bookingRef}\n*Name:* ${confirmedData.customerName}\n*Vehicle:* ${selectedVehicle.name}\n*Dates:* ${confirmedData.pickupDate} to ${confirmedData.returnDate}\n*Duration:* ${rentalDays} day(s)\n*Total:* ${formatPrice(totalAmount)}\n*Deposit:* ${formatPrice(selectedVehicle.securityDeposit)}`
    );

    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-brand-charcoal border border-brand-orange/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[90px] rounded-full pointer-events-none" />

          <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-400 w-8 h-8" />
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-white mb-2">Booking Reserved!</h2>
            <p className="text-white/60 text-sm">
              Your reservation reference number is{' '}
              <span className="text-brand-orange font-mono font-bold tracking-wider">{bookingRef}</span>
            </p>
          </div>

          <div className="bg-brand-black/60 border border-white/5 rounded-2xl p-6 mb-8 space-y-3.5">
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
              <span className="text-white/50">Vehicle</span>
              <span className="text-white font-semibold">{selectedVehicle.name}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
              <span className="text-white/50">Customer Name</span>
              <span className="text-white font-medium">{confirmedData.customerName}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
              <span className="text-white/50">Mobile</span>
              <span className="text-white font-medium">{confirmedData.customerMobile}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
              <span className="text-white/50">Duration</span>
              <span className="text-white font-medium">
                {rentalDays} Day(s) ({confirmedData.pickupDate} → {confirmedData.returnDate})
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
              <span className="text-white/50">Refundable Deposit</span>
              <span className="text-white font-medium">{formatPrice(selectedVehicle.securityDeposit)}</span>
            </div>
            <div className="flex justify-between items-center text-base pt-1">
              <span className="text-white font-semibold">Total Rent</span>
              <span className="text-brand-orange font-bold text-xl">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`https://wa.me/919999999999?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center py-4 flex items-center justify-center gap-2 text-base font-semibold"
            >
              Confirm on WhatsApp Immediately <ArrowRight size={18} />
            </a>
            <button
              onClick={() => setIsConfirmed(false)}
              className="w-full text-center py-3 text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
            >
              Book Another Vehicle
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Details */}
            <div className="bg-brand-charcoal rounded-2xl p-6 border border-white/10">
              <h3 className="font-display font-semibold text-white text-lg mb-5 flex items-center gap-2">
                <User size={18} className="text-brand-orange" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-2 block">
                    Full Name *
                  </label>
                  <input
                    {...register('customerName')}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                    placeholder="e.g. Rahul Sharma"
                  />
                  {errors.customerName && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.customerName.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-2 block">
                    Mobile Number *
                  </label>
                  <input
                    {...register('customerMobile')}
                    type="tel"
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20"
                    placeholder="10-digit number"
                  />
                  {errors.customerMobile && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.customerMobile.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle Selection */}
            <div className="bg-brand-charcoal rounded-2xl p-6 border border-white/10">
              <h3 className="font-display font-semibold text-white text-lg mb-5 flex items-center gap-2">
                <Car size={18} className="text-brand-orange" /> Select Vehicle
              </h3>
              <div className="space-y-3">
                {VEHICLES.map((vehicle) => {
                  const isSelected = watchedVehicleId === vehicle.id;
                  const hasConflict = allReservations.some(
                    (res) =>
                      res.vehicleId === vehicle.id &&
                      watchedPickupDate &&
                      watchedReturnDate &&
                      new Date(watchedPickupDate).getTime() <= new Date(res.returnDate).getTime() &&
                      new Date(watchedReturnDate).getTime() >= new Date(res.pickupDate).getTime()
                  );

                  return (
                    <label
                      key={vehicle.id}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-brand-orange bg-brand-orange/10 shadow-lg shadow-brand-orange/5'
                          : 'border-white/10 hover:border-white/20 bg-brand-black/40'
                      } ${!vehicle.isAvailable ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3.5">
                        <input
                          type="radio"
                          value={vehicle.id}
                          disabled={!vehicle.isAvailable}
                          {...register('vehicleId')}
                          className="accent-brand-orange w-4 h-4 cursor-pointer"
                        />
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-charcoal flex-shrink-0">
                          {vehicle.images?.[0] ? (
                            <Image
                              src={vehicle.images[0]}
                              alt={vehicle.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-brand-orange">
                              <Car size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-white text-sm font-semibold flex items-center gap-2">
                            <span>{vehicle.name}</span>
                            {hasConflict && (
                              <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full font-mono">
                                Dates Conflicted
                              </span>
                            )}
                          </div>
                          <div className="text-white/50 text-xs">
                            {vehicle.specs.engine} • {vehicle.specs.mileage}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-brand-orange font-bold text-base">
                          {formatPrice(vehicle.pricePerDay)}
                        </div>
                        <div className="text-white/40 text-[11px]">per day</div>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.vehicleId && (
                <p className="text-red-400 text-xs mt-2">{errors.vehicleId.message}</p>
              )}
            </div>

            {/* Rental Schedule & Double-Booking Guard */}
            <div className="bg-brand-charcoal rounded-2xl p-6 border border-white/10">
              <h3 className="font-display font-semibold text-white text-lg mb-5 flex items-center gap-2">
                <CalendarDays size={18} className="text-brand-orange" /> Rental Schedule
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-2 block">
                    Pickup Date *
                  </label>
                  <input
                    type="date"
                    min={today}
                    {...register('pickupDate')}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                  {errors.pickupDate && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.pickupDate.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-2 block">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    {...register('pickupTime')}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-2 block">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    min={watchedPickupDate || today}
                    {...register('returnDate')}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                  {errors.returnDate && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.returnDate.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-2 block">
                    Return Time
                  </label>
                  <input
                    type="time"
                    {...register('returnTime')}
                    className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Real-time Double Booking / Overlapping Alert */}
              {overlappingBooking && (
                <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <AlertTriangle size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="text-amber-300 font-semibold mb-0.5">
                      Double-Booking Prevention Triggered
                    </div>
                    <div className="text-white/70 leading-relaxed">
                      This vehicle already has a confirmed reservation from{' '}
                      <span className="font-mono text-white font-bold">{overlappingBooking.pickupDate}</span>{' '}
                      to{' '}
                      <span className="font-mono text-white font-bold">{overlappingBooking.returnDate}</span>.
                      Please select another date range or choose a different vehicle.
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-2 block">
                  Additional Notes (Optional)
                </label>
                <textarea
                  {...register('notes')}
                  rows={2}
                  className="w-full bg-brand-black border border-white/10 focus:border-brand-orange rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-white/20 resize-none"
                  placeholder="Need helmets, child seat, specific pickup spot?"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!!overlappingBooking || isSubmitting}
              isLoading={isSubmitting}
              className="w-full py-4 text-base font-semibold"
            >
              {overlappingBooking
                ? 'Selected Dates Unavailable'
                : isSubmitting
                ? 'Confirming Availability...'
                : 'Book Your Ride Now'}
            </Button>
          </form>
        </div>

        {/* Pricing Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-brand-charcoal rounded-2xl p-6 border border-white/10 sticky top-24 shadow-xl">
            <h3 className="font-display font-semibold text-white text-lg mb-5">Booking Breakdown</h3>
            {selectedVehicle ? (
              <div className="space-y-4">
                <div className="bg-brand-black/60 rounded-xl p-4 border border-white/5 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-charcoal flex-shrink-0">
                    {selectedVehicle.images?.[0] ? (
                      <Image
                        src={selectedVehicle.images[0]}
                        alt={selectedVehicle.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Car size={20} className="text-brand-orange" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{selectedVehicle.name}</div>
                    <div className="text-brand-orange text-xs font-medium">
                      {formatPrice(selectedVehicle.pricePerDay)} / day
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Daily Rate</span>
                    <span className="text-white">{formatPrice(selectedVehicle.pricePerDay)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Rental Duration</span>
                    <span className="text-white font-medium">
                      {rentalDays} Day{rentalDays !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Refundable Deposit</span>
                    <span className="text-white font-medium">
                      {formatPrice(selectedVehicle.securityDeposit)}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                    <span className="text-white font-semibold">Total Rent</span>
                    <span className="text-brand-orange font-bold text-2xl font-display">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>

                <div className="bg-brand-orange/5 border border-brand-orange/20 rounded-xl p-4 space-y-2 text-xs text-white/60">
                  <div className="flex items-center gap-2 text-white/80">
                    <ShieldCheck size={14} className="text-brand-orange flex-shrink-0" />
                    <span>Zero Cancellation fee up to 2 hours prior</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <CheckCircle size={14} className="text-brand-orange flex-shrink-0" />
                    <span>Instant confirmation via WhatsApp & Call</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-white/40 text-sm text-center py-8">
                Please select a vehicle to calculate price.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
