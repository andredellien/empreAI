const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Business = require('./Business');

const DailyLimit = sequelize.define('DailyLimit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Businesses',
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  contentCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  imageCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'DailyLimits',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  schema: 'dbo',
  indexes: [
    {
      unique: true,
      fields: ['businessId', 'date']
    }
  ]
});

// Relaciones
DailyLimit.belongsTo(Business, { foreignKey: 'businessId', onDelete: 'CASCADE' });
Business.hasMany(DailyLimit, { foreignKey: 'businessId' });

module.exports = DailyLimit; 