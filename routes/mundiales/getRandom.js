import * as mundial from "../../data/mundiales.js";

export const getRandom = (req, res) => {
    const selectedMundial = mundial.getRandom();

    if (selectedMundial) {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        selectedMundial.imagen = `${baseUrl}/imagenes/${selectedMundial.imagen}`;
    }

    res.json(selectedMundial);
};
