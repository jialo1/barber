'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

interface MapComponentProps {
  barbers: Barber[];
  center: {
    lat: number;
    lng: number;
  };
}

export default function MapComponent({ barbers, center }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Correction des icônes Leaflet
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
      center={[center.lat, center.lng]}
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
          position={[barber.location.lat, barber.location.lng]}
          icon={icon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{barber.name}</h3>
              <p className="text-sm text-gray-600">Note: {barber.rating}/5</p>
              <div className="mt-2">
                <p className="text-sm font-medium">Services:</p>
                <ul className="text-sm text-gray-600">
                  {barber.services.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
              <button className="mt-2 w-full bg-primary-600 text-white px-3 py-1 rounded-md text-sm hover:bg-primary-700">
                Réserver
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 