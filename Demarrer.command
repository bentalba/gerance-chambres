#!/bin/bash#!/bin/bash

set -euo pipefail

# ╔══════════════════════════════════════════════════════════════════════════╗cd "$(dirname "$0")"

# ║                                                                          ║

# ║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║# Lance le script Node (macOS : double-clic)

# ║                                                                          ║node scripts/demarrer.js

# ║     Préparé par Oussama SAJJI                                            ║
# ║                                                                          ║
# ╚══════════════════════════════════════════════════════════════════════════╝

# Script Bash pour macOS/Linux

clear

echo ""
echo "╔══════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                          ║"
echo "║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║"
echo "║                                                                          ║"
echo "║     Préparé par Oussama SAJJI                                            ║"
echo "║                                                                          ║"
echo "╚══════════════════════════════════════════════════════════════════════════╝"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé!"
    echo "📥 Téléchargez Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js détecté: $(node --version)"
echo ""

# Aller dans le répertoire du script
cd "$(dirname "$0")"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Erreur lors de l'installation!"
        exit 1
    fi
    echo "✅ Dépendances installées!"
    echo ""
fi

# Vérifier .env
if [ ! -f ".env" ]; then
    echo "⚠️  Fichier .env manquant! Création..."
    cp .env.example .env
    echo "✅ Fichier .env créé."
    echo "⚠️  IMPORTANT: Modifiez .env avec vos paramètres MySQL!"
    echo ""
fi

show_menu() {
    echo ""
    echo "═══════════════════════════════════════════════════════════════════════════"
    echo ""
    echo "  Que souhaitez-vous faire?"
    echo ""
    echo "  [1] 🚀 Démarrer le serveur API (Express.js)"
    echo "  [2] 📋 Lancer le menu console (CLI)"
    echo "  [3] 🔄 Synchroniser la base de données"
    echo "  [4] 🌱 Peupler la base avec des données de test"
    echo "  [5] ⚠️  Réinitialiser la base de données"
    echo "  [6] ⏰ Démarrer les tâches automatiques (Cron)"
    echo "  [7] 📚 Ouvrir la documentation API (Swagger)"
    echo "  [8] ❌ Quitter"
    echo ""
    echo "═══════════════════════════════════════════════════════════════════════════"
    echo ""
}

show_menu
read -p "Votre choix [1-8]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 Démarrage du serveur API..."
        echo "   URL: http://localhost:3000"
        echo "   Swagger: http://localhost:3000/api/docs"
        echo ""
        echo "   Appuyez sur Ctrl+C pour arrêter."
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "📋 Lancement du menu console..."
        echo ""
        npm run cli
        ;;
    3)
        echo ""
        echo "🔄 Synchronisation de la base de données..."
        npm run db:sync
        read -p "Appuyez sur Entrée pour continuer..."
        ;;
    4)
        echo ""
        echo "🌱 Peuplement de la base de données..."
        npm run db:seed
        read -p "Appuyez sur Entrée pour continuer..."
        ;;
    5)
        echo ""
        echo "⚠️  ATTENTION: Ceci va SUPPRIMER toutes les données!"
        read -p "Êtes-vous sûr? (oui/non): " confirm
        if [ "$confirm" = "oui" ]; then
            npm run db:reset
        fi
        read -p "Appuyez sur Entrée pour continuer..."
        ;;
    6)
        echo ""
        echo "⏰ Démarrage des tâches automatiques..."
        echo "   Appuyez sur Ctrl+C pour arrêter."
        npm run cron
        ;;
    7)
        echo ""
        echo "📚 Ouverture de la documentation Swagger..."
        echo "   Note: Le serveur doit être démarré!"
        if command -v open &> /dev/null; then
            open "http://localhost:3000/api/docs"
        elif command -v xdg-open &> /dev/null; then
            xdg-open "http://localhost:3000/api/docs"
        fi
        read -p "Appuyez sur Entrée pour continuer..."
        ;;
    8)
        echo ""
        echo "👋 Au revoir!"
        exit 0
        ;;
    *)
        echo "❌ Choix invalide!"
        ;;
esac
