import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";
import fs from "node:fs";
import path from "node:path";

// Asegurar que exista la carpeta data
fs.mkdirSync(path.join(cwd(), 'data'), { recursive: true });

const DATABASE_FILE = path.join(cwd(), 'data', 'worldcup.db');
const CREATE_SCRIPT = path.join(cwd(), 'database', 'schema.sql');

async function seed() {
    try {
        console.log('Iniciando poblamiento de la base de datos...');

        // Establecemos acceso a la base de datos usando DatabaseSync de node:sqlite
        const db = new DatabaseSync(DATABASE_FILE);

        // Lee el script de esquema SQL y crea la estructura
        const sql = fs.readFileSync(CREATE_SCRIPT, "utf-8");
        db.exec(sql);
        console.log('Esquema de base de datos creado exitosamente.');

        const mundialesData = [
            {
                nombre: 'Copa Mundial Qatar 2022',
                anio: 2022,
                sede: 'Qatar',
                campeon: 'Argentina',
                subcampeon: 'Francia',
                goleador: 'Kylian Mbappe',
                equipos: 32,
                imagen: 'qatar-2022.avif',
                slug: 'qatar-2022',
                resumen: 'Argentina campeon tras una final epica ante Francia.',
                descripcion: 'Primer Mundial en Medio Oriente; Argentina gano en penales su tercer titulo.'
            },
            {
                nombre: 'Copa Mundial Rusia 2018',
                anio: 2018,
                sede: 'Rusia',
                campeon: 'Francia',
                subcampeon: 'Croacia',
                goleador: 'Harry Kane',
                equipos: 32,
                imagen: 'rusia-2018.avif',
                slug: 'rusia-2018',
                resumen: 'Francia se corona campeon del mundo por segunda vez.',
                descripcion: 'Croacia dio la sorpresa al llegar a la final, pero cayo ante el juego dinamico de Francia.'
            },
            {
                nombre: 'Copa Mundial Brasil 2014',
                anio: 2014,
                sede: 'Brasil',
                campeon: 'Alemania',
                subcampeon: 'Argentina',
                goleador: 'James Rodriguez',
                equipos: 32,
                imagen: 'brasil-2014.avif',
                slug: 'brasil-2014',
                resumen: 'Alemania alcanza su cuarto titulo tras vencer a Argentina en la prorroga.',
                descripcion: 'Torneo marcado por el historico 7-1 de Alemania sobre el anfitrion Brasil en semifinales.'
            },
            {
                nombre: 'Copa Mundial Sudafrica 2010',
                anio: 2010,
                sede: 'Sudafrica',
                campeon: 'Espana',
                subcampeon: 'Paises Bajos',
                goleador: 'Thomas Muller',
                equipos: 32,
                imagen: 'sudafrica-2010.avif',
                slug: 'sudafrica-2010',
                resumen: 'Espana gana su primera Copa del Mundo gracias al gol de Andres Iniesta.',
                descripcion: 'Primer Mundial celebrado en el continente africano, con una final muy disputada ante los holandeses.'
            },
            {
                nombre: 'Copa Mundial Alemania 2006',
                anio: 2006,
                sede: 'Alemania',
                campeon: 'Italia',
                subcampeon: 'Francia',
                goleador: 'Miroslav Klose',
                equipos: 32,
                imagen: 'alemania-2006.avif',
                slug: 'alemania-2006',
                resumen: 'Italia vence a Francia en la tanda de penales logrando su tetracampeonato.',
                descripcion: 'La gran final sera recordada por el cabezazo y la expulsion de la estrella francesa Zinedine Zidane.'
            },
            {
                nombre: 'Copa Mundial Corea-Japon 2002',
                anio: 2002,
                sede: 'Corea del Sur y Japon',
                campeon: 'Brasil',
                subcampeon: 'Alemania',
                goleador: 'Ronaldo',
                equipos: 32,
                imagen: 'corea-japon-2002.avif',
                slug: 'corea-japon-2002',
                resumen: 'Brasil gana su pentacampeonato liderado por un Ronaldo Nazario espectacular.',
                descripcion: 'Primer Mundial coorganizado por dos paises y el primero celebrado en el continente asiatico.'
            }
        ];

        // Preparar inserción de datos usando named parameters
        const insert = db.prepare(`
            INSERT INTO mundiales (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, descripcion)
            VALUES (:nombre, :anio, :sede, :campeon, :subcampeon, :goleador, :equipos, :imagen, :slug, :resumen, :descripcion)
        `);

        for (const m of mundialesData) {
            insert.run({
                nombre: m.nombre,
                anio: m.anio,
                sede: m.sede,
                campeon: m.campeon,
                subcampeon: m.subcampeon,
                goleador: m.goleador,
                equipos: m.equipos,
                imagen: m.imagen,
                slug: m.slug,
                resumen: m.resumen,
                descripcion: m.descripcion
            });
            console.log(`Mundial insertado: ${m.nombre}`);
        }

        console.log('Poblamiento de la base de datos completado exitosamente.');
    } catch (error) {
        console.error('Error durante el seed de la base de datos:', error);
    }
}

seed();
