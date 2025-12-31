/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║          CONFIGURATION SEQUELIZE - BASE DE DONNÉES MYSQL                   ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Data Access Layer - Connexion et configuration ORM                       ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'hotel_reservation',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

// Test de connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion MySQL établie avec succès.');
    return true;
  } catch (error) {
    console.error('❌ Impossible de se connecter à MySQL:', error.message);
    return false;
  }
};

module.exports = { sequelize, testConnection };
