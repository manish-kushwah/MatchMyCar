import { NextRequest, NextResponse } from 'next/server';
import { CarService } from '@/services/supabase/carService';
import { ApiResponse, Car, FilterState, FuelType, BodyType, TransmissionType } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extraction of pagination params
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    
    // Extraction of sorting params
    const sortBy = (searchParams.get('sortBy') || 'createdAt') as any;

    // Extraction of filtering params
    const make = searchParams.get('make') || undefined;
    const safetyRating = searchParams.get('safetyRating') ? parseInt(searchParams.get('safetyRating')!, 10) : undefined;
    
    const fuelType = searchParams.getAll('fuelType') as FuelType[];
    const bodyType = searchParams.getAll('bodyType') as BodyType[];
    const transmission = searchParams.getAll('transmission') as TransmissionType[];
    const seatingCapacity = searchParams.getAll('seatingCapacity').map(num => parseInt(num, 10));

    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;

    const priceRange: [number, number] | undefined = 
      minPrice !== undefined || maxPrice !== undefined
        ? [minPrice ?? 0, maxPrice ?? Number.MAX_SAFE_INTEGER]
        : undefined;

    const filters: FilterState = {
      make,
      fuelType: fuelType.length > 0 ? fuelType : undefined,
      bodyType: bodyType.length > 0 ? bodyType : undefined,
      transmission: transmission.length > 0 ? transmission : undefined,
      seatingCapacity: seatingCapacity.length > 0 ? seatingCapacity : undefined,
      safetyRating,
      priceRange,
    };

    const { cars, totalCount } = await CarService.getCars(
      filters,
      { page, limit },
      { sortBy }
    );
    const totalPages = Math.ceil(totalCount / limit);

    const response: ApiResponse<Car[]> = {
      success: true,
      data: cars,
      meta: {
        totalCount,
        page,
        limit,
        totalPages,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    const errResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: error.message || 'Failed to retrieve cars list',
    };
    return NextResponse.json(errResponse, { status: 500 });
  }
}
