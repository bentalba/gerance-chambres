/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    CLI MENU INTERACTIF                                     ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Interface console pour tester toutes les fonctionnalités                 ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();
const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const Table = require('cli-table3');
const ora = require('ora');
const { sequelize, Client, Chambre, Reservation, ReservationChambre } = require('../models');
const { ClientService, ChambreService, ReservationService } = require('../services');

// ═══════════════════════════════════════════════════════════════════════════
// AFFICHAGE DE L'EN-TÊTE
// ═══════════════════════════════════════════════════════════════════════════

function showHeader() {
  console.clear();
  console.log(chalk.cyan(figlet.textSync('Hotel EMSI', { horizontalLayout: 'fitted' })));
  console.log(chalk.gray('═'.repeat(70)));
  console.log(chalk.yellow('  Système de Gestion de Réservations - Préparé par Oussama SAJJI'));
  console.log(chalk.gray('═'.repeat(70)));
  console.log();
}

// ═══════════════════════════════════════════════════════════════════════════
// MENU PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

async function mainMenu() {
  showHeader();
  
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: chalk.green('Que souhaitez-vous faire?'),
      choices: [
        { name: chalk.blue('📋 Gestion des Clients'), value: 'clients' },
        { name: chalk.blue('🛏️  Gestion des Chambres'), value: 'chambres' },
        { name: chalk.blue('📅 Gestion des Réservations'), value: 'reservations' },
        { name: chalk.blue('📊 Dashboard & Statistiques'), value: 'dashboard' },
        new inquirer.Separator(),
        { name: chalk.red('🚪 Quitter'), value: 'exit' }
      ]
    }
  ]);
  
  switch (choice) {
    case 'clients': await clientsMenu(); break;
    case 'chambres': await chambresMenu(); break;
    case 'reservations': await reservationsMenu(); break;
    case 'dashboard': await showDashboard(); break;
    case 'exit': await exitApp(); break;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MENU CLIENTS
// ═══════════════════════════════════════════════════════════════════════════

async function clientsMenu() {
  showHeader();
  console.log(chalk.cyan.bold('  📋 GESTION DES CLIENTS\n'));
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Action:',
      choices: [
        { name: 'Lister tous les clients', value: 'list' },
        { name: 'Ajouter un client', value: 'add' },
        { name: 'Rechercher un client', value: 'search' },
        { name: 'Modifier un client', value: 'edit' },
        { name: 'Supprimer un client', value: 'delete' },
        new inquirer.Separator(),
        { name: chalk.yellow('← Retour'), value: 'back' }
      ]
    }
  ]);
  
  switch (action) {
    case 'list':
      await listClients();
      break;
    case 'add':
      await addClient();
      break;
    case 'search':
      await searchClient();
      break;
    case 'edit':
      await editClient();
      break;
    case 'delete':
      await deleteClient();
      break;
    case 'back':
      await mainMenu();
      return;
  }
  
  await pauseAndReturn(clientsMenu);
}

async function listClients() {
  const spinner = ora('Chargement des clients...').start();
  const result = await ClientService.getAll();
  spinner.stop();
  
  if (!result.success || result.data.length === 0) {
    console.log(chalk.yellow('\n⚠️ Aucun client trouvé.'));
    return;
  }
  
  const table = new Table({
    head: [chalk.cyan('ID'), chalk.cyan('Nom'), chalk.cyan('Prénom'), chalk.cyan('Adresse')],
    colWidths: [6, 15, 15, 35]
  });
  
  result.data.forEach(c => {
    table.push([c.id, c.nom, c.prenom, c.adresse || '-']);
  });
  
  console.log('\n' + table.toString());
  console.log(chalk.gray(`\nTotal: ${result.data.length} client(s)`));
}

