import { apiClient } from './client';
import { ApiResponse, Car, Review } from '@/types';

export const CarApi = {
  /**
   * Fetch cars matching filter query parameters
   */
  getCars: async (queryString: string): Promise<ApiResponse<Car[]>> => {
    const query = queryString ? `?${queryString}` : '';
    const { data } = await apiClient.get<ApiResponse<Car[]>>(`/cars${query}`);
    return data;
  },

  /**
   * Fetch details for a specific car ID
   */
  getCarById: async (id: string): Promise<ApiResponse<Car>> => {
    const { data } = await apiClient.get<ApiResponse<Car>>(`/cars/${id}`);
    return data;
  },

  /**
   * Fetch multiple cars details for comparison
   */
  compareCars: async (ids: string[]): Promise<ApiResponse<Car[]>> => {
    if (ids.length === 0) return { success: true, data: [] };
    const idQuery = ids.map((id) => `ids=${id}`).join('&');
    const { data } = await apiClient.get<ApiResponse<Car[]>>(`/cars/compare?${idQuery}`);
    return data;
  },

  /**
   * Submit a new customer review for a car
   */
  submitReview: async (
    carId: string,
    author: string,
    rating: number,
    comment: string
  ): Promise<ApiResponse<Review>> => {
    const { data } = await apiClient.post<ApiResponse<Review>>(`/cars/${carId}/reviews`, {
      author,
      rating,
      comment,
    });
    return data;
  },

  /**
   * Submit a new dealer contact or test drive booking inquiry
   */
  submitInquiry: async (
    carId: string,
    inquiry: {
      name: string;
      email: string;
      phone: string;
      preferredDate?: string;
      message?: string;
    }
  ): Promise<ApiResponse<{ id: string; success: boolean }>> => {
    const { data } = await apiClient.post<ApiResponse<{ id: string; success: boolean }>>(
      `/cars/${carId}/inquiries`,
      inquiry
    );
    return data;
  },
};
