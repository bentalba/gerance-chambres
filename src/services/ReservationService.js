/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║              SERVICE RESERVATION - THE ENGINE (COEUR DU SYSTÈME)           ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Availability Check, Room Limits, Duration Calculator, State Management   ║
 * ║  Transactions atomiques pour l'intégrité des données                      ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { sequelize, Reservation, Client, Chambre, ReservationChambre } = require('../models');
const ChambreService = require('./ChambreService');
const { Op } = require('sequelize');

const MAX_CHAMBRES_HOTEL = 80;

class ReservationService {
  
  /**
   * Crée une réservation avec transaction atomique
   * @param {Object} data - { client_id, date_debut, date_fin, chambre_ids }
   * @returns {Promise<Object>}
   */
  static async create(data) {
    const transaction = await sequelize.transaction();
    
    try {
      // Validation des données
      this.validateReservationData(data);
      
      // Vérifier que le client existe
      const client = await Client.findByPk(data.client_id);
      if (!client) {
        throw new Error('Client non trouvé');
      }
      
      // Vérifier la disponibilité de toutes les chambres
      if (data.chambre_ids && data.chambre_ids.length > 0) {
        for (const chambreId of data.chambre_ids) {
          const disponible = await ChambreService.isAvailable(
            chambreId, 
            new Date(data.date_debut), 
            new Date(data.date_fin)
          );
          
          if (!disponible) {
            const chambre = await Chambre.findByPk(chambreId);
            throw new Error(`La chambre ${chambre?.numero_chambre || chambreId} n'est pas disponible pour ces dates`);
          }
        }
      }
      
      // Créer la réservation
      const reservation = await Reservation.create({
        client_id: data.client_id,
        date_debut: new Date(data.date_debut),
        date_fin: new Date(data.date_fin),
        etat: Reservation.ETATS.PENDING,
        nb_chambres: data.chambre_ids ? data.chambre_ids.length : 0
      }, { transaction });
      
      // Associer les chambres
      if (data.chambre_ids && data.chambre_ids.length > 0) {
        for (const chambreId of data.chambre_ids) {
          await ReservationChambre.create({
            reservation_id: reservation.id,
            chambre_id: chambreId
          }, { transaction });
        }
      }
      
      await transaction.commit();
      
      // Récupérer la réservation complète
      const reservationComplete = await this.getById(reservation.id);
      
      return { success: true, data: reservationComplete.data };
    } catch (error) {
      await transaction.rollback();
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère toutes les réservations
   * @returns {Promise<Object>}
   */
  static async getAll() {
    try {
      const reservations = await Reservation.findAll({
        include: [
          { model: Client, as: 'client' },
          { model: Chambre, as: 'chambres' }
        ],
        order: [['created_at', 'DESC']]
      });
      return { success: true, data: reservations };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère une réservation par ID
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async getById(id) {
    try {
      const reservation = await Reservation.findByPk(id, {
        include: [
          { model: Client, as: 'client' },
          { model: Chambre, as: 'chambres' }
        ]
      });
      
      if (!reservation) {
        return { success: false, error: 'Réservation non trouvée' };
      }
      
      return { success: true, data: reservation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère une réservation par code
   * @param {string} code
   * @returns {Promise<Object>}
   */
  static async findByCode(code) {
    try {
      const reservation = await Reservation.findOne({
        where: { code },
        include: [
          { model: Client, as: 'client' },
          { model: Chambre, as: 'chambres' }
        ]
      });
      
      if (!reservation) {
        return { success: false, error: 'Réservation non trouvée' };
      }
      
      return { success: true, data: reservation };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Ajoute une chambre à une réservation
   * @param {number} reservationId
   * @param {number} chambreId
   * @returns {Promise<Object>}
   */
  static async addChambre(reservationId, chambreId) {
    const transaction = await sequelize.transaction();
    
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (!reservation) {
        throw new Error('Réservation non trouvée');
      }
      
      if (reservation.etat === Reservation.ETATS.CANCELED) {
        throw new Error('Impossible de modifier une réservation annulée');
      }
      
      // Vérifier la limite de chambres
      const nbChambresActuelles = await ReservationChambre.count({
        where: { reservation_id: reservationId }
      });
      
      if (nbChambresActuelles >= MAX_CHAMBRES_HOTEL) {
        throw new Error(`Limite de ${MAX_CHAMBRES_HOTEL} chambres atteinte`);
      }
      
      // Vérifier si la chambre n'est pas déjà dans la réservation
      const dejaReservee = await ReservationChambre.findOne({
        where: { reservation_id: reservationId, chambre_id: chambreId }
      });
      
      if (dejaReservee) {
        throw new Error('Cette chambre est déjà dans la réservation');
      }
      
      // Vérifier la disponibilité
      const disponible = await ChambreService.isAvailable(
        chambreId,
        reservation.date_debut,
        reservation.date_fin,
        reservationId
      );
      
      if (!disponible) {
        throw new Error('Cette chambre n\'est pas disponible pour ces dates');
      }
      
      // Ajouter la chambre
      await ReservationChambre.create({
        reservation_id: reservationId,
        chambre_id: chambreId
      }, { transaction });
      
      // Mettre à jour le compteur
      reservation.nb_chambres = nbChambresActuelles + 1;
      await reservation.save({ transaction });
      
      await transaction.commit();
      
      return await this.getById(reservationId);
    } catch (error) {
      await transaction.rollback();
      return { success: false, error: error.message };
    }
  }

  /**
   * Supprime une chambre d'une réservation
   * @param {number} reservationId
   * @param {number} chambreId
   * @returns {Promise<Object>}
   */
  static async removeChambre(reservationId, chambreId) {
    const transaction = await sequelize.transaction();
    
    try {
      const reservation = await Reservation.findByPk(reservationId);
      if (!reservation) {
        throw new Error('Réservation non trouvée');
      }
      
      const link = await ReservationChambre.findOne({
        where: { reservation_id: reservationId, chambre_id: chambreId }
      });
      
      if (!link) {
        throw new Error('Cette chambre n\'est pas dans la réservation');
      }
      
      await link.destroy({ transaction });
      
      // Mettre à jour le compteur
      reservation.nb_chambres = Math.max(0, reservation.nb_chambres - 1);
      await reservation.save({ transaction });
      
      await transaction.commit();
      
      return await this.getById(reservationId);
    } catch (error) {
      await transaction.rollback();
      return { success: false, error: error.message };
    }
  }

  /**
   * Valide une réservation (change l'état à Validated)
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async validate(id) {
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        return { success: false, error: 'Réservation non trouvée' };
      }
      
      if (reservation.etat === Reservation.ETATS.CANCELED) {
        return { success: false, error: 'Impossible de valider une réservation annulée' };
      }
      
      reservation.etat = Reservation.ETATS.VALIDATED;
      await reservation.save();
      
      return { success: true, data: reservation, message: 'Réservation validée' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Annule une réservation
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async cancel(id) {
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        return { success: false, error: 'Réservation non trouvée' };
      }
      
      reservation.etat = Reservation.ETATS.CANCELED;
      await reservation.save();
      
      return { success: true, data: reservation, message: 'Réservation annulée' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Clôture une réservation
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async close(id) {
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        return { success: false, error: 'Réservation non trouvée' };
      }
      
      reservation.etat = Reservation.ETATS.CLOSED;
      await reservation.save();
      
      return { success: true, data: reservation, message: 'Réservation clôturée' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Calcule la durée d'une réservation en heures
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async calculateDuration(id) {
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        return { success: false, error: 'Réservation non trouvée' };
      }
      
      const duree_heures = reservation.calculerDureeHeures();
      const duree_jours = reservation.calculerDureeJours();
      
      return { 
        success: true, 
        data: { duree_heures, duree_jours },
        message: `Durée: ${duree_jours} jour(s) (${duree_heures} heures)`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère les réservations d'un client
   * @param {number} clientId
   * @returns {Promise<Object>}
   */
  static async findByClient(clientId) {
    try {
      const reservations = await Reservation.findAll({
        where: { client_id: clientId },
        include: [
          { model: Client, as: 'client' },
          { model: Chambre, as: 'chambres' }
        ],
        order: [['date_debut', 'DESC']]
      });
      
      return { success: true, data: reservations };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Vérifie si un client a des réservations actives
   * @param {number} clientId
   * @returns {Promise<Object>}
   */
  static async clientHasActiveReservations(clientId) {
    try {
      const count = await Reservation.count({
        where: {
          client_id: clientId,
          etat: { [Op.in]: [Reservation.ETATS.PENDING, Reservation.ETATS.VALIDATED] }
        }
      });
      
      return { 
        success: true, 
        hasActive: count > 0, 
        count,
        message: count > 0 
          ? `Le client a ${count} réservation(s) active(s)` 
          : 'Aucune réservation active'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère les réservations créées aujourd'hui
   * @returns {Promise<Object>}
   */
  static async getCreatedToday() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const reservations = await Reservation.findAll({
        where: {
          created_at: {
            [Op.gte]: today,
            [Op.lt]: tomorrow
          }
        },
        include: [
          { model: Client, as: 'client' },
          { model: Chambre, as: 'chambres' }
        ]
      });
      
      return { 
        success: true, 
        data: reservations,
        message: `${reservations.length} réservation(s) créée(s) aujourd'hui`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Récupère les réservations se terminant aujourd'hui
   * @returns {Promise<Object>}
   */
  static async getExpiringToday() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const reservations = await Reservation.findAll({
        where: {
          date_fin: {
            [Op.gte]: today,
            [Op.lt]: tomorrow
          },
          etat: { [Op.ne]: Reservation.ETATS.CANCELED }
        },
        include: [
          { model: Client, as: 'client' },
          { model: Chambre, as: 'chambres' }
        ]
      });
      
      return { 
        success: true, 
        data: reservations,
        message: `${reservations.length} réservation(s) se terminant aujourd'hui`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Clôture automatique des réservations expirées (CRON JOB)
   * @returns {Promise<Object>}
   */
  static async autoCloseExpired() {
    try {
      const now = new Date();
      
      const [affectedRows] = await Reservation.update(
        { etat: Reservation.ETATS.CLOSED },
        {
          where: {
            date_fin: { [Op.lt]: now },
            etat: { [Op.in]: [Reservation.ETATS.PENDING, Reservation.ETATS.VALIDATED] }
          }
        }
      );
      
      return { 
        success: true, 
        count: affectedRows,
        message: `${affectedRows} réservation(s) clôturée(s) automatiquement`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Annule automatique des réservations Pending expirées
   * @returns {Promise<Object>}
   */
  static async autoCancelExpiredPending() {
    try {
      const now = new Date();
      
      const [affectedRows] = await Reservation.update(
        { etat: Reservation.ETATS.CANCELED },
        {
          where: {
            date_fin: { [Op.lt]: now },
            etat: Reservation.ETATS.PENDING
          }
        }
      );
      
      return { 
        success: true, 
        count: affectedRows,
        message: `${affectedRows} réservation(s) en attente annulée(s)`
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Supprime une réservation
   * @param {number} id
   * @returns {Promise<Object>}
   */
  static async delete(id) {
    const transaction = await sequelize.transaction();
    
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        throw new Error('Réservation non trouvée');
      }
      
      // Supprimer les associations
      await ReservationChambre.destroy({
        where: { reservation_id: id },
        transaction
      });
      
      // Supprimer la réservation
      await reservation.destroy({ transaction });
      
      await transaction.commit();
      
      return { success: true, message: 'Réservation supprimée avec succès' };
    } catch (error) {
      await transaction.rollback();
      return { success: false, error: error.message };
    }
  }

  /**
   * Statistiques des réservations
   * @returns {Promise<Object>}
   */
  static async getStatistics() {
    try {
      const total = await Reservation.count();
      const pending = await Reservation.count({ where: { etat: Reservation.ETATS.PENDING } });
      const validated = await Reservation.count({ where: { etat: Reservation.ETATS.VALIDATED } });
      const canceled = await Reservation.count({ where: { etat: Reservation.ETATS.CANCELED } });
      const closed = await Reservation.count({ where: { etat: Reservation.ETATS.CLOSED } });
      
      return {
        success: true,
        data: { total, pending, validated, canceled, closed }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Validation des données de réservation
   * @param {Object} data
   * @throws {Error}
   */
  static validateReservationData(data) {
    if (!data.client_id) {
      throw new Error('Le client est obligatoire');
    }
    if (!data.date_debut) {
      throw new Error('La date de début est obligatoire');
    }
    if (!data.date_fin) {
      throw new Error('La date de fin est obligatoire');
    }
    if (new Date(data.date_fin) <= new Date(data.date_debut)) {
      throw new Error('La date de fin doit être postérieure à la date de début');
    }
  }
}

module.exports = ReservationService;
