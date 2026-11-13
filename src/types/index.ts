export type VehicleCategory = 'scooter' | 'motorcycle' | 'premium';

export interface VehicleSpec {
  engine: string;
  power: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  weight?: string;
  topSpeed?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  description: string;
  pricePerDay: number;
  securityDeposit: number;
  specs: VehicleSpec;
  images: string[];
  isAvailable: boolean;
  features: string[];
  rentalConditions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  idProof?: string;
  createdAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  vehicleId: string;
  vehicle?: Vehicle;
  customerId: string;
  customer?: Customer;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  totalDays: number;
  pricePerDay: number;
  totalAmount: number;
  securityDeposit: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormData {
  customerName: string;
  customerMobile: string;
  vehicleId: string;
  pickupDate: Date;
  returnDate: Date;
  pickupTime: string;
  returnTime: string;
  notes?: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  vehicleId?: string;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface AdminStats {
  totalVehicles: number;
  availableVehicles: number;
  totalBookings: number;
  activeBookings: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
}
