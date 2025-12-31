/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    INDEX DES MODELS - ASSOCIATIONS                         ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Configuration des relations entre les tables                             ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const Client = require('./Client');
const Chambre = require('./Chambre');
const Reservation = require('./Reservation');
const ReservationChambre = require('./ReservationChambre');
const { sequelize } = require('../config/database');

// ═══════════════════════════════════════════════════════════════════════════
// ASSOCIATIONS
// ═══════════════════════════════════════════════════════════════════════════

// Client <-> Reservation (One-to-Many)
Client.hasMany(Reservation, {
  foreignKey: 'client_id',
  as: 'reservations',
  onDelete: 'CASCADE'
});

Reservation.belongsTo(Client, {
  foreignKey: 'client_id',
  as: 'client'
});

// Reservation <-> Chambre (Many-to-Many via ReservationChambre)
Reservation.belongsToMany(Chambre, {
  through: ReservationChambre,
  foreignKey: 'reservation_id',
  otherKey: 'chambre_id',
  as: 'chambres'
});

Chambre.belongsToMany(Reservation, {
  through: ReservationChambre,
  foreignKey: 'chambre_id',
  otherKey: 'reservation_id',
  as: 'reservations'
});

// Relations directes vers la table de jonction
Reservation.hasMany(ReservationChambre, {
  foreignKey: 'reservation_id',
  as: 'reservationChambres'
});

ReservationChambre.belongsTo(Reservation, {
  foreignKey: 'reservation_id'
});

Chambre.hasMany(ReservationChambre, {
  foreignKey: 'chambre_id',
  as: 'chambreReservations'
});

ReservationChambre.belongsTo(Chambre, {
  foreignKey: 'chambre_id'
});

module.exports = {
  sequelize,
  Client,
  Chambre,
  Reservation,
  ReservationChambre
};
