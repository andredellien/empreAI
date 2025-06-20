const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const { authenticateToken } = require('../middleware/auth');

// Rutas protegidas que requieren autenticación
router.use(authenticateToken);

// Crear nueva imagen
router.post('/', imageController.createImage);

// Obtener imagen por ID
router.get('/:id', imageController.getImageById);

// Obtener imágenes por negocio
router.get('/business/:businessId', imageController.getImagesByBusiness);

// Actualizar estado de la imagen
router.patch('/:id/status', imageController.updateImageStatus);

// Eliminar imagen
router.delete('/:id', imageController.deleteImage);

module.exports = router; 