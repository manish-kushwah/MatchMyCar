import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '@/types';

interface CompareState {
  comparedCars: Car[];
}

const initialState: CompareState = {
  comparedCars: [],
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<Car>) => {
      // Check if car already exists in comparison
      if (state.comparedCars.some((c) => c.id === action.payload.id)) return;
      
      // Limit comparison to 2 cars
      if (state.comparedCars.length >= 2) {
        state.comparedCars.shift(); // Remove oldest item to free slot
      }
      state.comparedCars.push(action.payload);
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.comparedCars = state.comparedCars.filter((c) => c.id !== action.payload);
    },
    clearCompare: (state) => {
      state.comparedCars = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
