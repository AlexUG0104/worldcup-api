import express from "express";
import { getAll } from "./routes/mundiales/getAll.js";
import { getBySlug } from "./routes/mundiales/getBySlug.js";
import { getByCampeon } from "./routes/mundiales/getByCampeon.js";
import { getRandom } from "./routes/mundiales/getRandom.js";
import { search } from "./routes/mundiales/search.js";

const app = express();
app.enable("strict routing");

const HOST = "localhost";
const PORT = 4321;

// Middleware para procesar JSON
app.use(express.json());

// Servir archivos estáticos de la carpeta 'public'
app.use(express.static("public"));

// Ruta de información general de la API
app.get("/", (req, res) => {
    res.json({
        nombre: "API REST de la Copa Mundial de la FIFA",
        version: "1.0.0",
        autor: "Estudiante de Multimedios",
        cantidad_mundiales: 6,
        endpoints_disponibles: {
            "GET /": "Información general de la API",
            "GET /mundiales": "Listado de mundiales (admite ?include=full)",
            "GET /mundial/:slug": "Detalle de un mundial específico por slug",
            "GET /campeon/:pais": "Mundiales ganados por un país específico",
            "GET /random": "Obtener un mundial aleatorio",
            "GET /search/:text": "Buscar mundiales por texto libre (mínimo 3 caracteres)"
        }
    });
});

// Rutas de la API
app.get("/mundiales", getAll);
app.get("/mundial/:slug", getBySlug);
app.get("/campeon/:pais", getByCampeon);
app.get("/random", getRandom);
app.get("/search/:text", search);

// Catch-all para rutas inexistentes (404)
app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada o recurso inexistente"
    });
});

// Middleware de manejo de errores globales (500)
app.use((err, req, res, next) => {
    console.error('Error no manejado en la aplicación:', err);
    res.status(500).json({
        error: "Error interno del servidor",
        mensaje: err.message
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Servidor de la Copa Mundial ejecutándose en: http://${HOST}:${PORT}`);
});
