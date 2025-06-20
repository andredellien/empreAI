const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Business = require('./Business');

const GeneratedImage = sequelize.define('GeneratedImage', {
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
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  style: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  tableName: 'GeneratedImages',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  schema: 'dbo'
});

// Relaciones
GeneratedImage.belongsTo(Business, { foreignKey: 'businessId', onDelete: 'CASCADE' });
Business.hasMany(GeneratedImage, { foreignKey: 'businessId' });

module.exports = GeneratedImage; 