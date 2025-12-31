#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║              PROGRAMME PRINCIPAL - GESTION HOTEL                          ║
 * ║              Projet EMSI par Oussama SAJJI                                ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Menu interactif pour tester toutes les classes et fonctions              ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const readline = require("readline");
const { Client, Chambre, Reservation, GestionReservations } = require("./src/lib/classes");

// ═══════════════════════════════════════════════════════════════════════════
// DONNEES DE TEST
// ═══════════════════════════════════════════════════════════════════════════

// Clients de demonstration
const clients = [
  new Client(1, "Dupont", "Alice", "10 Rue des Fleurs, Casablanca"),
  new Client(2, "Benali", "Youssef", "45 Avenue Mohammed V, Rabat"),
  new Client(3, "Martin", "Sophie", "23 Boulevard Hassan II, Marrakech"),
];

// Chambres de l'hotel (80 chambres)
const chambres = [];
for (let etage = 1; etage <= 8; etage++) {
  for (let num = 1; num <= 10; num++) {
    const numero = `${etage}${num.toString().padStart(2, "0")}`;
    chambres.push(new Chambre(chambres.length + 1, numero, `0522-000-${numero}`));
  }
}

// Gestionnaire de reservations
const gestion = new GestionReservations();

// Creer quelques reservations de test
const aujourdhui = new Date();
const demain = new Date(aujourdhui.getTime() + 24 * 60 * 60 * 1000);
const aprèsDemain = new Date(aujourdhui.getTime() + 2 * 24 * 60 * 60 * 1000);

const res1 = new Reservation(1, "RES-001", clients[0], "EnCours", aujourdhui, demain);
res1.ajouterChambre(chambres[0]); // Chambre 101
res1.ajouterChambre(chambres[1]); // Chambre 102
gestion.ajouterReservation(res1);

const res2 = new Reservation(2, "RES-002", clients[1], "Validee", demain, aprèsDemain);
res2.ajouterChambre(chambres[10]); // Chambre 201
gestion.ajouterReservation(res2);

// ═══════════════════════════════════════════════════════════════════════════
// INTERFACE READLINE
// ═══════════════════════════════════════════════════════════════════════════

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

function afficherMenu() {
  console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                    SYSTEME DE GESTION HOTEL                               ║
║                    Projet EMSI - Oussama SAJJI                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║  1. 📋 Afficher toutes les reservations                                   ║
║  2. 🔍 Rechercher une reservation (par code)                              ║
║  3. ➕ Creer une nouvelle reservation                                     ║
║  4. ❌ Supprimer une reservation                                          ║
║  5. ✅ Valider une reservation                                            ║
║  6. 🚫 Annuler une reservation                                            ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  GESTION DES CHAMBRES                                                     ║
╠───────────────────────────────────────────────────────────────────────────╣
║  7. 🛏️  Ajouter une chambre a une reservation                             ║
║  8. 🗑️  Supprimer une chambre d'une reservation                           ║
║  9. 🔄 Modifier une chambre (remplacer)                                   ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  FILTRES ET RAPPORTS                                                      ║
╠───────────────────────────────────────────────────────────────────────────╣
║  10. 📅 Reservations d'aujourd'hui                                        ║
║  11. ⌛ Reservations expirant aujourd'hui                                 ║
║  12. 🔒 Annuler les reservations expirees                                 ║
║  13. 📊 Statistiques                                                      ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  TESTS                                                                    ║
╠───────────────────────────────────────────────────────────────────────────╣
║  14. 👤 Verifier si un client a des reservations                          ║
║  15. 🛏️  Afficher les chambres disponibles                                ║
║  16. 👥 Afficher les clients                                              ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  0. 🚪 Quitter                                                            ║
╚═══════════════════════════════════════════════════════════════════════════╝
`);
}

// ═══════════════════════════════════════════════════════════════════════════
// FONCTIONS DU MENU
// ═══════════════════════════════════════════════════════════════════════════

async function afficherToutesReservations() {
  console.log(gestion.afficherToutes());
}

async function rechercherReservation() {
  const code = await question("Entrez le code de la reservation: ");
  const res = gestion.trouverReservation(code);
  if (res) {
    console.log(res.afficher());
  } else {
    console.log(`\n❌ Reservation "${code}" introuvable.\n`);
  }
}

async function creerReservation() {
  console.log("\n--- CREATION D'UNE NOUVELLE RESERVATION ---\n");

  // Afficher les clients disponibles
  console.log("Clients disponibles:");
  clients.forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.nomComplet} (ID: ${c.id})`);
  });

  const clientIndex = parseInt(await question("Choisir un client (numero): ")) - 1;
  if (clientIndex < 0 || clientIndex >= clients.length) {
    console.log("❌ Client invalide.");
    return;
  }

  const client = clients[clientIndex];
  const code = Reservation.genererCode();

  console.log("\n📅 Dates de la reservation:");
  const debutStr = await question("Date debut (YYYY-MM-DD): ");
  const finStr = await question("Date fin (YYYY-MM-DD): ");

  const dateDebut = new Date(debutStr);
  const dateFin = new Date(finStr);

  if (isNaN(dateDebut.getTime()) || isNaN(dateFin.getTime())) {
    console.log("❌ Dates invalides.");
    return;
  }

  const reservation = new Reservation(null, code, client, "EnCours", dateDebut, dateFin);

  // Ajouter des chambres
  console.log("\n🛏️ Ajouter des chambres (max 5):");
  let ajouterChambre = true;
  while (ajouterChambre && reservation.nombreChambres < 5) {
    const numeroStr = await question(`Numero de chambre (101-810) ou 'fin': `);
    if (numeroStr.toLowerCase() === "fin") {
      ajouterChambre = false;
      break;
    }

    const chambre = chambres.find((c) => c.numero === numeroStr);
    if (!chambre) {
      console.log("❌ Chambre introuvable.");
      continue;
    }

    // Verifier disponibilite
    if (!gestion.chambreDisponible(chambre, dateDebut, dateFin)) {
      console.log(`❌ Chambre ${numeroStr} non disponible sur cette periode.`);
      continue;
    }

    const result = reservation.ajouterChambre(chambre);
    console.log(result.success ? `✅ ${result.message}` : `❌ ${result.message}`);
  }

  const result = gestion.ajouterReservation(reservation);
  console.log(result.success ? `\n✅ ${result.message}` : `\n❌ ${result.message}`);
  console.log(reservation.afficher());
}

