import { PrismaClient } from "@prisma/client";
import {
  differenceInCalendarDays,
  startOfDay,
  endOfDay,
} from "date-fns";

// Singleton Prisma (évite les multiples connexions en dev)
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

// ────────────────────────────────────────────────────────────
// Utilitaires
// ────────────────────────────────────────────────────────────
export function comparerChambres(a, b) {
  return a.numero.localeCompare(b.numero);
}

export function calculerDureeSejour(dateDebut, dateFin) {
  const d1 = new Date(dateDebut);
  const d2 = new Date(dateFin);
  const delta = Math.max(1, differenceInCalendarDays(d2, d1));
  return delta;
}

// Vérifie la dispo d'une chambre sur une période
export async function checkDisponibiliteChambre(chambreId, dateDebut, dateFin) {
  const start = new Date(dateDebut);
  const end = new Date(dateFin);
  const overlap = await prisma.reservationChambre.findFirst({
    where: {
      chambreId,
      reservation: {
        dateDebut: { lt: end },
        dateFin: { gt: start },
      },
    },
  });
  return !overlap;
}

// Ajoute une chambre à une réservation (avec limite et anti-doublon)
export async function ajouterChambreReservation({
  reservationId,
  chambreId,
  dateDebut,
  dateFin,
  maxChambres = 5,
}) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { chambres: true },
  });
  if (!reservation) throw new Error("Réservation introuvable");

  if (reservation.chambres.length >= maxChambres) {
    throw new Error(`Limite de ${maxChambres} chambres atteinte pour cette réservation.`);
  }
  if (reservation.chambres.some((c) => c.chambreId === chambreId)) {
    throw new Error("Cette chambre est déjà attachée à la réservation.");
  }

  const dispo = await checkDisponibiliteChambre(chambreId, dateDebut, dateFin);
  if (!dispo) throw new Error("Chambre indisponible sur cette période.");

  await prisma.reservationChambre.create({
    data: { reservationId, chambreId },
  });

  return prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { chambres: { include: { chambre: true } }, client: true },
  });
}

export async function supprimerChambreReservation({ reservationId, chambreId }) {
  const deleted = await prisma.reservationChambre.deleteMany({
    where: { reservationId, chambreId },
  });
  if (deleted.count === 0) throw new Error("Chambre non trouvée dans la réservation.");
  return true;
}

// Historique d'un client
export function historiqueClient(clientId) {
  return prisma.reservation.findMany({
    where: { clientId },
    include: {
      client: true,
      chambres: { include: { chambre: true } },
    },
    orderBy: { dateDebut: "desc" },
  });
}

export function reservationsCreeesAujourdhui() {
  const start = startOfDay(new Date());
  const end = endOfDay(new Date());
  return prisma.reservation.findMany({
    where: { createdAt: { gte: start, lte: end } },
    include: { client: true, chambres: { include: { chambre: true } } },
  });
}

export function reservationsQuiSeTerminantAujourdhui() {
  const start = startOfDay(new Date());
  const end = endOfDay(new Date());
  return prisma.reservation.findMany({
    where: { dateFin: { gte: start, lte: end } },
    include: { client: true, chambres: { include: { chambre: true } } },
  });
}

export async function autoCloturerReservationsDuJour({ etat = "Expiree" } = {}) {
  const start = startOfDay(new Date());
  const end = endOfDay(new Date());
  const res = await prisma.reservation.updateMany({
    where: {
      dateFin: { gte: start, lte: end },
      NOT: { etat },
    },
    data: { etat },
  });
  return res.count;
}

// Création de réservation (avec chambres) + vérif disponibilité
export async function creerReservationAvecChambres({ clientId, chambreIds = [], dateDebut, dateFin, etat = "EnCours" }) {
  const code = `RES-${Date.now().toString(36).toUpperCase()}`;
  const start = new Date(dateDebut);
  const end = new Date(dateFin);

  // Vérifier dispo pour toutes les chambres
  for (const chambreId of chambreIds) {
    const dispo = await checkDisponibiliteChambre(chambreId, start, end);
    if (!dispo) throw new Error(`Chambre ${chambreId} indisponible sur cette période.`);
  }

  const reservation = await prisma.reservation.create({
    data: {
      code,
      clientId,
      etat,
      dateDebut: start,
      dateFin: end,
      chambres: {
        create: chambreIds.map((id) => ({ chambreId: id })),
      },
    },
    include: { client: true, chambres: { include: { chambre: true } } },
  });

  return reservation;
}

// Vérifie si un client a déjà des réservations (existence)
export async function clientAReservations(clientId) {
  const count = await prisma.reservation.count({ where: { clientId } });
  return count > 0;
}