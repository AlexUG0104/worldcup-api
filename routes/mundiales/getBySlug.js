import * as mundial from "../../data/mundiales.js";

export const getBySlug = (req, res) => {
    const selectedMundial = mundial.getBySlug(req.params.slug);

    if (!selectedMundial) {
        return res.status(404).json({ error: "Mundial no encontrado" });
    }

    res.json(selectedMundial);
};
