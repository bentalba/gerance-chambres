@echo off
setlocal

REM Lance PowerShell avec la politique d'exécution bypass pour exécuter Demarrer.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Demarrer.ps1"

endlocal
