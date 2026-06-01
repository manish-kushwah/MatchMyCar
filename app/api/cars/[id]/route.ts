import { NextRequest, NextResponse } from 'next/server';
import { CarService } from '@/services/supabase/carService';
import { ApiResponse, Car } from '@/types';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Next.js 15 requires awaiting params if it's passed as a Promise.
    // We resolve it dynamically to support both Next.js 14 and 15 paradigms.
    const resolvedParams = 'then' in params ? await params : params;
    const carId = resolvedParams.id;

    if (!carId) {
      return NextResponse.json(
        { success: false, data: null, error: 'Car ID is required' },
        { status: 400 }
      );
    }

    const car = await CarService.getCarById(carId);

    if (!car) {
      return NextResponse.json(
        { success: false, data: null, error: `Car with ID ${carId} not found` },
        { status: 404 }
      );
    }

    const response: ApiResponse<Car> = {
      success: true,
      data: car,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: null, error: error.message || 'Failed to fetch details' },
      { status: 500 }
    );
  }
}
