'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, StarIcon, MapIcon, ListBulletIcon, HeartIcon, ClockIcon, PhoneIcon, MapPinIcon, XMarkIcon, CalendarIcon, ChatBubbleLeftIcon, ShareIcon, UserIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import BarberMap from '@/components/BarberMap';
import Image from 'next/image';
import ReservationSystem from '@/components/ReservationSystem';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Données de test pour les coiffeurs
const barbers = [
  {
    id: 1,
    name: 'Style & Co',
    location: 'Dakar, Sénégal',
    rating: 4.8,
    reviews: 128,
    services: ['Coupe', 'Barbe', 'Dégradé'],
    image: '/images/barbers/barber1.jpg',
    logo: '/images/logos/salon1.png',
    price: 'À partir de 2000 FCFA',
    description: 'Spécialiste des coupes modernes et tendance',
    coordinates: { lat: 14.7167, lng: -17.4677 },
    availability: 'Disponible aujourd\'hui',
    distance: '2.5 km',
    phone: '+221 77 777 77 77',
    openingHours: 'Lun-Sam: 9h-20h',
    specialties: ['Coupes modernes', 'Dégradés', 'Barbe'],
    experience: '5 ans',
    languages: ['Français', 'Wolof'],
    isFavorite: false
  },
  {
    id: 2,
    name: 'Afro Style',
    location: 'Dakar, Sénégal',
    rating: 4.9,
    reviews: 256,
    services: ['Coupe', 'Barbe', 'Tresse'],
    image: '/images/barbers/barber2.jpg',
    logo: '/images/logos/salon2.png',
    price: 'À partir de 2500 FCFA',
    description: 'Expert en tressage et coupes traditionnelles',
    coordinates: { lat: 14.7167, lng: -17.4677 },
    availability: 'Prochain rendez-vous: 14:00',
    distance: '3.1 km',
    phone: '+221 77 888 88 88',
    openingHours: 'Lun-Dim: 8h-22h',
    specialties: ['Tressage', 'Coupes traditionnelles', 'Barbe'],
    experience: '8 ans',
    languages: ['Français', 'Wolof', 'Anglais'],
    isFavorite: false
  },
  {
    id: 3,
    name: 'Modern Cuts',
    location: 'Dakar, Sénégal',
    rating: 4.7,
    reviews: 189,
    services: ['Coupe', 'Barbe', 'Coloration'],
    image: '/images/barbers/barber3.jpg',
    logo: '/images/logos/salon3.png',
    price: 'À partir de 3000 FCFA',
    description: 'Spécialiste des coupes afro et coloration',
    coordinates: { lat: 14.7167, lng: -17.4677 },
    availability: 'Disponible aujourd\'hui',
    distance: '4.2 km',
    phone: '+221 77 999 99 99',
    openingHours: 'Lun-Sam: 10h-21h',
    specialties: ['Coupes afro', 'Coloration', 'Barbe'],
    experience: '6 ans',
    languages: ['Français', 'Wolof'],
    isFavorite: false
  },
  {
    id: 4,
    name: 'Luxury Barbers',
    location: 'Dakar, Sénégal',
    rating: 4.6,
    reviews: 145,
    services: ['Coupe', 'Barbe', 'Dégradé', 'Tresse'],
    image: '/images/barbers/barber4.jpg',
    logo: '/images/logos/salon4.png',
    price: 'À partir de 2800 FCFA',
    description: 'Expert en coupes tendance et tressage',
    coordinates: { lat: 14.7167, lng: -17.4677 },
    availability: 'Prochain rendez-vous: 15:30',
    distance: '1.8 km',
    phone: '+221 77 666 66 66',
    openingHours: 'Lun-Dim: 9h-23h',
    specialties: ['Coupes tendance', 'Tressage', 'Dégradés'],
    experience: '7 ans',
    languages: ['Français', 'Wolof', 'Anglais'],
    isFavorite: false
  },
  {
    id: 5,
    name: 'Urban Style',
    location: 'Dakar, Sénégal',
    rating: 4.9,
    reviews: 312,
    services: ['Coupe', 'Barbe', 'Coloration', 'Dégradé'],
    image: '/images/barbers/barber5.jpg',
    logo: '/images/logos/salon5.png',
    price: 'À partir de 3500 FCFA',
    description: 'Maître barbier spécialisé dans les coupes modernes',
    coordinates: { lat: 14.7167, lng: -17.4677 },
    availability: 'Disponible aujourd\'hui',
    distance: '5.5 km',
    phone: '+221 77 555 55 55',
    openingHours: 'Lun-Sam: 8h-20h',
    specialties: ['Coupes modernes', 'Coloration', 'Dégradés'],
    experience: '10 ans',
    languages: ['Français', 'Wolof', 'Anglais'],
    isFavorite: false
  },
  {
    id: 6,
    name: 'Classic Barbershop',
    location: 'Dakar, Sénégal',
    rating: 4.5,
    reviews: 98,
    services: ['Coupe', 'Barbe', 'Tresse', 'Dégradé'],
    image: '/images/barbers/barber6.jpg',
    logo: '/images/logos/salon6.png',
    price: 'À partir de 2200 FCFA',
    description: 'Spécialiste des tresses et coupes traditionnelles',
    coordinates: { lat: 14.7167, lng: -17.4677 },
    availability: 'Prochain rendez-vous: 16:00',
    distance: '3.8 km',
    phone: '+221 77 444 44 44',
    openingHours: 'Lun-Sam: 9h-22h',
    specialties: ['Tresses', 'Coupes traditionnelles', 'Dégradés'],
    experience: '4 ans',
    languages: ['Français', 'Wolof'],
    isFavorite: false
  }
];

