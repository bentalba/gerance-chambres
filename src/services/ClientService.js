/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    SERVICE CLIENT - BUSINESS LOGIC                         ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  CRUD + Validation + Logique métier pour les clients                      ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { Client, Reservation } = require('../models');
const { Op } = require('sequelize');

class ClientService {
  
  /**
   * Crée un nouveau client avec validation
   * @param {Object} data - { nom, prenom, adresse }
   * @returns {Promise<Client>}
   */
  static async create(data) {
    try {
      // Validation des données
      this.validateClientData(data);
      
      const client = await Client.create({
        nom: data.nom.trim(),
        prenom: data.prenom.trim(),
        adresse: data.adresse ? data.adresse.trim() : null
      });
      
      return { success: true, data: client };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère tous les clients
   * @returns {Promise<Client[]>}
   */
  static async findAll() {
    try {
      const clients = await Client.findAll({
        order: [['nom', 'ASC'], ['prenom', 'ASC']]
      });
      return { success: true, data: clients };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère un client par ID
   * @param {number} id
   * @returns {Promise<Client>}
   */
  static async findById(id) {
    try {
      const client = await Client.findByPk(id, {
        include: [{ model: Reservation, as: 'reservations' }]
      });
      
      if (!client) {
        return { success: false, error: 'Client non trouvé' };
      }
      
      return { success: true, data: client };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Met à jour un client
   * @param {number} id
   * @param {Object} data
   * @returns {Promise<Client>}
   */
  static async update(id, data) {
    try {
      const client = await Client.findByPk(id);
      
      if (!client) {
        return { success: false, error: 'Client non trouvé' };
      }
      
      if (data.nom) client.nom = data.nom.trim();
      if (data.prenom) client.prenom = data.prenom.trim();
      if (data.adresse !== undefined) client.adresse = data.adresse ? data.adresse.trim() : null;
      
      await client.save();
      
      return { success: true, data: client };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Supprime un client
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  static async delete(id) {
    try {
      const client = await Client.findByPk(id);
      
      if (!client) {
        return { success: false, error: 'Client non trouvé' };
      }
      
      // Vérifier si le client a des réservations actives
      const reservationsActives = await Reservation.count({
        where: {
          client_id: id,
          etat: { [Op.in]: ['Pending', 'Validated'] }
        }
      });
      
      if (reservationsActives > 0) {
        return { 
          success: false, 
          error: 'Impossible de supprimer: le client a des réservations actives' 
        };
      }
      
      await client.destroy();
      return { success: true, message: 'Client supprimé avec succès' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Vérifie si un client existe
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  static async exists(id) {
    const count = await Client.count({ where: { id } });
    return count > 0;
  }

  /**
   * Vérifie si un client a des réservations actives
   * @param {number} clientId
   * @returns {Promise<boolean>}
   */
  static async hasActiveReservations(clientId) {
    const count = await Reservation.count({
      where: {
        client_id: clientId,
        etat: { [Op.in]: ['Pending', 'Validated'] }
      }
    });
    return count > 0;
  }

  /**
   * Recherche de clients
   * @param {string} query
   * @returns {Promise<Client[]>}
   */
  static async search(query) {
    try {
      const clients = await Client.findAll({
        where: {
          [Op.or]: [
            { nom: { [Op.like]: `%${query}%` } },
            { prenom: { [Op.like]: `%${query}%` } },
            { adresse: { [Op.like]: `%${query}%` } }
          ]
        }
      });
      return { success: true, data: clients };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Validation des données client
   * @param {Object} data
   * @throws {Error}
   */
  static validateClientData(data) {
    if (!data.nom || data.nom.trim().length < 2) {
      throw new Error('Le nom doit contenir au moins 2 caractères');
    }
    if (!data.prenom || data.prenom.trim().length < 2) {
      throw new Error('Le prénom doit contenir au moins 2 caractères');
    }
  }
}

module.exports = ClientService;
