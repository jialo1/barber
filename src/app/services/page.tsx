'use client';

import { useState } from 'react';
import { ScissorsIcon, ClockIcon, CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Carousel from '@/components/Carousel';

const services = [
  {
    id: 1,
    name: 'Coupe de cheveux',
    description: 'Une coupe personnalisée selon vos préférences et la forme de votre visage',
    duration: '30-45 min',
    price: 'À partir de 2000 FCFA',
    features: [
      'Consultation personnalisée',
      'Coupe aux ciseaux et/ou tondeuse',
      'Finition et coiffage',
      'Conseils d\'entretien'
    ],
    images: [
      { src: '/images/services/coupe-1.jpg', alt: 'Coupe de cheveux style 1' },
      { src: '/images/services/coupe-2.jpg', alt: 'Coupe de cheveux style 2' },
      { src: '/images/services/coupe-3.jpg', alt: 'Coupe de cheveux style 3' }
    ]
  },
  {
    id: 2,
    name: 'Barbe',
    description: 'Taille et modelage professionnel de votre barbe pour un look impeccable',
    duration: '20-30 min',
    price: 'À partir de 1500 FCFA',
    features: [
      'Taille de barbe',
      'Modelage',
      'Soins hydratants',
      'Conseils d\'entretien'
    ],
    images: [
      { src: '/images/services/barbe-1.jpg', alt: 'Barbe style 1' },
      { src: '/images/services/barbe-2.jpg', alt: 'Barbe style 2' },
      { src: '/images/services/barbe-3.jpg', alt: 'Barbe style 3' }
    ]
  },
  {
    id: 3,
    name: 'Coupe + Barbe',
    description: 'Service complet pour un look totalement renouvelé',
    duration: '45-60 min',
    price: 'À partir de 3000 FCFA',
    features: [
      'Coupe personnalisée',
      'Taille de barbe',
      'Modelage',
      'Soins complets'
    ],
    images: [
      { src: '/images/services/coupe-barbe-1.jpg', alt: 'Coupe et barbe style 1' },
      { src: '/images/services/coupe-barbe-2.jpg', alt: 'Coupe et barbe style 2' },
      { src: '/images/services/coupe-barbe-3.jpg', alt: 'Coupe et barbe style 3' }
    ]
  },
  {
    id: 4,
    name: 'Dégradé',
    description: 'Technique de coupe moderne avec dégradé progressif',
    duration: '45-60 min',
    price: 'À partir de 2500 FCFA',
    features: [
      'Dégradé progressif',
      'Finition précise',
      'Coiffage',
      'Conseils d\'entretien'
    ],
    images: [
      { src: '/images/services/degrade-1.jpg', alt: 'Dégradé style 1' },
      { src: '/images/services/degrade-2.jpg', alt: 'Dégradé style 2' },
      { src: '/images/services/degrade-3.jpg', alt: 'Dégradé style 3' }
    ]
  },
  {
    id: 5,
    name: 'Tresse',
    description: 'Services de tressage professionnel pour tous types de cheveux',
    duration: '60-120 min',
    price: 'À partir de 5000 FCFA',
    features: [
      'Tresse traditionnelle',
      'Tresse moderne',
      'Protection des cheveux',
      'Conseils d\'entretien'
    ],
    images: [
      { src: '/images/services/tresse-1.jpg', alt: 'Tresse style 1' },
      { src: '/images/services/tresse-2.jpg', alt: 'Tresse style 2' },
      { src: '/images/services/tresse-3.jpg', alt: 'Tresse style 3' }
    ]
  },
  {
    id: 6,
    name: 'Coloration',
    description: 'Service de coloration professionnelle pour un look unique',
    duration: '60-90 min',
    price: 'À partir de 4000 FCFA',
    features: [
      'Consultation couleur',
      'Coloration professionnelle',
      'Soins après coloration',
      'Conseils d\'entretien'
    ],
    images: [
      { src: '/images/services/coloration-1.jpg', alt: 'Coloration style 1' },
      { src: '/images/services/coloration-2.jpg', alt: 'Coloration style 2' },
      { src: '/images/services/coloration-3.jpg', alt: 'Coloration style 3' }
    ]
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos Services
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez notre gamme complète de services de coiffure
          </p>
        </div>

        {/* Liste des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="relative">
                <Carousel
                  images={service.images}
                  autoPlay={true}
                  interval={3000}
                  height="h-[200px]"
                />
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-5 w-5 mr-2 text-primary-600" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-primary-600" />
                    <span>{service.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(service.id)}
                  className="mt-6 w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-300"
                >
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de détails */}
        {selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {services.find(s => s.id === selectedService)?.name}
                  </h2>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Fermer</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <Carousel
                    images={services.find(s => s.id === selectedService)?.images || []}
                    autoPlay={true}
                    interval={3000}
                    height="h-[300px]"
                  />
                  <p className="text-gray-600">
                    {services.find(s => s.id === selectedService)?.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="h-5 w-5 mr-2 text-primary-600" />
                      <span>{services.find(s => s.id === selectedService)?.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <CurrencyDollarIcon className="h-5 w-5 mr-2 text-primary-600" />
                      <span>{services.find(s => s.id === selectedService)?.price}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ce qui est inclus :</h3>
                    <ul className="space-y-2">
                      {services.find(s => s.id === selectedService)?.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <SparklesIcon className="h-5 w-5 mr-2 text-primary-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-300"
                  >
                    Réserver ce service
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 