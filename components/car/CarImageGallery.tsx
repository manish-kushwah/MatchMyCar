'use client';

import React, { useState } from 'react';

export interface CarImageGalleryProps {
  images: string[];
}

export function CarImageGallery({ images }: CarImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || '/placeholder-car.jpg');

  const galleryList = images.length > 0 ? images : ['/placeholder-car.jpg'];

  return (
    <div className="space-y-4">
      {/* Active Hero Frame */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage}
          alt="Car View"
          className="h-full w-full object-cover object-center transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails Row */}
      {galleryList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {galleryList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-50 transition-all ${
                activeImage === img ? 'border-blue-600 shadow-sm scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
