import sessionsRepository from "../repositories/sessions.repository.js";
import { createHash } from "../utils/bcrypt.js";

class SessionsService {

    async getCurrentSession() {
        return sessionsRepository.getCurrent();
    }

    async register(userData) {

        const {
            first_name,
            last_name,
            email,
            password
        } = userData;

        // Validar campos obligatorios
        if (!first_name || !last_name || !email || !password) {
            throw new Error("Todos los campos son obligatorios");
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error("Correo electrónico inválido");
        }

        // Validar contraseña
        if (password.length < 8) {
            throw new Error("La contraseña debe tener al menos 8 caracteres");
        }

        // Normalizar email
        const normalizedEmail = email.trim().toLowerCase();

        // Verificar duplicados
        const existingUser =
            await sessionsRepository.findByEmail(normalizedEmail);

        if (existingUser) {
            throw new Error("El correo ya está registrado");
        }

        // Crear usuario
        const newUser = {
            first_name,
            last_name,
            email: normalizedEmail,
            password: createHash(password),
            role: "user"
        };

        // Guardar usuario
        const createdUser =
            await sessionsRepository.create(newUser);

        // Eliminar contraseña de la respuesta
        const user = createdUser.toObject();

        delete user.password;

        return user;

    }

}

export default new SessionsService();
