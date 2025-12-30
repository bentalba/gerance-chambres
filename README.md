# 🏨 Atlas — Réservation d’hôtels (Maroc)

**Projet d’examen EMSI**  
**Auteur : OUSSAMA SAJJI**

## 📝 Description (très courte)

Atlas est une mini-application web de réservation d’hôtels au Maroc :
- recherche d’hôtels par ville
- sélection d’une chambre + dates
- affichage du prix en **MAD**
- page “Mes réservations” (données de démonstration)

## 🛠️ Comment c’est construit (simple)

- **Next.js 16 (App Router)** + **React 19** pour le front.
- **Tailwind CSS** pour le style minimal.
- **Clerk** pour l’authentification (localisation FR).
- **react-day-picker** + **date-fns** pour les dates.
- Turbopack activé pour des démarrages rapides en dev.

## ✅ Démarrage “1 clic” (zéro setup manuel)

Après avoir cloné le projet, tu as **une seule action** à faire.

### Option A (recommandée) : une commande

```bash
npm run demarrer
```

Ce script fait automatiquement :
- installation des dépendances (`npm install`) si besoin
- création de `.env.local` depuis `.env.example` si le fichier n’existe pas
- lancement de l’app (`npm run dev`)

Ouvre ensuite : http://localhost:3000

### Option Windows : un seul clic sur PowerShell

Sur Windows, double-clique sur `Demarrer.bat` (ça appelle PowerShell avec les bons paramètres) ou fais **clic droit → Exécuter avec PowerShell** sur `Demarrer.ps1`.
Le script vérifie Node, télécharge les dépendances (`npm install`) si besoin, crée `.env.local` et lance `npm run dev`.

Si Windows bloque encore l’exécution des scripts, ouvre PowerShell dans le dossier et lance :

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File ".\Demarrer.ps1"
```

Cela contourne la restriction uniquement pour cette session.

Alternative (si tu préfères une commande) :

```bash
npm run demarrer:win
```

### Option B (macOS) : double-clic

Double-clique sur `Demarrer.command`.

> macOS peut demander l’autorisation d’exécuter le fichier la première fois.

## 🔑 Variables d’environnement

Le projet crée automatiquement `.env.local` à partir de `.env.example`.

Pour activer l’authentification (Clerk) et la carte (Mapbox), remplace les valeurs dans `.env.local`.

## 📁 Structure (minimum de fichiers)

```
src/
├── composants.jsx        (UI : boutons, cards, calendrier, toast…)
├── lib/donnees.js        (données mock + utilitaires)
└── app/
    ├── layout.jsx        (mise en page)
    ├── providers.jsx     (providers client : Toast)
    ├── page.jsx          (accueil)
    ├── recherche/        (recherche + actions serveur)
    └── reservations/     (mes réservations)
```

## 🧪 Commandes utiles

```bash
npm run dev
npm run build
npm start
npm run lint
```
