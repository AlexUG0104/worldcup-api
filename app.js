const express = require('express');
const path = require('path');
const mundialesRouter = require('./routes/mundiales');

const app = express();
const PORT = 4321;

// Middleware para procesar JSON (opcional pero buena práctica)
app.use(express.json());

// Servir archivos estáticos de la carpeta 'public'
// Esto permite acceder a public/imagenes/archivo.avif mediante /imagenes/archivo.avif
app.use(express.static(path.join(__dirname, 'public')));

// Registrar las rutas de la API
app.use('/', mundialesRouter);

// Middleware para manejar rutas inexistentes (404)
app.use((req, res, next) => {
    res.status(404).json({
        error: "Ruta no encontrada o recurso inexistente"
    });
});

// Middleware global para el manejo de errores (500)
app.use((err, req, res, next) => {
    console.error('Error no manejado en la aplicación:', err);
    res.status(500).json({
        error: "Error interno del servidor",
        mensaje: err.message
    });
});

// Iniciar la escucha del servidor
app.listen(PORT, () => {
    console.log(`Servidor de la Copa Mundial ejecutándose en: http://localhost:${PORT}`);
});
