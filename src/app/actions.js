'use server'

/**
 * Crée une réservation (simulation avec données mock)
 * @param {Object} data - Données de réservation
 * @returns {Object} Résultat de la réservation
 */
export async function createBooking(data) {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Génère un ID de réservation unique
  const bookingId = 'BK-' + Date.now().toString(36).toUpperCase()
  
  return {
    success: true,
    bookingId,
    message: 'Réservation confirmée !',
    details: {
      ...data,
      createdAt: new Date().toISOString()
    }
  }
}

/**
 * Annule une réservation (simulation)
 * @param {string} bookingId - ID de la réservation
 * @returns {Object} Résultat de l'annulation
 */
export async function cancelBooking(bookingId) {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return {
    success: true,
    message: 'Réservation annulée avec succès'
  }
}
