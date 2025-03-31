'use client';

import { useState, useEffect, Suspense, memo } from 'react';
import Image from 'next/image';
import { MapPinIcon, ClockIcon, StarIcon, PhoneIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ReservationSystem from '@/components/ReservationSystem';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Chargement dynamique du composant ReservationSystem
const DynamicReservationSystem = dynamic(() => import('@/components/ReservationSystem'), {
  loading: () => (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>
  ),
  ssr: false
});

interface SalonService {
  name: string;
  price: string;
  duration: string;
  description: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface News {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
}

interface Realization {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface Salon {
  id: number;
  name: string;
  description: string;
  rating: number;
  reviews: number;
  location: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  services: SalonService[];
  products: Product[];
  news: News[];
  realizations: Realization[];
}

const salonData: Record<number, Salon> = {
  1: {
    id: 1,
    name: 'Salon Elite',
    description: 'Un salon de coiffure haut de gamme offrant des services personnalisés et une expérience unique.',
    rating: 4.8,
    reviews: 128,
    location: 'Dakar, Sénégal',
    address: '123 Avenue de la République, Dakar',
    phone: '+221 77 123 45 67',
    email: 'contact@salonelite.com',
    hours: 'Lun-Sam: 9h-19h, Dim: Fermé',
    image: '/images/barbers/barber1.jpg',
    services: [
      {
        name: 'Coupe',
        price: '2000 FCFA',
        duration: '30-45 min',
        description: 'Coupe de cheveux personnalisée selon vos préférences',
        image: '/images/services/coupe.svg'
      },
      {
        name: 'Coupe + Barbe',
        price: '3000 FCFA',
        duration: '45-60 min',
        description: 'Service complet incluant coupe et barbe',
        image: '/images/services/coupe-barbe.svg'
      },
      {
        name: 'Coloration',
        price: '4000 FCFA',
        duration: '45-60 min',
        description: 'Coloration professionnelle de cheveux',
        image: '/images/services/coloration.svg'
      }
    ],
    products: [
      {
        id: 1,
        name: 'Huile de Barbe Premium',
        price: '5000 FCFA',
        description: 'Huile naturelle pour barbe, hydratante et parfumée',
        image: '/images/products/beard-oil.jpg',
        category: 'Soins'
      },
      {
        id: 2,
        name: 'Kit de Rasage Complet',
        price: '15000 FCFA',
        description: 'Kit complet incluant rasoir, brosse et lotion',
        image: '/images/products/shave-kit.jpg',
        category: 'Accessoires'
      }
    ],
    news: [
      {
        id: 1,
        title: 'Nouvelle Collection Printemps 2024',
        content: 'Découvrez nos nouvelles tendances de coupes pour le printemps',
        date: '15 Mars 2024',
        image: '/images/news/spring-collection.jpg'
      },
      {
        id: 2,
        title: 'Formation Nouvelle Technique',
        content: 'Notre équipe a suivi une formation sur les dernières techniques de coupe',
        date: '10 Mars 2024',
        image: '/images/news/training.jpg'
      }
    ],
    realizations: [
      {
        id: 1,
        title: 'Coupe Dégradée Moderne',
        description: 'Réalisation d\'une coupe dégradée avec effet de texture',
        image: '/images/realizations/fade-cut.jpg',
        category: 'Coupe'
      },
      {
        id: 2,
        title: 'Barbe Sculptée',
        description: 'Taille de barbe professionnelle avec design personnalisé',
        image: '/images/realizations/beard-sculpt.jpg',
        category: 'Barbe'
      },
      {
        id: 3,
        title: 'Tresse Africaine',
        description: 'Tressage traditionnel avec motifs modernes',
        image: '/images/realizations/african-braid.jpg',
        category: 'Tresse'
      },
      {
        id: 4,
        title: 'Coloration Créative',
        description: 'Coloration avec dégradé de couleurs vives',
        image: '/images/realizations/creative-color.jpg',
        category: 'Coloration'
      }
    ]
  },
  2: {
    id: 2,
    name: 'Barber Shop Premium',
    description: 'Le meilleur salon de barbier traditionnel avec une touche moderne.',
    rating: 4.9,
    reviews: 256,
    location: 'Dakar, Sénégal',
    address: '45 Rue des Artisans, Dakar',
    phone: '+221 77 987 65 43',
    email: 'contact@barbershoppremium.com',
    hours: 'Lun-Sam: 10h-20h, Dim: 10h-15h',
    image: '/images/barbers/barber2.jpg',
    services: [
      {
        name: 'Barbe',
        price: '1500 FCFA',
        duration: '20-30 min',
        description: 'Taille de barbe professionnelle et soins',
        image: '/images/services/barbe.svg'
      },
      {
        name: 'Dégradé',
        price: '2500 FCFA',
        duration: '40-50 min',
        description: 'Coupe dégradée moderne et tendance',
        image: '/images/services/degrade.svg'
      },
      {
        name: 'Tresse',
        price: '5000 FCFA',
        duration: '60-90 min',
        description: 'Tressage professionnel de tous types',
        image: '/images/services/tresse.svg'
      }
    ],
    products: [
      {
        id: 3,
        name: 'Pomade Styling',
        price: '4000 FCFA',
        description: 'Pomade naturelle pour un style parfait',
        image: '/images/products/pomade.jpg',
        category: 'Styling'
      },
      {
        id: 4,
        name: 'Ciseaux Professionnels',
        price: '25000 FCFA',
        description: 'Ciseaux de haute qualité pour professionnels',
        image: '/images/products/scissors.jpg',
        category: 'Outils'
      }
    ],
    news: [
      {
        id: 3,
        title: 'Ouverture d\'une Nouvelle Section',
        content: 'Nous avons ouvert une nouvelle section dédiée aux soins capillaires',
        date: '20 Mars 2024',
        image: '/images/news/new-section.jpg'
      },
      {
        id: 4,
        title: 'Partenariat avec L\'Oréal',
        content: 'Nous sommes fiers d\'annoncer notre partenariat avec L\'Oréal',
        date: '5 Mars 2024',
        image: '/images/news/partnership.jpg'
      }
    ],
    realizations: [
      {
        id: 5,
        title: 'Coupe Pompadour',
        description: 'Style rétro moderne avec effet de volume',
        image: '/images/realizations/pompadour.jpg',
        category: 'Coupe'
      },
      {
        id: 6,
        title: 'Barbe Viking',
        description: 'Barbe longue avec entretien professionnel',
        image: '/images/realizations/viking-beard.jpg',
        category: 'Barbe'
      },
      {
        id: 7,
        title: 'Tresse Box Braids',
        description: 'Tresse box braids avec perles décoratives',
        image: '/images/realizations/box-braids.jpg',
        category: 'Tresse'
      },
      {
        id: 8,
        title: 'Coloration Balayage',
        description: 'Effet de balayage naturel et élégant',
        image: '/images/realizations/balayage.jpg',
        category: 'Coloration'
      }
    ]
  }
};

// Composant de chargement pour les images
const ImageWithFallback = ({ src, alt, ...props }: any) => {
  const [error, setError] = useState(false);
  const fallbackImage = '/images/placeholder.svg';

  return (
    <Image
      src={error ? fallbackImage : src}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
};

// Composant de chargement pour les sections
const LoadingSection = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

// Mise à jour des interfaces
interface ServiceCardProps {
  service: SalonService;
  index: number;
  onReserve: (service: SalonService) => void;
}

// Optimisation des composants avec memo
const ServiceCard = memo(({ service, index, onReserve }: ServiceCardProps) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.6 + index * 0.1 }}
    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
  >
    <div className="relative h-32">
      <ImageWithFallback
        src={service.image}
        alt={service.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/90">{service.duration}</span>
          <span className="text-base font-bold text-white">{service.price}</span>
        </div>
      </div>
    </div>
    <div className="p-4">
      <p className="text-sm text-gray-600 mb-3">{service.description}</p>
      <div className="flex items-center justify-between">
        <button 
          className="bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors text-sm"
          onClick={() => onReserve(service)}
        >
          Réserver
        </button>
        <div className="flex items-center space-x-1 text-gray-500 text-sm">
          <ClockIcon className="h-4 w-4" />
          <span>{service.duration}</span>
        </div>
      </div>
    </div>
  </motion.div>
));

const ProductCard = memo(({ product, index }: { product: Product; index: number }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.7 + index * 0.1 }}
    className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
  >
    <div className="relative h-48">
      <ImageWithFallback
        src={product.image}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <span className="text-sm text-primary-600 font-medium">{product.category}</span>
      <h3 className="mt-1 text-lg font-medium text-gray-900">{product.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-primary-600">{product.price}</span>
        <button 
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          aria-label={`Acheter ${product.name}`}
        >
          Acheter
        </button>
      </div>
    </div>
  </motion.div>
));

const NewsCard = memo(({ news, index }: { news: News; index: number }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.9 + index * 0.1 }}
    className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
  >
    <div className="relative h-48">
      <ImageWithFallback
        src={news.image}
        alt={news.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <span className="text-sm text-gray-500">{news.date}</span>
      <h3 className="mt-1 text-lg font-medium text-gray-900">{news.title}</h3>
      <p className="mt-2 text-sm text-gray-600">{news.content}</p>
    </div>
  </motion.div>
));

