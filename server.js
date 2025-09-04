const express = require('express');
const cors = require('cors');
const personasRouter = require('./routes/PersonaEnMovilidad');
const loginRoutes = require('./routes/Login');
const bodyParser = require('body-parser');
const notificacionesRouter = require('./routes/Notificaciones');
require('dotenv').config(); 
const app = express();
const PORT = process.env.PORT || 3001;


const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://tu-app.netlify.app' // Reemplaza con tu URL de Netlify
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Configuración de límites ANTES de los middlewares principales
app.use(express.json({ limit: '50mb' }));  // Configura primero el límite para JSON
app.use(express.urlencoded({ limit: '50mb', extended: true }));  // Luego para URL-encoded
app.use(bodyParser.json({ limit: '50mb' }));  // Y también para bodyParser (redundante pero seguro)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Rutas (después de todos los middlewares)
app.use('/login', loginRoutes);
app.use('/personas', personasRouter);
app.use('/notificaciones', notificacionesRouter);


app.get("/", (req, res) => {
  res.send("Backend funcionando ");
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

