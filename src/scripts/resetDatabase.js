/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIPT RESET DATABASE                                   ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Réinitialise complètement la base de données                             ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const { sequelize } = require('../models');

async function resetDatabase() {
  console.log('\n⚠️  RÉINITIALISATION DE LA BASE DE DONNÉES...\n');
  
  try {
    // Drop all tables and recreate
    await sequelize.sync({ force: true });
    
    console.log('✅ Base de données réinitialisée!');
    console.log('\n💡 Exécutez "npm run db:seed" pour repeupler les données.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur reset:', error.message);
    process.exit(1);
  }
}

resetDatabase();
