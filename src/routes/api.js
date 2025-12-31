/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         ROUTES API                                         ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Configuration des routes REST API                                        ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const express = require('express');
const router = express.Router();
const { 
  ClientController, 
  ChambreController, 
  ReservationController 
} = require('../controllers');

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES CLIENTS
// ═══════════════════════════════════════════════════════════════════════════

router.get('/clients/search', ClientController.search);
router.get('/clients/:id/reservations', ClientController.checkActiveReservations);
router.get('/clients', ClientController.getAll);
router.get('/clients/:id', ClientController.getById);
router.post('/clients', ClientController.create);
router.put('/clients/:id', ClientController.update);
router.delete('/clients/:id', ClientController.delete);

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES CHAMBRES
// ═══════════════════════════════════════════════════════════════════════════

router.get('/chambres/available', ChambreController.getAvailable);
router.get('/chambres/numero/:numero', ChambreController.getByNumero);
router.get('/chambres/:id/availability', ChambreController.checkAvailability);
router.post('/chambres/compare', ChambreController.compare);
router.get('/chambres', ChambreController.getAll);
router.get('/chambres/:id', ChambreController.getById);
router.post('/chambres', ChambreController.create);
router.put('/chambres/:id', ChambreController.update);
router.delete('/chambres/:id', ChambreController.delete);

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES RESERVATIONS
// ═══════════════════════════════════════════════════════════════════════════

router.get('/reservations/today/created', ReservationController.getCreatedToday);
router.get('/reservations/today/expiring', ReservationController.getExpiringToday);
router.get('/reservations/statistics', ReservationController.getStatistics);
router.post('/reservations/auto-close', ReservationController.autoClose);
router.get('/reservations/code/:code', ReservationController.getByCode);
router.get('/reservations/client/:clientId', ReservationController.getByClient);
router.get('/reservations/client/:clientId/active', ReservationController.checkClientActive);
router.get('/reservations/:id/duration', ReservationController.getDuration);
router.post('/reservations/:id/chambres', ReservationController.addChambre);
router.delete('/reservations/:id/chambres/:chambreId', ReservationController.removeChambre);
router.patch('/reservations/:id/validate', ReservationController.validate);
router.patch('/reservations/:id/cancel', ReservationController.cancel);
router.patch('/reservations/:id/close', ReservationController.close);
router.get('/reservations', ReservationController.getAll);
router.get('/reservations/:id', ReservationController.getById);
router.post('/reservations', ReservationController.create);
router.delete('/reservations/:id', ReservationController.delete);

module.exports = router;
