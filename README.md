# 🏨 Systeme de Gestion Hotel# 🏨 Atlas — Réservation d’hôtels (Maroc)



**Projet EMSI - Prepare par OUSSAMA SAJJI****Projet d’examen EMSI**  

**Auteur : OUSSAMA SAJJI**

---

## 📝 Description (très courte)

## 📝 Description

Atlas est une mini-application web de réservation d’hôtels au Maroc :

Application de gestion d'un hotel de 80 chambres avec :- recherche d’hôtels par ville

- Gestion des clients- sélection d’une chambre + dates

- Gestion des chambres  - affichage du prix en **MAD**

- Gestion des reservations (creation, modification, validation, annulation)- page “Mes réservations” (données de démonstration)

- Interface web moderne (Next.js)

- Programme console interactif avec menu## 🛠️ Comment c’est construit (simple)



---- **Next.js 16 (App Router)** + **React 19** pour le front.

- **Tailwind CSS** pour le style minimal.

## 🏗️ Architecture du Systeme- **Clerk** pour l’authentification (localisation FR).

- **react-day-picker** + **date-fns** pour les dates.

```- Turbopack activé pour des démarrages rapides en dev.

┌─────────────────────────────────────────────────────────────────────────────┐

│                        SYSTEME DE GESTION HOTEL                             │## ✅ Démarrage “1 clic” (zéro setup manuel)

│                        Projet EMSI - Oussama SAJJI                          │

└─────────────────────────────────────────────────────────────────────────────┘Après avoir cloné le projet, tu as **une seule action** à faire.

                                    │

          ┌─────────────────────────┼─────────────────────────┐### Option A (recommandée) : une commande

          │                         │                         │

          ▼                         ▼                         ▼```bash

┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐npm run demarrer

│   INTERFACE     │     │    INTERFACE        │     │   BASE DE       │```

│   WEB           │     │    CONSOLE          │     │   DONNEES       │

│   (Next.js)     │     │    (menu.js)        │     │   (MySQL)       │Ce script fait automatiquement :

└────────┬────────┘     └──────────┬──────────┘     └────────┬────────┘- installation des dépendances (`npm install`) si besoin

         │                         │                         │- création de `.env.local` depuis `.env.example` si le fichier n’existe pas

         └─────────────────────────┼─────────────────────────┘- lancement de l’app (`npm run dev`)

                                   │

                                   ▼Ouvre ensuite : http://localhost:3000

                    ┌──────────────────────────────┐

                    │      CLASSES METIER          │### Option Windows : un seul clic sur PowerShell

                    │  (src/lib/classes/)          │

                    ├──────────────────────────────┤Sur Windows, double-clique sur `Demarrer.bat` (ça appelle PowerShell avec les bons paramètres) ou fais **clic droit → Exécuter avec PowerShell** sur `Demarrer.ps1`.

                    │  • Client.js                 │Le script vérifie Node, télécharge les dépendances (`npm install`) si besoin, crée `.env.local`, tente d’initialiser la base MySQL (Prisma generate + db push + seed) si `DATABASE_URL` pointe sur MySQL, puis lance `npm run dev`. Si MySQL n’est pas accessible, un avertissement s’affiche mais le serveur démarre quand même (mode mock possible).

                    │  • Chambre.js                │

                    │  • Reservation.js            │Si Windows bloque encore l’exécution des scripts, ouvre PowerShell dans le dossier et lance :

                    │  • GestionReservations.js    │

                    └──────────────────────────────┘```powershell

                                   │powershell -NoProfile -ExecutionPolicy Bypass -File ".\Demarrer.ps1"

                    ┌──────────────┴──────────────┐```

                    │                             │

                    ▼                             ▼Cela contourne la restriction uniquement pour cette session.

         ┌─────────────────┐           ┌─────────────────┐

         │  Prisma ORM     │           │  Service Hotel  │Alternative (si tu préfères une commande) :

         │  (schema.prisma)│           │  (hotelService) │

         └────────┬────────┘           └─────────────────┘```bash

                  │npm run demarrer:win

                  ▼```

         ┌─────────────────┐

         │     MySQL       │### Option B (macOS) : double-clic

         │   (DATABASE)    │

         └─────────────────┘Double-clique sur `Demarrer.command`.

```

