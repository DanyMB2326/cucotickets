import sessionsRepository from "../repositories/sessions.repository.js";
import {
    createHash,
    isValidPassword
} from "../utils/hash.js";

import { generateToken } from "../utils/jwt.js";

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

        // Verificar si el correo ya existe
        const existingUser = await sessionsRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("El correo ya está registrado");
        }

        // Crear usuario
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password),
            role: "user"
        };

        // Guardar usuario
        const createdUser = await sessionsRepository.create(newUser);

        // Eliminar contraseña de la respuesta
        const user = createdUser.toObject();

        delete user.password;

        return user;
    }

    async login(loginData) {

        const {
            email,
            password
        } = loginData;

        // Buscar usuario
        const user =
            await sessionsRepository.findByEmail(email);

        // No revelar si falló el correo o la contraseña
        if (!user) {
            throw new Error("Credenciales inválidas");
        }

        // Comparar contraseña
        const validPassword =
            isValidPassword(password, user.password);

        if (!validPassword) {
            throw new Error("Credenciales inválidas");
        }

        // Generar JWT
        const token =
            generateToken(user);

        // Eliminar password
        const safeUser = user.toObject();

        delete safeUser.password;

        return {
            user: safeUser,
            token
        };

    }

}

export default new SessionsService();