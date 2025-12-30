<#
  Démarrage 1-clic (Windows)
  - Installe les dépendances si besoin
  - Crée .env.local depuis .env.example si manquant
  - Lance l'application (npm run dev)

  Usage (double-clic) : Demarrer.ps1
  Usage (PowerShell)  : .\Demarrer.ps1
#>

$ErrorActionPreference = 'Stop'

function Write-Info($msg) { Write-Host $msg -ForegroundColor Cyan }
function Write-Ok($msg)   { Write-Host $msg -ForegroundColor Green }
function Write-Warn($msg) { Write-Host $msg -ForegroundColor Yellow }

try {
  Set-Location -Path $PSScriptRoot

  Write-Host ""
  Write-Host "🏁 Démarrage Atlas (1 clic)" -ForegroundColor White
  Write-Host ""

  # 1) Vérifier Node
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Warn "Node.js n'est pas installé (commande 'node' introuvable)."
    Write-Warn "Installe Node LTS puis réessaie."
    Pause
    exit 1
  }

  # 2) Installer deps si node_modules absent
  if (-not (Test-Path -Path (Join-Path $PSScriptRoot 'node_modules'))) {
    Write-Info "📦 Installation des dépendances (npm install)..."
    npm install
    Write-Ok "✅ Dépendances installées"
  } else {
    Write-Ok "✅ Dépendances déjà installées"
  }

  # 3) Préparer .env.local
  $envLocal = Join-Path $PSScriptRoot '.env.local'
  $envExample = Join-Path $PSScriptRoot '.env.example'

  if (-not (Test-Path $envLocal) -and (Test-Path $envExample)) {
    Copy-Item $envExample $envLocal
    Write-Ok "✅ .env.local créé depuis .env.example"
    Write-Warn "ℹ️  Remplace les clés Clerk/Mapbox/DB dans .env.local si nécessaire."
  }

  # 4) Lancer
  Write-Host ""
  Write-Info "🚀 Lancement du serveur (npm run dev)..."
  Write-Host ""

  npm run dev
}
catch {
  Write-Host "\n❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
  Pause
  exit 1
}
