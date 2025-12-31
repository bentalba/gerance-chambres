/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    INDEX DES SERVICES                                      ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Export centralisé de tous les services                                   ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const ClientService = require('./ClientService');
const ChambreService = require('./ChambreService');
const ReservationService = require('./ReservationService');

module.exports = {
  ClientService,
  ChambreService,
  ReservationService
};
