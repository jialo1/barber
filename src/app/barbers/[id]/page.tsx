'use client';

import { useState } from 'react';
import { StarIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

// Données de test (à remplacer par des données de l'API)
const mockBarber = {
  id: '1',
  name: 'Salon Chez Ali',
  location: 'Dakar, Sénégal',
  address: '123 Rue de la Médina, Dakar',
  phone: '+221 77 777 77 77',
  rating: 4.8,
  totalReviews: 128,
  description: 'Salon de coiffure moderne avec une équipe professionnelle. Spécialisé dans les coupes tendance et les dégradés.',
  services: [
    { id: '1', name: 'Coupe', price: 2000, duration: 30 },
    { id: '2', name: 'Barbe', price: 1500, duration: 20 },
    { id: '3', name: 'Dégradé', price: 3000, duration: 45 },
    { id: '4', name: 'Coupe + Barbe', price: 3000, duration: 45 },
  ],
  workingHours: [
    { day: 'Lundi', hours: '09:00 - 20:00' },
    { day: 'Mardi', hours: '09:00 - 20:00' },
    { day: 'Mercredi', hours: '09:00 - 20:00' },
    { day: 'Jeudi', hours: '09:00 - 20:00' },
    { day: 'Vendredi', hours: '09:00 - 20:00' },
    { day: 'Samedi', hours: '09:00 - 18:00' },
    { day: 'Dimanche', hours: 'Fermé' },
  ],
};

export default function BarberProfile({ params }: { params: { id: string } }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Générer les créneaux horaires disponibles
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête du profil */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img
                  src="https://via.placeholder.com/400x400"
                  alt={mockBarber.name}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900">{mockBarber.name}</h1>
              <div className="mt-2 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(mockBarber.rating) ? (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <StarIconOutline key={i} className="h-5 w-5 text-yellow-400" />
                    )
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({mockBarber.totalReviews} avis)
                </span>
              </div>
              <p className="mt-4 text-gray-600">{mockBarber.description}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{mockBarber.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  <span>{mockBarber.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services et réservation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Liste des services */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
            <div className="space-y-4">
              {mockBarber.services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedService === service.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration} minutes</p>
                    </div>
                    <span className="font-semibold text-gray-900">{service.price} FCFA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire de réservation */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Réserver</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="input-field"
                  value={selectedDate || ''}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure
                </label>
                <select
                  className="input-field"
                  value={selectedTime || ''}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Sélectionnez une heure</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn-primary w-full"
                disabled={!selectedService || !selectedDate || !selectedTime}
              >
                Confirmer la réservation
              </button>
            </div>
          </div>
        </div>

        {/* Horaires d'ouverture */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Horaires d'ouverture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBarber.workingHours.map((schedule) => (
              <div key={schedule.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{schedule.day}</span>
                <span className="text-gray-600">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 