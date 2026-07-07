import { z } from 'zod';

// Esquema de validación para la creación de un evento.
// En próximas entregas se sumarán reglas para cupos e inscripciones.

export const createEventSchema = z.object({
    title: z.string().trim().min(3, 'El título debe tener al menos 3 caracteres'),
    description: z.string().trim().min(10, 'La descripción debe tener al menos 10 caracteres'),
    date: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
        message: 'La fecha debe ser una fecha válida (ISO 8601)',
    }),
    location: z.string().trim().min(3, 'La ubicación debe tener al menos 3 caracteres'),
    capacity: z.number().int().positive('La capacidad debe ser un número entero positivo').optional(),
});

export default createEventSchema;
