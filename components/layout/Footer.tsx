'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function Footer() {
  const themeMode = useSelector((state: RootState) => state.theme?.mode || 'standard');
  const isSporty = themeMode === 'sporty';

  if (isSporty) {
    return (
      <footer className="w-full bg-[#0C0F0F] border-t border-[#2C2C2E] py-8 transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-bold text-xl italic text-[#ff535b]">MatchMyCar</span>
            <p className="text-xs text-slate-400 mt-1">
              &copy; {new Date().getFullYear()} MatchMyCar Performance Systems. Engineered for speed.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <a className="hover:text-[#ff535b] transition-colors hover:underline" href="#">Privacy Policy</a>
            <a className="hover:text-[#ff535b] transition-colors hover:underline" href="#">Terms of Service</a>
            <a className="hover:text-[#ff535b] transition-colors hover:underline" href="#">Contact</a>
            <a className="hover:text-[#ff535b] transition-colors hover:underline" href="#">Engineering</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-12 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl text-blue-600">MatchMyCar</span>
          <p className="text-sm text-slate-500 max-w-xs">
            Precision-driven vehicle discovery. Find your perfect match in seconds.
          </p>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold text-sm text-slate-800 uppercase tracking-wider">Product</span>
          <a className="text-sm text-slate-500 hover:text-blue-600 transition-colors" href="#">Browse Vehicles</a>
          <a className="text-sm text-slate-500 hover:text-blue-600 transition-colors" href="#">Specs Matrix</a>
          <a className="text-sm text-slate-500 hover:text-blue-600 transition-colors" href="#">Pricing Tool</a>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold text-sm text-slate-800 uppercase tracking-wider">Company</span>
          <a className="text-sm text-slate-500 hover:text-blue-600 transition-colors" href="#">About Us</a>
          <a className="text-sm text-slate-500 hover:text-blue-600 transition-colors" href="#">Careers</a>
          <a className="text-sm text-slate-500 hover:text-blue-600 transition-colors" href="#">Newsroom</a>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="font-semibold text-sm text-slate-800 uppercase tracking-wider">Legal</span>
          <a className="text-sm text-slate-500 hover:text-blue-600 transition-colors" href="#">Privacy Policy</a>
          <a className="text-sm text-slate-500 hover:text-blue-600 transition-colors" href="#">Terms of Use</a>
          <p className="text-xs text-slate-400 mt-2">&copy; {new Date().getFullYear()} MatchMyCar Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
