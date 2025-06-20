const User = require('./User');
const Business = require('./Business');
const BusinessSetting = require('./BusinessSettings');
const GeneratedContent = require('./GeneratedContent');
const GeneratedImage = require('./GeneratedImage');
const DailyLimit = require('./DailyLimit');

// Definir relaciones
Business.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Business, { foreignKey: 'userId' });

Business.hasOne(BusinessSetting, { foreignKey: 'businessId', onDelete: 'CASCADE' });
BusinessSetting.belongsTo(Business, { foreignKey: 'businessId' });

Business.hasMany(GeneratedContent, { foreignKey: 'businessId', onDelete: 'CASCADE' });
GeneratedContent.belongsTo(Business, { foreignKey: 'businessId' });

GeneratedImage.belongsTo(Business, { foreignKey: 'businessId', onDelete: 'CASCADE' });
Business.hasMany(GeneratedImage, { foreignKey: 'businessId' });

Business.hasMany(DailyLimit, { foreignKey: 'businessId', onDelete: 'CASCADE' });
DailyLimit.belongsTo(Business, { foreignKey: 'businessId' });

module.exports = {
  User,
  Business,
  BusinessSetting,
  GeneratedContent,
  GeneratedImage,
  DailyLimit
}; 