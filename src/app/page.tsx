import Link from 'next/link';
import { MapPinIcon, ClockIcon, ScissorsIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Trouvez votre</span>
              <span className="block text-primary-600">barbier idéal</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Réservez facilement votre prochain rendez-vous chez le meilleur barbier près de chez vous.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/search"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                >
                  Trouver un barbier
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                >
                  Devenir barbier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <MapPinIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Localisation</h3>
              <p className="mt-2 text-base text-gray-500">
                Trouvez les meilleurs barbiers près de chez vous
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <ClockIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Réservation rapide</h3>
              <p className="mt-2 text-base text-gray-500">
                Réservez en quelques clics, sans attente
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <ScissorsIcon className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Services variés</h3>
              <p className="mt-2 text-base text-gray-500">
                Découvrez une large gamme de services de coiffure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Services populaires
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Découvrez nos services les plus demandés
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Coupe de cheveux',
                price: 'À partir de 2000 FCFA',
                description: 'Coupe personnalisée selon vos préférences',
              },
              {
                name: 'Barbe',
                price: 'À partir de 1500 FCFA',
                description: 'Taille et modelage de barbe professionnel',
              },
              {
                name: 'Coupe + Barbe',
                price: 'À partir de 3000 FCFA',
                description: 'Service complet pour un look impeccable',
              },
            ].map((service) => (
              <div key={service.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{service.description}</p>
                  <p className="mt-4 text-lg font-semibold text-primary-600">{service.price}</p>
                  <Link
                    href="/search"
                    className="mt-4 block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Réserver
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ce que disent nos clients
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              <div key={testimonial.name} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserGroupIcon className="h-12 w-12 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-gray-500">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Prêt à commencer ?</span>
            <span className="block text-primary-200">Trouvez votre barbier dès aujourd'hui.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 