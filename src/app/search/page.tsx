'use client';

import { useState } from 'react';
import BarberMap from '@/components/BarberMap';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const services = [
  'Coupe de cheveux',
  'Barbe',
  'Dégradé',
  'Tresse',
  'Coloration',
  'Soins capillaires',
];

const ratings = [5, 4, 3, 2, 1];

export default function SearchPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de recherche */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rechercher un barbier</h1>
          <p className="mt-2 text-gray-600">
            Trouvez le barbier parfait près de chez vous
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher par nom ou localisation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Filtres</h2>
              </div>

              {/* Services */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Services</h3>
                <div className="space-y-2">
                  {services.map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Note minimum */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Note minimum</h3>
                <div className="space-y-2">
                  {ratings.map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {rating} étoiles et plus
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Carte */}
          <div className="lg:col-span-3">
            <BarberMap />
          </div>
        </div>
      </div>
    </div>
  );
} 