import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";
import path from "node:path";

const db = new DatabaseSync(path.join(cwd(), "data", "worldcup.db"));

export const getAll = (includeFull) => {
    if (includeFull) {
        const query = db.prepare("SELECT * FROM mundiales");
        return query.all();
    } else {
        const query = db.prepare("SELECT nombre, anio, sede, campeon, slug, imagen FROM mundiales");
        return query.all();
    }
};

export const getBySlug = (slug) => {
    const query = db.prepare("SELECT * FROM mundiales WHERE slug = ?");
    return query.get(slug);
};

export const getByCampeon = (campeon) => {
    const query = db.prepare("SELECT * FROM mundiales WHERE LOWER(campeon) = LOWER(?)");
    return query.all(campeon);
};

export const getRandom = () => {
    const query = db.prepare("SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1");
    return query.get();
};

export const search = (text) => {
    const query = db.prepare(`
        SELECT * FROM mundiales 
        WHERE nombre LIKE ? 
           OR sede LIKE ? 
           OR campeon LIKE ? 
           OR resumen LIKE ? 
           OR descripcion LIKE ?
    `);
    const pattern = `%${text}%`;
    return query.all(pattern, pattern, pattern, pattern, pattern);
};
