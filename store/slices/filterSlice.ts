import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState, FuelType, BodyType, TransmissionType } from '@/types';

const initialState: FilterState = {
  make: undefined,
  fuelType: [],
  bodyType: [],
  priceRange: [0, 5000000], // Default range up to $5M/Rs50L depending on currency
  transmission: [],
  seatingCapacity: [],
  safetyRating: undefined,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMake: (state, action: PayloadAction<string | undefined>) => {
      state.make = action.payload;
    },
    toggleFuelType: (state, action: PayloadAction<FuelType>) => {
      if (!state.fuelType) state.fuelType = [];
      const index = state.fuelType.indexOf(action.payload);
      if (index > -1) {
        state.fuelType.splice(index, 1);
      } else {
        state.fuelType.push(action.payload);
      }
    },
    toggleBodyType: (state, action: PayloadAction<BodyType>) => {
      if (!state.bodyType) state.bodyType = [];
      const index = state.bodyType.indexOf(action.payload);
      if (index > -1) {
        state.bodyType.splice(index, 1);
      } else {
        state.bodyType.push(action.payload);
      }
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    toggleTransmission: (state, action: PayloadAction<TransmissionType>) => {
      if (!state.transmission) state.transmission = [];
      const index = state.transmission.indexOf(action.payload);
      if (index > -1) {
        state.transmission.splice(index, 1);
      } else {
        state.transmission.push(action.payload);
      }
    },
    toggleSeatingCapacity: (state, action: PayloadAction<number>) => {
      if (!state.seatingCapacity) state.seatingCapacity = [];
      const index = state.seatingCapacity.indexOf(action.payload);
      if (index > -1) {
        state.seatingCapacity.splice(index, 1);
      } else {
        state.seatingCapacity.push(action.payload);
      }
    },
    setSafetyRating: (state, action: PayloadAction<number | undefined>) => {
      state.safetyRating = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setMake,
  toggleFuelType,
  toggleBodyType,
  setPriceRange,
  toggleTransmission,
  toggleSeatingCapacity,
  setSafetyRating,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
