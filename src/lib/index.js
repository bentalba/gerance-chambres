/**
 * =============================================================================
 * ATLAS - Bibliothèque principale
 * =============================================================================
 * Ce fichier contient toutes les fonctions utilitaires, données mock et
 * configuration de l'application Atlas.
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// =============================================================================
// UTILITAIRES
// =============================================================================

/**
 * Combine les classes CSS avec Tailwind merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formate un montant en Dirhams Marocains (MAD)
 */
export function formatMAD(amount) {
  return new Intl.NumberFormat("fr-MA", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + " MAD";
}

// =============================================================================
// DONNÉES MOCK - HÔTELS
// =============================================================================

/**
 * Liste des hôtels disponibles au Maroc
 * Chaque hôtel contient ses informations et chambres disponibles
 */
export const HOTELS = [
  {
    id: "hotel-1",
    name: "The Grand Atlas",
    description: "Resort de luxe en bord de mer avec vue panoramique sur l'océan et spa de classe mondiale.",
    city: "Casablanca",
    country: "Maroc",
    latitude: 33.5731,
    longitude: -7.5898,
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    rating: 4.9,
    rooms: [
      { id: "room-1a", hotelId: "hotel-1", name: "Chambre Standard", price: 850, maxGuests: 2, amenities: ["Vue ville", "Lit double", "WiFi gratuit"] },
      { id: "room-1b", hotelId: "hotel-1", name: "Chambre Double", price: 1200, maxGuests: 3, amenities: ["Vue mer", "2 lits", "Petit-déjeuner inclus"] },
      { id: "room-1c", hotelId: "hotel-1", name: "Suite Prestige", price: 2500, maxGuests: 4, amenities: ["Terrasse privée", "Salon séparé", "Service butler"] },
    ],
  },
  {
    id: "hotel-2",
    name: "Riad Moonlight",
    description: "Riad traditionnel marocain au cœur de la médina avec décoration authentique et dîner sur le toit.",
    city: "Marrakech",
    country: "Maroc",
    latitude: 31.6295,
    longitude: -7.9811,
    heroImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    rating: 4.8,
    rooms: [
      { id: "room-2a", hotelId: "hotel-2", name: "Chambre Standard", price: 650, maxGuests: 2, amenities: ["Décor traditionnel", "Climatisation", "WiFi"] },
      { id: "room-2b", hotelId: "hotel-2", name: "Chambre Double", price: 950, maxGuests: 3, amenities: ["Vue jardin", "Petit-déjeuner", "Terrasse"] },
      { id: "room-2c", hotelId: "hotel-2", name: "Suite Sultan", price: 1800, maxGuests: 4, amenities: ["Cheminée", "Hammam privé", "Accès rooftop"] },
    ],
  },
  {
    id: "hotel-3",
    name: "Azure Bay Resort",
    description: "Éco-resort moderne surplombant la Méditerranée avec pratiques durables et cuisine biologique.",
    city: "Tanger",
    country: "Maroc",
    latitude: 35.7595,
    longitude: -5.834,
    heroImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    rating: 4.7,
    rooms: [
      { id: "room-3a", hotelId: "hotel-3", name: "Chambre Standard", price: 720, maxGuests: 2, amenities: ["Éco-responsable", "Vue jardin", "WiFi"] },
      { id: "room-3b", hotelId: "hotel-3", name: "Chambre Double", price: 1100, maxGuests: 3, amenities: ["Vue mer", "Balcon", "Petit-déjeuner bio"] },
      { id: "room-3c", hotelId: "hotel-3", name: "Villa Falaise", price: 3200, maxGuests: 5, amenities: ["Accès plage privée", "Piscine à débordement", "Chef privé"] },
    ],
  },
  {
    id: "hotel-4",
    name: "Desert Oasis Lodge",
    description: "Camp de luxe dans le désert avec observation des étoiles et excursions en chameau dans le Sahara.",
    city: "Merzouga",
    country: "Maroc",
    latitude: 31.0801,
    longitude: -4.0134,
    heroImage: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    rating: 4.95,
    rooms: [
      { id: "room-4a", hotelId: "hotel-4", name: "Tente Standard", price: 580, maxGuests: 2, amenities: ["Climatisation", "Salle de bain privée", "WiFi"] },
      { id: "room-4b", hotelId: "hotel-4", name: "Tente Double", price: 900, maxGuests: 3, amenities: ["Deck observation étoiles", "Dîner inclus", "Balade chameau"] },
      { id: "room-4c", hotelId: "hotel-4", name: "Suite Royale Berbère", price: 2200, maxGuests: 4, amenities: ["Feu de camp privé", "Guide personnel", "Tout inclus"] },
    ],
  },
  {
    id: "hotel-5",
    name: "Mountain Retreat Chefchaouen",
    description: "Hôtel boutique dans la célèbre Ville Bleue avec vues imprenables sur les montagnes du Rif.",
    city: "Chefchaouen",
    country: "Maroc",
    latitude: 35.1688,
    longitude: -5.2636,
    heroImage: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    rating: 4.6,
    rooms: [
      { id: "room-5a", hotelId: "hotel-5", name: "Chambre Standard", price: 450, maxGuests: 2, amenities: ["Vue montagne", "WiFi", "Climatisation"] },
      { id: "room-5b", hotelId: "hotel-5", name: "Chambre Double", price: 680, maxGuests: 3, amenities: ["Terrasse", "Petit-déjeuner", "Vue panoramique"] },
      { id: "room-5c", hotelId: "hotel-5", name: "Loft Artiste", price: 1200, maxGuests: 4, amenities: ["Fenêtres panoramiques", "Matériel d'art", "Tapis de yoga"] },
    ],
  },
];

// =============================================================================
// FONCTIONS DE RECHERCHE
// =============================================================================

/**
 * Recherche des hôtels par ville
 * @param {string} city - Nom de la ville (optionnel)
 * @returns {Array} Liste des hôtels correspondants
 */
export function searchHotels(city) {
  if (!city) return HOTELS;
  const searchTerm = city.toLowerCase();
  return HOTELS.filter(
    (hotel) =>
      hotel.city.toLowerCase().includes(searchTerm) ||
      hotel.name.toLowerCase().includes(searchTerm)
  );
}

/**
 * Récupère un hôtel par son ID
 * @param {string} id - ID de l'hôtel
 * @returns {Object|undefined} Hôtel trouvé
 */
export function getHotelById(id) {
  return HOTELS.find((hotel) => hotel.id === id);
}

/**
 * Récupère une chambre par son ID
 * @param {string} roomId - ID de la chambre
 * @returns {Object|undefined} Chambre avec son hôtel
 */
export function getRoomById(roomId) {
  for (const hotel of HOTELS) {
    const room = hotel.rooms.find((r) => r.id === roomId);
    if (room) {
      return { ...room, hotel };
    }
  }
  return undefined;
}

// =============================================================================
// DONNÉES MOCK - RÉSERVATIONS
// =============================================================================

/**
 * Génère des réservations mock pour un utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Array} Liste des réservations
 */
export function getMockBookings(userId) {
  if (!userId) return [];
  
  const now = new Date();
  const hotel1 = HOTELS[0];
  const hotel2 = HOTELS[1];
  
  return [
    {
      id: "booking-1",
      odId: "room-1b",
      hotel: hotel1,
      room: hotel1.rooms[1],
      userId,
      guests: 2,
      checkIn: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // Dans 7 jours
      checkOut: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // Dans 10 jours
      totalPrice: hotel1.rooms[1].price * 3,
      status: "confirmed",
      createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // Il y a 2 jours
    },
    {
      id: "booking-2",
      roomId: "room-2a",
      hotel: hotel2,
      room: hotel2.rooms[0],
      userId,
      guests: 2,
      checkIn: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // Il y a 30 jours
      checkOut: new Date(now.getTime() - 27 * 24 * 60 * 60 * 1000), // Il y a 27 jours
      totalPrice: hotel2.rooms[0].price * 3,
      status: "completed",
      createdAt: new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000),
    },
  ];
}

// =============================================================================
// DESTINATIONS POPULAIRES
// =============================================================================

export const DESTINATIONS = [
  { city: "Marrakech", image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=400", hotels: 12 },
  { city: "Casablanca", image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=400", hotels: 8 },
  { city: "Chefchaouen", image: "https://images.unsplash.com/photo-1553522991-71439aa62779?w=400", hotels: 5 },
  { city: "Tanger", image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400", hotels: 6 },
];

// =============================================================================
// CARACTÉRISTIQUES DE L'APPLICATION
// =============================================================================

export const FEATURES = [
  {
    icon: "🏨",
    title: "Hôtels de luxe",
    description: "Une sélection des meilleurs établissements au Maroc.",
  },
  {
    icon: "💳",
    title: "Réservation instantanée",
    description: "Confirmez votre séjour en quelques clics.",
  },
  {
    icon: "🔒",
    title: "Paiement sécurisé",
    description: "Vos transactions sont protégées à 100%.",
  },
];
