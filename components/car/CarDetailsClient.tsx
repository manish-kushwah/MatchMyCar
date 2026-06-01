'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Car, Review } from '@/types';
import { CarApi } from '@/services/api/car';
import {
  FiArrowLeft,
  FiStar,
  FiHeart,
  FiShare2,
  FiCheck,
  FiShield,
  FiMail,
  FiPhone,
  FiUser,
  FiCalendar,
  FiMessageSquare,
} from 'react-icons/fi';
import Link from 'next/link';

interface CarDetailsClientProps {
  car: Car;
}

export function CarDetailsClient({ car }: CarDetailsClientProps) {
  const themeMode = useSelector((state: RootState) => state.theme?.mode || 'standard');
  const isSporty = themeMode === 'sporty';

  // State for image gallery index
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = car.image ? [car.image, car.image, car.image] : [];

  // State for inquiry submission
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
  });
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  // State for review submission
  const [reviewsList, setReviewsList] = useState<Review[]>(car.reviews || []);
  const [reviewForm, setReviewForm] = useState({
    username: '',
    review: '',
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Handle Inquiry Submit
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitting(true);
    setInquiryError('');
    setInquirySuccess(false);

    try {
      const response = await CarApi.submitInquiry(car.id, inquiryForm);
      if (response.success) {
        setInquirySuccess(true);
        setInquiryForm({ name: '', email: '', phone: '', preferredDate: '', message: '' });
      } else {
        setInquiryError(response.error || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      setInquiryError(err.response?.data?.error || 'A network error occurred.');
    } finally {
      setInquirySubmitting(false);
    }
  };

  // Handle Review Submit
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitting(true);
    setReviewError('');
    setReviewSuccess(false);

    try {
      const response = await CarApi.submitReview(
        car.id,
        reviewForm.username,
        0, // rating not stored in DB
        reviewForm.review
      );
      if (response.success && response.data) {
        setReviewsList((prev) => [response.data, ...prev]);
        setReviewSuccess(true);
        setReviewForm({ username: '', review: '' });
      } else {
        setReviewError(response.error || 'Failed to submit review.');
      }
    } catch (err: any) {
      setReviewError(err.response?.data?.error || 'A network error occurred.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back button link */}
      <div>
        <Link
          href="/cars"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
            isSporty ? 'text-slate-400 hover:text-[#ff535b]' : 'text-slate-500 hover:text-blue-600'
          }`}
        >
          <FiArrowLeft />
          <span>Back to Browse</span>
        </Link>
      </div>

      {/* Main Grid: Details + Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Title, Image Gallery, Technical DNA, Reviews */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Info */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {car.make} • {car.fuelType}
            </span>
            <h1
              className={`text-3xl sm:text-4xl font-black tracking-tight mt-1 mb-2 ${
                isSporty ? 'text-white' : 'text-slate-900'
              }`}
            >
              {car.model} <span className="text-xl font-medium text-slate-400">{car.variant}</span>
            </h1>
            <p className={`text-base ${isSporty ? 'text-slate-400' : 'text-slate-500'}`}>
              Pure driving utility. Benchmarked for maximum efficiency, comfort, and reliability.
            </p>
          </div>

          {/* Interactive Image Gallery */}
          <div className="space-y-4">
            <div
              className={`relative aspect-video rounded-xl overflow-hidden ${
                isSporty
                  ? 'border border-[#2C2C2E] bg-[#1D1D1F]'
                  : 'border border-slate-200 bg-white shadow-sm'
              }`}
            >
              {images.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images[activeImageIndex]}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-101"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                  No images available for this vehicle.
                </div>
              )}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-lg text-white text-xs font-bold backdrop-blur-sm">
                <FiStar className="fill-yellow-400 text-yellow-400" />
                <span>{car.safetyRating} / 5 Rating</span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? isSporty ? 'border-[#ff535b]' : 'border-blue-600'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Technical DNA spec list */}
          <section className="space-y-4">
            <h2
              className={`text-xl font-bold tracking-tight border-l-4 pl-3 ${
                isSporty ? 'text-white border-[#ff535b]' : 'text-slate-800 border-blue-600'
              }`}
            >
              Technical Specification DNA
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                className={`p-4 border rounded-xl flex flex-col items-center text-center transition-colors duration-300 ${
                  isSporty
                    ? 'bg-[#1D1D1F] border-[#2C2C2E] text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-xxs'
                }`}
              >
                <span className={`text-lg mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>⚡</span>
                <span className="text-xxs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Power Output</span>
                <span className={`text-base font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>
                  {car.power || 'N/A'}
                </span>
              </div>

              <div
                className={`p-4 border rounded-xl flex flex-col items-center text-center transition-colors duration-300 ${
                  isSporty
                    ? 'bg-[#1D1D1F] border-[#2C2C2E] text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-xxs'
                }`}
              >
                <span className={`text-lg mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>⚙️</span>
                <span className="text-xxs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Transmission</span>
                <span className={`text-base font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>
                  {car.transmission}
                </span>
              </div>

              <div
                className={`p-4 border rounded-xl flex flex-col items-center text-center transition-colors duration-300 ${
                  isSporty
                    ? 'bg-[#1D1D1F] border-[#2C2C2E] text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-xxs'
                }`}
              >
                <span className={`text-lg mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>⛽</span>
                <span className="text-xxs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Efficiency / Range</span>
                <span className={`text-base font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>
                  {car.mileage}
                </span>
              </div>

              <div
                className={`p-4 border rounded-xl flex flex-col items-center text-center transition-colors duration-300 ${
                  isSporty
                    ? 'bg-[#1D1D1F] border-[#2C2C2E] text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-xxs'
                }`}
              >
                <span className={`text-lg mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>🧳</span>
                <span className="text-xxs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Boot Space</span>
                <span className={`text-base font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>
                  {car.bootSpace}
                </span>
              </div>

              <div
                className={`p-4 border rounded-xl flex flex-col items-center text-center transition-colors duration-300 ${
                  isSporty
                    ? 'bg-[#1D1D1F] border-[#2C2C2E] text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-xxs'
                }`}
              >
                <span className={`text-lg mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>👥</span>
                <span className="text-xxs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Seating Capacity</span>
                <span className={`text-base font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>
                  {car.seatingCapacity} Seats
                </span>
              </div>

              <div
                className={`p-4 border rounded-xl flex flex-col items-center text-center transition-colors duration-300 ${
                  isSporty
                    ? 'bg-[#1D1D1F] border-[#2C2C2E] text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-xxs'
                }`}
              >
                <span className={`text-lg mb-1.5 ${isSporty ? 'text-[#ff535b]' : 'text-blue-600'}`}>🛡️</span>
                <span className="text-xxs uppercase tracking-wider text-slate-400 font-semibold mb-0.5">Airbags</span>
                <span className={`text-base font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>
                  {car.airbags} Airbags
                </span>
              </div>
            </div>
          </section>

          {/* Expert Verdicts Mock */}
          <section className="space-y-4">
            <h2
              className={`text-xl font-bold tracking-tight border-l-4 pl-3 ${
                isSporty ? 'text-white border-[#ff535b]' : 'text-slate-800 border-blue-600'
              }`}
            >
              Expert Verdict & Review
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-5 rounded-xl border relative overflow-hidden transition-colors ${
                  isSporty ? 'bg-[#1D1D1F] border-[#2C2C2E]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center">C</span>
                  <span className={`text-sm font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>Car & Driver</span>
                </div>
                <p className="text-xs italic text-slate-400 leading-relaxed mb-1">
                  "Delivers dynamic handling, precise steering control, and class-leading build quality in its segment. An outright recommendation."
                </p>
                <div className="flex text-yellow-400 gap-0.5 text-xs mt-2">
                  <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" />
                </div>
              </div>

              <div
                className={`p-5 rounded-xl border relative overflow-hidden transition-colors ${
                  isSporty ? 'bg-[#1D1D1F] border-[#2C2C2E]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 text-xs font-black flex items-center justify-center">T</span>
                  <span className={`text-sm font-bold ${isSporty ? 'text-white' : 'text-slate-800'}`}>Top Gear</span>
                </div>
                <p className="text-xs italic text-slate-400 leading-relaxed mb-1">
                  "A masterclass in automotive engineering. Quiet cabin, solid power output, and exceptional mileage numbers that raise the bar."
                </p>
                <div className="flex text-yellow-400 gap-0.5 text-xs mt-2">
                  <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar />
                </div>
              </div>
            </div>
          </section>

          {/* User Reviews and Submit Review form */}
          <section className="space-y-6">
            <h2
              className={`text-xl font-bold tracking-tight border-l-4 pl-3 ${
                isSporty ? 'text-white border-[#ff535b]' : 'text-slate-800 border-blue-600'
              }`}
            >
              User Community Reviews
            </h2>

            {/* List */}
            <div
              className={`p-6 rounded-xl border transition-colors ${
                isSporty ? 'bg-[#1D1D1F] border-[#2C2C2E]' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {reviewsList.length > 0 ? (
                <div className="space-y-5">
                  {reviewsList.map((rev, idx) => (
                    <div
                      key={idx}
                      className={`border-b last:border-none pb-4 last:pb-0 ${
                        isSporty ? 'border-zinc-800' : 'border-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-semibold text-sm ${isSporty ? 'text-white' : 'text-slate-800'}`}>
                          {rev.username}
                        </span>
                      </div>
                      <p className={`text-sm ${isSporty ? 'text-slate-300' : 'text-slate-600'}`}>{rev.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">No reviews yet. Be the first to leave a comment below.</p>
              )}
            </div>

            {/* Write a Review */}
            <div
              className={`p-6 rounded-xl border transition-colors ${
                isSporty ? 'bg-[#1D1D1F] border-[#2C2C2E]' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <h3 className={`text-base font-bold mb-4 ${isSporty ? 'text-white' : 'text-slate-800'}`}>
                Add Your Community Review
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {reviewSuccess && (
                  <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-lg flex items-center gap-1.5">
                    <FiCheck />
                    <span>Review submitted successfully! Thank you for sharing.</span>
                  </div>
                )}
                {reviewError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg">
                    {reviewError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={reviewForm.username}
                      onChange={(e) => setReviewForm({ ...reviewForm, username: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`h-10 px-3 text-sm rounded-lg border outline-none ${
                        isSporty
                          ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                          : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                    placeholder="Write details about mileage, driving performance, boot space, or comfort..."
                    className={`p-3 text-sm rounded-lg border outline-none resize-none ${
                      isSporty
                        ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                        : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className={`w-full py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all border-none cursor-pointer disabled:opacity-50 ${
                    isSporty
                      ? 'bg-[#ff535b] text-white hover:brightness-110 shadow-[0_0_10px_rgba(255,83,91,0.2)]'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* Right Column: Pricing details + Interactive Inquiry Form */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          {/* Price Card */}
          <div
            className={`p-6 border rounded-xl transition-all duration-300 ${
              isSporty
                ? 'bg-[#1D1D1F] border-[#2C2C2E]'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Ex-Showroom Price</span>
            <div
              className={`text-3xl font-black mt-1 mb-4 ${
                isSporty ? 'text-[#ff535b]' : 'text-slate-900'
              }`}
            >
              ₹{Number(car.price).toLocaleString('en-IN')}
            </div>
            <div className="flex gap-2 text-xs font-semibold text-slate-400 py-3 border-t border-b border-dashed border-slate-200 dark:border-zinc-800 mb-4">
              <span className="flex items-center gap-1"><FiShield /> 3-Year Warranty</span>
              <span className="ml-auto flex items-center gap-1"><FiCheck /> Roadside Assist</span>
            </div>
            <div className="flex gap-3">
              <button
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  isSporty
                    ? 'border-[#ff535b] text-[#ff535b] bg-transparent hover:bg-[#ff535b]/10'
                    : 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50'
                }`}
              >
                <FiShare2 className="inline mr-1" /> Share
              </button>
              <button
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                  isSporty
                    ? 'border-[#2C2C2E] text-white bg-transparent hover:border-[#ff535b] hover:text-[#ff535b]'
                    : 'border-slate-200 text-slate-600 bg-white hover:border-slate-300'
                }`}
              >
                <FiHeart className="inline mr-1 text-red-500 fill-red-500" /> Save Car
              </button>
            </div>
          </div>

          {/* Contact Dealer Form */}
          <div
            className={`p-6 border rounded-xl transition-all duration-300 ${
              isSporty
                ? 'bg-[#1D1D1F] border-[#2C2C2E]'
                : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3
              className={`text-base font-bold border-b pb-3 mb-4 flex items-center gap-2 ${
                isSporty ? 'text-white border-zinc-800' : 'text-slate-800 border-slate-100'
              }`}
            >
              <FiMail className={isSporty ? 'text-[#ff535b]' : 'text-blue-600'} />
              <span>{isSporty ? 'Book Test Drive' : 'Contact Local Dealer'}</span>
            </h3>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              {inquirySuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-lg flex items-center gap-1.5">
                  <FiCheck />
                  <span>Inquiry submitted! A dealer representative will contact you soon.</span>
                </div>
              )}
              {inquiryError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg">
                  {inquiryError}
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xxs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FiUser /> Name
                </label>
                <input
                  type="text"
                  required
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  placeholder="Your Full Name"
                  className={`h-10 px-3 text-sm rounded-lg border outline-none ${
                    isSporty
                      ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xxs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FiMail /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`h-10 px-3 text-sm rounded-lg border outline-none ${
                    isSporty
                      ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xxs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FiPhone /> Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  placeholder="e.g. +1 (555) 019-2834"
                  className={`h-10 px-3 text-sm rounded-lg border outline-none ${
                    isSporty
                      ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xxs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FiCalendar /> Preferred Date
                </label>
                <input
                  type="date"
                  value={inquiryForm.preferredDate}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, preferredDate: e.target.value })}
                  className={`h-10 px-3 text-sm rounded-lg border outline-none ${
                    isSporty
                      ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xxs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <FiMessageSquare /> Short Message
                </label>
                <textarea
                  rows={3}
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  placeholder="Ask about discounts, financing, or color availability..."
                  className={`p-3 text-sm rounded-lg border outline-none resize-none ${
                    isSporty
                      ? 'bg-[#2C2C2E] border-none text-white focus:ring-1 focus:ring-[#ff535b]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={inquirySubmitting}
                className={`w-full py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all border-none cursor-pointer disabled:opacity-50 ${
                  isSporty
                    ? 'bg-[#ff535b] text-white hover:brightness-110 shadow-[0_0_10px_rgba(255,83,91,0.3)]'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                }`}
              >
                {inquirySubmitting ? 'Booking...' : isSporty ? 'Book Test Drive' : 'Contact Dealer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
