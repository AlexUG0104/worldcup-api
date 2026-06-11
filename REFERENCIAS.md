# REFERENCIAS

Este documento recopila las fuentes de información técnica, documentación oficial y bases de datos históricas consultadas para el diseño, desarrollo e implementación de esta API REST de la Copa Mundial.

---

## 📚 Documentación Técnica Oficial

1. **Node.js Documentation - ES Modules**
   * *Sitio consultado:* [https://nodejs.org/docs/latest/api/esm.html](https://nodejs.org/docs/latest/api/esm.html)
   * *Propósito:* Configuración de módulos ES6 nativos (`import`/`export`) en el entorno de Node.js mediante `"type": "module"`.

2. **Node.js Documentation - Native SQLite (DatabaseSync)**
   * *Sitio consultado:* [https://nodejs.org/docs/latest/api/sqlite.html](https://nodejs.org/docs/latest/api/sqlite.html)
   * *Propósito:* Consulta de especificaciones para el uso de la API nativa síncrona `DatabaseSync` introducida de forma estable a partir de Node.js 22, incluyendo la preparación de sentencias (`prepare`), consultas múltiples (`all`), consultas únicas (`get`) e inicialización de esquemas (`exec`).

3. **Express.js Framework - Routing and Strict Routing**
   * *Sitio consultado:* [https://expressjs.com/es/guide/routing.html](https://expressjs.com/es/guide/routing.html)
   * *Propósito:* Configuración del servidor HTTP, enrutamiento, habilitación de enrutamiento estricto (`strict routing`), servicio de archivos estáticos y gestión de respuestas JSON.

4. **Zod - Schema Validation**
   * *Sitio consultado:* [https://zod.dev/](https://zod.dev/)
   * *Propósito:* Declaración y validación estricta de parámetros en la petición de búsqueda (`min`, `max`, `trim` y transformaciones de texto en minúsculas) usando `safeParse()`.

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
