'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, StarIcon, MapIcon, ListBulletIcon, HeartIcon, ClockIcon, PhoneIcon, MapPinIcon, XMarkIcon, CalendarIcon, ChatBubbleLeftIcon, ShareIcon, UserIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import BarberMap from '@/components/BarberMap';
import Image from 'next/image';
import ReservationSystem from '@/components/ReservationSystem';
import Link from 'next/link';

// Données de test pour les coiffeurs
const barbers = [
  {
    id: 1,
    name: 'Mamadou Diop',
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
    name: 'Abdoulaye Sow',
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
  // Ajoutez plus de coiffeurs ici
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
    const matchesSearch = barber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         barber.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || barber.location === selectedLocation;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && barber.price.includes('2000')) ||
                        (priceRange === 'medium' && barber.price.includes('2500')) ||
                        (priceRange === 'high' && barber.price.includes('3000'));
    const matchesServices = selectedServices.length === 0 || 
                          selectedServices.every(service => barber.services.includes(service));
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec logo */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/logo.png"
                  alt="Logo Barber App"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Rechercher un barbier</h1>
                <p className="mt-2 text-gray-600">
                  Trouvez le barbier parfait près de chez vous
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-600 hover:text-gray-900">
                  Accueil
                </a>
                <a href="/services" className="text-gray-600 hover:text-gray-900">
                  Services
                </a>
                <a href="/about" className="text-gray-600 hover:text-gray-900">
                  À propos
                </a>
                <a href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="relative flex-1 max-w-xl">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un coiffeur..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filtres
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-primary-500 focus:border-primary-500"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Toutes les zones</option>
                  <option value="Dakar, Sénégal">Dakar</option>
                  <option value="Thiès, Sénégal">Thiès</option>
                  <option value="Saint-Louis, Sénégal">Saint-Louis</option>
                </select>
                <select
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-primary-500 focus:border-primary-500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="all">Tous les prix</option>
                  <option value="low">Moins de 2000 FCFA</option>
                  <option value="medium">2000-3000 FCFA</option>
                  <option value="high">Plus de 3000 FCFA</option>
                </select>
                <select
                  className="border border-gray-300 rounded-md px-4 py-2 focus:ring-primary-500 focus:border-primary-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Meilleure note</option>
                  <option value="price">Prix croissant</option>
                  <option value="reviews">Plus d'avis</option>
                  <option value="distance">Plus proche</option>
                  <option value="experience">Plus d'expérience</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
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
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedServices.includes(service)
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Note minimum</h3>
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          minRating === rating
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {rating}★ et plus
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Boutons de vue */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            {sortedBarbers.length} coiffeurs trouvés
          </div>
          <div className="bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setShowMap(true)}
              className={`p-2 rounded-md ${
                showMap ? 'bg-primary-100 text-primary-800' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MapIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowMap(false)}
              className={`p-2 rounded-md ${
                !showMap ? 'bg-primary-100 text-primary-800' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ListBulletIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Liste des coiffeurs */}
          <div className={`${showMap ? 'w-1/2' : 'w-full'}`}>
            {isLoading ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                {sortedBarbers.map((barber) => (
                  <div 
                    key={barber.id} 
                    className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedBarber === barber.id ? 'bg-primary-50' : ''
                    }`}
                    onClick={() => handleBarberClick(barber)}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Section photo et logo */}
                      <div className="flex flex-col items-center">
                        <div className="relative h-20 w-20">
                          <Image
                            src={barber.image}
                            alt={barber.name}
                            fill
                            className="rounded-full object-cover"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(barber.id);
                            }}
                            className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                          >
                            <HeartIcon 
                              className={`h-4 w-4 ${
                                favorites.includes(barber.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                              }`}
                            />
                          </button>
                        </div>
                        <div className="mt-2 relative h-10 w-10">
                          <Image
                            src={barber.logo}
                            alt={`Logo ${barber.name}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Section informations */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 truncate">{barber.name}</h3>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{barber.location}</span>
                              <span className="mx-2">•</span>
                              <span>{barber.distance}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <StarIcon className="h-5 w-5 text-yellow-400" />
                            <span className="ml-1 text-sm text-gray-600">{barber.rating}</span>
                            <span className="ml-1 text-sm text-gray-500">({barber.reviews} avis)</span>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm text-gray-600">{barber.specialties.join(' • ')}</p>
                          <p className="mt-1 text-sm text-gray-500">{barber.experience} d'expérience</p>
                        </div>

                        {/* Services et prix */}
                        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex flex-wrap gap-2">
                            {barber.services.map((service) => (
                              <span
                                key={service}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                          <span className="text-lg font-semibold text-primary-600 md:ml-auto">
                            {barber.price}
                          </span>
                        </div>

                        {/* Disponibilité et contact */}
                        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-4">
                            <span className="text-sm text-green-600 flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                              {barber.availability}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <PhoneIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                              {barber.phone}
                            </span>
                          </div>
                          <button
                            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 whitespace-nowrap"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBarberDetails(barber);
                              setShowReservation(true);
                              setIsModalOpen(false);
                            }}
                          >
                            Réserver
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Carte */}
          {showMap && (
            <div className="w-1/2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Carte des coiffeurs</h2>
                  <button
                    onClick={() => setShowMap(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Masquer la carte
                  </button>
                </div>
                <div className="h-[600px] rounded-lg overflow-hidden relative z-0">
                  <BarberMap barbers={sortedBarbers} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
    </div>
  );
} 