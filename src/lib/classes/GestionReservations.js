/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
/**
 * GestionReservations - Projet EMSI par Oussama SAJJI
 * 
 * Gestion d'un tableau de n reservations avec les fonctions suivantes:
 * a) Tester si un client a deja effectue une reservation
 * b) Tester si une reservation a deja ete effectuee
 * c) Ajouter/Modifier/Supprimer une reservation
 * d) Afficher toutes les reservations, celles d'aujourd'hui, celles expirees
 * e) Annuler les reservations qui seront expirees aujourd'hui
 */

const Client = require("./Client");
const Chambre = require("./Chambre");
const Reservation = require("./Reservation");

class GestionReservations {
  constructor() {
    this._reservations = []; // Tableau de reservations
  }

  get reservations() {
    return this._reservations;
  }

  get nombreReservations() {
    return this._reservations.length;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // a) Tester si un client a deja effectue une reservation
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Verifie si un client a deja effectue une reservation
   * @param {Client|number} client - Instance Client ou ID du client
   * @returns {boolean}
   */
  clientAReservation(client) {
    const clientId = client instanceof Client ? client.id : client;
    return this._reservations.some((r) => r.client && r.client.id === clientId);
  }

  /**
   * Retourne toutes les reservations d'un client
   * @param {Client|number} client
   * @returns {Reservation[]}
   */
  getReservationsClient(client) {
    const clientId = client instanceof Client ? client.id : client;
    return this._reservations.filter((r) => r.client && r.client.id === clientId);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // b) Tester si une reservation a deja ete effectuee
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Verifie si une reservation existe par son code
   * @param {string} code - Code de la reservation
   * @returns {boolean}
   */
  reservationExiste(code) {
    return this._reservations.some((r) => r.code === code);
  }

  /**
   * Recherche une reservation par son code
   * @param {string} code
   * @returns {Reservation|null}
   */
  trouverReservation(code) {
    return this._reservations.find((r) => r.code === code) || null;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // c) Ajouter / Modifier / Supprimer une reservation
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Ajoute une nouvelle reservation (avec test d'existence)
   * @param {Reservation} reservation
   * @returns {Object} {success, message}
   */
  ajouterReservation(reservation) {
    if (!(reservation instanceof Reservation)) {
      return { success: false, message: "Le parametre doit etre une instance de Reservation" };
    }

    // Tester si la reservation existe deja
    if (this.reservationExiste(reservation.code)) {
      return {
        success: false,
        message: `La reservation ${reservation.code} existe deja`,
      };
    }

    this._reservations.push(reservation);
    return {
      success: true,
      message: `Reservation ${reservation.code} ajoutee avec succes`,
    };
  }

  /**
   * Modifie une chambre dans une reservation existante
   * @param {string} codeReservation - Code de la reservation
   * @param {Chambre} ancienneChambre - Chambre a remplacer
   * @param {Chambre} nouvelleChambre - Nouvelle chambre
   * @returns {Object} {success, message}
   */
  modifierChambreReservation(codeReservation, ancienneChambre, nouvelleChambre) {
    const reservation = this.trouverReservation(codeReservation);

    if (!reservation) {
      return {
        success: false,
        message: `Reservation ${codeReservation} introuvable`,
      };
    }

    // Supprimer l'ancienne chambre
    const suppResult = reservation.supprimerChambre(ancienneChambre);
    if (!suppResult.success) {
      return suppResult;
    }

    // Ajouter la nouvelle chambre
    const ajoutResult = reservation.ajouterChambre(nouvelleChambre);
    if (!ajoutResult.success) {
      // Remettre l'ancienne chambre en cas d'echec
      reservation.ajouterChambre(ancienneChambre);
      return ajoutResult;
    }

    return {
      success: true,
      message: `Chambre ${ancienneChambre.numero} remplacee par ${nouvelleChambre.numero}`,
    };
  }

  /**
   * Supprime une reservation (avec test d'existence)
   * @param {string} code - Code de la reservation
   * @returns {Object} {success, message}
   */
  supprimerReservation(code) {
    if (!this.reservationExiste(code)) {
      return {
        success: false,
        message: `Reservation ${code} introuvable`,
      };
    }

    this._reservations = this._reservations.filter((r) => r.code !== code);
    return {
      success: true,
      message: `Reservation ${code} supprimee avec succes`,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // d) Afficher les reservations (toutes, aujourd'hui, expirees aujourd'hui)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Affiche les informations de toutes les reservations
   * @returns {string}
   */
  afficherToutes() {
    if (this._reservations.length === 0) {
      return "\n📋 Aucune reservation enregistree.\n";
    }

    let result = `
╔═══════════════════════════════════════════════════════════════════════════╗
║              LISTE DE TOUTES LES RESERVATIONS (${this._reservations.length})                        ║
╚═══════════════════════════════════════════════════════════════════════════╝`;

    this._reservations.forEach((r) => {
      result += r.afficher();
    });

    return result;
  }

  /**
   * Retourne les reservations effectuees aujourd'hui (creees aujourd'hui)
   * @returns {Reservation[]}
   */
  getReservationsAujourdhui() {
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    const demain = new Date(aujourdhui);
    demain.setDate(demain.getDate() + 1);

    return this._reservations.filter((r) => {
      const dateDebut = new Date(r.dateDebut);
      return dateDebut >= aujourdhui && dateDebut < demain;
    });
  }

  /**
   * Affiche les reservations effectuees aujourd'hui
   * @returns {string}
   */
  afficherReservationsAujourdhui() {
    const reservations = this.getReservationsAujourdhui();

    if (reservations.length === 0) {
      return "\n📅 Aucune reservation effectuee aujourd'hui.\n";
    }

    let result = `
╔═══════════════════════════════════════════════════════════════════════════╗
║            RESERVATIONS EFFECTUEES AUJOURD'HUI (${reservations.length})                         ║
╚═══════════════════════════════════════════════════════════════════════════╝`;

    reservations.forEach((r) => {
      result += r.afficher();
    });

    return result;
  }

  /**
   * Retourne les reservations qui expirent aujourd'hui
   * @returns {Reservation[]}
   */
  getReservationsExpirantAujourdhui() {
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    const demain = new Date(aujourdhui);
    demain.setDate(demain.getDate() + 1);

    return this._reservations.filter((r) => {
      const dateFin = new Date(r.dateFin);
      return dateFin >= aujourdhui && dateFin < demain && r.etat !== "Annulee" && r.etat !== "Expiree";
    });
  }

  /**
   * Affiche les reservations qui expirent aujourd'hui
   * @returns {string}
   */
  afficherReservationsExpirantAujourdhui() {
    const reservations = this.getReservationsExpirantAujourdhui();

    if (reservations.length === 0) {
      return "\n⌛ Aucune reservation n'expire aujourd'hui.\n";
    }

    let result = `
╔═══════════════════════════════════════════════════════════════════════════╗
║            RESERVATIONS EXPIRANT AUJOURD'HUI (${reservations.length})                           ║
╚═══════════════════════════════════════════════════════════════════════════╝`;

    reservations.forEach((r) => {
      result += r.afficher();
    });

    return result;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // e) Annuler les reservations qui expirent aujourd'hui
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Annule toutes les reservations qui expirent aujourd'hui
   * (Modifie l'etat de ces reservations en "Expiree")
   * @returns {Object} {count, reservations}
   */
  annulerReservationsExpirees() {
    const reservationsExpirant = this.getReservationsExpirantAujourdhui();
    let count = 0;

    reservationsExpirant.forEach((r) => {
      r.etat = "Expiree";
      count++;
    });

    return {
      count,
      message: `${count} reservation(s) expiree(s) aujourd'hui`,
      reservations: reservationsExpirant,
    };
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // METHODES UTILITAIRES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Verifie si une chambre est disponible sur une periode
   * @param {Chambre} chambre
   * @param {Date} dateDebut
   * @param {Date} dateFin
   * @returns {boolean}
   */
  chambreDisponible(chambre, dateDebut, dateFin) {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);

    return !this._reservations.some((r) => {
      // Ignorer les reservations annulees
      if (r.etat === "Annulee") return false;

      // Verifier si la chambre est dans cette reservation
      if (!r.verifierChambreReservee(chambre)) return false;

      // Verifier le chevauchement de dates
      const rDebut = new Date(r.dateDebut);
      const rFin = new Date(r.dateFin);

      return debut < rFin && fin > rDebut;
    });
  }

  /**
   * Charge les reservations depuis un tableau d'objets
   * @param {Array} data - Tableau d'objets reservations
   */
  chargerDepuisTableau(data) {
    this._reservations = data.map((obj) => Reservation.fromObject(obj));
  }

  /**
   * Exporte les reservations en tableau d'objets
   * @returns {Array}
   */
  exporterEnTableau() {
    return this._reservations.map((r) => r.toObject());
  }

  /**
   * Statistiques des reservations
   * @returns {Object}
   */
  getStatistiques() {
    const total = this._reservations.length;
    const enCours = this._reservations.filter((r) => r.etat === "EnCours").length;
    const validees = this._reservations.filter((r) => r.etat === "Validee").length;
    const annulees = this._reservations.filter((r) => r.etat === "Annulee").length;
    const expirees = this._reservations.filter((r) => r.etat === "Expiree").length;

    return {
      total,
      enCours,
      validees,
      annulees,
      expirees,
    };
  }

  /**
   * Affiche les statistiques
   * @returns {string}
   */
  afficherStatistiques() {
    const stats = this.getStatistiques();
    return `
╔═══════════════════════════════════════════════════════════════════════════╗
║                        STATISTIQUES RESERVATIONS                          ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ Total        : ${String(stats.total).padEnd(5)}                                                  ║
║ En cours     : ${String(stats.enCours).padEnd(5)} ⏳                                             ║
║ Validees     : ${String(stats.validees).padEnd(5)} ✅                                             ║
║ Annulees     : ${String(stats.annulees).padEnd(5)} ❌                                             ║
║ Expirees     : ${String(stats.expirees).padEnd(5)} ⌛                                             ║
╚═══════════════════════════════════════════════════════════════════════════╝`;
  }
}

module.exports = GestionReservations;
