'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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

interface MapComponentProps {
  barbers: Barber[];
}

export default function MapComponent({ barbers }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [center, setCenter] = useState({ lat: 14.7167, lng: -17.4677 }); // Dakar par défaut

  useEffect(() => {
    setIsMounted(true);
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

  // Configuration de l'icône Leaflet
  const icon = L.icon({
    iconUrl: '/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '/marker-shadow.png',
    shadowSize: [41, 41]
  });

  if (!isMounted) {
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {barbers.map((barber) => (
        <Marker
          key={barber.id}
          position={barber.coordinates}
          icon={icon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{barber.name}</h3>
              <p className="text-sm text-gray-600">{barber.location}</p>
              <div className="mt-2 flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-sm">{barber.rating}</span>
                <span className="ml-1 text-sm text-gray-500">({barber.reviews} avis)</span>
              </div>
              <p className="mt-2 text-sm text-primary-600">{barber.price}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 