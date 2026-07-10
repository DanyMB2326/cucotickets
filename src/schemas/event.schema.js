import { z } from "zod";

export const createEventSchema = z.object({

    title: z
        .string()
        .trim()
        .min(3, "El título debe tener al menos 3 caracteres"),

    description: z
        .string()
        .trim()
        .min(10, "La descripción debe tener al menos 10 caracteres"),

    category: z
        .string()
        .trim()
        .min(3, "La categoría es obligatoria"),

    date: z
        .string()
        .datetime("La fecha debe estar en formato ISO 8601"),

    location: z
        .string()
        .trim()
        .min(3, "La ubicación es obligatoria"),

    capacity: z.coerce
        .number()
        .int("La capacidad debe ser un número entero")
        .positive("La capacidad debe ser mayor que cero"),

    price: z.coerce
        .number()
        .min(0, "El precio no puede ser negativo")

});

export const updateEventSchema =
    createEventSchema.partial();

export const statusSchema = z.object({

    status: z.enum([
        "draft",
        "published",
        "cancelled",
        "finished"
    ])

});