async function addClient() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'nom', message: 'Nom:', validate: v => v ? true : 'Requis' },
    { type: 'input', name: 'prenom', message: 'Prénom:', validate: v => v ? true : 'Requis' },
    { type: 'input', name: 'adresse', message: 'Adresse (optionnel):' }
  ]);
  
  const spinner = ora('Création du client...').start();
  const result = await ClientService.create(answers);
  spinner.stop();
  
  if (result.success) {
    console.log(chalk.green(`\n✅ Client créé avec ID: ${result.data.id}`));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

async function searchClient() {
  const { term } = await inquirer.prompt([
    { type: 'input', name: 'term', message: 'Rechercher (nom):' }
  ]);
  
  const spinner = ora('Recherche...').start();
  const result = await ClientService.findByName(term);
  spinner.stop();
  
  if (!result.success || result.data.length === 0) {
    console.log(chalk.yellow('\n⚠️ Aucun client trouvé.'));
    return;
  }
  
  const table = new Table({
    head: [chalk.cyan('ID'), chalk.cyan('Nom'), chalk.cyan('Prénom')]
  });
  
  result.data.forEach(c => table.push([c.id, c.nom, c.prenom]));
  console.log('\n' + table.toString());
}

async function editClient() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID du client à modifier:' }
  ]);
  
  const existing = await ClientService.getById(parseInt(id));
  if (!existing.success) {
    console.log(chalk.red('\n❌ Client non trouvé.'));
    return;
  }
  
  const answers = await inquirer.prompt([
    { type: 'input', name: 'nom', message: 'Nouveau nom:', default: existing.data.nom },
    { type: 'input', name: 'prenom', message: 'Nouveau prénom:', default: existing.data.prenom },
    { type: 'input', name: 'adresse', message: 'Nouvelle adresse:', default: existing.data.adresse }
  ]);
  
  const result = await ClientService.update(parseInt(id), answers);
  if (result.success) {
    console.log(chalk.green('\n✅ Client mis à jour.'));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

async function deleteClient() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID du client à supprimer:' }
  ]);
  
  const { confirm } = await inquirer.prompt([
    { type: 'confirm', name: 'confirm', message: 'Êtes-vous sûr?', default: false }
  ]);
  
  if (!confirm) return;
  
  const result = await ClientService.delete(parseInt(id));
  if (result.success) {
    console.log(chalk.green('\n✅ Client supprimé.'));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MENU CHAMBRES
// ═══════════════════════════════════════════════════════════════════════════

async function chambresMenu() {
  showHeader();
  console.log(chalk.cyan.bold('  🛏️ GESTION DES CHAMBRES\n'));
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Action:',
      choices: [
        { name: 'Lister toutes les chambres', value: 'list' },
        { name: 'Ajouter une chambre', value: 'add' },
        { name: 'Vérifier disponibilité', value: 'check' },
        { name: 'Chambres disponibles (période)', value: 'available' },
        { name: 'Supprimer une chambre', value: 'delete' },
        new inquirer.Separator(),
        { name: chalk.yellow('← Retour'), value: 'back' }
      ]
    }
  ]);
  
  switch (action) {
    case 'list':
      await listChambres();
      break;
    case 'add':
      await addChambre();
      break;
    case 'check':
      await checkChambreAvailability();
      break;
    case 'available':
      await findAvailableChambres();
      break;
    case 'delete':
      await deleteChambre();
      break;
    case 'back':
      await mainMenu();
      return;
  }
  
  await pauseAndReturn(chambresMenu);
}

async function listChambres() {
  const spinner = ora('Chargement des chambres...').start();
  const result = await ChambreService.getAll();
  spinner.stop();
  
  if (!result.success || result.data.length === 0) {
    console.log(chalk.yellow('\n⚠️ Aucune chambre trouvée.'));
    return;
  }
  
  // Affichage par étage
  const byFloor = {};
  result.data.forEach(c => {
    const floor = c.numero_chambre.charAt(0);
    if (!byFloor[floor]) byFloor[floor] = [];
    byFloor[floor].push(c.numero_chambre);
  });
  
  console.log(chalk.green(`\n📊 Total: ${result.data.length} chambres\n`));
  
  Object.keys(byFloor).sort().forEach(floor => {
    console.log(chalk.cyan(`  Étage ${floor}: `) + byFloor[floor].join(', '));
  });
}

