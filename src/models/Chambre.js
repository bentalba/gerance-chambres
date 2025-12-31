/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    MODEL CHAMBRE - SEQUELIZE                               ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Table: chambres (id, numero_chambre, telephone)                          ║
 * ║  Maximum 80 chambres par hôtel                                            ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Chambre = sequelize.define('Chambre', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_chambre: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: {
      msg: 'Ce numéro de chambre existe déjà'
    },
    validate: {
      notEmpty: { msg: 'Le numéro de chambre est obligatoire' }
    }
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  etage: {
    type: DataTypes.VIRTUAL,
    get() {
      const numero = this.getDataValue('numero_chambre');
      return numero ? parseInt(numero.charAt(0)) : null;
    }
  }
}, {
  tableName: 'chambres',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

/**
 * Méthode de comparaison - Vérifie si deux chambres sont identiques
 * @param {Chambre} autreChambre - Chambre à comparer
 * @returns {boolean}
 */
Chambre.prototype.equals = function(autreChambre) {
  if (!autreChambre) return false;
  return this.numero_chambre === autreChambre.numero_chambre;
};

/**
 * Hook pour vérifier la limite de 80 chambres
 */
Chambre.beforeCreate(async () => {
  const count = await Chambre.count();
  if (count >= 80) {
    throw new Error('L\'hôtel a atteint sa capacité maximale de 80 chambres');
  }
});

module.exports = Chambre;
