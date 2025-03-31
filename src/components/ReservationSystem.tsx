import { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon, ChatBubbleLeftIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface Barber {
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
  services: Array<{
    name: string;
    price: string;
    duration: string;
    description: string;
    image: string;
  }>;
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
  services: Array<SalonService>;
}

interface SalonService {
  name: string;
  price: string;
  duration: string;
  description: string;
  image: string;
}

interface Props {
  barber: Salon;
  onClose: () => void;
  initialService?: SalonService | null;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function ReservationSystem({ barber, onClose, initialService }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<SalonService | null>(initialService || null);
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    {
      name: 'Coupe',
      price: '2000 FCFA'
    },
    {
      name: 'Barbe',
      price: '1500 FCFA'
    },
    {
      name: 'Coupe + Barbe',
      price: '3000 FCFA'
    },
    {
      name: 'Dégradé',
      price: '2500 FCFA'
    },
    {
      name: 'Tresse',
      price: '5000 FCFA'
    },
    {
      name: 'Coloration',
      price: '4000 FCFA'
    },
    {
      name: 'Coupe Afro',
      price: '3500 FCFA'
    },
    {
      name: 'Soins Cheveux',
      price: '3000 FCFA'
    },
    {
      name: 'Coupe + Soins',
      price: '4500 FCFA'
    }
  ];

  const additionalServices = [
    {
      name: 'Teinte',
      price: '3000 FCFA'
    },
    {
      name: 'Décoloration',
      price: '4000 FCFA'
    },
    {
      name: 'Mèches',
      price: '5000 FCFA'
    },
    {
      name: 'Soins Hydratants',
      price: '2000 FCFA'
    },
    {
      name: 'Soins Nourrissants',
      price: '2500 FCFA'
    },
    {
      name: 'Protection Thermique',
      price: '1500 FCFA'
    }
  ];

  // Générer les créneaux horaires disponibles
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots();
      setTimeSlots(slots);
    }
  }, [selectedDate]);

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 20;
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: Math.random() > 0.3 // Simulation de disponibilité
      });
    }
    return slots;
  };

  // Fonction pour calculer le total
  const calculateTotal = () => {
    let total = 0;
    
    // Prix du service principal
    const mainService = services.find(s => s.name === selectedService?.name);
    if (mainService) {
      total += parseInt(mainService.price.replace(/[^0-9]/g, ''));
    }

    // Prix des services supplémentaires
    selectedAdditionalServices.forEach(serviceName => {
      const additionalService = additionalServices.find(s => s.name === serviceName);
      if (additionalService) {
        total += parseInt(additionalService.price.replace(/[^0-9]/g, ''));
      }
    });

    return total.toLocaleString('fr-FR') + ' FCFA';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'une requête API
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[200] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Réservation confirmée !</h2>
            <p className="text-gray-600 mb-6">
              Votre rendez-vous avec {barber.name} a été confirmé.
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[200] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          {/* En-tête */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16">
                <Image
                  src={barber.image}
                  alt={barber.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Réserver avec {barber.name}</h2>
                <p className="mt-1 text-sm text-gray-500">Choisissez votre service et horaire</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Étapes de réservation */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex items-center ${
                    s < 3 ? 'flex-1' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= s
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > s ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Service Principal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {services.map((service) => (
                      <div
                        key={service.name}
                        className={`relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                          selectedService?.name === service.name
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                        onClick={() => setSelectedService(service as SalonService)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900">{service.name}</h3>
                            <span className="text-sm text-primary-600 font-medium">{service.price}</span>
                          </div>
                          <div className={`ml-3 flex-shrink-0 ${selectedService?.name === service.name ? 'text-primary-500' : 'text-gray-300'}`}>
                            <CheckCircleIcon className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedService && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Services Supplémentaires (Optionnel)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {additionalServices.map((service) => (
                        <div
                          key={service.name}
                          className={`relative p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                            selectedAdditionalServices.includes(service.name)
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300'
                          }`}
                          onClick={() => {
                            setSelectedAdditionalServices(prev => 
                              prev.includes(service.name)
                                ? prev.filter(s => s !== service.name)
                                : [...prev, service.name]
                            );
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-base font-medium text-gray-900">{service.name}</h3>
                              <span className="text-sm text-primary-600 font-medium">{service.price}</span>
                            </div>
                            <div className={`ml-3 flex-shrink-0 ${selectedAdditionalServices.includes(service.name) ? 'text-primary-500' : 'text-gray-300'}`}>
                              <CheckCircleIcon className="h-5 w-5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Affichage du total */}
                {(selectedService || selectedAdditionalServices.length > 0) && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-primary-600">{calculateTotal()}</span>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={selectedDate?.toISOString().split('T')[0] || ''}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      min={new Date().toISOString().split('T')[0]}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-2 rounded-md text-sm font-medium transition-colors ${
                          selectedTime === slot.time
                            ? 'bg-primary-600 text-white'
                            : slot.available
                            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedService || !selectedDate || !selectedTime}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                    <ChatBubbleLeftIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (optionnel)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="block w-full border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Ajoutez des détails sur votre demande..."
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!name || !phone || !email}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Principal</span>
                      <span className="font-medium">{selectedService?.name}</span>
                    </div>
                    {selectedAdditionalServices.length > 0 && (
                      <div>
                        <span className="text-gray-600">Services Supplémentaires</span>
                        <ul className="mt-1 space-y-1">
                          {selectedAdditionalServices.map((service) => (
                            <li key={service} className="flex justify-between text-sm">
                              <span className="text-gray-600">{service}</span>
                              <span className="font-medium">
                                {additionalServices.find(s => s.name === service)?.price}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Heure</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nom</span>
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Téléphone</span>
                      <span className="font-medium">{phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium">{email}</span>
                    </div>
                    {notes && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Notes</span>
                        <span className="font-medium">{notes}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-primary-600">{calculateTotal()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Confirmation...' : 'Confirmer la réservation'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 