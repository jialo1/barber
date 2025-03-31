'use client';

import Link from 'next/link';
import { MapPinIcon, ClockIcon, ScissorsIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import ReservationSystem from '@/components/ReservationSystem';

interface Barber {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  price: string;
  services: string[];
}

export default function Home() {
  const [showReservation, setShowReservation] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  const services = [
    {
      name: 'Coupe',
      description: 'Coupe de cheveux personnalisée selon vos préférences',
      price: 'À partir de 2000 FCFA',
      duration: '30-45 min',
      image: '/images/services/coupe.svg',
      barber: {
        name: 'Salon Elite',
        rating: 4.8,
        reviews: 128,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber1.jpg'
      }
    },
    {
      name: 'Barbe',
      description: 'Taille de barbe professionnelle et soins',
      price: 'À partir de 1500 FCFA',
      duration: '20-30 min',
      image: '/images/services/barbe.svg',
      barber: {
        name: 'Barber Shop Premium',
        rating: 4.9,
        reviews: 256,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber2.jpg'
      }
    },
    {
      name: 'Coupe + Barbe',
      description: 'Service complet incluant coupe et barbe',
      price: 'À partir de 3000 FCFA',
      duration: '45-60 min',
      image: '/images/services/coupe-barbe.svg',
      barber: {
        name: 'Salon Elite',
        rating: 4.8,
        reviews: 128,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber1.jpg'
      }
    },
    {
      name: 'Dégradé',
      description: 'Coupe dégradée moderne et tendance',
      price: 'À partir de 2500 FCFA',
      duration: '40-50 min',
      image: '/images/services/degrade.svg',
      barber: {
        name: 'Barber Shop Premium',
        rating: 4.9,
        reviews: 256,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber2.jpg'
      }
    },
    {
      name: 'Tresse',
      description: 'Tressage professionnel de tous types',
      price: 'À partir de 5000 FCFA',
      duration: '60-90 min',
      image: '/images/services/tresse.svg',
      barber: {
        name: 'Barber Shop Premium',
        rating: 4.9,
        reviews: 256,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber2.jpg'
      }
    },
    {
      name: 'Coloration',
      description: 'Coloration professionnelle de cheveux',
      price: 'À partir de 4000 FCFA',
      duration: '45-60 min',
      image: '/images/services/coloration.svg',
      barber: {
        name: 'Salon Elite',
        rating: 4.8,
        reviews: 128,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber1.jpg'
      }
    },
    {
      name: 'Coupe Afro',
      description: 'Coupe spécialisée pour cheveux afro',
      price: 'À partir de 3500 FCFA',
      duration: '45-60 min',
      image: '/images/services/coupe.svg',
      barber: {
        name: 'Salon Elite',
        rating: 4.8,
        reviews: 128,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber1.jpg'
      }
    },
    {
      name: 'Soins Cheveux',
      description: 'Soins et traitements capillaires',
      price: 'À partir de 3000 FCFA',
      duration: '30-45 min',
      image: '/images/services/coloration.svg',
      barber: {
        name: 'Barber Shop Premium',
        rating: 4.9,
        reviews: 256,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber2.jpg'
      }
    },
    {
      name: 'Coupe + Soins',
      description: 'Service complet avec soins inclus',
      price: 'À partir de 4500 FCFA',
      duration: '60-75 min',
      image: '/images/services/coupe-barbe.svg',
      barber: {
        name: 'Salon Elite',
        rating: 4.8,
        reviews: 128,
        location: 'Dakar, Sénégal',
        image: '/images/barbers/barber1.jpg'
      }
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Trouvez votre</span>
              <span className="block text-primary-600">barbier idéal</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Réservez facilement votre prochain rendez-vous chez le meilleur barbier près de chez vous.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/search"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  Trouver un barbier
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                >
                  Devenir barbier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <MapPinIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Localisation</h3>
              <p className="mt-2 text-base text-gray-500">
                Trouvez les meilleurs barbiers près de chez vous
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <ClockIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Réservation rapide</h3>
              <p className="mt-2 text-base text-gray-500">
                Réservez en quelques clics, sans attente
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <ScissorsIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Services variés</h3>
              <p className="mt-2 text-base text-gray-500">
                Découvrez une large gamme de services de coiffure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Services populaires</h2>
            <p className="mt-4 text-lg text-gray-600">
              Découvrez nos services les plus demandés
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.name} className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Image du service avec overlay */}
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                    <p className="text-white/90 text-sm">{service.description}</p>
                  </div>
                </div>

                {/* Informations du salon */}
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden ring-4 ring-primary-100">
                      <Image
                        src={service.barber.image}
                        alt={service.barber.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{service.barber.name}</h4>
                      <div className="flex items-center mt-1">
                        <StarIcon className="h-4 w-4 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">{service.barber.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({service.barber.reviews} avis)</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{service.barber.location}</p>
                    </div>
                  </div>

                  {/* Prix et durée */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-semibold text-primary-600">{service.price}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <ClockIcon className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Bouton Réserver */}
                  <button
                    onClick={() => {
                      setSelectedBarber({
                        id: 1, // ID temporaire
                        name: service.barber.name,
                        image: service.barber.image,
                        rating: service.barber.rating,
                        reviews: service.barber.reviews,
                        location: service.barber.location,
                        price: service.price,
                        services: [service.name]
                      });
                      setShowReservation(true);
                    }}
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-primary-500/25"
                  >
                    Réserver maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Système de réservation */}
      {showReservation && selectedBarber && (
        <ReservationSystem
          barber={selectedBarber}
          onClose={() => {
            setShowReservation(false);
            setSelectedBarber(null);
          }}
        />
      )}

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ce que disent nos clients
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Mamadou Diop',
                role: 'Client régulier',
                content: 'Excellent service ! Les barbiers sont professionnels et le système de réservation est très pratique.',
                rating: 5,
              },
              {
                name: 'Abdoulaye Sow',
                role: 'Client',
                content: 'J\'apprécie la facilité de réservation et la qualité des services. Je recommande vivement !',
                rating: 5,
              },
              {
                name: 'Ibrahima Diallo',
                role: 'Client',
                content: 'Une application très utile pour trouver des barbiers de qualité. Le service est impeccable.',
                rating: 5,
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-12 w-12 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-gray-500">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Prêt à commencer ?</span>
            <span className="block text-primary-200">Trouvez votre barbier dès aujourd'hui.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 