/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Classe Reservation - Projet EMSI par Oussama SAJJI
 * 
 * Une reservation est identifiee par :
 * - code unique
 * - nombre de chambres reservees
 * - donnees des chambres reservees
 * - client qui a effectue la reservation
 * - etat de la reservation (EnCours, Validee, Annulee, Expiree)
 * - date de debut et fin (format: jour, mois, annee, heure)
 */

const Client = require("./Client");
const Chambre = require("./Chambre");

// Nombre maximum de chambres autorisees par reservation
const MAX_CHAMBRES = 5;

class Reservation {
  // Constructeur par defaut
  constructor(
    id = null,
    code = "",
    client = null,
    etat = "EnCours",
    dateDebut = null,
    dateFin = null,
    chambres = []
  ) {
    this._id = id;
    this._code = code;
    this._client = client; // Instance de Client
    this._etat = etat; // EnCours, Validee, Annulee, Expiree
    this._dateDebut = dateDebut ? new Date(dateDebut) : null;
    this._dateFin = dateFin ? new Date(dateFin) : null;
    this._chambres = chambres; // Array d'instances Chambre
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GETTERS
  // ═══════════════════════════════════════════════════════════════════════════

  get id() {
    return this._id;
  }

  get code() {
    return this._code;
  }

  get client() {
    return this._client;
  }

  get etat() {
    return this._etat;
  }

  get dateDebut() {
    return this._dateDebut;
  }

  get dateFin() {
    return this._dateFin;
  }

  get chambres() {
    return this._chambres;
  }

  get nombreChambres() {
    return this._chambres.length;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SETTERS
  // ═══════════════════════════════════════════════════════════════════════════

  set id(value) {
    this._id = value;
  }

  set code(value) {
    this._code = value;
  }

  set client(value) {
    this._client = value;
  }

  set etat(value) {
    this._etat = value;
  }

  set dateDebut(value) {
    this._dateDebut = value ? new Date(value) : null;
  }

  set dateFin(value) {
    this._dateFin = value ? new Date(value) : null;
  }

  set chambres(value) {
    this._chambres = value;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // METHODES DE LA CLASSE RESERVATION (selon cahier des charges)
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * a) Verifie si une chambre est deja reservee dans cette reservation
   * @param {Chambre} chambre - La chambre a verifier
   * @returns {boolean} True si la chambre est deja reservee, False sinon
   */
  verifierChambreReservee(chambre) {
    if (!(chambre instanceof Chambre)) {
      throw new Error("Le parametre doit etre une instance de Chambre");
    }
    return this._chambres.some((c) => c.comparer(chambre));
  }

  /**
   * b) Ajoute une chambre a la reservation
   * - Ne pas depasser le nombre de chambres autorisees (MAX_CHAMBRES)
   * - Rejeter l'ajout d'une chambre existante
   * @param {Chambre} chambre - La chambre a ajouter
   * @returns {Object} {success: boolean, message: string}
   */
  ajouterChambre(chambre) {
    if (!(chambre instanceof Chambre)) {
      return { success: false, message: "Le parametre doit etre une instance de Chambre" };
    }

    // Verifier la limite de chambres
    if (this._chambres.length >= MAX_CHAMBRES) {
      return {
        success: false,
        message: `Limite atteinte: impossible d'ajouter plus de ${MAX_CHAMBRES} chambres`,
      };
    }

    // Verifier si la chambre existe deja
    if (this.verifierChambreReservee(chambre)) {
      return {
        success: false,
        message: `La chambre ${chambre.numero} est deja dans cette reservation`,
      };
    }

    // Ajouter la chambre
    this._chambres.push(chambre);
    return {
      success: true,
      message: `Chambre ${chambre.numero} ajoutee avec succes`,
    };
  }

  /**
   * c) Affiche une reservation (informations des chambres et du client)
   * @returns {string}
   */
  afficher() {
    const formatDate = (d) => {
      if (!d) return "N/A";
      const jour = d.getDate().toString().padStart(2, "0");
      const mois = (d.getMonth() + 1).toString().padStart(2, "0");
      const annee = d.getFullYear();
      const heure = d.getHours().toString().padStart(2, "0");
      const minutes = d.getMinutes().toString().padStart(2, "0");
      return `${jour}/${mois}/${annee} ${heure}:${minutes}`;
    };

    const etatEmoji = {
      EnCours: "⏳",
      Validee: "✅",
      Annulee: "❌",
      Expiree: "⌛",
    };

    let result = `
╔═══════════════════════════════════════════════════════════════════════════╗
║                        RESERVATION: ${this._code.padEnd(20)}              ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ Etat        : ${etatEmoji[this._etat] || ""} ${this._etat.padEnd(20)}                            ║
║ Date debut  : ${formatDate(this._dateDebut).padEnd(30)}                   ║
║ Date fin    : ${formatDate(this._dateFin).padEnd(30)}                   ║
║ Duree       : ${this.calculerDuree()} jour(s)                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║ CLIENT                                                                    ║
╠───────────────────────────────────────────────────────────────────────────╣`;

    if (this._client) {
      result += `
║ ID       : ${String(this._client.id).padEnd(20)}                                  ║
║ Nom      : ${this._client.nom.padEnd(20)}                                  ║
║ Prenom   : ${this._client.prenom.padEnd(20)}                                  ║
║ Adresse  : ${this._client.adresse.padEnd(20)}                                  ║`;
    } else {
      result += `
║ Aucun client associe                                                       ║`;
    }

    result += `
╠═══════════════════════════════════════════════════════════════════════════╣
║ CHAMBRES RESERVEES (${this._chambres.length}/${MAX_CHAMBRES})                                           ║
╠───────────────────────────────────────────────────────────────────────────╣`;

    if (this._chambres.length === 0) {
      result += `
║ Aucune chambre reservee                                                   ║`;
    } else {
      this._chambres.forEach((ch, i) => {
        result += `
║ ${(i + 1)}. Chambre ${ch.numero.padEnd(10)} - Tel: ${ch.telephone.padEnd(15)}                 ║`;
      });
    }

    result += `
╚═══════════════════════════════════════════════════════════════════════════╝`;

    return result;
  }

  /**
   * d) Calcule la duree d'une reservation (en jours)
   * @returns {number} Nombre de jours
   */
  calculerDuree() {
    if (!this._dateDebut || !this._dateFin) return 0;
    const diffTime = Math.abs(this._dateFin.getTime() - this._dateDebut.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays); // Minimum 1 jour
  }

  /**
   * e) Supprime une chambre de la reservation
   * Affiche un message d'erreur si la chambre n'est pas reservee
   * @param {Chambre} chambre - La chambre a supprimer
   * @returns {Object} {success: boolean, message: string}
   */
  supprimerChambre(chambre) {
    if (!(chambre instanceof Chambre)) {
      return { success: false, message: "Le parametre doit etre une instance de Chambre" };
    }

    // Verifier si la chambre est dans la reservation
    if (!this.verifierChambreReservee(chambre)) {
      return {
        success: false,
        message: `ERREUR: La chambre ${chambre.numero} n'est pas dans cette reservation`,
      };
    }

    // Supprimer la chambre
    this._chambres = this._chambres.filter((c) => !c.comparer(chambre));
    return {
      success: true,
      message: `Chambre ${chambre.numero} supprimee avec succes`,
    };
  }

  /**
   * f) Valide la reservation (modifier l'etat)
   * @returns {Object} {success: boolean, message: string}
   */
  valider() {
    if (this._etat === "Annulee") {
      return { success: false, message: "Impossible de valider une reservation annulee" };
    }
    if (this._etat === "Validee") {
      return { success: false, message: "La reservation est deja validee" };
    }
    this._etat = "Validee";
    return { success: true, message: `Reservation ${this._code} validee avec succes` };
  }

  /**
   * f) Annule la reservation (modifier l'etat)
   * @returns {Object} {success: boolean, message: string}
   */
  annuler() {
    if (this._etat === "Annulee") {
      return { success: false, message: "La reservation est deja annulee" };
    }
    this._etat = "Annulee";
    return { success: true, message: `Reservation ${this._code} annulee avec succes` };
  }

  /**
   * Methode de saisie - remplit les attributs de la reservation
   * @param {Object} donnees
   */
  saisir(donnees) {
    if (donnees.id !== undefined) this._id = donnees.id;
    if (donnees.code !== undefined) this._code = donnees.code;
    if (donnees.client !== undefined) this._client = donnees.client;
    if (donnees.etat !== undefined) this._etat = donnees.etat;
    if (donnees.dateDebut !== undefined) this._dateDebut = new Date(donnees.dateDebut);
    if (donnees.dateFin !== undefined) this._dateFin = new Date(donnees.dateFin);
    if (donnees.chambres !== undefined) this._chambres = donnees.chambres;
  }

  /**
   * Compare deux reservations par leur code
   * @param {Reservation} autreReservation
   * @returns {boolean}
   */
  comparer(autreReservation) {
    if (!(autreReservation instanceof Reservation)) return false;
    return this._code === autreReservation.code;
  }

  /**
   * Convertit en objet simple
   * @returns {Object}
   */
  toObject() {
    return {
      id: this._id,
      code: this._code,
      clientId: this._client ? this._client.id : null,
      etat: this._etat,
      dateDebut: this._dateDebut,
      dateFin: this._dateFin,
      chambres: this._chambres.map((c) => c.toObject()),
    };
  }

  /**
   * Cree une instance depuis un objet Prisma
   * @param {Object} obj
   * @returns {Reservation}
   */
  static fromObject(obj) {
    const client = obj.client ? Client.fromObject(obj.client) : null;
    const chambres = obj.chambres
      ? obj.chambres.map((rc) => Chambre.fromObject(rc.chambre || rc))
      : [];

    return new Reservation(
      obj.id,
      obj.code,
      client,
      obj.etat,
      obj.dateDebut,
      obj.dateFin,
      chambres
    );
  }

  /**
   * Genere un code unique pour une nouvelle reservation
   * @returns {string}
   */
  static genererCode() {
    return `RES-${Date.now().toString(36).toUpperCase()}`;
  }
}

// Exporter la constante aussi
Reservation.MAX_CHAMBRES = MAX_CHAMBRES;

module.exports = Reservation;
