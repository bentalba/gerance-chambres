/**
 * Classe Client - Projet EMSI par Oussama SAJJI
 * 
 * Un client est caracterise par : identifiant, nom, prenom et adresse
 */

class Client {
  // Constructeur par defaut
  constructor(id = null, nom = "", prenom = "", adresse = "") {
    this._id = id;
    this._nom = nom;
    this._prenom = prenom;
    this._adresse = adresse;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GETTERS
  // ═══════════════════════════════════════════════════════════════════════════

  get id() {
    return this._id;
  }

  get nom() {
    return this._nom;
  }

  get prenom() {
    return this._prenom;
  }

  get adresse() {
    return this._adresse;
  }

  // Nom complet (utilitaire)
  get nomComplet() {
    return `${this._prenom} ${this._nom}`;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SETTERS
  // ═══════════════════════════════════════════════════════════════════════════

  set id(value) {
    this._id = value;
  }

  set nom(value) {
    this._nom = value;
  }

  set prenom(value) {
    this._prenom = value;
  }

  set adresse(value) {
    this._adresse = value;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // METHODES
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Methode de saisie - remplit les attributs du client
   * @param {Object} donnees - {nom, prenom, adresse}
   */
  saisir(donnees) {
    if (donnees.id !== undefined) this._id = donnees.id;
    if (donnees.nom !== undefined) this._nom = donnees.nom;
    if (donnees.prenom !== undefined) this._prenom = donnees.prenom;
    if (donnees.adresse !== undefined) this._adresse = donnees.adresse;
  }

  /**
   * Methode d'affichage - retourne une representation textuelle du client
   * @returns {string}
   */
  afficher() {
    return `
┌─────────────────────────────────────────────┐
│ CLIENT #${this._id || "N/A"}
├─────────────────────────────────────────────┤
│ Nom      : ${this._nom}
│ Prenom   : ${this._prenom}
│ Adresse  : ${this._adresse}
└─────────────────────────────────────────────┘`;
  }

  /**
   * Compare deux clients par leur identifiant
   * @param {Client} autreClient
   * @returns {boolean} True si meme id, False sinon
   */
  comparer(autreClient) {
    if (!(autreClient instanceof Client)) return false;
    return this._id === autreClient.id;
  }

  /**
   * Convertit en objet simple (pour Prisma/JSON)
   * @returns {Object}
   */
  toObject() {
    return {
      id: this._id,
      nom: this._nom,
      prenom: this._prenom,
      adresse: this._adresse,
    };
  }

  /**
   * Cree une instance Client depuis un objet (ex: resultat Prisma)
   * @param {Object} obj
   * @returns {Client}
   */
  static fromObject(obj) {
    return new Client(obj.id, obj.nom, obj.prenom, obj.adresse);
  }
}

module.exports = Client;
