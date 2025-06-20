const { Business, BusinessSetting, DailyLimit } = require('../models');
const { Op } = require('sequelize');

// @desc    Crear un nuevo negocio
// @route   POST /api/businesses
// @access  Private
exports.createBusiness = async (req, res) => {
  try {
    const { name, category, description, BusinessSetting: settings } = req.body;

    // Crear el negocio
    const business = await Business.create({
      userId: req.user.id,
      name,
      category,
      description
    });

    // Crear la configuración del negocio
    const businessSetting = await BusinessSetting.create({
      businessId: business.id,
      tone: settings.tone,
      targetAudience: settings.targetAudience,
      keywords: settings.keywords
    });

    // Crear el límite diario inicial
    await DailyLimit.create({
      businessId: business.id,
      date: new Date(),
      contentCount: 0,
      imageCount: 0
    });

    // Obtener el negocio con su configuración
    const businessWithSettings = await Business.findOne({
      where: { id: business.id },
      include: [
        {
          model: BusinessSetting,
          attributes: ['tone', 'targetAudience', 'keywords']
        }
      ]
    });

    // Formatear la respuesta
    const formattedBusiness = businessWithSettings.toJSON();
    formattedBusiness.BusinessSetting = formattedBusiness.BusinessSetting;
    delete formattedBusiness.BusinessSetting;

    res.status(201).json(formattedBusiness);
  } catch (error) {
    console.error('Error al crear negocio:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// @desc    Obtener todos los negocios del usuario
// @route   GET /api/businesses
// @access  Private
exports.getUserBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: BusinessSetting,
          attributes: ['tone', 'targetAudience', 'keywords']
        }
      ]
    });

    // Asegurarse de que los datos están en el formato correcto
    const formattedBusinesses = businesses.map(business => {
      const businessData = business.toJSON();
      if (businessData.BusinessSetting) {
        // Asegurarse de que los campos tienen valores por defecto
        businessData.BusinessSetting = {
          tone: businessData.BusinessSetting.tone || 'No especificado',
          targetAudience: businessData.BusinessSetting.targetAudience || 'No especificado',
          keywords: businessData.BusinessSetting.keywords || []
        };
      }
      return businessData;
    });

    console.log('Businesses data being sent:', JSON.stringify(formattedBusinesses, null, 2));
    res.json(formattedBusinesses);
  } catch (error) {
    console.error('Error al obtener negocios:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// @desc    Obtener un negocio específico
// @route   GET /api/businesses/:id
// @access  Private
exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      include: [
        {
          model: BusinessSetting,
          attributes: ['tone', 'targetAudience', 'keywords']
        }
      ]
    });

    if (!business) {
      return res.status(404).json({ message: 'Negocio no encontrado' });
    }

    res.json(business);
  } catch (error) {
    console.error('Error al obtener negocio:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// @desc    Actualizar un negocio
// @route   PUT /api/businesses/:id
// @access  Private
exports.updateBusiness = async (req, res) => {
  try {
    const { name, category, description, BusinessSetting } = req.body;

    const business = await Business.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!business) {
      return res.status(404).json({ message: 'Negocio no encontrado' });
    }

    // Actualizar negocio
    await business.update({
      name,
      category,
      description
    });

    // Actualizar configuración
    const settings = await BusinessSetting.findOne({
      where: { businessId: business.id }
    });

    if (settings) {
      await settings.update({
        tone: BusinessSetting.tone,
        targetAudience: BusinessSetting.targetAudience,
        keywords: BusinessSetting.keywords
      });
    } else {
      // Si no existe configuración, crearla
      await BusinessSetting.create({
        businessId: business.id,
        tone: BusinessSetting.tone,
        targetAudience: BusinessSetting.targetAudience,
        keywords: BusinessSetting.keywords
      });
    }

    // Obtener el negocio actualizado con su configuración
    const updatedBusiness = await Business.findOne({
      where: { id: business.id },
      include: [
        {
          model: BusinessSetting,
          attributes: ['tone', 'targetAudience', 'keywords']
        }
      ]
    });

    // Formatear la respuesta
    const formattedBusiness = updatedBusiness.toJSON();
    if (formattedBusiness.BusinessSetting) {
      formattedBusiness.BusinessSetting = {
        tone: formattedBusiness.BusinessSetting.tone || 'No especificado',
        targetAudience: formattedBusiness.BusinessSetting.targetAudience || 'No especificado',
        keywords: formattedBusiness.BusinessSetting.keywords || []
      };
    }

    res.json(formattedBusiness);
  } catch (error) {
    console.error('Error al actualizar negocio:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// @desc    Eliminar un negocio
// @route   DELETE /api/businesses/:id
// @access  Private
exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!business) {
      return res.status(404).json({ message: 'Negocio no encontrado' });
    }

    await business.destroy();
    res.json({ message: 'Negocio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar negocio:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// @desc    Verificar límites diarios
// @route   GET /api/businesses/:businessId/limits
// @access  Private
exports.checkDailyLimits = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dailyLimit = await DailyLimit.findOne({
      where: {
        businessId: req.params.businessId,
        date: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      }
    });

    if (!dailyLimit) {
      return res.json({
        contentCount: 0,
        imageCount: 0
      });
    }

    res.json({
      contentCount: dailyLimit.contentCount,
      imageCount: dailyLimit.imageCount
    });
  } catch (error) {
    console.error('Error al verificar límites:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}; 