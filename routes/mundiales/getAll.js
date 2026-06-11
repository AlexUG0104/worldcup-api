import * as mundial from "../../data/mundiales.js";

export const getAll = (req, res) => {
    const isFull = req.query.include === "full";
    const results = mundial.getAll(isFull);
    res.json(results);
};
