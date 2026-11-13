import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VEHICLES } from '@/constants/vehicles';
import VehicleDetailClient from '@/components/vehicles/VehicleDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return VEHICLES.map((vehicle) => ({ id: vehicle.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = VEHICLES.find((v) => v.id === id);
  if (!vehicle) return { title: 'Vehicle Not Found' };
  return {
    title: vehicle.name,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = VEHICLES.find((v) => v.id === id);
  if (!vehicle) notFound();
  return <VehicleDetailClient vehicle={vehicle} />;
}
