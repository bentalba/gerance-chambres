/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                   SERVICE CHAMBRE - BUSINESS LOGIC                         ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  CRUD + Validation + Vérification doublons                                ║
 * ║  Maximum 80 chambres par hôtel                                            ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { Chambre, Reservation, ReservationChambre } = require('../models');
const { Op } = require('sequelize');

const MAX_CHAMBRES = 80;

class ChambreService {
  
  /**
   * Crée une nouvelle chambre avec validation
   * @param {Object} data - { numero_chambre, telephone }
   * @returns {Promise<Object>}
   */
  static async create(data) {
    try {
      // Vérifier la limite de 80 chambres
      const count = await Chambre.count();
      if (count >= MAX_CHAMBRES) {
        return { 
          success: false, 
          error: `L'hôtel a atteint sa capacité maximale de ${MAX_CHAMBRES} chambres` 
        };
      }
      
      // Vérifier les doublons
      const existe = await this.existsByNumero(data.numero_chambre);
      if (existe) {
        return { success: false, error: 'Ce numéro de chambre existe déjà' };
      }
      
      this.validateChambreData(data);
      
      const chambre = await Chambre.create({
        numero_chambre: data.numero_chambre.trim(),
        telephone: data.telephone ? data.telephone.trim() : null
      });
      
      return { success: true, data: chambre };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère toutes les chambres
   * @returns {Promise<Object>}
   */
  static async findAll() {
    try {
      const chambres = await Chambre.findAll({
        order: [['numero_chambre', 'ASC']]
      });
      return { success: true, data: chambres, count: chambres.length, max: MAX_CHAMBRES };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère une chambre par ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async findById(id) {
    try {
      const chambre = await Chambre.findByPk(id);
      if (!chambre) {
        return { success: false, error: 'Chambre non trouvée' };
      }
      return { success: true, data: chambre };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère une chambre par numéro
   * @param {string} numero
   * @returns {Promise<Object>}
   */
  static async findByNumero(numero) {
    try {
      const chambre = await Chambre.findOne({
        where: { numero_chambre: numero }
      });
      if (!chambre) {
        return { success: false, error: 'Chambre non trouvée' };
      }
      return { success: true, data: chambre };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Met à jour une chambre
   * @param {number} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  static async update(id, data) {
    try {
      const chambre = await Chambre.findByPk(id);
      if (!chambre) {
        return { success: false, error: 'Chambre non trouvée' };
      }
      
      // Vérifier si le nouveau numéro n'existe pas déjà
      if (data.numero_chambre && data.numero_chambre !== chambre.numero_chambre) {
        const existe = await this.existsByNumero(data.numero_chambre);
        if (existe) {
          return { success: false, error: 'Ce numéro de chambre existe déjà' };
        }
        chambre.numero_chambre = data.numero_chambre.trim();
      }
      
      if (data.telephone !== undefined) {
        chambre.telephone = data.telephone ? data.telephone.trim() : null;
      }
      
      await chambre.save();
      return { success: true, data: chambre };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Supprime une chambre
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    try {
      const chambre = await Chambre.findByPk(id);
      if (!chambre) {
        return { success: false, error: 'Chambre non trouvée' };
      }
      
      // Vérifier si la chambre est utilisée dans des réservations actives
      const reservationsActives = await ReservationChambre.count({
        where: { chambre_id: id },
        include: [{
          model: Reservation,
          where: { etat: { [Op.in]: ['Pending', 'Validated'] } }
        }]
      });
      
      if (reservationsActives > 0) {
        return { 
          success: false, 
          error: 'Impossible de supprimer: la chambre est liée à des réservations actives' 
        };
      }
      
      await chambre.destroy();
      return { success: true, message: 'Chambre supprimée avec succès' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Vérifie si une chambre existe par numéro
   * @param {string} numero
   * @returns {Promise<boolean>}
   */
  static async existsByNumero(numero) {
    const count = await Chambre.count({
      where: { numero_chambre: numero }
    });
    return count > 0;
  }

  /**
   * Compare deux chambres par leur code (numéro)
   * @param {string} numero1
   * @param {string} numero2
   * @returns {boolean}
   */
  static compareByCode(numero1, numero2) {
    return numero1 === numero2;
  }

  /**
   * Vérifie la disponibilité d'une chambre pour une période
   * @param {number} chambreId
   * @param {Date} dateDebut
   * @param {Date} dateFin
   * @param {number} excludeReservationId - Exclure une réservation (pour modification)
   * @returns {Promise<boolean>}
   */
  static async isAvailable(chambreId, dateDebut, dateFin, excludeReservationId = null) {
    const whereClause = {
      chambre_id: chambreId
    };
    
    const reservationWhere = {
      etat: { [Op.in]: ['Pending', 'Validated'] },
      [Op.or]: [
        {
          date_debut: { [Op.between]: [dateDebut, dateFin] }
        },
        {
          date_fin: { [Op.between]: [dateDebut, dateFin] }
        },
        {
          [Op.and]: [
            { date_debut: { [Op.lte]: dateDebut } },
            { date_fin: { [Op.gte]: dateFin } }
          ]
        }
      ]
    };
    
    if (excludeReservationId) {
      reservationWhere.id = { [Op.ne]: excludeReservationId };
    }
    
    const conflits = await ReservationChambre.count({
      where: whereClause,
      include: [{
        model: Reservation,
        where: reservationWhere,
        required: true
      }]
    });
    
    return conflits === 0;
  }

  /**
   * Récupère les chambres disponibles pour une période
   * @param {Date} dateDebut
   * @param {Date} dateFin
   * @returns {Promise<Object>}
   */
  static async getAvailableRooms(dateDebut, dateFin) {
    try {
      const toutesChambres = await Chambre.findAll();
      const chambresDisponibles = [];
      
      for (const chambre of toutesChambres) {
        const disponible = await this.isAvailable(chambre.id, dateDebut, dateFin);
        if (disponible) {
          chambresDisponibles.push(chambre);
        }
      }
      
      return { success: true, data: chambresDisponibles };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Validation des données chambre
   * @param {Object} data
   * @throws {Error}
   */
  static validateChambreData(data) {
    if (!data.numero_chambre || data.numero_chambre.trim().length === 0) {
      throw new Error('Le numéro de chambre est obligatoire');
    }
  }
}

module.exports = ChambreService;
