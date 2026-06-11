import * as mundial from "../../data/mundiales.js";

export const getByCampeon = (req, res) => {
    const results = mundial.getByCampeon(req.params.pais);
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const mapped = results.map(m => ({
        ...m,
        imagen: `${baseUrl}/imagenes/${m.imagen}`
    }));

    res.json(mapped);
};