async function supprimerReservation() {
  const code = await question("Entrez le code de la reservation a supprimer: ");
  const result = gestion.supprimerReservation(code);
  console.log(result.success ? `\n✅ ${result.message}` : `\n❌ ${result.message}`);
}

async function validerReservation() {
  const code = await question("Entrez le code de la reservation a valider: ");
  const res = gestion.trouverReservation(code);
  if (!res) {
    console.log(`\n❌ Reservation "${code}" introuvable.`);
    return;
  }
  const result = res.valider();
  console.log(result.success ? `\n✅ ${result.message}` : `\n❌ ${result.message}`);
}

async function annulerReservation() {
  const code = await question("Entrez le code de la reservation a annuler: ");
  const res = gestion.trouverReservation(code);
  if (!res) {
    console.log(`\n❌ Reservation "${code}" introuvable.`);
    return;
  }
  const result = res.annuler();
  console.log(result.success ? `\n✅ ${result.message}` : `\n❌ ${result.message}`);
}

async function ajouterChambreAReservation() {
  const code = await question("Code de la reservation: ");
  const res = gestion.trouverReservation(code);
  if (!res) {
    console.log(`\n❌ Reservation "${code}" introuvable.`);
    return;
  }

  const numero = await question("Numero de chambre a ajouter: ");
  const chambre = chambres.find((c) => c.numero === numero);
  if (!chambre) {
    console.log("❌ Chambre introuvable.");
    return;
  }

  // Verifier disponibilite
  if (!gestion.chambreDisponible(chambre, res.dateDebut, res.dateFin)) {
    console.log(`❌ Chambre ${numero} non disponible sur cette periode.`);
    return;
  }

  const result = res.ajouterChambre(chambre);
  console.log(result.success ? `\n✅ ${result.message}` : `\n❌ ${result.message}`);
}

async function supprimerChambreDeReservation() {
  const code = await question("Code de la reservation: ");
  const res = gestion.trouverReservation(code);
  if (!res) {
    console.log(`\n❌ Reservation "${code}" introuvable.`);
    return;
  }

  console.log("Chambres actuelles:");
  res.chambres.forEach((c, i) => console.log(`  ${i + 1}. ${c.numero}`));

  const numero = await question("Numero de chambre a supprimer: ");
  const chambre = chambres.find((c) => c.numero === numero);
  if (!chambre) {
    console.log("❌ Chambre introuvable.");
    return;
  }

  const result = res.supprimerChambre(chambre);
  console.log(result.success ? `\n✅ ${result.message}` : `\n❌ ${result.message}`);
}

