const { GeneratedImage, Business, DailyLimit } = require('../models');
const { Op } = require('sequelize');

// Crear nueva imagen generada
exports.createImage = async (req, res) => {
  try {
    const { businessId, imageUrl, prompt, style, status } = req.body;

    // Verificar límites diarios
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyLimit = await DailyLimit.findOne({
      where: {
        businessId,
        date: today
      }
    });

    if (dailyLimit && dailyLimit.imageCount >= 5) {
      return res.status(400).json({ error: 'Límite diario de imágenes alcanzado' });
    }

    // Crear la imagen
    const generatedImage = await GeneratedImage.create({
      businessId,
      imageUrl,
      prompt,
      style,
      status: status || 'pending'
    });

    // Actualizar o crear el límite diario
    if (dailyLimit) {
      await dailyLimit.increment('imageCount');
    } else {
      await DailyLimit.create({
        businessId,
        date: today,
        contentCount: 0,
        imageCount: 1
      });
    }

    res.status(201).json(generatedImage);
  } catch (error) {
    console.error('Error al crear imagen:', error);
    res.status(500).json({ error: 'Error al crear imagen' });
  }
};

// Obtener imagen por ID
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await GeneratedImage.findByPk(id, {
      include: [{
        model: Business,
        attributes: ['name']
      }]
    });

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.json(image);
  } catch (error) {
    console.error('Error al obtener imagen:', error);
    res.status(500).json({ error: 'Error al obtener imagen' });
  }
};

// Obtener imágenes por negocio
exports.getImagesByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const images = await GeneratedImage.findAll({
      where: { businessId },
      order: [['createdAt', 'DESC']],
      include: [{
        model: Business,
        attributes: ['name']
      }]
    });

    res.json(images);
  } catch (error) {
    console.error('Error al obtener imágenes del negocio:', error);
    res.status(500).json({ error: 'Error al obtener imágenes del negocio' });
  }
};

// Actualizar estado de la imagen
exports.updateImageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const image = await GeneratedImage.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    await image.update({ status });
    res.json(image);
  } catch (error) {
    console.error('Error al actualizar estado de la imagen:', error);
    res.status(500).json({ error: 'Error al actualizar estado de la imagen' });
  }
};

// Eliminar imagen
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await GeneratedImage.findByPk(id);
    
    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    await image.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({ error: 'Error al eliminar imagen' });
  }
}; 