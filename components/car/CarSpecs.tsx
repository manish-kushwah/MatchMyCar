import React from 'react';
import { Car } from '@/types';
import { FiCheckCircle, FiInfo } from 'react-icons/fi';

export interface CarSpecsProps {
  car: Car;
}

export function CarSpecs({ car }: CarSpecsProps) {
  const specs = [
    { label: 'Ex-Showroom Price', value: `₹${Number(car.price).toLocaleString('en-IN')}` },
    { label: 'Engine Capacity', value: car.engine },
    { label: 'Transmission', value: car.transmission },
    { label: 'Fuel Type', value: car.fuelType },
    { label: 'Mileage', value: car.mileage },
    { label: 'Seating Capacity', value: `${car.seatingCapacity} Seater` },
    { label: 'Safety Rating', value: `${car.safetyRating} Star (GNCAP)` },
    { label: 'Airbags', value: `${car.airbags} Airbags` },
    { label: 'Boot Space', value: car.bootSpace },
    { label: 'Power output', value: car.power },
    { label: 'ABS System', value: car.abs ? 'Yes' : 'No' },
    { label: 'ESC System', value: car.esc ? 'Yes' : 'No' },
  ];

  return (
    <div className="space-y-8">
      {/* Specs Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FiInfo className="text-blue-600" />
          <span>Specifications</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-white p-4 border border-slate-100 rounded-xl">
              <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">{spec.label}</span>
              <span className="text-base font-bold text-slate-800 mt-1 block">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons Section */}
      {car.pros && car.pros.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FiCheckCircle className="text-green-600" />
            <span>Pros & Key Strengths</span>
          </h3>
          <div className="bg-green-50/30 border border-green-100 p-6 rounded-xl space-y-2">
            {car.pros.map((pro, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                <FiCheckCircle className="text-green-600 h-5 w-5 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
