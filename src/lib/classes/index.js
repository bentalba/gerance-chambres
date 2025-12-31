/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Index des classes - Projet EMSI par Oussama SAJJI
 * 
 * Exporte toutes les classes du projet
 */

const Client = require("./Client");
const Chambre = require("./Chambre");
const Reservation = require("./Reservation");
const GestionReservations = require("./GestionReservations");

module.exports = {
  Client,
  Chambre,
  Reservation,
  GestionReservations,
};
