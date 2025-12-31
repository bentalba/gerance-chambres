/**
 * Classe Chambre - Projet EMSI par Oussama SAJJI
 * 
 * Une chambre est caracterisee par son numero et un numero de telephone
 * L'hotel contient environ 80 chambres
 */

class Chambre {
  // Constructeur par defaut
  constructor(id = null, numero = "", telephone = "") {
    this._id = id;
    this._numero = numero;
    this._telephone = telephone;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GETTERS
  // ═══════════════════════════════════════════════════════════════════════════

  get id() {
    return this._id;
  }

  get numero() {
    return this._numero;
  }

  get telephone() {
    return this._telephone;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SETTERS
  // ═══════════════════════════════════════════════════════════════════════════

  set id(value) {
    this._id = value;
  }

  set numero(value) {
    this._numero = value;
  }

  set telephone(value) {
    this._telephone = value;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // METHODES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Methode de saisie - remplit les attributs de la chambre
   * @param {Object} donnees - {numero, telephone}
   */
  saisir(donnees) {
    if (donnees.id !== undefined) this._id = donnees.id;
    if (donnees.numero !== undefined) this._numero = donnees.numero;
    if (donnees.telephone !== undefined) this._telephone = donnees.telephone;
  }

  /**
   * Methode d'affichage - retourne une representation textuelle de la chambre
   * @returns {string}
   */
  afficher() {
    return `
┌─────────────────────────────────────────────┐
│ CHAMBRE #${this._id || "N/A"}
├─────────────────────────────────────────────┤
│ Numero    : ${this._numero}
│ Telephone : ${this._telephone}
└─────────────────────────────────────────────┘`;
  }

  /**
   * Compare deux chambres selon leur numero (code)
   * Retourne True si meme numero, False sinon
   * @param {Chambre} autreChambre
   * @returns {boolean}
   */
  comparer(autreChambre) {
    if (!(autreChambre instanceof Chambre)) return false;
    return this._numero === autreChambre.numero;
  }

  /**
   * Compare par ID
   * @param {Chambre} autreChambre
   * @returns {boolean}
   */
  comparerParId(autreChambre) {
    if (!(autreChambre instanceof Chambre)) return false;
    return this._id === autreChambre.id;
  }

  /**
   * Convertit en objet simple (pour Prisma/JSON)
   * @returns {Object}
   */
  toObject() {
    return {
      id: this._id,
      numero: this._numero,
      telephone: this._telephone,
    };
  }

  /**
   * Cree une instance Chambre depuis un objet (ex: resultat Prisma)
   * @param {Object} obj
   * @returns {Chambre}
   */
  static fromObject(obj) {
    return new Chambre(obj.id, obj.numero, obj.telephone);
  }
}

module.exports = Chambre;
