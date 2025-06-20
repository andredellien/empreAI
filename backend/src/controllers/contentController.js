const { GeneratedContent, Business, DailyLimit } = require('../models');
const { Op } = require('sequelize');
const ContentGenerator = require('../services/openai/contentGenerator');

// Crear nuevo contenido generado
exports.createContent = async (req, res) => {
  try {
    const { businessId, contentType, platform, status } = req.body;

    // Verificar límites diarios
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyLimit = await DailyLimit.findOne({
      where: {
        businessId,
        date: today
      }
    });

    if (dailyLimit && dailyLimit.contentCount >= 10) {
      return res.status(400).json({ error: 'Límite diario de contenido alcanzado' });
    }

    // Obtener el negocio y su configuración
    const business = await Business.findByPk(businessId, {
      include: [{ all: true }]
    });
    if (!business) {
      return res.status(404).json({ error: 'Negocio no encontrado' });
    }

    // Generar el contenido usando OpenAI
    const generatedText = await ContentGenerator.generateContent(business, contentType, platform);

    // Crear el contenido generado
    const generatedContent = await GeneratedContent.create({
      businessId,
      content: generatedText,
      type: contentType,
      platform,
      status: status || 'completed'
    });

    // Actualizar o crear el límite diario
    if (dailyLimit) {
      await dailyLimit.increment('contentCount');
    } else {
      await DailyLimit.create({
        businessId,
        date: today,
        contentCount: 1,
        imageCount: 0
      });
    }

    res.status(201).json(generatedContent);
  } catch (error) {
    console.error('Error al crear contenido:', error);
    res.status(500).json({ error: 'Error al crear contenido' });
  }
};

// Obtener contenido por ID
exports.getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await GeneratedContent.findByPk(id, {
      include: [{
        model: Business,
        attributes: ['name']
      }]
    });

    if (!content) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }

    res.json(content);
  } catch (error) {
    console.error('Error al obtener contenido:', error);
    res.status(500).json({ error: 'Error al obtener contenido' });
  }
};

// Obtener contenido por negocio
exports.getContentByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;
    const content = await GeneratedContent.findAll({
      where: { businessId },
      order: [['createdAt', 'DESC']],
      include: [{
        model: Business,
        attributes: ['name']
      }]
    });

    res.json(content);
  } catch (error) {
    console.error('Error al obtener contenido del negocio:', error);
    res.status(500).json({ error: 'Error al obtener contenido del negocio' });
  }
};

// Actualizar estado del contenido
exports.updateContentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const content = await GeneratedContent.findByPk(id);
    if (!content) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }

    await content.update({ status });
    res.json(content);
  } catch (error) {
    console.error('Error al actualizar estado del contenido:', error);
    res.status(500).json({ error: 'Error al actualizar estado del contenido' });
  }
};

// Eliminar contenido
exports.deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await GeneratedContent.findByPk(id);
    
    if (!content) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }

    await content.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar contenido:', error);
    res.status(500).json({ error: 'Error al eliminar contenido' });
  }
}; 