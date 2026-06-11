import { z } from "zod";

const schema = z.object({
    text: z.string()
        .trim()
        .min(3, "El texto de búsqueda debe tener al menos 3 caracteres.")
        .max(50, "No puede tener más de 50 caracteres")
        .transform(value => value.toLowerCase())
});

export default schema;
