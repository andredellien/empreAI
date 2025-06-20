const express = require('express');
const router = express.Router();
const { 
  createBusiness,
  getUserBusinesses,
  getBusiness,
  updateBusiness,
  deleteBusiness,
  checkDailyLimits
} = require('../controllers/businessController');
const { authenticateToken } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

router.post('/', createBusiness);
router.get('/', getUserBusinesses);
router.get('/:id', getBusiness);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);
router.get('/:businessId/limits', checkDailyLimits);

module.exports = router; 