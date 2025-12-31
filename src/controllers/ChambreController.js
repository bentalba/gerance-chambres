/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                  CONTROLLER CHAMBRE - API LAYER                            ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Endpoints REST pour la gestion des chambres                              ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { ChambreService } = require('../services');

/**
 * @swagger
 * components:
 *   schemas:
 *     Chambre:
 *       type: object
 *       required:
 *         - numero_chambre
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré
 *         numero_chambre:
 *           type: string
 *           description: Numéro de la chambre (ex "101")
 *         telephone:
 *           type: string
 *           description: Téléphone de la chambre
 */

class ChambreController {
  
  /**
   * @swagger
   * /api/v1/chambres:
   *   get:
   *     summary: Liste toutes les chambres
   *     tags: [Chambres]
   *     responses:
   *       200:
   *         description: Liste des chambres
   */
  static async getAll(req, res) {
    try {
      const result = await ChambreService.findAll();
      if (result.success) {
        res.json({ 
          success: true, 
          data: result.data,
          count: result.count,
          maxCapacity: result.max
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
   * /api/v1/chambres/{id}:
   *   get:
   *     summary: Récupère une chambre par ID
   *     tags: [Chambres]
   */
  static async getById(req, res) {
    try {
      const result = await ChambreService.findById(req.params.id);
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
   * /api/v1/chambres/numero/{numero}:
   *   get:
   *     summary: Récupère une chambre par numéro
   *     tags: [Chambres]
   */
  static async getByNumero(req, res) {
    try {
      const result = await ChambreService.findByNumero(req.params.numero);
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
   * /api/v1/chambres:
   *   post:
   *     summary: Crée une nouvelle chambre
   *     tags: [Chambres]
   */
  static async create(req, res) {
    try {
      const result = await ChambreService.create(req.body);
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
   * /api/v1/chambres/{id}:
   *   put:
   *     summary: Met à jour une chambre
   *     tags: [Chambres]
   */
  static async update(req, res) {
    try {
      const result = await ChambreService.update(req.params.id, req.body);
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
   * /api/v1/chambres/{id}:
   *   delete:
   *     summary: Supprime une chambre
   *     tags: [Chambres]
   */
  static async delete(req, res) {
    try {
      const result = await ChambreService.delete(req.params.id);
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
   * /api/v1/chambres/available:
   *   get:
   *     summary: Liste les chambres disponibles pour une période
   *     tags: [Chambres]
   *     parameters:
   *       - in: query
   *         name: date_debut
   *         required: true
   *         schema:
   *           type: string
   *           format: date-time
   *       - in: query
   *         name: date_fin
   *         required: true
   *         schema:
   *           type: string
   *           format: date-time
   */
  static async getAvailable(req, res) {
    try {
      const { date_debut, date_fin } = req.query;
      
      if (!date_debut || !date_fin) {
        return res.status(400).json({ 
          success: false, 
          error: 'Les dates de début et fin sont obligatoires' 
        });
      }
      
      const result = await ChambreService.getAvailableRooms(
        new Date(date_debut),
        new Date(date_fin)
      );
      
      if (result.success) {
        res.json({ success: true, data: result.data, count: result.data.length });
      } else {
        res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/chambres/{id}/availability:
   *   get:
   *     summary: Vérifie la disponibilité d'une chambre
   *     tags: [Chambres]
   */
  static async checkAvailability(req, res) {
    try {
      const { date_debut, date_fin } = req.query;
      
      if (!date_debut || !date_fin) {
        return res.status(400).json({ 
          success: false, 
          error: 'Les dates de début et fin sont obligatoires' 
        });
      }
      
      const isAvailable = await ChambreService.isAvailable(
        req.params.id,
        new Date(date_debut),
        new Date(date_fin)
      );
      
      res.json({ 
        success: true, 
        available: isAvailable,
        message: isAvailable ? 'Chambre disponible' : 'Chambre non disponible'
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * @swagger
   * /api/v1/chambres/compare:
   *   post:
   *     summary: Compare deux chambres par leur code
   *     tags: [Chambres]
   */
  static async compare(req, res) {
    try {
      const { numero1, numero2 } = req.body;
      
      if (!numero1 || !numero2) {
        return res.status(400).json({ 
          success: false, 
          error: 'Les deux numéros de chambre sont obligatoires' 
        });
      }
      
      const areEqual = ChambreService.compareByCode(numero1, numero2);
      
      res.json({ 
        success: true, 
        areEqual,
        message: areEqual ? 'Les chambres sont identiques' : 'Les chambres sont différentes'
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ChambreController;
