/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║               CONTROLLER RESERVATION - API LAYER                           ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Endpoints REST pour la gestion des réservations                          ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { ReservationService } = require('../services');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - client_id
 *         - date_debut
 *         - date_fin
 *       properties:
 *         id:
 *           type: integer
 *         code:
 *           type: string
 *         client_id:
 *           type: integer
 *         date_debut:
 *           type: string
 *           format: date-time
 *         date_fin:
 *           type: string
 *           format: date-time
 *         etat:
 *           type: string
 *           enum: [Pending, Validated, Canceled, Closed]
 *         chambre_ids:
 *           type: array
 *           items:
 *             type: integer
 */

class ReservationController {
  
  /**
   * @swagger
   * /api/v1/reservations:
   *   get:
   *     summary: Liste toutes les réservations
   *     tags: [Reservations]
   */
  static async getAll(req, res) {
    try {
      const result = await ReservationService.findAll();
      if (result.success) {
        res.json({ success: true, data: result.data });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/{id}:
   *   get:
   *     summary: Récupère une réservation par ID
   *     tags: [Reservations]
   */
  static async getById(req, res) {
    try {
      const result = await ReservationService.findById(req.params.id);
      if (result.success) {
        res.json({ success: true, data: result.data });
      } else {
        res.status(404).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/code/{code}:
   *   get:
   *     summary: Récupère une réservation par code
   *     tags: [Reservations]
   */
  static async getByCode(req, res) {
    try {
      const result = await ReservationService.findByCode(req.params.code);
      if (result.success) {
        res.json({ success: true, data: result.data });
      } else {
        res.status(404).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations:
   *   post:
   *     summary: Crée une nouvelle réservation
   *     tags: [Reservations]
   */
  static async create(req, res) {
    try {
      const result = await ReservationService.create(req.body);
      if (result.success) {
        res.status(201).json({ success: true, data: result.data });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/{id}/chambres:
   *   post:
   *     summary: Ajoute une chambre à une réservation
   *     tags: [Reservations]
   */
  static async addChambre(req, res) {
    try {
      const { chambre_id } = req.body;
      if (!chambre_id) {
        return res.status(400).json({ success: false, error: 'chambre_id est obligatoire' });
      }
      
      const result = await ReservationService.addChambre(req.params.id, chambre_id);
      if (result.success) {
        res.json({ success: true, data: result.data });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/{id}/chambres/{chambreId}:
   *   delete:
   *     summary: Supprime une chambre d'une réservation
   *     tags: [Reservations]
   */
  static async removeChambre(req, res) {
    try {
      const result = await ReservationService.removeChambre(
        req.params.id, 
        req.params.chambreId
      );
      if (result.success) {
        res.json({ success: true, data: result.data });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/{id}/validate:
   *   patch:
   *     summary: Valide une réservation
   *     tags: [Reservations]
   */
  static async validate(req, res) {
    try {
      const result = await ReservationService.validate(req.params.id);
      if (result.success) {
        res.json({ success: true, data: result.data, message: result.message });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/{id}/cancel:
   *   patch:
   *     summary: Annule une réservation
   *     tags: [Reservations]
   */
  static async cancel(req, res) {
    try {
      const result = await ReservationService.cancel(req.params.id);
      if (result.success) {
        res.json({ success: true, data: result.data, message: result.message });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/{id}/close:
   *   patch:
   *     summary: Clôture une réservation
   *     tags: [Reservations]
   */
  static async close(req, res) {
    try {
      const result = await ReservationService.close(req.params.id);
      if (result.success) {
        res.json({ success: true, data: result.data, message: result.message });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/{id}/duration:
   *   get:
   *     summary: Calcule la durée d'une réservation
   *     tags: [Reservations]
   */
  static async getDuration(req, res) {
    try {
      const result = await ReservationService.calculateDuration(req.params.id);
      if (result.success) {
        res.json({ success: true, data: result.data, message: result.message });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/{id}:
   *   delete:
   *     summary: Supprime une réservation
   *     tags: [Reservations]
   */
  static async delete(req, res) {
    try {
      const result = await ReservationService.delete(req.params.id);
      if (result.success) {
        res.json({ success: true, message: result.message });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/client/{clientId}:
   *   get:
   *     summary: Liste les réservations d'un client
   *     tags: [Reservations]
   */
  static async getByClient(req, res) {
    try {
      const result = await ReservationService.findByClient(req.params.clientId);
      if (result.success) {
        res.json({ success: true, data: result.data });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/client/{clientId}/active:
   *   get:
   *     summary: Vérifie si un client a des réservations actives
   *     tags: [Reservations]
   */
  static async checkClientActive(req, res) {
    try {
      const result = await ReservationService.clientHasActiveReservations(req.params.clientId);
      if (result.success) {
        res.json({ 
          success: true, 
          hasActive: result.hasActive, 
          count: result.count,
          message: result.message 
        });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/today/created:
   *   get:
   *     summary: Réservations créées aujourd'hui
   *     tags: [Reservations]
   */
  static async getCreatedToday(req, res) {
    try {
      const result = await ReservationService.getCreatedToday();
      if (result.success) {
        res.json({ success: true, data: result.data, message: result.message });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/today/expiring:
   *   get:
   *     summary: Réservations se terminant aujourd'hui
   *     tags: [Reservations]
   */
  static async getExpiringToday(req, res) {
    try {
      const result = await ReservationService.getExpiringToday();
      if (result.success) {
        res.json({ success: true, data: result.data, message: result.message });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/auto-close:
   *   post:
   *     summary: Clôture automatique des réservations expirées
   *     tags: [Reservations]
   */
  static async autoClose(req, res) {
    try {
      const result = await ReservationService.autoCloseExpired();
      if (result.success) {
        res.json({ success: true, count: result.count, message: result.message });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/reservations/statistics:
   *   get:
   *     summary: Statistiques des réservations
   *     tags: [Reservations]
   */
  static async getStatistics(req, res) {
    try {
      const result = await ReservationService.getStatistics();
      if (result.success) {
        res.json({ success: true, data: result.data });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ReservationController;
