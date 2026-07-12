import { z } from "zod";

export const createTicketSchema = z.object({

    quantity: z.coerce
        .number()
        .int("La cantidad debe ser un número entero")
        .positive("La cantidad debe ser mayor que cero")

});