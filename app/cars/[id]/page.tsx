import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CarService } from '@/services/supabase/carService';
import { PageContainer } from '@/components/layout/PageContainer';
import { CarDetailsClient } from '@/components/car/CarDetailsClient';

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

// Generate dynamic meta titles for search engine crawler indexing (SEO optimization)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = 'then' in params ? await params : params;
  const car = await CarService.getCarById(resolvedParams.id);
  
  if (!car) {
    return {
      title: 'Vehicle Not Found | MatchMyCar',
    };
  }

  return {
    title: `${car.make} ${car.model} ${car.variant} Specs & Reviews | MatchMyCar`,
    description: `Compare pricing, mileage (${car.mileage}), transmission (${car.transmission}), and safety (${car.safetyRating} stars) for ${car.make} ${car.model}.`,
  };
}

export default async function CarDetailsPage({ params }: PageProps) {
  const resolvedParams = 'then' in params ? await params : params;
  const car = await CarService.getCarById(resolvedParams.id);

  if (!car) {
    notFound();
  }

  return (
    <PageContainer>
      <CarDetailsClient car={car} />
    </PageContainer>
  );
}
