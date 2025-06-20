const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'empreai',
  'sa',
  'NuevaContraseña123',
  {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    },
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error de conexión:', error);
    throw error;
  }
};

module.exports = { sequelize, connectDB }; 