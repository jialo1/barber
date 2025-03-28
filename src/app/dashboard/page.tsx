'use client';

import { useState } from 'react';
import {
  CalendarIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// Données de test (à remplacer par des données de l'API)
const mockData = {
  stats: [
    { name: 'Réservations aujourd\'hui', value: '5', icon: CalendarIcon },
    { name: 'Clients ce mois', value: '120', icon: UserGroupIcon },
    { name: 'Revenus ce mois', value: '240 000 FCFA', icon: CurrencyDollarIcon },
    { name: 'Taux de satisfaction', value: '4.8/5', icon: ChartBarIcon },
  ],
  upcomingReservations: [
    {
      id: '1',
      clientName: 'Moussa Diop',
      service: 'Coupe + Barbe',
      date: '2024-02-20',
      time: '14:00',
      status: 'confirmé',
      price: '3000 FCFA',
    },
    {
      id: '2',
      clientName: 'Abdoulaye Sow',
      service: 'Dégradé',
      date: '2024-02-20',
      time: '15:30',
      status: 'en attente',
      price: '3000 FCFA',
    },
    // Ajoutez d'autres réservations ici
  ],
};

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<'today' | 'upcoming'>('today');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Gérez vos réservations et suivez vos performances
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {mockData.stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Réservations */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Réservations</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedTab('today')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedTab === 'today'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => setSelectedTab('upcoming')}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedTab === 'upcoming'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  À venir
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {mockData.upcomingReservations.map((reservation) => (
                  <li key={reservation.id} className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                            <CalendarIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <span
                            className={`absolute top-0 right-0 block h-3 w-3 rounded-full ${
                              reservation.status === 'confirmé'
                                ? 'bg-green-400'
                                : 'bg-yellow-400'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {reservation.clientName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {reservation.service}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {reservation.date} à {reservation.time}
                          </p>
                          <p className="text-sm text-gray-500">
                            {reservation.price}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="btn-secondary text-sm">
                            {reservation.status === 'confirmé' ? 'Modifier' : 'Confirmer'}
                          </button>
                          <button className="btn-secondary text-sm text-red-600 hover:text-red-700">
                            Annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 