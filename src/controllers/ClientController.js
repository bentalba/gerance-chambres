/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                   CONTROLLER CLIENT - API LAYER                            ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Endpoints REST pour la gestion des clients                               ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { ClientService } = require('../services');

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         nom:
 *           type: string
 *           description: Nom du client
 *         prenom:
 *           type: string
 *           description: Prénom du client
 *         adresse:
 *           type: string
 *           description: Adresse du client
 */

class ClientController {
  
  /**
   * @swagger
   * /api/v1/clients:
   *   get:
   *     summary: Liste tous les clients
   *     tags: [Clients]
   *     responses:
   *       200:
   *         description: Liste des clients
   */
  static async getAll(req, res) {
    try {
      const result = await ClientService.findAll();
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
   * /api/v1/clients/{id}:
   *   get:
   *     summary: Récupère un client par ID
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Client trouvé
   *       404:
   *         description: Client non trouvé
   */
  static async getById(req, res) {
    try {
      const result = await ClientService.findById(req.params.id);
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
   * /api/v1/clients:
   *   post:
   *     summary: Crée un nouveau client
   *     tags: [Clients]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       201:
   *         description: Client créé
   */
  static async create(req, res) {
    try {
      const result = await ClientService.create(req.body);
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
   * /api/v1/clients/{id}:
   *   put:
   *     summary: Met à jour un client
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Client'
   *     responses:
   *       200:
   *         description: Client mis à jour
   */
  static async update(req, res) {
    try {
      const result = await ClientService.update(req.params.id, req.body);
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
   * /api/v1/clients/{id}:
   *   delete:
   *     summary: Supprime un client
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Client supprimé
   */
  static async delete(req, res) {
    try {
      const result = await ClientService.delete(req.params.id);
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
   * /api/v1/clients/search:
   *   get:
   *     summary: Recherche des clients
   *     tags: [Clients]
   *     parameters:
   *       - in: query
   *         name: q
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Résultats de recherche
   */
  static async search(req, res) {
    try {
      const query = req.query.q || '';
      const result = await ClientService.search(query);
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
   * /api/v1/clients/{id}/reservations:
   *   get:
   *     summary: Vérifie les réservations actives d'un client
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Statut des réservations
   */
  static async checkActiveReservations(req, res) {
    try {
      const hasActive = await ClientService.hasActiveReservations(req.params.id);
      res.json({ 
        success: true, 
        hasActiveReservations: hasActive,
        message: hasActive ? 'Le client a des réservations actives' : 'Aucune réservation active'
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ClientController;