async function addChambre() {
  const answers = await inquirer.prompt([
    { type: 'input', name: 'numero_chambre', message: 'Numéro de chambre:', validate: v => v ? true : 'Requis' },
    { type: 'input', name: 'telephone', message: 'Téléphone:' }
  ]);
  
  const spinner = ora('Création...').start();
  const result = await ChambreService.create(answers);
  spinner.stop();
  
  if (result.success) {
    console.log(chalk.green(`\n✅ Chambre ${result.data.numero_chambre} créée.`));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

async function checkChambreAvailability() {
  const { chambre_id, date_debut, date_fin } = await inquirer.prompt([
    { type: 'input', name: 'chambre_id', message: 'ID de la chambre:' },
    { type: 'input', name: 'date_debut', message: 'Date début (YYYY-MM-DD):' },
    { type: 'input', name: 'date_fin', message: 'Date fin (YYYY-MM-DD):' }
  ]);
  
  const result = await ChambreService.checkAvailability(
    parseInt(chambre_id),
    new Date(date_debut),
    new Date(date_fin)
  );
  
  if (result.success && result.data.available) {
    console.log(chalk.green('\n✅ La chambre est DISPONIBLE.'));
  } else {
    console.log(chalk.red('\n❌ La chambre n\'est PAS disponible.'));
  }
}

async function findAvailableChambres() {
  const { date_debut, date_fin } = await inquirer.prompt([
    { type: 'input', name: 'date_debut', message: 'Date début (YYYY-MM-DD):' },
    { type: 'input', name: 'date_fin', message: 'Date fin (YYYY-MM-DD):' }
  ]);
  
  const spinner = ora('Recherche...').start();
  const result = await ChambreService.findAvailableRooms(
    new Date(date_debut),
    new Date(date_fin)
  );
  spinner.stop();
  
  if (!result.success || result.data.length === 0) {
    console.log(chalk.yellow('\n⚠️ Aucune chambre disponible.'));
    return;
  }
  
  console.log(chalk.green(`\n✅ ${result.data.length} chambres disponibles:`));
  console.log(result.data.map(c => c.numero_chambre).join(', '));
}

async function deleteChambre() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID de la chambre à supprimer:' }
  ]);
  
  const { confirm } = await inquirer.prompt([
    { type: 'confirm', name: 'confirm', message: 'Êtes-vous sûr?', default: false }
  ]);
  
  if (!confirm) return;
  
  const result = await ChambreService.delete(parseInt(id));
  if (result.success) {
    console.log(chalk.green('\n✅ Chambre supprimée.'));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MENU RÉSERVATIONS
// ═══════════════════════════════════════════════════════════════════════════

async function reservationsMenu() {
  showHeader();
  console.log(chalk.cyan.bold('  📅 GESTION DES RÉSERVATIONS\n'));
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Action:',
      choices: [
        { name: 'Lister toutes les réservations', value: 'list' },
        { name: 'Créer une réservation', value: 'create' },
        { name: 'Voir détails d\'une réservation', value: 'details' },
        { name: 'Ajouter chambre à réservation', value: 'addRoom' },
        { name: 'Valider une réservation', value: 'validate' },
        { name: 'Annuler une réservation', value: 'cancel' },
        { name: 'Clôturer une réservation', value: 'close' },
        { name: 'Calculer durée', value: 'duration' },
        new inquirer.Separator(),
        { name: chalk.yellow('← Retour'), value: 'back' }
      ]
    }
  ]);
  
  switch (action) {
    case 'list': await listReservations(); break;
    case 'create': await createReservation(); break;
    case 'details': await showReservationDetails(); break;
    case 'addRoom': await addRoomToReservation(); break;
    case 'validate': await validateReservation(); break;
    case 'cancel': await cancelReservation(); break;
    case 'close': await closeReservation(); break;
    case 'duration': await showDuration(); break;
    case 'back': await mainMenu(); return;
  }
  
  await pauseAndReturn(reservationsMenu);
}

async function listReservations() {
  const spinner = ora('Chargement...').start();
  const result = await ReservationService.getAll();
  spinner.stop();
  
  if (!result.success || result.data.length === 0) {
    console.log(chalk.yellow('\n⚠️ Aucune réservation.'));
    return;
  }
  
  const table = new Table({
    head: [chalk.cyan('ID'), chalk.cyan('Client'), chalk.cyan('Début'), chalk.cyan('Fin'), chalk.cyan('État'), chalk.cyan('Chambres')],
    colWidths: [6, 20, 12, 12, 12, 10]
  });
  
  result.data.forEach(r => {
    const clientName = r.client ? `${r.client.nom} ${r.client.prenom}` : '-';
    const stateColor = {
      'Pending': chalk.yellow,
      'Validated': chalk.green,
      'Canceled': chalk.red,
      'Closed': chalk.gray
    }[r.etat] || chalk.white;
    
    table.push([
      r.id,
      clientName,
      r.date_debut.toISOString().split('T')[0],
      r.date_fin.toISOString().split('T')[0],
      stateColor(r.etat),
      r.nb_chambres || 0
    ]);
  });
  
  console.log('\n' + table.toString());
}

