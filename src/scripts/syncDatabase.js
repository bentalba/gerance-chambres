/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIPT SYNCHRONISATION DB                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Crée les tables dans MySQL via Sequelize                                 ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const { sequelize } = require('../models');

async function syncDatabase() {
  console.log('\n🔄 Synchronisation de la base de données...\n');
  
  try {
    // Sync all models
    await sequelize.sync({ alter: true });
    
    console.log('✅ Base de données synchronisée avec succès!');
    console.log('\nTables créées:');
    console.log('  - clients');
    console.log('  - chambres');
    console.log('  - reservations');
    console.log('  - reservation_chambres');
    console.log();
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur de synchronisation:', error.message);
    console.log('\n💡 Assurez-vous que:');
    console.log('   1. MySQL est démarré (XAMPP/WAMP)');
    console.log('   2. La base de données "hotel_reservation" existe');
    console.log('   3. Les identifiants dans .env sont corrects\n');
    process.exit(1);
  }
}

syncDatabase();
