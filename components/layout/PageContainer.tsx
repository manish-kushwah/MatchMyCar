'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  const themeMode = useSelector((state: RootState) => state.theme?.mode || 'standard');
  const isSporty = themeMode === 'sporty';

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-300 ${
        isSporty ? 'bg-[#121212] text-[#e2e2e2]' : 'bg-slate-50 text-slate-800'
      }`}
    >
      <Navbar />
      <main className="flex-1 w-full mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