const services = [
  'Coupe',
  'Barbe',
  'Dégradé',
  'Tresse',
  'Coloration',
  'Coupe + Barbe'
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState('all');
  const [showMap, setShowMap] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBarberDetails, setSelectedBarberDetails] = useState<typeof barbers[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    service: '',
    name: '',
    phone: '',
    notes: ''
  });
  const modalRef = useRef<HTMLDivElement>(null);

  // Géolocalisation de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
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

  // Simulation de chargement
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedLocation, priceRange, selectedServices, minRating]);

  // Gestion de la fermeture du modal avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setSelectedBarberDetails(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Gestion du clic en dehors du modal
  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
      setSelectedBarberDetails(null);
    }
  };

  const toggleFavorite = (barberId: number) => {
    setFavorites(prev =>
      prev.includes(barberId)
        ? prev.filter(id => id !== barberId)
        : [...prev, barberId]
    );
  };

  const filteredBarbers = barbers.filter(barber => {
    // Filtre par recherche (nom ou localisation)
    const matchesSearch = barber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         barber.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre par localisation sélectionnée
    const matchesLocation = !selectedLocation || barber.location === selectedLocation;
    
    // Filtre par prix
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && parseInt(barber.price) <= 2000) ||
                        (priceRange === 'medium' && parseInt(barber.price) > 2000 && parseInt(barber.price) <= 3000) ||
                        (priceRange === 'high' && parseInt(barber.price) > 3000);
    
    // Filtre par services
    const matchesServices = selectedServices.length === 0 || 
                          selectedServices.every(service => 
                            barber.services.some(s => 
                              s.toLowerCase().includes(service.toLowerCase())
                            )
                          );
    
    // Filtre par note minimale
    const matchesRating = barber.rating >= minRating;
    
    return matchesSearch && matchesLocation && matchesPrice && matchesServices && matchesRating;
  });

  const sortedBarbers = [...filteredBarbers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return parseInt(a.price) - parseInt(b.price);
      case 'reviews':
        return b.reviews - a.reviews;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      default:
        return 0;
    }
  });

  // Modifier le clic sur la carte pour ouvrir la modal
  const handleBarberClick = (barber: typeof barbers[0]) => {
    setSelectedBarber(barber.id);
    setSelectedBarberDetails(barber);
    setIsModalOpen(true);
    setShowReservation(false);
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer la réservation à votre backend
    console.log('Réservation soumise:', reservationData);
    setShowReservation(false);
    // Réinitialiser le formulaire
    setReservationData({
      date: '',
      time: '',
      service: '',
      name: '',
      phone: '',
      notes: ''
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section - Niveau 1 */}
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Trouvez votre barbier</h1>
            <p className="text-xl text-primary-100 mb-8">
              Recherchez par localisation ou service
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Entrez votre localisation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white/90 border-2 border-white/20 focus:border-white focus:ring-2 focus:ring-white/50 transition-all duration-300"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Service recherché..."
                    value={selectedServices.join(', ')}
                    onChange={(e) => setSelectedServices(e.target.value.split(',').map(s => s.trim()))}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white/90 border-2 border-white/20 focus:border-white focus:ring-2 focus:ring-white/50 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres Section - Niveau 2 */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setSelectedServices([])}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedServices.length === 0 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tous les services
            </button>
            {services.map((service) => (
              <button
                key={service}
                onClick={() => {
                  setSelectedServices(prev => 
                    prev.includes(service)
                      ? prev.filter(s => s !== service)
                      : [...prev, service]
                  );
                }}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedServices.includes(service)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Résultats Section - Niveau 3 */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBarbers.map((barber) => (
              <motion.div
                key={barber.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={barber.image}
                    alt={barber.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{barber.name}</h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{barber.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(barber.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">({barber.reviews} avis)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {barber.services.map((service, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary-600 font-medium">{barber.price}</span>
                    <span className="text-gray-500 text-sm">{barber.distance}</span>
                  </div>
                  <Link
                    href={`/salon/${barber.id}`}
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

      {/* Modal de détails du coiffeur */}
      {selectedBarberDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* En-tête du modal avec dégradé */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white">
                    <Image
                      src={selectedBarberDetails.image}
                      alt={selectedBarberDetails.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold text-white">{selectedBarberDetails.name}</h2>
                      <button
                        onClick={() => toggleFavorite(selectedBarberDetails.id)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <HeartIcon 
                          className={`h-5 w-5 ${
                            favorites.includes(selectedBarberDetails.id) ? 'text-red-500 fill-current' : 'text-white'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className={`w-5 h-5 ${
                              star <= selectedBarberDetails.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white/80">({selectedBarberDetails.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/reservation?barberId=${selectedBarberDetails.id}&barberName=${encodeURIComponent(selectedBarberDetails.name)}`}
                    className="bg-white text-primary-600 hover:bg-white/90 transition-colors px-4 py-2 rounded-full flex items-center space-x-2 font-medium"
                  >
                    <CalendarIcon className="w-5 h-5" />
                    <span>Réserver</span>
                  </Link>
                  <button
                    onClick={() => {
                      navigator.share({
                        title: selectedBarberDetails.name,
                        text: `Découvrez ${selectedBarberDetails.name} sur Barber App`,
                        url: window.location.href
                      });
                    }}
                    className="text-white hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-full"
                  >
                    <ShareIcon className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedBarberDetails(null)}
                    className="text-white hover:text-white/80 transition-colors p-2 hover:bg-white/10 rounded-full"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            {/* Section photos */}
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Photos de réalisations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/services/coupe.svg"
                    alt="Réalisation 1"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/services/barbe.svg"
                    alt="Réalisation 2"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/services/degrade.svg"
                    alt="Réalisation 3"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/services/coupe-barbe.svg"
                    alt="Réalisation 4"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            {/* Reste du contenu du modal */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Informations principales */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">À propos</h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">{selectedBarberDetails.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Spécialités</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedBarberDetails.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Services proposés</h3>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {selectedBarberDetails.services.map((service) => (
                        <div
                          key={service}
                          className="flex items-center text-sm text-gray-600 bg-gray-50 p-2 rounded-lg"
                        >
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Informations de contact et disponibilité */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Informations de contact</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <MapPinIcon className="h-5 w-5 mr-3 text-gray-400" />
                        {selectedBarberDetails.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <PhoneIcon className="h-5 w-5 mr-3 text-gray-400" />
                        {selectedBarberDetails.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <ClockIcon className="h-5 w-5 mr-3 text-gray-400" />
                        {selectedBarberDetails.openingHours}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Disponibilité</h3>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-800">
                        {selectedBarberDetails.availability}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Tarifs</h3>
                    <div className="mt-2">
                      <p className="text-3xl font-bold text-primary-600">{selectedBarberDetails.price}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Langues parlées</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedBarberDetails.languages.map((language) => (
                        <span
                          key={language}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de réservation */}
      {showReservation && selectedBarberDetails && (
        <ReservationSystem
          barber={selectedBarberDetails}
          onClose={() => {
            setShowReservation(false);
            setSelectedBarberDetails(null);
            setIsModalOpen(false);
          }}
        />
      )}
    </main>
  );
} 