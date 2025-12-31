/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    SCRIPT SEED DATABASE                                    ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Peuple la base avec des données de démonstration                         ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const { sequelize, Client, Chambre, Reservation, ReservationChambre } = require('../models');

async function seedDatabase() {
  console.log('\n🌱 Peuplement de la base de données...\n');
  
  try {
    await sequelize.authenticate();
    
    // ═══════════════════════════════════════════════════════════════════════
    // CRÉER LES CLIENTS
    // ═══════════════════════════════════════════════════════════════════════
    
    console.log('👥 Création des clients...');
    
    const clients = await Client.bulkCreate([
      { nom: 'Dupont', prenom: 'Alice', adresse: '10 Rue des Fleurs, Casablanca' },
      { nom: 'Benali', prenom: 'Youssef', adresse: '45 Avenue Mohammed V, Rabat' },
      { nom: 'Martin', prenom: 'Sophie', adresse: '23 Boulevard Hassan II, Marrakech' },
      { nom: 'El Amrani', prenom: 'Karim', adresse: '78 Rue de la Liberté, Fès' },
      { nom: 'Garcia', prenom: 'Maria', adresse: '12 Place des Nations, Tanger' }
    ], { ignoreDuplicates: true });
    
    console.log(`   ✅ ${clients.length} clients créés`);
    
    // ═══════════════════════════════════════════════════════════════════════
    // CRÉER LES 80 CHAMBRES (8 étages × 10 chambres)
    // ═══════════════════════════════════════════════════════════════════════
    
    console.log('🛏️  Création des 80 chambres...');
    
    const chambresData = [];
    for (let etage = 1; etage <= 8; etage++) {
      for (let num = 1; num <= 10; num++) {
        const numero = `${etage}${String(num).padStart(2, '0')}`;
        const telephone = `05${etage}-${String(num).padStart(2, '0')}-${String(num).padStart(2, '0')}-${String(etage).padStart(2, '0')}-${String(num).padStart(2, '0')}`;
        chambresData.push({ numero_chambre: numero, telephone });
      }
    }
    
    const chambres = await Chambre.bulkCreate(chambresData, { ignoreDuplicates: true });
    console.log(`   ✅ ${chambres.length} chambres créées`);
    
    // ═══════════════════════════════════════════════════════════════════════
    // CRÉER DES RÉSERVATIONS DE TEST
    // ═══════════════════════════════════════════════════════════════════════
    
    console.log('📋 Création des réservations de test...');
    
    const now = new Date();
    const demain = new Date(now);
    demain.setDate(demain.getDate() + 1);
    const dansTroisJours = new Date(now);
    dansTroisJours.setDate(dansTroisJours.getDate() + 3);
    const hier = new Date(now);
    hier.setDate(hier.getDate() - 1);
    
    // Réservation 1: Active
    const res1 = await Reservation.create({
      client_id: 1,
      date_debut: now,
      date_fin: dansTroisJours,
      etat: 'Pending',
      nb_chambres: 2
    });
    await ReservationChambre.bulkCreate([
      { reservation_id: res1.id, chambre_id: 1 },
      { reservation_id: res1.id, chambre_id: 2 }
    ]);
    
    // Réservation 2: Validée
    const res2 = await Reservation.create({
      client_id: 2,
      date_debut: hier,
      date_fin: demain,
      etat: 'Validated',
      nb_chambres: 1
    });
    await ReservationChambre.create({
      reservation_id: res2.id,
      chambre_id: 11
    });
    
    // Réservation 3: Se termine aujourd'hui
    const res3 = await Reservation.create({
      client_id: 3,
      date_debut: hier,
      date_fin: now,
      etat: 'Validated',
      nb_chambres: 1
    });
    await ReservationChambre.create({
      reservation_id: res3.id,
      chambre_id: 21
    });
    
    console.log('   ✅ 3 réservations de test créées');
    
    // ═══════════════════════════════════════════════════════════════════════
    // RÉSUMÉ
    // ═══════════════════════════════════════════════════════════════════════
    
    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║              BASE DE DONNÉES INITIALISÉE                 ║');
    console.log('╠══════════════════════════════════════════════════════════╣');
    console.log('║  ✅ 5 clients créés                                      ║');
    console.log('║  ✅ 80 chambres créées (8 étages × 10 chambres)          ║');
    console.log('║  ✅ 3 réservations de test créées                        ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log();
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur seed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