async function createReservation() {
  // Afficher les clients disponibles
  const clientsResult = await ClientService.getAll();
  if (!clientsResult.success || clientsResult.data.length === 0) {
    console.log(chalk.red('\n❌ Aucun client. Créez d\'abord un client.'));
    return;
  }
  
  const clientChoices = clientsResult.data.map(c => ({
    name: `${c.id}: ${c.nom} ${c.prenom}`,
    value: c.id
  }));
  
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'client_id',
      message: 'Sélectionnez le client:',
      choices: clientChoices
    },
    {
      type: 'input',
      name: 'date_debut',
      message: 'Date début (YYYY-MM-DD):',
      validate: v => /\d{4}-\d{2}-\d{2}/.test(v) ? true : 'Format invalide'
    },
    {
      type: 'input',
      name: 'date_fin',
      message: 'Date fin (YYYY-MM-DD):',
      validate: v => /\d{4}-\d{2}-\d{2}/.test(v) ? true : 'Format invalide'
    },
    {
      type: 'input',
      name: 'chambre_ids',
      message: 'IDs des chambres (séparés par virgule):',
      validate: v => v ? true : 'Au moins une chambre requise'
    }
  ]);
  
  const chambreIds = answers.chambre_ids.split(',').map(id => parseInt(id.trim()));
  
  const spinner = ora('Création de la réservation...').start();
  const result = await ReservationService.create({
    client_id: answers.client_id,
    date_debut: new Date(answers.date_debut),
    date_fin: new Date(answers.date_fin),
    chambre_ids: chambreIds
  });
  spinner.stop();
  
  if (result.success) {
    console.log(chalk.green(`\n✅ Réservation créée avec ID: ${result.data.id}`));
    console.log(chalk.gray(`   Durée: ${result.data.duree_jours} jour(s)`));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

async function showReservationDetails() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID de la réservation:' }
  ]);
  
  const result = await ReservationService.getById(parseInt(id));
  
  if (!result.success) {
    console.log(chalk.red('\n❌ Réservation non trouvée.'));
    return;
  }
  
  const r = result.data;
  console.log('\n' + chalk.cyan('═'.repeat(50)));
  console.log(chalk.cyan.bold(`  RÉSERVATION #${r.id}`));
  console.log(chalk.cyan('═'.repeat(50)));
  console.log(`  Client: ${r.client?.nom} ${r.client?.prenom}`);
  console.log(`  Du: ${r.date_debut.toISOString().split('T')[0]} au ${r.date_fin.toISOString().split('T')[0]}`);
  console.log(`  État: ${r.etat}`);
  console.log(`  Chambres: ${r.chambres?.map(c => c.numero_chambre).join(', ') || 'Aucune'}`);
  
  const duration = await ReservationService.calculateDuration(parseInt(id));
  if (duration.success) {
    console.log(`  Durée: ${duration.data.duree_jours} jour(s)`);
  }
}