> macOS peut demander l’autorisation d’exécuter le fichier la première fois.

---

## 🔑 Variables d’environnement

## 📁 Structure des Fichiers

Le projet crée automatiquement `.env.local` à partir de `.env.example`.

```

hotel-booking/Pour activer l’authentification (Clerk) et la carte (Mapbox), remplace les valeurs dans `.env.local`.

│

├── 📄 menu.js                    # Programme principal avec menu console## 🗄️ Base de données SQL (MySQL)

├── 📄 package.json               # Dependances du projet

├── 📄 README.md                  # Ce fichier- Dans `.env.local`, configure :

│    - `DATABASE_URL="mysql://user:password@localhost:3306/hotel_db"`

├── 📁 prisma/- Assure-toi que MySQL tourne et que la base existe.

│   ├── schema.prisma             # Schema de la base de donnees MySQL- Initialisation :

│   └── seed.js                   # Donnees initiales (clients, chambres)    ```bash

│    npx prisma generate

├── 📁 src/    npx prisma db push

│   ├── 📁 lib/    node prisma/seed.js

│   │   ├── 📁 classes/           # CLASSES METIER    ```

│   │   │   ├── Client.js         # Classe Client- Les scripts 1-clic tenteront aussi `db push` + `seed` ; en cas d’échec (MySQL down ou credentials), un avertissement est affiché mais le serveur démarre (données mock toujours possibles).

│   │   │   ├── Chambre.js        # Classe Chambre

│   │   │   ├── Reservation.js    # Classe Reservation## 📁 Structure (minimum de fichiers)

│   │   │   ├── GestionReservations.js  # Gestion tableau reservations

│   │   │   └── index.js          # Export des classes```

│   │   │src/

│   │   ├── hotelService.js       # Service de connexion MySQL/Prisma├── composants.jsx         (UI : boutons, cards, calendrier, toast…)

│   │   └── donnees.js            # Donnees mock pour l'interface web├── lib/donnees.js         (données mock + utilitaires)

│   │├── lib/hotelService.js    (logique Métier + Prisma MySQL)

│   └── 📁 app/                   # Pages Next.js (interface web)└── app/

│       ├── page.jsx              # Page d'accueil    ├── layout.jsx         (mise en page)

│       ├── layout.jsx            # Layout principal    ├── providers.jsx      (providers client : Toast)

│       ├── 📁 recherche/         # Page de recherche    ├── page.jsx           (accueil)

│       └── 📁 reservations/      # Page des reservations    ├── recherche/         (recherche + actions serveur)

│    └── reservations/      (mes réservations + actions Prisma)

├── 📁 scripts/```

│   └── demarrer.js               # Script de demarrage automatique

│## 🧪 Commandes utiles

├── 📄 Demarrer.bat               # Lancement Windows (1 clic)

├── 📄 Demarrer.ps1               # Script PowerShell Windows```bash

└── 📄 Demarrer.command           # Lancement macOS (1 clic)npm run dev

```npm run build

npm start

---npm run lint

```

## 📊 Diagramme des Classes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DIAGRAMME DE CLASSES                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐
│        CLIENT           │
├─────────────────────────┤
│ - id: number            │
│ - nom: string           │
│ - prenom: string        │
│ - adresse: string       │
├─────────────────────────┤
│ + saisir(donnees)       │
│ + afficher(): string    │
│ + comparer(client): bool│
│ + toObject(): Object    │
│ + fromObject(obj): Client│
└─────────────────────────┘
            │
            │ 1
            │
            ▼ *
