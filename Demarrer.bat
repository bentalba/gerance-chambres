@echo off@echo off

chcp 65001 >nulsetlocal

cls

REM Lance PowerShell en contournant la policy pour cette session et en se plaçant dans le dossier du script

echo.powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; Set-Location '%~dp0'; .\Demarrer.ps1"

echo ╔══════════════════════════════════════════════════════════════════════════╗

echo ║                                                                          ║endlocal

echo ║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - EMSI  🏨                          ║
echo ║                                                                          ║
echo ║     Préparé par Oussama SAJJI                                            ║
echo ║                                                                          ║
echo ╚══════════════════════════════════════════════════════════════════════════╝
echo.

:: Vérifier si Node.js est installé
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé!
    echo.
    echo 📥 Téléchargez Node.js: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js détecté: 
node --version
echo.

:: Vérifier si les dépendances sont installées
if not exist "node_modules" (
    echo 📦 Installation des dépendances...
    echo.
    call npm install
    if errorlevel 1 (
        echo ❌ Erreur lors de l'installation des dépendances!
        pause
        exit /b 1
    )
    echo.
    echo ✅ Dépendances installées!
    echo.
)

:: Vérifier le fichier .env
if not exist ".env" (
    echo ⚠️  Fichier .env manquant! Création à partir de .env.example...
    copy .env.example .env >nul
    echo ✅ Fichier .env créé.
    echo.
    echo ⚠️  IMPORTANT: Modifiez le fichier .env avec vos paramètres MySQL!
    echo.
    notepad .env
)

echo.
echo ═══════════════════════════════════════════════════════════════════════════
echo.
echo   Que souhaitez-vous faire?
echo.
echo   [1] 🚀 Démarrer le serveur API (Express.js)
echo   [2] 📋 Lancer le menu console (CLI)
echo   [3] 🔄 Synchroniser la base de données
echo   [4] 🌱 Peupler la base avec des données de test
echo   [5] ⚠️  Réinitialiser la base de données
echo   [6] ⏰ Démarrer les tâches automatiques (Cron)
echo   [7] 📚 Ouvrir la documentation API (Swagger)
echo   [8] ❌ Quitter
echo.
echo ═══════════════════════════════════════════════════════════════════════════
echo.

set /p choice="Votre choix [1-8]: "

if "%choice%"=="1" goto :start_server
if "%choice%"=="2" goto :start_cli
if "%choice%"=="3" goto :sync_db
if "%choice%"=="4" goto :seed_db
if "%choice%"=="5" goto :reset_db
if "%choice%"=="6" goto :start_cron
if "%choice%"=="7" goto :open_docs
if "%choice%"=="8" goto :exit

echo ❌ Choix invalide!
pause
goto :eof

:start_server
echo.
echo 🚀 Démarrage du serveur API...
echo    URL: http://localhost:3000
echo    Swagger: http://localhost:3000/api/docs
echo.
echo    Appuyez sur Ctrl+C pour arrêter le serveur.
echo.
call npm run dev
goto :eof

:start_cli
echo.
echo 📋 Lancement du menu console...
echo.
call npm run cli
goto :eof

:sync_db
echo.
echo 🔄 Synchronisation de la base de données...
echo.
call npm run db:sync
echo.
pause
goto :eof

:seed_db
echo.
echo 🌱 Peuplement de la base de données...
echo.
call npm run db:seed
echo.
pause
goto :eof

:reset_db
echo.
echo ⚠️  ATTENTION: Ceci va SUPPRIMER toutes les données!
set /p confirm="Êtes-vous sûr? (oui/non): "
if /i "%confirm%"=="oui" (
    echo.
    call npm run db:reset
)
echo.
pause
goto :eof

:start_cron
echo.
echo ⏰ Démarrage des tâches automatiques...
echo    Appuyez sur Ctrl+C pour arrêter.
echo.
call npm run cron
goto :eof

:open_docs
echo.
echo 📚 Ouverture de la documentation Swagger...
echo    Note: Le serveur doit être démarré!
echo.
start http://localhost:3000/api/docs
pause
goto :eof

:exit
echo.
echo 👋 Au revoir!
echo.
exit /b 0
