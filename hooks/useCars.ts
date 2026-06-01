import { useQuery } from '@tanstack/react-query';
import { CarApi } from '@/services/api/car';

export const queryKeys = {
  all: ['cars'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters: string) => [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const,
  compare: (ids: string[]) => [...queryKeys.all, 'compare', ids] as const,
};

// Hook to fetch and cache filtered list of cars
export function useCars(queryString: string) {
  return useQuery({
    queryKey: queryKeys.list(queryString),
    queryFn: () => CarApi.getCars(queryString),
    staleTime: 10 * 1000, // Fresh for 10 seconds
  });
}

// Hook to fetch and cache single car's specifications
export function useCarDetails(id: string) {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => CarApi.getCarById(id),
    enabled: !!id,
  });
}

// Hook to fetch and cache car details for comparisons
export function useCompareCars(ids: string[]) {
  return useQuery({
    queryKey: queryKeys.compare(ids),
    queryFn: () => CarApi.compareCars(ids),
    enabled: ids.length > 0,
  });
}
