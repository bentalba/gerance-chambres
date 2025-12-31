/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    MODEL CLIENT - SEQUELIZE                                ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Table: clients (id, nom, prenom, adresse)                                ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le nom est obligatoire' },
      len: { args: [2, 50], msg: 'Le nom doit contenir entre 2 et 50 caractères' }
    }
  },
  prenom: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Le prénom est obligatoire' },
      len: { args: [2, 50], msg: 'Le prénom doit contenir entre 2 et 50 caractères' }
    }
  },
  adresse: {
    type: DataTypes.STRING(200),
    allowNull: true
  }
}, {
  tableName: 'clients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Client;
