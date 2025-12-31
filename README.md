# 🏨 Système de Gestion Hôtelière - EMSI# 🏨 Systeme de Gestion Hotel# 🏨 Atlas — Réservation d’hôtels (Maroc)



![Node.js](https://img.shields.io/badge/Node.js-18+-green)

![Express.js](https://img.shields.io/badge/Express.js-4.18-blue)

![Sequelize](https://img.shields.io/badge/Sequelize-6.35-orange)**Projet EMSI - Prepare par OUSSAMA SAJJI****Projet d’examen EMSI**  

![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)

**Auteur : OUSSAMA SAJJI**

**Projet de Gestion de Réservations Hôtelières**  

Préparé par **Oussama SAJJI** - EMSI---



---## 📝 Description (très courte)



## 📋 Table des Matières## 📝 Description



- [Description](#-description)Atlas est une mini-application web de réservation d’hôtels au Maroc :

- [Architecture](#-architecture)

- [Fonctionnalités](#-fonctionnalités)Application de gestion d'un hotel de 80 chambres avec :- recherche d’hôtels par ville

- [Prérequis](#-prérequis)

- [Installation](#-installation)- Gestion des clients- sélection d’une chambre + dates

- [Configuration](#-configuration)

- [Démarrage](#-démarrage)- Gestion des chambres  - affichage du prix en **MAD**

- [API Documentation](#-api-documentation)

- [Structure du Projet](#-structure-du-projet)- Gestion des reservations (creation, modification, validation, annulation)- page “Mes réservations” (données de démonstration)

- [Base de Données](#-base-de-données)

- Interface web moderne (Next.js)

---

- Programme console interactif avec menu## 🛠️ Comment c’est construit (simple)

## 📝 Description



Ce système permet la gestion complète d'un hôtel incluant :

- **Gestion des clients** (CRUD complet)---- **Next.js 16 (App Router)** + **React 19** pour le front.

- **Gestion des chambres** (80 chambres sur 8 étages)

- **Gestion des réservations** (création, validation, annulation, clôture)- **Tailwind CSS** pour le style minimal.

- **Vérification de disponibilité** automatique

- **Tâches automatiques** (cron jobs pour clôture automatique)## 🏗️ Architecture du Systeme- **Clerk** pour l’authentification (localisation FR).



---- **react-day-picker** + **date-fns** pour les dates.



## 🏗 Architecture```- Turbopack activé pour des démarrages rapides en dev.



```┌─────────────────────────────────────────────────────────────────────────────┐

┌─────────────────────────────────────────────────────────────────┐

│                         CLIENT                                  ││                        SYSTEME DE GESTION HOTEL                             │## ✅ Démarrage “1 clic” (zéro setup manuel)

│                    (Navigateur / CLI)                           │

└─────────────────────────────────────────────────────────────────┘│                        Projet EMSI - Oussama SAJJI                          │

                              │

                              ▼└─────────────────────────────────────────────────────────────────────────────┘Après avoir cloné le projet, tu as **une seule action** à faire.

┌─────────────────────────────────────────────────────────────────┐

│                      API LAYER (Express.js)                     │                                    │

│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │

│  │ /api/clients │  │ /api/chambres│  │ /api/reservations  │    │          ┌─────────────────────────┼─────────────────────────┐### Option A (recommandée) : une commande

│  └──────────────┘  └──────────────┘  └────────────────────┘    │

└─────────────────────────────────────────────────────────────────┘          │                         │                         │

                              │

                              ▼          ▼                         ▼                         ▼```bash

┌─────────────────────────────────────────────────────────────────┐

│                    SERVICE LAYER (Business Logic)               │┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐npm run demarrer

│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐   │

│  │ ClientService │  │ChambreService │  │ReservationService │   ││   INTERFACE     │     │    INTERFACE        │     │   BASE DE       │```

│  └───────────────┘  └───────────────┘  └───────────────────┘   │

│                                              ▲                   ││   WEB           │     │    CONSOLE          │     │   DONNEES       │

│                           THE ENGINE ────────┘                   │

│           (Availability Check, Room Limits, Duration Calc)       ││   (Next.js)     │     │    (menu.js)        │     │   (MySQL)       │Ce script fait automatiquement :

└─────────────────────────────────────────────────────────────────┘

                              │└────────┬────────┘     └──────────┬──────────┘     └────────┬────────┘- installation des dépendances (`npm install`) si besoin

                              ▼

┌─────────────────────────────────────────────────────────────────┐         │                         │                         │- création de `.env.local` depuis `.env.example` si le fichier n’existe pas

│                  DATA ACCESS LAYER (Sequelize ORM)              │

│  ┌────────┐  ┌─────────┐  ┌─────────────┐  ┌─────────────────┐ │         └─────────────────────────┼─────────────────────────┘- lancement de l’app (`npm run dev`)

│  │ Client │  │ Chambre │  │ Reservation │  │ReservationChambre│ │

│  └────────┘  └─────────┘  └─────────────┘  └─────────────────┘ │                                   │

└─────────────────────────────────────────────────────────────────┘

                              │                                   ▼Ouvre ensuite : http://localhost:3000

                              ▼

┌─────────────────────────────────────────────────────────────────┐                    ┌──────────────────────────────┐

│                         MySQL Database                          │

│                    (hotel_reservation)                          │                    │      CLASSES METIER          │### Option Windows : un seul clic sur PowerShell

└─────────────────────────────────────────────────────────────────┘

```                    │  (src/lib/classes/)          │



---                    ├──────────────────────────────┤Sur Windows, double-clique sur `Demarrer.bat` (ça appelle PowerShell avec les bons paramètres) ou fais **clic droit → Exécuter avec PowerShell** sur `Demarrer.ps1`.



## ✨ Fonctionnalités                    │  • Client.js                 │Le script vérifie Node, télécharge les dépendances (`npm install`) si besoin, crée `.env.local`, tente d’initialiser la base MySQL (Prisma generate + db push + seed) si `DATABASE_URL` pointe sur MySQL, puis lance `npm run dev`. Si MySQL n’est pas accessible, un avertissement s’affiche mais le serveur démarre quand même (mode mock possible).



### Gestion des Clients                    │  • Chambre.js                │

- ✅ Créer, modifier, supprimer des clients

- ✅ Rechercher par nom                    │  • Reservation.js            │Si Windows bloque encore l’exécution des scripts, ouvre PowerShell dans le dossier et lance :

- ✅ Vérifier les réservations actives avant suppression

                    │  • GestionReservations.js    │

### Gestion des Chambres

- ✅ 80 chambres sur 8 étages (101-810)                    └──────────────────────────────┘```powershell

- ✅ Vérification des doublons

- ✅ Numéro unique par chambre                                   │powershell -NoProfile -ExecutionPolicy Bypass -File ".\Demarrer.ps1"



### Gestion des Réservations                    ┌──────────────┴──────────────┐```

- ✅ **Availability Check** : Vérification automatique de disponibilité

- ✅ **Room Limit (80 max)** : Limite de chambres par réservation                    │                             │

- ✅ **Duration Calculator** : Calcul automatique de la durée

- ✅ **State Management** : Pending → Validated → Closed / Canceled                    ▼                             ▼Cela contourne la restriction uniquement pour cette session.

- ✅ **Transactions atomiques** pour l'intégrité des données

         ┌─────────────────┐           ┌─────────────────┐

### Tâches Automatiques (Cron Jobs)

- ⏰ Clôture automatique des réservations expirées (minuit)         │  Prisma ORM     │           │  Service Hotel  │Alternative (si tu préfères une commande) :

- ⏰ Annulation des réservations en attente expirées (toutes les heures)

- ⏰ Rapport quotidien (8h00)         │  (schema.prisma)│           │  (hotelService) │



---         └────────┬────────┘           └─────────────────┘```bash



## 📋 Prérequis                  │npm run demarrer:win



- **Node.js** >= 18.0.0                  ▼```

- **MySQL** >= 5.7 (via XAMPP, WAMP, ou MySQL Server)

- **npm** ou **yarn**         ┌─────────────────┐



---         │     MySQL       │### Option B (macOS) : double-clic



## 🚀 Installation         │   (DATABASE)    │



### Windows (1-Click)         └─────────────────┘Double-clique sur `Demarrer.command`.



1. Double-cliquez sur `Demarrer.bat` ou `Demarrer.ps1````

2. Le script installera automatiquement les dépendances

3. Suivez le menu interactif> macOS peut demander l’autorisation d’exécuter le fichier la première fois.



### Manuel---



```bash## 🔑 Variables d’environnement

# Cloner le projet

git clone <url-du-repo>## 📁 Structure des Fichiers

cd oussama

Le projet crée automatiquement `.env.local` à partir de `.env.example`.

# Installer les dépendances

npm install```



# Copier le fichier de configurationhotel-booking/Pour activer l’authentification (Clerk) et la carte (Mapbox), remplace les valeurs dans `.env.local`.

cp .env.example .env

│

# Modifier .env avec vos paramètres MySQL

```├── 📄 menu.js                    # Programme principal avec menu console## 🗄️ Base de données SQL (MySQL)



---├── 📄 package.json               # Dependances du projet



## ⚙️ Configuration├── 📄 README.md                  # Ce fichier- Dans `.env.local`, configure :



Modifiez le fichier `.env` :│    - `DATABASE_URL="mysql://user:password@localhost:3306/hotel_db"`



```env├── 📁 prisma/- Assure-toi que MySQL tourne et que la base existe.

# Configuration MySQL

DB_HOST=localhost│   ├── schema.prisma             # Schema de la base de donnees MySQL- Initialisation :

DB_PORT=3306

DB_USER=root│   └── seed.js                   # Donnees initiales (clients, chambres)    ```bash

DB_PASSWORD=

DB_NAME=hotel_reservation│    npx prisma generate



# Configuration Serveur├── 📁 src/    npx prisma db push

PORT=3000

NODE_ENV=development│   ├── 📁 lib/    node prisma/seed.js

```

│   │   ├── 📁 classes/           # CLASSES METIER    ```

### Créer la base de données MySQL

│   │   │   ├── Client.js         # Classe Client- Les scripts 1-clic tenteront aussi `db push` + `seed` ; en cas d’échec (MySQL down ou credentials), un avertissement est affiché mais le serveur démarre (données mock toujours possibles).

```sql

CREATE DATABASE IF NOT EXISTS hotel_reservation;│   │   │   ├── Chambre.js        # Classe Chambre

```

│   │   │   ├── Reservation.js    # Classe Reservation## 📁 Structure (minimum de fichiers)

---

│   │   │   ├── GestionReservations.js  # Gestion tableau reservations

## ▶️ Démarrage

│   │   │   └── index.js          # Export des classes```

### Serveur API

│   │   │src/

```bash

# Développement (avec hot reload)│   │   ├── hotelService.js       # Service de connexion MySQL/Prisma├── composants.jsx         (UI : boutons, cards, calendrier, toast…)

npm run dev

│   │   └── donnees.js            # Donnees mock pour l'interface web├── lib/donnees.js         (données mock + utilitaires)

# Production

npm start│   │├── lib/hotelService.js    (logique Métier + Prisma MySQL)

```

│   └── 📁 app/                   # Pages Next.js (interface web)└── app/

Le serveur démarre sur `http://localhost:3000`

│       ├── page.jsx              # Page d'accueil    ├── layout.jsx         (mise en page)

### Menu Console (CLI)

│       ├── layout.jsx            # Layout principal    ├── providers.jsx      (providers client : Toast)

```bash

npm run cli│       ├── 📁 recherche/         # Page de recherche    ├── page.jsx           (accueil)

```

│       └── 📁 reservations/      # Page des reservations    ├── recherche/         (recherche + actions serveur)

### Scripts de Base de Données

│    └── reservations/      (mes réservations + actions Prisma)

```bash

# Synchroniser les tables├── 📁 scripts/```

npm run db:sync

│   └── demarrer.js               # Script de demarrage automatique

# Peupler avec des données de test

npm run db:seed│## 🧪 Commandes utiles



# Réinitialiser (ATTENTION: supprime tout!)├── 📄 Demarrer.bat               # Lancement Windows (1 clic)

npm run db:reset

```├── 📄 Demarrer.ps1               # Script PowerShell Windows```bash



### Tâches Automatiques└── 📄 Demarrer.command           # Lancement macOS (1 clic)npm run dev



```bash```npm run build

npm run cron

```npm start



------npm run lint



## 📚 API Documentation```



La documentation Swagger est disponible à :## 📊 Diagramme des Classes



``````

http://localhost:3000/api/docs┌─────────────────────────────────────────────────────────────────────────────┐

```│                           DIAGRAMME DE CLASSES                              │

└─────────────────────────────────────────────────────────────────────────────┘

### Endpoints Principaux

┌─────────────────────────┐

| Méthode | Endpoint | Description |│        CLIENT           │

|---------|----------|-------------|├─────────────────────────┤

| **CLIENTS** | | |│ - id: number            │

| GET | `/api/clients` | Liste tous les clients |│ - nom: string           │

| POST | `/api/clients` | Créer un client |│ - prenom: string        │

| GET | `/api/clients/:id` | Obtenir un client |│ - adresse: string       │

| PUT | `/api/clients/:id` | Modifier un client |├─────────────────────────┤

| DELETE | `/api/clients/:id` | Supprimer un client |│ + saisir(donnees)       │

| GET | `/api/clients/search/:name` | Rechercher par nom |│ + afficher(): string    │

| **CHAMBRES** | | |│ + comparer(client): bool│

| GET | `/api/chambres` | Liste toutes les chambres |│ + toObject(): Object    │

| POST | `/api/chambres` | Créer une chambre |│ + fromObject(obj): Client│

| GET | `/api/chambres/:id` | Obtenir une chambre |└─────────────────────────┘

| DELETE | `/api/chambres/:id` | Supprimer une chambre |            │

| GET | `/api/chambres/available` | Chambres disponibles |            │ 1

| **RESERVATIONS** | | |            │

| GET | `/api/reservations` | Liste les réservations |            ▼ *

| POST | `/api/reservations` | Créer une réservation |┌─────────────────────────┐         ┌─────────────────────────┐

| GET | `/api/reservations/:id` | Obtenir une réservation |│      RESERVATION        │─────────│        CHAMBRE          │

| PUT | `/api/reservations/:id/validate` | Valider |├─────────────────────────┤    *  * ├─────────────────────────┤

| PUT | `/api/reservations/:id/cancel` | Annuler |│ - id: number            │         │ - id: number            │

| PUT | `/api/reservations/:id/close` | Clôturer |│ - code: string          │         │ - numero: string        │

| POST | `/api/reservations/:id/chambres` | Ajouter chambre |│ - client: Client        │         │ - telephone: string     │

| DELETE | `/api/reservations/:id/chambres/:chambreId` | Retirer chambre |│ - etat: string          │         ├─────────────────────────┤

| GET | `/api/reservations/:id/duration` | Calculer durée |│ - dateDebut: Date       │         │ + saisir(donnees)       │

| GET | `/api/reservations/stats/dashboard` | Statistiques |│ - dateFin: Date         │         │ + afficher(): string    │

│ - chambres: Chambre[]   │         │ + comparer(ch): boolean │

---├─────────────────────────┤         └─────────────────────────┘

│ + verifierChambreReservee(ch): bool                         │

## 📁 Structure du Projet│ + ajouterChambre(ch): {success, msg}                        │

│ + supprimerChambre(ch): {success, msg}                      │

```│ + afficher(): string                                        │

oussama/│ + calculerDuree(): number                                   │

├── 📂 src/│ + valider(): {success, msg}                                 │

│   ├── 📂 config/│ + annuler(): {success, msg}                                 │

│   │   ├── database.js      # Configuration Sequelize└─────────────────────────────────────────────────────────────┘

│   │   └── swagger.js       # Documentation API            │

│   ├── 📂 models/            │ *

│   │   ├── index.js         # Associations            ▼

│   │   ├── Client.js        # Modèle Client┌─────────────────────────────────────────────────────────────┐

│   │   ├── Chambre.js       # Modèle Chambre│               GESTION_RESERVATIONS                          │

│   │   ├── Reservation.js   # Modèle Reservation├─────────────────────────────────────────────────────────────┤

│   │   └── ReservationChambre.js│ - reservations: Reservation[]                               │

│   ├── 📂 services/├─────────────────────────────────────────────────────────────┤

│   │   ├── index.js         # Export services│ + clientAReservation(client): boolean                       │

│   │   ├── ClientService.js # Logique clients│ + reservationExiste(code): boolean                          │

│   │   ├── ChambreService.js # Logique chambres│ + trouverReservation(code): Reservation                     │

│   │   └── ReservationService.js # THE ENGINE│ + ajouterReservation(res): {success, msg}                   │

│   ├── 📂 controllers/│ + modifierChambreReservation(code, old, new): {success,msg} │

│   │   ├── index.js         # Export controllers│ + supprimerReservation(code): {success, msg}                │

│   │   ├── ClientController.js│ + afficherToutes(): string                                  │

│   │   ├── ChambreController.js│ + getReservationsAujourdhui(): Reservation[]                │

│   │   └── ReservationController.js│ + getReservationsExpirantAujourdhui(): Reservation[]        │

│   ├── 📂 routes/│ + annulerReservationsExpirees(): {count, reservations}      │

│   │   └── api.js           # Routes API│ + chambreDisponible(ch, debut, fin): boolean                │

│   ├── 📂 cli/└─────────────────────────────────────────────────────────────┘

│   │   └── menu.js          # Menu console```

│   ├── 📂 scripts/

│   │   ├── syncDatabase.js  # Sync tables---

│   │   ├── seedDatabase.js  # Données test

│   │   ├── resetDatabase.js # Reset DB## 🗄️ Schema Base de Donnees (MySQL)

│   │   └── cronJobs.js      # Tâches auto

│   └── index.js             # Point d'entrée```sql

├── 📂 java/                  # Version Java (POO)┌─────────────────────────────────────────────────────────────────────────────┐

├── .env                      # Configuration locale│                         SCHEMA BASE DE DONNEES                              │

├── .env.example              # Template config└─────────────────────────────────────────────────────────────────────────────┘

├── package.json              # Dépendances Node.js

├── Demarrer.bat              # Script Windows CMD    ┌───────────────┐         ┌───────────────────────┐         ┌───────────────┐

├── Demarrer.ps1              # Script PowerShell    │    CLIENT     │         │     RESERVATION       │         │    CHAMBRE    │

├── Demarrer.command          # Script macOS/Linux    ├───────────────┤         ├───────────────────────┤         ├───────────────┤

└── README.md                 # Cette documentation    │ PK id         │◄────────│ FK clientId           │         │ PK id         │

```    │    nom        │    1  * │ PK id                 │         │    numero     │

    │    prenom     │         │    code (unique)      │         │    telephone  │

---    │    adresse    │         │    etat               │         └───────┬───────┘

    │    createdAt  │         │    dateDebut          │                 │

## 🗄 Base de Données    │    updatedAt  │         │    dateFin            │                 │

    └───────────────┘         │    createdAt          │                 │

### Schéma                              │    updatedAt          │                 │

                              └───────────┬───────────┘                 │

```                                          │                             │

┌─────────────────┐      ┌──────────────────────┐      ┌─────────────────┐                                          │ 1                           │ 1

│     clients     │      │    reservations      │      │    chambres     │                                          │                             │

├─────────────────┤      ├──────────────────────┤      ├─────────────────┤                                          ▼ *                           ▼ *

│ id (PK)         │──┐   │ id (PK)              │   ┌──│ id (PK)         │                              ┌───────────────────────────────────────────┐

│ nom             │  │   │ client_id (FK)       │───┘  │ numero_chambre  │                              │         RESERVATION_CHAMBRE              │

│ prenom          │  └──▶│ date_debut           │      │ telephone       │                              │         (Table de liaison M:N)           │

│ adresse         │      │ date_fin             │      │ created_at      │                              ├───────────────────────────────────────────┤

│ created_at      │      │ etat                 │      │ updated_at      │                              │ PK,FK reservationId                       │

│ updated_at      │      │ nb_chambres          │      └─────────────────┘                              │ PK,FK chambreId                           │

└─────────────────┘      │ created_at           │              │                              └───────────────────────────────────────────┘

                         │ updated_at           │              │```

                         └──────────────────────┘              │

                                    │                          │---

                                    │      ┌───────────────────┴──────────┐

                                    │      │  reservation_chambres        │## ✅ Demarrage Rapide (1 clic)

                                    │      ├──────────────────────────────┤

                                    └─────▶│ reservation_id (FK)          │### Windows

                                           │ chambre_id (FK)              │Double-cliquez sur `Demarrer.bat` ou executez:

                                           │ created_at                   │```powershell

                                           └──────────────────────────────┘.\Demarrer.ps1

``````



### États des Réservations### macOS / Linux

Double-cliquez sur `Demarrer.command` ou executez:

| État | Description |```bash

|------|-------------|npm run demarrer

| `Pending` | En attente de validation |```

| `Validated` | Confirmée |

| `Canceled` | Annulée |### Programme Console (Menu)

| `Closed` | Terminée/Clôturée |Pour lancer le menu interactif en console:

```bash

---node menu.js

```

## 📝 Scripts NPM

---

| Commande | Description |

|----------|-------------|## 🔧 Installation Manuelle

| `npm start` | Démarrer en production |

| `npm run dev` | Démarrer en développement |1. **Cloner le projet**

| `npm run cli` | Lancer le menu console |```bash

| `npm run db:sync` | Synchroniser la DB |git clone https://github.com/bentalba/hotel-booking.git

| `npm run db:seed` | Peupler la DB |cd hotel-booking

| `npm run db:reset` | Réinitialiser la DB |```

| `npm run cron` | Lancer les cron jobs |

| `npm test` | Exécuter les tests |2. **Installer les dependances**

```bash

---npm install

```

## 👨‍💻 Auteur

3. **Configurer la base de donnees MySQL**

**Oussama SAJJI**  

Projet EMSI - Gestion HôtelièreCreer `.env.local` avec:

```env

---DATABASE_URL="mysql://user:password@localhost:3306/hotel_db"

```

## 📄 Licence

4. **Initialiser la base**

Ce projet est développé dans le cadre d'un projet académique EMSI.```bash

npx prisma generate
npx prisma db push
node prisma/seed.js
```

5. **Lancer l'application**
```bash
# Interface web
npm run dev

# Menu console
node menu.js
```

---

## 📋 Fonctionnalites Implementees

### Classes Client, Chambre (Question 1)
- ✅ Constructeur par defaut
- ✅ Methode d'affichage
- ✅ Methode de saisie
- ✅ Getters / Setters
- ✅ Methode comparer (par code/numero)

### Classe Reservation (Question 2)
- ✅ a) Verifier si une chambre est deja reservee
- ✅ b) Ajouter une chambre (limite max 5 + anti-doublon)
- ✅ c) Afficher une reservation (client + chambres)
- ✅ d) Calculer la duree d'une reservation
- ✅ e) Supprimer une chambre (avec message erreur)
- ✅ f) Valider / Annuler une reservation

### Tableau de Reservations (Question 3)
- ✅ a) Tester si un client a des reservations
- ✅ b) Tester si une reservation existe
- ✅ c) Ajouter / Modifier / Supprimer une reservation
- ✅ d) Afficher toutes / aujourd'hui / expirant
- ✅ e) Annuler les reservations expirees

### Programme Principal (Question 4)
- ✅ Menu interactif console
- ✅ Sous-menus organises
- ✅ Tests de toutes les fonctionnalites

---

## 🖥️ Captures d'ecran Menu Console

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                    SYSTEME DE GESTION HOTEL                               ║
║                    Projet EMSI - Oussama SAJJI                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  1. 📋 Afficher toutes les reservations                                   ║
║  2. 🔍 Rechercher une reservation (par code)                              ║
║  3. ➕ Creer une nouvelle reservation                                     ║
║  4. ❌ Supprimer une reservation                                          ║
║  5. ✅ Valider une reservation                                            ║
║  6. 🚫 Annuler une reservation                                            ║
║  ...                                                                      ║
║  0. 🚪 Quitter                                                            ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## 👤 Auteur

**OUSSAMA SAJJI**  
Projet realise pour **EMSI** (Ecole Marocaine des Sciences de l'Ingenieur)

---

## 📄 Licence

Projet educatif - EMSI 2024
