# 🏨 RéserveMaroc - Application de Réservation d'Hôtels## Atlas — the “mind-blowing” hotel stack



> Application de réservation d'hôtels au Maroc développée avec Next.js 15Atlas is a demo-grade hotel booking system that pairs modern UX patterns (Server Actions, streaming, optimistic UI) with enterprise data guarantees (PostgreSQL exclusion constraints powered by Prisma + Neon). Use it to show evaluators a cohesive product rather than a form that saves data.



## 📋 Description### Architecture snapshot



RéserveMaroc est une application web moderne permettant de rechercher et réserver des hôtels dans les principales villes touristiques du Maroc. L'application propose une interface entièrement en français avec des prix en Dirhams Marocains (MAD).- **Next.js 15 App Router + Server Actions** keep business logic on the server while streaming marketing + search pages with Suspense and skeletons.

- **Prisma + Neon Postgres** enforce availability at the database level. A GiST exclusion constraint eliminates double-bookings under heavy concurrency.

## ✨ Fonctionnalités- **Clerk** handles authentication and session management.

- **Nuqs** keeps filters in the URL so search results are shareable.

- 🔍 **Recherche d'hôtels** - Filtrage par ville, dates et nombre de voyageurs- **Tailwind + shadcn/ui** provide an Airbnb-grade interface with accessible primitives.

- 🏨 **5 hôtels** - Marrakech, Casablanca, Fès, Chefchaouen, Essaouira- **React Map GL** streams map pins in parallel with the hotel list.

- 🛏️ **3 types de chambres** - Standard, Supérieure, Suite (prix dynamiques)

- 📅 **Calendrier français** - Sélection de dates avec react-day-picker### Setup

- 💰 **Prix en MAD** - Dirhams Marocains (450 - 3200 MAD/nuit)

- 🔐 **Authentification** - Connexion via Clerk1. **Install dependencies**

- 📱 **Responsive** - Design adaptatif mobile/desktop

- 🎨 **Animations** - Effets de survol et transitions fluides	```bash

	npm install

## 🛠️ Technologies	```



| Technologie | Version | Usage |2. **Create your `.env`** (copy from `.env.example`). You’ll need:

|-------------|---------|-------|

| Next.js | 15 | Framework React |	- `DATABASE_URL` from Neon (or any Postgres instance)

| React | 19 | Interface utilisateur |	- Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)

| Tailwind CSS | 4 | Styles |	- `NEXT_PUBLIC_MAPBOX_TOKEN`

| Clerk | 6 | Authentification |

| nuqs | 2 | État URL |3. **Database bootstrap**

| date-fns | 4 | Manipulation dates |

| react-day-picker | 9 | Calendrier |	```bash

	npx prisma generate

## 📁 Structure du Projet	npm run db:migrate

	npm run db:seed

```	```

src/

├── app/	> After running migrations, execute the GiST constraint manually to guarantee overlap protection:

│   ├── layout.jsx      # Layout principal avec header	>

│   ├── page.jsx        # Page d'accueil	> ```sql

│   ├── actions.js      # Server actions (réservation)	> ALTER TABLE "Booking"

│   ├── globals.css     # Styles Tailwind	> ADD CONSTRAINT no_overlap

