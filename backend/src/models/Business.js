const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const BusinessSetting = require('./BusinessSettings');

const Business = sequelize.define('Business', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Businesses',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  schema: 'dbo'
});

// Relaciones
Business.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Business, { foreignKey: 'userId' });

Business.hasOne(BusinessSetting, { foreignKey: 'businessId' });
BusinessSetting.belongsTo(Business, { foreignKey: 'businessId' });

module.exports = Business; 