'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction des icônes Leaflet
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/marker-shadow.png',
  shadowSize: [41, 41]
});

interface Barber {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  services: string[];
}

// Import dynamique de la carte
const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
      <p className="text-gray-500">Chargement de la carte...</p>
    </div>
  ),
});

export default function BarberMap() {
  const [barbers, setBarbers] = useState<Barber[]>([
    {
      id: '1',
      name: 'Salon Chez Mamadou',
      location: { lat: 14.7167, lng: -17.4677 }, // Dakar
      rating: 4.8,
      services: ['Coupe', 'Barbe', 'Dégradé'],
    },
    {
      id: '2',
      name: 'Barber Shop Express',
      location: { lat: 14.6928, lng: -17.4467 }, // Dakar
      rating: 4.5,
      services: ['Coupe', 'Barbe', 'Tresse'],
    },
    {
      id: '3',
      name: 'Le Barbier Pro',
      location: { lat: 14.7527, lng: -17.4887 }, // Dakar
      rating: 4.9,
      services: ['Coupe', 'Barbe', 'Dégradé', 'Tresse'],
    },
  ]);

  const [center, setCenter] = useState({ lat: 14.7167, lng: -17.4677 }); // Dakar

  useEffect(() => {
    // Géolocalisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    }
  }, []);

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <MapWithNoSSR barbers={barbers} center={center} />
    </div>
  );
} 