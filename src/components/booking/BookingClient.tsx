'use client';
import { useSearchParams } from 'next/navigation';
import { RideForm } from '@/components/home/RentalHome';
export default function BookingClient() { const params = useSearchParams(); return <div className="standalone-booking"><RideForm initialVehicle={params.get('vehicle') || ''}/></div>; }
