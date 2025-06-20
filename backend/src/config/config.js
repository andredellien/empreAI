require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DAILY_CONTENT_LIMIT: parseInt(process.env.DAILY_CONTENT_LIMIT) || 10,
  DAILY_IMAGE_LIMIT: parseInt(process.env.DAILY_IMAGE_LIMIT) || 5
}; 