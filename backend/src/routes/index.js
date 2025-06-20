const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const businessRoutes = require('./businessRoutes');
const contentRoutes = require('./contentRoutes');
const imageRoutes = require('./imageRoutes');

// Rutas de autenticación
router.use('/auth', authRoutes);

// Rutas de negocios
router.use('/businesses', businessRoutes);

// Rutas de contenido
router.use('/content', contentRoutes);

// Rutas de imágenes
router.use('/images', imageRoutes);

module.exports = router; 