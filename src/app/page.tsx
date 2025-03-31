'use client';

import Link from 'next/link';
import { MapPinIcon, ClockIcon, ScissorsIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import ReservationSystem from '@/components/ReservationSystem';
import { motion } from 'framer-motion';

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
        id: 1,
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
        id: 2,
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
        id: 1,
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
        id: 2,
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
        id: 2,
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
        id: 1,
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
        id: 1,
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
        id: 2,
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
        id: 1,
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
      {/* Hero Section - Niveau 1 */}
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Trouvez votre</span>
              <span className="block text-primary-200">barbier idéal</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-primary-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Réservez facilement votre prochain rendez-vous chez le meilleur barbier près de chez vous.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow-lg">
                <Link
                  href="/search"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-900 bg-white hover:bg-primary-50 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                >
                  Trouver un barbier
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                >
                  Devenir barbier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Niveau 2 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi nous choisir ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une expérience de réservation simple et efficace pour vos besoins de coiffure
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-primary-50 p-4 rounded-full">
                  <MapPinIcon className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Localisation</h3>
              <p className="text-gray-600">
                Trouvez les meilleurs barbiers près de chez vous
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-primary-50 p-4 rounded-full">
                  <ClockIcon className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Réservation rapide</h3>
              <p className="text-gray-600">
                Réservez en quelques clics, sans attente
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-primary-50 p-4 rounded-full">
                  <ScissorsIcon className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Services variés</h3>
              <p className="text-gray-600">
                Découvrez une large gamme de services de coiffure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Salons Populaires - Niveau 3 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Salons Populaires</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les meilleurs salons de coiffure de Dakar, sélectionnés pour leur qualité de service et leur expertise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: 'Salon Elite',
                location: 'Dakar, Sénégal',
                rating: 4.8,
                reviews: 128,
                image: '/images/barbers/barber1.jpg',
                description: 'Un salon de coiffure haut de gamme offrant des services personnalisés et une expérience unique.',
                services: ['Coupe', 'Barbe', 'Coloration']
              },
              {
                id: 2,
                name: 'Barber Shop Premium',
                location: 'Dakar, Sénégal',
                rating: 4.9,
                reviews: 256,
                image: '/images/barbers/barber2.jpg',
                description: 'Le meilleur salon de barbier traditionnel avec une touche moderne.',
                services: ['Barbe', 'Dégradé', 'Tresse']
              },
              {
                id: 3,
                name: 'Style & Co',
                location: 'Dakar, Sénégal',
                rating: 4.7,
                reviews: 98,
                image: '/images/barbers/barber3.jpg',
                description: 'Un salon moderne spécialisé dans les coupes tendance et les soins capillaires.',
                services: ['Coupe', 'Coloration', 'Soins']
              },
              {
                id: 4,
                name: 'Afro Style',
                location: 'Dakar, Sénégal',
                rating: 4.9,
                reviews: 167,
                image: '/images/barbers/barber4.jpg',
                description: 'Spécialiste des coupes afro et des styles traditionnels africains.',
                services: ['Coupe Afro', 'Tresse', 'Soins']
              },
              {
                id: 5,
                name: 'Modern Cuts',
                location: 'Dakar, Sénégal',
                rating: 4.6,
                reviews: 89,
                image: '/images/barbers/barber5.jpg',
                description: 'Salon contemporain offrant les dernières tendances de coiffure.',
                services: ['Dégradé', 'Coloration', 'Coupe']
              },
              {
                id: 6,
                name: 'Luxury Barbers',
                location: 'Dakar, Sénégal',
                rating: 4.8,
                reviews: 145,
                image: '/images/barbers/barber6.jpg',
                description: 'Une expérience de luxe avec des services premium et personnalisés.',
                services: ['Coupe', 'Barbe', 'Soins']
              }
            ].map((salon) => (
              <motion.div
                key={salon.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48">
                  <Image
                    src={salon.image}
                    alt={salon.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{salon.name}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{salon.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(salon.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">({salon.reviews} avis)</span>
                  </div>
                  <p className="text-gray-600 mb-4 flex-grow">{salon.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {salon.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/salon/${salon.id}`}
                    className="block w-full text-center bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Voir le salon
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Niveau 4 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les expériences de nos clients satisfaits
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              <div key={testimonial.name} className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-primary-50 p-3 rounded-full">
                    <UserGroupIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Niveau 5 */}
      <section className="bg-primary-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Prêt à commencer ?</span>
            <span className="block text-primary-200">Trouvez votre barbier dès aujourd'hui.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow-lg">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-900 bg-white hover:bg-primary-50 transition-all duration-300"
              >
                Commencer maintenant
              </Link>
            </div>
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
    </main>
  );
} 