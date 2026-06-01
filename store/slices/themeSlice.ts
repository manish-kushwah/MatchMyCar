import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'standard' | 'sporty';

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: 'standard', // Default is standard (light SaaS)
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      // Also update the class on the html element for Tailwind and global layouts
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        if (action.payload === 'sporty') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
      }
    },
    toggleTheme: (state) => {
      const newMode = state.mode === 'standard' ? 'sporty' : 'standard';
      state.mode = newMode;
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        if (newMode === 'sporty') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }
      }
    }
  }
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
