const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const contentRoutes = require('./routes/contentRoutes');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

// Configuración de CORS para desarrollo y producción
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://TU-FRONTEND-DEPLOY.render.com' // Reemplaza por tu dominio real de frontend en producción
  ],
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/api/auth', userRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/images', imageRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error al iniciar:', error);
  }
}); 