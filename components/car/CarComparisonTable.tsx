'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Car } from '@/types';
import { FiCheck, FiX, FiStar } from 'react-icons/fi';

export interface CarComparisonTableProps {
  cars: Car[];
}

export function CarComparisonTable({ cars }: CarComparisonTableProps) {
  const themeMode = useSelector((state: RootState) => state.theme?.mode || 'standard');
  const isSporty = themeMode === 'sporty';

  if (cars.length === 0) {
    return (
      <div className={`text-center py-12 ${isSporty ? 'text-slate-400' : 'text-slate-500'}`}>
        No cars selected for comparison. Please choose cars to compare.
      </div>
    );
  }

  const comparisonRows = [
    { label: 'Make & Model', key: 'name', render: (c: Car) => `${c.make} ${c.model}` },
    { label: 'Variant', key: 'variant', render: (c: Car) => c.variant },
    { label: 'Ex-Showroom Price', key: 'price', render: (c: Car) => `₹${Number(c.price).toLocaleString('en-IN')}` },
    { label: 'Fuel Type', key: 'fuelType', render: (c: Car) => c.fuelType },
    { label: 'Transmission', key: 'transmission', render: (c: Car) => c.transmission },
    { label: 'Mileage', key: 'mileage', render: (c: Car) => c.mileage },
    { label: 'Engine Capacity', key: 'engine', render: (c: Car) => c.engine },
    { label: 'Power', key: 'power', render: (c: Car) => c.power },
    { label: 'Safety Rating', key: 'safetyRating', render: (c: Car) => (
      <div className="flex items-center gap-1 justify-center">
        <FiStar className="fill-yellow-400 text-yellow-400" />
        <span>{c.safetyRating} / 5</span>
      </div>
    )},
    { label: 'Airbags Count', key: 'airbags', render: (c: Car) => `${c.airbags} Airbags` },
    { label: 'ABS System', key: 'abs', render: (c: Car) => c.abs ? (
      <FiCheck className={`${isSporty ? 'text-[#ff535b]' : 'text-green-600'} h-5 w-5 font-black mx-auto`} />
    ) : (
      <FiX className="text-red-500 h-5 w-5 font-black mx-auto" />
    )},
    { label: 'ESC System', key: 'esc', render: (c: Car) => c.esc ? (
      <FiCheck className={`${isSporty ? 'text-[#ff535b]' : 'text-green-600'} h-5 w-5 font-black mx-auto`} />
    ) : (
      <FiX className="text-red-500 h-5 w-5 font-black mx-auto" />
    )},
    { label: 'Boot Space', key: 'bootSpace', render: (c: Car) => c.bootSpace },
    { label: 'Seating Capacity', key: 'seatingCapacity', render: (c: Car) => `${c.seatingCapacity} Seater` },
  ];

  return (
    <div
      className={`overflow-x-auto rounded-xl border transition-colors duration-300 ${
        isSporty ? 'border-[#2C2C2E] bg-[#1D1D1F]' : 'border-slate-200 bg-white'
      }`}
    >
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className={`border-b transition-colors ${isSporty ? 'border-[#2C2C2E] bg-[#121212]' : 'border-slate-200 bg-slate-50/50'}`}>
            <th className={`p-4 font-bold text-sm w-1/3 ${isSporty ? 'text-white' : 'text-slate-800'}`}>Feature</th>
            {cars.map((car) => (
              <th
                key={car.id}
                className={`p-4 font-bold text-sm text-center w-1/3 border-l ${
                  isSporty ? 'border-[#2C2C2E] text-white' : 'border-slate-200 text-slate-800'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.image || '/placeholder-car.jpg'}
                  alt={`${car.make} ${car.model}`}
                  className={`mx-auto h-24 w-36 object-cover rounded-md mb-2 shadow-sm ${
                    isSporty ? 'border border-zinc-800' : ''
                  }`}
                />
                <div className="font-extrabold">{car.make} {car.model}</div>
                <div className="text-xs text-slate-400 font-medium">{car.variant}</div>
              </th>
            ))}
            {cars.length === 1 && (
              <th
                className={`p-4 text-center w-1/3 border-l text-sm italic font-medium ${
                  isSporty ? 'border-[#2C2C2E] text-slate-500' : 'border-slate-200 text-slate-400'
                }`}
              >
                Add another car to compare side-by-side
              </th>
            )}
          </tr>
        </thead>
        <tbody className={`divide-y ${isSporty ? 'divide-[#2C2C2E]' : 'divide-slate-100'}`}>
          {comparisonRows.map((row) => (
            <tr key={row.key} className={isSporty ? 'hover:bg-zinc-800/20' : 'hover:bg-slate-50/30'}>
              <td className={`p-4 text-sm font-semibold ${isSporty ? 'text-slate-400' : 'text-slate-600'}`}>
                {row.label}
              </td>
              {cars.map((car) => (
                <td
                  key={car.id}
                  className={`p-4 text-sm text-center border-l ${
                    isSporty ? 'border-[#2C2C2E] text-white' : 'border-slate-200 text-slate-800'
                  }`}
                >
                  {row.render(car)}
                </td>
              ))}
              {cars.length === 1 && (
                <td className={`p-4 text-sm text-center border-l ${isSporty ? 'border-[#2C2C2E] text-slate-700' : 'border-slate-200 text-slate-300'}`}>
                  -
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