async function addRoomToReservation() {
  const { reservation_id, chambre_id } = await inquirer.prompt([
    { type: 'input', name: 'reservation_id', message: 'ID de la réservation:' },
    { type: 'input', name: 'chambre_id', message: 'ID de la chambre à ajouter:' }
  ]);
  
  const result = await ReservationService.addChambre(
    parseInt(reservation_id),
    parseInt(chambre_id)
  );
  
  if (result.success) {
    console.log(chalk.green('\n✅ Chambre ajoutée.'));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

async function validateReservation() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID de la réservation à valider:' }
  ]);
  
  const result = await ReservationService.validate(parseInt(id));
  
  if (result.success) {
    console.log(chalk.green('\n✅ Réservation validée.'));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

async function cancelReservation() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID de la réservation à annuler:' }
  ]);
  
  const result = await ReservationService.cancel(parseInt(id));
  
  if (result.success) {
    console.log(chalk.green('\n✅ Réservation annulée.'));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

async function closeReservation() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID de la réservation à clôturer:' }
  ]);
  
  const result = await ReservationService.close(parseInt(id));
  
  if (result.success) {
    console.log(chalk.green('\n✅ Réservation clôturée.'));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

async function showDuration() {
  const { id } = await inquirer.prompt([
    { type: 'input', name: 'id', message: 'ID de la réservation:' }
  ]);
  
  const result = await ReservationService.calculateDuration(parseInt(id));
  
  if (result.success) {
    console.log(chalk.green(`\n✅ Durée: ${result.data.duree_jours} jour(s)`));
  } else {
    console.log(chalk.red(`\n❌ Erreur: ${result.message}`));
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════

async function showDashboard() {
  showHeader();
  console.log(chalk.cyan.bold('  📊 DASHBOARD & STATISTIQUES\n'));
  
  const spinner = ora('Chargement des statistiques...').start();
  
  const [stats, today, expiring, clients, chambres] = await Promise.all([
    ReservationService.getStatistics(),
    ReservationService.getCreatedToday(),
    ReservationService.getExpiringToday(),
    ClientService.getAll(),
    ChambreService.getAll()
  ]);
  
  spinner.stop();
  
  console.log(chalk.cyan('╔════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('║                    STATISTIQUES GÉNÉRALES                  ║'));
  console.log(chalk.cyan('╠════════════════════════════════════════════════════════════╣'));
  console.log(chalk.cyan(`║  👥 Total Clients: ${clients.data?.length || 0}`.padEnd(59) + '║'));
  console.log(chalk.cyan(`║  🛏️  Total Chambres: ${chambres.data?.length || 0}`.padEnd(59) + '║'));
  console.log(chalk.cyan('╠════════════════════════════════════════════════════════════╣'));
  console.log(chalk.cyan('║                    RÉSERVATIONS                            ║'));
  console.log(chalk.cyan('╠════════════════════════════════════════════════════════════╣'));
  
  if (stats.success) {
    console.log(chalk.cyan(`║  📋 Total: ${stats.data.total}`.padEnd(59) + '║'));
    console.log(chalk.yellow(`║  ⏳ En attente: ${stats.data.pending}`.padEnd(59) + '║'));
    console.log(chalk.green(`║  ✅ Validées: ${stats.data.validated}`.padEnd(59) + '║'));
    console.log(chalk.red(`║  ❌ Annulées: ${stats.data.canceled}`.padEnd(59) + '║'));
    console.log(chalk.gray(`║  🔒 Clôturées: ${stats.data.closed}`.padEnd(59) + '║'));
  }
  
  console.log(chalk.cyan('╠════════════════════════════════════════════════════════════╣'));
  console.log(chalk.cyan(`║  📅 Créées aujourd'hui: ${today.data?.length || 0}`.padEnd(59) + '║'));
  console.log(chalk.cyan(`║  ⚠️  Se terminant aujourd'hui: ${expiring.data?.length || 0}`.padEnd(59) + '║'));
  console.log(chalk.cyan('╚════════════════════════════════════════════════════════════╝'));
  
  await pauseAndReturn(mainMenu);
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════════════════════════════════════

async function pauseAndReturn(menu) {
  await inquirer.prompt([
    { type: 'input', name: 'continue', message: chalk.gray('\nAppuyez sur Entrée pour continuer...') }
  ]);
  await menu();
}

async function exitApp() {
  console.log(chalk.cyan('\n👋 Au revoir! Merci d\'utiliser Hotel EMSI.\n'));
  process.exit(0);
}

// ═══════════════════════════════════════════════════════════════════════════
// DÉMARRAGE
// ═══════════════════════════════════════════════════════════════════════════

async function start() {
  try {
    const spinner = ora('Connexion à la base de données...').start();
    await sequelize.authenticate();
    spinner.succeed('Connecté à MySQL');
    await mainMenu();
  } catch (error) {
    console.error(chalk.red('\n❌ Erreur de connexion à la base de données:'));
    console.error(chalk.gray(error.message));
    console.log(chalk.yellow('\n💡 Assurez-vous que:'));
    console.log('   1. MySQL est démarré (XAMPP/WAMP)');
    console.log('   2. La base de données existe');
    console.log('   3. Les identifiants .env sont corrects\n');
    process.exit(1);
  }
}

start();
