import { Metadata } from 'next';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | PS Rentals',
  description: 'Operations, Fleet, and Booking analytics for PS Rentals.',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