const RealizationCard = memo(({ realization, index }: { realization: Realization; index: number }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.9 + index * 0.1 }}
    className="group relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
  >
    <ImageWithFallback
      src={realization.image}
      alt={realization.title}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-300"
    />
  </motion.div>
));

// Composant de navigation optimisé
const TabNavigation = memo(({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => (
  <div className="flex justify-center space-x-4 mb-8 overflow-x-auto pb-2">
    {['services', 'produits', 'actualités', 'réalisations'].map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
          activeTab === tab
            ? 'bg-primary-600 text-white'
            : 'bg-white text-gray-600 hover:bg-gray-50'
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
));

// Mise à jour des interfaces
interface DynamicContentProps {
  activeTab: string;
  salon: Salon;
  onReserve: (service: SalonService) => void;
}

interface ReservationSystemProps {
  barber: Salon;
  onClose: () => void;
  initialService?: SalonService | null;
}

// Mise à jour du composant DynamicContent
const DynamicContent = memo(({ activeTab, salon, onReserve }: DynamicContentProps) => {
  const content = {
    services: (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-8"
      >
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Nos Services</h2>
          <p className="text-gray-600 mb-6">
            Découvrez notre gamme complète de services de coiffure et de soins capillaires, 
            réalisés par nos experts passionnés pour vous offrir le meilleur de la coiffure.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {salon.services.map((service, index) => (
              <ServiceCard 
                key={service.name} 
                service={service} 
                index={index} 
                onReserve={onReserve}
              />
            ))}
          </div>
        </div>
      </motion.div>
    ),
    produits: (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-2xl font-semibold mb-6">Nos Produits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salon.products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </motion.div>
    ),
    actualités: (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-2xl font-semibold mb-6">Actualités</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {salon.news.map((news, index) => (
            <NewsCard key={news.id} news={news} index={index} />
          ))}
        </div>
      </motion.div>
    ),
    réalisations: (
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-2xl font-semibold mb-6">Nos Réalisations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {salon.realizations.map((realization, index) => (
            <RealizationCard key={realization.id} realization={realization} index={index} />
          ))}
        </div>
      </motion.div>
    )
  };

  return content[activeTab as keyof typeof content] || null;
});

