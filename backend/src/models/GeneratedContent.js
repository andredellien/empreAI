const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Business = require('./Business');

const GeneratedContent = sequelize.define('GeneratedContent', {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  platform: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  tableName: 'GeneratedContent',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  schema: 'dbo'
});

// Relaciones
GeneratedContent.belongsTo(Business, { foreignKey: 'businessId', onDelete: 'CASCADE' });
Business.hasMany(GeneratedContent, { foreignKey: 'businessId' });

module.exports = GeneratedContent; 