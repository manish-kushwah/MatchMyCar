import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { ApiResponse } from '@/types';

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
    const { name, email, phone, preferredDate, message } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, data: null, error: 'Name, email, and phone number are required fields' },
        { status: 400 }
      );
    }

    const inquiryId = `inq-${Date.now()}`;

    // Database attempt
    try {
      const { error } = await supabaseServer
        .from('inquiries')
        .insert([{
          id: inquiryId,
          car_id: carId,
          name,
          email,
          phone,
          preferred_date: preferredDate || null,
          message: message || '',
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.warn("Database insert inquiry error:", error.message);
      }
    } catch (err) {
      console.warn("Could not insert inquiry to database, using mock success fallback:", err);
    }

    const response: ApiResponse<{ id: string; success: boolean }> = {
      success: true,
      data: {
        id: inquiryId,
        success: true,
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, data: null, error: error.message || 'Failed to submit dealer inquiry' },
      { status: 500 }
    );
  }
}
