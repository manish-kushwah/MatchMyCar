'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PageContainer } from '@/components/layout/PageContainer';
import { FilterPanel } from '@/components/filter/FilterPanel';
import { SortDropdown } from '@/components/filter/SortDropdown';
import { CarCard } from '@/components/car/CarCard';
import { Loader } from '@/components/common/Loader';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { useCars } from '@/hooks/useCars';
import { Car } from '@/types';

export default function CarsPage() {
  // Read filters and theme state from Redux store
  const filters = useSelector((state: RootState) => state.filters);
  const themeMode = useSelector((state: RootState) => state.theme?.mode || 'standard');

  // Local state for pagination and sorting
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('createdAt');

  // State for accumulating vehicles
  const [accumulatedCars, setAccumulatedCars] = useState<Car[]>([]);

  // Build Query String dynamically based on active filters
  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    params.set('sortBy', sortBy);

    if (filters.make) {
      params.set('make', filters.make);
    }
    if (filters.fuelType && filters.fuelType.length > 0) {
      filters.fuelType.forEach((f) => params.append('fuelType', f));
    }
    if (filters.bodyType && filters.bodyType.length > 0) {
      filters.bodyType.forEach((b) => params.append('bodyType', b));
    }
    if (filters.transmission && filters.transmission.length > 0) {
      filters.transmission.forEach((t) => params.append('transmission', t));
    }
    if (filters.seatingCapacity && filters.seatingCapacity.length > 0) {
      filters.seatingCapacity.forEach((s) => params.append('seatingCapacity', s.toString()));
    }
    if (filters.safetyRating) {
      params.set('safetyRating', filters.safetyRating.toString());
    }
    if (filters.priceRange) {
      params.set('minPrice', filters.priceRange[0].toString());
      params.set('maxPrice', filters.priceRange[1].toString());
    }

    return params.toString();
  };

  const queryString = buildQueryString();

  // Fetch cars list using query hook
  const { data: response, isLoading, isError, refetch } = useCars(queryString);
  const carsList = response?.data || [];
  const meta = response?.meta;

  // Reset page and list when filters change
  useEffect(() => {
    setPage(1);
    setAccumulatedCars([]);
  }, [filters]);

  // Sync loaded cars with accumulated list
  useEffect(() => {
    if (isLoading) return;
    if (carsList.length > 0) {
      if (page === 1) {
        setAccumulatedCars(carsList);
      } else {
        setAccumulatedCars((prev) => {
          const existingIds = new Set(prev.map((c) => c.id));
          const newCars = carsList.filter((c) => !existingIds.has(c.id));
          return [...prev, ...newCars];
        });
      }
    } else if (page === 1) {
      setAccumulatedCars([]);
    }
  }, [carsList, page, isLoading]);

  const hasMore = meta ? page < meta.totalPages : false;

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setPage(1);
    setAccumulatedCars([]);
  };

  return (
    <PageContainer>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black ${themeMode === 'sporty' ? 'text-white' : 'text-slate-800'}`}>
            Browse Vehicles
          </h2>
          <p className="text-sm text-slate-500">
            {meta?.totalCount
              ? `Showing ${accumulatedCars.length} of ${meta.totalCount} matching cars`
              : 'Find the perfect fit'}
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={handleSortChange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24">
          <FilterPanel />
        </aside>

        {/* Listings Section */}
        <section className="lg:col-span-9 space-y-8">
          {isLoading && page === 1 ? (
            <div className="py-20">
              <Loader message="Fetching matching vehicles..." />
            </div>
          ) : isError ? (
            <ErrorState message="We encountered a network error while searching. Please try again." onRetry={refetch} />
          ) : accumulatedCars.length === 0 ? (
            <EmptyState
              title="No cars match your search"
              description="Try relaxing your budget, clearing select transmission checkboxes, or choosing alternative fuel configurations."
            />
          ) : (
            <>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accumulatedCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center pt-8 border-t border-slate-100 dark:border-slate-800">
                  {themeMode === 'sporty' ? (
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="px-6 py-2.5 bg-[#ff535b] hover:brightness-110 text-white font-semibold rounded-DEFAULT uppercase tracking-widest transition-all active:scale-95 border-none cursor-pointer shadow-[0_0_10px_rgba(255,83,91,0.4)] disabled:opacity-50"
                    >
                      {isLoading ? 'Loading...' : 'Load More Vehicles'}
                    </button>
                  ) : (
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoading}
                      className="px-6 py-2.5 bg-[#1F2937] hover:bg-slate-800 text-white font-semibold rounded-lg shadow-sm transition-all hover:shadow hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? 'Loading...' : 'Load More Vehicles'}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </PageContainer>
  );
}
