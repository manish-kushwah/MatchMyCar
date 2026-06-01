import { supabaseServer } from '@/lib/supabase/server';
import { Car, FilterState, FuelType, BodyType, TransmissionType, PaginationParams, SortParams } from '@/types';

export class CarService {
  /**
   * Helper to map database snake_case row to camelCase Car model
   */
  static mapDbCarToCar(row: any): Car {
    return {
      id: String(row.id),
      make: row.make ?? '',
      model: row.model ?? '',
      variant: row.variant ?? '',
      price: Number(row.price),
      // DB stores fuel_type as text matching FuelType union values
      fuelType: (row.fuel_type ?? 'Petrol') as FuelType,
      // DB stores body_type as text matching BodyType union values
      bodyType: (row.body_type ?? 'Sedan') as BodyType,
      seatingCapacity: Number(row.seating_capacity ?? 5),
      // DB stores mileage as text e.g. "15 kmpl"
      mileage: String(row.mileage ?? ''),
      // DB stores safety_rating as NUMERIC(4,1) e.g. 3.5
      safetyRating: Number(row.safety_rating ?? 0),
      engine: row.engine ?? '',
      transmission: (row.transmission ?? 'Manual') as TransmissionType,
      // DB stores boot_space as text e.g. "350 L"
      bootSpace: String(row.boot_space ?? ''),
      // DB stores power as text e.g. "120 bhp"
      power: row.power ?? '',
      airbags: Number(row.airbags ?? 0),
      abs: row.abs !== undefined ? Boolean(row.abs) : true,
      esc: row.esc !== undefined ? Boolean(row.esc) : true,
      // images is a text[] array; use first element as the card image
      image: Array.isArray(row.images) ? (row.images[0] ?? '') : String(row.images ?? ''),
      pros: Array.isArray(row.pros) ? row.pros : [],
      // reviews is JSONB: [{username, review}, ...]
      reviews: Array.isArray(row.reviews) ? row.reviews : [],
      createdAt: row.created_at ?? new Date().toISOString(),
    };
  }

  /**
   * Fetches, filters, and paginates cars from Supabase table 'vcars'.
   * Returns empty array with totalCount=0 if the table has no matching rows.
   */
  static async getCars(
    filters: FilterState,
    pagination: PaginationParams,
    sort: SortParams
  ) {
    const { page, limit } = pagination;
    const fromIndex = (page - 1) * limit;
    const toIndex = fromIndex + limit - 1;

    let query = supabaseServer
      .from('vcars')
      .select('*', { count: 'exact' });

    // Apply Filters (snake_case column names)
    if (filters.make) {
      query = query.ilike('make', filters.make);
    }
    if (filters.fuelType && filters.fuelType.length > 0) {
      query = query.in('fuel_type', filters.fuelType);
    }
    if (filters.bodyType && filters.bodyType.length > 0) {
      query = query.in('body_type', filters.bodyType);
    }
    if (filters.priceRange) {
      query = query.gte('price', filters.priceRange[0]).lte('price', filters.priceRange[1]);
    }
    if (filters.transmission && filters.transmission.length > 0) {
      query = query.in('transmission', filters.transmission);
    }
    if (filters.safetyRating) {
      query = query.gte('safety_rating', filters.safetyRating);
    }
    if (filters.seatingCapacity && filters.seatingCapacity.length > 0) {
      query = query.in('seating_capacity', filters.seatingCapacity);
    }

    // Apply Sorting
    if (sort.sortBy === 'price_low_high') {
      query = query.order('price', { ascending: true });
    } else if (sort.sortBy === 'price_high_low') {
      query = query.order('price', { ascending: false });
    } else if (sort.sortBy === 'rating') {
      query = query.order('safety_rating', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply Pagination
    query = query.range(fromIndex, toIndex);

    const { data, error, count } = await query;
    if (error) {
      console.error('Supabase vcars query error:', error.message);
      throw new Error(error.message);
    }

    return {
      cars: (data || []).map((row) => CarService.mapDbCarToCar(row)),
      totalCount: count || 0,
    };
  }

  /**
   * Fetch a single car by its numeric ID from Supabase.
   * Returns null if not found or on error.
   */
  static async getCarById(id: string): Promise<Car | null> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      console.warn(`getCarById: invalid non-numeric id "${id}"`);
      return null;
    }

    const { data, error } = await supabaseServer
      .from('vcars')
      .select('*')
      .eq('id', numericId)
      .maybeSingle();

    if (error) {
      console.error(`Supabase error fetching car id=${id}:`, error.message);
      throw new Error(error.message);
    }

    return data ? CarService.mapDbCarToCar(data) : null;
  }

  /**
   * Fetch multiple cars by list of IDs for comparison.
   * Returns only the rows that exist; no fallback.
   */
  static async getCarsByIds(ids: string[]): Promise<Car[]> {
    if (!ids || ids.length === 0) return [];

    const numericIds = ids.map((id) => parseInt(id, 10)).filter((id) => !isNaN(id));

    if (numericIds.length === 0) {
      console.warn('getCarsByIds: no valid numeric IDs provided:', ids);
      return [];
    }

    const { data, error } = await supabaseServer
      .from('vcars')
      .select('*')
      .in('id', numericIds);

    if (error) {
      console.error('Supabase error fetching cars for comparison:', error.message);
      throw new Error(error.message);
    }

    return (data || []).map((row) => CarService.mapDbCarToCar(row));
  }
}
