'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  setMake,
  toggleFuelType,
  toggleTransmission,
  setSafetyRating,
  resetFilters,
} from '@/store/slices/filterSlice';
import { FuelType, TransmissionType } from '@/types';
import { FiRefreshCw, FiSliders } from 'react-icons/fi';
import { Select, Rate, Button as AntdButton } from 'antd';

const { Option } = Select;

export function FilterPanel() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  const makes = ['Tesla', 'Toyota', 'Honda', 'Hyundai', 'Ford', 'BMW', 'Mercedes-Benz', 'Audi', 'Tata', 'Mahindra'];
  const fuelTypes: FuelType[] = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissionTypes: TransmissionType[] = ['Manual', 'Automatic', 'AMT', 'DCT', 'CVT'];

  return (
    <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <FiSliders className="text-blue-600" />
          <span>Filters</span>
        </h3>
        <AntdButton
          type="text"
          onClick={() => dispatch(resetFilters())}
          icon={<FiRefreshCw className="inline mr-1 text-xs" />}
          className="text-xs text-slate-400 hover:text-blue-600 flex items-center p-0 h-auto"
        >
          Reset All
        </AntdButton>
      </div>

      {/* Brand Select */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Brand / Make</label>
        <Select
          placeholder="All Brands"
          className="w-full"
          value={filters.make || undefined}
          onChange={(val) => dispatch(setMake(val))}
          allowClear
        >
          {makes.map((make) => (
            <Option key={make} value={make}>
              {make}
            </Option>
          ))}
        </Select>
      </div>

      {/* Fuel Type Filters */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Fuel Type</label>
        <div className="flex flex-wrap gap-2">
          {fuelTypes.map((fuel) => {
            const isSelected = filters.fuelType?.includes(fuel);
            return (
              <button
                key={fuel}
                onClick={() => dispatch(toggleFuelType(fuel))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {fuel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transmission Type */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Transmission</label>
        <div className="flex flex-wrap gap-2">
          {transmissionTypes.map((trans) => {
            const isSelected = filters.transmission?.includes(trans);
            return (
              <button
                key={trans}
                onClick={() => dispatch(toggleTransmission(trans))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {trans}
              </button>
            );
          })}
        </div>
      </div>

      {/* Safety Rating */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Minimum Safety Rating</label>
        <div className="flex items-center gap-2">
          <Rate
            value={filters.safetyRating}
            onChange={(val) => dispatch(setSafetyRating(val || undefined))}
          />
          {filters.safetyRating && (
            <span className="text-xs font-bold text-slate-500">{filters.safetyRating} Stars & Up</span>
          )}
        </div>
      </div>
    </div>
  );
}
