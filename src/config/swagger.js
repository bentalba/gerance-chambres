/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    CONFIGURATION SWAGGER (OpenAPI)                         ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Documentation automatique de l'API REST                                  ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestion Hôtelière',
      version: '1.0.0',
      description: `
## Système de Gestion des Réservations d'Hôtel

**Projet EMSI - Préparé par Oussama SAJJI**

### Fonctionnalités:
- 👥 Gestion des Clients (CRUD)
- 🛏️ Gestion des Chambres (80 max)
- 📋 Gestion des Réservations
- ✅ Validation et Annulation
- 📊 Statistiques et Rapports
- ⏰ Clôture automatique (Cron)

### Architecture:
- **API Layer**: Express.js
- **Service Layer**: Business Logic
- **Data Access Layer**: Sequelize ORM
- **Database**: MySQL
      `,
      contact: {
        name: 'Oussama SAJJI',
        email: 'oussama.sajji@emsi.ma'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    tags: [
      { name: 'Clients', description: 'Gestion des clients' },
      { name: 'Chambres', description: 'Gestion des chambres (max 80)' },
      { name: 'Reservations', description: 'Gestion des réservations' }
    ]
  },
  apis: ['./src/controllers/*.js', './src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
