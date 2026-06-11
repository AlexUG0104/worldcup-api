# API REST de la Copa Mundial de la FIFA

Este proyecto es una API REST académica desarrollada para el curso de **Multimedios**. Permite consultar información histórica sobre distintas ediciones de la Copa Mundial de Fútbol de la FIFA, incluyendo sedes, campeones, subcampeones, goleadores y más.

La API sirve imágenes estáticas y aplica validaciones robustas con **Zod** para sus parámetros de entrada.

---

## 🛠️ Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución de JavaScript.
* **Express**: Framework minimalista para la creación de la API.
* **SQLite** (a través de `sqlite3`): Base de datos relacional ligera sin servidor externo.
* **Zod**: Biblioteca de declaración y validación de esquemas para JavaScript.
* **Archivos Estáticos**: Middleware de Express para servir las imágenes oficiales de cada mundial.

> **Nota:** No se utilizaron TypeScript, ORMs complejos (como Prisma o Sequelize), ni arquitecturas complejas de sobreingeniería para cumplir con las pautas estrictas del curso.

---

## 🚀 Instalación y Configuración

Siga los siguientes pasos para configurar y ejecutar el proyecto en su máquina local:

### 1. Clonar el repositorio e instalar las dependencias
Desde la carpeta raíz del proyecto (`/worldcup-api`), ejecute el siguiente comando para instalar las librerías necesarias (`express`, `zod`, `sqlite3`):

```bash
npm install
```

### 2. Poblar la base de datos (Seed)
Para crear las tablas de la base de datos SQLite y poblar la información inicial de los 6 mundiales requeridos (Corea-Japón 2002, Alemania 2006, Sudáfrica 2010, Brasil 2014, Rusia 2018 y Qatar 2022), ejecute:

```bash
npm run seed
```
*Este comando leerá el esquema SQL en `database/schema.sql`, creará la base de datos SQLite en `data/worldcup.db` e insertará los datos iniciales.*

### 3. Ejecutar el servidor

* **Modo Desarrollo (con auto-recarga al editar archivos):**
  ```bash
  npm run dev
  ```
* **Modo Producción (inicio directo sin recarga):**
  ```bash
  npm start
  ```

El servidor se iniciará en el puerto **4321**:
👉 `http://localhost:4321`

---

## 📌 Endpoints Disponibles y Pruebas con `xh` / `HTTPie`

A continuación se detallan las rutas de la API y ejemplos de comandos de consola (`xh`) para probarlas.

### 1. Información General de la API
* **Ruta:** `GET /`
* **Descripción:** Devuelve los metadatos generales de la API y las rutas disponibles.
* **Comando:**
  ```bash
  xh GET :4321/
  ```
* **Ejemplo de Respuesta:**
  ```json
  {
    "nombre": "API REST de la Copa Mundial de la FIFA",
    "version": "1.0.0",
    "autor": "Estudiante de Multimedios",
    "cantidad_mundiales": 6,
    "endpoints_disponibles": { ... }
  }
  ```

### 2. Listar Todos los Mundiales (Resumido o Completo)
* **Ruta:** `GET /mundiales`
* **Soporta Parámetro de Consulta:** `?include=full` (opcional)
  * **Sin `include`:** Devuelve versión resumida (solo nombre, año, sede, campeón, slug e imagen).
  * **Con `include=full`:** Devuelve toda la información detallada.
* **Comandos:**
  ```bash
  # Versión resumida
  xh GET :4321/mundiales

  # Versión completa
  xh GET :4321/mundiales include==full
  ```

### 3. Detalle de un Mundial por Slug
* **Ruta:** `GET /mundial/:slug`
* **Descripción:** Devuelve la información completa del mundial que coincida con el slug proporcionado.
* **Comandos:**
  ```bash
  # Caso Exitoso
  xh GET :4321/mundial/qatar-2022

  # Caso No Encontrado (Devuelve 404)
  xh GET :4321/mundial/inexistente
  ```
