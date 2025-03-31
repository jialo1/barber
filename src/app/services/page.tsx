'use client';

import { useState, useMemo } from 'react';
import { ClockIcon, CurrencyDollarIcon, SparklesIcon, StarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Catégories de services
const categories = [
  { id: 'all', name: 'Tous les salons' },
  { id: 'epilation', name: 'Épilation' },
  { id: 'visage', name: 'Soins du visage' },
  { id: 'massage', name: 'Massage' },
  { id: 'corps', name: 'Soins du corps' },
  { id: 'cheveux', name: 'Soins capillaires' }
];

const salons = [
  {
    id: 1,
    name: 'Beauté & Bien-être',
    location: 'Abidjan, Cocody',
    rating: 4.8,
    reviews: 128,
    description: 'Centre de beauté complet offrant une large gamme de services esthétiques et de bien-être',
    services: ['Épilation', 'Soins du visage', 'Massage', 'Soins du corps'],
    image: '/images/salons/beaute-bien-etre.jpg',
    openingHours: 'Lun-Sam: 9h-20h',
    priceRange: '3000-8000 FCFA'
  },
  {
    id: 2,
    name: 'Spa Zen',
    location: 'Abidjan, Marcory',
    rating: 4.9,
    reviews: 156,
    description: 'Spa luxueux spécialisé dans les soins du corps et les massages relaxants',
    services: ['Massage', 'Soins du corps', 'Soins du visage'],
    image: '/images/salons/spa-zen.jpg',
    openingHours: 'Lun-Dim: 10h-22h',
    priceRange: '4000-10000 FCFA'
  },
  {
    id: 3,
    name: 'Institut de Beauté',
    location: 'Abidjan, Deux Plateaux',
    rating: 4.7,
    reviews: 98,
    description: 'Institut de beauté professionnel offrant des services complets de soins esthétiques',
    services: ['Épilation', 'Soins du visage', 'Soins des mains et pieds'],
    image: '/images/salons/institut-beaute.jpg',
    openingHours: 'Lun-Sam: 9h-19h',
    priceRange: '3500-9000 FCFA'
  },
  {
    id: 4,
    name: 'Wellness Center',
    location: 'Abidjan, Riviera',
    rating: 4.6,
    reviews: 142,
    description: 'Centre de bien-être moderne avec des services variés de soins esthétiques',
    services: ['Massage', 'Soins du corps', 'Soins capillaires'],
    image: '/images/salons/wellness-center.jpg',
    openingHours: 'Lun-Sam: 8h-21h',
    priceRange: '3000-7500 FCFA'
  },
  {
    id: 5,
    name: 'Beauté Express',
    location: 'Abidjan, Plateau',
    rating: 4.5,
    reviews: 87,
    description: 'Salon de beauté rapide et efficace pour vos soins quotidiens',
    services: ['Épilation', 'Soins des mains et pieds', 'Soins capillaires'],
    image: '/images/salons/beaute-express.jpg',
    openingHours: 'Lun-Sam: 8h-20h',
    priceRange: '2500-6000 FCFA'
  },
  {
    id: 6,
    name: 'Luxe & Beauté',
    location: 'Abidjan, Cocody Angré',
    rating: 4.9,
    reviews: 167,
    description: 'Institut de beauté haut de gamme avec des services premium',
    services: ['Soins du visage', 'Massage', 'Soins du corps', 'Soins capillaires'],
    image: '/images/salons/luxe-beaute.jpg',
    openingHours: 'Lun-Dim: 9h-22h',
    priceRange: '5000-12000 FCFA'
  }
];

export default function ServicesPage() {
  const [selectedSalon, setSelectedSalon] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les salons en fonction de la catégorie et de la recherche
  const filteredSalons = useMemo(() => {
    return salons.filter(salon => {
      const matchesCategory = selectedCategory === 'all' || 
                            salon.services.some(service => 
                              service.toLowerCase().includes(selectedCategory.toLowerCase())
                            );
      const matchesSearch = salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          salon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          salon.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Niveau 1 */}
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Salons de Beauté</h1>
            <p className="text-xl text-primary-100 mb-8">
              Découvrez les meilleurs salons de beauté et instituts de bien-être
            </p>
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Rechercher un salon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white/90 border-2 border-white/20 focus:border-white focus:ring-2 focus:ring-white/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filtres Section - Niveau 2 */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Salons Section - Niveau 3 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSalons.map((salon) => (
                <motion.div
                  key={salon.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={salon.image}
                      alt={salon.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={salon.id <= 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{salon.name}</h3>
                      <div className="flex items-center text-white/90 text-sm">
                        <span>{salon.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-gray-900 font-medium">{salon.rating}</span>
                      <span className="text-gray-500 ml-1">({salon.reviews} avis)</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{salon.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {salon.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-medium">{salon.priceRange}</span>
                      <Link
                        href={`/salon/${salon.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Voir le salon →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal de détails */}
      <AnimatePresence>
        {selectedSalon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {salons.find(s => s.id === selectedSalon)?.name}
                  </h2>
                  <button
                    onClick={() => setSelectedSalon(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Fermer</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={salons.find(s => s.id === selectedSalon)?.image || ''}
                      alt={salons.find(s => s.id === selectedSalon)?.name || ''}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-gray-900 font-medium">
                        {salons.find(s => s.id === selectedSalon)?.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({salons.find(s => s.id === selectedSalon)?.reviews} avis)
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>{salons.find(s => s.id === selectedSalon)?.openingHours}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {salons.find(s => s.id === selectedSalon)?.description}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Services proposés :</h3>
                    <div className="flex flex-wrap gap-2">
                      {salons.find(s => s.id === selectedSalon)?.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CurrencyDollarIcon className="h-5 w-5 mr-2 text-primary-600" />
                    <span>Prix : {salons.find(s => s.id === selectedSalon)?.priceRange}</span>
                  </div>
                  <Link
                    href={`/salon/${selectedSalon}`}
                    className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-300"
                  >
                    Voir le salon et réserver
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 