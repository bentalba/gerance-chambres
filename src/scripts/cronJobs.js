/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    CRON JOBS - TÂCHES AUTOMATIQUES                         ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Auto-clôture des réservations expirées                                   ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const cron = require('node-cron');
const { ReservationService } = require('../services');

console.log('\n');
console.log('╔══════════════════════════════════════════════════════════════════════════╗');
console.log('║                                                                          ║');
console.log('║     ⏰  CRON JOBS - TÂCHES AUTOMATIQUES  ⏰                               ║');
console.log('║                                                                          ║');
console.log('║     Projet EMSI - Préparé par Oussama SAJJI                              ║');
console.log('║                                                                          ║');
console.log('╚══════════════════════════════════════════════════════════════════════════╝');
console.log();

// ═══════════════════════════════════════════════════════════════════════════
// TÂCHE 1: Clôture automatique des réservations expirées
// Exécution: Tous les jours à minuit (00:00)
// ═══════════════════════════════════════════════════════════════════════════

cron.schedule('0 0 * * *', async () => {
  console.log('\n⏰ [CRON] Exécution de la clôture automatique...');
  
  try {
    const result = await ReservationService.autoCloseExpired();
    console.log(`✅ [CRON] ${result.message}`);
  } catch (error) {
    console.error('❌ [CRON] Erreur:', error.message);
  }
}, {
  scheduled: true,
  timezone: 'Africa/Casablanca'
});

// ═══════════════════════════════════════════════════════════════════════════
// TÂCHE 2: Annulation des réservations Pending expirées
// Exécution: Toutes les heures
// ═══════════════════════════════════════════════════════════════════════════

cron.schedule('0 * * * *', async () => {
  console.log('\n⏰ [CRON] Vérification des réservations en attente expirées...');
  
  try {
    const result = await ReservationService.autoCancelExpiredPending();
    if (result.count > 0) {
      console.log(`✅ [CRON] ${result.message}`);
    }
  } catch (error) {
    console.error('❌ [CRON] Erreur:', error.message);
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// TÂCHE 3: Rapport quotidien (pour démonstration)
// Exécution: Tous les jours à 8h00
// ═══════════════════════════════════════════════════════════════════════════

cron.schedule('0 8 * * *', async () => {
  console.log('\n📊 [CRON] Génération du rapport quotidien...');
  
  try {
    const stats = await ReservationService.getStatistics();
    const today = await ReservationService.getCreatedToday();
    const expiring = await ReservationService.getExpiringToday();
    
    console.log('╔════════════════════════════════════════════╗');
    console.log('║         RAPPORT QUOTIDIEN                  ║');
    console.log('╠════════════════════════════════════════════╣');
    console.log(`║  Total réservations: ${stats.data.total}`);
    console.log(`║  - En attente: ${stats.data.pending}`);
    console.log(`║  - Validées: ${stats.data.validated}`);
    console.log(`║  - Annulées: ${stats.data.canceled}`);
    console.log(`║  - Clôturées: ${stats.data.closed}`);
    console.log('╠════════════════════════════════════════════╣');
    console.log(`║  Créées aujourd'hui: ${today.data.length}`);
    console.log(`║  Se terminant aujourd'hui: ${expiring.data.length}`);
    console.log('╚════════════════════════════════════════════╝');
  } catch (error) {
    console.error('❌ [CRON] Erreur rapport:', error.message);
  }
}, {
  scheduled: true,
  timezone: 'Africa/Casablanca'
});

console.log('✅ Cron jobs initialisés:');
console.log('   📌 Clôture auto: tous les jours à 00:00');
console.log('   📌 Annulation Pending: toutes les heures');
console.log('   📌 Rapport quotidien: tous les jours à 08:00');
console.log('\n⏳ En attente des tâches planifiées...\n');

// Garder le processus actif
process.stdin.resume();
