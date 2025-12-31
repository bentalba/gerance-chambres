/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Seed Prisma (MySQL) - Projet EMSI par Oussama SAJJI
 * 
 * Cree:
 * - 3 clients de demonstration
 * - 80 chambres (8 etages x 10 chambres)
 * - 2 reservations de test
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🏨 Initialisation de la base de donnees...\n");

  // ═══════════════════════════════════════════════════════════════════════════
  // CLIENTS (3 clients de demonstration)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("👥 Creation des clients...");

  const clientsData = [
    { nom: "Dupont", prenom: "Alice", adresse: "10 Rue des Fleurs, Casablanca" },
    { nom: "Benali", prenom: "Youssef", adresse: "45 Avenue Mohammed V, Rabat" },
    { nom: "Martin", prenom: "Sophie", adresse: "23 Boulevard Hassan II, Marrakech" },
  ];

  const clients = [];
  for (let i = 0; i < clientsData.length; i++) {
    const client = await prisma.client.upsert({
      where: { id: i + 1 },
      update: {},
      create: clientsData[i],
    });
    clients.push(client);
    console.log(`   ✓ Client ${client.prenom} ${client.nom} (ID: ${client.id})`);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CHAMBRES (80 chambres: 8 etages x 10 chambres)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("\n🛏️  Creation des 80 chambres...");

  const chambres = [];
  for (let etage = 1; etage <= 8; etage++) {
    for (let num = 1; num <= 10; num++) {
      const numero = `${etage}${num.toString().padStart(2, "0")}`;
      const telephone = `0522-000-${numero}`;
      
      const chambre = await prisma.chambre.upsert({
        where: { numero },
        update: {},
        create: { numero, telephone },
      });
      chambres.push(chambre);
    }
    console.log(`   ✓ Etage ${etage}: chambres ${etage}01 a ${etage}10`);
  }
  console.log(`   Total: ${chambres.length} chambres`);

  // ═══════════════════════════════════════════════════════════════════════════
  // RESERVATIONS (2 reservations de demonstration)
  // ═══════════════════════════════════════════════════════════════════════════
  console.log("\n📋 Creation des reservations de test...");

  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const afterTomorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

  // Reservation 1: Alice, chambres 101 et 102, en cours
  const res1 = await prisma.reservation.upsert({
    where: { code: "RES-DEMO-001" },
    update: {},
    create: {
      code: "RES-DEMO-001",
      clientId: clients[0].id,
      etat: "EnCours",
      dateDebut: today,
      dateFin: tomorrow,
      chambres: {
        create: [
          { chambreId: chambres[0].id },  // 101
          { chambreId: chambres[1].id },  // 102
        ],
      },
    },
  });
  console.log(`   ✓ ${res1.code}: ${clients[0].prenom} - Chambres 101, 102 (${res1.etat})`);

  // Reservation 2: Youssef, chambre 201, validee
  const res2 = await prisma.reservation.upsert({
    where: { code: "RES-DEMO-002" },
    update: {},
    create: {
      code: "RES-DEMO-002",
      clientId: clients[1].id,
      etat: "Validee",
      dateDebut: tomorrow,
      dateFin: afterTomorrow,
      chambres: {
        create: [
          { chambreId: chambres[10].id },  // 201
        ],
      },
    },
  });
  console.log(`   ✓ ${res2.code}: ${clients[1].prenom} - Chambre 201 (${res2.etat})`);

  console.log("\n════════════════════════════════════════════════════════════════");
  console.log("✅ Base de donnees initialisee avec succes!");
  console.log("════════════════════════════════════════════════════════════════\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erreur:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
