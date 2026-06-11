import * as mundial from "../../data/mundiales.js";

export const getAll = (req, res) => {
    const isFull = req.query.include === "full";
    const results = mundial.getAll(isFull);
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const mapped = results.map(m => ({
        ...m,
        imagen: `${baseUrl}/imagenes/${m.imagen}`
    }));

    res.json(mapped);
};
