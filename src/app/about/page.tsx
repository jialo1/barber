'use client';

import { BuildingOfficeIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            À Propos de Nous
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Découvrez l'histoire et les valeurs de notre entreprise
          </p>
        </div>

        {/* Histoire */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
          <p className="text-gray-600 mb-4">
            Fondée en 2024, notre application de réservation de barbier est née d'une vision simple :
            rendre l'accès aux services de coiffure plus facile et plus efficace pour tous.
          </p>
          <p className="text-gray-600">
            Nous avons constaté que la réservation d'un rendez-vous chez le barbier pouvait être un processus
            fastidieux et chronophage. Notre mission est de simplifier ce processus en mettant la technologie
            au service de nos clients et des professionnels de la coiffure.
          </p>
        </div>

        {/* Valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BuildingOfficeIcon className="h-8 w-8 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
            </div>
            <p className="text-gray-600">
              Nous utilisons les dernières technologies pour offrir une expérience utilisateur
              moderne et intuitive.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <UserGroupIcon className="h-8 w-8 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Communauté</h3>
            </div>
            <p className="text-gray-600">
              Nous créons des liens entre les clients et les professionnels pour une
              expérience de coiffure personnalisée.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <SparklesIcon className="h-8 w-8 text-primary-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
            </div>
            <p className="text-gray-600">
              Nous nous engageons à offrir un service de qualité et à maintenir les plus
              hauts standards professionnels.
            </p>
          </div>
        </div>

        {/* Équipe */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">Fondateur & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="text-lg font-semibold text-gray-900">Jane Smith</h3>
              <p className="text-gray-600">Directrice Technique</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
              <h3 className="text-lg font-semibold text-gray-900">Mike Johnson</h3>
              <p className="text-gray-600">Responsable Marketing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 