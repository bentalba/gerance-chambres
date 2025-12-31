/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Seed Prisma (MySQL) - Projet EMSI par Oussama SAJJI
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clients
  const clients = await prisma.$transaction([
    prisma.client.upsert({
      where: { id: 1 },
      update: {},
      create: { nom: "Dupont", prenom: "Alice", adresse: "10 Rue des Fleurs, Casablanca" },
    }),
    prisma.client.upsert({
      where: { id: 2 },
      update: {},
      create: { nom: "Benali", prenom: "Youssef", adresse: "45 Avenue Mohammed V, Rabat" },
    }),
  ]);

  // Chambres
  const chambres = await prisma.$transaction([
    prisma.chambre.upsert({
      where: { numero: "101" },
      update: {},
      create: { numero: "101", telephone: "0522-000-101" },
    }),
    prisma.chambre.upsert({
      where: { numero: "102" },
      update: {},
      create: { numero: "102", telephone: "0522-000-102" },
    }),
    prisma.chambre.upsert({
      where: { numero: "201" },
      update: {},
      create: { numero: "201", telephone: "0522-000-201" },
    }),
  ]);

  // Réservations (exemple) avec liaisons chambres
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  await prisma.reservation.upsert({
    where: { code: "RES-ALICE-1" },
    update: {},
    create: {
      code: "RES-ALICE-1",
      clientId: clients[0].id,
      etat: "EnCours",
      dateDebut: today,
      dateFin: tomorrow,
      chambres: {
        create: [{ chambreId: chambres[0].id }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Seed terminé (MySQL)");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
