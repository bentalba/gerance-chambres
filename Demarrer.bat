@echo off
setlocal

REM Lance PowerShell en contournant la policy pour cette session et en se plaçant dans le dossier du script
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; Set-Location '%~dp0'; .\Demarrer.ps1"

endlocal