* **Ejemplo de Respuesta 404:**
  ```json
  {
    "error": "Mundial no encontrado"
  }
  ```

### 4. Mundiales Ganados por un País
* **Ruta:** `GET /campeon/:pais`
* **Descripción:** Lista todas las ediciones en las que el país indicado fue campeón (búsqueda insensible a mayúsculas y minúsculas).
* **Comando:**
  ```bash
  xh GET :4321/campeon/Argentina
  ```

### 5. Mundial Aleatorio
* **Ruta:** `GET /random`
* **Descripción:** Selecciona y devuelve una edición de mundial de forma aleatoria.
* **Comando:**
  ```bash
  xh GET :4321/random
  ```

### 6. Búsqueda de Mundiales por Texto Libre
* **Ruta:** `GET /search/:text`
* **Descripción:** Busca coincidencias del texto en los campos: `nombre`, `sede`, `campeon`, `resumen` y `descripcion`.
* **Validación Zod:** El parámetro `:text` debe tener **mínimo 3 caracteres**. Si no los tiene, retorna error `400 Bad Request`.
* **Comandos:**
  ```bash
  # Caso Exitoso (coincidencia de término)
  xh GET :4321/search/final

  # Caso Fallido por Validación Zod (menos de 3 letras - Devuelve 400)
  xh GET :4321/search/ab
  ```
* **Ejemplo de Respuesta 400:**
  ```json
  {
    "error": "El texto de búsqueda debe tener al menos 3 caracteres."
  }
  ```

### 7. Imágenes Estáticas
* **Ruta:** `GET /imagenes/:archivo`
* **Descripción:** Permite ver y descargar la imagen representativa del mundial correspondiente. Las imágenes se guardan físicamente en `/public/imagenes/`.
* **URL de ejemplo para navegador:**
  `http://localhost:4321/imagenes/qatar-2022.avif`

---

## 📁 Estructura del Proyecto

La estructura sigue un diseño académico ordenado y simple:

```text
/worldcup-api
│
├── database/
│   ├── db.js          # Configuración y envoltura de promesas de SQLite
│   ├── schema.sql      # Definición de la estructura de tablas SQL
│   └── seed.js        # Script de población inicial de la BD
│
├── public/
│   └── imagenes/      # Carpeta contenedora de imágenes estáticas (.avif)
│
├── routes/
│   └── mundiales.js   # Definición de endpoints y validaciones Zod
│
├── data/              # Carpeta generada automáticamente para albergar la BD SQLite (.db)
│
├── evidencias/        # Capturas de pantalla de pruebas y de las rutas de la API
│
├── app.js             # Entrada del servidor Express y middleware de errores/404
├── package.json       # Configuración y dependencias de npm
├── README.md          # Documentación general de instalación y uso
├── REFERENCIAS.md     # Fuentes de información e investigación
└── .gitignore         # Configuración de archivos ignorados por Git
```

---

## 📂 Carpeta de Evidencias

En la carpeta [`/evidencias`](./evidencias) se encuentran almacenadas las capturas de pantalla de todas las pruebas realizadas mediante el navegador y la consola (simulando peticiones con `xh`):

* `01_root.png`: Prueba de ruta de inicio de la API.
* `02_mundiales.png`: Lista de mundiales en versión resumida.
* `03_mundiales_full.png`: Lista de mundiales completa (`?include=full`).
* `04_mundial_qatar.png`: Detalle del mundial `qatar-2022`.
* `05_mundial_inexistente.png`: Código 404 al buscar un mundial inexistente.
* `06_campeon_argentina.png`: Lista de mundiales ganados por Argentina.
* `07_random.png`: Detalle de un mundial cargado al azar.
* `08_search_final.png`: Búsqueda de coincidencias exitosa para "final".
* `09_search_ab.png`: Código 400 al realizar búsqueda con menos de 3 caracteres.
* `10_imagen_qatar.png`: Imagen estática servida correctamente en el navegador.
