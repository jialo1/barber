'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BuildingOfficeIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon, ScissorsIcon } from '@heroicons/react/24/outline';

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  description?: string;
  services: Array<string[]>;
  workingHours: string[];
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  description: string;
  services: Array<{ name: string; price: string; duration: string }>;
  workingHours: Array<{ open: string; close: string }>;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  location: '',
  description: '',
  services: [{ name: '', price: '', duration: '' }],
  workingHours: Array(7).fill({ open: '', close: '' }),
};

const initialErrors: FormErrors = {
  services: Array(initialFormData.services.length).fill([]),
  workingHours: Array(7).fill('')
};

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const validateForm = () => {
    const newErrors: FormErrors = {
      services: Array(formData.services.length).fill([]),
      workingHours: Array(7).fill('')
    };
    
    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du salon est requis';
    }

    // Validation du téléphone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^(\+221|0)[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation de la localisation
    if (!formData.location.trim()) {
      newErrors.location = 'La localisation est requise';
    }

    // Validation de la description
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    // Validation des services
    formData.services.forEach((service, index) => {
      const serviceErrors: string[] = [];
      if (!service.name.trim()) serviceErrors.push('Nom du service requis');
      if (!service.price.trim()) serviceErrors.push('Prix requis');
      if (!service.duration.trim()) serviceErrors.push('Durée requise');
      if (serviceErrors.length > 0) {
        newErrors.services[index] = serviceErrors;
      }
    });

    // Validation des horaires
    formData.workingHours.forEach((hours, index) => {
      if (!hours.open || !hours.close) {
        newErrors.workingHours[index] = 'Horaires incomplets';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...formData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData({ ...formData, services: newServices });
    // Effacer l'erreur du service modifié
    if (errors.services && errors.services[index]) {
      const newErrors = { ...errors };
      newErrors.services[index] = [];
      setErrors(newErrors);
    }
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: '', price: '', duration: '' }],
    });
  };

  const removeService = (index: number) => {
    const newServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: newServices });
    // Effacer l'erreur du service supprimé
    if (errors.services) {
      const newErrors = { ...errors };
      newErrors.services = newErrors.services.filter((_, i) => i !== index);
      setErrors(newErrors);
    }
  };

  const handleWorkingHoursChange = (day: number, field: string, value: string) => {
    const newWorkingHours = [...formData.workingHours];
    newWorkingHours[day] = { ...newWorkingHours[day], [field]: value };
    setFormData({ ...formData, workingHours: newWorkingHours });
    // Effacer l'erreur des horaires modifiés
    if (errors.workingHours && errors.workingHours[day]) {
      const newErrors = { ...errors };
      newErrors.workingHours[day] = '';
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implémenter la logique d'inscription
      console.log('Form submitted:', formData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Inscription Barbier</h1>
            <p className="mt-2 text-gray-600">Créez votre profil de salon de coiffure</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations personnelles */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BuildingOfficeIcon className="h-6 w-6 text-primary-600 mr-2" />
                Informations personnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du salon
                  </label>
                  <input
                    type="text"
                    className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de téléphone
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      className={`input-field pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="+221 77 777 77 77"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Localisation
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      className={`input-field pl-10 ${errors.location ? 'border-red-500' : ''}`}
                      value={formData.location}
                      onChange={(e) => {
                        setFormData({ ...formData, location: e.target.value });
                        if (errors.location) setErrors({ ...errors, location: undefined });
                      }}
                      required
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description du salon
              </label>
              <textarea
                className={`input-field ${errors.description ? 'border-red-500' : ''}`}
                rows={4}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: undefined });
                }}
                placeholder="Décrivez votre salon, vos spécialités, votre expérience..."
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Services */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <ScissorsIcon className="h-6 w-6 text-primary-600 mr-2" />
                Services
              </h2>
              <div className="space-y-4">
                {formData.services.map((service, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom du service
                      </label>
                      <input
                        type="text"
                        className={`input-field ${errors.services[index]?.includes('Nom du service requis') ? 'border-red-500' : ''}`}
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prix (FCFA)
                      </label>
                      <input
                        type="number"
                        className={`input-field ${errors.services[index]?.includes('Prix requis') ? 'border-red-500' : ''}`}
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Durée (minutes)
                      </label>
                      <input
                        type="number"
                        className={`input-field ${errors.services[index]?.includes('Durée requise') ? 'border-red-500' : ''}`}
                        value={service.duration}
                        onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                        required
                      />
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addService}
                  className="btn-secondary w-full"
                >
                  + Ajouter un service
                </button>
              </div>
            </div>

            {/* Horaires d'ouverture */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <ClockIcon className="h-6 w-6 text-primary-600 mr-2" />
                Horaires d'ouverture
              </h2>
              <div className="space-y-4">
                {days.map((day, index) => (
                  <div key={day} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-900">{day}</span>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ouverture
                      </label>
                      <input
                        type="time"
                        className={`input-field ${errors.workingHours[index] ? 'border-red-500' : ''}`}
                        value={formData.workingHours[index].open}
                        onChange={(e) => handleWorkingHoursChange(index, 'open', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fermeture
                      </label>
                      <input
                        type="time"
                        className={`input-field ${errors.workingHours[index] ? 'border-red-500' : ''}`}
                        value={formData.workingHours[index].close}
                        onChange={(e) => handleWorkingHoursChange(index, 'close', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 