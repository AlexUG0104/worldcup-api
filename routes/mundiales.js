const express = require('express');
const router = express.Router();
const { z } = require('zod');
const db = require('../database/db');

// --- ESQUEMAS DE VALIDACIÓN CON ZOD ---

// Validación del parámetro de consulta ?include=full
const includeQuerySchema = z.object({
    include: z.enum(['full'], {
        errorMap: () => ({ message: "El parámetro 'include' solo acepta el valor 'full'." })
    }).optional()
});

// Validación para el parámetro slug (texto sin espacios, al menos 1 caracter)
const slugParamSchema = z.object({
    slug: z.string()
        .min(1, { message: "El slug no puede estar vacío." })
        .regex(/^[a-z0-9-]+$/, { message: "El slug tiene un formato inválido (solo minúsculas, números y guiones)." })
});

// Validación para el nombre del campeón (texto, al menos 2 caracteres)
const campeonParamSchema = z.object({
    pais: z.string()
        .min(2, { message: "El nombre del país debe tener al menos 2 caracteres." })
});

// Validación para el texto de búsqueda (mínimo 3 caracteres)
const searchParamSchema = z.object({
    text: z.string()
        .min(3, { message: "El texto de búsqueda debe tener al menos 3 caracteres." })
});


// --- RUTAS DE LA API ---

// 1. GET / - Información general de la API
router.get('/', async (req, res, next) => {
    try {
        const countResult = await db.get('SELECT COUNT(*) as total FROM mundiales');
        const totalMundiales = countResult ? countResult.total : 0;

        res.json({
            nombre: "API REST de la Copa Mundial de la FIFA",
            version: "1.0.0",
            autor: "Estudiante de Multimedios",
            cantidad_mundiales: totalMundiales,
            endpoints_disponibles: {
                "GET /": "Información general y estado de la API",
                "GET /mundiales": "Lista todas las ediciones de los mundiales (?include=full para ver detalles completos)",
                "GET /mundial/:slug": "Obtiene la información detallada de un mundial por su slug",
                "GET /campeon/:pais": "Obtiene los mundiales ganados por un país específico",
                "GET /random": "Obtiene una edición de mundial de forma aleatoria",
                "GET /search/:text": "Busca mundiales por nombre, sede, campeón, resumen o descripción (mínimo 3 caracteres)",
                "GET /imagenes/:archivo": "Sirve la imagen oficial del mundial especificado"
            }
        });
    } catch (error) {
        next(error);
    }
});

// 2. GET /mundiales - Listar todos los mundiales
router.get('/mundiales', async (req, res, next) => {
    try {
        // Validar query string con Zod
        const queryValidation = includeQuerySchema.safeParse(req.query);
        if (!queryValidation.success) {
            return res.status(400).json({
                error: queryValidation.error.issues[0].message
            });
        }

        const includeFull = req.query.include === 'full';

        let queryStr;
        if (includeFull) {
            queryStr = 'SELECT * FROM mundiales ORDER BY anio DESC';
        } else {
            // Versión resumida
            queryStr = 'SELECT nombre, anio, sede, campeon, slug, imagen FROM mundiales ORDER BY anio DESC';
        }

        const rows = await db.all(queryStr);
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

// 3. GET /random - Mundial aleatorio (debe ir antes de /mundial/:slug para evitar colisiones)
router.get('/random', async (req, res, next) => {
    try {
        const row = await db.get('SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1');
        if (!row) {
            return res.status(404).json({ error: "No se encontraron mundiales en la base de datos." });
        }
        res.json(row);
    } catch (error) {
        next(error);
    }
});

// 4. GET /mundial/:slug - Obtener mundial por slug
router.get('/mundial/:slug', async (req, res, next) => {
    try {
        // Validar parámetro con Zod
        const paramValidation = slugParamSchema.safeParse(req.params);
        if (!paramValidation.success) {
            return res.status(400).json({
                error: paramValidation.error.issues[0].message
            });
        }

        const { slug } = req.params;
        const row = await db.get('SELECT * FROM mundiales WHERE slug = ?', [slug]);

        if (!row) {
            return res.status(404).json({
                error: "Mundial no encontrado"
            });
        }

        res.json(row);
    } catch (error) {
        next(error);
    }
});

// 5. GET /campeon/:pais - Obtener ediciones ganadas por un país
router.get('/campeon/:pais', async (req, res, next) => {
    try {
        // Validar parámetro con Zod
        const paramValidation = campeonParamSchema.safeParse(req.params);
        if (!paramValidation.success) {
            return res.status(400).json({
                error: paramValidation.error.issues[0].message
            });
        }

        const { pais } = req.params;
        // Búsqueda insensible a mayúsculas/minúsculas usando LOWER en SQLite
        const rows = await db.all('SELECT * FROM mundiales WHERE LOWER(campeon) = LOWER(?) ORDER BY anio DESC', [pais]);

        res.json(rows);
    } catch (error) {
        next(error);
    }
});

// 6. GET /search/:text - Buscar mundiales por texto libre (mínimo 3 caracteres)
router.get('/search/:text', async (req, res, next) => {
    try {
        // Validar parámetro con Zod
        const paramValidation = searchParamSchema.safeParse(req.params);
        if (!paramValidation.success) {
            return res.status(400).json({
                error: paramValidation.error.issues[0].message
            });
        }

        const { text } = req.params;
        const searchTerm = `%${text}%`;

        // Búsqueda en nombre, resumen, descripcion, sede y campeon
        const queryStr = `
            SELECT * FROM mundiales 
            WHERE nombre LIKE ? 
               OR resumen LIKE ? 
               OR descripcion LIKE ? 
               OR sede LIKE ? 
               OR campeon LIKE ?
            ORDER BY anio DESC
        `;

        const rows = await db.all(queryStr, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm]);
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