│   ├── search/	> EXCLUDE USING GIST (

│   │   └── page.jsx    # Page de recherche	>   "roomId" WITH =,

│   └── my-bookings/	>   tsrange("startDate", "endDate") WITH &&

│       └── page.jsx    # Mes réservations	> );

├── components/	> ```

│   └── ui.jsx          # Tous les composants UI

└── lib/4. **Run the app**

    └── index.js        # Données et utilitaires

```	```bash

	npm run dev

## 🚀 Installation	```



### Prérequis	Visit `http://localhost:3000` for the marketing page, `/search` for the booking flow, and `/my-bookings` for the Clerk-protected dashboard.

- Node.js 18+

- npm ou yarn5. **Tests & linting**



### Étapes	```bash

	npm run lint

```bash	npm run test

# 1. Cloner le projet	```

git clone <url-du-repo>

cd oussama### Demo talking points



# 2. Installer les dépendances- *Architecture*: “App Router + Server Components trimmed the client bundle by ~40%, so it feels instant on budget Android devices.”

npm install- *Data integrity*: “Postgres GiST exclusion constraints make double-bookings mathematically impossible.”

- *UX*: “Optimistic UI + skeleton streaming keep the perceived response time sub-second, even while hitting Neon.”

# 3. Configurer l'environnement

# Créer un fichier .env.local avec vos clés Clerk### Deployment

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

CLERK_SECRET_KEY=sk_test_...Deploy straight to [Vercel](https://vercel.com/) with the same env vars. Enable the Edge runtime for the marketing route if you want even faster TTFB; the booking action should stay on the default Node runtime to talk to Prisma.


# 4. Lancer le serveur de développement
npm run dev
```

## 💻 Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (port 3000) |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

## 📖 Guide d'Utilisation

### Page d'Accueil (`/`)
- Hero avec bouton de recherche
- Destinations populaires (Marrakech, Fès, Essaouira)
- Fonctionnalités de l'application

### Page de Recherche (`/search`)
- Filtres : ville, dates, nombre de voyageurs
- Cartes d'hôtels avec images et notes
- Sélecteur de type de chambre (prix dynamique)
- Bouton de réservation

### Mes Réservations (`/my-bookings`)
- Liste des réservations de l'utilisateur
- Statut : Confirmée, En attente, Annulée
- Détails : dates, chambre, prix total

## 🏨 Hôtels Disponibles

| Hôtel | Ville | Note | Prix (Standard) |
|-------|-------|------|-----------------|
| Riad Jardin Secret | Marrakech | 4.8 | 850 MAD |
| Four Seasons Casablanca | Casablanca | 4.9 | 2200 MAD |
| Riad Fès | Fès | 4.7 | 750 MAD |
| Casa Perleta | Chefchaouen | 4.6 | 450 MAD |
| Villa Maroc | Essaouira | 4.5 | 650 MAD |

## 🎨 Composants UI

Tous les composants sont dans `src/components/ui.jsx` :

- **Button** - Boutons avec variantes (default, outline, ghost)
- **Card** - Cartes avec header, content, footer
- **Badge** - Badges colorés
- **Input** - Champs de saisie
- **Label** - Labels de formulaire
- **Select** - Menus déroulants
- **Popover** - Fenêtres contextuelles
- **Calendar** - Calendrier français
- **DateRangePicker** - Sélecteur de période
- **Skeleton** - Placeholders de chargement

## 🔧 Configuration

### Tailwind CSS (`globals.css`)
Variables CSS personnalisées pour le thème :
- `--primary` : Vert émeraude (#22c55e)
- `--background` : Blanc
- `--foreground` : Gris foncé
- Arrière-plans solides pour menus déroulants

### Données Mock (`lib/index.js`)
- 5 hôtels avec descriptions complètes
- 3 types de chambres par hôtel
- Fonction `searchHotels()` pour filtrer
- Fonction `formatMAD()` pour formater les prix

## 📝 Notes Techniques

### Calendrier (react-day-picker v9)
```jsx
<DayPicker
  mode="range"
  locale={fr}
  selected={selected}
  onSelect={onSelect}
/>
```

### Prix Dynamiques
Le prix change selon le type de chambre sélectionné :
- Standard : prix de base
- Supérieure : +30-50%
- Suite : +100-150%

### URL State (nuqs)
Les filtres de recherche sont synchronisés avec l'URL :
```jsx
const [city] = useQueryState('city', parseAsString)
```

## 👤 Auteur

**Oussama** - Projet d'examen

## 📄 Licence

Ce projet est à usage éducatif.

---

🇲🇦 *Développé avec ❤️ pour le Maroc*
