import { z } from "zod";

export const registerSchema = z.object({

    first_name: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio"),

    last_name: z
        .string()
        .trim()
        .min(1, "El apellido es obligatorio"),

    email: z
        .string()
        .trim()
        .email("Correo electrónico inválido")
        .transform(email => email.toLowerCase()),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")

});

export const loginSchema = z.object({

    email: z
        .string()
        .trim()
        .email("Correo electrónico inválido")
        .transform(email => email.toLowerCase()),

    password: z
        .string()
        .min(1, "La contraseña es obligatoria")

});