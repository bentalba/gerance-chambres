#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
/**
 * Script "1 clic" - Projet EMSI par Oussama SAJJI
 * - Installe les dépendances si besoin
 * - Prépare .env.local si manquant (copie depuis .env.example)
 * - Lance Next.js en développement
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = process.cwd();

function log(msg) {
  process.stdout.write(msg + "\n");
}

function run(cmd, args, options = {}) {
  const res = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });
  if (res.status !== 0) process.exit(res.status || 1);
}

function ensureEnv() {
  const envLocal = path.join(ROOT, ".env.local");
  const envExample = path.join(ROOT, ".env.example");

  if (!fs.existsSync(envLocal) && fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, envLocal);
    log("✅ Fichier .env.local créé depuis .env.example");
    log("ℹ️  Pense à remplacer les valeurs (Clerk/Mapbox/DB) si nécessaire.");
  }
}

function ensureNodeModules() {
  const nm = path.join(ROOT, "node_modules");
  if (!fs.existsSync(nm)) {
    log("📦 Installation des dépendances (npm install)...");
    run("npm", ["install"]);
  }
}

function ensureDatabase() {
  // Si on a Prisma + une DATABASE_URL sqlite, on initialise automatiquement la DB locale.
  const envLocal = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envLocal)) return;

  const env = fs.readFileSync(envLocal, "utf8");
  const m = env.match(/^DATABASE_URL\s*=\s*(.+)\s*$/m);
  if (!m) return;

  const databaseUrl = m[1].trim().replace(/^"|"$/g, "");
  const isSqlite = databaseUrl.startsWith("file:");
  const isMySQL = databaseUrl.startsWith("mysql:");

  try {
    log("🗄️  Initialisation base de données (Prisma)...");
    run("npx", ["prisma", "generate"]);

    // Pour MySQL, on tente un db push (sans migrations) ; pour SQLite aussi
    run("npx", ["prisma", "db", "push"]);

    // seed (si présent)
    const seed = path.join(ROOT, "prisma", "seed.js");
    if (fs.existsSync(seed)) {
      run("node", ["prisma/seed.js"]);
    }
  } catch (err) {
    log("⚠️  Impossible d'initialiser la base. Vérifie que MySQL est démarré et que DATABASE_URL est correct.");
    log(`Détail: ${err.message || err}`);
    // On continue quand même pour laisser l'app démarrer (utilisation mock possible)
  }
}

function main() {
  log("\n🏁 Démarrage Atlas (mode 1 clic)\n");
  ensureNodeModules();
  ensureEnv();

  // DB locale (SQLite) : init auto si DATABASE_URL=file:...
  ensureDatabase();

  log("🚀 Lancement du serveur (npm run dev)...\n");
  run("npm", ["run", "dev"]);
}

main();
