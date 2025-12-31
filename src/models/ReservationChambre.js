/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║              MODEL RESERVATION_CHAMBRE - TABLE DE JONCTION                 ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Table de jonction Many-to-Many entre Reservations et Chambres            ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ReservationChambre = sequelize.define('ReservationChambre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reservation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'reservations',
      key: 'id'
    }
  },
  chambre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'chambres',
      key: 'id'
    }
  }
}, {
  tableName: 'reservation_chambres',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['reservation_id', 'chambre_id']
    }
  ]
});

module.exports = ReservationChambre;
