# ╔══════════════════════════════════════════════════════════════════════════╗<#

# ║                                                                          ║  Démarrage 1-clic (Windows)

# ║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║  - Installe les dépendances si besoin

# ║                                                                          ║  - Crée .env.local depuis .env.example si manquant

# ║     Préparé par Oussama SAJJI                                            ║  - Lance l'application (npm run dev)

# ║                                                                          ║

# ╚══════════════════════════════════════════════════════════════════════════╝  Usage (double-clic) : Demarrer.ps1

  Usage (PowerShell)  : .\Demarrer.ps1

# Script PowerShell pour Windows#>



$Host.UI.RawUI.WindowTitle = "Hotel EMSI - Système de Gestion"$ErrorActionPreference = 'Stop'



Write-Host ""function Write-Info($msg) { Write-Host $msg -ForegroundColor Cyan }

Write-Host "╔══════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyanfunction Write-Ok($msg)   { Write-Host $msg -ForegroundColor Green }

Write-Host "║                                                                          ║" -ForegroundColor Cyanfunction Write-Warn($msg) { Write-Host $msg -ForegroundColor Yellow }

Write-Host "║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║" -ForegroundColor Cyan

Write-Host "║                                                                          ║" -ForegroundColor Cyantry {

Write-Host "║     Préparé par Oussama SAJJI                                            ║" -ForegroundColor Cyan  Set-Location -Path $PSScriptRoot

Write-Host "║                                                                          ║" -ForegroundColor Cyan

Write-Host "╚══════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan  Write-Host ""

Write-Host ""  Write-Host "🏁 Démarrage Atlas (1 clic)" -ForegroundColor White

  Write-Host ""

# Vérifier Node.js

try {  # 1) Vérifier Node

    $nodeVersion = node --version  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {

    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green    Write-Warn "Node.js n'est pas installé (commande 'node' introuvable)."

} catch {    Write-Warn "Installe Node LTS puis réessaie."

    Write-Host "❌ Node.js n'est pas installé!" -ForegroundColor Red    Pause

    Write-Host "📥 Téléchargez Node.js: https://nodejs.org/" -ForegroundColor Yellow    exit 1

    Read-Host "Appuyez sur Entrée pour quitter"  }

    exit 1

}  # 2) Installer deps si node_modules absent

  if (-not (Test-Path -Path (Join-Path $PSScriptRoot 'node_modules'))) {

Write-Host ""    Write-Info "📦 Installation des dépendances (npm install)..."

    npm install

# Installer les dépendances si nécessaire    Write-Ok "✅ Dépendances installées"

if (-not (Test-Path "node_modules")) {  } else {

    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow    Write-Ok "✅ Dépendances déjà installées"

    npm install  }

    if ($LASTEXITCODE -ne 0) {

        Write-Host "❌ Erreur lors de l'installation!" -ForegroundColor Red  # 3) Préparer .env.local

        Read-Host "Appuyez sur Entrée pour quitter"  $envLocal = Join-Path $PSScriptRoot '.env.local'

        exit 1  $envExample = Join-Path $PSScriptRoot '.env.example'

    }

    Write-Host "✅ Dépendances installées!" -ForegroundColor Green  if (-not (Test-Path $envLocal) -and (Test-Path $envExample)) {

    Write-Host ""    Copy-Item $envExample $envLocal

}    Write-Ok "✅ .env.local créé depuis .env.example"

    Write-Warn "ℹ️  Remplace les clés Clerk/Mapbox/DB dans .env.local si nécessaire."

# Vérifier .env  }

if (-not (Test-Path ".env")) {

    Write-Host "⚠️  Fichier .env manquant! Création..." -ForegroundColor Yellow  # 3bis) Initialiser DB (MySQL ou SQLite) si DATABASE_URL est défini

    Copy-Item ".env.example" ".env"  if (Test-Path $envLocal) {

    Write-Host "✅ Fichier .env créé." -ForegroundColor Green    $envContent = Get-Content $envLocal -Raw

    Write-Host "⚠️  IMPORTANT: Modifiez .env avec vos paramètres MySQL!" -ForegroundColor Yellow    if ($envContent -match "(?m)^DATABASE_URL\s*=\s*(.+)\s*$") {

    notepad .env      $dbUrl = $Matches[1].Trim().Trim('"')

}      try {

        Write-Info "🗄️  Initialisation DB (Prisma)..."

function Show-Menu {        npx prisma generate

    Write-Host ""        npx prisma db push

    Write-Host "═══════════════════════════════════════════════════════════════════════════" -ForegroundColor Gray        if (Test-Path (Join-Path $PSScriptRoot 'prisma\seed.js')) {

    Write-Host ""          node .\prisma\seed.js

    Write-Host "  Que souhaitez-vous faire?" -ForegroundColor White        }

    Write-Host ""        Write-Ok "✅ DB prête"

    Write-Host "  [1] 🚀 Démarrer le serveur API (Express.js)" -ForegroundColor White      }

    Write-Host "  [2] 📋 Lancer le menu console (CLI)" -ForegroundColor White      catch {

    Write-Host "  [3] 🔄 Synchroniser la base de données" -ForegroundColor White        Write-Warn "⚠️  Initialisation DB échouée. Vérifie MySQL (ou la connexion) puis relance."

    Write-Host "  [4] 🌱 Peupler la base avec des données de test" -ForegroundColor White        Write-Warn "Détail: $($_.Exception.Message)"

    Write-Host "  [5] ⚠️  Réinitialiser la base de données" -ForegroundColor Yellow      }

    Write-Host "  [6] ⏰ Démarrer les tâches automatiques (Cron)" -ForegroundColor White    }

    Write-Host "  [7] 📚 Ouvrir la documentation API (Swagger)" -ForegroundColor White  }

    Write-Host "  [8] ❌ Quitter" -ForegroundColor Red

    Write-Host ""  # 4) Lancer

    Write-Host "═══════════════════════════════════════════════════════════════════════════" -ForegroundColor Gray  Write-Host ""

    Write-Host ""  Write-Info "🚀 Lancement du serveur (npm run dev)..."

}  Write-Host ""



Show-Menu  npm run dev

$choice = Read-Host "Votre choix [1-8]"}

catch {

switch ($choice) {  Write-Host "\n❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red

    "1" {  Pause

        Write-Host ""  exit 1

        Write-Host "🚀 Démarrage du serveur API..." -ForegroundColor Green}

        Write-Host "   URL: http://localhost:3000" -ForegroundColor Gray
        Write-Host "   Swagger: http://localhost:3000/api/docs" -ForegroundColor Gray
        Write-Host ""
        Write-Host "   Appuyez sur Ctrl+C pour arrêter." -ForegroundColor Yellow
        Write-Host ""
        npm run dev
    }
    "2" {
        Write-Host ""
        Write-Host "📋 Lancement du menu console..." -ForegroundColor Green
        Write-Host ""
        npm run cli
    }
    "3" {
        Write-Host ""
        Write-Host "🔄 Synchronisation de la base de données..." -ForegroundColor Green
        npm run db:sync
        Read-Host "Appuyez sur Entrée pour continuer"
    }
    "4" {
        Write-Host ""
        Write-Host "🌱 Peuplement de la base de données..." -ForegroundColor Green
        npm run db:seed
        Read-Host "Appuyez sur Entrée pour continuer"
    }
    "5" {
        Write-Host ""
        Write-Host "⚠️  ATTENTION: Ceci va SUPPRIMER toutes les données!" -ForegroundColor Red
        $confirm = Read-Host "Êtes-vous sûr? (oui/non)"
        if ($confirm -eq "oui") {
            npm run db:reset
        }
        Read-Host "Appuyez sur Entrée pour continuer"
    }
    "6" {
        Write-Host ""
        Write-Host "⏰ Démarrage des tâches automatiques..." -ForegroundColor Green
        Write-Host "   Appuyez sur Ctrl+C pour arrêter." -ForegroundColor Yellow
        npm run cron
    }
    "7" {
        Write-Host ""
        Write-Host "📚 Ouverture de la documentation Swagger..." -ForegroundColor Green
        Write-Host "   Note: Le serveur doit être démarré!" -ForegroundColor Yellow
        Start-Process "http://localhost:3000/api/docs"
        Read-Host "Appuyez sur Entrée pour continuer"
    }
    "8" {
        Write-Host ""
        Write-Host "👋 Au revoir!" -ForegroundColor Cyan
        exit 0
    }
    default {
        Write-Host "❌ Choix invalide!" -ForegroundColor Red
    }
}
