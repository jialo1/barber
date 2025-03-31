'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

interface Barber {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  services: string[];
  image: string;
  price: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface BarberMapProps {
  barbers: Barber[];
}

// Import dynamique de tous les composants Leaflet
const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Chargement de la carte...</p>
    </div>
  ),
});

export default function BarberMap({ barbers }: BarberMapProps) {
  return <MapWithNoSSR barbers={barbers} />;
} 