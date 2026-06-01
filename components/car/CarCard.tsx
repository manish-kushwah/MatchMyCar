'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCompare, removeFromCompare } from '@/store/slices/compareSlice';
import { Car } from '@/types';
import { FiCheck, FiPlus, FiStar } from 'react-icons/fi';
import { Button } from '../common/Button';

export interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const dispatch = useDispatch();
  const comparedCars = useSelector((state: RootState) => state.compare.comparedCars);
  const themeMode = useSelector((state: RootState) => state.theme?.mode || 'standard');
  
  const isCompared = comparedCars.some((c) => c.id === car.id);
  const isSporty = themeMode === 'sporty';

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to details page when clicking compare
    if (isCompared) {
      dispatch(removeFromCompare(car.id));
    } else {
      dispatch(addToCompare(car));
    }
  };

  return (
    <div
      className={`group relative flex flex-col overflow-hidden transition-all duration-300 ${
        isSporty
          ? 'rounded-DEFAULT border border-[#2C2C2E] bg-[#1D1D1F] text-[#e2e2e2] hover:border-[#ff535b] hover:shadow-[0_0_15px_rgba(255,83,91,0.15)]'
          : 'rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md'
      }`}
    >
      {/* Image Gallery Mock / Image Frame */}
      <div className="relative aspect-video w-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={car.image || '/placeholder-car.jpg'}
          alt={`${car.make} ${car.model}`}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-2 py-1 rounded text-white text-xs font-semibold backdrop-blur-sm">
          <FiStar className="fill-yellow-400 text-yellow-400" />
          <span>{car.safetyRating} / 5</span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{car.make}</span>
        <h4 className={`text-lg font-bold mt-1 ${isSporty ? 'text-white' : 'text-slate-800'}`}>
          {car.model} <span className="text-sm font-medium text-slate-500">{car.variant}</span>
        </h4>

        {/* Technical Snippets */}
        <div
          className={`grid grid-cols-2 gap-y-2 gap-x-4 my-4 py-3 text-xs border-t border-b ${
            isSporty ? 'border-[#2C2C2E] text-slate-300' : 'border-slate-100 text-slate-600'
          }`}
        >
          <div>
            <span className="text-slate-400 block">Transmission</span>
            <span className={`font-semibold ${isSporty ? 'text-white' : 'text-slate-700'}`}>{car.transmission}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Fuel Type</span>
            <span className={`font-semibold ${isSporty ? 'text-white' : 'text-slate-700'}`}>{car.fuelType}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Mileage</span>
            <span className={`font-semibold ${isSporty ? 'text-white' : 'text-slate-700'}`}>{car.mileage}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Engine</span>
            <span className={`font-semibold truncate block ${isSporty ? 'text-white' : 'text-slate-700'}`}>{car.engine}</span>
          </div>
        </div>

        {/* Pricing and Call to action */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <span className="text-slate-400 text-xxs block uppercase font-semibold">Ex-Showroom Price</span>
            <span className={`text-xl font-black ${isSporty ? 'text-[#ff535b]' : 'text-slate-900'}`}>
              ₹{Number(car.price).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex gap-2">
            {isSporty ? (
              <button
                onClick={handleCompareClick}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-DEFAULT text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                  isCompared
                    ? 'bg-[#ff535b]/20 border-[#ff535b] text-[#ff535b]'
                    : 'bg-transparent border-[#2C2C2E] text-white hover:border-[#ff535b] hover:text-[#ff535b]'
                }`}
              >
                {isCompared ? (
                  <>
                    <FiCheck className="text-[#ff535b] font-bold" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <FiPlus />
                    <span>Compare</span>
                  </>
                )}
              </button>
            ) : (
              <Button
                variant={isCompared ? 'secondary' : 'outline'}
                size="sm"
                onClick={handleCompareClick}
                className="flex items-center gap-1.5"
              >
                {isCompared ? (
                  <>
                    <FiCheck className="text-green-600 font-bold" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <FiPlus />
                    <span>Compare</span>
                  </>
                )}
              </Button>
            )}

            <Link href={`/cars/${car.id}`}>
              {isSporty ? (
                <button className="px-4 py-1.5 bg-[#ff535b] hover:brightness-110 text-white text-xs font-semibold rounded-DEFAULT uppercase tracking-wider transition-all border-none cursor-pointer">
                  Details
                </button>
              ) : (
                <Button variant="primary" size="sm">
                  Details
                </Button>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
