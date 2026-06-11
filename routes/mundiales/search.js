import * as mundial from "../../data/mundiales.js";
import schema from "./search.schema.js";

const DEFAULT = "Búsqueda inválida";

export const search = (req, res) => {
    const parsed = schema.safeParse(req.params);

    if (!parsed.success) {
        const error = parsed.error.issues[0].message ?? DEFAULT;
        return res.status(400).json({ error });
    }

    const query = parsed.data.text;
    const results = mundial.search(query);
    res.json(results);
};
