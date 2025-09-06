const express = require('express');
const cors = require('cors');
const personasRouter = require('./routes/PersonaEnMovilidad');
const loginRoutes = require('./routes/Login');
const bodyParser = require('body-parser');
const notificacionesRouter = require('./routes/Notificaciones');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de límites
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware CORS actualizado
// Middleware CORS actualizado
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://gestionenmovilidadtfg.netlify.app' // ← URL CORRECTA de Netlify
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware de logging para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/login', loginRoutes);
app.use('/api/personas', personasRouter);
app.use('/api/notificaciones', notificacionesRouter);

// Ruta de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
