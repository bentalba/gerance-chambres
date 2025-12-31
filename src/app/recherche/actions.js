/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         ⚡ ACTIONS SERVEUR                                 ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Actions côté serveur pour les réservations :                             ║
 * ║  • Créer une réservation                                                  ║
 * ║  • Annuler une réservation                                                ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

"use server";

/**
 * Crée une nouvelle réservation
 * @param {Object} donnees - Informations de la réservation
 * @returns {Object} Résultat de l'opération
 */
export async function creerReservation(donnees) {
  // Simulation d'un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Génère un ID unique
  const reservationId = "RES-" + Date.now().toString(36).toUpperCase();

  return {
    success: true,
    reservationId,
    message: "Réservation confirmée !",
    details: {
      ...donnees,
      createdAt: new Date().toISOString(),
    },
  };
}

/**
 * Annule une réservation existante
 * @returns {Object} Résultat de l'opération
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function annulerReservation(reservationId) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    success: true,
    message: "Réservation annulée avec succès",
  };
}
