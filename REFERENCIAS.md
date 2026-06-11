# REFERENCIAS

Este documento recopila las fuentes de información técnica, documentación oficial y bases de datos históricas consultadas para el diseño, desarrollo e implementación de esta API REST de la Copa Mundial.

---

## 📚 Documentación Técnica Oficial

1. **Node.js Documentation**
   * *Sitio consultado:* [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)
   * *Propósito:* Consulta del sistema de módulos CommonJS (`require`/`module.exports`), operaciones de archivos con `fs` y rutas de archivos con `path`.

2. **Express.js Framework**
   * *Sitio consultado:* [https://expressjs.com/es/guide/routing.html](https://expressjs.com/es/guide/routing.html)
   * *Propósito:* Configuración del servidor HTTP, enrutamiento, definición de middlewares de control de errores, servicio de archivos estáticos y gestión de respuestas JSON.

3. **SQLite3 Driver para Node.js**
   * *Sitio consultado:* [https://github.com/TryGhost/node-sqlite3/wiki](https://github.com/TryGhost/node-sqlite3/wiki)
   * *Propósito:* Integración y uso de sentencias SQL preparadas, manejo de conexiones a base de datos en memoria y física, y manipulación de callbacks asíncronos en Node.js.

4. **Zod - Schema Validation**
   * *Sitio consultado:* [https://zod.dev/](https://zod.dev/)
   * *Propósito:* Declaración y verificación de tipos de esquemas de datos para parámetros de URL (slug, texto de búsqueda, país) y parámetros de consulta de Express.

---

## 🏆 Fuentes de Información sobre los Mundiales de la FIFA

1. **FIFA Official Website**
   * *Sitio consultado:* [https://www.fifa.com/es/tournaments/mens/worldcup](https://www.fifa.com/es/tournaments/mens/worldcup)
   * *Propósito:* Verificación de datos oficiales sobre campeones, subcampeones, cantidad de equipos participantes, goleadores individuales y sedes organizadoras de cada mundial.

2. **Wikipedia - Copa Mundial de la FIFA**
   * *Sitios consultados:*
     * [Copa Mundial de la FIFA](https://es.wikipedia.org/wiki/Copa_Mundial_de_F%C3%BAtbol)
     * [Copa Mundial de Qatar 2022](https://es.wikipedia.org/wiki/Copa_Mundial_de_F%C3%BAtbol_de_2022)
     * [Copa Mundial de Rusia 2018](https://es.wikipedia.org/wiki/Copa_Mundial_de_F%C3%BAtbol_de_2018)
     * [Copa Mundial de Brasil 2014](https://es.wikipedia.org/wiki/Copa_Mundial_de_F%C3%BAtbol_de_2014)
     * [Copa Mundial de Sudáfrica 2010](https://es.wikipedia.org/wiki/Copa_Mundial_de_F%C3%BAtbol_de_2010)
     * [Copa Mundial de Alemania 2006](https://es.wikipedia.org/wiki/Copa_Mundial_de_F%C3%BAtbol_de_2006)
     * [Copa Mundial de Corea-Japón 2002](https://es.wikipedia.org/wiki/Copa_Mundial_de_F%C3%BAtbol_de_2002)
   * *Propósito:* Recopilación de resúmenes textuales de los campeonatos, detalles anecdóticos y datos históricos del torneo para la redacción de las descripciones y resúmenes de la base de datos SQLite.
