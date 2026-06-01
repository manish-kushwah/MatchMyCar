import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, Review } from '@/types';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = 'then' in params ? await params : params;
    const carId = resolvedParams.id;

    if (!carId) {
      return NextResponse.json(
        { success: false, data: null, error: 'Car ID is required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { username, review } = body;

    if (!username || !review) {
      return NextResponse.json(
        { success: false, data: null, error: 'Username and review text are required fields' },
        { status: 400 }
      );
    }

    const newReview: Review = { username, review };

    const response: ApiResponse<Review> = {
      success: true,
      data: newReview,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: null, error: error.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}
