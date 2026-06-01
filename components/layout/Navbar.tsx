"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import { FiSun, FiZap, FiUser } from "react-icons/fi";

export function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme?.mode || "standard");

  const isSporty = themeMode === "sporty";

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
        isSporty
          ? "border-[#2C2C2E] bg-[#121212]/90 text-[#e2e2e2]"
          : "border-slate-200 bg-white/90 text-slate-800"
      } backdrop-blur`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span
            className={`p-1.5 rounded-lg text-sm tracking-wide font-black transition-colors ${
              isSporty ? "bg-[#ff535b] text-white" : "bg-blue-600 text-white"
            }`}
          >
            MMC
          </span>
          <span
            className={`transition-all ${isSporty ? "italic text-white" : "text-slate-900 font-bold"}`}
          >
            MatchMyCar
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? isSporty
                  ? "text-[#ff535b]"
                  : "text-blue-600"
                : isSporty
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/cars"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith("/cars")
                ? isSporty
                  ? "text-[#ff535b]"
                  : "text-blue-600"
                : isSporty
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Browse Cars
          </Link>
          <Link
            href="/compare"
            className={`text-sm font-medium transition-colors ${
              pathname === "/compare"
                ? isSporty
                  ? "text-[#ff535b]"
                  : "text-blue-600"
                : isSporty
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-blue-600"
            }`}
          >
            Comparison Panel
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => dispatch(toggleTheme())}
            title={isSporty ? "Switch to Standard Theme" : "Switch to Sporty Theme"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isSporty
                ? "border-[#ff535b]/30 bg-[#ff535b]/10 text-[#ff535b] hover:bg-[#ff535b]/20 shadow-[0_0_8px_rgba(255,83,91,0.2)]"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-600"
            }`}
          >
            {isSporty ? (
              <>
                <FiZap className="animate-pulse text-[#ff535b]" />
                <span>Sporty Mode</span>
              </>
            ) : (
              <>
                <FiSun className="text-yellow-500" />
                <span>Standard Mode</span>
              </>
            )}
          </button>

          {/* Login Button */}
          <button
            title="Login"
            className={`relative p-2 transition-colors cursor-pointer ${
              isSporty ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-blue-600"
            }`}
          >
            <div
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-sm font-medium transition-all ${
                isSporty
                  ? "border-[#ff535b]/30 bg-[#ff535b]/10 text-[#ff535b] hover:bg-[#ff535b]/20"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-600"
              }`}
            >
              <FiUser className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
