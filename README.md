# Hackatweet 🐦

> A full-stack Twitter-like social network built during the **La Capsule** coding bootcamp.
> Un réseau social full-stack inspiré de Twitter, réalisé pendant le bootcamp **La Capsule**.

🇬🇧 [English](#-english) · 🇫🇷 [Français](#-français)

![Next.js](https://img.shields.io/badge/Next.js-12-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)

---

## 🇬🇧 English

### About the project

Hackatweet is a social network inspired by Twitter. The goal of this bootcamp project was to **rebuild both the frontend and the backend from scratch, using only a demo video as the specification**: no mockups, no assets and no starter code were provided.

It shows that I can:

- design and build a **REST API** with Node.js, Express and MongoDB (Mongoose);
- secure authentication with **hashed passwords (bcrypt)** and **tokens**;
- build a **React / Next.js** interface, including **dynamic routes** (`/hashtag/[name]`);
- manage global state with **Redux Toolkit**;
- connect a frontend to a backend web service with `fetch`;
- write **unit tests with Jest (TDD)**, for example to validate form inputs;
- follow **clean code** principles and use Git/GitHub.

### Features

**Authentication**
- Sign up and sign in through modals.
- Passwords are hashed with bcrypt, and each user gets a unique token.
- Users who are not logged in are redirected to the login page.

**Home**
- A left panel with the logo (which links back to Home), the user's info and a logout button.
- A tweet composer limited to **280 characters**: typing is blocked beyond that limit.
- A "Last tweets" feed showing tweets from all users.
- **Like / unlike** on any tweet; **delete** only on your own tweets.
- A "Trends" panel listing every hashtag used and how many times.

**Hashtag page**
- A dynamic URL for each hashtag, e.g. `/hashtag/hello` for `#hello`.
- A search bar that updates the URL on every search.
- When nothing matches, the page shows "No tweets found with #hashtagname".

### Tech stack

| Layer    | Technologies                                               |
| -------- | ---------------------------------------------------------- |
| Frontend | Next.js 12, React 18, Redux Toolkit, redux-persist, CSS Modules |
| Backend  | Node.js, Express, Mongoose, bcrypt, uid2, CORS, dotenv     |
| Database | MongoDB Atlas                                              |
| Testing  | Jest, React Testing Library, Supertest                     |

### Project structure

```
hackatweet/
├── backend-hackatweet/     # REST API (Express + MongoDB)
│   ├── bin/www             # Server entry point (port 3000)
│   ├── models/             # Mongoose schemas (User, Tweet)
│   ├── routes/             # API routes (/users, /tweets)
│   ├── modules/            # Helpers (e.g. checkBody)
│   └── app.js
└── frontend-hackatweet/    # Next.js app (port 3001)
    ├── components/         # Login, SignUp, SignIn, Home, LastTweets, Tweet, Trends, Hashtag
    ├── pages/              # Routes, including hashtag/[hashtag].js
    ├── reducers/           # Redux slices
    ├── public/             # Images and fonts
    └── styles/             # CSS Modules
```

### Getting started

**Prerequisites:** [Node.js](https://nodejs.org/) 16 or later, [Yarn](https://yarnpkg.com/) and a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (the free tier works).

**1. Clone the repository**

```bash
git clone https://github.com/mpinduDev/hackatweet.git
cd hackatweet
```

**2. Start the backend**

```bash
cd backend-hackatweet
npm install
cp .env.example .env    # then put your MongoDB connection string in .env
npm start               # http://localhost:3000
```

**3. Start the frontend** (in a second terminal)

```bash
cd frontend-hackatweet
yarn install
yarn dev                # http://localhost:3001
```

**4. Open** [http://localhost:3001](http://localhost:3001) in your browser.

**Running the tests**

```bash
cd backend-hackatweet && npm test
cd frontend-hackatweet && yarn test
```

### API endpoints

| Method | Route                   | Description                                 |
| ------ | ----------------------- | ------------------------------------------- |
| POST   | `/users/signup`         | Create an account                           |
| POST   | `/users/signin`         | Log in                                      |
| GET    | `/tweets`               | Get all tweets, newest first                |
| POST   | `/tweets`               | Post a new tweet                            |
| DELETE | `/tweets/:id`           | Delete a tweet (only its author can)        |
| PUT    | `/tweets/like`          | Like or unlike a tweet                      |
| GET    | `/tweets/trends`        | Get all hashtags with their usage counts    |
| GET    | `/tweets/hashtag/:name` | Get the tweets that contain a given hashtag |

### Project status

🚧 In progress. Steps:

- [x] Initialize the Express backend and the Next.js frontend
- [ ] Set up the backend (MongoDB, CORS, environment variables)
- [ ] Build authentication (signup / signin, bcrypt, token) with TDD
- [ ] Build the tweet API (create, delete, like, trends, hashtag search)
- [ ] Build the Login page with its modals
- [ ] Build the Home page (feed, 280-character limit, likes, delete, trends)
- [ ] Build the Hashtag page with its dynamic route
- [ ] Polish the styling and add route protection

### Author

**mpinduDev**: junior full-stack JavaScript developer and La Capsule bootcamp graduate.
GitHub: [@mpinduDev](https://github.com/mpinduDev)

---

## 🇫🇷 Français

### À propos du projet

Hackatweet est un réseau social inspiré de Twitter. L'objectif de ce projet de bootcamp était de **recréer entièrement le frontend et le backend à partir d'une simple vidéo de démonstration** : aucune maquette, aucune ressource graphique et aucun code de départ n'étaient fournis.

Ce projet montre que je sais :

- concevoir et développer une **API REST** avec Node.js, Express et MongoDB (Mongoose) ;
- sécuriser l'authentification avec des **mots de passe hachés (bcrypt)** et des **tokens** ;
- construire une interface **React / Next.js**, avec des **routes dynamiques** (`/hashtag/[name]`) ;
- gérer un état global avec **Redux Toolkit** ;
- faire communiquer un frontend avec un webservice backend via `fetch` ;
- écrire des **tests unitaires avec Jest (TDD)**, par exemple pour vérifier les champs saisis ;
- appliquer les principes du **clean code** et travailler avec Git/GitHub.

### Fonctionnalités

**Authentification**
- Inscription et connexion dans des modales.
- Mots de passe hachés avec bcrypt et token unique pour chaque utilisateur.
- Redirection vers la page de connexion si l'utilisateur n'est pas connecté.

**Accueil**
- Un panneau de gauche avec le logo (qui ramène à l'accueil), les informations de l'utilisateur et un bouton de déconnexion.
- Une zone de saisie limitée à **280 caractères** : la saisie est bloquée au-delà.
- Un fil « Last tweets » avec les tweets de tous les utilisateurs.
- **Like / unlike** sur tous les tweets ; **suppression** uniquement de ses propres tweets.
- Un panneau « Trends » qui liste tous les hashtags utilisés et leur nombre d'occurrences.

**Page hashtag**
- Une URL dynamique par hashtag, par exemple `/hashtag/hello` pour `#hello`.
- Une barre de recherche qui met à jour l'URL à chaque recherche.
- Si aucun tweet ne correspond, la page affiche « No tweets found with #hashtagname ».

### Stack technique

| Couche          | Technologies                                               |
| --------------- | ---------------------------------------------------------- |
| Frontend        | Next.js 12, React 18, Redux Toolkit, redux-persist, CSS Modules |
| Backend         | Node.js, Express, Mongoose, bcrypt, uid2, CORS, dotenv     |
| Base de données | MongoDB Atlas                                              |
| Tests           | Jest, React Testing Library, Supertest                     |

### Structure du projet

```
hackatweet/
├── backend-hackatweet/     # API REST (Express + MongoDB)
│   ├── bin/www             # Point d'entrée du serveur (port 3000)
│   ├── models/             # Schémas Mongoose (User, Tweet)
│   ├── routes/             # Routes de l'API (/users, /tweets)
│   ├── modules/            # Fonctions utilitaires (ex. checkBody)
│   └── app.js
└── frontend-hackatweet/    # Application Next.js (port 3001)
    ├── components/         # Login, SignUp, SignIn, Home, LastTweets, Tweet, Trends, Hashtag
    ├── pages/              # Routes, dont hashtag/[hashtag].js
    ├── reducers/           # Slices Redux
    ├── public/             # Images et polices
    └── styles/             # CSS Modules
```

### Installation

**Prérequis :** [Node.js](https://nodejs.org/) 16 ou plus, [Yarn](https://yarnpkg.com/) et un cluster [MongoDB Atlas](https://www.mongodb.com/atlas) (l'offre gratuite suffit).

**1. Cloner le dépôt**

```bash
git clone https://github.com/mpinduDev/hackatweet.git
cd hackatweet
```

**2. Lancer le backend**

```bash
cd backend-hackatweet
npm install
cp .env.example .env    # puis renseignez votre URI MongoDB dans .env
npm start               # http://localhost:3000
```

**3. Lancer le frontend** (dans un second terminal)

```bash
cd frontend-hackatweet
yarn install
yarn dev                # http://localhost:3001
```

**4. Ouvrir** [http://localhost:3001](http://localhost:3001) dans le navigateur.

**Lancer les tests**

```bash
cd backend-hackatweet && npm test
cd frontend-hackatweet && yarn test
```

### Routes de l'API

| Méthode | Route                   | Description                                    |
| ------- | ----------------------- | ---------------------------------------------- |
| POST    | `/users/signup`         | Créer un compte                                |
| POST    | `/users/signin`         | Se connecter                                   |
| GET     | `/tweets`               | Récupérer tous les tweets, du plus récent au plus ancien |
| POST    | `/tweets`               | Publier un tweet                               |
| DELETE  | `/tweets/:id`           | Supprimer un tweet (réservé à son auteur)      |
| PUT     | `/tweets/like`          | Liker ou retirer son like                      |
| GET     | `/tweets/trends`        | Récupérer les hashtags et leur nombre d'utilisations |
| GET     | `/tweets/hashtag/:name` | Récupérer les tweets qui contiennent un hashtag |

### Avancement

🚧 En cours de développement. Étapes :

- [x] Initialiser le backend Express et le frontend Next.js
- [ ] Configurer le backend (MongoDB, CORS, variables d'environnement)
- [ ] Développer l'authentification (signup / signin, bcrypt, token) en TDD
- [ ] Développer l'API des tweets (création, suppression, like, trends, recherche par hashtag)
- [ ] Construire la page Login et ses modales
- [ ] Construire la page Home (fil, limite de 280 caractères, likes, suppression, trends)
- [ ] Construire la page Hashtag et sa route dynamique
- [ ] Finaliser le style et protéger les routes

### Auteur

**mpinduDev** : développeur full-stack JavaScript junior, diplômé du bootcamp La Capsule.
GitHub : [@mpinduDev](https://github.com/mpinduDev)
