export interface Review {
  username: string;
  review: string;
}

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'Coupe' | 'MPV' | 'Convertible' | 'MUV' | 'XUV' | 'Sports' | 'Luxury';
export type TransmissionType = 'Manual' | 'Automatic' | 'AMT' | 'DCT' | 'CVT';

export interface Car {
  id: string;
  make: string;
  model: string;
  variant: string;
  price: number;
  fuelType: FuelType;
  bodyType: BodyType;
  seatingCapacity: number;
  mileage: string;   // e.g. "15 kmpl" (stored as text in DB)
  safetyRating: number;
  engine: string;
  transmission: TransmissionType;
  bootSpace: string; // e.g. "350 L" (stored as text in DB)
  power: string;
  airbags: number;
  abs: boolean;
  esc: boolean;
  image: string;
  pros: string[];
  reviews: Review[];
  createdAt: string;
}

export interface FilterState {
  make?: string;
  fuelType?: FuelType[];
  bodyType?: BodyType[];
  priceRange?: [number, number];
  transmission?: TransmissionType[];
  seatingCapacity?: number[];
  safetyRating?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  sortBy: keyof Car | 'price_low_high' | 'price_high_low' | 'rating' | 'createdAt';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  meta?: {
    totalCount: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
