import * as mundial from "../../data/mundiales.js";

export const getByCampeon = (req, res) => {
    const results = mundial.getByCampeon(req.params.pais);
    res.json(results);
};