export default function SalonPage({ params }: { params: { id: string } }) {
  const salonId = parseInt(params.id);
  const salon = salonData[salonId];
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const [selectedService, setSelectedService] = useState<SalonService | null>(null);

  // Mise à jour des services pour correspondre au système de réservation
  const updatedServices = [
    {
      name: 'Coupe de cheveux',
      price: '2000 FCFA',
      duration: '30 min',
      description: 'Coupe de cheveux personnalisée selon vos préférences',
      image: '/images/services/coupe.svg'
    },
    {
      name: 'Coupe + Barbe',
      price: '3000 FCFA',
      duration: '45 min',
      description: 'Service complet incluant coupe et barbe',
      image: '/images/services/coupe-barbe.svg'
    },
    {
      name: 'Coloration',
      price: '4000 FCFA',
      duration: '60 min',
      description: 'Coloration professionnelle de cheveux',
      image: '/images/services/coloration.svg'
    },
    {
      name: 'Tresse',
      price: '5000 FCFA',
      duration: '90 min',
      description: 'Tressage professionnel de tous types',
      image: '/images/services/tresse.svg'
    },
    {
      name: 'Dégradé',
      price: '2500 FCFA',
      duration: '45 min',
      description: 'Coupe dégradée moderne et tendance',
      image: '/images/services/degrade.svg'
    },
    {
      name: 'Barbe',
      price: '1500 FCFA',
      duration: '30 min',
      description: 'Taille de barbe professionnelle et soins',
      image: '/images/services/barbe.svg'
    }
  ];

  if (!salon) {
    return <div>Salon non trouvé</div>;
  }

  // Créer une copie du salon avec les services mis à jour
  const salonWithUpdatedServices = {
    ...salon,
    services: updatedServices
  };

  const handleReserve = (service: SalonService) => {
    setSelectedService(service);
    setShowReservationModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête avec image de fond */}
      <div className="relative h-96">
        <ImageWithFallback
          src={salon.image}
          alt={salon.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">{salon.name}</h1>
            <p className="text-xl mb-8 text-white/90">{salon.location}</p>
            <button
              onClick={() => setShowReservationModal(true)}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section À propos et informations complémentaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Colonne de gauche - À propos */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">À propos</h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">{salon.description}</p>
            
            {/* Informations de contact */}
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex items-center text-gray-700 hover:text-primary-600 transition-colors">
                <MapPinIcon className="h-5 w-5 mr-3 text-primary-600" />
                <span>{salon.address}</span>
              </div>
              <div className="flex items-center text-gray-700 hover:text-primary-600 transition-colors">
                <PhoneIcon className="h-5 w-5 mr-3 text-primary-600" />
                <span>{salon.phone}</span>
              </div>
              <div className="flex items-center text-gray-700 hover:text-primary-600 transition-colors">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-primary-600" />
                <span>{salon.email}</span>
              </div>
              <div className="flex items-center text-gray-700 hover:text-primary-600 transition-colors">
                <ClockIcon className="h-5 w-5 mr-3 text-primary-600" />
                <span>{salon.hours}</span>
              </div>
            </div>
          </motion.div>

          {/* Colonne de droite - Informations supplémentaires */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          >
            <div className="space-y-6">
              {/* Statistiques */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg border border-primary-100">
                  <span className="text-gray-700 font-medium">Années d'expérience</span>
                  <span className="text-2xl font-bold text-primary-600">5+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg border border-primary-100">
                  <span className="text-gray-700 font-medium">Clients satisfaits</span>
                  <span className="text-2xl font-bold text-primary-600">1000+</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg border border-primary-100">
                  <span className="text-gray-700 font-medium">Services réalisés</span>
                  <span className="text-2xl font-bold text-primary-600">5000+</span>
                </div>
              </div>

              {/* Horaires d'ouverture */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Horaires d'ouverture</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Lundi - Samedi</span>
                    <span className="font-medium text-primary-600">9h - 19h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Dimanche</span>
                    <span className="font-medium text-primary-600">Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation des onglets */}
        <div className="sticky top-0 z-10 bg-white py-4 -mx-4 px-4 border-b shadow-sm">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Contenu dynamique basé sur l'onglet actif */}
        <div className="mt-8">
          <Suspense fallback={<LoadingSection />}>
            <DynamicContent 
              activeTab={activeTab} 
              salon={salonWithUpdatedServices} 
              onReserve={handleReserve}
            />
          </Suspense>
        </div>
      </div>

      {/* Modal de réservation */}
      <AnimatePresence>
        {showReservationModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Réserver un service</h2>
                <button
                  onClick={() => {
                    setShowReservationModal(false);
                    setSelectedService(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <ReservationSystem 
                barber={salon} 
                onClose={() => {
                  setShowReservationModal(false);
                  setSelectedService(null);
                }}
                initialService={selectedService}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 