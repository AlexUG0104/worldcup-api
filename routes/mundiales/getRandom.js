import * as mundial from "../../data/mundiales.js";

export const getRandom = (req, res) => {
    const selectedMundial = mundial.getRandom();
    res.json(selectedMundial);
};
