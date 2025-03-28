# Barber App - Application de réservation pour barbiers au Sénégal

Une application web moderne permettant aux clients de réserver facilement des rendez-vous chez les barbiers au Sénégal.

## Fonctionnalités

- 🔍 Recherche de barbiers par localisation
- 📅 Système de réservation en ligne
- 💳 Intégration des moyens de paiement locaux (Wave, Orange Money, Free Money)
- 📱 Interface responsive et moderne
- 🔐 Authentification par téléphone
- 📊 Tableau de bord pour les barbiers
- 📱 Notifications SMS/WhatsApp

## Technologies utilisées

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js avec Express
- **Base de données**: PostgreSQL avec Prisma
- **Authentification**: Firebase Auth
- **Paiements**: Wave, Orange Money, Free Money
- **Maps**: OpenStreetMap
- **Notifications**: Twilio

## Prérequis

- Node.js 18.x ou supérieur
- PostgreSQL 14.x ou supérieur
- Compte Firebase
- Comptes Wave, Orange Money et Free Money pour les paiements
- Compte Twilio pour les notifications

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/barber-app.git
cd barber-app
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
```bash
cp .env.example .env.local
```
Remplissez les variables dans le fichier `.env.local` avec vos propres valeurs.

4. Initialisez la base de données :
```bash
npx prisma generate
npx prisma db push
```

5. Lancez le serveur de développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## Structure du projet

```
barber-app/
├── src/
│   ├── app/              # Pages et routes Next.js
│   ├── components/       # Composants React réutilisables
│   ├── lib/             # Utilitaires et configurations
│   ├── types/           # Types TypeScript
│   └── styles/          # Styles globaux
├── prisma/              # Schéma et migrations de la base de données
├── public/              # Fichiers statiques
└── package.json         # Dépendances et scripts
```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm start` : Lance l'application en mode production
- `npm run lint` : Vérifie le code avec ESLint
- `npm run prisma:studio` : Lance Prisma Studio pour gérer la base de données

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

Votre Nom - [@votre_twitter](https://twitter.com/votre_twitter) - email@example.com

Lien du projet : [https://github.com/votre-username/barber-app](https://github.com/votre-username/barber-app) 