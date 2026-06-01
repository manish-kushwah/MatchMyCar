'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setMake, toggleFuelType, toggleBodyType, setPriceRange, resetFilters } from '@/store/slices/filterSlice';
import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/common/Button';
import { CarCard } from '@/components/car/CarCard';
import { useCars } from '@/hooks/useCars';
import { FuelType, BodyType } from '@/types';
import { FiSearch, FiChevronRight, FiAlertCircle } from 'react-icons/fi';
import { MdDirectionsCar } from 'react-icons/md';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme?.mode || 'standard');
  const isSporty = themeMode === 'sporty';

  // Local state for the quick filter form
  const [budget, setBudget] = useState<string>('all');
  const [fuel, setFuel] = useState<string>('all');
  const [body, setBody] = useState<string>('all');

  // Load all cars (first 6, sorted by newest) for the browse section
  const { data: browseData, isLoading: browseLoading, isError: browseError } = useCars('limit=6&page=1&sortBy=createdAt');
  const browseCars = browseData?.data || [];
  const totalCarsCount = browseData?.meta?.totalCount ?? 0;

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(resetFilters());

    if (budget === 'under-20k') {
      dispatch(setPriceRange([0, 20000]));
    } else if (budget === '20k-40k') {
      dispatch(setPriceRange([20000, 40000]));
    } else if (budget === '40k-70k') {
      dispatch(setPriceRange([40000, 70000]));
    } else if (budget === '70k-plus') {
      dispatch(setPriceRange([70000, 1000000]));
    }

    if (fuel !== 'all') {
      dispatch(toggleFuelType(fuel as FuelType));
    }

    if (body !== 'all') {
      dispatch(toggleBodyType(body as BodyType));
    }

    router.push('/cars');
  };

  return (
    <PageContainer>
      {/* Hero section */}
      <section
        className={`relative rounded-2xl overflow-hidden min-h-[480px] flex items-center mb-16 p-8 md:p-12 transition-all duration-300 ${
          isSporty
            ? 'bg-[#121212] border border-[#2C2C2E] shadow-[inset_0_0_80px_rgba(255,83,91,0.08)]'
            : 'bg-linear-to-br from-slate-50 to-blue-50/50 border border-slate-200'
        }`}
      >
        {isSporty && (
          <div className="absolute inset-0 z-0 opacity-20 grayscale pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Performance car background"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwRAV8nYuPSpFyWWBHc3bAvW9K5y1aUUO8GPHnSLGWMO5vn1hunm_6IX7B2lJzYY1lHbG6N440utlyMVlLLq3c2a-07oc3RlXGQl0FIXKgjyh50pEb4bQ3BXsuO5aJDHLGQCpUrFd5V4RUKU0r0ge9djgxe061U-viT1ttGMPz-p7QgF1297AYBOt53s6GFu2SSu1KrOfs_TDkHGrGPiaQYwigMkkoybuAzM02LS0wTS7JiJnymwGq46iItQA1OMIJnkdpKYj_jcUx"
            />
          </div>
        )}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <h1
              className={`text-4xl sm:text-5xl font-black tracking-tight leading-tight transition-colors ${
                isSporty ? 'text-white' : 'text-slate-900'
              }`}
            >
              Find the right car <br />
              <span className={isSporty ? 'text-[#ff535b] italic' : 'text-blue-600'}>without confusion</span>
            </h1>
            <p className={`text-lg max-w-lg mx-auto lg:mx-0 ${isSporty ? 'text-slate-400' : 'text-slate-500'}`}>
              Compare prices, mileage, safety ratings, and engine specs side-by-side. Precision-engineered searches protect your choices.
            </p>
            <div className="pt-2 flex justify-center lg:justify-start gap-4">
              {isSporty ? (
                <>
                  <Link href="/cars">
                    <button className="px-8 py-3 bg-[#ff535b] hover:brightness-110 text-white font-semibold rounded-DEFAULT uppercase tracking-widest transition-all active:scale-95 border-none shadow-[0_0_12px_rgba(255,83,91,0.4)] cursor-pointer">
                      Start Finding
                    </button>
                  </Link>
                  <Link href="/compare">
                    <button className="px-8 py-3 bg-transparent border-2 border-[#ff535b] text-[#ff535b] font-semibold rounded-DEFAULT uppercase tracking-widest hover:bg-[#ff535b]/10 transition-all cursor-pointer">
                      View Specs
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/cars">
                    <Button size="lg" className="px-8 shadow-sm">
                      Browse All Cars
                    </Button>
                  </Link>
                  <Link href="/compare">
                    <Button variant="outline" size="lg">
                      Compare Panel
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-4/3 shadow-md border border-slate-200/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Modern luxury car interior"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxO3ihc7ce7DAJryCH3orp7AZUACtBhzWibra0YbHd3TEkcZT0kf8ulubPosebCYAAOIwIDYYo1tRzJKxFFGWRDNZ11fbIVS0wgDurfY0wMFExVZWfn2mY9MPg_gDZyMhPCd1Btyjz1qEeUY5HJcBUXjdLGNTH7NB_fKUQh7K84zQ02VIFsSYVsS_ohc8C_peedEACQB8sn4wZ8abh2pvtexnqRBbpzdZID4_Fhe6qYFPqoYieWJDtZBTrKkfCbSQdkBNXe686iv5F"
            />
          </div>
        </div>
      </section>

      {/* Quick Search Widget */}
      <section className="mb-16">
        <div
          className={`p-8 shadow-sm max-w-4xl mx-auto transition-all duration-300 ${
            isSporty
              ? 'bg-[#1D1D1F] border border-[#2C2C2E] rounded-DEFAULT'
              : 'bg-white border border-slate-200 rounded-2xl'
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <FiSearch className={isSporty ? 'text-[#ff535b] h-5 w-5' : 'text-blue-600 h-5 w-5'} />
            <h3 className={`text-xl font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>
              Quick Match Explorer
            </h3>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end" onSubmit={handleQuickSearch}>
            {/* Budget */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Budget Range</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={`w-full h-11 border rounded-lg px-3 text-sm outline-none transition-colors cursor-pointer ${
                  isSporty
                    ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                }`}
              >
                <option value="all">Any Price</option>
                <option value="under-20k">Under $20,000</option>
                <option value="20k-40k">$20,000 - $40,000</option>
                <option value="40k-70k">$40,000 - $70,000</option>
                <option value="70k-plus">$70,000+</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Fuel Preference</label>
              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className={`w-full h-11 border rounded-lg px-3 text-sm outline-none transition-colors cursor-pointer ${
                  isSporty
                    ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                }`}
              >
                <option value="all">Any Fuel Type</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            {/* Body Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Body Layout</label>
              <select
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={`w-full h-11 border rounded-lg px-3 text-sm outline-none transition-colors cursor-pointer ${
                  isSporty
                    ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                }`}
              >
                <option value="all">Any Body Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
              </select>
            </div>

            {/* Submit */}
            <div>
              {isSporty ? (
                <button
                  type="submit"
                  className="w-full h-11 bg-[#ff535b] hover:brightness-110 text-white font-bold uppercase tracking-wider rounded-DEFAULT transition-all active:scale-95 border-none flex items-center gap-1.5 justify-center cursor-pointer shadow-[0_0_10px_rgba(255,83,91,0.3)]"
                >
                  <span>Find Matches</span>
                  <FiChevronRight />
                </button>
              ) : (
                <Button type="submit" className="w-full h-11 shadow-sm font-semibold flex items-center gap-1.5 justify-center">
                  <span>Find Matches</span>
                  <FiChevronRight />
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Browse Vehicles Section — loaded from vcars on mount */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-2xl font-black ${isSporty ? 'text-white' : 'text-slate-800'}`}>
              {isSporty ? 'Available Fleet' : 'Browse Vehicles'}
            </h2>
            <p className={`text-sm mt-1 ${isSporty ? 'text-slate-400' : 'text-slate-500'}`}>
              {browseLoading
                ? 'Loading vehicles...'
                : totalCarsCount > 0
                ? `${totalCarsCount} vehicle${totalCarsCount !== 1 ? 's' : ''} available — showing latest 6`
                : 'No vehicles found in the database'}
            </p>
          </div>
          {browseCars.length > 0 && (
            <Link
              href="/cars"
              className={`text-sm font-bold flex items-center gap-1 hover:underline ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}
            >
              <span>View All</span>
              <FiChevronRight />
            </Link>
          )}
        </div>

        {/* Loading skeletons */}
        {browseLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className={`rounded-xl h-80 animate-pulse ${
                  isSporty ? 'bg-[#1D1D1F] border border-[#2C2C2E]' : 'bg-slate-100 border border-slate-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {!browseLoading && browseError && (
          <div
            className={`rounded-xl p-10 flex flex-col items-center gap-4 text-center border ${
              isSporty ? 'bg-[#1D1D1F] border-[#2C2C2E]' : 'bg-white border-slate-200'
            }`}
          >
            <FiAlertCircle className={`h-10 w-10 ${isSporty ? 'text-[#ff535b]' : 'text-red-400'}`} />
            <p className={`font-semibold ${isSporty ? 'text-white' : 'text-slate-700'}`}>
              Could not load vehicles
            </p>
            <p className="text-sm text-slate-400">There was an error fetching data from the database. Please try refreshing.</p>
          </div>
        )}

        {/* Empty state — table is empty */}
        {!browseLoading && !browseError && browseCars.length === 0 && (
          <div
            className={`rounded-xl p-12 flex flex-col items-center gap-5 text-center border ${
              isSporty ? 'bg-[#1D1D1F] border-[#2C2C2E]' : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`p-4 rounded-full ${isSporty ? 'bg-[#2C2C2E]' : 'bg-slate-100'}`}
            >
              <MdDirectionsCar className={`h-12 w-12 ${isSporty ? 'text-slate-500' : 'text-slate-400'}`} />
            </div>
            <div>
              <p className={`text-xl font-bold mb-1 ${isSporty ? 'text-white' : 'text-slate-700'}`}>
                No vehicles found
              </p>
              <p className="text-sm text-slate-400 max-w-sm">
                The vehicle database is currently empty. Run the seed SQL to populate it.
              </p>
            </div>
            <Link href="/cars">
              {isSporty ? (
                <button className="px-6 py-2.5 bg-[#ff535b] hover:brightness-110 text-white font-semibold rounded-DEFAULT uppercase tracking-widest transition-all active:scale-95 border-none cursor-pointer shadow-[0_0_10px_rgba(255,83,91,0.4)]">
                  Go to Browse Page
                </button>
              ) : (
                <Button variant="outline">Go to Browse Page</Button>
              )}
            </Link>
          </div>
        )}

        {/* Cars grid */}
        {!browseLoading && !browseError && browseCars.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {browseCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {/* View All CTA */}
            {totalCarsCount > 6 && (
              <div className="flex justify-center mt-10">
                <Link href="/cars">
                  {isSporty ? (
                    <button className="px-8 py-3 bg-[#ff535b] hover:brightness-110 text-white font-semibold rounded-DEFAULT uppercase tracking-widest transition-all active:scale-95 border-none cursor-pointer shadow-[0_0_12px_rgba(255,83,91,0.4)]">
                      Browse All {totalCarsCount} Vehicles
                    </button>
                  ) : (
                    <Button size="lg" className="shadow-sm px-10">
                      Browse All {totalCarsCount} Vehicles
                    </Button>
                  )}
                </Link>
              </div>
            )}
          </>
        )}
      </section>

      {/* Stats Counter Section */}
      <section
        className={`rounded-2xl py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center transition-colors duration-300 ${
          isSporty ? 'bg-[#1D1D1F] border border-[#2C2C2E]' : 'bg-white border border-slate-100 shadow-sm'
        }`}
      >
        <div className={`md:border-r ${isSporty ? 'border-[#2C2C2E]' : 'border-slate-100'} last:border-none`}>
          <div className={`font-display-lg text-4xl font-extrabold mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>
            {totalCarsCount > 0 ? `${totalCarsCount}+` : '4.2k+'}
          </div>
          <div className="text-xs uppercase font-bold tracking-widest text-slate-400">Cars Available</div>
        </div>
        <div className={`md:border-r ${isSporty ? 'border-[#2C2C2E]' : 'border-slate-100'} last:border-none`}>
          <div className={`font-display-lg text-4xl font-extrabold mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>
            0.2s
          </div>
          <div className="text-xs uppercase font-bold tracking-widest text-slate-400">Matching Speed</div>
        </div>
        <div className={`md:border-r ${isSporty ? 'border-[#2C2C2E]' : 'border-slate-100'} last:border-none`}>
          <div className={`font-display-lg text-4xl font-extrabold mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>
            98%
          </div>
          <div className="text-xs uppercase font-bold tracking-widest text-slate-400">Satisfaction</div>
        </div>
        <div className="last:border-none">
          <div className={`font-display-lg text-4xl font-extrabold mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>
            150+
          </div>
          <div className="text-xs uppercase font-bold tracking-widest text-slate-400">Dealers</div>
        </div>
      </section>
    </PageContainer>
  );
}
