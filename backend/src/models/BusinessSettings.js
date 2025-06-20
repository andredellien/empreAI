const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BusinessSetting = sequelize.define('BusinessSetting', {
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
  tone: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'No especificado'
  },
  targetAudience: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: 'No especificado'
  },
  keywords: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('keywords');
      console.log('Keywords raw value:', rawValue);
      if (!rawValue) return [];
      try {
        return JSON.parse(rawValue);
      } catch (e) {
        console.error('Error parsing keywords:', e);
        return [];
      }
    },
    set(value) {
      console.log('Setting keywords value:', value);
      if (Array.isArray(value)) {
        this.setDataValue('keywords', JSON.stringify(value));
      } else {
        this.setDataValue('keywords', '[]');
      }
    }
  }
}, {
  tableName: 'BusinessSettings',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  schema: 'dbo'
});

module.exports = BusinessSetting; 