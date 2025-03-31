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
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

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
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section - Niveau 1 */}
      <section className="bg-gradient-to-b from-primary-900 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Devenez barbier</h1>
            <p className="text-xl text-primary-100 mb-8">
              Rejoignez notre plateforme et développez votre activité
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire Section - Niveau 2 */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="space-y-8">
              {/* Informations personnelles */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Informations du salon */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations du salon</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du salon
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horaires d'ouverture
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="time"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <input
                          type="time"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services proposés */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Services proposés</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Coupe', 'Barbe', 'Coloration', 'Tresse', 'Dégradé', 'Soins'].map((service) => (
                    <div key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 text-sm text-gray-700">{service}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton d'inscription */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Créer mon compte
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 