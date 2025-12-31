"use server";

import {
  prisma,
  creerReservationAvecChambres,
  ajouterChambreReservation,
  supprimerChambreReservation,
  autoCloturerReservationsDuJour,
  reservationsCreeesAujourdhui,
  reservationsQuiSeTerminantAujourdhui,
} from "@/lib/hotelService.js";

export async function creerReservation({ clientId, chambreIds = [], dateDebut, dateFin }) {
  const reservation = await creerReservationAvecChambres({ clientId, chambreIds, dateDebut, dateFin });
  return { success: true, reservation };
}

export async function ajouterChambre({ reservationId, chambreId, dateDebut, dateFin }) {
  const reservation = await ajouterChambreReservation({ reservationId, chambreId, dateDebut, dateFin });
  return { success: true, reservation };
}

export async function retirerChambre({ reservationId, chambreId }) {
  await supprimerChambreReservation({ reservationId, chambreId });
  return { success: true };
}

export async function annulerReservation(reservationId) {
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { etat: "Annulee" },
  });
  return { success: true };
}

export async function listeReservationsDuJour() {
  const creees = await reservationsCreeesAujourdhui();
  const expirant = await reservationsQuiSeTerminantAujourdhui();
  return { creees, expirant };
}

export async function cloturerReservationsQuiExpirent() {
  const nb = await autoCloturerReservationsDuJour({ etat: "Expiree" });
  return { success: true, count: nb };
}
