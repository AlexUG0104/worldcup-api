import * as mundial from "../../data/mundiales.js";

export const getBySlug = (req, res) => {
    const selectedMundial = mundial.getBySlug(req.params.slug);

    if (!selectedMundial) {
        return res.status(404).json({ error: "Mundial no encontrado" });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    selectedMundial.imagen = `${baseUrl}/imagenes/${selectedMundial.imagen}`;

    res.json(selectedMundial);
};
