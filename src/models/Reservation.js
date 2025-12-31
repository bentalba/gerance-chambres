/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                   MODEL RESERVATION - SEQUELIZE                            ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Table: reservations (id, client_id, date_debut, date_fin, etat)          ║
 * ║  États: Pending, Validated, Canceled, Closed                              ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// États possibles d'une réservation
const ETATS = {
  PENDING: 'Pending',
  VALIDATED: 'Validated',
  CANCELED: 'Canceled',
  CLOSED: 'Closed'
};

const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'id'
    }
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: 'Date de début invalide' }
    }
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: 'Date de fin invalide' },
      isAfterDebut(value) {
        if (new Date(value) <= new Date(this.date_debut)) {
          throw new Error('La date de fin doit être postérieure à la date de début');
        }
      }
    }
  },
  etat: {
    type: DataTypes.ENUM(...Object.values(ETATS)),
    defaultValue: ETATS.PENDING,
    allowNull: false
  },
  nb_chambres: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'reservations',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Méthodes d'instance
Reservation.prototype.calculerDureeHeures = function() {
  const debut = new Date(this.date_debut);
  const fin = new Date(this.date_fin);
  return Math.round((fin - debut) / (1000 * 60 * 60));
};

Reservation.prototype.calculerDureeJours = function() {
  return Math.ceil(this.calculerDureeHeures() / 24);
};

Reservation.prototype.estExpiree = function() {
  return new Date(this.date_fin) < new Date();
};

Reservation.prototype.valider = async function() {
  if (this.etat === ETATS.CANCELED) {
    throw new Error('Impossible de valider une réservation annulée');
  }
  this.etat = ETATS.VALIDATED;
  await this.save();
};

Reservation.prototype.annuler = async function() {
  this.etat = ETATS.CANCELED;
  await this.save();
};

Reservation.prototype.cloturer = async function() {
  this.etat = ETATS.CLOSED;
  await this.save();
};

// Hook pour générer le code automatiquement
Reservation.beforeCreate(async (reservation) => {
  const count = await Reservation.count();
  reservation.code = `RES-${String(count + 1).padStart(5, '0')}`;
});

// Exporter les états
Reservation.ETATS = ETATS;

module.exports = Reservation;
