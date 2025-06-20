const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const { authenticateToken } = require('../middleware/auth');

// Rutas protegidas que requieren autenticación
router.use(authenticateToken);

// Crear nuevo contenido
router.post('/', contentController.createContent);

// Obtener contenido por ID
router.get('/:id', contentController.getContentById);

// Obtener contenido por negocio
router.get('/business/:businessId', contentController.getContentByBusiness);

// Actualizar estado del contenido
router.patch('/:id/status', contentController.updateContentStatus);

// Eliminar contenido
router.delete('/:id', contentController.deleteContent);

module.exports = router; 