'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clearCompare } from '@/store/slices/compareSlice';
import { PageContainer } from '@/components/layout/PageContainer';
import { CarComparisonTable } from '@/components/car/CarComparisonTable';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { useCompareCars } from '@/hooks/useCars';
import { FiTrash2, FiLayers } from 'react-icons/fi';
import Link from 'next/link';

export default function ComparePage() {
  const dispatch = useDispatch();
  const comparedCarsState = useSelector((state: RootState) => state.compare.comparedCars);
  const themeMode = useSelector((state: RootState) => state.theme?.mode || 'standard');
  const isSporty = themeMode === 'sporty';

  // Extract IDs for fetch
  const ids = comparedCarsState.map((c) => c.id);

  // Fetch updated information for these cars to keep it secure
  const { data: response, isLoading } = useCompareCars(ids);
  const cars = response?.data || [];

  return (
    <PageContainer>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-black flex items-center gap-2 ${isSporty ? 'text-white' : 'text-slate-800'}`}>
            <FiLayers className={isSporty ? 'text-[#ff535b]' : 'text-blue-600'} />
            <span>{isSporty ? 'SPECS COMPARISON MATRIX' : 'Compare Vehicles'}</span>
          </h2>
          <p className="text-sm text-slate-500">
            Analyze pricing, dimensions, safety rating, and engine outputs side-by-side.
          </p>
        </div>
        {comparedCarsState.length > 0 && (
          isSporty ? (
            <button
              onClick={() => dispatch(clearCompare())}
              className="flex items-center gap-1.5 px-4 py-2 border border-red-500/30 bg-[#ff535b]/10 text-[#ff535b] hover:bg-[#ff535b]/20 font-bold uppercase tracking-wider text-xs rounded-DEFAULT cursor-pointer shadow-[0_0_8px_rgba(255,83,91,0.15)]"
            >
              <FiTrash2 />
              <span>Clear Comparison</span>
            </button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearCompare())}
              className="flex items-center gap-1.5 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <FiTrash2 />
              <span>Clear Comparison</span>
            </Button>
          )
        )}
      </div>

      {comparedCarsState.length === 0 ? (
        <div
          className={`py-20 text-center border p-8 max-w-lg mx-auto ${
            isSporty
              ? 'bg-[#1D1D1F] border-[#2C2C2E] rounded-DEFAULT text-[#e2e2e2]'
              : 'bg-white border-slate-200 rounded-2xl shadow-sm text-slate-800'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isSporty ? 'bg-[#ff535b]/10 text-[#ff535b]' : 'bg-blue-50 text-blue-600'
            }`}
          >
            <FiLayers className="w-8 h-8" />
          </div>
          <h3 className={`text-lg font-bold mb-2 ${isSporty ? 'text-white' : 'text-slate-800'}`}>
            No vehicles selected
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Search for vehicles and select the "Compare" checkbox to add up to 2 cars.
          </p>
          <Link href="/cars">
            {isSporty ? (
              <button className="px-6 py-2.5 bg-[#ff535b] hover:brightness-110 text-white font-bold uppercase tracking-widest rounded-DEFAULT border-none cursor-pointer shadow-[0_0_10px_rgba(255,83,91,0.2)]">
                Browse Cars
              </button>
            ) : (
              <Button>Search Cars</Button>
            )}
          </Link>
        </div>
      ) : isLoading ? (
        <div className="py-24">
          <Loader message="Compiling specs matrices..." />
        </div>
      ) : (
        <div className="space-y-6">
          <CarComparisonTable cars={cars} />
        </div>
      )}
    </PageContainer>
  );
}
