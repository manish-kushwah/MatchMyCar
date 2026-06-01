import { configureStore } from '@reduxjs/toolkit';
import compareReducer from './slices/compareSlice';
import filterReducer from './slices/filterSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    compare: compareReducer,
    filters: filterReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