┌─────────────────────────┐         ┌─────────────────────────┐
│      RESERVATION        │─────────│        CHAMBRE          │
├─────────────────────────┤    *  * ├─────────────────────────┤
│ - id: number            │         │ - id: number            │
│ - code: string          │         │ - numero: string        │
│ - client: Client        │         │ - telephone: string     │
│ - etat: string          │         ├─────────────────────────┤
│ - dateDebut: Date       │         │ + saisir(donnees)       │
│ - dateFin: Date         │         │ + afficher(): string    │
│ - chambres: Chambre[]   │         │ + comparer(ch): boolean │
├─────────────────────────┤         └─────────────────────────┘
│ + verifierChambreReservee(ch): bool                         │
│ + ajouterChambre(ch): {success, msg}                        │
│ + supprimerChambre(ch): {success, msg}                      │
│ + afficher(): string                                        │
│ + calculerDuree(): number                                   │
│ + valider(): {success, msg}                                 │
│ + annuler(): {success, msg}                                 │
└─────────────────────────────────────────────────────────────┘
            │
            │ *
            ▼
┌─────────────────────────────────────────────────────────────┐
│               GESTION_RESERVATIONS                          │
├─────────────────────────────────────────────────────────────┤
│ - reservations: Reservation[]                               │
├─────────────────────────────────────────────────────────────┤
│ + clientAReservation(client): boolean                       │
│ + reservationExiste(code): boolean                          │
│ + trouverReservation(code): Reservation                     │
│ + ajouterReservation(res): {success, msg}                   │
│ + modifierChambreReservation(code, old, new): {success,msg} │
│ + supprimerReservation(code): {success, msg}                │
│ + afficherToutes(): string                                  │
│ + getReservationsAujourdhui(): Reservation[]                │
│ + getReservationsExpirantAujourdhui(): Reservation[]        │
│ + annulerReservationsExpirees(): {count, reservations}      │
│ + chambreDisponible(ch, debut, fin): boolean                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Schema Base de Donnees (MySQL)

```sql
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SCHEMA BASE DE DONNEES                              │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌───────────────┐         ┌───────────────────────┐         ┌───────────────┐
    │    CLIENT     │         │     RESERVATION       │         │    CHAMBRE    │
    ├───────────────┤         ├───────────────────────┤         ├───────────────┤
    │ PK id         │◄────────│ FK clientId           │         │ PK id         │
    │    nom        │    1  * │ PK id                 │         │    numero     │
    │    prenom     │         │    code (unique)      │         │    telephone  │
    │    adresse    │         │    etat               │         └───────┬───────┘
    │    createdAt  │         │    dateDebut          │                 │
    │    updatedAt  │         │    dateFin            │                 │
    └───────────────┘         │    createdAt          │                 │
                              │    updatedAt          │                 │
                              └───────────┬───────────┘                 │
                                          │                             │
                                          │ 1                           │ 1
                                          │                             │
                                          ▼ *                           ▼ *
                              ┌───────────────────────────────────────────┐
                              │         RESERVATION_CHAMBRE              │
                              │         (Table de liaison M:N)           │
                              ├───────────────────────────────────────────┤
                              │ PK,FK reservationId                       │
                              │ PK,FK chambreId                           │
                              └───────────────────────────────────────────┘
```

---

## ✅ Demarrage Rapide (1 clic)

### Windows
Double-cliquez sur `Demarrer.bat` ou executez:
```powershell
.\Demarrer.ps1
```

### macOS / Linux
Double-cliquez sur `Demarrer.command` ou executez:
```bash
npm run demarrer
```

### Programme Console (Menu)
Pour lancer le menu interactif en console:
```bash
node menu.js
```

---

## 🔧 Installation Manuelle

1. **Cloner le projet**
```bash
git clone https://github.com/bentalba/hotel-booking.git
cd hotel-booking
```

2. **Installer les dependances**
```bash
npm install
```

3. **Configurer la base de donnees MySQL**

Creer `.env.local` avec:
```env
DATABASE_URL="mysql://user:password@localhost:3306/hotel_db"
```

4. **Initialiser la base**
```bash
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
