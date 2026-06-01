import { NextRequest, NextResponse } from 'next/server';
import { CarService } from '@/services/supabase/carService';
import { ApiResponse, Car } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.getAll('ids'); // expects multiple: ?ids=1&ids=2

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { success: false, data: null, error: 'At least one Car ID is required for comparison' },
        { status: 400 }
      );
    }

    if (ids.length > 2) {
      return NextResponse.json(
        { success: false, data: null, error: 'Comparison is limited to a maximum of 2 cars' },
        { status: 400 }
      );
    }

    const cars = await CarService.getCarsByIds(ids);

    const response: ApiResponse<Car[]> = {
      success: true,
      data: cars,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: null, error: error.message || 'Comparison failed' },
      { status: 500 }
    );
  }
}