async function modifierChambreReservation() {
  const code = await question("Code de la reservation: ");
  const ancienNumero = await question("Numero de l'ancienne chambre: ");
  const nouveauNumero = await question("Numero de la nouvelle chambre: ");

  const ancienne = chambres.find((c) => c.numero === ancienNumero);
  const nouvelle = chambres.find((c) => c.numero === nouveauNumero);

  if (!ancienne || !nouvelle) {
    console.log("❌ Chambre(s) introuvable(s).");
    return;
  }

  const result = gestion.modifierChambreReservation(code, ancienne, nouvelle);
  console.log(result.success ? `\n✅ ${result.message}` : `\n❌ ${result.message}`);
}

async function afficherReservationsAujourdhui() {
  console.log(gestion.afficherReservationsAujourdhui());
}

async function afficherReservationsExpirant() {
  console.log(gestion.afficherReservationsExpirantAujourdhui());
}

async function annulerReservationsExpirees() {
  const result = gestion.annulerReservationsExpirees();
  console.log(`\n${result.message}`);
  if (result.count > 0) {
    console.log("Reservations concernees:");
    result.reservations.forEach((r) => console.log(`  - ${r.code}`));
  }
}

async function afficherStatistiques() {
  console.log(gestion.afficherStatistiques());
}

async function verifierClientReservations() {
  console.log("Clients:");
  clients.forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.nomComplet} (ID: ${c.id})`);
  });

  const clientIndex = parseInt(await question("Choisir un client (numero): ")) - 1;
  if (clientIndex < 0 || clientIndex >= clients.length) {
    console.log("❌ Client invalide.");
    return;
  }

  const client = clients[clientIndex];
  const aReservation = gestion.clientAReservation(client);

  if (aReservation) {
    console.log(`\n✅ ${client.nomComplet} a effectue des reservations:`);
    gestion.getReservationsClient(client).forEach((r) => {
      console.log(`  - ${r.code} (${r.etat})`);
    });
  } else {
    console.log(`\n❌ ${client.nomComplet} n'a pas de reservation.`);
  }
}

async function afficherChambresDisponibles() {
  console.log("\n📅 Verifier la disponibilite:");
  const debutStr = await question("Date debut (YYYY-MM-DD): ");
  const finStr = await question("Date fin (YYYY-MM-DD): ");

  const dateDebut = new Date(debutStr);
  const dateFin = new Date(finStr);

  if (isNaN(dateDebut.getTime()) || isNaN(dateFin.getTime())) {
    console.log("❌ Dates invalides.");
    return;
  }

  const disponibles = chambres.filter((c) => gestion.chambreDisponible(c, dateDebut, dateFin));
  console.log(`\n🛏️ ${disponibles.length} chambres disponibles du ${debutStr} au ${finStr}:`);
  disponibles.slice(0, 20).forEach((c) => {
    console.log(`  - Chambre ${c.numero} (Tel: ${c.telephone})`);
  });
  if (disponibles.length > 20) {
    console.log(`  ... et ${disponibles.length - 20} autres`);
  }
}

async function afficherClients() {
  console.log("\n👥 LISTE DES CLIENTS:\n");
  clients.forEach((c) => {
    console.log(c.afficher());
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// BOUCLE PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║     🏨  BIENVENUE DANS LE SYSTEME DE GESTION HOTEL                        ║
║                                                                           ║
║     Projet EMSI - Prepare par Oussama SAJJI                               ║
║     Hotel: 80 chambres (${chambres.length} chargees)                                        ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
`);

  let continuer = true;

  while (continuer) {
    afficherMenu();
    const choix = await question("Votre choix: ");

    switch (choix) {
      case "1":
        await afficherToutesReservations();
        break;
      case "2":
        await rechercherReservation();
        break;
      case "3":
        await creerReservation();
        break;
      case "4":
        await supprimerReservation();
        break;
      case "5":
        await validerReservation();
        break;
      case "6":
        await annulerReservation();
        break;
      case "7":
        await ajouterChambreAReservation();
        break;
      case "8":
        await supprimerChambreDeReservation();
        break;
      case "9":
        await modifierChambreReservation();
        break;
      case "10":
        await afficherReservationsAujourdhui();
        break;
      case "11":
        await afficherReservationsExpirant();
        break;
      case "12":
        await annulerReservationsExpirees();
        break;
      case "13":
        await afficherStatistiques();
        break;
      case "14":
        await verifierClientReservations();
        break;
      case "15":
        await afficherChambresDisponibles();
        break;
      case "16":
        await afficherClients();
        break;
      case "0":
        continuer = false;
        console.log("\n👋 Au revoir!\n");
        break;
      default:
        console.log("\n❌ Choix invalide. Veuillez reessayer.\n");
    }

    if (continuer) {
      await question("\nAppuyez sur Entree pour continuer...");
    }
  }

  rl.close();
}

// Lancer le programme
main().catch(console.error);
