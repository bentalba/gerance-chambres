/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    SERVEUR EXPRESS - POINT D'ENTRÉE                        ║
 * ╠═══════════════════════════════════════════════════════════════════════════╣
 * ║  Configuration et démarrage du serveur API                                ║
 * ║  Projet EMSI - Préparé par Oussama SAJJI                                  ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const apiRoutes = require('./routes/api');
const { sequelize, testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════════════════
// MIDDLEWARES
// ═══════════════════════════════════════════════════════════════════════════

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Gestion Hôtel - Documentation'
}));

// API Routes
app.use('/api/v1', apiRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: '🏨 Bienvenue sur l\'API de Gestion Hôtelière',
    version: '1.0.0',
    author: 'Oussama SAJJI - EMSI',
    documentation: '/api-docs',
    endpoints: {
      clients: '/api/v1/clients',
      chambres: '/api/v1/chambres',
      reservations: '/api/v1/reservations'
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
    path: req.path
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Erreur serveur interne'
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// DÉMARRAGE DU SERVEUR
// ═══════════════════════════════════════════════════════════════════════════

const startServer = async () => {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                          ║');
  console.log('║     🏨  SYSTÈME DE GESTION HÔTELIÈRE - API REST  🏨                      ║');
  console.log('║                                                                          ║');
  console.log('║     Projet EMSI - Préparé par Oussama SAJJI                              ║');
  console.log('║                                                                          ║');
  console.log('╚══════════════════════════════════════════════════════════════════════════╝');
  console.log();

  // Test connexion DB
  const dbConnected = await testConnection();
  
  if (!dbConnected) {
    console.log('⚠️  Le serveur démarre sans connexion MySQL.');
    console.log('   Exécutez "npm run db:sync" après avoir démarré MySQL.\n');
  }

  app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
    console.log(`📚 Documentation API: http://localhost:${PORT}/api-docs`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
    console.log();
    console.log('Endpoints disponibles:');
    console.log('  GET    /api/v1/clients');
    console.log('  GET    /api/v1/chambres');
    console.log('  GET    /api/v1/reservations');
    console.log('  GET    /api/v1/reservations/today/created');
    console.log('  GET    /api/v1/reservations/today/expiring');
    console.log('  POST   /api/v1/reservations/auto-close');
    console.log();
  });
};

startServer();

module.exports = app;
